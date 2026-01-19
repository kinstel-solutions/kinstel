'use server';

import Razorpay from 'razorpay';
import crypto from 'crypto';
import { Resend } from 'resend';
import { jsPDF } from 'jspdf';
import PaymentReceiptEmail from '@/emails/payment-receipt-email';
import { type PaymentDetails, CURRENCY_SYMBOLS, type Currency } from './payment-schema';

/**
 * Initialize Razorpay instance with API credentials
 */
const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error('Razorpay credentials not configured');
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

/**
 * Format currency amount with proper symbol
 */
function formatCurrency(amount: number, currency: Currency): string {
  const symbol = CURRENCY_SYMBOLS[currency];
  return `${symbol}${amount.toLocaleString()}`;
}

/**
 * Server Action: Create Razorpay order
 * @param amount - Amount in selected currency
 * @param currency - Currency code (INR, USD, AUD, etc.)
 * @returns Order details or error
 */
export async function createOrderAction(amount: number, currency: Currency = 'INR') {
  try {
    // Validate amount (minimum 1 for all currencies)
    if (!amount || amount < 1 || amount > 500000) {
      return { 
        success: false, 
        message: 'Invalid amount. Must be between 1 and 5,00,000' 
      };
    }

    const razorpay = getRazorpayInstance();

    // Create order with amount in smallest currency unit
    // For INR: paise (multiply by 100), for USD/AUD/etc: cents (multiply by 100)
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to smallest unit
      currency: currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        purpose: 'Quick Pay - Kinstel Solutions',
      },
    });

    return {
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return {
      success: false,
      message: 'Failed to create payment order. Please try again.',
    };
  }
}

/**
 * Server Action: Verify Razorpay payment signature
 * @param paymentData - Payment verification data from Razorpay
 * @returns Verification result
 */
export async function verifyPaymentAction(paymentData: {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}) {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = paymentData;

    if (!process.env.RAZORPAY_KEY_SECRET) {
      throw new Error('Razorpay key secret not configured');
    }

    // Generate signature for verification
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    // Verify signature matches
    const isValid = generatedSignature === razorpaySignature;

    if (!isValid) {
      console.error('Payment signature verification failed');
      return {
        success: false,
        message: 'Payment verification failed. Please contact support.',
      };
    }

    return {
      success: true,
      message: 'Payment verified successfully',
    };
  } catch (error) {
    console.error('Error verifying payment:', error);
    return {
      success: false,
      message: 'Payment verification failed. Please contact support.',
    };
  }
}

/**
 * Generate PDF receipt for payment
 * @param paymentDetails - Complete payment information
 * @returns PDF as base64 string
 */
function generateReceiptPDF(paymentDetails: PaymentDetails): string {
  const doc = new jsPDF();
  const { 
    amount, 
    razorpayPaymentId, 
    razorpayOrderId, 
    timestamp,
    name,
    email,
    phone,
    proposalRef,
  } = paymentDetails;

  // Header
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('PAYMENT RECEIPT', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Kinstel Solutions', 105, 30, { align: 'center' });
  
  // Line separator
  doc.setLineWidth(0.5);
  doc.line(20, 35, 190, 35);
  
  // Transaction Details
  let yPos = 50;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Transaction Details', 20, yPos);
  
  yPos += 10;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  doc.text('Transaction ID:', 20, yPos);
  doc.text(razorpayPaymentId, 70, yPos);
  
  yPos += 8;
  doc.text('Order ID:', 20, yPos);
  doc.text(razorpayOrderId, 70, yPos);
  
  yPos += 8;
  doc.text('Date & Time:', 20, yPos);
  const formattedDate = new Date(timestamp).toLocaleString('en-IN', {
    dateStyle: 'long',
    timeStyle: 'short',
  });
  doc.text(formattedDate, 70, yPos);
  
  yPos += 8;
  doc.setFont('helvetica', 'bold');
  doc.text('Amount Paid:', 20, yPos);
  doc.setFontSize(14);
  doc.text(formatCurrency(amount, paymentDetails.currency), 70, yPos);
  
  // Proposal Reference (if provided)
  if (paymentDetails.proposalRef) {
    yPos += 10;
    doc.setFontSize(11);
    doc.text('Proposal Reference:', 20, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(paymentDetails.proposalRef, 70, yPos);
  }
  
  // Client Details (if provided)
  if (name || email || phone) {
    yPos += 15;
    doc.setLineWidth(0.5);
    doc.line(20, yPos, 190, yPos);
    
    yPos += 10;
    doc.setFont('helvetica', 'bold');
    doc.text('Client Details', 20, yPos);
    
    doc.setFont('helvetica', 'normal');
    
    if (name) {
      yPos += 8;
      doc.text('Name:', 20, yPos);
      doc.text(name, 70, yPos);
    }
    
    if (email) {
      yPos += 8;
      doc.text('Email:', 20, yPos);
      doc.text(email, 70, yPos);
    }
    
    if (phone) {
      yPos += 8;
      doc.text('Phone:', 20, yPos);
      doc.text(phone, 70, yPos);
    }
  }
  
  // Footer
  doc.setLineWidth(0.5);
  doc.line(20, 270, 190, 270);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text('This is a computer-generated receipt and does not require a signature.', 105, 280, { align: 'center' });
  doc.text('For queries, contact: payments@kinstel.com', 105, 285, { align: 'center' });
  
  // Convert to base64
  return doc.output('datauristring').split(',')[1];
}

/**
 * Server Action: Send payment receipt email with PDF attachment
 * @param paymentDetails - Complete payment information
 * @returns Email send result
 */
export async function sendPaymentReceiptAction(paymentDetails: PaymentDetails) {
  try {
    // Only send email if email address is provided
    if (!paymentDetails.email) {
      return {
        success: true,
        message: 'Payment completed. No email provided.',
      };
    }

    // Validate environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error('Missing RESEND_API_KEY environment variable.');
      return { 
        success: false, 
        message: 'Email service not configured.' 
      };
    }

    const fromEmail = process.env.EMAIL_FROM || 'payments@kinstel.com';

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Generate PDF receipt
    const pdfBase64 = generateReceiptPDF(paymentDetails);

    // Send email with receipt - use payments@kinstel.com for payment receipts
    const result = await resend.emails.send({
      from: 'payments@kinstel.com', // Dedicated sender for payment receipts
      to: paymentDetails.email,
      subject: `Payment Receipt - ${formatCurrency(paymentDetails.amount, paymentDetails.currency)} - Kinstel Solutions`,
      react: PaymentReceiptEmail({
        name: paymentDetails.name,
        email: paymentDetails.email,
        phone: paymentDetails.phone,
        proposalRef: paymentDetails.proposalRef,
        amount: paymentDetails.amount,
        currency: paymentDetails.currency,
        razorpayPaymentId: paymentDetails.razorpayPaymentId,
        razorpayOrderId: paymentDetails.razorpayOrderId,
        timestamp: paymentDetails.timestamp,
      }),
      attachments: [
        {
          filename: `receipt_${paymentDetails.razorpayPaymentId}.pdf`,
          content: pdfBase64,
        },
      ],
    });

    if (result.error) {
      console.error('Failed to send receipt email:', result.error);
      return {
        success: false,
        message: 'Payment successful but failed to send receipt email.',
      };
    }

    return {
      success: true,
      message: 'Payment successful! Receipt sent to your email.',
    };
  } catch (error) {
    console.error('Error sending payment receipt:', error);
    return {
      success: false,
      message: 'Payment successful but failed to send receipt.',
    };
  }
}
