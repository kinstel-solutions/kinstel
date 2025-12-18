import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Palette, Rocket, CheckCircle } from 'lucide-react';

interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ServicesProps {
    subHeading: string;
    heading: React.ReactNode;
    description: string;
    items: ServiceItem[];
}

const defaultServices: ServiceItem[] = [
  {
    icon: <Palette className="h-8 w-8 text-accent" />,
    title: 'Custom Web Design',
    description: 'We create unique, professional websites that reflect your brand and vision.',
  },
  {
    icon: <Rocket className="h-8 w-8 text-accent" />,
    title: 'Responsive Development',
    description: 'We build fast, mobile-friendly websites that work perfectly on all devices.',
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-accent" />,
    title: 'Performance & SEO',
    description: 'Our websites are optimized for speed and search engines to help you reach a wider audience.',
  },
];

export function ServicesSection({
    subHeading,
    heading,
    description,
    items
}: ServicesProps) {
  return (
    <section id="services" className="bg-background py-20 sm:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-wider text-accent">{subHeading}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {heading}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {items.map((service, index) => (
            <Card key={index} className="flex flex-col text-left p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg animate-in fade-in slide-in-from-bottom-5" style={{animationDelay: `${index * 150}ms`, animationFillMode: 'backwards'}}>
              <CardHeader className="p-0">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  {service.icon}
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 mt-2">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <ServicesSection
        subHeading="Designed for Growth"
        heading={<>Modern <span className="text-accent">Web Design</span> Services</>}
        description="We build beautiful, high-performing websites that are designed to convert visitors into customers. Every project is built around speed, simplicity, and strategic design."
        items={defaultServices}
    />
  );
}
