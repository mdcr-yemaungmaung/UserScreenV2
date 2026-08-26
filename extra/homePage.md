# Restaurant Booking PWA — Mobile Design Specification

## 1. Design Direction

**Product:** Restaurant discovery and table-booking PWA  
**Target:** Mobile-first, optimized for tall Android screens such as Honor 200 Lite  
**Visual direction:** Premium, warm, calm, modern, food-focused  
**Primary goal:** Make restaurant discovery feel effortless while keeping table booking immediately accessible.

The redesign intentionally moves away from the previous "form-heavy" hero. Users should see attractive restaurant imagery and useful content early, while booking controls remain compact.

---

## 2. Brand & Color System

The existing cream + maroon identity is retained, but maroon is used sparingly.

### Core colors

- **Background:** Warm ivory / cream — `#FBF4E8`
- **Surface:** Soft warm white — `#FFFDFC`
- **Primary text:** Deep espresso — `#241A18`
- **Secondary text:** Warm gray — `#6D6561`
- **Primary accent:** Soft burgundy / maroon — `#9B1C25`
- **Accent light:** Pale blush — `#F3DFD5`
- **Border:** Warm beige — `#E8DDD0`
- **Rating accent:** Muted gold — `#C69A2B`
- **Success / availability:** Soft green — `#607A62`

### Color rules

- Avoid large solid maroon backgrounds.
- Use maroon mainly for CTAs, selected states, icons, headings, and small labels.
- Keep most of the interface cream/ivory.
- Cards should feel light rather than heavily outlined.
- Avoid excessive gradients and saturated colors.

---

## 3. Typography

Use a clean modern sans-serif.

Recommended:
- Inter
- SF Pro / system sans
- Manrope

### Hierarchy

- Hero heading: 34–40px, weight 700–800
- Section heading: 24–30px, weight 700
- Card title: 16–18px, weight 650–700
- Body: 14–16px, weight 400–500
- Metadata: 13–14px
- CTA: 16–18px, weight 650–700

Use short line lengths and generous vertical spacing.

---

## 4. Mobile Layout

Design for approximately 360–430px wide screens.

### Safe areas

- Respect Android status-bar safe area.
- Respect bottom navigation safe area.
- Fixed bottom navigation should never cover content.

### Horizontal padding

Primary content padding:
- 20–24px

Full-width horizontal carousels may extend closer to the screen edge.

---

# 5. Header

The header should remain visually light.

### Left
Brand/location logo.

### Right
- Language selector: `EN`
- Notification bell with small count badge
- Circular profile avatar

### Style

- Cream background
- No heavy bottom border
- Controls use subtle borders and soft shadows
- Maroon only for active icons/badges

---

# 6. Hero Section

Replace the previous oversized booking form.

### Headline

**Great food.**  
**Good moments.**

The second line may use the burgundy accent.

### Supporting copy

> Discover the best restaurants and book your table in seconds.

### Hero image

Use a premium restaurant interior / dining image.

Image should:
- occupy the right or lower portion of the hero
- have rounded corners
- use a soft fade into the cream background where appropriate
- feel warm and photographic
- avoid overly dark imagery

---

# 7. Search

Place one prominent search field below the hero.

Placeholder:

**Search restaurants, cuisines or dishes...**

Include:
- Search icon
- Rounded corners
- White/warm-white surface
- Subtle border
- Comfortable touch height: ~56–64px

Do not show six separate filter fields in the initial hero.

---

# 8. Compact Booking Controls

Use a single compact booking row.

Example:

**Aug 26, 2026** | **6:30 PM** | **2 Guests** | **Filters**

Each item should be tappable.

The booking row should visually communicate the current search state without overwhelming the user.

---

# 9. Primary CTA

Button:

**Find Tables →**

Recommended:
- Height: 56–64px
- Rounded corners: 16–18px
- Burgundy background
- White text
- Simple table/chair icon if desired
- Arrow on the right

Do not place a heart/bookmark icon inside this CTA.

---

# 10. Explore by Cuisine

Section header:

**Explore by Cuisine**                         **View All →**

Use compact horizontal cards.

Suggested categories:
- Burmese
- Teahouse & Snacks
- Western
- Seafood

Each category:
- Small food image
- Cuisine name
- Venue count
- Rounded card
- Minimal border/shadow

Avoid excessive iconography.

---

# 11. Promotion Banner

Promotions should be visually secondary to restaurant discovery.

Example:

**EXCLUSIVE OFFER**

**20% Off Weekend Dining Pass with KBZPay**

Supporting copy:

