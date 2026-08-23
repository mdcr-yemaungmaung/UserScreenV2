# Mobile UI Audit Report — Yoyaku User Screen

**Project:** EzBookNow user-yoyaku prototype
**Deployed:** https://yoyakuuserscreen.vercel.app/
**Audit date:** 2026-08-22
**Scope:** Mobile (320–767px) and tablet (768–1023px) layouts, all screens U-01 ~ U-20
**Purpose:** Reference document for future mobile UI fixes. Check off items as they are fixed.

> ⚠️ **Maintenance rule (added 2026-08-22):** Tailwind classes in this project are compiled from JS template literals via `npm run build:css`. After adding/changing ANY class names, run `npm run build:css` or the styles will silently not exist.

---

## 1. Issues Fixed (this session)

| # | Issue | Location | Fix Applied |
|---|-------|----------|-------------|
| F0 | **ROOT CAUSE of "cards not fitting on mobile"**: compiled `css/styles.css` was a stale Tailwind v4 build missing **95 utilities** used in JS — all card/banner sizing (`w-[240px]`, `h-[370px]`, `sm:w-[280px]`, `w-[calc(88vw-24px)]`, `snap-start`), several colors (`bg-[#FFF3D6]`, uppercase-hex variants like `text-[#840F16]`), shadows, and more. Cards/banners had no width/height → collapsed or misfit. | `css/styles.css` | Rebuilt with Tailwind CLI v4.3.3 (same version). Added `tailwind.input.css` (`@source ./js` + `./index.html`), installed `tailwindcss` + `@tailwindcss/cli` as devDependencies, added `npm run build:css`. Backup at `css/styles.css.bak`. Also removed invalid `data-[#840f16]` attribute in `InfoModals.js:212`. |
| F1 | `sm:hidden` utility missing from compiled Tailwind → status badge + icon both visible on desktop | `css/overrides.css` (added) | Added `@media (min-width:640px) .sm\:hidden { display:none !important }` (now also native in rebuilt CSS) |
| F2 | Hot Promotions cards: wrapper `w-[320px] h-[370px]` conflicted with inner card `w-[240px]/[280px] h-[380px]` → 80px dead gap + clipped bottom at sm | `js/screens/u01-home.js` (~L494) | Removed wrapper; cards render directly in `.mobile-horizontal-scroll` container |
| F3 | Trending Venues inline card was a duplicate of `renderTrendingCard` → drift risk | `js/screens/u01-home.js` (~L475) | Replaced ~55 inline lines with `renderTrendingCard(r, state, {showVenueName:true})` |
| F4 | MyPage showed Reservation History first on mobile/tablet instead of menu overview | `js/state.js` (`setActiveTab`) | On `setActiveTab('mypage')`, if `innerWidth < 1024` → reset `myPageActiveMenu = 'menu'` |
| F5 | Header profile dropdown forced `'reservations'` menu on mobile, overriding F4 | `js/components/TopNavBar.js:296-300` | Only force `'reservations'` when `innerWidth >= 1024` |
| F6 | Reservation history card colors inconsistent with trending card style | `js/screens/u08-mypage.js:156` | Unified to `bg-[#FFF9EE] border-[#EADFD1] shadow-sm hover:shadow-xl` |

---

## 2. Open Issues

### 🔴 Critical

#### O1. Breakpoint mismatch: bottom nav vs MyPage mobile logic — ✅ FIXED 2026-08-22
- **Where:** `js/components/BottomNavBar.js:31` used `md:hidden` (hides ≥768px); `js/state.js:453` and MyPage logic use `<1024`.
- **Fix applied:** Aligned everything to the `lg` (1024px) breakpoint — bottom nav now `lg:hidden`, main container padding now `pb-20 lg:pb-0`. Added missing `lg:pb-0` utility to `css/overrides.css`. Tablets (768–1023px) now keep the bottom nav and show the MyPage menu overview, consistent with JS logic.

#### O2. `isMobile` checked only at render time — not reactive — ✅ FIXED 2026-08-22
- **Where:** `js/state.js:453` (`window.innerWidth < 1024`) and any render-time width checks.
- **Fix applied:** Added a debounced (150ms) `resize` listener in `main.js` → `startApp()`. When the viewport crosses the 1024px boundary it re-renders; if crossing to mobile while on My Page, it also resets to the menu overview (same behavior as tab navigation). Covers device rotation and window resizing.

### 🟡 Medium

