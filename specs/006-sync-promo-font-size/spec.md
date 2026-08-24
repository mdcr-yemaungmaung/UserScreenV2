# Feature Specification: Sync Hot Promotion Card Font Sizes to Trending Venues Card

**Feature Branch**: `006-sync-promo-font-size`

**Created**: 2026-08-24

**Status**: Draft

**Input**: User description: "font size of restaurant card of hot promotion should be same with trending venues card."

## Clarifications

### Session 2026-08-24

- Q: Should font-size parity require identical typography tokens (0px difference), or is a small tolerance (≤2px) acceptable for matching? → A: Identical font-size tokens (0px difference) at each supported breakpoint — `renderPromoCard` must reuse the exact same font-size class as `renderTrendingCard` for each matching text role.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See Uniform Typography Across Home Sections (Priority: P1)

A customer scrolls the Home screen and moves from the "Hot Promotions" card row
into the adjacent "Trending Venues" card row. Text elements that serve the same
purpose (the venue headline, the supporting location/price line) read at the same
size in both rows, so the page feels like a single, cohesive surface instead of
two competing designs.

**Why this priority**: Inconsistent font sizing between neighboring cards is the
first thing a returning customer notices and it undermines perceived polish more
than any single color accent; it is the core reason for the request (P1).

**Independent Test**: Open Home, split the viewport so a Hot Promotion card and a
Trending Venues card are visible side by side, and confirm the headline, subtitle,
and price text of both cards are rendered at the same font size within one browser
zoom / text-resize step.

**Acceptance Scenarios**:

1. **Given** the Home screen is displayed in English at 320px width, **When** a
   Hot Promotions card is compared with the nearest Trending Venues card, **Then**
   the venue headline, supporting text (location/price), and offer label render
   with identical font-size tokens (0px difference) in both cards.
2. **Given** the same two cards are compared at the `lg` breakpoint (≥1024px),
   **When** font sizes are read from the computed style, **Then** every
   corresponding pair is identical (0px difference, same token).
3. **Given** the UI language is Burmese (MM), **When** a Hot Promotions card and
   its nearest Trending Venues card are compared, **Then** headline and
   supporting text sizes match identically between the rows as in English.

---

### User Story 2 - Maintain Consistent Visual Hierarchy (Priority: P2)

Within each card type, the relative size relationship between headline, subtitle,
and label stays the same so that "headline is largest, supporting text is
secondary" reads identically whether the card is a promo card or a trending
card.

**Why this priority**: A matching headline size means nothing if the supporting
text is comparatively bigger; the hierarchy signal is lost. This protects the
typographic relationship (P2 — visual quality, not core parity).

**Independent Test**: Inspect one promo card and one trending card; verify the
headline/subtitle/label size ratios are identical across both cards.

**Acceptance Scenarios**:

1. **Given** both card types use the same headline token, **When** their subtitle
   tokens are compared, **Then** the subtitle is rendered at the same relative
   step below the headline in both card types.
2. **Given** the price/offer label, **When** font sizes are compared across the
   two card types, **Then** they use the same token and appear at equal visual
   weight steps relative to their respective supporting text.

---

### Edge Cases

- What happens when Burmese (MM) text is longer and wraps to more lines? → Font
  *size* is unchanged; only line height adjusts to absorb wrapping. Size parity
  is preserved.
- What happens when a future text element is added to one card type but not the
  other? → The new element must adopt the existing typographic token for its tier
  and must not introduce a new font size that has no counterpart.
- What happens when the browser is zoomed or the user has system text-resize set?
  → Parity is defined at the standard breakpoints; both card types use the same
  relative `rem`/`em` chain so they scale together and never diverge under zoom.
- What happens if the Hot Promotions card has extra typographic accents (gold
  banner, red CTA)? → Color and layout accents may differ, but *font size* must
  still match the trending card's tokens for the corresponding text role.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Hot Promotions card MUST render the exact same font-size tokens as
  the Trending Venues card for each matching text role: headline, supporting text,
  and price/offer label — exact, with no tolerance, at every supported breakpoint.
- **FR-002**: Token parity MUST hold at 320px width (mobile) and at the `lg`
  breakpoint (≥1024px).
- **FR-003**: The relative typographic hierarchy (headline larger than
  supporting text larger than label) MUST be identical in both card types at
  every breakpoint.
- **FR-004**: The parity MUST apply in both English and Burmese (MM) UI modes.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of headline/subtitle/price text pairs shared between Hot
  Promotions and Trending Venues cards render at an identical font size (0px
  difference, same token) at 320px width.
- **SC-002**: 100% of headline/subtitle/price text pairs render at an identical
  font size (0px difference, same token) at the `lg` (≥1024px) viewport.
- **SC-003**: A reviewer comparing a promo card next to a trending card cannot
  identify a larger headline, subtitle, or label in either card within a 3-second
  side-by-side glance (both EN and MM).
- **SC-004**: Visual hierarchy ratios (headline : supporting : label) are equal
  across the two card types with no inverted steps.

## Assumptions

- The Trending Venues card (`renderTrendingCard` in
  `js/components/RestaurantCard.js`) is the **source of truth** for font-size
  tokens, since the requirement is literally "same with trending venues card."
- Both cards live in the same Home screen context and share the same CSS build,
  so shared Tailwind/typography classes can be reused directly.
- "Same font size" means the same compiled typography token/class at each
  breakpoint; this is independent of color, background, or badge style, which may
  still differ to give the promo card its distinct promotional identity.
- This is a standalone parity feature; it relates to (but does not amend) the
  existing spec `005-hot-promotions-highlight`, whose dedicated promo style is
  otherwise preserved.
