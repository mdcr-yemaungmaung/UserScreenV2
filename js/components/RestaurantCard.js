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
        class="absolute top-3 right-3 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 backdrop-blur-md text-[#840f16] shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer z-10"
        title="Favorite"
        aria-label="Add to Favorites"
      >
        <span class="material-symbols-outlined text-lg sm:text-xl ${isFavorite ? 'fill-1 text-[#840f16]' : 'text-[#840f16]'}">favorite</span>
      </button>
    `;
  }

  // Rating badge (bottom-left on image)
  function renderRatingBadge(restaurant) {
    return `
      <div class="absolute bottom-3 left-3 z-10">
        <span class="inline-flex items-center gap-1.5 bg-[#840f16]/95 backdrop-blur-md px-3 py-1 sm:py-1.5 rounded-xl shadow-md font-label text-[11px] sm:text-xs font-bold text-white">
          <span class="material-symbols-outlined text-xs sm:text-sm text-[#D08E1C] fill-1 leading-none">star</span>
          <span class="leading-none">${restaurant.rating}</span>
          <span class="text-white/90 font-medium leading-none">(${restaurant.reviewCount})</span>
        </span>
      </div>
    `;
  }

  // Rating badge with promo tag on right (for Search Result cards)
  function renderRatingBadgeWithPromo(restaurant) {
    return `
      <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2 z-10 pointer-events-none">
        <!-- Review Tag (Left) -->
        <span class="inline-flex items-center gap-1.5 bg-[#840f16]/95 backdrop-blur-md px-3 py-1 sm:py-1.5 rounded-xl shadow-md font-label text-[11px] sm:text-xs font-bold text-white pointer-events-auto">
          <span class="material-symbols-outlined text-xs sm:text-sm text-[#D08E1C] fill-1 leading-none">star</span>
          <span class="leading-none">${restaurant.rating}</span>
          <span class="text-white/90 font-medium leading-none">(${restaurant.reviewCount})</span>
        </span>
        <!-- Promotion Tag (Right) -->
        ${restaurant.offerTag ? renderPromoTag(restaurant.offerTag, true) : ''}
      </div>
    `;
  }

  // Cuisine tag on image (top-left) - used in Trending style
  function renderCuisineTagOnImage(cuisine) {
    return renderCuisineTag(cuisine, true);
  }

  // Shared cuisine/category tag - works both on-image and in-content
  function renderCuisineTag(cuisine, onImage = false) {
    const baseClasses = 'inline-flex items-center font-label text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-xl shadow-md text-white';
    const onImageClasses = 'bg-[#840f16]/95 backdrop-blur-md';
    const inContentClasses = 'bg-[#840f16]';
    
    return `<span class="${baseClasses} ${onImage ? onImageClasses : inContentClasses}">${cuisine}</span>`;
  }

  // Shared promo/offer tag
  function renderPromoTag(offerTag, onImage = false) {
    const baseClasses = 'inline-flex items-center font-label text-[11px] sm:text-xs font-extrabold tracking-wide px-3 py-1 sm:py-1.5 rounded-xl shadow-md';
    const onImageClasses = 'bg-[#D08E1C]/95 backdrop-blur-md text-white shrink-0';
    const inContentClasses = 'bg-[#E59819] text-white'; // promo-badge-yellow
    
    return `
      <span class="${baseClasses} ${onImage ? onImageClasses : inContentClasses}" title="${offerTag}">
        <span class="font-extrabold text-white whitespace-nowrap truncate max-w-[130px] sm:max-w-[200px]">${offerTag}</span>
      </span>
    `;
  }

  // U-01 Home Page Restaurant Card (Keeps standard Reserve Table button & footer promotion tag)
  function renderRestaurantCard(restaurant, state) {
    const isFavorite = state.favorites.includes(restaurant.id);
    const isMm = state.currentLanguage === 'MM';

    return `
      <div class="w-full luxe-card group relative bg-[#FFF9EE] rounded-2xl sm:rounded-3xl border border-[#EADFD1] overflow-hidden flex flex-col justify-between shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-left">
        
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
                class="font-headline text-lg sm:text-xl md:text-2xl font-bold text-[#840f16] hover:text-[#6c0c11] transition-colors cursor-pointer leading-snug truncate"
                title="${restaurant.name}"
              >
                ${restaurant.name}
              </h3>
            </div>

            <!-- Location Row -->
            <div class="flex items-center gap-1.5 text-xs font-body text-[#58413f] font-medium pt-0.5 min-w-0">
              <span class="material-symbols-outlined text-base text-[#840f16] shrink-0">location_on</span>
              <span class="truncate" title="${restaurant.location}">${restaurant.location}</span>
            </div>

            <!-- Price Range Row -->
            <div class="flex items-center gap-1.5 text-xs font-label font-bold text-[#231916] min-w-0">
              <span class="material-symbols-outlined text-base text-[#840f16] shrink-0">payments</span>
              <span class="truncate" title="${restaurant.priceRange}">${restaurant.priceRange}</span>
            </div>
          </div>

          <!-- Footer Row: Offer & Action Button -->
          <div class="pt-3 border-t border-[#EADFD1] flex items-center justify-between gap-2 min-w-0">
            <div class="min-w-0 flex-1">
              ${restaurant.offerTag ? renderPromoTag(restaurant.offerTag, false) : renderPromoTag('20% OFF', false)}
            </div>
            <button
              data-card-reserve-id="${restaurant.id}"
              class="bg-[#840f16] hover:bg-[#6c0c11] active:scale-95 text-white px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full font-label text-xs font-bold shadow-md transition-all cursor-pointer whitespace-nowrap shrink-0"
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
      <div class="w-full luxe-card group relative bg-[#FFF9EE] rounded-2xl sm:rounded-3xl border border-[#EADFD1] overflow-hidden flex flex-col justify-between shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-left">
        
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
                class="font-headline text-lg sm:text-xl md:text-2xl font-bold text-[#840f16] hover:text-[#6c0c11] transition-colors cursor-pointer leading-snug truncate"
                title="${restaurant.name}"
              >
                ${restaurant.name}
              </h3>
            </div>

            <!-- Location Row -->
            <div class="flex items-center gap-1.5 text-xs font-body text-[#58413f] font-medium min-w-0">
              <span class="material-symbols-outlined text-base text-[#840f16] shrink-0">location_on</span>
              <span class="truncate" title="${restaurant.location}">${restaurant.location}</span>
            </div>

            <!-- Price Range Row -->
            <div class="flex items-center gap-1.5 text-xs font-label font-bold text-[#231916] min-w-0">
              <span class="material-symbols-outlined text-base text-[#840f16] shrink-0">payments</span>
              <span class="truncate" title="${restaurant.priceRange}">${restaurant.priceRange}</span>
            </div>
          </div>

          <!-- Time Slots Selection Section -->
          <div class="pt-3 border-t border-[#EADFD1] space-y-2">
            <div class="hidden sm:flex items-center justify-between">
              <div class="flex items-center gap-1 font-label text-[10px] sm:text-[11px] font-bold text-[#58413f] uppercase tracking-wider">
                <span class="material-symbols-outlined text-xs text-[#840f16]">schedule</span>
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
                  class="py-1.5 sm:py-2 px-1 sm:px-2.5 rounded-xl font-label text-xs font-bold transition-all duration-200 cursor-pointer text-center bg-[#FFF8F6] text-[#840f16] border border-[#EADFD1] hover:bg-[#840f16] hover:text-white hover:border-[#840f16] hover:shadow-md active:scale-95 flex items-center justify-center gap-1 group/time whitespace-nowrap"
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

  // Trending Venues Style Card (used in Home trending section, Hot Promotions, Reservation History)
  function renderTrendingCard(restaurant, state, options = {}) {
    const isFavorite = state.favorites.includes(restaurant.id);
    const isMm = state.currentLanguage === 'MM';
    const showVenueName = options.showVenueName !== false;
    const venueTitle = isMm ? (restaurant.venueNameMM || restaurant.venueName || restaurant.location) : (restaurant.venueName || restaurant.location || `${restaurant.name} Venue`);
    const restaurantTitle = isMm ? (restaurant.nameMM || restaurant.name) : restaurant.name;
    const locationText = restaurant.location || restaurant.area || 'Yangon';
    const rawStart = restaurant.priceRange ? restaurant.priceRange.split('-')[0].trim() : '150,000 MMK';
    const fitPrice = rawStart.endsWith('MMK') ? rawStart : `${rawStart} MMK`;
    const customAction = options.customAction || null;

    return `
      <div
        data-card-select-id="${restaurant.id}"
        class="shrink-0 w-[240px] sm:w-[280px] lg:w-auto snap-start group relative bg-[#FFF9EE] border border-[#EADFD1] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col text-left"
      >
        <!-- Image Container -->
        <div class="relative h-44 sm:h-48 lg:h-52 overflow-hidden">
          <img
            src="${restaurant.heroImage}"
            alt="${venueTitle}"
            referrerpolicy="no-referrer"
            loading="lazy"
            onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          ${renderImageGradient()}
          ${renderFavoriteButton(restaurant.id, isFavorite)}
          ${showVenueName ? renderCuisineTagOnImage(restaurant.cuisine) : ''}
          ${renderRatingBadge(restaurant)}
        </div>

        <!-- Card Content Area -->
        <div class="p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3 min-w-0">
          <div class="space-y-1.5 sm:space-y-2 min-w-0">
            ${showVenueName ? `
            <!-- Venue Name (MAIN HIGHLIGHT) -->
            <div class="w-full">
              <h3 class="font-headline text-base sm:text-lg font-bold text-[#231916] group-hover:text-[#840f16] transition-colors leading-snug truncate" title="${venueTitle}">
                ${venueTitle}
              </h3>
            </div>
            ` : ''}

            <!-- Restaurant Name & Location -->
            <div class="space-y-1 min-w-0">
              <!-- Restaurant Name -->
              <div class="flex items-center gap-1.5 text-xs text-[#58413f] font-semibold min-w-0">
                <span class="material-symbols-outlined text-sm text-[#840f16] shrink-0">storefront</span>
                <span class="truncate" title="${restaurantTitle}">${restaurantTitle}</span>
              </div>

              <!-- Location -->
              <div class="flex items-center gap-1.5 text-xs text-[#58413f] min-w-0">
                <span class="material-symbols-outlined text-sm text-[#840f16] shrink-0">location_on</span>
                <span class="truncate" title="${locationText}">${locationText}</span>
              </div>
            </div>
            </div>

          <!-- Price Row or Custom Action -->
          <div class="pt-2 border-t border-[#EADFD1] flex items-center justify-between min-w-0">
            ${customAction ? customAction(restaurant, isMm) : `
            <span class="font-label text-xs text-[#58413f] font-medium shrink-0">${isMm ? 'စျေးနှုန်း' : 'Price'}</span>
            <span class="font-label text-xs font-extrabold text-[#840f16] truncate text-right min-w-0 ml-2" title="${fitPrice}">${fitPrice}</span>
            `}
          </div>
        </div>
      </div>
    `;
  }

  // Hot Promotions Exclusive Promo Card (feature 005) - fully custom promotional
  // style reserved for the Home Hot Promotions section (justified Constitution III
  // deviation per spec FR-008 / Clarification Q2). Matches the approved reference
  // design (extra/hot promotion restaurant card.png): warm cream surface, glass
  // rating pill, solid gold offer banner with dark-cocoa uppercase text wrapping
  // up to 2 centered lines, cuisine pill chip, and a full-width BOOK NOW pill
  // that opens the booking flow. Reuses shared helpers and event hooks so
  // navigation, favorites and reserve behave identically to other cards.
  function renderPromoCard(restaurant, state) {
    const isFavorite = state.favorites.includes(restaurant.id);
    const isMm = state.currentLanguage === 'MM';
    const venueTitle = isMm ? (restaurant.venueNameMM || restaurant.venueName || restaurant.location) : (restaurant.venueName || restaurant.location || `${restaurant.name} Venue`);
    const locationText = restaurant.location || restaurant.area || 'Yangon';

    return `
      <div
        data-card-select-id="${restaurant.id}"
        class="shrink-0 w-[240px] sm:w-[280px] lg:w-auto snap-start group relative bg-[#FFF8F6] border border-[#EADFD1] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col text-left"
      >

        <!-- Card Image & Floating Badges -->
        <div class="relative h-44 sm:h-48 lg:h-52 overflow-hidden">
          <img
            src="${restaurant.heroImage}"
            alt="${venueTitle}"
            referrerpolicy="no-referrer"
            loading="lazy"
            onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <!-- Glass Rating Pill (top-left, per reference design) -->
          <div class="absolute top-3 left-3 z-10">
            <span class="inline-flex items-center gap-1.5 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md font-label text-[11px] sm:text-xs font-bold text-[#231916]">
              <span class="material-symbols-outlined text-xs sm:text-sm text-[#D08E1C] fill-1 leading-none">star</span>
              <span class="leading-none">${restaurant.rating}</span>
              <span class="text-[#58413f]/90 font-medium leading-none">(${restaurant.reviewCount})</span>
            </span>
          </div>

          ${renderFavoriteButton(restaurant.id, isFavorite)}
        </div>

        <!-- FOCAL OFFER BANNER (feature 005: solid gold, dark-cocoa uppercase text, wraps up to 2 centered lines for at-a-glance scannability) -->
        <div class="bg-[#D08E1C] px-3.5 py-2.5 flex items-center justify-center min-w-0">
          <span class="font-label text-[11px] sm:text-xs font-extrabold uppercase ${isMm ? '' : 'tracking-wider'} text-[#5a3f00] line-clamp-2 text-center leading-snug" title="${restaurant.offerTag}">
            ${restaurant.offerTag}
          </span>
        </div>

        <!-- Card Content Area: Name, Location, Price Range, Cuisine pill (ordered per request; cuisine pill sits above CTA).
             Long-text strategy: focal offer wraps (line-clamp-2); name clamps to 1 line; supporting rows truncate.
             No marquee on promo cards - keeps the section calm and scannable (SC-003), motion-free. -->
        <div class="p-4 sm:p-5 flex-1 flex flex-col space-y-2.5 sm:space-y-3 min-w-0">
          <!-- 1. Shop Name (clamp to 1 line; full name on detail page) -->
          <h3 class="font-headline text-base sm:text-lg md:text-2xl font-bold text-[#231916] group-hover:text-[#840f16] transition-colors leading-snug line-clamp-1 break-words" title="${venueTitle}">
            ${venueTitle}
          </h3>

          <!-- 2. Location Row (truncate) -->
          <div class="flex items-center gap-2 text-xs font-body text-[#58413f] font-medium min-w-0">
            <span class="material-symbols-outlined text-sm text-[#58413f] shrink-0">location_on</span>
            <span class="truncate" title="${locationText}">${locationText}</span>
          </div>

          <!-- 3. Price Range Row (truncate) -->
          <div class="flex items-center gap-2 text-xs font-body text-[#58413f] font-medium min-w-0">
            <span class="material-symbols-outlined text-sm text-[#58413f] shrink-0">payments</span>
            <span class="truncate" title="${restaurant.priceRange || ''}">${restaurant.priceRange || ''}</span>
          </div>

          <!-- 4. Cuisine Type Pill Chip (visual closer above the CTA) -->
          <div class="flex items-center gap-2 min-w-0">
            <span class="material-symbols-outlined text-sm text-[#58413f] shrink-0">restaurant</span>
            <span class="inline-block max-w-full bg-[#F3E2DC] text-[#58413f] rounded-full px-3 py-1.5 text-xs font-body font-medium truncate" title="${restaurant.cuisine}">
              ${restaurant.cuisine}
            </span>
          </div>

          <!-- Reserve CTA: full-width BOOK NOW pill, opens booking flow -->
          <div class="mt-auto pt-2">
            <button
              data-card-reserve-id="${restaurant.id}"
              class="w-full bg-[#840f16] hover:bg-[#6c0c11] active:scale-[0.98] text-white px-6 py-3 rounded-full font-label text-xs sm:text-sm font-extrabold uppercase tracking-widest shadow-md transition-all cursor-pointer text-center"
            >
              ${isMm ? 'ချက်ချင်း စိုတ်မည်' : 'Book Now'}
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
})();
