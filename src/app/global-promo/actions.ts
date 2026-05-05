"use server";

import { Resend } from "resend";
import {
  promoHeroSchema,
  promoFullSchema,
  type PromoHeroFormValues,
  type PromoFullFormValues,
} from "./promo-schema";
import InquiryNotificationEmail from "@/emails/inquiry-notification-email";
import UserConfirmationEmail from "@/emails/user-confirmation-email";

const fromEmail = process.env.EMAIL_FROM;
const toEmails = process.env.EMAIL_TO?.split(",") || [];

type PromoFormValues = PromoHeroFormValues | PromoFullFormValues;

/**
 * Server action for the /global-promo landing page.
 * - Tags all notification emails with [PMax] for easy source identification.
 * - Validates against hero or full schema based on field presence.
 * - Same Resend email pipeline as the main inquiry action.
 */
export async function submitPromoInquiryAction(data: PromoFormValues) {
  // Determine which schema to validate against
  const isFullForm = "phone" in data || "message" in data;
  const schema = isFullForm ? promoFullSchema : promoHeroSchema;

  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    const errorMessages = parsed.error.issues
      .map((issue) => issue.message)
      .join(", ");
    return { success: false, message: `Invalid input: ${errorMessages}` };
  }

  // Ensure environment variables are loaded
  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY environment variable.");
    return {
      success: false,
      message: "Server configuration error: Missing API Key.",
    };
  }

  if (!fromEmail || toEmails.length === 0) {
    console.error("Missing environment variables for sending email.");
    return {
      success: false,
      message: "Server configuration error. Could not send email.",
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, services } = parsed.data;
  const phone = "phone" in parsed.data ? parsed.data.phone : undefined;
  const message = "message" in parsed.data ? parsed.data.message : undefined;

  // Build a details string from services + optional message
  const servicesList = services.join(", ");
  const detailsText = [
    `Services: ${servicesList}`,
    message ? `Message: ${message}` : null,
    `Source: Google PMax Campaign (/global-promo)`,
  ]
    .filter(Boolean)
    .join("\n\n");

  try {
    // Admin notification — tagged with [PMax] for source identification
    const adminResult = await resend.emails.send({
      from: fromEmail,
      to: toEmails,
      subject: `[PMax] New Lead from ${name} — ${servicesList}`,
      react: InquiryNotificationEmail({
        name,
        email,
        phone,
        details: detailsText,
      }),
    });

    if (adminResult.error) {
      console.error("Failed to send admin notification:", adminResult.error);
      return {
        success: false,
        message: "Something went wrong on our end. Please try again later.",
      };
    }

    // User confirmation email — best-effort, don't fail the whole action
    if (email) {
      try {
        const userResult = await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: "We have received your inquiry — Kinstel",
          react: UserConfirmationEmail({ name }),
        });
        if (userResult.error) {
          console.error("User confirmation email failed (non-critical):", userResult.error);
        }
      } catch (confirmErr) {
        console.error("User confirmation email threw (non-critical):", confirmErr);
      }
    }

    return {
      success: true,
      message:
        "Thank you! Your free audit request has been received. We'll be in touch within 24 hours.",
    };
  } catch (error) {
    console.error("Error submitting promo inquiry:", error);
    return {
      success: false,
      message: "Something went wrong on our end. Please try again later.",
    };
  }
}
