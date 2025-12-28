import { Manrope, Lora, Bruno_Ace_SC } from 'next/font/google';

export const fontSans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const fontLogo = Bruno_Ace_SC({
  subsets: ['latin'],
  variable: '--font-logo',
  weight: '400',
  display: 'swap',
});

export const fontSerif = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});
