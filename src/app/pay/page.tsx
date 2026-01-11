import { type Metadata } from 'next';
import PaymentForm from './components/payment-form';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ShieldCheck, Zap, Mail } from 'lucide-react';

/**
 * SEO Metadata for Quick Pay page
 */
export const metadata: Metadata = {
  title: 'Quick Pay - Kinstel Solutions',
  description: 'Make instant payments to Kinstel Solutions using Razorpay. Secure and fast payment processing for your invoices.',
};

/**
 * Quick Pay Page
 * Allows clients to manually enter invoice amounts and pay via Razorpay
 */
export default function QuickPayPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-16 md:py-24">
        {/* Header Section */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground font-headline">
            Quick Pay
          </h1>
          <p className="text-lg text-muted-foreground">
            Make secure payments to Kinstel Solutions instantly. Enter your invoice amount and complete payment in seconds.
          </p>
        </div>

        {/* Payment Form Card */}
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8 md:p-12 max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-accent"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-foreground">Payment Details</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              All payments are processed securely through Razorpay. You&apos;ll receive a receipt via email once payment is complete.
            </p>
          </div>

          {/* Payment Form Component */}
          <PaymentForm />
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="p-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="font-semibold mb-1 text-foreground">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">
                Bank-grade encryption
              </p>
            </div>

            <div className="p-4">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-1 text-foreground">Instant Processing</h3>
              <p className="text-sm text-muted-foreground">
                Payments processed in seconds
              </p>
            </div>

            <div className="p-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="h-6 w-6 text-purple-500" />
              </div>
              <h3 className="font-semibold mb-1 text-foreground">Email Receipt</h3>
              <p className="text-sm text-muted-foreground">
                PDF receipt sent instantly
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Environment variable script for client-side Razorpay key */}
      <script
        dangerouslySetInnerHTML={{
          __html: `window.NEXT_PUBLIC_RAZORPAY_KEY_ID = "${process.env.RAZORPAY_KEY_ID}";`,
        }}
      />
    </div>
  );
}
