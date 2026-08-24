# Feature Specification: Hot Promotions Section Highlights Promotion Shops

**Feature Branch**: `005-hot-promotions-highlight`

**Created**: 2026-08-24

**Status**: Draft

**Input**: User description: "in hot promotion section, that section is emphasize to show which shop are have promotion."

## Clarifications

### Session 2026-08-24

- Q: Should the Hot Promotions section show only shops that have promotions, or keep showing all shops with promotion shops emphasized first? → A: Only shops with active promotions appear in Hot Promotions; no-promotion shops are excluded.
- Q: How strongly should the promotion be emphasized on each card in the section? → A: Fully custom promotional card style reserved for this section.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See Only Shops With Active Promotions in Hot Promotions (Priority: P1)

A customer on the Home screen scrolls to the "Hot Promotions" section. The
section displays ONLY shops that currently have an active promotion (an offer
such as "20% OFF" or a complimentary item). Shops without any active promotion
do not appear in this section. Each listed shop's promotion is clearly visible
on its card, so the customer can tell at a glance which shops are running
deals.

**Why this priority**: The section's entire purpose is promotional discovery.
If it shows non-promotional shops (as today), customers cannot distinguish
deal-having shops from regular listings and the section fails its business
goal of driving promotion-driven bookings.

**Independent Test**: Open Home, scroll to Hot Promotions, and verify every
card shown carries a visible promotion offer and no card without an offer
appears. Delivers the core promotional-discovery value standalone.

**Acceptance Scenarios**:

1. **Given** the Home screen is displayed, **When** the customer views the Hot
   Promotions section, **Then** every shop card in the section shows a visible
   promotion offer label (e.g., "20% OFF", "Complimentary Tiramisu").
2. **Given** a shop has no active promotion recorded, **When** the Hot
   Promotions section renders, **Then** that shop is not included in the
   section.
3. **Given** at least one shop has an active promotion, **When** the section
   renders, **Then** the section is displayed with its heading; given NO shop
   has any active promotion, **When** the section would render, **Then** the
   section is hidden entirely rather than showing an empty shell.

---

### User Story 2 - Promotion Is Visually Emphasized on Cards (Priority: P2)

Within the Hot Promotions section, each shop is presented with a dedicated
promotional card style used only in this section — visually distinct from the
standard venue cards elsewhere on Home. The promotion offer stands out as the
card's focal element, so a customer scanning the row can identify the deal for
each shop without opening the shop detail page.

**Why this priority**: Amplifies Story 1's discovery value, but a functional
filter alone already satisfies the core requirement; visual emphasis is a
quality increment.

**Independent Test**: View the Hot Promotions cards and confirm they use a
distinct promotional style (clearly different from Trending Venues cards) and
the promotion label is readable at a glance on mobile width without
interaction.

**Acceptance Scenarios**:

1. **Given** a Hot Promotions card is displayed on a 320px-wide screen,
   **When** the customer views it, **Then** the promotion label is legible
   (minimum 11px) and not truncated to unreadability.
2. **Given** both English and Burmese modes, **When** a promotion label is
   rendered, **Then** the label text remains fully visible without overflowing
   the card or causing horizontal scroll.
3. **Given** Hot Promotions cards and Trending Venues cards are viewed side by
   side, **When** compared, **Then** the promotional cards are visually
   distinct as a dedicated style while remaining consistent with the overall
   design language.

---

### Edge Cases

- What happens when a shop has an empty or blank promotion value? It must be
  treated as "no promotion" and excluded from the section.
- What happens when more shops have promotions than fit the grid/scroll row?
  The existing horizontal scroll (mobile) / grid layout (desktop) accommodates
  all qualifying shops; none are silently dropped.
- What happens when the promotion text is very long (e.g., "10% OFF Bill for
  Group Reservations")? The label wraps or truncates gracefully per existing
  card behavior without breaking layout.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Hot Promotions section MUST display only shops that have an
  active promotion (a non-empty promotion offer).
- **FR-002**: A shop with an empty, blank, or missing promotion MUST be
  treated as having no promotion and excluded from the section.
- **FR-003**: Every card in the Hot Promotions section MUST visibly display
  that shop's promotion offer label.
- **FR-004**: The promotion offer label MUST remain legible at minimum 11px
  and must support English and Burmese UI languages without overflow.
- **FR-005**: If no shop has an active promotion, the system MUST hide the Hot
  Promotions section entirely (heading included) instead of rendering an empty
  section.
- **FR-006**: The section MUST NOT duplicate shop entries; each qualifying
  shop appears exactly once.
- **FR-007**: Tapping a promotion card MUST navigate to that shop's detail
  page, consistent with other venue cards on Home.
- **FR-008**: Cards in the Hot Promotions section MUST use a dedicated
  promotional card style reserved for this section — visually distinct from
  the standard venue cards used elsewhere on Home — while remaining consistent
  with the overall design language (colors, typography, radii family).

### Key Entities *(include if data involved)*

- **Shop (Restaurant)**: already carries a promotion offer attribute (offer
  tag text, e.g., "20% OFF"); this feature uses its presence/absence as the
  qualification rule for inclusion in the Hot Promotions section. No new
  entities.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of shops displayed in the Hot Promotions section have a
  visible, non-empty promotion label.
- **SC-002**: 0% of shops without promotions appear in the section.
- **SC-003**: A customer can identify each listed shop's promotion within 3
  seconds of the section scrolling into view on a mobile viewport.
- **SC-004**: The section renders with no horizontal scroll or clipped labels
  at 320px width, in both EN and MM modes.

## Assumptions

- A shop "has a promotion" when its promotion offer attribute exists and is a
  non-empty string; there is no separate start/end date scheduling in the
  current mock data model, so no time-window logic applies in v1.
- The current mock dataset gives nearly every shop an offer; to demonstrate
  the filter visibly, at least one mock shop may be left without a promotion
  so it drops out of the section.
- Card appearance inside the section uses a fully custom promotional card
  style reserved for this section (Clarification Q2), distinct from standard
  venue cards. Justified deviation from the shared-card standard: this
  section's business purpose is promotional emphasis, which a generic card
  cannot deliver; the custom style must still respect the overall design
  language and mobile-first constraints.
- Out of scope: promotion scheduling/expiry, click-through promo banners above
  the grid, and a dedicated promotions listing page.
