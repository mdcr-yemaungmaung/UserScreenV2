# Quickstart: Shop Detail Description under Overview

**Feature**: `004-shop-detail-description` | **Date**: 2026-08-24

Validation guide proving the description block works end-to-end in the mockup.
References: [contract](./contracts/description-block-contract.md),
[data model](./data-model.md).

## Prerequisites

- Node.js installed (project uses `npm`)
- Repo root: `D:\EzBookNow\docs\06_mockup\user-yoyaku`

## Setup & Run

```powershell
npm install          # first time only
npm start            # serves the static mockup (server.js)
```

Open the served local URL in a browser at **320px-wide viewport** (device
toolbar) and desktop widths.

## Validation Scenarios

### V1. Description appears under Overview (P1, FR-001/002)

1. From Home (U-01) tap any trending venue to open Shop Detail (U-03).
2. Confirm the Overview tab is active.
3. **Expected**: an "About This Shop" labeled paragraph appears as the FIRST
   content block of the Overview tab, above Facilities & Amenities. Text
   matches that shop's `description` in `js/data/restaurants.js`.

### V2. Language switch EN -> MM (FR-003, SC-004)

1. On U-03 Overview with description visible, toggle language to MM.
2. **Expected**: view re-renders without reload; if the shop has no Burmese
   description yet, the English text remains (fallback) - never blank.

### V3. Missing description handled gracefully (FR-004, SC-003)

1. Temporarily remove `description` from one shop record (mock-data edit).
2. Open that shop's detail, Overview tab.
3. **Expected**: no empty gap or broken placeholder where the block would be;
   Facilities/Gallery/Location render unchanged. Restore the field afterwards.

### V4. Mobile layout safety (Constitution I/V, SC-003)

1. At 320px viewport, open U-03 Overview with description visible.
2. **Expected**: no horizontal scroll; paragraph wraps naturally; label and
   body text legible (>=11px); long pasted text renders fully (no clamp,
   page grows vertically only).

### V5. Styles compiled (Constitution II)

1. After any screen edit introducing new class names, run:

```powershell
npm run build:css
```

2. Reload and confirm the block's styling is applied (not unstyled HTML).

## Definition of Done

All five scenarios pass visually on mobile (320px) and desktop widths; spec
success criteria SC-001..SC-004 are each observable via V1-V4.
