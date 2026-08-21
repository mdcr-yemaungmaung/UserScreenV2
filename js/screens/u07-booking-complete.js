(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;



  function renderBookingStep4(state) {
    const modalState = state.bookingModalState;
    if (!modalState.isOpen || !modalState.restaurant) return '';

    const step = modalState.step;
    const cBooking = modalState.createdBooking;
    const isMm = state.currentLanguage === 'MM';

    if (step !== 4 || !cBooking) return '';

    return `
      <div class="max-w-2xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-28 sm:pb-12 space-y-6 text-left animate-fadeIn">
        
        <!-- STEPPER PROGRESS BAR (STEP 1, 2, 3 COMPLETED) -->
        <div class="bg-[#FFF8EE] border border-[#EADFD1] rounded-2xl p-4 sm:p-5 shadow-2xs">
          <div class="grid grid-cols-3 gap-3 text-left">
            <div class="flex flex-col justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#104b2b] text-white"><span class="material-symbols-outlined text-sm font-bold">check</span></div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#8d7b75]">STEP 01</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#231916] truncate stepper-step-title">${isMm ? 'ရက်စွဲနှင့် အချိန်' : 'Date & Schedule'}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#104b2b]"></div>
            </div>
            <div class="flex flex-col justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#104b2b] text-white"><span class="material-symbols-outlined text-sm font-bold">check</span></div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#8d7b75]">STEP 02</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#231916] truncate stepper-step-title">${isMm ? 'ဧည့်သည် အချက်အလက်' : 'Guest Details'}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#104b2b]"></div>
            </div>
            <div class="flex flex-col justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#104b2b] text-white"><span class="material-symbols-outlined text-sm font-bold">check</span></div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#8d7b75]">STEP 03</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#231916] truncate stepper-step-title">${isMm ? 'အတည်ပြုချက်' : 'Confirm Reservation'}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#104b2b]"></div>
            </div>
          </div>
        </div>

        <!-- CONFIRMED RESERVATION CARD (ONLY QR, ID & BUTTONS) -->
        <div class="bg-[#FFF7E8] rounded-3xl border border-[#EADFD1] shadow-2xl p-6 sm:p-8 space-y-6 flex flex-col items-center text-center">
          
          <!-- Confirmation Status Header -->
          <div class="space-y-3">
            <div class="w-16 h-16 bg-[#104b2b] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <span class="material-symbols-outlined text-3xl font-bold">check</span>
            </div>
            <h2 class="font-headline text-2xl sm:text-3xl text-[#231916] font-extrabold">
              ${isMm ? 'ကြိုတင်မှာယူမှု အောင်မြင်ပါသည်။' : 'Reservation Confirmed!'}
            </h2>
          </div>

          <!-- QR Code -->
          <div class="p-4 bg-white rounded-3xl border border-[#EADFD1] shadow-md flex flex-col items-center">
            <img
              src="${window.YoyakuPrototype.createQrDataUri(`YOYAKU-${cBooking.reservationNo}`)}"
              alt="QR Pass"
              referrerpolicy="no-referrer"
              loading="lazy"
              class="w-48 h-48 sm:w-56 sm:h-56 object-contain"
            />
          </div>

          <!-- Reservation ID -->
          <div class="bg-[#FFF8F6] border border-[#EADFD1] rounded-2xl px-5 py-3 w-full flex items-center justify-between">
            <span class="text-xs font-bold text-[#58413f] uppercase tracking-wide">
              ${isMm ? 'ဘွတ်ကင် နံပါတ်' : 'Reservation ID'}
            </span>
            <span class="font-mono font-bold text-sm sm:text-base text-[#840f16]">
              ${cBooking.reservationNo}
            </span>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col gap-3 w-full pt-2">
            <button id="step4-view-all-btn" class="w-full btn-primary py-3.5 rounded-2xl font-label text-sm font-semibold shadow-md cursor-pointer flex items-center justify-center gap-2">
              <span>${isMm ? 'မှာယူထားသည်များ အားလုံး ကြည့်မည်' : 'View All Reservations'}</span>
              <span class="material-symbols-outlined text-sm">calendar_month</span>
            </button>
            <button id="step4-home-btn" class="w-full py-3 rounded-2xl border border-[#EADFD1] bg-white font-label text-sm font-semibold text-[#58413f] hover:bg-[#FBF3E2] cursor-pointer">
              ${isMm ? 'ပင်မ စာမျက်နှာသို့ ပြန်သွားမည်' : 'Return to Discover'}
            </button>
          </div>

        </div>
      </div>
    `;
  }

  function attachBookingStep4Events(containerElement = document) {
    const step4Home = containerElement.querySelector('#step4-home-btn');
    if (step4Home) {
      step4Home.addEventListener('click', () => {
        store.closeBookingModal();
        store.setSelectedRestaurant(null);
        store.setActiveTab('discover');
      });
    }

    const step4ViewAll = containerElement.querySelector('#step4-view-all-btn');
    if (step4ViewAll) {
      step4ViewAll.addEventListener('click', () => {
        store.closeBookingModal();
        store.setSelectedRestaurant(null);
        store.setActiveTab('reservations');
      });
    }
  }


  window.YoyakuComponents.renderBookingStep4 = renderBookingStep4;
  window.YoyakuComponents.attachBookingStep4Events = attachBookingStep4Events;
})();
