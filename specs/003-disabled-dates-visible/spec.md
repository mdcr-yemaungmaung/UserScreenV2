# Feature Specification: Disabled Dates Visible But Not Selectable

**Feature Branch**: `003-disabled-dates-visible`

**Created**: 2026-08-24

**Status**: Draft

**Input**: User description: "in calendar view, the disable date is show, but not selectable."

## Clarifications

### Session 2026-08-24

- Q: When a customer taps or activates a disabled date, should the calendar stay silent or show feedback? → A: No feedback at all — tap simply does nothing.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See disabled dates while being unable to select them (Priority: P1)

A customer viewing the booking calendar can see every date of the displayed month — including past dates, dates beyond the booking window, and dates with no available slots — rendered in a visibly "disabled" style. When the customer taps any disabled date, nothing happens: it never becomes selected and never advances the flow. Disabled dates are shown for context (so customers understand why nearby days are or aren't bookable) but carry no interactive affordance.

**Why this priority**: This is the entire feature — visible-but-inert dates are what the customer experiences; hiding disabled dates or letting them be selectable would both break the requirement.

**Independent Test**: Can be fully tested by opening the calendar, confirming all month days are rendered (disabled ones visually distinct), tapping a disabled date, and verifying no selection occurs and the previously selected date remains unchanged.

**Acceptance Scenarios**:

1. **Given** the booking calendar shows a month containing disabled dates, **When** the customer views the grid, **Then** every day of that month appears as a date cell (none are hidden), with disabled dates visually distinct from enabled ones.
2. **Given** the customer taps a disabled date cell, **When** the tap occurs, **Then** nothing happens at all — no selection change, no message or visual feedback, and the flow stays in its current state.
3. **Given** a previously selected valid date exists, **When** the customer taps disabled dates around it, **Then** the selection remains on the original date.
4. **Given** disabled dates appear, **When** the customer inspects them, **Then** their text remains legible despite reduced emphasis.

---

### Edge Cases

- What about leading/trailing grid cells belonging to adjacent months? Out-of-month filler cells may remain empty layout slots; they are not date cells of the viewed month and need no disabled styling.
- What happens when a disabled date is also "today"? Today's highlight yields to the disabled presentation; it still cannot be selected.
- How does the system handle keyboard/assistive activation of a disabled date? Disabled cells must be unreachable as a selection target by any input method, not just pointer taps.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The calendar MUST render all date cells of the displayed month, including dates that are not selectable; disabled dates MUST NOT be hidden from view.
- **FR-002**: Disabled dates MUST be presented so customers can tell them apart from selectable dates at a glance (e.g., reduced contrast/emphasis) while their text stays legible.
- **FR-003**: Tapping, clicking, or otherwise activating a disabled date MUST produce no response whatsoever — no selection change, no toast/message, no visual feedback — and the booking-flow step MUST NOT change.
- **FR-004**: A previously selected date MUST remain selected when customers interact with disabled dates.
- **FR-005**: Disabled status MUST apply uniformly to every non-selectable category: past dates, dates outside the booking window, and dates without available slots.
- **FR-006**: A disabled date MUST NOT expose an interactive affordance (it must not appear tappable/hoverable like an enabled date).

### Key Entities *(include if data entities involved)*

- **Booking Date**: A calendar day cell; attributes include date value, visual state (enabled / disabled / today-highlighted / selected), and selectability. This feature constrains the *visual state* (always rendered) and *selectability* (inert when disabled) of that entity defined in feature `002-booking-calendar-window`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of non-selectable dates in a displayed month are visible in the grid; zero selectable-looking gaps where disabled dates were hidden.
- **SC-002**: 100% of taps/activations on disabled dates produce no state change (selection, display, or flow step).
- **SC-003**: In usability observation, at least 90% of customers correctly identify disabled versus selectable dates within 10 seconds of viewing the calendar.
- **SC-004**: Disabled date labels remain legible per the project's readability standard (no smaller or lower-legibility than other secondary text).

## Assumptions

- This feature refines and restates behavior introduced in `002-booking-calendar-window` (60-day window); it applies to every calendar instance in the product (booking modal, home hero popover, shop-detail popover).
- "Disabled" presentation follows the existing reduced-emphasis convention already used in the prototype; no new color tokens or text strings are required.
- Empty grid filler cells before the first day of a month are layout artifacts, not disabled dates, and are out of scope.
