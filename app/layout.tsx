import type { Metadata } from "next";
import { Inter, Anton, Homemade_Apple } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
});

const signatureFont = Homemade_Apple({
  weight: "400",
  variable: "--font-signature",
  subsets: ["latin"],
});

import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Photography", "Portfolio", "Prince Lucky", "Creative", "Gallery"],
  authors: [
    {
      name: siteConfig.name,
      url: "https://luckysportfolio.vercel.app",
    },
  ],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://luckysportfolio.vercel.app",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@prince_lucky",
  },
};

import AntiInspect from "@/components/AntiInspect";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anton.variable} ${signatureFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#c0c0c0] text-black select-none pointer-events-auto">
        <AntiInspect />
        {children}
      </body>
    </html>
  );
}
