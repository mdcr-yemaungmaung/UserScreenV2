<!--
Sync Impact Report
- Version: 0.0.0 -> 1.0.0 (initial ratification, MAJOR: first constitution)
- Added: Core Principles I–VI, Governance
- Removed: none
- Deferred: none
-->

# Yoyaku User Screen Constitution

## Core Principles

### I. Mobile-First, Breakpoint Discipline
Layout MUST target 320–1024px. The single responsive breakpoint is `lg` (1024px):
tablets (768–1023px) behave like mobile (bottom nav visible + MyPage shows the
menu overview first). No feature may introduce horizontal scroll or clip content
at 320px width.

### II. Compiled-Tailwind Discipline (NON-NEGOTIABLE)
All styles are compiled from JS template literals via `npm run build:css`
(Tailwind v4 CLI). Any new or changed class name MUST be followed by
`npm run build:css`, or the style silently does not exist. Do NOT hand-edit
`css/styles.css`; never commit `node_modules`.

### III. Design-System Card Standard
Content cards MUST use the shared renderer `renderTrendingCard()` and the standard
token set: `bg-[#FFF9EE] border border-[#EADFD1] rounded-3xl shadow-sm
hover:shadow-xl transition-all duration-300 hover:-translate-y-1`. Do not introduce
ad-hoc card backgrounds or radii (e.g. `#FFF8F6` / `rounded-xl`) without explicit
justification.

### IV. Prototype Fidelity over Production Hardening
This is a UI mockup. Use in-JS mock data; no backend, no auth, no real persistence.
Prefer simplicity and visual fidelity over engineering robustness. Avoid frameworks
and build tooling beyond the Tailwind CLI plus a Vercel static deploy.

### V. Localization & Readability
UI MUST support English and Burmese (MM). Text MUST remain legible at a minimum of
11px on mobile. CTAs MUST NOT overflow on long Burmese strings; stack vertically
(`flex-col`) when needed.

### VI. Repo Hygiene
`node_modules/` and `.vercel/` MUST stay git-ignored. The Vercel build uses
`installCommand: npm install && chmod +x node_modules/.bin/*`. Never commit
`node_modules` or rely on committed binaries.

## Governance
The constitution supersedes ad-hoc practice. Amendments require a semantic-version
bump and a Sync Impact note (old -> new version, modified/added/removed sections,
deferred TODOs). All new UI work SHOULD align with the card standard and breakpoint
rules above; deviations MUST be justified in the feature spec.

**Version**: 1.0.0 | **Ratified**: 2026-08-23 | **Last Amended**: 2026-08-23
