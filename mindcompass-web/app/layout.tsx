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
    default: 'MindCompass - Your Mental Wellness Journey',
    template: '%s | MindCompass',
  },
  description:
    'Navigate your mental wellness journey with MindCompass. Track moods, journal thoughts, set goals, and discover personalized insights for better mental health.',
  keywords: [
    'mental health',
    'wellness',
    'mood tracking',
    'journaling',
    'self-care',
    'mindfulness',
    'goal setting',
    'mental wellness app',
  ],
  authors: [{ name: 'MindCompass Team' }],
  creator: 'MindCompass',
  publisher: 'MindCompass',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mindcompass.app',
    siteName: 'MindCompass',
    title: 'MindCompass - Your Mental Wellness Journey',
    description:
      'Navigate your mental wellness journey with MindCompass. Track moods, journal thoughts, set goals, and discover personalized insights.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MindCompass - Mental Wellness App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MindCompass - Your Mental Wellness Journey',
    description:
      'Navigate your mental wellness journey with MindCompass. Track moods, journal thoughts, and set goals.',
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
