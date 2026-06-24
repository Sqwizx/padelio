# Padelio Next.js Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the existing Vite + React SPA to Next.js 15 App Router with GSAP scroll animations, multi-page routing, and push to GitHub at Sqwizx/padelio.

**Architecture:** In-place migration — replace Vite with Next.js, restructure into /app directory, split App.tsx into per-page components, extract all data to /lib/data.ts, add GSAP ScrollTrigger animations to every section.

**Tech Stack:** Next.js 15, React 18, Tailwind CSS v4, shadcn/ui, GSAP + @gsap/react + ScrollTrigger, react-hook-form, zod, lucide-react, sonner.

## Global Constraints

- Next.js 15 App Router only — no Pages Router
- Tailwind CSS v4 with `@tailwindcss/postcss` (not vite plugin)
- All GSAP animations wrapped in `gsap.matchMedia` with `prefers-reduced-motion: no-preference`
- All components using GSAP or browser APIs must have `'use client'` directive
- Colors: primary green `#3DD68C`, forest green `#166534`, bone white `#F5F0E8`, charcoal `#1C1C1A`
- Fonts: Urbanist (display, weights 400–900), DM Sans (body, weights 400–600)
- All inter-page links use Next.js `<Link>` — never `<a href>`
- Git user: name=Azzam, email=azzamhamiludin@gmail.com
- Push to: github.com/Sqwizx/padelio

---

## File Map

```
padelio/
├── app/
│   ├── globals.css              # merged theme + tailwind directives
│   ├── layout.tsx               # root layout: fonts, Nav, Footer, Toaster
│   ├── page.tsx                 # Home page assembly
│   ├── programs/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── courts/page.tsx
│   ├── membership/page.tsx
│   ├── about/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── nav.tsx                  # sticky nav, mobile menu, GSAP shrink
│   ├── footer.tsx               # dark green footer, Next.js Links
│   ├── home/
│   │   ├── hero.tsx
│   │   ├── stats-strip.tsx      # GSAP counter animation
│   │   ├── mission.tsx
│   │   ├── stories.tsx
│   │   ├── benefits.tsx
│   │   └── testimonials.tsx     # carousel + marquee
│   ├── programs/
│   │   └── program-card.tsx
│   ├── courts/
│   │   └── booking-widget.tsx
│   ├── membership/
│   │   ├── pricing-card.tsx
│   │   └── faq-accordion.tsx
│   ├── contact/
│   │   └── contact-form.tsx
│   └── ui/                      # existing 48 shadcn components (moved)
├── lib/
│   ├── types.ts
│   ├── data.ts
│   ├── gsap.ts                  # registers plugins once
│   └── utils.ts                 # cn()
├── next.config.ts
├── postcss.config.mjs
└── package.json
```

---

### Task 1: Bootstrap Next.js (replace Vite)

**Files:**
- Modify: `package.json`
- Create: `next.config.ts`
- Modify: `postcss.config.mjs`
- Delete: `vite.config.ts`, `index.html`, `src/main.tsx`

- [ ] **Step 1: Install Next.js, remove Vite**

```bash
cd D:/hmg-Projects/padelio
pnpm remove vite @vitejs/plugin-react @tailwindcss/vite react-router react-router-dom
pnpm add next@15 gsap @gsap/react zod @hookform/resolvers
```

- [ ] **Step 2: Update package.json scripts**

Replace the `scripts` block in `package.json`:
```json
{
  "name": "padelio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  }
}
```

Also add to `package.json` dependencies if missing:
```json
"@tailwindcss/postcss": "^4.1.12",
"next": "^15.0.0",
"gsap": "^3.12.0",
"@gsap/react": "^2.1.0",
"zod": "^3.23.0",
"@hookform/resolvers": "^3.9.0"
```

- [ ] **Step 3: Create next.config.ts**

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 4: Update postcss.config.mjs**

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

- [ ] **Step 5: Delete Vite artifacts**

```bash
rm vite.config.ts index.html src/main.tsx src/app/App.tsx
```

- [ ] **Step 6: Verify Next.js is recognized**

```bash
pnpm next --version
```
Expected: prints `15.x.x`

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: replace vite with next.js 15, add gsap + zod"
```

---

### Task 2: Directory Structure & Global Styles

**Files:**
- Create: `app/globals.css`
- Create: `lib/utils.ts`
- Move: `src/app/components/ui/` → `components/ui/`

- [ ] **Step 1: Create directory skeleton**

```bash
mkdir -p app/programs/\[slug\] app/courts app/membership app/about app/contact
mkdir -p components/home components/programs components/courts components/membership components/contact components/ui
mkdir -p lib public/images
```

- [ ] **Step 2: Move existing shadcn UI components**

```bash
cp -r src/app/components/ui/. components/ui/
```

- [ ] **Step 3: Create lib/utils.ts**

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 4: Create app/globals.css**

This merges `src/styles/tailwind.css`, `src/styles/theme.css`, and `src/styles/fonts.css` (fonts handled by next/font instead):

```css
@import "tailwindcss";

@layer base {
  :root {
    --color-primary: #3DD68C;
    --color-primary-dark: #166534;
    --color-bg: #F5F0E8;
    --color-surface: #EDE8DF;
    --color-text: #1C1C1A;
    --color-muted: #6B6B5E;
    --color-border: #D8D3CA;

    --font-display: var(--font-urbanist);
    --font-body: var(--font-dm-sans);

    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 16px;
    --radius-xl: 24px;
    --radius-full: 9999px;

    --shadow-soft: 0 2px 8px rgba(0,0,0,0.06);
    --shadow-medium: 0 4px 16px rgba(0,0,0,0.10);
    --shadow-elevated: 0 8px 32px rgba(0,0,0,0.14);
    --shadow-green: 0 4px 20px rgba(61,214,140,0.25);
  }

  *, *::before, *::after { box-sizing: border-box; }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
  }

  body {
    background-color: var(--color-bg);
    color: var(--color-text);
    font-family: var(--font-body), system-ui, sans-serif;
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display), system-ui, sans-serif;
    font-weight: 800;
    line-height: 1.1;
  }
}
```

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold next.js directory structure, migrate styles"
```

---

### Task 3: Data & Types Layer

**Files:**
- Create: `lib/types.ts`
- Create: `lib/data.ts`

- [ ] **Step 1: Create lib/types.ts**

