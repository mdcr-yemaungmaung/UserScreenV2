/* ==========================================================================
   EzBookNow Screen U-03 — 予約確認 (Booking Confirmation Page)
   Route: /s/{slug}/confirm
   Displays reservation summary, pricing breakdown, and terms.
   Key flow integration:
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
      date: 'Aug 20, 2026',
      time: '19:00',
      guests: 2,
      seatingPreference: 'Standard'
    };
    const gData = modalState.guestData || {
      guestName: 'Evelyn St. Clair',
      guestPhone: '+95 9 791 234 567',
      guestEmail: 'evelyn.clair@example.com',
      specialRequests: '',
      paymentMethod: 'store'
    };
    const isMm = state.currentLanguage === 'MM';
    const isJa = state.currentLanguage === 'JA';
    const t = (en, mm, ja) => window.YoyakuI18n ? window.YoyakuI18n.t(en, mm, ja) : (isJa ? (ja || en) : (isMm ? mm : en));
    const slug = (store && store.getRestaurantSlug) ? store.getRestaurantSlug(restaurant) : (restaurant.slug || 'gilded-fork');

    const experiencePrice = 180000 * bData.guests;
    const winePairingPrice = 120000 * bData.guests;
    const promoDiscount = gData.paymentMethod === 'qr' ? 50000 : 0;
    const subtotal = experiencePrice + winePairingPrice - promoDiscount;
    const tax = Math.round(subtotal * 0.085);
    const serviceCharge = Math.round(subtotal * 0.18);
    const totalAmount = subtotal + tax + serviceCharge;

    return `
      <div class="max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-28 sm:pb-16 space-y-6 text-left animate-fadeIn">

        <!-- Stepper Progress Bar -->
        <div class="px-1 sm:px-2">
          <div class="grid grid-cols-3 gap-3 text-left">
            <div class="flex flex-col justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#065F46] text-white">
                  <span class="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#065F46]">STEP 01</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#241A18] truncate stepper-step-title">${t('Date & Slots', 'ရက်စွဲနှင့် အချိန်', '日時・空席選択')}</div>
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
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#241A18] truncate stepper-step-title">${t('Guest Details', 'ဧည့်သည် အချက်အလက်', 'お客様情報')}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#065F46]"></div>
            </div>
            <div class="flex flex-col justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#9B1C25] text-white shadow-xs">3</div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#9B1C25]">STEP 03</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#241A18] truncate stepper-step-title">${t('Confirm', 'အတည်ပြုချက်', '予約内容の確認')}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#9B1C25]"></div>
            </div>
          </div>
        </div>

        <!-- Step 3 Content Card -->
        <div class="bg-[#FFFDFC] rounded-3xl border border-[#E8DDD0] shadow-sm overflow-hidden p-5 sm:p-8 space-y-6">

          <div class="border-b border-[#E8DDD0] pb-4 flex items-center justify-between">
            <div>
              <h2 class="font-headline text-2xl sm:text-3xl text-[#241A18] font-bold">
                ${t('Confirm Reservation', 'ဘွတ်ကင် အချက်အလက် အတည်ပြုပါ', '予約内容のご確認')}
              </h2>
            </div>
            <span class="text-xs font-label text-[#6D6561]">
              ${restaurant.name}
            </span>
          </div>

          <!-- 1. Restaurant & Table Details -->
          <div class="space-y-4">
            <div class="font-headline text-base font-bold text-[#241A18] border-b border-[#E8DDD0] pb-2 flex items-center gap-2">
              <span class="material-symbols-outlined text-[#9B1C25] text-lg">restaurant</span>
              <span>${t('Restaurant & Table Details', 'ဆိုင်နှင့် စားပွဲဝိုင်း အချက်အလက်', '店舗・ご予約情報')}</span>
            </div>

            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div class="w-20 h-20 rounded-2xl overflow-hidden shrink-0 shadow-xs border border-[#E8DDD0] bg-stone-100">
                <img
                  src="${restaurant.heroImage || restaurant.images[0]}"
                  alt="${restaurant.name}"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-headline text-lg text-[#241A18] font-bold truncate">${isMm ? (restaurant.nameMM || restaurant.name) : restaurant.name}</h3>
                <p class="font-body text-xs text-[#6D6561] truncate flex items-center gap-1 mt-0.5">
                  <span class="material-symbols-outlined text-xs text-[#9B1C25]">location_on</span>
                  <span>${restaurant.address || restaurant.area || 'Yangon, Myanmar'}</span>
                </p>
                <div class="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 font-label text-xs">
                  <span class="font-medium text-[#241A18] flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm text-[#9B1C25]">calendar_today</span>
                    <span>${bData.date}</span>
                  </span>
                  <span class="text-[#E8DDD0] hidden sm:inline">•</span>
                  <span class="font-medium text-[#241A18] flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm text-[#9B1C25]">schedule</span>
                    <span>${bData.time}</span>
                  </span>
                  <span class="text-[#E8DDD0] hidden sm:inline">•</span>
                  <span class="font-medium text-[#241A18] flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm text-[#9B1C25]">group</span>
                    <span>${bData.guests} ${t('Guests', 'ဦး', '名様')} (${bData.seatingPreference})</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Guest & Payment Summary -->
          <div class="space-y-4">
            <div class="font-headline text-base font-bold text-[#241A18] border-b border-[#E8DDD0] pb-2 flex items-center gap-2">
              <span class="material-symbols-outlined text-[#9B1C25] text-lg">person_pin</span>
              <span>${t('Guest & Payment Information', 'ဧည့်သည်နှင့် ငွေပေးချေမှု အချက်အလက်', 'お客様・お支払い情報')}</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="bg-[#F8EFE5] p-3.5 rounded-xl border border-[#E8DDD0]">
                <div class="text-[#6D6561] text-[10px] uppercase font-bold tracking-wider font-label">${t('Guest Name', 'ဧည့်သည် အမည်', 'お名前')}</div>
                <div class="text-[#241A18] text-sm font-bold font-body mt-0.5">${gData.guestName || '—'}</div>
              </div>
              <div class="bg-[#F8EFE5] p-3.5 rounded-xl border border-[#E8DDD0]">
                <div class="text-[#6D6561] text-[10px] uppercase font-bold tracking-wider font-label">${t('Phone Number', 'ဖုန်းနံပါတ်', '電話番号')}</div>
                <div class="text-[#241A18] text-sm font-bold font-body mt-0.5">${gData.guestPhone || '—'}</div>
              </div>
              <div class="bg-[#F8EFE5] p-3.5 rounded-xl border border-[#E8DDD0]">
                <div class="text-[#6D6561] text-[10px] uppercase font-bold tracking-wider font-label">${t('Email Address', 'အီးမေးလ်', 'メールアドレス')}</div>
                <div class="text-[#241A18] text-sm font-bold font-body mt-0.5 truncate">${gData.guestEmail || '—'}</div>
              </div>
              <div class="bg-[#F8EFE5] p-3.5 rounded-xl border border-[#E8DDD0]">
                <div class="text-[#6D6561] text-[10px] uppercase font-bold tracking-wider font-label">${t('Payment Preference', 'ငွေပေးချေမှု ပုံစံ', 'お支払い方法')}</div>
                <div class="text-[#9B1C25] text-sm font-bold font-body mt-0.5 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm">${gData.paymentMethod === 'qr' ? 'qr_code_2' : 'payments'}</span>
                  <span>${gData.paymentMethod === 'qr' ? t('KBZPay / AYA Pay QR (Promo Applied)', 'KBZPay / AYA Pay QR (၅၀,၀၀၀ ကျပ် လျှော့ပြီး)', 'KBZPay / AYA Pay QR (割引適用)') : t('Pay at Restaurant', 'ဆိုင်တွင် ပေးချေမည်', '来店時のお支払い')}</span>
                </div>
              </div>
            </div>

            ${gData.specialRequests ? `
              <div class="bg-[#F8EFE5] p-3.5 rounded-xl border border-[#E8DDD0]">
                <div class="text-[#6D6561] text-[10px] uppercase font-bold tracking-wider font-label">${t('Special Requests / Dietary Notes', 'အထူး တောင်းဆိုချက် / မှတ်ချက်', 'ご要望・アレルギー等')}</div>
                <div class="text-[#241A18] text-xs font-body mt-0.5">${gData.specialRequests}</div>
              </div>
            ` : ''}
          </div>

          <!-- 3. Estimated Pricing Breakdown -->
          <div class="space-y-3 font-label text-xs">
            <div class="font-headline text-base font-bold text-[#241A18] border-b border-[#E8DDD0] pb-2 flex items-center gap-2">
              <span class="material-symbols-outlined text-[#9B1C25] text-lg">receipt_long</span>
              <span>${t('Estimated Pricing Breakdown', 'ခန့်မှန်းခြေ ကုန်ကျစရိတ် တွက်ချက်မှု', 'お見積り明細')}</span>
            </div>
            <div class="flex justify-between text-[#6D6561]">
              <span>${t('Experience Tasting Menu', 'အထူး ဟင်းပွဲ မီနူး', 'ディナーコース')} (x${bData.guests})</span>
              <span class="font-bold text-[#241A18]">${experiencePrice.toLocaleString()} MMK</span>
            </div>
            <div class="flex justify-between text-[#6D6561]">
              <span>${t('Sommelier Wine Pairing', 'ဝိုင် တွဲဖက် သောက်သုံးမှု', 'ワインペアリング')} (x${bData.guests})</span>
              <span class="font-bold text-[#241A18]">${winePairingPrice.toLocaleString()} MMK</span>
            </div>
            ${promoDiscount > 0
              ? `<div class="flex justify-between text-[#065F46] font-semibold"><span>${t('KBZPay / QR Instant Discount', 'KBZPay / QR အထူး လျှော့ဈေး', 'KBZPay / QR 即時割引')}</span><span>-${promoDiscount.toLocaleString()} MMK</span></div>`
              : ''
            }
            <div class="flex justify-between text-[#6D6561]">
              <span>${t('Commercial Tax (8.5%)', 'ကုန်သွယ်ခွန် (၈.၅%)', '商業税 (8.5%)')}</span>
              <span class="font-bold text-[#241A18]">${tax.toLocaleString()} MMK</span>
            </div>
            <div class="flex justify-between text-[#6D6561]">
              <span>${t('Service Charge (18%)', 'ဝန်ဆောင်ခ (၁၈%)', 'サービス料 (18%)')}</span>
              <span class="font-bold text-[#241A18]">${serviceCharge.toLocaleString()} MMK</span>
            </div>
            <div class="pt-3 border-t border-[#E8DDD0] flex justify-between items-center text-sm">
              <span class="font-bold text-[#241A18]">${t('Estimated Total', 'စုစုပေါင်း ခန့်မှန်းကုန်ကျစရိတ်', '合計（概算）')}</span>
              <span class="font-bold text-[#9B1C25] font-headline text-lg">${totalAmount.toLocaleString()} MMK</span>
            </div>
          </div>

          <label class="flex items-center gap-3 cursor-pointer bg-[#F8EFE5] p-4 rounded-xl border border-[#E8DDD0]">
            <input type="checkbox" id="step3-terms" checked class="w-5 h-5 rounded border-[#E8DDD0] accent-[#9B1C25] cursor-pointer" />
            <span class="font-body text-xs text-[#241A18] font-semibold">
              ${t('I agree to the cancellation policy and restaurant terms of service.', 'ပယ်ဖျက်ခြင်းဆိုင်ရာ စည်းမျဉ်းများနှင့် စည်းကမ်းချက်များကို သဘောတူပါသည်။', 'キャンセルポリシーおよび利用規約に同意します。')}
            </span>
          </label>

          <!-- Action Buttons -->
          <div class="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 mt-6 pt-4 border-t border-[#E8DDD0]">
            <a
              href="#/s/${slug}/book"
              id="step3-back-btn"
              class="w-full sm:w-auto px-7 py-3.5 rounded-full border border-[#E8DDD0] font-label text-sm font-semibold text-[#6D6561] hover:bg-[#F8EFE5] transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span class="material-symbols-outlined text-sm">arrow_back</span>
              <span>${t('Back to Details', 'နောက်သို့', '戻る: お客様情報')}</span>
            </a>
            <button
              type="button"
              id="step3-final-btn"
              class="w-full sm:w-auto bg-[#9B1C25] hover:bg-[#7F161E] text-white font-label text-sm font-bold px-8 py-3.5 rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <span>${t('Confirm & Complete', 'ကြိုတင်မှာယူမှု အတည်ပြုမည်', '予約を確定する')}</span>
              <span class="material-symbols-outlined text-sm">check_circle</span>
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
          store.showToast(t('Reservation confirmed!', 'ဘွတ်ကင် အောင်မြင်စွာ တင်ပြီးပါပြီ။', '予約が完了しました！'));
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
