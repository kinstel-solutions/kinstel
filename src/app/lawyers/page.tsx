import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { HeroLawyer } from '@/components/sections/hero-lawyer';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { CallToActionLawyer } from '@/components/sections/call-to-action-lawyer';
import { type Metadata } from 'next';

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

const StatsLawyer = dynamic(() => import('@/components/sections/stats-lawyer').then(m => m.StatsLawyer), {
  loading: () => <Skeleton className="h-48 w-full" />,
});
const ServicesLawyer = dynamic(() => import('@/components/sections/services-lawyer').then(m => m.ServicesLawyer), {
  loading: () => <Skeleton className="h-96 w-full" />,
});
const PortfolioLawyer = dynamic(() => import('@/components/sections/portfolio-lawyer').then(m => m.PortfolioLawyer), {
    loading: () => <Skeleton className="h-[800px] w-full" />,
});


export default function LawyersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <HeroLawyer />
        <StatsLawyer />
        <ServicesLawyer />
        <PortfolioLawyer />
        <CallToActionLawyer />
      </main>
      <Footer />
    </div>
  );
}