```typescript
import type { LucideIcon } from 'lucide-react';

export interface Program {
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  desc: string;
  img: string;
  imgAlt: string;
}

export interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  accent?: boolean;
  dark?: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Stat {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
}

export interface Story {
  cat: string;
  title: string;
  img: string;
  alt: string;
}

export interface Benefit {
  iconName: 'Zap' | 'Users' | 'Star';
  title: string;
  desc: string;
}

export interface CourtType {
  name: string;
  note: string;
}

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}
```

- [ ] **Step 2: Create lib/data.ts**

```typescript
import type { Program, Plan, Testimonial, Stat, Story, Benefit, CourtType, FooterColumn } from './types';

export const programs: Program[] = [
  {
    slug: 'beginners',
    title: 'For Beginners',
    subtitle: 'Start your padel journey',
    tags: ['Confidence Building', 'Fundamentals', 'Ball Control', 'Court Awareness'],
    desc: 'Perfect for those new to padel. Our structured beginner program covers all the basics — grip, stance, serve, and rally — in a fun, welcoming environment.',
    img: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800',
    imgAlt: 'Beginner padel session',
  },
  {
    slug: 'juniors',
    title: 'For Junior & Kids',
    subtitle: 'Fun-first learning for ages 6–16',
    tags: ['Fun Learning', 'Coordination', 'Team Spirit', 'Motor Skills'],
    desc: 'Designed for young players aged 6–16, this program blends skill development with games that keep kids engaged, active, and coming back for more.',
    img: 'https://images.unsplash.com/photo-1576972405668-2d020a01cbfa?w=800',
    imgAlt: 'Junior padel training',
  },
  {
    slug: 'adults',
    title: 'For Adults',
    subtitle: 'Fitness and technique in balance',
    tags: ['Fitness Focus', 'Technique', 'Strategy', 'Social Play'],
    desc: 'Our adult program combines cardio fitness with tactical padel skills. Suitable for all fitness levels — play at your own pace and improve every session.',
    img: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800',
    imgAlt: 'Adult padel class',
  },
  {
    slug: 'professionals',
    title: 'For Professionals',
    subtitle: 'Compete at the next level',
    tags: ['Advanced Tactics', 'Competition Prep', 'Performance', 'Match Play'],
    desc: 'For competitive players looking to sharpen their game. Intensive sessions focus on tournament-level tactics, mental resilience, and physical conditioning.',
    img: 'https://images.unsplash.com/photo-1599586120429-48281b6f0ece?w=800',
    imgAlt: 'Professional padel training',
  },
  {
    slug: 'elite',
    title: 'Elite 1-on-1',
    subtitle: 'Personalized coaching at its finest',
    tags: ['Personalized Training', 'Mental Game', 'Peak Performance', 'Video Analysis'],
    desc: 'One-on-one sessions with our top coaches. Every drill, every rep is tailored to your specific weaknesses and goals. The fastest way to elevate your game.',
    img: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800',
    imgAlt: 'Elite one-on-one coaching',
  },
];

export const plans: Plan[] = [
  {
    name: 'Starter',
    price: '€29',
    period: '/mo',
    features: [
      '2 court bookings per month',
      'Access to group sessions',
      'Locker room access',
      'Member app access',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    price: '€79',
    period: '/mo',
    features: [
      '8 court bookings per month',
      'Unlimited group sessions',
      'Priority court booking',
      'Coaching discount 20%',
      'Guest passes x2/month',
    ],
    cta: 'Get Started',
    accent: true,
  },
  {
    name: 'Elite',
    price: '€149',
    period: '/mo',
    features: [
      'Unlimited court bookings',
      'All group sessions included',
      'Monthly 1-on-1 coaching',
      'Coaching discount 40%',
      'Unlimited guest passes',
      'Dedicated locker',
    ],
    cta: 'Get Started',
    dark: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: 'Padelio completely changed how I spend my weekends. The courts are world-class and the coaching staff genuinely cares about your progress.',
    name: 'Sofia Merano',
    role: 'Pro Member',
    avatar: 'https://i.pravatar.cc/80?img=47',
  },
  {
    quote: 'My kids beg to come every week. The junior program is so well structured — they\'ve improved more in 3 months than I expected in a year.',
    name: 'David Keller',
    role: 'Member of Club',
    avatar: 'https://i.pravatar.cc/80?img=12',
  },
  {
    quote: 'Best sports investment I\'ve made. The Elite membership pays for itself with the 1-on-1 sessions alone. Absolutely recommend.',
    name: 'Amara Diallo',
    role: 'Elite Member',
    avatar: 'https://i.pravatar.cc/80?img=32',
  },
];

export const stats: Stat[] = [
  { value: '2018', numericValue: 2018, suffix: '', label: 'Founded' },
  { value: '300+', numericValue: 300, suffix: '+', label: 'Members' },
  { value: '18', numericValue: 18, suffix: '', label: 'Courts' },
  { value: '5★', numericValue: 5, suffix: '★', label: 'Rating' },
  { value: '40+', numericValue: 40, suffix: '+', label: 'Sessions/wk' },
  { value: '12', numericValue: 12, suffix: '', label: 'Pro Coaches' },
];

export const stories: Story[] = [
  { cat: 'Coaching', title: 'How our coaches build champions', img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600', alt: 'Coaching session' },
  { cat: 'Community', title: 'A community that celebrates together', img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600', alt: 'Community event' },
  { cat: 'Training', title: 'Training methods that deliver results', img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600', alt: 'Training' },
  { cat: 'Courts', title: 'Our courts — built for performance', img: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600', alt: 'Padel court' },
];

export const benefits: Benefit[] = [
  { iconName: 'Zap', title: 'Full-Body Workout', desc: 'Padel engages every muscle group. Improve agility, strength, and endurance in every match.' },
  { iconName: 'Users', title: 'Vibrant Community', desc: 'Join a welcoming network of players. Make friends, find partners, and enjoy social events year-round.' },
  { iconName: 'Star', title: 'For All Ages', desc: 'From 6 to 60+, padel is accessible to everyone. Our programs adapt to any fitness level and skill.' },
];

export const courtTypes: CourtType[] = [
  { name: 'Glass-Back Courts', note: 'Indoor climate-controlled' },
  { name: 'Open-Air Courts', note: 'Floodlit for evening play' },
  { name: 'Clay Surface Courts', note: 'Softer on joints' },
  { name: 'Synthetic Turf', note: 'All-weather performance' },
];

export const floatingTags: string[] = [
  'Best Courts', 'Amazing Coaches', 'Great Community', 'Top Equipment',
  'World-Class Facilities', 'Friendly Staff', 'Perfect for Families', 'Competitive Play',
];

export const footerColumns: FooterColumn[] = [
  {
    heading: 'Academy',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Coaches', href: '/about#coaches' },
      { label: 'Mission', href: '/about#mission' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Programs',
    links: [
      { label: 'Beginners', href: '/programs/beginners' },
      { label: 'Juniors', href: '/programs/juniors' },
      { label: 'Adults', href: '/programs/adults' },
      { label: 'Professionals', href: '/programs/professionals' },
      { label: 'Elite 1-on-1', href: '/programs/elite' },
    ],
  },
  {
    heading: 'Booking',
    links: [
      { label: 'Book a Court', href: '/courts' },
      { label: 'Court Types', href: '/courts#types' },
      { label: 'Membership', href: '/membership' },
      { label: 'Programs', href: '/programs' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Instagram', href: '#' },
      { label: 'Twitter / X', href: '#' },
      { label: 'Facebook', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
  },
];
```

