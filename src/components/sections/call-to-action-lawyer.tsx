import { SmartCtaButton } from "../ui/smart-cta-button";

export function CallToActionLawyer() {
    return (
        <section id="contact" className="bg-secondary py-20 sm:py-28">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <p className="font-semibold uppercase tracking-wider text-accent">Let's Get Started</p>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Start Your Legal Marketing Strategy Today
                    </h2>
                    <p className="mt-6 text-lg text-muted-foreground">
                        Your website should work as hard as you do. Partner with a trusted legal marketing firm and get expert SEO for lawyers. Book a free consultation to get started.
                    </p>
                    <div className="mt-10">
                        <SmartCtaButton 
                            phoneNumber="+919889988408" 
                            email="contact@kinstel.com"
                            size="lg"
                            className="shadow-lg shadow-primary/20"
                        >
                            Request a Free Quote
                        </SmartCtaButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
