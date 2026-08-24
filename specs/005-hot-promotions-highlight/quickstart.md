# Quickstart: Hot Promotions Section Highlights Promotion Shops

**Feature**: `005-hot-promotions-highlight` | **Date**: 2026-08-24

Validation guide proving the reworked section works end-to-end. References:
[contract](./contracts/hot-promotions-contract.md), [data model](./data-model.md).

## Prerequisites

- Node.js installed
- Repo root: `D:\EzBookNow\docs\06_mockup\user-yoyaku`

## Setup & Run

```powershell
npm install          # first time only
npm start            # serves the static mockup (server.js)
```

Open the served URL in a browser. Use device toolbar for **320px width** and
desktop widths.

## Validation Scenarios

### V1. Only promotion shops listed (P1, FR-001/002, SC-001/SC-002)

1. Open Home (U-01), scroll to "Hot Promotions".
2. **Expected**: every card shows a promotion offer banner; The Glass Pavilion
   (offer removed in mock data) does NOT appear; all other shops do.

### V2. Custom promotional card style (FR-008)

1. Compare a Hot Promotions card with a Trending Venues card and against the
   reference image `extra/hot promotion restaurant card.png`.
2. **Expected**: promo cards match the reference - warm-cream card, glass
   rating pill top-left, solid gold offer banner (dark-cocoa uppercase
   centered text), location + price rows, cuisine pill chip, full-width BOOK
   NOW red pill; other sections look unchanged.

### V3. Promotion is focal and legible (US2, FR-004, SC-003/SC-004)

1. At 320px, view the offer banner on the card with the longest label
   ("10% OFF Bill for Group Reservations" - Feel Myanmar Food).
2. **Expected**: label legible (>=11px), wraps to at most two lines, no
   horizontal scroll or clipped text.

### V4. Interactions unchanged (FR-007)

1. Tap a promo card -> Shop Detail opens for that shop.
2. Tap a promo card's heart -> favorite toggles as on other cards.

### V5. Empty-section rule (FR-005)

1. Temporarily remove `offerTag` from ALL shop records in
   `js/data/restaurants.js`.
2. Reload Home.
3. **Expected**: the entire Hot Promotions section (heading included) is
   absent; Trending Venues still renders. Restore data afterwards.

### V6. Localization (Constitution V)

1. Toggle language EN <-> MM on Home.
2. **Expected**: heading and static card labels localize immediately; offer
   strings render in both modes without overflow.

### V7. Styles compiled (Constitution II)

1. After any edit introducing new class names run `npm run build:css`.
2. Reload and confirm the promotional styling renders (not unstyled HTML).

## Definition of Done

V1-V7 pass visually at 320px and desktop widths; spec success criteria
SC-001..SC-004 are observable via V1/V3/V5/V6.