- [ ] **Step 3: Verify types compile**

```bash
pnpm typecheck
```
Expected: no errors related to types.ts or data.ts

- [ ] **Step 4: Commit**

```bash
git add lib/
git commit -m "feat: add typed data layer (programs, plans, testimonials, stats)"
```

---

### Task 4: GSAP Infrastructure

**Files:**
- Create: `lib/gsap.ts`

- [ ] **Step 1: Create lib/gsap.ts**

```typescript
'use client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
```

- [ ] **Step 2: Commit**

```bash
git add lib/gsap.ts
git commit -m "feat: add gsap plugin registration helper"
```

---

### Task 5: Root Layout + Nav

**Files:**
- Create: `app/layout.tsx`
- Create: `components/nav.tsx`

- [ ] **Step 1: Create components/nav.tsx**

```tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Programs', href: '/programs' },
  { label: 'Courts', href: '/courts' },
  { label: 'Membership', href: '/membership' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export function Nav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      ScrollTrigger.create({
        start: 'top -80',
        onEnter: () => {
          gsap.to(navRef.current, {
            borderBottomColor: 'rgba(28,28,26,0.08)',
            boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
            paddingTop: '12px',
            paddingBottom: '12px',
            duration: 0.3,
            ease: 'power2.out',
          });
        },
        onLeaveBack: () => {
          gsap.to(navRef.current, {
            borderBottomColor: 'transparent',
            boxShadow: 'none',
            paddingTop: '20px',
            paddingBottom: '20px',
            duration: 0.3,
            ease: 'power2.out',
          });
        },
      });
    });
  }, { scope: navRef });

  useEffect(() => {
    if (!mobileLinksRef.current) return;
    const items = mobileLinksRef.current.querySelectorAll('a');
    if (open) {
      gsap.fromTo(items,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, [open]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5 flex items-center justify-between"
        style={{ background: 'var(--color-bg)', borderBottom: '1px solid transparent', transition: 'background 0.3s' }}
      >
        <Link href="/" className="text-xl font-black tracking-tight" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-primary-dark)' }}>
          PADELIO
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors hover:text-[#3DD68C]"
              style={{ color: pathname === l.href ? '#3DD68C' : 'var(--color-text)' }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/courts"
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
            style={{ background: '#3DD68C', color: '#1C1C1A' }}
          >
            Book a Court
          </Link>
          <button
            className="md:hidden p-2"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-24 px-8 gap-6"
          style={{ background: 'var(--color-bg)' }}
        >
          <div ref={mobileLinksRef} className="flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-3xl font-black"
                style={{ fontFamily: 'var(--font-display)', color: pathname === l.href ? '#3DD68C' : 'var(--color-text)' }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/courts"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex w-fit items-center px-6 py-3 rounded-full text-base font-semibold"
              style={{ background: '#3DD68C', color: '#1C1C1A' }}
            >
              Book a Court
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
```

- [ ] **Step 2: Create app/layout.tsx**

```tsx
import type { Metadata } from 'next';
import { Urbanist, DM_Sans } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import './globals.css';

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-urbanist',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Padelio — Premium Padel Academy',
  description: 'World-class padel courts, expert coaching programs, and a vibrant community. Join Padelio today.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${urbanist.variable} ${dmSans.variable}`}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify dev server starts**

```bash
pnpm dev
```
Expected: Next.js compiles, no red errors. Visit http://localhost:3000 — nav renders (footer will 404 until Task 6).

- [ ] **Step 4: Commit**

```bash
git add app/layout.tsx components/nav.tsx
git commit -m "feat: add root layout with next/font and sticky nav with GSAP scroll shrink"
```

---

### Task 6: Footer

**Files:**
- Create: `components/footer.tsx`

- [ ] **Step 1: Create components/footer.tsx**

