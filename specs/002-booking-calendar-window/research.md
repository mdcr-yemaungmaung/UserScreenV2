# Research: Booking Calendar 60-Day Window

**Feature**: `002-booking-calendar-window` | **Date**: 2026-08-24

## R1: How is the 60-day window boundary computed?

**Decision**: Compute boundaries at render time from the system date using native `Date` in local time: `minDate = startOfToday()`, `maxDate = minDate + 59 days` (60 days inclusive, per spec Assumptions). Compare dates via normalized year/month/day integers — never `Date` subtraction with time components.

**Rationale**: FR-010 requires the window to re-anchor to the current date on every calendar open; deriving bounds inside `generateCalendarGrid()` guarantees that for all call sites without extra wiring. Local time matches the device-date assumption in the spec. Day-integer comparison avoids timezone drift bugs from ISO-string parsing (UTC shift).

**Alternatives considered**:
- Fixed hardcoded window (current code hardcodes Aug 14, 2026) — rejected: violates FR-010 re-anchoring and breaks after the prototype date passes.
- Library like date-fns/luxon — rejected: constitution Principle IV forbids new dependencies for trivial date math.
- UTC-normalized timestamps — rejected: unnecessary complexity; local day comparison suffices for a prototype.

## R2: How are out-of-range navigation directions gated?

**Decision**: Disable (not hide/remove) both nav buttons at their boundaries: prev-month button disabled whenever the displayed month is the current month; next-month button disabled whenever advancing would move past the month containing `maxDate`. Disabled styling matches existing disabled day cells (`opacity`, `cursor-not-allowed`). Per clarification Q1, backward paging into past months is fully blocked.

**Rationale**: Disabling keeps header layout stable (constitution Principle I — no layout shift/overflow at 320px) while making the boundary discoverable. Hiding buttons risks misaligned flex layout; leaving them active but no-op would fail acceptance scenario US2-1.

**Alternatives considered**:
- Hide buttons at boundary — rejected: causes header reflow between months; harder for testers to see the rule.
- Allow paging back with disabled past dates — rejected by user clarification (Q1): past months must not be viewable.

## R3: Where does per-date availability come from?

**Decision**: Deterministic mock availability function in JS (no data file changes needed): a date is "unavailable" if a seeded hash of its `YYYY-M-D` value falls in a fixed unavailable ratio (e.g., ~15%), plus an explicit override list for demo purposes. Exposed as an injectable option (`isUnavailableFn`) on `generateCalendarGrid()` so consumers can later swap real data without component changes.

**Rationale**: Constitution Principle IV requires in-JS mock data with visual fidelity. A deterministic function ensures the same date renders identically across re-renders and sessions (testable per SC-003), unlike `Math.random()`. The explicit override list lets quickstart scenarios pin known available/unavailable dates.

**Alternatives considered**:
- `Math.random()` per render — rejected: non-deterministic; a date could flip between enabled/disabled on re-render, failing SC-003.
- Static array of unavailable dates only — rejected: tedious to cover all 60 days; hash-derived defaults plus overrides give full coverage cheaply.

## R4: Which call sites get the window behavior?

**Decision**: Implement bounds/gating/availability as default behavior of the shared `generateCalendarGrid()` (options can relax it), then update `u04-calendar.js` booking modal to pass availability and honor gated nav. Home hero (`u01-home.js`) and shop detail (`u03-shop-detail.js`) inherit the window automatically through shared defaults; their event handlers need the same nav-gating guard applied where they bind `#cal-prev-month` / `#cal-next-month`.

**Rationale**: One implementation point prevents divergence between the three calendars and satisfies "booking flow" scope while keeping the prototype consistent. Spec scope is the booking flow; other screens updating for free is acceptable prototype-wide consistency, not scope creep.

**Alternatives considered**:
- Change only u04 with a forked grid generator — rejected: duplicates ~100 lines and violates DRY/simplicity principles; three divergent calendars confuse demo reviewers.
- Add bounds only in u04 via options, defaults off elsewhere — rejected: inconsistent UX across screens for zero implementation savings.

## R5: How do selected/today/disabled states coexist visually?

**Decision**: State precedence in rendering: selected > today > disabled > enabled. Selected keeps its current high-emphasis style even if otherwise out-of-range edge (cannot occur: selection is restricted to in-window enabled days). Today's highlight uses existing `bg-[#FFF8EE] border-[#840f16]` treatment but yields to disabled styling when today has no slots (clarification Q2). No new text strings are added, so no localization work beyond what exists (Principle V).

**Rationale**: Matches existing component conventions and FR-007/FR-008/FR-009. Precedence prevents contradictory styles when today is also selected or disabled.

**Alternatives considered**: Tooltip/toast explaining why a date is disabled — rejected: adds new strings requiring EN/MM translation for marginal prototype value; visual distinction satisfies SC-005.
