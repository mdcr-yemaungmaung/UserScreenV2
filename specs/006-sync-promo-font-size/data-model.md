# Data Model: Sync Hot Promotion Card Font Sizes

**Phase**: 1 (Design & Contracts) | **Date**: 2026-08-24

> This feature introduces **no new runtime entities**. The "data model" here is the **typography token contract** between two existing card renderers, plus the read-only mock entity each card renders.

## Shared Mock Entity (read-only reference)

Both cards render the same mock `Restaurant` object from `js/data/restaurants.js` (shape referenced, not modified):

| Field | Type | Role on card |
|-------|------|--------------|
| `id` | string | stable identity; used for CTA/reserve |
| `name` / `nameMM` | string | headline text |
| `venueName` / `venueNameMM` | string | headline (promo) text |
| `location` | string | supporting row ("Location") |
| `area` | string | supporting row fallback |
| `priceRange` | string | supporting row ("Price") |
| `cuisine` | string | supporting row / cuisine pill |
| `offerTag` | string | offer-label role (Hot Promotions qualification + banner) |
| `rating` | number | badge (not in parity scope) |
| `reviewCount` | number | badge subtext (not in parity scope) |
| `heroImage` | string | card image (not in parity scope) |

No validation rules or state transitions apply — the entity is static mock data (Constitution IV).

## Typography Token Model (the actual "data model" for this feature)

Parity is defined at the **text-role** level. The Trending Venues card is the reference; the Hot Promotions card must emit the identical font-size token for each role.

| Text role | Reference token (`renderTrendingCard`) | Target token (`renderPromoCard`) — AFTER alignment | Notes |
|-----------|----------------------------------------|----------------------------------------------------|-------|
| Headline | `text-base sm:text-lg md:text-2xl font-bold` | `text-base sm:text-lg md:text-2xl font-bold` | identical; headline is largest (hierarchy) |
| Supporting label text | `text-xs font-body` | `text-xs font-body` | location / price label |
| Supporting icon | `text-sm material-symbols-outlined` | `text-sm material-symbols-outlined` | icon size stays in sync with label |
| Price/label value | `text-xs font-extrabold` | `text-xs font-extrabold` | removed promo `sm:text-sm` bump |
| Offer label | `renderPromoTag` in-content → `text-[11px] sm:text-xs font-extrabold` | promo gold banner → `text-[11px] sm:text-xs font-extrabold` | offer-label role; ≥11px on mobile (Constitution V) |
| CTA label (BOOK NOW / Reserve Table) | — (no counterpart) | promo `text-xs sm:text-sm` | **out of parity scope**; unchanged |

## Validation Rules (from spec)

- FR-001: each role above MUST use the identical class listed in the "Reference token" column — exact, no tolerance (0px difference).
- FR-002: parity MUST hold at 320px and `lg` (≥1024px).
- FR-003: relative hierarchy preserved — headline (`16/18/24`) > supporting (`12`) > offer-label (`11/14`).

## Constraints

- Do **not** mutate `renderTrendingCard` (it is the reference).
- Do **not** introduce new Tailwind classes (Constitution II) — reuse exactly the classes already compiled in `css/styles.css`.
- Burmese (MM) text MUST wrap, not overflow; `break-words`/`truncate` already applied.
