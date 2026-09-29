/* ==========================================================================
   EzBookNow Screen U-04 — 予約完了 (Booking Success & QR Code Display)
   Route: /s/{slug}/complete
   Displays booking success confirmation:
     - Prominent Contactless Digital QR Pass
     - One-click Copy Reservation Reference
     - Add to Calendar integration (Google Calendar & iCal)
     - Reservation Reference ID & Quick Details
     - Direct links to Booking Details (U-10), Guest Lookup, My Page (U-09), and Home (U-12)
   ========================================================================== */

(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;

  function renderBookingStep4(state) {
    const modalState = state.bookingModalState || {};
    const cBooking = modalState.createdBooking || (state.reservations && state.reservations[0]) || {
      reservationNo: 'RSV-2026-999',
      restaurantName: 'The Gilded Fork',
      date: 'Today',
      time: '18:30',
      guests: 2,
      seatingPreference: 'Standard',
      location: 'Yangon Cultural District'
    };
    const t = (k) => window.I18n ? window.I18n.t(k) : (window.YoyakuI18n ? window.YoyakuI18n.t(k) : k);
    const slug = modalState.restaurant ? ((store && store.getRestaurantSlug) ? store.getRestaurantSlug(modalState.restaurant) : modalState.restaurant.slug) : 'gilded-fork';
    const { renderBookingStepper } = window.YoyakuComponents;

    const qrDataUri = (window.YoyakuPrototype && window.YoyakuPrototype.createQrDataUri)
      ? window.YoyakuPrototype.createQrDataUri(`YOYAKU-${cBooking.reservationNo}`)
      : `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=YOYAKU-${cBooking.reservationNo}`;

    // Google Calendar Link generator
    const calTitle = encodeURIComponent(`Dinner at ${cBooking.restaurantName}`);
    const calDetails = encodeURIComponent(`Table reservation for ${cBooking.guests} guests (${cBooking.seatingPreference || 'Standard'}). Booking Ref: ${cBooking.reservationNo}`);
    const calLocation = encodeURIComponent(cBooking.location || 'Yangon, Myanmar');
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&details=${calDetails}&location=${calLocation}`;

    return `
      <div class="max-w-2xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-32 sm:pb-16 space-y-6 text-left animate-fadeIn">
        
        <!-- UNIFIED STEPPER PROGRESS BAR (COMPLETED) -->
        ${renderBookingStepper ? renderBookingStepper(4, slug) : ''}

        <!-- CONFIRMED RESERVATION CARD -->
        <div class="bg-[#FFFDFC] rounded-3xl border border-[#E8DDD0] shadow-sm p-6 sm:p-10 space-y-6 flex flex-col items-center text-center relative overflow-hidden">
          
          <!-- Subtle decorative background accent -->
          <div class="absolute -top-16 -right-16 w-36 h-36 rounded-full bg-emerald-100/50 blur-2xl pointer-events-none"></div>
          <div class="absolute -bottom-16 -left-16 w-36 h-36 rounded-full bg-[#9B1C25]/5 blur-2xl pointer-events-none"></div>

          <!-- Confirmation Status Header -->
          <div class="space-y-2 relative z-10">
            <div class="w-16 h-16 sm:w-20 sm:h-20 bg-[#065F46] text-white rounded-full flex items-center justify-center mx-auto shadow-md ring-8 ring-emerald-50 animate-bounce">
              <span class="material-symbols-outlined text-3xl sm:text-4xl font-bold">check</span>
            </div>
            <h2 class="font-headline text-2xl sm:text-3xl text-[#241A18] font-extrabold pt-1">
              ${t('reservation_confirmed_title')}
            </h2>
            <p class="font-body text-xs sm:text-sm text-[#6D6561] max-w-sm mx-auto leading-relaxed">
              ${t('reservation_confirmed_sub')}
            </p>
          </div>

          <!-- Digital VIP QR Pass Ticket Card -->
          <div class="w-full bg-[#F8EFE5] border border-[#E8DDD0] rounded-3xl p-5 sm:p-6 shadow-sm flex flex-col items-center space-y-4 relative">
            
            <div class="w-full flex items-center justify-between border-b border-[#E8DDD0] pb-3">
              <div class="text-left">
                <span class="text-[10px] font-bold text-[#6D6561] uppercase tracking-wider font-label block">Venue</span>
                <span class="font-headline font-bold text-base text-[#241A18]">${cBooking.restaurantName || 'Restaurant'}</span>
              </div>
              <span class="text-[11px] font-bold text-[#065F46] bg-emerald-100/80 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                Confirmed
              </span>
            </div>

            <!-- QR Code Box -->
            <div class="p-3.5 bg-white rounded-2xl border border-[#E8DDD0] shadow-sm flex flex-col items-center group">
              <img
                src="${qrDataUri}"
                alt="QR Pass"
                class="w-44 h-44 sm:w-52 sm:h-52 object-contain"
              />
              <span class="text-[10px] font-label font-bold text-[#6D6561] mt-2 flex items-center gap-1">
                <span class="material-symbols-outlined text-xs text-[#9B1C25]">qr_code_scanner</span>
                <span>Scan at Host Station for Fast Check-In</span>
              </span>
            </div>

            <!-- Booking Reference with 1-Click Copy -->
            <div class="w-full bg-white border border-[#E8DDD0] rounded-2xl p-3 flex items-center justify-between shadow-2xs">
              <div class="text-left pl-1">
                <span class="text-[10px] font-bold text-[#6D6561] uppercase tracking-wider font-label block">
                  ${t('reservation_reference')}
                </span>
                <span class="font-mono font-bold text-base text-[#9B1C25]">
                  ${cBooking.reservationNo}
                </span>
              </div>
              <button
                type="button"
                id="copy-ref-btn"
                data-copy-text="${cBooking.reservationNo}"
                class="px-3.5 py-1.5 rounded-xl border border-[#E8DDD0] bg-[#F8EFE5] hover:bg-[#E8DDD0] text-xs font-label font-bold text-[#241A18] transition-colors flex items-center gap-1 cursor-pointer active:scale-95"
                title="Copy Reference"
              >
                <span class="material-symbols-outlined text-sm">content_copy</span>
                <span>Copy</span>
              </button>
            </div>

            <!-- Schedule Badges -->
            <div class="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 text-left font-label text-xs">
              <div class="bg-white/70 p-2.5 rounded-xl border border-[#E8DDD0]">
                <span class="text-[9px] uppercase font-bold text-[#6D6561] block">Date</span>
                <span class="font-bold text-[#241A18] mt-0.5 block truncate">${cBooking.date}</span>
              </div>
              <div class="bg-white/70 p-2.5 rounded-xl border border-[#E8DDD0]">
                <span class="text-[9px] uppercase font-bold text-[#6D6561] block">Time</span>
                <span class="font-bold text-[#241A18] mt-0.5 block truncate">${cBooking.time}</span>
              </div>
              <div class="bg-white/70 p-2.5 rounded-xl border border-[#E8DDD0]">
                <span class="text-[9px] uppercase font-bold text-[#6D6561] block">Party</span>
                <span class="font-bold text-[#241A18] mt-0.5 block truncate">${cBooking.guests} Guests</span>
              </div>
              <div class="bg-white/70 p-2.5 rounded-xl border border-[#E8DDD0]">
                <span class="text-[9px] uppercase font-bold text-[#6D6561] block">Seating</span>
                <span class="font-bold text-[#241A18] mt-0.5 block truncate">${cBooking.seatingPreference || 'Standard'}</span>
              </div>
            </div>

          </div>

          <!-- Add to Calendar & Wallet Shortcuts -->
          <div class="w-full flex flex-col sm:flex-row items-center gap-2.5 pt-1">
            <a
              href="${googleCalUrl}"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full py-2.5 rounded-full border border-[#E8DDD0] bg-[#FFFDFC] hover:bg-[#F8EFE5] font-label text-xs font-bold text-[#241A18] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span class="material-symbols-outlined text-sm text-[#9B1C25]">calendar_today</span>
              <span>Add to Google Calendar</span>
            </a>
            <button
              type="button"
              id="share-booking-btn"
              class="w-full py-2.5 rounded-full border border-[#E8DDD0] bg-[#FFFDFC] hover:bg-[#F8EFE5] font-label text-xs font-bold text-[#241A18] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span class="material-symbols-outlined text-sm text-[#9B1C25]">share</span>
              <span>Share Reservation</span>
            </button>
          </div>

          <!-- Guest Lookup Notice Tip -->
          <div class="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3.5 w-full text-left flex items-start gap-2.5">
            <span class="material-symbols-outlined text-amber-700 text-lg shrink-0 mt-0.5">verified_user</span>
            <div class="text-[11px] text-amber-900 leading-snug">
              <span class="font-bold block">${t('guest_access_notice')}</span>
              <span>${t('guest_access_notice_text')}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col gap-2.5 w-full pt-2">
            <a
              href="#/reservations/${cBooking.reservationNo}"
              id="step4-view-detail-btn"
              class="w-full py-3.5 rounded-full font-label text-xs sm:text-sm font-bold text-white bg-[#9B1C25] hover:bg-[#7F161E] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span class="material-symbols-outlined text-base">receipt_long</span>
              <span>${t('view_booking_details')}</span>
            </a>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href="#/lookup?res=${cBooking.reservationNo}"
                id="step4-lookup-btn"
                class="w-full py-2.5 rounded-full border border-[#E8DDD0] bg-[#FFFDFC] font-label text-xs font-bold text-[#840f16] hover:bg-[#F8EFE5] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span class="material-symbols-outlined text-sm">search</span>
                <span>${t('lookup_via_guest_flow')}</span>
              </a>

              <a
                href="#/mypage"
                id="step4-mypage-btn"
                class="w-full py-2.5 rounded-full border border-[#E8DDD0] bg-[#FFFDFC] font-label text-xs font-bold text-[#241A18] hover:bg-[#F8EFE5] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span class="material-symbols-outlined text-sm text-[#6D6561]">dashboard</span>
                <span>${t('go_to_mypage')}</span>
              </a>
            </div>

            <a
              href="#/"
              id="step4-home-btn"
              class="w-full py-2 font-label text-xs font-semibold text-[#6D6561] hover:text-[#9B1C25] transition-colors flex items-center justify-center gap-1 cursor-pointer pt-1"
            >
              <span class="material-symbols-outlined text-sm">home</span>
              <span>${t('return_to_home')}</span>
            </a>
          </div>

        </div>
      </div>
    `;
  }

  function attachBookingStep4Events(containerElement = document) {
    // 1-Click Copy Booking Reference
    const copyBtn = containerElement.querySelector('#copy-ref-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const textToCopy = copyBtn.getAttribute('data-copy-text');
        if (navigator.clipboard && textToCopy) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            store.showToast('Reservation reference copied to clipboard!');
          }).catch(() => {
            store.showToast(`Reference: ${textToCopy}`);
          });
        } else if (textToCopy) {
          store.showToast(`Reference: ${textToCopy}`);
        }
      });
    }

    // Share button
    const shareBtn = containerElement.querySelector('#share-booking-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        if (navigator.share) {
          navigator.share({
            title: 'Table Reservation at EzBookNow',
            text: 'I booked a table at EzBookNow! Check it out.',
            url: window.location.href
          }).catch(() => {});
        } else {
          store.showToast('Reservation link ready to share!');
        }
      });
    }
  }

  window.YoyakuComponents.renderBookingStep4 = renderBookingStep4;
  window.YoyakuComponents.attachBookingStep4Events = attachBookingStep4Events;
})();
