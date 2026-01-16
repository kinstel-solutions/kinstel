import { Plus_Jakarta_Sans, Space_Grotesk, Bruno_Ace_SC } from "next/font/google";

/**
 * Primary sans-serif font for body text
 * Optimized with fallback to system fonts for better performance
 */
export const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap", // Prevents invisible text during font load
  preload: true, // Preload for faster LCP
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Arial", "sans-serif"],
  adjustFontFallback: true, // Reduce layout shift
});

/**
 * Logo/display font for branding elements
 */
export const fontLogo = Bruno_Ace_SC({
  subsets: ["latin"],
  variable: "--font-logo",
  weight: "400",
  display: "swap",
  preload: false, // Not critical for initial paint
  fallback: ["Impact", "Arial Black", "sans-serif"],
});

/**
 * Serif font for headings and emphasis
 */
export const fontSerif = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: true,
});
