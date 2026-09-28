/* ==========================================================================
   EzBookNow Screen U-04 — 予約完了 (Booking Success & QR Code Display)
   Route: /s/{slug}/complete
   Displays booking success confirmation:
     - Prominent Contactless Digital QR Pass
     - Reservation Reference ID & Quick Details
     - Direct links to My Page (U-09), Booking Details (U-10), and Home (U-12)
   ========================================================================== */

(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;

  function renderBookingStep4(state) {
    const modalState = state.bookingModalState || {};
    const cBooking = modalState.createdBooking || (state.reservations && state.reservations[0]) || {
      reservationNo: 'RSV-2026-999',
      restaurantName: 'The Gilded Fork',
      date: 'Aug 20, 2026',
      time: '19:00',
      guests: 2
    };
    const isMm = state.currentLanguage === 'MM';
    const qrDataUri = (window.YoyakuPrototype && window.YoyakuPrototype.createQrDataUri)
      ? window.YoyakuPrototype.createQrDataUri(`YOYAKU-${cBooking.reservationNo}`)
      : `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=YOYAKU-${cBooking.reservationNo}`;

    return `
      <div class="max-w-2xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-28 sm:pb-16 space-y-6 text-left animate-fadeIn">
        
        <!-- STEPPER PROGRESS BAR (ALL COMPLETED) -->
        <div class="px-1 sm:px-2">
          <div class="grid grid-cols-3 gap-3 text-left">
            <div class="flex flex-col justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#065F46] text-white">
                  <span class="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#065F46]">STEP 01</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#241A18] truncate stepper-step-title">${isMm ? 'ရက်စွဲနှင့် အချိန်' : 'Date & Slots'}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#065F46]"></div>
            </div>
            <div class="flex flex-col justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#065F46] text-white">
                  <span class="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#065F46]">STEP 02</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#241A18] truncate stepper-step-title">${isMm ? 'ဧည့်သည် အချက်အလက်' : 'Guest Details'}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#065F46]"></div>
            </div>
            <div class="flex flex-col justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#065F46] text-white">
                  <span class="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#065F46]">STEP 03</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#241A18] truncate stepper-step-title">${isMm ? 'အတည်ပြုချက်' : 'Complete (U-04)'}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#065F46]"></div>
            </div>
          </div>
        </div>

        <!-- CONFIRMED RESERVATION CARD -->
        <div class="bg-[#FFFDFC] rounded-3xl border border-[#E8DDD0] shadow-sm p-6 sm:p-10 space-y-6 flex flex-col items-center text-center">
          
          <!-- Confirmation Status Header -->
          <div class="space-y-2">
            <span class="text-[10px] font-extrabold uppercase tracking-widest text-[#065F46] font-label">Screen U-04</span>
            <div class="w-16 h-16 bg-[#065F46] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <span class="material-symbols-outlined text-3xl font-bold">check</span>
            </div>
            <h2 class="font-headline text-2xl sm:text-3xl text-[#241A18] font-extrabold">
              ${isMm ? 'ကြိုတင်မှာယူမှု အောင်မြင်ပါသည်။' : 'Reservation Confirmed!'}
            </h2>
            <p class="font-body text-xs text-[#6D6561] max-w-sm mx-auto">
              ${isMm
                ? 'ဆိုင်သို့ ရောက်ရှိသောအခါ အောက်ပါ ဒစ်ဂျစ်တယ် QR Pass ကို ပြသပါ။'
                : 'Your table is reserved. Present this contactless QR pass upon arrival.'}
            </p>
          </div>

          <!-- QR Code Container -->
          <div class="p-4 bg-white rounded-3xl border border-[#E8DDD0] shadow-md flex flex-col items-center">
            <img
              src="${qrDataUri}"
              alt="QR Pass"
              class="w-48 h-48 sm:w-56 sm:h-56 object-contain"
            />
          </div>

          <!-- Reservation Details Pill -->
          <div class="bg-[#F8EFE5] border border-[#E8DDD0] rounded-2xl px-5 py-3 w-full flex items-center justify-between text-left">
            <div>
              <span class="text-[10px] font-bold text-[#6D6561] uppercase tracking-wide font-label block">
                ${isMm ? 'ဘွတ်ကင် နံပါတ်' : 'Reservation Reference'}
              </span>
              <span class="font-headline font-bold text-sm text-[#241A18]">
                ${cBooking.restaurantName || 'Restaurant'}
              </span>
            </div>
            <span class="font-mono font-bold text-base text-[#9B1C25]">
              ${cBooking.reservationNo}
            </span>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col gap-3 w-full pt-2">
            <a
              href="#/reservations/${cBooking.reservationNo}"
              id="step4-view-detail-btn"
              class="w-full py-3.5 rounded-full font-label text-sm font-bold text-white bg-[#9B1C25] hover:bg-[#7F161E] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span class="material-symbols-outlined text-base">receipt_long</span>
              <span>${isMm ? 'ဘွတ်ကင် အသေးစိတ် ကြည့်မည် (U-10)' : 'View Booking Details (U-10)'}</span>
            </a>

            <a
              href="#/mypage"
              id="step4-mypage-btn"
              class="w-full py-3 rounded-full border border-[#E8DDD0] bg-[#FFFDFC] font-label text-sm font-semibold text-[#241A18] hover:bg-[#F8EFE5] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span class="material-symbols-outlined text-base text-[#6D6561]">dashboard</span>
              <span>${isMm ? 'မိုင်ပေ့ဂျ် သို့ သွားမည် (U-09)' : 'Go to My Page (U-09)'}</span>
            </a>

            <a
              href="#/"
              id="step4-home-btn"
              class="w-full py-2.5 font-label text-xs font-bold text-[#6D6561] hover:text-[#9B1C25] transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span class="material-symbols-outlined text-sm">home</span>
              <span>${isMm ? 'EzBookNow ပင်မစာမျက်နှာ (U-12)' : 'Return to EzBookNow Home (U-12)'}</span>
            </a>
          </div>

        </div>
      </div>
    `;
  }

  function attachBookingStep4Events(containerElement = document) {
    // Links are handled via standard hash navigation
  }

  window.YoyakuComponents.renderBookingStep4 = renderBookingStep4;
  window.YoyakuComponents.attachBookingStep4Events = attachBookingStep4Events;
})();
