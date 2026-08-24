# Implementation Plan: Booking Calendar 60-Day Window

**Branch**: `002-booking-calendar-window` | **Date**: 2026-08-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-booking-calendar-window/spec.md`

## Summary

Restrict the booking-flow calendar to a 60-day selectable window anchored on today (today through today+59). Backward navigation into past months is blocked; forward navigation stops at the window boundary; dates outside the window and dates with no available slots render disabled and reject selection. The change is made in the shared `generateCalendarGrid()` component (`js/components/CalendarPicker.js`) and consumed by the booking flow (`js/screens/u04-calendar.js`), keeping other calendar call sites consistent.

## Technical Context

**Language/Version**: Vanilla JavaScript (ES2020+, browser-native, `<script type="module">`)

**Primary Dependencies**: Tailwind CSS v4 CLI (`npm run build:css`), Material Symbols icons, Express static dev server (`server.js`)

**Storage**: N/A — in-JS mock data only (constitution Principle IV); selection state held in `window.store` (`bookingModalState.bookingData.date`)

**Testing**: Manual validation via `quickstart.md` scenarios (no test framework in repo; `npm run lint` is a stub)

**Target Platform**: Modern mobile/desktop browsers, viewports 320–1024px (single `lg` breakpoint per constitution Principle I)

**Project Type**: Static UI prototype (multi-screen SPA-style HTML shell + JS screen modules)

**Performance Goals**: Calendar re-render on navigation/date select completes imperceptibly (<50 ms typical; single-month DOM regeneration)

**Constraints**: No frameworks, no backend, no persistence; all new Tailwind class names require `npm run build:css` (constitution Principle II)

**Scale/Scope**: One shared component modified (`js/components/CalendarPicker.js`), one primary consumer updated (`js/screens/u04-calendar.js`), mock availability data added

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Mobile-First, Breakpoint Discipline | PASS | Existing 7-column grid retained; no horizontal scroll introduced; day cells remain fixed-height buttons |
| II. Compiled-Tailwind Discipline | PASS | Any new/changed class names will be followed by `npm run build:css`; `css/styles.css` never hand-edited |
| III. Design-System Card Standard | PASS (N/A) | Feature touches calendar day cells, not content cards; no new card backgrounds/radii |
| IV. Prototype Fidelity over Production Hardening | PASS | Per-date availability is deterministic in-JS mock data; no backend, auth, or persistence added |
| V. Localization & Readability | PASS | Disabled-state uses reduced-opacity styling (no new text strings); existing EN/MM labels untouched; text stays ≥11px |
| VI. Repo Hygiene | PASS | No new dependencies; `node_modules` remains ignored |

Post-design re-check (Phase 1): **PASS** — design confines changes to the existing shared component plus its consumers; no complexity added beyond option parameters.

## Project Structure

### Documentation (this feature)

```text
specs/002-booking-calendar-window/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── calendar-component-contract.md
└── tasks.md             # Phase 2 output (/speckit.tasks - NOT created here)
```

### Source Code (repository root)

```text
js/
├── components/
│   └── CalendarPicker.js      # MODIFIED: window bounds, nav gating, disabled states, availability hook
├── data/
│   └── restaurants.js         # EXISTING mock data source pattern for availability mock
├── screens/
│   ├── u04-calendar.js        # MODIFIED: booking modal passes window bounds + binds gated nav events
│   ├── u01-home.js            # MODIFIED: inherits bounds via defaults + nav guard applied to hero handlers
│   └── u03-shop-detail.js     # MODIFIED: inherits bounds via defaults + nav guard applied to detail handlers
└── state.js                   # EXISTING store; no structural change (bookingData.date reused)
css/styles.css                 # REGENERATED via `npm run build:css` if new classes introduced
```

**Structure Decision**: Single-project static prototype. Changes concentrate in the shared `CalendarPicker.js` component so all three current call sites (home hero, shop detail, booking modal) get the 60-day window from one implementation, per constitution Principle IV (simplicity over duplication).

## Complexity Tracking

> No constitution violations to justify — table intentionally empty.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
