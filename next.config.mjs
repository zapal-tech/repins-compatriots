import { withPayload } from '@payloadcms/next/withPayload';

import ContentSecurityPolicy from './csp.mjs';

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL);
const cdnUrl = new URL(process.env.NEXT_PUBLIC_CDN_URL);

const remotePatterns = [siteUrl, cdnUrl].map((url) => ({
  hostname: url.hostname,
  pathname: '/**',
  port: url.port,
  protocol: url.protocol.replace(':', ''),
}));

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const headers = [];

    if (!process.env.IS_LIVE)
      headers.push({
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
        source: '/:path*',
      });

    headers.push({
      headers: [
        {
          key: 'Content-Security-Policy',
          value: ContentSecurityPolicy,
        },
      ],
      source: '/((?!admin).*)',
    });

    return headers;
  },
  images: {
    remotePatterns,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  experimental: {
    // reactCompiler: true,
    serverActions: {
      allowedOrigins: [siteUrl.origin],
    },
  },
};

const nextConfigWithPayload = withPayload(nextConfig);

nextConfigWithPayload.experimental.reactCompiler = false;

export default nextConfigWithPayload;
