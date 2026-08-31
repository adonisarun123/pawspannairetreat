import Link from "next/link";
import { primaryNav } from "@/lib/nav";
import { contact, family, hours, location, site, whatsappLink } from "@/lib/site";
import { Container } from "./ui";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-floor-900 text-bone-100">
      <Container width="wide">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <p className="font-display text-2xl font-semibold">{site.name}</p>
            <p className="mt-1 text-sm tracking-[0.16em] text-mango-300 uppercase">
              {site.tagline}
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed opacity-75">
              A working acre near Hosur where your dog runs free. Not a facility, not a kennel —
              a farm, with a pool shaped like a bone.
            </p>
            <dl className="mt-8 space-y-3 text-sm">
              <div>
                <dt className="opacity-55">Where</dt>
                <dd className="mt-0.5">
                  <a
                    href={location.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-mango-300"
                  >
                    {location.addressLine}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="opacity-55">Open</dt>
                <dd className="mt-0.5">{hours.display}</dd>
              </div>
              <div>
                <dt className="opacity-55">Talk to us</dt>
                <dd className="mt-0.5 flex flex-wrap gap-x-4 gap-y-1">
                  <a
                    href={whatsappLink("Hi! I'd like to book a session at Paws Pannai.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-mango-300"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`tel:${contact.phone}`}
                    className="underline underline-offset-4 hover:text-mango-300"
                  >
                    {contact.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${contact.email}`}
                    className="underline underline-offset-4 hover:text-mango-300"
                  >
                    {contact.email}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {primaryNav.map((item) => (
              <FooterColumn key={item.href} item={item} />
            ))}
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] uppercase opacity-55">More</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <FooterLink href="/gallery">Gallery</FooterLink>
                </li>
                <li>
                  <FooterLink href={family.cafe.url} external>
                    Cafe Tamarind
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/contact">Contact</FooterLink>
                </li>
                <li>
                  <FooterLink href={contact.instagram} external>
                    Instagram
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="/policies">Policies</FooterLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-bone-50/12 py-8 text-xs opacity-70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. A {family.company} property, alongside{" "}
            <a
              href={family.bsf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              {family.bsf.name}
            </a>{" "}
            next door and{" "}
            <a
              href={family.ssek.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              {family.ssek.name}
            </a>{" "}
            in Kanha.
          </p>
          <p>Built from 2,950 kg of tyres that were headed for a burn pile.</p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({ item }: { item: (typeof primaryNav)[number] }) {
  return (
    <div>
      <p className="text-xs font-semibold tracking-[0.14em] uppercase opacity-55">
        <Link href={item.href} className="hover:text-mango-300">
          {item.label}
        </Link>
      </p>
      {item.children ? (
        <ul className="mt-4 space-y-2.5 text-sm">
          {item.children.map((child) => (
            <li key={child.label}>
              <FooterLink href={child.href} external={child.note === "external"}>
                {child.label}
              </FooterLink>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const cls = "opacity-80 transition-colors hover:text-mango-300 hover:opacity-100";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        <span aria-hidden className="ml-1 opacity-60">
          ↗
        </span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