#### O3. MyPage modals lack scroll containment — ✅ FIXED 2026-08-22
- **Where:** `js/screens/u08-mypage.js` — QR Pass modal (~L913), Review modal (~L961), OTP modal (~L1018), Withdraw confirm (~L1081).
- **Fix applied:** Added `max-h-[90vh] overflow-y-auto` to all 4 modal panels. Also added missing `max-h-[90vh]` utility to `css/overrides.css` (wasn't in compiled Tailwind). Matches the pattern already used in `InfoModals.js`.

#### O4. Tiny font sizes below readability threshold — ✅ FIXED 2026-08-22 (mobile-only bump)
- **Where:** 87 occurrences of `text-[10px]` / `text-[11px]` across all screens.
- **Fix applied:** Added mobile-only CSS override in `css/overrides.css`: on screens <768px, `.text-\[10px\]` renders at 11px. Desktop/tablet unchanged to avoid layout regressions. Chosen over per-element edits (87 spots = high regression risk).
- **Remaining:** `text-[11px]` items stay at 11px (borderline acceptable). If specific labels still feel small after testing, bump individually to `text-xs`.

#### O5. Promo banner CTA buttons risk overflow (Burmese text) — ✅ FIXED 2026-08-22
- **Where:** `u01-home.js:334,354` — promo banners with `whitespace-nowrap shrink-0` CTA buttons.
- **Fix applied:** Both banners now stack vertically on mobile (`flex-col sm:flex-row items-start sm:items-center`), so the CTA sits below the text at full available width instead of squeezing the Burmese headline. Row layout restored from `sm:` up.

#### O6. Card style inconsistencies (design debt)
| Element | Location | Current | Standard should be |
|---|---|---|---|
| MyPage Favorites panel card | `u08-mypage.js:309` | `bg-[#FFF8F6] rounded-xl` | `bg-[#FFF9EE] border-[#EADFD1] rounded-3xl` |
| Waitlist queue item | `u08-mypage.js:396` | `bg-[#FFF8F6] rounded-xl` | same as above |
| Reservation history card radius | `u08-mypage.js:156` | `rounded-3xl` **overridden by** inline `style="border-radius:16px"` | Remove inline style, keep `rounded-3xl` |

### 🟢 Minor

#### O7. `renderTrendingCard` fixed heights can clip future content
- **Where:** `js/components/RestaurantCard.js:307` — `h-[370px] sm:h-[380px]`.
- **Note:** Currently safe because names are `line-clamp-1`. If content grows (extra row, longer MM venue names), bottom price row clips.
- **Fix suggestion:** Replace fixed heights with `min-h-[370px]` if clipping ever observed.

#### O8. Register screen modals not verified for scroll containment
- **Where:** `u11-register.js:342,409` (SSO terms modal, MAIL-01 modal).
- **Action:** Verify on small screen; add `max-h-[90vh] overflow-y-auto` if needed (same pattern as O3).

#### O9. Hero calendar popover near viewport edge
- **Where:** `u01-home.js` hero search date popover — `absolute bottom-full left-0 w-72 sm:w-80`.
- **Note:** 288px wide fits 320px viewport but sits flush-left; verify it doesn't clip against left edge when panel is inside padded container. Low priority.

---

## 3. Verified OK (no action needed)

- ✅ Search results grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, full-width cards
- ✅ Shop detail tab bar has `overflow-x-auto` for nowrap tabs (`u03-shop-detail.js:139`)
- ✅ Bottom nav padding: `pb-20 md:pb-0` on main container matches nav visibility (`main.js:94`)
- ✅ Reservation history badges/buttons wrap correctly on mobile (`flex-wrap`)
- ✅ InfoModals have proper `max-h` + `overflow-y-auto`
- ✅ Horizontal scroll sections handled by `.mobile-horizontal-scroll` CSS (flex-shrink-0 children)

---

## 4. Design System Reference (card standard)

```
Background:      bg-[#FFF9EE]
Border:          border border-[#EADFD1]
Radius:          rounded-3xl
Shadow:          shadow-sm hover:shadow-xl
Motion:          transition-all duration-300 hover:-translate-y-1
Shared renderer: js/components/RestaurantCard.js → renderTrendingCard()
```

Info card standard (current mixed values): `#FFF8F6` / `#FFF4E5` / `#FFF3D6` / `#FAF3E8` — unify if requested.

---

## 5. Verification Checklist (after fixes)

- [ ] Test at 320px, 360px, 375px, 414px, 768px, 800px, 1024px widths
- [ ] Rotate device (portrait ↔ landscape) while on My Page
- [ ] Open every modal (QR, review, OTP, withdraw, terms) on smallest test device
- [ ] Toggle EN ↔ MM language on Home promo banners and check button fit
- [ ] Confirm status badge (≥640px) vs icon (<640px) exclusivity
- [ ] Hot Promotions & Trending Venues cards align identically at all widths

---

## Appendix: `text-[10px]/[11px]` hotspots

Highest-density files: `u03-shop-detail.js` (11), `u08-mypage.js` (14), `RestaurantCard.js` (5), `u11-register.js` (8), booking flow U-04~07 step indicators (12), `u09-booking-detail.js` (8), `u20-accountsetting.js` (7).
