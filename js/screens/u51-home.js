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

    const dateVal = state.resultsState?.selectedDate || todayDisplayStr();
    const timeVal = state.resultsState?.time || DEFAULT_TIME;

    // Guests state — default 2 guests
    const rawParty = state.resultsState?.partySize;
    const guestsValue = rawParty && rawParty !== 'All Sizes' ? String(rawParty) : '2';

    // Compute Popularity Ranking (#1, #2, #3, #4) based on rating & reviewCount
    const popularRestaurants = [...RESTAURANTS_DATA].sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount));

    // Hot Promotions qualification: venues with active offers
    const promoRestaurants = RESTAURANTS_DATA.filter((restaurant) => hasPromoCardOffer(restaurant));

    return `
      <div class="space-y-8 sm:space-y-10 lg:space-y-14 pb-12 sm:pb-16">

        <!-- 1. HERO SECTION (extra/homePage.md Section 6, 7, 8, 9) -->
        <section class="relative pt-2 sm:pt-4 pb-2">
          <!-- Subtle warm backdrop ambience -->
          <div class="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
            <div class="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#F3DFD5]/40 to-transparent rounded-full blur-3xl pointer-events-none"></div>
          </div>

          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Headline & Hero Image Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center mb-5 sm:mb-6">
              <!-- Left: Headline & Supporting Copy -->
              <div class="lg:col-span-7 text-left space-y-2.5 sm:space-y-3.5">
                <h1 class="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#241A18] leading-[1.14] tracking-tight">
                  <span>${isMm ? 'ကောင်းမွန်သော အစားအစာ၊' : 'Great food.'}</span><br />
                  <span class="text-[#9B1C25]">${isMm ? 'ပျော်ရွှင်ဖွယ် အခိုက်အတန့်များ။' : 'Good moments.'}</span>
                </h1>
                <p class="font-body text-sm sm:text-base text-[#6D6561] max-w-xl leading-relaxed">
                  ${isMm
                    ? 'ရန်ကုန်မြို့၏ အကောင်းဆုံး စားသောက်ဆိုင်များကို ရှာဖွေပြီး စက္ကန့်ပိုင်းအတွင်း စားပွဲဝိုင်း စိုတ်ယူလိုက်ပါ။'
                    : 'Discover the best restaurants and book your table in seconds.'}
                </p>
              </div>

              <!-- Right: Premium Warm Photographic Restaurant Image -->
              <div class="lg:col-span-5 relative">
                <div class="relative h-44 sm:h-52 lg:h-60 rounded-2xl sm:rounded-3xl overflow-hidden border border-[#E8DDD0] shadow-sm bg-[#231916]">
                  <img
                    src="assets/images/homepage_image.png"
                    alt="Warm restaurant dining atmosphere"
                    loading="eager"
                    referrerpolicy="no-referrer"
                    onerror="this.onerror=null; this.src='assets/images/seeds.jpg';"
                    class="w-full h-full object-cover object-center"
                  />
                  <!-- Soft fade into warm cream background -->
                  <div class="absolute inset-0 bg-gradient-to-t from-[#FBF4E8]/50 via-transparent to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>

            <!-- Search, Compact Booking Controls, & Primary CTA -->
            <div class="max-w-4xl mx-auto">
              <form id="hero-search-form" class="space-y-3">
                <!-- 2. Prominent Search Field (Section 7) -->
                <div class="relative bg-[#FFFDFC] border border-[#E8DDD0] focus-within:border-[#9B1C25] focus-within:ring-2 focus-within:ring-[#9B1C25]/15 rounded-2xl px-4 py-3.5 sm:py-4 flex items-center gap-3 transition-all shadow-2xs">
                  <span class="material-symbols-outlined text-[#9B1C25] text-2xl shrink-0">search</span>
                  <div class="flex-1 min-w-0 text-left">
                    <input
                      type="text"
                      id="hero-keyword-input"
                      aria-label="${isMm ? 'စားသောက်ဆိုင်၊ အစားအစာ သို့မဟုတ် ဟင်းလျာဖြင့် ရှာဖွေပါ' : 'Search restaurants, cuisines or dishes...'}"
                      placeholder="${isMm ? 'စားသောက်ဆိုင်များ၊ အစားအစာ သို့မဟုတ် ဟင်းလျာများ ရှာဖွေပါ...' : 'Search restaurants, cuisines or dishes...'}"
                      value="${state.searchKeyword || ''}"
                      class="w-full bg-transparent font-body text-sm sm:text-base font-semibold text-[#241A18] placeholder:text-[#8A7B76] placeholder:font-normal focus:outline-none"
                    />
                  </div>
                  ${state.searchKeyword ? `
                    <button type="button" id="hero-keyword-clear" class="text-[#8A7B76] hover:text-[#241A18] p-1 cursor-pointer">
                      <span class="material-symbols-outlined text-base">close</span>
                    </button>
                  ` : ''}
                </div>

                <!-- 3. Compact Booking Controls Row (Section 8) -->
                <div class="relative bg-[#FFFDFC] border border-[#E8DDD0] rounded-2xl grid grid-cols-4 divide-x divide-[#E8DDD0] shadow-2xs overflow-visible">
                  <!-- Stored hidden inputs for form submission -->
                  <input type="hidden" id="hero-date-select" value="${dateVal}" />
                  <input type="hidden" id="hero-time-select" value="${timeVal}" />
                  <input type="hidden" id="hero-guests-select" value="${guestsValue}" />

                  <!-- Item 1: Date -->
                  <button
                    type="button"
                    id="hero-date-trigger"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    class="px-2 sm:px-3 py-3 sm:py-3.5 flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-[#F8EFE5] active:bg-[#F3DFD5] transition-colors rounded-l-2xl cursor-pointer text-left min-w-0"
                    title="${isMm ? 'ရက်စွဲ ရွေးချယ်ပါ' : 'Select Date'}"
                  >
                    <span class="material-symbols-outlined text-lg sm:text-xl text-[#9B1C25] shrink-0">calendar_today</span>
                    <div class="min-w-0">
                      <span class="block text-[10px] font-label font-bold text-[#8A7B76] uppercase tracking-wider leading-none mb-0.5 hidden sm:block">${isMm ? 'ရက်စွဲ' : 'Date'}</span>
                      <span id="hero-date-display" class="font-label text-xs sm:text-sm font-bold text-[#241A18] truncate block">
                        ${formatDateDisplay(dateVal, isMm)}
                      </span>
                    </div>
                  </button>

                  <!-- Item 2: Time -->
                  <button
                    type="button"
                    id="hero-time-trigger"
                    aria-haspopup="listbox"
                    aria-expanded="false"
                    class="px-2 sm:px-3 py-3 sm:py-3.5 flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-[#F8EFE5] active:bg-[#F3DFD5] transition-colors cursor-pointer text-left min-w-0"
                    title="${isMm ? 'အချိန် ရွေးချယ်ပါ' : 'Select Time'}"
                  >
                    <span class="material-symbols-outlined text-lg sm:text-xl text-[#9B1C25] shrink-0">schedule</span>
                    <div class="min-w-0">
                      <span class="block text-[10px] font-label font-bold text-[#8A7B76] uppercase tracking-wider leading-none mb-0.5 hidden sm:block">${isMm ? 'အချိန်' : 'Time'}</span>
                      <span id="hero-time-display" class="font-label text-xs sm:text-sm font-bold text-[#241A18] truncate block">
                        ${formatTime12(timeVal)}
                      </span>
                    </div>
                  </button>

                  <!-- Item 3: Guests -->
                  <button
                    type="button"
                    id="hero-guests-trigger"
                    aria-haspopup="listbox"
                    aria-expanded="false"
                    class="px-2 sm:px-3 py-3 sm:py-3.5 flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-[#F8EFE5] active:bg-[#F3DFD5] transition-colors cursor-pointer text-left min-w-0"
                    title="${isMm ? 'ဧည့်သည် အရေအတွက်' : 'Guests'}"
                  >
                    <span class="material-symbols-outlined text-lg sm:text-xl text-[#9B1C25] shrink-0">group</span>
                    <div class="min-w-0">
                      <span class="block text-[10px] font-label font-bold text-[#8A7B76] uppercase tracking-wider leading-none mb-0.5 hidden sm:block">${isMm ? 'ဧည့်သည်' : 'Guests'}</span>
                      <span id="hero-guests-display" class="font-label text-xs sm:text-sm font-bold text-[#241A18] truncate block">
                        ${guestsValue} ${isMm ? 'ဦး' : (guestsValue === '1' ? 'Guest' : 'Guests')}
                      </span>
                    </div>
                  </button>

                  <!-- Item 4: Filters -->
                  <button
                    type="button"
                    id="hero-open-conditions-btn"
                    class="px-2 sm:px-3 py-3 sm:py-3.5 flex items-center justify-center gap-1.5 sm:gap-2 hover:bg-[#F8EFE5] active:bg-[#F3DFD5] transition-colors rounded-r-2xl cursor-pointer text-left min-w-0"
                    title="${isMm ? 'သတ်မှတ်ချက်များ' : 'Filters'}"
                  >
                    <span class="material-symbols-outlined text-lg sm:text-xl text-[#9B1C25] shrink-0">tune</span>
                    <div class="min-w-0">
                      <span class="block text-[10px] font-label font-bold text-[#8A7B76] uppercase tracking-wider leading-none mb-0.5 hidden sm:block">${isMm ? 'ရွေးချယ်မှု' : 'Filters'}</span>
                      <span class="font-label text-xs sm:text-sm font-bold text-[#241A18] truncate block">
                        ${isMm ? 'စစ်ထုတ်ရန်' : 'Filters'}
                      </span>
                    </div>
                  </button>

                  <!-- Calendar Popover & Backdrop -->
                  <div id="hero-calendar-backdrop" class="hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs transition-opacity sm:hidden"></div>
                  <div
                    id="hero-calendar-popover"
                    class="hidden fixed sm:absolute inset-x-4 bottom-4 sm:bottom-auto sm:inset-x-auto sm:top-full sm:left-0 sm:mt-2 z-50 bg-[#FFFDFC] border border-[#E8DDD0] rounded-3xl sm:rounded-2xl shadow-2xl p-4 w-auto sm:w-80 max-w-[92vw] animate-fadeIn"
                    role="dialog"
                    aria-modal="true"
                    aria-label="${isMm ? 'ရက်စွဲ ရွေးချယ်ပါ' : 'Select Reservation Date'}"
                  >
                    <div class="flex items-center justify-between pb-2 mb-2 border-b border-[#E8DDD0]">
                      <span class="font-label text-xs font-bold text-[#9B1C25] uppercase tracking-wider">
                        ${isMm ? 'ရက်စွဲ ရွေးချယ်ပါ' : 'Select Date'}
                      </span>
                      <button
                        type="button"
                        id="hero-calendar-close"
                        class="w-7 h-7 rounded-full bg-[#F8EFE5] hover:bg-[#F3DFD5] text-[#241A18] flex items-center justify-center cursor-pointer transition-colors"
                        aria-label="Close"
                      >
                        <span class="material-symbols-outlined text-sm">close</span>
                      </button>
                    </div>
                    <div id="hero-calendar-container"></div>
                  </div>

                  <!-- Time Popover -->
                  <div
                    id="hero-time-popover"
                    class="hidden absolute top-full left-0 right-0 sm:left-1/4 sm:right-auto sm:w-64 mt-2 z-50 bg-[#FFFDFC] border border-[#E8DDD0] rounded-2xl shadow-xl p-3 animate-fadeIn"
                    role="listbox"
                    aria-label="${isMm ? 'အချိန် ရွေးချယ်ပါ' : 'Select Time Slot'}"
                  >
                    <div class="px-2 py-1 text-[10px] font-label font-bold text-[#9B1C25] uppercase tracking-wider border-b border-[#F0E6DA] mb-2">
                      ${isMm ? 'အချိန် ရွေးချယ်ပါ' : 'Select Time'}
                    </div>
                    <div class="grid grid-cols-4 gap-1.5">
                      ${HERO_TIME_SLOTS.map(t => {
                        const isSel = t === timeVal;
                        return `
                          <button
                            type="button"
                            data-hero-time-option="${t}"
                            class="py-2 px-1 rounded-xl font-label text-xs font-bold text-center transition-all cursor-pointer ${
                              isSel
                                ? 'bg-[#9B1C25] text-white shadow-xs'
                                : 'bg-[#F8EFE5] text-[#241A18] hover:bg-[#F3DFD5]'
                            }"
                          >
                            ${formatTime12(t)}
                          </button>
                        `;
                      }).join('')}
                    </div>
                  </div>

                  <!-- Guests Popover -->
                  <div
                    id="hero-guests-popover"
                    class="hidden absolute top-full right-0 sm:right-1/4 sm:w-56 mt-2 z-50 bg-[#FFFDFC] border border-[#E8DDD0] rounded-2xl shadow-xl p-2.5 animate-fadeIn"
                    role="listbox"
                    aria-label="${isMm ? 'ဧည့်သည် အရေအတွက်' : 'Select Guest Count'}"
                  >
                    <div class="px-2 py-1 text-[10px] font-label font-bold text-[#9B1C25] uppercase tracking-wider border-b border-[#F0E6DA] mb-1">
                      ${isMm ? 'ဧည့်သည် အရေအတွက်' : 'Party Size'}
                    </div>
                    <div class="grid grid-cols-4 gap-1">
                      ${['1', '2', '3', '4', '5', '6', '7', '8+'].map(g => {
                        const isSel = String(guestsValue) === g;
                        return `
                          <button
                            type="button"
                            data-hero-guests-option="${g}"
                            class="py-2 rounded-xl font-label text-xs font-bold transition-all cursor-pointer text-center ${
                              isSel
                                ? 'bg-[#9B1C25] text-white shadow-xs'
                                : 'bg-[#F8EFE5] text-[#241A18] hover:bg-[#F3DFD5]'
                            }"
                          >
                            ${g}
                          </button>
                        `;
                      }).join('')}
                    </div>
                  </div>
                </div>

                <!-- 4. Primary CTA Button (Section 9) -->
                <button
                  type="submit"
                  id="hero-submit-btn"
                  class="w-full h-14 sm:h-16 bg-[#9B1C25] hover:bg-[#840f16] active:scale-[0.98] text-white font-headline text-base sm:text-lg font-bold rounded-2xl shadow-[0_8px_20px_-4px_rgba(155,28,37,0.35)] hover:shadow-[0_12px_24px_-4px_rgba(155,28,37,0.45)] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer group"
                >
                  <span>${isMm ? 'စားပွဲဝိုင်းများ ရှာဖွေပါ' : 'Find Tables'}</span>
                  <span class="material-symbols-outlined text-lg sm:text-xl group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </form>
            </div>
          </div>
        </section>


        <!-- 2. EXPLORE BY CUISINE (extra/homePage.md Section 10) -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div class="flex justify-between items-end mb-4 sm:mb-6">
            <div>
              <h2 class="font-headline text-2xl sm:text-3xl font-extrabold text-[#241A18]">
                ${isMm ? 'အစားအစာ အမျိုးအစားများ' : 'Explore by Cuisine'}
              </h2>
              <p class="font-body text-xs sm:text-sm text-[#6D6561] mt-0.5 hidden sm:block">
                ${isMm ? 'မိမိနှစ်သက်ရာ အရသာအတိုင်း စားသောက်ဆိုင်များကို ရွေးချယ်ရှာဖွေပါ' : 'Discover Yangon’s diverse gastronomy from heritage teahouses to coastal seafood.'}
              </p>
            </div>
            <button
              data-nav-tab="resultlist"
              class="shrink-0 whitespace-nowrap font-label text-xs sm:text-sm font-bold text-[#9B1C25] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>${isMm ? 'အားလုံးကြည့်ရန်' : 'View All'}</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <!-- Compact Horizontal Cards -->
          <div class="mobile-horizontal-scroll flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-6">
            ${[
              { name: 'Burmese', nameMM: 'မြန်မာ အစားအစာ', count: '24 Venues', countMM: '၂၄ ဆိုင်', img: 'assets/images/gilded_fork.jpg' },
              { name: 'Teahouse & Snacks', nameMM: 'လက်ဖက်ရည်ဆိုင်', count: '18 Venues', countMM: '၁၈ ဆိုင်', img: 'assets/images/rangoon.jpg' },
              { name: 'Western', nameMM: 'ဥရောပ ဟင်းလျာ', count: '12 Venues', countMM: '၁၂ ဆိုင်', img: 'assets/images/lopera.jpg' },
              { name: 'Seafood', nameMM: 'ပင်လယ်စာ', count: '16 Venues', countMM: '၁၆ ဆိုင်', img: 'assets/images/seeds.jpg' },
              { name: 'Japanese', nameMM: 'ဂျပန် အစားအစာ', count: '14 Venues', countMM: '၁၄ ဆိုင်', img: 'assets/images/gekko.jpg' },
              { name: 'Chinese & Dim Sum', nameMM: 'တရုတ် / ဒင်းဆမ်း', count: '20 Venues', countMM: '၂၀ ဆိုင်', img: 'assets/images/padonmar.jpg' }
            ].map(c => `
              <button
                type="button"
                data-cuisine-filter="${c.name}"
                class="shrink-0 w-[130px] sm:w-[150px] lg:w-auto p-3.5 rounded-2xl bg-[#FFFDFC] border border-[#E8DDD0] hover:border-[#9B1C25] hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col items-center text-center gap-2 group text-left"
              >
                <div class="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 border-[#E8DDD0] group-hover:border-[#9B1C25] transition-colors shrink-0 bg-[#FBF4E8]">
                  <img
                    src="${c.img}"
                    alt="${c.name}"
                    loading="lazy"
                    referrerpolicy="no-referrer"
                    onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div class="min-w-0 w-full">
                  <span class="block font-headline text-xs sm:text-sm font-bold text-[#241A18] truncate group-hover:text-[#9B1C25] transition-colors">
                    ${isMm ? c.nameMM : c.name}
                  </span>
                  <span class="block font-label text-[11px] text-[#6D6561] mt-0.5">
                    ${isMm ? c.countMM : c.count}
                  </span>
                </div>
              </button>
            `).join('')}
          </div>
        </section>


        <!-- 3. EXCLUSIVE OFFER PROMOTION BANNER (extra/homePage.md Section 11) -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div class="bg-[#FFFDFC] border border-[#E8DDD0] rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 overflow-hidden relative">
            <div class="flex-1 space-y-2 z-10 min-w-0">
              <div class="inline-flex items-center gap-1.5 bg-[#F3DFD5] text-[#9B1C25] px-2.5 py-0.5 rounded-full font-label text-[10px] font-extrabold uppercase tracking-wider">
                <span class="material-symbols-outlined text-xs">local_activity</span>
                <span>${isMm ? 'သီးသန့် ပရိုမိုးရှင်း အစီအစဉ်' : 'EXCLUSIVE OFFER'}</span>
              </div>
              <h3 class="font-headline text-lg sm:text-xl md:text-2xl font-extrabold text-[#241A18] leading-tight">
                ${isMm ? 'KBZPay & WavePay ဖြင့် စိုတ်ယူပါက ၂၀% လျှော့ဈေး' : '20% Off Weekend Dining Pass with KBZPay'}
              </h3>
              <p class="font-body text-xs sm:text-sm text-[#6D6561] leading-relaxed max-w-xl">
                ${isMm ? 'ချက်ချင်း စားပွဲဝိုင်း လျှော့ဈေးရရှိရန် ငွေပေးချေရာတွင် ကုဒ် YOYAKUKBZ50K အသုံးပြုပါ။' : 'Apply code YOYAKUKBZ50K at checkout for instant table discount.'}
              </p>
              <div class="pt-1 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  data-promo-copy-code="YOYAKUKBZ50K"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F8EFE5] border border-[#E8DDD0] hover:border-[#9B1C25] font-mono text-xs font-bold text-[#241A18] cursor-pointer transition-colors group/code"
                  title="${isMm ? 'ဘောက်ချာကုဒ် ကူးယူရန် နှိပ်ပါ' : 'Click to copy voucher code'}"
                >
                  <span class="text-[#9B1C25]">CODE:</span>
                  <span>YOYAKUKBZ50K</span>
                  <span class="material-symbols-outlined text-xs text-[#6D6561] group-hover/code:text-[#9B1C25]">content_copy</span>
                </button>
                <span class="text-xs font-label text-[#607A62] font-semibold flex items-center gap-1">
                  <span class="material-symbols-outlined text-xs">verified</span>
                  <span>${isMm ? 'အချိန်အကန့်အသတ်ဖြင့်' : 'Limited Time Offer'}</span>
                </span>
              </div>
            </div>

            <!-- Integrated Food Image & CTA Button -->
            <div class="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end shrink-0 z-10 pt-2 md:pt-0 border-t md:border-t-0 border-[#E8DDD0]">
              <div class="hidden sm:block w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden shrink-0 border border-[#E8DDD0] shadow-2xs bg-[#231916]">
                <img
                  src="assets/images/gilded_fork.jpg"
                  alt="Exclusive Dining Offer"
                  loading="lazy"
                  referrerpolicy="no-referrer"
                  class="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                data-nav-tab="mypage"
                class="w-full sm:w-auto bg-[#9B1C25] hover:bg-[#840f16] active:scale-[0.98] text-white px-5 py-3 rounded-xl sm:rounded-2xl font-label text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
              >
                <span>${isMm ? 'ကူပွန်ယူမည်' : 'Claim Voucher'}</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>


        <!-- 4. TRENDING VENUES (extra/homePage.md Section 12 & 13) -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div class="flex justify-between items-end mb-4 sm:mb-6">
            <div>
              <h2 class="font-headline text-2xl sm:text-3xl font-extrabold text-[#241A18]">
                ${isMm ? 'ရေပန်းစားသော စားသောက်ဆိုင်များ' : 'Trending Venues'}
              </h2>
              <p class="font-body text-xs sm:text-sm text-[#6D6561] mt-0.5 hidden sm:block">
                ${isMm ? 'ဧည့်သည်များ အကြိုက်ဆုံးနှင့် လူကြိုက်အများဆုံး ထိပ်တန်း စားသောက်ဆိုင်များ' : 'Yangon’s highest-rated dining spots curated based on guest reviews and popularity.'}
              </p>
            </div>
            <button
              data-nav-tab="resultlist"
              class="shrink-0 whitespace-nowrap font-label text-xs sm:text-sm font-bold text-[#9B1C25] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>${isMm ? 'အားလုံးကြည့်ရန်' : 'View All'}</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div class="mobile-horizontal-scroll -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 flex gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-4">
            ${popularRestaurants.slice(0, 4).map(r => renderTrendingCard(r, state)).join('')}
          </div>
        </section>


        <!-- 5. CURATED COLLECTIONS (extra/homePage.md Section 15) -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-4 sm:mb-6 gap-3">
            <div>
              <h2 class="font-headline text-2xl sm:text-3xl font-extrabold text-[#241A18]">
                ${isMm ? 'အထူး စုစည်းမှုများ' : 'Curated Collections'}
              </h2>
              <p class="font-body text-xs sm:text-sm text-[#6D6561] mt-0.5 hidden sm:block">
                ${isMm ? 'အစီအစဉ်အမျိုးမျိုးအတွက် အထူးသီးသန့် ရွေးချယ်ပေးထားသော စားသောက်ဆိုင်များ' : 'Intimate settings, romantic spots, and breathtaking skyline views.'}
              </p>
            </div>
            <button
              data-nav-tab="curated"
              class="self-start sm:self-end inline-flex items-center gap-1.5 font-label text-xs sm:text-sm font-bold text-[#9B1C25] hover:underline cursor-pointer group"
            >
              <span>${isMm ? 'စုစည်းမှု အားလုံး ကြည့်ရန်' : 'View All Collections'}</span>
              <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
          </div>

          <!-- Mobile & Tablet Snap Carousel -->
          <div class="lg:hidden mobile-horizontal-scroll -mx-4 px-4 sm:-mx-6 sm:px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 pt-1">
            ${COLLECTIONS_DATA.slice(0, 3).map((col, idx) => `
              <div
                data-collection-target="${col.targetRestaurantId}"
                class="shrink-0 w-[280px] sm:w-[320px] h-[350px] sm:h-[370px] snap-start relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col justify-between p-5 text-left text-white border border-white/15"
              >
                <img
                  src="${col.image}"
                  alt="${col.title}"
                  referrerpolicy="no-referrer"
                  loading="lazy"
                  onerror="this.onerror=null; this.src='assets/images/seeds_lakefront.jpg';"
                  class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20"></div>

                <div class="relative z-10 flex items-center justify-between gap-2">
                  <span class="inline-flex items-center gap-1 ${idx === 0 ? 'bg-[#D08E1C] text-[#241A18]' : idx === 1 ? 'bg-[#9B1C25] text-white' : 'bg-[#607A62] text-white'} px-3 py-1 rounded-full font-label text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                    ${isMm ? col.categoryTagMM : col.categoryTag}
                  </span>
                  <span class="bg-black/60 backdrop-blur-md border border-white/20 text-white font-label text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full">
                    ${idx === 0 ? (isMm ? '၆ ဆိုင်' : '6 Venues') : idx === 1 ? (isMm ? '၄ ဆိုင်' : '4 Tables') : (isMm ? '၅ ဆိုင်' : '5 Venues')}
                  </span>
                </div>

                <div class="relative z-10 space-y-1.5">
                  <div class="text-[#f5d592] font-label text-[11px] font-bold uppercase tracking-wider">
                    ${isMm ? 'အယ်ဒီတာ့ ရွေးချယ်မှု' : 'Curator’s Issue'}
                  </div>
                  <h4 class="font-headline text-lg sm:text-xl font-bold text-white leading-tight">
                    ${isMm ? col.titleMM : col.title}
                  </h4>
                  <p class="font-body text-xs text-white/85 line-clamp-2 leading-relaxed">
                    ${isMm ? col.subtitleMM : col.subtitle}
                  </p>
                  <div class="pt-1 flex items-center gap-1.5 text-xs font-label font-bold text-[#f5d592] group-hover:translate-x-1 transition-transform">
                    <span>${isMm ? 'လမ်းညွှန် ကြည့်ရှုမည်' : 'Explore Guide'}</span>
                    <span class="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Desktop Bento Grid (>= lg) -->
          <div class="hidden lg:grid lg:grid-cols-12 gap-6">
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
                  class="lg:col-span-7 relative h-80 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between p-7 text-left text-white border border-white/10"
                >
                  <img
                    src="${heroCol.image}"
                    alt="${heroCol.title}"
                    referrerpolicy="no-referrer"
                    loading="lazy"
                    onerror="this.onerror=null; this.src='assets/images/seeds_lakefront.jpg';"
                    class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/20"></div>

                  <div class="relative z-10 flex items-center justify-between gap-2">
                    <span class="inline-flex items-center gap-1.5 bg-[#D08E1C] text-[#241A18] px-3.5 py-1 rounded-full font-label text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                      <span class="material-symbols-outlined text-xs leading-none">stars</span>
                      ${isMm ? heroCol.categoryTagMM : heroCol.categoryTag}
                    </span>
                    <span class="bg-black/60 backdrop-blur-md border border-white/20 text-white font-label text-xs font-bold px-3 py-1 rounded-full">
                      ${isMm ? '၆ ဆိုင် ပါဝင်ပါသည်' : '6 Venues Included'}
                    </span>
                  </div>

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
                    <div class="pt-2 flex items-center gap-2 text-sm font-label font-bold text-[#f5d592] group-hover:translate-x-1 transition-transform">
                      <span>${isMm ? 'စားသောက်ဆိုင်များ ကြည့်ရှုရန်' : 'Explore Curated Dining Guide'}</span>
                      <span class="material-symbols-outlined text-sm">arrow_forward</span>
                    </div>
                  </div>
                </div>
              `;
            })()}

            <div class="lg:col-span-5 flex flex-col gap-6">
              ${COLLECTIONS_DATA.slice(1, 3).map((col, idx) => `
                <div
                  data-collection-target="${col.targetRestaurantId}"
                  class="relative flex-1 min-h-[175px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col justify-between p-5 text-left text-white border border-white/10"
                >
                  <img
                    src="${col.image}"
                    alt="${col.title}"
                    referrerpolicy="no-referrer"
                    loading="lazy"
                    onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';"
                    class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>

                  <div class="relative z-10 flex items-center justify-between gap-2">
                    <span class="inline-flex items-center gap-1 ${idx === 0 ? 'bg-[#9B1C25]' : 'bg-[#607A62]'} text-white px-2.5 py-0.5 rounded-full font-label text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                      ${isMm ? col.categoryTagMM : col.categoryTag}
                    </span>
                    <span class="bg-black/60 backdrop-blur-md border border-white/20 text-white font-label text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                      ${idx === 0 ? (isMm ? '၄ ဆိုင်' : '4 Tables') : (isMm ? '၅ ဆိုင်' : '5 Venues')}
                    </span>
                  </div>

                  <div class="relative z-10 space-y-1">
                    <h4 class="font-headline text-lg font-bold text-white leading-snug">
                      ${isMm ? col.titleMM : col.title}
                    </h4>
                    <p class="font-body text-xs text-white/80 line-clamp-1">
                      ${isMm ? col.subtitleMM : col.subtitle}
                    </p>
                    <div class="pt-1 flex items-center gap-1 text-[11px] font-label font-bold ${idx === 0 ? 'text-amber-200' : 'text-emerald-200'} group-hover:translate-x-1 transition-transform">
                      <span>${isMm ? 'ကြည့်ရှုရန်' : 'Explore Guide'}</span>
                      <span class="material-symbols-outlined text-xs">arrow_forward</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>


        <!-- 6. HOT PROMOTIONS (extra/homePage.md Section 14) -->
        ${
          promoRestaurants.length > 0
            ? `
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative">
          <div class="flex justify-between items-end mb-4 sm:mb-6">
            <div>
              <h2 class="font-headline text-2xl sm:text-3xl font-extrabold text-[#241A18] flex items-center gap-2">
                <span>${isMm ? 'အထူးပရိုမိုးရှင်း စားသောက်ဆိုင်များ' : 'Hot Promotions'}</span>
                <span class="material-symbols-outlined text-[#9B1C25] text-2xl sm:text-3xl">local_fire_department</span>
              </h2>
              <p class="font-body text-xs sm:text-sm text-[#6D6561] mt-0.5 hidden sm:block">
                ${isMm ? 'အချိန်အကန့်အသတ်ဖြင့် ရရှိနိုင်သော အထူးလျှော့ဈေးနှင့် ပရိုမိုးရှင်း စားသောက်ဆိုင်များ' : 'Limited-time exclusive dining deals, promotional offers, and special table discounts.'}
              </p>
            </div>
            <button
              data-nav-tab="resultlist"
              class="shrink-0 whitespace-nowrap font-label text-xs sm:text-sm font-bold text-[#9B1C25] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>${isMm ? 'အားလုံးကြည့်ရန်' : 'View All'}</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div class="relative group/hotpromo-carousel">
            <button
              id="hotpromo-float-prev"
              aria-label="Scroll left"
              title="Scroll left"
              class="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#9B1C25] text-[#241A18] hover:text-white border border-[#E8DDD0] shadow-lg items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none"
            >
              <span class="material-symbols-outlined text-xl leading-none select-none">chevron_left</span>
            </button>

            <div
              id="hotpromo-scroll-container"
              class="horizontal-scroll-row mobile-horizontal-scroll scroll-all flex flex-nowrap items-stretch overflow-x-auto overflow-y-hidden scroll-smooth mx-0 px-0 gap-4 sm:gap-5 lg:gap-6 pt-1 pb-4"
            >
              ${promoRestaurants.map(restaurant => renderPromoCard(restaurant, state)).join('')}
            </div>

            <button
              id="hotpromo-float-next"
              aria-label="Scroll right"
              title="Scroll right"
              class="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#9B1C25] text-[#241A18] hover:text-white border border-[#E8DDD0] shadow-lg items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none"
            >
              <span class="material-symbols-outlined text-xl leading-none select-none">chevron_right</span>
            </button>
          </div>
        </section>
        `
            : ''
        }


        <!-- 7. TONIGHT'S OPEN TABLES (Live Availability Strip) -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div class="flex justify-between items-end mb-4 sm:mb-6">
            <div>
              <div class="inline-flex items-center gap-1.5 text-[11px] font-label font-bold text-[#9B1C25] uppercase tracking-wider mb-1">
                <span class="material-symbols-outlined text-sm">bolt</span>
                <span>${isMm ? 'တစ်ချက်နှိပ်ရုံဖြင့် စိုတ်ယူပါ' : 'Live availability · One tap to book'}</span>
              </div>
              <h2 class="font-headline text-2xl sm:text-3xl font-extrabold text-[#241A18]">
                ${isMm ? 'ယနေ့ည ဗလာစားပွဲဝိုင်းများ' : 'Tonight’s Open Tables'}
              </h2>
            </div>
            <button
              data-nav-tab="resultlist"
              class="shrink-0 whitespace-nowrap font-label text-xs sm:text-sm font-bold text-[#9B1C25] hover:underline flex items-center gap-1 cursor-pointer"
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

    // Hero Search Form Submission
    const form = containerElement.querySelector('#hero-search-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const kw = containerElement.querySelector('#hero-keyword-input')?.value || '';
        const time = containerElement.querySelector('#hero-time-select')?.value || DEFAULT_TIME;
        const partySize = containerElement.querySelector('#hero-guests-select')?.value || '2';
        const date = containerElement.querySelector('#hero-date-select')?.value || store.state.resultsState?.selectedDate || todayDisplayStr();

        store.updateResultsState({
          keyword: kw,
          time,
          selectedDate: date,
          partySize: partySize === 'All' ? 'All Sizes' : partySize,
        });
        store.setSearchKeyword(kw);
        store.setActiveTab('resultlist');
      });
    }

    // Keyword Input Clear Button
    const keywordClearBtn = containerElement.querySelector('#hero-keyword-clear');
    const keywordInput = containerElement.querySelector('#hero-keyword-input');
    if (keywordClearBtn && keywordInput) {
      keywordClearBtn.addEventListener('click', () => {
        keywordInput.value = '';
        keywordInput.focus();
        store.setSearchKeyword('');
        keywordClearBtn.remove();
      });
    }

    // Hero Open Search Conditions Button
    const heroOpenCondBtn = containerElement.querySelector('#hero-open-conditions-btn');
    if (heroOpenCondBtn) {
      heroOpenCondBtn.addEventListener('click', () => {
        const kw = containerElement.querySelector('#hero-keyword-input')?.value || '';
        const time = containerElement.querySelector('#hero-time-select')?.value || DEFAULT_TIME;
        const partySize = containerElement.querySelector('#hero-guests-select')?.value || '2';
        const date = containerElement.querySelector('#hero-date-select')?.value || store.state.resultsState?.selectedDate || todayDisplayStr();

        store.openSearchConditions({
          keyword: kw,
          time,
          selectedDate: date,
          partySize: partySize === 'All' ? 'All Sizes' : partySize,
        });
      });
    }

    // Time Popover Logic
    const timeTrigger = containerElement.querySelector('#hero-time-trigger');
    const timePopover = containerElement.querySelector('#hero-time-popover');
    const timeDisplay = containerElement.querySelector('#hero-time-display');
    const timeInput = containerElement.querySelector('#hero-time-select');

    const closeTimePopover = () => {
      if (!timePopover) return;
      timePopover.classList.add('hidden');
      if (timeTrigger) timeTrigger.setAttribute('aria-expanded', 'false');
    };

    if (timeTrigger && timePopover) {
      timeTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        closeDatePopover();
        closeGuestsPopover();
        const isHidden = timePopover.classList.contains('hidden');
        if (isHidden) {
          timePopover.classList.remove('hidden');
          timeTrigger.setAttribute('aria-expanded', 'true');
        } else {
          closeTimePopover();
        }
      });
    }

    containerElement.querySelectorAll('[data-hero-time-option]').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = e.currentTarget.getAttribute('data-hero-time-option');
        if (timeInput) timeInput.value = val;
        if (timeDisplay) timeDisplay.textContent = formatTime12(val);
        store.updateResultsState({ time: val });
        containerElement.querySelectorAll('[data-hero-time-option]').forEach(b => {
          const isAct = b.getAttribute('data-hero-time-option') === val;
          b.className = `py-2 px-1 rounded-xl font-label text-xs font-bold text-center transition-all cursor-pointer ${
            isAct ? 'bg-[#9B1C25] text-white shadow-xs' : 'bg-[#F8EFE5] text-[#241A18] hover:bg-[#F3DFD5]'
          }`;
        });
        closeTimePopover();
      });
    });

    // Guests Popover Logic
    const guestsTrigger = containerElement.querySelector('#hero-guests-trigger');
    const guestsPopover = containerElement.querySelector('#hero-guests-popover');
    const guestsDisplay = containerElement.querySelector('#hero-guests-display');
    const guestsInput = containerElement.querySelector('#hero-guests-select');

    const closeGuestsPopover = () => {
      if (!guestsPopover) return;
      guestsPopover.classList.add('hidden');
      if (guestsTrigger) guestsTrigger.setAttribute('aria-expanded', 'false');
    };

    if (guestsTrigger && guestsPopover) {
      guestsTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        closeDatePopover();
        closeTimePopover();
        const isHidden = guestsPopover.classList.contains('hidden');
        if (isHidden) {
          guestsPopover.classList.remove('hidden');
          guestsTrigger.setAttribute('aria-expanded', 'true');
        } else {
          closeGuestsPopover();
        }
      });
    }

    containerElement.querySelectorAll('[data-hero-guests-option]').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = e.currentTarget.getAttribute('data-hero-guests-option');
        const isMmNow = store.state.currentLanguage === 'MM';
        if (guestsInput) guestsInput.value = val;
        if (guestsDisplay) {
          guestsDisplay.textContent = `${val} ${isMmNow ? 'ဦး' : (val === '1' ? 'Guest' : 'Guests')}`;
        }
        store.updateResultsState({ partySize: val });
        containerElement.querySelectorAll('[data-hero-guests-option]').forEach(b => {
          const isAct = b.getAttribute('data-hero-guests-option') === val;
          b.className = `py-2 rounded-xl font-label text-xs font-bold transition-all cursor-pointer text-center ${
            isAct ? 'bg-[#9B1C25] text-white shadow-xs' : 'bg-[#F8EFE5] text-[#241A18] hover:bg-[#F3DFD5]'
          }`;
        });
        closeGuestsPopover();
      });
    });

    // Close time & guests popovers on outside click or Escape
    document.addEventListener('click', (e) => {
      if (timePopover && !timePopover.classList.contains('hidden') && !timePopover.contains(e.target) && !timeTrigger?.contains(e.target)) {
        closeTimePopover();
      }
      if (guestsPopover && !guestsPopover.classList.contains('hidden') && !guestsPopover.contains(e.target) && !guestsTrigger?.contains(e.target)) {
        closeGuestsPopover();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeTimePopover();
        closeGuestsPopover();
      }
    });

    // Cuisine Card Filters (Section 10)
    containerElement.querySelectorAll('[data-cuisine-filter]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cuisine = e.currentTarget.getAttribute('data-cuisine-filter');
        store.updateResultsState({ cuisine: cuisine || 'All Cuisines', keyword: '' });
        store.setActiveTab('resultlist');
      });
    });

    // Promo Code Copy (Section 11 & 14)
    containerElement.querySelectorAll('[data-promo-copy-code]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = e.currentTarget.getAttribute('data-promo-copy-code');
        if (code) {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code).catch(() => {});
          }
          const isMmNow = store.state.currentLanguage === 'MM';
          store.showToast(isMmNow ? `ဘောက်ချာကုဒ် ${code} ကူးယူပြီးပါပြီ!` : `Promo code ${code} copied to clipboard!`);
        }
      });
    });

    // Navigation Tab Triggers ([data-nav-tab])
    containerElement.querySelectorAll('[data-nav-tab]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = e.currentTarget.getAttribute('data-nav-tab');
        if (tab) {
          store.clearSelectedReservationDetail();
          store.setSelectedRestaurant(null);
          store.setActiveTab(tab);
        }
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
