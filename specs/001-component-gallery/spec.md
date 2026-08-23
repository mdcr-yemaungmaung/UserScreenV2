# Feature Specification: Component Gallery / Design System Screen

**Feature Branch**: `001-component-gallery`

**Created**: 2026-08-23

**Status**: Draft

**Input**: User description: "Add a component gallery / design system screen that renders every UI component for visual review"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Review all UI components in one place (Priority: P1)

As a designer/reviewer, I want a single screen that renders every reusable UI
component (colors, typography, buttons, cards, tags, forms, feedback, nav) so I
can visually audit consistency against the design system without hunting through
each screen.

**Why this priority**: This is the entire purpose of the feature; delivering it
independently satisfies the request.

**Independent Test**: Navigate to the Design System entry inside MyPage; confirm
all eight sections render with live components and the card section matches the
`bg-[#FFF9EE]` / `border-[#EADFD1]` / `rounded-3xl` standard.

**Acceptance Scenarios**:

1. **Given** the user opens MyPage and taps "Design System", **When** the menu
   item is selected, **Then** a gallery screen renders with sections: Colors,
   Typography, Buttons, Cards, Tags & Badges, Forms, Feedback, Navigation.
2. **Given** the Cards section, **When** it renders, **Then** it shows live
   `renderTrendingCard`, `renderRestaurantCard`, and `renderSearchResultCard`
   using real restaurants from `YoyakuData.RESTAURANTS_DATA`.
3. **Given** EN/MM language toggle, **When** switched to MM, **Then** all section
   headers and menu label render in Burmese.

---

### User Story 2 - Reach the gallery from MyPage (Priority: P2)

As a user, I want the Design System accessible from the MyPage menu so it is
discoverable but kept out of the primary booking flow.

**Why this priority**: Without an entry point the gallery is unreachable; MyPage
menu is the agreed location (not bottom nav / top nav).

**Independent Test**: From MyPage menu overview, the "Design System" item appears
and routes to the gallery panel.

**Acceptance Scenarios**:

1. **Given** the MyPage menu overview, **When** rendered, **Then** it includes a
   "Design System" / "ဒီဇိုင်း စနစ်" menu item with a `palette` icon.
2. **Given** the item is tapped, **When** the panel loads, **Then** it dispatches
   to the component gallery view (no full-page navigation, same MyPage shell).

---

### User Story 3 - Interact with sample feedback components (Priority: P3)

As a reviewer, I want to trigger the Toast and sample InfoModals from the gallery
so I can verify their look and motion.

**Why this priority**: Nice-to-have verification aid; not required to review static components.

**Independent Test**: Tap the "Show Toast" and "Open Info Modal" buttons; confirm
the toast appears and a modal opens.

**Acceptance Scenarios**:

1. **Given** the Feedback section, **When** "Show Toast" is tapped, **Then** a
   toast overlay appears.
2. **Given** the Feedback section, **When** "Open Terms Modal" is tapped, **Then**
   the Terms InfoModal opens.

---

### Edge Cases

- What happens at 320px width? Each section MUST wrap/stack without horizontal
  scroll (constitution Principle I).
- How are missing restaurants handled? Use `YoyakuData.RESTAURANTS_DATA` fallback
  to an empty array; sections render their headers with a "no data" note rather
  than throwing.
- How does the gallery behave on tablet (768–1023px)? Same as mobile (MyPage menu
  overview shown first); gallery panel uses the responsive grid.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST add a `design-system` entry to the MyPage `menuItems`
  array (EN + MM labels, `palette` icon).
- **FR-002**: System MUST render the gallery when `myPageActiveMenu ===
  'design-system'` by delegating to `window.YoyakuComponents.renderComponentGallery(state)`.
- **FR-003**: The gallery MUST include sections: Colors, Typography, Buttons,
  Cards, Tags & Badges, Forms, Feedback, Navigation.
- **FR-004**: The Cards section MUST render live `renderTrendingCard`,
  `renderRestaurantCard`, `renderSearchResultCard` using `YoyakuData.RESTAURANTS_DATA`.
- **FR-005**: The Buttons section MUST show `btn-primary`, a secondary/outline
  button, and the icon favorite button (with bounce animation).
- **FR-006**: The Tags & Badges section MUST show rating badge (± promo), cuisine
  tag (on/off image), promo tag, and reservation status badges.
- **FR-007**: The Forms section MUST show text/tel/email inputs and a textarea in
  the booking-input style.
- **FR-008**: The Feedback section MUST provide buttons that trigger a Toast and
  an InfoModal.
- **FR-009**: The Navigation section MUST show static TopNavBar and BottomNavBar
  previews.
- **FR-010**: After adding any new class names, the build MUST run
  `npm run build:css` (constitution Principle II).
- **FR-011**: The gallery MUST NOT appear in the bottom nav or top nav menus.

### Key Entities

- **Component Gallery View**: a render function `renderComponentGallery(state)`
  exposed on `window.YoyakuComponents`, returning an HTML string of all sections.
- **MyPage Menu Item**: `{ id: 'design-system', label, icon: 'palette' }`-style
  entry added to `menuItems` in `u08-mypage.js`.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Reviewer can see all 8 component categories on one screen without
  navigating away from MyPage.
- **SC-002**: No horizontal scroll at 320px, 375px, or 1024px widths.
- **SC-003**: Card section visually matches the design-system card standard
  (`bg-[#FFF9EE]`, `border-[#EADFD1]`, `rounded-3xl`).
- **SC-004**: EN and MM labels render correctly for the menu item and section headers.

## Assumptions

- The project is a vanilla-JS prototype; no framework/build step beyond Tailwind
  CLI + Vercel static deploy (constitution Principle IV).
- `window.YoyakuComponents` already exposes the component render functions used
  here (verified: RestaurantCard, badges, tags, TopNavBar, BottomNavBar, Toast,
  InfoModals, CalendarPicker).
- MyPage menu uses `myPageActiveMenu` dispatch via `renderActiveScreenPanel()`;
  adding an item there is the correct integration point (no `main.js` change).
- Design tokens (colors, fonts) are defined in `css/styles.css` / `css/fonts.css`
  and available to the gallery without new dependencies.
