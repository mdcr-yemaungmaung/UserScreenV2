/* ==========================================================================
   EzBookNow Screen U-02 — 予約入力 (Booking Input Form)
   Route: /s/{slug}/book
   Captures customer details (Member & Guest booking):
     - Full Name
     - Phone Number (SMS-capable)
     - Email Address
     - Quick dietary & celebration occasion tags
     - Special Requests / Dietary Notes
     - Payment Preference (QR discount vs Pay at Restaurant)
   Navigation:
     - Back / Step 1 -> navigates to U-01 (/s/{slug})
     - Submit / Continue -> navigates to U-03 (/s/{slug}/confirm)
   ========================================================================== */

(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;

  function renderBookingStep2(state) {
    const modalState = state.bookingModalState || {};
    const restaurant = modalState.restaurant || (window.YoyakuData && window.YoyakuData.RESTAURANTS_DATA && window.YoyakuData.RESTAURANTS_DATA[0]);
    if (!restaurant) return '';

    const bData = modalState.bookingData || {
      date: 'Today',
      time: '18:30',
      guests: 2,
      seatingPreference: 'Standard'
    };

    const gData = modalState.guestData || {
      guestName: state.isAuthenticated ? (state.myPageData.userName || 'Alex Aung') : 'Evelyn St. Clair',
      guestPhone: state.isAuthenticated ? (state.myPageData.userPhone || '+95 9 791 234 567') : '+95 9 791 234 567',
      guestEmail: state.isAuthenticated ? (state.myPageData.userEmail || 'alex@example.com') : 'evelyn.clair@example.com',
      specialRequests: '',
      paymentMethod: 'qr'
    };

    const t = (k) => window.I18n ? window.I18n.t(k) : (window.YoyakuI18n ? window.YoyakuI18n.t(k) : k);
    const slug = (store && store.getRestaurantSlug) ? store.getRestaurantSlug(restaurant) : (restaurant.slug || 'gilded-fork');
    const { renderBookingStepper } = window.YoyakuComponents;

    const occasionChips = [
      { id: '🎂 Birthday', label: '🎂 Birthday' },
      { id: '💍 Anniversary', label: '💍 Anniversary' },
      { id: '🌱 Vegetarian', label: '🌱 Vegetarian' },
      { id: '🥩 Halal', label: '🥩 Halal' },
      { id: '🍷 Window Table', label: '🍷 Window Table' },
      { id: '👶 High Chair', label: '👶 High Chair' },
      { id: '💼 Business Dinner', label: '💼 Business' },
      { id: '🌶️ Mild Spice', label: '🌶️ Mild Spice' }
    ];

    return `
      <div class="max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-32 sm:pb-16 space-y-6 text-left animate-fadeIn">

        <!-- UNIFIED STEPPER PROGRESS BAR -->
        ${renderBookingStepper ? renderBookingStepper(2, slug) : ''}

        <!-- STEP 2 CONTENT CARD -->
        <div class="bg-[#FFFDFC] rounded-3xl border border-[#E8DDD0] shadow-sm overflow-hidden p-5 sm:p-8 space-y-6">

          <!-- Header & Schedule Recap Pill -->
          <div class="border-b border-[#E8DDD0] pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 class="font-headline text-2xl sm:text-3xl text-[#241A18] font-bold">
                ${t('guest_details_title')}
              </h2>
              <p class="font-body text-xs text-[#6D6561] mt-1">
                Provide guest details for booking confirmation and arrival alerts.
              </p>
            </div>
            
            <div class="bg-[#F8EFE5] px-3.5 py-1.5 rounded-full border border-[#E8DDD0] flex items-center gap-2 text-xs font-semibold text-[#241A18]">
              <span class="material-symbols-outlined text-sm text-[#9B1C25]">restaurant</span>
              <span>${restaurant.name}</span>
              <span class="text-[#E8DDD0]">•</span>
              <span>${bData.date}, ${bData.time} (${bData.guests} Guests)</span>
            </div>
          </div>

          <!-- Member Auto-fill Alert Banner -->
          ${state.isAuthenticated ? `
            <div class="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs text-emerald-950 animate-fadeIn">
              <div class="flex items-center gap-2.5 min-w-0">
                <span class="material-symbols-outlined text-emerald-700 text-lg shrink-0">auto_fix_high</span>
                <span class="truncate">
                  Auto-filled for <strong>${state.myPageData.userName || 'Alex Aung'}</strong> (${state.myPageData.userPhone || '+95 9 791 234 567'}).
                </span>
              </div>
              <button
                type="button"
                id="step2-clear-guest-btn"
                class="shrink-0 font-label font-bold text-emerald-800 hover:text-emerald-950 underline cursor-pointer"
              >
                Booking for someone else?
              </button>
            </div>
          ` : `
            <div class="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 flex items-center gap-2.5 text-xs text-amber-900">
              <span class="material-symbols-outlined text-amber-700 text-base shrink-0">speed</span>
              <span>Fast Guest Checkout: No password required. We'll send an instant SMS confirmation.</span>
            </div>
          `}

          <form id="step2-form" class="space-y-6">

            <!-- Contact Fields -->
            <div class="space-y-4">
              <div class="font-headline text-base sm:text-lg text-[#241A18] font-bold border-b border-[#E8DDD0] pb-2 flex items-center gap-2">
                <span class="material-symbols-outlined text-[#9B1C25] text-lg">person</span>
                <span>${t('contact_info_title')}</span>
              </div>

              <div>
                <label class="font-label text-xs font-bold text-[#6D6561] uppercase block mb-1.5">
                  ${t('full_name_required')}
                </label>
                <div class="relative">
                  <span class="material-symbols-outlined absolute left-3.5 top-3 text-[#9A908B] text-lg">badge</span>
                  <input
                    type="text"
                    id="step2-name"
                    required
                    value="${gData.guestName || ''}"
                    placeholder="${t('name_placeholder')}"
                    class="w-full bg-[#FFFDFC] border border-[#E8DDD0] focus:border-[#9B1C25] rounded-xl pl-11 pr-4 py-3 font-body text-sm text-[#241A18] focus:outline-none transition-colors shadow-2xs"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="font-label text-xs font-bold text-[#6D6561] uppercase block mb-1.5">
                    ${t('phone_sms_label')}
                  </label>
                  <div class="relative">
                    <span class="absolute left-3.5 top-3 text-xs font-bold text-[#6D6561] flex items-center gap-1">
                      🇲🇲 +95
                    </span>
                    <input
                      type="tel"
                      id="step2-phone"
                      required
                      value="${gData.guestPhone || ''}"
                      placeholder="9 791 234 567"
                      class="w-full bg-[#FFFDFC] border border-[#E8DDD0] focus:border-[#9B1C25] rounded-xl pl-16 pr-4 py-3 font-body text-sm text-[#241A18] focus:outline-none transition-colors shadow-2xs"
                    />
                  </div>
                </div>

                <div>
                  <label class="font-label text-xs font-bold text-[#6D6561] uppercase block mb-1.5">
                    ${t('email_required_label')}
                  </label>
                  <div class="relative">
                    <span class="material-symbols-outlined absolute left-3.5 top-3 text-[#9A908B] text-lg">mail</span>
                    <input
                      type="email"
                      id="step2-email"
                      required
                      value="${gData.guestEmail || ''}"
                      placeholder="name@example.com"
                      class="w-full bg-[#FFFDFC] border border-[#E8DDD0] focus:border-[#9B1C25] rounded-xl pl-11 pr-4 py-3 font-body text-sm text-[#241A18] focus:outline-none transition-colors shadow-2xs"
                    />
                  </div>
                </div>
              </div>

              <!-- Special Requests with Quick-Add Chips -->
              <div class="space-y-2 pt-2">
                <div class="flex items-center justify-between">
                  <label class="font-label text-xs font-bold text-[#6D6561] uppercase">
                    ${t('special_requests_title')}
                  </label>
                  <span class="text-[10px] text-[#9A908B] font-semibold">Tap tags to quick-add</span>
                </div>

                <!-- Occasion & Dietary Chips -->
                <div class="flex flex-wrap gap-1.5 pb-1">
                  ${occasionChips.map(chip => `
                    <button
                      type="button"
                      data-tag-chip="${chip.id}"
                      class="px-3 py-1 rounded-full text-xs font-medium border border-[#E8DDD0] bg-[#F8EFE5] hover:bg-[#E8DDD0] text-[#241A18] transition-colors cursor-pointer active:scale-95"
                    >
                      ${chip.label}
                    </button>
                  `).join('')}
                </div>

                <div class="relative">
                  <textarea
                    id="step2-requests"
                    rows="3"
                    placeholder="${t('special_requests_placeholder')}"
                    class="w-full bg-[#FFFDFC] border border-[#E8DDD0] focus:border-[#9B1C25] rounded-xl p-3.5 font-body text-sm text-[#241A18] resize-none focus:outline-none transition-colors shadow-2xs"
                  >${gData.specialRequests || ''}</textarea>
                </div>
              </div>
            </div>

            <!-- Payment Preference Selection -->
            <div class="space-y-3 pt-2">
              <div class="font-headline text-base sm:text-lg text-[#241A18] font-bold border-b border-[#E8DDD0] pb-2 flex items-center gap-2">
                <span class="material-symbols-outlined text-[#9B1C25] text-lg">credit_card</span>
                <span>${t('payment_preference_title')}</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- QR Promo Option -->
                <button
                  type="button"
                  data-select-payment="qr"
                  class="p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 cursor-pointer transition-all ${
                    gData.paymentMethod === 'qr'
                      ? 'bg-amber-50/50 border-[#9B1C25] ring-2 ring-[#9B1C25]/20 shadow-xs'
                      : 'bg-[#FFFDFC] border-[#E8DDD0] hover:border-[#9B1C25]'
                  }"
                >
                  <div>
                    <div class="flex justify-between items-center font-headline text-sm font-bold text-[#241A18]">
                      <span>KBZPay / AYA Pay QR</span>
                      <span class="material-symbols-outlined text-[#9B1C25]">qr_code_2</span>
                    </div>
                    <p class="font-body text-xs text-[#6D6561] mt-1">${t('pay_qr_desc')}</p>
                  </div>
                  <div class="pt-2 border-t border-[#E8DDD0]/50 flex items-center justify-between">
                    <span class="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                      <span class="material-symbols-outlined text-xs">savings</span>
                      <span>50,000 MMK Instant Discount</span>
                    </span>
                    ${gData.paymentMethod === 'qr' ? '<span class="material-symbols-outlined text-[#9B1C25] text-base font-bold">check_circle</span>' : ''}
                  </div>
                </button>

                <!-- Pay at Venue Option -->
                <button
                  type="button"
                  data-select-payment="store"
                  class="p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 cursor-pointer transition-all ${
                    gData.paymentMethod === 'store'
                      ? 'bg-amber-50/50 border-[#9B1C25] ring-2 ring-[#9B1C25]/20 shadow-xs'
                      : 'bg-[#FFFDFC] border-[#E8DDD0] hover:border-[#9B1C25]'
                  }"
                >
                  <div>
                    <div class="flex justify-between items-center font-headline text-sm font-bold text-[#241A18]">
                      <span>${t('pay_at_restaurant')}</span>
                      <span class="material-symbols-outlined text-[#6D6561]">payments</span>
                    </div>
                    <p class="font-body text-xs text-[#6D6561] mt-1">${t('pay_at_restaurant_desc')}</p>
                  </div>
                  <div class="pt-2 border-t border-[#E8DDD0]/50 flex items-center justify-between">
                    <span class="inline-flex items-center gap-1 text-[11px] font-bold text-stone-700 bg-stone-100 px-2.5 py-0.5 rounded-full">
                      <span class="material-symbols-outlined text-xs">shield</span>
                      <span>Zero Upfront Deposit</span>
                    </span>
                    ${gData.paymentMethod === 'store' ? '<span class="material-symbols-outlined text-[#9B1C25] text-base font-bold">check_circle</span>' : ''}
                  </div>
                </button>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-6 border-t border-[#E8DDD0]">
              <a
                href="#/s/${slug}"
                id="step2-back-btn"
                class="w-full sm:w-auto px-7 py-3.5 rounded-full border border-[#E8DDD0] font-label text-xs sm:text-sm font-semibold text-[#6D6561] hover:bg-[#F8EFE5] transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span class="material-symbols-outlined text-sm">arrow_back</span>
                <span>${t('back_to_date_slots')}</span>
              </a>
              <button
                type="submit"
                id="step2-submit-btn"
                class="w-full sm:w-auto bg-[#9B1C25] hover:bg-[#7F161E] text-white font-label text-xs sm:text-sm font-bold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <span>${t('continue_to_confirm')}</span>
                <span class="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>

          </form>

        </div>
      </div>
    `;
  }

  function attachBookingStep2Events(containerElement = document) {
    // Quick occasion tags click
    containerElement.querySelectorAll('[data-tag-chip]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tag = e.currentTarget.getAttribute('data-tag-chip');
        const reqArea = containerElement.querySelector('#step2-requests');
        if (reqArea && tag) {
          const currentVal = reqArea.value.trim();
          if (!currentVal.includes(tag)) {
            reqArea.value = currentVal ? `${currentVal}, ${tag}` : tag;
          }
          reqArea.focus();
        }
      });
    });

    // Clear guest details button for logged-in users booking for someone else
    const clearBtn = containerElement.querySelector('#step2-clear-guest-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        const nameInput = containerElement.querySelector('#step2-name');
        const phoneInput = containerElement.querySelector('#step2-phone');
        const emailInput = containerElement.querySelector('#step2-email');
        if (nameInput) nameInput.value = '';
        if (phoneInput) phoneInput.value = '';
        if (emailInput) emailInput.value = '';
        if (nameInput) nameInput.focus();
      });
    }

    // Payment selection
    containerElement.querySelectorAll('[data-select-payment]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const paymentMethod = e.currentTarget.getAttribute('data-select-payment');
        store.setBookingStep(2, { guestData: { paymentMethod } });
      });
    });

    // Back button
    const backBtn = containerElement.querySelector('#step2-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        const name = containerElement.querySelector('#step2-name')?.value;
        const phone = containerElement.querySelector('#step2-phone')?.value;
        const email = containerElement.querySelector('#step2-email')?.value;
        const requests = containerElement.querySelector('#step2-requests')?.value;

        store.setBookingStep(1, {
          guestData: {
            guestName: name !== undefined ? name : '',
            guestPhone: phone !== undefined ? phone : '',
            guestEmail: email !== undefined ? email : '',
            specialRequests: requests !== undefined ? requests : ''
          }
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Form submit to Step 3
    const step2Form = containerElement.querySelector('#step2-form');
    if (step2Form) {
      step2Form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = containerElement.querySelector('#step2-name')?.value || '';
        const phone = containerElement.querySelector('#step2-phone')?.value || '';
        const email = containerElement.querySelector('#step2-email')?.value || '';
        const requests = containerElement.querySelector('#step2-requests')?.value || '';

        store.setBookingStep(3, {
          guestData: {
            guestName: name,
            guestPhone: phone,
            guestEmail: email,
            specialRequests: requests
          }
        });

        const r = store.getState().bookingModalState.restaurant;
        const slug = store.getRestaurantSlug ? store.getRestaurantSlug(r) : 'gilded-fork';
        window.location.hash = `#/s/${slug}/confirm`;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  window.YoyakuComponents.renderBookingStep2 = renderBookingStep2;
  window.YoyakuComponents.attachBookingStep2Events = attachBookingStep2Events;
})();
