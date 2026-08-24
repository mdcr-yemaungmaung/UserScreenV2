(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;
  const { generateCalendarGrid } = window.YoyakuComponents;




  function renderBookingStep1(state) {
    const modalState = state.bookingModalState;
    if (!modalState.isOpen || !modalState.restaurant) return '';

    const restaurant = modalState.restaurant;
    const step = modalState.step;
    const bData = modalState.bookingData;
    const isMm = state.currentLanguage === 'MM';

    const timeSlots = [
      { time: '18:00', status: isMm ? 'အဆင်ပြေ' : 'Available' },
      { time: '18:30', status: isMm ? 'အဆင်ပြေ' : 'Available' },
      { time: '19:00', status: isMm ? 'နီးကပ်' : 'Limited' },
      { time: '19:30', status: isMm ? 'အဆင်ပြေ' : 'Available' },
      { time: '20:00', status: isMm ? 'အဆင်ပြေ' : 'Available' },
      { time: '20:30', status: isMm ? 'နီးကပ်' : 'Limited' }
    ];

    return `
      <div class="max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-28 sm:pb-12 space-y-6 text-left animate-fadeIn">
        
        <!-- STEPPER PROGRESS BAR -->
        <div class="px-1 sm:px-2">
          <div class="grid grid-cols-3 gap-3 text-left">
            <div class="flex flex-col justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#840f16] text-white shadow-xs">1</div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#840f16]">STEP 01</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#231916] truncate stepper-step-title">${isMm ? 'ရက်စွဲနှင့် အချိန်' : 'Date & Schedule'}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#840f16]"></div>
            </div>
            <div class="flex flex-col justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#EADFD1] text-[#58413f]">2</div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#8d7b75]">STEP 02</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#231916] truncate stepper-step-title">${isMm ? 'ဧည့်သည် အချက်အလက်' : 'Guest Details'}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#EADFD1]/60"></div>
            </div>
            <div class="flex flex-col justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#EADFD1] text-[#58413f]">3</div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#8d7b75]">STEP 03</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#231916] truncate stepper-step-title">${isMm ? 'အတည်ပြုချက်' : 'Confirm Reservation'}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#EADFD1]/60"></div>
            </div>
          </div>
        </div>

        <!-- STEP 1 CONTENT -->
        <div class="bg-transparent sm:bg-[#FFF8EE] rounded-none sm:rounded-3xl border-0 sm:border sm:border-[#EADFD1] shadow-none sm:shadow-sm overflow-hidden p-0 sm:p-8 space-y-6 relative">
          
          <button id="booking-modal-close" class="absolute top-0 right-0 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white border border-[#EADFD1] flex items-center justify-center text-[#58413f] hover:text-[#840f16] transition-colors cursor-pointer shadow-2xs" title="Close">
            <span class="material-symbols-outlined text-lg">close</span>
          </button>

          <div class="border-b border-[#EADFD1] pb-4 pr-12">
            <h2 class="font-headline text-2xl sm:text-3xl text-[#231916] font-bold">
              ${isMm ? 'ရက်စွဲနှင့် အချိန်' : 'Date & Schedule'}
            </h2>
          </div>

          <div id="booking-modal-calendar-container" class="bg-[#F7EFE2] p-5 rounded-2xl border border-[#EADFD1]">
            ${generateCalendarGrid({
              selectedDateStr: bData.date || undefined,
              onDaySelectAttr: 'data-modal-calendar-day'
            })}
          </div>

          <div>
            <div class="flex justify-between items-center mb-3">
              <div class="flex items-center gap-2 font-headline text-base font-bold text-[#231916]">
                <span class="material-symbols-outlined text-lg text-[#840f16]">schedule</span>
                <span>${isMm ? 'ညစာ စားသုံးချိန်များ' : 'Dinner Service Slots'}</span>
              </div>
              <span class="font-label text-xs font-semibold text-[#8d7b75]">6 Slots Available</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              ${timeSlots.map(slot => {
                const isSelected = bData.time === slot.time;
                const isLimited = slot.status.includes('Limited') || slot.status.includes('နီးကပ်');
                return `
                  <button data-select-time="${slot.time}" class="p-3.5 rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer ${isSelected ? 'bg-[#840f16] text-white border-[#840f16] shadow-md ring-2 ring-[#840f16]/20' : 'bg-white text-[#231916] border-[#EADFD1] hover:border-[#840f16] shadow-2xs'}">
                    <span class="font-label text-sm font-bold">${slot.time}</span>
                    <span class="text-[10px] font-label font-bold px-2 py-0.5 rounded-full mt-1.5 ${isSelected ? 'bg-white/20 text-white' : isLimited ? 'bg-[#FFF3E0] text-[#D08E1C] border border-[#FFE0B2]' : 'bg-[#E8F5E9] text-[#104b2b] border border-[#C8E6C9]'}">${slot.status}</span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <div class="bg-[#F7EFE2] p-4.5 rounded-2xl border border-[#EADFD1] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-[#840f16]/10 text-[#840f16] flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-lg">groups</span>
              </div>
              <div>
                <div class="font-headline text-base font-bold text-[#231916]">${isMm ? 'လူဦးရေ ရွေးချယ်ပါ' : 'Party Size'}</div>
                <div class="font-body text-xs text-[#58413f]">${isMm ? 'သက်တောင့်သက်သာ စားသုံးနိုင်ရန် စာပွဲ ပြင်ဆင်ပေးပါမည်' : 'Table configuration and guest seating tailored for comfort'}</div>
              </div>
            </div>
            <div class="flex items-center gap-4 bg-white px-4 py-1.5 rounded-full border border-[#EADFD1] shadow-2xs self-end sm:self-auto">
              <button id="step1-guests-minus" class="w-8 h-8 rounded-full bg-[#F5EBDC] text-[#231916] font-bold shadow-2xs hover:bg-[#840f16] hover:text-white transition-colors flex items-center justify-center cursor-pointer">-</button>
              <span class="font-label text-sm font-bold text-[#231916] min-w-[65px] text-center">${bData.guests} ${isMm ? 'ဦး' : 'Guests'}</span>
              <button id="step1-guests-plus" class="w-8 h-8 rounded-full bg-[#F5EBDC] text-[#231916] font-bold shadow-2xs hover:bg-[#840f16] hover:text-white transition-colors flex items-center justify-center cursor-pointer">+</button>
            </div>
          </div>

          <div>
            <div class="flex items-center gap-2 font-headline text-base font-bold text-[#231916] mb-3">
              <span class="material-symbols-outlined text-lg text-[#840f16]">chair</span>
              <span>${isMm ? 'နေရာ ထိုင်ခင်း အမျိုးအစား' : 'Seating Area Preference'}</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              ${[
                { id: 'Standard', label: isMm ? 'ရိုးရိုး စာပွဲ' : 'Standard', icon: 'chair', sublabel: 'Main Dining Floor' },
                { id: 'Window View', label: isMm ? 'ပြတင်းပေါက် ဘေး' : 'Window View', icon: 'grid_view', sublabel: 'Cityscape Skyline' },
                { id: "Chef's Counter", label: isMm ? 'စားဖိုမှူး ကောင်တာ' : "Chef's Counter", icon: 'countertops', sublabel: 'Front Row Kitchen View' },
                { id: 'Private Room', label: isMm ? 'သီးသန့် အခန်း' : 'Private Room', icon: 'meeting_room', sublabel: 'Secluded Dining Suite' }
              ].map(seat => {
                const isSelected = bData.seatingPreference === seat.id;
                return `
                  <button data-select-seating="${seat.id}" class="p-4 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${isSelected ? 'bg-[#231916] text-white border-[#231916] shadow-md' : 'bg-white text-[#231916] border-[#EADFD1] hover:border-[#840f16] shadow-2xs'}">
                    <div class="flex justify-between items-start mb-3">
                      <span class="material-symbols-outlined text-2xl ${isSelected ? 'text-amber-400' : 'text-[#840f16]'}">${seat.icon}</span>
                      ${isSelected ? '<span class="material-symbols-outlined text-amber-400 text-lg">check_circle</span>' : ''}
                    </div>
                    <div>
                      <div class="font-headline text-sm font-bold ${isSelected ? 'text-white' : 'text-[#231916]'}">${seat.label}</div>
                      <div class="font-body text-[11px] mt-0.5 ${isSelected ? 'text-amber-200/80' : 'text-[#8d7b75]'}">${seat.sublabel}</div>
                    </div>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <div class="bg-[#EAF3EB] border border-[#C5DEC8] p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#104b2b] text-white flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-xl">notifications_active</span>
              </div>
              <div>
                <div class="font-headline text-sm font-bold text-[#104b2b]">Looking for a different slot?</div>
                <div class="font-body text-xs text-[#2e5b3c]">Join our instant waitlist for real-time alerts if a table frees up.</div>
              </div>
            </div>
            <button id="join-waitlist-btn" class="bg-[#104b2b] text-white font-label text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#0c3820] transition-colors cursor-pointer shrink-0 shadow-2xs">Join Waitlist</button>
          </div>

          <div class="bg-[#F5EBDC] p-5 sm:p-6 rounded-2xl border border-[#EADFD1] mt-6 shadow-xs">
            <div class="space-y-1.5 min-w-0">
              <div class="font-label text-[10px] font-bold text-[#8d7b75] uppercase tracking-wider">${isMm ? 'ရွေးချယ်ထားသော ဘိုကင်အချက်အလက်များ' : 'RESERVATION SUMMARY'}</div>
              <div class="font-headline text-base sm:text-lg font-bold text-[#231916] truncate">${restaurant.name}</div>
              <div class="font-body text-xs sm:text-sm text-[#5d4e48] flex flex-wrap items-center gap-x-2.5 gap-y-1.5 pt-0.5">
                <span class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-[#840f16]">calendar_today</span>
                  <span>${bData.date}</span>
                </span>
                <span class="text-[#c4b5a5]">•</span>
                <span class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-[#840f16]">schedule</span>
                  <span>${bData.time}</span>
                </span>
                <span class="text-[#c4b5a5]">•</span>
                <span class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-[#840f16]">group</span>
                  <span>${bData.guests} ${bData.guests === 1 ? (isMm ? 'ဦး' : 'Guest') : (isMm ? 'ဦး' : 'Guests')}</span>
                </span>
                <span class="text-[#c4b5a5]">•</span>
                <span class="flex items-center gap-1">
                  <span class="material-symbols-outlined text-sm text-[#840f16]">chair</span>
                  <span>${bData.seatingPreference}</span>
                </span>
              </div>
            </div>
          </div>

          <div class="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 mt-5">
            <button id="step1-cancel-btn" class="w-full sm:w-auto px-7 py-3.5 rounded-full border border-[#D5C2AF] font-label text-sm font-semibold text-[#58413f] hover:bg-[#F5EBDC] transition-all cursor-pointer flex items-center justify-center gap-1.5">
              <span class="material-symbols-outlined text-sm">close</span>
              <span>${isMm ? 'ပယ်ဖျက်မည်' : 'Cancel'}</span>
            </button>
            <button id="step1-next-btn" class="w-full sm:w-auto bg-[#840f16] hover:bg-[#6b0c12] text-white font-label text-sm font-bold px-8 py-3.5 rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all">
              <span>${isMm ? 'ဧည့်သည် အချက်အလက်များ သို့ ဆက်သွားမည်' : 'Continue to Guest Details'}</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

        </div>
      </div>
    `;
  }

  function attachBookingStep1Events(containerElement = document) {
    containerElement.querySelectorAll('#booking-modal-close').forEach(btn => {
      btn.addEventListener('click', () => {
        store.closeBookingModal();
      });
    });

    const modalCalContainer = containerElement.querySelector('#booking-modal-calendar-container');
    if (modalCalContainer) {
      // Anchor the initial view on the selected date, else the current month
      // (window bounds are computed inside generateCalendarGrid per FR-010).
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
            if (prevBtn.disabled) return; // window boundary: backward blocked
            activeCalMonth--;
            if (activeCalMonth < 0) { activeCalMonth = 11; activeCalYear--; }
            renderModalCalendar();
          });
        }
        const nextBtn = modalCalContainer.querySelector('#cal-next-month');
        if (nextBtn) {
          nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (nextBtn.disabled) return; // window boundary: forward bounded
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

    const waitlistBtn = containerElement.querySelector('#join-waitlist-btn');
    if (waitlistBtn) {
      waitlistBtn.addEventListener('click', () => {
        store.showToast('Added to waitlist! We will alert you if a table frees up.');
      });
    }

    const step1Cancel = containerElement.querySelector('#step1-cancel-btn');
    if (step1Cancel) {
      step1Cancel.addEventListener('click', () => {
        store.closeBookingModal();
      });
    }

    const step1Next = containerElement.querySelector('#step1-next-btn');
    if (step1Next) {
      step1Next.addEventListener('click', () => {
        store.setBookingStep(2);
      });
    }
  }


  window.YoyakuComponents.renderBookingStep1 = renderBookingStep1;
  window.YoyakuComponents.attachBookingStep1Events = attachBookingStep1Events;
})();
