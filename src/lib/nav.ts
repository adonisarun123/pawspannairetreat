import { contact, family } from "./site";

export type NavChild = { label: string; href: string; note?: string };
export type NavItem = { label: string; href: string; children?: NavChild[] };

/** IA §03 — six primary branches off Home, one persistent Book button. */
export const primaryNav: NavItem[] = [
  {
    label: "The Park",
    href: "/the-park",
    children: [
      { label: "The Bone Pool", href: "/the-park/bone-pool" },
      { label: "Tyre Play Trail", href: "/the-park#tyre-play-trail" },
      { label: "Trees & Forest", href: "/the-park#trees-and-forest" },
      { label: "Tyre Cafe", href: "/the-park#tyre-cafe" },
      { label: "Farm Walks", href: "/the-park/farm-walks" },
    ],
  },
  {
    label: "Sessions & Pricing",
    href: "/sessions",
    children: [
      { label: "Exclusive Sessions", href: "/sessions#exclusive" },
      { label: "Group Sessions", href: "/sessions#group" },
      { label: "Pool Add-On", href: "/sessions#pool" },
      { label: "Puppy Sessions", href: "/sessions#puppy" },
    ],
  },
  {
    label: "Parties & Training",
    href: "/parties-and-training",
    children: [
      { label: "Birthday Parties", href: "/parties-and-training/birthday-parties" },
      { label: "Training & Grooming", href: "/parties-and-training#training" },
    ],
  },
  {
    label: "Stay at BSF",
    href: "/stay-at-bsf",
    children: [
      { label: "Stay + Play Bundle", href: "/stay-at-bsf#bundle" },
      { label: "BSF Booking", href: family.bsf.bookingUrl, note: "external" },
    ],
  },
  {
    label: "Our Story",
    href: "/our-story",
    children: [
      { label: "Upcycling Story", href: "/our-story#upcycling" },
      { label: "Eco Credentials", href: "/our-story#eco" },
      { label: "The Wider Farm", href: "/our-story/the-wider-farm" },
    ],
  },
  {
    label: "Plan Your Visit",
    href: "/plan-your-visit",
    children: [
      { label: "FAQ", href: "/plan-your-visit/faq" },
      { label: "Park Rules", href: "/plan-your-visit/park-rules" },
      { label: "Getting Here", href: "/plan-your-visit/getting-here" },
      { label: "From Your Neighbourhood", href: "/dog-park-near" },
    ],
  },
];

/** IA §03 — utility links live in the footer, deliberately not in the top nav. */
export const footerNav: NavChild[] = [
  { label: "Gallery", href: "/gallery" },
  { label: "The Journal", href: "/journal" },
  { label: "Contact", href: "/contact" },
  { label: "Instagram", href: contact.instagram, note: "external" },
  { label: "Policies", href: "/policies" },
];
