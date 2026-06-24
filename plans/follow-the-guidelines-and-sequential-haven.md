# Padelio — Premium Padel Academy Website

## Context
Build a complete landing page for "Padelio", a premium Padel Sports Academy and Court Booking website. The user provided brand guidelines (bone white + vibrant green palette, Urbanist/DM Sans fonts, clean athletic premium aesthetic) and 7 reference screenshots from a tennis club site. The goal is to follow the brand guidelines closely while improving on the reference layout — less brutal/dark, more premium-light with better composition.

## Aesthetic Direction

**Stance**: Editorial-sports premium. Clean, asymmetric layouts with generous whitespace. Light mode first on bone white (#F5F0E8). Bold geometric display type with energy, not brutalism.

**Fonts** (Google Fonts):
- Display: `Urbanist` (800/900 weight) — geometric, confident
- Body: `DM Sans` (400/500 weight) — readable, neutral

**Palette** (token updates to `theme.css`):
- `--background`: `#F5F0E8` (bone white)
- `--foreground`: `#1C1C1A` (deep charcoal)
- `--card`: `#EDE8DF` (cream surface)
- `--card-foreground`: `#1C1C1A`
- `--primary`: `#3DD68C` (vibrant green)
- `--primary-foreground`: `#ffffff`
- `--secondary`: `#EAE4D9` (pearl)
- `--secondary-foreground`: `#1C1C1A`
- `--muted`: `#EDE8DF`
- `--muted-foreground`: `#6B6B5E`
- `--accent`: `#166534` (deep forest green)
- `--accent-foreground`: `#ffffff`
- `--border`: `rgba(28,28,26,0.12)`
- `--ring`: `#3DD68C`
- `--radius`: `1rem`

## Page Sections

### 1. Navigation
- Bone white sticky nav, logo "PADELIO" in deep forest green Urbanist 800
- Links: Home, Courts, Programs, About, Contact
- Right CTA: "Book a Court" — vibrant green pill button

### 2. Hero
- **Improved vs reference**: Split composition instead of full-bleed dark. Left: large Urbanist 900 headline with green word highlight + quick-book date/time widget card. Right: inset rounded photo of padel court action.
- Stats strip below: 300+ Members | 18 Courts | 5-Star Rating | Est. 2018

### 3. Mission Statement
- Centered bold italic quote on bone white with floating emoji/sport icons inline
- "We believe in energy, community, and the joy of real padel."

### 4. Stories / Featured Gallery
- Section label pill + heading + "View All" arrow button
- 4-column horizontal scroll of rounded image cards with category + title overlaid on semi-transparent green footer

### 5. Programs Accordion
- **Improved vs reference**: Instead of full neon-green expanded panel, use a sophisticated accordion with left-side program title, right expanding content area showing description + skill tags + an image
- Programs: Beginners | Junior & Kids | Adults | Professionals | Elite Coaching

### 6. Courts Showcase
- Full-width inset image with overlaid info card (cream card, semi-transparent)
- Title "Premium Courts" + court types list + "View All Courts" CTA

### 7. Benefits Grid
- 3-column grid with icon, bold title, description
- Full Body Workout | Builds Community | Suitable for All Ages

### 8. Testimonials
- Floating pill tags (scrolling marquee-style) above testimonial cards
- 3 visible cards with quote, avatar, name, member type
- Dot pagination

### 9. Footer
- Deep forest green (#166534) background, white text
- Logo + tagline left, links columns center, social icons right
- Bottom bar: copyright + "Fresh Courts. Real Game."

## Key Files

- `src/app/App.tsx` — full replacement with all sections
- `src/styles/fonts.css` — Urbanist + DM Sans Google Fonts import
- `src/styles/theme.css` — update `:root` tokens (preserve `.dark` block and `@theme inline`)

## Unsplash Images to use
- Hero court action: search "padel court players"
- Stories cards: padel, racket, players celebrating, coach
- Courts section: aerial padel court

## Implementation Notes

- All interactivity (accordion, nav mobile, testimonial carousel) via React useState
- Smooth accordion with CSS transition on max-height
- Responsive: grid collapses at ~1024px breakpoint
- No lorem ipsum — real copy from brand guidelines
- Hover states on all cards and buttons (transition-all duration-200)
- Green glow shadow on primary CTA: `0 4px 24px rgba(61,214,140,0.35)`

## Verification
1. Check fonts load (Urbanist + DM Sans visible in hero heading and body)
2. Verify bone white background, vibrant green CTAs, deep forest green footer
3. Accordion opens/closes correctly
4. Responsive at ~768px — hero stacks, nav collapses
5. All images load with correct alt text and bg-card fallback
