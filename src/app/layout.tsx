import type { Metadata, Viewport } from "next";
import { MobileBookBar } from "@/components/mobile-book-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd, localBusinessSchema } from "@/lib/seo";
import { site } from "@/lib/site";
// Self-hosted variable fonts — no runtime call to Google, no CLS on first paint.
import "@fontsource-variable/inter";
import "@fontsource-variable/fraunces";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — a dog park on a working farm near Hosur`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "dog park near Hosur",
    "dog park near Bangalore",
    "dog swimming pool Bangalore",
    "pet friendly farm Hosur",
    "dog day out Sarjapur",
    "puppy play area Bangalore",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    images: [site.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1B5E20",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <body className="min-h-dvh antialiased">
        <SiteHeader />
        <main id="main">{children}</main>
        <MobileBookBar />
        <SiteFooter />
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}
