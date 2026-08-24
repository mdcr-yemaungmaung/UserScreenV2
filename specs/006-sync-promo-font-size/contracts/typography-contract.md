# UI Contract: Promo vs Trending Card Typography

**Phase**: 1 (Design & Contracts) | **Date**: 2026-08-24 | **Type**: internal UI contract (web application)

## Scope

This contract governs the **text-role → font-size class** mapping that is shared between two card renderers in `js/components/RestaurantCard.js`:

- Reference card: `renderTrendingCard`
- Target card: `renderPromoCard`

It is enforced for **English and Burmese (MM)** modes, at **320px width** and at the **`lg` breakpoint (≥1024px)** (Constitution I).

## Contract

The "Must-emit" column lists **font-size utilities only** — this is the entire binding scope of the contract (per spec.md: parity is font-size only).

| Text role | Must-emit font-size classes (both cards) | Explicitly OUT of scope (may differ) |
|-----------|------------------------------------------|--------------------------------------|
| Headline (`venueTitle` / `name`) | `text-base sm:text-lg md:text-2xl` | color, weight family, transform |
| Supporting label (Location / Price) | `text-xs` | color (`#58413f` etc.) |
| Supporting icon (`location_on`, `payments`, `restaurant`) | `text-sm` | icon color |
| Supporting value (location text, price text) | `text-xs` | color (`#840f16` price vs `#58413f` location may differ per card) |
| Offer-label (banner text / in-content promo tag) | `text-[11px] sm:text-xs` | color, `uppercase`, padding, badge shape |
| CTA (BOOK NOW) | `text-xs sm:text-sm` — promo-only, no counterpart | entire CTA styling |

Note: `font-headline` / `font-label` / `font-body` families and `font-bold` / `font-extrabold` weights listed alongside these utilities in the renderers are presentation context, not parity requirements — only the `text-*` size utilities above are bound.

## Invariants

1. For any given breakpoint and locale, `getComputedStyle(node).fontSize` for a Hot Promotions headline and a Trending Venues headline MUST be equal (0px difference) — and likewise for supporting text and offer-label.
2. No new Tailwind class is added to satisfy this contract; all classes above already exist in the compiled `css/styles.css`.
3. All shared-role font sizes are ≥11px on mobile (Constitution V).
4. The promo card may keep its own background (`#FFF8F6`), border, gold offer banner, CTA, **text colors, and text transforms** — only the `text-*` font-size utilities listed above are bound by this contract.

## How to verify (manual)

1. Serve the app (`npm run dev`), open Home.
2. Inspect a Trending Venues card headline → copy computed `font-size` + class list.
3. Inspect the nearest Hot Promotions card headline → confirm identical class list and identical computed `font-size`.
4. Repeat for supporting text and offer-label, at 320px and at ≥1024px, in both EN and MM.
5. `npm run build:css` produces no diff (no new classes introduced).