```tsx
import Link from 'next/link';
import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import { footerColumns } from '@/lib/data';

const socialIcons = [
  { Icon: Instagram, label: 'Instagram', href: '#' },
  { Icon: Twitter, label: 'Twitter', href: '#' },
  { Icon: Facebook, label: 'Facebook', href: '#' },
  { Icon: Linkedin, label: 'LinkedIn', href: '#' },
];

export function Footer() {
  return (
    <footer style={{ background: '#166534', color: '#F5F0E8' }} className="pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-4 opacity-60">{col.heading}</p>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm opacity-80 hover:opacity-100 hover:text-[#3DD68C] transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-2xl font-black" style={{ fontFamily: 'var(--font-display)' }}>PADELIO</p>
          <div className="flex items-center gap-4">
            {socialIcons.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          <p className="text-xs opacity-50">© {new Date().getFullYear()} Padelio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify footer renders**

Run `pnpm dev`, visit http://localhost:3000 — footer should appear at page bottom in dark green.

- [ ] **Step 3: Commit**

```bash
git add components/footer.tsx
git commit -m "feat: add footer with next.js links and social icons"
```

---

### Task 7: Home Page — Hero + Stats

**Files:**
- Create: `components/home/hero.tsx`
- Create: `components/home/stats-strip.tsx`

- [ ] **Step 1: Create components/home/hero.tsx**

```tsx
'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        containerRef.current!.querySelectorAll('.hero-animate'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: 'power3.out', delay: 0.2 }
      );
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 80% 40%, #3DD68C, transparent 60%)' }}
      />

      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Left: text */}
        <div className="flex flex-col gap-6">
          <span
            className="hero-animate inline-flex w-fit items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{ background: 'rgba(61,214,140,0.15)', color: '#3DD68C' }}
          >
            Premium Padel Academy
          </span>

          <h1
            className="hero-animate text-5xl md:text-7xl font-black leading-none"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            Play Padel.<br />
            <span style={{ color: '#3DD68C' }}>Love the Game.</span>
          </h1>

          <p
            className="hero-animate text-lg leading-relaxed max-w-md"
            style={{ color: 'var(--color-muted)' }}
          >
            World-class courts, expert coaching, and a community that celebrates every rally. Join Padelio and transform your game.
          </p>

          <div className="hero-animate flex flex-wrap gap-3">
            <Link
              href="/courts"
              className="inline-flex items-center px-7 py-3.5 rounded-full font-semibold text-base transition-all hover:scale-105"
              style={{ background: '#3DD68C', color: '#1C1C1A', boxShadow: '0 4px 20px rgba(61,214,140,0.35)' }}
            >
              Book a Court
            </Link>
            <Link
              href="/programs"
              className="inline-flex items-center px-7 py-3.5 rounded-full font-semibold text-base border transition-all hover:bg-white/50"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              View Programs
            </Link>
          </div>
        </div>

        {/* Right: image */}
        <div className="hero-animate relative rounded-2xl overflow-hidden aspect-[4/5] md:aspect-auto md:h-[540px]">
          <img
            src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=900"
            alt="Padel court at Padelio"
            className="w-full h-full object-cover"
          />
          {/* Floating badge */}
          <div
            className="absolute bottom-6 left-6 px-4 py-3 rounded-xl backdrop-blur-sm"
            style={{ background: 'rgba(245,240,232,0.9)', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
          >
            <p className="text-xs font-semibold" style={{ color: 'var(--color-muted)' }}>Members worldwide</p>
            <p className="text-2xl font-black" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>300+</p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create components/home/stats-strip.tsx**

```tsx
'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { stats } from '@/lib/data';

export function StatsStrip() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      stats.forEach((stat, i) => {
        const el = ref.current!.querySelectorAll('.stat-value')[i] as HTMLElement;
        if (!el) return;
        gsap.fromTo(
          { val: 0 },
          {
            val: stat.numericValue,
            duration: 1.8,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
            onUpdate: function () {
              el.textContent = Math.round(this.targets()[0].val) + stat.suffix;
            },
          }
        );
      });

      gsap.fromTo(
        ref.current!.querySelectorAll('.stat-item'),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } }
      );
    });
  }, { scope: ref });

  return (
    <div
      ref={ref}
      className="py-10 border-y"
      style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-3 md:grid-cols-6 gap-6 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-item flex flex-col gap-1">
            <span
              className="stat-value text-3xl font-black"
              style={{ fontFamily: 'var(--font-display)', color: '#166534' }}
            >
              {stat.value}
            </span>
            <span className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/home/hero.tsx components/home/stats-strip.tsx
git commit -m "feat: hero section with GSAP fade-in and stats strip with counter animation"
```

---

### Task 8: Home Page — Mission, Stories, Benefits, Testimonials

**Files:**
- Create: `components/home/mission.tsx`
- Create: `components/home/stories.tsx`
- Create: `components/home/benefits.tsx`
- Create: `components/home/testimonials.tsx`

- [ ] **Step 1: Create components/home/mission.tsx**

```tsx
'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

export function Mission() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(ref.current!.querySelectorAll('.reveal'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } }
      );
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="py-24 max-w-4xl mx-auto px-6 text-center">
      <span className="reveal inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-3 py-1 rounded-full"
        style={{ background: 'rgba(61,214,140,0.12)', color: '#3DD68C' }}>
        Who We Are
      </span>
      <h2 className="reveal text-4xl md:text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
        More than a club.<br />A movement.
      </h2>
      <p className="reveal text-lg leading-relaxed" style={{ color: 'var(--color-muted)' }}>
        Founded in 2018, Padelio was built on one belief: padel should be for everyone. We created a space where beginners find confidence, competitors find challenge, and everyone finds community. Our 12 professional coaches bring decades of combined experience — and a passion for the sport that's contagious.
      </p>
    </section>
  );
}
```

- [ ] **Step 2: Create components/home/stories.tsx**

```tsx
'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { stories } from '@/lib/data';

export function Stories() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(ref.current!.querySelectorAll('.story-card'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } }
      );
    });
  }, { scope: ref });

  return (
    <section className="py-20" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-black mb-10" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
          Our Stories
        </h2>
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stories.map((s) => (
            <div
              key={s.cat}
              className="story-card group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer"
            >
              <img
                src={s.img}
                alt={s.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <span className="text-xs font-semibold uppercase tracking-widest px-2 py-1 rounded-full mb-2 inline-block"
                  style={{ background: '#3DD68C', color: '#1C1C1A' }}>
                  {s.cat}
                </span>
                <p className="text-white text-sm font-semibold leading-tight">{s.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create components/home/benefits.tsx**

```tsx
'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Zap, Users, Star } from 'lucide-react';
import { benefits } from '@/lib/data';

const iconMap = { Zap, Users, Star };

export function Benefits() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(ref.current!.querySelectorAll('.benefit-card'),
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } }
      );
    });
  }, { scope: ref });

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
            style={{ background: 'rgba(61,214,140,0.12)', color: '#3DD68C' }}>
            Why Padel
          </span>
          <h2 className="text-4xl font-black" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
            Good for body. Good for soul.
          </h2>
        </div>
        <div ref={ref} className="grid md:grid-cols-3 gap-6">
          {benefits.map((b) => {
            const Icon = iconMap[b.iconName];
            return (
              <div
                key={b.title}
                className="benefit-card p-8 rounded-2xl flex flex-col gap-4"
                style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-soft)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(61,214,140,0.15)' }}>
                  <Icon size={22} style={{ color: '#3DD68C' }} />
                </div>
                <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
                  {b.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create components/home/testimonials.tsx**

```tsx
'use client';
import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials, floatingTags } from '@/lib/data';

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(ref.current!.querySelectorAll('.testimonial-card'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true } }
      );

      // Marquee: duplicate tags and animate
      const el = marqueeRef.current;
      if (!el) return;
      const totalWidth = el.scrollWidth / 2;
      gsap.to(el, {
        x: -totalWidth,
        duration: 20,
        ease: 'none',
        repeat: -1,
      });
    });
  }, { scope: ref });

  return (
    <section className="py-24 overflow-hidden" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-black" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
            What members say
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-white transition-colors"
              style={{ borderColor: 'var(--color-border)' }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setActive((a) => (a + 1) % testimonials.length)}
              className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-white transition-colors"
              style={{ borderColor: 'var(--color-border)' }}
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div ref={ref} className="grid md:grid-cols-3 gap-6 mb-12">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="testimonial-card p-7 rounded-2xl flex flex-col gap-4 transition-all duration-300"
              style={{
                background: i === active ? '#166534' : 'white',
                color: i === active ? '#F5F0E8' : 'var(--color-text)',
                boxShadow: i === active ? '0 8px 32px rgba(22,101,52,0.2)' : 'var(--shadow-soft)',
                transform: i === active ? 'translateY(-4px)' : 'none',
              }}
            >
              <p className="text-sm leading-relaxed italic opacity-90">"{t.quote}"</p>
              <div className="flex items-center gap-3 mt-auto">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs opacity-60">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Marquee */}
        <div className="overflow-hidden">
          <div ref={marqueeRef} className="flex gap-3 whitespace-nowrap">
            {[...floatingTags, ...floatingTags].map((tag, i) => (
              <span
                key={i}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium flex-shrink-0"
                style={{ background: 'rgba(61,214,140,0.12)', color: '#166534' }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add components/home/
git commit -m "feat: home page sections (mission, stories, benefits, testimonials) with GSAP"
```

---

### Task 9: Home Page Assembly

**Files:**
- Create: `app/page.tsx`

- [ ] **Step 1: Create app/page.tsx**

```tsx
import { Hero } from '@/components/home/hero';
import { StatsStrip } from '@/components/home/stats-strip';
import { Mission } from '@/components/home/mission';
import { Stories } from '@/components/home/stories';
import { Benefits } from '@/components/home/benefits';
import { Testimonials } from '@/components/home/testimonials';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsStrip />
      <Mission />
      <Stories />
      <Benefits />
      <Testimonials />
    </>
  );
}
```

- [ ] **Step 2: Verify home page renders fully**

Run `pnpm dev`, visit http://localhost:3000. Check:
- Hero text animates in on load
- Stats count up on scroll
- Story cards fade in on scroll
- Testimonial carousel controls work
- Marquee scrolls continuously

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: assemble home page with all sections"
```

---

### Task 10: Programs Pages

**Files:**
- Create: `components/programs/program-card.tsx`
- Create: `app/programs/page.tsx`
- Create: `app/programs/[slug]/page.tsx`

- [ ] **Step 1: Create components/programs/program-card.tsx**

```tsx
import Link from 'next/link';
import type { Program } from '@/lib/types';

export function ProgramCard({ program }: { program: Program }) {
  return (
    <div
      className="group rounded-2xl overflow-hidden flex flex-col"
      style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-soft)' }}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={program.img}
          alt={program.imgAlt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
          {program.title}
        </h3>
        <p className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>{program.subtitle}</p>
        <div className="flex flex-wrap gap-2">
          {program.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full font-medium"
              style={{ background: 'rgba(61,214,140,0.12)', color: '#166534' }}
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-sm leading-relaxed mt-1" style={{ color: 'var(--color-muted)' }}>{program.desc}</p>
        <Link
          href={`/programs/${program.slug}`}
          className="mt-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 w-fit"
          style={{ background: '#3DD68C', color: '#1C1C1A' }}
        >
          View Program →
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create app/programs/page.tsx**

```tsx
'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { programs } from '@/lib/data';
import { ProgramCard } from '@/components/programs/program-card';

export default function ProgramsPage() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(ref.current!.querySelectorAll('.prog-card'),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } }
      );
    });
  }, { scope: ref });

  return (
    <div className="pt-32 pb-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
            style={{ background: 'rgba(61,214,140,0.12)', color: '#3DD68C' }}>
            Training Programs
          </span>
          <h1 className="text-5xl font-black mb-4" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
            Find your program
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-muted)' }}>
            Whether you're picking up a racket for the first time or competing at a high level, we have a program built for you.
          </p>
        </div>
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p) => (
            <div key={p.slug} className="prog-card">
              <ProgramCard program={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create app/programs/[slug]/page.tsx**

```tsx
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { programs } from '@/lib/data';

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export default function ProgramDetailPage({ params }: { params: { slug: string } }) {
  const program = programs.find((p) => p.slug === params.slug);
  if (!program) notFound();

  return (
    <div className="pt-24 pb-24" style={{ background: 'var(--color-bg)' }}>
      {/* Hero image */}
      <div className="relative h-72 md:h-96 overflow-hidden mb-12">
        <img src={program.img} alt={program.imgAlt} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-8 left-8 right-8">
          <h1 className="text-4xl md:text-5xl font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>
            {program.title}
          </h1>
          <p className="text-white/80 mt-2">{program.subtitle}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        <div className="flex flex-wrap gap-2 mb-8">
          {program.tags.map((tag) => (
            <span key={tag} className="text-sm px-4 py-1.5 rounded-full font-medium"
              style={{ background: 'rgba(61,214,140,0.12)', color: '#166534' }}>
              {tag}
            </span>
          ))}
        </div>

        <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--color-muted)' }}>{program.desc}</p>

        {/* Placeholder schedule */}
        <div className="rounded-2xl p-6 mb-10" style={{ background: 'var(--color-surface)' }}>
          <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
            Sample Schedule
          </h2>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                <th className="text-left py-2 font-semibold">Day</th>
                <th className="text-left py-2 font-semibold">Time</th>
                <th className="text-left py-2 font-semibold">Duration</th>
              </tr>
            </thead>
            <tbody>
              {[['Monday', '09:00 – 10:30', '90 min'], ['Wednesday', '18:00 – 19:30', '90 min'], ['Saturday', '10:00 – 12:00', '120 min']].map(([day, time, dur]) => (
                <tr key={day} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td className="py-3">{day}</td>
                  <td className="py-3" style={{ color: 'var(--color-muted)' }}>{time}</td>
                  <td className="py-3" style={{ color: 'var(--color-muted)' }}>{dur}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link
          href={`/contact?inquiry=program&program=${program.slug}`}
          className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-base transition-all hover:scale-105"
          style={{ background: '#3DD68C', color: '#1C1C1A', boxShadow: '0 4px 20px rgba(61,214,140,0.3)' }}
        >
          Book This Program →
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify programs routing**

Visit http://localhost:3000/programs — all 5 cards render.
Visit http://localhost:3000/programs/beginners — detail page renders.
Visit http://localhost:3000/programs/invalid — shows Next.js 404.

- [ ] **Step 5: Commit**

```bash
git add app/programs/ components/programs/
git commit -m "feat: programs listing page and dynamic program detail pages"
```

---

### Task 11: Courts Page

**Files:**
- Create: `components/courts/booking-widget.tsx`
- Create: `app/courts/page.tsx`

- [ ] **Step 1: Create components/courts/booking-widget.tsx**

```tsx
'use client';
import { useState } from 'react';
import { toast } from 'sonner';

const timeSlots = ['08:00', '09:30', '11:00', '13:00', '14:30', '16:00', '17:30', '19:00', '20:30'];

export function BookingWidget() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [players, setPlayers] = useState('2');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !time) {
      toast.error('Please select a date and time slot.');
      return;
    }
    toast.success(`Court requested for ${date} at ${time} — we'll confirm shortly!`);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl p-8 flex flex-col gap-5"
      style={{ background: 'white', boxShadow: 'var(--shadow-elevated)' }}>
      <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
        Request a Court
      </h3>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-muted)' }}>Date</label>
        <input
          type="date"
          value={date}
          min={new Date().toISOString().split('T')[0]}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#3DD68C]"
          style={{ borderColor: 'var(--color-border)' }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-muted)' }}>Time Slot</label>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTime(t)}
              className="px-2 py-2 rounded-lg text-sm font-medium border transition-all"
              style={{
                borderColor: time === t ? '#3DD68C' : 'var(--color-border)',
                background: time === t ? 'rgba(61,214,140,0.12)' : 'white',
                color: time === t ? '#166534' : 'var(--color-text)',
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-muted)' }}>Players</label>
        <select
          value={players}
          onChange={(e) => setPlayers(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#3DD68C]"
          style={{ borderColor: 'var(--color-border)' }}
        >
          {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} {n === 1 ? 'player' : 'players'}</option>)}
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-full font-semibold text-sm transition-all hover:scale-105"
        style={{ background: '#3DD68C', color: '#1C1C1A' }}
      >
        Request Booking
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Create app/courts/page.tsx**

```tsx
'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Check } from 'lucide-react';
import { courtTypes } from '@/lib/data';
import { BookingWidget } from '@/components/courts/booking-widget';

export default function CourtsPage() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(ref.current!.querySelectorAll('.reveal'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power2.out' }
      );
    });
  }, { scope: ref });

  return (
    <div style={{ background: 'var(--color-bg)' }}>
      {/* Hero */}
      <div className="relative h-72 md:h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1400"
          alt="Padelio courts"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Our Courts
            </h1>
            <p className="text-white/80 text-lg">18 premium courts built for performance</p>
          </div>
        </div>
      </div>

      <div ref={ref} className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-start">
        {/* Court types */}
        <div>
          <span className="reveal text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6 inline-block"
            style={{ background: 'rgba(61,214,140,0.12)', color: '#3DD68C' }}>
            Court Types
          </span>
          <h2 className="reveal text-3xl font-black mb-8" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
            A court for every game
          </h2>
          <div className="reveal flex flex-col gap-4">
            {courtTypes.map((ct) => (
              <div key={ct.name} className="flex items-start gap-4 p-4 rounded-xl"
                style={{ background: 'var(--color-surface)' }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: '#3DD68C' }}>
                  <Check size={12} style={{ color: '#1C1C1A' }} />
                </div>
                <div>
                  <p className="font-semibold text-sm">{ct.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>{ct.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking widget */}
        <div className="reveal" id="book">
          <BookingWidget />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify courts page**

Visit http://localhost:3000/courts — hero image, court types, booking form. Select date + time + players, click "Request Booking" → sonner toast appears.

- [ ] **Step 4: Commit**

```bash
git add app/courts/ components/courts/
git commit -m "feat: courts page with booking widget and sonner toast confirmation"
```

---

### Task 12: Membership Page

**Files:**
- Create: `components/membership/pricing-card.tsx`
- Create: `components/membership/faq-accordion.tsx`
- Create: `app/membership/page.tsx`

- [ ] **Step 1: Create components/membership/pricing-card.tsx**

```tsx
import Link from 'next/link';
import { Check } from 'lucide-react';
import type { Plan } from '@/lib/types';

export function PricingCard({ plan }: { plan: Plan }) {
  const bg = plan.dark ? '#166534' : plan.accent ? 'white' : 'var(--color-surface)';
  const textColor = plan.dark ? '#F5F0E8' : 'var(--color-text)';
  const mutedColor = plan.dark ? 'rgba(245,240,232,0.6)' : 'var(--color-muted)';

  return (
    <div
      className="relative rounded-2xl p-8 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1"
      style={{
        background: bg,
        boxShadow: plan.accent ? '0 8px 40px rgba(61,214,140,0.25)' : 'var(--shadow-soft)',
        border: plan.accent ? '2px solid #3DD68C' : '1px solid transparent',
        color: textColor,
      }}
    >
      {plan.accent && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1.5 rounded-full"
          style={{ background: '#3DD68C', color: '#1C1C1A' }}>
          Most Popular
        </span>
      )}

      <div>
        <p className="text-sm font-semibold uppercase tracking-widest mb-1" style={{ color: plan.dark ? '#3DD68C' : '#3DD68C' }}>{plan.name}</p>
        <div className="flex items-end gap-1">
          <span className="text-5xl font-black" style={{ fontFamily: 'var(--font-display)' }}>{plan.price}</span>
          <span className="text-sm mb-2" style={{ color: mutedColor }}>{plan.period}</span>
        </div>
      </div>

      <ul className="flex flex-col gap-3 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: '#3DD68C' }} />
            <span style={{ color: mutedColor }}>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href={`/contact?plan=${plan.name.toLowerCase()}`}
        className="mt-2 w-full py-3.5 rounded-full font-semibold text-sm text-center transition-all hover:scale-105 inline-block"
        style={{
          background: plan.dark || plan.accent ? '#3DD68C' : '#166534',
          color: '#1C1C1A',
        }}
      >
        {plan.cta}
      </Link>
    </div>
  );
}
```

- [ ] **Step 2: Create components/membership/faq-accordion.tsx**

```tsx
'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'Can I cancel my membership anytime?', a: 'Yes. You can cancel with 30 days notice. No lock-in contracts.' },
  { q: 'Are court bookings transferable?', a: 'Unused bookings roll over for up to 2 months on Pro and Elite plans.' },
  { q: 'Do you offer family memberships?', a: 'Yes — contact us for custom family bundles with significant discounts.' },
  { q: 'Can I bring guests without being a member?', a: 'Non-members can book courts at a day rate of €25/hour. Members get guest passes included.' },
  { q: 'What happens if I want to upgrade my plan?', a: 'Upgrades are prorated and take effect immediately. Downgrades take effect on the next billing cycle.' },
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="flex flex-col divide-y" style={{ borderColor: 'var(--color-border)' }}>
      {faqs.map((faq, i) => (
        <div key={i} className="py-5">
          <button
            className="w-full flex items-center justify-between text-left gap-4"
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="font-semibold text-sm md:text-base">{faq.q}</span>
            <ChevronDown
              size={18}
              className="flex-shrink-0 transition-transform duration-300"
              style={{ transform: open === i ? 'rotate(180deg)' : 'none', color: '#3DD68C' }}
            />
          </button>
          {open === i && (
            <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{faq.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create app/membership/page.tsx**

```tsx
'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { plans } from '@/lib/data';
import { PricingCard } from '@/components/membership/pricing-card';
import { FaqAccordion } from '@/components/membership/faq-accordion';

export default function MembershipPage() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(ref.current!.querySelectorAll('.card-reveal'),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } }
      );
    });
  }, { scope: ref });

  return (
    <div className="pt-32 pb-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
            style={{ background: 'rgba(61,214,140,0.12)', color: '#3DD68C' }}>
            Membership Plans
          </span>
          <h1 className="text-5xl font-black mb-4" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
            Simple, honest pricing
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: 'var(--color-muted)' }}>
            No hidden fees. Cancel anytime. Choose the plan that fits your game.
          </p>
        </div>

        <div ref={ref} className="grid md:grid-cols-3 gap-6 mb-24">
          {plans.map((p) => (
            <div key={p.name} className="card-reveal">
              <PricingCard plan={p} />
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black mb-8 text-center" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
            Frequently asked questions
          </h2>
          <FaqAccordion />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify membership page**

Visit http://localhost:3000/membership — 3 pricing cards (Pro has "Most Popular" badge), FAQ accordion expands/collapses, "Get Started" links go to `/contact?plan=...`

- [ ] **Step 5: Commit**

```bash
git add app/membership/ components/membership/
git commit -m "feat: membership page with pricing cards, feature comparison and FAQ accordion"
```

---

### Task 13: About Page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1: Create app/about/page.tsx**

```tsx
'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { Zap, Users, Star } from 'lucide-react';

const values = [
  { Icon: Zap, title: 'Performance First', desc: 'Every decision we make is driven by helping you play better padel. World-class equipment, expert coaching, optimal court conditions.' },
  { Icon: Users, title: 'Community at Heart', desc: 'Padel is a social sport. We build a culture where every member is welcomed, supported, and celebrated — regardless of level.' },
  { Icon: Star, title: 'Excellence Always', desc: 'We hold ourselves to the highest standards — in our facilities, our coaching, and our service. Good enough is never enough.' },
];

const coaches = [
  { name: 'Marco Alves', role: 'Head Coach', img: 'https://i.pravatar.cc/200?img=11' },
  { name: 'Sofia Ribeiro', role: 'Junior Program Lead', img: 'https://i.pravatar.cc/200?img=47' },
  { name: 'Luca Ferretti', role: 'Performance Coach', img: 'https://i.pravatar.cc/200?img=15' },
  { name: 'Ana Costa', role: 'Fitness & Conditioning', img: 'https://i.pravatar.cc/200?img=45' },
];

export default function AboutPage() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(ref.current!.querySelectorAll('.reveal'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true } }
      );
    });
  }, { scope: ref });

  return (
    <div className="pt-32 pb-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Mission */}
        <div id="mission" className="text-center mb-24 max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 inline-block"
            style={{ background: 'rgba(61,214,140,0.12)', color: '#3DD68C' }}>
            Our Story
          </span>
          <h1 className="text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
            Built for the love of padel
          </h1>
          <p className="text-lg leading-relaxed" style={{ color: 'var(--color-muted)' }}>
            Founded in 2018 by a group of padel enthusiasts who believed the sport deserved a home worthy of its potential. Padelio started with 4 courts and 30 members. Today we have 18 courts, 300+ members, and a coaching team that has trained players from beginner to national level.
          </p>
        </div>

        {/* Values */}
        <div ref={ref} className="grid md:grid-cols-3 gap-6 mb-24">
          {values.map(({ Icon, title, desc }) => (
            <div key={title} className="reveal p-8 rounded-2xl flex flex-col gap-4"
              style={{ background: 'var(--color-surface)', boxShadow: 'var(--shadow-soft)' }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(61,214,140,0.15)' }}>
                <Icon size={22} style={{ color: '#3DD68C' }} />
              </div>
              <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Coaches */}
        <div id="coaches">
          <h2 className="text-3xl font-black mb-10 text-center" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
            Meet the coaches
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {coaches.map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-3 text-center">
                <img src={c.img} alt={c.name} className="w-24 h-24 rounded-2xl object-cover" />
                <div>
                  <p className="font-bold text-sm">{c.name}</p>
                  <p className="text-xs" style={{ color: 'var(--color-muted)' }}>{c.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/about/
git commit -m "feat: about page with mission, values, and coaches grid"
```

---

### Task 14: Contact Page

**Files:**
- Create: `components/contact/contact-form.tsx`
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Install zod resolver**

```bash
pnpm add @hookform/resolvers zod
```

- [ ] **Step 2: Create components/contact/contact-form.tsx**

```tsx
'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  inquiry: z.string().min(1, 'Please select an inquiry type'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type Fields = z.infer<typeof schema>;

const inquiryOptions = ['General', 'Program Enquiry', 'Court Booking', 'Membership', 'Other'];

export function ContactForm() {
  const params = useSearchParams();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<Fields>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const plan = params.get('plan');
    const inquiry = params.get('inquiry');
    if (plan) setValue('inquiry', 'Membership');
    else if (inquiry === 'program') setValue('inquiry', 'Program Enquiry');
  }, [params, setValue]);

  function onSubmit() {
    toast.success("Message sent! We'll be in touch within 24 hours.");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-muted)' }}>Name</label>
          <input {...register('name')} placeholder="Your name"
            className="px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#3DD68C]"
            style={{ borderColor: errors.name ? '#EF4444' : 'var(--color-border)' }} />
          {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-muted)' }}>Email</label>
          <input {...register('email')} type="email" placeholder="you@example.com"
            className="px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#3DD68C]"
            style={{ borderColor: errors.email ? '#EF4444' : 'var(--color-border)' }} />
          {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-muted)' }}>Inquiry Type</label>
        <select {...register('inquiry')}
          className="px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#3DD68C]"
          style={{ borderColor: errors.inquiry ? '#EF4444' : 'var(--color-border)' }}>
          <option value="">Select inquiry type...</option>
          {inquiryOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        {errors.inquiry && <span className="text-xs text-red-500">{errors.inquiry.message}</span>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--color-muted)' }}>Message</label>
        <textarea {...register('message')} rows={5} placeholder="Tell us how we can help..."
          className="px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[#3DD68C] resize-none"
          style={{ borderColor: errors.message ? '#EF4444' : 'var(--color-border)' }} />
        {errors.message && <span className="text-xs text-red-500">{errors.message.message}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}
        className="py-4 rounded-full font-semibold text-sm transition-all hover:scale-105 disabled:opacity-60"
        style={{ background: '#3DD68C', color: '#1C1C1A' }}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
```

- [ ] **Step 3: Create app/contact/page.tsx**

```tsx
import { Suspense } from 'react';
import { ContactForm } from '@/components/contact/contact-form';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        {/* Left: info */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6 inline-block"
            style={{ background: 'rgba(61,214,140,0.12)', color: '#3DD68C' }}>
            Get in Touch
          </span>
          <h1 className="text-5xl font-black mb-6" style={{ fontFamily: 'var(--font-display)', color: '#166534' }}>
            We'd love to<br />hear from you
          </h1>
          <p className="text-lg leading-relaxed mb-10" style={{ color: 'var(--color-muted)' }}>
            Whether you have a question about programs, memberships, court availability, or just want to say hello — we're here.
          </p>
          <div className="flex flex-col gap-4">
            {[
              { Icon: MapPin, text: '12 Padel Avenue, Lisbon, Portugal' },
              { Icon: Phone, text: '+351 21 000 0000' },
              { Icon: Mail, text: 'hello@padelio.com' },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(61,214,140,0.12)' }}>
                  <Icon size={16} style={{ color: '#3DD68C' }} />
                </div>
                <span className="text-sm" style={{ color: 'var(--color-muted)' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: form */}
        <div className="rounded-2xl p-8" style={{ background: 'white', boxShadow: 'var(--shadow-elevated)' }}>
          <Suspense>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verify contact page**

Visit http://localhost:3000/contact:
- Submit empty form → shows validation errors
- Submit valid form → sonner toast appears
- Visit `/contact?plan=pro` → Inquiry Type pre-fills to "Membership"

- [ ] **Step 5: Commit**

```bash
git add app/contact/ components/contact/
git commit -m "feat: contact page with react-hook-form, zod validation, URL param pre-fill"
```

---

### Task 15: tsconfig path aliases & build verification

**Files:**
- Modify: `tsconfig.json`

- [ ] **Step 1: Ensure tsconfig.json has path aliases**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 2: Run type check**

```bash
pnpm typecheck
```
Expected: 0 errors.

- [ ] **Step 3: Run production build**

```bash
pnpm build
```
Expected: Build completes. All 6 routes shown as static/dynamic. No red build errors.

- [ ] **Step 4: Spot-check all routes at runtime**

```bash
pnpm start
```
Manually visit and verify each route works correctly:
- http://localhost:3000 — Home
- http://localhost:3000/programs — 5 cards
- http://localhost:3000/programs/elite — detail page
- http://localhost:3000/courts — booking widget
- http://localhost:3000/membership — 3 plans + FAQ
- http://localhost:3000/about — values + coaches
- http://localhost:3000/contact — form with validation

- [ ] **Step 5: Commit**

```bash
git add tsconfig.json
git commit -m "chore: verify build passes, all 6 routes functional"
```

---

### Task 16: GitHub Push to Sqwizx/padelio

- [ ] **Step 1: Configure git user for this repo**

```bash
git config user.name "Azzam"
git config user.email "azzamhamiludin@gmail.com"
```

- [ ] **Step 2: Verify config**

```bash
git config user.name
git config user.email
```
Expected: `Azzam` and `azzamhamiludin@gmail.com`

- [ ] **Step 3: Create GitHub repo**

Go to https://github.com/organizations/Sqwizx/repositories/new (or use gh CLI):

```bash
gh repo create Sqwizx/padelio --public --description "Premium Padel Academy — Next.js 15 marketing site with GSAP animations"
```

- [ ] **Step 4: Add remote and push**

```bash
git remote add origin https://github.com/Sqwizx/padelio.git
git push -u origin master
```

Expected: All commits pushed. Visit https://github.com/Sqwizx/padelio to confirm.

- [ ] **Step 5: Verify on GitHub**

Confirm the repository shows:
- All source files present
- Commit history intact (one commit per task)
- README or description visible

---

## Self-Review

**Spec coverage check:**
- ✅ Next.js 15 App Router migration (Task 1–2)
- ✅ Data layer with TypeScript types (Task 3)
- ✅ GSAP infrastructure + ScrollTrigger (Task 4)
- ✅ Sticky Nav with GSAP scroll shrink + mobile menu (Task 5)
- ✅ Footer with proper Next.js Links (Task 6)
- ✅ Home page: Hero, Stats (counter), Mission, Stories, Benefits, Testimonials + marquee (Tasks 7–9)
- ✅ Programs listing + dynamic [slug] detail page (Task 10)
- ✅ Courts page + booking widget + sonner toast (Task 11)
- ✅ Membership pricing cards + FAQ accordion (Task 12)
- ✅ About page: mission, values, coaches (Task 13)
- ✅ Contact page: react-hook-form + zod + URL param pre-fill (Task 14)
- ✅ All buttons/nav/cards link to correct pages via Next.js Link
- ✅ GSAP `matchMedia` wrapping for `prefers-reduced-motion` on all animations
- ✅ Git user configured as Azzam / azzamhamiludin@gmail.com (Task 16)
- ✅ Pushed to Sqwizx/padelio (Task 16)
