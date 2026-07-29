import { z } from "zod";

export const careerApplicationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(8, "Please enter a valid phone number."),
  role: z.string().min(1, "Please select or specify a role."),
  experience: z.string().optional(),
  location: z.string().optional(),
  portfolioUrl: z.string().url("Please enter a valid URL (e.g. https://...)").optional().or(z.literal("")),
  resumeUrl: z.string().min(5, "Please provide a valid link to your Resume / CV (Drive, Notion, Dropbox, etc.)."),
  coverLetter: z.string().min(10, "Please include a brief intro or why you'd like to join Kinstel (at least 10 characters)."),
});

export type CareerApplicationValues = z.infer<typeof careerApplicationSchema>;
