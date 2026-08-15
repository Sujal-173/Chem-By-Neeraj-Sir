/** @type {import('next').NextConfig} */

// Sanity Studio (mounted at /studio) needs 'unsafe-eval'/'unsafe-inline' and a
// handful of third-party origins to run client-side, so the CSP below is
// intentionally scoped to what the site + Studio + Cloudinary + Sanity CDN
// actually need rather than a maximally strict policy that would break them.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.sanity.io https://res.cloudinary.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.sanity.io https://res.cloudinary.com https://api.cloudinary.com",
  "frame-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        // Applies to every route. /studio is intentionally still allowed to
        // frame itself (frame-src 'self') since Sanity's own UI uses iframes
        // internally for previews; frame-ancestors stays locked to 'none' so
        // no external site can frame us (clickjacking protection).
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
