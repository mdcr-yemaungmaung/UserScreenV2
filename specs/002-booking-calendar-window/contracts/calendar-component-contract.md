# UI Contract: Calendar Component (`generateCalendarGrid`)

**Feature**: `002-booking-calendar-window` | **Date**: 2026-08-24

This is the UI contract for the shared calendar renderer in `js/components/CalendarPicker.js`, exposed as `window.YoyakuComponents.generateCalendarGrid`. It is the interface all screens consume; no backend endpoints exist in this prototype.

## Function Signature

```js
generateCalendarGrid(options) -> HTML string
```

### Options

| Option | Type | Default | Contract |
|--------|------|---------|----------|
| `year` | number | derived from `selectedDateStr`, else current year | Displayed month's year |
| `month` | number | derived from `selectedDateStr`, else current month (0-indexed) | Displayed month, 0–11 |
| `selectedDateStr` | string \| undefined | `'Aug 14, 2026'` → **changes to** store value or none | Canonical date formats accepted: `"MMM D, YYYY"`, `"Month D, YYYY"`, `"YYYY-MM-DD"` |
| `onDaySelectAttr` | string | `'data-calendar-select-day'` | Attribute name emitted on each day button |
| `minDate` | Date | today (local, midnight) | Earliest viewable/selectable day (FR-001/FR-002) |
| `maxDate` | Date | minDate + 59 days | Latest selectable day (FR-001/FR-003); inclusive |
| `isUnavailableFn` | `(dateStr, y, m, d) => boolean` | deterministic mock (research R3) | Returns true when the day has no bookable slots → day disabled (FR-006) |

## Emitted DOM Contract

- Month header text: `"MonthName Year"`.
- Nav controls retain existing ids `#cal-prev-month` and `#cal-next-month`.
  - When displayed month == current month: prev control rendered with `disabled` attribute.
  - When advancing would exceed the month containing `maxDate`: next control rendered with `disabled` attribute.
- Day buttons carry:
  - `${onDaySelectAttr}="Y-M-D"` (1-indexed month)
  - `data-date-str="MMM D, YYYY"`
  - `disabled` attribute when: past, beyond window, or `isUnavailableFn` returns true. Selected days are never disabled.
- Visual states (existing tokens): selected = filled `#840f16`; today = outlined highlight; disabled = reduced-opacity muted text + `cursor-not-allowed`; enabled default = white card-style cell.

## Consumer Obligations (screens)

1. Nav event handlers MUST re-render via the same generator and MUST NOT decrement/increment month when the corresponding control is `disabled` (guard on the attribute).
2. Day-click handlers MUST read `data-date-str` and persist only through `store.setBookingStep(1, { bookingData: { date } })`.
3. Consumers MUST NOT bypass bounds by injecting arbitrary `year`/`month`; out-of-range months render fully-disabled grids and gated nav.
4. Any new class name introduced by consumers requires `npm run build:css` afterward (constitution Principle II).

## Behavior Guarantees

- Bounds are recomputed from the system clock on every call (FR-010).
- Same inputs + same system date ⇒ identical HTML (deterministic availability, SC-003).
- Grid remains 7 columns; no horizontal scroll at 320px (Principle I).
