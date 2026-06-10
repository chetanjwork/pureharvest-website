import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ── Image Optimization ──────────────────────────────────────────
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
  },

  // ── HTTP Compression ────────────────────────────────────────────
  compress: true,

  // ── Performance & Caching Headers ───────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
          { 
            key: "Content-Security-Policy", 
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com https://vitals.vercel-insights.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://*.googleusercontent.com; font-src 'self' data:; connect-src 'self' https://script.google.com https://*.googleusercontent.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://*.sentry.io;" 
          },
        ],
      },
    ];
  },

  // ── Turbopack (faster local dev) ────────────────────────────────
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },

  // ── Compiler optimisations ──────────────────────────────────────
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },

  // ── Power BI / Bundle optimization ──────────────────────────────
  poweredByHeader: false,
  
  // ── Security ────────────────────────────────────────────────────
  productionBrowserSourceMaps: false,
};

import withBundleAnalyzer from '@next/bundle-analyzer';
import { withSentryConfig } from '@sentry/nextjs';

const analyze = process.env.ANALYZE === 'true';

const configured = analyze ? withBundleAnalyzer({ enabled: true })(nextConfig) : nextConfig;

export default withSentryConfig(configured, {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",
  sourcemaps: {
    disable: true
  }
});
