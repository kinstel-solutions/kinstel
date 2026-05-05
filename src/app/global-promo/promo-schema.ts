import { z } from "zod";

/**
 * Service options available in the multiselect icon grid.
 * Kept as a const array so both schema and UI can reference the same values.
 */
export const SERVICE_OPTIONS = [
  "New Website",
  "Redesign",
  "E-commerce",
  "SaaS / Web App",
  "Landing Page",
  "Other",
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

/**
 * Hero form schema — 3 fields (name, email, services).
 * Designed for maximum above-the-fold conversions.
 */
export const promoHeroSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Please enter a valid email address.",
    }),
  services: z
    .array(z.string())
    .min(1, { message: "Please select at least one service." }),
});

/**
 * Full form schema — 5 fields (name, email, phone, services, message).
 * Used in the final CTA section for qualified leads.
 */
export const promoFullSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Please enter a valid email address.",
    }),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[0-9\s\-()]{7,20}$/.test(val), {
      message: "Please enter a valid phone number.",
    }),
  services: z
    .array(z.string())
    .min(1, { message: "Please select at least one service." }),
  message: z.string().optional(),
});

export type PromoHeroFormValues = z.infer<typeof promoHeroSchema>;
export type PromoFullFormValues = z.infer<typeof promoFullSchema>;
