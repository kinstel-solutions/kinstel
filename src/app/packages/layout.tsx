import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Packages & Pricing",
  alternates: {
    canonical: "/packages",
  },
};

export default function PackagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
