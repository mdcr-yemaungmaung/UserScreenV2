# Research: Sync Hot Promotion Card Font Sizes to Trending Venues Card

**Phase**: 0 (Research) | **Date**: 2026-08-24 | **Status**: Complete

## Unknowns & Reservations

The active spec (`spec.md`) was clarified in `/speckit.clarify`: font-size parity is **exact (0px, identical token)** at each supported breakpoint. The Trending Venues card (`renderTrendingCard`) is the **source of truth**. The only question this research resolves is the concrete token-mapping between the two renderers — there are no architectural/unknowns left.

## Current State (read from `js/components/RestaurantCard.js`)

**`renderTrendingCard` (REFERENCE — source of truth)**

| Text role | Current class | Compiled px (approx) |
|-----------|---------------|----------------------|
| Headline (venue name) | `font-headline text-base sm:text-lg md:text-2xl font-bold` | 16 / 18 / 24 |
| Supporting (location, price) | `text-xs font-body` (icons `text-sm`) | 12 |
| Price value (fitPrice) | `font-label ... text-xs font-extrabold text-[#840f16]` | 12 |
| Offer tag in-content | `renderPromoTag(...,false)` → `font-label text-[11px] sm:text-xs font-extrabold` | 11 / 14 |

**`renderPromoCard` (TARGET — to align)**

| Text role | Current class | Gap vs Trending |
|-----------|---------------|-----------------|
| Headline (venue title) | `font-headline text-xl sm:text-2xl font-bold` | headline too big on mobile/lg (`32`/`36` vs `16/18/24`) |
| Supporting (location, price, cuisine) | `text-xs sm:text-sm font-body` | too big at `sm` (`12/14` vs `12`) |
| Offer banner | `font-label text-xs sm:text-sm font-extrabold` | too big at `sm` (`12/14` vs `11/14`) |
| Price value | `font-label text-xs sm:text-sm font-extrabold` | too big at `sm` |
| Cuisine pill | `text-xs sm:text-sm font-body font-medium` | too big at `sm` |
| BOOK NOW CTA | `font-label text-xs sm:text-sm font-extrabold` | CTA is promo-only — **out of parity scope** |

## Findings (research agents)

1. **Decision: headline → reuse trending headline token.**
   - Chosen: `font-headline text-base sm:text-lg md:text-2xl font-bold`
   - Rationale: exact match to the source-of-truth headline; satisfies FR-001 and keeps the headline as the largest role (FR-003 hierarchy).
   - Alternatives considered: `line-clamp-1` already applied; could use `text-lg`/`sm:text-xl` but that would not be the *identical token*. Rejected.

2. **Decision: supporting rows → reuse trending `text-xs` token.**
   - Chosen: supporting label text (`text-xs`), icon `text-sm`. Price value reuses `text-xs font-extrabold`.
   - Rationale: trending supporting text is `text-xs`; parity requires promo supporting text also be `text-xs` (drop the `sm:text-sm` bump). ≥11px guaranteed (Constitution V).
   - Alternatives considered: keep `sm:text-sm` and instead change trending — **rejected**, because the spec fixes trending as the reference and Burmese legibility at 12px is already acceptable; no need to alter the reference card.

3. **Decision: offer banner → reuse promoTag in-content token (`text-[11px] sm:text-xs`).**
   - Chosen: `font-label text-[11px] sm:text-xs font-extrabold` (mirrors `renderPromoTag`).
   - Rationale: the offer/offer-label role in the trending card is rendered via `renderPromoTag` at `text-[11px] sm:text-xs`; the promo banner is the equivalent role and should use the same token. 11px on mobile meets Constitution V (≥11px).
   - Alternatives considered: keep `text-xs sm:text-sm` (12/14) — rejected: not identical token, creates a 1–2px gap.

4. **Decision: CTA button label is OUT of parity scope.**
   - The BOOK NOW label has no counterpart in the trending card. Font-size parity applies only to the three shared text roles (headline, supporting, offer-label). CTA retains its own sizing. Resolves scope question.

## Best-Practice References

- Typography parity rule: reuse the same design token (Tailwind class) rather than matching raw pixels — this makes drift detectable in a future refactor and is exactly what FR-001 demands ("identical token", no tolerance).
- Constitution II requires `npm run build:css` after any class change — although we reuse existing classes, we run the build once as a gate.

## Resolutions

- "Same font size" interpreted as **identical Tailwind/typography class per role** (exact, documented as the canonical meaning in Assumptions).
- Breakpoint set = mobile 320px + `lg` ≥1024px (Constitution I).
