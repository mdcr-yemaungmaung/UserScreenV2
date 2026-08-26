---
name: Yoyaku Warm Ivory (Food-First Discovery)
product: Yoyaku — User PWA (Customer table-booking portal)
mode: light-only
source-of-truth:
  css-entry: index.html → css/fonts.css → css/styles.css → css/overrides.css (@imports components.css)
  screens: js/screens/u01–u22 + js/components/*
  rebuild-css: npm run build:css  (tailwindcss -i ./tailwind.input.css -o ./css/styles.css --minify)
colors:
  brand:
    primary: '#9B1C25'
    primary-hover: '#7F161E'
    primary-gradient: 'linear-gradient(135deg, #B32A33 0%, #9B1C25 100%)'
    logo-pin-left: 'linear-gradient(135deg, #B32A33 0%, #9B1C25 100%)'
    logo-pin-right: 'linear-gradient(180deg, #8D1820 0%, #701218 100%)'
    logo-dot: '#B32A33'
  gold-accent:
    gold: '#C69A2B'
    gold-light: '#E2BF66'
    gold-hover-from: '#D8AE44'
    gold-hover-to: '#A8821D'
    promo-badge: '#F3DFD5'
    promo-badge-border: '#E8DDD0'
  cream-canvas:
    body-bg: '#FBF4E8'
    card-bg: '#FFFDFC'
    panel-bg: '#FFF8F2'
    input-bg: '#FFFDFC'
    chip-bg: '#F8EFE5'
    calendar-well: '#F8EFE5'
    summary-bg: '#F6EBDD'
    toggle-track-off: '#E2D5C3'
  ink:
    text-primary: '#241A18'
    text-secondary: '#6D6561'
    text-muted: '#9A908B'
    wordmark: '#241A18'
    divider-dot: '#C9BBB0'
  border:
    default: '#E8DDD0'
    id-badge-bg: '#F4EADF'
    id-badge-border: '#DDCDBF'
  semantic-status:
    confirmed-bg: '#D1FAE5'
    confirmed-border: '#6EE7B7'
    confirmed-text: '#065F46'
    confirmed-icon: '#059669'
    pending-bg: '#FEF3C7'
    pending-border: '#FCD34D'
    pending-text: '#92400E'
    pending-icon: '#D97706'
    completed-bg: '#E2E8F0'
    completed-border: '#CBD5E1'
    completed-text: '#1E293B'
    completed-icon: '#475569'
    cancelled-bg: '#FEE2E2'
    cancelled-border: '#FCA5A5'
    cancelled-text: '#991B1B'
    cancelled-icon: '#DC2626'
  waitlist-green:
    solid: '#104b2b'
    hover: '#0c3820'
    banner-bg: '#EAF3EB'
    banner-border: '#C5DEC8'
    banner-subtext: '#2e5b3c'
    available-slot-bg: '#E8F5E9'
    available-slot-border: '#C8E6C9'
    available-slot-text: '#104b2b'
  urgency-amber:
    limited-slot-bg: '#FFF3E0'
    limited-slot-border: '#FFE0B2'
    limited-slot-text: '#D08E1C'
  auth-providers:
    facebook: '#1877F2'
    facebook-hover: '#166FE5'
    google-bg: '#FFF8F6'
    google-hover-bg: '#FBF3E2'
  offline-banner:
    bg: '#231916'
    text: '#FBF3E2'
    dot: 'amber-400 (Tailwind)'
typography:
  display:
    fontFamily: Manrope
    fallback: "'Manrope', 'Be Vietnam Pro', 'Noto Sans Myanmar', 'Myanmar Text', sans-serif"
    usage: h1/h2/h3, .font-headline, restaurant names, section titles, hero copy
    weight-range: '700–800'
  body:
    fontFamily: Manrope
    fallback: "'Manrope', 'Be Vietnam Pro', 'Noto Sans Myanmar', 'Myanmar Text', sans-serif"
    usage: body copy, descriptions (.font-body)
    weight-range: '400–500'
  label:
    fontFamily: Manrope
    fallback: "'Manrope', 'Be Vietnam Pro', 'Noto Sans Myanmar', 'Myanmar Text', sans-serif"
    usage: buttons, inputs, badges, tabs, chips, uppercase overlines (.font-label)
    weight-range: '600–800'
  icons:
    fontFamily: Material Symbols Outlined
    variation-settings: "'FILL' 0|1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
  myanmar-fallbacks: ['Noto Sans Myanmar', 'Myanmar Text']
rounded:
  pill-button: rounded-full            # Reserve Table, header chips, stepper pills
  card-mobile: rounded-2xl (16px)      # luxe-card on <640px
  card-desktop: rounded-3xl (24px)     # luxe-card on ≥640px
  inner-tile: rounded-2xl              # time slots, date cells, seating cards
  auth-button: 14px                    # login/OAuth/lookup buttons
  login-card: 24px                     # .login-card-container
  brand-icon-box: 18px                 # .login-brand-icon-box
  dropdown-menu: rounded-2xl
spacing:
  scale: Tailwind v4 default (base 4px / --spacing:.25rem)
  page-container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
  header-height: h-20 (80px)           # TopNavBar
  bottom-nav-padding: px-3 py-2.5 sm:px-4
motion:
  micro-interaction: transition-all duration-200
  card-lift: hover:-translate-y-1 duration-300
  image-zoom: group-hover:scale-105 duration-500
  press: active:scale-95 (buttons) / active:scale-98 (forms)
  heart-bounce: heartBounce 0.45s cubic-bezier(0.17, 0.89, 0.32, 1.28)
  toggle-knob: transform 0.22s cubic-bezier(0.4, 0, 0.2, 1)
  error-banner: fadeIn 0.2s ease-in-out
  offline-indicator: animate-pulse (Tailwind)
---

# Yoyaku User PWA — Design System ("Warm Ivory Discovery")

This document is the **authoritative design contract** for all user-facing screens in `docs/06_mockup/user-yoyaku/`. Every screen, component, and interaction in this mockup MUST conform to the values below. All tokens were extracted directly from the shipped CSS/JS code base — file references are given per section so every rule is auditable against the code.

---

## 1. Design System Architecture (CSS Layer Stack)

The runtime loads exactly three stylesheets, in this order (`index.html` lines 16–18):

| Order | File | Role |
| --- | --- | --- |
| 1 | `css/fonts.css` | Self-hosted `@font-face` for **Be Vietnam Pro**, **Epilogue**, **Plus Jakarta Sans**, **Material Symbols Outlined** |
| 2 | `css/styles.css` | **Compiled Tailwind v4 bundle** (minified). Generated artifact — never edit by hand |
| 3 | `css/overrides.css` | Brand token layer + hand-written component layer; `@import`s `components.css` at line 1 |

Rules:

1. `css/styles.css` is generated from `tailwind.input.css` (`@source "./js"; @source "./index.html";`). Rebuild with `npm run build:css`. Missing utilities found during QA (e.g. `.sm\:hidden`, `.lg\:pb-0`, `.max-h-\[90vh\]`) are patched in `overrides.css`.
2. Screens are server-rendered HTML strings from `js/screens/*.js` and `js/components/*.js`, styled with **Tailwind arbitrary-value utilities** (`bg-[#840f16]`, `border-[#EADFD1]`, …) plus the semantic classes defined in §7.
3. **Legacy layer — do not extend:** `css/design-system.css` ("Kinetic Glass" navy `#131546` / lime `#AAF457` tokens), `css/layouts.css`, and the `stitch-*` classes belong to the shared EzBookNow mockup framework and are **not loaded by `user-yoyaku/index.html`**. They remain for cross-portal reference only. New user-yoyaku work must use the tokens in this document.
4. `luxe-card` is a semantic marker class used in markup (no CSS definition) — keep it on cards for grep-ability.

---

## 2. Brand & Personality

**Yoyaku Warm Ivory** — premium but calm restaurant discovery for Myanmar dining. The interface should feel food-first, light, and editorial: warm ivory and soft white carry most surfaces, burgundy is used sparingly for action and emphasis, and muted gold is reserved for ratings and celebratory accents.

- `<meta name="theme-color" content="#9B1C25">` — browser/PWA chrome follows the brand.
- Light mode only (`color-scheme: light`; `<html class="light">`). There is no dark theme in this mockup.
- Bilingual by design: every user-visible string is an EN/MM pair selected via `state.currentLanguage`.

## 3. Color System

### 3.1 Brand Core

| Token | Value | Usage |
| --- | --- | --- |
| Primary (Burgundy) | `#9B1C25` | CTAs, selected states, small labels, icons, active chips |
| Primary hover | `#7F161E` | Button/card-title hover |
| Primary gradient | `linear-gradient(135deg, #B32A33, #9B1C25)` | Hero/action emphasis where a gradient is still appropriate |
| Rating accent | `#C69A2B` | Stars, small numeric highlights, booking-count badges |
| Accent light | `#F3DFD5` | Active pills, soft banners, subtle emphasis backgrounds |

### 3.2 Cream Canvas & Ink

| Token | Value | Usage |
| --- | --- | --- |
| Body background | `#FBF4E8` | Global canvas (`<body>` class), bottom-nav fill, light page backdrops |
| Card surface | `#FFFDFC` | `luxe-card` fill, header controls, modal shells |
| Panel surface | `#FFF8F2` | Booking panels, secondary content wells |
| Input surface | `#FFFDFC` | Inputs, lookup boxes, compact search surfaces |
| Chip surface | `#F8EFE5` | Soft pills, booking state chips, inactive utility controls |
| Well surfaces | `#F8EFE5` / `#F6EBDD` | Calendar wells / summary blocks |
| Text primary | `#241A18` | Headings & core body ink |
| Text secondary | `#6D6561` | Supporting copy, inactive labels, metadata |
| Text muted | `#9A908B` | Overlines, placeholders, subdued helper text |
| Border default | `#E8DDD0` | ALL card/input/divider borders — the standard soft warm hairline |

### 3.3 Semantic Status Badges (`.resv-status-*`, overrides.css 691–743)

| Status | BG / Border / Text / Icon |
| --- | --- |
| Confirmed | `#D1FAE5` / `#6EE7B7` / `#065F46` / `#059669` |
| Pending | `#FEF3C7` / `#FCD34D` / `#92400E` / `#D97706` |
| Completed | `#E2E8F0` / `#CBD5E1` / `#1E293B` / `#475569` |
| Cancelled | `#FEE2E2` / `#FCA5A5` / `#991B1B` / `#DC2626` |
| Default | `#F3F4F6` / `#E5E7EB` / `#374151` |

Badge anatomy: inline-flex, gap 6px, padding 4px 12px, radius full, Manrope 12px/700, subtle `0 1px 3px rgba(0,0,0,.05)` shadow.

### 3.4 Waitlist / Availability Greens & Urgency Ambers

| Token | Value | Usage |
| --- | --- | --- |
| Waitlist solid | `#104b2b` (hover `#0c3820`) | "Join Waitlist" button, icon circle |
| Banner green | bg `#EAF3EB`, border `#C5DEC8`, subtext `#2e5b3c` | Waitlist callout panel |
| Slot available | bg `#E8F5E9`, border `#C8E6C9`, text `#104b2b` | Time-slot status chip |
| Slot limited | bg `#FFF3E0`, border `#FFE0B2`, text `#D08E1C` | Time-slot status chip |

### 3.5 Provider / System Colors

Facebook `#1877F2` (hover `#166FE5`) · Google/Email `#FFFDFC` fill + `#E8DDD0` border · Offline banner `#241A18` bg / `#FBF4E8` text / amber pulse dot · Selection `::selection` = `#9B1C25` on `#FFF4F1` (body class).

---

## 4. Typography

Single-family primary typography with Myanmar-safe fallbacks — mapped in `overrides.css`:

| Class | Face | Applied to |
| --- | --- | --- |
| `.font-headline`, `h1–h3` | **Manrope** 700–800, tracking `-0.02em` | Screen titles, restaurant names, section headers, hero copy |
| `.font-body` | **Manrope** 400–500 with Myanmar fallbacks | Paragraphs, descriptions, metadata rows |
| `.font-label` | **Manrope** 600–800 with Myanmar fallbacks | Buttons, inputs, badges, tabs, chips, uppercase overlines (`text-[10px] tracking-wider uppercase`) |
| Icons | **Material Symbols Outlined** | The ONLY icon system — zero emoji in UI controls; `fill-1` variant for filled favorite/star states |

Scale conventions observed in screens: hero titles `text-2xl sm:text-3xl font-bold` trending toward 34–40px on key discovery screens; card titles `text-lg sm:text-xl md:text-2xl font-bold`; body `text-xs … text-sm`; overline `text-[10px] font-bold uppercase tracking-wider`. Mobile readability guard: `text-[10px]` is forced to `11px` under 768px (`overrides.css` 801–805).

---

## 5. Shape, Elevation & Glass

### Radius Ladder

Pills (`rounded-full`) for actions/chips/badges → `rounded-2xl` (16px) for tiles, date cells, time slots, mobile cards → `rounded-3xl` (24px) for desktop cards & booking panels → fixed 14px for auth/lookup buttons, 18px brand icon box, 24px login card.

### Elevation

| Level | Value | Usage |
| --- | --- | --- |
| `shadow-2xs` | `0 2px 8px rgba(43,33,29,.05)` | Inputs, small buttons (custom, overrides.css 49–51) |
| `shadow-sm` / `shadow-md` | Tailwind defaults | Cards resting / interactive lift |
| Colored glows | `rgba(155,28,37,…)` burgundy; `rgba(198,154,43,…)` gold | Primary and celebratory CTAs only — glow always matches hue |
| Top-light shadow | `0 -4px 16px rgba(36,26,24,.06)` | Bottom nav upper edge |

### Glass

Chrome-only glassmorphism: header and bottom nav use translucent warm-ivory fills (`bg-[#FBF4E8]/95`) + `backdrop-blur-md` or `blur-lg` over `border-[#E8DDD0]`. Floating overlays (rating pill, favorite heart, promo tag on image) use dark or soft-white blur pills. Never apply glass to static content blocks.

---

## 6. Layout & Responsive Rules

Breakpoints: Tailwind defaults — `sm 640` · `md 768` · `lg 1024`.

1. **TopNavBar** (`js/components/TopNavBar.js`): sticky top-0 z-40 glass bar, container `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20`. SVG location-pin logo (two-stop gradients per §3.1) + hidden-until-lg wordmark. Action cluster = light pill chips (`rounded-full bg-[#FFFDFC] border-[#E8DDD0] font-label text-[11px] font-bold`); owner CTA uses soft blush fill that inverts to solid burgundy on hover. Language dropdown: `w-36 rounded-2xl bg-[#FFFDFC] border-[#E8DDD0] shadow-xl`.
2. **BottomNavBar** (`BottomNavBar.js`): `lg:hidden fixed bottom-0` z-40 glass bar; 5 tabs (Home/Search/Bookings/Saved/Login-or-MyPage) centered `max-w-md`. Active tab: `text-[#9B1C25] font-bold bg-[#F3DFD5] shadow-xs` + icon `scale-110`; inactive `text-[#6D6561]`. Count badge: `bg-[#C69A2B] w-4 h-4 text-[9px] font-extrabold rounded-full border-2 border-[#FBF4E8]`. Hidden automatically on U-03 shop detail and the U-04→U-07 booking flow and booking detail.
3. **Content rhythm**: home sections are horizontal snap-scroll carousels on <1024px (`scroll-snap-type: x mandatory`, hidden scrollbar, 16px edge padding → 24px tablet) and reflow to grid ≥1024px (`overrides.css` 590–672).
4. **Booking wizard modal** (U-04–U-07): full-bleed transparent sheet on mobile → light warm panel on desktop; sticky progress track `h-1 rounded-full bg-[#E8DDD0]/60`; step titles hidden <640px (`.stepper-step-title`); close = 36px soft-white circle top-right.
5. **Safe areas**: `viewport-fit=cover`; black-translucent iOS status bar; bottom nav sits above home indicator.
6. **Login/Lookup screen** (U-10): full-viewport centered column on `#FBF4E8`; card `max-w-[360px] rounded-[24px] border-[#E8DDD0] shadow 0 10px 30px rgba(43,33,29,.07)`; tab underline is a 3px burgundy→gold gradient bar.

---

## 7. Component Blueprint (canonical classes)

| Component | Spec (from code) |
| --- | --- |
| **Restaurant card** (`RestaurantCard.js`, `luxe-card`) | `bg-[#FFFDFC] rounded-2xl sm:rounded-3xl border-[#E8DDD0] overflow-hidden`; media `h-44 sm:h-52 md:h-56` with bottom gradient `from-black/60 via-transparent`; hover: card `-translate-y-1 shadow-lg`, image `scale-105` (500ms). Favorite heart: absolute top-3 right-3, 36–40px `bg-[#FFFDFC]/90 backdrop-blur-md text-[#9B1C25] rounded-full`, `hover:scale-110 active:scale-95` + heart-bounce keyframe. Rating pill: absolute top-3 left-3 `bg-black/60 backdrop-blur-md border-white/20 rounded-full`, gold `fill-1` star, white score + `/80` count. Cuisine tag: burgundy `text-[10px] font-extrabold uppercase tracking-wider rounded-xl` (on-image variant adds blur). Promo tag: blush or muted gold equivalent. Footer row: divider-top `border-[#E8DDD0]`, promo left, **Reserve Table** pill right (`bg-[#9B1C25] px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full font-label text-xs font-bold`, `active:scale-95`). |
| **Time slot tile** (U-04) | Grid `grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3`; cell `p-3.5 rounded-2xl border`. Selected: `bg-[#9B1C25] text-white` with a soft burgundy ring and shadow; rest: white + `#E8DDD0`, hover burgundy border. Status chip inside: Available green / Limited amber (§3.4). |
| **Calendar day cell** (`CalendarPicker.js`) | `h-10 w-full rounded-2xl font-label text-xs`. Selected: `bg-[#9B1C25] text-white` with a burgundy ring and scale emphasis. Today: light warm panel with burgundy border. Disabled: reduced-opacity muted text and warm outline. Month nav: white circles; month chip uses a soft burgundy tint with burgundy text. |
| **Seating preference card** (U-04) | 4-up selectable tiles; selected = inverted dark fill `bg-[#231916] text-white` with amber icon/check accents (`text-amber-400`); unselected = white + maroon hover border. |
| **Party-size stepper** (U-04) | White pill container `rounded-full border-[#E8DDD0]`; 32px circular −/+ buttons use soft cream fills that invert to burgundy on hover; value min-w-[65px] center. |
| **Auth & lookup forms** (U-10, overrides.css) | Boxed-label pattern: container `bg-[#FFFDFC] border-[#E8DDD0] rounded-[14px]`, tiny bold burgundy label inside, focus-within → `border-[#9B1C25] bg-white`. Phone input: prefix block uses a soft cream chip with right hairline. Primary submit: burgundy gradient or solid burgundy fill, h-44/46px, `rounded-[14px]`, restrained glow. Tabs: equal-width, 14px/700, active = burgundy text + 3px burgundy→gold gradient underline. |
| **Toggle switch** (`.toggle-switch-*`) | Track 48×26 `#E2D5C3`, knob 20px white; checked track `#9B1C25`, knob travel 22px, 220ms standard-curve; focus-visible burgundy outline. |
| **Status & ID badges** | See §3.3; reservation-ID badge: `bg-[#EFE4D6] border-[#D8C7B4] text-[#4A3B32]` pill. |
| **Offline banner** | Full-width `bg-[#231916] text-[#FBF3E2]` strip above header; pulsing amber dot + `cloud_off` icon; MM string documents QR-pass offline availability. |
| **Base component library** (`components.css`) | Shared primitives also available: `.btn` (+primary/secondary/ghost/danger, sm/lg/icon/block), `.form-input/-select/-textarea` (h-44px, focus maroon ring `rgba(19,21,70,.08)` legacy), `.card`, `.modal-overlay`, `.toast`, tabs, skeletons, empty states. Note: some base classes reference Kinetic-Glass vars (§1.3); prefer the maroon tokens above when values conflict. |

---

## 8. Motion Standards

- Default interaction timing: `transition-all duration-200`; cards `duration-300`.
- Press feedback everywhere: `active:scale-95` (buttons/tabs), `active:scale-99` (auth buttons).
- Hover elevation: cards `hover:-translate-y-1` + shadow-lg; auth buttons `translateY(-1px)`.
- Media: image zoom `group-hover:scale-105 duration-500`; fav heart `heartBounce 0.45s cubic-bezier(0.17, 0.89, 0.32, 1.28)`.
- Feedback entrances: lookup error `fadeIn 0.2s ease-in-out`; offline dot `animate-pulse`; toggles 220ms `cubic-bezier(0.4, 0, 0.2, 1)`.
- No parallax/no long (>500ms) transitions; motion never blocks input.

---

## 9. Iconography & Imagery

- **Material Symbols Outlined only** (self-hosted in fonts.css). Sizes via `text-sm … text-2xl`; filled variant via `fill-1` (favorite, star). No raw Unicode emojis in controls, badges, or indicators.
- Restaurant photography: remote URLs with `referrerpolicy="no-referrer"`, `loading="lazy"`, and deterministic local fallback (`assets/images/gilded_fork.jpg`).
- Logo: inline SVG pin mark (§3.1 gradients) + Epilogue wordmark "Yoyaku".

## 10. PWA & Platform Contract

`manifest.json` + `sw.js` service worker (`js/pwa.js`); standalone-display meta tags; theme-color `#9B1C25`; apple title "Yoyaku". Offline mode must keep saved bookings & QR passes viewable (banner copy, BottomNavBar/TopNavBar degrade gracefully).

## 11. Related Assets

- Prototype screenshot: `prototype-shot.png`
- Feature specs: `specs/001-component-gallery` … `006-sync-promo-font-size`
- Promotion card exploration: `extra/hot promotion restaurant card.md|.png`
- Legacy design-system docs (not loaded at runtime): `design-systems/*.md`
