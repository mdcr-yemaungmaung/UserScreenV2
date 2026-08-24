# Data Model: Booking Calendar 60-Day Window

**Feature**: `002-booking-calendar-window` | **Date**: 2026-08-24

Prototype scope: entities are in-memory JS structures only; no persistence (constitution Principle IV).

## Entities

### BookingDate

A single calendar day presented in the booking calendar grid.

| Field | Type | Description | Constraints |
|-------|------|-------------|-------------|
| `year` | number | Gregorian year | e.g., 2026 |
| `month` | number | 0-indexed month (0 = January) | 0–11 |
| `day` | number | Day of month | 1–31, valid for month/year |
| `dateStr` | string | Display/identity form `"MMM D, YYYY"` (e.g., `"Aug 24, 2026"`) | Canonical value stored in booking state; also emitted as `data-date-str` |

Derived flags (computed at render, never stored):

| Flag | Rule (source: spec FRs) |
|------|------------------------|
| `isPast` | Date < today (local time) → not viewable; backward nav blocked (FR-002) |
| `isBeyondWindow` | Date > today + 59 days → not selectable; forward nav stops at boundary (FR-003) |
| `inWindow` | `today ≤ date ≤ today + 59` (60 days inclusive) (FR-001) |
| `hasAvailability` | See Availability entity (FR-006); false includes today with no bookable slots left (clarification Q2) |
| `isEnabled` | `inWindow && hasAvailability` |
| `isSelected` | Matches store's selected date (FR-008) |
| `isToday` | Matches local system today (FR-009) |

Render precedence: `isSelected > isToday > !isEnabled(disabled) > enabled`.

### Availability

Per-date indication of bookable slots. Prototype implementation:

- **Deterministic mock function**: seeded hash of `YYYY-M-D` → unavailable if hash falls in fixed ratio (~15% of days).
- **Explicit override list**: named dates pinned available/unavailable for demo scenarios.
- A date is disabled when availability reports zero slots — including today (no exemption).

Relationships: one Availability record per BookingDate; consumed by the calendar renderer to set `disabled`.

## State

Existing store path (unchanged structurally): `store.getState().bookingModalState.bookingData.date` holds the selected `dateStr`; set via `store.setBookingStep(1, { bookingData: { date } })`.

Transitions:

```text
[no selection] --tap enabled day--> [selected dateStr]  (slots view updates)
[selected]     --tap other enabled day--> [selected new dateStr]
[selected]     --modal close/reopen--> [retained until flow resets]
```

Invalid transitions (blocked by disabled state): tap past day, tap beyond-window day, tap unavailable day, page into past month, page past window-end month.

## Validation Rules (from FRs)

1. Selection target must satisfy `inWindow && hasAvailability` (FR-001, FR-002, FR-003, FR-006).
2. Window bounds recomputed from current local date on every render (FR-010).
3. Prev-month control inactive when displayed month = current month; next-month control inactive when next month starts after `today + 59` (clarification Q1, FR-002/FR-003).
4. Disabled days visually distinct but ≥11px legible text (FR-007, Principle V).
