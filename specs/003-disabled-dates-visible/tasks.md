# Tasks: Disabled Dates Visible But Not Selectable

**Input**: Design documents from `/specs/003-disabled-dates-visible/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/disabled-date-contract.md, quickstart.md

**Tests**: No automated test framework in repo. Validation = Node DOM-less smoke check (established pattern from 002) + manual quickstart S1–S6.

**Organization**: Tasks grouped under the single user story (US1), with an audit-first foundational step per plan.md's verification-first strategy.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to
- Include exact file paths in descriptions

## Path Conventions

Single-project static prototype: changes live under `js/` at repository root.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Baseline before audit

- [x] T001 Verify branch is `003-disabled-dates-visible` and feature-002 changes are present (run `git branch --show-current`; confirm `js/components/CalendarPicker.js` contains `winMin`/`winMax` window logic)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Component-level audit — the single source of disabled-cell HTML that all stories depend on

- [x] T002 Audit the day-cell render loop in js/components/CalendarPicker.js against contracts/disabled-date-contract.md: confirm every day of the rendered month emits exactly one `<button>` carrying `${onDaySelectAttr}` and `data-date-str`, with the native `disabled` attribute present whenever the cell is past, beyond-window, or availability-less (FR-001, FR-003, FR-005)
- [x] T003 Audit the disabled style branch in js/components/CalendarPicker.js: confirm it uses only `text-[#EADFD1] opacity-40 cursor-not-allowed bg-transparent` with zero `hover:*` or `cursor-pointer` classes, and that text size stays ≥11px (FR-002, FR-006); fix and run `npm run build:css` if any adjustment is made

**Checkpoint**: Shared renderer provably emits visible-but-inert cells; consumers can be verified against it.

---

## Phase 3: User Story 1 - See disabled dates while being unable to select them (Priority: P1) ?? MVP

**Goal**: Every calendar instance shows all month days; disabled ones are visually distinct but produce zero response to any activation.

**Independent Test**: Open each calendar, verify all days render with muted styling on non-selectable ones, tap a disabled date → no selection change, no feedback; selected date persists (quickstart S1–S5).

### Implementation for User Story 1

- [x] T004 [US1] Write and run the Node DOM-less smoke check for js/components/CalendarPicker.js (stubbed globals pattern): assert button-per-day count equals days-in-month, disabled count matches category math (past days + beyond-window + override-unavailable), re-render determinism holds, and disabled buttons carry the `disabled` attribute
- [x] T005 [P] [US1] Verify js/screens/u04-calendar.js booking modal: day-click handler reads `data-date-str` only from dispatched events, retains its `disabled` defense-in-depth guard, and performs no post-render restyling of disabled cells
- [x] T006 [P] [US1] Verify js/screens/u01-home.js hero popover and js/screens/u03-shop-detail.js detail popover against the same consumer obligations (no post-render mutation, handlers event-driven only); fix any violation found
- [ ] T007 [US1] Manually validate quickstart.md scenarios S1–S5 on all three calendar instances via `npm run dev`, including keyboard Tab-pass (S6: focus never lands on a disabled cell) and confirming zero feedback on disabled taps

**Checkpoint**: US1 fully demonstrated across booking modal, home hero, and shop-detail calendars.

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Cross-story quality gates per plan.md Constitution Check

- [x] T008 Run `git status` / `git diff` to confirm only intended files changed (expected: none beyond CalendarPicker.js adjustments from T003/T004 fixes; css/styles.css only if classes changed) and run `npm run build:css` one final time if so

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: none — start immediately
- **Foundational (Phase 2)**: depends on Phase 1 — BLOCKS US1 verification
- **US1 (Phase 3)**: depends on T002/T003 audit outcome; T004 validates the component, T005/T006 verify consumers (parallel), T007 closes manually
- **Polish (Phase 4)**: depends on Phase 3 completion

### Within Each Phase

- Component audit before consumer verification (contract boundary first)
- Automated smoke check (T004) before manual walkthrough (T007)

### Parallel Opportunities

- T005 and T006 run in parallel after T004 passes (different files)
- Limited elsewhere by design: one shared component is the whole implementation surface

---

## Implementation Strategy

### MVP First (Single Story)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational audit
3. Complete Phase 3: US1 (automated check ?? consumer verification ?? manual walkthrough)
4. **STOP and VALIDATE**: quickstart S1–S6 pass on all three instances

### Notes

- This is a verification-first feature: expect zero-to-minimal code delta; if the audit in Phase 2 finds violations, they are the implementation work
- Any class-name change requires immediate `npm run build:css` (constitution Principle II)
- Commit after each logical group; stop at the checkpoint to demo independently
