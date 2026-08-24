# Research: Disabled Dates Visible But Not Selectable

**Feature**: `003-disabled-dates-visible` | **Date**: 2026-08-24

## R1: How is "zero response to any activation" (FR-003) guaranteed across input methods?

**Decision**: Keep the native `disabled` attribute on date-cell buttons as the single inertness mechanism. Native disabled controls are excluded from tab order, cannot be activated by keyboard (Enter/Space), are skipped by assistive technology activation, and do not dispatch click events — covering pointer, keyboard, and assistive paths with one mechanism. No JavaScript-level tap interception is added.

**Rationale**: The prototype already emits `disabled` on non-selectable cells (feature 002). Native semantics satisfy FR-003 for all input methods without extra code, honoring constitution Principle IV (simplicity). A JS guard would duplicate what the platform already guarantees.

**Alternatives considered**:
- `pointer-events: none` CSS only — rejected: still leaves the cell keyboard-focusable and announced as activatable by screen readers.
- Click-handler guard (`if (btn.disabled) return`) in consumers — already present in feature 002 handlers; retained as defense-in-depth but not relied upon.
- `aria-disabled` + role stripping — rejected: overkill for a prototype; native `disabled` conveys stronger, standardized semantics.

## R2: How is "no interactive affordance" (FR-006) presented?

**Decision**: Disabled cells continue using the existing muted token set — `text-[#EADFD1] opacity-40 cursor-not-allowed bg-transparent` — and MUST NOT carry hover-state classes (`hover:bg-*`, `hover:border-*`, cursor-pointer) that enabled cells use. The audit confirms no hover/pointer classes leak into the disabled branch of the style conditional.

**Rationale**: Reuses established tokens (constitution Principle II/III spirit); visually reads as inert while staying legible ≥11px (Principle V). No new strings or colors required by the silent-rejection clarification (Q1).

**Alternatives considered**:
- New "disabled" gray token — rejected: introduces a second muted color with no user-visible benefit; existing `#EADFD1 @ 40%` is already distinct from enabled white cards.
- Hide disabled days entirely — rejected: contradicts core requirement (dates must be visible).

## R3: Do consumers need changes?

**Decision**: No functional changes expected. Verification tasks confirm each consumer's day-click handler reads `data-date-str` only from events (which never fire on native-disabled buttons) and that no consumer re-enables or restyles disabled cells after render.

**Rationale**: All three calendars render through the shared generator; per-cell HTML is the contract boundary. Post-render DOM mutation would be the only escape hatch, and none exists today.

**Alternatives considered**:
- Defensive re-check of `disabled` inside each handler — kept from 002 as harmless belt-and-braces; not expanded further.

## R4: Does the empty filler cell before the first day conflict with "all dates visible"?

**Decision**: Out of scope. Leading/trailing filler slots are layout artifacts belonging to adjacent months, not dates of the displayed month; spec Assumptions explicitly exclude them. They remain empty `<div class="h-10">` spacers.

**Rationale**: Rendering adjacent-month numbers would add selectable-looking targets that violate the window rules or require new disabled styling for zero demo value.

**Alternatives considered**: Show adjacent-month days as disabled — rejected: scope creep beyond the spec's stated assumption.
