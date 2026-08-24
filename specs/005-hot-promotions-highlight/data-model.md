# Data Model: Hot Promotions Section Highlights Promotion Shops

**Feature**: `005-hot-promotions-highlight` | **Date**: 2026-08-24

No new entities. The feature constrains how the existing **Shop (Restaurant)**
entity is selected and presented in the Home Hot Promotions section.

## Entity Refinement: Shop (Restaurant)

| Field | Type (mock) | Role in 005 |
|-------|-------------|-------------|
| `offerTag` | string \| undefined | Qualification attribute: shop appears in Hot Promotions iff `typeof offerTag === 'string' && offerTag.trim() !== ''` |
| `heroImage`, `name`, `nameMM`, `cuisine`, `rating`, `reviewCount` | existing | Re-displayed on the custom promo card |
| `id` | string | Card selection/favorite hooks; unchanged |

## Mock Data Change

- `rest-glass-pavilion` (The Glass Pavilion): `offerTag` removed entirely so
  the exclusion rule is observable (it remains available via Trending Venues
  and search).

## Selection Rule (FR-001/FR-002/FR-006)

```text
promoShops = RESTAURANTS_DATA.filter(r => r.offerTag && r.offerTag.trim() !== '')
```

- Each qualifying shop renders exactly once (no duplicates).
- Non-qualifying shops never render in the section.
- Empty `promoShops` -> entire section omitted.

## State Model

None. Static render-time filtering; no lifecycle, selection, or persistence.
Favorite toggling and card navigation reuse existing interactions unchanged.

## Validation Rules

1. Every rendered promo card's shop satisfies the qualification rule, and its
   offer text equals that shop's `offerTag` (SC-001).
2. No non-qualifying shop id appears in the section DOM (SC-002).
3. Section heading + grid are absent from the DOM when `promoShops.length === 0`.
4. Offer text on cards is legible >=11px mobile and wraps within two lines at
   320px without horizontal overflow (FR-004, SC-004).
