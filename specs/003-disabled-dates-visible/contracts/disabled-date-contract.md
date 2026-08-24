# UI Contract: Disabled Date Behavior

**Feature**: `003-disabled-dates-visible` | **Date**: 2026-08-24

Delta contract layered on `specs/002-booking-calendar-window/contracts/calendar-component-contract.md`. All guarantees below apply to every calendar instance (booking modal, home hero popover, shop-detail popover).

## Disabled Cell Guarantees (`generateCalendarGrid`)

1. **Visibility**: For a displayed month, the grid emits exactly one day button per calendar day (1..daysInMonth). A disabled state never removes or hides a cell. Leading/trailing empty filler slots are layout spacers for adjacent months and are not date cells.
2. **Inertness**: Every non-selectable cell (past, beyond-window, zero availability) carries the native `disabled` attribute on its `<button>`. Consequently:
   - click events never fire from it,
   - it is excluded from keyboard tab order and cannot be activated via Enter/Space,
   - assistive technology reports it as a disabled, non-activatable control.
   No feedback (message, toast, animation) accompanies attempted activation — silent by specification (clarification Q1, 2026-08-24).
3. **Affordance**: The disabled style branch MUST NOT include hover modifiers or pointer cursors. Canonical token set: `text-[#EADFD1] opacity-40 cursor-not-allowed bg-transparent` with no `hover:*` classes.
4. **Uniformity**: One disabled rule covers all categories; consumers cannot distinguish past vs beyond-window vs slot-less days through styling.
5. **Precedence**: Rendered styles follow selected > today > disabled > enabled; selection itself only ever occupies an enabled cell.

## Consumer Obligations (screens)

1. Day-click handlers read attributes only from dispatched events; since disabled buttons dispatch nothing, no guard is strictly required — existing `disabled` checks in handlers are retained as defense-in-depth.
2. Consumers MUST NOT re-enable, restyle, or remove disabled cells after render.
3. Any class-name change in the disabled branch requires `npm run build:css`.

## Verification Hook

The DOM-level smoke test pattern from feature 002 (Node + stubbed globals) can assert: button count == days-in-month, count of cells with `disabled` matches expected category math, and deterministic re-render equality.
