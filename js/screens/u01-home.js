(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;
  const { RESTAURANTS_DATA, CUISINES_DATA, COLLECTIONS_DATA, DINING_OCCASIONS_DATA = [] } = window.YoyakuData;
  const { renderRestaurantCard, attachRestaurantCardEvents, renderImageGradient, renderFavoriteButton, renderRatingBadge, renderCuisineTagOnImage, renderCuisineTag, renderPromoTag, renderTrendingCard, renderPromoCard, hasPromoCardOffer } = window.YoyakuComponents;
  const { generateCalendarGrid } = window.YoyakuComponents;






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

  function renderDiscoverView(state) {
    const isMm = state.currentLanguage === 'MM';

    const currentAreaVal = state.resultsState?.area || 'All Areas';
    const currentCuisineVal = state.resultsState?.cuisine || 'All Cuisines';

    const selectedAreaObj = HERO_LOCATIONS.find(l => l.value === currentAreaVal) || HERO_LOCATIONS[0];
    const selectedCuisineObj = HERO_CUISINES.find(c => c.value === currentCuisineVal) || HERO_CUISINES[0];

    const selectedAreaLabel = isMm ? selectedAreaObj.labelMm : selectedAreaObj.labelEn;
    const selectedCuisineLabel = isMm ? selectedCuisineObj.labelMm : selectedCuisineObj.labelEn;

    // Compute Popularity Ranking (#1, #2, #3, #4) based on rating & reviewCount
    const popularRestaurants = [...RESTAURANTS_DATA].sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount));

    // Hot Promotions qualification: prefer structured promotions[] and fall back to legacy offerTag.
    const promoRestaurants = RESTAURANTS_DATA.filter((restaurant) => hasPromoCardOffer(restaurant));

    return `
      <div class="space-y-8 sm:space-y-10 lg:space-y-16 pb-10 sm:pb-12 lg:pb-16">

        <!-- HERO SECTION (LUXURY EDITORIAL CONCIERGE & SHOWCASE) -->
        <section class="relative pt-3 sm:pt-6 pb-6 sm:pb-10 overflow-hidden">
          <!-- Ambient Luxury Lighting Glows -->
          <div class="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#840f16]/8 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
          <div class="absolute top-1/3 -right-20 w-80 h-80 bg-[#C59B27]/6 rounded-full blur-3xl pointer-events-none -z-10"></div>

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
            <div class="max-w-5xl mx-auto">
              <div class="bg-[#FFFDFC] border border-[#E5D9CC] rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-[0_20px_50px_-20px_rgba(132,15,22,0.12)] transition-all">
                <form id="hero-search-form" class="space-y-3 md:space-y-0 md:flex md:items-center md:gap-2.5">

                  <!-- 1. Search Query Input -->
                  <div class="flex-1 bg-[#FAF6F0] hover:bg-white focus-within:bg-white border border-[#E8DDD0] focus-within:border-[#840f16] focus-within:ring-2 focus-within:ring-[#840f16]/10 rounded-xl sm:rounded-2xl px-3.5 py-2.5 sm:py-3 flex items-center gap-2.5 transition-all">
                    <span class="material-symbols-outlined text-[#840f16] text-xl shrink-0">search</span>
                    <div class="min-w-0 flex-1 text-left">
                      <label for="hero-keyword-input" class="block text-[10px] font-label font-bold text-[#8A7B76] uppercase tracking-wider leading-none mb-0.5">${isMm ? 'ဆိုင်အမည် / ဟင်းလျာ' : 'Restaurant or Dish'}</label>
                      <input
                        type="text"
                        id="hero-keyword-input"
                        aria-label="${isMm ? 'ဆိုင်အမည် သို့မဟုတ် ဟင်းလျာဖြင့် ရှာဖွေပါ' : 'Search by restaurant or dish'}"
                        placeholder="${isMm ? 'ဥပမာ- The Gilded Fork, ရှမ်းခေါက်ဆွဲ...' : 'e.g. The Gilded Fork, Shan Noodle, Sushi...'}"
                        value="${state.searchKeyword || ''}"
                        class="w-full bg-transparent font-body text-xs sm:text-sm font-semibold text-[#231916] placeholder:text-[#9B8C87] placeholder:font-normal focus:outline-none"
                      />
                    </div>
                  </div>

                  <!-- 2. Location Area Custom Selector -->
                  <div class="relative w-full md:w-52 lg:w-56" id="hero-area-dropdown-container">
                    <input type="hidden" id="hero-area-select" value="${currentAreaVal}" />
                    <button
                      type="button"
                      id="hero-area-trigger"
                      aria-haspopup="listbox"
                      aria-expanded="false"
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
                            data-hero-area-option="${loc.value}"
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
                  <div class="relative w-full md:w-52 lg:w-56" id="hero-cuisine-dropdown-container">
                    <input type="hidden" id="hero-cuisine-select" value="${currentCuisineVal}" />
                    <button
                      type="button"
                      id="hero-cuisine-trigger"
                      aria-haspopup="listbox"
                      aria-expanded="false"
                      class="w-full bg-[#FAF6F0] hover:bg-white focus:bg-white border border-[#E8DDD0] hover:border-[#840f16]/40 focus:border-[#840f16] rounded-xl sm:rounded-2xl px-3.5 py-2.5 sm:py-3 flex items-center justify-between gap-2 transition-all cursor-pointer text-left"
                    >
                      <div class="flex items-center gap-2.5 min-w-0">
                        <span class="material-symbols-outlined text-[#840f16] text-lg shrink-0">${selectedCuisineObj.icon}</span>
                        <div class="min-w-0">
                          <span class="block text-[10px] font-label font-bold text-[#8A7B76] uppercase tracking-wider leading-none mb-0.5">${isMm ? 'အစားအစာ အမျိုးအစား' : 'Cuisine Type'}</span>
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
                            data-hero-cuisine-option="${c.value}"
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

                  <!-- 4. Primary Action Button -->
                  <div class="w-full md:w-auto shrink-0 pt-1 md:pt-0">
                    <button
                      type="submit"
                      class="w-full md:w-auto bg-[#840f16] hover:bg-[#6e0c12] active:scale-[0.98] text-white py-3 sm:py-3.5 px-7 rounded-xl sm:rounded-2xl font-headline text-xs sm:text-sm font-bold shadow-[0_8px_20px_-4px_rgba(132,15,22,0.35)] hover:shadow-[0_12px_24px_-4px_rgba(132,15,22,0.45)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      <span class="material-symbols-outlined text-lg sm:text-xl">search</span>
                      <span class="whitespace-nowrap">${isMm ? 'ရှာဖွေပါ' : 'Find Tables'}</span>
                      <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
                    </button>
                  </div>

                </form>
              </div>
            </div>

          </div>
        </section>

        <!-- EXPLORE BY DINING OCCASIONS & VIBES -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative">
          <div class="flex justify-between items-end mb-4 lg:mb-6">
            <div>
              <div class="inline-flex items-center gap-1.5 text-[11px] font-label font-bold text-[#840f16] uppercase tracking-wider mb-1">
                <span class="material-symbols-outlined text-sm">auto_awesome</span>
                <span>${isMm ? 'ရွေးချယ်ထားသော စားသောက်မှု အခိုက်အတန့်များ' : 'Curated Dining Atmospheres'}</span>
              </div>
              <h2 class="font-headline text-2xl sm:text-3xl font-extrabold text-[#231916]">
                ${isMm ? 'စားသောက်မှု အခိုက်အတန့်နှင့် ပတ်ဝန်းကျင်များ' : 'Explore by Experience & Occasion'}
              </h2>
              <p class="font-body text-xs sm:text-sm text-[#58413f] mt-1 hidden lg:block">
                ${isMm ? 'နေဝင်ဆည်းဆာ ကန်စပ်ညစာ၊ ရိုမန်းတစ် စားပွဲဝိုင်း သို့မဟုတ် VIP သီးသန့်ခန်းများ စိတ်ကြိုက်ရှာဖွေပါ' : 'From serene sunset lakefronts to intimate candlelit tables and executive VIP suites.'}
              </p>
            </div>
            <div class="flex items-center gap-3">
              <button
                data-nav-tab="resultlist"
                class="font-label text-xs font-bold text-[#840f16] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>${isMm ? 'အားလုံးကြည့်ရန်' : 'View All'}</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          <!-- Occasions Carousel Container with Floating Scroll Buttons -->
          <div class="relative group/occasion-carousel">
            <!-- Left Pressable Scroll Arrow -->
            <button
              id="occasion-float-prev"
              aria-label="Scroll left"
              title="Scroll left"
              class="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#840f16] text-[#231916] hover:text-white border border-[#EADFD1] shadow-lg items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none"
            >
              <span class="material-symbols-outlined text-xl leading-none select-none">chevron_left</span>
            </button>

            <!-- Scrollable Occasions Row -->
            <div
              id="occasion-scroll-container"
              class="horizontal-scroll-row flex flex-nowrap items-stretch overflow-x-auto overflow-y-hidden scroll-smooth -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 gap-3.5 sm:gap-4 pb-2 pt-1"
            >
              ${DINING_OCCASIONS_DATA.map(occ => `
                <button
                  type="button"
                  data-occasion-filter="${occ.id}"
                  data-filter-keyword="${occ.filterKeyword}"
                  data-filter-area="${occ.filterArea || 'All Areas'}"
                  class="group shrink-0 snap-start w-64 sm:w-72 md:w-80 relative rounded-3xl overflow-hidden text-left border border-[#E8DDD0] hover:border-[#840f16]/60 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col justify-between hover:-translate-y-1 aspect-[16/10] bg-[#1C1311]"
                >
                  <!-- Background Image with Ambient Gradient Overlays -->
                  <img
                    src="${occ.image}"
                    alt="${occ.name}"
                    referrerpolicy="no-referrer"
                    loading="lazy"
                    onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';"
                    class="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#1C1311]/95 via-[#1C1311]/50 to-black/30 group-hover:from-[#1C1311]/90 transition-colors duration-500"></div>

                  <!-- Top Bar: Category Icon Badge & Venue Count -->
                  <div class="relative z-10 p-3.5 sm:p-4 flex items-center justify-between">
                    <span class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/25 shadow-xs">
                      <span class="material-symbols-outlined text-base">${occ.icon}</span>
                    </span>
                    <span class="inline-flex items-center gap-1 bg-[#1C1311]/70 backdrop-blur-md text-white/90 font-label text-[11px] font-bold px-2.5 py-1 rounded-full border border-white/15 shadow-xs">
                      <span>${occ.count}</span>
                      <span class="text-[10px] text-white/70 font-normal">${isMm ? 'ဆိုင်များ' : 'Venues'}</span>
                    </span>
                  </div>

                  <!-- Bottom Bar: Title, Atmosphere Description & Direct Prompt -->
                  <div class="relative z-10 p-3.5 sm:p-4 text-white">
                    <h3 class="font-headline text-base sm:text-lg font-bold text-white group-hover:text-[#F3D5B5] transition-colors leading-tight">
                      ${isMm ? occ.nameMM : occ.name}
                    </h3>
                    <p class="font-body text-[11px] sm:text-xs text-white/80 mt-1 line-clamp-1">
                      ${isMm ? occ.subtitleMM : occ.subtitle}
                    </p>
                    <div class="mt-2.5 flex items-center gap-1 text-[11px] font-label font-bold text-[#F3D5B5] group-hover:text-white transition-colors">
                      <span>${isMm ? 'စားပွဲဝိုင်းများ ကြည့်မည်' : 'Explore Tables'}</span>
                      <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
                    </div>
                  </div>
                </button>
              `).join('')}
            </div>

            <!-- Right Pressable Scroll Arrow -->
            <button
              id="occasion-float-next"
              aria-label="Scroll right"
              title="Scroll right"
              class="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#840f16] text-[#231916] hover:text-white border border-[#EADFD1] shadow-lg items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none"
            >
              <span class="material-symbols-outlined text-xl leading-none select-none">chevron_right</span>
            </button>
          </div>
        </section>

        <!-- PROMOTION & ANNOUNCEMENT BANNERS (ကြေညာချက်ဘန်နာများ - 1 Slidable Row with Indicators) -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="relative group/promo-carousel">
            <!-- Left Pressable Scroll Arrow -->
            <button
              id="promo-float-prev"
              aria-label="Previous promo banner"
              title="Previous banner"
              class="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#840f16] text-[#231916] hover:text-white border border-[#EADFD1] shadow-lg items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none"
            >
              <span class="material-symbols-outlined text-xl leading-none select-none">chevron_left</span>
            </button>

            <div
              id="promo-scroll-container"
              class="horizontal-scroll-row flex flex-nowrap items-stretch overflow-x-auto overflow-y-hidden scroll-smooth -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 gap-3.5 sm:gap-4 pb-2 pt-1"
            >
              <!-- Banner 1: KBZPay / WavePay Special Offer -->
              <div class="shrink-0 w-[calc(88vw-24px)] sm:w-[500px] lg:w-[580px] snap-start relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#840f16] to-[#a52a2a] p-5 sm:p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border border-[#840f16]/30">
                <div class="space-y-1.5 z-10 text-left min-w-0">
                  <div class="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-0.5 rounded-full text-[10px] font-label font-bold uppercase tracking-wider text-amber-200">
                    <span class="material-symbols-outlined text-xs">local_activity</span>
                    <span>${isMm ? 'ပရိုမိုးရှင်း အထူးအစီအစဉ်' : 'Exclusive Dining Offer'}</span>
                  </div>
                  <h3 class="font-headline text-base sm:text-lg lg:text-xl font-extrabold leading-tight">
                    ${isMm ? 'KBZPay & WavePay ဖြင့် စိုတ်ယူပါက ၂၀% လျှော့ဈေး' : '20% Off Weekend Dining Pass with KBZPay'}
                  </h3>
                  <p class="font-body text-xs text-white/80 line-clamp-2 sm:line-clamp-none">
                    ${isMm ? 'ယခုပတ်အတွင်း စားပွဲဝိုင်း စိုတ်ယူသူများအတွက် ရရှိနိုင်သော ကူပွန်' : 'Apply voucher code YOYAKUKBZ50K at checkout for instant table discount.'}
                  </p>
                </div>
                <button data-nav-tab="mypage" class="shrink-0 bg-white text-[#840f16] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-label text-xs font-bold hover:bg-amber-100 transition-colors shadow-md cursor-pointer z-10 whitespace-nowrap">
                  ${isMm ? 'ကူပွန်ယူမည်' : 'Claim Voucher'}
                </button>
                <div class="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
              </div>

              <!-- Banner 2: Instant VIP Table Pass Info -->
              <div class="shrink-0 w-[calc(88vw-24px)] sm:w-[500px] lg:w-[580px] snap-start relative overflow-hidden rounded-3xl bg-[#1c1311] p-5 sm:p-6 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 border border-[#362723]">
                <div class="space-y-1.5 z-10 text-left min-w-0">
                  <div class="inline-flex items-center gap-1.5 bg-[#d08e1c]/20 px-3 py-0.5 rounded-full text-[10px] font-label font-bold uppercase tracking-wider text-[#d08e1c]">
                    <span class="material-symbols-outlined text-xs">verified</span>
                    <span>${isMm ? 'စနစ်ဆိုင်ရာ အသိပေးချက်' : 'System Announcement'}</span>
                  </div>
                  <h3 class="font-headline text-base sm:text-lg lg:text-xl font-extrabold text-[#e8dfd8] leading-tight">
                    ${isMm ? 'ဗဟန်း၊ ဒဂုံ၊ မြို့ထဲတွင် Instant Pass စတင်ပါပြီ' : 'Instant Table Confirmation Enabled in Yangon'}
                  </h3>
                  <p class="font-body text-xs text-[#bcaaa4] line-clamp-2 sm:line-clamp-none">
                    ${isMm ? 'စောင့်ဆိုင်းရန် မလိုဘဲ စားပွဲဝိုင်းများကို ချက်ချင်းအတည်ပြုပေးပါသည်' : 'No phone calls needed. Receive instant QR entry pass right on your phone.'}
                  </p>
                </div>
                <button data-nav-tab="resultlist" class="shrink-0 bg-[#d08e1c] text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl font-label text-xs font-bold hover:bg-[#b07616] transition-colors shadow-md cursor-pointer z-10 whitespace-nowrap">
                  ${isMm ? 'စိုတ်ယူရန်' : 'Book Table'}
                </button>
              </div>
            </div>

            <!-- Right Pressable Scroll Arrow -->
            <button
              id="promo-float-next"
              aria-label="Next promo banner"
              title="Next banner"
              class="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#840f16] text-[#231916] hover:text-white border border-[#EADFD1] shadow-lg items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none"
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

        <!-- CURATED COLLECTIONS -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <!-- Header Centered -->
          <div class="max-w-2xl mx-auto mb-6 lg:mb-10 text-center">
            <h2 class="font-headline text-3xl sm:text-4xl font-extrabold text-[#231916]">
              ${isMm ? 'အထူး စုစည်းမှုများ' : 'Curated Collections'}
            </h2>
            <p class="font-body text-sm sm:text-base text-[#58413f] mt-2 hidden lg:block">
              ${isMm ? 'အစီအစဉ်အမျိုးမျိုးအတွက် အထူးသီးသန့် ရွေးချယ်ပေးထားသော စားသောက်ဆိုင်များ' : 'Hand-picked selections by our editors for every special occasion.'}
            </p>
          </div>

          <!-- Cards Grid / Horizontal Scroll for Mobile & Tablet -->
          <div class="mobile-horizontal-scroll -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 pb-4 lg:pb-0">
            ${COLLECTIONS_DATA.map(col => `
              <div
                data-collection-target="${col.targetRestaurantId}"
                class="shrink-0 w-[270px] h-[320px] sm:w-[320px] sm:h-[360px] lg:w-auto lg:h-[380px] snap-start group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-end p-4 sm:p-5 lg:p-6 text-left text-white border border-white/10"
              >
                <img
                  src="${col.image}"
                  alt="${col.title}"
                  referrerpolicy="no-referrer"
                  loading="lazy"
                  onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';"
                  class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <!-- Dark Gradient Overlay -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                <!-- Card Content -->
                <div class="relative z-10 space-y-2">
                  <div>
                    ${renderCuisineTag(isMm ? col.categoryTagMM : col.categoryTag, true)}
                  </div>
                  <h3 class="font-headline text-lg sm:text-xl lg:text-2xl font-extrabold text-white leading-tight">
                    ${isMm ? col.titleMM : col.title}
                  </h3>
                  <p class="font-body text-xs sm:text-sm text-white/90 line-clamp-2 leading-relaxed">
                    ${isMm ? col.subtitleMM : col.subtitle}
                  </p>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Centered Bottom Pill Button -->
          <div class="mt-10 text-center">
            <button
              data-nav-tab="curated"
              class="inline-flex items-center gap-2 px-7 py-3 rounded-full border border-[#EADFD1] bg-[#FBF3E2] hover:bg-[#840f16] hover:text-white hover:border-[#840f16] transition-all text-[#840f16] font-label text-sm font-bold shadow-sm hover:shadow-md cursor-pointer group"
            >
              <span>${isMm ? 'စုစည်းမှုများ အားလုံး ကြည့်မည်' : 'View All Collections'}</span>
              <span class="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </button>
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
              class="font-label text-xs font-bold text-[#840f16] hover:underline flex items-center gap-1 cursor-pointer"
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
        <section class="max-w-7xl mx-auto px-[max(1rem,env(safe-area-inset-left))] sm:px-6 lg:px-8 text-left">
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

          <div class="mobile-horizontal-scroll scroll-all mx-0 px-0 gap-4 sm:gap-5 lg:gap-6 pt-3 pb-4">
            ${promoRestaurants.map(restaurant => renderPromoCard(restaurant, state)).join('')}
          </div>
        </section>
        `
            : ''
        }

      </div>
    `;
  }

  function attachDiscoverViewEvents(containerElement = document) {
    attachRestaurantCardEvents(containerElement);

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
          partySize: partySize === 'All' ? 'All Sizes' : partySize,
        });
        store.setSearchKeyword(kw);
        store.setActiveTab('resultlist');
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

    const closeAreaPopover = () => {
      if (!areaPopover) return;
      areaPopover.classList.add('hidden');
      if (areaTrigger) areaTrigger.setAttribute('aria-expanded', 'false');
      if (areaChevron) areaChevron.classList.remove('rotate-180');
    };

    const closeCuisinePopover = () => {
      if (!cuisinePopover) return;
      cuisinePopover.classList.add('hidden');
      if (cuisineTrigger) cuisineTrigger.setAttribute('aria-expanded', 'false');
      if (cuisineChevron) cuisineChevron.classList.remove('rotate-180');
    };

    if (areaTrigger && areaPopover) {
      areaTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        closeCuisinePopover();
        const isHidden = areaPopover.classList.contains('hidden');
        if (isHidden) {
          areaPopover.classList.remove('hidden');
          areaTrigger.setAttribute('aria-expanded', 'true');
          if (areaChevron) areaChevron.classList.add('rotate-180');
        } else {
          closeAreaPopover();
        }
      });
    }

    if (cuisineTrigger && cuisinePopover) {
      cuisineTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        closeAreaPopover();
        const isHidden = cuisinePopover.classList.contains('hidden');
        if (isHidden) {
          cuisinePopover.classList.remove('hidden');
          cuisineTrigger.setAttribute('aria-expanded', 'true');
          if (cuisineChevron) cuisineChevron.classList.add('rotate-180');
        } else {
          closeCuisinePopover();
        }
      });
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

    // Close area & cuisine popovers on outside click
    document.addEventListener('click', (e) => {
      if (areaPopover && !areaPopover.classList.contains('hidden') && !areaPopover.contains(e.target) && !areaTrigger?.contains(e.target)) {
        closeAreaPopover();
      }
      if (cuisinePopover && !cuisinePopover.classList.contains('hidden') && !cuisinePopover.contains(e.target) && !cuisineTrigger?.contains(e.target)) {
        closeCuisinePopover();
      }
    });

    // Close area & cuisine popovers on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeAreaPopover();
        closeCuisinePopover();
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

    // Occasion horizontal slide controls (floating buttons)
    const occasionScrollContainer = containerElement.querySelector('#occasion-scroll-container');
    const occasionFloatPrev = containerElement.querySelector('#occasion-float-prev');
    const occasionFloatNext = containerElement.querySelector('#occasion-float-next');

    const updateOccasionScrollButtons = () => {
      if (!occasionScrollContainer) return;
      const { scrollLeft, scrollWidth, clientWidth } = occasionScrollContainer;
      const isAtStart = scrollLeft <= 10;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;

      if (occasionFloatPrev) {
        occasionFloatPrev.style.opacity = isAtStart ? '0' : '1';
        occasionFloatPrev.style.pointerEvents = isAtStart ? 'none' : 'auto';
      }
      if (occasionFloatNext) {
        occasionFloatNext.style.opacity = isAtEnd ? '0' : '1';
        occasionFloatNext.style.pointerEvents = isAtEnd ? 'none' : 'auto';
      }
    };

    const handleOccasionScrollLeft = (e) => {
      if (e) e.preventDefault();
      if (occasionScrollContainer) {
        occasionScrollContainer.scrollBy({ left: -320, behavior: 'smooth' });
      }
    };

    const handleOccasionScrollRight = (e) => {
      if (e) e.preventDefault();
      if (occasionScrollContainer) {
        occasionScrollContainer.scrollBy({ left: 320, behavior: 'smooth' });
      }
    };

    if (occasionFloatPrev) occasionFloatPrev.addEventListener('click', handleOccasionScrollLeft);
    if (occasionFloatNext) occasionFloatNext.addEventListener('click', handleOccasionScrollRight);

    if (occasionScrollContainer) {
      occasionScrollContainer.addEventListener('scroll', updateOccasionScrollButtons, { passive: true });
      setTimeout(updateOccasionScrollButtons, 50);
    }

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
          promoScrollContainer.scrollBy({ left: -340, behavior: 'smooth' });
        }
      });
    }

    if (promoFloatNext) {
      promoFloatNext.addEventListener('click', (e) => {
        e.preventDefault();
        if (promoScrollContainer) {
          promoScrollContainer.scrollBy({ left: 340, behavior: 'smooth' });
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

    // Hero Calendar View Popover Logic
    const dateTrigger = containerElement.querySelector('#hero-date-trigger');
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

      lastCalendarInvoker = invoker || dateTrigger || null;
      datePopover.classList.remove('hidden');
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
            if (dateDisplay) dateDisplay.textContent = dateStr;
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
