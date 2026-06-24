# Padelio — Next.js Migration & GSAP Animation Design Spec

**Date:** 2026-06-24  
**Status:** Approved  
**Scope:** Marketing site (no backend/auth)

---

## 1. Project Context

Padelio is a premium Padel Sports Academy and Court Booking marketing website. The current codebase is a Vite + React 18 SPA (`src/app/App.tsx`) generated from a Figma design. It already has:
- 48 shadcn/ui components (Radix UI primitives)
- Tailwind CSS v4 with custom theme variables
- Brand design system (bone white + vibrant green palette, Urbanist + DM Sans fonts)
- react-router v7 (unused), motion library (unused), all data hardcoded inline

**Goal:** Migrate to Next.js 15 App Router, split the single page into proper multi-page routes, add GSAP scroll-driven animations, and ensure all navigation, buttons, and cards link to the correct pages.

---

## 2. Architecture

### Tech Stack Changes

| Change | From | To |
|---|---|---|
| Build tool | Vite | Next.js 15 |
| Routing | react-router (unused) | Next.js App Router |
| Fonts | Google Fonts CSS imports | `next/font/google` |
| Animations | motion library | GSAP + @gsap/react + ScrollTrigger |
| Entry point | `src/main.tsx` | `app/layout.tsx` |

All other dependencies are preserved: shadcn/ui, Tailwind v4, react-hook-form, lucide-react, sonner, embla-carousel, date-fns, recharts, next-themes.

### Directory Structure

```
/app
  layout.tsx              ← Root layout: fonts, global styles, <Nav>, <Footer>
  page.tsx                ← Home page
  /programs
    page.tsx              ← Programs listing (all 5)
    /[slug]
      page.tsx            ← Individual program detail
  /courts
    page.tsx              ← Courts showcase + booking widget
  /membership
    page.tsx              ← 3-tier pricing + FAQ
  /about
    page.tsx              ← Mission + values + coaches
  /contact
    page.tsx              ← Contact form
  components/
    nav.tsx               ← Sticky navbar with GSAP scroll shrink
    footer.tsx            ← Footer with Next.js Links
    home/
      hero.tsx
      stats-strip.tsx
      mission.tsx
      stories.tsx
      benefits.tsx
      testimonials.tsx
    programs/
      program-card.tsx
      program-hero.tsx
    courts/
      courts-showcase.tsx
      booking-widget.tsx
    membership/
      pricing-card.tsx
      faq-accordion.tsx
    about/
      values-grid.tsx
      coach-card.tsx
    contact/
      contact-form.tsx
    ui/                   ← existing 48 shadcn components (unchanged)
/lib
  data.ts                 ← All hardcoded content (programs, plans, testimonials, etc.)
  gsap.ts                 ← GSAP registration helper (registers plugins once)
  utils.ts                ← cn() + other utilities (existing)
/public
  images/                 ← Static assets
```

### Removed Dependencies

- `vite` and `@vitejs/plugin-react`
- `react-router` (replaced by Next.js routing)
- `motion` library (replaced by GSAP)
- `@tailwindcss/vite` (Next.js uses `@tailwindcss/postcss`)

---

## 3. Pages & Routes

### Home (`/`)
**Sections (in order):**
1. Hero — full-width with headline, subtext, "Book a Court" → `/courts` and "View Programs" → `/programs`
2. Stats Strip — animated counters (Founded, Members, Courts, Rating, Sessions, Coaches)
3. Mission — "Who We Are" centered text block
4. Stories — 4-column grid with hover zoom (category badges: Coaching, Community, Training, Courts)
5. Benefits — 3-card grid (Full-Body Workout, Community, All Ages)
6. Testimonials — carousel with floating tag marquee

### Programs (`/programs`)
Grid of 5 program cards. Each card: image, level title, tag pills, short description, "View Program" button → `/programs/[slug]`.

**Slugs:** `beginners`, `juniors`, `adults`, `professionals`, `elite`

### Program Detail (`/programs/[slug]`)
- Full-width hero image with program name overlay
- Description paragraph
- Tag pills (skills covered)
- Placeholder schedule table
- "Book This Program" CTA → `/contact?inquiry=program&program=[slug]`

### Courts (`/courts`)
- Full-bleed hero court image
- Court types checklist (Glass-Back, Indoor, Outdoor, Clay)
- Booking widget: date picker, time slot selector, number of players, "Request Booking" button → sonner toast confirmation

### Membership (`/membership`)
- 3-tier pricing cards: Starter (€29), Pro (€79), Elite (€149)
- Each card: features list, "Get Started" → `/contact?plan=[name]`
- Feature comparison table
- FAQ accordion (5–6 items)

### About (`/about`)
- Mission statement hero section
- 3 value cards (matching existing Benefits component aesthetic)
- Coach grid: placeholder 4–6 cards (name, title, avatar placeholder)

