/* ==========================================================================
   EzBookNow Screen U-02 — 予約入力 (Booking Input Form)
   Route: /s/{slug}/book
   Captures customer details (Member & Guest booking):
     - Full Name
     - Phone Number
     - Email Address
     - Special Requests / Dietary Notes
     - Payment Preference
   Navigation:
     - Back -> navigates to U-01 (/s/{slug})
     - Submit -> navigates to U-03 (/s/{slug}/confirm)
   ========================================================================== */

(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;

  function renderBookingStep2(state) {
    const modalState = state.bookingModalState || {};
    const restaurant = modalState.restaurant || (window.YoyakuData && window.YoyakuData.RESTAURANTS_DATA && window.YoyakuData.RESTAURANTS_DATA[0]);
    if (!restaurant) return '';

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
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#9B1C25] text-white shadow-xs">2</div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#9B1C25]">STEP 02</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#241A18] truncate stepper-step-title">${t('Guest Details', 'ဧည့်သည် အချက်အလက်', 'お客様情報')}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#9B1C25]"></div>
            </div>
            <div class="flex flex-col justify-between">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#E8DDD0] text-[#6D6561]">3</div>
                <div class="min-w-0">
                  <div class="font-label text-[10px] font-bold uppercase tracking-wider text-[#9A908B]">STEP 03</div>
                  <div class="font-headline text-xs sm:text-sm font-bold text-[#241A18] truncate stepper-step-title">${t('Confirm', 'အတည်ပြုချက်', '予約内容の確認')}</div>
                </div>
              </div>
              <div class="mt-2.5 h-1 rounded-full w-full bg-[#E8DDD0]/60"></div>
            </div>
          </div>
        </div>

        <!-- Step 2 Content Card -->
        <div class="bg-[#FFFDFC] rounded-3xl border border-[#E8DDD0] shadow-sm overflow-hidden p-5 sm:p-8">

          <div class="border-b border-[#E8DDD0] pb-4 mb-6 flex items-center justify-between">
            <div>
              <h2 class="font-headline text-2xl sm:text-3xl text-[#241A18] font-bold">
                ${t('Guest Details', 'ဧည့်သည် အချက်အလက် ဖြည့်သွင်းပါ', 'お客様情報の入力')}
              </h2>
            </div>
            <span class="text-xs font-label text-[#6D6561]">
              ${restaurant.name}
            </span>
          </div>

          <form id="step2-form" class="space-y-6">

            <div class="space-y-4">
              <h3 class="font-headline text-base sm:text-lg text-[#241A18] font-bold border-b border-[#E8DDD0] pb-2">
                ${t('Contact Information', 'ဧည့်သည် အချက်အလက်များ', 'お客様のご連絡先')}
              </h3>

              <div>
                <label class="font-label text-xs font-bold text-[#6D6561] uppercase block mb-1.5">${t('Full Name *', 'အမည် အပြည့်အစုံ *', 'お名前 (フルネーム) *')}</label>
                <input
                  type="text"
                  id="step2-name"
                  required
                  value="${gData.guestName || ''}"
                  placeholder="${t('e.g. Evelyn St. Clair', 'ဥပမာ - မောင်မောင်', '例: 山田 太郎')}"
                  class="w-full bg-[#FFFDFC] border border-[#E8DDD0] focus:border-[#9B1C25] rounded-xl px-4 py-3 font-body text-sm text-[#241A18] focus:outline-none transition-colors"
                />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="font-label text-xs font-bold text-[#6D6561] uppercase block mb-1.5">${t('Phone Number (for SMS Verification) *', 'ဖုန်းနံပါတ် (SMS အတည်ပြုရန်) *', '電話番号 (SMS認証用) *')}</label>
                  <input
                    type="tel"
                    id="step2-phone"
                    required
                    value="${gData.guestPhone || ''}"
                    placeholder="+95 9 ..."
                    class="w-full bg-[#FFFDFC] border border-[#E8DDD0] focus:border-[#9B1C25] rounded-xl px-4 py-3 font-body text-sm text-[#241A18] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label class="font-label text-xs font-bold text-[#6D6561] uppercase block mb-1.5">${t('Email Address *', 'အီးမေးလ် လိပ်စာ *', 'メールアドレス *')}</label>
                  <input
                    type="email"
                    id="step2-email"
                    required
                    value="${gData.guestEmail || ''}"
                    placeholder="name@example.com"
                    class="w-full bg-[#FFFDFC] border border-[#E8DDD0] focus:border-[#9B1C25] rounded-xl px-4 py-3 font-body text-sm text-[#241A18] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label class="font-label text-xs font-bold text-[#6D6561] uppercase block mb-1.5">${t('Special Requests / Dietary Notes', 'အထူး တောင်းဆိုချက်များ / စားသောက်မှု မှတ်ချက်', 'ご要望・アレルギー等')}</label>
                <textarea
                  id="step2-requests"
                  rows="3"
                  placeholder="${t('Any allergies, celebration details, or seating notes...', 'ဓာတ်မတည့်သည့် အစားအစာ၊ အထိမ်းအမှတ်ပွဲ သို့မဟုတ် အခြားမှတ်ချက်များ...', 'アレルギーや記念日のお祝いなど...')}"
                  class="w-full bg-[#FFFDFC] border border-[#E8DDD0] focus:border-[#9B1C25] rounded-xl p-4 font-body text-sm text-[#241A18] resize-none focus:outline-none transition-colors"
                >${gData.specialRequests || ''}</textarea>
              </div>
            </div>

            <!-- Payment Preference -->
            <div class="space-y-3 pt-2">
              <h3 class="font-headline text-base sm:text-lg text-[#241A18] font-bold border-b border-[#E8DDD0] pb-2">
                ${t('Payment Preference', 'ငွေပေးချေမှု ပုံစံ ရွေးချယ်ပါ', 'お支払い方法の選択')}
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  data-select-payment="qr"
                  class="p-4 rounded-2xl border text-left flex flex-col gap-2 cursor-pointer transition-all ${gData.paymentMethod === 'qr' ? 'bg-[#9B1C25]/10 border-[#9B1C25] ring-2 ring-[#9B1C25]/20' : 'bg-[#FFFDFC] border-[#E8DDD0]'}"
                >
                  <div class="flex justify-between items-center font-headline text-sm font-bold text-[#241A18]">
                    <span>KBZPay / AYA Pay QR</span>
                    <span class="material-symbols-outlined text-[#9B1C25]">qr_code_2</span>
                  </div>
                  <p class="font-body text-xs text-[#6D6561]">${t('Instant QR payment option with promotional dining perk.', 'QR ဖျောက်ခတ်ပြီး ချက်ချင်း ၅၀,၀၀၀ ကျပ် လျှော့ဈေး ရယူပါ။', '即時QR決済（プロモーション割引適用）')}</p>
                </button>
                <button
                  type="button"
                  data-select-payment="store"
                  class="p-4 rounded-2xl border text-left flex flex-col gap-2 cursor-pointer transition-all ${gData.paymentMethod === 'store' ? 'bg-[#9B1C25]/10 border-[#9B1C25] ring-2 ring-[#9B1C25]/20' : 'bg-[#FFFDFC] border-[#E8DDD0]'}"
                >
                  <div class="flex justify-between items-center font-headline text-sm font-bold text-[#241A18]">
                    <span>${t('Pay at Restaurant', 'ဆိုင်တွင် ပေးချေမည်', '来店時のお支払い')}</span>
                    <span class="material-symbols-outlined text-[#6D6561]">payments</span>
                  </div>
                  <p class="font-body text-xs text-[#6D6561]">${t('No upfront charge. Settle bill after dining at venue.', 'ကြိုတင် ပေးချေရန် မလိုပါ။ စားသောက်ပြီးမှ ဆိုင်တွင် ပေးချေပါ။', '事前決済不要。ご来店後に現地にてお支払い。')}</p>
                </button>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 mt-6 pt-4 border-t border-[#E8DDD0]">
              <a
                href="#/s/${slug}"
                id="step2-back-btn"
                class="w-full sm:w-auto px-7 py-3.5 rounded-full border border-[#E8DDD0] font-label text-sm font-semibold text-[#6D6561] hover:bg-[#F8EFE5] transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span class="material-symbols-outlined text-sm">arrow_back</span>
                <span>${t('Back to Date & Slots', 'နောက်သို့', '戻る: 日時・人数選択')}</span>
              </a>
              <button
                type="submit"
                id="step2-submit-btn"
                class="w-full sm:w-auto bg-[#9B1C25] hover:bg-[#7F161E] text-white font-label text-sm font-bold px-8 py-3.5 rounded-full shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <span>${t('Continue to Confirmation', 'အတည်ပြုချက် စစ်ဆေးမည်', '次へ: 予約内容の確認')}</span>
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

    const backBtn = containerElement.querySelector('#step2-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        const name = containerElement.querySelector('#step2-name')?.value;
        const phone = containerElement.querySelector('#step2-phone')?.value;
        const email = containerElement.querySelector('#step2-email')?.value;
        const requests = containerElement.querySelector('#step2-requests')?.value;

        store.setBookingStep(1, {
          guestData: {
            guestName: name !== undefined ? name : '',
            guestPhone: phone !== undefined ? phone : '',
            guestEmail: email !== undefined ? email : '',
            specialRequests: requests !== undefined ? requests : ''
          }
        });
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

        const r = store.getState().bookingModalState.restaurant;
        const slug = store.getRestaurantSlug ? store.getRestaurantSlug(r) : 'gilded-fork';
        window.location.hash = `#/s/${slug}/confirm`;
      });
    }
  }

  window.YoyakuComponents.renderBookingStep2 = renderBookingStep2;
  window.YoyakuComponents.attachBookingStep2Events = attachBookingStep2Events;
})();
