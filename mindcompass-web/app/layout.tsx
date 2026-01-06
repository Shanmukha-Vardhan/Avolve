import type { Metadata, Viewport } from 'next';
import { Inter, Merriweather } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
});

export const metadata: Metadata = {
  title: {
    default: 'Avolve - Evolve Your Digital Presence',
    template: '%s | Avolve',
  },
  description:
    'Avolve is a creative digital agency building exceptional web experiences. We craft modern, high-performance applications that help businesses grow and evolve.',
  keywords: [
    'digital agency',
    'web development',
    'web design',
    'software development',
    'creative agency',
    'Next.js',
    'React',
    'modern web',
  ],
  authors: [{ name: 'Avolve Team' }],
  creator: 'Avolve',
  publisher: 'Avolve',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://avolve.studio',
    siteName: 'Avolve',
    title: 'Avolve - Evolve Your Digital Presence',
    description:
      'Avolve is a creative digital agency building exceptional web experiences. We craft modern, high-performance applications.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Avolve - Creative Digital Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avolve - Evolve Your Digital Presence',
    description:
      'Avolve is a creative digital agency building exceptional web experiences.',
    images: ['/og-image.png'],
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
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased transition-colors duration-300">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[var(--primary)] focus:px-4 focus:py-2 focus:text-[var(--primary-foreground)]"
        >
          Skip to main content
        </a>

        {/* Main content */}
        <main id="main-content" className="flex min-h-screen flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}
