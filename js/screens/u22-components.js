(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};

  const store = window.store;
  const C = window.YoyakuComponents;

  const TOKENS = [
    { name: 'Primary', value: '#840f16' },
    { name: 'Gold Accent', value: '#D08E1C' },
    { name: 'Card Surface', value: '#FFF9EE' },
    { name: 'Card Border', value: '#EADFD1' },
    { name: 'App Bg', value: '#FFF7E8' },
    { name: 'Tint', value: '#FFF8F6' },
    { name: 'Sand', value: '#FBF3E2' },
    { name: 'Cream', value: '#FAF3E8' },
    { name: 'Promo', value: '#FFF3D6' },
    { name: 'Ink', value: '#231916' },
    { name: 'Muted', value: '#58413f' }
  ];

  function sectionHeader(titleEn, titleMm) {
    const isMm = store.getState().currentLanguage === 'MM';
    const title = isMm ? titleMm : titleEn;
    return `
      <div class="mb-4 flex items-center gap-2">
        <span class="w-1.5 h-6 rounded-full bg-[#840f16]"></span>
        <h2 class="font-headline text-xl sm:text-2xl font-bold text-[#1E1B13]">${title}</h2>
      </div>
    `;
  }

  function section(titleEn, titleMm, bodyHtml) {
    return `
      <section class="bg-white rounded-2xl sm:rounded-3xl border border-[#EADFD1] p-4 sm:p-6 shadow-sm space-y-1">
        ${sectionHeader(titleEn, titleMm)}
        ${bodyHtml}
      </section>
    `;
  }

  function renderColors() {
    const swatches = TOKENS.map(t => `
      <div class="flex flex-col items-center gap-2">
        <div class="w-full h-16 rounded-xl border border-[#EADFD1] shadow-inner" style="background-color: ${t.value};"></div>
        <div class="text-center">
          <div class="font-label text-xs font-bold text-[#231916]">${t.name}</div>
          <div class="font-body text-[10px] text-[#58413f]">${t.value}</div>
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
        <div class="p-4 rounded-xl bg-[#FBF3E2] border border-[#EADFD1]">
          <div class="font-headline text-2xl sm:text-3xl font-bold text-[#840f16]">Headline Font</div>
          <div class="font-headline text-base text-[#58413f]">The Gilded Fork · ရွှေရက်သွေးအိုး</div>
        </div>
        <div class="p-4 rounded-xl bg-[#FBF3E2] border border-[#EADFD1]">
          <div class="font-label text-xl font-extrabold uppercase tracking-wide text-[#840f16]">Label Font</div>
          <div class="font-label text-sm text-[#58413f]">RESERVE · နေ့စဉ်</div>
        </div>
        <div class="p-4 rounded-xl bg-[#FBF3E2] border border-[#EADFD1]">
          <div class="font-body text-base text-[#231916]">Body Font — comfortable reading at 16px for Burmese and Latin scripts.</div>
          <div class="font-body text-sm text-[#58413f]">မြန်မာစာသားများကို ဖတ်ရှုရလွယ်ကူပါသည်။</div>
        </div>
      </div>
    `;
  }

  function renderButtons() {
    return `
      <div class="flex flex-wrap items-center gap-3 sm:gap-4">
        <button class="btn-primary px-5 py-2.5 rounded-xl font-label text-sm font-bold shadow-md cursor-pointer">Primary</button>
        <button class="px-5 py-2.5 rounded-xl font-label text-sm font-bold border border-[#840f16] text-[#840f16] bg-white hover:bg-[#840f16]/10 transition-colors cursor-pointer">Secondary</button>
        <button class="px-5 py-2.5 rounded-xl font-label text-sm font-bold border border-[#EADFD1] text-[#58413f] bg-[#FFF8F6] hover:border-[#840f16] transition-colors cursor-pointer">Outline</button>
        <button
          id="gallery-fav-btn"
          class="w-11 h-11 rounded-full bg-white border border-[#EADFD1] shadow-md flex items-center justify-center text-[#840f16] cursor-pointer transition-all active:scale-95"
          title="Favorite (tap for bounce)"
        >
          <span class="material-symbols-outlined text-xl">favorite</span>
        </button>
        <button class="w-11 h-11 rounded-full bg-[#840f16] text-white flex items-center justify-center shadow-md cursor-pointer transition-transform active:scale-95">
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
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-label font-bold bg-[#EAF3EB] text-[#2f7a3f] border border-[#C5DEC8]">Completed</span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-label font-bold bg-[#FBF3E2] text-[#8f5d0b] border border-[#EADFD1]">Pending</span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-label font-bold bg-rose-50 text-rose-600 border border-rose-200">Cancelled</span>
        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-label font-bold bg-[#FFF3D6] text-[#8f5d0b] border border-[#EADFD1]">Waitlisted</span>
      </div>`;
    const subhead = (t) => `<h3 class="font-label text-xs font-bold uppercase tracking-wide text-[#840f16]">${t}</h3>`;
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

  function renderSuggested() {
    const subhead = (t) => `<h3 class="font-label text-xs font-bold uppercase tracking-wide text-[#840f16]">${t}</h3>`;
    const statuses = ['confirmed', 'completed', 'pending', 'waitlisted', 'cancelled'];
    return `
      <div class="space-y-6">
        <div class="space-y-3">
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
  }

  window.YoyakuComponents.renderComponentGallery = renderComponentGallery;
  window.YoyakuComponents.attachComponentGalleryEvents = attachComponentGalleryEvents;
  window.YoyakuComponents.renderStatusBadge = renderStatusBadge;
  window.YoyakuComponents.renderIconButton = renderIconButton;
  window.YoyakuComponents.renderFormField = renderFormField;
  window.YoyakuComponents.renderEmptyState = renderEmptyState;
})();
