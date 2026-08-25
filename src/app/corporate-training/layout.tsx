import { Fraunces, IBM_Plex_Mono } from 'next/font/google';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-mono',
});

export default function CorporateTrainingLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${fraunces.variable} ${ibmPlexMono.variable}`}>{children}</div>;
}
