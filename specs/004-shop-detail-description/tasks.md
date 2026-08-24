# Tasks: Shop Detail Description under Overview

**Input**: Design documents from `/specs/004-shop-detail-description/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: No automated tests requested - this is a UI mockup (Constitution IV).
Validation is manual via the scenarios in `quickstart.md` (V1-V5), embedded as
checkpoint/validation tasks below.

**Organization**: Tasks are grouped by user story to enable independent
implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

Single-project static web mockup (per plan.md):

```text
js/screens/u03-shop-detail.js   # screen renderer (main change site)
js/data/restaurants.js          # mock shop data (description source)
css/styles.css                  # compiled Tailwind output (regenerated)
```

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish baseline before any code changes

- [X] T001 Confirm baseline renders: run `npm start` from repo root and open Shop Detail (U-03) Overview tab for rest-1, noting current section order (Facilities -> Gallery -> Location) per quickstart.md prerequisites
- [X] T002 [P] Locate the exact insertion point: the first child position inside `TAB CONTENT 1: OVERVIEW` panel, immediately before the Facilities & Amenities section markup in js/screens/u03-shop-detail.js

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST complete before user story work

None required. Description data (`restaurant.description`) already exists on
all mock shops in js/data/restaurants.js and the language flag (`isMm`) is
already computed in the renderer (see research.md R1/R3). No schema, routing,
or infrastructure work is needed for this feature.

**Checkpoint**: N/A - proceed directly to User Story 1

---

## Phase 3: User Story 1 - Read Shop Introduction in Overview Tab (Priority: P1) -- MVP

**Goal**: Customers see the shop's language-matched description as the first
content block inside the Overview tab, above Facilities & Amenities.

**Independent Test**: Open any shop's detail screen with Overview active; an
"About This Shop" labeled paragraph appears first in the tab content, matching
the shop's `description` field (quickstart V1, V2, V4).

### Implementation for User Story 1

- [X] T003 [US1] Add a text-resolution helper inline in the Overview template of js/screens/u03-shop-detail.js implementing `isMm ? (descriptionMM || description) : description` per contracts/description-block-contract.md rule 2
- [X] T004 [US1] Emit the description block (uppercase small label "About This Shop"/MM equivalent + body paragraph) as the FIRST child of the Overview tab content in js/screens/u03-shop-detail.js, using existing typography/surface token classes per research.md R5 (font-label ~10px bold muted label; font-body >=12px text-[#231916]); wrap emission in a presence check so nothing renders when resolved text is empty
- [X] T005 [US1] Run `npm run build:css` to compile any newly introduced Tailwind class names into css/styles.css (Constitution II - mandatory even if classes were reused)
- [X] T006 [US1] Validate quickstart scenarios V1 (block present, first, correct text), V2 (EN->MM toggle re-renders without reload; EN fallback shown), and V4 (320px: no horizontal scroll, wraps naturally, >=11px legibility) in the browser

**Checkpoint**: User Story 1 fully functional and independently testable -
description visible under Overview on all shops with data

---

## Phase 4: User Story 2 - Graceful Handling When Description Is Missing (Priority: P2)

**Goal**: Shops without description data render the Overview tab unchanged,
with no empty gaps or errors; cross-language fallback never shows blank space.

**Independent Test**: Remove `description` from one shop record in mock data;
that shop's Overview tab shows no description block while all other sections
render normally (quickstart V3).

### Implementation for User Story 2

- [X] T007 [US2] Verify the presence check from T004 covers both fields absent AND empty-string cases for `description`/`descriptionMM` in js/screens/u03-shop-detail.js, omitting the entire block (label + paragraph) when neither resolves to non-empty text per contracts/description-block-contract.md rule 1
- [X] T008 [US2] Reproduce the absence case by temporarily deleting the `description` field of rest-8 in js/data/restaurants.js, confirm quickstart V3 (no gap, siblings unaffected), then restore the record exactly as found
- [X] T009 [US2] Validate the partial-data case: shop records lacking `descriptionMM` show English text under MM language mode without blank space (fallback path of FR-003)

**Checkpoint**: User Stories 1 AND 2 both work - block shows with data,
disappears cleanly without it

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final verification across the whole feature

- [X] T010 Run the full quickstart.md validation guide end-to-end (V1-V5) at 320px, 768px, and desktop widths, confirming SC-001 through SC-004 are each observable
- [X] T011 Confirm Constitution III compliance: description block introduces no new card background/radius tokens beyond the design-system standard set in js/screens/u03-shop-detail.js

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: None exist for this feature
- **User Story 1 (Phase 3)**: Depends on Phase 1 only; delivers the MVP
- **User Story 2 (Phase 4)**: Builds on the T004 presence check; must follow Phase 3 (same file)
- **Polish (Phase 5)**: After both stories complete

### User Story Dependencies

- **US1 (P1)**: Independent - needs no other story
- **US2 (P2)**: Refines US1's rendering guard; implement after US1 (both edit js/screens/u03-shop-detail.js, so do NOT run in parallel)

### Within Each User Story

- Resolution helper (T003) before block markup (T004)
- Markup before CSS compilation (T005) and browser validation (T006)
- Guard verification (T007) before absence reproduction (T008)

### Parallel Opportunities

- T001/T002 (setup) are independent of each other
- No cross-story parallelism: both stories modify js/screens/u03-shop-detail.js

---

## Parallel Example: Setup Phase

```bash
Task: "Confirm baseline renders via npm start (T001)"
Task: "Locate Overview insertion point in js/screens/u03-shop-detail.js (T002)"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 3: User Story 1 (T003-T006)
3. **STOP and VALIDATE**: quickstart V1/V2/V4 pass
4. Feature is demoable - every shop shows its introduction under Overview

### Incremental Delivery

1. US1 done -> MVP demo
2. Add US2 (T007-T009) -> absence/fallback edge cases covered
3. Polish (T010-T011) -> full quickstart green, constitution clean

---

## Notes

- Both stories touch the same file - execute strictly sequentially
- Always run `npm run build:css` after template edits (Constitution II)
- Commit after each checkpoint (US1 complete, US2 complete)
- Validation is manual/browser-based; no test framework exists in this project
