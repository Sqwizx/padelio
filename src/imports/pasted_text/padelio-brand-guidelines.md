Design a complete brand identity and UI design system for "Padelio" — 
a premium Padel Sports Academy and Court Booking website.

The overall aesthetic should feel LIGHT, FRESH, and PREMIUM — 
using a Bone White base with Vibrant Green as the hero color, 
evoking a sense of nature, energy, and clean athleticism.

---

🎨 COLOR SCHEME — Bone White & Vibrant Green Palette

Primary Brand Color:
- Vibrant Green: A lively, energetic green that feels fresh and dynamic.
  Suggested: #3DD68C or #22C55E (Emerald/Spring Green range)
  Use for: CTAs, active states, highlights, badges, icons, 
  nav accents, and key UI elements.

Secondary / Supporting Color:
- Deep Forest Green: A darker green for depth, text on light surfaces, 
  and hover states.
  Suggested: #166534 or #14532D
  Use for: Headings, footer background, hover effects, borders.

Background Colors:
- Bone White (Primary Background): Warm, soft off-white — not pure white.
  Suggested: #F5F0E8 or #FAF7F2 or #F8F4EE
  Use for: Page backgrounds, hero sections.
- Cream / Pearl (Surface Color): Slightly deeper off-white for cards, 
  panels, and sections.
  Suggested: #EDE8DF or #EAE4D9
  Use for: Cards, modals, input fields, navigation bar.

Text Colors:
- Primary Text: Deep Charcoal or Dark Olive
  Suggested: #1C1C1A or #2D2D2A
- Secondary / Muted Text: Warm Gray
  Suggested: #6B6B5E or #7A7A6E
- Inverted Text (on green backgrounds): Pure White #FFFFFF

Accent / Status Colors:
- Success: Vibrant Green #3DD68C
- Warning: Warm Amber #F59E0B
- Error: Soft Red #EF4444
- Info: Sky Blue #38BDF8

Provide HEX, RGB, and HSL values for each color token.

Full Color Token Example:
--color-primary:       #3DD68C  (rgb 61, 214, 140  | hsl 151, 64%, 54%)
--color-primary-dark:  #166534  (rgb 22, 101, 52   | hsl 143, 64%, 24%)
--color-bg:            #F5F0E8  (rgb 245, 240, 232 | hsl 36, 43%, 93%)
--color-surface:       #EDE8DF  (rgb 237, 232, 223 | hsl 36, 27%, 90%)
--color-text:          #1C1C1A  (rgb 28, 28, 26    | hsl 80, 4%, 11%)
--color-text-muted:    #6B6B5E  (rgb 107, 107, 94  | hsl 64, 7%, 40%)

---

🔤 TYPOGRAPHY
Font pairing that complements a light, premium, and sporty aesthetic:

- Display / Hero Font: 
  "Clash Display" or "Urbanist" (ExtraBold / Black weight)
  — Clean geometric feel, modern and confident.
  Alternative: Montserrat Black or Plus Jakarta Sans ExtraBold

- Body Font: 
  "Inter" or "DM Sans" (Regular / Medium)
  — Highly legible, neutral, pairs well with display fonts.

- Accent Font (optional):
  "Barlow Condensed" Italic — for energetic labels, 
  sport stats, and promotional banners.

Type Scale:
  - H1: 64px / 700 weight / 1.1 line-height
  - H2: 48px / 700 weight / 1.2 line-height
  - H3: 32px / 600 weight / 1.3 line-height
  - H4: 24px / 600 weight / 1.4 line-height
  - Body Large: 18px / 400 weight / 1.6 line-height
  - Body Default: 16px / 400 weight / 1.6 line-height
  - Body Small: 14px / 400 weight / 1.5 line-height
  - Label / Caption: 12px / 500 weight / 1.4 line-height
  - Overline: 11px / 600 weight / uppercase / letter-spacing 0.1em

---

🖼️ VISUAL STYLE & IMAGERY

Photography Direction:
- Bright, naturally lit padel courts (outdoor/indoor).
- Players in white or green athletic wear against the bone white aesthetic.
- Aerial shots of green courts with white lines — matches the color palette.
- Close-ups: racket grip, ball mid-air, net detail.
- Community shots: friends playing, coaches mentoring, celebrations.

Color Grading for Photos:
- Warm, slightly desaturated tones with lifted shadows.
- Slight green hue overlay to tie photos to the brand palette.
- Avoid cool/blue-toned photography.

Illustration / Graphic Style:
- Minimal geometric shapes using green and cream tones.
- Padel court line art as decorative background elements.
- Sport silhouettes in vibrant green on bone white.

UI Style:
- LIGHT MODE FIRST design.
- Clean flat design with soft shadows (no harsh drop shadows).
- Rounded cards with subtle green borders or green top-accent lines.
- Green gradient accents: from #3DD68C to #22C55E.
- CTA Buttons: Solid vibrant green with white text, 
  rounded-full or rounded-lg.
- Input fields: Cream background with green focus ring.

---

📐 LAYOUT & SPACING SYSTEM
- Base unit: 8px grid system
- Border radius tokens:
    sm:   4px  (badges, tags)
    md:   8px  (inputs, small cards)
    lg:   16px (standard cards)
    xl:   24px (featured cards, modals)
    full: 9999px (pill buttons, avatars)
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128px
- Shadow tokens:
    soft:     0 2px 8px rgba(0,0,0,0.06)
    medium:   0 4px 16px rgba(0,0,0,0.10)
    elevated: 0 8px 32px rgba(0,0,0,0.14)
    green-glow: 0 4px 24px rgba(61,214,140,0.25)
- Breakpoints: 
    Mobile  < 768px
    Tablet  768px–1024px
    Desktop > 1024px

---

🧩 KEY UI COMPONENTS — Bone White & Green Styling

1. Navigation Bar
   - Bone white background (#F5F0E8)
   - Logo in Deep Forest Green
   - Links in dark charcoal, green underline on hover
   - CTA Button: Vibrant Green pill button "Book a Court"

2. Hero Section
   - Full-width bone white background
   - Large Display font headline in deep charcoal
   - Green highlighted word (e.g., "Play <green>Padel</green> Your Way")
   - Booking widget card in cream with green accents

3. Court Booking Card
   - Cream surface card with soft shadow
   - Green badge for "Available", amber for "Limited", red for "Booked"
   - Time slots as green-outlined pill buttons
   - Price in bold vibrant green

4. Coaching Program Card
   - White/cream card, top green accent line
   - Level badge: Beginner (light green), Intermediate (green), 
     Elite (dark green)

5. Membership Plan Cards
   - Free: Cream card, charcoal text
   - Pro: Green card, white text (featured)
   - Elite: Dark forest green card, white/gold accents

6. Calendar / Time Slot Picker
   - Bone white calendar, green for selected dates
   - Available slots: green fill, Booked: muted gray

7. Footer
   - Deep Forest Green (#166534) background
   - White and light green text
   - Social icons in vibrant green circles

---

🏷️ BRAND VOICE & TONE

Tagline ideas (Bone White & Green direction):
  • "Fresh Courts. Real Game."
  • "Where the Green Meets the Game."
  • "Your Court. Your Game. Your Way."
  • "Play Fresh. Play Padel."
  • "Step Into the Green."

Tone: Fresh, approachable, energetic, clean, and community-driven.
