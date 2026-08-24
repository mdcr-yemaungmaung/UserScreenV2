# Tasks: Sync Hot Promotion Card Font Sizes to Trending Venues Card

**Input**: Design documents from `specs/006-sync-promo-font-size/`

**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/typography-contract.md ✅, quickstart.md ✅

**Tests**: No automated test tasks — the project has no test framework (Constitution IV: prototype fidelity). Validation is manual per `quickstart.md`.

**Organization**: Tasks grouped by user story (US1 = P1 font-size parity, US2 = P2 hierarchy preservation).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2)
- Include exact file paths in descriptions

## Path Conventions

- Single static-site project; the only source file touched is `js/components/RestaurantCard.js` (both renderers live there). Compiled CSS: `css/styles.css`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Capture the reference tokens and confirm a clean baseline before any edit.

- [x] T001 Record the reference font-size classes for each text role (headline, supporting label, supporting value, offer label, icon) from `renderTrendingCard` in `js/components/RestaurantCard.js` into a working note (expected: `text-base sm:text-lg md:text-2xl` headline; `text-xs` supporting; `text-sm` icons; `text-[11px] sm:text-xs` offer tag per `renderPromoTag`)
- [x] T002 Run baseline build `npm run build:css` and `node --check js/components/RestaurantCard.js` to confirm a clean starting state

**Checkpoint**: Reference token list captured; build and syntax clean.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Verify the target classes already exist in compiled CSS (Constitution II — no new classes allowed).

- [x] T003 Verify the classes `text-base`, `sm:text-lg`, `md:text-2xl`, `text-xs`, `text-sm`, `text-[11px]`, `sm:text-xs` all exist in `css/styles.css` (they are used by `renderTrendingCard`/`renderPromoTag` today); if any is missing, STOP and run `npm run build:css` first

**Checkpoint**: All target tokens confirmed compiled — user story implementation can begin.

---

## Phase 3: User Story 1 — Uniform Typography Across Home Sections (Priority: P1) 🎯 MVP

**Goal**: `renderPromoCard` emits the exact same font-size class as `renderTrendingCard` for headline, supporting text, and offer label (0px difference) at 320px and `lg`, in EN and MM.

**Independent Test**: Open Home at 320px and ≥1024px; inspect a promo card and the nearest trending card; headline/supporting/offer-label class lists and computed font sizes are identical (per `quickstart.md` Scenario 1).

### Implementation for User Story 1

All edits are inside `renderPromoCard` in `js/components/RestaurantCard.js` (sequential — same file, same function; do NOT parallelize). Only the `text-*` size utilities are changed — colors, transforms, and CTA styling are out of scope per `contracts/typography-contract.md`.

- [x] T004 [US1] Align headline token in `renderPromoCard` in `js/components/RestaurantCard.js`: replace the venue-title `h3` size utilities `text-xl sm:text-2xl` with the trending headline token `text-base sm:text-lg md:text-2xl` (keep `font-headline ... font-bold leading-snug truncate` and `title` attribute)
- [x] T005 [US1] Align supporting rows in `renderPromoCard` in `js/components/RestaurantCard.js`: change location, price, and cuisine rows from `text-xs sm:text-sm` to `text-xs` (labels and values), and keep row icons at `text-sm` to match `renderTrendingCard` icon sizing (depends on T004)
- [x] T006 [US1] Align offer banner label in `renderPromoCard` in `js/components/RestaurantCard.js`: change the gold-banner span from `text-xs sm:text-sm` to the `renderPromoTag` in-content token `text-[11px] sm:text-xs` (keep `font-label font-extrabold uppercase`, `line-clamp-2`, `title`) (depends on T005)
- [x] T007 [US1] Confirm CTA (BOOK NOW) label in `renderPromoCard` in `js/components/RestaurantCard.js` is left untouched (`text-xs sm:text-sm` — out of parity scope per contracts/typography-contract.md) (depends on T006)
- [x] T008 [US1] Run `npm run build:css` and `node --check js/components/RestaurantCard.js`; confirm `git diff --stat css/styles.css` shows no new utility classes (depends on T004–T007)
- [x] T009 [US1] Execute `specs/006-sync-promo-font-size/quickstart.md` Scenario 1: verify 0px difference for headline/supporting/offer-label at 320px and ≥1024px, in EN and MM (depends on T008)

**Checkpoint**: User Story 1 fully functional and independently verifiable — MVP reached.

---

## Phase 4: User Story 2 — Maintain Consistent Visual Hierarchy (Priority: P2)

**Goal**: After alignment, the relative hierarchy (headline > supporting > offer-label) is identical across both card types at every supported breakpoint, with no inverted steps.

**Independent Test**: Inspect one promo card and one trending card; headline/subtitle/label size ratios are equal across both cards (per spec.md User Story 2 acceptance scenarios).

### Implementation for User Story 2

- [x] T010 [US2] Verify hierarchy ratios in `js/components/RestaurantCard.js`: computed sizes at 320px must satisfy promo headline (16px) > supporting (12px) > offer-label (11px), matching the trending card's identical ladder; if any step is inverted, correct the offending token in `renderPromoCard` only (depends on T009)
- [x] T011 [US2] Verify hierarchy at `lg` (≥1024px): promo headline (24px) > supporting (12px) > offer-label (14px) matches trending card; confirm no `sm:text-sm` regression was reintroduced in shared roles (depends on T010)

**Checkpoint**: User Stories 1 AND 2 both verified — parity and hierarchy hold.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final validation and hygiene.

- [ ] T012 [P] Run the full `specs/006-sync-promo-font-size/quickstart.md` validation (Scenarios 1–3) and record pass/fail for each scenario
- [ ] T013 Confirm no horizontal overflow at 320px and no clipped labels (Constitution I) after the token changes; visually check long English and Burmese venue names truncate with ellipsis
- [x] T014 Confirm the promo card's distinct identity is preserved (cream `#FFF8F6` surface, gold banner, red BOOK NOW CTA unchanged) per spec.md Assumptions and Constitution III

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — BLOCKS user stories
- **US1 (Phase 3)**: Depends on Phase 2; tasks T004→T009 are strictly sequential (single file/function)
- **US2 (Phase 4)**: Depends on US1 completion (T009) — hierarchy is only meaningful after parity
- **Polish (Phase 5)**: Depends on all user stories complete

### User Story Dependencies

- **User Story 1 (P1)**: Independent — delivers full parity value on its own (MVP)
- **User Story 2 (P2)**: Verification-only follow-on to US1; cannot start before T009

### Parallel Opportunities

- T012 is the only [P] task (documentation/validation, different files)
- All US1 implementation tasks share one file — intentionally sequential to avoid edit conflicts

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 + Phase 2 (baseline + class verification)
2. Complete Phase 3 (US1: token alignment + build + manual validation)
3. **STOP and VALIDATE** via `quickstart.md` Scenario 1 — parity achieved
4. US2 (Phase 4) is a verification pass that rides on the US1 result

### Notes

- Do NOT modify `renderTrendingCard` — it is the source of truth (spec.md Assumptions)
- Do NOT introduce new Tailwind classes (Constitution II)
- All shared-role tokens remain ≥11px on mobile (Constitution V)
- Commit after each checkpoint (Setup, US1, US2, Polish)
