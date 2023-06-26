import { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'damlakoksal.com',
    template: '%s | damlakoksal.com',
  },
  description: 'Software engineer at chainapi.com',
  openGraph: {
    title: 'damlakoksal.com',
    description: 'Software engineer at chainapi.com',
    url: 'https://chronark.com',
    siteName: 'damlakoksal.com',
    locale: 'en-US',
    type: 'website',
  },
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
  twitter: {
    title: 'damlakoksal',
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
