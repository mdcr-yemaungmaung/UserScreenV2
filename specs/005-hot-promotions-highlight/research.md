# Research: Hot Promotions Section Highlights Promotion Shops

**Feature**: `005-hot-promotions-highlight` | **Date**: 2026-08-24

All decisions resolved from the existing codebase; no external unknowns.

## R1. How does the Hot Promotions section render today?

- **Decision**: Replace the current `RESTAURANTS_DATA.map(r => renderTrendingCard(...))`
  in the `HOT PROMOTIONS VENUES GRID` block of `js/screens/u01-home.js` with a
  filtered list rendered via a new dedicated card renderer.
- **Rationale**: Today every shop appears in the section regardless of
  promotion - exactly what the feature removes (spec FR-001).
- **Alternatives considered**: Keeping all shops with sorting - rejected by
  user clarification Q1 = A.

## R2. Qualification rule for "has a promotion"

- **Decision**: A shop qualifies iff `offerTag` is a non-empty string after
  trimming (`r.offerTag && r.offerTag.trim()`).
- **Rationale**: Matches spec FR-002; mock data stores offers as plain strings
  on `restaurants.js`; no scheduling fields exist.
- **Alternatives considered**: Boolean `hasPromo` flag - redundant duplicate of
  presence semantics.

## R3. Where does the custom promo card live?

- **Decision**: Add `renderPromoCard(restaurant, state)` to
  `js/components/RestaurantCard.js`, exported alongside the existing card
  variants, reusing shared helpers (`renderImageGradient`,
  `renderFavoriteButton`, `renderPromoTag`) and event hooks
  (`data-card-select-id`, `data-card-fav-id`) so click/favorite behavior works
  unchanged.
- **Rationale**: Keeps all card variants co-located per current file pattern;
  reusing data attributes means zero changes to event wiring
  (`attachRestaurantCardEvents`). FR-007 navigation comes for free.
- **Alternatives considered**: Inline markup in u01-home.js - breaks the
  component-file convention; new separate component file - overkill for one
  variant.

## R4. Custom card visual design (Q2 = C)

- **Decision**: Distinct promotional style: warm amber/gold accent treatment
  (matching the existing promo-badge yellow family `#D08E1C`/`#E59819`)
  layered with the standard cream surface - e.g., amber-tinted border and a
  prominent full-width offer banner strip on the card where the offer text is
  the focal element (large, bold). Layout keeps image + name + rating but
  demotes secondary info relative to the offer.
- **Rationale**: Stays within the design language (same palette/radii/typography
  families) while being unmistakably distinct from Trending Venues cards,
  satisfying FR-008 and Constitution III's "consistent with overall design
  language" requirement.
- **Alternatives considered**: Red/crimson accent (brand primary) - rejected;
  crimson already signals rating/favorite, amber is established as the promo
  color in `renderPromoTag`.

## R5. Empty-section behavior

- **Decision**: Compute the filtered list first; if empty, omit the entire
  `<section>` including heading (FR-005).
- **Rationale**: Direct template conditional; no special empty-state design
  needed since Trending Venues always shows content.

## R6. Making the filter visible in mock data

- **Decision**: Remove `offerTag` from exactly one shop record
  (`rest-glass-pavilion`, The Glass Pavilion) in `js/data/restaurants.js`.
- **Rationale**: Currently all shops have offers, making exclusion invisible;
  removing one demonstrates FR-001/FR-002 while that shop remains reachable
  via Trending Venues/search.
- **Alternatives considered**: Removing more than one - unnecessary; reduces
  demo content.

## R7. Long offer label handling

- **Decision**: The focal offer banner allows wrapping to two lines maximum
  with balanced text; minimum font size stays >=11px mobile (Constitution V);
  no horizontal overflow.
- **Rationale**: Longest mock label ("10% OFF Bill for Group Reservations")
  must display fully or wrap gracefully at 320px (FR-004, SC-004).
- **Alternatives considered**: Single-line truncate with ellipsis - hides deal
  details, harming the section's purpose.
