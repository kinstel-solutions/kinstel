import { z } from "zod";

export const auditLeadSchema = z.object({
  url: z.string().min(3, { message: "Please enter your website URL." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  source: z.string().optional(),
});

export type AuditLeadValues = z.infer<typeof auditLeadSchema>;
