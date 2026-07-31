import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
    title: 'Terms & Conditions',
    description: 'Terms and Conditions for using Kinstel Solutions services and website.',
    alternates: {
        canonical: '/terms-and-conditions',
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function TermsAndConditionsPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
                <div className="prose prose-invert max-w-none mx-auto">
                    <h1>Terms & Conditions</h1>
                    <p>Last updated: July 29, 2026</p>
                    <p>
                        Please read these terms and conditions carefully before using our services.
                    </p>

                    <h2>1. Agreement to Terms</h2>
                    <p>
                        By engaging Kinstel Solutions for our web design, web development, custom software engineering, and digital marketing services, you agree to be bound by these Terms & Conditions.
                    </p>

                    <h2>2. Services & Scope</h2>
                    <p>
                        Kinstel Solutions provides web design, web development, software engineering, and digital solutions for modern businesses worldwide. All project deliverables, timelines, and technical requirements are detailed in a formal project agreement, scope of work (SOW), or proposal provided to you before work commences.
                    </p>

                    <h2>3. Payments & Currency Processing</h2>
                    <p>
                        Project fees and milestone payment schedules are outlined in your project proposal or invoice. We accept payments in multiple currencies (including INR, USD, EUR, GBP, AUD, CAD) processed securely via integrated payment gateways (such as Razorpay and PayPal), international credit/debit cards, and direct international bank wire transfers. Approved refunds are processed within 7-10 working days.
                    </p>

                    <h2>4. Intellectual Property</h2>
                    <p>
                        Upon final payment, you will own full intellectual property rights to the completed custom website design, code, and digital assets created for your project. Kinstel Solutions retains ownership of proprietary internal frameworks and reserves the right to showcase completed work in our portfolio.
                    </p>

                    <h2>5. Limitation of Liability</h2>
                    <p>
                        Kinstel Solutions shall not be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use our digital services.
                    </p>

                    <h2>6. Governing Law & Dispute Resolution</h2>
                    <p>
                        These terms shall be governed by the laws of India, and any legal disputes will be subject to the exclusive jurisdiction of the courts in Lucknow, Uttar Pradesh, India.
                    </p>

                    <h2>7. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these terms at any time. Updated versions will be posted on our website with an updated revision date.
                    </p>

                    <h2>8. Promotional Offers & Complimentary Services</h2>
                    <p>
                        From time to time, Kinstel Solutions may offer complimentary services, including Annual Maintenance Contracts (AMC) and Web Hosting, as part of a promotional package.
                    </p>
                    <ul>
                        <li>
                            <strong>Promotional AMC:</strong> Subject to our Reasonable Usage Policy (maximum 2-3 minor content updates per month, capped at 60 developer minutes).
                        </li>
                        <li>
                            <strong>Promotional Hosting:</strong> Standard server infrastructure. Upgrades available for global CDN edge deployment.
                        </li>
                        <li>
                            <strong>Value & Liability:</strong> Provided as-is, non-transferable, and holds no cash surrender value.
                        </li>
                    </ul>

                    <h2>9. International Clients & Cross-Border Remittance Terms</h2>
                    <p>
                        For international clients located outside India:
                    </p>
                    <ul>
                        <li>
                            <strong>Service Classification & Export Purpose Code:</strong> Our services are classified under RBI Export Purpose Code <strong>P0802 (Software Consultancy & Web Development / Design Services)</strong> and <strong>P0807 (Digital Marketing & Advertising Services)</strong>.
                        </li>
                        <li>
                            <strong>Invoicing & FIRC Compliance:</strong> Invoices are issued electronically in foreign currency (USD, EUR, GBP, AUD, CAD) or INR equivalent. Foreign inward remittances are settled in compliance with Reserve Bank of India (RBI) Foreign Exchange Management Act (FEMA) guidelines. Foreign Inward Remittance Advice / Certificates (FIRC) are issued where applicable.
                        </li>
                        <li>
                            <strong>Zero-Rated Service Export GST:</strong> Digital services exported to international entities are zero-rated for Goods and Services Tax (GST) under Indian tax regulations, provided valid proof of export payment is received.
                        </li>
                        <li>
                            <strong>Service Delivery SLA:</strong> Standard digital deliverables (websites, landing pages, code repositories) are delivered electronically within 3 to 5 business days for core packages, or as per mutually agreed milestone schedules for enterprise applications.
                        </li>
                    </ul>

                    <h2>10. Department Contact Directory</h2>
                    <p>
                        For questions regarding these terms, invoices, or project contracts, please contact the appropriate department:
                    </p>
                    <ul>
                        <li><strong>Sales & Project Proposals:</strong> <a href="mailto:sales@kinstel.com">sales@kinstel.com</a></li>
                        <li><strong>Billing & International Remittances:</strong> <a href="mailto:payments@kinstel.com">payments@kinstel.com</a></li>
                        <li><strong>Technical & Client Support:</strong> <a href="mailto:support@kinstel.com">support@kinstel.com</a></li>
                        <li><strong>Legal & Compliance:</strong> <a href="mailto:legal@kinstel.com">legal@kinstel.com</a></li>
                        <li><strong>General Inquiries:</strong> <a href="mailto:contact@kinstel.com">contact@kinstel.com</a></li>
                    </ul>
                </div>
            </main>
            <Footer />
        </div>
    );
}
