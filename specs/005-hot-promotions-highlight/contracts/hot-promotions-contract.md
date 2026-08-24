# UI Contract: Hot Promotions Section

**Feature**: `005-hot-promotions-highlight` | **Date**: 2026-08-24

Contract for the Home screen's Hot Promotions section. The Home renderer is
the producer; this document fixes observable DOM/visual behavior checked by
`quickstart.md`.

## Inputs

| Input | Source | Notes |
|-------|--------|-------|
| Shop records | `window.YoyakuData.RESTAURANTS_DATA` | `offerTag` drives qualification |
| Active language | `state.currentLanguage` (`'EN'` \| `'MM'`) | Card labels localize; offer strings render as-is |
| Favorites | `state.favorites` | Heart toggle behavior unchanged |

## Output Contract

### Structure

```text
<HOME DISCOVER VIEW>
  ...
  <section: Hot Promotions>                    <- present iff promoShops.length > 0
    heading "Hot Promotions" (EN/MM) + fire icon
    horizontal scroll row (mobile) / 3-col grid (desktop)
      [promo-card] x N                         <- custom style, one per qualifying shop
        image + gradient
        glass rating pill (top-left): star + rating (count)
        favorite button (top-right)            <- existing hook, unchanged
        SOLID GOLD OFFER BANNER                <- shop.offerTag, uppercase dark-cocoa
                                                  centered text, wraps max 2 lines
        shop name (large bold cocoa, EN/MM)
        location row (pin icon)
        price range row (payments icon)
        cuisine pill chip (rose bg + utensils icon)
        BOOK NOW full-width red pill           <- data-card-reserve-id: opens booking flow
  ...
```

### Behavioral Rules

1. **Qualification**: section contains exactly the shops with non-empty
   trimmed `offerTag`; each appears once.
2. **Exclusion visibility**: shops without `offerTag` (e.g., The Glass
   Pavilion after mock-data change) never appear in this section.
3. **Empty state**: if no shop qualifies, the whole `<section>` (heading
   included) is absent from the DOM.
4. **Distinct styling**: promo cards match the approved reference
   (`extra/hot promotion restaurant card.png`): warm-cream surface, 1px
   outline, glass rating pill, solid gold offer banner with dark-cocoa
   uppercase centered text, cuisine pill chip, and a full-width BOOK NOW red
   pill - visually distinct from Trending Venues cards (FR-008); standard
   cards elsewhere are untouched.
5. **Focal promotion**: the gold banner is the card's dominant element;
   minimum 11px mobile, wraps to at most two lines at 320px, no horizontal
   scroll.
6. **Interactions**: tapping the card/image/name navigates to Shop Detail
   (FR-007); the BOOK NOW button opens the booking flow via the existing
   `data-card-reserve-id` hook; the favorite heart toggles as on other Home
   cards.
7. **Localization**: EN and MM modes re-render with localized static labels;
   offer strings display identically in both modes.

## Failure Modes

| Condition | Expected behavior |
|-----------|-------------------|
| No shop has an offer | Section omitted entirely |
| Offer string empty/whitespace | Shop treated as non-promotional, excluded |
| Very long offer text | Wraps to <=2 lines, layout intact |

## Out of Scope

- Promotion scheduling/expiry windows
- A dedicated all-promotions page or banner carousel changes
- Changes to Search results, Trending Venues, or Shop Detail screens
