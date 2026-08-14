import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Approachable — Making AI Approachable for Everyone',
    template: '%s — Approachable',
  },
  description:
    'A small-group, mentor-led cohort on the full Claude ecosystem — Claude Chat, Claude Code, Claude Cowork, and the API. 20 seats. Live sessions. Real projects.',
  keywords: ['Claude AI', 'Claude Code', 'AI cohort', 'Claude ecosystem', 'AI learning', 'mentor-led', 'Anthropic', 'approachable'],
  openGraph: {
    type: 'website',
    url: 'https://approachable.dev/',
    siteName: 'Approachable',
    images: [{ url: 'https://approachable.dev/img/og-image.png' }],
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XG391DQQCV"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XG391DQQCV');
        `}</Script>
        <Script id="clarity-init" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "vbfff98f4y");
        `}</Script>
      </body>
    </html>
  );
}
