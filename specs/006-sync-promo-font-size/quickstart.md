# Quickstart: Typography Parity Validation

**Phase**: 1 (Design & Contracts) | **Date**: 2026-08-24 | **Spec**: [spec.md](./spec.md) | **Contract**: [contracts/typography-contract.md](./contracts/typography-contract.md) | **Data**: [data-model.md](./data-model.md)

## Purpose

Prove end-to-end that the Hot Promotions card (`renderPromoCard`) uses the **exact same font-size token** as the Trending Venues card (`renderTrendingCard`) for every shared text role, at 320px and ≥1024px, in EN and MM — with 0px difference (FR-001, FR-002, FR-004).

## Prerequisites

- Node 20+ with the repo's `node_modules` installed (`npm install`).
- A Chromium-based browser (Chrome/Edge) with DevTools.

## Setup

```bash
npm install          # once
npm run dev          # starts Express static server (typically http://localhost:3000)
```

## Validation scenarios

### Scenario 1 — Font-size parity inspection (manual, definitive)

1. Open Home at **320px width** (`Ctrl+Shift+M` → 320px). Language = EN.
2. Open DevTools → Elements. Find a Trending Venues headline (`h3` with class containing `text-base sm:text-lg md:text-2xl`).
3. Record computed `font-size` and the full Tailwind class list.
4. Find the nearest Hot Promotions headline. Confirm its class list is **identical** (`text-base sm:text-lg md:text-2xl font-bold`), and its computed `font-size` is **0px difference**.
5. Repeat steps 2–4 for: supporting text (Location/Price → both `text-xs`), offer-label (both `text-[11px] sm:text-xs`).
6. Reload, switch to **Burmese (MM)** in the app language toggle, and repeat.
7. Resize to **≥1024px (lg)**, repeat for both locales.

**Expected outcome**: every comparison is an exact match (0px); no supporting text < 11px on mobile.

### Scenario 2 — Build gate (Constitution II)

```bash
npm run build:css          # tailwind -i ./tailwind.input.css -o ./css/styles.css --minify
git diff --stat css/styles.css   # should be empty or near-empty: no NEW utility classes introduced
```

**Expected outcome**: `css/styles.css` contains no new `.text-*` utilities beyond what existed; build succeeds with no warnings about unknown classes.

### Scenario 3 — Visual regression (quick, non-exhaustive)

1. Open Home, scroll so a Hot Promotions card and a Trending Venues card are both visible.
2. Visually confirm the headline appears the same physical size in both, and the supporting/label text reads as one consistent scale.
3. Confirm no horizontal overflow at 320px (Constitution I) and that the promo card's distinct background/banner/CTA remain (only font size changed, not identity).

## What this does NOT validate

- Exact px values are approximated from Tailwind's scale; Scenario 1's class-list comparison is the source of truth, not raw px rounding.
- No automated test suite exists (prototype fidelity, Constitution IV); validation is inspector-based.

See [contracts/typography-contract.md](./contracts/typography-contract.md) for the authoritative class mapping, and [data-model.md](./data-model.md) for the text-role → token table.
