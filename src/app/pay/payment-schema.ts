import { z } from 'zod';

/**
 * Payment form validation schema
 * Validates amount (required) and optional client details
 */
export const paymentSchema = z.object({
  // Required amount field with min/max validation
  amount: z
    .number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    })
    .min(10, 'Minimum amount is ₹10')
    .max(500000, 'Maximum amount is ₹5,00,000'),
  
  // Optional client details - no validation errors on empty
  name: z.string().optional(),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
  phone: z.string().optional(),
  invoiceReference: z.string().optional(),
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
  name?: string;
  email?: string;
  phone?: string;
  invoiceReference?: string;
  timestamp: string;
};
