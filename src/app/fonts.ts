import { Plus_Jakarta_Sans, Space_Grotesk, Bruno_Ace_SC } from "next/font/google";

export const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
});

export const fontLogo = Bruno_Ace_SC({
  subsets: ["latin"],
  variable: "--font-logo",
  weight: "400",
  display: "swap",
  preload: true,
});

export const fontSerif = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  preload: true,
});
