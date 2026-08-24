# Implementation Plan: Shop Detail Description under Overview

**Branch**: `004-shop-detail-description` | **Date**: 2026-08-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/004-shop-detail-description/spec.md`

## Summary

Display each shop's description as an introductory text block at the top of the
Shop Detail (U-03) Overview tab, above the Facilities & Amenities section. The
block renders the language-matching description (EN/MM) with cross-language
fallback, omits gracefully when absent, and follows the existing design-system
card/typography conventions. Technical approach: extend the existing
`renderRestaurantDetailView()` Overview-tab template in
`js/screens/u03-shop-detail.js` to emit a description section from the
already-present `restaurant.description` field; run `npm run build:css` for any
new class names (Constitution II).

## Technical Context

**Language/Version**: Vanilla JavaScript (ES2020+, browser IIFE modules), HTML template literals

**Primary Dependencies**: Tailwind CSS v4 compiled via `npm run build:css` CLI; Material Symbols icon font; existing Google Maps embed (untouched)

**Storage**: N/A - in-JS mock data (`window.YoyakuData.RESTAURANTS_DATA` in `js/data/restaurants.js`); no persistence (Constitution IV)

**Testing**: Manual visual validation via local static server (`npm start` / `server.js`); prototype fidelity over automated tests (Constitution IV). Scenarios documented in `quickstart.md`.

**Target Platform**: Responsive web PWA, 320-1024px primary range; single breakpoint `lg` (1024px) per Constitution I

**Project Type**: Static web mockup (single-page app, Vercel static deploy)

**Performance Goals**: Instant render; description is emitted within the existing detail-view render pass (no extra fetch)

**Constraints**: Text legible >=11px on mobile (Constitution V); no horizontal scroll at 320px (Constitution I); EN + Burmese localization (Constitution V); long text renders in full, natural wrap (spec assumption)

**Scale/Scope**: 1 screen touched (U-03 Overview tab), 1 new UI block, ~9 shops of mock data reviewed for description coverage

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Mobile-First, Breakpoint Discipline | PASS | Description block is single-column text flow inside the existing Overview column; wraps naturally at 320px; no horizontal scroll introduced |
| II. Compiled-Tailwind Discipline | PASS | Any new utility class names must be followed by `npm run build:css`; reuse of already-compiled classes preferred. Recorded as a mandatory task step |
| III. Design-System Card Standard | PASS | Description lives inside the existing Overview card surface; no ad-hoc card background/radius introduced. If a standalone wrapper is used it adopts the standard token set or a plain section with standard typography |
| IV. Prototype Fidelity over Production Hardening | PASS | Pure mock-data UI change; no backend, auth, persistence, or frameworks added |
| V. Localization & Readability | PASS | EN/MM selection with fallback implemented at render time; text >=11px; Burmese script renders via existing font stack |
| VI. Repo Hygiene | PASS | No dependency changes; nothing committed to node_modules |

No violations. Complexity Tracking table remains empty.

## Project Structure

### Documentation (this feature)

```text
specs/004-shop-detail-description/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── description-block-contract.md
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
js/
├── screens/
│   └── u03-shop-detail.js    # MODIFIED: emit description block in Overview tab content
└── data/
    └── restaurants.js         # UNCHANGED (optional: add descriptionMM entries if MM copy desired)

css/
├── styles.css                 # REGENERATED via npm run build:css if new classes introduced
```

**Structure Decision**: Single-project static web structure is retained; the
feature touches exactly one screen module and optionally one data file. No new
directories, services, or test trees are introduced.

## Complexity Tracking

> Fill ONLY if Constitution Check has violations that must be justified

None - no constitution violations.