> Apply code YOYAKUKBZ50K at checkout for instant table discount.

CTA:

**Claim Voucher**

### Style

- Warm cream/white card
- Food/dining image integrated on one side
- Burgundy used for small accents
- Avoid a large red promotional block
- Rounded corners
- Soft shadow

---

# 12. Trending Venues

Section:

**Trending Venues**                         **View All →**

Use horizontal restaurant cards.

Each card should contain:

### Image
Large restaurant photo with rounded top corners.

### Floating rating
Example:
`☆ 4.9`

### Favorite
Heart icon in a small white circular button.

Important:
- Use a **heart** for save/favorite.
- Do not use a bookmark icon.

### Details
- Restaurant name
- Cuisine
- Area
- Starting price
- Location icon

Example:

**Historic Pansodan Heritage**  
Burmese · Downtown Yangon  
**From 25,000 MMK**

---

# 13. Restaurant Card Style

Cards should feel premium but restrained.

- Background: `#FFFDFC`
- Border: subtle `#E8DDD0`
- Radius: 18–24px
- Shadow: very soft
- Image radius: 18–24px
- Avoid thick borders
- Avoid large maroon panels

The photography should do most of the visual work.

---

# 14. Hot Promotions

If a dedicated Hot Promotions section is retained, keep it below Trending Venues.

Heading:

**Hot Promotions** + small flame icon

Cards should show:
- Restaurant image
- Rating
- Heart favorite
- Promotion title
- Short description
- Availability
- Price range
- Cuisine
- **BOOK NOW →**

Do not use a separate "Info" row.

Do not use a large colored promotion background.

The BOOK NOW button should be the only strong visual CTA inside the card.

---

# 15. Curated Collections

Section:

**Curated Collections**

Use large image-led cards.

Example:

**DATE NIGHT**  
**Most Romantic Spots**

Supporting text:
> Intimate settings and breathtaking views.

Use a dark photographic overlay only where necessary for text readability.

Add:

**View All Collections →**

---

# 16. Bottom Navigation

Five items:

1. Explore
2. Search
3. Bookings
4. Favorites
5. Profile

### Active state

Use a very light blush/cream pill or rounded background.

Do not use a large maroon filled block.

### Favorites

Use a **heart icon**.

### Bookings

Calendar icon with small notification count when necessary.

Navigation should remain fixed at the bottom.

---

# 17. Iconography

Use one consistent outline icon family.

Recommended style:
- 2px stroke
- Rounded joins
- Minimal decorative detail

Primary icons:
- Search
- Location
- Calendar
- Clock
- Users
- Sliders
- Heart
- Bell
- Profile
- Arrow right
- Table/chair

Avoid mixing filled, outlined, and decorative icon styles.

---

# 18. Spacing

Use an 8px spacing system.

Common values:
- 8px — icon/text gap
- 12px — compact card spacing
- 16px — component spacing
- 20px — standard mobile padding
- 24px — section spacing
- 32px — major section separation
- 40px+ — hero breathing room

---

# 19. Interaction Principles

### Primary flow

1. Open app
2. See restaurant-focused hero
3. Search restaurant/cuisine/dish
4. Confirm date/time/guests
5. Find tables
6. Browse restaurant cards
7. Open restaurant
8. Book table

### Secondary flow

Explore → Cuisine → Restaurant → Book

Favorites → Saved restaurant → Book

Bookings → Upcoming reservation → Manage

---

# 20. UX Improvements From Previous Design

The redesign specifically addresses these problems:

- Six large filters no longer dominate the first screen.
- Restaurant imagery appears earlier.
- Search is more prominent.
- Booking controls are consolidated.
- Maroon is no longer used as the dominant color.
- Cards are lighter and less "spicy."
- Typography is cleaner and more modern.
- Heart is used consistently for favorites.
- Promotions are less visually aggressive.
- The interface has more whitespace.
- The experience feels like restaurant discovery first and a booking form second.

---

# 21. Recommended Home Screen Order

1. Header
2. Hero / restaurant image
3. Search
4. Compact booking controls
5. Find Tables CTA
6. Explore by Cuisine
7. Exclusive Offer
8. Trending Venues
9. Curated Collections
10. Hot Promotions
11. Bottom Navigation

---

# 22. Design Principle

**Food first. Booking second.**

The interface should make users want to explore restaurants before asking them to complete a booking form.

The overall feeling should be:

**Warm · Premium · Calm · Modern · Local · Food-focused**

Avoid:

**Loud · Overly red · Form-heavy · Cluttered · Excessively rounded · Over-decorated**
