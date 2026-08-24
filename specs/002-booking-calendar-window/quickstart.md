# Quickstart: Booking Calendar 60-Day Window — Validation Guide

**Feature**: `002-booking-calendar-window`

## Prerequisites

- Node.js installed (repo uses `npm run dev` / Express static server).
- Dependencies installed: `npm install`.
- Styles current: run `npm run build:css` after any class-name changes.

## Run

```powershell
npm install
npm run build:css   # only if class names changed
npm run dev         # serves the prototype
```

Open the served URL, navigate to the Bookings tab (`u04-calendar.js`), and start a booking to open the **Date & Schedule** step (booking modal).

## Validation Scenarios

### S1 — Window opens on today (FR-001, FR-009)

1. Open the booking calendar.
2. **Expect**: Current month shown; today carries the outlined highlight; no date before today is enabled.

### S2 — Past navigation blocked (FR-002, clarification Q1)

1. On the current month, click the prev-month chevron.
2. **Expect**: Nothing happens — control is disabled (muted, not clickable); past months are never displayed.

### S3 — Forward boundary at day 59 (FR-003)

1. Click next-month until the month containing today+59 is shown.
2. **Expect**: Dates up to today+59 are selectable; dates beyond it render disabled and reject taps; the next-month chevron becomes disabled at that month.

### S4 — Select a date and view slots (FR-005, FR-008)

1. Tap any enabled date within the window.
2. **Expect**: The date fills with the selected style ("Selected:" chip updates) and the Dinner Service Slots section reflects the flow for that date.

### S5 — Unavailable dates disabled (FR-006, SC-003)

1. Scan the grid: some in-window days render muted/disabled per the deterministic mock availability (~15% of days).
2. Tap one of them.
3. **Expect**: No selection occurs; the previously selected date remains unchanged.
4. Re-open the calendar later the same day: **Expect** exactly the same set of disabled dates (deterministic).

### S6 — Today with no slots left (clarification Q2)

1. If mock availability marks today unavailable (or simulate via the override list), verify:
2. **Expect**: Today renders disabled like any other unavailable day and rejects taps — no same-day exemption.

### S7 — Layout discipline (Principle I, V)

1. Set viewport to 320px width; repeat S1–S5.
2. **Expect**: 7-column grid intact, no horizontal scroll, disabled text still legible, header buttons do not overlap the "Selected" chip.

## Cross-screen consistency (research R4)

- Home hero calendar popover and shop-detail booking calendar show the same window rules (bounds inherited from shared component defaults).

## Failure triage

| Symptom | Likely cause |
|---------|--------------|
| Past months still open | Nav handler not guarding on `disabled` attribute |
| A date flips enabled/disabled between re-renders | Non-deterministic availability (must be hash-seeded) |
| New styling missing | Class names added without running `npm run build:css` |
