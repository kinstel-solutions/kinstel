import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
    title: 'Kinstel Solutions | Terms & Conditions',
    robots: {
        index: false,
        follow: false,
    },
};

export default function TermsAndConditionsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
                <div className="prose prose-invert max-w-none mx-auto">
                    <h1>Terms & Conditions</h1>
                    <p>Last updated: July 29, 2024</p>
                    <p>
                        Please read these terms and conditions carefully before using our services.
                    </p>

                    <h2>1. Agreement to Terms</h2>
                    <p>
                        By engaging Kinstel Solutions for our web design and development services, you agree to be
                        bound by these Terms & Conditions.
                    </p>

                    <h2>2. Services</h2>
                    <p>
                        Kinstel Solutions provides web design, web development, and other digital solutions for
                        lawyers and law firms. All services will be outlined in a formal project-based agreement
                        or proposal provided to you before work commences.
                    </p>

                    <h2>3. Payments</h2>
                    <p>
                        Project fees and payment schedules will be detailed in the project agreement. We accept
                        payments through our secure payment gateway, Razorpay. All payments are subject to the
                        terms and conditions of Razorpay.
                    </p>

                    <h2>4. Intellectual Property</h2>
                    <p>
                        Upon final payment, you will own the intellectual property rights to the final website
                        design and code. We reserve the right to showcase the completed work in our portfolio.
                    </p>

                    <h2>5. Limitation of Liability</h2>
                    <p>
                        Kinstel Solutions shall not be liable for any indirect, incidental, or consequential
                        damages arising out of the use of our services.
                    </p>

                    <h2>6. Governing Law</h2>
                    <p>
                        These terms shall be governed by the laws of India, and any disputes will be subject to
                        the jurisdiction of the courts in Lucknow, Uttar Pradesh.
                    </p>

                    <h2>7. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these terms at any time. We will notify clients of any
                        significant changes.
                    </p>
                    <h2>8. Promotional Offers & Complimentary Services</h2>
                    <p>
                        From time to time, Kinstel Solutions may offer complimentary services, including but not limited to, Annual Maintenance Contracts (AMC) and Web Hosting, as part of a promotional package. 
                    </p>
                    <ul>
                        <li>
                            <strong>Promotional AMC:</strong> Complimentary maintenance is strictly limited to our "Reasonable Usage" policy, defined as a maximum of 2-3 minor content updates per month (totaling no more than 60 minutes of developer time). It does not cover structural redesigns, new feature development, or custom Next.js component creation.
                        </li>
                        <li>
                            <strong>Promotional Hosting:</strong> Unless otherwise specified, complimentary hosting provisions our standard server infrastructure optimized for the Indian region. Clients requiring international reach are encouraged to upgrade to our Enterprise Global CDN plans.
                        </li>
                        <li>
                            <strong>Value & Liability:</strong> Promotional services are provided "as-is" for the specified duration, hold no cash surrender value, and cannot be exchanged for other services or discounts. Kinstel Solutions reserves the right to terminate promotional services if usage exceeds reasonable boundaries or violates our core terms.
                        </li>
                    </ul>

                    <p className="mt-8">
                        For queries, reach out at <a href="mailto:contact@kinstel.com">contact@kinstel.com</a>.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
