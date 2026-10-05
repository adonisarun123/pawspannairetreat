import { MobileBookBar } from "@/components/mobile-book-bar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { JsonLd, localBusinessSchema } from "@/lib/seo";

/** Public-site chrome. The admin panel (/admin) sits outside this group. */
export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      <main id="main">{children}</main>
      <MobileBookBar />
      <SiteFooter />
      <JsonLd data={localBusinessSchema()} />
    </>
  );
}
