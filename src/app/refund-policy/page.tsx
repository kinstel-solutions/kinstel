import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
    title: 'Kinstel Solutions | Cancellation & Refund Policy',
    robots: {
        index: false,
        follow: false,
    },
};

export default function RefundPolicyPage() {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-grow container mx-auto px-4 md:px-6 py-12">
                <div className="prose prose-invert max-w-none mx-auto">
                    <h1>Cancellation & Refund Policy</h1>
                    <p>Last updated: April 12, 2026</p>

                    <h2>1. Service Agreements</h2>
                    <p>
                        Kinstel Solutions operates on a project-based model where services (web design,
                        development, etc.) are detailed in a formal agreement. This agreement includes a
                        clear scope of work and a payment schedule.
                    </p>

                    <h2>2. Cancellation</h2>
                    <p>
                        Clients may request to cancel a project at any time by providing written notice to
                        contact@kinstel.com.
                    </p>
                    <p>
                        If a project is canceled before any work has commenced, any advance payment may be
                        eligible for a partial or full refund, determined on a case-by-case basis.
                    </p>

                    <h2>3. No Refunds After Work Commencement</h2>
                    <p>
                        Once work has commenced on a project (including but not limited to design mockups,
                        coding, or content creation), any fees paid are non-refundable. Our fees cover the
                        time, resources, and expertise dedicated to your project from its inception.
                    </p>
                    <p>
                        We do not offer refunds for services that have already been rendered or are in progress.
                    </p>

                    <h2>4. Project Abandonment</h2>
                    <p>
                        If we do not receive communication from the client for a period of 30 consecutive
                        days, the project will be considered abandoned, and any payments made will be forfeited.
                    </p>

                    <h2>5. Refund Timeline</h2>
                    <p>
                        Approved refunds will be initiated to the original payment method and will typically reflect in your account within 7 to 10 working days.
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
