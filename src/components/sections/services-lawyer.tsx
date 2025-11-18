import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Palette, Rocket, CheckCircle } from 'lucide-react';

const services = [
  {
    icon: <Palette className="h-8 w-8 text-accent" />,
    title: 'Credibility by Design',
    description: 'Our law firm website development process focuses on clean layouts and strong visuals that reflect your professionalism.',
  },
  {
    icon: <Rocket className="h-8 w-8 text-accent" />,
    title: 'Performance & SEO',
    description: 'We build blazing-fast, SEO-friendly websites designed to rank higher and convert visitors into clients.',
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-accent" />,
    title: 'Conversion-Focused UX',
    description: 'With a focus on user experience and SEO for lawyers, our designs ensure visitors can easily take action.',
  },
];

export function ServicesLawyer() {
  return (
    <section id="services" className="bg-secondary py-20 sm:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold uppercase tracking-wider text-accent">Built for Trust. Designed for Growth.</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Strategic <span className="text-accent">Legal Marketing</span> Services
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            We don’t just make websites—we craft digital first impressions that convert visitors into clients. Every project is built around speed, simplicity, and strategic design tailored for legal professionals.
          </p>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
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
