# Environment Variables Setup for Quick Pay

This document outlines the required environment variables for the Quick Pay feature.

## Required Environment Variables

Add the following variables to your `.env.local` file:

```env
# Razorpay Configuration (Test Mode)
RAZORPAY_KEY_ID=rzp_test_S1rVLcVsuUqKY6
RAZORPAY_KEY_SECRET=boo0LUZiDW3YNW4XEyRDEUih

# Email Configuration (Resend API)
RESEND_API_KEY=your_resend_api_key_here
EMAIL_FROM=payments@kinstel.com
EMAIL_TO=contact@kinstel.com
```

## Variable Descriptions

### Razorpay Keys
- **RAZORPAY_KEY_ID**: Your Razorpay API Key ID (currently in test mode)
- **RAZORPAY_KEY_SECRET**: Your Razorpay API Secret (used for signature verification)

### Email Configuration
- **RESEND_API_KEY**: Your Resend API key for sending emails
- **EMAIL_FROM**: Sender email address (must be verified in Resend dashboard)
  - For payment receipts, use `payments@kinstel.com`
- **EMAIL_TO**: Admin notification email (optional for payments)

## Important Notes

1. **Test Mode**: The current Razorpay keys are in TEST mode. For production:
   - Replace with live keys from Razorpay dashboard
   - Ensure proper security measures are in place

2. **Email Sender Verification**: 
   - Verify `payments@kinstel.com` in your Resend account
   - Without verification, emails will fail to send

3. **Security**: 
   - Never commit `.env.local` to version control
   - Keep API secrets secure
   - Rotate keys regularly

4. **Client-Side Access**:
   - `RAZORPAY_KEY_ID` is automatically exposed to client via `next.config.ts`
   - No manual NEXT_PUBLIC_ prefix needed for this variable

## Testing

To test the payment flow:
1. Navigate to `/pay` route
2. Enter any amount between ₹10 and ₹5,00,000
3. Use Razorpay test card details:
   - Card: 4111 1111 1111 1111
   - CVV: Any 3 digits
   - Expiry: Any future date
