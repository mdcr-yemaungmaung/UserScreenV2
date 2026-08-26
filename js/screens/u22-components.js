(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};

  const store = window.store;
  const C = window.YoyakuComponents;

  const TOKENS = [
    { name: 'Primary Accent', value: '#9B1C25' },
    { name: 'Accent Light', value: '#F3DFD5' },
    { name: 'Rating Accent', value: '#C69A2B' },
    { name: 'App Bg', value: '#FBF4E8' },
    { name: 'Surface', value: '#FFFDFC' },
    { name: 'Surface Muted', value: '#F8EFE5' },
    { name: 'Border', value: '#E8DDD0' },
    { name: 'Text Primary', value: '#241A18' },
    { name: 'Text Secondary', value: '#6D6561' },
    { name: 'Success', value: '#607A62' }
  ];

  function sectionHeader(titleEn, titleMm) {
    const isMm = store.getState().currentLanguage === 'MM';
    const title = isMm ? titleMm : titleEn;
    return `
      <div class="mb-4 flex items-center gap-2">
        <span class="w-1.5 h-6 rounded-full bg-[#9B1C25]"></span>
        <h2 class="font-headline text-xl sm:text-2xl font-bold text-[#241A18]">${title}</h2>
      </div>
    `;
  }

  function section(titleEn, titleMm, bodyHtml) {
    return `
      <section class="bg-[#FFFDFC] rounded-2xl sm:rounded-3xl border border-[#E8DDD0] p-4 sm:p-6 shadow-sm space-y-1">
        ${sectionHeader(titleEn, titleMm)}
        ${bodyHtml}
      </section>
    `;
  }

  function renderColors() {
    const swatches = TOKENS.map(t => `
      <div class="flex flex-col items-center gap-2">
        <div class="w-full h-16 rounded-xl border border-[#E8DDD0] shadow-inner" style="background-color: ${t.value};"></div>
        <div class="text-center">
          <div class="font-label text-xs font-bold text-[#241A18]">${t.name}</div>
          <div class="font-body text-[10px] text-[#6D6561]">${t.value}</div>
        </div>
      </div>
    `).join('');
    return `
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        ${swatches}
      </div>
    `;
  }

  function renderTypography() {
    return `
      <div class="space-y-4">
        <div class="p-4 rounded-xl bg-[#F8EFE5] border border-[#E8DDD0]">
          <div class="font-headline text-2xl sm:text-3xl font-bold text-[#241A18]">Headline Font</div>
          <div class="font-headline text-base text-[#6D6561]">Great food. Good moments.</div>
        </div>
        <div class="p-4 rounded-xl bg-[#F8EFE5] border border-[#E8DDD0]">
          <div class="font-label text-xl font-extrabold uppercase tracking-wide text-[#9B1C25]">Label Font</div>
          <div class="font-label text-sm text-[#6D6561]">Find Tables · နေ့စဉ်</div>
        </div>
        <div class="p-4 rounded-xl bg-[#F8EFE5] border border-[#E8DDD0]">
          <div class="font-body text-base text-[#241A18]">Body Font — calm, premium, and readable for restaurant discovery on mobile.</div>
          <div class="font-body text-sm text-[#6D6561]">မြန်မာစာသားများကို ဖတ်ရှုရလွယ်ကူစေရန် fallback များကို ထိန်းသိမ်းထားပါသည်။</div>
        </div>
      </div>
    `;
  }

  function renderButtons() {
    return `
      <div class="flex flex-wrap items-center gap-3 sm:gap-4">
        <button class="btn-primary px-5 py-2.5 rounded-xl font-label text-sm font-bold shadow-md cursor-pointer">Primary</button>
        <button class="px-5 py-2.5 rounded-xl font-label text-sm font-bold border border-[#9B1C25] text-[#9B1C25] bg-white hover:bg-[#F3DFD5] transition-colors cursor-pointer">Secondary</button>
        <button class="px-5 py-2.5 rounded-xl font-label text-sm font-bold border border-[#E8DDD0] text-[#6D6561] bg-[#FFFDFC] hover:border-[#9B1C25] transition-colors cursor-pointer">Outline</button>
        <button
          id="gallery-fav-btn"
          class="w-11 h-11 rounded-full bg-white border border-[#E8DDD0] shadow-md flex items-center justify-center text-[#9B1C25] cursor-pointer transition-all active:scale-95"
          title="Favorite (tap for bounce)"
        >
          <span class="material-symbols-outlined text-xl">favorite</span>
        </button>
        <button class="w-11 h-11 rounded-full bg-[#9B1C25] text-white flex items-center justify-center shadow-md cursor-pointer transition-transform active:scale-95">
          <span class="material-symbols-outlined text-xl">arrow_forward</span>
        </button>
      </div>
    `;
  }

  function renderCards(restaurants) {
    if (!restaurants.length) {
      return `<p class="text-sm text-[#58413f]">No restaurant data available.</p>`;
    }
    const sample = restaurants.slice(0, 3);
    const trending = C.renderTrendingCard
      ? sample.map(r => C.renderTrendingCard(r, store.getState(), { showVenueName: true })).join('')
      : '';
    const full = C.renderRestaurantCard
      ? sample.map(r => C.renderRestaurantCard(r, store.getState())).join('')
      : '';
    const promo = C.renderPromoCard
      ? sample.map(r => C.renderPromoCard(r, store.getState())).join('')
      : '';
    const search = C.renderSearchResultCard
      ? sample.map(r => C.renderSearchResultCard(r, store.getState())).join('')
      : '';
    return `
      <div class="space-y-6">
        <div>
          <h3 class="font-label text-xs font-bold uppercase tracking-wide text-[#840f16] mb-2">Trending Card</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">${trending}</div>
        </div>
        <div>
          <h3 class="font-label text-xs font-bold uppercase tracking-wide text-[#840f16] mb-2">Hot Promotion Card</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">${promo}</div>
        </div>
        <div>
          <h3 class="font-label text-xs font-bold uppercase tracking-wide text-[#840f16] mb-2">Restaurant Card</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">${full}</div>
        </div>
        <div>
          <h3 class="font-label text-xs font-bold uppercase tracking-wide text-[#840f16] mb-2">Search Result Card</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">${search}</div>
        </div>
      </div>
    `;
  }

  function renderTagsBadges(sample) {
    const onImageBox = (inner) => `
      <div class="relative h-28 w-full rounded-xl overflow-hidden border border-[#EADFD1]">
        <img src="${sample.heroImage || 'assets/images/gilded_fork.jpg'}" referrerpolicy="no-referrer" class="w-full h-full object-cover" />
        ${inner}
      </div>`;
    const inlineTags = `
      <div class="flex flex-wrap gap-2">
        ${C.renderCuisineTag(sample.cuisine, false)}
        ${C.renderPromoTag(sample.offerTag || '20% OFF', false)}
      </div>`;
    const statusPills = `
      <div class="flex flex-wrap gap-2">
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-label font-bold bg-[#EEF4EE] text-[#607A62] border border-[#C8D7C9]">Completed</span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-label font-bold bg-[#F8EFE5] text-[#8F6A21] border border-[#E8DDD0]">Pending</span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-label font-bold bg-rose-50 text-rose-600 border border-rose-200">Cancelled</span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-label font-bold bg-[#F6ECD8] text-[#8F6A21] border border-[#E8DDD0]">Waitlisted</span>
      </div>`;
    const subhead = (t) => `<h3 class="font-label text-xs font-bold uppercase tracking-wide text-[#9B1C25]">${t}</h3>`;
    return `
      <div class="space-y-5">
        <div class="space-y-3">
          ${subhead('On-Image Badges (positioned overlays)')}
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            ${onImageBox(C.renderRatingBadge ? C.renderRatingBadge(sample) : '')}
            ${onImageBox(C.renderRatingBadgeWithPromo ? C.renderRatingBadgeWithPromo(sample) : '')}
            ${onImageBox(C.renderCuisineTagOnImage ? C.renderCuisineTagOnImage(sample.cuisine) : '')}
          </div>
        </div>
        <div class="space-y-3">
          ${subhead('Inline Tags')}
          ${inlineTags}
        </div>
        <div class="space-y-3">
          ${subhead('Status Pills')}
          ${statusPills}
        </div>
      </div>
    `;
  }

  function renderForms() {
    return `
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        <input type="text" placeholder="Full name" class="w-full bg-[#FFF8F6] border border-[#EADFD1] focus:border-[#840f16] rounded-xl px-4 py-3 font-body text-sm text-[#231916]" />
        <input type="tel" placeholder="Phone" class="w-full bg-[#FFF8F6] border border-[#EADFD1] focus:border-[#840f16] rounded-xl px-4 py-3 font-body text-sm text-[#231916]" />
        <input type="email" placeholder="Email" class="w-full bg-[#FFF8F6] border border-[#EADFD1] focus:border-[#840f16] rounded-xl px-4 py-3 font-body text-sm text-[#231916]" />
        <input type="date" class="w-full bg-[#FFF8F6] border border-[#EADFD1] focus:border-[#840f16] rounded-xl px-4 py-3 font-body text-sm text-[#231916]" />
        <textarea rows="3" placeholder="Special requests" class="w-full sm:col-span-2 bg-[#FFF8F6] border border-[#EADFD1] focus:border-[#840f16] rounded-xl p-4 font-body text-sm text-[#231916] resize-none"></textarea>
      </div>
    `;
  }

  function renderFeedback() {
    return `
      <div class="flex flex-wrap gap-3">
        <button id="gallery-toast-btn" class="btn-primary px-5 py-2.5 rounded-xl font-label text-sm font-bold shadow-md cursor-pointer">Show Toast</button>
        <button id="gallery-terms-btn" class="px-5 py-2.5 rounded-xl font-label text-sm font-bold border border-[#840f16] text-[#840f16] bg-white hover:bg-[#840f16]/10 transition-colors cursor-pointer">Open Terms Modal</button>
      </div>
    `;
  }

  function renderNavigation() {
    const isMm = store.getState().currentLanguage === 'MM';
    const topItems = ['explore', 'search', 'favorite', 'notifications', 'person'];
    const bottomItems = [
      { icon: 'explore', label: isMm ? 'ပင်မ' : 'Home' },
      { icon: 'search', label: isMm ? 'ရှာဖွေရန်' : 'Search' },
      { icon: 'calendar_month', label: isMm ? 'စိုတ်ထားမှု' : 'Bookings' },
      { icon: 'favorite', label: isMm ? 'သိမ်းဆည်း' : 'Saved' },
      { icon: 'person', label: isMm ? 'မိုင်ပေ့ချ်' : 'My Page' }
    ];
    return `
      <div class="space-y-4">
        <div>
          <h3 class="font-label text-xs font-bold uppercase tracking-wide text-[#840f16] mb-2">Top Navigation Bar (static preview)</h3>
          <div class="border border-[#EADFD1] rounded-xl overflow-hidden">
            <div class="flex items-center justify-between gap-3 bg-[#FFF7E8]/95 px-4 py-2.5 border-b border-[#EADFD1]">
              <div class="flex items-center gap-2 shrink-0">
                <span class="w-8 h-8 rounded-xl bg-gradient-to-br from-[#840f16] to-[#D08E1C] flex items-center justify-center">
                  <span class="material-symbols-outlined text-white text-lg">restaurant</span>
                </span>
                <span class="font-headline font-extrabold text-sm text-[#840f16]">YOYAKU</span>
              </div>
              <div class="hidden sm:flex items-center gap-1.5 bg-[#FFF8F6] border border-[#EADFD1] rounded-full px-3 py-1.5 flex-1 max-w-xs">
                <span class="material-symbols-outlined text-base text-[#58413f]">search</span>
                <span class="text-xs text-[#58413f]">${isMm ? 'စားသောက်ဆိုင် ရှာဖွေပါ...' : 'Search restaurants...'}</span>
              </div>
              <div class="flex items-center gap-2">
                ${topItems.map(ic => `<span class="w-8 h-8 rounded-full bg-white border border-[#EADFD1] hidden sm:flex items-center justify-center"><span class="material-symbols-outlined text-base text-[#58413f]">${ic}</span></span>`).join('')}
                <span class="px-3 py-1.5 rounded-full bg-[#840f16] text-white font-label text-[11px] font-bold whitespace-nowrap">${isMm ? 'ဝင်ရောက်' : 'Sign In'}</span>
              </div>
            </div>
          </div>
          <p class="text-[11px] text-[#58413f] mt-1.5">Live component omitted here to avoid duplicate IDs — see the real header above.</p>
        </div>
        <div>
          <h3 class="font-label text-xs font-bold uppercase tracking-wide text-[#840f16] mb-2">Bottom Navigation Bar (static preview)</h3>
          <div class="border border-[#EADFD1] rounded-xl overflow-hidden max-w-md mx-auto">
            <div class="flex items-center justify-around gap-1 bg-[#FFF7E8]/95 px-3 py-2.5 border-t border-[#EADFD1]">
              ${bottomItems.map((it, i) => `
                <div class="flex-1 flex items-center justify-center py-2 px-2 rounded-xl ${i === 0 ? 'bg-[#840f16]/10' : ''}">
                  <div class="relative flex flex-col items-center gap-0.5">
                    <span class="material-symbols-outlined text-[24px] leading-none ${i === 0 ? 'text-[#840f16]' : 'text-[#58413f]'}">${it.icon}</span>
                    <span class="text-[10px] font-label ${i === 0 ? 'text-[#840f16] font-bold' : 'text-[#58413f]'}">${it.label}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          <p class="text-[11px] text-[#58413f] mt-1.5">The real bar is fixed at the viewport bottom on screens &lt; 1024px.</p>
        </div>
      </div>
    `;
  }

  // ============================================================
  // Suggested standardized components (proposed design-system additions).
  // These are real reusable helpers — screens can adopt them directly.
  // ============================================================

  const STATUS_STYLES = {
    confirmed:  { cls: 'bg-[#EAF3EB] text-[#2f7a3f] border-[#C5DEC8]', icon: 'check_circle', en: 'Confirmed', mm: 'အတည်ပြုပြီး' },
    completed:  { cls: 'bg-[#EAF3EB] text-[#2f7a3f] border-[#C5DEC8]', icon: 'task_alt', en: 'Completed', mm: 'ပြီးဆုံး' },
    pending:    { cls: 'bg-[#FBF3E2] text-[#8f5d0b] border-[#EADFD1]', icon: 'schedule', en: 'Pending', mm: 'စောင့်ဆိုင်း' },
    waitlisted: { cls: 'bg-[#FFF3D6] text-[#8f5d0b] border-[#F2C994]', icon: 'hourglass_top', en: 'Waitlisted', mm: 'စောင့်ရန်' },
    cancelled:  { cls: 'bg-rose-50 text-rose-600 border-rose-200', icon: 'cancel', en: 'Cancelled', mm: 'ဖျက်သိမ်း' }
  };

  function renderStatusBadge(status, isMm = false) {
    const s = STATUS_STYLES[String(status || '').toLowerCase()] || STATUS_STYLES.pending;
    return `
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-label font-bold border ${s.cls}">
        <span class="material-symbols-outlined text-sm leading-none">${s.icon}</span>
        ${isMm ? s.mm : s.en}
      </span>
    `;
  }

  function renderIconButton(icon, options = {}) {
    const size = options.size === 'sm' ? 'w-8 h-8' : options.size === 'lg' ? 'w-12 h-12' : 'w-10 h-10';
    const variant = options.variant === 'solid'
      ? 'bg-[#840f16] text-white !border-transparent shadow-md hover:bg-[#6c0c11]'
      : 'bg-white text-[#840f16] border-[#EADFD1] hover:border-[#840f16] hover:bg-[#840f16]/5';
    return `
      <button class="${size} rounded-full border ${variant} flex items-center justify-center transition-all active:scale-95 cursor-pointer" aria-label="${options.label || icon}" title="${options.label || icon}">
        <span class="material-symbols-outlined ${options.size === 'sm' ? 'text-base' : 'text-xl'}">${icon}</span>
      </button>
    `;
  }

  function renderFormField(options = {}) {
    const id = options.id || `gallery-field-${Math.random().toString(36).slice(2, 7)}`;
    return `
      <div class="space-y-1.5">
        <label for="${id}" class="font-label text-xs font-bold text-[#231916] block">${options.label}</label>
        <input
          type="${options.type || 'text'}"
          id="${id}"
          placeholder="${options.placeholder || ''}"
          class="w-full bg-[#FFF8F6] border ${options.error ? 'border-rose-400 focus:border-rose-500' : 'border-[#EADFD1] focus:border-[#840f16]'} rounded-xl px-4 py-3 font-body text-sm text-[#231916]"
        />
        <p class="font-body text-[11px] ${options.error ? 'text-rose-600' : 'text-[#58413f]'}">${options.error ? options.error : (options.hint || '')}</p>
      </div>
    `;
  }

  function renderEmptyState(options = {}) {
    return `
      <div class="max-w-sm bg-[#FFFDF9] rounded-xl border border-[#EADFD1] p-8 text-center space-y-3">
        <div class="w-14 h-14 mx-auto rounded-full bg-[#FBF3E2] flex items-center justify-center">
          <span class="material-symbols-outlined text-2xl text-[#D08E1C]">${options.icon || 'inbox'}</span>
        </div>
        <h4 class="font-headline font-bold text-base text-[#231916]">${options.title || 'Nothing here yet'}</h4>
        <p class="font-body text-sm text-[#58413f]">${options.message || ''}</p>
        ${options.actionLabel ? `<button ${options.actionId ? `id="${options.actionId}"` : ''} class="btn-primary px-5 py-2 rounded-xl font-label text-xs font-bold shadow-md cursor-pointer">${options.actionLabel}</button>` : ''}
      </div>
    `;
  }

  // ============================================================
  // Suggested Restaurant Card UI Variants (with explicit IDs)
  // ============================================================

  function renderSuggestionQuickBookCard(restaurant, isMm = false) {
    const r = restaurant || {
      id: 'r1',
      name: 'The Gilded Fork',
      venueName: 'The Gilded Fork Fine Dining',
      cuisine: 'Contemporary European',
      priceRange: '$$$$ (120,000 - 250,000 MMK)',
      location: 'Bahan, Yangon',
      rating: 4.9,
      reviewCount: 342,
      offerTag: '20% OFF TODAY',
      heroImage: 'assets/images/gilded_fork.jpg'
    };

    return `
      <div id="suggestion-card-quick-book" class="bg-[#FFFDFC] border border-[#E8DDD0] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col max-w-sm w-full">
        <!-- ID Badge Header -->
        <div class="bg-[#231916] text-[#EADFD1] px-3.5 py-1.5 flex items-center justify-between text-[11px] font-mono border-b border-[#362723]">
          <span class="font-bold text-[#D08E1C]">ID: #suggestion-card-quick-book</span>
          <span class="text-white/60 text-[10px]">Time-Slot Booking</span>
        </div>

        <!-- Image Container -->
        <div class="relative h-44 w-full bg-[#EADFD1] overflow-hidden">
          <img src="${r.heroImage}" alt="${r.name}" referrerpolicy="no-referrer" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

          <!-- Glass Rating Pill -->
          <div class="absolute bottom-3 left-3 z-10">
            <span class="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full shadow-md font-label text-[11px] font-bold text-white">
              <span class="material-symbols-outlined text-xs text-[#D08E1C] fill-1 leading-none">star</span>
              <span class="leading-none text-white">${r.rating}</span>
              <span class="text-white/80 font-medium leading-none">(${r.reviewCount})</span>
            </span>
          </div>

          <!-- Promo Tag -->
          ${r.offerTag ? `
            <div class="absolute top-3 left-3 z-10">
              <span class="inline-flex items-center gap-1 bg-[#840f16]/95 backdrop-blur-md border border-white/20 px-2.5 py-1 rounded-full font-label text-[10px] font-extrabold uppercase text-white shadow-md">
                ${r.offerTag}
              </span>
            </div>
          ` : ''}

          <!-- Favorite Button -->
          <button class="gallery-card-fav absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-[#840f16] shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer z-10" aria-label="Favorite">
            <span class="material-symbols-outlined text-lg">favorite</span>
          </button>
        </div>

        <!-- Content Area -->
        <div class="p-4 flex-1 flex flex-col space-y-2.5 min-w-0">
          <div class="space-y-1 min-w-0">
            <h4 class="font-headline text-lg font-bold text-[#840f16] leading-snug truncate" title="${r.venueName || r.name}">
              ${r.venueName || r.name}
            </h4>
            <div class="flex items-center gap-1.5 text-xs text-[#58413f] font-medium min-w-0">
              <span class="material-symbols-outlined text-sm text-[#840f16] shrink-0">location_on</span>
              <span class="truncate">${r.location}</span>
            </div>
            <div class="flex items-center gap-1.5 text-xs text-[#58413f] font-medium min-w-0">
              <span class="material-symbols-outlined text-sm text-[#840f16] shrink-0">payments</span>
              <span class="truncate">${r.priceRange}</span>
            </div>
          </div>

          <!-- Instant Available Time Slots Selector -->
          <div class="pt-2 border-t border-[#EADFD1]/80 space-y-1.5">
            <div class="flex items-center justify-between text-[11px] font-label font-bold text-[#58413f]">
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-xs text-[#2f7a3f]">schedule</span>
                ${isMm ? 'ယနေ့ စိုတ်နိုင်သော အချိန်များ' : 'Today Available Times'}
              </span>
              <span class="text-[10px] text-[#2f7a3f] font-bold">● Instant Confirm</span>
            </div>
            <div class="grid grid-cols-3 gap-1.5">
              <button data-quick-slot="18:00" class="gallery-slot-btn py-1 px-1.5 bg-white hover:bg-[#840f16] hover:text-white border border-[#EADFD1] hover:border-[#840f16] rounded-lg font-label text-xs font-bold text-[#231916] transition-all cursor-pointer text-center">
                6:00 PM
              </button>
              <button data-quick-slot="19:00" class="gallery-slot-btn py-1 px-1.5 bg-[#840f16] text-white border border-[#840f16] rounded-lg font-label text-xs font-bold shadow-xs transition-all cursor-pointer text-center">
                7:00 PM
              </button>
              <button data-quick-slot="20:30" class="gallery-slot-btn py-1 px-1.5 bg-white hover:bg-[#840f16] hover:text-white border border-[#EADFD1] hover:border-[#840f16] rounded-lg font-label text-xs font-bold text-[#231916] transition-all cursor-pointer text-center">
                8:30 PM
              </button>
            </div>
          </div>

          <!-- Action Button -->
          <div class="pt-1">
            <button data-quick-book-now="${r.id}" class="w-full bg-[#840f16] hover:bg-[#6c0c11] active:scale-[0.98] text-white py-2.5 rounded-full font-label text-xs font-extrabold uppercase tracking-wider shadow-md transition-all cursor-pointer text-center">
              ${isMm ? 'ချက်ချင်း စိုတ်မည်' : 'Book Selected Time'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderSuggestionFeaturedHeroCard(restaurant, isMm = false) {
    const r = restaurant || {
      id: 'r2',
      name: 'Seeds Restaurant & Lounge',
      venueName: 'Seeds Restaurant & Lounge',
      cuisine: 'Contemporary Swiss & Microgreen Garden',
      priceRange: '$$$$ (150,000 - 300,000 MMK)',
      location: 'Inya Lakefront, Mayangone',
      rating: 5.0,
      reviewCount: 418,
      heroImage: 'assets/images/seeds_lakefront.jpg'
    };

    return `
      <div id="suggestion-card-featured-hero" class="relative bg-[#1c1311] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col max-w-sm w-full min-h-[370px] border border-[#362723] group">
        <!-- ID Badge Header -->
        <div class="bg-[#231916] text-[#EADFD1] px-3.5 py-1.5 flex items-center justify-between text-[11px] font-mono border-b border-[#362723] z-20">
          <span class="font-bold text-[#D08E1C]">ID: #suggestion-card-featured-hero</span>
          <span class="text-white/60 text-[10px]">Full-Bleed Editorial</span>
        </div>

        <!-- Full-Bleed Background Image with Cinematic Gradients -->
        <div class="absolute inset-0 pt-7">
          <img src="${r.heroImage}" alt="${r.name}" referrerpolicy="no-referrer" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/60 pointer-events-none"></div>
        </div>

        <!-- Top Controls Overlay -->
        <div class="relative z-10 p-4 flex items-start justify-between gap-2">
          <!-- Curated Badge -->
          <span class="inline-flex items-center gap-1.5 bg-[#D08E1C] text-[#231916] px-3 py-1 rounded-full font-label text-[11px] font-extrabold uppercase tracking-wider shadow-md">
            <span class="material-symbols-outlined text-xs leading-none">stars</span>
            ${isMm ? 'အယ်ဒီတာ့ အထူးရွေးချယ်မှု' : 'Chef’s Selection'}
          </span>

          <!-- Favorite -->
          <button class="gallery-card-fav w-9 h-9 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white hover:text-rose-400 shadow-md flex items-center justify-center transition-all cursor-pointer" aria-label="Favorite">
            <span class="material-symbols-outlined text-lg">favorite</span>
          </button>
        </div>

        <!-- Floating Glass Bottom Details -->
        <div class="relative z-10 mt-auto p-4 m-3 bg-[#1c1311]/85 backdrop-blur-md rounded-2xl border border-white/10 text-white space-y-2.5">
          <div class="flex items-center justify-between gap-2">
            <span class="text-amber-300 font-label text-[11px] font-bold uppercase tracking-wider">${r.cuisine}</span>
            <!-- Rating Pill -->
            <span class="inline-flex items-center gap-1 bg-black/60 border border-white/20 px-2 py-0.5 rounded-full font-label text-[11px] font-bold text-white">
              <span class="material-symbols-outlined text-xs text-[#D08E1C] fill-1 leading-none">star</span>
              ${r.rating} (${r.reviewCount})
            </span>
          </div>

          <h3 class="font-headline text-lg sm:text-xl font-bold text-white leading-snug group-hover:text-amber-200 transition-colors">
            ${r.venueName || r.name}
          </h3>

          <div class="flex items-center justify-between text-xs text-[#d7ccc8] pt-1 border-t border-white/10">
            <span class="flex items-center gap-1 truncate max-w-[170px]">
              <span class="material-symbols-outlined text-xs text-[#D08E1C]">location_on</span>
              ${r.location}
            </span>
            <span class="font-bold text-amber-200">${r.priceRange ? r.priceRange.split(' ')[0] : '$$$$'}</span>
          </div>

          <button data-hero-reserve-id="${r.id}" class="w-full bg-gradient-to-r from-[#D08E1C] to-[#E59819] hover:from-[#e09a24] hover:to-[#f0a628] active:scale-[0.98] text-[#231916] py-2.5 rounded-xl font-label text-xs font-extrabold uppercase tracking-wider shadow-md transition-all cursor-pointer text-center">
            ${isMm ? 'သီးသန့် နေရာစိုတ်မည်' : 'Reserve VIP Experience'}
          </button>
        </div>
      </div>
    `;
  }

  function renderSuggestionCompactRowCard(restaurant, isMm = false) {
    const r = restaurant || {
      id: 'r3',
      name: 'Rangoon Tea House',
      venueName: 'Rangoon Tea House (Pansodan)',
      cuisine: 'Burmese Heritage & Craft Tea',
      priceRange: '$$ (20,000 - 45,000 MMK)',
      location: 'Pansodan, Downtown Yangon',
      rating: 4.8,
      reviewCount: 512,
      offerTag: '15% OFF LUNCH',
      heroImage: 'assets/images/rangoon_tea_house.jpg'
    };

    return `
      <div id="suggestion-card-compact-row" class="bg-[#FFFDFC] border border-[#E8DDD0] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col max-w-sm w-full">
        <!-- ID Badge Header -->
        <div class="bg-[#231916] text-[#EADFD1] px-3 py-1 flex items-center justify-between text-[11px] font-mono border-b border-[#362723]">
          <span class="font-bold text-[#D08E1C]">ID: #suggestion-card-compact-row</span>
          <span class="text-white/60 text-[10px]">Horizontal List</span>
        </div>

        <!-- Horizontal Row Body -->
        <div class="p-3 flex items-center gap-3">
          <!-- Thumbnail -->
          <div class="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 bg-[#EADFD1]">
            <img src="${r.heroImage}" alt="${r.name}" referrerpolicy="no-referrer" class="w-full h-full object-cover" />
            <!-- Rating Tag on Thumbnail -->
            <div class="absolute bottom-1 left-1">
              <span class="inline-flex items-center gap-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded text-[10px] font-bold text-white leading-none">
                <span class="material-symbols-outlined text-[10px] text-[#D08E1C] fill-1 leading-none">star</span>
                ${r.rating}
              </span>
            </div>
          </div>

          <!-- Details -->
          <div class="flex-1 min-w-0 space-y-1">
            <div class="flex items-center justify-between gap-1">
              <span class="inline-flex items-center gap-1 text-[10px] font-label font-bold text-[#2f7a3f] bg-[#EAF3EB] border border-[#C5DEC8] px-1.5 py-0.2 rounded-full">
                ● ${isMm ? 'ဖွင့်ဆဲ' : 'Open Now'}
              </span>
              <span class="font-label text-[11px] font-extrabold text-[#840f16]">${r.offerTag || 'PROMO'}</span>
            </div>

            <h4 class="font-headline font-bold text-sm sm:text-base text-[#231916] truncate leading-tight">
              ${r.venueName || r.name}
            </h4>

            <div class="text-[11px] text-[#58413f] flex items-center gap-1 truncate">
              <span class="material-symbols-outlined text-xs text-[#840f16]">location_on</span>
              <span class="truncate">${r.location}</span>
            </div>

            <div class="flex items-center justify-between pt-1">
              <span class="font-label text-[11px] font-bold text-[#58413f]">${r.priceRange ? r.priceRange.split(' ')[0] : '$$'}</span>
              <button data-compact-book="${r.id}" class="bg-[#840f16] hover:bg-[#6c0c11] text-white px-3 py-1 rounded-full font-label text-[11px] font-bold shadow-xs cursor-pointer">
                ${isMm ? 'စိုတ်မည်' : 'Book'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderSuggestionSocialProofCard(restaurant, isMm = false) {
    const r = restaurant || {
      id: 'r4',
      name: 'L’Alchimiste French',
      venueName: 'L’Alchimiste French Waterfront',
      cuisine: 'French Gastronomy & Fine Wines',
      priceRange: '$$$$ (140,000 - 280,000 MMK)',
      location: 'U Wisara Rd, Yangon',
      rating: 4.9,
      reviewCount: 290,
      offerTag: 'EXCLUSIVE CHEF SET',
      heroImage: 'assets/images/alchimiste.jpg'
    };

    return `
      <div id="suggestion-card-social-proof" class="bg-[#FFFDFC] border border-[#E8DDD0] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col max-w-sm w-full">
        <!-- ID Badge Header -->
        <div class="bg-[#231916] text-[#EADFD1] px-3.5 py-1.5 flex items-center justify-between text-[11px] font-mono border-b border-[#362723]">
          <span class="font-bold text-[#D08E1C]">ID: #suggestion-card-social-proof</span>
          <span class="text-white/60 text-[10px]">High Demand Urgency</span>
        </div>

        <!-- Live Demand Urgency Ribbon -->
        <div class="bg-gradient-to-r from-[#840f16] to-[#a52a2a] px-3.5 py-1.5 flex items-center justify-between text-white text-[11px] font-label font-bold">
          <span class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-sm text-[#f5d592] animate-bounce">local_fire_department</span>
            ${isMm ? 'ယနေ့ ၁၈ ကြိမ် စိုတ်ယူပြီး' : '18 bookings made today'}
          </span>
          <span class="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-extrabold uppercase">High Demand</span>
        </div>

        <!-- Image Area -->
        <div class="relative h-40 w-full bg-[#EADFD1] overflow-hidden">
          <img src="${r.heroImage}" alt="${r.name}" referrerpolicy="no-referrer" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

          <!-- Glass Rating Tag -->
          <div class="absolute bottom-3 left-3 z-10">
            <span class="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full shadow-md font-label text-[11px] font-bold text-white">
              <span class="material-symbols-outlined text-xs text-[#D08E1C] fill-1 leading-none">star</span>
              <span class="leading-none text-white">${r.rating}</span>
              <span class="text-white/80 font-medium leading-none">(${r.reviewCount})</span>
            </span>
          </div>

          <!-- Promo Badge -->
          <div class="absolute top-3 left-3 z-10">
            <span class="inline-flex items-center gap-1 bg-[#D08E1C] px-2.5 py-1 rounded-full font-label text-[10px] font-extrabold uppercase text-[#231916] shadow-md">
              ${r.offerTag}
            </span>
          </div>

          <!-- Favorite Button -->
          <button class="gallery-card-fav absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-[#840f16] shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer z-10" aria-label="Favorite">
            <span class="material-symbols-outlined text-lg">favorite</span>
          </button>
        </div>

        <!-- Content Area -->
        <div class="p-4 flex-1 flex flex-col space-y-2.5 min-w-0">
          <h4 class="font-headline text-base sm:text-lg font-bold text-[#840f16] truncate leading-snug">
            ${r.venueName || r.name}
          </h4>

          <div class="space-y-1 text-xs font-body text-[#58413f] font-medium min-w-0">
            <div class="flex items-center gap-1.5 truncate">
              <span class="material-symbols-outlined text-sm text-[#840f16] shrink-0">restaurant</span>
              <span class="truncate">${r.cuisine}</span>
            </div>
            <div class="flex items-center gap-1.5 truncate">
              <span class="material-symbols-outlined text-sm text-[#840f16] shrink-0">location_on</span>
              <span class="truncate">${r.location}</span>
            </div>
          </div>

          <!-- Live Table Availability Indicator -->
          <div class="bg-[#FFF3D6] border border-[#F2C994] rounded-xl p-2 flex items-center justify-between text-[11px] font-label text-[#8f5d0b]">
            <span class="flex items-center gap-1">
              <span class="material-symbols-outlined text-xs">table_restaurant</span>
              ${isMm ? 'နောက်ဆုံး ၃ စားပွဲသာ ကျန်ပါသည်' : 'Only 3 tables left for tonight'}
            </span>
            <span class="font-bold text-[#840f16]">Fast Fill</span>
          </div>

          <!-- CTA -->
          <div class="pt-1 mt-auto">
            <button data-social-book="${r.id}" class="w-full bg-[#840f16] hover:bg-[#6c0c11] active:scale-[0.98] text-white py-2.5 rounded-full font-label text-xs font-extrabold uppercase tracking-wider shadow-md transition-all cursor-pointer text-center">
              ${isMm ? 'နေရာ လျင်မြန်စွာ စိုတ်မည်' : 'Instant Reserve'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderSuggested() {
    const subhead = (t) => `<h3 class="font-label text-xs font-bold uppercase tracking-wide text-[#840f16]">${t}</h3>`;
    const statuses = ['confirmed', 'completed', 'pending', 'waitlisted', 'cancelled'];
    const data = (window.YoyakuData && window.YoyakuData.RESTAURANTS_DATA) || [];
    const isMm = store.getState().currentLanguage === 'MM';

    return `
      <div class="space-y-8">
        <!-- SUGGESTED RESTAURANT CARD UI SECTION -->
        <div class="space-y-4">
          <div>
            ${subhead('Suggested Restaurant Card UI Variants (with unique IDs)')}
            <p class="font-body text-xs text-[#58413f] mt-1">
              Interactive proposed card components for different layout archetypes across the app, each marked with its explicit container ID:
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            <!-- 1. Quick Book Slot Card -->
            <div class="flex flex-col space-y-1.5">
              <div class="text-xs font-bold text-[#840f16]">1. Slot-Selector Card</div>
              ${renderSuggestionQuickBookCard(data[0], isMm)}
            </div>

            <!-- 2. Full-Bleed Editorial Hero Card -->
            <div class="flex flex-col space-y-1.5">
              <div class="text-xs font-bold text-[#840f16]">2. Editorial Hero Card</div>
              ${renderSuggestionFeaturedHeroCard(data[1] || data[0], isMm)}
            </div>

            <!-- 3. Compact Horizontal List Card -->
            <div class="flex flex-col space-y-1.5">
              <div class="text-xs font-bold text-[#840f16]">3. Compact Row Card</div>
              ${renderSuggestionCompactRowCard(data[2] || data[0], isMm)}
            </div>

            <!-- 4. High-Demand Social Proof Card -->
            <div class="flex flex-col space-y-1.5">
              <div class="text-xs font-bold text-[#840f16]">4. Social Proof Card</div>
              ${renderSuggestionSocialProofCard(data[3] || data[0], isMm)}
            </div>
          </div>
        </div>

        <div class="border-t border-[#EADFD1] pt-6 space-y-3">
          ${subhead('Shared Status Badge — one helper for every screen')}
          <div class="flex flex-wrap gap-2">
            ${statuses.map(s => renderStatusBadge(s)).join('')}
            ${statuses.map(s => renderStatusBadge(s, true)).join('')}
          </div>
          <p class="font-body text-[11px] text-[#58413f]">Replaces the hand-rolled pills in U-08 / U-09. Usage: <code class="bg-[#FBF3E2] px-1 rounded">renderStatusBadge('confirmed', isMm)</code></p>
        </div>

        <div class="space-y-3">
          ${subhead('Icon Button System — consistent sizes & variants')}
          <div class="flex flex-wrap items-center gap-3">
            ${renderIconButton('favorite', { size: 'sm' })}
            ${renderIconButton('share')}
            ${renderIconButton('call')}
            ${renderIconButton('delete', { size: 'lg' })}
            ${renderIconButton('add', { variant: 'solid' })}
            ${renderIconButton('arrow_forward', { variant: 'solid', size: 'sm' })}
          </div>
        </div>

        <div class="space-y-3">
          ${subhead('Form Field Pattern — label + input + hint/error')}
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            ${renderFormField({ label: 'Guest Name', placeholder: 'e.g. Aung Kyaw', hint: 'As shown on your ID.' })}
            ${renderFormField({ label: 'Phone', type: 'tel', placeholder: '09-xxx-xxx-xxx', error: 'Phone number is required.' })}
          </div>
        </div>

        <div class="space-y-3">
          ${subhead('Empty State — friendly zero-data panels')}
          <div class="flex flex-wrap gap-4">
            ${renderEmptyState({ icon: 'calendar_month', title: 'No reservations found', message: 'Your bookings will appear here once you reserve a table.', actionLabel: 'Explore Restaurants' })}
            ${renderEmptyState({ icon: 'favorite', title: 'No favorites yet', message: 'Tap the heart on any restaurant to save it here.', actionLabel: 'Browse Popular' })}
          </div>
        </div>
      </div>
    `;
  }

  function renderComponentGallery(state) {
    const data = (window.YoyakuData && window.YoyakuData.RESTAURANTS_DATA) || [];
    const sample = data[0] || { heroImage: '', cuisine: 'Italian', offerTag: '20% OFF', rating: 4.8, reviewCount: 320 };

    return `
      <div class="space-y-6 sm:space-y-8">
        ${section('Colors', 'အရောင်များ', renderColors())}
        ${section('Typography', 'စာအရွယ်အစားများ', renderTypography())}
        ${section('Buttons', 'ခလုတ်များ', renderButtons())}
        ${section('Cards', 'ကတ်များ', renderCards(data))}
        ${section('Tags & Badges', 'တက်ဂ်နှင့် ဘေဂျ်', renderTagsBadges(sample))}
        ${section('Forms', 'ဖောင်များ', renderForms())}
        ${section('Feedback', 'တုံ့ပြန်ချက်', renderFeedback())}
        ${section('Navigation', 'လမ်းညွှန်', renderNavigation())}
        ${section('Suggested Components', 'အကြံပြု ဒီဇိုင်း', renderSuggested())}
      </div>
    `;
  }

  function attachComponentGalleryEvents(root) {
    const favBtn = root.querySelector('#gallery-fav-btn');
    if (favBtn) {
      favBtn.addEventListener('click', () => {
        const icon = favBtn.querySelector('.material-symbols-outlined');
        const active = icon.classList.toggle('fill-1');
        favBtn.classList.remove('heart-bounce');
        void favBtn.offsetWidth;
        favBtn.classList.add('heart-bounce');
        store.showToast(active ? 'Added to favorites!' : 'Removed from favorites');
      });
    }
    const toastBtn = root.querySelector('#gallery-toast-btn');
    if (toastBtn) {
      toastBtn.addEventListener('click', () => store.showToast('This is a sample toast message.'));
    }
    const termsBtn = root.querySelector('#gallery-terms-btn');
    if (termsBtn) {
      termsBtn.addEventListener('click', () => store.openInfoModal('terms'));
    }

    // Suggested Cards Fav Buttons
    root.querySelectorAll('.gallery-card-fav').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const icon = btn.querySelector('.material-symbols-outlined');
        const active = icon.classList.toggle('fill-1');
        btn.classList.remove('heart-bounce');
        void btn.offsetWidth;
        btn.classList.add('heart-bounce');
        store.showToast(active ? 'Saved restaurant to favorites!' : 'Removed from favorites');
      });
    });

    // Suggested Cards Time Slot selection chips
    root.querySelectorAll('.gallery-slot-btn').forEach(slotBtn => {
      slotBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const parent = slotBtn.parentElement;
        if (parent) {
          parent.querySelectorAll('.gallery-slot-btn').forEach(b => {
            b.classList.remove('bg-[#840f16]', 'text-white', 'border-[#840f16]');
            b.classList.add('bg-white', 'text-[#231916]', 'border-[#EADFD1]');
          });
        }
        slotBtn.classList.remove('bg-white', 'text-[#231916]', 'border-[#EADFD1]');
        slotBtn.classList.add('bg-[#840f16]', 'text-white', 'border-[#840f16]');
        const time = slotBtn.textContent.trim();
        store.showToast(`Selected reservation time: ${time}`);
      });
    });

    // Suggested Cards booking triggers
    root.querySelectorAll('[data-quick-book-now], [data-hero-reserve-id], [data-compact-book], [data-social-book]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-quick-book-now') ||
                   btn.getAttribute('data-hero-reserve-id') ||
                   btn.getAttribute('data-compact-book') ||
                   btn.getAttribute('data-social-book') || 'r1';
        store.navigateTo('u03', { restaurantId: id });
        store.showToast('Navigating to restaurant reservation...');
      });
    });
  }

  window.YoyakuComponents.renderComponentGallery = renderComponentGallery;
  window.YoyakuComponents.attachComponentGalleryEvents = attachComponentGalleryEvents;
  window.YoyakuComponents.renderStatusBadge = renderStatusBadge;
  window.YoyakuComponents.renderIconButton = renderIconButton;
  window.YoyakuComponents.renderFormField = renderFormField;
  window.YoyakuComponents.renderEmptyState = renderEmptyState;
  window.YoyakuComponents.renderSuggestionQuickBookCard = renderSuggestionQuickBookCard;
  window.YoyakuComponents.renderSuggestionFeaturedHeroCard = renderSuggestionFeaturedHeroCard;
  window.YoyakuComponents.renderSuggestionCompactRowCard = renderSuggestionCompactRowCard;
  window.YoyakuComponents.renderSuggestionSocialProofCard = renderSuggestionSocialProofCard;
})();
