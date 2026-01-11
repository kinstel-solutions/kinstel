'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Loader2, IndianRupee, Send } from 'lucide-react';
import { paymentSchema, type PaymentFormValues } from '../payment-schema';
import { createOrderAction, verifyPaymentAction, sendPaymentReceiptAction } from '../actions';

// Razorpay types
declare global {
  interface Window {
    Razorpay: any;
  }
}

/**
 * Payment Form Component
 * Handles client payment input and Razorpay checkout integration
 */
export default function PaymentForm() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      invoiceReference: '',
    },
  });

  /**
   * Load Razorpay script dynamically
   */
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      // Check if already loaded
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  /**
   * Handle form submission and payment flow
   */
  const onSubmit = async (data: PaymentFormValues) => {
    try {
      setIsProcessing(true);
      setError(null);

      // 1. Load Razorpay script
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error('Failed to load payment gateway. Please try again.');
      }

      // 2. Create Razorpay order
      const orderResult = await createOrderAction(data.amount);
      if (!orderResult.success) {
        throw new Error(orderResult.message);
      }

      // 3. Initialize Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderResult.amount,
        currency: orderResult.currency,
        name: 'Kinstel Solutions',
        description: 'Quick Pay Invoice Payment',
        order_id: orderResult.orderId,
        prefill: {
          name: data.name || '',
          email: data.email || '',
          contact: data.phone || '',
        },
        notes: {
          invoice_reference: data.invoiceReference || '',
        },
        theme: {
          color: '#3b82f6', // Blue accent color
        },
        handler: async function (response: any) {
          // 4. Payment successful - verify signature
          const verifyResult = await verifyPaymentAction({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
          });

          if (!verifyResult.success) {
            setError(verifyResult.message);
            setIsProcessing(false);
            return;
          }

          // 5. Send receipt email (if email provided)
          await sendPaymentReceiptAction({
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            amount: data.amount,
            name: data.name,
            email: data.email,
            phone: data.phone,
            invoiceReference: data.invoiceReference,
            timestamp: new Date().toISOString(),
          });

          // 6. Redirect to success page with payment details
          const params = new URLSearchParams({
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            amount: data.amount.toString(),
          });

          router.push(`/pay/success?${params.toString()}`);
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            setError('Payment cancelled. Please try again if you wish to complete the payment.');
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  const amountValue = watch('amount');

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Amount Field - Required */}
        <div>
          <label htmlFor="amount" className="block text-sm font-semibold mb-2 text-foreground">
            Amount to Pay (INR) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IndianRupee className="h-5 w-5 text-gray-500" />
            </div>
            <input
              id="amount"
              type="number"
              step="0.01"
              placeholder="Enter amount (₹10 - ₹5,00,000)"
              {...register('amount', { valueAsNumber: true })}
              className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition text-foreground placeholder:text-muted-foreground"
              disabled={isProcessing}
            />
          </div>
          {errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
          )}
          {amountValue && !errors.amount && (
            <p className="text-sm text-muted-foreground mt-1">
              Amount: ₹{amountValue.toLocaleString('en-IN')}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-4">
          <p className="text-sm text-muted-foreground mb-4">
            Optional Details (helps us serve you better)
          </p>
        </div>

        {/* Optional Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              {...register('name')}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition text-foreground placeholder:text-muted-foreground"
              disabled={isProcessing}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2 text-foreground">
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="+91 98899 88408"
              {...register('phone')}
              className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition text-foreground placeholder:text-muted-foreground"
              disabled={isProcessing}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="your@email.com"
            {...register('email')}
            className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition text-foreground placeholder:text-muted-foreground"
            disabled={isProcessing}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
          <p className="text-xs text-muted-foreground mt-1">
            We&apos;ll send your receipt to this email
          </p>
        </div>

        {/* Invoice Reference */}
        <div>
          <label htmlFor="invoiceReference" className="block text-sm font-medium mb-2 text-foreground">
            Invoice Reference / Note
          </label>
          <input
            id="invoiceReference"
            type="text"
            placeholder="Invoice #12345 or any reference"
            {...register('invoiceReference')}
            className="w-full px-4 py-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-accent focus:border-accent outline-none transition text-foreground placeholder:text-muted-foreground"
            disabled={isProcessing}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              Pay Now
            </>
          )}
        </button>

        {/* Security Notice */}
        <p className="text-xs text-center text-muted-foreground">
          Secured by Razorpay. Your payment information is encrypted and secure.
        </p>
      </form>
    </div>
  );
}
