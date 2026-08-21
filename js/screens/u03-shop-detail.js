(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;
  const { generateCalendarGrid } = window.YoyakuComponents;




  function renderRestaurantDetailView(restaurant, state) {
    const isMm = state.currentLanguage === 'MM';
    const isFavorite = state.favorites.includes(restaurant.id);
    const detailState = state.detailState;

    // Active gallery lightbox index
    const activeLightboxIndex = detailState.lightboxIndex; // null or number

    return `
      <div class="space-y-8 pb-24 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 animate-fadeIn">
        
        <!-- Top Navigation & Actions -->
        <div class="flex justify-between items-center">
          <button
            id="detail-back-btn"
            class="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FBF3E2] border border-[#EADFD1] font-label text-xs font-bold text-[#58413f] hover:text-[#840f16] transition-colors cursor-pointer shadow-2xs"
          >
            <span class="material-symbols-outlined text-sm">arrow_back</span>
            <span>${isMm ? 'နောက်သို့ ပင်မစာမျက်နှာ' : 'Back to Discover'}</span>
          </button>

          <button
            id="detail-favorite-btn"
            class="flex items-center gap-2 px-4 py-2 rounded-full border transition-all cursor-pointer shadow-2xs ${
              isFavorite
                ? 'bg-[#840f16] text-white border-[#840f16]'
                : 'bg-[#FBF3E2] text-[#840f16] border-[#EADFD1] hover:border-[#840f16]'
            }"
          >
            <span class="material-symbols-outlined text-sm ${isFavorite ? 'fill-1' : ''}">favorite</span>
            <span class="font-label text-xs font-bold">${isFavorite ? (isMm ? 'သိမ်းဆည်းပြီး' : 'Saved') : (isMm ? 'သိမ်းဆည်းမည်' : 'Save Venue')}</span>
          </button>
        </div>

        <!-- HERO BANNER -->
        <div class="relative h-[340px] sm:h-[420px] rounded-3xl overflow-hidden border border-[#EADFD1] shadow-2xl group cursor-pointer" id="hero-image-zoom">
          <img
            src="${restaurant.heroImage}"
            alt="${restaurant.name}"
            referrerpolicy="no-referrer"
            loading="lazy"
            onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>

          <div class="absolute top-4 right-4 z-10">
            <span class="inline-flex items-center gap-1.5 bg-[#1c1311]/85 backdrop-blur-md text-white px-3.5 py-1.5 rounded-xl font-label text-xs font-bold shadow-lg">
              <span class="material-symbols-outlined text-sm">photo_camera</span>
              <span>${isMm ? 'ပုံများကြည့်ရန်' : 'View Gallery'} (${(restaurant.images || []).length})</span>
            </span>
          </div>

          <div class="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 text-white space-y-3 z-10">
            <div>
              <span class="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-[#231916] px-3.5 py-1.5 rounded-xl font-label text-xs sm:text-sm font-bold shadow-lg">
                <span class="material-symbols-outlined text-sm sm:text-base text-[#D08E1C] fill-1 leading-none">star</span>
                <span class="leading-none">${restaurant.rating}</span>
                <span class="text-[#58413f] font-medium leading-none text-xs">(${restaurant.reviewCount} ${isMm ? 'သုံးသပ်ချက်များ' : 'reviews'})</span>
              </span>
            </div>

            <h1 class="font-headline text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight drop-shadow-md">
              ${restaurant.name}
            </h1>
            ${
              restaurant.nameMM
                ? `<div class="font-body text-sm sm:text-base text-amber-200/95 font-medium drop-shadow-sm">${restaurant.nameMM}</div>`
                : ''
            }
          </div>
        </div>

        <!-- SPECIAL ANNOUNCEMENTS / NOTICE BANNER -->
        ${
          restaurant.specialNotice || restaurant.specialNoticeEn
            ? `
            <div class="bg-[#FFF4E5] border border-[#F2C994] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-sm">
              <div class="w-9 h-9 rounded-xl bg-[#840f16] text-white flex items-center justify-center shrink-0 mt-0.5">
                <span class="material-symbols-outlined text-xl">campaign</span>
              </div>
              <div class="space-y-1 min-w-0">
                <div class="font-label text-xs font-bold uppercase tracking-wider text-[#840f16]">
                  ${isMm ? 'အထူးအသိပေးချက် (Notice)' : 'Special Announcement / Notice'}
                </div>
                <p class="font-body text-xs sm:text-sm font-semibold text-[#231916] leading-relaxed">
                  ${isMm ? (restaurant.specialNotice || restaurant.specialNoticeEn) : (restaurant.specialNoticeEn || restaurant.specialNotice)}
                </p>
              </div>
            </div>
          `
            : ''
        }

        <!-- MAIN CONTENT GRID (8 COLS DETAILS + 4 COLS STICKY BOOKING CARD) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <!-- Left Column: Details, Tabs, Content -->
          <div class="lg:col-span-8 space-y-8">
            
            <!-- Key Info Highlights Grid & Public Phone Contact -->
            <div class="bg-[#FBF3E2] p-5 sm:p-6 rounded-3xl border border-[#EADFD1] space-y-4 shadow-xs">
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div class="space-y-1">
                  <div class="font-label text-[10px] text-[#58413f] font-bold uppercase">${isMm ? 'စျေးနှုန်း' : 'Price Range'}</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#231916]">${restaurant.priceRange}</div>
                </div>
                <div class="space-y-1">
                  <div class="font-label text-[10px] text-[#58413f] font-bold uppercase">${isMm ? 'အစားအစာအမျိုးအစား' : 'Cuisine Style'}</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#840f16]">${restaurant.cuisine}</div>
                </div>
                <div class="col-span-2 sm:col-span-1 space-y-1">
                  <div class="font-label text-[10px] text-[#58413f] font-bold uppercase">${isMm ? 'ဖွင့်ချိန်' : 'Opening Hours'}</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#104b2b]">${restaurant.openingHours}</div>
                </div>
              </div>

              <div class="pt-3 border-t border-[#EADFD1] flex flex-wrap items-center justify-between gap-3">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[#840f16] text-lg">call</span>
                  <span class="font-label text-xs font-bold text-[#58413f]">${isMm ? 'ဆက်သွယ်ရန် ဖုန်းနံပါတ်:' : 'Public Phone:'}</span>
                  <a href="tel:${restaurant.phone || '09-798123456'}" class="font-label text-xs font-bold text-[#840f16] hover:underline">
                    ${restaurant.phonePublic || restaurant.phone || '09-798 123 456'}
                  </a>
                </div>

                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-[#840f16] text-lg">location_on</span>
                  <span class="font-label text-xs text-[#231916] font-semibold">${restaurant.area || restaurant.location}</span>
                </div>
              </div>
            </div>

            <!-- Tab Navigation Bar -->
            <div class="flex border-b border-[#EADFD1] gap-6 sm:gap-8 overflow-x-auto">
              <button
                data-detail-tab="overview"
                class="pb-3 font-headline text-base sm:text-lg font-bold transition-all cursor-pointer whitespace-nowrap relative ${
                  detailState.activeTab === 'overview'
                    ? 'text-[#840f16] border-b-2 border-[#840f16]'
                    : 'text-[#58413f] hover:text-[#231916]'
                }"
              >
                ${isMm ? 'ဆိုင်အချက်အလက်' : 'Overview'}
              </button>

              <button
                data-detail-tab="menu"
                class="pb-3 font-headline text-base sm:text-lg font-bold transition-all cursor-pointer whitespace-nowrap relative ${
                  detailState.activeTab === 'menu'
                    ? 'text-[#840f16] border-b-2 border-[#840f16]'
                    : 'text-[#58413f] hover:text-[#231916]'
                }"
              >
                ${isMm ? 'မီနူးများ' : 'Menus'}
              </button>

              <button
                data-detail-tab="reviews"
                class="pb-3 font-headline text-base sm:text-lg font-bold transition-all cursor-pointer whitespace-nowrap relative ${
                  detailState.activeTab === 'reviews'
                    ? 'text-[#840f16] border-b-2 border-[#840f16]'
                    : 'text-[#58413f] hover:text-[#231916]'
                }"
              >
                ${isMm ? 'ထင်မြင်ချက်များ' : 'Reviews'}
              </button>
            </div>

            <!-- TAB CONTENT 1: OVERVIEW -->
            ${
              detailState.activeTab === 'overview'
                ? `
                <div class="space-y-8 animate-fadeIn">
                  <!-- Facilities & Amenities Icons (အဆောက်အအုံနှင့် ဝန်ဆောင်မှုဆိုင်ရာ အိုင်ကွန်များ) -->
                  <div class="space-y-3 pt-2">
                    <h3 class="font-headline text-xl font-bold text-[#231916]">
                      ${isMm ? 'အဆောက်အအုံနှင့် ဝန်ဆောင်မှုများ (Facilities)' : 'Facilities & Amenities'}
                    </h3>
                    <div class="flex flex-wrap gap-2.5 sm:gap-3">
                      ${(restaurant.facilities && restaurant.facilities.length > 0
                        ? restaurant.facilities
                        : [
                            { id: 'wifi', icon: 'wifi', label: 'Free High-Speed Wi-Fi', labelMM: 'အခမဲ့ ဝိုင်ဖိုင်' },
                            { id: 'parking', icon: 'directions_car', label: 'Valet & Private Parking', labelMM: 'ကားပါကင် ဝန်ဆောင်မှု' },
                            { id: 'ac', icon: 'ac_unit', label: 'Full Air Conditioning', labelMM: 'လေအေးပေးစက်' },
                            { id: 'generator', icon: 'bolt', label: '24/7 Backup Generator', labelMM: 'ကိုယ်ပိုင် လျှပ်စစ်မီး (မီးစက်)' }
                          ]
                      )
                        .map(
                          fac => `
                        <div class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FAF3E8] border border-[#EADFD1] text-[#231916] hover:border-[#840f16]/40 transition-colors shadow-2xs">
                          <span class="material-symbols-outlined text-base text-[#840f16] shrink-0">${fac.icon}</span>
                          <span class="font-label text-xs sm:text-sm font-semibold text-[#231916]">
                            ${isMm ? (fac.labelMM || fac.label) : fac.label}
                          </span>
                        </div>
                      `
                        )
                        .join('')}
                    </div>
                  </div>

                  <!-- Atmosphere Gallery (ဆိုင်၏ ပုံပြခန်း) -->
                  ${
                    restaurant.images && restaurant.images.length > 0
                      ? `
                      <div class="space-y-3 pt-2">
                        <div class="flex items-center justify-between">
                          <h3 class="font-headline text-xl font-bold text-[#231916]">
                            ${isMm ? 'ဆိုင်၏ ပုံပြခန်း (Gallery)' : 'Photo Gallery'}
                          </h3>
                        </div>

                        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          ${restaurant.images
                            .map(
                              (img, idx) => `
                            <div
                              data-gallery-idx="${idx}"
                              class="group relative h-40 rounded-2xl overflow-hidden border border-[#EADFD1] shadow-xs cursor-pointer"
                            >
                              <img src="${img}" alt="Gallery ${idx + 1}" referrerpolicy="no-referrer" loading="lazy" onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                                <span class="material-symbols-outlined text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity">zoom_in</span>
                              </div>
                            </div>
                          `
                            )
                            .join('')}
                        </div>
                      </div>
                    `
                      : ''
                  }

                  <!-- Location & Map -->
                  <div class="space-y-3 pt-4 border-t border-[#EADFD1]">
                    <div class="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 class="font-headline text-xl font-bold text-[#231916]">
                          ${isMm ? 'တည်နေရာနှင့် မြေပုံ' : 'Location & Map'}
                        </h3>
                        <p class="font-body text-xs text-[#58413f] mt-0.5">
                          ${restaurant.address}
                        </p>
                      </div>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name + ' ' + restaurant.address)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#840f16] text-white text-xs font-label font-bold hover:bg-[#a52a2a] transition-colors shadow-sm"
                      >
                        <span class="material-symbols-outlined text-sm">near_me</span>
                        <span>${isMm ? 'Google Maps တွင်ဖွင့်မည်' : 'Open in Google Maps'}</span>
                      </a>
                    </div>

                    <div class="bg-[#FBF3E2] p-4 sm:p-5 rounded-3xl border border-[#EADFD1] space-y-4">
                      <!-- Interactive Embedded Google Map -->
                      <div class="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-[#EADFD1] shadow-inner bg-[#f0e8d8]">
                        <iframe
                          title="Location Map"
                          width="100%"
                          height="100%"
                          style="border:0;"
                          loading="lazy"
                          allowfullscreen
                          referrerpolicy="no-referrer-when-downgrade"
                          src="${window.YoyakuPrototype.createMapEmbedDataUri(restaurant.name, restaurant.address)}"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              `
                : ''
            }

            <!-- TAB CONTENT 2: FOOD MENUS (အစားအစာ မီနူးများ) -->
            ${
              detailState.activeTab === 'menu'
                ? `
                <div class="space-y-6 animate-fadeIn">
                  ${
                    restaurant.menuCategories && restaurant.menuCategories.length > 0
                      ? restaurant.menuCategories
                          .map(
                            cat => `
                          <div class="space-y-3 pt-2">
                            <div class="font-headline text-base font-bold text-[#840f16] border-b border-[#EADFD1] pb-2 flex items-center gap-2">
                              <span class="material-symbols-outlined text-lg">restaurant_menu</span>
                              <span>${isMm ? (cat.titleMM || cat.title) : cat.title}</span>
                            </div>

                            <div class="grid grid-cols-1 gap-4">
                              ${cat.items
                                .map(
                                  item => `
                                <div class="bg-[#FBF3E2] p-4 sm:p-5 rounded-2xl border border-[#EADFD1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#840f16]/30 transition-all">
                                  <div class="flex items-start gap-4 min-w-0">
                                    ${
                                      item.image
                                        ? `
                                        <img
                                          src="${item.image}"
                                          alt="${item.name}"
                                          referrerpolicy="no-referrer"
                                          loading="lazy"
                                          onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';"
                                          class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 border border-[#EADFD1]"
                                        />
                                      `
                                        : ''
                                    }
                                    <div class="space-y-1 min-w-0">
                                      <div class="flex flex-wrap items-center gap-2">
                                        <h4 class="font-headline text-base font-bold text-[#231916]">
                                          ${isMm ? (item.nameMM || item.name) : item.name}
                                        </h4>
                                        ${
                                          item.isPopular
                                            ? `
                                            <span class="bg-[#840f16] text-white font-label text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
                                              <span class="material-symbols-outlined text-xs fill-1">local_fire_department</span>
                                              <span>${isMm ? 'လူကြိုက်များ' : 'Popular'}</span>
                                            </span>
                                          `
                                            : ''
                                        }
                                      </div>
                                      <p class="font-body text-xs text-[#58413f] leading-relaxed">
                                        ${item.description}
                                      </p>
                                    </div>
                                  </div>

                                  <div class="font-headline font-extrabold text-[#840f16] text-base sm:text-lg whitespace-nowrap self-end sm:self-center bg-white px-3 py-1.5 rounded-xl border border-[#EADFD1]">
                                    ${item.price}
                                  </div>
                                </div>
                              `
                                )
                                .join('')}
                            </div>
                          </div>
                        `
                          )
                          .join('')
                      : `
                      <!-- Fallback to Menu Highlights -->
                      <div class="space-y-4">
                        ${(restaurant.menuHighlights || [])
                          .map(
                            m => `
                          <div class="bg-[#FBF3E2] p-5 rounded-2xl border border-[#EADFD1] flex flex-col sm:flex-row justify-between gap-4">
                            <div class="space-y-1">
                              <div class="flex items-center gap-2">
                                <h4 class="font-headline text-base font-bold text-[#231916]">${m.name}</h4>
                                ${
                                  m.isChefSpecial
                                    ? `<span class="bg-[#840f16] text-white font-label text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">${isMm ? 'လူကြိုက်များ' : 'Popular'}</span>`
                                    : ''
                                }
                              </div>
                              <p class="font-body text-xs text-[#58413f]">${m.description}</p>
                            </div>
                            <div class="font-headline font-bold text-[#840f16] text-base whitespace-nowrap self-start sm:self-center">
                              ${m.price}
                            </div>
                          </div>
                        `
                          )
                          .join('')}
                      </div>
                    `
                  }
                </div>
              `
                : ''
            }

            <!-- TAB CONTENT 3: REVIEWS & RATINGS (သုံးစွဲသူများ၏ ထင်မြင်ချက်နှင့် အမှတ်ပေးချက်များ) -->
            ${
              detailState.activeTab === 'reviews'
                ? `
                <div class="space-y-6 animate-fadeIn">
                  
                  <!-- Overall Breakdown Ratings Panel -->
                  <div class="bg-[#FBF3E2] p-6 rounded-3xl border border-[#EADFD1] space-y-4">
                    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#EADFD1] pb-4">
                      <div>
                        <h3 class="font-headline text-2xl font-extrabold text-[#231916]">
                          ${restaurant.rating} <span class="text-sm font-normal text-[#58413f]">/ 5.0</span>
                        </h3>
                        <p class="font-body text-xs text-[#58413f] mt-0.5">
                          ${isMm ? `စုစုပေါင်း သုံးသပ်ချက် ${restaurant.reviewCount} ခု` : `Based on ${restaurant.reviewCount} verified guest reviews`}
                        </p>
                      </div>

                      <div class="flex items-center gap-1 text-[#D08E1C]">
                        ${[1, 2, 3, 4, 5]
                          .map(
                            s => `
                          <span class="material-symbols-outlined text-2xl fill-1">star</span>
                        `
                          )
                          .join('')}
                      </div>
                    </div>

                    <!-- Category Breakdown Bars -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div class="space-y-1">
                        <div class="flex justify-between font-label text-xs font-semibold text-[#58413f]">
                          <span>${isMm ? 'ဝန်ဆောင်မှု (Service)' : 'Service'}</span>
                          <span class="font-bold text-[#231916]">${restaurant.ratingBreakdown?.service || 4.9}</span>
                        </div>
                        <div class="w-full h-2 bg-[#EADFD1] rounded-full overflow-hidden">
                          <div class="h-full bg-[#840f16] rounded-full" style="width: ${(restaurant.ratingBreakdown?.service || 4.9) * 20}%"></div>
                        </div>
                      </div>

                      <div class="space-y-1">
                        <div class="flex justify-between font-label text-xs font-semibold text-[#58413f]">
                          <span>${isMm ? 'ဈေးနှုန်းနှင့် တန်ဖိုး (Value)' : 'Value'}</span>
                          <span class="font-bold text-[#231916]">${restaurant.ratingBreakdown?.value || 4.8}</span>
                        </div>
                        <div class="w-full h-2 bg-[#EADFD1] rounded-full overflow-hidden">
                          <div class="h-full bg-[#840f16] rounded-full" style="width: ${(restaurant.ratingBreakdown?.value || 4.8) * 20}%"></div>
                        </div>
                      </div>

                      <div class="space-y-1">
                        <div class="flex justify-between font-label text-xs font-semibold text-[#58413f]">
                          <span>${isMm ? 'ပတ်ဝန်းကျင် (Atmosphere)' : 'Ambience'}</span>
                          <span class="font-bold text-[#231916]">${restaurant.ratingBreakdown?.ambience || 4.9}</span>
                        </div>
                        <div class="w-full h-2 bg-[#EADFD1] rounded-full overflow-hidden">
                          <div class="h-full bg-[#840f16] rounded-full" style="width: ${(restaurant.ratingBreakdown?.ambience || 4.9) * 20}%"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Reviews List -->
                  <div class="space-y-4">
                    ${
                      restaurant.reviews && restaurant.reviews.length > 0
                        ? restaurant.reviews
                            .map(
                              r => `
                            <div class="bg-[#FBF3E2] p-5 rounded-2xl border border-[#EADFD1] space-y-3">
                              <div class="flex justify-between items-center">
                                <div class="flex items-center gap-2">
                                  <div class="w-8 h-8 rounded-full bg-[#840f16] text-white font-bold text-xs flex items-center justify-center">
                                    ${r.author.charAt(0)}
                                  </div>
                                  <div>
                                    <div class="font-headline text-sm font-bold text-[#231916]">${r.author}</div>
                                    <div class="text-[10px] font-label text-[#104b2b] font-bold flex items-center gap-1">
                                      <span class="material-symbols-outlined text-xs">verified</span>
                                      <span>${isMm ? 'အတည်ပြုပြီး အလည်အပတ်' : 'Verified Diner'}</span>
                                    </div>
                                  </div>
                                </div>

                                <div class="flex items-center gap-1 text-xs font-label text-[#D08E1C] font-bold">
                                  <span class="material-symbols-outlined text-sm fill-1">star</span>
                                  <span>${r.rating}.0</span>
                                  <span class="text-[#58413f] text-[10px] font-normal ml-2">${r.date}</span>
                                </div>
                              </div>

                              <p class="font-body text-xs sm:text-sm text-[#58413f] leading-relaxed">
                                "${r.comment}"
                              </p>

                              ${
                                r.photos && r.photos.length > 0
                                  ? `
                                  <div class="flex gap-2 pt-1">
                                    ${r.photos
                                      .map(
                                        p => `
                                      <img src="${p}" alt="Review photo" class="w-16 h-16 rounded-xl object-cover border border-[#EADFD1]" />
                                    `
                                      )
                                      .join('')}
                                  </div>
                                `
                                  : ''
                              }
                            </div>
                          `
                            )
                            .join('')
                        : `<p class="font-body text-xs text-[#58413f]">${isMm ? 'မှတ်ချက် မရှိသေးပါ။ ပထမဆုံး သုံးသပ်ချက် ပေးပို့နိုင်ပါသည်။' : 'No reviews yet.'}</p>`
                    }
                  </div>
                </div>
              `
                : ''
            }

          </div>

          <!-- Right Column: Sticky Booking Widget (Desktop) -->
          <div class="lg:col-span-4 sticky top-24 hidden lg:block">
            <div class="bg-[#FBF3E2] p-6 rounded-3xl border border-[#EADFD1] shadow-xl space-y-6">
              
              <div class="border-b border-[#EADFD1] pb-4">
                <div class="text-[#840f16] font-label text-xs font-bold uppercase tracking-wider">
                  ${isMm ? 'ချက်ချင်း စာပွဲ ကြိုတင်ယူခြင်း' : 'Instant Reservation'}
                </div>
                <h3 class="font-headline text-2xl font-bold text-[#231916] mt-1">
                  ${isMm ? 'စာပွဲ ကြိုတင်မှာယူမည်' : 'Book a Table'}
                </h3>
                <p class="font-body text-xs text-[#58413f] mt-1">
                  ${isMm ? 'အပိုကြေးမရှိပါ။ ချက်ချင်း အတည်ပြုချက်ရရှိပါမည်။' : 'Zero booking fees. Instant confirmation.'}
                </p>
              </div>

              <!-- Submit Reservation Action -->
              <button
                id="detail-confirm-reserve-btn"
                class="w-full btn-primary py-4 rounded-2xl font-label text-sm font-semibold shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:shadow-xl"
              >
                <span>${isMm ? 'ကြိုတင် မှာယူမည်' : 'Book Now'}</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </button>

              <div class="text-center font-label text-[11px] text-[#58413f]">
                ${isMm ? 'အတည်ပြုချက် လက်မှတ်ကို အက်ပ်အတွင်း သိမ်းဆည်းပေးပါမည်' : 'Instant confirmation pass stored in app'}
              </div>

            </div>
          </div>

        </div>

        <!-- MOBILE & TABLET FLOATING ACTION BUTTON (ကြိုတင်မှာယူမှု Floating ခလုတ်) -->
        <div class="lg:hidden fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          <button
            id="mobile-sticky-reserve-btn"
            class="bg-[#840f16] hover:bg-[#6b0c12] active:bg-[#52090d] text-white px-5 sm:px-6 py-3.5 rounded-full font-label text-sm font-bold shadow-[0_8px_20px_rgba(132,15,22,0.4)] flex items-center gap-2 cursor-pointer border border-[#f5ebdc]/30 transition-all duration-200 active:scale-95 hover:shadow-[0_10px_24px_rgba(132,15,22,0.5)]"
          >
            <span class="material-symbols-outlined text-lg">calendar_month</span>
            <span>${isMm ? 'ကြိုတင်မှာယူမည်' : 'Book Now'}</span>
          </button>
        </div>

        <!-- LIGHTBOX GALLERY MODAL (ုံကြီးချဲ့ကြည့်ရန်) -->
        ${
          activeLightboxIndex !== null && activeLightboxIndex !== undefined
            ? `
            <div class="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn" id="lightbox-modal">
              <button
                id="lightbox-close-btn"
                class="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
              >
                <span class="material-symbols-outlined text-2xl">close</span>
              </button>

              <div class="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center space-y-3">
                <img
                  src="${restaurant.images[activeLightboxIndex] || restaurant.heroImage}"
                  alt="Enlarged gallery view"
                  class="max-h-[75vh] max-w-full object-contain rounded-2xl border border-white/20 shadow-2xl"
                />

                <div class="flex items-center justify-between w-full text-white/80 font-label text-xs px-4 pt-2">
                  <button id="lightbox-prev-btn" class="flex items-center gap-1 hover:text-white cursor-pointer px-3 py-1.5 rounded-full bg-white/10">
                    <span class="material-symbols-outlined text-sm">arrow_back</span>
                    <span>${isMm ? 'ယခင်ပုံ' : 'Previous'}</span>
                  </button>

                  <span>${activeLightboxIndex + 1} / ${(restaurant.images || []).length}</span>

                  <button id="lightbox-next-btn" class="flex items-center gap-1 hover:text-white cursor-pointer px-3 py-1.5 rounded-full bg-white/10">
                    <span>${isMm ? 'နောက်ပုံ' : 'Next'}</span>
                    <span class="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          `
            : ''
        }

      </div>
    `;
  }

  function attachRestaurantDetailViewEvents(containerElement = document) {
    // Back button
    const backBtn = containerElement.querySelector('#detail-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        store.setSelectedRestaurant(null);
        store.setActiveTab('discover');
      });
    }

    // Favorite toggle button
    const favBtn = containerElement.querySelector('#detail-favorite-btn');
    if (favBtn) {
      favBtn.addEventListener('click', () => {
        const selected = store.getState().selectedRestaurant;
        if (selected) store.toggleFavorite(selected.id);
      });
    }

    // Tab switching
    containerElement.querySelectorAll('[data-detail-tab]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-detail-tab');
        store.updateDetailState('activeTab', tab);
      });
    });

    // Hero zoom / Gallery clicks
    const heroZoom = containerElement.querySelector('#hero-image-zoom');
    if (heroZoom) {
      heroZoom.addEventListener('click', () => {
        store.updateDetailState('lightboxIndex', 0);
      });
    }

    containerElement.querySelectorAll('[data-gallery-idx]').forEach(item => {
      item.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-gallery-idx'), 10);
        store.updateDetailState('lightboxIndex', idx);
      });
    });

    // Lightbox Controls
    const lightboxClose = containerElement.querySelector('#lightbox-close-btn');
    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        store.updateDetailState('lightboxIndex', null);
      });
    }

    const lightboxPrev = containerElement.querySelector('#lightbox-prev-btn');
    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', () => {
        const selected = store.getState().selectedRestaurant;
        const curIdx = store.getState().detailState.lightboxIndex || 0;
        const total = (selected?.images || []).length;
        if (total > 0) {
          const nextIdx = (curIdx - 1 + total) % total;
          store.updateDetailState('lightboxIndex', nextIdx);
        }
      });
    }

    const lightboxNext = containerElement.querySelector('#lightbox-next-btn');
    if (lightboxNext) {
      lightboxNext.addEventListener('click', () => {
        const selected = store.getState().selectedRestaurant;
        const curIdx = store.getState().detailState.lightboxIndex || 0;
        const total = (selected?.images || []).length;
        if (total > 0) {
          const nextIdx = (curIdx + 1) % total;
          store.updateDetailState('lightboxIndex', nextIdx);
        }
      });
    }

    // Date calendar popover
    const dateTrigger = containerElement.querySelector('#detail-date-trigger');
    const datePopover = containerElement.querySelector('#detail-calendar-popover');
    const dateClose = containerElement.querySelector('#detail-calendar-close');
    const dateDisplay = containerElement.querySelector('#detail-date-display');
    const calendarContainer = containerElement.querySelector('#detail-calendar-container');

    let activeCalYear = 2026;
    let activeCalMonth = 7; // Aug

    function renderDetailCalendar() {
      if (!calendarContainer) return;
      calendarContainer.innerHTML = generateCalendarGrid({
        year: activeCalYear,
        month: activeCalMonth,
        selectedDateStr: store.getState().detailState.date || 'Aug 14, 2026',
        onDaySelectAttr: 'data-detail-calendar-day'
      });
      bindDetailCalendarEvents();
    }

    function bindDetailCalendarEvents() {
      if (!calendarContainer) return;

      // Previous month
      const prevBtn = calendarContainer.querySelector('#cal-prev-month');
      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          activeCalMonth--;
          if (activeCalMonth < 0) {
            activeCalMonth = 11;
            activeCalYear--;
          }
          renderDetailCalendar();
        });
      }

      // Next month
      const nextBtn = calendarContainer.querySelector('#cal-next-month');
      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          activeCalMonth++;
          if (activeCalMonth > 11) {
            activeCalMonth = 0;
            activeCalYear++;
          }
          renderDetailCalendar();
        });
      }

      // Day Selection
      calendarContainer.querySelectorAll('[data-detail-calendar-day]').forEach(dayBtn => {
        dayBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const dateStr = e.currentTarget.getAttribute('data-date-str');
          if (dateStr) {
            store.updateDetailState('date', dateStr);
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
          renderDetailCalendar();
        }
      });
    }

    if (dateClose && datePopover) {
      dateClose.addEventListener('click', (e) => {
        e.stopPropagation();
        datePopover.classList.add('hidden');
      });
    }

    // Time select
    const timeSelect = containerElement.querySelector('#detail-time-select');
    if (timeSelect) {
      timeSelect.addEventListener('change', (e) => {
        store.updateDetailState('time', e.target.value);
      });
    }

    // Guests minus & plus
    const minusBtn = containerElement.querySelector('#detail-guests-minus');
    if (minusBtn) {
      minusBtn.addEventListener('click', () => {
        const cur = store.getState().detailState.guests;
        if (cur > 1) store.updateDetailState('guests', cur - 1);
      });
    }

    const plusBtn = containerElement.querySelector('#detail-guests-plus');
    if (plusBtn) {
      plusBtn.addEventListener('click', () => {
        const cur = store.getState().detailState.guests;
        if (cur < 12) store.updateDetailState('guests', cur + 1);
      });
    }

    // Confirm Reservation submit (desktop)
    const confirmBtn = containerElement.querySelector('#detail-confirm-reserve-btn');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        const selected = store.getState().selectedRestaurant;
        const dState = store.getState().detailState;
        if (selected) {
          store.openBookingModal(selected, dState.date, dState.time, dState.guests);
        }
      });
    }

    // Mobile sticky reserve button
    const mobileStickyBtn = containerElement.querySelector('#mobile-sticky-reserve-btn');
    if (mobileStickyBtn) {
      mobileStickyBtn.addEventListener('click', () => {
        const selected = store.getState().selectedRestaurant;
        const dState = store.getState().detailState;
        if (selected) {
          store.openBookingModal(selected, dState.date, dState.time, dState.guests);
        }
      });
    }
  }


  window.YoyakuComponents.renderRestaurantDetailView = renderRestaurantDetailView;
  window.YoyakuComponents.attachRestaurantDetailViewEvents = attachRestaurantDetailViewEvents;
})();
