import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RecaptchaProvider from '@/components/RecaptchaProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Acumen Patrimoine - Expert en investissement LMNP",
  description: "Acumen Patrimoine, votre expert en investissement patrimonial LMNP. Partenaire des CGP pour des solutions d'investissement sur-mesure.",
  keywords: "LMNP, investissement patrimonial, CGP, résidences services seniors, Acumen Patrimoine",
  authors: [{ name: "Acumen Patrimoine" }],
  openGraph: {
    title: "Acumen Patrimoine - Expert en investissement LMNP",
    description: "Votre expert en investissement patrimonial LMNP. Partenaire des CGP pour des solutions d'investissement sur-mesure.",
    type: "website",
    locale: "fr_FR",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RecaptchaProvider>
          {children}
        </RecaptchaProvider>
      </body>
    </html>
  );
}
