import type { Metadata } from 'next';
import { Cinzel, Inter, JetBrains_Mono } from 'next/font/google';

import { BackgroundImage } from '@/components/BackgroundImage';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { site, siteUrl } from '@/content/site';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-code',
  display: 'swap',
});

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${cinzel.variable}`}
    >
      <body className="min-h-dvh">
        <BackgroundImage />
        <SiteHeader />
        <main className="py-16">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
