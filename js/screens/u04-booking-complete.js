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
    const isJa = state.currentLanguage === 'JA';
    const t = (en, mm, ja) => window.YoyakuI18n ? window.YoyakuI18n.t(en, mm, ja) : (isJa ? (ja || en) : (isMm ? mm : en));
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
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#065F46] text-white">
                  <span class="material-symbols-outlined text-sm font-bold">check</span>
                </div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#065F46]">STEP 03</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#241A18] truncate stepper-step-title">${t('Complete', 'ပြီးမြောက်ပါပြီ', '予約完了')}</div>
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
            <div class="w-16 h-16 bg-[#065F46] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <span class="material-symbols-outlined text-3xl font-bold">check</span>
            </div>
            <h2 class="font-headline text-2xl sm:text-3xl text-[#241A18] font-extrabold">
              ${t('Reservation Confirmed!', 'ကြိုတင်မှာယူမှု အောင်မြင်ပါသည်။', 'ご予約が完了しました！')}
            </h2>
            <p class="font-body text-xs text-[#6D6561] max-w-sm mx-auto">
              ${t(
                'Your table is reserved. Present this contactless QR pass upon arrival.',
                'ဆိုင်သို့ ရောက်ရှိသောအခါ အောက်ပါ ဒစ်ဂျစ်တယ် QR Pass ကို ပြသပါ။',
                'ご来店時にこちらのQRコードをご提示ください。'
              )}
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
                ${t('Reservation Reference', 'ဘွတ်ကင် နံပါတ်', '予約番号')}
              </span>
              <span class="font-headline font-bold text-sm text-[#241A18]">
                ${cBooking.restaurantName || 'Restaurant'}
              </span>
            </div>
            <span class="font-mono font-bold text-base text-[#9B1C25]">
              ${cBooking.reservationNo}
            </span>
          </div>

          <!-- Guest Lookup Notice Tip -->
          <div class="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-3 w-full text-left flex items-start gap-2.5">
            <span class="material-symbols-outlined text-amber-700 text-lg shrink-0 mt-0.5">verified_user</span>
            <div class="text-[11px] text-amber-900 leading-snug">
              <span class="font-bold block">${t('Guest Access Notice', 'ဧည့်သည် စစ်ဆေးခြင်း အသိပေးချက်', 'ゲスト照会のご案内')}</span>
              <span>${t(
                `Save your code ${cBooking.reservationNo}. You can look up and cancel your booking anytime without an account via "Lookup Reservation".`,
                `သင်၏ ဘွတ်ကင်နံပါတ် ${cBooking.reservationNo} ကို မှတ်သားထားပါ။ အကောင့်မဖွင့်ဘဲ "ဘွတ်ကင်စစ်ဆေးရန်" မှ အချိန်မရွေး ပြန်လည်ကြည့်ရှု/ပယ်ဖျက်နိုင်ပါသည်။`,
                `予約番号 ${cBooking.reservationNo} をお控えください。アカウントをお持ちでない場合も「予約確認」からいつでも照会・キャンセルが可能です。`
              )}</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col gap-3 w-full pt-1">
            <a
              href="#/reservations/${cBooking.reservationNo}"
              id="step4-view-detail-btn"
              class="w-full py-3.5 rounded-full font-label text-sm font-bold text-white bg-[#9B1C25] hover:bg-[#7F161E] shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span class="material-symbols-outlined text-base">receipt_long</span>
              <span>${t('View Booking Details', 'ဘွတ်ကင် အသေးစိတ် ကြည့်မည်', '予約詳細を見る')}</span>
            </a>

            <a
              href="#/lookup"
              id="step4-lookup-btn"
              class="w-full py-2.5 rounded-full border border-[#E8DDD0] bg-[#FFFDFC] font-label text-xs font-bold text-[#840f16] hover:bg-[#F8EFE5] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span class="material-symbols-outlined text-sm">search</span>
              <span>${t('Lookup This Booking via Guest Flow', 'ဧည့်သည် ရှာဖွေမှုဖြင့် ချက်ချင်း စစ်ဆေးမည်', 'ゲスト照会画面で確認する')}</span>
            </a>

            <a
              href="#/mypage"
              id="step4-mypage-btn"
              class="w-full py-3 rounded-full border border-[#E8DDD0] bg-[#FFFDFC] font-label text-sm font-semibold text-[#241A18] hover:bg-[#F8EFE5] transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span class="material-symbols-outlined text-base text-[#6D6561]">dashboard</span>
              <span>${t('Go to My Page', 'မိုင်ပေ့ဂျ် သို့ သွားမည်', 'マイページへ')}</span>
            </a>

            <a
              href="#/"
              id="step4-home-btn"
              class="w-full py-2.5 font-label text-xs font-bold text-[#6D6561] hover:text-[#9B1C25] transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <span class="material-symbols-outlined text-sm">home</span>
              <span>${t('Return to EzBookNow Home', 'EzBookNow ပင်မစာမျက်နှာ', 'ホームへ戻る')}</span>
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
