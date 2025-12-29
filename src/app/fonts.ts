import { Manrope, Lora, Bruno_Ace_SC } from "next/font/google";

export const fontSans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true, // Ensure this is true
});

export const fontLogo = Bruno_Ace_SC({
  subsets: ["latin"],
  variable: "--font-logo",
  weight: "400",
  display: "swap",
  preload: true, // Ensure this is true
});

export const fontSerif = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  preload: true, // Ensure this is true
});
