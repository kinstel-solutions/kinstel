import { z } from "zod";

export const inquirySchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    businessName: z.string().optional(),
    email: z
      .string()
      .email({ message: "Please enter a valid email address." })
      .optional(),
    phone: z.string().optional(),
    subject: z
      .string()
      .min(5, { message: "Subject must be at least 5 characters." })
      .optional(),
    details: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.email && !data.phone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide either an email or a phone number.",
        path: ["email"],
      });
    }
  });

export type InquiryFormValues = z.infer<typeof inquirySchema>;
