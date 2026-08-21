---
name: Vibrant Marketplace Engine
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#F8FAFC'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464555'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#712ae2'
  on-secondary: '#ffffff'
  secondary-container: '#8a4cfc'
  on-secondary-container: '#fffbff'
  tertiary: '#00505f'
  on-tertiary: '#ffffff'
  tertiary-container: '#006a7c'
  on-tertiary-container: '#93e8ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#eaddff'
  secondary-fixed-dim: '#d2bbff'
  on-secondary-fixed: '#25005a'
  on-secondary-fixed-variant: '#5a00c6'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
  surface-border: '#E2E8F0'
  brand-gradient-start: '#4F46E5'
  brand-gradient-end: '#7C3AED'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  gutter: 24px
  margin-desktop: 80px
  margin-mobile: 16px
  container-max-width: 1440px
---

## Brand & Style

The design system is engineered for a high-velocity, multi-vendor marketplace where trust meets technological sophistication. The brand personality is **vibrant, digital-first, and energetic**, combining the hospitality warmth of Airbnb with the technical precision of Stripe.

The visual style follows a **Corporate / Modern** aesthetic with **Glassmorphism** influences. It utilizes a clean vector language, high-fidelity iconography, and smooth transitions to evoke an emotional response of reliability and seamless efficiency. Key brand touchpoints utilize rich gradients to signify movement and "marketplace magic," while functional areas remain strictly utilitarian to ensure vendor data clarity.

## Colors

The palette is anchored by a high-energy **Indigo (#4F46E5)** and **Purple (#7C3AED)** core, representing the marketplace's premium tech infrastructure. A **Cyan (#06B6D4)** accent is used sparingly to denote interactivity, live status updates, and critical success pathways.

The background logic uses **Pure White (#FFFFFF)** for primary canvases to maximize readability. Functional "containers" (sidebars, cards, and section dividers) utilize a **subtle grey-blue (#F8FAFC)** to create a layered, multi-dimensional workspace without the heaviness of standard greys. Gradients are reserved for primary action buttons (CTA) and brand-level illustrations, moving from Indigo to Purple at a 135-degree angle.

## Typography

This design system uses **Inter** exclusively to maintain a systematic, utilitarian feel that ensures legibility across dense marketplace data. 

**Headlines** utilize bold weights (700) and slight negative letter spacing to create a compact, "tech" appearance. **Body** text is optimized for long-form readability with generous line heights. **Labels** use medium weights and a slight increase in letter spacing to distinguish metadata from content. For mobile displays, headline scales are aggressively reduced to ensure primary information remains "above the fold" without sacrificing the bold brand impact.

## Layout & Spacing

The layout utilizes a **12-column fixed grid** on desktop (1440px) and a **4-column fluid grid** for mobile. The spacing rhythm is built on a **4px base unit**, with standard component padding following an 8px increment (8, 16, 24, 32).

On **Desktop**, the layout prioritizes efficiency and information density. Sidebars are fixed at 280px, while the main content area utilizes a max-width of 1440px with 24px gutters to allow for complex vendor dashboards. **Mobile** views transition to a single-column stack with 16px safe-area margins, prioritizing touch targets and vertical scrollability.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layers** combined with **Ambient Shadows**. 

1.  **Level 0 (Base):** Pure White or Surface-Container grey-blue.
2.  **Level 1 (Cards/Lists):** 1px border (#E2E8F0) with no shadow, or a very soft 4px blur shadow with 2% opacity.
3.  **Level 2 (Dropdowns/Modals):** High-diffused shadows (12px - 24px blur) with a subtle Indigo tint (#4F46E5 at 8% opacity) to suggest interaction and elevation above the grid.
4.  **Glassmorphism:** Applied to global navigation bars and sticky headers using a `backdrop-filter: blur(12px)` and a 60% opacity white fill, ensuring content remains visible but distinct as the user scrolls.

## Shapes

The design system adopts a **Rounded** shape language to balance the professional nature of a marketplace with a friendly, modern tech aesthetic. 

Standard components (Inputs, Buttons, Cards) utilize a **0.5rem (8px)** corner radius. Large containers, such as promotional banners or vendor profile cards, utilize the `rounded-xl` scale of **1.5rem (24px)** to create a distinctive, app-like appearance that feels approachable and premium.

## Components

### Buttons
Primary buttons use the **Indigo-to-Purple gradient** with white text and a soft shadow. Secondary buttons use a transparent background with an Indigo border. Action buttons feature a slight "lift" on hover (transform: translateY(-1px)).

### Input Fields
Inputs use the `surface-container` background with a 1px border. On focus, the border transitions to Indigo with a 2px Cyan outer glow to signify active entry.

### Cards
Cards are the primary container for marketplace listings. They use `rounded-xl` corners and 1px subtle borders. Imagery within cards should occupy the top half with a slight zoom-on-hover effect.

### Chips & Tags
Interactive chips (filters) use a light Cyan tint (#ECFEFF) with Cyan text. Status tags (e.g., "Confirmed", "Available") use solid Cyan backgrounds to provide high-visibility highlights within the UI.

### Navigation
Desktop navigation is a persistent left-hand sidebar in the dashboard view, while the public marketplace uses a "Glass" top navigation bar. Mobile uses a fixed bottom bar for primary marketplace actions (Search, Bookings, Profile).