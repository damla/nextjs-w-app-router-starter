import './globals.css';

import Footer from '@/components/layout/footer';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import Navbar from '@/components/layout/navbar';
import Providers from '../context/providers';
import clsx from 'clsx';
import { siteConfig } from '@/config/site';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx('min-h-screen bg-background', inter.className)}>
        <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
