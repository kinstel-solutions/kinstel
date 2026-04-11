import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
    title: 'Kinstel Solutions | Privacy Policy',
    robots: {
        index: false,
        follow: false,
    },
};

export default function PrivacyPolicyPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
                <div className="prose prose-invert max-w-none mx-auto">
                    <h1>Privacy Policy</h1>
                    <p>Last updated: April 12, 2026</p>
                    <p>
                        This Privacy Policy describes how Kinstel Solutions (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
                        collects, uses, and discloses your personal information when you visit our
                        website (https://kinstel.com) or use our services.
                    </p>

                    <h2>1. Information We Collect</h2>
                    <p>
                        We collect personal information you provide to us directly when you fill out our contact
                        form or communicate with us. This information may include:
                    </p>
                    <ul>
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Details about your project inquiry</li>
                    </ul>

                    <h2>2. Use of Your Information</h2>
                    <p>
                        The information we collect is used solely to respond to your inquiries, provide you with
                        quotes, and deliver the services you have requested. We do not use your information for
                        marketing purposes without your explicit consent.
                    </p>

                    <h2>3. Data Storage and Security</h2>
                    <p>
                        We are committed to ensuring that your information is secure. We take reasonable
                        precautions to protect your personal information from loss, misuse, and unauthorized
                        access.
                    </p>

                    <h2>4. Payment Processing</h2>
                    <p>
                        We use secure third-party payment processors. When you make a payment, your payment
                        details are provided directly to them. We do not collect or store your payment card
                        details. We encourage you to review the payment processor's privacy policy to understand how they
                        handle your payment information. All data is protected via industry-standard SSL/TLS encryption during transit.
                    </p>

                    <h2>5. Third-Party Disclosure</h2>
                    <p>
                        We do not sell, trade, or otherwise transfer your personally identifiable information to
                        outside parties.
                    </p>

                    <h2>6. Your Rights</h2>
                    <p>
                        You have the right to access, correct, or delete your personal information. Please contact
                        us if you wish to exercise these rights.
                    </p>

                    <p className="mt-8">
                        For queries, reach out at <a href="mailto:contact@kinstel.com">contact@kinstel.com</a>.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
