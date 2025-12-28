'use server';

import { Resend } from 'resend';
import { inquirySchema, type InquiryFormValues } from '@/app/inquiry-schema';
import InquiryNotificationEmail from '@/emails/inquiry-notification-email';
import UserConfirmationEmail from '@/emails/user-confirmation-email';

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
