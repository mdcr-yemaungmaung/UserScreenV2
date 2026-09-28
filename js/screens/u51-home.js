(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;
  const { RESTAURANTS_DATA, CUISINES_DATA, COLLECTIONS_DATA, DINING_OCCASIONS_DATA = [] } = window.YoyakuData;
  const { renderRestaurantCard, attachRestaurantCardEvents, renderImageGradient, renderFavoriteButton, renderRatingBadge, renderCuisineTagOnImage, renderCuisineTag, renderPromoTag, renderTrendingCard, renderPromoCard, hasPromoCardOffer } = window.YoyakuComponents;
  const { generateCalendarGrid } = window.YoyakuComponents;

  // ─── Hero Depth Background (crossfading venue slides + gold bokeh) ───────
  // Local assets only (offline-friendly); token veil per DESIGN.md Warm Ivory.
  const HERO_BG_IMAGES = [
    { src: 'assets/images/seeds.jpg', alt: 'Seeds Lakefront Dining' },
    { src: 'assets/images/lopera.jpg', alt: "L'Opera Trattoria" },
    { src: 'assets/images/padonmar.jpg', alt: 'Padonmar Gourmet Cuisine' },
    { src: 'assets/images/alchimiste.jpg', alt: "L'Alchimiste Fine Dining" },
    { src: 'assets/images/rangoon.jpg', alt: 'Rangoon Heritage Tea House' },
  ];

  // Rotating concierge prompts (EN / MM) shown inside the keyword input.
  const HERO_KEYWORD_PROMPTS = {
    EN: [
      "e.g. The Gilded Fork, Shan Noodle, Sushi...",
      "Try 'Lakefront sunset dinner'…",
      'Search Japanese omakase & sushi bars…',
      "Try 'Heritage teahouse & snacks'…",
      'Search rooftop dining & garden cafes…',
    ],
    MM: [
      'ဥပမာ- The Gilded Fork, ရှမ်းခေါက်ဆွဲ...',
      'ကန်စပ် နေဝင်ဆည်းဆာ ညစာ ရှာဖွေကြည့်ပါ...',
      'ဂျပန်အစားအစာ (အိုမာကာဆေ) ရှာဖွေပါ...',
      'ရိုးရာ လက်ဖက်ရည်ဆိုင် ရှာဖွေကြည့်ပါ...',
      'အမိုက်စား စားသောက်ဆိုင်များ ရှာဖွေပါ...',
    ],
  };

  // Standard reservation time slots offered in the When popover (4×2 grid).
  const HERO_TIME_SLOTS = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '21:00'];
  const DEFAULT_TIME = '18:30';

  // ─── Tonight's Open Tables (live availability strip) ─────────────────────
  // Mock remaining dinner slots per venue — mirrors shop_schedules leftovers.
  // Chips trigger the same instant-book modal as U-02 search result cards.
  const TONIGHT_SLOT_MAP = {
    'rest-1': ['17:30', '18:00', '19:30', '20:30'],
    'rest-2': ['17:00', '17:30', '18:30', '19:00', '20:00'],
    'rest-3': ['17:30', '18:00', '19:00', '19:30'],
    'rest-4': ['18:00', '18:30', '19:30', '20:00'],
    'rest-5': ['17:30', '18:30', '19:00', '20:30'],
    'rest-6': ['17:00', '17:30', '18:30', '19:30', '20:00'],
  };
  const TONIGHT_VENUE_ORDER = ['rest-2', 'rest-6', 'rest-1', 'rest-5', 'rest-4', 'rest-3'];

  // ─── Social proof ticker messages (EN / MM) ──────────────────────────────
  const SOCIAL_PROOF_TICKER = {
    EN: [
      'A table for 4 at Seeds Restaurant & Lounge was just reserved · 2 min ago',
      'Lakefront table for 2 booked at L’Opera · 6 min ago',
      'Omakase counter for 3 reserved at Gekko Tokyo Lounge · 11 min ago',
      'Garden table for 6 booked at The Heritage Teakwood Estate · 15 min ago',
      'Heritage dining room for 2 reserved at Rangoon Tea House · 19 min ago',
    ],
    MM: [
      'Seeds Restaurant & Lounge တွင် ၄ ဦးဝိုင်း စိုတ်ယူခံရပါသည် · ၂ မိနစ်အကြာ',
      'L’Opera တွင် ကန်ဘေး ၂ ဦးဝိုင်း စိုတ်ယူခံရပါသည် · ၆ မိနစ်အကြာ',
      'Gekko Tokyo Lounge တွင် အိုမာကာဆေ ၃ ဦးဝိုင်း စိုတ်ယူခံရပါသည် · ၁၁ မိနစ်အကြာ',
      'The Heritage Teakwood Estate တွင် ဥယျာဉ် ၆ ဦးဝိုင်း စိုတ်ယူခံရပါသည် · ၁၅ မိနစ်အကြာ',
      'Rangoon Tea House တွင် ၂ ဦးဝိုင်း စိုတ်ယူခံရပါသည် · ၁၉ မိနစ်အကြာ',
    ],
  };

  // "18:30" → "6:30PM" (compact display; stored value stays 24h)
  function formatTime12(hhmm) {
    const [h, m] = hhmm.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${String(m).padStart(2, '0')}${period}`;
  }

  function todayDisplayStr() {
    const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const t = new Date();
    return `${m[t.getMonth()]} ${t.getDate()}, ${t.getFullYear()}`;
  }

  function toOptionId(prefix, value) {
    const normalized = String(value || 'option')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    return `${prefix}-${normalized || 'option'}`;
  }

  // Friendly When-pill label: today → "Tonight", otherwise short date
  // without year ("Aug 28") — the 60-day booking window makes the year noise.
  function formatDateDisplay(dateStr, isMm) {
    if (!dateStr || dateStr === todayDisplayStr()) {
      return isMm ? 'ယနေ့' : 'Tonight';
    }
    return dateStr.split(',')[0] || dateStr;
  }

  // Hero FX lifecycle — cleared on every re-attach so timers/RAF never stack
  // across store-driven re-renders of the discover view.
  let heroFxCleanups = [];
  function registerHeroFxCleanup(fn) {
    heroFxCleanups.push(fn);
  }
  function runHeroFxCleanup() {
    heroFxCleanups.forEach((fn) => {
      try {
        fn();
      } catch (_e) {
        /* noop */
      }
    });
    heroFxCleanups = [];
  }
  const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;



  const HERO_LOCATIONS = [
    { value: 'All Areas', labelEn: 'All Locations', labelMm: 'နေရာဒေသ (အားလုံး)', icon: 'explore', sub: 'Across Yangon' },
    { value: 'Bahan Township', labelEn: 'Bahan', labelMm: 'ဗဟန်းမြို့နယ်', icon: 'pin_drop', sub: 'Golden Valley & Diplomatic' },
    { value: 'Dagon Township', labelEn: 'Dagon', labelMm: 'ဒဂုံမြို့နယ်', icon: 'pin_drop', sub: 'Heritage & Pagoda' },
    { value: 'Yangon Downtown', labelEn: 'Downtown', labelMm: 'မြို့ထဲ', icon: 'apartment', sub: 'Colonial & Heritage' },
    { value: 'Inya Lake Waterfront', labelEn: 'Inya Lake', labelMm: 'အင်းလျားကန်စပ်', icon: 'water', sub: 'Scenic Lakefront Dining' },
    { value: 'Ahlone Township', labelEn: 'Ahlone', labelMm: 'အလုံမြို့နယ်', icon: 'pin_drop', sub: 'Riverside Sanctuary' },
  ];

  const HERO_CUISINES = [
    { value: 'All Cuisines', labelEn: 'All Cuisines', labelMm: 'အစားအစာ (အားလုံး)', icon: 'restaurant_menu', sub: 'Any Culinary Genre' },
    { value: 'Burmese', labelEn: 'Burmese Traditional', labelMm: 'မြန်မာအစားအစာ', icon: 'rice_bowl', sub: 'Authentic Heritage Cuisine' },
    { value: 'Teahouse & Snacks', labelEn: 'Teahouse & Snacks', labelMm: 'လက်ဖက်ရည်ဆိုင်', icon: 'local_cafe', sub: 'Classic Yangon Culture' },
    { value: 'Japanese', labelEn: 'Japanese & Sushi', labelMm: 'ဂျပန်အစားအစာ', icon: 'ramen_dining', sub: 'Sushi, Ramen & Omakase' },
    { value: 'Casual Dining', labelEn: 'Casual Dining', labelMm: 'မိသားစု စားသောက်ဆိုင်', icon: 'local_dining', sub: 'Comfort & Family-Friendly' },
    { value: 'European', labelEn: 'European Fusion', labelMm: 'ဥရောပ ဟင်းလျာ', icon: 'wine_bar', sub: 'Modern Continental' },
    { value: 'French', labelEn: 'French Fine Dining', labelMm: 'ပြင်သစ် အဆင့်မြင့်', icon: 'dinner_dining', sub: 'Gourmet Gastronomy' },
  ];

  // ─── Social Proof Bar (trust stats + live booking ticker) ────────────────
  function renderSocialProofBar(isMm) {
    const avgRating = (
      RESTAURANTS_DATA.reduce((sum, r) => sum + (Number(r.rating) || 0), 0) / Math.max(RESTAURANTS_DATA.length, 1)
    ).toFixed(1);
    const venueCount = `${RESTAURANTS_DATA.length}+`;

    const stats = [
      { 
        icon: 'local_fire_department', 
        value: '340+', 
        label: isMm ? 'ယနေ့ဘွတ်ကင်' : 'Booked Today',
        labelFull: isMm ? 'ယနေ့ စားပွဲဘွတ်ကင်' : 'Tables Booked Today'
      },
      { 
        icon: 'star', 
        value: `${avgRating}`, 
        label: isMm ? 'ပျမ်းမျှရမှတ်' : 'Avg Rating',
        labelFull: isMm ? 'ဧည့်သည် ပျမ်းမျှရမှတ်' : 'Average Guest Rating'
      },
      { 
        icon: 'storefront', 
        value: venueCount, 
        label: isMm ? 'မိတ်ဖက်ဆိုင်များ' : 'Partner Venues',
        labelFull: isMm ? 'ရန်ကုန် မိတ်ဖက်ဆိုင်များ' : 'Partner Venues'
      },
    ];

    return `
      <div class="mt-3 sm:mt-4 pt-1" aria-label="${isMm ? 'ယုံကြည်မှု အချက်အလက်' : 'Trust and social proof'}">
        <!-- Stat cells (integrated luxury inline presentation) -->
        <div class="grid grid-cols-3 divide-x divide-[#E5D9CC]/75 py-1 max-w-2xl sm:max-w-3xl mx-auto">
          ${stats.map(s => `
            <div class="flex flex-col items-center justify-center gap-0.5 px-1 sm:px-2 text-center min-w-0">
              <span class="flex items-center gap-1 font-headline text-sm sm:text-lg font-extrabold text-[#840f16] leading-none">
                <span class="material-symbols-outlined text-xs sm:text-base text-[#C59B27] fill-1">${s.icon}</span>
                <span>${s.value}</span>
              </span>
              <span class="font-label text-[10px] sm:text-xs font-bold text-[#8A7B76] uppercase tracking-wide leading-tight whitespace-nowrap">${s.label}</span>
            </div>
          `).join('')}
        </div>

        <!-- Live booking ticker -->
        <div id="u01-proof-ticker" class="pt-1.5 text-center">
          <p class="inline-flex items-center justify-center gap-1.5 max-w-full font-body text-[11px] sm:text-xs text-[#68554F]">
            <span class="material-symbols-outlined text-sm text-[#9B1C25] shrink-0">bolt</span>
            <span
              id="proof-ticker-text"
              aria-live="polite"
              class="truncate"
            >${(isMm ? SOCIAL_PROOF_TICKER.MM : SOCIAL_PROOF_TICKER.EN)[0]}</span>
          </p>
        </div>
      </div>
    `;
  }

  // ─── Tonight's Open Tables card (compact venue + instant-book time chips) ─
  function renderTonightCard(restaurant, state) {
    const isFavorite = state.favorites.includes(restaurant.id);
    const isMm = state.currentLanguage === 'MM';
    const title = isMm ? (restaurant.nameMM || restaurant.name) : restaurant.name;
    const locationText = restaurant.location || restaurant.area || 'Yangon';
    const slots = TONIGHT_SLOT_MAP[restaurant.id] || [];

    return `
      <div
        data-card-select-id="${restaurant.id}"
        class="shrink-0 w-[280px] sm:w-[320px] lg:w-auto snap-start group relative bg-[#FFFDFC] border border-[#E8DDD0] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col text-left h-full"
      >
        <!-- Image Container with Overlays -->
        <div class="relative aspect-[16/9] min-h-[170px] sm:min-h-[190px] overflow-hidden">
          <img
            src="${restaurant.heroImage}"
            alt="${title}"
            referrerpolicy="no-referrer"
            loading="lazy"
            onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_35%,rgba(0,0,0,0.2)_60%,rgba(0,0,0,0.85)_100%)] pointer-events-none"></div>
          ${renderRatingBadge(restaurant)}
          ${renderFavoriteButton(restaurant.id, isFavorite)}

          <!-- Venue info over image -->
          <div class="absolute inset-x-0 bottom-0 z-10 px-4 pb-3.5 pt-10 sm:px-5 sm:pb-4">
            <h3 class="font-headline text-[1.15rem] sm:text-[1.25rem] font-extrabold text-white leading-tight truncate" title="${title}">
              ${title}
            </h3>
            <p class="mt-0.5 font-body text-[11px] sm:text-xs font-medium text-white/90 truncate" title="${locationText}">
              ${locationText}
            </p>
          </div>
        </div>

        <!-- Instant-book time chips -->
        <div class="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-[#FFFDFC] min-w-0">
          <div class="flex items-center gap-1 font-label text-[10px] sm:text-[11px] font-bold text-[#6D6561] uppercase tracking-wider">
            <span class="material-symbols-outlined text-xs text-[#9B1C25]">event_available</span>
            <span>${isMm ? 'ယနေ့ည ရရှိနိုင်သော အချိန်များ' : 'Available tonight'}</span>
          </div>

          <div class="grid grid-cols-3 gap-1.5 sm:gap-2 mt-2.5">
            ${slots.map(time => `
              <button
                type="button"
                data-card-time-slot="${time}"
                data-card-restaurant-id="${restaurant.id}"
                class="py-2 px-1 rounded-xl font-label text-xs font-bold transition-all duration-200 cursor-pointer text-center bg-[#FFFDFC] text-[#9B1C25] border border-[#E8DDD0] hover:bg-[#9B1C25] hover:text-white hover:border-[#9B1C25] hover:shadow-md active:scale-95 flex items-center justify-center whitespace-nowrap"
                title="${isMm ? `${time} တွင် စားပွဲဝိုင်း စိုတ်ယူမည်` : `Book table for ${formatTime12(time)}`}"
              >
                ${formatTime12(time)}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  function renderDiscoverView(state) {
    const isMm = state.currentLanguage === 'MM';

    const currentAreaVal = state.resultsState?.area || 'All Areas';
    const currentCuisineVal = state.resultsState?.cuisine || 'All Cuisines';

    const selectedAreaObj = HERO_LOCATIONS.find(l => l.value === currentAreaVal) || HERO_LOCATIONS[0];
    const selectedCuisineObj = HERO_CUISINES.find(c => c.value === currentCuisineVal) || HERO_CUISINES[0];

    const selectedAreaLabel = isMm ? selectedAreaObj.labelMm : selectedAreaObj.labelEn;
    const selectedCuisineLabel = isMm ? selectedCuisineObj.labelMm : selectedCuisineObj.labelEn;

    // Guests pill state — 'All Sizes' (default) behaves as 2 guests
    const rawParty = store.state.resultsState?.partySize;
    const guestsValue = rawParty && rawParty !== 'All Sizes' ? String(rawParty) : '2';

    // Compute Popularity Ranking (#1, #2, #3, #4) based on rating & reviewCount
    const popularRestaurants = [...RESTAURANTS_DATA].sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount));

    // Hot Promotions qualification: prefer structured promotions[] and fall back to legacy offerTag.
    const promoRestaurants = RESTAURANTS_DATA.filter((restaurant) => hasPromoCardOffer(restaurant));

    return `
      <div class="space-y-8 sm:space-y-10 lg:space-y-16 pb-10 sm:pb-12 lg:pb-16">

        <!-- HERO SECTION (LUXURY EDITORIAL CONCIERGE & SHOWCASE) -->
        <section class="relative pt-3 sm:pt-5 pb-1 sm:pb-2">
          <!-- Depth Background: crossfading venue slides veiled in Warm Ivory -->
          <div class="hero-bg-shell" aria-hidden="true">
            <div class="hero-bg-track">
              ${HERO_BG_IMAGES.map((img, i) => `\
                <div class="hero-bg-slide${i === 0 ? ' active' : ''}" data-hero-bg-index="${i}">\
                  <img src="${img.src}" alt="${img.alt}" loading="${i === 0 ? 'eager' : 'lazy'}" referrerpolicy="no-referrer" onerror="this.closest('.hero-bg-slide').style.display='none';" />\
                </div>`).join('')}
            </div>
            <div class="hero-bg-overlay"></div>
            <canvas class="hero-bg-canvas"></canvas>
          </div>

          <!-- Ambient Luxury Lighting Glows (own clipping layer so popovers can escape the section) -->
          <div class="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
            <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#840f16]/8 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            <div class="absolute top-1/3 -right-20 w-80 h-80 bg-[#C59B27]/6 rounded-full blur-3xl pointer-events-none"></div>
          </div>

          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <!-- Editorial Header Block -->
            <div class="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <!-- Prestigious Eyebrow Pill -->
              <div class="hidden lg:inline-flex items-center gap-2 bg-[#840f16]/[0.06] border border-[#840f16]/20 px-4 py-1.5 rounded-full shadow-2xs backdrop-blur-xs">
                <span class="material-symbols-outlined text-xs sm:text-sm text-[#840f16]">hotel_class</span>
                <span class="font-label text-[11px] sm:text-xs font-bold text-[#840f16] tracking-widest uppercase">
                  ${isMm ? 'ရန်ကုန်မြို့၏ အဆင့်မြင့် စားသောက်ဆိုင် စားပွဲဝိုင်းများ' : 'Curated Table Reservations • Yangon'}
                </span>
              </div>

              <!-- Main Hero Headline -->
              <h1 class="font-headline text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-[#231916] leading-[1.12] tracking-tight">
                ${
                  isMm
                    ? 'အမှတ်တရ ညစာစားပွဲနှင့် <span class="font-serif italic font-normal text-[#840f16]">ထူးခြားသော အတွေ့အကြုံများ</span>'
                    : 'Reserve extraordinary dining, <br class="hidden sm:inline" /><span class="font-serif italic font-normal text-[#840f16]">effortlessly perfected.</span>'
                }
              </h1>

              <p class="hidden lg:block font-body text-xs sm:text-base text-[#68554F] max-w-xl mx-auto leading-relaxed">
                ${
                  isMm
                    ? 'နာမည်ကြီး ရိုးရာလက်ဖက်ရည်ဆိုင်များ၊ သာယာသော အင်းလျားကန်စပ် ညစာနှင့် သီးသန့် အဆင့်မြင့် စားသောက်ဆိုင်များတွင် စားပွဲဝိုင်းများကို အချိန်မရွေး ချက်ချင်း စိုတ်ယူလိုက်ပါ။'
                    : 'Instant table access at Yangon’s most celebrated venues — from heritage tea houses to scenic lakefront sanctuaries.'
                }
              </p>
            </div>

            <!-- Sleek Integrated Concierge Search Bar / Card -->
                    <div class="max-w-5xl xl:max-w-6xl mx-auto">
              <div class="bg-[#FFFDFC] border border-[#E5D9CC] rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-[0_20px_50px_-20px_rgba(132,15,22,0.12)] transition-all">
                <form id="hero-search-form" class="space-y-3 xl:space-y-0 xl:flex xl:items-center xl:gap-2.5">

                  <!-- 1. Search Query Input -->
                  <div class="flex-1 bg-[#FAF6F0] hover:bg-white focus-within:bg-white border border-[#E8DDD0] focus-within:border-[#840f16] focus-within:ring-2 focus-within:ring-[#840f16]/10 rounded-xl sm:rounded-2xl px-3.5 py-2.5 sm:py-3 flex items-center gap-2.5 transition-all">
                    <span class="material-symbols-outlined text-[#840f16] text-xl shrink-0">search</span>
                    <div class="min-w-0 flex-1 text-left">
                      <label for="hero-keyword-input" class="block text-[10px] font-label font-bold text-[#8A7B76] uppercase tracking-wider leading-none mb-0.5">${isMm ? 'ဆိုင်အမည် / ဟင်းလျာ' : 'Restaurant or Dish'}</label>
                      <div class="relative">
                        <input
                          type="text"
                          id="hero-keyword-input"
                          aria-label="${isMm ? 'ဆိုင်အမည် သို့မဟုတ် ဟင်းလျာဖြင့် ရှာဖွေပါ' : 'Search by restaurant or dish'}"
                          placeholder=""
                          value="${state.searchKeyword || ''}"
                          class="relative z-10 w-full bg-transparent font-body text-xs sm:text-sm font-semibold text-[#231916] placeholder:text-[#9B8C87] placeholder:font-normal focus:outline-none"
                        />
                        <span
                          id="hero-keyword-hint"
                          aria-hidden="true"
                          class="hero-keyword-hint${state.searchKeyword ? ' is-hidden' : ''}"
                        >${(isMm ? HERO_KEYWORD_PROMPTS.MM : HERO_KEYWORD_PROMPTS.EN)[0]}</span>
                      </div>
                    </div>
                  </div>

                  <!-- 2. Location Area Custom Selector -->
                  <div class="relative w-full xl:w-48" id="hero-area-dropdown-container">
                    <input type="hidden" id="hero-area-select" value="${currentAreaVal}" />
                    <button
                      type="button"
                      id="hero-area-trigger"
                      aria-haspopup="listbox"
                      aria-expanded="false"
                      aria-controls="hero-area-popover"
                      class="w-full bg-[#FAF6F0] hover:bg-white focus:bg-white border border-[#E8DDD0] hover:border-[#840f16]/40 focus:border-[#840f16] rounded-xl sm:rounded-2xl px-3.5 py-2.5 sm:py-3 flex items-center justify-between gap-2 transition-all cursor-pointer text-left"
                    >
                      <div class="flex items-center gap-2.5 min-w-0">
                        <span class="material-symbols-outlined text-[#840f16] text-lg shrink-0">${selectedAreaObj.icon}</span>
                        <div class="min-w-0">
                          <span class="block text-[10px] font-label font-bold text-[#8A7B76] uppercase tracking-wider leading-none mb-0.5">${isMm ? 'တည်နေရာ' : 'Location'}</span>
                          <span id="hero-area-display" class="font-label text-xs sm:text-sm font-semibold text-[#231916] truncate block">
                            ${selectedAreaLabel}
                          </span>
                        </div>
                      </div>
                      <span class="material-symbols-outlined text-[#8d7b75] text-sm shrink-0 transition-transform duration-200" id="hero-area-chevron">expand_more</span>
                    </button>

                    <!-- Custom Luxury Popover Menu for Location -->
                    <div
                      id="hero-area-popover"
                      role="listbox"
                      aria-orientation="vertical"
                      tabindex="-1"
                      class="hidden absolute top-full left-0 right-0 mt-2 z-50 bg-[#FFFDFC] border border-[#EADFD1] rounded-2xl shadow-[0_16px_36px_-10px_rgba(35,25,22,0.18)] p-2 space-y-1 animate-fadeIn max-h-72 overflow-y-auto"
                    >
                      <div class="px-2 py-1 text-[10px] font-label font-bold text-[#840f16] uppercase tracking-wider border-b border-[#F0E6DA] mb-1">
                        ${isMm ? 'နေရာဒေသ ရွေးချယ်ပါ' : 'Select Location'}
                      </div>
                      ${HERO_LOCATIONS.map(loc => {
                        const isSelected = loc.value === currentAreaVal;
                        return `
                          <button
                            type="button"
                            role="option"
                            aria-selected="${isSelected}"
                            id="${toOptionId('hero-area-option', loc.value)}"
                            data-hero-area-option="${loc.value}"
                            tabindex="-1"
                            class="w-full text-left flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#840f16]/10 text-[#840f16] font-bold'
                                : 'hover:bg-[#FAF5EE] text-[#332420] font-medium'
                            }"
                          >
                            <div class="flex items-center gap-2 min-w-0">
                              <span class="material-symbols-outlined text-base ${isSelected ? 'text-[#840f16]' : 'text-[#8D7B75]'} shrink-0">${loc.icon}</span>
                              <div class="min-w-0">
                                <span class="block truncate font-label">${isMm ? loc.labelMm : loc.labelEn}</span>
                                <span class="block text-[10px] ${isSelected ? 'text-[#840f16]/80' : 'text-[#8A7B76]'} font-normal truncate">${loc.sub}</span>
                              </div>
                            </div>
                            ${isSelected ? '<span class="material-symbols-outlined text-sm text-[#840f16] shrink-0">check</span>' : ''}
                          </button>
                        `;
                      }).join('')}
                    </div>
                  </div>

                  <!-- 3. Cuisine Type Custom Selector -->
                  <div class="relative w-full xl:w-48" id="hero-cuisine-dropdown-container">
                    <input type="hidden" id="hero-cuisine-select" value="${currentCuisineVal}" />
                    <button
                      type="button"
                      id="hero-cuisine-trigger"
                      aria-haspopup="listbox"
                      aria-expanded="false"
                      aria-controls="hero-cuisine-popover"
                      class="w-full bg-[#FAF6F0] hover:bg-white focus:bg-white border border-[#E8DDD0] hover:border-[#840f16]/40 focus:border-[#840f16] rounded-xl sm:rounded-2xl px-3.5 py-2.5 sm:py-3 flex items-center justify-between gap-2 transition-all cursor-pointer text-left"
                    >
                      <div class="flex items-center gap-2.5 min-w-0">
                        <span class="material-symbols-outlined text-[#840f16] text-lg shrink-0">${selectedCuisineObj.icon}</span>
                        <div class="min-w-0">
                          <span class="block text-[10px] font-label font-bold text-[#8A7B76] uppercase tracking-wider leading-none mb-0.5">${isMm ? 'အစားအစာ' : 'Cuisine'}</span>
                          <span id="hero-cuisine-display" class="font-label text-xs sm:text-sm font-semibold text-[#231916] truncate block">
                            ${selectedCuisineLabel}
                          </span>
                        </div>
                      </div>
                      <span class="material-symbols-outlined text-[#8d7b75] text-sm shrink-0 transition-transform duration-200" id="hero-cuisine-chevron">expand_more</span>
                    </button>

                    <!-- Custom Luxury Popover Menu for Cuisine -->
                    <div
                      id="hero-cuisine-popover"
                      role="listbox"
                      aria-orientation="vertical"
                      tabindex="-1"
                      class="hidden absolute top-full left-0 right-0 mt-2 z-50 bg-[#FFFDFC] border border-[#EADFD1] rounded-2xl shadow-[0_16px_36px_-10px_rgba(35,25,22,0.18)] p-2 space-y-1 animate-fadeIn max-h-72 overflow-y-auto"
                    >
                      <div class="px-2 py-1 text-[10px] font-label font-bold text-[#840f16] uppercase tracking-wider border-b border-[#F0E6DA] mb-1">
                        ${isMm ? 'အစားအစာ အမျိုးအစား ရွေးချယ်ပါ' : 'Select Cuisine'}
                      </div>
                      ${HERO_CUISINES.map(c => {
                        const isSelected = c.value === currentCuisineVal;
                        return `
                          <button
                            type="button"
                            role="option"
                            aria-selected="${isSelected}"
                            id="${toOptionId('hero-cuisine-option', c.value)}"
                            data-hero-cuisine-option="${c.value}"
                            tabindex="-1"
                            class="w-full text-left flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#840f16]/10 text-[#840f16] font-bold'
                                : 'hover:bg-[#FAF5EE] text-[#332420] font-medium'
                            }"
                          >
                            <div class="flex items-center gap-2 min-w-0">
                              <span class="material-symbols-outlined text-base ${isSelected ? 'text-[#840f16]' : 'text-[#8D7B75]'} shrink-0">${c.icon}</span>
                              <div class="min-w-0">
                                <span class="block truncate font-label">${isMm ? c.labelMm : c.labelEn}</span>
                                <span class="block text-[10px] ${isSelected ? 'text-[#840f16]/80' : 'text-[#8A7B76]'} font-normal truncate">${c.sub}</span>
                              </div>
                            </div>
                            ${isSelected ? '<span class="material-symbols-outlined text-sm text-[#840f16] shrink-0">check</span>' : ''}
                          </button>
                        `;
                      }).join('')}
                    </div>
                  </div>

                  <!-- 4. Action Buttons -->
                  <div class="w-full xl:w-auto shrink-0 pt-1 xl:pt-0 flex items-center gap-2">
                    <button
                      type="button"
                      id="hero-open-conditions-btn"
                      class="bg-[#F8EFE5] hover:bg-[#F3DFD5] border border-[#E8DDD0] hover:border-[#840f16] text-[#241A18] hover:text-[#840f16] py-3 sm:py-3.5 px-3.5 rounded-xl sm:rounded-2xl font-label text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-2xs"
                      title="${isMm ? 'ရှာဖွေမှု သတ်မှတ်ချက်များ' : 'Search Conditions'}"
                    >
                      <span class="material-symbols-outlined text-lg text-[#840f16]">tune</span>
                      <span class="hidden sm:inline">${isMm ? 'သတ်မှတ်ချက်' : 'Conditions'}</span>
                    </button>

                    <button
                      type="submit"
                      class="flex-1 xl:flex-none bg-[#840f16] hover:bg-[#6e0c12] active:scale-[0.98] text-white py-3 sm:py-3.5 px-6 rounded-xl sm:rounded-2xl font-headline text-xs sm:text-sm font-bold shadow-[0_8px_20px_-4px_rgba(132,15,22,0.35)] hover:shadow-[0_12px_24px_-4px_rgba(132,15,22,0.45)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <span class="material-symbols-outlined text-lg sm:text-xl">search</span>
                      <span class="whitespace-nowrap">${isMm ? 'ရှာဖွေပါ' : 'Find Tables'}</span>
                    </button>
                  </div>

                </form>
              </div>

              <!-- SOCIAL PROOF TRUST BAR (booked today / avg rating / venues + live ticker) -->
              ${renderSocialProofBar(isMm)}
            </div>

          </div>
        </section>

        <!-- PROMOTION & ANNOUNCEMENT BANNERS (ကြေညာချက်ဘန်နာများ - High-Converting Perk Strip) -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 sm:-mt-6 lg:-mt-8 mb-1">
          <div class="relative group/promo-carousel">
            <!-- Left Pressable Scroll Arrow -->
            <button
              id="promo-float-prev"
              aria-label="Previous promo banner"
              title="Previous banner"
              class="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#840f16] text-[#231916] hover:text-white border border-[#EADFD1] shadow-lg items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none"
            >
              <span class="material-symbols-outlined text-xl leading-none select-none">chevron_left</span>
            </button>

            <div
              id="promo-scroll-container"
              class="horizontal-scroll-row flex flex-nowrap items-stretch overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 scroll-pl-4 sm:scroll-pl-6 lg:scroll-pl-0 gap-3.5 sm:gap-5 pb-2 pt-1"
            >
              <!-- Banner 1: KBZPay / WavePay Special Offer -->
              <div class="shrink-0 w-[84vw] sm:w-[480px] md:w-[520px] lg:w-[580px] snap-start relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#840f16] to-[#a52a2a] p-5 sm:p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border border-[#840f16]/30">
                <div class="space-y-1.5 z-10 text-left min-w-0">
                  <div class="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-0.5 rounded-full text-[10px] font-label font-bold uppercase tracking-wider text-amber-200">
                    <span class="material-symbols-outlined text-xs">local_activity</span>
                    <span>${isMm ? 'ပရိုမိုးရှင်း အထူးအစီအစဉ်' : 'Exclusive Dining Offer'}</span>
                  </div>
                  <h3 class="font-headline text-base sm:text-lg lg:text-xl font-extrabold leading-tight">
                    ${isMm ? 'KBZPay & WavePay ဖြင့် စိုတ်ယူပါက ၂၀% လျှော့ဈေး' : '20% Off Weekend Dining Pass with KBZPay'}
                  </h3>
                </div>
                <button data-nav-tab="mypage" class="shrink-0 hidden sm:inline-flex bg-white text-[#840f16] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-label text-xs font-bold hover:bg-amber-100 transition-colors shadow-md cursor-pointer z-10 whitespace-nowrap items-center justify-center">
                  ${isMm ? 'ကူပွန်ယူမည်' : 'Claim Voucher'}
                </button>
                <div class="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
              </div>

              <!-- Banner 2: Instant VIP Table Pass Info -->
              <div class="shrink-0 w-[84vw] sm:w-[480px] md:w-[520px] lg:w-[580px] snap-start relative overflow-hidden rounded-3xl bg-[#1c1311] p-5 sm:p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border border-[#362723]">
                <div class="space-y-1.5 z-10 text-left min-w-0">
                  <div class="inline-flex items-center gap-1.5 bg-[#d08e1c]/20 px-3 py-0.5 rounded-full text-[10px] font-label font-bold uppercase tracking-wider text-[#d08e1c]">
                    <span class="material-symbols-outlined text-xs">verified</span>
                    <span>${isMm ? 'စနစ်ဆိုင်ရာ အသိပေးချက်' : 'System Announcement'}</span>
                  </div>
                  <h3 class="font-headline text-base sm:text-lg lg:text-xl font-extrabold text-[#e8dfd8] leading-tight">
                    ${isMm ? 'ဗဟန်း၊ ဒဂုံ၊ မြို့ထဲတွင် Instant Pass စတင်ပါပြီ' : 'Instant Table Confirmation Enabled in Yangon'}
                  </h3>
                </div>
                <button data-nav-tab="resultlist" class="shrink-0 hidden sm:inline-flex bg-[#d08e1c] text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-label text-xs font-bold hover:bg-[#b07616] transition-colors shadow-md cursor-pointer z-10 whitespace-nowrap items-center justify-center">
                  ${isMm ? 'စိုတ်ယူရန်' : 'Book Table'}
                </button>
              </div>
            </div>

            <!-- Right Pressable Scroll Arrow -->
            <button
              id="promo-float-next"
              aria-label="Next promo banner"
              title="Next banner"
              class="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#840f16] text-[#231916] hover:text-white border border-[#EADFD1] shadow-lg items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none"
            >
              <span class="material-symbols-outlined text-xl leading-none select-none">chevron_right</span>
            </button>

            <!-- Slidable Dot Indicators -->
            <div class="flex items-center justify-center gap-1.5 mt-2.5" id="promo-dots-container">
              <button data-promo-dot="0" class="w-6 h-1.5 rounded-full bg-[#840f16] transition-all cursor-pointer" aria-label="Go to slide 1"></button>
              <button data-promo-dot="1" class="w-2 h-1.5 rounded-full bg-[#EADFD1] hover:bg-[#840f16]/50 transition-all cursor-pointer" aria-label="Go to slide 2"></button>
            </div>
          </div>
        </section>

        <!-- TONIGHT'S OPEN TABLES (live availability strip with instant-book chips) -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div class="flex justify-between items-end mb-4 lg:mb-6">
            <div>
              <div class="inline-flex items-center gap-1.5 text-[11px] font-label font-bold text-[#840f16] uppercase tracking-wider mb-1">
                <span class="material-symbols-outlined text-sm">bolt</span>
                <span>${isMm ? 'တစ်ချက်နှိပ်ရုံဖြင့် စိုတ်ယူပါ' : 'Live availability · One tap to book'}</span>
              </div>
              <h2 class="font-headline text-2xl sm:text-3xl font-extrabold text-[#231916]">
                ${isMm ? 'ယနေ့ည ဗလာစားပွဲဝိုင်းများ' : 'Tonight’s Open Tables'}
              </h2>
              <p class="font-body text-xs sm:text-sm text-[#58413f] mt-1 hidden lg:block">
                ${isMm ? 'ယနေ့ညအတွက် လစ်လပ်နေသော စားပွဲဝိုင်းများကို အချိန်ရွေးကာ ချက်ချင်း စိုတ်ယူနိုင်ပါသည်' : 'Skip the calendar — tap a free dinner slot tonight and reserve instantly.'}
              </p>
            </div>
            <button
              data-nav-tab="resultlist"
              class="shrink-0 whitespace-nowrap font-label text-xs font-bold text-[#840f16] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>${isMm ? 'အားလုံးကြည့်ရန်' : 'View All'}</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div class="mobile-horizontal-scroll -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 pb-4 lg:pb-0">
            ${
              TONIGHT_VENUE_ORDER
                .map(id => RESTAURANTS_DATA.find(r => r.id === id))
                .filter(Boolean)
                .map(r => renderTonightCard(r, state))
                .join('')
            }
          </div>
        </section>

        <!-- CURATED COLLECTIONS (Option 1 Bento on Desktop + Option A Snap Carousel on Mobile/Tablet) -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <!-- Header with View All Action -->
          <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-6 lg:mb-8 gap-3">
            <div>
              <h2 class="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#231916]">
                ${isMm ? 'အထူး စုစည်းမှုများ' : 'Curated Collections'}
              </h2>
              <p class="font-body text-xs sm:text-sm text-[#58413f] mt-1 hidden sm:block">
                ${isMm ? 'အစီအစဉ်အမျိုးမျိုးအတွက် အထူးသီးသန့် ရွေးချယ်ပေးထားသော စားသောက်ဆိုင်များ' : 'Hand-picked culinary editorial guides crafted for romantic evenings, celebrations, and heritage flavors.'}
              </p>
            </div>
            <button
              data-nav-tab="curated"
              class="self-start sm:self-end inline-flex items-center gap-1.5 font-label text-xs sm:text-sm font-extrabold text-[#840f16] hover:underline cursor-pointer group"
            >
              <span>${isMm ? 'စုစည်းမှု အားလုံး ကြည့်ရန်' : 'Explore All Guides'}</span>
              <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>

          <!-- MOBILE & TABLET: Option A Clean Natural Snap Carousel (< lg, strictly 3 curated cards) -->
          <div class="lg:hidden curated-collections-mobile-view mobile-horizontal-scroll -mx-4 px-4 sm:-mx-6 sm:px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pt-1 scroll-smooth">
            ${COLLECTIONS_DATA.slice(0, 3).map((col, idx) => `
              <div
                data-collection-target="${col.targetRestaurantId}"
                class="shrink-0 w-[280px] sm:w-[320px] h-[360px] sm:h-[380px] snap-start relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between p-5 text-left text-white border border-white/15"
              >
                <img
                  src="${col.image}"
                  alt="${col.title}"
                  referrerpolicy="no-referrer"
                  loading="lazy"
                  onerror="this.onerror=null; this.src='assets/images/seeds_lakefront.jpg';"
                  class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/25"></div>

                <!-- Top Row Tag & Venue Count -->
                <div class="relative z-10 flex items-center justify-between gap-2">
                  <span class="inline-flex items-center gap-1 ${idx === 0 ? 'bg-[#D08E1C] text-[#231916]' : idx === 1 ? 'bg-[#840f16] text-white' : 'bg-[#2f7a3f] text-white'} px-3 py-1 rounded-full font-label text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                    ${isMm ? col.categoryTagMM : col.categoryTag}
                  </span>
                  <span class="bg-black/60 backdrop-blur-md border border-white/20 text-white font-label text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full">
                    ${idx === 0 ? (isMm ? '၆ ဆိုင်' : '6 Venues') : idx === 1 ? (isMm ? '၄ ဆိုင်' : '4 Tables') : (isMm ? '၅ ဆိုင်' : '5 Venues')}
                  </span>
                </div>

                <!-- Bottom Content -->
                <div class="relative z-10 space-y-2">
                  <div class="text-[#f5d592] font-label text-[11px] font-bold uppercase tracking-wider">
                    ${isMm ? 'အယ်ဒီတာ့ ရွေးချယ်မှု' : 'Curator’s Issue'}
                  </div>
                  <h4 class="font-headline text-lg sm:text-xl font-bold text-white leading-tight">
                    ${isMm ? col.titleMM : col.title}
                  </h4>
                  <p class="font-body text-xs text-white/85 line-clamp-2 leading-relaxed">
                    ${isMm ? col.subtitleMM : col.subtitle}
                  </p>
                  <div class="pt-1 flex items-center gap-1.5 text-xs font-label font-extrabold text-[#f5d592] group-hover:translate-x-1 transition-transform">
                    <span>${isMm ? 'လမ်းညွှန် ကြည့်ရှုမည်' : 'Explore Guide'}</span>
                    <span class="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- DESKTOP: Option 1 Editorial Bento Grid (≥ lg) -->
          <div class="hidden lg:grid curated-collections-desktop-view lg:grid-cols-12 gap-6">
            <!-- Dominant Hero Card (7 Cols) -->
            ${(() => {
              const heroCol = COLLECTIONS_DATA[0] || {
                targetRestaurantId: 'rest-1',
                title: 'Most Romantic Dining & Sunset Views',
                titleMM: 'အကြည်နူးဆုံး ရိုမန်းတစ် စားသောက်ဆိုင်များ',
                subtitle: 'Intimate candlelit tables, panoramic Inya Lake sunsets, and curated wine pairings.',
                subtitleMM: 'အင်းလျားကန်ဘေး သီးသန့်ဝိုင်းများနှင့် ဖယောင်းတိုင်အလင်းရောင် အောက်ရှိ ဇိမ်ခံညစာများ။',
                image: 'assets/images/seeds_lakefront.jpg',
                categoryTag: 'Romantic Dining',
                categoryTagMM: 'ရိုမန်းတစ် ညစာ'
              };
              return `
                <div
                  data-collection-target="${heroCol.targetRestaurantId}"
                  class="lg:col-span-7 relative h-80 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between p-7 text-left text-white border border-white/10"
                >
                  <img
                    src="${heroCol.image}"
                    alt="${heroCol.title}"
                    referrerpolicy="no-referrer"
                    loading="lazy"
                    onerror="this.onerror=null; this.src='assets/images/seeds_lakefront.jpg';"
                    class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <!-- Luxury Vignette Gradient -->
                  <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/25"></div>

                  <!-- Top Pill & Counter -->
                  <div class="relative z-10 flex items-center justify-between gap-2">
                    <span class="inline-flex items-center gap-1.5 bg-[#D08E1C] text-[#231916] px-3.5 py-1 rounded-full font-label text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                      <span class="material-symbols-outlined text-xs leading-none">stars</span>
                      ${isMm ? heroCol.categoryTagMM : heroCol.categoryTag}
                    </span>
                    <span class="bg-black/60 backdrop-blur-md border border-white/20 text-white font-label text-xs font-bold px-3 py-1 rounded-full">
                      ${isMm ? '၆ ဆိုင် ပါဝင်ပါသည်' : '6 Venues Included'}
                    </span>
                  </div>

                  <!-- Bottom Hero Details -->
                  <div class="relative z-10 space-y-2">
                    <div class="text-[#f5d592] font-label text-xs font-bold uppercase tracking-wider">
                      ${isMm ? 'အယ်ဒီတာ့ ရွေးချယ်မှု' : 'Curator’s Choice Edition'}
                    </div>
                    <h3 class="font-headline text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                      ${isMm ? heroCol.titleMM : heroCol.title}
                    </h3>
                    <p class="font-body text-sm text-white/90 line-clamp-2 max-w-xl leading-relaxed">
                      ${isMm ? heroCol.subtitleMM : heroCol.subtitle}
                    </p>
                    <div class="pt-2 flex items-center gap-2 text-sm font-label font-extrabold text-[#f5d592] group-hover:translate-x-1 transition-transform">
                      <span>${isMm ? 'စားသောက်ဆိုင်များ စိုတ်ယူရန်' : 'Explore Curated Dining Guide'}</span>
                      <span class="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </div>
                </div>
              `;
            })()}

            <!-- Stacked Duo Companion Cards (5 Cols) -->
            <div class="lg:col-span-5 flex flex-col gap-6">
              ${COLLECTIONS_DATA.slice(1, 3).map((col, idx) => `
                <div
                  data-collection-target="${col.targetRestaurantId}"
                  class="relative flex-1 min-h-[175px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between p-5 text-left text-white border border-white/10"
                >
                  <img
                    src="${col.image}"
                    alt="${col.title}"
                    referrerpolicy="no-referrer"
                    loading="lazy"
                    onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';"
                    class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <!-- Dark Gradient Overlay -->
                  <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>

                  <!-- Top Tag & Counter -->
                  <div class="relative z-10 flex items-center justify-between gap-2">
                    <span class="inline-flex items-center gap-1 ${idx === 0 ? 'bg-[#840f16]' : 'bg-[#2f7a3f]'} text-white px-2.5 py-0.5 rounded-full font-label text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                      ${isMm ? col.categoryTagMM : col.categoryTag}
                    </span>
                    <span class="bg-black/60 backdrop-blur-md border border-white/20 text-white font-label text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      ${idx === 0 ? (isMm ? '၄ ဆိုင်' : '4 Tables') : (isMm ? '၅ ဆိုင်' : '5 Venues')}
                    </span>
                  </div>

                  <!-- Bottom Info -->
                  <div class="relative z-10 space-y-1">
                    <h4 class="font-headline text-lg font-bold text-white leading-snug">
                      ${isMm ? col.titleMM : col.title}
                    </h4>
                    <p class="font-body text-xs text-white/80 line-clamp-1">
                      ${isMm ? col.subtitleMM : col.subtitle}
                    </p>
                    <div class="pt-1 flex items-center gap-1 text-[11px] font-label font-extrabold ${idx === 0 ? 'text-amber-200' : 'text-emerald-200'} group-hover:translate-x-1 transition-transform">
                      <span>${isMm ? 'ကြည့်ရှုရန်' : 'Explore Guide'}</span>
                      <span class="material-symbols-outlined text-xs">arrow_forward</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>


        <!-- TRENDING DISHES SECTION -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div class="flex justify-between items-end mb-4 lg:mb-6">
            <div>
              <h2 class="font-headline text-2xl sm:text-3xl font-extrabold text-[#231916]">
                ${isMm ? 'ရေပန်းစားသော ဟင်းလျာများ' : 'Trending Dishes'}
              </h2>
              <p class="font-body text-xs sm:text-sm text-[#58413f] mt-1 hidden lg:block">
                ${isMm ? 'ဧည့်သည်များ အကြိုက်ဆုံးနှင့် လူကြိုက်အများဆုံး ထိပ်တန်း ဟင်းလျာများ' : 'Top trending signature dishes curated dynamically based on guest popularity and high ratings.'}
              </p>
            </div>
            <button
              data-nav-tab="resultlist"
              class="shrink-0 whitespace-nowrap font-label text-xs font-bold text-[#840f16] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>${isMm ? 'အားလုံးကြည့်ရန်' : 'View All'}</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div class="mobile-horizontal-scroll -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 pb-4 lg:pb-0">
            ${popularRestaurants.slice(0, 4).map(r => renderTrendingCard(r, state)).join('')}
          </div>
        </section>


        <!-- HOT PROMOTIONS VENUES GRID (အထူးပရိုမိုးရှင်း စားသောက်ဆိုင်များ) - feature 005: only shops with an active promotion; section hidden entirely when none qualify -->
        ${
          promoRestaurants.length > 0
            ? `
        <section class="max-w-7xl mx-auto px-[max(1rem,env(safe-area-inset-left))] sm:px-6 lg:px-8 text-left relative">
          <div class="flex justify-between items-end mb-4 lg:mb-6">
            <div>
              <h2 class="font-headline text-2xl sm:text-3xl font-extrabold text-[#231916] flex items-center gap-2">
                <span>${isMm ? 'အထူးပရိုမိုးရှင်း စားသောက်ဆိုင်များ' : 'Hot Promotions'}</span>
                <span class="material-symbols-outlined text-[#840f16] text-2xl sm:text-3xl">local_fire_department</span>
              </h2>
              <p class="font-body text-xs sm:text-sm text-[#58413f] mt-1 hidden lg:block">
                ${isMm ? 'အချိန်အကန့်အသတ်ဖြင့် ရရှိနိုင်သော အထူးလျှော့စျေးနှင့် ပရိုမိုးရှင်း စားသောက်ဆိုင်များ' : 'Limited-time exclusive dining deals, promotional offers, and special table discounts in Yangon.'}
              </p>
            </div>
          </div>

          <!-- Hot Promotions Carousel Container with Floating Scroll Buttons -->
          <div class="relative group/hotpromo-carousel">
            <!-- Left Pressable Scroll Arrow -->
            <button
              id="hotpromo-float-prev"
              aria-label="Scroll left"
              title="Scroll left"
              class="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#840f16] text-[#231916] hover:text-white border border-[#EADFD1] shadow-lg items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none"
            >
              <span class="material-symbols-outlined text-xl leading-none select-none">chevron_left</span>
            </button>

            <!-- Scrollable Hot Promotions Row -->
            <div
              id="hotpromo-scroll-container"
              class="horizontal-scroll-row mobile-horizontal-scroll scroll-all flex flex-nowrap items-stretch overflow-x-auto overflow-y-hidden scroll-smooth mx-0 px-0 gap-4 sm:gap-5 lg:gap-6 pt-3 pb-4"
            >
              ${promoRestaurants.map(restaurant => renderPromoCard(restaurant, state)).join('')}
            </div>

            <!-- Right Pressable Scroll Arrow -->
            <button
              id="hotpromo-float-next"
              aria-label="Scroll right"
              title="Scroll right"
              class="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#840f16] text-[#231916] hover:text-white border border-[#EADFD1] shadow-lg items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none"
            >
              <span class="material-symbols-outlined text-xl leading-none select-none">chevron_right</span>
            </button>
          </div>
        </section>
        `
            : ''
        }

      </div>
    `;
  }

  // ─── Hero FX: crossfade carousel + gold bokeh canvas ─────────────────────
  // Pattern adapted from the variant's editorial hero; colors map to
  // DESIGN.md tokens only (gold #C69A2B / brand #9B1C25 family).
  function initHeroBackgroundFx(containerElement) {
    const section = containerElement.querySelector('.hero-bg-shell')?.closest('section');
    if (!section) return;

    // 1. Crossfading venue slides
    const slides = [...containerElement.querySelectorAll('.hero-bg-slide')];
    let currentSlide = 0;
    let carouselTimer = null;
    if (slides.length > 1 && !prefersReducedMotion()) {
      carouselTimer = setInterval(() => {
        if (!slides[0]?.isConnected) {
          clearInterval(carouselTimer);
          return;
        }
        slides[currentSlide]?.classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide]?.classList.add('active');
      }, 5600);
      registerHeroFxCleanup(() => clearInterval(carouselTimer));
    }

    // 2. Subtle gold/crimson bokeh particles
    const canvas = containerElement.querySelector('.hero-bg-canvas');
    if (!canvas || typeof canvas.getContext !== 'function') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = section.clientWidth || 360);
    let height = (canvas.height = section.clientHeight || 360);

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        const w = section.clientWidth || 360;
        const h = section.clientHeight || 360;
        if (canvas.width !== w || canvas.height !== h) {
          width = canvas.width = w;
          height = canvas.height = h;
        }
      });
    });
    resizeObserver.observe(section);
    registerHeroFxCleanup(() => resizeObserver.disconnect());

    const particleCount = width < 768 ? 10 : 16;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1.2,
      vy: Math.random() * 0.35 + 0.15,
      vx: (Math.random() - 0.5) * 0.18,
      alpha: Math.random() * 0.35 + 0.12,
      hue: Math.random() > 0.4 ? 'rgba(198, 154, 43,' : 'rgba(155, 28, 37,', // gold / brand
    }));

    function renderBokeh() {
      if (!canvas.isConnected) return;
      ctx.clearRect(0, 0, width, height);
      if (!prefersReducedMotion()) {
        for (const p of particles) {
          p.y -= p.vy;
          p.x += p.vx;
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${p.hue} ${p.alpha})`;
          ctx.fill();
        }
      }
      rafId = requestAnimationFrame(renderBokeh);
    }
    let rafId = requestAnimationFrame(renderBokeh);
    registerHeroFxCleanup(() => cancelAnimationFrame(rafId));
  }

  // ─── Hero FX: rotating concierge keyword hint ────────────────────────────
  function initHeroKeywordHint(containerElement) {
    const hintEl = containerElement.querySelector('#hero-keyword-hint');
    const searchInput = containerElement.querySelector('#hero-keyword-input');
    if (!hintEl || !searchInput) return;

    const prompts = store.state.currentLanguage === 'MM' ? HERO_KEYWORD_PROMPTS.MM : HERO_KEYWORD_PROMPTS.EN;
    let promptIdx = 0;
    let hintTimer = null;

    const syncVisibility = () => {
      const hasValue = searchInput.value.trim().length > 0;
      hintEl.classList.toggle('is-hidden', hasValue || document.activeElement === searchInput);
    };

    searchInput.addEventListener('focus', syncVisibility);
    searchInput.addEventListener('blur', syncVisibility);
    searchInput.addEventListener('input', syncVisibility);

    if (!prefersReducedMotion()) {
      hintTimer = setInterval(() => {
        if (!hintEl.isConnected) {
          clearInterval(hintTimer);
          return;
        }
        if (document.activeElement === searchInput || searchInput.value.trim().length > 0) return;
        hintEl.classList.remove('hint-fade-in');
        hintEl.classList.add('hint-fade-out');
        setTimeout(() => {
          promptIdx = (promptIdx + 1) % prompts.length;
          hintEl.textContent = prompts[promptIdx];
          hintEl.classList.remove('hint-fade-out');
          hintEl.classList.add('hint-fade-in');
        }, 250);
      }, 3600);
      registerHeroFxCleanup(() => clearInterval(hintTimer));
    }
  }

  // ─── Social proof: rotating recent-booking ticker ────────────────────────
  function initSocialProofTicker(containerElement) {
    const textEl = containerElement.querySelector('#proof-ticker-text');
    if (!textEl) return;

    let msgIdx = 0;
    let tickerTimer = null;

    const messages = () => (store.state.currentLanguage === 'MM' ? SOCIAL_PROOF_TICKER.MM : SOCIAL_PROOF_TICKER.EN);

    if (!prefersReducedMotion()) {
      tickerTimer = setInterval(() => {
        if (!textEl.isConnected) {
          clearInterval(tickerTimer);
          return;
        }
        const msgs = messages();
        msgIdx = (msgIdx + 1) % msgs.length;
        textEl.classList.remove('proof-ticker-fade-in');
        textEl.classList.add('proof-ticker-fade-out');
        setTimeout(() => {
          if (!textEl.isConnected) return;
          textEl.textContent = msgs[msgIdx];
          textEl.classList.remove('proof-ticker-fade-out');
          textEl.classList.add('proof-ticker-fade-in');
        }, 250);
      }, 4200);
      registerHeroFxCleanup(() => clearInterval(tickerTimer));
    }
  }

  function attachDiscoverViewEvents(containerElement = document) {
    runHeroFxCleanup();
    attachRestaurantCardEvents(containerElement);
    initHeroBackgroundFx(containerElement);
    initHeroKeywordHint(containerElement);
    initSocialProofTicker(containerElement);

    // Hero Search Form
    const form = containerElement.querySelector('#hero-search-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const kw = containerElement.querySelector('#hero-keyword-input')?.value || '';
        const area = containerElement.querySelector('#hero-area-select')?.value || 'All Areas';
        const cuisine = containerElement.querySelector('#hero-cuisine-select')?.value || 'All Cuisines';
        const time = containerElement.querySelector('#hero-time-select')?.value || '18:30';
        const partySize = containerElement.querySelector('#hero-guests-select')?.value || '2';

        store.updateResultsState({
          keyword: kw,
          area,
          cuisine,
          time,
          partySize: partySize === 'All' ? 'All Sizes' : partySize,
        });
        store.setSearchKeyword(kw);
        store.setActiveTab('resultlist');
      });
    }

    // Hero Open Search Conditions Button
    const heroOpenCondBtn = containerElement.querySelector('#hero-open-conditions-btn');
    if (heroOpenCondBtn) {
      heroOpenCondBtn.addEventListener('click', () => {
        const kw = containerElement.querySelector('#hero-keyword-input')?.value || '';
        const area = containerElement.querySelector('#hero-area-select')?.value || 'All Areas';
        const cuisine = containerElement.querySelector('#hero-cuisine-select')?.value || 'All Cuisines';
        const time = containerElement.querySelector('#hero-time-select')?.value || '18:30';
        const partySize = containerElement.querySelector('#hero-guests-select')?.value || '2';

        store.openSearchConditions({
          keyword: kw,
          area,
          cuisine,
          time,
          partySize: partySize === 'All' ? 'All Sizes' : partySize,
        });
      });
    }

    // Custom Popover logic for Area
    const areaTrigger = containerElement.querySelector('#hero-area-trigger');
    const areaPopover = containerElement.querySelector('#hero-area-popover');
    const areaDisplay = containerElement.querySelector('#hero-area-display');
    const areaInput = containerElement.querySelector('#hero-area-select');
    const areaChevron = containerElement.querySelector('#hero-area-chevron');

    // Custom Popover logic for Cuisine
    const cuisineTrigger = containerElement.querySelector('#hero-cuisine-trigger');
    const cuisinePopover = containerElement.querySelector('#hero-cuisine-popover');
    const cuisineDisplay = containerElement.querySelector('#hero-cuisine-display');
    const cuisineInput = containerElement.querySelector('#hero-cuisine-select');
    const cuisineChevron = containerElement.querySelector('#hero-cuisine-chevron');
    const getListboxOptions = (popover) => Array.from(popover?.querySelectorAll('[role="option"]') || []);
    const focusListboxOption = (popover, index) => {
      const options = getListboxOptions(popover);
      if (!options.length) return;
      const safeIndex = Math.min(Math.max(index, 0), options.length - 1);
      options[safeIndex].focus();
      if (popover?.id) {
        popover.setAttribute('aria-activedescendant', options[safeIndex].id);
      }
    };
    const focusSelectedListboxOption = (popover) => {
      const options = getListboxOptions(popover);
      if (!options.length) return;
      const selectedIndex = options.findIndex((option) => option.getAttribute('aria-selected') === 'true');
      focusListboxOption(popover, selectedIndex >= 0 ? selectedIndex : 0);
    };
    const handleListboxKeydown = (event, popover, trigger, closePopover) => {
      const options = getListboxOptions(popover);
      if (!options.length) return;

      const currentIndex = Math.max(options.indexOf(document.activeElement), 0);

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          focusListboxOption(popover, currentIndex + 1 >= options.length ? 0 : currentIndex + 1);
          break;
        case 'ArrowUp':
          event.preventDefault();
          focusListboxOption(popover, currentIndex - 1 < 0 ? options.length - 1 : currentIndex - 1);
          break;
        case 'Home':
          event.preventDefault();
          focusListboxOption(popover, 0);
          break;
        case 'End':
          event.preventDefault();
          focusListboxOption(popover, options.length - 1);
          break;
        case 'Enter':
        case ' ':
          if (document.activeElement && options.includes(document.activeElement)) {
            event.preventDefault();
            document.activeElement.click();
          }
          break;
        case 'Escape':
          event.preventDefault();
          closePopover({ returnFocus: true });
          if (trigger) {
            trigger.focus();
          }
          break;
      }
    };

    const closeAreaPopover = ({ returnFocus = false } = {}) => {
      if (!areaPopover) return;
      areaPopover.classList.add('hidden');
      if (areaTrigger) areaTrigger.setAttribute('aria-expanded', 'false');
      if (areaChevron) areaChevron.classList.remove('rotate-180');
      areaPopover.removeAttribute('aria-activedescendant');
      if (returnFocus && areaTrigger) areaTrigger.focus();
    };

    const closeCuisinePopover = ({ returnFocus = false } = {}) => {
      if (!cuisinePopover) return;
      cuisinePopover.classList.add('hidden');
      if (cuisineTrigger) cuisineTrigger.setAttribute('aria-expanded', 'false');
      if (cuisineChevron) cuisineChevron.classList.remove('rotate-180');
      cuisinePopover.removeAttribute('aria-activedescendant');
      if (returnFocus && cuisineTrigger) cuisineTrigger.focus();
    };

    if (areaTrigger && areaPopover) {
      areaTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        closeCuisinePopover();
        closeGuestsPopover();
        const isHidden = areaPopover.classList.contains('hidden');
        if (isHidden) {
          areaPopover.classList.remove('hidden');
          areaTrigger.setAttribute('aria-expanded', 'true');
          if (areaChevron) areaChevron.classList.add('rotate-180');
          setTimeout(() => focusSelectedListboxOption(areaPopover), 0);
        } else {
          closeAreaPopover();
        }
      });
      areaTrigger.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          closeCuisinePopover();
          closeGuestsPopover();
          areaPopover.classList.remove('hidden');
          areaTrigger.setAttribute('aria-expanded', 'true');
          if (areaChevron) areaChevron.classList.add('rotate-180');
          setTimeout(() => focusSelectedListboxOption(areaPopover), 0);
        }
      });
      areaPopover.addEventListener('keydown', (e) => handleListboxKeydown(e, areaPopover, areaTrigger, closeAreaPopover));
    }

    if (cuisineTrigger && cuisinePopover) {
      cuisineTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAreaPopover();
        closeGuestsPopover();
        const isHidden = cuisinePopover.classList.contains('hidden');
        if (isHidden) {
          cuisinePopover.classList.remove('hidden');
          cuisineTrigger.setAttribute('aria-expanded', 'true');
          if (cuisineChevron) cuisineChevron.classList.add('rotate-180');
          setTimeout(() => focusSelectedListboxOption(cuisinePopover), 0);
        } else {
          closeCuisinePopover();
        }
      });
      cuisineTrigger.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          closeAreaPopover();
          closeGuestsPopover();
          cuisinePopover.classList.remove('hidden');
          cuisineTrigger.setAttribute('aria-expanded', 'true');
          if (cuisineChevron) cuisineChevron.classList.add('rotate-180');
          setTimeout(() => focusSelectedListboxOption(cuisinePopover), 0);
        }
      });
      cuisinePopover.addEventListener('keydown', (e) => handleListboxKeydown(e, cuisinePopover, cuisineTrigger, closeCuisinePopover));
    }

    // Option selection for Area
    containerElement.querySelectorAll('[data-hero-area-option]').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = e.currentTarget.getAttribute('data-hero-area-option');
        if (areaInput) areaInput.value = val;
        const matched = HERO_LOCATIONS.find(l => l.value === val);
        if (matched && areaDisplay) {
          areaDisplay.textContent = store.state.currentLanguage === 'MM' ? matched.labelMm : matched.labelEn;
        }
        // Update active UI styles on option buttons
        containerElement.querySelectorAll('[data-hero-area-option]').forEach(b => {
          const isAct = b.getAttribute('data-hero-area-option') === val;
          b.setAttribute('aria-selected', isAct);
          b.className = `w-full text-left flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
            isAct ? 'bg-[#840f16]/10 text-[#840f16] font-bold' : 'hover:bg-[#FAF5EE] text-[#332420] font-medium'
          }`;
        });
        closeAreaPopover();
      });
    });

    // Option selection for Cuisine
    containerElement.querySelectorAll('[data-hero-cuisine-option]').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = e.currentTarget.getAttribute('data-hero-cuisine-option');
        if (cuisineInput) cuisineInput.value = val;
        const matched = HERO_CUISINES.find(c => c.value === val);
        if (matched && cuisineDisplay) {
          cuisineDisplay.textContent = store.state.currentLanguage === 'MM' ? matched.labelMm : matched.labelEn;
        }
        // Update active UI styles on option buttons
        containerElement.querySelectorAll('[data-hero-cuisine-option]').forEach(b => {
          const isAct = b.getAttribute('data-hero-cuisine-option') === val;
          b.setAttribute('aria-selected', isAct);
          b.className = `w-full text-left flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
            isAct ? 'bg-[#840f16]/10 text-[#840f16] font-bold' : 'hover:bg-[#FAF5EE] text-[#332420] font-medium'
          }`;
        });
        closeCuisinePopover();
      });
    });

    // Custom Popover logic for Guests
    const guestsTrigger = containerElement.querySelector('#hero-guests-trigger');
    const guestsPopover = containerElement.querySelector('#hero-guests-popover');
    const guestsDisplay = containerElement.querySelector('#hero-guests-display');
    const guestsInput = containerElement.querySelector('#hero-guests-select');
    const guestsChevron = containerElement.querySelector('#hero-guests-chevron');

    const closeGuestsPopover = ({ returnFocus = false } = {}) => {
      if (!guestsPopover) return;
      guestsPopover.classList.add('hidden');
      if (guestsTrigger) guestsTrigger.setAttribute('aria-expanded', 'false');
      if (guestsChevron) guestsChevron.classList.remove('rotate-180');
      guestsPopover.removeAttribute('aria-activedescendant');
      if (returnFocus && guestsTrigger) guestsTrigger.focus();
    };

    if (guestsTrigger && guestsPopover) {
      guestsTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAreaPopover();
        closeCuisinePopover();
        const isHidden = guestsPopover.classList.contains('hidden');
        if (isHidden) {
          guestsPopover.classList.remove('hidden');
          guestsTrigger.setAttribute('aria-expanded', 'true');
          if (guestsChevron) guestsChevron.classList.add('rotate-180');
          setTimeout(() => focusSelectedListboxOption(guestsPopover), 0);
        } else {
          closeGuestsPopover();
        }
      });
      guestsTrigger.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          closeAreaPopover();
          closeCuisinePopover();
          guestsPopover.classList.remove('hidden');
          guestsTrigger.setAttribute('aria-expanded', 'true');
          if (guestsChevron) guestsChevron.classList.add('rotate-180');
          setTimeout(() => focusSelectedListboxOption(guestsPopover), 0);
        }
      });
      guestsPopover.addEventListener('keydown', (e) => handleListboxKeydown(e, guestsPopover, guestsTrigger, closeGuestsPopover));
    }

    // Guests option selection
    containerElement.querySelectorAll('[data-hero-guests-option]').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = e.currentTarget.getAttribute('data-hero-guests-option');
        if (guestsInput) guestsInput.value = val;
        if (guestsDisplay) guestsDisplay.textContent = val;
        containerElement.querySelectorAll('[data-hero-guests-option]').forEach(b => {
          const isAct = b.getAttribute('data-hero-guests-option') === val;
          b.setAttribute('aria-selected', isAct);
          b.className = `w-full text-left flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
            isAct ? 'bg-[#840f16]/10 text-[#840f16] font-bold' : 'hover:bg-[#FAF5EE] text-[#332420] font-medium'
          }`;
        });
        closeGuestsPopover();
      });
    });

    // Time slot selection inside the When popover
    const timeInput = containerElement.querySelector('#hero-time-select');
    const whenDisplay = containerElement.querySelector('#hero-date-display');

    const updateWhenDisplay = () => {
      if (!whenDisplay) return;
      const isMmNow = store.state.currentLanguage === 'MM';
      const dateStr = store.state.resultsState?.selectedDate || todayDisplayStr();
      const time = timeInput?.value || DEFAULT_TIME;
      whenDisplay.textContent = `${formatDateDisplay(dateStr, isMmNow)} · ${formatTime12(time)}`;
    };

    containerElement.querySelectorAll('[data-hero-time-option]').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = e.currentTarget.getAttribute('data-hero-time-option');
        if (timeInput) timeInput.value = val;
        containerElement.querySelectorAll('[data-hero-time-option]').forEach(b => {
          const isAct = b.getAttribute('data-hero-time-option') === val;
          b.setAttribute('aria-selected', isAct);
          b.className = `py-2 rounded-xl font-label text-xs font-semibold transition-colors cursor-pointer ${
            isAct
              ? 'bg-[#840f16] text-white shadow-sm'
              : 'bg-[#F8EFE5] text-[#332420] hover:bg-[#840f16]/10 hover:text-[#840f16]'
          }`;
        });
        updateWhenDisplay();
      });
    });

    // Close area, cuisine & guests popovers on outside click
    document.addEventListener('click', (e) => {
      if (areaPopover && !areaPopover.classList.contains('hidden') && !areaPopover.contains(e.target) && !areaTrigger?.contains(e.target)) {
        closeAreaPopover();
      }
      if (cuisinePopover && !cuisinePopover.classList.contains('hidden') && !cuisinePopover.contains(e.target) && !cuisineTrigger?.contains(e.target)) {
        closeCuisinePopover();
      }
      if (guestsPopover && !guestsPopover.classList.contains('hidden') && !guestsPopover.contains(e.target) && !guestsTrigger?.contains(e.target)) {
        closeGuestsPopover();
      }
    });

    // Close area, cuisine & guests popovers on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAreaPopover();
        closeCuisinePopover();
        closeGuestsPopover();
      }
    });

    // Occasion filter buttons
    containerElement.querySelectorAll('[data-occasion-filter]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const keyword = e.currentTarget.getAttribute('data-filter-keyword') || '';
        const area = e.currentTarget.getAttribute('data-filter-area') || 'All Areas';
        store.updateResultsState({ keyword, area, cuisine: 'All Cuisines' });
        store.setActiveTab('resultlist');
      });
    });

    // Cuisine filter buttons (fallback)
    containerElement.querySelectorAll('[data-cuisine-filter]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cuisine = e.currentTarget.getAttribute('data-cuisine-filter');
        store.updateResultsState({ cuisine, keyword: '' });
        store.setActiveTab('resultlist');
      });
    });

    // Promotion banners horizontal slide controls & indicators
    const promoScrollContainer = containerElement.querySelector('#promo-scroll-container');
    const promoFloatPrev = containerElement.querySelector('#promo-float-prev');
    const promoFloatNext = containerElement.querySelector('#promo-float-next');
    const promoDots = containerElement.querySelectorAll('[data-promo-dot]');

    const updatePromoCarouselState = () => {
      if (!promoScrollContainer) return;
      const { scrollLeft, scrollWidth, clientWidth } = promoScrollContainer;
      const isAtStart = scrollLeft <= 10;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;

      if (promoFloatPrev) {
        promoFloatPrev.style.opacity = isAtStart ? '0' : '1';
        promoFloatPrev.style.pointerEvents = isAtStart ? 'none' : 'auto';
      }
      if (promoFloatNext) {
        promoFloatNext.style.opacity = isAtEnd ? '0' : '1';
        promoFloatNext.style.pointerEvents = isAtEnd ? 'none' : 'auto';
      }

      // Update dot active indicator states
      const maxScroll = Math.max(1, scrollWidth - clientWidth);
      const activeIndex = scrollLeft / maxScroll > 0.4 ? 1 : 0;
      promoDots.forEach((dot, idx) => {
        if (idx === activeIndex) {
          dot.className = 'w-6 h-1.5 rounded-full bg-[#840f16] transition-all cursor-pointer';
        } else {
          dot.className = 'w-2 h-1.5 rounded-full bg-[#EADFD1] hover:bg-[#840f16]/50 transition-all cursor-pointer';
        }
      });
    };

    if (promoFloatPrev) {
      promoFloatPrev.addEventListener('click', (e) => {
        e.preventDefault();
        if (promoScrollContainer) {
          const step = Math.round(promoScrollContainer.clientWidth * 0.85);
          promoScrollContainer.scrollBy({ left: -step, behavior: 'smooth' });
        }
      });
    }

    if (promoFloatNext) {
      promoFloatNext.addEventListener('click', (e) => {
        e.preventDefault();
        if (promoScrollContainer) {
          const step = Math.round(promoScrollContainer.clientWidth * 0.85);
          promoScrollContainer.scrollBy({ left: step, behavior: 'smooth' });
        }
      });
    }

    promoDots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        const targetIdx = parseInt(dot.getAttribute('data-promo-dot') || '0', 10);
        if (promoScrollContainer) {
          const targetLeft = targetIdx === 0 ? 0 : promoScrollContainer.scrollWidth;
          promoScrollContainer.scrollTo({ left: targetLeft, behavior: 'smooth' });
        }
      });
    });

    if (promoScrollContainer) {
      promoScrollContainer.addEventListener('scroll', updatePromoCarouselState, { passive: true });
      setTimeout(updatePromoCarouselState, 50);
    }

    // Hot Promotions horizontal slide controls (floating buttons matching occasions section)
    const hotpromoScrollContainer = containerElement.querySelector('#hotpromo-scroll-container');
    const hotpromoFloatPrev = containerElement.querySelector('#hotpromo-float-prev');
    const hotpromoFloatNext = containerElement.querySelector('#hotpromo-float-next');

    const updateHotpromoScrollButtons = () => {
      if (!hotpromoScrollContainer) return;
      const { scrollLeft, scrollWidth, clientWidth } = hotpromoScrollContainer;
      const isAtStart = scrollLeft <= 10;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;

      if (hotpromoFloatPrev) {
        hotpromoFloatPrev.style.opacity = isAtStart ? '0' : '1';
        hotpromoFloatPrev.style.pointerEvents = isAtStart ? 'none' : 'auto';
      }
      if (hotpromoFloatNext) {
        hotpromoFloatNext.style.opacity = isAtEnd ? '0' : '1';
        hotpromoFloatNext.style.pointerEvents = isAtEnd ? 'none' : 'auto';
      }
    };

    const handleHotpromoScrollLeft = (e) => {
      if (e) e.preventDefault();
      if (hotpromoScrollContainer) {
        hotpromoScrollContainer.scrollBy({ left: -340, behavior: 'smooth' });
      }
    };

    const handleHotpromoScrollRight = (e) => {
      if (e) e.preventDefault();
      if (hotpromoScrollContainer) {
        hotpromoScrollContainer.scrollBy({ left: 340, behavior: 'smooth' });
      }
    };

    if (hotpromoFloatPrev) hotpromoFloatPrev.addEventListener('click', handleHotpromoScrollLeft);
    if (hotpromoFloatNext) hotpromoFloatNext.addEventListener('click', handleHotpromoScrollRight);

    if (hotpromoScrollContainer) {
      hotpromoScrollContainer.addEventListener('scroll', updateHotpromoScrollButtons, { passive: true });
      setTimeout(updateHotpromoScrollButtons, 50);
    }

    // Hero Calendar View Popover Logic
    const dateTrigger = containerElement.querySelector('#hero-date-trigger');
    const dateBackdrop = containerElement.querySelector('#hero-calendar-backdrop');
    const datePopover = containerElement.querySelector('#hero-calendar-popover');
    const dateClose = containerElement.querySelector('#hero-calendar-close');
    const dateDisplay = containerElement.querySelector('#hero-date-display');
    const calendarContainer = containerElement.querySelector('#hero-calendar-container');
    let lastCalendarInvoker = null;

    // Anchor the view on the current month; bounds are computed inside
    // generateCalendarGrid (FR-010).
    const now = new Date();
    let activeCalYear = now.getFullYear();
    let activeCalMonth = now.getMonth();

    function getCalendarFocusTarget(selector) {
      if (!calendarContainer) return null;

      if (selector) {
        const preferred = calendarContainer.querySelector(selector);
        if (preferred && !preferred.disabled) {
          return preferred;
        }
      }

      return calendarContainer.querySelector(
        '[data-hero-calendar-day][aria-selected="true"], [data-hero-calendar-day]:not([disabled]), #cal-next-month:not([disabled]), #cal-prev-month:not([disabled])'
      );
    }

    function closeDatePopover({ returnFocus = true } = {}) {
      if (!datePopover || datePopover.classList.contains('hidden')) return;

      datePopover.classList.add('hidden');
      if (dateBackdrop) {
        dateBackdrop.classList.add('hidden');
      }
      document.body.classList.remove('overflow-hidden');
      if (dateTrigger) {
        dateTrigger.setAttribute('aria-expanded', 'false');
      }

      if (returnFocus && lastCalendarInvoker && typeof lastCalendarInvoker.focus === 'function') {
        lastCalendarInvoker.focus();
      }
    }

    function renderHeroCalendar(focusSelector) {
      if (!calendarContainer) return;
      calendarContainer.innerHTML = generateCalendarGrid({
        year: activeCalYear,
        month: activeCalMonth,
        selectedDateStr: store.state.resultsState?.selectedDate || undefined,
        onDaySelectAttr: 'data-hero-calendar-day'
      });
      bindHeroCalendarEvents();

      const focusTarget = getCalendarFocusTarget(focusSelector);
      if (focusTarget) {
        setTimeout(() => focusTarget.focus(), 0);
      }
    }

    function openDatePopover(invoker = dateTrigger) {
      if (!datePopover) return;

      const isMobileSheet = window.innerWidth < 640;

      lastCalendarInvoker = invoker || dateTrigger || null;
      datePopover.setAttribute('aria-modal', isMobileSheet ? 'true' : 'false');
      datePopover.classList.remove('hidden');
      if (dateBackdrop) {
        dateBackdrop.classList.toggle('hidden', !isMobileSheet);
      }
      if (isMobileSheet) {
        document.body.classList.add('overflow-hidden');
      }
      if (dateTrigger) {
        dateTrigger.setAttribute('aria-expanded', 'true');
      }
      renderHeroCalendar();
    }

    function bindHeroCalendarEvents() {
      if (!calendarContainer) return;

      // Previous month
      const prevBtn = calendarContainer.querySelector('#cal-prev-month');
      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (prevBtn.disabled) return; // window boundary: backward blocked
          activeCalMonth--;
          if (activeCalMonth < 0) {
            activeCalMonth = 11;
            activeCalYear--;
          }
          renderHeroCalendar('#cal-prev-month');
        });
      }

      // Next month
      const nextBtn = calendarContainer.querySelector('#cal-next-month');
      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (nextBtn.disabled) return; // window boundary: forward bounded
          activeCalMonth++;
          if (activeCalMonth > 11) {
            activeCalMonth = 0;
            activeCalYear++;
          }
          renderHeroCalendar('#cal-next-month');
        });
      }

      // Day Selection
      calendarContainer.querySelectorAll('[data-hero-calendar-day]').forEach(dayBtn => {
        dayBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const dateStr = e.currentTarget.getAttribute('data-date-str');
          if (dateStr) {
            store.updateResultsState({ selectedDate: dateStr });
            updateWhenDisplay();
            closeDatePopover();
          }
        });
      });
    }

    if (dateTrigger && datePopover) {
      dateTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (datePopover.classList.contains('hidden')) {
          openDatePopover(e.currentTarget);
          return;
        }

        closeDatePopover({ returnFocus: false });
      });
    }

    if (dateClose && datePopover) {
      dateClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeDatePopover();
      });
    }

    if (dateBackdrop) {
      dateBackdrop.addEventListener('click', () => {
        closeDatePopover({ returnFocus: false });
      });
    }

    if (datePopover) {
      datePopover.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
          closeDatePopover();
        }
      });
    }

    // Close calendar popover on outside click
    document.addEventListener('click', (e) => {
      if (datePopover && !datePopover.classList.contains('hidden')) {
        if (!datePopover.contains(e.target) && !dateTrigger.contains(e.target)) {
          closeDatePopover({ returnFocus: false });
        }
      }
    });

    // Collection card target clicks
    containerElement.querySelectorAll('[data-collection-target]').forEach(card => {
      card.addEventListener('click', (e) => {
        const targetId = e.currentTarget.getAttribute('data-collection-target');
        const target = RESTAURANTS_DATA.find(r => r.id === targetId);
        if (target) {
          store.setSelectedRestaurant(target);
        }
      });
    });
  }


  window.YoyakuComponents.renderDiscoverView = renderDiscoverView;
  window.YoyakuComponents.attachDiscoverViewEvents = attachDiscoverViewEvents;
})();
