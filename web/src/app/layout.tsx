import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Syne } from "next/font/google";
import { brand } from "@/data/brand";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const body = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: brand.seo.title,
  description: brand.seo.description,
  metadataBase: new URL(brand.seo.siteUrl),
  openGraph: {
    title: brand.seo.ogTitle,
    description: brand.seo.ogDescription,
    type: "website",
    locale: "pt_BR",
    siteName: brand.productName,
    images: [{ url: "/og.svg", width: 1200, height: 630, alt: brand.seo.ogTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: brand.seo.ogTitle,
    description: brand.seo.ogDescription,
    images: ["/og.svg"],
  },
  keywords: [
    "funcionário digital",
    "computer use",
    "automação inteligente",
    "agente autônomo",
    "RPA",
    "IA operacional",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">{children}</body>
    </html>
  );
}
