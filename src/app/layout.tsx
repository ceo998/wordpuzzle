import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header, Footer } from '@/components';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2563eb',
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://wordpuzzle.com'),
  title: {
    default: 'Free Word Search Puzzles Online | WordPuzzle',
    template: '%s | WordPuzzle',
  },
  description:
    'Play free word search puzzles online or print them for offline fun. Thousands of puzzles across categories like movies, TV shows, science, sports, and more. Perfect for all ages!',
  keywords: [
    'word search',
    'word puzzle',
    'free puzzles',
    'online games',
    'printable puzzles',
    'brain games',
    'educational games',
    'word games',
  ],
  authors: [{ name: 'WordPuzzle' }],
  creator: 'WordPuzzle',
  publisher: 'WordPuzzle',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Free Word Search Puzzles Online | WordPuzzle',
    description:
      'Play free word search puzzles online or print them for offline fun. Thousands of puzzles across categories like movies, TV shows, science, and more!',
    siteName: 'WordPuzzle',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WordPuzzle - Free Word Search Puzzles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Word Search Puzzles Online | WordPuzzle',
    description:
      'Play free word search puzzles online or print them for offline fun. Thousands of puzzles for all ages!',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
