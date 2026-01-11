'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Home, Mail } from 'lucide-react';
import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

/**
 * Success Page Content Component
 * Wrapped in Suspense boundary for useSearchParams
 */
function SuccessPageContent() {
  const searchParams = useSearchParams();
  
  const paymentId = searchParams.get('payment_id');
  const orderId = searchParams.get('order_id');
  const amount = searchParams.get('amount');

  const formattedAmount = amount 
    ? `₹${parseFloat(amount).toLocaleString('en-IN')}` 
    : 'N/A';

  const timestamp = new Date().toLocaleString('en-IN', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          {/* Success Card */}
          <div className="bg-card rounded-2xl shadow-lg border border-border p-8 md:p-12">
            {/* Success Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-full mb-4">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-green-500 mb-2 font-headline">
                Payment Successful!
              </h1>
              <p className="text-muted-foreground">
                Your payment has been processed successfully
              </p>
            </div>

            {/* Transaction Details */}
            <div className="border-t border-b border-border py-6 space-y-4">
              <h2 className="text-xl font-semibold mb-4 text-foreground">Transaction Details</h2>
              
              <div className="grid gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Amount Paid:</span>
                  <span className="text-2xl font-bold text-green-500">
                    {formattedAmount}
                  </span>
                </div>

                {paymentId && (
                  <div className="flex justify-between items-start">
                    <span className="text-muted-foreground">Payment ID:</span>
                    <span className="text-sm font-mono text-right break-all max-w-[60%] text-foreground">
                      {paymentId}
                    </span>
                  </div>
                )}

                {orderId && (
                  <div className="flex justify-between items-start">
                    <span className="text-muted-foreground">Order ID:</span>
                    <span className="text-sm font-mono text-right break-all max-w-[60%] text-foreground">
                      {orderId}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Date & Time:</span>
                  <span className="text-sm text-foreground">{timestamp}</span>
                </div>
              </div>
            </div>

            {/* Receipt Info */}
            <div className="mt-8 p-4 bg-accent/10 rounded-lg border border-accent/20">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Receipt Sent
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    If you provided an email address, a PDF receipt has been sent to your inbox. 
                    Please check your spam folder if you don&apos;t see it.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              <Link
                href="/"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Return to Home
              </Link>

              <Link
                href="/contact"
                className="w-full border border-border hover:bg-accent/5 text-foreground font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
              >
                Contact Support
              </Link>
            </div>

            {/* Support Text */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              For any queries regarding this payment, please contact us at{' '}
              <a
                href="mailto:payments@kinstel.com"
                className="text-accent hover:underline"
              >
                payments@kinstel.com
              </a>
            </p>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Save your transaction ID for future reference. Thank you for choosing Kinstel Solutions!
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

/**
 * Payment Success Page
 * Displays confirmation and transaction details after successful payment
 */
export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}
