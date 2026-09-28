/* ==========================================================================
   EzBookNow Screen U-13 — SMS OTP Verification Modal
   Reusable 6-digit SMS OTP verification dialog.
   Triggered from 4 entry points:
     1. Phone registration on U-07
     2. Phone login on U-06
     3. Unverified phone number on U-03 (Guest checkout)
     4. Phone number update on U-11
   Returns seamlessly to caller upon successful OTP verification.
   ========================================================================== */

(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};

  function renderSmsOtpModal(state) {
    const otpState = state.otpModalState || {};
    if (!otpState.isOpen) return '';

    const isMm = state.currentLanguage === 'MM';
    const isJa = state.currentLanguage === 'JA';
    const t = (en, mm, ja) => window.YoyakuI18n ? window.YoyakuI18n.t(en, mm, ja) : (isJa ? (ja || en) : (isMm ? mm : en));
    const phone = otpState.phoneNumber || state.myPageData.userPhone || '+95 9 123 456 789';
    const errorMsg = otpState.error || '';

    return `
      <div id="u13-otp-modal-backdrop" class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-3 sm:p-4 animate-fadeIn">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="u13-otp-title"
          class="mt-auto w-full max-w-md rounded-[24px] border border-[#E8DDD0] bg-[#FFFDFC] p-6 text-left shadow-2xl max-h-[90vh] overflow-y-auto sm:mt-0"
        >
          <!-- Header -->
          <div class="flex justify-between items-center border-b border-[#E8DDD0] pb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-[#9B1C25]/10 text-[#9B1C25] flex items-center justify-center">
                <span class="material-symbols-outlined text-xl">sms</span>
              </div>
              <div>
                <h3 id="u13-otp-title" class="font-headline text-lg font-bold text-[#241A18]">
                  ${t('SMS Verification', 'SMS အတည်ပြုကုဒ် ရိုက်ထည့်ပါ', 'SMS認証コードの入力')}
                </h3>
              </div>
            </div>
            <button
              type="button"
              id="u13-close-otp-btn"
              aria-label="${t('Close', 'ပိတ်မည်', '閉じる')}"
              class="w-8 h-8 rounded-full bg-[#F8EFE5] hover:bg-[#E8DDD0] flex items-center justify-center text-[#6D6561] transition-colors cursor-pointer"
            >
              <span class="material-symbols-outlined text-base">close</span>
            </button>
          </div>

          <!-- Body -->
          <div class="space-y-4 pt-4">
            <p class="font-body text-xs text-[#6D6561] leading-relaxed">
              ${t(
                `A 6-digit verification code was sent via SMS to <strong class="text-[#241A18] font-mono">${phone}</strong>.`,
                `ဂဏန်း ၆ လုံးပါ လျှို့ဝှက်အတည်ပြုကုဒ်ကို <strong class="text-[#241A18] font-mono">${phone}</strong> သို့ SMS ပေးပို့ထားပါသည်။`,
                `<strong class="text-[#241A18] font-mono">${phone}</strong> 宛てに送信された6桁の認証コードを入力してください。`
              )}
            </p>

            ${errorMsg ? `
              <div class="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                <span class="material-symbols-outlined text-base text-red-600">error</span>
                <span>${errorMsg}</span>
              </div>
            ` : ''}

            <form id="u13-otp-form" class="space-y-4 pt-1">
              <div>
                <label for="u13-otp-input" class="block text-[11px] font-bold uppercase tracking-wider text-[#6D6561] font-label mb-2 text-center">
                  ${t('Enter 6-Digit Code', 'အတည်ပြုကုဒ် (ဂဏန်း ၆ လုံး)', '6桁のコード')}
                </label>
                <input
                  type="text"
                  id="u13-otp-input"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  maxlength="6"
                  autocomplete="one-time-code"
                  placeholder="123456"
                  class="w-full text-center tracking-[0.4em] font-mono text-3xl font-bold py-3.5 rounded-2xl border-2 border-[#E8DDD0] focus:border-[#9B1C25] bg-[#FFFDFC] text-[#241A18] focus:outline-none shadow-2xs transition-colors"
                  required
                  autofocus
                />
              </div>

              <!-- Resend timer & actions -->
              <div class="flex items-center justify-between text-xs text-[#6D6561] pt-1 px-1">
                <span>${t("Didn't receive code?", 'ကုဒ်မရရှိသေးပါက', 'コードが届かない場合')}</span>
                <button
                  type="button"
                  id="u13-resend-otp-btn"
                  class="text-[#9B1C25] font-bold hover:underline cursor-pointer disabled:text-[#9A908B] disabled:no-underline disabled:cursor-not-allowed"
                >
                  ${t('Resend SMS', 'ကုဒ်ပြန်လည်တောင်းမည်', 'SMSを再送信')}
                </button>
              </div>

              <div class="pt-2">
                <button
                  type="submit"
                  id="u13-submit-otp-btn"
                  class="w-full py-3.5 rounded-full font-label font-bold text-xs text-white bg-[#9B1C25] hover:bg-[#7F161E] active:scale-95 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <span class="material-symbols-outlined text-base">verified_user</span>
                  <span>${t('Verify & Continue', 'အတည်ပြုပြီး ရှေ့ဆက်မည်', '認証して次へ進む')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  function attachSmsOtpEvents(root) {
    const store = window.store;
    if (!store) return;

    const closeBtn = root.querySelector('#u13-close-otp-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        store.closeOtpModal();
      });
    }

    const backdrop = root.querySelector('#u13-otp-modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          store.closeOtpModal();
        }
      });
    }

    const form = root.querySelector('#u13-otp-form');
    const input = root.querySelector('#u13-otp-input');
    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const code = input.value.trim();
        store.verifyOtpCode(code);
      });
    }

    const resendBtn = root.querySelector('#u13-resend-otp-btn');
    if (resendBtn) {
      resendBtn.addEventListener('click', () => {
        store.resendOtpCode();
      });
    }
  }

  window.YoyakuComponents.renderSmsOtpModal = renderSmsOtpModal;
  window.YoyakuComponents.attachSmsOtpEvents = attachSmsOtpEvents;
})();
