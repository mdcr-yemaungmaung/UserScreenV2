# Tasks: Booking Calendar 60-Day Window

**Input**: Design documents from `/specs/002-booking-calendar-window/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/calendar-component-contract.md, quickstart.md

**Tests**: No automated tests requested — validation is manual via `quickstart.md` scenarios (repo has no test framework).

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Single-project static prototype: changes live under `js/` at repository root.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Baseline verification before touching code

- [x] T001 Verify working tree is clean and current branch is `002-booking-calendar-window` (run `git status` and `git branch --show-current` from repo root)
- [x] T002 Run `npm install` to ensure dependencies (`@tailwindcss/cli`, express) are present for later `npm run build:css`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Date-window helpers and mock availability that ALL user stories depend on

**?? CRITICAL**: No user story work can begin until this phase is complete

- [x] T003 Add local date helper functions (today-at-midnight, addDays, compareYMD, formatDateStr `"MMM D, YYYY"`, parse of accepted formats) inside the IIFE in js/components/CalendarPicker.js, replacing the hardcoded `2026 / month 7 / day 14` references in the isToday/isPast logic per contracts/calendar-component-contract.md
- [x] T004 Implement deterministic mock availability function `defaultIsUnavailable(dateStr, y, m, d)` (seeded hash of Y-M-D → ~15% unavailable) plus an exported-for-demo override map hook, in js/components/CalendarPicker.js per research.md R3

**Checkpoint**: Helpers compile-clean; existing calendar still renders identically when called without new options.

---

## Phase 3: User Story 1 - Select a date within the 60-day booking window (Priority: P1) ?? MVP

**Goal**: Calendar shows only today..today+59 as selectable; tapping an enabled date selects it and shows that date's slots.

**Independent Test**: Open the booking calendar, verify only in-window dates are enabled, tap one, confirm selection chip and slot section update (quickstart S1, S4).

### Implementation for User Story 1

- [x] T005 [US1] Add `minDate`/`maxDate` option support to `generateCalendarGrid()` defaulting to today / today+59, computing them from system date on every call, in js/components/CalendarPicker.js per contracts/calendar-component-contract.md
- [x] T006 [US1] Apply `isEnabled = inWindow && hasAvailability` to day-cell rendering so out-of-window and unavailable days emit the `disabled` attribute and muted styling, keeping selected > today > disabled visual precedence, in js/components/CalendarPicker.js
- [x] T007 [US1] Update the booking-modal calendar flow in js/screens/u04-calendar.js to pass store-selected date through and keep day-click persistence via `store.setBookingStep(1, { bookingData: { date } })` only for enabled days
- [x] T008 [US1] Run `npm run build:css` if any new Tailwind class names were introduced, then manually verify quickstart S1 and S4 against `npm run dev`

**Checkpoint**: User Story 1 fully functional and independently testable (MVP demo-ready).

---

## Phase 4: User Story 2 - Past and out-of-range dates cannot be viewed or selected (Priority: P1)

**Goal**: Backward navigation into past months blocked; forward navigation stops at window end; out-of-range grid tail days reject taps.

**Independent Test**: Attempt prev-month paging on current month and next-month paging past the boundary month; both must be inert; tapping grayed tail dates does nothing (quickstart S2, S3).

### Implementation for User Story 2

- [x] T009 [US2] Gate navigation controls in `generateCalendarGrid()`: render `#cal-prev-month` with `disabled` when displayed month == current month, and `#cal-next-month` with `disabled` when advancing would pass the maxDate month, in js/components/CalendarPicker.js per clarification Q1 and FR-002/FR-003
- [x] T010 [US2] Add disabled-attribute guards to the prev/next click handlers in the booking modal binding in js/screens/u04-calendar.js (skip month mutation when control carries `disabled`)
- [x] T011 [P] [US2] Apply the same disabled-guards to the hero popover handlers in js/screens/u01-home.js and shop-detail handlers in js/screens/u03-shop-detail.js so all call sites honor the contract's consumer obligations
- [ ] T012 [US2] Manually verify quickstart S2 and S3, including tapping out-of-range leading/trailing grid cells (they carry no enabled styling and must not select), and confirm FR-008/FR-009 still hold: selected date keeps its filled style and today keeps its outlined highlight after navigation

