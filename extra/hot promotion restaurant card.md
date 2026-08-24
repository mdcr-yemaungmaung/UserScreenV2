---
name: Modern Luxe Burmese
colors:
  surface: '#fff8f6'
  surface-dim: '#e9d6d0'
  surface-bright: '#fff8f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1ec'
  surface-container: '#fdeae3'
  surface-container-high: '#f7e4de'
  surface-container-highest: '#f1dfd8'
  on-surface: '#231916'
  on-surface-variant: '#58413f'
  inverse-surface: '#392e2a'
  inverse-on-surface: '#ffede7'
  outline: '#EADFD1'
  outline-variant: '#e0bfbc'
  surface-tint: '#ad302f'
  primary: '#840f16'
  on-primary: '#ffffff'
  primary-container: '#a52a2a'
  on-primary-container: '#ffc0bb'
  inverse-primary: '#ffb3ad'
  secondary: '#7d5700'
  on-secondary: '#ffffff'
  secondary-container: '#febe46'
  on-secondary-container: '#704e00'
  tertiary: '#104b2b'
  on-tertiary: '#ffffff'
  tertiary-container: '#2c6341'
  on-tertiary-container: '#a2ddb2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad7'
  primary-fixed-dim: '#ffb3ad'
  on-primary-fixed: '#410004'
  on-primary-fixed-variant: '#8c171b'
  secondary-fixed: '#ffdeaa'
  secondary-fixed-dim: '#fbbc43'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5f4100'
  tertiary-fixed: '#b5f0c4'
  tertiary-fixed-dim: '#99d4a9'
  on-tertiary-fixed: '#00210e'
  on-tertiary-fixed-variant: '#185130'
  background: '#fff8f6'
  on-background: '#231916'
  surface-variant: '#FBF3E2'
  warm-cream: '#FFF7E8'
  gold-accent: '#D08E1C'
typography:
  display-lg:
    fontFamily: Epilogue
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Epilogue
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Epilogue
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Epilogue
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.4'
    letterSpacing: 0.08em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  container-max: 1280px
  section-gap: 5rem
  element-gap: 1.5rem
  gutter: 2rem
  margin-mobile: 1rem
  margin-desktop: 4rem
---

## Brand & Style
The brand personality is **Modern Luxe Burmese**: a sophisticated fusion of traditional hospitality and global minimalism. It targets discerning diners seeking an effortless, premium concierge experience that feels culturally rooted yet technologically advanced.

The visual style is a refined mix of **Minimalism** and **Soft Glassmorphism**. The interface relies on generous whitespace, atmospheric depth, and organic shapes to evoke a sense of calm and exclusivity. By utilizing high-contrast typography and subtle tactile elements like light-refracting borders and gentle gradients, the system transforms a functional booking tool into a high-end service platform.

## Colors
The palette is deeply inspired by Burmese heritage and gastronomy. The primary **Appetite Red** is used sparingly for high-impact CTAs and branding, while **Dark Cocoa** replaces standard blacks for all typography to maintain a warm, artisanal feel.

- **Primary (Appetite Red):** For critical actions and brand markers.
- **Secondary (Golden Yellow):** Used for highlights, ratings, and subtle status indicators.
- **Tertiary (Leaf Green):** Reserved for success states and dietary/health signaling.
- **Neutral (Dark Cocoa):** The core anchor for text and structural shadows.
- **Background (Warm Cream):** The "parchment" base of the entire experience, providing a softer, more luxurious alternative to pure white.

## Typography
The typographic system is built on a high-contrast foundation to distinguish brand character from utility. 

- **Headlines (Epilogue):** An authoritative, geometric serif-style sans that feels contemporary. Use the tightest letter spacing for large display text to create a high-fashion editorial look.
- **Body (Be Vietnam Pro):** Chosen for its exceptional readability and warmth. It handles long descriptions and menu items with elegance.
- **Labels (Plus Jakarta Sans):** A wide-tracking sans-serif used for metadata, buttons, and navigation. The increased letter-spacing on labels provides a "clean" architectural feel common in luxury branding.

## Layout & Spacing
This design system utilizes a **Fluid Grid** model with generous margins to enforce the "Airy" brand promise. 

- **Desktop:** A 12-column grid with a 1280px max-width. Gaps between major sections (80px+) are mandatory to prevent visual clutter.
- **Mobile:** A single-column flow with a minimum 16px side margin. 
- **Rhythm:** Spacing follows an 8px base unit. Component internal padding should favor larger horizontal values to create a "wide" luxury feel.

## Elevation & Depth
Depth is achieved through **Soft Glassmorphism** rather than traditional heavy shadows.

1.  **Tonal Layering:** Use the Warm Cream (`#FFF7E8`) as the base, with Surface Variant (`#FBF3E2`) used for nested containers to create a "carved" effect.
2.  **Backdrop Blurs:** High-end surfaces (modals, sticky navs, search panels) should use a 20px blur with a 70-80% translucent Warm Cream fill.
3.  **Reflective Borders:** Use a 1px `outline` (`#EADFD1`) on cards. For premium elements, add a secondary inner stroke of semi-transparent white to simulate light hitting the edge of glass.
4.  **Shadows:** When necessary, shadows must be tinted with Dark Cocoa (`#2B211D`) at very low opacity (8-12%) and high diffusion to avoid "dirty" grey tones.

## Shapes
The shape language is organic and soft, avoiding sharp corners entirely to mirror the approachable nature of hospitality.

- **Main Cards:** Use a `3xl` (32px) radius to frame restaurant imagery and booking details.
- **Inputs & Small Elements:** Use a `xl` (16px) radius.
- **Buttons & Chips:** Always utilize a **Pill-shaped** (full) radius to ensure they feel tactile and distinct from content containers.

## Components
- **Buttons:** Primary buttons should feature a subtle vertical gradient from Appetite Red to Primary Dark, with a soft "shimmer" animation on hover. 
- **Cards:** "Luxe Cards" should have a `3xl` radius, a 1px outline, and a `shadow-soft` lift. On hover, the image should slightly scale (1.05x) while the card lifts -6px.
- **Form Inputs:** Utilize floating labels that transition from body-md to label-sm. Use the Warm Cream background for the field with a Strong Outline border that transitions to Appetite Red on focus.
- **Chips/Badges:** Use the Leaf Green or Golden Yellow with 10% opacity backgrounds for "Halal" or "Top Rated" tags, paired with bold, wide-tracked text.
- **Glass Panel:** A specialized component for search or filters that uses 20px blur and a 1px white-translucent top border to create a "premium lens" effect over food photography.