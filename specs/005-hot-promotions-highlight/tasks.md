# Tasks: Hot Promotions Section Highlights Promotion Shops

**Input**: Design documents from `/specs/005-hot-promotions-highlight/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: No automated tests requested - UI mockup (Constitution IV). Validation
is manual via `quickstart.md` scenarios (V1-V7), embedded as validation tasks.

**Organization**: Tasks are grouped by user story to enable independent
implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2)
- Include exact file paths in descriptions

## Path Conventions

Single-project static web mockup (per plan.md):

```text
js/screens/u01-home.js           # Home screen (Hot Promotions section)
js/components/RestaurantCard.js  # card renderers (add renderPromoCard)
js/data/restaurants.js           # mock data (offerTag source)
css/styles.css                   # compiled Tailwind output
```

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Baseline verification before code changes

- [X] T001 Confirm baseline renders: run `npm start` from repo root, open Home (U-01), and record the current Hot Promotions section behavior (all shops listed) per quickstart.md prerequisites
- [X] T002 [P] Locate the Hot Promotions block (`HOT PROMOTIONS VENUES GRID`) in js/screens/u01-home.js and the existing card variants + shared helpers (`renderTrendingCard`, `renderPromoTag`, `data-card-select-id`, `data-card-fav-id` hooks) in js/components/RestaurantCard.js

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST complete before user story work

None required. Qualification data (`offerTag` on shop records), shared card
helpers, and event wiring already exist (research.md R1-R3). The mock-data
tweak (remove one offerTag) is scoped to US1 as a demo task since it validates
that story's filter rule.

**Checkpoint**: N/A - proceed directly to User Story 1

---

## Phase 3: User Story 1 - See Only Shops With Active Promotions (Priority: P1) -- MVP

**Goal**: The Hot Promotions section lists only shops with a non-empty
promotion offer; non-promo shops are excluded; the section hides entirely if
no shop qualifies.

**Independent Test**: Open Home, scroll to Hot Promotions: every card carries
a visible promotion, The Glass Pavilion (offer removed) is absent, and no
non-promo shop appears (quickstart V1).

### Implementation for User Story 1

- [X] T003 [US1] In js/screens/u01-home.js, compute the qualifying list with the filter `RESTAURANTS_DATA.filter(r => r.offerTag && r.offerTag.trim() !== '')` immediately before the Hot Promotions block markup per data-model.md selection rule
- [X] T004 [US1] Wrap the entire Hot Promotions `<section>` in js/screens/u01-home.js in a presence conditional so heading and grid are omitted from the DOM when the filtered list is empty (FR-005)
- [X] T005 [US1] Replace the current `renderTrendingCard` mapping inside the Hot Promotions grid in js/screens/u01-home.js with the new promo-card renderer over the filtered list (one card per qualifying shop, no duplicates - FR-001/FR-006); initially delegate to renderPromoCard added in T007
- [X] T006 [US1] Remove the `offerTag` line from the `rest-glass-pavilion` record in js/data/restaurants.js so the exclusion rule is observable, then validate quickstart V1 (Glass Pavilion absent, all other shops present with offers)
- [X] T007 [US1] Add `renderPromoCard(restaurant, state)` to js/components/RestaurantCard.js and export it alongside existing variants, reusing shared helpers (`renderImageGradient`, `renderFavoriteButton`, `renderPromoTag`) and the existing `data-card-select-id` / `data-card-fav-id` hooks so navigation (FR-007) and favorites work without event-wiring changes

**Checkpoint**: User Story 1 fully functional and independently testable -
section shows only deal-having shops; empty-data case hides the section

---

## Phase 4: User Story 2 - Promotion Is Visually Emphasized on Cards (Priority: P2)

**Goal**: Promo cards use a fully custom promotional style reserved for this
section (amber-accent, focal offer banner), distinct from Trending Venues
cards but within the design language; labels legible >=11px at 320px.

**Independent Test**: Compare Hot Promotions cards to Trending Venues cards -
visibly distinct style; longest offer label wraps legibly at 320px
(quickstart V2/V3).

### Implementation for User Story 2

- [X] T008 [US2] Design the promo card body inside `renderPromoCard` in js/components/RestaurantCard.js per research.md R4: amber/gold accent border treatment (#D08E1C family), full-width focal OFFER BANNER strip rendering `restaurant.offerTag` in bold large text with max two-line wrap at 320px, followed by shop image, localized name/cuisine, and rating badge
- [X] T009 [US2] Ensure localization in `renderPromoCard` (js/components/RestaurantCard.js): static labels (e.g., "Special Offer"/MM equivalent) use the `isMm` flag consistent with sibling renderers; offer strings render identically in EN/MM (FR-004)
- [X] T010 [US2] Run `npm run build:css` to compile all new promo-card class names into css/styles.css (Constitution II - mandatory)
- [X] T011 [US2] Validate quickstart V2 (promo cards visually distinct from Trending Venues cards; other sections unchanged), V3 (longest label "10% OFF Bill for Group Reservations" legible, wraps <=2 lines, no horizontal scroll at 320px), V4 (card tap opens Shop Detail; heart toggles favorite), and V6 (EN/MM toggle re-renders correctly)

**Checkpoint**: User Stories 1 AND 2 complete - filtered, custom-styled,
interaction-correct promotional section

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final verification across the whole feature

- [X] T012 Run the full quickstart.md guide end-to-end (V1-V7) at 320px, 768px, and desktop widths, confirming SC-001..SC-004 are observable
- [X] T013 Verify Constitution III deviation is contained: the custom promo style exists ONLY in `renderPromoCard` in js/components/RestaurantCard.js and no other section's card markup was altered (git diff review of js/screens/u01-home.js and js/components/RestaurantCard.js)
- [X] T014 Validate the whitespace-offer edge case by temporarily setting one shop's `offerTag` to `"   "` in js/data/restaurants.js, confirm it is excluded from Hot Promotions, then restore the file exactly

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - start immediately
- **Foundational (Phase 2)**: None exist
- **User Story 1 (Phase 3)**: Depends on Phase 1 only; delivers the MVP
- **User Story 2 (Phase 4)**: Extends `renderPromoCard` created in US1 (T007); must follow Phase 3
- **Polish (Phase 5)**: After both stories complete

### User Story Dependencies

- **US1 (P1)**: Independent - needs no other story
- **US2 (P2)**: Builds directly on US1's renderer; implement after US1 (both edit js/components/RestaurantCard.js - do NOT parallelize)

### Within Each User Story

- Filter + section conditional (T003/T004) before renderer swap (T005)
- Renderer creation (T007) before visual design work (T008)
- Code before CSS compile (T010) and browser validation (T011)

### Parallel Opportunities

- T001/T002 (setup) are independent of each other
- No cross-story parallelism: US1 and US2 share js/components/RestaurantCard.js

---

## Parallel Example: Setup Phase

```bash
Task: "Confirm baseline renders via npm start (T001)"
Task: "Locate Hot Promotions block and card helpers (T002)"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 3: User Story 1 (T003-T007; T007 can be a minimal pass-through of the standard card initially)
3. **STOP and VALIDATE**: quickstart V1 passes
4. Section now lists only promotional shops - core value delivered

### Incremental Delivery

1. US1 done -> MVP demo (filter working)
2. Add US2 (T008-T011) -> custom emphasis styling complete
3. Polish (T012-T014) -> full quickstart green, deviation contained, edge cases verified

---

## Notes

- Both stories touch js/components/RestaurantCard.js - execute strictly sequentially
- Always run `npm run build:css` after class-name changes (Constitution II)
- Commit after each checkpoint (US1 complete, US2 complete)
- Validation is manual/browser-based; restore any temporarily modified mock data exactly
