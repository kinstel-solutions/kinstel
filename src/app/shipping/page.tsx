
import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
    title: 'Kinstel Solutions | Shipping & Delivery Policy',
    robots: {
        index: true,
        follow: true,
    },
};

export default function ShippingPolicyPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
                <div className="prose prose-invert max-w-none mx-auto">
                    <h1>Delivery & Shipping Policy</h1>
                    <p>Last updated: July 29, 2026</p>

                    <h2>1. Nature of Our Services</h2>
                    <p>
                        Kinstel Solutions is a digital service provider specializing in web design, web development, custom software engineering, and digital marketing. We do not sell, ship, or deliver any physical products. All our services and deliverables are provided electronically.
                    </p>

                    <h2>2. Service Delivery Method</h2>
                    <p>
                        The delivery of our services is conducted entirely through digital means. Final project deliverables, such as a completed website, software platform, or code repository, are deployed to a web hosting server or transferred directly to the client as mutually agreed upon.
                    </p>
                    <p>
                        Upon project completion and final payment, all necessary credentials, source code, and administrative access will be transferred to the client through secure digital channels (e.g., encrypted email, secure cloud storage, GitHub).
                    </p>

                    <h2>3. Delivery Timeline & SLA</h2>
                    <p>
                        Specific delivery timelines and milestones are clearly defined in the project agreement signed by both parties before work begins. Standard websites and landing pages are delivered electronically within 3 to 5 business days, while enterprise web platforms typically take 3 to 6 weeks depending on scope.
                    </p>

                    <h2>4. Confirmation of Delivery</h2>
                    <p>
                        A service is considered "delivered" when final deliverables have been deployed to the live server and the client has been provided with administrative access or code transfer receipt.
                    </p>
                    
                    <h2>5. Zero Physical Shipping Fees</h2>
                    <p>
                        As we exclusively provide 100% digital services, there are no shipping fees, handling charges, or physical freight involved. All work-in-progress reviews, milestone checks, and final deliveries are managed electronically.
                    </p>

                    <p className="mt-8">
                        For delivery or technical support queries, please contact our team at <a href="mailto:support@kinstel.com">support@kinstel.com</a> (or <a href="mailto:contact@kinstel.com">contact@kinstel.com</a>).
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
