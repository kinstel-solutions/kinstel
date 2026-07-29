'use server';

import { Resend } from 'resend';
import { inquirySchema, type InquiryFormValues } from '@/app/inquiry-schema';
import InquiryNotificationEmail from '@/emails/inquiry-notification-email';
import UserConfirmationEmail from '@/emails/user-confirmation-email';
import { auditLeadSchema, type AuditLeadValues } from '@/app/audit-schema';
import AuditLeadNotificationEmail from '@/emails/audit-lead-notification-email';
import { quoteLeadSchema, type QuoteLeadValues } from '@/app/quote-schema';
import QuoteLeadNotificationEmail from '@/emails/quote-lead-notification-email';
import { careerApplicationSchema, type CareerApplicationValues } from '@/app/careers/schema';
import CareerApplicationEmail from '@/emails/career-application-email';

const fromEmail = process.env.EMAIL_FROM;
const toEmails = process.env.EMAIL_TO?.split(',') || [];

export async function submitInquiryAction(data: InquiryFormValues) {
  // 1. Validate form data
  const parsed = inquirySchema.safeParse(data);

  if (!parsed.success) {
    const errorMessages = parsed.error.issues.map(issue => issue.message).join(', ');
    return { success: false, message: `Invalid input: ${errorMessages}` };
  }

  const { name, email } = parsed.data;

  // 2. Ensure environment variables are loaded
  if (!process.env.RESEND_API_KEY) {
     console.error('Missing RESEND_API_KEY environment variable.');
     return { success: false, message: 'Server configuration error: Missing API Key.' };
  }
  
  if (!fromEmail || toEmails.length === 0) {
    console.error('Missing environment variables for sending email.');
    return { success: false, message: 'Server configuration error. Could not send email.' };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    // 3. Send emails
    const promises: Promise<any>[] = [];

    // Promise for Email to Admins (always sent)
    promises.push(resend.emails.send({
      from: fromEmail,
      to: toEmails,
      subject: `New Inquiry from ${name}`,
      react: InquiryNotificationEmail(parsed.data),
    }));

    // Promise for Email to User (only if email is provided)
    if (email) {
      promises.push(resend.emails.send({
        from: fromEmail,
        to: email,
        subject: 'We have received your inquiry',
        react: UserConfirmationEmail({ name }),
      }));
    }
    
    const results = await Promise.all(promises);

    // Check for errors in any of the sent emails
    for (const result of results) {
      if (result.error) {
        console.error('Failed to send an email:', result.error);
        throw new Error('A failure occurred while sending emails.');
      }
    }

    return { success: true, message: 'Thank you for your inquiry! We will get back to you shortly.' };

  } catch (error) {
    console.error('Error submitting inquiry:', error);
    return { success: false, message: 'Something went wrong on our end. Please try again later.' };
  }
}

/**
 * Captures a lead from the free Website Audit tool. This is best-effort:
 * the audit itself should still run and render for the user even if the
 * notification email fails to send (e.g. missing Resend config locally).
 */
export async function submitAuditLead(data: AuditLeadValues) {
  const parsed = auditLeadSchema.safeParse(data);

  if (!parsed.success) {
    const errorMessages = parsed.error.issues.map(issue => issue.message).join(', ');
    return { success: false, message: `Invalid input: ${errorMessages}` };
  }

  if (!process.env.RESEND_API_KEY || !fromEmail || toEmails.length === 0) {
    console.error('Missing email environment variables; skipping audit lead notification.');
    // Don't block the audit tool just because email isn't configured.
    return { success: true, message: 'Lead captured (email notification skipped).' };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmails,
      subject: `New Website Audit lead: ${parsed.data.url}`,
      react: AuditLeadNotificationEmail(parsed.data),
    });

    if (result.error) {
      console.error('Failed to send audit lead notification email:', result.error);
    }
  } catch (error) {
    console.error('Error submitting audit lead:', error);
  }

  // Always resolve successfully so the audit report still renders for the user.
  return { success: true, message: 'Lead captured.' };
}

/**
 * Captures a lead from the interactive Quote Builder tool. Best-effort, like
 * the audit lead: the result screen should still render for the user even if
 * the notification email fails to send. Only the soft {low, high} range is
 * ever passed in — never a full itemized breakdown.
 */
export async function submitQuoteLead(data: QuoteLeadValues) {
  const parsed = quoteLeadSchema.safeParse(data);

  if (!parsed.success) {
    const errorMessages = parsed.error.issues.map(issue => issue.message).join(', ');
    return { success: false, message: `Invalid input: ${errorMessages}` };
  }

  if (!process.env.RESEND_API_KEY || !fromEmail || toEmails.length === 0) {
    console.error('Missing email environment variables; skipping quote lead notification.');
    return { success: true, message: 'Lead captured (email notification skipped).' };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmails,
      subject: `New Quote Builder lead: ${parsed.data.name}`,
      react: QuoteLeadNotificationEmail(parsed.data),
    });

    if (result.error) {
      console.error('Failed to send quote lead notification email:', result.error);
    }
  } catch (error) {
    console.error('Error submitting quote lead:', error);
  }

  // Always resolve successfully so the result screen still renders for the user.
  return { success: true, message: 'Lead captured.' };
}

/**
 * Submits a candidate application from the Careers page.
 * Validates candidate input and sends notification email to hiring team via Resend.
 */
export async function submitCareerApplicationAction(data: CareerApplicationValues) {
  const parsed = careerApplicationSchema.safeParse(data);

  if (!parsed.success) {
    const errorMessages = parsed.error.issues.map(issue => issue.message).join(', ');
    return { success: false, message: `Invalid input: ${errorMessages}` };
  }

  if (!process.env.RESEND_API_KEY || !fromEmail || toEmails.length === 0) {
    console.error('Missing email environment variables; skipping career application notification email.');
    return { success: true, message: 'Application received successfully!' };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmails,
      subject: `New Career Application: ${parsed.data.fullName} - ${parsed.data.role}`,
      react: CareerApplicationEmail(parsed.data),
    });

    if (result.error) {
      console.error('Failed to send career application email:', result.error);
      return { success: false, message: 'Failed to send application notification email. Please try again.' };
    }
  } catch (error) {
    console.error('Error submitting career application:', error);
    return { success: false, message: 'Something went wrong while submitting your application. Please try again.' };
  }

  return { success: true, message: 'Application submitted successfully! Our team will review your application and be in touch.' };
}

