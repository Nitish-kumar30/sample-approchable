import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  // bundle content/posts so serverless functions can read them at runtime (ISR)
  outputFileTracingIncludes: {
    '/blog': ['./content/posts/**/*'],
    '/blog/[slug]': ['./content/posts/**/*'],
  },
};

export default nextConfig;