**Checkpoint**: User Stories 1 AND 2 both work; no path reaches a past or beyond-window date.

---

## Phase 5: User Story 3 - Dates without available slots are disabled (Priority: P2)

**Goal**: Any in-window date with zero bookable slots (including today) renders disabled and rejects taps.

**Independent Test**: Identify mock-unavailable days (~15%, deterministic), tap one, confirm nothing is selected; repeat later same day for identical results (quickstart S5, S6).

### Implementation for User Story 3

- [x] T013 [US3] Wire the `isUnavailableFn` option into day-cell disabled computation (compose with in-window check) in js/components/CalendarPicker.js, ensuring today receives no exemption per clarification Q2
- [x] T014 [P] [US3] Add 2–3 explicit override entries (one known-available, one known-unavailable, one "today unavailable") to the demo override map from T004 in js/components/CalendarPicker.js so quickstart S5/S6 are reproducible
- [ ] T015 [US3] Manually verify quickstart S5 determinism (same disabled set across re-renders/reopens same day) and S6 (today disabled when it has no slots), confirming FR-008/FR-009 states remain visually correct for selected and today cells

**Checkpoint**: All three user stories independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Cross-story quality gates per plan.md Constitution Check

- [x] T016 [P] Review js/components/CalendarPicker.js for leftover hardcoded date constants or dead branches and remove obsolete contradictory logic (no duplicate ambiguous statements per spec Clarifications)
- [ ] T017 Set viewport to 320px and validate layout discipline across S1-S7 (7-column grid intact, no horizontal scroll, disabled text legible >=11px) per constitution Principles I and V
- [ ] T018 Run the full quickstart.md scenario suite (S1-S7) end-to-end via `npm run dev` and record pass/fail for each scenario
- [x] T019 Run `npm run build:css` one final time and `git status` to confirm only intended files changed (js/components/CalendarPicker.js, js/screens/u04-calendar.js, js/screens/u01-home.js, js/screens/u03-shop-detail.js, css/styles.css)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: none — start immediately
- **Foundational (Phase 2)**: depends on Phase 1 — BLOCKS all user stories
- **US1 (Phase 3)**: depends on Phase 2 (T003, T004)
- **US2 (Phase 4)**: depends on US1's rendering changes (T006) since disabled/gated visuals share the same cell markup; T011 additionally touches u01/u03 after T010 establishes the guard pattern
- **US3 (Phase 5)**: depends on T004 (availability fn) and T006 (disabled composition point); can start after US1
- **Polish (Phase 6)**: depends on Phases 3-5 completion

### User Story Dependencies

- **US1 (P1)**: Foundational only — no other story dependency
- **US2 (P1)**: Builds on US1's cell-rendering composition; independently testable once complete
- **US3 (P2)**: Composes with US1's isEnabled rule; independently testable once complete

### Within Each User Story

- Component change before consumer update
- Renderer logic before event-handler guards
- Manual verification task closes each story

### Parallel Opportunities

- T011 runs parallel to T010 (different files, same established pattern)
- T014 runs parallel to T013 (override map vs wiring)
- T016 runs while other polish tasks wait on dev server checks
- Limited otherwise: most work concentrates in the single shared component by design (research R4)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: quickstart S1 + S4 pass
5. Demo-ready: bounded, selectable booking calendar

### Incremental Delivery

1. Setup + Foundational ?? foundation ready
2. US1 ?? validate S1/S4 (MVP!)
3. US2 ?? validate S2/S3 — no invalid dates reachable
4. US3 ?? validate S5/S6 — availability-aware disabling
5. Polish ?? full S1-S7 suite green

### Parallel Team Strategy

With two developers after Phase 2:
- Developer A: US1 ?? US2 component-side (T009)
- Developer B: US3 wiring (T013/T014) — merges after T006 lands

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- All validation is manual (quickstart.md) — repo has no test framework
- Commit after each task or logical group
- Stop at any checkpoint to validate a story independently
- Any new class name requires `npm run build:css` immediately (constitution Principle II)
