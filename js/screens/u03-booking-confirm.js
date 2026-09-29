/* ==========================================================================
   EzBookNow Screen U-03 — 予約確認 (Booking Confirmation Page)
   Route: /s/{slug}/confirm
   Displays reservation summary, pricing breakdown, and terms.
   Key flow integration:
     - Inline Edit buttons to adjust Schedule (U-01) or Guest Details (U-02).
     - If phone number is unverified (guest checkout), clicking confirm
       triggers Screen U-13 (SMS OTP Verification Modal).
     - Upon verification, completes reservation and navigates to U-04 (/s/{slug}/complete).
   ========================================================================== */

(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;

  function renderBookingStep3(state) {
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
      guestName: 'Evelyn St. Clair',
      guestPhone: '+95 9 791 234 567',
      guestEmail: 'evelyn.clair@example.com',
      specialRequests: '',
      paymentMethod: 'qr'
    };

    const isMm = (window.I18n ? window.I18n.getLang() : '') === 'mm';
    const t = (k) => window.I18n ? window.I18n.t(k) : (window.YoyakuI18n ? window.YoyakuI18n.t(k) : k);
    const slug = (store && store.getRestaurantSlug) ? store.getRestaurantSlug(restaurant) : (restaurant.slug || 'gilded-fork');
    const { renderBookingStepper } = window.YoyakuComponents;

    const experiencePrice = 180000 * bData.guests;
    const winePairingPrice = 120000 * bData.guests;
    const promoDiscount = gData.paymentMethod === 'qr' ? 50000 : 0;
    const subtotal = experiencePrice + winePairingPrice - promoDiscount;
    const tax = Math.round(subtotal * 0.085);
    const serviceCharge = Math.round(subtotal * 0.18);
    const totalAmount = subtotal + tax + serviceCharge;

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
      <div class="max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-32 sm:pb-16 space-y-6 text-left animate-fadeIn">

        <!-- UNIFIED STEPPER PROGRESS BAR -->
        ${renderBookingStepper ? renderBookingStepper(3, slug) : ''}

        <!-- STEP 3 CONTENT CARD -->
        <div class="bg-[#FFFDFC] rounded-3xl border border-[#E8DDD0] shadow-sm overflow-hidden p-5 sm:p-8 space-y-7">

          <!-- Header -->
          <div class="border-b border-[#E8DDD0] pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h2 class="font-headline text-2xl sm:text-3xl text-[#241A18] font-bold">
                ${t('confirm_reservation_heading')}
              </h2>
              <p class="font-body text-xs text-[#6D6561] mt-1">
                Please review your dining schedule, seating, and estimated bill before confirming.
              </p>
            </div>
            <span class="text-xs font-label font-bold text-[#9B1C25] bg-[#9B1C25]/10 px-3 py-1 rounded-full">
              Final Verification
            </span>
          </div>

          <!-- 1. Restaurant & Table Details -->
          <div class="space-y-4">
            <div class="flex items-center justify-between border-b border-[#E8DDD0] pb-2">
              <div class="font-headline text-base font-bold text-[#241A18] flex items-center gap-2">
                <span class="material-symbols-outlined text-[#9B1C25] text-lg">restaurant</span>
                <span>${t('restaurant_table_details')}</span>
              </div>
              <a
                href="#/s/${slug}"
                id="edit-step1-btn"
                class="text-xs font-label font-bold text-[#9B1C25] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span class="material-symbols-outlined text-sm">edit_calendar</span>
                <span>Change Schedule</span>
              </a>
            </div>

            <div class="bg-[#F8EFE5] p-4 sm:p-5 rounded-2xl border border-[#E8DDD0] flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div class="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-xs border border-[#E8DDD0] bg-stone-100">
                <img
                  src="${restaurant.heroImage || restaurant.images[0]}"
                  alt="${restaurant.name}"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2">
                  <h3 class="font-headline text-lg text-[#241A18] font-bold truncate">
                    ${isMm ? (restaurant.nameMM || restaurant.name) : restaurant.name}
                  </h3>
                  <span class="text-[11px] font-bold text-[#C69A2B] bg-white px-2 py-0.5 rounded-full border border-[#E8DDD0] shrink-0">
                    ★ ${restaurant.rating || 4.9}
                  </span>
                </div>
                <p class="font-body text-xs text-[#6D6561] truncate flex items-center gap-1 mt-0.5">
                  <span class="material-symbols-outlined text-xs text-[#9B1C25]">location_on</span>
                  <span>${restaurant.address || restaurant.area || 'Yangon, Myanmar'}</span>
                </p>
                
                <div class="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5 font-label text-xs">
                  <span class="font-bold text-[#241A18] flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-[#E8DDD0]">
                    <span class="material-symbols-outlined text-sm text-[#9B1C25]">calendar_today</span>
                    <span>${bData.date}</span>
                  </span>
                  <span class="font-bold text-[#241A18] flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-[#E8DDD0]">
                    <span class="material-symbols-outlined text-sm text-[#9B1C25]">schedule</span>
                    <span>${bData.time}</span>
                  </span>
                  <span class="font-bold text-[#241A18] flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-[#E8DDD0]">
                    <span class="material-symbols-outlined text-sm text-[#9B1C25]">group</span>
                    <span>${bData.guests} ${t('guests')}</span>
                  </span>
                  <span class="font-bold text-[#241A18] flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-full border border-[#E8DDD0]">
                    <span class="material-symbols-outlined text-sm text-[#9B1C25]">chair</span>
                    <span>${getSeatingLabel(bData.seatingPreference)}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Guest & Payment Summary -->
          <div class="space-y-4">
            <div class="flex items-center justify-between border-b border-[#E8DDD0] pb-2">
              <div class="font-headline text-base font-bold text-[#241A18] flex items-center gap-2">
                <span class="material-symbols-outlined text-[#9B1C25] text-lg">person_pin</span>
                <span>${t('guest_payment_info')}</span>
              </div>
              <a
                href="#/s/${slug}/book"
                id="edit-step2-btn"
                class="text-xs font-label font-bold text-[#9B1C25] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span class="material-symbols-outlined text-sm">edit_note</span>
                <span>Change Contact</span>
              </a>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="bg-[#F8EFE5] p-3.5 rounded-2xl border border-[#E8DDD0]">
                <div class="text-[#6D6561] text-[10px] uppercase font-bold tracking-wider font-label">${t('guest_name')}</div>
                <div class="text-[#241A18] text-sm font-bold font-body mt-0.5">${gData.guestName || '—'}</div>
              </div>
              <div class="bg-[#F8EFE5] p-3.5 rounded-2xl border border-[#E8DDD0]">
                <div class="text-[#6D6561] text-[10px] uppercase font-bold tracking-wider font-label">${t('phone_number')}</div>
                <div class="text-[#241A18] text-sm font-bold font-body mt-0.5 flex items-center gap-1.5">
                  <span>${gData.guestPhone || '—'}</span>
                  ${state.isAuthenticated ? '<span class="material-symbols-outlined text-emerald-700 text-sm" title="Verified">verified</span>' : ''}
                </div>
              </div>
              <div class="bg-[#F8EFE5] p-3.5 rounded-2xl border border-[#E8DDD0]">
                <div class="text-[#6D6561] text-[10px] uppercase font-bold tracking-wider font-label">${t('email_address')}</div>
                <div class="text-[#241A18] text-sm font-bold font-body mt-0.5 truncate">${gData.guestEmail || '—'}</div>
              </div>
              <div class="bg-[#F8EFE5] p-3.5 rounded-2xl border border-[#E8DDD0]">
                <div class="text-[#6D6561] text-[10px] uppercase font-bold tracking-wider font-label">${t('payment_preference')}</div>
                <div class="text-[#9B1C25] text-sm font-bold font-body mt-0.5 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-base">${gData.paymentMethod === 'qr' ? 'qr_code_2' : 'payments'}</span>
                  <span>${gData.paymentMethod === 'qr' ? t('pay_qr_promo_label') : t('pay_at_restaurant')}</span>
                </div>
              </div>
            </div>

            ${gData.specialRequests ? `
              <div class="bg-[#F8EFE5] p-3.5 rounded-2xl border border-[#E8DDD0]">
                <div class="text-[#6D6561] text-[10px] uppercase font-bold tracking-wider font-label">${t('special_requests')}</div>
                <div class="text-[#241A18] text-xs font-body mt-1 leading-relaxed bg-white p-2.5 rounded-xl border border-[#E8DDD0]">
                  ${gData.specialRequests}
                </div>
              </div>
            ` : ''}
          </div>

          <!-- 3. Estimated Pricing Breakdown -->
          <div class="space-y-3 font-label text-xs">
            <div class="font-headline text-base font-bold text-[#241A18] border-b border-[#E8DDD0] pb-2 flex items-center gap-2">
              <span class="material-symbols-outlined text-[#9B1C25] text-lg">receipt_long</span>
              <span>${t('estimated_pricing_breakdown')}</span>
            </div>
            
            <div class="bg-[#F8EFE5] p-4 sm:p-5 rounded-2xl border border-[#E8DDD0] space-y-2.5">
              <div class="flex justify-between text-[#6D6561]">
                <span>${t('experience_tasting_menu')} (${bData.guests} Guests × 180,000 MMK)</span>
                <span class="font-bold text-[#241A18]">${experiencePrice.toLocaleString()} MMK</span>
              </div>
              <div class="flex justify-between text-[#6D6561]">
                <span>${t('wine_pairing')} (${bData.guests} Guests × 120,000 MMK)</span>
                <span class="font-bold text-[#241A18]">${winePairingPrice.toLocaleString()} MMK</span>
              </div>
              ${promoDiscount > 0 ? `
                <div class="flex justify-between text-[#065F46] font-bold bg-emerald-100/60 p-2 rounded-xl border border-emerald-200">
                  <span class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm">savings</span>
                    <span>${t('qr_instant_discount')}</span>
                  </span>
                  <span>-${promoDiscount.toLocaleString()} MMK</span>
                </div>
              ` : ''}
              <div class="flex justify-between text-[#6D6561] pt-1 border-t border-[#E8DDD0]/50">
                <span>${t('commercial_tax')}</span>
                <span class="font-bold text-[#241A18]">${tax.toLocaleString()} MMK</span>
              </div>
              <div class="flex justify-between text-[#6D6561]">
                <span>${t('service_charge')}</span>
                <span class="font-bold text-[#241A18]">${serviceCharge.toLocaleString()} MMK</span>
              </div>
              <div class="pt-3 border-t border-[#E8DDD0] flex justify-between items-center text-sm">
                <span class="font-bold text-[#241A18] text-base">${t('estimated_total')}</span>
                <span class="font-bold text-[#9B1C25] font-headline text-xl">${totalAmount.toLocaleString()} MMK</span>
              </div>
            </div>
          </div>

          <!-- Free Cancellation & Terms Guarantee -->
          <div class="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-emerald-900 leading-relaxed">
            <span class="material-symbols-outlined text-emerald-700 text-lg mt-0.5 shrink-0">verified_user</span>
            <div>
              <span class="font-bold block text-emerald-950">Free Cancellation Guaranteed</span>
              <span>Cancel or reschedule for free up to 24 hours prior to reservation time. No advance deposit penalty.</span>
            </div>
          </div>

          <label class="flex items-center gap-3 cursor-pointer bg-[#F8EFE5] p-4 rounded-2xl border border-[#E8DDD0] hover:border-[#9B1C25] transition-colors">
            <input type="checkbox" id="step3-terms" checked class="w-5 h-5 rounded border-[#E8DDD0] accent-[#9B1C25] cursor-pointer" />
            <span class="font-body text-xs text-[#241A18] font-semibold">
              ${t('terms_agreement')}
            </span>
          </label>

          <!-- Action Buttons -->
          <div class="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-[#E8DDD0]">
            <a
              href="#/s/${slug}/book"
              id="step3-back-btn"
              class="w-full sm:w-auto px-7 py-3.5 rounded-full border border-[#E8DDD0] font-label text-xs sm:text-sm font-semibold text-[#6D6561] hover:bg-[#F8EFE5] transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span class="material-symbols-outlined text-sm">arrow_back</span>
              <span>${t('back_to_details')}</span>
            </a>
            <button
              type="button"
              id="step3-final-btn"
              class="w-full sm:w-auto bg-[#9B1C25] hover:bg-[#7F161E] text-white font-label text-xs sm:text-sm font-bold px-9 py-3.5 rounded-full shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <span>${t('confirm_and_complete')}</span>
              <span class="material-symbols-outlined text-base">check_circle</span>
            </button>
          </div>

        </div>
      </div>
    `;
  }

  function attachBookingStep3Events(containerElement = document) {
    const step3Final = containerElement.querySelector('#step3-final-btn');
    if (step3Final) {
      step3Final.addEventListener('click', () => {
        const termsChecked = containerElement.querySelector('#step3-terms')?.checked;
        if (!termsChecked) {
          store.showToast('Please agree to restaurant terms before completing.');
          return;
        }

        const state = store.getState();
        const mState = state.bookingModalState;
        const rest = mState.restaurant;
        const bData = mState.bookingData;
        const gData = mState.guestData;
        const isVerified = !!(state.myPageData && state.myPageData.phoneVerified);

        function completeReservation() {
          const randomNo = `RSV-${Math.floor(100000 + Math.random() * 900000)}`;
          const expPrice = 180000 * bData.guests;
          const winePrice = 120000 * bData.guests;
          const disc = gData.paymentMethod === 'qr' ? 50000 : 0;
          const sub = expPrice + winePrice - disc;
          const tax = Math.round(sub * 0.085);
          const service = Math.round(sub * 0.18);
          const total = sub + tax + service;

          const newBooking = {
            id: `b-${Date.now()}`,
            reservationNo: randomNo,
            restaurantId: rest.id,
            restaurantName: rest.name,
            restaurantImage: rest.heroImage,
            location: rest.location,
            date: bData.date,
            time: bData.time,
            guests: bData.guests,
            seatingPreference: bData.seatingPreference,
            specialRequests: gData.specialRequests,
            guestName: gData.guestName,
            guestPhone: gData.guestPhone,
            guestEmail: gData.guestEmail,
            paymentMethod: gData.paymentMethod,
            status: 'Confirmed',
            createdAt: new Date().toISOString(),
            totalAmount: total,
            priceBreakdown: {
              experienceMenu: expPrice,
              winePairing: winePrice,
              discount: disc,
              tax,
              serviceCharge: service
            }
          };

          store.addReservation(newBooking);
          store.setBookingStep(4, { createdBooking: newBooking });
          const slug = store.getRestaurantSlug ? store.getRestaurantSlug(rest) : 'gilded-fork';
          window.location.hash = `#/s/${slug}/complete`;
          window.scrollTo({ top: 0, behavior: 'smooth' });
          store.showToast(t('reservation_confirmed_toast'));
        }

        // Section 3: SMS Verification (U-13) check for unverified guest phone
        if (!isVerified) {
          store.openOtpModal({
            caller: 'guest_confirm',
            phoneNumber: gData.guestPhone,
            onVerified: () => {
              completeReservation();
            }
          });
        } else {
          completeReservation();
        }
      });
    }
  }

  window.YoyakuComponents.renderBookingStep3 = renderBookingStep3;
  window.YoyakuComponents.attachBookingStep3Events = attachBookingStep3Events;
})();
