# Data Model: Shop Detail Description under Overview

**Feature**: `004-shop-detail-description` | **Date**: 2026-08-24

No new entities. This feature surfaces an existing attribute of the **Shop
(Restaurant)** entity (see `js/data/restaurants.js`) on the Shop Detail
Overview tab.

## Entity Refinement: Shop (Restaurant)

| Field | Type (mock) | Presence | Role in 004 |
|-------|-------------|----------|-------------|
| `description` | string | Present on all current mock shops (EN narrative) | Primary text source; treated as the English description |
| `descriptionMM` (optional) | string \| undefined | Absent today; may be added to mock data later | Burmese description; absence triggers EN fallback (FR-003) |

## Presentation Invariants

1. **Placement**: Description block is emitted as the first child of the
   Overview tab content panel, before the Facilities & Amenities section
   (FR-002, Clarification Q1 = A).
2. **Language resolution** (FR-003):

```text
renderedText =
  lang === MM ? (descriptionMM ?? description)
              : (description   /* EN */)
```

3. **Absence rule** (FR-004): if no description exists in either language, the
   entire block (label + text) is omitted from the DOM - no empty card, no
   placeholder gap.
4. **Integrity of other sections**: Facilities, Atmosphere Gallery, and
   Location blocks render unchanged regardless of description presence.

## State Model

None. The description is static render-time content with no interaction state,
selection, or lifecycle transitions. Language switching re-renders the view via
the existing language-toggle path.

## Validation Rules

1. Every shop WITH description data shows exactly one description block in the
   Overview tab (SC-002).
2. Rendered text matches the active language per the resolution table above;
   fallback only when the selected language's field is empty/undefined
   (FR-003).
3. Shops without any description render Overview identically to today, minus
   the block (FR-004, SC-003).
4. Text container wraps at 320px with no horizontal overflow (Constitution I);
   font size >=11px mobile (Constitution V).
