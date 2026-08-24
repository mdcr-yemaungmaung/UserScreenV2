# UI Contract: Overview Description Block

**Feature**: `004-shop-detail-description` | **Date**: 2026-08-24

Contract for the description block emitted inside the Shop Detail (U-03)
Overview tab. The screen's render function is the sole producer; this document
fixes the observable DOM/visual behavior that validation (quickstart) checks.

## Inputs

| Input | Source | Notes |
|-------|--------|-------|
| Shop record | `restaurant` object passed to `renderRestaurantDetailView()` | `description` (EN, existing), `descriptionMM` (optional) |
| Active language | `state.currentLanguage` (`'EN'` \| `'MM'`) | Already computed as `isMm` in the renderer |

## Output Contract

### Structure

```text
<TAB CONTENT 1: OVERVIEW>
  [description-block]          <- NEW; first child when text exists
    label: "About This Shop" / MM equivalent
    paragraph: resolved description text
  [facilities-section]         <- unchanged
  [atmosphere-gallery]         <- unchanged
  [location-map]               <- unchanged
```

### Behavioral Rules

1. **Presence**: block rendered iff at least one of `description`,
   `descriptionMM` is non-empty.
2. **Text resolution**: MM mode shows `descriptionMM || description`; EN mode
   shows `description`. Never blank.
3. **Ordering**: block always precedes Facilities when present.
4. **Reactivity**: language toggle re-renders block with the other language
   without page reload (SC-004).
5. **Typography/visuals**: label uses the screen's uppercase small-label style
   (`font-label`, ~10px bold, muted color); body uses readable body style
   (`font-body`, >=12px desktop / >=11px mobile), standard surface tokens;
   no new card background/radius beyond design-system standards
   (Constitution III).
6. **Layout safety**: single-column flow; wraps at 320px; no horizontal scroll;
   long text renders fully (no clamp).

## Failure Modes

| Condition | Expected behavior |
|-----------|-------------------|
| No description data | Block omitted entirely; siblings unaffected |
| MM selected, no `descriptionMM` | English text shown (fallback) |
| Extremely long text | Full wrap, page grows vertically |

## Out of Scope

- Editing descriptions from U-03 (owner editing remains on S-05)
- Character limits or truncation interactions
- Per-language SEO/meta concerns (static mockup)
