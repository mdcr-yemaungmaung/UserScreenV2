(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;
  const { RESTAURANTS_DATA } = window.YoyakuData;
  const { renderSearchResultCard, attachRestaurantCardEvents } = window.YoyakuComponents;





  function renderResultListView(state) {
    const isMm = state.currentLanguage === 'MM';
    const rState = state.resultsState;

    // Filter Logic
    let filtered = RESTAURANTS_DATA.filter(restaurant => {
      // Keyword match
      if (rState.keyword.trim() !== '') {
        const kw = rState.keyword.toLowerCase();
        const matchName = restaurant.name.toLowerCase().includes(kw);
        const matchCuisine = restaurant.cuisine.toLowerCase().includes(kw);
        const matchLocation = restaurant.location.toLowerCase().includes(kw);
        const matchTagline = restaurant.tagline.toLowerCase().includes(kw);
        if (!matchName && !matchCuisine && !matchLocation && !matchTagline) return false;
      }

      // Area match
      if (rState.area !== 'All Areas') {
        if (!restaurant.location.toLowerCase().includes(rState.area.toLowerCase())) return false;
      }

      // Cuisine match
      if (rState.cuisine !== 'All Cuisines') {
        if (restaurant.cuisine.toLowerCase() !== rState.cuisine.toLowerCase()) return false;
      }

      // Price Filter
      if (rState.minPrice) {
        const minNum = parseInt(rState.minPrice, 10);
        if (!isNaN(minNum) && minNum > 0) {
          // Simple check
        }
      }

      // Features filter
      if (rState.selectedFeatures && rState.selectedFeatures.length > 0) {
        const hasAllFeatures = rState.selectedFeatures.every(f =>
          restaurant.features.some(rf => rf.toLowerCase().includes(f.toLowerCase()))
        );
        if (!hasAllFeatures) return false;
      }

      return true;
    });

    // Sorting
    if (rState.sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (rState.sortBy === 'reviews') {
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    const areasList = ['All Areas', 'Yangon Downtown', 'Dagon Township', 'Ahlone Township', 'Bahan Township', 'Inya Lake Waterfront'];
    const cuisinesList = ['All Cuisines', 'Burmese', 'Teahouse & Snacks', 'Casual Dining', 'European', 'French', 'Japanese', 'Italian'];
    const featuresList = ['Wi-Fi', 'Pet Friendly', 'Outdoor Seating', 'Air Conditioned', 'Valet Parking'];

    const hasExtraFilters = rState.partySize !== 'All Sizes' || rState.minPrice || rState.maxPrice || (rState.selectedFeatures && rState.selectedFeatures.length > 0);

    return `
      <div class="space-y-8 pb-16 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        
        <!-- HEADER TITLE -->
        <div>
          <h2 class="font-headline text-2xl sm:text-3xl font-bold text-[#231916]">
            ${isMm ? 'စားသောက်ဆိုင်များ ရှာဖွေရန်' : 'Search Dining Venues'}
          </h2>
        </div>

        <!-- SEARCH & FILTER CAPSULE BAR -->
        <div class="bg-[#FBF3E2] p-4 sm:p-5 rounded-3xl border border-[#EADFD1] shadow-sm sm:shadow-[0_4px_24px_rgba(43,33,29,.06)] space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            <!-- Keyword input -->
            <div class="md:col-span-4 bg-[#FFF8F6] hover:bg-white border border-[#EADFD1] focus-within:border-[#840f16] focus-within:ring-2 focus-within:ring-[#840f16]/15 rounded-2xl px-3.5 py-2.5 flex items-center gap-2 transition-all duration-200 active:scale-[.99]">
              <span class="material-symbols-outlined text-[#840f16]">search</span>
              <input
                type="text"
                id="results-keyword-input"
                placeholder="${isMm ? 'ဆိုင်အမည် သို့မဟုတ် နေရာ...' : 'Search venue or keyword...'}"
                value="${rState.keyword || ''}"
                class="w-full bg-transparent font-body text-xs sm:text-sm text-[#231916] placeholder:text-[#8d7b75] focus:outline-none"
              />
              ${
                rState.keyword
                  ? `<button id="results-clear-kw" class="text-[#58413f] hover:text-[#840f16] transition-transform duration-200 hover:scale-110 active:scale-95 animate-fadeIn cursor-pointer">
                      <span class="material-symbols-outlined text-sm">close</span>
                    </button>`
                  : ''
              }
            </div>

            <!-- Area Select -->
            <div class="relative md:col-span-3 bg-[#FFF8F6] hover:bg-white border border-[#EADFD1] focus-within:border-[#840f16] focus-within:ring-2 focus-within:ring-[#840f16]/15 rounded-2xl px-3.5 py-2.5 flex items-center gap-2 transition-all duration-200">
              <span class="material-symbols-outlined text-[#840f16]">location_on</span>
              <select id="results-area-select" class="w-full bg-transparent font-label text-xs sm:text-sm text-[#231916] focus:outline-none cursor-pointer appearance-none pr-6">
                ${areasList.map(area => `<option value="${area}" ${rState.area === area ? 'selected' : ''}>${area}</option>`).join('')}
              </select>
              <span class="material-symbols-outlined text-[#8d7b75] text-sm absolute right-3 pointer-events-none">expand_more</span>
            </div>

            <!-- Cuisine Select -->
            <div class="relative md:col-span-3 bg-[#FFF8F6] hover:bg-white border border-[#EADFD1] focus-within:border-[#840f16] focus-within:ring-2 focus-within:ring-[#840f16]/15 rounded-2xl px-3.5 py-2.5 flex items-center gap-2 transition-all duration-200">
              <span class="material-symbols-outlined text-[#840f16]">restaurant_menu</span>
              <select id="results-cuisine-select" class="w-full bg-transparent font-label text-xs sm:text-sm text-[#231916] focus:outline-none cursor-pointer appearance-none pr-6">
                ${cuisinesList.map(c => `<option value="${c}" ${rState.cuisine === c ? 'selected' : ''}>${c}</option>`).join('')}
              </select>
              <span class="material-symbols-outlined text-[#8d7b75] text-sm absolute right-3 pointer-events-none">expand_more</span>
            </div>

            <!-- Filter Toggle & Reset Buttons -->
            <div class="md:col-span-2 flex items-center gap-2">
              <button
                id="results-toggle-filters-btn"
                class="flex-1 py-2.5 px-3 rounded-2xl border font-label text-xs font-bold transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-1.5 relative ${
                  rState.showMoreFilters || hasExtraFilters
                    ? 'bg-[#840f16] text-white border-[#840f16]'
                    : 'bg-[#FFF8F6] text-[#58413f] border-[#EADFD1] hover:text-[#231916]'
                }"
              >
                <span class="material-symbols-outlined text-sm">tune</span>
                <span>${isMm ? 'စစ်ထုတ်ရန်' : 'Filters'}</span>
                ${
                  hasExtraFilters
                    ? `<span class="w-2 h-2 rounded-full bg-[#D08E1C] absolute top-2 right-2 animate-pulse"></span>`
                    : ''
                }
              </button>

              <button
                id="results-reset-btn"
                title="Reset Filters"
                class="p-2.5 rounded-2xl bg-[#FFF8F6] border border-[#EADFD1] text-[#58413f] hover:text-[#840f16] transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center"
              >
                <span class="material-symbols-outlined text-sm">restart_alt</span>
              </button>
            </div>

          </div>

          <!-- EXPANDABLE ADVANCED FILTERS -->
          ${
            rState.showMoreFilters
              ? `
              <div class="pt-4 border-t border-[#EADFD1] grid grid-cols-1 md:grid-cols-12 gap-6 animate-fadeIn">
                
                <!-- Party Size -->
                <div class="md:col-span-4 space-y-2">
                  <label class="font-label text-xs font-bold text-[#58413f] uppercase tracking-wider block">Party Size</label>
                  <div class="relative flex items-center gap-2 bg-[#FFF8F6] hover:bg-white border border-[#EADFD1] focus-within:border-[#840f16] focus-within:ring-2 focus-within:ring-[#840f16]/15 rounded-2xl px-3 py-2 transition-all duration-200">
                    <span class="material-symbols-outlined text-sm text-[#840f16]">group</span>
                    <select id="results-partysize-select" class="w-full bg-transparent font-label text-xs text-[#231916] focus:outline-none cursor-pointer appearance-none pr-6">
                      <option value="All Sizes">All Sizes</option>
                      <option value="1">1 Person</option>
                      <option value="2">2 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="6">6 Guests</option>
                      <option value="8+">8+ Large Group</option>
                    </select>
                    <span class="material-symbols-outlined text-[#8d7b75] text-sm absolute right-3 pointer-events-none">expand_more</span>
                  </div>
                </div>

                <!-- Price Range -->
                <div class="md:col-span-4 space-y-2">
                  <label class="font-label text-xs font-bold text-[#58413f] uppercase tracking-wider block">Price Range (MMK)</label>
                  <div class="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      id="results-minprice-input"
                      placeholder="Min MMK"
                      value="${rState.minPrice || ''}"
                      class="bg-[#FFF8F6] hover:bg-white border border-[#EADFD1] focus:border-[#840f16] focus:ring-2 focus:ring-[#840f16]/15 rounded-2xl px-3 py-2 font-body text-xs text-[#231916] placeholder:text-[#8d7b75] focus:outline-none transition-all duration-200"
                    />
                    <input
                      type="number"
                      id="results-maxprice-input"
                      placeholder="Max MMK"
                      value="${rState.maxPrice || ''}"
                      class="bg-[#FFF8F6] hover:bg-white border border-[#EADFD1] focus:border-[#840f16] focus:ring-2 focus:ring-[#840f16]/15 rounded-2xl px-3 py-2 font-body text-xs text-[#231916] placeholder:text-[#8d7b75] focus:outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                <!-- Amenities Pills -->
                <div class="md:col-span-4 space-y-2">
                  <label class="font-label text-xs font-bold text-[#58413f] uppercase tracking-wider block">Features & Amenities</label>
                  <div class="flex flex-wrap gap-2">
                    ${featuresList
                      .map(f => {
                        const isSelected = rState.selectedFeatures && rState.selectedFeatures.includes(f);
                        return `
                          <button
                            data-feature-toggle="${f}"
                            class="px-3 py-1.5 rounded-full border text-xs font-label font-semibold transition-all duration-200 active:scale-95 cursor-pointer ${
                              isSelected
                                ? 'bg-[#840f16] text-white border-[#840f16]'
                                : 'bg-[#FFF8F6] text-[#58413f] border-[#EADFD1] hover:border-[#840f16]'
                            }"
                          >
                            ${f}
                          </button>
                        `;
                      })
                      .join('')}
                  </div>
                </div>

              </div>
            `
              : ''
          }
        </div>

        <!-- RESULTS TOOLBAR: COUNT, SORT, VIEW MODE (Clean layout without box shape) -->
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-1">
          
          <div class="font-headline text-base font-bold text-[#231916]">
            ${filtered.length} ${isMm ? 'ဆိုင်များ တွေ့ရှိပါသည်' : 'Restaurants found'}
          </div>

          <div class="flex items-center flex-wrap gap-2 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
            
            <!-- View Mode Toggle -->
            <div class="flex items-center bg-white p-1 rounded-xl border border-[#EADFD1] shadow-2xs">
              <button
                id="results-mode-list-btn"
                class="px-3 py-1.5 rounded-lg font-label text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  rState.viewMode === 'list' ? 'bg-[#840f16] text-white shadow-xs' : 'text-[#58413f] hover:text-[#231916]'
                }"
              >
                <span class="material-symbols-outlined text-sm">grid_view</span>
                <span>List</span>
              </button>
              <button
                id="results-mode-map-btn"
                class="px-3 py-1.5 rounded-lg font-label text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  rState.viewMode === 'map' ? 'bg-[#840f16] text-white shadow-xs' : 'text-[#58413f] hover:text-[#231916]'
                }"
              >
                <span class="material-symbols-outlined text-sm">map</span>
                <span>Map</span>
              </button>
            </div>

            <!-- Sort Select -->
            <div class="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-[#EADFD1] shadow-2xs">
              <span class="font-label text-xs text-[#58413f] font-bold">Sort:</span>
              <select id="results-sort-select" class="bg-transparent font-label text-xs font-bold text-[#231916] focus:outline-none cursor-pointer">
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
                      <div class="col-span-full flex justify-center">
                        ${window.YoyakuComponents.renderEmptyState({
                          icon: 'search_off',
                          title: 'No matching restaurants found',
                          message: 'Try clearing filters or search keywords.'
                        })}
                      </div>
                    `
                }
              </div>
            `
            : `
              <!-- MAP VIEW MOCKUP -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                
                <div class="lg:col-span-8 bg-[#231916] rounded-3xl border border-[#EADFD1] h-[500px] relative overflow-hidden flex items-center justify-center p-6 shadow-xl">
                  <!-- SVG Map Layout -->
                  <svg class="w-full h-full opacity-20" viewBox="0 0 800 500" fill="none">
                    <path d="M50 200 C 200 100, 400 300, 750 150" stroke="#EADFD1" stroke-width="20" stroke-linecap="round"/>
                    <path d="M100 400 C 300 350, 500 450, 700 380" stroke="#EADFD1" stroke-width="12" stroke-linecap="round"/>
                    <circle cx="350" cy="220" r="80" fill="#EADFD1" opacity="0.3"/>
                  </svg>
                  <div class="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white font-label text-xs flex items-center gap-2">
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
                                ? 'bg-[#840f16] text-white border-[#840f16]'
                                : 'bg-white text-[#231916] border-[#EADFD1]'
                            }">
                              <span class="material-symbols-outlined text-sm text-[#D08E1C]">star</span>
                              <span>${rest.name.split(' ')[0]}</span>
                            </div>
                            <div class="w-2 h-2 bg-[#840f16] rotate-45 -mt-1"></div>
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
                    if (!activeRest) return '<div class="text-xs text-[#58413f]">No venue selected</div>';
                    return renderSearchResultCard(activeRest, state);
                  })()}
                </div>

              </div>
            `
        }

        <!-- PAGINATION BAR -->
        <div class="flex justify-center items-center gap-2 pt-8">
          <button class="w-10 h-10 rounded-full bg-[#FBF3E2] border border-[#EADFD1] text-[#58413f] flex items-center justify-center cursor-pointer hover:bg-[#840f16] hover:text-white transition-colors">
            <span class="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button class="w-10 h-10 rounded-full bg-[#840f16] text-white font-label text-xs font-bold shadow-sm">1</button>
          <button class="w-10 h-10 rounded-full bg-[#FBF3E2] border border-[#EADFD1] text-[#58413f] font-label text-xs font-bold hover:bg-white cursor-pointer">2</button>
          <button class="w-10 h-10 rounded-full bg-[#FBF3E2] border border-[#EADFD1] text-[#58413f] font-label text-xs font-bold hover:bg-white cursor-pointer">3</button>
          <button class="w-10 h-10 rounded-full bg-[#FBF3E2] border border-[#EADFD1] text-[#58413f] flex items-center justify-center cursor-pointer hover:bg-[#840f16] hover:text-white transition-colors">
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

    // Area select
    const areaSelect = containerElement.querySelector('#results-area-select');
    if (areaSelect) {
      areaSelect.addEventListener('change', (e) => {
        store.updateResultsState('area', e.target.value);
      });
    }

    // Cuisine select
    const cuisineSelect = containerElement.querySelector('#results-cuisine-select');
    if (cuisineSelect) {
      cuisineSelect.addEventListener('change', (e) => {
        store.updateResultsState('cuisine', e.target.value);
      });
    }

    // Toggle Filters expander
    const toggleFiltersBtn = containerElement.querySelector('#results-toggle-filters-btn');
    if (toggleFiltersBtn) {
      toggleFiltersBtn.addEventListener('click', () => {
        const cur = store.getState().resultsState.showMoreFilters;
        store.updateResultsState('showMoreFilters', !cur);
      });
    }

    // Reset Filters
    const resetBtn = containerElement.querySelector('#results-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        store.updateResultsState({
          keyword: '',
          area: 'All Areas',
          cuisine: 'All Cuisines',
          partySize: 'All Sizes',
          showMoreFilters: false,
          minPrice: '',
          maxPrice: '',
          selectedFeatures: [],
          sortBy: 'popularity'
        });
      });
    }

    // Party size select
    const partySelect = containerElement.querySelector('#results-partysize-select');
    if (partySelect) {
      partySelect.addEventListener('change', (e) => {
        store.updateResultsState('partySize', e.target.value);
      });
    }

    // Price inputs
    const minPriceInput = containerElement.querySelector('#results-minprice-input');
    if (minPriceInput) {
      minPriceInput.addEventListener('change', (e) => {
        store.updateResultsState('minPrice', e.target.value);
      });
    }

    const maxPriceInput = containerElement.querySelector('#results-maxprice-input');
    if (maxPriceInput) {
      maxPriceInput.addEventListener('change', (e) => {
        store.updateResultsState('maxPrice', e.target.value);
      });
    }

    // Features toggle
    containerElement.querySelectorAll('[data-feature-toggle]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const feature = e.currentTarget.getAttribute('data-feature-toggle');
        const curFeatures = store.getState().resultsState.selectedFeatures || [];
        let next;
        if (curFeatures.includes(feature)) {
          next = curFeatures.filter(f => f !== feature);
        } else {
          next = [...curFeatures, feature];
        }
        store.updateResultsState('selectedFeatures', next);
      });
    });

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
