(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;
  const { RESTAURANTS_DATA } = window.YoyakuData;
  const { renderSearchResultCard, attachRestaurantCardEvents } = window.YoyakuComponents;

  function renderResultListView(state) {
    const isMm = state.currentLanguage === 'MM';
    const rState = state.resultsState || {};

    // Filter Logic using comprehensive search condition criteria
    let filtered = RESTAURANTS_DATA.filter(restaurant => {
      // 1. Keyword match
      if (rState.keyword && rState.keyword.trim() !== '') {
        const kw = rState.keyword.toLowerCase().trim();
        const mName = (restaurant.name || '').toLowerCase().includes(kw);
        const mNameMM = (restaurant.nameMM || '').toLowerCase().includes(kw);
        const mVenue = (restaurant.venueName || '').toLowerCase().includes(kw);
        const mCuisine = (restaurant.cuisine || '').toLowerCase().includes(kw);
        const mArea = (restaurant.area || '').toLowerCase().includes(kw);
        const mLocation = (restaurant.location || '').toLowerCase().includes(kw);
        const mAddress = (restaurant.address || '').toLowerCase().includes(kw);
        const mTagline = (restaurant.tagline || '').toLowerCase().includes(kw);
        const mFeatures = (restaurant.features || []).some(f => f.toLowerCase().includes(kw));
        const mFacilities = (restaurant.facilities || []).some(f => (f.label || '').toLowerCase().includes(kw) || (f.labelMM || '').toLowerCase().includes(kw));
        const mHighlights = (restaurant.highlights || []).some(h => 
          (h.title || '').toLowerCase().includes(kw) || (h.desc || '').toLowerCase().includes(kw)
        );
        if (!mName && !mNameMM && !mVenue && !mCuisine && !mArea && !mLocation && !mAddress && !mTagline && !mFeatures && !mFacilities && !mHighlights) {
          return false;
        }
      }

      // 2. Area match (supports multi-select array `selectedAreas` or single `area`)
      const selectedAreas = rState.selectedAreas && rState.selectedAreas.length > 0 
        ? rState.selectedAreas 
        : (rState.area && rState.area !== 'All Areas' && rState.area !== 'All' && rState.area !== 'အားလုံး' ? [rState.area] : []);

      if (selectedAreas.length > 0) {
        const rArea = (restaurant.area || '').toLowerCase();
        const rLoc = (restaurant.location || '').toLowerCase();
        const rAddr = (restaurant.address || '').toLowerCase();

        const matchesAnyArea = selectedAreas.some(targetArea => {
          if (targetArea === 'All Areas' || targetArea === 'All') return true;
          const target = targetArea.toLowerCase().replace('township', '').trim();
          return rArea.includes(target) || rLoc.includes(target) || rAddr.includes(target) || target.includes(rArea);
        });

        if (!matchesAnyArea) return false;
      }

      // 3. Cuisine match (supports multi-select array `selectedCuisines` or single `cuisine`)
      const selectedCuisines = rState.selectedCuisines && rState.selectedCuisines.length > 0
        ? rState.selectedCuisines
        : (rState.cuisine && rState.cuisine !== 'All Cuisines' && rState.cuisine !== 'All' && rState.cuisine !== 'အားလုံး' ? [rState.cuisine] : []);

      if (selectedCuisines.length > 0) {
        const rCuisine = (restaurant.cuisine || '').toLowerCase();
        const rDesc = (restaurant.description || '').toLowerCase();
        const rTag = (restaurant.tagline || '').toLowerCase();

        const matchesAnyCuisine = selectedCuisines.some(targetCuisine => {
          if (targetCuisine === 'All Cuisines' || targetCuisine === 'All') return true;
          const target = targetCuisine.toLowerCase().split('&')[0].trim();
          return rCuisine.includes(target) || rDesc.includes(target) || rTag.includes(target);
        });

        if (!matchesAnyCuisine) return false;
      }

      // 4. Seating Preference match
      if (rState.seatingPreference && rState.seatingPreference !== 'all') {
        const pref = rState.seatingPreference.toLowerCase();
        const rFeatures = (restaurant.features || []).map(f => f.toLowerCase());
        const rFacilities = (restaurant.facilities || []).map(f => (f.label || '').toLowerCase());
        const combined = [...rFeatures, ...rFacilities].join(' ');
        if (!combined.includes(pref)) {
          if (pref.includes('private') && !combined.includes('private') && !combined.includes('vip') && !combined.includes('tatami')) return false;
          if (pref.includes('outdoor') && !combined.includes('outdoor') && !combined.includes('garden') && !combined.includes('lawn') && !combined.includes('patio')) return false;
          if (pref.includes('lake') && !combined.includes('lake') && !combined.includes('view') && !combined.includes('sunset') && !combined.includes('river')) return false;
          if (pref.includes('bar') && !combined.includes('bar') && !combined.includes('counter')) return false;
        }
      }

      // 5. Features / Amenities filter (Multi-select)
      if (rState.selectedFeatures && rState.selectedFeatures.length > 0) {
        const rFeatures = (restaurant.features || []).map(f => f.toLowerCase());
        const rFacilities = (restaurant.facilities || []).map(f => (f.label || '').toLowerCase());
        const rDining = restaurant.diningInfo || {};
        const dietaryStr = (rDining.dietary || '').toLowerCase();
        const payStr = (rDining.payments || []).join(' ').toLowerCase();
        const combined = [...rFeatures, ...rFacilities, dietaryStr, payStr].join(' ');

        for (const sf of rState.selectedFeatures) {
          const sfLower = sf.toLowerCase();
          if (sfLower.includes('wifi') && !combined.includes('wi-fi') && !combined.includes('wifi')) return false;
          if (sfLower.includes('parking') && !combined.includes('parking') && !combined.includes('valet')) return false;
          if (sfLower.includes('ac') || sfLower.includes('air')) {
            if (!combined.includes('air conditioning') && !combined.includes('ac') && !combined.includes('conditioned')) return false;
          }
          if (sfLower.includes('private') && !combined.includes('private') && !combined.includes('vip') && !combined.includes('tatami')) return false;
          if (sfLower.includes('outdoor') && !combined.includes('outdoor') && !combined.includes('garden') && !combined.includes('terrace') && !combined.includes('patio')) return false;
          if (sfLower.includes('lake') && !combined.includes('lake') && !combined.includes('water') && !combined.includes('river') && !combined.includes('sunset')) return false;
          if (sfLower.includes('halal') && !combined.includes('halal')) return false;
          if (sfLower.includes('veg') && !combined.includes('veg') && !dietaryStr.includes('vegan') && !dietaryStr.includes('vegetarian')) return false;
          if (sfLower.includes('wine') && !combined.includes('wine') && !combined.includes('sommelier') && !combined.includes('bar')) return false;
          if (sfLower.includes('music') && !combined.includes('music') && !combined.includes('jazz') && !combined.includes('harp') && !combined.includes('live')) return false;
          if (sfLower.includes('generator') && !combined.includes('generator') && !combined.includes('backup')) return false;
          if (sfLower.includes('pet') && !combined.includes('pet') && !combined.includes('pup')) return false;
        }
      }

      // 6. Budget Tier match
      if (rState.budgetTier && rState.budgetTier !== 'all') {
        const priceStr = (restaurant.priceRange || '').replace(/,/g, '');
        const nums = priceStr.match(/\d+/g);
        if (nums && nums.length > 0) {
          const minP = parseInt(nums[0], 10);
          const maxP = nums.length > 1 ? parseInt(nums[1], 10) : minP;
          if (rState.budgetTier === 'under15k' && minP > 15000) return false;
          if (rState.budgetTier === '15k-35k' && (maxP < 15000 || minP > 35000)) return false;
          if (rState.budgetTier === '35k-60k' && (maxP < 35000 || minP > 60000)) return false;
          if (rState.budgetTier === '60k+' && maxP < 60000) return false;
        }
      }

      // 7. Custom min/max price
      if (rState.minPrice && !isNaN(Number(rState.minPrice))) {
        const reqMin = Number(rState.minPrice);
        const priceStr = (restaurant.priceRange || '').replace(/,/g, '');
        const nums = priceStr.match(/\d+/g);
        if (nums && nums.length > 1) {
          const maxP = parseInt(nums[1], 10);
          if (maxP < reqMin) return false;
        }
      }

      if (rState.maxPrice && !isNaN(Number(rState.maxPrice))) {
        const reqMax = Number(rState.maxPrice);
        const priceStr = (restaurant.priceRange || '').replace(/,/g, '');
        const nums = priceStr.match(/\d+/g);
        if (nums && nums.length > 0) {
          const minP = parseInt(nums[0], 10);
          if (minP > reqMax) return false;
        }
      }

      return true;
    });

    // Sorting
    if (rState.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (rState.sortBy === 'reviews') {
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    // Active condition list for removable badges
    const activeConditionBadges = [];

    // Date condition badge
    if (rState.dateMode === 'specific' && rState.dateLabel && rState.dateLabel !== 'Any Date') {
      activeConditionBadges.push({ type: 'date', label: rState.dateLabel, icon: 'calendar_today' });
    } else if (rState.selectedDate && rState.selectedDate !== 'any' && rState.dateMode !== 'any') {
      activeConditionBadges.push({ type: 'date', label: rState.selectedDate, icon: 'calendar_today' });
    }

    // Time condition badge
    if (rState.time && rState.time !== 'any' && rState.timeMode !== 'any') {
      activeConditionBadges.push({ type: 'time', label: rState.time, icon: 'schedule' });
    }

    // Area / Township badges (supports individual multi-selected areas)
    const effectiveAreas = (rState.selectedAreas && rState.selectedAreas.length > 0)
      ? rState.selectedAreas.filter(a => a !== 'All Areas' && a !== 'All')
      : (rState.area && rState.area !== 'All Areas' && rState.area !== 'All' ? [rState.area] : []);

    effectiveAreas.forEach(areaName => {
      activeConditionBadges.push({ type: 'area_item', itemVal: areaName, label: areaName, icon: 'location_on' });
    });

    // Cuisine badges (supports individual multi-selected cuisines)
    const effectiveCuisines = (rState.selectedCuisines && rState.selectedCuisines.length > 0)
      ? rState.selectedCuisines.filter(c => c !== 'All Cuisines' && c !== 'All')
      : (rState.cuisine && rState.cuisine !== 'All Cuisines' && rState.cuisine !== 'All' ? [rState.cuisine] : []);

    effectiveCuisines.forEach(cuisineName => {
      activeConditionBadges.push({ type: 'cuisine_item', itemVal: cuisineName, label: cuisineName, icon: 'restaurant_menu' });
    });

    // Party size badge
    if (rState.partySize && rState.partySize !== 'All Sizes' && rState.partySize !== 'All') {
      activeConditionBadges.push({ type: 'partySize', label: `${rState.partySize} ${isMm ? 'ဦး' : 'Guests'}`, icon: 'group' });
    }

    // Budget tier badge
    if (rState.budgetTier && rState.budgetTier !== 'all') {
      const bNames = { under15k: '< 15K MMK', '15k-35k': '15K–35K MMK', '35k-60k': '35K–60K MMK', '60k+': '60K+ MMK' };
      activeConditionBadges.push({ type: 'budgetTier', label: bNames[rState.budgetTier] || rState.budgetTier, icon: 'payments' });
    }

    // Seating preference badge
    if (rState.seatingPreference && rState.seatingPreference !== 'all') {
      activeConditionBadges.push({ type: 'seating', label: rState.seatingPreference, icon: 'chair' });
    }

    // Individual Feature badges
    if (rState.selectedFeatures && rState.selectedFeatures.length > 0) {
      rState.selectedFeatures.forEach(f => {
        activeConditionBadges.push({ type: 'feature', featureId: f, label: f, icon: 'local_offer' });
      });
    }

    const totalActiveConditions = activeConditionBadges.length;

    return `
      <div class="space-y-6 pb-16 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">

        <!-- HEADER TITLE -->
        <div>
          <h2 class="font-headline text-2xl sm:text-3xl font-extrabold text-[#231916]">
            ${isMm ? 'စားသောက်ဆိုင်များ ရှာဖွေရန်' : 'Search Dining Venues'}
          </h2>
          <p class="font-body text-xs sm:text-sm text-[#6D6561] mt-0.5">
            ${isMm ? 'ရန်ကုန်မြို့၏ ထိပ်တန်းစားသောက်ဆိုင်များကို အချိန်မရွေး ကြိုတင်စိုတ်ယူနိုင်ပါသည်' : 'Explore and book premier Myanmar culinary destinations in real time'}
          </p>
        </div>

        <!-- STREAMLINED SINGLE SEARCH BAR WITH CONDITION BUTTON -->
        <div class="bg-[#FFFDFC] p-3 sm:p-4 rounded-3xl border border-[#E8DDD0] shadow-sm sm:shadow-[0_4px_24px_rgba(43,33,29,.06)] space-y-3">
          
          <div class="flex items-center gap-2 sm:gap-3">
            
            <!-- Clean Search Input Textbox -->
            <div class="flex-1 bg-[#F8EFE5] hover:bg-[#FFFDFC] border border-[#E8DDD0] focus-within:border-[#9B1C25] focus-within:bg-[#FFFDFC] focus-within:ring-2 focus-within:ring-[#9B1C25]/15 rounded-2xl px-3.5 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2.5 transition-all shadow-2xs">
              <span class="material-symbols-outlined text-[#9B1C25] text-xl">search</span>
              <input
                type="text"
                id="results-keyword-input"
                placeholder="${isMm ? 'ဆိုင်အမည်၊ ဟင်းလျာ၊ မြို့နယ် သို့မဟုတ် အစားအသောက် ရှာဖွေရန်...' : 'Search by restaurant name, cuisine, township, or dish...'}"
                value="${rState.keyword || ''}"
                class="w-full bg-transparent font-body text-xs sm:text-sm text-[#231916] placeholder:text-[#A19690] focus:outline-none"
              />
              ${
                rState.keyword
                  ? `<button id="results-clear-kw" title="Clear text" class="text-[#6D6561] hover:text-[#9B1C25] transition-transform active:scale-95 cursor-pointer flex items-center justify-center p-1">
                      <span class="material-symbols-outlined text-base">close</span>
                    </button>`
                  : ''
              }
            </div>

            <!-- Search Conditions Trigger Button (Opens Full-Screen View) -->
            <button
              id="results-open-conditions-btn"
              class="shrink-0 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl border font-label text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer active:scale-95 shadow-2xs relative ${
                totalActiveConditions > 0
                  ? 'bg-[#9B1C25] text-white border-[#9B1C25] hover:bg-[#7F161E]'
                  : 'bg-[#FFFDFC] text-[#241A18] border-[#E8DDD0] hover:bg-[#F3DFD5] hover:border-[#9B1C25]'
              }"
              title="${isMm ? 'ရှာဖွေမှု သတ်မှတ်ချက်များ ဖွင့်ရန်' : 'Open Search Conditions'}"
            >
              <span class="material-symbols-outlined text-lg ${totalActiveConditions > 0 ? 'text-white' : 'text-[#9B1C25]'}">tune</span>
              <span class="hidden sm:inline">${isMm ? 'သတ်မှတ်ချက်များ' : 'Conditions'}</span>
              ${
                totalActiveConditions > 0
                  ? `<span class="bg-[#FFFDFC] text-[#9B1C25] font-label text-[11px] font-black px-2 py-0.5 rounded-full shadow-xs">
                      ${totalActiveConditions}
                    </span>`
                  : ''
              }
            </button>

          </div>

          <!-- ACTIVE CONDITIONS STRIP -->
          ${
            activeConditionBadges.length > 0
              ? `
                <div class="flex items-center flex-wrap gap-1.5 pt-1 animate-fadeIn">
                  <span class="font-label text-[11px] text-[#6D6561] font-bold mr-1">${isMm ? 'သတ်မှတ်ချက်များ:' : 'Active:'}</span>
                  ${activeConditionBadges
                    .map(b => `
                      <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F3DFD5] border border-[#E8DDD0] text-[#9B1C25] font-label text-[11px] font-bold">
                        <span class="material-symbols-outlined text-[13px]">${b.icon}</span>
                        <span>${b.label}</span>
                        <button 
                          data-remove-condition="${b.type}" 
                          data-condition-val="${b.itemVal || b.featureId || ''}"
                          class="hover:text-red-700 ml-0.5 cursor-pointer flex items-center justify-center"
                          title="Remove filter"
                        >
                          <span class="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </span>
                    `)
                    .join('')}

                  <button 
                    id="results-clear-all-conditions-btn"
                    class="font-label text-[11px] text-[#6D6561] hover:text-[#9B1C25] underline ml-1 font-semibold cursor-pointer"
                  >
                    ${isMm ? 'အားလုံးရှင်းမည်' : 'Clear all'}
                  </button>
                </div>
              `
              : ''
          }

        </div>

        <!-- RESULTS TOOLBAR: COUNT, SORT, VIEW MODE -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 py-1">

          <div class="font-headline text-base font-extrabold text-[#231916]">
            ${filtered.length} ${isMm ? 'ဆိုင်များ တွေ့ရှိပါသည်' : 'Restaurants found'}
          </div>

          <div class="flex items-center flex-wrap gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">

            <!-- View Mode Toggle -->
            <div class="flex items-center bg-[#FFFDFC] p-1 rounded-2xl border border-[#E8DDD0] shadow-2xs">
              <button
                id="results-mode-list-btn"
                class="px-3 py-1.5 rounded-xl font-label text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  rState.viewMode === 'list' ? 'bg-[#9B1C25] text-white shadow-xs' : 'text-[#6D6561] hover:text-[#241A18]'
                }"
              >
                <span class="material-symbols-outlined text-sm">grid_view</span>
                <span>List</span>
              </button>
              <button
                id="results-mode-map-btn"
                class="px-3 py-1.5 rounded-xl font-label text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  rState.viewMode === 'map' ? 'bg-[#9B1C25] text-white shadow-xs' : 'text-[#6D6561] hover:text-[#241A18]'
                }"
              >
                <span class="material-symbols-outlined text-sm">map</span>
                <span>Map</span>
              </button>
            </div>

            <!-- Sort Select -->
            <div class="flex items-center gap-2 bg-[#FFFDFC] px-3.5 py-2 rounded-2xl border border-[#E8DDD0] shadow-2xs">
              <span class="font-label text-xs text-[#6D6561] font-bold">${isMm ? 'အစီအစဉ်:' : 'Sort:'}</span>
              <select id="results-sort-select" class="bg-transparent font-label text-xs font-bold text-[#241A18] focus:outline-none cursor-pointer">
                <option value="popularity" ${rState.sortBy === 'popularity' ? 'selected' : ''}>Popularity</option>
                <option value="rating" ${rState.sortBy === 'rating' ? 'selected' : ''}>Highest Rating</option>
                <option value="reviews" ${rState.sortBy === 'reviews' ? 'selected' : ''}>Most Reviews</option>
              </select>
            </div>

          </div>

        </div>

        <!-- MAIN CONTENT: LIST OR MAP -->
        ${
          rState.viewMode === 'list'
            ? `
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${
                  filtered.length > 0
                    ? filtered.map(rest => renderSearchResultCard(rest, state)).join('')
                    : `
                      <div class="col-span-full flex flex-col items-center justify-center py-12 px-4 text-center">
                        <div class="w-16 h-16 rounded-full bg-[#F3DFD5] flex items-center justify-center text-[#9B1C25] mb-4 shadow-sm">
                          <span class="material-symbols-outlined text-3xl">search_off</span>
                        </div>
                        <h3 class="font-headline text-lg font-bold text-[#241A18] mb-1">
                          ${isMm ? 'ကိုက်ညီသော စားသောက်ဆိုင် မတွေ့ရှိပါ' : 'No matching restaurants found'}
                        </h3>
                        <p class="font-body text-xs sm:text-sm text-[#6D6561] max-w-md mb-6">
                          ${isMm ? 'ရှာဖွေမှု သတ်မှတ်ချက်များကို ပြောင်းလဲပြီး ထပ်မံကြိုးစားကြည့်ပါ' : 'Try broadening your search keyword or resetting specific search conditions.'}
                        </p>
                        <button
                          id="results-empty-open-cond-btn"
                          class="px-5 py-2.5 rounded-full bg-[#9B1C25] text-white font-label text-xs font-bold hover:bg-[#7F161E] transition-all cursor-pointer shadow-sm active:scale-95"
                        >
                          ${isMm ? 'သတ်မှတ်ချက်များ ပြင်ဆင်ရှာဖွေမည်' : 'Adjust Search Conditions'}
                        </button>
                      </div>
                    `
                }
              </div>
            `
            : `
              <!-- MAP VIEW MOCKUP -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                <div class="lg:col-span-8 bg-[#241A18] rounded-3xl border border-[#E8DDD0] h-[500px] relative overflow-hidden flex items-center justify-center p-6 shadow-xl">
                  <!-- SVG Map Layout -->
                  <svg class="w-full h-full opacity-20" viewBox="0 0 800 500" fill="none">
                    <path d="M50 200 C 200 100, 400 300, 750 150" stroke="#EADFD1" stroke-width="20" stroke-linecap="round"/>
                    <path d="M100 400 C 300 350, 500 450, 700 380" stroke="#EADFD1" stroke-width="12" stroke-linecap="round"/>
                    <circle cx="350" cy="220" r="80" fill="#EADFD1" opacity="0.3"/>
                  </svg>
                  <div class="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white font-label text-xs flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-[#104b2b] animate-pulse"></span>
                    <span>Yangon Dining Map View</span>
                  </div>

                  <!-- Map Pins -->
                  ${filtered
                    .map((rest, index) => {
                      const coords = [
                        { x: '35%', y: '40%' },
                        { x: '60%', y: '30%' },
                        { x: '45%', y: '65%' },
                        { x: '75%', y: '50%' }
                      ];
                      const pos = coords[index % coords.length];
                      const isActive = rState.activeMapPin === rest.id || (!rState.activeMapPin && index === 0);

                      return `
                        <button
                          data-map-pin-id="${rest.id}"
                          style="left: ${pos.x}; top: ${pos.y};"
                          class="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-125 cursor-pointer z-20 ${
                            isActive ? 'scale-125 z-30' : ''
                          }"
                        >
                          <div class="relative flex flex-col items-center">
                            <div class="px-3 py-1 rounded-full font-label text-xs font-bold shadow-lg border flex items-center gap-1 ${
                              isActive
                                ? 'bg-[#9B1C25] text-white border-[#9B1C25]'
                                : 'bg-white text-[#241A18] border-[#E8DDD0]'
                            }">
                              <span class="material-symbols-outlined text-sm text-[#D08E1C]">star</span>
                              <span>${rest.name.split(' ')[0]}</span>
                            </div>
                            <div class="w-2 h-2 bg-[#9B1C25] rotate-45 -mt-1"></div>
                          </div>
                        </button>
                      `;
                    })
                    .join('')}
                </div>

                <!-- Map Selected Card Preview -->
                <div class="lg:col-span-4">
                  ${(() => {
                    const activeRest = filtered.find(r => r.id === rState.activeMapPin) || filtered[0];
                    if (!activeRest) return '<div class="text-xs text-[#6D6561]">No venue selected</div>';
                    return renderSearchResultCard(activeRest, state);
                  })()}
                </div>

              </div>
            `
        }

        <!-- PAGINATION BAR -->
        <div class="flex justify-center items-center gap-2 pt-8">
          <button class="w-10 h-10 rounded-full bg-[#FFFDFC] border border-[#E8DDD0] text-[#6D6561] flex items-center justify-center cursor-pointer hover:bg-[#9B1C25] hover:text-white transition-colors">
            <span class="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button class="w-10 h-10 rounded-full bg-[#9B1C25] text-white font-label text-xs font-bold shadow-sm">1</button>
          <button class="w-10 h-10 rounded-full bg-[#FFFDFC] border border-[#E8DDD0] text-[#6D6561] font-label text-xs font-bold hover:bg-white cursor-pointer">2</button>
          <button class="w-10 h-10 rounded-full bg-[#FFFDFC] border border-[#E8DDD0] text-[#6D6561] font-label text-xs font-bold hover:bg-white cursor-pointer">3</button>
          <button class="w-10 h-10 rounded-full bg-[#FFFDFC] border border-[#E8DDD0] text-[#6D6561] flex items-center justify-center cursor-pointer hover:bg-[#9B1C25] hover:text-white transition-colors">
            <span class="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>

      </div>
    `;
  }

  function attachResultListViewEvents(containerElement = document) {
    attachRestaurantCardEvents(containerElement);

    // Keyword input
    const kwInput = containerElement.querySelector('#results-keyword-input');
    if (kwInput) {
      kwInput.addEventListener('input', (e) => {
        store.updateResultsState('keyword', e.target.value);
      });
    }

    // Clear keyword button
    const clearKwBtn = containerElement.querySelector('#results-clear-kw');
    if (clearKwBtn) {
      clearKwBtn.addEventListener('click', () => {
        store.updateResultsState('keyword', '');
      });
    }

    // Open Search Conditions Modal
    const openCondBtn = containerElement.querySelector('#results-open-conditions-btn');
    if (openCondBtn) {
      openCondBtn.addEventListener('click', () => {
        store.openSearchConditions();
      });
    }

    const emptyOpenCondBtn = containerElement.querySelector('#results-empty-open-cond-btn');
    if (emptyOpenCondBtn) {
      emptyOpenCondBtn.addEventListener('click', () => {
        store.openSearchConditions();
      });
    }

    // Remove single condition badge
    containerElement.querySelectorAll('[data-remove-condition]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const type = btn.getAttribute('data-remove-condition');
        const val = btn.getAttribute('data-condition-val');

        if (type === 'area_item') {
          const curAreas = (store.getState().resultsState.selectedAreas || []).filter(a => a !== val && a !== 'All Areas');
          const nextAreas = curAreas.length > 0 ? curAreas : ['All Areas'];
          store.updateResultsState({
            area: nextAreas.length === 1 ? nextAreas[0] : (nextAreas.length > 1 ? `${nextAreas.length} Townships` : 'All Areas'),
            selectedAreas: nextAreas
          });
        } else if (type === 'cuisine_item') {
          const curCuisines = (store.getState().resultsState.selectedCuisines || []).filter(c => c !== val && c !== 'All Cuisines');
          const nextCuisines = curCuisines.length > 0 ? curCuisines : ['All Cuisines'];
          store.updateResultsState({
            cuisine: nextCuisines.length === 1 ? nextCuisines[0] : (nextCuisines.length > 1 ? `${nextCuisines.length} Cuisines` : 'All Cuisines'),
            selectedCuisines: nextCuisines
          });
        } else if (type === 'date') {
          store.updateResultsState({
            dateMode: 'any',
            selectedDate: 'any',
            dateLabel: 'Any Date'
          });
        } else if (type === 'time') {
          store.updateResultsState({
            timeMode: 'any',
            time: 'any'
          });
        } else if (type === 'partySize') {
          store.updateResultsState('partySize', 'All Sizes');
        } else if (type === 'budgetTier') {
          store.updateResultsState('budgetTier', 'all');
        } else if (type === 'seating') {
          store.updateResultsState('seatingPreference', 'all');
        } else if (type === 'feature') {
          const cur = store.getState().resultsState.selectedFeatures || [];
          store.updateResultsState('selectedFeatures', cur.filter(f => f !== val));
        }
      });
    });

    // Clear all conditions button
    const clearAllBtn = containerElement.querySelector('#results-clear-all-conditions-btn');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', () => {
        store.resetSearchConditions();
      });
    }

    // View Mode List / Map
    const listModeBtn = containerElement.querySelector('#results-mode-list-btn');
    if (listModeBtn) {
      listModeBtn.addEventListener('click', () => {
        store.updateResultsState('viewMode', 'list');
      });
    }

    const mapModeBtn = containerElement.querySelector('#results-mode-map-btn');
    if (mapModeBtn) {
      mapModeBtn.addEventListener('click', () => {
        store.updateResultsState('viewMode', 'map');
      });
    }

    // Sort select
    const sortSelect = containerElement.querySelector('#results-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        store.updateResultsState('sortBy', e.target.value);
      });
    }

    // Map Pins click
    containerElement.querySelectorAll('[data-map-pin-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pinId = e.currentTarget.getAttribute('data-map-pin-id');
        store.updateResultsState('activeMapPin', pinId);
      });
    });
  }

  window.YoyakuComponents.renderResultListView = renderResultListView;
  window.YoyakuComponents.attachResultListViewEvents = attachResultListViewEvents;
})();
