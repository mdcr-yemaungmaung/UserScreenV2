/* ==========================================================================
   EzBookNow Screen U-01 — 予約ページ (SNS Landing / Direct Booking Page)
   Route: /s/{slug}
   Core landing page for customer table reservations.
   Allows selection of:
     - Date (Interactive bounded calendar)
     - Party Size (1–12 Guests)
     - Time Slot (Real-time seat availability)
     - Seating Area Preference
   Navigation:
     - "お店の情報を見る" (View Store Info) -> navigates to U-05 (/s/{slug}/info)
     - "Continue" -> navigates to U-02 (/s/{slug}/book)
   * Note: Waitlist feature has been completely removed per v2.2 spec.
   ========================================================================== */

(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;
  const { generateCalendarGrid } = window.YoyakuComponents;

  function renderBookingStep1(state) {
    const modalState = state.bookingModalState || {};
    const restaurant = modalState.restaurant || (window.YoyakuData && window.YoyakuData.RESTAURANTS_DATA && window.YoyakuData.RESTAURANTS_DATA[0]);
    if (!restaurant) return '';

    const bData = modalState.bookingData || {
      date: 'Aug 20, 2026',
      time: '19:00',
      guests: 2,
      seatingPreference: 'Standard'
    };
    const t = (k) => window.I18n ? window.I18n.t(k) : k;
    const isMm = (window.I18n ? window.I18n.getLang() : '') === 'mm';
    const slug = (store && store.getRestaurantSlug) ? store.getRestaurantSlug(restaurant) : (restaurant.slug || 'gilded-fork');

    const timeSlots = [
      { time: '18:00', isLimited: false, status: t('slot_available') },
      { time: '18:30', isLimited: false, status: t('slot_available') },
      { time: '19:00', isLimited: true, status: t('slot_limited') },
      { time: '19:30', isLimited: false, status: t('slot_available') },
      { time: '20:00', isLimited: false, status: t('slot_available') },
      { time: '20:30', isLimited: true, status: t('slot_limited') }
    ];

    function getSeatingLabel(seatId) {
      switch (seatId) {
        case 'Window View': return t('seat_window');
        case "Chef's Counter": return t('seat_counter');
        case 'Private Room': return t('seat_private');
        case 'Standard':
        default: return t('seat_standard');
      }
    }

    return `
      <div class="max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-28 sm:pb-16 space-y-6 text-left animate-fadeIn">
        
        <!-- RESTAURANT BANNER & STORE INFO ENTRY -->
        <div class="bg-[#FFFDFC] border border-[#E8DDD0] rounded-3xl p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center gap-4 min-w-0">
            <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shrink-0 border border-[#E8DDD0] bg-stone-100">
              <img
                src="${restaurant.heroImage || restaurant.images[0]}"
                alt="${restaurant.name}"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center gap-1 text-[11px] font-bold text-[#C69A2B] bg-[#FFF8EE] px-2 py-0.5 rounded-full border border-[#E8DDD0]">
                  <span class="material-symbols-outlined text-xs fill-1">star</span>
                  ${restaurant.rating || 4.9}
                </span>
              </div>
              <h1 class="font-headline text-lg sm:text-xl font-bold text-[#241A18] truncate mt-0.5">
                ${isMm ? (restaurant.nameMM || restaurant.name) : restaurant.name}
              </h1>
              <p class="font-body text-xs text-[#6D6561] flex items-center gap-1.5 truncate mt-0.5">
                <span class="material-symbols-outlined text-sm text-[#9B1C25]">location_on</span>
                <span>${restaurant.area || restaurant.location || 'Yangon'}</span>
                <span class="text-[#E8DDD0]">•</span>
                <span>${restaurant.cuisine || 'Burmese'}</span>
              </p>
            </div>
          </div>

          <!-- U-05 Navigation Link -->
          <a
            href="#/s/${slug}/info"
            id="u01-view-shop-info-btn"
            class="w-full sm:w-auto px-5 py-2.5 rounded-full font-label text-xs font-bold text-[#241A18] bg-[#F8EFE5] hover:bg-[#E8DDD0] border border-[#E8DDD0] transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span class="material-symbols-outlined text-base text-[#9B1C25]">storefront</span>
            <span>${t('viewShopInfo')}</span>
          </a>
        </div>

        <!-- STEPPER PROGRESS BAR -->
        <div class="px-1 sm:px-2">
          <div class="grid grid-cols-3 gap-3 text-left">
            <div class="flex flex-col justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#9B1C25] text-white shadow-xs">1</div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#9B1C25]">STEP 01</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#241A18] truncate stepper-step-title">${t('step1')}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#9B1C25]"></div>
            </div>
            <div class="flex flex-col justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#E8DDD0] text-[#6D6561]">2</div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#9A908B]">STEP 02</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#241A18] truncate stepper-step-title">${t('step2')}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#E8DDD0]/60"></div>
            </div>
            <div class="flex flex-col justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#E8DDD0] text-[#6D6561]">3</div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#9A908B]">STEP 03</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#241A18] truncate stepper-step-title">${t('step3')}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#E8DDD0]/60"></div>
            </div>
          </div>
        </div>

        <!-- STEP 1 CONTENT -->
        <div class="bg-[#FFFDFC] rounded-3xl border border-[#E8DDD0] shadow-sm overflow-hidden p-5 sm:p-8 space-y-6 relative">
          
          <div class="border-b border-[#E8DDD0] pb-4">
            <h2 class="font-headline text-2xl sm:text-3xl text-[#241A18] font-bold">
              ${t('select_date_schedule')}
            </h2>
            <p class="font-body text-xs text-[#6D6561] mt-1">
              ${t('realtime_availability_hint')}
            </p>
          </div>

          <!-- Calendar Component -->
          <div id="booking-modal-calendar-container" class="bg-[#F8EFE5] p-5 rounded-2xl border border-[#E8DDD0]">
            ${generateCalendarGrid({
              selectedDateStr: bData.date || undefined,
              onDaySelectAttr: 'data-modal-calendar-day'
            })}
          </div>

          <!-- Time Slots -->
          <div>
            <div class="flex justify-between items-center mb-3">
              <div class="flex items-center gap-2 font-headline text-base font-bold text-[#241A18]">
                <span class="material-symbols-outlined text-lg text-[#9B1C25]">schedule</span>
                <span>${t('dinner_slots')}</span>
              </div>
              <span class="font-label text-xs font-semibold text-[#6D6561]">${t('slots_available_count')}</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              ${timeSlots.map(slot => {
                const isSelected = bData.time === slot.time;
                const isLimited = slot.isLimited;
                return `
                  <button data-select-time="${slot.time}" class="p-3.5 rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer ${isSelected ? 'bg-[#9B1C25] text-white border-[#9B1C25] shadow-md ring-2 ring-[#9B1C25]/20' : 'bg-white text-[#241A18] border-[#E8DDD0] hover:border-[#9B1C25] shadow-2xs'}">
                    <span class="font-label text-sm font-bold">${slot.time}</span>
                    <span class="text-[10px] font-label font-bold px-2 py-0.5 rounded-full mt-1.5 ${isSelected ? 'bg-white/20 text-white' : isLimited ? 'bg-[#FFF3E0] text-[#D08E1C] border border-[#FFE0B2]' : 'bg-[#E8F5E9] text-[#104b2b] border border-[#C8E6C9]'}">${slot.status}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Party Size Stepper -->
          <div class="bg-[#F8EFE5] p-4.5 rounded-2xl border border-[#E8DDD0] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-[#9B1C25]/10 text-[#9B1C25] flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-lg">groups</span>
              </div>
              <div>
                <div class="font-headline text-base font-bold text-[#241A18]">${t('party_size_title')}</div>
                <div class="font-body text-xs text-[#6D6561]">${t('party_size_hint')}</div>
              </div>
            </div>
            <div class="flex items-center gap-4 bg-white px-4 py-1.5 rounded-full border border-[#E8DDD0] shadow-2xs self-end sm:self-auto">
              <button id="step1-guests-minus" class="w-8 h-8 rounded-full bg-[#F8EFE5] text-[#241A18] font-bold shadow-2xs hover:bg-[#9B1C25] hover:text-white transition-colors flex items-center justify-center cursor-pointer">-</button>
              <span class="font-label text-sm font-bold text-[#241A18] min-w-[65px] text-center">${bData.guests} ${t('guests')}</span>
              <button id="step1-guests-plus" class="w-8 h-8 rounded-full bg-[#F8EFE5] text-[#241A18] font-bold shadow-2xs hover:bg-[#9B1C25] hover:text-white transition-colors flex items-center justify-center cursor-pointer">+</button>
            </div>
          </div>

          <!-- Seating Area Preference -->
          <div>
            <div class="flex items-center gap-2 font-headline text-base font-bold text-[#241A18] mb-3">
              <span class="material-symbols-outlined text-lg text-[#9B1C25]">chair</span>
              <span>${t('seating_area_preference')}</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              ${[
                { id: 'Standard', label: t('seat_standard'), icon: 'chair', sublabel: t('seat_standard_sub') },
                { id: 'Window View', label: t('seat_window'), icon: 'grid_view', sublabel: t('seat_window_sub') },
                { id: "Chef's Counter", label: t('seat_counter'), icon: 'countertops', sublabel: t('seat_counter_sub') },
                { id: 'Private Room', label: t('seat_private'), icon: 'meeting_room', sublabel: t('seat_private_sub') }
              ].map(seat => {
                const isSelected = bData.seatingPreference === seat.id;
                return `
                  <button data-select-seating="${seat.id}" class="p-4 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${isSelected ? 'bg-[#241A18] text-white border-[#241A18] shadow-md' : 'bg-white text-[#241A18] border-[#E8DDD0] hover:border-[#9B1C25] shadow-2xs'}">
                    <div class="flex justify-between items-start mb-3">
                      <span class="material-symbols-outlined text-2xl ${isSelected ? 'text-amber-400' : 'text-[#9B1C25]'}">${seat.icon}</span>
                      ${isSelected ? '<span class="material-symbols-outlined text-amber-400 text-lg">check_circle</span>' : ''}
                    </div>
                    <div>
                      <div class="font-headline text-sm font-bold ${isSelected ? 'text-white' : 'text-[#241A18]'}">${seat.label}</div>
                      <div class="font-body text-[11px] mt-0.5 ${isSelected ? 'text-amber-200/80' : 'text-[#6D6561]'}">${seat.sublabel}</div>
                    </div>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- RESERVATION SUMMARY BAR -->
          <div class="bg-[#F8EFE5] p-5 sm:p-6 rounded-2xl border border-[#E8DDD0] mt-6 shadow-xs">
            <div class="space-y-1.5 min-w-0">
              <div class="font-label text-[10px] font-bold text-[#6D6561] uppercase tracking-wider">${t('reservation_summary_bar')}</div>
              <div class="font-headline text-base sm:text-lg font-bold text-[#241A18] truncate">${restaurant.name}</div>
              <div class="font-body text-xs sm:text-sm text-[#6D6561] flex flex-wrap items-center gap-x-2.5 gap-y-1.5 pt-0.5">
                <span class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-[#9B1C25]">calendar_today</span>
                  <span>${bData.date}</span>
                </span>
                <span class="text-[#E8DDD0]">•</span>
                <span class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-[#9B1C25]">schedule</span>
                  <span>${bData.time}</span>
                </span>
                <span class="text-[#E8DDD0]">•</span>
                <span class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-[#9B1C25]">group</span>
                  <span>${bData.guests} ${t('guests')}</span>
                </span>
                <span class="text-[#E8DDD0]">•</span>
                <span class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-[#9B1C25]">chair</span>
                  <span>${getSeatingLabel(bData.seatingPreference)}</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Bottom Action Buttons & Member Status -->
          <div class="flex flex-col sm:flex-row items-center justify-between gap-3 mt-5 pt-3 border-t border-[#E8DDD0]/70">
            ${state.isAuthenticated ? `
              <div class="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                <span class="material-symbols-outlined text-sm text-emerald-600">verified</span>
                <span>${t('logged_in_as')} <strong>${state.myPageData.userName || 'Alex Aung'}</strong> • ${t('bypasses_login_hint')}</span>
              </div>
            ` : `
              <div class="flex items-center gap-2 text-xs font-medium text-[#6D6561]">
                <span class="material-symbols-outlined text-sm text-[#9B1C25]">info</span>
                <span>${t('instant_booking_available_hint')}</span>
              </div>
            `}
            <div class="flex items-center gap-3 w-full sm:w-auto justify-end">
              <a href="#/" id="step1-cancel-btn" class="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#E8DDD0] font-label text-sm font-semibold text-[#6D6561] hover:bg-[#F8EFE5] transition-all cursor-pointer flex items-center justify-center gap-1.5">
                <span class="material-symbols-outlined text-sm">home</span>
                <span>${t('ezbooknow_home')}</span>
              </a>
              <button id="step1-next-btn" class="w-full sm:w-auto bg-[#9B1C25] hover:bg-[#7F161E] text-white font-label text-sm font-bold px-8 py-3.5 rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95">
                <span>${state.isAuthenticated ? t('proceed_to_booking_auth') : t('proceed_to_booking')}</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>

          <!-- Unauthenticated Login / Guest Intercept Modal -->
          <div id="u01-auth-intercept-modal" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 hidden animate-fadeIn">
            <div class="bg-[#FFFDFC] rounded-3xl border border-[#E8DDD0] shadow-2xl max-w-sm w-full p-6 text-center space-y-4 relative animate-in fade-in zoom-in-95 duration-200">
              <div class="flex items-center justify-between border-b border-[#E8DDD0] pb-3">
                <div class="font-headline font-bold text-base text-[#241A18] flex items-center gap-2">
                  <span class="material-symbols-outlined text-[#9B1C25]">account_circle</span>
                  <span>${t('select_booking_option')}</span>
                </div>
                <button type="button" id="u01-close-intercept-modal" class="w-8 h-8 rounded-full bg-[#F8EFE5] hover:bg-[#E8DDD0] flex items-center justify-center text-[#6D6561] hover:text-[#241A18] cursor-pointer transition-colors">
                  <span class="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              <div class="space-y-1 text-left text-xs text-[#554340]">
                <p class="leading-relaxed">
                  ${t('intercept_modal_desc')}
                </p>
              </div>

              <div class="space-y-2.5 pt-1">
                <button
                  type="button"
                  id="u01-intercept-login-btn"
                  class="w-full btn-primary py-3 px-4 rounded-2xl font-label text-xs sm:text-sm font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
                >
                  <span class="material-symbols-outlined text-base">login</span>
                  <span>${t('login_or_create_fast')}</span>
                </button>

                <div class="flex items-center gap-2 text-[10px] text-[#8d7b75] uppercase font-bold my-1">
                  <span class="flex-1 h-px bg-[#E8DDD0]"></span>
                  <span>${t('or')}</span>
                  <span class="flex-1 h-px bg-[#E8DDD0]"></span>
                </div>

                <button
                  type="button"
                  id="u01-intercept-guest-btn"
                  class="w-full py-3 px-4 rounded-2xl border border-[#E8DDD0] bg-[#FFFDFC] hover:bg-[#F8EFE5] text-[#241A18] font-label text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <span class="material-symbols-outlined text-base text-[#6D6561]">person_outline</span>
                  <span>${t('continue_as_guest')}</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  function attachBookingStep1Events(containerElement = document) {
    const modalCalContainer = containerElement.querySelector('#booking-modal-calendar-container');
    if (modalCalContainer) {
      const currentDateVal = store.getState().bookingModalState.bookingData.date;
      const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const now = new Date();
      let activeCalYear = now.getFullYear();
      let activeCalMonth = now.getMonth();
      if (currentDateVal) {
        const parts = currentDateVal.replace(',', '').split(' ');
        if (parts.length >= 3) {
          const mIdx = monthNamesShort.findIndex(m => m.toLowerCase().startsWith(parts[0].toLowerCase().substring(0, 3)));
          if (mIdx !== -1) activeCalMonth = mIdx;
          const parsedYear = parseInt(parts[2], 10);
          if (!isNaN(parsedYear)) activeCalYear = parsedYear;
        }
      }

      function renderModalCalendar() {
        if (!modalCalContainer) return;
        modalCalContainer.innerHTML = generateCalendarGrid({
          year: activeCalYear,
          month: activeCalMonth,
          selectedDateStr: store.getState().bookingModalState.bookingData.date,
          onDaySelectAttr: 'data-modal-calendar-day'
        });
        bindModalCalendarEvents();
      }

      function bindModalCalendarEvents() {
        if (!modalCalContainer) return;
        const prevBtn = modalCalContainer.querySelector('#cal-prev-month');
        if (prevBtn) {
          prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (prevBtn.disabled) return;
            activeCalMonth--;
            if (activeCalMonth < 0) { activeCalMonth = 11; activeCalYear--; }
            renderModalCalendar();
          });
        }
        const nextBtn = modalCalContainer.querySelector('#cal-next-month');
        if (nextBtn) {
          nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (nextBtn.disabled) return;
            activeCalMonth++;
            if (activeCalMonth > 11) { activeCalMonth = 0; activeCalYear++; }
            renderModalCalendar();
          });
        }
        modalCalContainer.querySelectorAll('[data-modal-calendar-day]').forEach(dayBtn => {
          dayBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const dateStr = e.currentTarget.getAttribute('data-date-str');
            if (dateStr) {
              store.setBookingStep(1, { bookingData: { date: dateStr } });
            }
          });
        });
      }

      bindModalCalendarEvents();
    }

    containerElement.querySelectorAll('[data-select-time]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const time = e.currentTarget.getAttribute('data-select-time');
        store.setBookingStep(1, { bookingData: { time } });
      });
    });

    const minus1 = containerElement.querySelector('#step1-guests-minus');
    if (minus1) {
      minus1.addEventListener('click', () => {
        const cur = store.getState().bookingModalState.bookingData.guests;
        if (cur > 1) store.setBookingStep(1, { bookingData: { guests: cur - 1 } });
      });
    }

    const plus1 = containerElement.querySelector('#step1-guests-plus');
    if (plus1) {
      plus1.addEventListener('click', () => {
        const cur = store.getState().bookingModalState.bookingData.guests;
        if (cur < 12) store.setBookingStep(1, { bookingData: { guests: cur + 1 } });
      });
    }

    containerElement.querySelectorAll('[data-select-seating]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const seatingPreference = e.currentTarget.getAttribute('data-select-seating');
        store.setBookingStep(1, { bookingData: { seatingPreference } });
      });
    });

    const step1Next = containerElement.querySelector('#step1-next-btn');
    if (step1Next) {
      step1Next.addEventListener('click', () => {
        store.setBookingStep(2);
        const r = store.getState().bookingModalState.restaurant;
        const slug = store.getRestaurantSlug ? store.getRestaurantSlug(r) : 'gilded-fork';
        window.location.hash = `#/s/${slug}/book`;
      });
    }
  }

  window.YoyakuComponents.renderBookingStep1 = renderBookingStep1;
  window.YoyakuComponents.renderBookingPage = renderBookingStep1;
  window.YoyakuComponents.attachBookingStep1Events = attachBookingStep1Events;
})();
