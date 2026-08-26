(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;



  function renderBookingStep2(state) {
    const modalState = state.bookingModalState;
    if (!modalState.isOpen || !modalState.restaurant) return '';

    const restaurant = modalState.restaurant;
    const step = modalState.step;
    const bData = modalState.bookingData;
    const gData = modalState.guestData;
    const isMm = state.currentLanguage === 'MM';

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
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#840f16] text-white shadow-xs">2</div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#840f16]">STEP 02</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#231916] truncate stepper-step-title">${isMm ? 'ဧည့်သည် အချက်အလက်' : 'Guest Details'}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#840f16]"></div>
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

        <!-- STEP 2 CONTENT -->
        <div class="bg-transparent sm:bg-[#FFF7E8] rounded-none sm:rounded-3xl border-0 sm:border sm:border-[#EADFD1] shadow-none sm:shadow-xl overflow-hidden p-0 sm:p-8">

          <div class="border-b border-[#EADFD1] pb-4 mb-6">
            <h2 class="font-headline text-2xl sm:text-3xl text-[#231916] font-bold">
              ${isMm ? 'ဧည့်သည် အချက်အလက်' : 'Guest Details'}
            </h2>
          </div>

          <form id="step2-form" class="space-y-6">

            <div class="space-y-4">
              <h3 class="font-headline text-lg text-[#231916] font-bold border-b border-[#EADFD1] pb-2">
                ${isMm ? 'ဧည့်သည် အချက်အလက်များ' : 'Guest Information'}
              </h3>

              <div>
                <label class="font-label text-xs font-bold text-[#58413f] uppercase block mb-1">${isMm ? 'အမည် အပြည့်အစုံ *' : 'Full Name *'}</label>
                <input type="text" id="step2-name" required value="${gData.guestName}" class="w-full bg-[#FFF8F6] border border-[#EADFD1] focus:border-[#840f16] rounded-xl px-4 py-3 font-body text-sm text-[#231916]" />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="font-label text-xs font-bold text-[#58413f] uppercase block mb-1">${isMm ? 'ဖုန်းနံပါတ် *' : 'Phone Number *'}</label>
                  <input type="tel" id="step2-phone" required value="${gData.guestPhone}" class="w-full bg-[#FFF8F6] border border-[#EADFD1] focus:border-[#840f16] rounded-xl px-4 py-3 font-body text-sm text-[#231916]" />
                </div>
                <div>
                  <label class="font-label text-xs font-bold text-[#58413f] uppercase block mb-1">${isMm ? 'အီးမေးလ် လိပ်စာ *' : 'Email Address *'}</label>
                  <input type="email" id="step2-email" required value="${gData.guestEmail}" class="w-full bg-[#FFF8F6] border border-[#EADFD1] focus:border-[#840f16] rounded-xl px-4 py-3 font-body text-sm text-[#231916]" />
                </div>
              </div>

              <div>
                <label class="font-label text-xs font-bold text-[#58413f] uppercase block mb-1">${isMm ? 'အထူး တောင်းဆိုချက်များ / စားသောက်မှု မှတ်ချက်' : 'Special Requests / Dietary Notes'}</label>
                <textarea id="step2-requests" rows="3" class="w-full bg-[#FFF8F6] border border-[#EADFD1] focus:border-[#840f16] rounded-xl p-4 font-body text-sm text-[#231916] resize-none">${gData.specialRequests}</textarea>
              </div>
            </div>

            <div class="space-y-3 pt-2">
              <h3 class="font-headline text-lg text-[#231916] font-bold border-b border-[#EADFD1] pb-2">
                ${isMm ? 'ငွေပေးချေမှု ပုံစံ ရွေးချယ်ပါ' : 'Payment Preference'}
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button type="button" data-select-payment="qr" class="p-4 rounded-2xl border text-left flex flex-col gap-2 cursor-pointer ${gData.paymentMethod === 'qr' ? 'bg-[#840f16]/10 border-[#840f16] ring-2 ring-[#840f16]/20' : 'bg-[#FFFDFC] border-[#E8DDD0]'}">
                  <div class="flex justify-between items-center font-headline text-sm font-bold text-[#231916]">
                    <span>KBZPay / AYA Pay QR</span>
                    <span class="material-symbols-outlined text-[#840f16]">qr_code_2</span>
                  </div>
                  <p class="font-body text-xs text-[#58413f]">${isMm ? 'QR ဖျောက်ခတ်ပြီး ချက်ချင်း ၅၀,၀၀၀ ကျပ် လျှော့ဈေး ရယူပါ။' : 'Instant QR payment with 50,000 MMK promo discount applied.'}</p>
                </button>
                <button type="button" data-select-payment="store" class="p-4 rounded-2xl border text-left flex flex-col gap-2 cursor-pointer ${gData.paymentMethod === 'store' ? 'bg-[#840f16]/10 border-[#840f16] ring-2 ring-[#840f16]/20' : 'bg-[#FFFDFC] border-[#E8DDD0]'}">
                  <div class="flex justify-between items-center font-headline text-sm font-bold text-[#231916]">
                    <span>${isMm ? 'ဆိုင်တွင် ပေးချေမည်' : 'Pay at Restaurant'}</span>
                    <span class="material-symbols-outlined text-[#58413f]">payments</span>
                  </div>
                  <p class="font-body text-xs text-[#58413f]">${isMm ? 'ကြိုတင် ပေးချေရန် မလိုပါ။ စားသောက်ပြီးမှ ဆိုင်တွင် ပေးချေပါ။' : 'No upfront charge. Settle bill after dining at venue.'}</p>
                </button>
              </div>
            </div>

            <div class="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 mt-6">
              <button id="step2-back-btn" type="button" class="w-full sm:w-auto px-7 py-3.5 rounded-full border border-[#D5C2AF] font-label text-sm font-semibold text-[#58413f] hover:bg-[#F5EBDC] transition-all cursor-pointer flex items-center justify-center gap-1.5">
                <span class="material-symbols-outlined text-sm">arrow_back</span>
                <span>${isMm ? 'နောက်သို့' : 'Back'}</span>
              </button>
              <button type="submit" class="w-full sm:w-auto bg-[#840f16] hover:bg-[#6b0c12] text-white font-label text-sm font-bold px-8 py-3.5 rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all">
                <span>${isMm ? 'စစ်ဆေးချက် သို့ ဆက်သွားမည်' : 'Continue to Summary'}</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

          </form>

        </div>
      </div>
    `;
  }

  function attachBookingStep2Events(containerElement = document) {
    containerElement.querySelectorAll('[data-select-payment]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const paymentMethod = e.currentTarget.getAttribute('data-select-payment');
        store.setBookingStep(2, { guestData: { paymentMethod } });
      });
    });

    const step2Back = containerElement.querySelector('#step2-back-btn');
    if (step2Back) {
      step2Back.addEventListener('click', () => {
        store.setBookingStep(1);
      });
    }

    const step2Form = containerElement.querySelector('#step2-form');
    if (step2Form) {
      step2Form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = containerElement.querySelector('#step2-name')?.value || '';
        const phone = containerElement.querySelector('#step2-phone')?.value || '';
        const email = containerElement.querySelector('#step2-email')?.value || '';
        const requests = containerElement.querySelector('#step2-requests')?.value || '';

        store.setBookingStep(3, {
          guestData: {
            guestName: name,
            guestPhone: phone,
            guestEmail: email,
            specialRequests: requests
          }
        });
      });
    }
  }


  window.YoyakuComponents.renderBookingStep2 = renderBookingStep2;
  window.YoyakuComponents.attachBookingStep2Events = attachBookingStep2Events;
})();
