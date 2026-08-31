# Paws Pannai Retreat — website

Built from the Website IA & Content Brief (v2, 30 Aug 2026). Nothing is carried over from the previous site.

- **Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4
- **Fonts:** Fraunces + Inter, self-hosted via `@fontsource-variable` (no runtime call to Google)
- **Output:** every route is statically prerendered
- **Deploy:** Vercel, zero config — import the repo and it builds

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npx eslint .     # lint
```

---

## Where things live

| Path | What it holds |
|---|---|
| `src/lib/site.ts` | **All facts, contacts, URLs and coordinates.** Every `TODO` in the project is here. |
| `src/lib/pricing.ts` | The pricing rules and the quote engine. Change a rate here and it changes everywhere. |
| `src/lib/content.ts` | FAQ, park rules, the twelve tyre elements, eco credentials. Also feeds the FAQ schema. |
| `src/lib/media.ts` | The image manifest — every photo slot, its aspect ratio, alt text, and the brief for shots not taken yet. |
| `src/lib/nav.ts` | Primary and footer navigation. |
| `src/lib/seo.tsx` | Per-page metadata helper and JSON-LD builders. |
| `src/components/` | Shell (header, footer, mobile book bar), UI primitives, the session planner and enquiry forms. |
| `public/images/park/` | The five real site photographs currently in use. |

## Adding a photograph

1. Drop the file in `public/images/<group>/<name>.jpg`.
2. In `src/lib/media.ts`, set `src`, `width` and `height` on that slot.

Until `src` is set, the slot renders a dashed placeholder at exactly the right aspect ratio with the shot brief inside it — so nothing on the page moves when the real photo lands.

## Sitemap

Seven primary pages, ten routes beneath them.

```
/                                        Home
/the-park                                The Park
  /the-park/bone-pool                    The Bone Pool
  /the-park/farm-walks                   Long-Leash Farm Walks
  #tyre-play-trail #trees-and-forest #zones #tyre-cafe
/sessions                                Sessions & Pricing
  #plan #exclusive #group #pool #puppy
/parties-and-training                    Parties & Training
  /parties-and-training/birthday-parties Birthday Parties
  #birthday #training
/stay-at-bsf                             Stay at BSF
/our-story                               Our Story
  /our-story/the-wider-farm              The Wider Farm
  #upcycling #eco
/plan-your-visit                         Plan Your Visit
  /plan-your-visit/faq                   FAQ
  /plan-your-visit/park-rules            Park Rules
  /plan-your-visit/getting-here          Getting Here
/gallery  /contact  /policies            footer utility pages
```

---

## Before this goes live

### 1. Facts still missing — all in `src/lib/site.ts`

- [ ] WhatsApp business number (drives every booking CTA on the site)
- [ ] Phone number and email address
- [ ] Instagram handle
- [ ] Full postal address and PIN code
- [ ] Surveyed latitude/longitude, and a Google Maps Place ID for the embed
- [ ] Live domain (currently `pawspannai.com`)
- [ ] Real URLs for Bevu Social Farmstay, its booking page, SSEK, and Cafe Tamarind — flagged as open in IA §09
- [ ] Drive times from HSR Layout, Whitefield and Hosur

### 2. Decisions still open

- [ ] **Booking model.** The IA specifies live slot booking with payment from day one. This build implements enquiry + WhatsApp instead, per instruction. If a booking engine is chosen later, `SessionPlanner` is the single component to swap.
- [ ] **The discount trigger.** This build prices the *whole* slot at ₹750/dog/hr once a booking hits 2+ hours **or** 2+ dogs — the union of the two tier triggers in IA §05, and the flagged assumption in IA §09. Confirm before launch; the rule lives in one function in `src/lib/pricing.ts`.
- [ ] **Puppy-safe, training/grooming and birthday pricing** — shown as "being finalised" on the site.
- [ ] **Cat Corner teaser** on The Park page — IA §09 offers to strip it if v1 should be dogs-only in messaging.
- [ ] **Trainer name and rate** — deliberately absent from all copy until terms are signed, per IA §04/§09.
- [ ] **Policies** — drafted from operating practice, marked as needing legal review.

### 3. Photography still needed

`src/lib/media.ts` carries a brief for each. In rough priority order:

1. The bone-shaped pool from a raised angle (used on Home, The Park, and its own page)
2. The tyre trail under the mango canopy (the Home hero backup)
3. Tyre Cafe with people and dogs in frame
4. Bevu Social Farmstay, with a dog (the Stay at BSF hero)
5. The Puppy Play Area, the Miyawaki plot, a farm walk, the solar/bio-digester
6. A matched before/after pair of the acre for Our Story

The Drive folder referenced in IA §08 holds 29 photos and 12 clips — most of the above is probably already shot.

### 4. Technical

- [ ] Point the domain at Vercel and set `site.url`
- [ ] Add an Open Graph image (`src/app/opengraph-image.png`, 1200×630)
- [ ] Google Business Profile and Search Console, submitting `/sitemap.xml`
- [ ] Analytics, if wanted

## Notes on the build

- **No live checkout.** Every booking path composes a structured WhatsApp message and hands it off; the estimator does the arithmetic so the enquiry that arrives is already specific.
- **Opening hours are enforced in the UI.** The session planner only offers start times where the whole slot finishes by 7:30 PM, so the site can never offer a slot that does not exist.
- **The pricing rules exist once.** `src/lib/pricing.ts` is the only place a rate appears; the tier table, the estimator, the worked examples and the schema all read from it.
- **Structured data** covers LocalBusiness/TouristAttraction, the FAQ, the offers, and breadcrumbs on every sub-page.
