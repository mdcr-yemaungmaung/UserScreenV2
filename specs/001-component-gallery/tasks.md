---
description: "Task list for the Component Gallery / Design System screen"
---

# Tasks: Component Gallery / Design System Screen

**Input**: Design documents from `/specs/001-component-gallery/`

**Prerequisites**: plan.md (required), spec.md (required)

**Tests**: No automated test framework in this prototype; verification is manual
visual review at 320px / 375px / 1024px.

**Organization**: Tasks grouped by user story to allow independent implementation.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story this task belongs to (US1, US2, US3)
- File paths are exact.

## Phase 1: Setup (Shared Infrastructure)

- [x] T001 Create `specs/001-component-gallery/` structure (spec.md, plan.md done) and add `js/screens/u22-components.js`

---

## Phase 2: Foundational (Blocking Prerequisites)

- [x] T002 [P] Add `<script src="js/screens/u22-components.js"></script>` to `index.html` before `js/main.js`

---

## Phase 3: User Story 1 - Review all UI components in one place (Priority: P1) 🎯 MVP

**Goal**: One screen rendering all 8 component categories with live components.

**Independent Test**: Open MyPage → Design System; confirm all 8 sections render
and the Cards section uses live `YoyakuData.RESTAURANTS_DATA`.

### Implementation for User Story 1

- [x] T003 [US1] Create `js/screens/u22-components.js` IIFE exposing
  `window.YoyakuComponents.renderComponentGallery(state)`.
- [x] T004 [US1] Implement `renderSection(titleEn, titleMm, bodyHtml)` wrapper with
  responsive `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` layout.
- [x] T005 [US1] Add Colors section: swatch grid from a token array
  (`#840f16`, `#FFF9EE`, `#EADFD1`, `#FFF7E8`, `#FFF8F6`, `#FBF3E2`, `#FAF3E8`, `#FFF3D6`).
- [x] T006 [US1] Add Typography section: `font-headline`, `font-label`, `font-body`
  samples (EN + MM).
- [x] T007 [US1] Add Buttons section: `btn-primary`, outline/secondary button,
  and icon favorite button (with `heart-bounce` animation).
- [x] T008 [US1] Add Cards section: live `renderTrendingCard(r, state,
  {showVenueName:true})`, `renderRestaurantCard(r, state)`,
  `renderSearchResultCard(r, state)` for first 3 restaurants.
- [x] T009 [US1] Add Tags & Badges section: `renderRatingBadge`,
  `renderRatingBadgeWithPromo`, `renderCuisineTag`, `renderCuisineTagOnImage`,
  `renderPromoTag`, and reservation status badges.
- [x] T010 [US1] Add Forms section: text/tel/email inputs + textarea in
  booking-input style (`bg-[#FFF8F6] border border-[#EADFD1] rounded-xl ...`).
- [x] T011 [US1] Add Feedback section: "Show Toast" button (calls
  `store.showToast`) + "Open Terms Modal" button.
- [x] T012 [US1] Add Navigation section: static `renderTopNavBar(state)` and
  `renderBottomNavBar(state)` previews.
- [x] T013 [US1] Run `npm run build:css` (constitution Principle II) after adding
  any new class names.

**Checkpoint**: Gallery renders all 8 sections with live components.

---

## Phase 4: User Story 2 - Reach the gallery from MyPage (Priority: P2)

**Goal**: "Design System" discoverable in MyPage menu, routed inside MyPage shell.

**Independent Test**: From MyPage menu overview, the item appears and loads the
gallery panel.

### Implementation for User Story 2

- [x] T014 [US2] In `js/screens/u08-mypage.js`, add
  `{ id: 'design-system', label: isMm ? 'ဒီဇိုင်း စနစ်' : 'Design System', icon: 'palette' }`
  to the `menuItems` array (around line 650).
- [x] T015 [US2] In `renderActiveScreenPanel()`, add
  `if (activeMenu === 'design-system') return
  window.YoyakuComponents.renderComponentGallery(state);` before the default
  reservations panel.

**Checkpoint**: MyPage menu shows Design System and routes to the gallery.

---

## Phase 5: User Story 3 - Interact with sample feedback components (Priority: P3)

**Goal**: Reviewer can trigger Toast and InfoModal from the gallery.

**Independent Test**: Tap "Show Toast" → toast appears; tap "Open Terms Modal" →
modal opens.

### Implementation for User Story 3

- [x] T016 [US3] Add `attachComponentGalleryEvents(root)` exporting on
  `window.YoyakuComponents`; wire the "Show Toast" and "Open Terms Modal" buttons
  inside the Feedback section.
- [x] T017 [US3] Ensure `renderInfoModals(state)` is present in the MyPage shell
  so the Terms modal renders (already rendered via main.js).

**Checkpoint**: Feedback buttons function.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T018 [P] Verify no horizontal scroll at 320px / 375px / 1024px.
- [x] T019 [P] Verify EN/MM labels render for menu item + section headers.
- [x] T020 [P] Run `/speckit.converge` to catch remaining gaps.

---

## Dependencies & Execution Order

- T001/T002 are foundational (Phase 1–2); T003–T013 build the gallery (US1);
  T014–T015 wire entry (US2); T016–T017 add interactivity (US3).
- T013 (`npm run build:css`) must run after any class additions.
- US2 and US3 depend on the gallery view existing (T003).

## Notes

- No [P] cross-file conflicts: u22-components.js is new; u08-mypage.js edits are
  two localized spots.
- Commit after each phase group.
