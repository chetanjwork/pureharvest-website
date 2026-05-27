import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import WhatsAppFloat from "@/components/layout/WhatsAppFloat";
import LoadingAnimation from "@/components/ui/LoadingAnimation";
import CookieConsent from "@/components/layout/CookieConsent";
import CodeProtection from "@/components/providers/CodeProtection";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PureHarvest | Premium Branded Water Supplier Mumbai & Thane | Custom Bottles",
  description: "PureHarvest Enterprises - Mumbai & Thane's leading supplier of premium custom-branded packaged drinking water. 10-stage purification. Serving luxury hotels, corporates, cafés & wedding events across Maharashtra. GST: 27GVMPD4986B1ZA.",
  keywords: [
    "branded water bottles Mumbai",
    "custom water bottles Thane",
    "premium drinking water supplier Mumbai",
    "packaged water company Thane",
    "water bottle branding Maharashtra",
    "hotel water bottle supplier Mumbai",
    "corporate water bottles Mumbai",
    "wedding water bottles Thane",
    "purified water supplier Mumbai",
    "bulk water supply Thane",
    "custom labeled water India",
    "luxury hospitality water branding",
    "branded packaged drinking water",
    "10 stage water purification",
    "glass water bottle manufacturer India",
    "PureHarvest Enterprises",
    "branded water bottles Kalyan",
    "custom water bottles Dombivli",
    "corporate water supply Badlapur",
    "wedding water bottles Ambernath",
    "customized water Karjat",
    "packaged water Vangani",
    "premium drinking water Ulhasnagar",
    "wholesale water Titwala",
    "water bottle branding Navi Mumbai",
    "customized water bottles Shelu",
    "water bottle manufacturer Vitthalwadi"
  ].join(", "),
  metadataBase: new URL("https://pureharvest.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PureHarvest | Premium Branded Water - Mumbai & Thane",
    description: "Custom-branded packaged drinking water for luxury hotels, corporates & events. 10-stage purification. Serving Mumbai, Thane & all of Maharashtra.",
    url: "https://pureharvest.in",
    siteName: "PureHarvest Enterprises",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PureHarvest Premium Branded Water - Mumbai & Thane",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PureHarvest | Premium Branded Water Mumbai & Thane",
    description: "10-stage purified, custom-branded water for hotels, cafés, corporates & weddings across Mumbai and Thane.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "", // Add Google Search Console verification code when ready
  },
  category: "food & beverage",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

// ── Schema: LocalBusiness (Primary) ──────────────────────────────
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://pureharvest.in/#business",
  "name": "PureHarvest Enterprises",
  "alternateName": "Pure Harvest",
  "url": "https://pureharvest.in",
  "logo": "https://pureharvest.in/logo.png",
  "image": "https://pureharvest.in/og-image.jpg",
  "description": "PureHarvest Enterprises is a Mumbai and Thane-based premium packaged drinking water company specialising in custom-branded glass and PET water bottles for luxury hotels, corporate offices, cafés, and wedding events across Maharashtra. The company processes water through a certified 10-stage purification system including Reverse Osmosis, UV Treatment, and Ozonisation.",
  "telephone": "+91-8149174975",
  "email": "contact@pureharvest.in",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Thane",
    "addressRegion": "Maharashtra",
    "postalCode": "400601",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 19.2183,
    "longitude": 72.9781
  },
  "areaServed": [
    { "@type": "City", "name": "Mumbai" },
    { "@type": "City", "name": "Thane" },
    { "@type": "City", "name": "Navi Mumbai" },
    { "@type": "City", "name": "Pune" },
    { "@type": "City", "name": "Karjat" },
    { "@type": "City", "name": "Vangani" },
    { "@type": "City", "name": "Shelu" },
    { "@type": "City", "name": "Badlapur" },
    { "@type": "City", "name": "Ambernath" },
    { "@type": "City", "name": "Ulhasnagar" },
    { "@type": "City", "name": "Titwala" },
    { "@type": "City", "name": "Vitthalwadi" },
    { "@type": "City", "name": "Kalyan" },
    { "@type": "City", "name": "Dombivli" },
    { "@type": "State", "name": "Maharashtra" }
  ],
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "taxID": "27GVMPD4986B1ZA",
  "currenciesAccepted": "INR",
  "priceRange": "₹₹",
  "sameAs": [
    "https://www.instagram.com/pure_harvest.enterprise",
    "https://wa.me/918149174975"
  ],
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "telephone": "+91-8149174975",
      "contactType": "sales",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi", "mr"],
      "contactOption": "TollFree"
    },
    {
      "@type": "ContactPoint",
      "telephone": "+91-9112209292",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["en", "hi", "mr"]
    }
  ]
};

