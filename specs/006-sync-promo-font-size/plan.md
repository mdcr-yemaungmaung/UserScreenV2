# Implementation Plan: Sync Hot Promotion Card Font Sizes to Trending Venues Card

**Branch**: `006-sync-promo-font-size` | **Date**: 2026-08-24 | **Spec**: [./spec.md](./spec.md)

**Input**: Feature specification from `./spec.md` (font-size parity between Hot Promotions card and Trending Venues card).

**Note**: This plan is filled in by the `/speckit.plan` command.

## Summary

The Hot Promotions card (`renderPromoCard`) and the Trending Venues card (`renderTrendingCard`) currently use *different* font-size tokens for the same text roles (headline, supporting text, offer label). This spec requires **exact** font-size token parity (0px difference) at every supported breakpoint, while preserving the promo card's distinct colors/layout/CTA identity. The fix is a token-alignment edit inside `js/components/RestaurantCard.js` — reuse the exact `renderTrendingCard` font-size classes in `renderPromoCard`, then rebuild and validate. No new classes are introduced, so the compiled-Tailwind discipline gate is satisfied without adding classes; the CSS build is still run as a safety gate.

## Technical Context

**Language/Version**: JavaScript (ES2020+), vanilla — no frontend framework (Constitution IV).

**Primary Dependencies**: Tailwind CSS CLI `@tailwindcss/cli@^4.3.3` (CSS build only), `express` (dev static server).

**Storage**: N/A — mockup with in-JS mock data (`js/data/restaurants.js`); no backend/state layer touched.

**Testing**: N/A — no test framework (prototype fidelity over production hardening, Constitution IV). Validation is manual/inspected in the browser.

**Target Platform**: Mobile web (PWA) + desktop web. Breakpoints: 320px → 1024px (`sm`/`lg` only, Constitution I).

**Project Type**: web application (static site / PWA served by Express in dev, Vercel static deploy in prod).

**Performance Goals**: N/A — mockup; goal is consistent visual rendering, not throughput.

**Constraints**: 320–1024px range, no horizontal scroll/clipped content at 320px (Constitution I); all text ≥11px on mobile (Constitution V); any changed class requires `npm run build:css` (Constitution II).

**Scale/Scope**: Single shared component file (`js/components/RestaurantCard.js`), ~4 card variants. Feature scope = typography parity only; colors/background/CTA remain unchanged.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Constitution I (Mobile-First, Breakpoint Discipline)**: ✅ Pass. No new breakpoints; parity is verified at 320px and `lg` (≥1024px) only.
- **Constitution II (Compiled-Tailwind Discipline)**: ✅ Pass — **with caveat**. The edit reuses *existing* compiled classes (`text-base`, `sm:text-lg`, `md:text-2xl`, `text-xs`) already present in `css/styles.css` (used by `renderTrendingCard`). No new class names are introduced. `npm run build:css` is still run as a safety gate.
- **Constitution III (Design-System Card Standard)**: ✅ Pass. Card surface, border, radius, shadow and hover behavior are unchanged. The promo card keeps its already-justified `bg-[#FFF8F6]` deviation documented in `specs/005-hot-promotions-highlight` (this feature changes only font sizes, not the card container).
- **Constitution IV (Prototype Fidelity)**: ✅ Pass — in-JS mock data, no backend, no auth.
- **Constitution V (Localization & Readability)**: ✅ Pass — all aligned tokens are ≥11px; Burmese text wraps via existing `break-words`/`truncate` without new font sizes.
- **Constitution VI (Repo Hygiene)**: ✅ Pass — no `node_modules`/`.vercel` changes.

*No unjustified violations. Gate PASSED.*

## Project Structure

### Documentation (this feature)

```text
specs/006-sync-promo-font-size/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── typography-contract.md
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
js/
├── components/
│   └── RestaurantCard.js   # renderTrendingCard (REFERENCE) + renderPromoCard (TO ALIGN)
└── data/
    └── restaurants.js      # shared mock data (read-only reference)
css/
├── styles.css              # compiled Tailwind (rebuilt via npm run build:css)
└── overrides.css
```

**Structure Decision**: Single `js/components/RestaurantCard.js` file holds both the reference renderer (`renderTrendingCard`) and the target renderer (`renderPromoCard`). No new files; the change is token-class substitution within the existing template literal.

## Complexity Tracking

> No complexity violations requiring justification. The feature reuses existing card structure and existing typography classes; no 4th project, no new patterns, no repository-pattern deviation.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
