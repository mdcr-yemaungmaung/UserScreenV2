(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;

  // Track currently expanded accordion section: 'email' (expanded by default) | 'password' | 'phone' | 'withdrawal' | null
  let expandedSection = 'email';

  const EYE_ICON_SHOW = `<svg class="w-5 h-5 text-[#8d7b75] hover:text-[#231916] transition-colors pointer-events-none" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5C7 5 2.73 8.11 1 12.5 2.73 16.89 7 20 12 20s9.27-3.11 11-7.5C21.27 8.11 17 5 12 5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/><circle cx="12" cy="12.5" r="2.2"/></svg>`;
  const EYE_ICON_HIDE = `<svg class="w-5 h-5 text-[#840f16] transition-colors pointer-events-none" viewBox="0 0 24 24" fill="currentColor"><path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/></svg>`;

  function renderAccountSettingsView(state) {
    const isMm = state.currentLanguage === 'MM';
    const myData = state.myPageData || {};
    const isWithdrawn = myData.accountStatus === 'withdrawn';
    const upcomingReservations = (state.reservations || []).filter(
      r => r.status === 'Confirmed' || r.status === 'Pending'
    );

    const isEmailOpen = expandedSection === 'email';
    const isPasswordOpen = expandedSection === 'password';
    const isPhoneOpen = expandedSection === 'phone';
    const isWithdrawOpen = expandedSection === 'withdrawal';

    return `
      <div id="u20-account-settings-container" class="space-y-4 animate-fadeIn text-left">

        <!-- SECTION HEADER -->
        <div class="border-b border-[#EADFD1] pb-4">
          <h2 class="font-headline text-2xl sm:text-3xl font-extrabold text-[#231916]">
            ${isMm ? 'အကောင့် လုံခြုံရေးနှင့် ဆက်တင်များ' : 'Account Security & Preferences'}
          </h2>
        </div>

        ${
          isWithdrawn
            ? `
              <div class="bg-red-50 border border-red-200 rounded-2xl p-6 space-y-4">
                <div class="flex items-start gap-3">
                  <span class="material-symbols-outlined text-red-600 text-2xl shrink-0">cancel</span>
                  <div>
                    <h3 class="font-headline font-bold text-lg text-red-900">
                      ${isMm ? 'ဤအကောင့်ကို ဖျက်သိမ်းထားပါသည်' : 'This Account Has Been Withdrawn'}
                    </h3>
                    <p class="font-body text-xs text-red-700 mt-1">
                      ${isMm
                        ? 'ရက်ပေါင်း ၃၀ အတွင်း ကိုယ်ရေးအချက်အလက်များကို PDPA ဥပဒေနှင့်အညီ အပြီးပိုင်ဖျက်သိမ်းခြင်း လုပ်ဆောင်နေပါသည်။'
                        : 'Your account is scheduled for permanent deletion and PDPA anonymization within 30 days.'}
                    </p>
                  </div>
                </div>
                <button
                  id="u20-reactivate-account-btn"
                  class="btn-primary px-5 py-2 rounded-full font-label text-xs font-bold shadow-sm cursor-pointer"
                >
                  ${isMm ? 'အကောင့် ပြန်လည်အသက်သွင်းမည် (Demo)' : 'Reactivate Account (Demo)'}
                </button>
              </div>
            `
            : ''
        }

        <!-- 1. EMAIL ADDRESS CHANGE (COLLAPSIBLE ACCORDION) -->
        <div class="bg-[#FFFDFC] rounded-2xl border border-[#E8DDD0] shadow-xs overflow-hidden transition-all">
          <!-- Accordion Header Button -->
          <button
            type="button"
            data-accordion-toggle="email"
            class="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#F5EAD4]/50 transition-colors select-none"
          >
            <div class="flex items-center gap-3.5 min-w-0">
              <div class="w-10 h-10 rounded-xl bg-[#840f16]/10 text-[#840f16] flex items-center justify-center font-bold shrink-0">
                <span class="material-symbols-outlined text-xl">mail</span>
              </div>
              <div class="min-w-0">
                <h3 class="font-headline font-bold text-base sm:text-lg text-[#231916] truncate">
                  ${isMm ? 'အီးမေးလ်လိပ်စာ ပြောင်းလဲခြင်း' : 'Email Address Change'}
                </h3>
                <p class="font-body text-xs text-[#58413f] truncate">
                  <span class="font-mono text-[#231916] font-semibold">${myData.userEmail || 'alex@example.com'}</span>
                  ${myData.pendingNewEmail ? `<span class="text-amber-800 ml-1.5">(${isMm ? 'အသစ်စောင့်ဆိုင်းနေ:' : 'Pending:'} ${myData.pendingNewEmail})</span>` : ''}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3 shrink-0">
              <!-- Verification status pill -->
              <div>
                ${
                  myData.emailVerified
                    ? `
                      <span class="hidden sm:inline-flex items-center gap-1.5 bg-[#104b2b]/10 text-[#104b2b] border border-[#104b2b]/25 px-3 py-1 rounded-full font-label text-xs font-bold">
                        <span class="material-symbols-outlined text-xs">verified</span>
                        <span>${isMm ? 'အတည်ပြုပြီး' : 'Verified'}</span>
                      </span>
                    `
                    : `
                      <span class="hidden sm:inline-flex items-center gap-1.5 bg-amber-500/15 text-amber-800 border border-amber-500/30 px-3 py-1 rounded-full font-label text-xs font-bold">
                        <span class="material-symbols-outlined text-xs">warning</span>
                        <span>${isMm ? 'အတည်မပြုရသေး' : 'Unverified'}</span>
                      </span>
                    `
                }
              </div>
              <div class="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${isEmailOpen ? 'bg-[#840f16] text-white border border-[#840f16]' : 'bg-white text-[#58413f] border border-[#EADFD1]'}">
                <span class="material-symbols-outlined text-base select-none pointer-events-none">${isEmailOpen ? 'expand_less' : 'expand_more'}</span>
              </div>
            </div>
          </button>

          <!-- Accordion Body -->
          ${
            isEmailOpen
              ? `
                <div class="p-5 sm:p-6 pt-2 border-t border-[#E8DDD0] space-y-6 animate-fadeIn">
                  <!-- Pending Email Alert (If Any) -->
                  ${
                    myData.pendingNewEmail
                      ? `
                        <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div class="flex items-start gap-2.5">
                            <span class="material-symbols-outlined text-amber-700 text-lg shrink-0 mt-0.5">mark_email_unread</span>
                            <div>
                              <div class="font-headline font-bold text-xs text-amber-900">
                                ${isMm ? 'အတည်ပြုရန် စောင့်ဆိုင်းနေသော အီးမေးလ်အသစ်:' : 'Pending Email Verification:'}
                                <span class="font-mono text-amber-950 font-extrabold underline ml-1">${myData.pendingNewEmail}</span>
                              </div>
                              <div class="font-body text-[11px] text-amber-800 mt-0.5">
                                ${isMm ? 'အီးမေးလ်အသစ်ထံ ပို့ထားသော အတည်ပြုလင့်ခ်ကို နှိပ်ပြီးမှသာ အတည်ဖြစ်ပါမည်။' : 'Click the verification link sent to your new email inbox to complete the change.'}
                              </div>
                            </div>
                          </div>

                          <button
                            id="u20-simulate-verify-email-btn"
                            class="btn-primary px-4 py-1.5 rounded-full font-label text-xs font-bold shrink-0 cursor-pointer shadow-xs"
                          >
                            ${isMm ? 'လင့်ခ်နှိပ်ခြင်း စမ်းသပ်ရန်' : 'Simulate Verify Link'}
                          </button>
                        </div>
                      `
                      : ''
                  }

                  <form id="u20-email-change-form" class="space-y-4">
                    <!-- Current Email Display -->
                    <div>
                      <label class="block font-label text-xs font-bold text-[#231916] uppercase tracking-wider mb-1.5">
                        ${isMm ? 'လက်ရှိ အီးမေးလ်လိပ်စာ' : 'Current Email Address'}
                      </label>
                      <div class="w-full bg-[#EADFD1]/40 border border-[#EADFD1] rounded-xl px-4 py-2.5 font-body text-xs text-[#231916] font-medium flex items-center justify-between">
                        <span>${myData.userEmail || 'alex@example.com'}</span>
                        <span class="material-symbols-outlined text-[#8d7b75] text-sm">lock</span>
                      </div>
                    </div>

                    <!-- New Email Input -->
                    <div>
                      <label for="u20-input-new-email" class="block font-label text-xs font-bold text-[#231916] uppercase tracking-wider mb-1.5">
                        ${isMm ? 'အီးမေးလ်လိပ်စာ အသစ်' : 'New Email Address'} <span class="text-[#840f16]">*</span>
                      </label>
                      <input
                        type="email"
                        id="u20-input-new-email"
                        placeholder="${isMm ? 'ဥပမာ- user@example.com' : 'e.g. alex.new@example.com'}"
                        class="w-full bg-white border border-[#EADFD1] focus:border-[#840f16] rounded-xl px-4 py-2.5 font-body text-xs text-[#231916] placeholder:text-[#8d7b75] focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <!-- Re-authentication requirement -->
                    <div>
                      <label for="u20-email-confirm-pw" class="block font-label text-xs font-bold text-[#231916] uppercase tracking-wider mb-1.5">
                        ${isMm ? 'လုံခြုံရေး အတည်ပြုရန် စကားဝှက် ရိုက်ထည့်ပါ' : 'Security Re-authentication (Current Password)'} <span class="text-[#840f16]">*</span>
                      </label>
                      <div class="relative">
                        <input
                          type="password"
                          id="u20-email-confirm-pw"
                          placeholder="${isMm ? 'လက်ရှိ စကားဝှက် ရိုက်ထည့်ပါ' : 'Enter current account password'}"
                          class="w-full bg-[#FFF8F6] border border-[#EADFD1] focus:border-[#840f16] focus:bg-white rounded-xl pl-4 pr-11 py-2.5 font-body text-xs text-[#231916] placeholder:text-[#8d7b75] focus:outline-none transition-colors"
                          required
                        />
                        <button
                          type="button"
                          data-toggle-pw="u20-email-confirm-pw"
                          aria-label="Toggle password visibility"
                          class="absolute inset-y-0 right-0 pr-3.5 flex items-center justify-center text-[#8d7b75] hover:text-[#231916] transition-colors cursor-pointer"
                        >
                          ${EYE_ICON_SHOW}
                        </button>
                      </div>
                    </div>

                    <!-- OR SSO Re-authentication if Google auth -->
                    <div class="pt-1 flex items-center gap-3">
                      <div class="h-px bg-[#EADFD1] flex-1"></div>
                      <span class="font-label text-[11px] text-[#8d7b75] uppercase">${isMm ? 'သို့မဟုတ်' : 'Or via SSO'}</span>
                      <div class="h-px bg-[#EADFD1] flex-1"></div>
                    </div>

                    <button
                      type="button"
                      id="u20-sso-reauth-btn"
                      class="w-full bg-white border border-[#EADFD1] hover:border-[#231916] rounded-xl py-2.5 px-4 font-label text-xs font-semibold text-[#231916] flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <svg class="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                      </svg>
                      <span>${isMm ? 'Google အကောင့်ဖြင့် Re-authenticate ပြုလုပ်မည်' : 'Re-authenticate with Google'}</span>
                    </button>

                    <button
                      type="submit"
                      class="btn-primary px-6 py-2.5 rounded-full font-label text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-2"
                    >
                      <span class="material-symbols-outlined text-sm">send</span>
                      <span>${isMm ? 'အတည်ပြုလင့်ခ် ပို့မည်' : 'Send Verification Link'}</span>
                    </button>
                  </form>
                </div>
              `
              : ''
          }
        </div>


        <!-- 2. PASSWORD CHANGE (COLLAPSIBLE ACCORDION) -->
        <div class="bg-[#FFFDFC] rounded-2xl border border-[#E8DDD0] shadow-xs overflow-hidden transition-all">
          <!-- Accordion Header Button -->
          <button
            type="button"
            data-accordion-toggle="password"
            class="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#F5EAD4]/50 transition-colors select-none"
          >
            <div class="flex items-center gap-3.5 min-w-0">
              <div class="w-10 h-10 rounded-xl bg-[#840f16]/10 text-[#840f16] flex items-center justify-center font-bold shrink-0">
                <span class="material-symbols-outlined text-xl">key</span>
              </div>
              <div class="min-w-0">
                <h3 class="font-headline font-bold text-base sm:text-lg text-[#231916] truncate">
                  ${isMm ? 'စကားဝှက် ပြောင်းလဲခြင်း' : 'Password Change'}
                </h3>
                <p class="font-body text-xs text-[#58413f] truncate">
                  ${isMm ? 'အနည်းဆုံး စာလုံး (၈) လုံး၊ အင်္ဂလိပ်စာလုံးနှင့် ဂဏန်းတွဲ၍ ပြောင်းလဲပါ' : 'Minimum 8 characters with combination of letters and numbers'}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3 shrink-0">
              <div class="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${isPasswordOpen ? 'bg-[#840f16] text-white border border-[#840f16]' : 'bg-white text-[#58413f] border border-[#EADFD1]'}">
                <span class="material-symbols-outlined text-base select-none pointer-events-none">${isPasswordOpen ? 'expand_less' : 'expand_more'}</span>
              </div>
            </div>
          </button>

          <!-- Accordion Body -->
          ${
            isPasswordOpen
              ? `
                <div class="p-5 sm:p-6 pt-2 border-t border-[#E8DDD0] space-y-6 animate-fadeIn">
                  <form id="u20-password-change-form" class="space-y-4">
                    <!-- Current Password -->
                    <div>
                      <label for="u20-current-password" class="block font-label text-xs font-bold text-[#231916] uppercase tracking-wider mb-1.5">
                        ${isMm ? 'လက်ရှိ စကားဝှက်' : 'Current Password'} <span class="text-[#840f16]">*</span>
                      </label>
                      <div class="relative">
                        <input
                          type="password"
                          id="u20-current-password"
                          placeholder="${isMm ? 'လက်ရှိ စကားဝှက် ရိုက်ထည့်ပါ' : 'Enter current password'}"
                          class="w-full bg-white border border-[#EADFD1] focus:border-[#840f16] rounded-xl pl-4 pr-11 py-2.5 font-body text-xs text-[#231916] placeholder:text-[#8d7b75] focus:outline-none transition-colors"
                          required
                        />
                        <button
                          type="button"
                          data-toggle-pw="u20-current-password"
                          aria-label="Toggle password visibility"
                          class="absolute inset-y-0 right-0 pr-3.5 flex items-center justify-center text-[#8d7b75] hover:text-[#231916] transition-colors cursor-pointer"
                        >
                          ${EYE_ICON_SHOW}
                        </button>
                      </div>
                    </div>

                    <!-- New Password -->
                    <div>
                      <label for="u20-new-password" class="block font-label text-xs font-bold text-[#231916] uppercase tracking-wider mb-1.5">
                        ${isMm ? 'စကားဝှက်အသစ်' : 'New Password'} <span class="text-[#840f16]">*</span>
                      </label>
                      <div class="relative">
                        <input
                          type="password"
                          id="u20-new-password"
                          placeholder="${isMm ? 'စကားဝှက်အသစ် (အနည်းဆုံး ၈ လုံး၊ အင်္ဂလိပ်စာလုံး + ဂဏန်း)' : 'Enter new password (min 8 chars, letters + numbers)'}"
                          class="w-full bg-white border border-[#EADFD1] focus:border-[#840f16] rounded-xl pl-4 pr-11 py-2.5 font-body text-xs text-[#231916] placeholder:text-[#8d7b75] focus:outline-none transition-colors"
                          required
                        />
                        <button
                          type="button"
                          data-toggle-pw="u20-new-password"
                          aria-label="Toggle password visibility"
                          class="absolute inset-y-0 right-0 pr-3.5 flex items-center justify-center text-[#8d7b75] hover:text-[#231916] transition-colors cursor-pointer"
                        >
                          ${EYE_ICON_SHOW}
                        </button>
                      </div>
                    </div>

                    <!-- Confirm New Password -->
                    <div>
                      <label for="u20-confirm-password" class="block font-label text-xs font-bold text-[#231916] uppercase tracking-wider mb-1.5">
                        ${isMm ? 'စကားဝှက်အသစ်ကို ထပ်မံရိုက်ထည့်ပါ' : 'Confirm New Password'} <span class="text-[#840f16]">*</span>
                      </label>
                      <div class="relative">
                        <input
                          type="password"
                          id="u20-confirm-password"
                          placeholder="${isMm ? 'စကားဝှက်အသစ်ကို အတည်ပြုရန် ထပ်မံရိုက်ထည့်ပါ' : 'Re-enter new password'}"
                          class="w-full bg-white border border-[#EADFD1] focus:border-[#840f16] rounded-xl pl-4 pr-11 py-2.5 font-body text-xs text-[#231916] placeholder:text-[#8d7b75] focus:outline-none transition-colors"
                          required
                        />
                        <button
                          type="button"
                          data-toggle-pw="u20-confirm-password"
                          aria-label="Toggle password visibility"
                          class="absolute inset-y-0 right-0 pr-3.5 flex items-center justify-center text-[#8d7b75] hover:text-[#231916] transition-colors cursor-pointer"
                        >
                          ${EYE_ICON_SHOW}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      class="btn-primary px-6 py-2.5 rounded-full font-label text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-2"
                    >
                      <span class="material-symbols-outlined text-sm">lock_reset</span>
                      <span>${isMm ? 'စကားဝှက် အသစ်သိမ်းမည်' : 'Update Password'}</span>
                    </button>
                  </form>
                </div>
              `
              : ''
          }
        </div>


        <!-- 3. PHONE NUMBER CHANGE (COLLAPSIBLE ACCORDION) -->
        <div class="bg-[#FFFDFC] rounded-2xl border border-[#E8DDD0] shadow-xs overflow-hidden transition-all">
          <!-- Accordion Header Button -->
          <button
            type="button"
            data-accordion-toggle="phone"
            class="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#F5EAD4]/50 transition-colors select-none"
          >
            <div class="flex items-center gap-3.5 min-w-0">
              <div class="w-10 h-10 rounded-xl bg-[#840f16]/10 text-[#840f16] flex items-center justify-center font-bold shrink-0">
                <span class="material-symbols-outlined text-xl">phone_iphone</span>
              </div>
              <div class="min-w-0">
                <h3 class="font-headline font-bold text-base sm:text-lg text-[#231916] truncate">
                  ${isMm ? 'ဖုန်းနံပါတ် ပြောင်းလဲခြင်း' : 'Phone Number Change'}
                </h3>
                <p class="font-body text-xs text-[#58413f] truncate">
                  <span class="font-mono text-[#231916] font-semibold">${myData.userPhone || '+95 9 791 234 567'}</span>
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3 shrink-0">
              <!-- Phone Verification Status Badge -->
              <div>
                ${
                  myData.phoneVerified
                    ? `
                      <span class="hidden sm:inline-flex items-center gap-1.5 bg-[#104b2b]/10 text-[#104b2b] border border-[#104b2b]/25 px-3 py-1 rounded-full font-label text-xs font-bold">
                        <span class="material-symbols-outlined text-xs">check_circle</span>
                        <span>Verified</span>
                      </span>
                    `
                    : `
                      <span class="hidden sm:inline-flex items-center gap-1.5 bg-amber-500/15 text-amber-800 border border-amber-500/30 px-3 py-1 rounded-full font-label text-xs font-bold animate-pulse">
                        <span class="material-symbols-outlined text-xs">pending</span>
                        <span>Unverified</span>
                      </span>
                    `
                }
              </div>
              <div class="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${isPhoneOpen ? 'bg-[#840f16] text-white border border-[#840f16]' : 'bg-white text-[#58413f] border border-[#EADFD1]'}">
                <span class="material-symbols-outlined text-base select-none pointer-events-none">${isPhoneOpen ? 'expand_less' : 'expand_more'}</span>
              </div>
            </div>
          </button>

          <!-- Accordion Body -->
          ${
            isPhoneOpen
              ? `
                <div class="p-5 sm:p-6 pt-2 border-t border-[#E8DDD0] space-y-6 animate-fadeIn">
                  <!-- Phone Number Policy Note -->
                  <div class="bg-amber-50/70 rounded-xl p-4 border border-amber-200 text-xs font-body text-amber-900 space-y-1">
                    <div class="font-bold flex items-center gap-1.5 text-amber-950">
                      <span class="material-symbols-outlined text-sm text-amber-700">warning</span>
                      <span>${isMm ? 'အရေးကြီး သတိပေးချက်' : 'Important Note on Phone Verification'}</span>
                    </div>
                    <p>
                      ${isMm
                        ? 'ဖုန်းနံပါတ် ပြောင်းလဲလိုက်ပါက <code class="bg-amber-100 font-mono px-1.5 py-0.5 rounded text-amber-950 font-bold">phone_verified</code> အခြေအနေသည် "FALSE" (အတည်မပြုရသေး) အဖြစ် အလိုအလျောက် ပြန်လည်ပြောင်းလဲသွားမည်ဖြစ်ပြီး OTP ဖြင့် ပြန်လည်အတည်ပြုရန် လိုအပ်ပါသည်။'
                        : 'When the phone number is changed, the `phone_verified` status will automatically reset to "FALSE" (Unverified) until confirmed via SMS OTP verification.'}
                    </p>
                  </div>

                  <form id="u20-phone-change-form" class="space-y-4">
                    <!-- Current Phone -->
                    <div>
                      <label class="block font-label text-xs font-bold text-[#231916] uppercase tracking-wider mb-2.5">
                        ${isMm ? 'လက်ရှိ ဖုန်းနံပါတ်' : 'Current Phone Number'}
                      </label>
                      <div class="w-full bg-[#EADFD1]/40 border border-[#EADFD1] rounded-xl px-4 py-2.5 font-body text-xs text-[#231916] font-medium flex items-center justify-between">
                        <span>${myData.userPhone || '+95 9 791 234 567'}</span>
                        <span class="material-symbols-outlined text-[#8d7b75] text-sm">call</span>
                      </div>
                    </div>

                    <!-- New Phone Input with Myanmar Prefix -->
                    <div>
                      <label for="u20-input-new-phone" class="block font-label text-xs font-bold text-[#231916] uppercase tracking-wider mb-2.5">
                        ${isMm ? 'ဖုန်းနံပါတ် အသစ်ထည့်ရန်' : 'New Phone Number'} <span class="text-[#840f16]">*</span>
                      </label>
                      <div class="flex items-center gap-2">
                        <div class="bg-[#EADFD1]/60 border border-[#EADFD1] rounded-xl px-3.5 py-2.5 font-label font-bold text-xs text-[#231916] shrink-0 flex items-center gap-1.5">
                          <span>🇲🇲</span>
                          <span>+95</span>
                        </div>
                        <input
                          type="tel"
                          id="u20-input-new-phone"
                          placeholder="09 791 234 567 or 9791234567"
                          class="flex-1 bg-white border border-[#EADFD1] focus:border-[#840f16] rounded-xl px-4 py-2.5 font-body text-xs text-[#231916] focus:outline-none transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div class="flex flex-wrap items-center gap-3">
                      <button
                        type="submit"
                        class="btn-primary px-6 py-2.5 rounded-full font-label text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-2"
                      >
                        <span class="material-symbols-outlined text-sm">sms</span>
                        <span>${isMm ? 'ဖုန်းနံပါတ်ပြောင်းလဲပြီး OTP ရယူမည်' : 'Update & Verify via OTP'}</span>
                      </button>

                      ${
                        !myData.phoneVerified
                          ? `
                            <button
                              type="button"
                              id="u20-open-otp-modal-btn"
                              class="bg-white border border-[#840f16] text-[#840f16] hover:bg-[#840f16] hover:text-white px-4 py-2.5 rounded-full font-label text-xs font-bold transition-colors cursor-pointer"
                            >
                              ${isMm ? 'OTP ကုဒ် ရိုက်ထည့်ရန်' : 'Enter OTP Verification Code'}
                            </button>
                          `
                          : ''
                      }
                    </div>
                  </form>
                </div>
              `
              : ''
          }
        </div>


        <!-- 4. ACCOUNT WITHDRAWAL (COLLAPSIBLE ACCORDION) -->
        <div class="bg-[#FFFDFC] rounded-2xl border border-[#840f16]/30 shadow-xs overflow-hidden transition-all">
          <!-- Accordion Header Button -->
          <button
            type="button"
            data-accordion-toggle="withdrawal"
            class="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[#840f16]/5 transition-colors select-none"
          >
            <div class="flex items-center gap-3.5 min-w-0">
              <div class="w-10 h-10 rounded-xl bg-[#840f16] text-white flex items-center justify-center font-bold shrink-0">
                <span class="material-symbols-outlined text-xl">warning</span>
              </div>
              <div class="min-w-0">
                <h3 class="font-headline font-bold text-base sm:text-lg text-[#840f16] truncate">
                  ${isMm ? 'အကောင့်ဖျက်သိမ်းခြင်း' : 'Account Withdrawal (Permanent Deletion)'}
                </h3>
                <p class="font-body text-xs text-[#58413f] truncate">
                  ${isMm ? 'အကောင့်ဖျက်သိမ်းခြင်းဆိုင်ရာ စည်းမျဉ်းများ၊ ကြိုတင်မှာယူမှုများနှင့် PDPA ဥပဒေ' : 'Irreversible deletion, reservation cancellation, and PDPA compliance'}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3 shrink-0">
              <span class="hidden sm:inline-block font-label text-xs text-[#840f16] font-semibold bg-[#840f16]/10 px-2.5 py-1 rounded-full">${isMm ? 'သတိပေးချက်' : 'Danger Zone'}</span>
              <div class="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${isWithdrawOpen ? 'bg-[#840f16] text-white border border-[#840f16]' : 'bg-white text-[#840f16] border border-[#EADFD1]'}">
                <span class="material-symbols-outlined text-base select-none pointer-events-none">${isWithdrawOpen ? 'expand_less' : 'expand_more'}</span>
              </div>
            </div>
          </button>

          <!-- Accordion Body -->
          ${
            isWithdrawOpen
              ? `
                <div class="p-5 sm:p-6 pt-2 border-t border-[#840f16]/20 space-y-6 animate-fadeIn">
                  <!-- Comprehensive Withdrawal Terms Grid -->
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <!-- Irreversible Warning -->
                    <div class="bg-white p-4 rounded-xl border border-[#EADFD1] space-y-2">
                      <div class="flex items-center gap-2 text-xs font-label font-bold text-[#840f16]">
                        <span class="material-symbols-outlined text-base">block</span>
                        <span>${isMm ? 'သတိပေးချက်' : 'Irreversible'}</span>
                      </div>
                      <p class="font-body text-[11px] text-[#58413f] leading-relaxed">
                        ${isMm
                          ? 'အကောင့်ဖျက်သိမ်းပြီးပါက မည်သည့်နည်းနှင့်မျှ ပြန်လည်ရယူနိုင်တော့မည် မဟုတ်ပါ။ စုဆောင်းထားသော Points များနှင့် VIP အခွင့်အရေးများ ဆုံးရှုံးပါမည်။'
                          : 'Account deletion is permanent. Once withdrawn, member points and VIP perks cannot be restored.'}
                      </p>
                    </div>

                    <!-- Upcoming Reservations Policy -->
                    <div class="bg-white p-4 rounded-xl border border-[#EADFD1] space-y-2">
                      <div class="flex items-center gap-2 text-xs font-label font-bold text-[#840f16]">
                        <span class="material-symbols-outlined text-base">event_busy</span>
                        <span>${isMm ? 'ကြိုတင်မှာယူမှုများ' : 'Upcoming Bookings'}</span>
                      </div>
                      <p class="font-body text-[11px] text-[#58413f] leading-relaxed">
                        ${isMm
                          ? `အကောင့်ဖျက်လိုက်တာနှင့် လာရောက်ရန်ကျန်ရှိသော စိုတ်ထားမှုများ (${upcomingReservations.length} ခု) အလိုအလျောက် ပယ်ဖျက်သွားပါမည်။ ဆိုင်၏ Cancellation Policy အရ ပယ်ဖျက်ခ ရှိနိုင်ပါသည်။`
                          : `All active upcoming reservations (${upcomingReservations.length}) will be auto-cancelled. Restaurant cancellation policies/fees may still apply.`}
                      </p>
                    </div>

                    <!-- PDPA Data Anonymization -->
                    <div class="bg-white p-4 rounded-xl border border-[#EADFD1] space-y-2">
                      <div class="flex items-center gap-2 text-xs font-label font-bold text-[#104b2b]">
                        <span class="material-symbols-outlined text-base">shield</span>
                        <span>${isMm ? 'ကိုယ်ရေးအချက်အလက် (PDPA)' : 'PDPA Anonymization'}</span>
                      </div>
                      <p class="font-body text-[11px] text-[#58413f] leading-relaxed">
                        ${isMm
                          ? 'အကောင့်ဖျက်ပြီး ရက်ပေါင်း ၃၀ အတွင်း သင်၏ ကိုယ်ရေးအချက်အလက်များကို PDPA ဥပဒေနှင့်အညီ အပြီးပိုင်ဖျက်သိမ်းခြင်း သို့မဟုတ် Anonymization ဆောင်ရွက်ပေးပါမည်။'
                          : 'Personal records are purged or anonymized within 30 days in strict accordance with PDPA regulations.'}
                      </p>
                    </div>

                  </div>

                  <!-- Withdrawal Reason & Confirmation Form -->
                  <form id="u20-withdrawal-form" class="space-y-4 pt-2">
                    <div>
                      <label for="u20-withdraw-reason" class="block font-label text-xs font-bold text-[#231916] uppercase tracking-wider mb-1.5">
                        ${isMm ? 'ဖျက်သိမ်းရသည့် အကြောင်းရင်း ရွေးချယ်ပါ' : 'Reason for Account Withdrawal'} <span class="text-[#840f16]">*</span>
                      </label>
                      <select
                        id="u20-withdraw-reason"
                        class="w-full bg-white border border-[#EADFD1] focus:border-[#840f16] rounded-xl px-4 py-2.5 font-body text-xs text-[#231916] focus:outline-none cursor-pointer"
                        required
                      >
                        <option value="" disabled selected>${isMm ? '-- အကြောင်းရင်း ရွေးချယ်ရန် --' : '-- Select a primary reason --'}</option>
                        <option value="no_longer_using">${isMm ? 'အသုံးမပြုတော့သောကြောင့် (No longer using the service)' : 'No longer using the service'}</option>
                        <option value="switch_account">${isMm ? 'အခြားအကောင့်တစ်ခု ပြောင်းလဲအသုံးပြုလို၍ (Switching to another account)' : 'Switching to another account'}</option>
                        <option value="booking_issues">${isMm ? 'စားပွဲဝိုင်း ကြိုတင်မှာယူမှု ပြဿနာများကြောင့် (Booking/reservation difficulties)' : 'Booking difficulties'}</option>
                        <option value="unsatisfied">${isMm ? 'စနစ် သို့မဟုတ် ဝန်ဆောင်မှုအား မနှစ်သက်၍ (Unsatisfied with service)' : 'Unsatisfied with service'}</option>
                        <option value="other">${isMm ? 'အခြား အကြောင်းပြချက် (Other reason)' : 'Other reason'}</option>
                      </select>
                    </div>

                    <div>
                      <label for="u20-withdraw-feedback" class="block font-label text-xs font-bold text-[#231916] uppercase tracking-wider mb-1.5">
                        ${isMm ? 'ဖြည့်စွက် အကြံပြုချက် (ရွေးချယ်နိုင်သည်)' : 'Additional Feedback (Optional)'}
                      </label>
                      <textarea
                        id="u20-withdraw-feedback"
                        rows="2"
                        placeholder="${isMm ? 'ကျွန်ုပ်တို့၏ ဝန်ဆောင်မှုကို တိုးတက်ကောင်းမွန်စေရန် အကြံပြုချက် ရေးသားနိုင်ပါသည်...' : 'Help us improve by leaving any additional remarks...'}"
                        class="w-full bg-white border border-[#EADFD1] focus:border-[#840f16] rounded-xl p-3 font-body text-xs text-[#231916] focus:outline-none"
                      ></textarea>
                    </div>

                    <!-- Final Agreement Checkbox -->
                    <label class="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-red-200 cursor-pointer select-none">
                      <input type="checkbox" id="u20-withdraw-confirm-checkbox" class="mt-0.5 rounded text-[#840f16] focus:ring-[#840f16] w-4 h-4" required />
                      <span class="font-body text-xs text-[#231916] font-medium leading-relaxed">
                        ${isMm
                          ? 'အထက်ဖော်ပြပါ သတိပေးချက်များ၊ လာမည့် စားပွဲဝိုင်း စိုတ်ထားမှုများ အလိုအလျောက် ပယ်ဖျက်ခံရမည့် စည်းကမ်းများနှင့် ရက်ပေါင်း ၃၀ အတွင်း PDPA ဒေတာဖျက်သိမ်းမှုတို့ကို သဘောတူလက်ခံပါသည်။'
                          : 'I understand that this action is irreversible, my upcoming reservations will be automatically cancelled, and my personal data will be processed per PDPA 30-day deletion.'}
                      </span>
                    </label>

                    <button
                      type="submit"
                      class="w-full sm:w-auto bg-[#840f16] hover:bg-[#6b0c12] text-white px-8 py-3 rounded-full font-label font-bold text-xs shadow-md transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                    >
                      <span class="material-symbols-outlined text-sm">person_remove</span>
                      <span>${isMm ? 'အကောင့် အပြီးပိုင် ဖျက်သိမ်းမည်' : 'Permanently Delete My Account'}</span>
                    </button>
                  </form>
                </div>
              `
              : ''
          }
        </div>

      </div>
    `;
  }

  function attachAccountSettingsEvents(containerElement = document) {
    // 0. Accordion header toggle listener
    containerElement.querySelectorAll('[data-accordion-toggle]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const section = e.currentTarget.getAttribute('data-accordion-toggle');
        expandedSection = expandedSection === section ? null : section;
        // Re-render
        if (store.notify) {
          store.notify();
        }
      });
    });

    // 1. Password input toggle visibility
    containerElement.querySelectorAll('[data-toggle-pw]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const button = e.currentTarget;
        const targetInputId = button.getAttribute('data-toggle-pw');
        const input = containerElement.querySelector(`#${targetInputId}`);
        if (input) {
          const isCurrentlyPassword = input.type === 'password';
          input.type = isCurrentlyPassword ? 'text' : 'password';
          button.innerHTML = isCurrentlyPassword ? EYE_ICON_HIDE : EYE_ICON_SHOW;
          button.setAttribute('aria-label', isCurrentlyPassword ? 'Hide password' : 'Show password');
        }
      });
    });

    // 2. Email change form submission
    const emailForm = containerElement.querySelector('#u20-email-change-form');
    if (emailForm) {
      emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newEmailInput = containerElement.querySelector('#u20-input-new-email');
        const newEmail = newEmailInput ? newEmailInput.value.trim() : '';
        const isMm = store.getState().currentLanguage === 'MM';

        if (!newEmail || !newEmail.includes('@')) {
          store.showToast(isMm ? 'ကျေးဇူးပြု၍ အီးမေးလ်လိပ်စာ မှန်ကန်စွာ ထည့်ပါ' : 'Please enter a valid email address.');
          return;
        }

        store.requestEmailChange(newEmail);
        store.showToast(
          isMm
            ? `အတည်ပြုလင့်ခ်ကို ${newEmail} သို့ ပေးပို့ထားပါသည်။`
            : `Verification link sent to ${newEmail}!`
        );
      });
    }

    // 3. Simulate email verification link
    const simEmailBtn = containerElement.querySelector('#u20-simulate-verify-email-btn');
    if (simEmailBtn) {
      simEmailBtn.addEventListener('click', () => {
        const isMm = store.getState().currentLanguage === 'MM';
        store.confirmPendingEmail();
        store.showToast(
          isMm
            ? 'အီးမေးလ်လိပ်စာ အသစ် အောင်မြင်စွာ အတည်ပြုပြီးပါပြီ။'
            : 'Email address updated and verified successfully!'
        );
      });
    }

    // 4. SSO Re-authentication button
    const ssoBtn = containerElement.querySelector('#u20-sso-reauth-btn');
    if (ssoBtn) {
      ssoBtn.addEventListener('click', () => {
        store.showToast('SSO Re-authentication verified.');
      });
    }

    // 5. Password real-time validation checklist
    const newPwInput = containerElement.querySelector('#u20-new-password');
    const confirmPwInput = containerElement.querySelector('#u20-confirm-password');

    function checkPasswordStrength() {
      const val = newPwInput ? newPwInput.value : '';
      const confirmVal = confirmPwInput ? confirmPwInput.value : '';

      const lenValid = val.length >= 8;
      const letterValid = /[a-zA-Z]/.test(val);
      const numValid = /[0-9]/.test(val);
      const matchValid = val.length > 0 && val === confirmVal;

      function updateBadge(id, isValid) {
        const el = containerElement.querySelector(`#${id}`);
        if (!el) return;
        if (isValid) {
          el.className = 'flex items-center gap-1.5 p-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold';
          const icon = el.querySelector('.material-symbols-outlined');
          if (icon) icon.innerText = 'check_circle';
        } else {
          el.className = 'flex items-center gap-1.5 p-2 rounded-xl bg-white border border-[#EADFD1] text-[#8d7b75]';
          const icon = el.querySelector('.material-symbols-outlined');
          if (icon) icon.innerText = 'radio_button_unchecked';
        }
      }

      updateBadge('u20-req-len', lenValid);
      updateBadge('u20-req-letter', letterValid);
      updateBadge('u20-req-num', numValid);
      updateBadge('u20-req-match', matchValid);

      return lenValid && letterValid && numValid && matchValid;
    }

    if (newPwInput) newPwInput.addEventListener('input', checkPasswordStrength);
    if (confirmPwInput) confirmPwInput.addEventListener('input', checkPasswordStrength);

    // 6. Password change form submission
    const pwForm = containerElement.querySelector('#u20-password-change-form');
    if (pwForm) {
      pwForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const isMm = store.getState().currentLanguage === 'MM';
        const isAllValid = checkPasswordStrength();

        if (!isAllValid) {
          store.showToast(
            isMm
              ? 'စကားဝှက်သည် အနည်းဆုံး ၈ လုံး၊ အင်္ဂလိပ်စာလုံးနှင့် ဂဏန်း ပါဝင်ပြီး တူညီရပါမည်။'
              : 'Password must have 8+ characters, letters, numbers, and match.'
          );
          return;
        }

        // Reset form
        pwForm.reset();
        checkPasswordStrength();
        store.showToast(
          isMm
            ? 'စကားဝှက်အသစ် ပြောင်းလဲပြီးပါပြီ။'
            : 'Password updated successfully!'
        );
      });
    }

    // 7. Phone number change form submission
    const phoneForm = containerElement.querySelector('#u20-phone-change-form');
    if (phoneForm) {
      phoneForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const isMm = store.getState().currentLanguage === 'MM';
        const phoneInput = containerElement.querySelector('#u20-input-new-phone');
        let newPhone = phoneInput ? phoneInput.value.trim() : '';

        if (!newPhone) {
          store.showToast(isMm ? 'ကျေးဇူးပြု၍ ဖုန်းနံပါတ် ထည့်ပါ' : 'Please enter a valid phone number.');
          return;
        }

        // Format to +95 standard
        if (newPhone.startsWith('09')) {
          newPhone = '+95 9 ' + newPhone.substring(2).replace(/(\d{3})(\d{3,4})/, '$1 $2');
        } else if (!newPhone.startsWith('+95')) {
          newPhone = '+95 ' + newPhone;
        }

        store.updatePhoneNumber(newPhone);
        store.showToast(
          isMm
            ? `ဖုန်းနံပါတ် ${newPhone} သို့ ပြောင်းလဲထားပါသည်။ OTP ဖြင့် အတည်ပြုပါ (phone_verified: FALSE)`
            : `Phone updated to ${newPhone}. Verification status reset to FALSE.`
        );

        // Open interactive OTP modal
        store.openMyPageModal('phone_otp');
      });
    }

    // 8. Open OTP verification modal manually
    const openOtpBtn = containerElement.querySelector('#u20-open-otp-modal-btn');
    if (openOtpBtn) {
      openOtpBtn.addEventListener('click', () => {
        store.openMyPageModal('phone_otp');
      });
    }

    // 9. Account Withdrawal form submission
    const withdrawForm = containerElement.querySelector('#u20-withdrawal-form');
    if (withdrawForm) {
      withdrawForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const reasonSelect = containerElement.querySelector('#u20-withdraw-reason');
        const feedbackInput = containerElement.querySelector('#u20-withdraw-feedback');
        const confirmCheck = containerElement.querySelector('#u20-withdraw-confirm-checkbox');
        const isMm = store.getState().currentLanguage === 'MM';

        if (!reasonSelect || !reasonSelect.value) {
          store.showToast(isMm ? 'ကျေးဇူးပြု၍ ဖျက်သိမ်းရသည့် အကြောင်းရင်း ရွေးချယ်ပါ' : 'Please select a reason for withdrawal.');
          return;
        }

        if (!confirmCheck || !confirmCheck.checked) {
          store.showToast(isMm ? 'စည်းကမ်းချက်များကို သဘောတူရန် အမှန်ခြစ်ပါ' : 'Please confirm that you agree to the conditions.');
          return;
        }

        const reason = reasonSelect.options[reasonSelect.selectedIndex].text;
        const feedback = feedbackInput ? feedbackInput.value.trim() : '';

        // Open final confirmation modal in MyPage
        store.openMyPageModal('confirm_withdrawal');
        store.updateMyPageData(data => ({
          ...data,
          draftWithdrawReason: reason,
          draftWithdrawFeedback: feedback
        }));
      });
    }

    // 10. Reactivate Account (Demo)
    const reactivateBtn = containerElement.querySelector('#u20-reactivate-account-btn');
    if (reactivateBtn) {
      reactivateBtn.addEventListener('click', () => {
        const isMm = store.getState().currentLanguage === 'MM';
        store.reactivateAccount();
        store.showToast(isMm ? 'အကောင့်ကို ပြန်လည်အသက်သွင်းပြီးပါပြီ' : 'Account reactivated successfully!');
      });
    }
  }

  window.YoyakuComponents.renderAccountSettingsView = renderAccountSettingsView;
  window.YoyakuComponents.attachAccountSettingsEvents = attachAccountSettingsEvents;
})();