### Contact (`/contact`)
- Heading + subtext
- Form: Name, Email, Inquiry Type (dropdown: General, Program, Court Booking, Membership), Message
- react-hook-form + zod validation (required fields, email format)
- Submit → sonner toast "Message sent! We'll be in touch soon."
- URL params `?plan=` and `?inquiry=` pre-fill the Inquiry Type dropdown

---

## 4. Navigation

**Navbar (sticky, full-width):**
- Left: Padelio logo (text or SVG)
- Center: Links — Programs, Courts, Membership, About, Contact
- Right: "Book a Court" button (green, → `/courts`)
- Mobile: hamburger icon → full-screen overlay menu, links staggered in with GSAP

**Active state:** Current route highlighted (Next.js `usePathname`)

**GSAP scroll behavior:**
- On page load: nav starts transparent/minimal
- After scroll > 80px: border-bottom + box-shadow appear, height reduces from 72px to 60px
- Uses `ScrollTrigger` with `scrub: false` (snap-style toggle)

---

## 5. Footer

Dark forest green (`#166534`) background. 4 columns:

| Column | Links |
|---|---|
| Academy | About Us, Our Coaches, Mission, Contact |
| Programs | Beginners, Juniors, Adults, Professionals, Elite |
| Booking | Book a Court, Court Types, Membership |
| Connect | Instagram, Twitter/X, Facebook, LinkedIn |

All links use Next.js `<Link>` component. Social icons: lucide-react icons.

---

## 6. GSAP Animation System

### Setup

`/lib/gsap.ts` registers plugins once:
```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };
```

All components import from `/lib/gsap.ts` (not directly from `gsap`).

### Animation Inventory

| Name | Element | Effect | Trigger |
|---|---|---|---|
| `heroFadeIn` | Hero text block | Opacity 0→1, y: 30→0 | On mount, 0.8s |
| `fadeUpStagger` | Section headings, subheadings | y: 40→0, opacity 0→1, stagger 0.12s | ScrollTrigger, start: "top 80%" |
| `cardReveal` | Program cards, benefit cards, pricing cards | y: 60→0, opacity 0→1, stagger 0.1s | ScrollTrigger, start: "top 85%" |
| `counterUp` | Stats numbers | Count from 0 to target value | ScrollTrigger, once: true |
| `parallaxBg` | Hero background image, Stories images | y moves at 0.3x scroll speed | ScrollTrigger, scrub: 1 |
| `marquee` | Testimonial floating tags | Infinite horizontal translate | GSAP ticker / repeat loop |
| `navShrink` | Navbar | Height + shadow toggle | ScrollTrigger, scrub: false |
| `storyHover` | Story grid cards | Scale 1→1.05 on hover | GSAP `to` on mouseenter/leave |

### Accessibility

All animations wrapped in:
```typescript
const mm = gsap.matchMedia();
mm.add('(prefers-reduced-motion: no-preference)', () => {
  // animation setup
});
```

### Cleanup

Every `useGSAP` hook returns a cleanup function via the `@gsap/react` context — no manual `kill()` needed.

---

## 7. Data Layer

All content moves from inline `App.tsx` to `/lib/data.ts` and exported as typed constants:

```typescript
export const programs: Program[] = [...]
export const plans: Plan[] = [...]
export const testimonials: Testimonial[] = [...]
export const stats: Stat[] = [...]
export const stories: Story[] = [...]
export const benefits: Benefit[] = [...]
export const courtTypes: CourtType[] = [...]
export const floatingTags: string[] = [...]
export const footerColumns: FooterColumn[] = [...]
```

TypeScript interfaces defined in `/lib/types.ts`.

---

## 8. Forms & Validation

- **Library:** react-hook-form + zod
- **Booking widget** (courts page): date (required, future date), time slot (required), players 1–4 (required)
- **Contact form**: name (required, min 2), email (required, valid format), inquiry type (required), message (required, min 10)
- **On valid submit:** sonner toast confirmation. No HTTP request.
- **On invalid:** Inline field error messages using shadcn `<FormMessage>`

---

## 9. Styling Preservation

The following migrate unchanged:
- `src/styles/theme.css` → `app/globals.css` (merged)
- `src/styles/fonts.css` → replaced by `next/font/google` in `layout.tsx`
- `src/styles/tailwind.css` → `postcss.config.mjs` updated for `@tailwindcss/postcss`
- All CSS custom properties (`--color-primary`, `--font-display`, etc.) preserved
- shadcn/ui components in `src/app/components/ui/` → `app/components/ui/` (unchanged)

---

## 10. Out of Scope

The following are explicitly out of scope for this implementation:
- Real backend API integration
- Authentication (login/signup/dashboard)
- Payment processing (Stripe or similar)
- Database (no bookings saved)
- Dark mode toggle (next-themes installed but not wired)
- SEO meta tags beyond basic Next.js defaults
- Image optimization beyond Next.js `<Image>` component basics
- i18n / localization