// ── Schema: Organization & B2BBusiness ─────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "B2BBusiness"],
  "@id": "https://pureharvest.in/#organization",
  "name": "PureHarvest Enterprises",
  "url": "https://pureharvest.in",
  "logo": {
    "@type": "ImageObject",
    "url": "https://pureharvest.in/logo.png",
    "width": 512,
    "height": 512
  },
  "description": "Premium corporate and hospitality packaged drinking water supplier based in Maharashtra.",
  "foundingLocation": {
    "@type": "Place",
    "name": "Badlapur, Maharashtra, India"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Badlapur",
    "addressRegion": "Maharashtra",
    "addressCountry": "IN"
  },
  "areaServed": "Maharashtra, India",
  "sameAs": [
    "https://www.instagram.com/pure_harvest.enterprise"
  ]
};

// -- Schema: Product - Signature Series ---------------------------
const signatureProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Signature Series - Custom Branded Water Bottle",
  "brand": { "@type": "Brand", "name": "PureHarvest Enterprises" },
  "manufacturer": { "@type": "Organization", "name": "PureHarvest Enterprises", "address": { "@type": "PostalAddress", "addressLocality": "Thane", "addressRegion": "Maharashtra", "addressCountry": "IN" }},
  "description": "Premium borosilicate glass water bottle featuring 10-stage purification and custom B2B branding. Designed for VIP boardrooms, 5-star hotels, and fine dining.",
  "image": "https://pureharvest.in/signature.png",
  "category": "Branded Packaged Drinking Water",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "seller": { "@type": "Organization", "name": "PureHarvest Enterprises" }
  }
};

// -- Schema: Product - Classic Series -----------------------------
const classicProductSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Classic Series - Custom Branded Water Bottle",
  "brand": { "@type": "Brand", "name": "PureHarvest Enterprises" },
  "manufacturer": { "@type": "Organization", "name": "PureHarvest Enterprises" },
  "description": "High-durability clarity glass water bottle with brushed silver cap and organic screen printing. Ideal for premium cafés, hospitality venues, and high-volume events in Mumbai and Thane.",
  "image": "https://pureharvest.in/classic.png",
  "category": "Branded Packaged Drinking Water",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock",
    "seller": { "@type": "Organization", "name": "PureHarvest Enterprises" }
  }
};

// ── Schema: Service ───────────────────────────────────────────────
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Custom Branded Packaged Drinking Water",
  "name": "PureHarvest Branded Water Solutions",
  "provider": {
    "@type": "LocalBusiness",
    "name": "PureHarvest Enterprises",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Thane",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    }
  },
  "description": "Custom-branded packaged drinking water services for luxury hotels, corporate offices, cafés, and wedding events in Mumbai and Thane, Maharashtra.",
  "areaServed": ["Mumbai", "Thane", "Navi Mumbai", "Karjat", "Vangani", "Shelu", "Badlapur", "Ambernath", "Ulhasnagar", "Titwala", "Vitthalwadi", "Kalyan", "Dombivli", "Maharashtra"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Hydration Branding Solutions",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Luxury Hotel Water Branding Mumbai" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Corporate Branded Water Thane" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wedding Event Water Bottles Mumbai" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Café Custom Water Bottles Maharashtra" }},
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Bulk Packaged Water Supply Thane" }}
    ]
  }
};

// ── Schema: BreadcrumbList ────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pureharvest.in" },
    { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://pureharvest.in/#configurator" },
    { "@type": "ListItem", "position": 3, "name": "Purification Process", "item": "https://pureharvest.in/#purification" },
    { "@type": "ListItem", "position": 4, "name": "FAQ", "item": "https://pureharvest.in/#faq" }
  ]
};

// ── Schema: WebSite (Sitelinks searchbox) ────────────────────────
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "PureHarvest Enterprises",
  "url": "https://pureharvest.in",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://pureharvest.in/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* All JSON-LD schemas */}
        <Script id="json-ld-local" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} strategy="beforeInteractive" />
        <Script id="json-ld-org" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} strategy="beforeInteractive" />
        <Script id="json-ld-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} strategy="beforeInteractive" />
        <Script id="json-ld-signature" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(signatureProductSchema) }} strategy="beforeInteractive" />
        <Script id="json-ld-classic" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(classicProductSchema) }} strategy="beforeInteractive" />
        <Script id="json-ld-breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} strategy="beforeInteractive" />
        <Script id="json-ld-website" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} strategy="beforeInteractive" />
      </head>
      <body className="font-sans w-full max-w-[100vw]">
        <CodeProtection />
        <SmoothScroll>
          <LoadingAnimation />
          <Navbar />
          {children}
          <WhatsAppFloat />
          <CookieConsent />
        </SmoothScroll>
      </body>
    </html>
  );
}
