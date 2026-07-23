import { z } from "zod";

export const quoteLeadSchema = z.object({
  // Step 1
  need: z.enum(["website", "platform", "marketing", "unsure"]),

  // Step 2 (website branch)
  websiteSize: z.string().optional(),
  addOns: z.array(z.string()).optional(),
  rush: z.boolean().optional(),

  // Step 2 (platform branch)
  platformType: z.string().optional(),

  // Step 2 (marketing branch)
  marketingChoice: z.string().optional(),

  // Step 3 — contact
  name: z.string().min(2, { message: "Please enter your name." }),
  businessName: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  source: z.string().optional(),

  // Step 4 — computed result (soft range only, never itemized)
  rangeLow: z.number().optional(),
  rangeHigh: z.number().optional(),
  resultSummary: z.string().optional(),
});

export type QuoteLeadValues = z.infer<typeof quoteLeadSchema>;
