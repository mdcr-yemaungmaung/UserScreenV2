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
    const isMm = state.currentLanguage === 'MM';
    const slug = (store && store.getRestaurantSlug) ? store.getRestaurantSlug(restaurant) : (restaurant.slug || 'gilded-fork');

    const timeSlots = [
      { time: '18:00', status: isMm ? 'အဆင်ပြေ' : 'Available' },
      { time: '18:30', status: isMm ? 'အဆင်ပြေ' : 'Available' },
      { time: '19:00', status: isMm ? 'နီးကပ်' : 'Limited' },
      { time: '19:30', status: isMm ? 'အဆင်ပြေ' : 'Available' },
      { time: '20:00', status: isMm ? 'အဆင်ပြေ' : 'Available' },
      { time: '20:30', status: isMm ? 'နီးကပ်' : 'Limited' }
    ];

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
                <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#9B1C25] font-label">Screen U-01</span>
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
            <span>${isMm ? 'ဆိုင်အချက်အလက် ကြည့်မည်' : 'お店の情報を見る (U-05)'}</span>
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
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#241A18] truncate stepper-step-title">${isMm ? 'ရက်စွဲနှင့် အချိန်' : 'Date & Slots'}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#9B1C25]"></div>
            </div>
            <div class="flex flex-col justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#E8DDD0] text-[#6D6561]">2</div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#9A908B]">STEP 02</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#241A18] truncate stepper-step-title">${isMm ? 'ဧည့်သည် အချက်အလက်' : 'Guest Details (U-02)'}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#E8DDD0]/60"></div>
            </div>
            <div class="flex flex-col justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#E8DDD0] text-[#6D6561]">3</div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#9A908B]">STEP 03</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#241A18] truncate stepper-step-title">${isMm ? 'အတည်ပြုချက်' : 'Confirm (U-03)'}</div>
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
              ${isMm ? 'ရက်စွဲနှင့် အချိန် ရွေးချယ်ပါ' : 'Select Date & Schedule'}
            </h2>
            <p class="font-body text-xs text-[#6D6561] mt-1">
              ${isMm ? 'လွတ်လပ်စွာ စားသုံးနိုင်သော အချိန်ဇယားများ' : 'Real-time table availability updated instantly'}
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
                <span>${isMm ? 'ညစာ စားသုံးချိန်များ' : 'Dinner Service Slots'}</span>
              </div>
              <span class="font-label text-xs font-semibold text-[#6D6561]">6 Slots Available</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              ${timeSlots.map(slot => {
                const isSelected = bData.time === slot.time;
                const isLimited = slot.status.includes('Limited') || slot.status.includes('နီးကပ်');
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
                <div class="font-headline text-base font-bold text-[#241A18]">${isMm ? 'လူဦးရေ ရွေးချယ်ပါ' : 'Party Size'}</div>
                <div class="font-body text-xs text-[#6D6561]">${isMm ? 'သက်တောင့်သက်သာ စားသုံးနိုင်ရန် စားပွဲ ပြင်ဆင်ပေးပါမည်' : 'Table configuration and guest seating tailored for comfort'}</div>
              </div>
            </div>
            <div class="flex items-center gap-4 bg-white px-4 py-1.5 rounded-full border border-[#E8DDD0] shadow-2xs self-end sm:self-auto">
              <button id="step1-guests-minus" class="w-8 h-8 rounded-full bg-[#F8EFE5] text-[#241A18] font-bold shadow-2xs hover:bg-[#9B1C25] hover:text-white transition-colors flex items-center justify-center cursor-pointer">-</button>
              <span class="font-label text-sm font-bold text-[#241A18] min-w-[65px] text-center">${bData.guests} ${isMm ? 'ဦး' : 'Guests'}</span>
              <button id="step1-guests-plus" class="w-8 h-8 rounded-full bg-[#F8EFE5] text-[#241A18] font-bold shadow-2xs hover:bg-[#9B1C25] hover:text-white transition-colors flex items-center justify-center cursor-pointer">+</button>
            </div>
          </div>

          <!-- Seating Area Preference -->
          <div>
            <div class="flex items-center gap-2 font-headline text-base font-bold text-[#241A18] mb-3">
              <span class="material-symbols-outlined text-lg text-[#9B1C25]">chair</span>
              <span>${isMm ? 'နေရာ ထိုင်ခင်း အမျိုးအစား' : 'Seating Area Preference'}</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              ${[
                { id: 'Standard', label: isMm ? 'ရိုးရိုး စားပွဲ' : 'Standard', icon: 'chair', sublabel: 'Main Dining Floor' },
                { id: 'Window View', label: isMm ? 'ပြတင်းပေါက် ဘေး' : 'Window View', icon: 'grid_view', sublabel: 'Garden & View' },
                { id: "Chef's Counter", label: isMm ? 'စားဖိုမှူး ကောင်တာ' : "Chef's Counter", icon: 'countertops', sublabel: 'Front Row View' },
                { id: 'Private Room', label: isMm ? 'သီးသန့် အခန်း' : 'Private Room', icon: 'meeting_room', sublabel: 'VIP Dining Suite' }
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
              <div class="font-label text-[10px] font-bold text-[#6D6561] uppercase tracking-wider">${isMm ? 'ရွေးချယ်ထားသော ဘွတ်ကင်အချက်အလက်များ' : 'RESERVATION SUMMARY'}</div>
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
                  <span>${bData.guests} ${bData.guests === 1 ? (isMm ? 'ဦး' : 'Guest') : (isMm ? 'ဦး' : 'Guests')}</span>
                </span>
                <span class="text-[#E8DDD0]">•</span>
                <span class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-[#9B1C25]">chair</span>
                  <span>${bData.seatingPreference}</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Bottom Action Buttons -->
          <div class="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 mt-5">
            <a href="#/" id="step1-cancel-btn" class="w-full sm:w-auto px-7 py-3.5 rounded-full border border-[#E8DDD0] font-label text-sm font-semibold text-[#6D6561] hover:bg-[#F8EFE5] transition-all cursor-pointer flex items-center justify-center gap-1.5">
              <span class="material-symbols-outlined text-sm">home</span>
              <span>${isMm ? 'မူလစာမျက်နှာ' : 'EzBookNow Home (U-12)'}</span>
            </a>
            <button id="step1-next-btn" class="w-full sm:w-auto bg-[#9B1C25] hover:bg-[#7F161E] text-white font-label text-sm font-bold px-8 py-3.5 rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95">
              <span>${isMm ? 'ဧည့်သည် အချက်အလက်များ သို့ ဆက်သွားမည်' : 'Continue to Guest Details (U-02)'}</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
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
