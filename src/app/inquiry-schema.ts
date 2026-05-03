import { z } from "zod";

export const inquirySchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    // businessName: z.string().optional(),
    email: z
      .string()
      .optional()
      .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: "Please enter a valid email address.",
      }),
    phone: z
      .string()
      .optional()
      .refine((val) => !val || /^\+?[0-9\s\-()]{7,20}$/.test(val), {
        message: "Please enter a valid phone number.",
      }),
    // subject: z.string().optional(),
    details: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.email && !data.phone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide either an email or a phone number.",
        path: ["email"],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide either an email or a phone number.",
        path: ["phone"],
      });
    }
  });

export type InquiryFormValues = z.infer<typeof inquirySchema>;
