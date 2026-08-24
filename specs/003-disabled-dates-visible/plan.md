# Implementation Plan: Disabled Dates Visible But Not Selectable

**Branch**: `003-disabled-dates-visible` | **Date**: 2026-08-24 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-disabled-dates-visible/spec.md`

## Summary

Guarantee that every calendar instance renders all date cells of the displayed month — including past dates, beyond-window dates, and slot-less dates — in a visibly disabled but legible state that produces zero response to any activation (tap, click, keyboard, assistive). The behavior was largely delivered by feature `002`; this feature formalizes it across the shared calendar renderer (`js/components/CalendarPicker.js`) and its three consumers, with the main engineering delta being verification of silent inertness (FR-003) and removal of any interactive-looking affordance on disabled cells (FR-006).

## Technical Context

**Language/Version**: Vanilla JavaScript (ES2020+, browser-native)

**Primary Dependencies**: Tailwind CSS v4 CLI (`npm run build:css`), Material Symbols icons, Express static dev server

**Storage**: N/A — in-JS mock data only (constitution Principle IV)

**Testing**: Manual validation via `quickstart.md`; DOM-level smoke test via Node (pattern used in feature 002 implementation) plus keyboard-reachability reasoning from native semantics

**Target Platform**: Modern mobile/desktop browsers, viewports 320–1024px (constitution Principle I)

**Project Type**: Static UI prototype (multi-screen SPA-style shell + JS screen modules)

**Performance Goals**: No measurable change over 002 — single-month DOM regeneration remains imperceptible (<50 ms typical)

**Constraints**: No new text strings (silent rejection per clarification Q1 → nothing to localize); native form-control semantics preferred over custom inertness handling; any new class name requires `npm run build:css`

**Scale/Scope**: One shared component audit (`js/components/CalendarPicker.js`), three consumer screens verified (`u01-home.js`, `u03-shop-detail.js`, `u04-calendar.js`)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Mobile-First, Breakpoint Discipline | PASS | No layout change — grid structure untouched; visibility requirement adds zero width |
| II. Compiled-Tailwind Discipline | PASS | Reuses existing tokens (`opacity-40`, `cursor-not-allowed`, `text-[#EADFD1]`); run `npm run build:css` if anything new slips in |
| III. Design-System Card Standard | PASS (N/A) | No content cards involved |
| IV. Prototype Fidelity over Production Hardening | PASS | Verification-first approach; no frameworks or tooling added |
| V. Localization & Readability | PASS | Silent rejection means zero new EN/MM strings; disabled text stays ≥11px and uses existing muted token |
| VI. Repo Hygiene | PASS | No new dependencies or generated artifacts |

Post-design re-check (Phase 1): **PASS** — design is audit-and-verify with at most cosmetic class adjustments; no complexity added.

## Project Structure

### Documentation (this feature)

```text
specs/003-disabled-dates-visible/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── disabled-date-contract.md
└── tasks.md             # Phase 2 output (/speckit.tasks - NOT created here)
```

### Source Code (repository root)

```text
js/
├── components/
│   └── CalendarPicker.js      # AUDIT/ADJUST: disabled-cell rendering, affordance removal
├── screens/
│   ├── u04-calendar.js        # VERIFY: booking modal day-click handler never fires for disabled cells
│   ├── u01-home.js            # VERIFY: hero popover same
│   └── u03-shop-detail.js     # VERIFY: detail popover same
└── state.js                   # UNCHANGED (selection state transitions only via enabled cells)
css/styles.css                 # REGENERATED via `npm run build:css` only if classes change
```

**Structure Decision**: Single-project prototype. The shared `generateCalendarGrid()` is the single point where disabled-cell HTML originates; consumers inherit behavior, so the plan concentrates on one audit file plus per-screen verification tasks rather than parallel implementations.

## Complexity Tracking

> No constitution violations to justify — table intentionally empty.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
