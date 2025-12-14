import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/sections/hero';
import { StatsSection } from '@/components/sections/stats';
import { CallToActionSection } from '@/components/sections/call-to-action';
import { ServicesSection } from '@/components/sections/services';
import { PortfolioSection } from '@/components/sections/portfolio';
import { type Metadata } from 'next';
import { Award, Users, Zap, Palette, Rocket, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Kinstel | Premier Law Firm Marketing Firm for Legal Growth',
    description: 'Kinstel empowers lawyers and law firms to elevate their practice with custom website development, proven SEO, and legally compliant marketing.',
    keywords: [
        'law firm marketing firm',
        'legal marketing firm',
        'website developers for lawyers',
        'law firm website development',
        'law firm seo'
    ],
  };

const lawyerStats = [
  {
    icon: <Zap className="h-8 w-8 text-accent" />,
    value: '98%',
    label: 'Page Speed Score',
    description: 'Blazing-fast load times to keep potential clients engaged.',
  },
  {
    icon: <Users className="h-8 w-8 text-accent" />,
    value: '150+',
    label: 'Law Firms Served',
    description: 'Trusted by legal professionals across various practice areas.',
  },
  {
    icon: <Award className="h-8 w-8 text-accent" />,
    value: '300%',
    label: 'Avg. Lead Increase',
    description: 'Our conversion-focused designs deliver measurable results.',
  },
];

const lawyerServices = [
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

const lawyerPortfolioItems = [
  {
    image: "/advratnasingh.png",
    imageHint: "screenshot advocate ratna singh website",
    title: "Advocate Ratna Singh",
    category: "Independent Advocate",
    metrics: ["Modern Design", "Client-Focused"],
    link: "https://advratnasingh.vercel.app/",
  },
  {
    image: "/ababneh-law.png",
    imageHint: "screenshot ababneh and associates law firm website",
    title: "Ababneh & Associates",
    category: "International Law Firm",
    metrics: ["Multilingual", "Corporate Branding"],
    link: "https://ababneh-law.vercel.app/",
  },
  {
    image: "/advonex.png",
    imageHint: "screenshot advonex legal consultancy website",
    title: "Advonex",
    category: "Modern Legal Consultancy",
    metrics: ["Sleek UI", "Fast Load Times"],
    link: "https://advonex.vercel.app/",
  },
];


export default function LawyersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection
          title={
            <>
              Expert <span className="text-accent">Legal Marketing</span> for Law Firms
            </>
          }
          subtitle="As a specialized law marketing firm, we focus on law firm website development and SEO for lawyers. We blend professional design with performance to make your practice stand out."
          primaryButtonText="Book a Free Consultation"
          primaryButtonLink="/contact"
          secondaryButtonText="View Demo Designs"
          secondaryButtonLink="#portfolio"
        />
        <StatsSection items={lawyerStats} />
        <ServicesSection
            subHeading="Built for Trust. Designed for Growth."
            heading={<>Strategic <span className="text-accent">Legal Marketing</span> Services</>}
            description="We don’t just make websites—we craft digital first impressions that convert visitors into clients. Every project is built around speed, simplicity, and strategic design tailored for legal professionals."
            items={lawyerServices}
        />
        <PortfolioSection
            subHeading="Proven Results"
            heading={<>Legal Marketing That <span className="text-accent">Delivers Results</span></>}
            description="We've helped law firms across different practice areas increase their online presence and generate more qualified leads through expert website development."
            items={lawyerPortfolioItems}
        />
        <CallToActionSection
            subHeading="Let's Get Started"
            heading="Start Your Legal Marketing Strategy Today"
            description="Your website should work as hard as you do. Partner with a trusted legal marketing firm and get expert SEO for lawyers. Book a free consultation to get started."
            buttonText="Request a Free Quote"
        />
      </main>
      <Footer />
    </div>
  );
}
