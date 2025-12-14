import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero';
import { StatsSection } from '@/components/sections/stats';
import { CallToActionSection } from '@/components/sections/call-to-action';
import { ServicesSection } from '@/components/sections/services';
import { Portfolio } from '@/components/sections/portfolio';
import { type Metadata } from 'next';
import { Award, Users, Zap, Palette, Rocket, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kinstel | Top Web Design Company in Lucknow',
  description: 'Kinstel is the leading web design company in Lucknow. We deliver custom websites, SEO, and digital marketing solutions to businesses in Lucknow.',
  keywords: [
    'web design company in lucknow',
    'website design lucknow',
    'seo company lucknow',
    'digital marketing lucknow',
    'web development lucknow'
  ],
};

const lucknowStats = [
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    value: '99%',
    label: 'Uptime Guarantee',
    description: 'Reliable hosting and support for Lucknow businesses.',
  },
  {
    icon: <Users className="h-8 w-8 text-accent" />,
    value: '50+',
    label: 'Local Clients',
    description: 'Helping businesses in Lucknow grow their online presence.',
  },
  {
    icon: <Award className="h-8 w-8 text-accent" />,
    value: 'Top Rated',
    label: 'Agency in Lucknow',
    description: 'Recognized for excellence in web design and SEO.',
  },
];

const lucknowServices = [
  {
    icon: <Palette className="h-8 w-8 text-accent" />,
    title: 'Custom Websites in Lucknow',
    description: 'We create unique, professional websites tailored for the Lucknow market and your specific brand.',
  },
  {
    icon: <Rocket className="h-8 w-8 text-accent" />,
    title: 'Local SEO & Speed',
    description: 'We optimize for local search to ensure your business ranks high when customers search in Lucknow.',
  },
  {
    icon: <CheckCircle className="h-8 w-8 text-accent" />,
    title: 'Affordable Packages',
    description: 'High-quality web design and marketing solutions at competitive rates for Lucknow businesses.',
  },
];

export default function LucknowPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection
          title={
            <>
              Premier <span className="text-accent">Web Design Company</span> in Lucknow
            </>
          }
          subtitle="We are Lucknow's trusted web design agency. We create stunning, mobile-friendly websites that help local businesses attract more customers and grow online."
          primaryButtonText="Get a Free Quote"
          primaryButtonLink="/contact"
          secondaryButtonText="View Our Portfolio"
          secondaryButtonLink="#portfolio"
        />
        <StatsSection items={lucknowStats} />
        <ServicesSection 
            subHeading="Local Expertise"
            heading={<>Best <span className="text-accent">Web Services</span> in Lucknow</>}
            description="We provide comprehensive web design and digital marketing services to help Lucknow businesses thrive in the digital age."
            items={lucknowServices}
        />
        <Portfolio />
        <CallToActionSection
          subHeading="Grow Your Business"
          heading="Best Web Design Company in Lucknow"
          description="Looking for the best web design company in Lucknow? We are here to help you establish a powerful online presence. Contact us today for a free consultation."
          buttonText="Contact Us Today"
        />
      </main>
      <Footer />
    </div>
  );
}
