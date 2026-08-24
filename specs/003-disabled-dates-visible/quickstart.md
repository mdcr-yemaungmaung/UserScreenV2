# Quickstart: Disabled Dates Visible But Not Selectable — Validation Guide

**Feature**: `003-disabled-dates-visible`

## Prerequisites

- Node.js installed; dependencies present (`npm install`).
- Feature 002 (60-day window) behavior in place — this feature builds directly on it.

## Run

```powershell
npm run dev
```

Open the prototype. Repeat the scenarios below on **each** calendar instance: booking modal (Bookings tab → start a booking), home hero date popover, shop-detail date popover.

## Validation Scenarios

### S1 — All days visible, disabled ones distinct (FR-001, FR-002, SC-001)

1. Open a calendar showing the current month.
2. **Expect**: One cell for every day of the month; past days and any slot-less days render muted/faded yet readable; enabled days look like white tappable cards.

### S2 — Tap produces nothing (FR-003, SC-002)

1. Tap a muted/disabled date.
2. **Expect**: Absolutely no response — no selection change, no toast/message, no ripple or highlight, flow unchanged.

### S3 — Selection survives (FR-004)

1. Select a valid enabled date.
2. Tap several disabled dates around it.
3. **Expect**: The selected chip/date display still shows the originally chosen date.

### S4 — Uniform treatment (FR-005)

1. Compare a past day, a beyond-window day (page forward to the boundary month), and a slot-less day.
2. **Expect**: All three use the identical muted presentation; you cannot tell categories apart by styling.

### S5 — No fake affordance (FR-006)

1. Hover/long-press a disabled date (desktop) and compare with an enabled one.
2. **Expect**: Enabled cells show hover feedback + pointer cursor; disabled cells show neither.

### S6 — Keyboard/assistive inertness (FR-003 edge case)

1. Tab through the calendar with the keyboard.
2. **Expect**: Focus never lands on a disabled day cell; screen-reader/inspector tools report them as disabled controls.

## Automated smoke check (component level)

The Node-based DOM-less test from feature 002 can be re-run to assert: button-per-day count, expected `disabled` counts, and deterministic re-render equality (see contracts/disabled-date-contract.md → Verification Hook).

## Failure triage

| Symptom | Likely cause |
|---------|--------------|
| Disabled day responds to tap | Cell missing native `disabled` attribute |
| Focus ring appears on a disabled day via Tab | Non-native inertness mechanism used instead of `disabled` attr |
| Disabled style differs between calendars | Consumer overriding post-render styles (violates contract §Consumer Obligations 2) |
| New styles missing | Class names changed without `npm run build:css` |
