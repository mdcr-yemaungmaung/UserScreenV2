(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;
  const { RESTAURANTS_DATA, CUISINES_DATA, COLLECTIONS_DATA } = window.YoyakuData;
  const { renderRestaurantCard, attachRestaurantCardEvents, renderImageGradient, renderFavoriteButton, renderRatingBadge, renderCuisineTagOnImage, renderCuisineTag, renderPromoTag, renderTrendingCard, renderPromoCard } = window.YoyakuComponents;
  const { generateCalendarGrid } = window.YoyakuComponents;






  function renderDiscoverView(state) {
    const isMm = state.currentLanguage === 'MM';

    // Compute Popularity Ranking (#1, #2, #3, #4) based on rating & reviewCount
    const popularRestaurants = [...RESTAURANTS_DATA].sort((a, b) => (b.rating * b.reviewCount) - (a.rating * a.reviewCount));

    // Hot Promotions qualification (feature 005): only shops with a non-empty promotion offer
    const promoRestaurants = RESTAURANTS_DATA.filter(r => r.offerTag && r.offerTag.trim() !== '');

    return `
      <div class="space-y-8 sm:space-y-10 lg:space-y-16 pb-10 sm:pb-12 lg:pb-16">

        <!-- HERO SEARCH SECTION -->
        <section class="relative pt-4 sm:pt-6 pb-2 sm:pb-4 overflow-hidden">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              <!-- Left Hero Content & Search Glass Panel -->
              <div class="lg:col-span-7 space-y-6 text-left">
                <div class="hidden lg:inline-flex items-center gap-2 bg-[#840f16]/10 text-[#840f16] px-4 py-1.5 rounded-full font-label text-xs font-bold uppercase tracking-widest border border-[#840f16]/20">
                  <span class="material-symbols-outlined text-sm">restaurant</span>
                  <span>${isMm ? 'မည်သည့် ဘတ်ဂျက်မဆို စားပွဲဝိုင်းများကို အလွယ်တကူ စိုတ်ယူပါ' : 'Table Bookings For Every Budget & Occasion'}</span>
                </div>

                <h1 class="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#231916] leading-[1.15]">
                  ${
                    isMm
                      ? 'ဒီနေ့ ဘာ <span class="text-[#840f16] relative inline-block">စားချင်ပါသလဲ။</span>'
                      : 'What are you <span class="text-[#840f16] relative inline-block">craving today?</span>'
                  }
                </h1>

                <p class="hidden lg:block font-body text-base sm:text-lg text-[#58413f] max-w-2xl leading-relaxed font-medium">
                  ${
                    isMm
                      ? 'ရန်ကုန်မြို့၏ နာမည်ကြီး လက်ဖက်ရည်ဆိုင်များ၊ မိသားစု စားသောက်ဆိုင်များနှင့် သီးသန့် အဆင့်မြင့် စားသောက်ဆိုင်များတွင် စားပွဲဝိုင်းများကို အလွယ်တကူ ချက်ချင်း စိုတ်ယူလိုက်ပါ။'
                      : 'Reserve your table instantly — from local teahouses and casual family eateries to romantic lakefronts and fine dining.'
                  }
                </p>

                <!-- Glass Multi-Parameter Search Panel -->
                <div class="glass-panel p-4 sm:p-6 rounded-3xl space-y-4 border border-[#EADFD1] shadow-2xl">
                  <form id="hero-search-form" class="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">

                    <!-- Keyword Search Input -->
                    <div class="sm:col-span-12 bg-[#FFF8F6] border border-[#EADFD1] focus-within:border-[#840f16] rounded-2xl p-3 flex items-center gap-2">
                      <span class="material-symbols-outlined text-[#840f16]">search</span>
                      <input
                        type="text"
                        id="hero-keyword-input"
                        placeholder="${isMm ? 'ဆိုင်အမည် သို့မဟုတ် သော့ချက်စာလုံး (Keywords)...' : 'Search by venue name or keywords...'}"
                        value="${state.searchKeyword || ''}"
                        class="w-full bg-transparent font-body text-xs sm:text-sm text-[#231916] focus:outline-none"
                      />
                    </div>

                    <!-- Area Dropdown (နေရာဒေသ) -->
                    <div class="sm:col-span-6 bg-[#FFF8F6] border border-[#EADFD1] rounded-2xl p-2.5 flex items-center gap-2">
                      <span class="material-symbols-outlined text-[#840f16] text-lg">location_on</span>
                      <select id="hero-area-select" class="w-full bg-transparent font-label text-xs sm:text-sm text-[#231916] focus:outline-none cursor-pointer">
                        <option value="All Areas">${isMm ? 'နေရာဒေသ (အားလုံး)' : 'All Areas'}</option>
                        <option value="Bahan Township">Bahan Township (ဗဟန်း)</option>
                        <option value="Dagon Township">Dagon Township (ဒဂုံ)</option>
                        <option value="Yangon Downtown">Yangon Downtown (မြို့ထဲ)</option>
                        <option value="Inya Lake Waterfront">Inya Lake Waterfront (အင်းလျား)</option>
                        <option value="Ahlone Township">Ahlone Township (အလုံ)</option>
                      </select>
                    </div>

                    <!-- Cuisine Genre Dropdown (အစားအစာအမျိုးအစား) -->
                    <div class="sm:col-span-6 bg-[#FFF8F6] border border-[#EADFD1] rounded-2xl p-2.5 flex items-center gap-2">
                      <span class="material-symbols-outlined text-[#840f16] text-lg">restaurant_menu</span>
                      <select id="hero-cuisine-select" class="w-full bg-transparent font-label text-xs sm:text-sm text-[#231916] focus:outline-none cursor-pointer">
                        <option value="All Cuisines">${isMm ? 'အစားအစာအမျိုးအစား (အားလုံး)' : 'All Cuisine Genres'}</option>
                        <option value="Burmese">Burmese (မြန်မာအစားအစာ)</option>
                        <option value="Teahouse & Snacks">Teahouse & Snacks (လက်ဖက်ရည်ဆိုင်)</option>
                        <option value="Japanese">Japanese (ဂျပန်)</option>
                        <option value="Casual Dining">Casual Dining (မိသားစု)</option>
                        <option value="European">European (ဥရောပ)</option>
                        <option value="French">French Fine Dining (ပြင်သစ်)</option>
                      </select>
                    </div>

                    <!-- Date Selector with Calendar View Popover -->
                    <div class="sm:col-span-5 relative">
                      <button
                        type="button"
                        id="hero-date-trigger"
                        class="w-full bg-[#FFF8F6] border border-[#EADFD1] focus:border-[#840f16] rounded-2xl p-2.5 flex items-center justify-between gap-2 text-left cursor-pointer hover:border-[#840f16] transition-colors"
                      >
                        <div class="flex items-center gap-2 min-w-0">
                          <span class="material-symbols-outlined text-[#840f16] text-lg shrink-0">calendar_month</span>
                          <span id="hero-date-display" class="font-label text-xs sm:text-sm text-[#231916] font-semibold truncate">
                            ${state.resultsState?.selectedDate || ''}
                          </span>
                        </div>
                        <span class="material-symbols-outlined text-[#8d7b75] text-sm shrink-0">expand_more</span>
                      </button>

                      <!-- Popover Calendar Grid View -->
                      <div
                        id="hero-calendar-popover"
                        class="hidden absolute bottom-full left-0 mb-2 z-50 w-72 sm:w-80 bg-[#FFF7E8] border border-[#EADFD1] rounded-3xl p-4 shadow-2xl animate-fadeIn"
                      >
                        <div class="text-xs font-label font-bold text-[#840f16] uppercase tracking-wider mb-2 flex items-center justify-between">
                          <span>${isMm ? 'ရက်စွဲ ရွေးချယ်ပါ' : 'Select Dining Date'}</span>
                          <span class="material-symbols-outlined text-sm cursor-pointer text-[#8d7b75] hover:text-[#840f16]" id="hero-calendar-close">close</span>
                        </div>
                        <div id="hero-calendar-container">
                          ${generateCalendarGrid({
                            selectedDateStr: state.resultsState?.selectedDate || undefined,
                            onDaySelectAttr: 'data-hero-calendar-day'
                          })}
                        </div>
                      </div>
                    </div>

                    <!-- Time Selector -->
                    <div class="sm:col-span-4 bg-[#FFF8F6] border border-[#EADFD1] rounded-2xl p-2.5 flex items-center gap-2">
                      <span class="material-symbols-outlined text-[#840f16] text-lg">schedule</span>
                      <select id="hero-time-select" class="w-full bg-transparent font-label text-xs sm:text-sm text-[#231916] focus:outline-none cursor-pointer">
                        <option value="18:30">6:30 PM (ညနေ)</option>
                        <option value="12:00">12:00 PM (နေ့လယ်)</option>
                        <option value="13:00">1:00 PM (နေ့လယ်)</option>
                        <option value="18:00">6:00 PM (ညနေ)</option>
                        <option value="19:00">7:00 PM (ညနေ)</option>
                        <option value="20:00">8:00 PM (ညနေ)</option>
                      </select>
                    </div>

                    <!-- Guests / Party Size Selector -->
                    <div class="sm:col-span-3 bg-[#FFF8F6] border border-[#EADFD1] rounded-2xl p-2.5 flex items-center gap-2">
                      <span class="material-symbols-outlined text-[#840f16] text-lg">group</span>
                      <select id="hero-guests-select" class="w-full bg-transparent font-label text-xs sm:text-sm text-[#231916] focus:outline-none cursor-pointer">
                        <option value="2">2 Guests</option>
                        <option value="1">1 Guest</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="6">6 Guests</option>
                        <option value="8">8+ Guests</option>
                      </select>
                    </div>

                    <!-- Submit Search CTA -->
                    <div class="sm:col-span-12 pt-1">
                      <button
                        type="submit"
                        class="w-full btn-primary py-3.5 rounded-2xl font-label text-sm font-semibold shadow-lg flex items-center justify-center gap-2 cursor-pointer group"
                      >
                        <span class="material-symbols-outlined text-lg">table_restaurant</span>
                        <span>${isMm ? 'စားပွဲဝိုင်း အသေးစိတ် ရှာဖွေမည်' : 'Search Tables'}</span>
                        <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                      </button>
                    </div>

                  </form>
                </div>

              </div>

              <!-- Right Hero Image Collage -->
              <div class="lg:col-span-5 relative hidden lg:block">
                <div class="grid grid-cols-2 gap-4">
                  <div class="space-y-4">
                    <div
                      data-card-select-id="rest-1"
                      class="collage-img h-64 rounded-3xl overflow-hidden shadow-xl border border-[#EADFD1] cursor-pointer relative group"
                    >
                      <img src="${RESTAURANTS_DATA[0].heroImage}" alt="Padonmar" referrerpolicy="no-referrer" loading="lazy" onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div class="absolute bottom-4 left-4">
                        <span class="inline-block bg-[#1c1311]/90 backdrop-blur-md text-white font-headline text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-xl shadow-md">The Gilded Fork</span>
                      </div>
                    </div>
                    <div
                      data-card-select-id="rest-3"
                      class="collage-img h-48 rounded-3xl overflow-hidden shadow-xl border border-[#EADFD1] cursor-pointer relative group"
                    >
                      <img src="${RESTAURANTS_DATA[2].heroImage}" alt="Rangoon Tea House" referrerpolicy="no-referrer" loading="lazy" onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div class="absolute bottom-4 left-4">
                        <span class="inline-block bg-[#1c1311]/90 backdrop-blur-md text-white font-headline text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-xl shadow-md">Rangoon Tea House</span>
                      </div>
                    </div>
                  </div>

                  <div class="space-y-4 pt-8">
                    <div
                      data-card-select-id="rest-2"
                      class="collage-img h-48 rounded-3xl overflow-hidden shadow-xl border border-[#EADFD1] cursor-pointer relative group"
                    >
                      <img src="${RESTAURANTS_DATA[1].heroImage}" alt="Seeds" referrerpolicy="no-referrer" loading="lazy" onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div class="absolute bottom-4 left-4">
                        <span class="inline-block bg-[#1c1311]/90 backdrop-blur-md text-white font-headline text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-xl shadow-md">Seeds Lakefront</span>
                      </div>
                    </div>
                    <div
                      data-card-select-id="rest-4"
                      class="collage-img h-64 rounded-3xl overflow-hidden shadow-xl border border-[#EADFD1] cursor-pointer relative group"
                    >
                      <img src="${RESTAURANTS_DATA[3].heroImage}" alt="L'Alchimiste" referrerpolicy="no-referrer" loading="lazy" onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                      <div class="absolute bottom-4 left-4">
                        <span class="inline-block bg-[#1c1311]/90 backdrop-blur-md text-white font-headline text-xs sm:text-sm font-bold px-3.5 py-1.5 rounded-xl shadow-md">L’Alchimiste French</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- EXPLORE BY CUISINE -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative">
          <div class="flex justify-between items-end mb-4 lg:mb-6">
            <div>
              <h2 class="font-headline text-2xl sm:text-3xl font-extrabold text-[#231916]">
                ${isMm ? 'အစားအစာ အမျိုးအစားများ' : 'Explore by Cuisine'}
              </h2>
              <p class="font-body text-xs sm:text-sm text-[#58413f] mt-1 hidden lg:block">
                ${isMm ? 'မိမိနှစ်သက်သော ဟင်းလျာအလိုက် စားသောက်ဆိုင်များကို ရွေးချယ်ပါ' : 'Select from traditional heritage recipes to contemporary international fusion.'}
              </p>
            </div>
            <div class="flex items-center gap-3">
              <!-- Slidable arrowhead navigation icons for web view -->
              <div class="hidden sm:flex items-center gap-1.5 bg-[#FBF3E2] p-1 rounded-2xl border border-[#EADFD1]">
                <button
                  id="cuisine-slide-prev"
                  aria-label="Previous cuisines"
                  class="w-8 h-8 rounded-xl bg-white hover:bg-[#840f16] text-[#231916] hover:text-white border border-[#EADFD1] hover:border-[#840f16] flex items-center justify-center transition-colors shadow-xs cursor-pointer active:scale-95"
                >
                  <span class="material-symbols-outlined text-lg leading-none select-none">chevron_left</span>
                </button>
                <button
                  id="cuisine-slide-next"
                  aria-label="Next cuisines"
                  class="w-8 h-8 rounded-xl bg-white hover:bg-[#840f16] text-[#231916] hover:text-white border border-[#EADFD1] hover:border-[#840f16] flex items-center justify-center transition-colors shadow-xs cursor-pointer active:scale-95"
                >
                  <span class="material-symbols-outlined text-lg leading-none select-none">chevron_right</span>
                </button>
              </div>

              <button
                data-nav-tab="resultlist"
                class="font-label text-xs font-bold text-[#840f16] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>${isMm ? 'အားလုံးကြည့်ရန်' : 'View All'}</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          <!-- Explore by Cuisine Carousel Container with Pressable Floating Arrow Controls -->
          <div class="relative group/cuisine-carousel">
            <!-- Left Pressable Scroll Arrow -->
            <button
              id="cuisine-float-prev"
              aria-label="Scroll left"
              title="Scroll left"
              class="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-10 h-10 rounded-full bg-white/95 hover:bg-[#840f16] text-[#231916] hover:text-white border border-[#EADFD1] shadow-lg items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 disabled:opacity-0 disabled:pointer-events-none"
            >
              <span class="material-symbols-outlined text-xl leading-none select-none">chevron_left</span>
            </button>

            <!-- Scrollable Cuisine Items Row -->
            <div
              id="cuisine-scroll-container"
              class="horizontal-scroll-row flex flex-nowrap items-center overflow-x-auto overflow-y-hidden scroll-smooth -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 gap-3 sm:gap-3.5 pb-2 pt-1"
            >
              ${CUISINES_DATA.map(c => `
                <button
                  data-cuisine-filter="${c.name}"
                  class="shrink-0 snap-start w-auto min-w-max group bg-[#FFFDFC] hover:bg-[#F8EFE5] active:scale-98 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl border border-[#E8DDD0] hover:border-[#840f16] hover:shadow-md transition-all text-left flex items-center gap-3 cursor-pointer"
                >
                  <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border border-[#EADFD1] shrink-0 shadow-xs">
                    <img src="${c.image}" alt="${c.name}" referrerpolicy="no-referrer" loading="lazy" onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div class="pr-1">
                    <div class="font-headline text-xs sm:text-sm font-bold text-[#231916] group-hover:text-[#840f16] transition-colors whitespace-nowrap">
                      ${isMm ? c.nameMM : c.name}
                    </div>
                    <div class="font-label text-[10px] sm:text-[11px] text-[#58413f] whitespace-nowrap mt-0.5">
                      ${c.count} ${isMm ? 'ဆိုင်များ' : 'Venues'}
                    </div>
                  </div>
                </button>
              `).join('')}
            </div>

            <!-- Right Pressable Scroll Arrow -->
            <button
              id="cuisine-float-next"
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


        <!-- TRENDING VENUES SECTION -->
        <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <div class="flex justify-between items-end mb-4 lg:mb-6">
            <div>
              <h2 class="font-headline text-2xl sm:text-3xl font-extrabold text-[#231916]">
                ${isMm ? 'ရေပန်းစားသော စားသောက်ဆိုင်များ' : 'Trending Venues'}
              </h2>
              <p class="font-body text-xs sm:text-sm text-[#58413f] mt-1 hidden lg:block">
                ${isMm ? 'လက်ရှိ လူကြိုက်များပြီး စိုတ်ယူမှု အများဆုံး စားသောက်ဆိုင်များ' : 'Top trending dining destinations curated dynamically based on user bookings and high ratings.'}
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
            ${popularRestaurants.slice(0, 4).map(r => renderTrendingCard(r, state, { showVenueName: true })).join('')}
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

    // Cuisine filter buttons
    containerElement.querySelectorAll('[data-cuisine-filter]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cuisine = e.currentTarget.getAttribute('data-cuisine-filter');
        store.updateResultsState({ cuisine, keyword: '' });
        store.setActiveTab('resultlist');
      });
    });

    // Cuisine horizontal slide controls (header buttons + floating buttons)
    const cuisineScrollContainer = containerElement.querySelector('#cuisine-scroll-container');
    const cuisinePrevBtn = containerElement.querySelector('#cuisine-slide-prev');
    const cuisineNextBtn = containerElement.querySelector('#cuisine-slide-next');
    const cuisineFloatPrev = containerElement.querySelector('#cuisine-float-prev');
    const cuisineFloatNext = containerElement.querySelector('#cuisine-float-next');

    const updateCuisineScrollButtons = () => {
      if (!cuisineScrollContainer) return;
      const { scrollLeft, scrollWidth, clientWidth } = cuisineScrollContainer;
      const isAtStart = scrollLeft <= 10;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;

      if (cuisineFloatPrev) {
        cuisineFloatPrev.style.opacity = isAtStart ? '0' : '1';
        cuisineFloatPrev.style.pointerEvents = isAtStart ? 'none' : 'auto';
      }
      if (cuisineFloatNext) {
        cuisineFloatNext.style.opacity = isAtEnd ? '0' : '1';
        cuisineFloatNext.style.pointerEvents = isAtEnd ? 'none' : 'auto';
      }
      if (cuisinePrevBtn) {
        cuisinePrevBtn.disabled = isAtStart;
        cuisinePrevBtn.style.opacity = isAtStart ? '0.4' : '1';
      }
      if (cuisineNextBtn) {
        cuisineNextBtn.disabled = isAtEnd;
        cuisineNextBtn.style.opacity = isAtEnd ? '0.4' : '1';
      }
    };

    const handleScrollLeft = (e) => {
      if (e) e.preventDefault();
      if (cuisineScrollContainer) {
        cuisineScrollContainer.scrollBy({ left: -280, behavior: 'smooth' });
      }
    };

    const handleScrollRight = (e) => {
      if (e) e.preventDefault();
      if (cuisineScrollContainer) {
        cuisineScrollContainer.scrollBy({ left: 280, behavior: 'smooth' });
      }
    };

    if (cuisinePrevBtn) cuisinePrevBtn.addEventListener('click', handleScrollLeft);
    if (cuisineNextBtn) cuisineNextBtn.addEventListener('click', handleScrollRight);
    if (cuisineFloatPrev) cuisineFloatPrev.addEventListener('click', handleScrollLeft);
    if (cuisineFloatNext) cuisineFloatNext.addEventListener('click', handleScrollRight);

    if (cuisineScrollContainer) {
      cuisineScrollContainer.addEventListener('scroll', updateCuisineScrollButtons, { passive: true });
      // Initialize states after paint
      setTimeout(updateCuisineScrollButtons, 50);
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

    // Anchor the view on the current month; bounds are computed inside
    // generateCalendarGrid (FR-010).
    const now = new Date();
    let activeCalYear = now.getFullYear();
    let activeCalMonth = now.getMonth();

    function renderHeroCalendar() {
      if (!calendarContainer) return;
      calendarContainer.innerHTML = generateCalendarGrid({
        year: activeCalYear,
        month: activeCalMonth,
        selectedDateStr: store.state.resultsState?.selectedDate || undefined,
        onDaySelectAttr: 'data-hero-calendar-day'
      });
      bindHeroCalendarEvents();
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
          renderHeroCalendar();
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
          renderHeroCalendar();
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
            if (datePopover) datePopover.classList.add('hidden');
          }
        });
      });
    }

    if (dateTrigger && datePopover) {
      dateTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        datePopover.classList.toggle('hidden');
        if (!datePopover.classList.contains('hidden')) {
          renderHeroCalendar();
        }
      });
    }

    if (dateClose && datePopover) {
      dateClose.addEventListener('click', (e) => {
        e.stopPropagation();
        datePopover.classList.add('hidden');
      });
    }

    // Close calendar popover on outside click
    document.addEventListener('click', (e) => {
      if (datePopover && !datePopover.classList.contains('hidden')) {
        if (!datePopover.contains(e.target) && !dateTrigger.contains(e.target)) {
          datePopover.classList.add('hidden');
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
