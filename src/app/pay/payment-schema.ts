import { z } from 'zod';

/**
 * Supported currencies for international payments
 */
export const SUPPORTED_CURRENCIES = ['INR', 'USD', 'AUD', 'EUR', 'GBP', 'CAD', 'SGD'] as const;
export type Currency = typeof SUPPORTED_CURRENCIES[number];

/**
 * Currency symbols mapping
 */
export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  INR: '₹',
  USD: '$',
  AUD: 'A$',
  EUR: '€',
  GBP: '£',
  CAD: 'C$',
  SGD: 'S$',
};

/**
 * Exchange rates relative to INR (base currency)
 * These should be updated periodically for accurate conversions
 */
export const EXCHANGE_RATES: Record<Currency, number> = {
  INR: 1,
  USD: 0.012,   // 1 INR = 0.012 USD
  AUD: 0.019,   // 1 INR = 0.019 AUD
  EUR: 0.011,   // 1 INR = 0.011 EUR
  GBP: 0.0095,  // 1 INR = 0.0095 GBP
  CAD: 0.017,   // 1 INR = 0.017 CAD
  SGD: 0.016,   // 1 INR = 0.016 SGD
};

/**
 * Convert amount from one currency to another
 */
export function convertCurrency(amount: number, fromCurrency: Currency, toCurrency: Currency): number {
  if (fromCurrency === toCurrency) return amount;
  
  // Convert to INR first, then to target currency
  const inINR = amount / EXCHANGE_RATES[fromCurrency];
  const converted = inINR * EXCHANGE_RATES[toCurrency];
  
  // Round to 2 decimal places
  return Math.round(converted * 100) / 100;
}

/**
 * Payment form validation schema
 * Validates amount (required), currency, and optional client details
 */
export const paymentSchema = z.object({
  // Required currency field
  currency: z.enum(SUPPORTED_CURRENCIES, {
    required_error: 'Currency is required',
  }).default('INR'),
  
  // Required amount field with min/max validation (minimum 1 for all currencies)
  amount: z
    .number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    })
    .min(1, 'Minimum amount is 1')
    .max(500000, 'Maximum amount is 500,000'),
  
  // Optional client details - no validation errors on empty
  name: z.string().optional(),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
  phone: z.string().optional(),
  proposalRef: z.string().optional(),
});

/**
 * Type definition for payment form values
 */
export type PaymentFormValues = z.infer<typeof paymentSchema>;

/**
 * Type definition for completed payment details
 */
export type PaymentDetails = {
  razorpayPaymentId: string;
  razorpayOrderId: string;
  razorpaySignature: string;
  amount: number;
  currency: Currency;
  name?: string;
  email?: string;
  phone?: string;
  proposalRef?: string;
  timestamp: string;
};
