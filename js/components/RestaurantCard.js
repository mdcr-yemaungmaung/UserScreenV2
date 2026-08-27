(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;

  // ============================================================
  // Shared Overlay Components (Consistent across all card variants)
  // ============================================================

  // Gradient overlay on image bottom for text readability
  function renderImageGradient() {
    return `<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>`;
  }

  // Favorite heart button (top-right)
  function renderFavoriteButton(restaurantId, isFavorite) {
    return `
      <button
        data-card-fav-id="${restaurantId}"
        class="absolute top-3 right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FFFDFC]/90 backdrop-blur-md text-[#9B1C25] shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer z-10"
        title="Favorite"
        aria-label="Add to Favorites"
      >
        <span class="material-symbols-outlined text-lg sm:text-xl ${isFavorite ? 'fill-1 text-[#9B1C25]' : 'text-[#9B1C25]'}">favorite</span>
      </button>
    `;
  }

  // Rating badge (top-left on image, standard across all card types)
  function renderRatingBadge(restaurant) {
    return `
      <div class="absolute top-3 left-3 z-10">
        <span class="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 sm:py-1.5 rounded-full shadow-md font-label text-[11px] sm:text-xs font-bold text-white">
          <span class="material-symbols-outlined text-xs sm:text-sm text-[#C69A2B] fill-1 leading-none">star</span>
          <span class="leading-none text-white">${restaurant.rating}</span>
          <span class="text-white/80 font-medium leading-none">(${restaurant.reviewCount})</span>
        </span>
      </div>
    `;
  }

  // Rating badge with promo tag on right (for Search Result cards)
  function renderRatingBadgeWithPromo(restaurant) {
    return `
      <div class="absolute top-3 left-3 z-10 pointer-events-auto">
        <span class="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 sm:py-1.5 rounded-full shadow-md font-label text-[11px] sm:text-xs font-bold text-white">
          <span class="material-symbols-outlined text-xs sm:text-sm text-[#D08E1C] fill-1 leading-none">star</span>
          <span class="leading-none text-white">${restaurant.rating}</span>
          <span class="text-white/80 font-medium leading-none">(${restaurant.reviewCount})</span>
        </span>
      </div>
      ${restaurant.offerTag ? `<div class="absolute bottom-3 right-3 z-10 pointer-events-auto">${renderPromoTag(restaurant.offerTag, true)}</div>` : ''}
    `;
  }

  // Cuisine tag on image (top-left) - used in Trending style
  function renderCuisineTagOnImage(cuisine) {
    return renderCuisineTag(cuisine, true);
  }

  // Shared cuisine/category tag - works both on-image and in-content
  function renderCuisineTag(cuisine, onImage = false) {
    const baseClasses = 'inline-flex items-center font-label text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-xl shadow-md text-white';
    const onImageClasses = 'bg-[#9B1C25]/92 backdrop-blur-md';
    const inContentClasses = 'bg-[#9B1C25]';

    return `<span class="${baseClasses} ${onImage ? onImageClasses : inContentClasses}">${cuisine}</span>`;
  }

  // Shared promo/offer tag
  function renderPromoTag(offerTag, onImage = false) {
    const baseClasses = 'inline-flex items-center font-label text-[11px] sm:text-xs font-extrabold tracking-wide px-3 py-1 sm:py-1.5 rounded-xl shadow-md';
    const onImageClasses = 'bg-[#C69A2B]/95 backdrop-blur-md text-white shrink-0';
    const inContentClasses = 'bg-[#F3DFD5] text-[#9B1C25]';
    const labelClasses = onImage ? 'text-white' : 'text-[#9B1C25]';

    return `
      <span class="${baseClasses} ${onImage ? onImageClasses : inContentClasses}" title="${offerTag}">
        <span class="font-extrabold ${labelClasses} whitespace-nowrap truncate max-w-[130px] sm:max-w-[200px]">${offerTag}</span>
      </span>
    `;
  }

  function getPromoCardPromotions(restaurant) {
    const sourcePromotions = Array.isArray(restaurant.promotions)
      ? restaurant.promotions.filter((promotion) => {
          const title = typeof promotion?.title === 'string' ? promotion.title.trim() : '';
          const offerTag = typeof promotion?.offerTag === 'string' ? promotion.offerTag.trim() : '';
          return Boolean(title || offerTag);
        })
      : [];

    if (sourcePromotions.length) {
      return sourcePromotions.map((promotion) => ({
        title: (promotion.title || promotion.offerTag || restaurant.offerTag || 'Special Offer').trim(),
        detail: (promotion.detail || '').trim(),
        validity: (promotion.validity || '').trim(),
      }));
    }

    const legacyOffer = typeof restaurant.offerTag === 'string' ? restaurant.offerTag.trim() : '';
    return legacyOffer ? [{ title: legacyOffer, detail: '', validity: '' }] : [];
  }

  function hasPromoCardOffer(restaurant) {
    return getPromoCardPromotions(restaurant).length > 0;
  }

  // U-01 Home Page Restaurant Card (Keeps standard Reserve Table button & footer promotion tag)
  function renderRestaurantCard(restaurant, state) {
    const isFavorite = state.favorites.includes(restaurant.id);
    const isMm = state.currentLanguage === 'MM';

    return `
      <div class="w-full luxe-card group relative bg-[#FFFDFC] rounded-2xl sm:rounded-3xl border border-[#E8DDD0] overflow-hidden flex flex-col justify-between shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-left">

        <!-- Card Image & Floating Badges -->
        <div class="relative h-44 sm:h-52 md:h-56 overflow-hidden cursor-pointer" data-card-select-id="${restaurant.id}">
          <img
            src="${restaurant.heroImage}"
            alt="${restaurant.name}"
            referrerpolicy="no-referrer"
            loading="lazy"
            onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          ${renderImageGradient()}
          ${renderFavoriteButton(restaurant.id, isFavorite)}
          ${renderRatingBadge(restaurant)}
        </div>

        <!-- Card Content Body -->
        <div class="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3 min-w-0">
          <div class="space-y-1 sm:space-y-1.5 min-w-0">
            <!-- Cuisine Tag -->
            <div>
              ${renderCuisineTag(restaurant.cuisine, false)}
            </div>

            <!-- Restaurant Name -->
            <div class="w-full">
              <h3
                data-card-select-id="${restaurant.id}"
                class="font-headline text-lg sm:text-xl md:text-2xl font-bold text-[#241A18] hover:text-[#9B1C25] transition-colors cursor-pointer leading-snug truncate"
                title="${restaurant.name}"
              >
                ${restaurant.name}
              </h3>
            </div>

            <!-- Location Row -->
            <div class="flex items-center gap-1.5 text-xs font-body text-[#6D6561] font-medium pt-0.5 min-w-0">
              <span class="material-symbols-outlined text-base text-[#9B1C25] shrink-0">location_on</span>
              <span class="truncate" title="${restaurant.location}">${restaurant.location}</span>
            </div>

            <!-- Price Range Row -->
            <div class="flex items-center gap-1.5 text-xs font-label font-bold text-[#241A18] min-w-0">
              <span class="material-symbols-outlined text-base text-[#9B1C25] shrink-0">payments</span>
              <span class="truncate" title="${restaurant.priceRange}">${restaurant.priceRange}</span>
            </div>
          </div>

          <!-- Footer Row: Offer & Action Button -->
          <div class="pt-3 border-t border-[#E8DDD0] flex items-center justify-between gap-2 min-w-0">
            <div class="min-w-0 flex-1">
              ${restaurant.offerTag ? renderPromoTag(restaurant.offerTag, false) : renderPromoTag('20% OFF', false)}
            </div>
            <button
              data-card-reserve-id="${restaurant.id}"
              class="bg-[#9B1C25] hover:bg-[#7F161E] active:scale-95 text-white px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full font-label text-xs font-bold shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              ${isMm ? 'ဝိုင်းစိုတ်ရန်' : 'Reserve Table'}
            </button>
          </div>
        </div>

      </div>
    `;
  }

  // U-02 Search Result Page Restaurant Card (Promotion tag in image right beside review tag + Time Slot buttons instead of reserve table button)
  function renderSearchResultCard(restaurant, state) {
    const isFavorite = state.favorites.includes(restaurant.id);
    const isMm = state.currentLanguage === 'MM';

    // Available time slots for fast booking
    const defaultSlots = ['12:00', '13:00', '18:00', '18:30', '19:00', '20:00'];
    const slots = restaurant.timeSlots || defaultSlots;

    return `
      <div class="w-full luxe-card group relative bg-[#FFFDFC] rounded-2xl sm:rounded-3xl border border-[#E8DDD0] overflow-hidden flex flex-col justify-between shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-left">

        <!-- Card Image & Floating Badges -->
        <div class="relative h-44 sm:h-52 md:h-56 overflow-hidden cursor-pointer" data-card-select-id="${restaurant.id}">
          <img
            src="${restaurant.heroImage}"
            alt="${restaurant.name}"
            referrerpolicy="no-referrer"
            loading="lazy"
            onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          ${renderImageGradient()}
          ${renderFavoriteButton(restaurant.id, isFavorite)}
          ${renderRatingBadge(restaurant)}
          ${restaurant.offerTag ? `<div class="absolute bottom-3 right-3 z-10">${renderPromoTag(restaurant.offerTag, true)}</div>` : ''}
        </div>

        <!-- Card Content Body -->
        <div class="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3 min-w-0">
          <div class="space-y-1 sm:space-y-1.5 min-w-0">
            <!-- Cuisine Tag -->
            <div>
              ${renderCuisineTag(restaurant.cuisine, false)}
            </div>

            <!-- Restaurant Name -->
            <div class="w-full">
              <h3
                data-card-select-id="${restaurant.id}"
                class="font-headline text-lg sm:text-xl md:text-2xl font-bold text-[#241A18] hover:text-[#9B1C25] transition-colors cursor-pointer leading-snug truncate"
                title="${restaurant.name}"
              >
                ${restaurant.name}
              </h3>
            </div>

            <!-- Location Row -->
            <div class="flex items-center gap-1.5 text-xs font-body text-[#6D6561] font-medium min-w-0">
              <span class="material-symbols-outlined text-base text-[#9B1C25] shrink-0">location_on</span>
              <span class="truncate" title="${restaurant.location}">${restaurant.location}</span>
            </div>

            <!-- Price Range Row -->
            <div class="flex items-center gap-1.5 text-xs font-label font-bold text-[#241A18] min-w-0">
              <span class="material-symbols-outlined text-base text-[#9B1C25] shrink-0">payments</span>
              <span class="truncate" title="${restaurant.priceRange}">${restaurant.priceRange}</span>
            </div>
          </div>

          <!-- Time Slots Selection Section -->
          <div class="pt-3 border-t border-[#E8DDD0] space-y-2">
            <div class="hidden sm:flex items-center justify-between">
              <div class="flex items-center gap-1 font-label text-[10px] sm:text-[11px] font-bold text-[#6D6561] uppercase tracking-wider">
                <span class="material-symbols-outlined text-xs text-[#9B1C25]">schedule</span>
                <span>${isMm ? 'ရရှိနိုင်သော အချိန်များ' : 'Available Time Slots'}</span>
              </div>
            </div>

            <!-- Time Slot Buttons Grid: responsive for mobile, tablet, and desktop -->
            <div class="grid grid-cols-3 gap-1.5 sm:gap-2">
              ${slots.slice(0, 6).map(time => `
                <button
                  type="button"
                  data-card-time-slot="${time}"
                  data-card-restaurant-id="${restaurant.id}"
                  class="py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-xl font-label text-xs font-bold transition-all duration-200 cursor-pointer text-center bg-[#FFFDFC] text-[#9B1C25] border border-[#E8DDD0] hover:bg-[#9B1C25] hover:text-white hover:border-[#9B1C25] hover:shadow-md active:scale-95 flex items-center justify-center gap-1 group/time whitespace-nowrap"
                  title="${isMm ? `${time} တွင် စားပွဲဝိုင်း စိုတ်ယူမည်` : `Book table for ${time}`}"
                >
                  <span>${time}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>

      </div>
    `;
  }

  function attachRestaurantCardEvents(containerElement = document) {
    // Favorite toggle buttons
    containerElement.querySelectorAll('[data-card-fav-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.getAttribute('data-card-fav-id');
        store.toggleFavorite(id);
      });
    });

    // Select restaurant detail
    containerElement.querySelectorAll('[data-card-select-id]').forEach(el => {
      el.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-card-select-id');
        const { RESTAURANTS_DATA } = window.YoyakuData;
        const target = RESTAURANTS_DATA.find(r => r.id === id);
        if (target) {
          store.setSelectedRestaurant(target);
        }
      });
    });

    // Copy Voucher Code Button
    containerElement.querySelectorAll('[data-promo-copy-code]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = btn.getAttribute('data-promo-copy-code') || 'PROMO20';
        navigator.clipboard?.writeText(code).catch(() => {});
        store.showToast(`Voucher code copied: ${code}`);
      });
    });

    // Quick reserve table button (used in U-01 Home)
    containerElement.querySelectorAll('[data-card-reserve-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = e.currentTarget.getAttribute('data-card-reserve-id');
        const { RESTAURANTS_DATA } = window.YoyakuData;
        const target = RESTAURANTS_DATA.find(r => r.id === id);
        if (target) {
          store.openBookingModal(target);
        }
      });
    });

    // Time Slot Instant Booking Buttons (used in U-02 Search Result Cards)
    containerElement.querySelectorAll('[data-card-time-slot]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const time = e.currentTarget.getAttribute('data-card-time-slot');
        const restId = e.currentTarget.getAttribute('data-card-restaurant-id');
        const { RESTAURANTS_DATA } = window.YoyakuData;
        const target = RESTAURANTS_DATA.find(r => r.id === restId);
        if (target) {
          const state = store.getState();
          const selectedDate = state.resultsState?.selectedDate;
          const partySizeRaw = state.resultsState?.partySize;
          const guests = (partySizeRaw && partySizeRaw !== 'All Sizes') ? parseInt(partySizeRaw, 10) || 2 : 2;
          store.openBookingModal(target, selectedDate, time, guests);
          store.showToast(`Selected ${time} table at ${target.name}`);
        }
      });
    });
  }

  function getTrendingDish(restaurant) {
    if (Array.isArray(restaurant.menuCategories)) {
      for (const cat of restaurant.menuCategories) {
        if (Array.isArray(cat.items)) {
          const pop = cat.items.find(it => it.isPopular);
          if (pop) return pop;
        }
      }
      const firstCat = restaurant.menuCategories[0];
      if (firstCat && Array.isArray(firstCat.items) && firstCat.items.length > 0) {
        return firstCat.items[0];
      }
    }
    return null;
  }

  // Trending Dishes Style Card (used in Home trending section, Component Gallery, etc.)
  function renderTrendingCard(restaurant, state, options = {}) {
    const isFavorite = state.favorites.includes(restaurant.id);
    const isMm = state.currentLanguage === 'MM';
    const restaurantTitle = isMm ? (restaurant.nameMM || restaurant.name) : restaurant.name;
    const locationText = restaurant.location || restaurant.area || 'Yangon';
    const cuisineText = restaurant.cuisine || (isMm ? 'အစားအစာမျိုးစုံ' : 'Signature Dining');

    const dish = getTrendingDish(restaurant);
    const dishTitle = dish ? (isMm ? (dish.nameMM || dish.name) : dish.name) : (isMm ? 'အထူး ဟင်းပွဲ' : 'Chef Signature Dish');
    const dishPrice = dish?.price || (restaurant.priceRange ? restaurant.priceRange.split('-')[0].trim() : '25,000 MMK');
    const dishDesc = dish ? (dish.description || '') : '';
    const cardImage = dish?.image || restaurant.heroImage || 'assets/images/gilded_fork.jpg';

    return `
      <div
        data-card-select-id="${restaurant.id}"
        class="shrink-0 w-[260px] sm:w-[290px] lg:w-auto snap-start group relative bg-[#FFFDFC] border border-[#E8DDD0] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col text-left h-full"
      >
        <!-- Image Container with Overlays -->
        <div class="relative aspect-[16/10] min-h-[190px] sm:min-h-[210px] overflow-hidden bg-[#231916]">
          <img
            src="${cardImage}"
            alt="${dishTitle}"
            referrerpolicy="no-referrer"
            loading="lazy"
            onerror="this.onerror=null; this.src='${restaurant.heroImage || 'assets/images/gilded_fork.jpg'}';"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 pointer-events-none"></div>

          <!-- Top Floating Controls -->
          <div class="absolute top-3 inset-x-3 flex items-center justify-end z-10">
            ${renderFavoriteButton(restaurant.id, isFavorite)}
          </div>

          <!-- Bottom Image Overlay: Restaurant Name above, Rating & Location under -->
          <div class="absolute bottom-3 inset-x-3.5 z-10 text-white space-y-1 pointer-events-none">
            <h3 class="font-headline text-lg sm:text-xl font-bold leading-tight truncate text-white drop-shadow-sm" title="${restaurantTitle}">
              ${restaurantTitle}
            </h3>
            <div class="flex items-center gap-1.5 text-xs text-[#f5d592] font-semibold">
              <span class="material-symbols-outlined text-xs fill-1">star</span>
              <span>${restaurant.rating || 4.9}</span>
              <span class="text-white/70">(${restaurant.reviewCount || 128})</span>
              <span class="text-white/50">•</span>
              <span class="text-white/90 font-medium truncate">${locationText}</span>
            </div>
          </div>
        </div>

        <!-- Card Content Area (Dishes Menu and Price Under) -->
        <div class="p-3.5 sm:p-4 flex-1 flex flex-col justify-between bg-[#FFFDFC] min-w-0">
          <div class="min-w-0 space-y-1">
            <!-- Food Menu Icon and Dish Title -->
            <div class="flex items-center gap-2 min-w-0">
              <span class="material-symbols-outlined text-[#9B1C25] text-xl sm:text-2xl shrink-0">restaurant_menu</span>
              <p class="font-headline text-[1.02rem] sm:text-[1.1rem] font-extrabold leading-tight text-[#241A18] truncate" title="${dishTitle}">
                ${dishTitle}
              </p>
            </div>
            ${dishDesc ? `
              <p class="text-xs sm:text-sm font-body font-medium text-[#6D6561] line-clamp-1" title="${dishDesc}">
                ${dishDesc}
              </p>
            ` : ''}
          </div>

          <!-- Price Row -->
          <div class="mt-3 pt-2.5 border-t border-[#E8DDD0] flex items-center justify-between min-w-0">
            <span class="font-label text-xs font-semibold text-[#6D6561]">${isMm ? 'စျေးနှုန်း' : 'Price'}</span>
            <span class="font-label text-sm sm:text-base font-extrabold text-[#9B1C25] truncate" title="${dishPrice}">${dishPrice}</span>
          </div>
        </div>
      </div>
    `;
  }

  // Hot Promotions Restaurant Card — Option A "Perforated Dining Pass / Golden Voucher"
  // Features a ticket-stub perforated notch divider, bold discount stamp, deal details,
  // 1-tap copyable voucher code, urgency badge, and high-impact claim & book CTA.
  function renderPromoCard(restaurant, state) {
    const isFavorite = state.favorites.includes(restaurant.id);
    const isMm = state.currentLanguage === 'MM';
    const venueTitle = isMm ? (restaurant.venueNameMM || restaurant.venueName || restaurant.nameMM || restaurant.name) : (restaurant.venueName || restaurant.name || `${restaurant.name} Venue`);
    const locationText = restaurant.location || restaurant.area || 'Yangon';
    const cuisineText = restaurant.cuisine || (isMm ? 'အစားအစာမျိုးစုံ' : 'Signature Dining');
    const promotions = getPromoCardPromotions(restaurant);
    const primaryPromotion = promotions[0] || { title: isMm ? '၂၀% လျှော့ဈေး' : '20% OFF', detail: 'À la carte Menu', validity: 'Until 10:00 PM' };
    const offerTitle = primaryPromotion.title || restaurant.offerTag || '20% OFF';
    const offerDetail = primaryPromotion.detail || (isMm ? 'စားသောက်စရိတ်' : 'Set Menu & Dining');
    const promoCode = `PROMO${(restaurant.id || '20').replace(/\D/g, '').padStart(2, '0') || '25'}`;
    const claimButtonLabel = isMm ? 'ဘောက်ချာ ရယူပြီး စိုတ်မည်' : 'Claim Voucher & Book';

    return `
      <div
        data-card-select-id="${restaurant.id}"
        class="shrink-0 w-[290px] sm:w-[320px] lg:w-[340px] snap-start group relative bg-[#FFFDFC] border border-[#E8DDD0] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col text-left h-full"
      >
        <!-- Top Section: Visual Image & Venue Identity -->
        <div class="relative h-44 sm:h-48 w-full overflow-hidden bg-[#231916]">
          <img
            src="${restaurant.heroImage || 'assets/images/gilded_fork.jpg'}"
            alt="${venueTitle}"
            referrerpolicy="no-referrer"
            loading="lazy"
            onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20 pointer-events-none"></div>

          <!-- Top Floating Controls -->
          <div class="absolute top-3 inset-x-3 flex items-center justify-end z-10">
            ${renderFavoriteButton(restaurant.id, isFavorite)}
          </div>

          <!-- Bottom Image Overlay: Venue Name above, Location & Rating under -->
          <div class="absolute bottom-3 inset-x-3.5 z-10 text-white space-y-1 pointer-events-none">
            <h3 class="font-headline text-lg sm:text-xl font-bold leading-tight truncate text-white drop-shadow-sm" title="${venueTitle}">
              ${venueTitle}
            </h3>
            <div class="flex items-center gap-1.5 text-xs text-[#f5d592] font-semibold">
              <span class="material-symbols-outlined text-xs fill-1">star</span>
              <span>${restaurant.rating || 4.9}</span>
              <span class="text-white/70">(${restaurant.reviewCount || 128})</span>
              <span class="text-white/50">•</span>
              <span class="text-white/90 font-medium truncate">${locationText}</span>
            </div>
          </div>
        </div>

        <!-- Ticket-Stub Perforated Divider (Notched Edges) -->
        <div class="relative flex items-center justify-between bg-[#FFFDFC] px-0 py-0.5 select-none pointer-events-none">
          <!-- Left Notch -->
          <div class="w-3.5 h-5 bg-[#FBF4E8] rounded-r-full border-r border-t border-b border-[#E8DDD0] -ml-px"></div>
          <!-- Perforated Dashed Line -->
          <div class="flex-1 border-b-2 border-dashed border-[#E8DDD0] mx-2"></div>
          <!-- Right Notch -->
          <div class="w-3.5 h-5 bg-[#FBF4E8] rounded-l-full border-l border-t border-b border-[#E8DDD0] -mr-px"></div>
        </div>

        <!-- Bottom Section: High-Impact Deal Engine -->
        <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5 bg-[#FFFDFC]">
          <div class="space-y-2.5">
            <!-- Promo Value Stamp -->
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-baseline gap-1.5 min-w-0">
                <span class="font-headline text-2xl sm:text-3xl font-extrabold text-[#9B1C25] leading-none shrink-0">${offerTitle}</span>
                <span class="font-label text-[11px] sm:text-xs font-bold text-[#6D6561] uppercase tracking-wide truncate">${offerDetail}</span>
              </div>
            </div>

            <!-- Description / Promo Subtext -->
            <div class="space-y-0.5">
              <h4 class="font-headline text-sm sm:text-base font-bold text-[#241A18] leading-snug line-clamp-1">
                ${restaurant.tagline || (isMm ? 'အထူး စားသောက်စရိတ် လျှော့ဈေး အစီအစဉ်' : 'Exclusive Dining Offer & Tasting Set')}
              </h4>
              <p class="font-body text-xs text-[#6D6561] line-clamp-2 leading-relaxed">
                ${isMm ? (restaurant.specialNotice || 'စားဖိုမှူးကြီး၏ အထူးဟင်းလျာများ၊ စပါကလင်းဝိုင်နှင့် အခမဲ့ အချိုပွဲ လက်ဆောင် ပါဝင်ပါသည်။') : (restaurant.description || 'Includes signature tasting menu, chef special dish, and welcome drinks.')}
              </p>
            </div>

            <!-- Promo Code & Scarcity Badge -->
            <div class="pt-1 flex flex-wrap items-center justify-between gap-2 text-xs">
              <button
                type="button"
                data-promo-copy-code="${promoCode}"
                class="group/code inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#F8EFE5] border border-[#E8DDD0] hover:border-[#9B1C25] font-mono text-[11px] font-bold text-[#241A18] transition-colors cursor-pointer"
                title="${isMm ? 'ဘောက်ချာကုဒ် ကူးယူရန် နှိပ်ပါ' : 'Click to copy voucher code'}"
              >
                <span class="text-[#9B1C25] font-bold">CODE:</span>
                <span>${promoCode}</span>
                <span class="material-symbols-outlined text-xs text-[#6D6561] group-hover/code:text-[#9B1C25]">content_copy</span>
              </button>

              <span class="inline-flex items-center gap-1 text-[11px] font-label font-bold text-[#D08E1C]">
                <span>🔥</span>
                <span>${isMm ? 'ယနေ့ ၄ ဝိုင်းသာ ကျန်ပါသည်' : 'Limited Offer'}</span>
              </span>
            </div>
          </div>

          <!-- Claim & Book CTA -->
          <div class="pt-2">
            <button
              data-card-reserve-id="${restaurant.id}"
              class="w-full bg-[#9B1C25] hover:bg-[#7F161E] active:scale-[0.98] text-white py-2.5 sm:py-3 px-4 rounded-xl sm:rounded-2xl font-label text-xs sm:text-sm font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>${claimButtonLabel}</span>
              <span class="material-symbols-outlined text-sm sm:text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  window.YoyakuComponents.renderRestaurantCard = renderRestaurantCard;
  window.YoyakuComponents.renderSearchResultCard = renderSearchResultCard;
  window.YoyakuComponents.renderTrendingCard = renderTrendingCard;
  window.YoyakuComponents.renderPromoCard = renderPromoCard;
  window.YoyakuComponents.attachRestaurantCardEvents = attachRestaurantCardEvents;
  window.YoyakuComponents.renderImageGradient = renderImageGradient;
  window.YoyakuComponents.renderFavoriteButton = renderFavoriteButton;
  window.YoyakuComponents.renderRatingBadge = renderRatingBadge;
  window.YoyakuComponents.renderRatingBadgeWithPromo = renderRatingBadgeWithPromo;
  window.YoyakuComponents.renderCuisineTag = renderCuisineTag;
  window.YoyakuComponents.renderCuisineTagOnImage = renderCuisineTagOnImage;
  window.YoyakuComponents.renderPromoTag = renderPromoTag;
  window.YoyakuComponents.getPromoCardPromotions = getPromoCardPromotions;
  window.YoyakuComponents.hasPromoCardOffer = hasPromoCardOffer;
})();
