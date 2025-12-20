import { SmartCtaButton } from "../ui/smart-cta-button";

interface CallToActionProps {
    subHeading: string;
    heading: string;
    description: string;
    buttonText: string;
}

export function CallToActionSection({
    subHeading,
    heading,
    description,
    buttonText
}: CallToActionProps) {
    return (
        <section id="contact" className="bg-background py-20 sm:py-28">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <p className="font-semibold uppercase tracking-wider text-accent">{subHeading}</p>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        {heading}
                    </h2>
                    <p className="mt-6 text-lg text-muted-foreground">
                        {description}
                    </p>
                    <div className="mt-10">
                        <SmartCtaButton 
                            phoneNumber="+919889988408" 
                            email="contact@kinstel.com"
                            size="lg"
                            className="shadow-lg shadow-accent/20"
                        >
                            {buttonText}
                        </SmartCtaButton>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function CallToAction() {
    return (
        <CallToActionSection
            subHeading="Let's Get Started"
            heading="Ready to Grow Your Business?"
            description="Your website is your most important marketing asset. Partner with a trusted web design agency to build a website that drives results. Get a free quote to get started."
            buttonText="Request a Free Quote"
        />
    );
}
