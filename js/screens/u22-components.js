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
      <section class="space-y-4 py-4 sm:py-6 border-b border-[#E8DDD0]/70 last:border-b-0">
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
      <div id="suggestion-card-quick-book" class="bg-[#FFFDFC] border border-[#E8DDD0] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col max-w-sm w-full">
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
      <div id="suggestion-card-social-proof" class="bg-[#FFFDFC] border border-[#E8DDD0] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col max-w-sm w-full">
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

  // ============================================================
  // Proposed Curated Collections Design Explorations (Options 1 - 4 + Mobile/Tablet Options A & B)
  // ============================================================

  function renderCuratedOptionA(isMm = false) {
    const collections = [
      {
        id: 'col-a-1',
        title: isMm ? 'အကြည်နူးဆုံး ရိုမန်းတစ် စားသောက်ဆိုင်များ' : 'Most Romantic Dining & Sunset Views',
        subtitle: isMm ? 'အင်းလျားကန်ဘေး သီးသန့်ဝိုင်းများနှင့် ဖယောင်းတိုင်အလင်းရောင် အောက်ရှိ ဇိမ်ခံညစာများ။' : 'Intimate candlelit tables, panoramic Inya Lake sunsets, and curated wine pairings.',
        tag: isMm ? 'ရိုမန်းတစ် ညစာ' : 'Romantic Dining',
        tagColor: 'bg-[#D08E1C] text-[#231916]',
        count: isMm ? '၆ ဆိုင် ပါဝင်ပါသည်' : '6 Venues Included',
        img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'col-a-2',
        title: isMm ? 'မီရှလင်းအဆင့် အထူးညစာများ' : 'Michelin-Standard Fine Dining',
        subtitle: isMm ? 'စားဖိုမှူးကြီးများ၏ ဆန်းသစ်တီထွင်မှုနှင့် နိုင်ငံတကာအဆင့် အကောင်းဆုံး ဝိုင်အတွဲအစပ်များ။' : 'World-class degustation menus, sommelier selections, and private dining.',
        tag: isMm ? 'အဆင့်မြင့် ဟင်းလျာ' : 'Haute Cuisine',
        tagColor: 'bg-[#840f16] text-white',
        count: isMm ? '၄ ဆိုင် ပါဝင်ပါသည်' : '4 Tables Included',
        img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'col-a-3',
        title: isMm ? 'ရန်ကုန်မြို့လယ် ရှေးဟောင်းလက်ဖက်ရည်ဆိုင်များ' : 'Yangon Heritage & Tea Salons',
        subtitle: isMm ? 'ကိုလိုနီခေတ် ဗိသုကာလက်ရာများအောက်တွင် သမားရိုးကျ မြန်မာ့ရိုးရာ လက်ဖက်ရည်နှင့် မုန့်များ။' : 'Colonial high ceilings, artisanal clay-pot brews, and classic Burmese pastries.',
        tag: isMm ? 'ရိုးရာ လက်ဖက်ရည်' : 'Heritage Gems',
        tagColor: 'bg-[#2f7a3f] text-white',
        count: isMm ? '၅ ဆိုင် ပါဝင်ပါသည်' : '5 Venues Included',
        img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
      }
    ];

    return `
      <div id="curated-mobile-option-a" class="space-y-3 p-4 sm:p-6 bg-[#FDFBF7] rounded-3xl border border-[#E8DDD0]">
        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <span class="inline-flex items-center gap-1.5 font-label text-xs font-extrabold uppercase tracking-wide text-[#840f16]">
              <span class="w-2 h-2 rounded-full bg-[#840f16]"></span>
              Mobile/Tablet Option A: Clean Natural Snap Carousel (Equal Size + Edge Peek)
            </span>
            <p class="font-body text-xs text-[#58413f]">
              ${isMm ? 'မိုဘိုင်းနှင့် တက်ဘလက်တွင် ကတ်အားလုံး အရွယ်အစား တူညီပြီး ချောမွေ့စွာ ဘေးသို့ ပွတ်ဆွဲကြည့်ရှုနိုင်သော ပုံစံ' : 'Uniform card dimensions with native snap scrolling. Shows a subtle peek of the next card on the right edge.'}
            </p>
          </div>
          <span class="bg-[#231916] text-[#D08E1C] font-label text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider hidden sm:inline-block">
            Swipeable
          </span>
        </div>

        <!-- Horizontal Snap Carousel Container -->
        <div class="mobile-horizontal-scroll -mx-4 px-4 sm:-mx-6 sm:px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 pt-1 scroll-smooth">
          ${collections.map(c => `
            <div
              data-curated-demo="${c.id}"
              class="shrink-0 w-[280px] sm:w-[320px] h-[360px] sm:h-[380px] snap-start relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between p-5 text-left text-white border border-white/15"
            >
              <img
                src="${c.img}"
                alt="${c.title}"
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/25"></div>

              <!-- Top Row Tag & Venue Count -->
              <div class="relative z-10 flex items-center justify-between gap-2">
                <span class="inline-flex items-center gap-1 ${c.tagColor} px-3 py-1 rounded-full font-label text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                  ${c.tag}
                </span>
                <span class="bg-black/60 backdrop-blur-md border border-white/20 text-white font-label text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full">
                  ${c.count}
                </span>
              </div>

              <!-- Bottom Content -->
              <div class="relative z-10 space-y-2">
                <div class="text-[#f5d592] font-label text-[11px] font-bold uppercase tracking-wider">
                  ${isMm ? 'အယ်ဒီတာ့ ရွေးချယ်မှု' : 'Curator’s Issue'}
                </div>
                <h4 class="font-headline text-lg sm:text-xl font-bold text-white leading-tight">
                  ${c.title}
                </h4>
                <p class="font-body text-xs text-white/85 line-clamp-2 leading-relaxed">
                  ${c.subtitle}
                </p>
                <div class="pt-1 flex items-center gap-1.5 text-xs font-label font-extrabold text-[#f5d592] group-hover:translate-x-1 transition-transform">
                  <span>${isMm ? 'လမ်းညွှန် ကြည့်ရှုမည်' : 'Explore Guide'}</span>
                  <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderCuratedOptionB(isMm = false) {
    const collections = [
      {
        id: 'col-b-1',
        title: isMm ? 'အကြည်နူးဆုံး ရိုမန်းတစ် စားသောက်ဆိုင်များ' : 'Most Romantic Dining & Sunset Views',
        subtitle: isMm ? 'အင်းလျားကန်ဘေး သီးသန့်ဝိုင်းများနှင့် ဖယောင်းတိုင်အလင်းရောင် အောက်ရှိ ဇိမ်ခံညစာများ။' : 'Intimate candlelit tables, panoramic Inya Lake sunsets, and curated wine pairings.',
        tag: isMm ? 'ရိုမန်းတစ် ညစာ' : 'Romantic Dining',
        tagColor: 'bg-[#D08E1C] text-[#231916]',
        count: isMm ? '၆ ဆိုင်' : '6 Venues',
        img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'col-b-2',
        title: isMm ? 'မီရှလင်းအဆင့် အထူးညစာများ' : 'Michelin-Standard Fine Dining',
        subtitle: isMm ? 'စားဖိုမှူးကြီးများ၏ ဆန်းသစ်တီထွင်မှုနှင့် နိုင်ငံတကာအဆင့် အကောင်းဆုံး ဝိုင်အတွဲအစပ်များ။' : 'World-class degustation menus, sommelier selections, and private dining.',
        tag: isMm ? 'အဆင့်မြင့် ဟင်းလျာ' : 'Haute Cuisine',
        tagColor: 'bg-[#840f16] text-white',
        count: isMm ? '၄ ဆိုင်' : '4 Tables',
        img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'col-b-3',
        title: isMm ? 'ရန်ကုန်မြို့လယ် ရှေးဟောင်းလက်ဖက်ရည်ဆိုင်များ' : 'Yangon Heritage & Tea Salons',
        subtitle: isMm ? 'ကိုလိုနီခေတ် ဗိသုကာလက်ရာများအောက်တွင် သမားရိုးကျ မြန်မာ့ရိုးရာ လက်ဖက်ရည်နှင့် မုန့်များ။' : 'Colonial high ceilings, artisanal clay-pot brews, and classic Burmese pastries.',
        tag: isMm ? 'ရိုးရာ လက်ဖက်ရည်' : 'Heritage Gems',
        tagColor: 'bg-[#2f7a3f] text-white',
        count: isMm ? '၅ ဆိုင်' : '5 Venues',
        img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
      }
    ];

    return `
      <div id="curated-mobile-option-b" class="space-y-3 p-4 sm:p-6 bg-[#FDFBF7] rounded-3xl border border-[#E8DDD0]">
        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <span class="inline-flex items-center gap-1.5 font-label text-xs font-extrabold uppercase tracking-wide text-[#840f16]">
              <span class="w-2 h-2 rounded-full bg-[#840f16]"></span>
              Mobile/Tablet Option B: Carousel with Interactive Arrows & Progress Indicator
            </span>
            <p class="font-body text-xs text-[#58413f]">
              ${isMm ? 'ဘယ်/ညာ ခလုတ်များနှင့် ကတ်အရေအတွက်ပြ Indicator ပါဝင်သော အဆင့်မြင့် Carousel ပုံစံ' : 'Includes interactive prev/next touch buttons, live active pagination pills, and touch drag support.'}
            </p>
          </div>

          <!-- Interactive Prev / Next Navigation Arrows -->
          <div class="flex items-center gap-2">
            <button id="curated-option-b-prev" class="w-8 h-8 rounded-full bg-white border border-[#E8DDD0] text-[#231916] hover:bg-[#840f16] hover:text-white hover:border-[#840f16] transition-all flex items-center justify-center shadow-xs cursor-pointer" aria-label="Previous Slide">
              <span class="material-symbols-outlined text-base">chevron_left</span>
            </button>
            <button id="curated-option-b-next" class="w-8 h-8 rounded-full bg-white border border-[#E8DDD0] text-[#231916] hover:bg-[#840f16] hover:text-white hover:border-[#840f16] transition-all flex items-center justify-center shadow-xs cursor-pointer" aria-label="Next Slide">
              <span class="material-symbols-outlined text-base">chevron_right</span>
            </button>
          </div>
        </div>

        <!-- Carousel Track -->
        <div id="curated-option-b-track" class="mobile-horizontal-scroll -mx-4 px-4 sm:-mx-6 sm:px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 pt-1 scroll-smooth">
          ${collections.map((c, i) => `
            <div
              data-curated-b-index="${i}"
              data-curated-demo="${c.id}"
              class="shrink-0 w-[280px] sm:w-[320px] h-[360px] sm:h-[380px] snap-start relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between p-5 text-left text-white border border-white/15"
            >
              <img
                src="${c.img}"
                alt="${c.title}"
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/25"></div>

              <!-- Top Row Tag & Bookmark Button -->
              <div class="relative z-10 flex items-center justify-between gap-2">
                <span class="inline-flex items-center gap-1 ${c.tagColor} px-3 py-1 rounded-full font-label text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider shadow-sm">
                  ${c.tag}
                </span>
                <span class="bg-black/60 backdrop-blur-md border border-white/20 text-white font-label text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full">
                  ${c.count}
                </span>
              </div>

              <!-- Bottom Content -->
              <div class="relative z-10 space-y-2">
                <div class="text-[#f5d592] font-label text-[11px] font-bold uppercase tracking-wider">
                  ${isMm ? 'အယ်ဒီတာ့ ရွေးချယ်မှု' : 'Curator’s Edition'}
                </div>
                <h4 class="font-headline text-lg sm:text-xl font-bold text-white leading-tight">
                  ${c.title}
                </h4>
                <p class="font-body text-xs text-white/85 line-clamp-2 leading-relaxed">
                  ${c.subtitle}
                </p>
                <div class="pt-1 flex items-center justify-between border-t border-white/15 pt-2 text-xs font-label font-extrabold text-[#f5d592]">
                  <span>${isMm ? 'လမ်းညွှန် ကြည့်ရှုမည်' : 'Explore Guide'}</span>
                  <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Carousel Pagination Dots -->
        <div class="flex items-center justify-center gap-1.5 pt-1" id="curated-option-b-dots">
          <span class="w-6 h-1.5 rounded-full bg-[#840f16] transition-all"></span>
          <span class="w-2 h-1.5 rounded-full bg-[#E8DDD0] transition-all"></span>
          <span class="w-2 h-1.5 rounded-full bg-[#E8DDD0] transition-all"></span>
        </div>
      </div>
    `;
  }

  function renderCuratedOption1(isMm = false) {
    return `
      <div id="curated-option-1-bento" class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="inline-flex items-center gap-1.5 font-label text-xs font-extrabold uppercase tracking-wide text-[#840f16]">
            <span class="w-2 h-2 rounded-full bg-[#840f16]"></span>
            Option 1: Editorial Bento Showcase (Hero + Duo Stack)
          </span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <!-- Dominant Hero Card (7 Cols) -->
          <div class="lg:col-span-7 relative h-72 sm:h-80 rounded-3xl overflow-hidden shadow-md group cursor-pointer border border-[#362723]" data-curated-demo="col-1">
            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80" alt="Romantic Spots" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20"></div>

            <!-- Top Pill Tag & Count -->
            <div class="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span class="inline-flex items-center gap-1.5 bg-[#D08E1C] text-[#231916] px-3 py-1 rounded-full font-label text-[11px] font-extrabold uppercase tracking-wider shadow-md">
                <span class="material-symbols-outlined text-xs leading-none">stars</span>
                ${isMm ? 'အယ်ဒီတာ့ ရွေးချယ်မှု · Issue #12' : 'Curator’s Issue #12'}
              </span>
              <span class="bg-black/60 backdrop-blur-md border border-white/20 text-white font-label text-xs font-bold px-3 py-1 rounded-full">
                ${isMm ? '၆ ဆိုင် ပါဝင်ပါသည်' : '6 Venues Included'}
              </span>
            </div>

            <!-- Bottom Content -->
            <div class="absolute bottom-4 left-4 right-4 z-10 space-y-1.5 text-white">
              <div class="text-[#f5d592] font-label text-xs font-bold uppercase tracking-wider">
                ${isMm ? 'ဒိတ်နိုက် အမှတ်တရ' : 'Candlelight & Lakefront'}
              </div>
              <h3 class="font-headline text-xl sm:text-2xl font-bold leading-tight">
                ${isMm ? 'အကြည်နူးဆုံး ရိုမန်းတစ် စားသောက်ဆိုင်များ' : 'Most Romantic Dining & Sunset Views'}
              </h3>
              <p class="font-body text-xs text-white/80 line-clamp-2 max-w-xl">
                ${isMm ? 'အင်းလျားကန်ဘေး သီးသန့်ဝိုင်းများနှင့် ဖယောင်းတိုင်အလင်းရောင် အောက်ရှိ ဇိမ်ခံညစာများ။' : 'Intimate candlelit tables, panoramic Inya Lake sunsets, and curated wine pairings.'}
              </p>
              <div class="pt-2 flex items-center gap-2 text-xs font-label font-extrabold text-[#f5d592] group-hover:translate-x-1 transition-transform">
                <span>${isMm ? 'စားသောက်ဆိုင်များ ကြည့်ရှုရန်' : 'Explore Curated Dining Guide'}</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>
          </div>

          <!-- Duo Stacked Cards (5 Cols) -->
          <div class="lg:col-span-5 flex flex-col gap-4">
            <!-- Sub-card 1 -->
            <div class="relative h-34 sm:h-38 rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-[#E8DDD0]" data-curated-demo="col-2">
              <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80" alt="Michelin" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>
              <div class="absolute top-3 left-3 z-10">
                <span class="bg-[#840f16] text-white px-2.5 py-0.5 rounded-full font-label text-[10px] font-extrabold uppercase tracking-wider">
                  ${isMm ? 'အဆင့်မြင့် ဟင်းလျာ' : 'Haute Cuisine'}
                </span>
              </div>
              <div class="absolute bottom-3 left-3 right-3 z-10 text-white">
                <h4 class="font-headline text-base font-bold leading-snug">
                  ${isMm ? 'မီရှလင်း ကြယ်ပွင့် စားသောက်ဆိုင်များ' : 'Michelin & Fine Dining Guides'}
                </h4>
                <span class="text-[11px] text-amber-200 font-label font-bold flex items-center gap-1 mt-0.5">
                  4 Tables · ${isMm ? 'စိုတ်ယူရန်' : 'Explore'} ➔
                </span>
              </div>
            </div>

            <!-- Sub-card 2 -->
            <div class="relative h-34 sm:h-38 rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-[#E8DDD0]" data-curated-demo="col-3">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" alt="Heritage" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent"></div>
              <div class="absolute top-3 left-3 z-10">
                <span class="bg-[#2f7a3f] text-white px-2.5 py-0.5 rounded-full font-label text-[10px] font-extrabold uppercase tracking-wider">
                  ${isMm ? 'ရိုးရာ လက်ဖက်ရည်' : 'Heritage Gems'}
                </span>
              </div>
              <div class="absolute bottom-3 left-3 right-3 z-10 text-white">
                <h4 class="font-headline text-base font-bold leading-snug">
                  ${isMm ? 'ရန်ကုန်မြို့လယ် ရှေးဟောင်းလက်ဖက်ရည်ဆိုင်များ' : 'Yangon Heritage & Tea Salons'}
                </h4>
                <span class="text-[11px] text-emerald-200 font-label font-bold flex items-center gap-1 mt-0.5">
                  5 Venues · ${isMm ? 'စိုတ်ယူရန်' : 'Explore'} ➔
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderCuratedOption2(isMm = false) {
    const collections = [
      {
        id: 'col-opt2-1',
        title: isMm ? 'အကြည်နူးဆုံး ရိုမန်းတစ် ညစာများ' : 'Most Romantic Dining Spots',
        moodTag: '🕯️ Candlelight & Lakefront',
        venuesCount: 5,
        img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
        avatars: [
          'assets/images/seeds_lakefront.jpg',
          'assets/images/gilded_fork.jpg',
          'assets/images/alchimiste.jpg'
        ]
      },
      {
        id: 'col-opt2-2',
        title: isMm ? 'စားဖိုမှူး အထူး ဟင်းလျာလက်ရာ' : 'Chef’s Table & Fine Dining',
        moodTag: '🍷 Sommelier & Haute Cuisine',
        venuesCount: 4,
        img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
        avatars: [
          'assets/images/gilded_fork.jpg',
          'assets/images/alchimiste.jpg',
          'assets/images/rangoon_tea_house.jpg'
        ]
      },
      {
        id: 'col-opt2-3',
        title: isMm ? 'အပန်းဖြေ စိမ်းလန်း ဥယျာဉ်ဆိုင်များ' : 'Lush Garden & Courtyard Dining',
        moodTag: '🌿 Outdoor Tropical Sanctuary',
        venuesCount: 6,
        img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        avatars: [
          'assets/images/seeds_lakefront.jpg',
          'assets/images/rangoon_tea_house.jpg',
          'assets/images/gilded_fork.jpg'
        ]
      }
    ];

    return `
      <div id="curated-option-2-storybook" class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="inline-flex items-center gap-1.5 font-label text-xs font-extrabold uppercase tracking-wide text-[#840f16]">
            <span class="w-2 h-2 rounded-full bg-[#840f16]"></span>
            Option 2: Storybook Cards with Restaurant Peek Avatars & Save Pin
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          ${collections.map(c => `
            <div class="bg-[#FFFDFC] border border-[#E8DDD0] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer" data-curated-demo="${c.id}">
              <!-- Image with Atmospheric Overlay -->
              <div class="relative h-48 w-full overflow-hidden bg-[#231916]">
                <img src="${c.img}" alt="${c.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

                <!-- Mood Badge Top Left -->
                <div class="absolute top-3 left-3 z-10">
                  <span class="inline-flex items-center gap-1 bg-black/60 backdrop-blur-md border border-white/20 text-white font-label text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    ${c.moodTag}
                  </span>
                </div>

                <!-- Bookmark Pin Top Right -->
                <button class="gallery-card-fav absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#840f16] shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-10" aria-label="Bookmark Guide" title="Save Guide">
                  <span class="material-symbols-outlined text-base">bookmark</span>
                </button>

                <!-- Venue Avatar Stack in Lower Corner -->
                <div class="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
                  <div class="flex items-center -space-x-2">
                    ${c.avatars.map(av => `
                      <img src="${av}" class="w-7 h-7 rounded-full border-2 border-white object-cover shadow-sm" alt="Venue" />
                    `).join('')}
                    <span class="w-7 h-7 rounded-full bg-[#840f16] text-white border-2 border-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                      +${c.venuesCount - c.avatars.length}
                    </span>
                  </div>
                  <span class="bg-black/60 backdrop-blur-md text-white font-label text-[11px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                    ${c.venuesCount} ${isMm ? 'ဆိုင်များ' : 'Venues'}
                  </span>
                </div>
              </div>

              <!-- Card Body -->
              <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
                <h4 class="font-headline text-base sm:text-lg font-bold text-[#231916] leading-snug group-hover:text-[#840f16] transition-colors">
                  ${c.title}
                </h4>

                <div class="pt-2 border-t border-[#E8DDD0]/80 flex items-center justify-between text-xs font-label font-bold text-[#840f16]">
                  <span>${isMm ? 'လမ်းညွှန် ကြည့်ရှုမည်' : 'View Curated Guide'}</span>
                  <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderCuratedOption3(isMm = false) {
    return `
      <div id="curated-option-3-interactive" class="space-y-4">
        <div class="flex items-center justify-between">
          <span class="inline-flex items-center gap-1.5 font-label text-xs font-extrabold uppercase tracking-wide text-[#840f16]">
            <span class="w-2 h-2 rounded-full bg-[#840f16]"></span>
            Option 3: Mood-Based Interactive Filter Bar with Live Switching
          </span>
        </div>

        <!-- Interactive Mood Filter Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1" id="curated-mood-pills">
          <button class="curated-mood-btn px-4 py-2 rounded-full font-label text-xs font-bold bg-[#840f16] text-white shadow-sm transition-all cursor-pointer whitespace-nowrap" data-mood="all">
            ✨ ${isMm ? 'အားလုံး' : 'All Stories'}
          </button>
          <button class="curated-mood-btn px-4 py-2 rounded-full font-label text-xs font-bold bg-white text-[#58413f] border border-[#E8DDD0] hover:border-[#840f16] shadow-xs transition-all cursor-pointer whitespace-nowrap" data-mood="romantic">
            🕯️ ${isMm ? 'ဒိတ်နိုက်' : 'Date Night'}
          </button>
          <button class="curated-mood-btn px-4 py-2 rounded-full font-label text-xs font-bold bg-white text-[#58413f] border border-[#E8DDD0] hover:border-[#840f16] shadow-xs transition-all cursor-pointer whitespace-nowrap" data-mood="business">
            💼 ${isMm ? 'စီးပွားရေး ဧည့်ခံ' : 'Business Dining'}
          </button>
          <button class="curated-mood-btn px-4 py-2 rounded-full font-label text-xs font-bold bg-white text-[#58413f] border border-[#E8DDD0] hover:border-[#840f16] shadow-xs transition-all cursor-pointer whitespace-nowrap" data-mood="outdoor">
            🌿 ${isMm ? 'ဥယျာဉ် & သဘာဝ' : 'Garden & Lake'}
          </button>
          <button class="curated-mood-btn px-4 py-2 rounded-full font-label text-xs font-bold bg-white text-[#58413f] border border-[#E8DDD0] hover:border-[#840f16] shadow-xs transition-all cursor-pointer whitespace-nowrap" data-mood="heritage">
            🍜 ${isMm ? 'ရိုးရာ လက်ရာစစ်' : 'Heritage & Tea'}
          </button>
        </div>

        <!-- Dynamic Card Display Container -->
        <div id="curated-mood-content" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Card 1 -->
          <div class="relative h-64 rounded-3xl overflow-hidden group cursor-pointer shadow-md border border-[#E8DDD0]" data-curated-demo="col-1">
            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80" alt="Date Night" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20"></div>
            <div class="absolute top-3.5 left-3.5">
              <span class="bg-[#D08E1C] text-[#231916] font-label text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                ${isMm ? 'အကြည်နူးဆုံး' : 'Top Romance'}
              </span>
            </div>
            <div class="absolute bottom-3.5 left-3.5 right-3.5 text-white space-y-1">
              <h4 class="font-headline text-lg font-bold leading-tight">${isMm ? 'အင်းလျားကန်ဘေး ရိုမန်းတစ် ညစာများ' : 'Lakefront Candlelit Dinners'}</h4>
              <p class="font-body text-xs text-white/80">${isMm ? '၅ ဆိုင် ပါဝင်သော အထူးလမ်းညွှန်' : '5 curated romantic venues with wine pairing'}</p>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="relative h-64 rounded-3xl overflow-hidden group cursor-pointer shadow-md border border-[#E8DDD0]" data-curated-demo="col-2">
            <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80" alt="Fine Dining" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20"></div>
            <div class="absolute top-3.5 left-3.5">
              <span class="bg-[#840f16] text-white font-label text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                ${isMm ? 'သီးသန့် အဆင့်မြင့်' : 'VIP Executive'}
              </span>
            </div>
            <div class="absolute bottom-3.5 left-3.5 right-3.5 text-white space-y-1">
              <h4 class="font-headline text-lg font-bold leading-tight">${isMm ? 'စီးပွားရေး ဧည့်ခံ သီးသန့်ခန်းများ' : 'Private Rooms for Business Dining'}</h4>
              <p class="font-body text-xs text-white/80">${isMm ? '၄ ဆိုင် ပါဝင်သော အထူးလမ်းညွှန်' : 'Acoustic-treated private dining suites'}</p>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="relative h-64 rounded-3xl overflow-hidden group cursor-pointer shadow-md border border-[#E8DDD0]" data-curated-demo="col-3">
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" alt="Heritage" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20"></div>
            <div class="absolute top-3.5 left-3.5">
              <span class="bg-[#2f7a3f] text-white font-label text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                ${isMm ? 'သဘာဝ ဥယျာဉ်' : 'Open Air Garden'}
              </span>
            </div>
            <div class="absolute bottom-3.5 left-3.5 right-3.5 text-white space-y-1">
              <h4 class="font-headline text-lg font-bold leading-tight">${isMm ? 'စိမ်းလန်းသော ပြင်ပ ဥယျာဉ်ဝိုင်းများ' : 'Lush Outdoor Garden Dining'}</h4>
              <p class="font-body text-xs text-white/80">${isMm ? '၆ ဆိုင် ပါဝင်သော အထူးလမ်းညွှန်' : 'Al-fresco seating surrounded by greenery'}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderCuratedOption4(isMm = false) {
    return `
      <div id="curated-option-4-hybrid" class="space-y-4">
        <div class="flex items-center justify-between">
          <span class="inline-flex items-center gap-1.5 font-label text-xs font-extrabold uppercase tracking-wide text-[#840f16]">
            <span class="w-2 h-2 rounded-full bg-[#840f16]"></span>
            Option 4: The Ultimate Hybrid (Bento Layout + Story Avatars + Mood Badges)
          </span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <!-- Featured Lead Story (8 Cols) -->
          <div class="lg:col-span-8 relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-lg group cursor-pointer border border-[#362723]" data-curated-demo="col-1">
            <img src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80" alt="Featured Story" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/30"></div>

            <!-- Top Floating Controls -->
            <div class="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center gap-1.5 bg-[#D08E1C] text-[#231916] px-3.5 py-1 rounded-full font-label text-xs font-extrabold uppercase tracking-wider shadow-md">
                  <span class="material-symbols-outlined text-sm leading-none">auto_awesome</span>
                  ${isMm ? 'အယ်ဒီတာ့ အထူးထုတ်' : 'Editorial Cover Story'}
                </span>
                <span class="bg-black/60 backdrop-blur-md border border-white/20 text-white font-label text-xs font-bold px-3 py-1 rounded-full hidden sm:inline-flex">
                  🕯️ Romantic Sunset
                </span>
              </div>
              <button class="gallery-card-fav w-10 h-10 rounded-full bg-white/90 backdrop-blur-md text-[#840f16] shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-10" aria-label="Bookmark Guide" title="Save Guide">
                <span class="material-symbols-outlined text-lg">bookmark</span>
              </button>
            </div>

            <!-- Floating Glassmorphic Details Card -->
            <div class="absolute bottom-4 left-4 right-4 z-10 p-5 bg-black/60 backdrop-blur-md rounded-2xl border border-white/15 text-white space-y-3">
              <div class="flex items-center justify-between gap-2">
                <span class="text-[#f5d592] font-label text-xs font-extrabold uppercase tracking-wider">
                  ${isMm ? 'အင်းလျားကန်ဘေး ဇိမ်ခံညစာ' : 'Inya Lakefront Fine Dining Issue'}
                </span>
                <!-- Multi-Avatar Peek inside Lead Story -->
                <div class="flex items-center -space-x-2">
                  <img src="assets/images/seeds_lakefront.jpg" class="w-6 h-6 rounded-full border-2 border-white object-cover" />
                  <img src="assets/images/gilded_fork.jpg" class="w-6 h-6 rounded-full border-2 border-white object-cover" />
                  <img src="assets/images/alchimiste.jpg" class="w-6 h-6 rounded-full border-2 border-white object-cover" />
                  <span class="w-6 h-6 rounded-full bg-[#840f16] text-white border-2 border-white text-[9px] font-bold flex items-center justify-center">
                    +3
                  </span>
                </div>
              </div>

              <h3 class="font-headline text-xl sm:text-2xl font-bold leading-snug">
                ${isMm ? 'အကြည်နူးဆုံး ရိုမန်းတစ် စားသောက်ဆိုင်များနှင့် ရှုခင်းများ' : 'Yangon’s Most Romantic Dining Spots & Candlelight Tables'}
              </h3>

              <div class="pt-2 border-t border-white/15 flex items-center justify-between">
                <span class="text-xs text-white/80 font-body">
                  ${isMm ? '၆ ဆိုင် ပါဝင်သည် · သီးသန့်ဝိုင်းများ ချက်ချင်းစိုတ်နိုင်' : '6 Curated Tables · Instant Confirmation Available'}
                </span>
                <span class="inline-flex items-center gap-1 text-xs font-label font-extrabold text-[#f5d592] group-hover:translate-x-1 transition-transform">
                  ${isMm ? 'ဖတ်ရှုရန်' : 'Explore Guide'} ➔
                </span>
              </div>
            </div>
          </div>

          <!-- Secondary Companion Guides (4 Cols) -->
          <div class="lg:col-span-4 flex flex-col gap-4">
            <!-- Secondary 1 -->
            <div class="relative flex-1 min-h-[175px] rounded-3xl overflow-hidden shadow-sm group cursor-pointer border border-[#E8DDD0]" data-curated-demo="col-2">
              <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80" alt="Michelin" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              
              <div class="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                <span class="bg-[#840f16] text-white px-2.5 py-0.5 rounded-full font-label text-[10px] font-extrabold uppercase">
                  🍷 Sommelier Picks
                </span>
                <span class="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                  4 Tables
                </span>
              </div>

              <div class="absolute bottom-3 left-3 right-3 z-10 text-white space-y-1">
                <h4 class="font-headline text-base font-bold leading-snug">
                  ${isMm ? 'မီရှလင်းအဆင့် အထူးညစာများ' : 'Michelin-Standard Fine Dining'}
                </h4>
                <div class="text-[11px] text-amber-200 font-label font-bold flex items-center gap-1">
                  ${isMm ? 'စိုတ်ယူရန်' : 'Explore'} ➔
                </div>
              </div>
            </div>

            <!-- Secondary 2 -->
            <div class="relative flex-1 min-h-[175px] rounded-3xl overflow-hidden shadow-sm group cursor-pointer border border-[#E8DDD0]" data-curated-demo="col-3">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80" alt="Heritage" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              
              <div class="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                <span class="bg-[#2f7a3f] text-white px-2.5 py-0.5 rounded-full font-label text-[10px] font-extrabold uppercase">
                  🍜 Heritage Craft
                </span>
                <span class="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                  5 Venues
                </span>
              </div>

              <div class="absolute bottom-3 left-3 right-3 z-10 text-white space-y-1">
                <h4 class="font-headline text-base font-bold leading-snug">
                  ${isMm ? 'ရန်ကုန်မြို့လယ် ရှေးဟောင်းလက်ဖက်ရည်' : 'Heritage Teahouses & Street Bites'}
                </h4>
                <div class="text-[11px] text-emerald-200 font-label font-bold flex items-center gap-1">
                  ${isMm ? 'စိုတ်ယူရန်' : 'Explore'} ➔
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderCuratedDesignsShowcase() {
    const isMm = store.getState().currentLanguage === 'MM';
    return `
      <div class="space-y-10">
        <div class="p-4 sm:p-5 rounded-2xl bg-[#F8EFE5] border border-[#E8DDD0] space-y-2">
          <h3 class="font-headline text-base sm:text-lg font-bold text-[#840f16]">
            Curated Collection Layout & Responsive Explorations
          </h3>
          <p class="font-body text-xs sm:text-sm text-[#58413f] leading-relaxed">
            Below you can test both <strong>Desktop Layout Concepts (Options 1–4)</strong> and the new <strong>Mobile/Tablet Carousel Behaviors (Options A & B)</strong>. All cards feature real dimensions, typography scales, edge snapping, and interactive navigation triggers.
          </p>
        </div>

        <!-- NEW RESPONSIVE MOBILE & TABLET CAROUSEL DEMOS -->
        <div class="space-y-6">
          <div class="border-b border-[#E8DDD0] pb-2">
            <h4 class="font-headline text-base font-bold text-[#231916]">
              Mobile & Tablet Responsive Behaviors (Equal Sizing + Carousel)
            </h4>
          </div>
          ${renderCuratedOptionA(isMm)}
          ${renderCuratedOptionB(isMm)}
        </div>

        <!-- DESKTOP ARCHETYPES -->
        <div class="space-y-6 pt-4">
          <div class="border-b border-[#E8DDD0] pb-2">
            <h4 class="font-headline text-base font-bold text-[#231916]">
              Desktop Layout Archetypes (Options 1 – 4)
            </h4>
          </div>
          ${renderCuratedOption1(isMm)}
          ${renderCuratedOption2(isMm)}
          ${renderCuratedOption3(isMm)}
          ${renderCuratedOption4(isMm)}
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
        ${section('Curated Collection Explorations (Options 1 - 4)', 'ရွေးချယ်ထားသော စားသောက်ဆိုင် ဒီဇိုင်းများ (၁ - ၄)', renderCuratedDesignsShowcase())}
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

    // Curated Option 3 Interactive Mood Pill Filtering
    const moodButtons = root.querySelectorAll('.curated-mood-btn');
    const moodContentContainer = root.querySelector('#curated-mood-content');
    if (moodButtons.length && moodContentContainer) {
      const isMm = store.getState().currentLanguage === 'MM';
      const MOOD_DATA = {
        all: [
          { tag: isMm ? 'အကြည်နူးဆုံး' : 'Top Romance', tagColor: 'bg-[#D08E1C] text-[#231916]', title: isMm ? 'အင်းလျားကန်ဘေး ရိုမန်းတစ် ညစာများ' : 'Lakefront Candlelit Dinners', desc: isMm ? '၅ ဆိုင် ပါဝင်သော အထူးလမ်းညွှန်' : '5 curated romantic venues with wine pairing', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', id: 'col-1' },
          { tag: isMm ? 'သီးသန့် အဆင့်မြင့်' : 'VIP Executive', tagColor: 'bg-[#840f16] text-white', title: isMm ? 'စီးပွားရေး ဧည့်ခံ သီးသန့်ခန်းများ' : 'Private Rooms for Business Dining', desc: isMm ? '၄ ဆိုင် ပါဝင်သော အထူးလမ်းညွှန်' : 'Acoustic-treated private dining suites', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80', id: 'col-2' },
          { tag: isMm ? 'သဘာဝ ဥယျာဉ်' : 'Open Air Garden', tagColor: 'bg-[#2f7a3f] text-white', title: isMm ? 'စိမ်းလန်းသော ပြင်ပ ဥယျာဉ်ဝိုင်းများ' : 'Lush Outdoor Garden Dining', desc: isMm ? '၆ ဆိုင် ပါဝင်သော အထူးလမ်းညွှန်' : 'Al-fresco seating surrounded by greenery', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', id: 'col-3' }
        ],
        romantic: [
          { tag: isMm ? 'ဒိတ်နိုက်' : 'Candlelit Tables', tagColor: 'bg-[#D08E1C] text-[#231916]', title: isMm ? 'ကန်ဘေး နေဝင်ချိန် ဝိုင်းများ' : 'Sunset View & Champagne Pairings', desc: isMm ? 'အင်းလျားနှင့် ကန်တော်ကြီး အနီး' : 'Overlooking Inya Lake with private balcony seating', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80', id: 'col-1' },
          { tag: isMm ? 'ပြည့်စုံသော အလှ' : 'Intimate Suites', tagColor: 'bg-[#840f16] text-white', title: isMm ? 'ဖယောင်းတိုင်မီးနှင့် ညစာ' : 'Private Garden Gazebos', desc: isMm ? 'သီးသန့် လေဟာပြင် မဏ္ဍပ်များ' : 'Secluded outdoor dining pavilions surrounded by orchids', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', id: 'col-3' }
        ],
        business: [
          { tag: isMm ? 'ဧည့်ခံ သီးသန့်' : 'Boardroom Suites', tagColor: 'bg-[#840f16] text-white', title: isMm ? 'စီးပွားရေး ညစာစားပွဲများ' : 'Private Dining for Executives', desc: isMm ? 'အသံလုံအခန်းများနှင့် အဆင့်မြင့်ဝန်ဆောင်မှု' : 'Confidential meeting tables with sommelier service', img: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80', id: 'col-2' }
        ],
        outdoor: [
          { tag: isMm ? 'လေဟာပြင်' : 'Tropical Breeze', tagColor: 'bg-[#2f7a3f] text-white', title: isMm ? 'အပန်းဖြေ ဥယျာဉ် စားသောက်ဆိုင်များ' : 'Tropical Courtyard & Poolside Cafes', desc: isMm ? 'စိမ်းလန်းသော သဘာဝ ရှုခင်း' : 'Lush greenery, open breeze, and artisanal coffee', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', id: 'col-3' }
        ],
        heritage: [
          { tag: isMm ? 'ရှေးဟောင်း လက်ရာ' : 'Heritage Recipes', tagColor: 'bg-[#b07616] text-white', title: isMm ? 'ကိုလိုနီခေတ် ရှေးဟောင်း လက်ဖက်ရည်ဆိုင်များ' : 'Colonial Architecture & Heritage Teahouses', desc: isMm ? 'ပန်းဆိုးတန်းနှင့် မြို့လယ် အဆောက်အအုံများ' : 'Restored high-ceiling salons with traditional clay-pot teas', img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80', id: 'col-3' }
        ]
      };

      moodButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const mood = btn.getAttribute('data-mood') || 'all';
          moodButtons.forEach(b => {
            b.className = 'curated-mood-btn px-4 py-2 rounded-full font-label text-xs font-bold bg-white text-[#58413f] border border-[#E8DDD0] hover:border-[#840f16] shadow-xs transition-all cursor-pointer whitespace-nowrap';
          });
          btn.className = 'curated-mood-btn px-4 py-2 rounded-full font-label text-xs font-bold bg-[#840f16] text-white shadow-sm transition-all cursor-pointer whitespace-nowrap';

          const items = MOOD_DATA[mood] || MOOD_DATA.all;
          moodContentContainer.innerHTML = items.map(item => `
            <div class="relative h-64 rounded-3xl overflow-hidden group cursor-pointer shadow-md border border-[#E8DDD0] animate-fadeIn" data-curated-demo="${item.id}">
              <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20"></div>
              <div class="absolute top-3.5 left-3.5">
                <span class="${item.tagColor} font-label text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                  ${item.tag}
                </span>
              </div>
              <div class="absolute bottom-3.5 left-3.5 right-3.5 text-white space-y-1">
                <h4 class="font-headline text-lg font-bold leading-tight">${item.title}</h4>
                <p class="font-body text-xs text-white/80">${item.desc}</p>
              </div>
            </div>
          `).join('');

          // Reattach demo click
          moodContentContainer.querySelectorAll('[data-curated-demo]').forEach(card => {
            card.addEventListener('click', () => {
              store.showToast('Demo: Navigating to Curated Collection Detail');
            });
          });
        });
      });
    }

    // Option B Carousel Interactive Controls
    const optionBTrack = root.querySelector('#curated-option-b-track');
    const optionBPrev = root.querySelector('#curated-option-b-prev');
    const optionBNext = root.querySelector('#curated-option-b-next');
    const optionBDots = root.querySelectorAll('#curated-option-b-dots span');

    if (optionBTrack) {
      const updateDots = () => {
        if (!optionBDots.length) return;
        const scrollLeft = optionBTrack.scrollLeft;
        const cardWidth = optionBTrack.querySelector('[data-curated-b-index]')?.offsetWidth || 280;
        const activeIndex = Math.min(Math.max(Math.round(scrollLeft / (cardWidth + 16)), 0), optionBDots.length - 1);
        optionBDots.forEach((dot, idx) => {
          if (idx === activeIndex) {
            dot.className = 'w-6 h-1.5 rounded-full bg-[#840f16] transition-all';
          } else {
            dot.className = 'w-2 h-1.5 rounded-full bg-[#E8DDD0] transition-all';
          }
        });
      };

      optionBTrack.addEventListener('scroll', updateDots, { passive: true });

      if (optionBPrev) {
        optionBPrev.addEventListener('click', () => {
          const cardWidth = optionBTrack.querySelector('[data-curated-b-index]')?.offsetWidth || 280;
          optionBTrack.scrollBy({ left: -(cardWidth + 16), behavior: 'smooth' });
        });
      }

      if (optionBNext) {
        optionBNext.addEventListener('click', () => {
          const cardWidth = optionBTrack.querySelector('[data-curated-b-index]')?.offsetWidth || 280;
          optionBTrack.scrollBy({ left: (cardWidth + 16), behavior: 'smooth' });
        });
      }
    }

    // Curated Demo Cards Click Feedback
    root.querySelectorAll('[data-curated-demo]').forEach(card => {
      card.addEventListener('click', () => {
        store.showToast('Demo: Opening Curated Collection Guide');
      });
    });

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
