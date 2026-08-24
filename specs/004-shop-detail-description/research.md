# Research: Shop Detail Description under Overview

**Feature**: `004-shop-detail-description` | **Date**: 2026-08-24

All NEEDS CLARIFICATION items from the Technical Context were resolved without
external research - the project is an existing codebase with established
patterns (see `specs/001`-`003`). Decisions below are grounded in the current
source.

## R1. Where does description data live and is it sufficient?

- **Decision**: Reuse the existing `restaurant.description` field in
  `js/data/restaurants.js`. Every shop record already carries a one-to-two
  sentence English narrative (verified for rest-1 through rest-8 and
  rest-glass-pavilion).
- **Rationale**: Constitution IV (mock data, no backend); the field was
  authored for exactly this purpose.
- **Alternatives considered**:
  - New `descriptionMM` field on every record - deferred; only needed if MM
    translations are authored. Fallback rule (FR-003) covers absence.
  - Hardcoding text in the screen - rejected; violates data-driven rendering.

## R2. Placement inside the Overview tab

- **Decision**: Emit the description as the FIRST content block inside the
  Overview tab panel (`TAB CONTENT 1: OVERVIEW`), before the "Facilities &
  Amenities" section. Confirmed by user during clarification (Q1 = A).
- **Rationale**: Matches spec FR-002 and the clarified acceptance scenario;
  story-first ordering.
- **Alternatives considered**: After facilities / after gallery / bottom of tab
  - all rejected per user decision.

## R3. Language selection & fallback mechanics

- **Decision**: At render time read `state.currentLanguage` (the screen already
  computes `isMm`). Resolve text as:
  `isMm ? (descriptionMM || description) : (descriptionEN || description)`
  where `description` is the existing field treated as English. When both are
  absent, emit nothing (FR-004).
- **Rationale**: Mirrors the exact pattern used by `specialNotice` /
  `specialNoticeEn` at the top of the same screen - consistent, zero new
  machinery.
- **Alternatives considered**: Separate i18n dictionary keyed by restaurant id -
  over-engineering for a mockup.

## R4. Long-text handling

- **Decision**: Render full text with natural wrapping; no collapse/"read more"
  interaction (spec Assumption, suggested default accepted into planning).
- **Rationale**: Prototype fidelity first (Constitution IV); descriptions are
  short (<=2 sentences) today; avoids new interactive state.
- **Alternatives considered**: Line-clamp + expand toggle - adds state and CSS
  complexity with no current need.

## R5. Styling approach

- **Decision**: Plain section with a small uppercase label ("About This Shop" /
  MM equivalent) using the screen's established typography classes
  (`font-label`, `font-body`) and standard token colors
  (`text-[#231916]`, `#58413f`, surface `bg-[#FBF3E2] border-[#EADFD1]`
  rounded-3xl if wrapped). No new card pattern (Constitution III).
- **Rationale**: Matches Key Info card and notice banner conventions already on
  this screen; minimal new class names keeps `build:css` delta tiny.
- **Alternatives considered**: New component/renderer function -
  unnecessary for one block; inline template literal matches file style.

## R6. Build pipeline impact

- **Decision**: After editing the screen template, run `npm run build:css`
  (Constitution II, non-negotiable) so any newly introduced Tailwind class
  names compile into `css/styles.css`.
- **Rationale**: Compiled-Tailwind discipline; uncompiled classes silently do
  nothing.
- **Alternatives considered**: Only reusing existing classes to skip rebuild -
  fragile and against constitution letter; rebuild is cheap.
