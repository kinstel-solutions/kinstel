import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";
import { CURRENCY_SYMBOLS, type Currency } from '../app/pay/payment-schema';

/**
 * Payment receipt email template
 * Sent to clients after successful payment
 */

interface PaymentReceiptEmailProps {
  name?: string;
  email?: string;
  phone?: string;
  proposalRef?: string;
  amount: number;
  currency: Currency;
  razorpayPaymentId: string;
  razorpayOrderId: string;
  timestamp: string;
}

export const PaymentReceiptEmail = ({
  name,
  email,
  phone,
  proposalRef,
  amount,
  currency,
  razorpayPaymentId,
  razorpayOrderId,
  timestamp,
}: PaymentReceiptEmailProps) => {
  const currencySymbol = CURRENCY_SYMBOLS[currency];
  const formattedAmount = `${currencySymbol}${amount.toLocaleString()}`;
  const date = new Date(timestamp).toLocaleString('en-IN', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  return (
    <Html>
      <Head />
      <Preview>Payment Receipt - {formattedAmount} - Kinstel Solutions</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Payment Successful</Heading>
          <Text style={paragraph}>
            Thank you for your payment to Kinstel Solutions. Your transaction has been completed successfully.
          </Text>
          <Hr style={hr} />
          
          <Section style={detailsSection}>
            <Text style={label}>Transaction ID:</Text>
            <Text style={value}>{razorpayPaymentId}</Text>
            
            <Text style={label}>Order ID:</Text>
            <Text style={value}>{razorpayOrderId}</Text>
            
            <Text style={label}>Amount Paid:</Text>
            <Text style={amountValue}>{formattedAmount}</Text>
            
            <Text style={label}>Date & Time:</Text>
            <Text style={value}>{date}</Text>
            
            {proposalRef && (
              <>
                <Text style={label}>Proposal Reference:</Text>
                <Text style={value}>{proposalRef}</Text>
              </>
            )}
          </Section>
          
          <Hr style={hr} />
          
          {(name || email || phone) && (
            <>
              <Section style={detailsSection}>
                <Text style={sectionHeading}>Payment Details</Text>
                
                {name && (
                  <>
                    <Text style={label}>Name:</Text>
                    <Text style={value}>{name}</Text>
                  </>
                )}
                
                {email && (
                  <>
                    <Text style={label}>Email:</Text>
                    <Text style={value}>{email}</Text>
                  </>
                )}
                
                {phone && (
                  <>
                    <Text style={label}>Phone:</Text>
                    <Text style={value}>{phone}</Text>
                  </>
                )}
              </Section>
              <Hr style={hr} />
            </>
          )}
          
          <Text style={footer}>
            This is an automated receipt from Kinstel Solutions.
            <br />
            For any queries, contact us at <strong>payments@kinstel.com</strong>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default PaymentReceiptEmail;

// Styles matching existing email templates
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  border: "1px solid #f0f0f0",
  borderRadius: "4px",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "0",
  textAlign: "center" as const,
  padding: "0 20px",
  color: "#16a34a", // Green for success
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "center" as const,
  padding: "0 20px",
  color: "#525f7f",
};

const detailsSection = {
  padding: "0 20px",
};

const sectionHeading = {
  fontSize: "18px",
  fontWeight: "bold",
  color: "#484848",
  marginBottom: "12px",
};

const label = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#484848",
  marginBottom: "4px",
  marginTop: "8px",
};

const value = {
  fontSize: "16px",
  color: "#525f7f",
  lineHeight: "24px",
  margin: "0 0 8px 0",
};

const amountValue = {
  fontSize: "20px",
  fontWeight: "bold",
  color: "#16a34a",
  lineHeight: "24px",
  margin: "0 0 8px 0",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "20px",
  textAlign: "center" as const,
  padding: "0 20px",
};
