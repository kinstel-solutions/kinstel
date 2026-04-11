
import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
    title: 'Kinstel Solutions | Shipping & Delivery Policy',
    robots: {
        index: false,
        follow: false,
    },
};

export default function ShippingPolicyPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
                <div className="prose prose-invert max-w-none mx-auto">
                    <h1>Delivery & Shipping Policy</h1>
                    <p>Last updated: April 12, 2026</p>

                    <h2>1. Nature of Our Services</h2>
                    <p>
                        Kinstel Solutions is a digital service provider specializing in web design, web development, and other digital solutions. We do not sell, ship, or deliver any physical products. All our services and deliverables are provided electronically.
                    </p>

                    <h2>2. Service Delivery Method</h2>
                    <p>
                        The delivery of our services is conducted entirely through digital means. Final project deliverables, such as a completed website, are deployed to a web hosting server that is mutually agreed upon by Kinstel Solutions and the client.
                    </p>
                    <p>
                        Upon project completion and final payment, all necessary credentials, source code, and administrative access will be transferred to the client through secure digital channels (e.g., encrypted email, secure cloud storage).
                    </p>

                    <h2>3. Delivery Timeline</h2>
                    <p>
                        Since our services are project-based, there is no fixed delivery timeline applicable to all projects. Specific delivery timelines, milestones, and project phases will be clearly defined and agreed upon in the formal project agreement signed by both parties before any work begins.
                    </p>

                    <h2>4. Confirmation of Delivery</h2>
                    <p>
                        A service is considered "delivered" when the final deliverables have been deployed to the live server and the client has been provided with the administrative access required to control the website or digital asset.
                    </p>
                    
                    <h2>5. No Shipping Fees or Physical Delivery</h2>
                    <p>
                        Kinstel Solutions provides digital services only. No physical shipping is involved. Service delivery is completed via email or secure cloud transfer as per project milestones. As we exclusively provide digital services, there are no shipping fees, handling charges, or physical delivery involved. All communication, work-in-progress reviews, and final deliveries are managed electronically.
                    </p>

                    <p className="mt-8">
                        If you have any questions regarding our Delivery Policy, please contact us at <a href="mailto:contact@kinstel.com">contact@kinstel.com</a>.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
