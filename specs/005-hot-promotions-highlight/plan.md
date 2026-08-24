# Implementation Plan: Hot Promotions Section Highlights Promotion Shops

**Branch**: `005-hot-promotions-highlight` | **Date**: 2026-08-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/005-hot-promotions-highlight/spec.md`

## Summary

Rework the Home screen "Hot Promotions" section so it lists ONLY shops with an
active promotion offer, each rendered with a fully custom promotional card
style reserved for this section (Clarification Q2), with the promotion as the
card's focal element. Shops without a non-empty promotion offer are excluded;
the entire section hides when no shop qualifies; navigation and EN/MM behavior
match existing venue cards. Technical approach: filter the restaurant list in
the Hot Promotions block of `js/screens/u01-home.js`, add a dedicated
`renderPromoCard()` renderer alongside the shared card helpers in
`js/components/RestaurantCard.js`, remove one mock shop's `offerTag` to make
the filter visible, then run `npm run build:css`.

## Technical Context

**Language/Version**: Vanilla JavaScript (ES2020+, browser IIFE modules), HTML template literals

**Primary Dependencies**: Tailwind CSS v4 compiled via `npm run build:css`; Material Symbols icon font

**Storage**: N/A - in-JS mock data (`window.YoyakuData.RESTAURANTS_DATA`); no persistence (Constitution IV)

**Testing**: Manual visual validation via local static server (`npm start`); scenarios in `quickstart.md`. No automated test framework (Constitution IV).

**Target Platform**: Responsive web PWA, 320-1024px primary range; single breakpoint `lg` (1024px) per Constitution I

**Project Type**: Static web mockup (single-page app, Vercel static deploy)

**Performance Goals**: Instant client-side render; filtering is a single array pass over ~9 records

**Constraints**: >=11px text legibility on mobile (Constitution V); no horizontal scroll at 320px (Constitution I); EN + MM labels (Constitution V)

**Scale/Scope**: 1 screen touched (`u01-home.js`), 1 component file extended (`RestaurantCard.js`), 1 mock data record adjusted (`restaurants.js`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Mobile-First, Breakpoint Discipline | PASS | Section keeps existing horizontal-scroll row on mobile / grid on desktop; promo cards wrap cleanly at 320px |
| II. Compiled-Tailwind Discipline | PASS | New promo-card class names require `npm run build:css` after edits - mandatory task step |
| III. Design-System Card Standard | JUSTIFIED DEVIATION | Spec FR-008 / Clarification Q2 mandates a custom promotional card style reserved for this section. Justification (documented in spec Assumptions): the section's business purpose is promotional emphasis which generic cards cannot deliver; the custom style stays within the design language (same palette family, radii scale, typography) and reuses shared helpers (favorite button, image gradient) where possible |
| IV. Prototype Fidelity over Production Hardening | PASS | Mock-data-only change; no backend/scheduling logic added |
| V. Localization & Readability | PASS | Offer labels render identically in EN/MM (offers are plain strings today); long labels wrap/truncate per contract without overflow |
| VI. Repo Hygiene | PASS | No dependency or ignore-file changes |

The one deviation is user-mandated (Q2 = C) and justified above and in the
spec; Complexity Tracking records it.

## Project Structure

### Documentation (this feature)

```text
specs/005-hot-promotions-highlight/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── hot-promotions-contract.md
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
js/
├── screens/
│   └── u01-home.js              # MODIFIED: filter Hot Promotions to promo shops; hide section when empty
├── components/
│   └── RestaurantCard.js        # MODIFIED: add renderPromoCard() dedicated promotional card renderer
└── data/
    └── restaurants.js           # MODIFIED: remove offerTag from one shop (demo of exclusion rule)

css/
└── styles.css                   # REGENERATED via npm run build:css
```

**Structure Decision**: Single-project static web structure retained; two JS
files modified plus one mock-data tweak. No new directories or services.

## Complexity Tracking

> Fill ONLY if Constitution Check has violations that must be justified

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Custom promo card style (deviation from shared `renderTrendingCard()` standard, Constitution III) | User decision Q2 = C: promotional emphasis is the section's core purpose | Reusing the standard card keeps deals visually identical to regular listings, defeating the feature's goal |
