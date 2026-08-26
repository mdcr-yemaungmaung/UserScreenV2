(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;



  function renderBookingStep3(state) {
    const modalState = state.bookingModalState;
    if (!modalState.isOpen || !modalState.restaurant) return '';

    const restaurant = modalState.restaurant;
    const bData = modalState.bookingData;
    const gData = modalState.guestData;
    const isMm = state.currentLanguage === 'MM';

    const experiencePrice = 180000 * bData.guests;
    const winePairingPrice = 120000 * bData.guests;
    const promoDiscount = gData.paymentMethod === 'qr' ? 50000 : 0;
    const subtotal = experiencePrice + winePairingPrice - promoDiscount;
    const tax = Math.round(subtotal * 0.085);
    const serviceCharge = Math.round(subtotal * 0.18);
    const totalAmount = subtotal + tax + serviceCharge;

    return `
      <div class="max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-28 sm:pb-12 space-y-6 text-left animate-fadeIn">

        <!-- STEPPER PROGRESS BAR -->
        <div class="px-1 sm:px-2">
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
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#840f16] text-white shadow-xs">3</div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#840f16]">STEP 03</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#231916] truncate stepper-step-title">${isMm ? 'အတည်ပြုချက်' : 'Confirm Reservation'}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#840f16]"></div>
            </div>
          </div>
        </div>

        <!-- STEP 3 CONTENT -->
        <div class="bg-transparent sm:bg-[#FFF7E8] rounded-none sm:rounded-3xl border-0 sm:border sm:border-[#EADFD1] shadow-none sm:shadow-xl overflow-hidden p-0 sm:p-8 space-y-6">

          <div class="border-b border-[#EADFD1] pb-4">
            <h2 class="font-headline text-2xl sm:text-3xl text-[#231916] font-bold">
              ${isMm ? 'အတည်ပြုချက်' : 'Confirm Reservation'}
            </h2>
          </div>

          <!-- 1. RESTAURANT & RESERVATION DETAILS -->
          <div class="space-y-4">
            <div class="font-headline text-base font-bold text-[#231916] border-b border-[#EADFD1] pb-2 flex items-center gap-2">
              <span class="material-symbols-outlined text-[#840f16] text-lg">restaurant</span>
              <span>${isMm ? 'ဆိုင်နှင့် စားပွဲဝိုင်း အချက်အလက်' : 'Restaurant & Table Details'}</span>
            </div>

            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div class="w-20 h-20 rounded-xl overflow-hidden shrink-0 shadow-xs border border-[#EADFD1]">
                <img src="${restaurant.heroImage}" alt="${restaurant.name}" referrerpolicy="no-referrer" loading="lazy" onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';" class="w-full h-full object-cover" />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-headline text-lg text-[#231916] font-bold truncate">${restaurant.name}</h3>
                <p class="font-body text-xs text-[#58413f] truncate flex items-center gap-1 mt-0.5">
                  <span class="material-symbols-outlined text-xs text-[#840f16]">location_on</span>
                  <span>${restaurant.address || restaurant.area || 'Yangon, Myanmar'}</span>
                </p>
                <div class="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 font-label text-xs">
                  <span class="font-medium text-[#231916] flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm text-[#840f16]">calendar_today</span>
                    <span>${bData.date}</span>
                  </span>
                  <span class="text-[#D5C2AF] hidden sm:inline">•</span>
                  <span class="font-medium text-[#231916] flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm text-[#840f16]">schedule</span>
                    <span>${bData.time}</span>
                  </span>
                  <span class="text-[#D5C2AF] hidden sm:inline">•</span>
                  <span class="font-medium text-[#231916] flex items-center gap-1">
                    <span class="material-symbols-outlined text-sm text-[#840f16]">group</span>
                    <span>${bData.guests} ${isMm ? 'ဦး' : 'Guests'} (${bData.seatingPreference})</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. GUEST & PAYMENT SUMMARY -->
          <div class="space-y-4">
            <div class="font-headline text-base font-bold text-[#231916] border-b border-[#EADFD1] pb-2 flex items-center gap-2">
              <span class="material-symbols-outlined text-[#840f16] text-lg">person_pin</span>
              <span>${isMm ? 'ဧည့်သည်နှင့် ငွေပေးချေမှု အချက်အလက်' : 'Guest & Payment Information'}</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="bg-[#FFFDFC] p-3 rounded-xl border border-[#E8DDD0]">
                <div class="text-[#8d7b75] text-[10px] uppercase font-bold tracking-wider">${isMm ? 'ဧည့်သည် အမည်' : 'Guest Name'}</div>
                <div class="text-[#231916] text-sm font-bold font-body mt-0.5">${gData.guestName || '—'}</div>
              </div>
              <div class="bg-[#FFFDFC] p-3 rounded-xl border border-[#E8DDD0]">
                <div class="text-[#8d7b75] text-[10px] uppercase font-bold tracking-wider">${isMm ? 'ဖုန်းနံပါတ်' : 'Phone Number'}</div>
                <div class="text-[#231916] text-sm font-bold font-body mt-0.5">${gData.guestPhone || '—'}</div>
              </div>
              <div class="bg-[#FFFDFC] p-3 rounded-xl border border-[#E8DDD0]">
                <div class="text-[#8d7b75] text-[10px] uppercase font-bold tracking-wider">${isMm ? 'အီးမေးလ်' : 'Email Address'}</div>
                <div class="text-[#231916] text-sm font-bold font-body mt-0.5 truncate">${gData.guestEmail || '—'}</div>
              </div>
              <div class="bg-[#FFFDFC] p-3 rounded-xl border border-[#E8DDD0]">
                <div class="text-[#8d7b75] text-[10px] uppercase font-bold tracking-wider">${isMm ? 'ငွေပေးချေမှု ပုံစံ' : 'Payment Preference'}</div>
                <div class="text-[#840f16] text-sm font-bold font-body mt-0.5 flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm">${gData.paymentMethod === 'qr' ? 'qr_code_2' : 'payments'}</span>
                  <span>${gData.paymentMethod === 'qr' ? (isMm ? 'KBZPay / AYA Pay QR (၅၀,၀၀၀ ကျပ် လျှော့ပြီး)' : 'KBZPay / AYA Pay QR (Promo Applied)') : (isMm ? 'ဆိုင်တွင် ပေးချေမည်' : 'Pay at Restaurant')}</span>
                </div>
              </div>
            </div>

            ${gData.specialRequests ? `
              <div class="bg-[#FFFDFC] p-3 rounded-xl border border-[#E8DDD0]">
                <div class="text-[#8d7b75] text-[10px] uppercase font-bold tracking-wider">${isMm ? 'အထူး တောင်းဆိုချက် / မှတ်ချက်' : 'Special Requests / Dietary Notes'}</div>
                <div class="text-[#231916] text-xs font-body mt-0.5">${gData.specialRequests}</div>
              </div>
            ` : ''}
          </div>

          <!-- 3. ESTIMATED PRICING BREAKDOWN -->
          <div class="space-y-3 font-label text-xs">
            <div class="font-headline text-base font-bold text-[#231916] border-b border-[#EADFD1] pb-2 flex items-center gap-2">
              <span class="material-symbols-outlined text-[#840f16] text-lg">receipt_long</span>
              <span>${isMm ? 'ခန့်မှန်းခြေ ကုန်ကျစရိတ် တွက်ချက်မှု' : 'Estimated Pricing Breakdown'}</span>
            </div>
            <div class="flex justify-between text-[#58413f]">
              <span>${isMm ? 'အထူး ဟင်းပွဲ မီနူး' : 'Experience Tasting Menu'} (x${bData.guests})</span>
              <span class="font-bold text-[#231916]">${experiencePrice.toLocaleString()} MMK</span>
            </div>
            <div class="flex justify-between text-[#58413f]">
              <span>${isMm ? 'ဝိုင် တွဲဖက် သောက်သုံးမှု' : 'Sommelier Wine Pairing'} (x${bData.guests})</span>
              <span class="font-bold text-[#231916]">${winePairingPrice.toLocaleString()} MMK</span>
            </div>
            ${promoDiscount > 0
              ? `<div class="flex justify-between text-[#104b2b] font-semibold"><span>${isMm ? 'KBZPay / QR အထူး လျှော့ဈေး' : 'KBZPay / QR Instant Discount'}</span><span>-${promoDiscount.toLocaleString()} MMK</span></div>`
              : ''
            }
            <div class="flex justify-between text-[#58413f]">
              <span>${isMm ? 'ကုန်သွယ်ခွန် (၈.၅%)' : 'Commercial Tax (8.5%)'}</span>
              <span class="font-bold text-[#231916]">${tax.toLocaleString()} MMK</span>
            </div>
            <div class="flex justify-between text-[#58413f]">
              <span>${isMm ? 'ဝန်ဆောင်ခ (၁၈%)' : 'Service Charge (18%)'}</span>
              <span class="font-bold text-[#231916]">${serviceCharge.toLocaleString()} MMK</span>
            </div>
            <div class="pt-3 border-t border-[#EADFD1] flex justify-between items-center">
              <span class="font-bold text-[#231916]">${isMm ? 'စုစုပေါင်း ခန့်မှန်းကုန်ကျစရိတ်' : 'Estimated Total'}</span>
              <span class="font-bold text-[#840f16]">${totalAmount.toLocaleString()} MMK</span>
            </div>
          </div>

          <label class="flex items-center gap-3 cursor-pointer bg-[#FFFDFC] p-4 rounded-xl border border-[#E8DDD0]">
            <input type="checkbox" id="step3-terms" checked class="w-5 h-5 rounded border-[#EADFD1] accent-[#840f16] cursor-pointer" />
            <span class="font-body text-xs text-[#231916] font-semibold">
              ${isMm ? 'ပယ်ဖျက်ခြင်းဆိုင်ရာ စည်းမျဉ်းများနှင့် စည်းကမ်းချက်များကို သဘောတူပါသည်။' : 'I agree to the cancellation policy and restaurant terms of service.'}
            </span>
          </label>

          <div class="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 mt-5">
            <button id="step3-back-btn" class="w-full sm:w-auto px-7 py-3.5 rounded-full border border-[#D5C2AF] font-label text-sm font-semibold text-[#58413f] hover:bg-[#F5EBDC] transition-all cursor-pointer flex items-center justify-center gap-1.5">
              <span class="material-symbols-outlined text-sm">arrow_back</span>
              <span>${isMm ? 'နောက်သို့' : 'Back'}</span>
            </button>
            <button id="step3-final-btn" class="w-full sm:w-auto bg-[#840f16] hover:bg-[#6b0c12] text-white font-label text-sm font-bold px-8 py-3.5 rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all">
              <span>${isMm ? 'ကြိုတင်မှာယူမှု အတည်ပြုမည်' : 'Confirm Reservation'}</span>
              <span class="material-symbols-outlined text-sm">check_circle</span>
            </button>
          </div>

        </div>
      </div>
    `;
  }

  function attachBookingStep3Events(containerElement = document) {
    const step3Back = containerElement.querySelector('#step3-back-btn');
    if (step3Back) {
      step3Back.addEventListener('click', () => {
        store.setBookingStep(2);
      });
    }

    const step3Final = containerElement.querySelector('#step3-final-btn');
    if (step3Final) {
      step3Final.addEventListener('click', () => {
        const state = store.getState();
        const mState = state.bookingModalState;
        const rest = mState.restaurant;
        const bData = mState.bookingData;
        const gData = mState.guestData;

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
        store.showToast('Reservation confirmed!');
      });
    }
  }


  window.YoyakuComponents.renderBookingStep3 = renderBookingStep3;
  window.YoyakuComponents.attachBookingStep3Events = attachBookingStep3Events;
})();
