'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

// The cohort landing page ("/") has its own minimal footer rendered inline
// (see src/app/page.tsx), so skip the full site footer there.
// Footer is passed in as children (rather than imported here) so it stays a
// server component — it reads post data from the filesystem at build time.
export default function ConditionalFooter({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === '/') return null;
  return <>{children}</>;
}
