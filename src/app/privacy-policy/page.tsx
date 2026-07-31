import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Privacy Policy for Kinstel Solutions — how we collect, use, and protect your personal information.',
    alternates: {
        canonical: '/privacy-policy',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function PrivacyPolicyPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
                <div className="prose prose-invert max-w-none mx-auto">
                    <h1>Privacy Policy</h1>
                    <p>Last updated: July 29, 2026</p>
                    <p>
                        This Privacy Policy describes how Kinstel Solutions (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
                        collects, uses, and discloses your personal information when you visit our
                        website (https://www.kinstel.com) or use our services.
                    </p>

                    <h2>1. Information We Collect</h2>
                    <p>
                        We collect personal information you provide to us directly when you fill out our contact
                        form or communicate with us. This information may include:
                    </p>
                    <ul>
                        <li>Name and business entity details</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Details about your project inquiry or billing requirements</li>
                    </ul>

                    <h2>2. Use of Your Information</h2>
                    <p>
                        The information we collect is used solely to respond to your inquiries, provide you with
                        quotes, process billing/invoices, and deliver the services you have requested. We do not use your information for
                        unsolicited marketing purposes without your explicit consent.
                    </p>

                    <h2>3. Data Storage, Security & International Transfers</h2>
                    <p>
                        We are committed to ensuring that your information is secure. We take reasonable
                        precautions and employ 256-bit SSL encryption to protect your personal information from loss, misuse, and unauthorized
                        access. All cross-border project data and communications adhere to strict data security protocols.
                    </p>

                    <h2>4. Payment Processing</h2>
                    <p>
                        We use secure, PCI-DSS compliant third-party payment processors (including Razorpay and PayPal). When you make a payment via international card, PayPal, or bank wire transfer, your payment details are encrypted and handled directly by the payment processor. We do not store sensitive payment card numbers on our servers.
                    </p>

                    <h2>5. Third-Party Disclosure</h2>
                    <p>
                        We do not sell, trade, or otherwise transfer your personally identifiable information to
                        outside parties.
                    </p>

                    <h2>6. Your Rights & Department Contacts</h2>
                    <p>
                        You have the right to access, correct, or delete your personal information. For privacy or legal inquiries, please contact our dedicated departments:
                    </p>
                    <ul>
                        <li><strong>Legal & Privacy Enquiries:</strong> <a href="mailto:legal@kinstel.com">legal@kinstel.com</a></li>
                        <li><strong>Technical & Client Support:</strong> <a href="mailto:support@kinstel.com">support@kinstel.com</a></li>
                        <li><strong>General Enquiries:</strong> <a href="mailto:contact@kinstel.com">contact@kinstel.com</a></li>
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    );
}
