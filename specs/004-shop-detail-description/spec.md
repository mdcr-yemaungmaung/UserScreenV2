# Feature Specification: Shop Detail Description under Overview

**Feature Branch**: `004-shop-detail-description`

**Created**: 2026-08-24

**Status**: Draft

**Input**: User description: "in shop detail, add description under overview."

## Clarifications

### Session 2026-08-24

- Q: Where exactly inside the Overview tab should the shop description appear? → A: First content block at the top of the Overview tab, above Facilities & Amenities.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Read Shop Introduction in Overview Tab (Priority: P1)

A customer browsing the Shop Detail screen opens the Overview tab and reads a
short introductory paragraph describing the restaurant (its story, atmosphere,
and dining style). The description appears directly under the Overview tab's
existing content area, giving customers context about the shop before they
decide to book.

**Why this priority**: The description is the primary narrative content that
helps a customer decide whether the shop matches their occasion. Without it,
the Overview tab only lists facilities, photos, and location — factual but not
persuasive.

**Independent Test**: Open any shop's detail screen, select the Overview tab,
and confirm the shop introduction text is visible below the tab content header.
Delivers immediate storytelling value with no dependency on other new features.

**Acceptance Scenarios**:

1. **Given** a customer is on the Shop Detail screen of a shop that has a
   description, **When** the Overview tab is active, **Then** the description
   paragraph is displayed within the Overview tab content, positioned after the
   tab heading and before/above the Facilities section or as the first content
   block of the overview ("under overview").
2. **Given** the app language is set to English, **When** the Overview tab is
   shown, **Then** the English description text is displayed.
3. **Given** the app language is set to Burmese (MM) and the shop has a
   Burmese description available, **When** the Overview tab is shown, **Then**
   the Burmese description text is displayed.

---

### User Story 2 - Graceful Handling When Description Is Missing (Priority: P2)

A customer views the Shop Detail screen of a shop that has no description
recorded. The Overview tab renders normally without an empty gap, broken
placeholder, or error — the section is simply omitted or a subtle fallback is
shown.

**Why this priority**: Protects visual quality for shops with incomplete data;
secondary because all current mock shops have descriptions populated.

**Independent Test**: Load a shop record with no description and verify the
Overview tab shows no empty description block and no layout breakage.

**Acceptance Scenarios**:

1. **Given** a shop has no description data, **When** the customer opens the
   Overview tab, **Then** no description block (or only an unobtrusive fallback
   line such as "No introduction yet") is rendered and surrounding sections are
   unaffected.
2. **Given** a shop has only an English description while the app is in MM
   mode, **When** the Overview tab is shown, **Then** the English description
   is displayed as fallback instead of blank space.

---

### Edge Cases

- What happens when the description text is very long (multi-paragraph)?
  The text must wrap naturally; the page must not introduce horizontal scroll
  at 320px width (constitution: Mobile-First discipline).
- What happens when the description contains special characters or mixed
  English/Burmese scripts? Text must render legibly at minimum 11px on mobile.
- What happens when switching language while viewing the Overview tab? The
  description must switch to the corresponding language version immediately.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Shop Detail Overview tab MUST display the shop's description
  as a readable introductory text block.
- **FR-002**: The description block MUST be positioned inside the Overview tab
  content area, appearing before the Facilities & Amenities icons section.
- **FR-003**: The system MUST display the description matching the currently
  selected language (English or Burmese), falling back to the other language's
  description when the selected language's version is unavailable.
- **FR-004**: The system MUST omit the description block gracefully (without
  errors or empty gaps) when no description exists for the shop.
- **FR-005**: The description text MUST remain legible per the localization
  standard (minimum 11px on mobile) and must support both English and Burmese
  script rendering.
- **FR-006**: The description block MUST follow the existing design-system card
  / typography conventions used elsewhere on the Shop Detail screen.

### Key Entities *(include if feature involves data)*

- **Shop (Restaurant)**: Already contains a description attribute (an English
  narrative paragraph); this feature surfaces it on the Overview tab. No new
  entities are introduced.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A customer can locate and read the shop description on the
  Overview tab within 5 seconds of opening the Shop Detail screen.
- **SC-002**: 100% of shops with description data display their description in
  the Overview tab.
- **SC-003**: Shops without description data display the Overview tab with no
  visual defects (no empty blocks, no overflow, no horizontal scroll at 320px).
- **SC-004**: Language toggle between English and Burmese updates the displayed
  description immediately with no reload required.

## Assumptions

- Each shop's description already exists as mock data on the shop record
  (single English paragraph today); Burmese descriptions may be added to mock
  data if needed for the MM view.
- "Under overview" is confirmed as: the description appears as the first
  content block at the top of the Overview tab, above the Facilities section.
- This is a UI-mockup change only; no backend, persistence, or owner-editing
  flow changes are required (owner editing of descriptions already exists on
  S-05).
- No character limit is enforced in v1; long descriptions render in full with
  natural wrapping (no collapse/"read more" interaction), consistent with the
  prototype's visual-fidelity-first approach.
