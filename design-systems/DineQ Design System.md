---
name: DineQ Design System
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#3f4941'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#6f7a71'
  outline-variant: '#bec9bf'
  surface-tint: '#006d42'
  primary: '#005432'
  on-primary: '#ffffff'
  primary-container: '#006f44'
  on-primary-container: '#94efb9'
  inverse-primary: '#7fd9a4'
  secondary: '#795900'
  on-secondary: '#ffffff'
  secondary-container: '#ffc641'
  on-secondary-container: '#715300'
  tertiary: '#47494a'
  on-tertiary: '#ffffff'
  tertiary-container: '#5f6161'
  on-tertiary-container: '#dcdcdc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9bf5bf'
  primary-fixed-dim: '#7fd9a4'
  on-primary-fixed: '#002111'
  on-primary-fixed-variant: '#005231'
  secondary-fixed: '#ffdfa0'
  secondary-fixed-dim: '#f6be39'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5c4300'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
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
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
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
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
The design system is built on the pillars of utility and local familiarity. It prioritizes a "Myanmar-first" approach, focusing on high-functioning, accessible interfaces that feel at home on both entry-level and high-end devices.

The visual style is **Corporate / Modern** with a lean toward **Flat Design**. It avoids complex gradients or futuristic flourishes in favor of clean geometry, substantial whitespace, and clear visual markers. The goal is to evoke the reliability of a utility app like Wave Money while maintaining the friendly, approachable nature of a community-driven platform. Success is measured by how quickly a user can complete a booking with zero friction.

## Colors
This design system uses a grounded, heritage-inspired palette that balances trust with accessibility. 

- **Primary (Deep Myanmar Green):** Used for main actions, brand identity, and success states. It represents stability and professional service.
- **Accent (Local Gold):** Used sparingly for highlights, ratings, and specific call-to-actions that require a "practical" energy.
- **Background (Warm Off-White):** A soft, eye-friendly base that differentiates the app from generic white interfaces, providing a more premium yet approachable feel.
- **Text (Near Black):** Optimized for high contrast against the off-white background to ensure maximum readability for all age groups.

## Typography
The typography system relies on **Inter** for its exceptional legibility and support for diverse character sets. It is structured to handle high-density information common in booking platforms.

- **Headlines:** Use bold weights to create a strong anchor for the page content.
- **Body:** Standardized at 16px for primary reading to ensure accessibility on mobile screens.
- **Labels:** Used for form headers, category tags, and secondary metadata.
- **Hierarchy:** Maintain clear vertical rhythm by ensuring headlines always have twice the margin-bottom as body paragraphs.

## Layout & Spacing
The layout follows a **Fluid Grid** system designed for a mobile-first experience.

- **Mobile (up to 599px):** 4-column grid with 16px margins and 16px gutters.
- **Tablet (600px - 1023px):** 8-column grid with 24px margins and 16px gutters.
- **Desktop (1024px+):** 12-column grid with a max-width of 1200px, centered on the screen.

Spacing follows a strict 4px/8px baseline grid to ensure alignment across all components. Use `md` (16px) for the majority of component internal padding to maintain a spacious, breathable feel.

## Elevation & Depth
This design system uses a **Tonal Layering** approach combined with very soft, functional shadows to define hierarchy.

- **Level 0 (Base):** Used for the main background (Warm Off-White).
- **Level 1 (Cards):** Surface color is White (#FFFFFF). Use a very soft shadow: `0px 2px 4px rgba(26, 26, 26, 0.05)`.
- **Level 2 (Modals/Overlays):** Surface color White (#FFFFFF). Shadow: `0px 8px 16px rgba(26, 26, 26, 0.1)`.

Avoid heavy blurs or colored shadows. Contrast is primarily achieved through subtle border-lines (1px, #E5E1D8) rather than deep shadows.

## Shapes
Shapes are designed to feel friendly and modern without being overly "bubbly."

- **Standard Elements:** Buttons and input fields use a `0.5rem` (8px) corner radius.
- **Containers:** Large cards and section blocks use a `1rem` (16px) radius to create a soft, inviting structure.
- **Small Elements:** Tags and chips use a pill-shape (full radius) to distinguish them from interactive buttons.

## Components

### Buttons
- **Primary:** Filled with Primary Green (#006F44), white text. Minimum height 48px for touch targets.
- **Secondary:** Outlined with Primary Green, Primary Green text.
- **Tertiary:** Text-only, bold weight, Primary Green.

### Cards
- White background, 1px subtle border (#E5E1D8), and Level 1 shadow.
- Content should be padded with 16px (md) or 24px (lg) consistently.

### Input Fields
- 1px border (#CCC7BE), 8px roundedness.
- Active state uses a 2px Primary Green border.
- Error state uses Error Red (#B3261E) for border and helper text.

### Chips & Badges
- Used for categories (e.g., "Barber", "Dentist").
- Background: Very light tint of Primary Green or Accent Gold.
- Text: High contrast (Primary Green or Dark Grey).

### Lists
- Use horizontal separators (1px #E5E1D8) between items.
- Incorporate clear trailing icons (e.g., Chevron-Right) to indicate navigability.

### Icons
- Use 24px bounding boxes.
- Stroke-based (2px weight) for a clean, Google Maps-like utilitarian feel.