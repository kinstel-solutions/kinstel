import { type Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { JsonLd } from '@/components/seo/json-ld';
import { BankDetailsCards } from './components/bank-details-cards';
import {
  ShieldCheck,
  Zap,
  Lock,
  Globe,
  CreditCard,
  Building2,
  FileCheck,
  HelpCircle,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Payment Methods & Global Remittance Accounts | Kinstel Solutions',
  description:
    'Pay Kinstel Solutions via local bank transfers in USD (ACH/FedWire), GBP (BACS), EUR (SEPA), AUD (EFT), CAD, INR, or major credit cards and PayPal. Zero SWIFT wire fees.',
  alternates: {
    canonical: 'https://www.kinstel.com/payment-methods',
  },
  openGraph: {
    title: 'Payment Methods & Global Remittance Accounts | Kinstel Solutions',
    description:
      'Frictionless local bank transfers in USD, GBP, EUR, AUD, CAD, INR and instant online card payments.',
    url: 'https://www.kinstel.com/payment-methods',
    siteName: 'Kinstel',
    images: [
      {
        url: '/social-assets/home-og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Kinstel Payment Methods',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Payment Methods | Kinstel Solutions',
    description: 'Local ACH, SEPA, BACS, EFT and credit card payments for Kinstel clients worldwide.',
    images: ['/social-assets/home-og-image.webp'],
  },
};

const faqItems = [
  {
    question: 'How can international clients pay Kinstel Solutions?',
    answer:
      'Kinstel Solutions accepts local bank transfers in major global currencies including US ACH Direct Debit / FedWire (USD), UK BACS & Faster Payments (GBP), European Union SEPA Credit Transfers (EUR), Australian Domestic EFT (AUD), Canadian Direct Deposit (CAD), and Indian UPI / NEFT (INR). We also support all major international credit/debit cards (Visa, Mastercard, AMEX) and PayPal.',
  },
  {
    question: 'Do international wire transfers incur SWIFT intermediary bank fees?',
    answer:
      'No! By using our Razorpay MoneySaver local receiving accounts, clients in the US, UK, Europe, Australia, and Canada can transfer funds using standard domestic bank transfers. This bypasses cross-border SWIFT intermediary bank fees, saving you $30–$50 per transfer.',
  },
  {
    question: 'How fast do local bank transfers clear?',
    answer:
      'UK Faster Payments, EU SEPA Instant, and Indian UPI / NEFT transfers clear almost instantly. US ACH and Australian EFT transfers typically clear within 1 business day.',
  },
  {
    question: 'How do I receive an official invoice receipt for tax and accounting?',
    answer:
      'Every payment processed with Kinstel automatically triggers an official itemized invoice receipt sent directly to your registered billing email. For foreign currency remittances, an e-FIRC (Foreign Inward Remittance Certificate) is issued for zero-rated export tax compliance.',
  },
  {
    question: 'What reference should I include when making a bank transfer?',
    answer:
      'Please include your Invoice Number (e.g. INV-1042) or your Company Name in the transfer reference/memo field so our accounting team can reconcile your payment instantly.',
  },
];

export default function PaymentMethodsPage() {
  const jsonLdData = [
    {
      '@context': 'https://schema.org',
      '@type': 'FinancialProduct',
      name: 'Kinstel Solutions Payment Methods & Global Remittance Portal',
      provider: {
        '@type': 'Organization',
        name: 'Kinstel Solutions',
        url: 'https://www.kinstel.com',
      },
      feesAndCommissionsSpecification: 'Zero SWIFT Intermediary Fees for Local Bank Transfers',
      paymentAccepted: 'Credit Card, ACH Direct Debit, Wire Transfer, SEPA, BACS, EFT, PayPal, UPI',
      currenciesAccepted: 'USD, EUR, GBP, AUD, CAD, INR',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <JsonLd data={jsonLdData} />
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12 md:py-20 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 bg-accent/10 border-accent/30 text-accent font-semibold px-4 py-1.5 rounded-full text-xs">
            🌐 Global Remittance & Payment Portal
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 tracking-tight text-foreground">
            Flexible, Frictionless Payment Methods
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Pay Kinstel Solutions seamlessly in your local currency via domestic ACH, SEPA, BACS, or credit card with <strong>$0 intermediary bank fees</strong>.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground font-medium">
            <span className="flex items-center gap-1 bg-muted px-3 py-1.5 rounded-full border border-border/40">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Bank-Grade 256-Bit SSL Encryption
            </span>
            <span className="flex items-center gap-1 bg-muted px-3 py-1.5 rounded-full border border-border/40">
              <FileCheck className="w-4 h-4 text-accent" /> Auto e-FIRC Tax Compliant
            </span>
            <span className="flex items-center gap-1 bg-muted px-3 py-1.5 rounded-full border border-border/40">
              <Zap className="w-4 h-4 text-amber-500" /> Instant Payment Receipts
            </span>
          </div>
        </div>

        {/* Quick Pay / Online Instant Cards CTA */}
        <div className="bg-gradient-to-r from-accent/10 via-background to-accent/5 rounded-2xl border border-accent/20 p-6 md:p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-bold font-headline">Need to Pay an Invoice Online Right Now?</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-xl">
              Pay instantly using major Credit Cards (Visa, Mastercard, AMEX) or PayPal via our secure Quick Pay checkout.
            </p>
          </div>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground flex-shrink-0 font-semibold shadow-md">
            <Link href="/pay" className="flex items-center gap-2">
              Instant Online Quick Pay <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold font-headline text-foreground flex items-center gap-2">
            <Building2 className="w-6 h-6 text-accent" /> Local Bank Transfer Routing Accounts
          </h2>
          <p className="text-sm text-muted-foreground">
            Select your country or currency below to view local routing details. Click <strong>Copy</strong> next to any field to copy it to your online banking portal.
          </p>
        </div>

        {/* Bank Details Cards Component */}
        <BankDetailsCards />

        {/* Trust & Compliance Features Grid */}
        <div className="mt-16 pt-12 border-t border-border/60">
          <h2 className="text-2xl font-bold font-headline text-center mb-8">
            Why Global Clients Trust Kinstel Solutions
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base">Pay Like a Local</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                No foreign wire fees or intermediary bank markups. Pay in USD, GBP, EUR, AUD, CAD, or INR directly from your local business bank account.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base">Instant e-FIRC & Compliance</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Receive automated Foreign Inward Remittance Certificates (e-FIRC) and zero-rated export invoices compliant with international accounting standards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base">256-Bit Bank Level Security</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All card payments and online checkouts are processed via PCI-DSS Level 1 compliant gateways (Razorpay & PayPal).
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 pt-12 border-t border-border/60">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-bold font-headline mb-2 flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-accent" /> Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted-foreground">
              Everything you need to know about international remittances, local bank transfers, and invoicing.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto space-y-3">
            {faqItems.map((item, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-xl px-4 bg-card">
                <AccordionTrigger className="text-sm font-semibold hover:no-underline py-4 text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-4">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>

      <Footer />
    </div>
  );
}
