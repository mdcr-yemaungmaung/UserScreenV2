# Data Model: Disabled Dates Visible But Not Selectable

**Feature**: `003-disabled-dates-visible` | **Date**: 2026-08-24

No new entities. This feature constrains the **Booking Date** entity defined in `specs/002-booking-calendar-window/data-model.md` with presentation and interaction invariants.

## Entity Refinement: Booking Date

| Field/Flag | Constraint added by 003 |
|------------|------------------------|
| Rendered presence | Every day cell of the displayed month MUST appear in the grid (FR-001); disabled state never suppresses rendering |
| Visual state | Disabled cells use reduced-emphasis tokens, text legible ≥11px (FR-002); no hover/pointer affordance classes (FR-006) |
| Selectability | All activation paths (pointer, keyboard, assistive) produce no event and no state change when disabled (FR-003) |
| Selected-state integrity | Selection persists regardless of interactions with disabled cells (FR-004) |
| Category uniformity | Past / beyond-window / slot-less dates all receive identical disabled treatment — one rule, no per-category exceptions (FR-005) |

## State Model (unchanged from 002)

```text
[no selection] --tap ENABLED day--> [selected]
[selected]     --tap DISABLED day--> [unchanged]   <- 003 invariant: provably inert
[selected]     --tap other ENABLED day--> [selected new dateStr]
```

The only transition edges into/out of selection remain tap-on-enabled-day; disabled days are non-participating states.

## Validation Rules

1. Grid contains exactly one rendered button per day of the displayed month (1..daysInMonth), each either enabled or disabled — never absent (FR-001).
2. A cell is disabled iff: past ∨ beyond-window ∨ zero availability — computed once at render, uniform across categories (FR-005).
3. No disabled cell appears in tab order or dispatches activation events (FR-003).
4. Selected-day and today-highlight styles yield to disabled styling only via the established precedence (selected > today > disabled), and selection itself can only ever occupy an enabled cell.
