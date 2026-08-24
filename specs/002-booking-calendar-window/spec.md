# Feature Specification: Booking Calendar 60-Day Window

**Feature Branch**: `002-booking-calendar-window`

**Created**: 2026-08-24

**Status**: Draft

**Input**: User description: "in booking flow, the calendar should show only 60days from today. the previous date are disabe and can move calendar date. you can select and view today < 60 days. not other date cant view and cant select. when slot is not available for that day the date will be disable."

## Clarifications

### Session 2026-08-24

- Q: Should previous months be viewable (dates disabled) when paging backward from the current month, or should backward navigation be blocked? → A: Block backward navigation — past months are not viewable at all.
- Q: If today has no bookable time slots left, should today appear disabled or stay selectable? → A: Disable today when no bookable slots remain, same as any unavailable date.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Select a date within the 60-day booking window (Priority: P1)

A customer in the booking flow opens the calendar to choose an appointment date. The calendar displays only dates from today up to and including the 59th day after today (a 60-day window counting today). The customer can navigate between months/days inside this window and tap any enabled date to select it and view its time slots.

**Why this priority**: This is the core behavior — without a selectable, bounded date range the booking flow cannot proceed.

**Independent Test**: Can be fully tested by opening the booking calendar, verifying only today-through-day-59 dates are selectable, tapping an enabled date, and confirming that date's slots are shown.

**Acceptance Scenarios**:

1. **Given** the booking flow calendar is open, **When** the customer views it for the first time, **Then** the calendar shows the current month with today highlighted and all dates before today disabled (non-selectable).
2. **Given** the calendar is open, **When** the customer navigates forward within the window, **Then** every date from today through the 59th day after today is visible and selectable.
3. **Given** the customer taps any enabled date within the window, **When** the selection is made, **Then** the date is marked as selected and the available time slots for that date are displayed.
4. **Given** the customer navigates to the last viewable month, **When** they reach the end of the window, **Then** navigation stops at the boundary — no date beyond day 59 can be viewed or selected.

---

### User Story 2 - Past and out-of-range dates cannot be viewed or selected (Priority: P1)

Dates before today and dates beyond the 60-day window are visually disabled and cannot be tapped. The calendar cannot be scrolled or paged to reveal selectable dates outside this range.

**Why this priority**: Preventing invalid bookings protects both customers and the business from impossible appointments; it is inseparable from correct booking behavior.

**Independent Test**: Can be tested by attempting to tap yesterday's date and a date past the 60-day limit, and confirming neither responds nor becomes selected.

**Acceptance Scenarios**:

1. **Given** the calendar shows the current month, **When** the customer attempts to page backward or tap any date earlier than today, **Then** backward paging is blocked and nothing can be selected before today.
2. **Given** the customer pages forward to the end of the window, **When** they try to continue to the next month beyond the boundary, **Then** further forward paging is blocked or shows only disabled dates outside the window.
3. **Given** a date outside the window is displayed (e.g., grayed-out tail of a month grid), **When** the customer taps it, **Then** no selection occurs.

---

### User Story 3 - Dates without available slots are disabled (Priority: P2)

For each date in the window, if no time slots are available that day, the calendar disables that date so the customer cannot select it and hit a dead end.

**Why this priority**: Improves booking success rate and reduces frustration, but depends on availability data being present per date.

**Independent Test**: Can be tested by marking one in-window date as having zero available slots and confirming it renders disabled and rejects taps.

**Acceptance Scenarios**:

1. **Given** a date within the window has no available slots, **When** the calendar renders, **Then** that date appears disabled (visually distinct from selectable dates).
2. **Given** the customer attempts to tap a fully booked / unavailable date, **When** the tap occurs, **Then** no selection happens and the flow stays on the current state.

---

### Edge Cases

- What happens when "today" changes (e.g., user keeps the screen open past midnight)? The window should re-anchor to the new current day on next open/refresh.
- What happens when all of today's remaining slots have passed? Today is disabled like any other date with no available slots (per Session 2026-08-24 clarification).
- What happens on the 59th day after today when its slots fill up? It behaves like any other fully unavailable date — disabled.
- How does the system handle a month grid whose leading/trailing days belong to adjacent months? Out-of-window days shown for layout purposes must remain non-selectable.
- What happens if availability data fails to load? In-window dates default to their current state without silently enabling unavailable days; the customer sees the calendar rather than an error dead-end (prototype: use mock data).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The booking calendar MUST display a selectable date window starting at today and ending at the 59th day after today (60 days inclusive).
- **FR-002**: All dates earlier than today MUST NOT be viewable; backward calendar navigation MUST be blocked so past months cannot be paged into.
- **FR-003**: All dates after the 59th day following today MUST NOT be viewable as selectable dates and MUST NOT be selectable; forward navigation MUST stop at the window boundary.
- **FR-004**: Users MUST be able to move (page/scroll) the calendar forward between dates within the window; backward paging is blocked per the Session 2026-08-24 clarification.
- **FR-005**: Users MUST be able to select any enabled in-window date and view that date's time slots upon selection.
- **FR-006**: Any in-window date with no available slots MUST be disabled and MUST NOT respond to selection. This includes today when no bookable slots remain for the current day — today receives no special exemption from availability rules.
- **FR-007**: Disabled dates MUST be visually distinguishable from enabled dates (e.g., reduced contrast), while remaining legible per the localization/readability rules.
- **FR-008**: The currently selected date MUST be visibly indicated until the user changes selection or leaves the flow.
- **FR-009**: Today MUST be identifiable in the calendar (e.g., highlight) even when another date is selected.
- **FR-010**: The date window MUST always be computed relative to the current date whenever the booking flow calendar is opened.

### Key Entities *(include if feature involves data)*

- **Booking Date**: A single calendar day within the booking window; attributes include date value, selectability (in-window, not past, has availability), and selected state.
- **Time Slot**: An offerable time on a Booking Date that the customer sees after selecting a date; a date with zero available slots is disabled.
- **Availability**: Per-date indication of whether at least one slot exists; drives date disabling.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of dates offered for selection fall within today through today+59; zero selections can land on past or out-of-range dates.
- **SC-002**: A customer can go from opening the calendar to selecting a valid in-window date in under 10 seconds.
- **SC-003**: 100% of dates with no available slots render disabled and reject selection attempts.
- **SC-004**: Calendar navigation between in-window dates completes immediately (no perceptible delay) in the prototype.
- **SC-005**: At least 90% of test users correctly identify which dates are selectable versus disabled without assistance.

## Assumptions

- "60 days" means a 60-day inclusive window: today plus the following 59 days.
- This is a UI prototype (per constitution Principle IV): availability per date comes from mock data defined in-JS; no real backend sync is required.
- The existing booking-flow calendar component will be modified in place rather than replaced.
- Time-zone handling follows the device/browser local date for determining "today".
- Localization (English/Burmese) of weekday/month labels follows existing calendar conventions; this feature does not add new text beyond possible disabled-state styling.
