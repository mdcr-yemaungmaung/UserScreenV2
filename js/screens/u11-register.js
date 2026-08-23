(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;

  function renderRegisterView(state) {
    const isMm = state.currentLanguage === 'MM';
    const regState = state.registerState || {};
    const errors = regState.errors || {};
    const isLoading = regState.isLoading;
    const loadingAction = regState.loadingAction;

    return `
      <div class="login-screen-bg py-8 px-4 sm:px-6">
        <div class="w-full max-w-md mx-auto flex flex-col items-center">
          
          <!-- Brand Logo & Header -->
          <div class="mb-2">
            <svg style="width: 48px; height: 58px;" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="regPinLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#93181F"/>
                  <stop offset="100%" stop-color="#7C0E15"/>
                </linearGradient>
                <linearGradient id="regPinRight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#6F0A11"/>
                  <stop offset="100%" stop-color="#55050A"/>
                </linearGradient>
              </defs>
              <path d="M 100 12 C 58 12 24 46 24 88 C 24 128 62 170 100 216 L 100 12 Z" fill="url(#regPinLeft)" />
              <path d="M 100 12 L 100 216 C 138 170 176 128 176 88 C 176 46 142 12 100 12 Z" fill="url(#regPinRight)" />
              <path d="M 93 208 C 94 185 88 150 78 126 C 67 99 68 56 100 56 C 132 56 133 99 122 126 C 112 150 106 185 107 208 Z" fill="#FFF7E8" />
              <circle cx="100" cy="94" r="14" fill="#7C0E15" />
              <circle cx="98" cy="92" r="13" fill="#93181F" />
            </svg>
          </div>
          <h1 class="login-brand-title font-headline font-black text-[#1B2028]">Yoyaku</h1>

          <!-- Main Auth Card -->
          <div class="login-card-container w-full shadow-lg border border-[#EADFD1] bg-white rounded-3xl overflow-hidden mt-5" id="register-card-container">
            
            <!-- Auth Navigation Tabs (Sign Up active, Login switchable) -->
            <div class="login-tabs-header">
              <button 
                id="tab-btn-register"
                class="login-tab-button active"
              >
                ${isMm ? 'အကောင့်သစ်ဖွင့်ရန်' : 'Sign Up'}
              </button>
              <button 
                id="tab-btn-login-from-reg"
                class="login-tab-button"
              >
                ${isMm ? 'အကောင့်ဝင်ရန်' : 'Sign In'}
              </button>
            </div>

            <div class="login-card-content p-5 sm:p-6 space-y-4">
              
              <!-- Screen Title -->
              <div class="text-center pb-1">
                <h2 class="text-lg sm:text-xl font-headline font-bold text-[#231916]">
                  ${isMm ? 'အကောင့်အသစ် ဖွင့်ပါ' : 'Create Your Account'}
                </h2>
              </div>

              <!-- General Error Banner if any -->
              ${errors.general ? `
                <div class="lookup-error-banner" id="register-general-error">
                  <span class="material-symbols-outlined text-sm shrink-0">error</span>
                  <span>${errors.general}</span>
                </div>
              ` : ''}

              <!-- 3 Registration Methods -->
              <div class="space-y-2.5">
                
                <!-- 1. Facebook SSO Button -->
                <button
                  type="button"
                  id="btn-register-sso-facebook"
                  class="btn-auth-facebook w-full flex items-center justify-center gap-2.5 py-3 rounded-2xl cursor-pointer"
                  ${isLoading ? 'disabled' : ''}
                >
                  ${isLoading && loadingAction === 'facebook' ? `
                    <span class="material-symbols-outlined animate-spin text-base">progress_activity</span>
                    <span>${isMm ? 'ချိတ်ဆက်နေသည်...' : 'Connecting...'}</span>
                  ` : `
                    <svg class="w-5 h-5" viewBox="0 0 24 24" style="width: 20px; height: 20px; flex-shrink: 0; fill: #ffffff;" fill="#ffffff">
                      <path fill="#ffffff" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span class="text-white">${isMm ? 'Facebook ဖြင့် အကောင့်ဖွင့်ရန်' : 'Register with Facebook'}</span>
                  `}
                </button>

                <!-- 2. Google SSO Button -->
                <button
                  type="button"
                  id="btn-register-sso-google"
                  class="btn-auth-google w-full flex items-center justify-center gap-2.5 py-3 rounded-2xl cursor-pointer"
                  ${isLoading ? 'disabled' : ''}
                >
                  ${isLoading && loadingAction === 'google' ? `
                    <span class="material-symbols-outlined animate-spin text-base">progress_activity</span>
                    <span>${isMm ? 'ချိတ်ဆက်နေသည်...' : 'Connecting...'}</span>
                  ` : `
                    <svg class="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>${isMm ? 'Google ဖြင့် အကောင့်ဖွင့်ရန်' : 'Register with Google'}</span>
                  `}
                </button>

                <!-- 3. Register with Email Trigger Button -->
                <button
                  type="button"
                  id="btn-toggle-email-register-form"
                  class="btn-auth-email w-full flex items-center justify-center gap-2 py-3 rounded-2xl cursor-pointer ${regState.showEmailForm ? 'border-[#840f16] bg-[#FBF3E2] text-[#840f16]' : ''}"
                >
                  <span class="material-symbols-outlined" style="font-size: 1.125rem; color: #443632;">mail</span>
                  <span>${isMm ? 'အီးမေးလ်ဖြင့် အကောင့်ဖွင့်ရန်' : 'Register with Email'}</span>
                  <span class="material-symbols-outlined text-sm transition-transform ${regState.showEmailForm ? 'rotate-180' : ''}">
                    expand_more
                  </span>
                </button>

              </div>

              <!-- Collapsible Email Registration Form -->
              ${regState.showEmailForm ? `
                <div class="pt-3 border-t border-[#EADFD1] space-y-4 animate-fadeIn" id="email-registration-section">
                  
                  <form id="u11-email-registration-form" class="space-y-3.5 text-left">
                    
                    <!-- 1. Full Name (1 to 100 characters, Unicode) -->
                    <div class="space-y-1">
                      <label class="block text-xs font-bold text-[#840f16] uppercase tracking-wide">
                        ${isMm ? 'အမည် (Full Name) *' : 'Full Name *'}
                      </label>
                      <div class="relative">
                        <input
                          type="text"
                          id="u11-reg-name"
                          required
                          maxlength="100"
                          value="${regState.name || ''}"
                          placeholder="${isMm ? 'ဥပမာ - မောင်မောင် သို့မဟုတ် Alex Aung' : 'e.g. Alex Aung'}"
                          class="login-form-input w-full ${errors.name ? 'border-[#840f16] bg-[#FFF0EE]' : ''}"
                        />
                      </div>
                      ${errors.name ? `
                        <p class="text-[11px] text-[#840f16] font-semibold mt-0.5">${errors.name}</p>
                      ` : `
                        <p class="text-[10px] text-[#8d7b75]">${isMm ? 'စာလုံးရေ ၁ မှ ၁၀၀ လုံးအတွင်း (မြန်မာ/အင်္ဂလိပ် ရေးနိုင်ပါသည်)' : '1-100 characters (Unicode & English supported)'}</p>
                      `}
                    </div>

                    <!-- 2. Email Address (Uniqueness check) -->
                    <div class="space-y-1">
                      <label class="block text-xs font-bold text-[#840f16] uppercase tracking-wide">
                        ${isMm ? 'အီးမေးလ်လိပ်စာ (Email Address) *' : 'Email Address *'}
                      </label>
                      <input
                        type="email"
                        id="u11-reg-email"
                        required
                        value="${regState.email || ''}"
                        placeholder="yourname@example.com"
                        class="login-form-input w-full ${errors.email ? 'border-[#840f16] bg-[#FFF0EE]' : ''}"
                      />
                      ${errors.email ? `
                        <div class="flex items-center gap-1 text-[11px] text-[#840f16] font-bold mt-0.5 bg-[#FFF0EE] p-1.5 rounded-lg border border-[#840f16]/30">
                          <span class="material-symbols-outlined text-xs shrink-0">error</span>
                          <span>${errors.email}</span>
                        </div>
                      ` : `
                        <p class="text-[10px] text-[#8d7b75]">${isMm ? 'အတည်ပြုလင့်ခ် (MAIL-01) လက်ခံရရှိရန် မှန်ကန်သောအီးမေးလ် ထည့်ပါ' : 'Verification link will be sent to this email'}</p>
                      `}
                    </div>

                    <!-- 3. Password (Min 8 chars, letters & numbers) -->
                    <div class="space-y-1">
                      <label class="block text-xs font-bold text-[#840f16] uppercase tracking-wide">
                        ${isMm ? 'စကားဝှက် (Password) *' : 'Password *'}
                      </label>
                      <div class="relative flex items-center">
                        <input
                          type="${regState.showPassword ? 'text' : 'password'}"
                          id="u11-reg-password"
                          required
                          minlength="8"
                          value="${regState.password || ''}"
                          placeholder="••••••••••••"
                          class="login-form-input w-full pr-10 ${errors.password ? 'border-[#840f16] bg-[#FFF0EE]' : ''}"
                        />
                        <button
                          type="button"
                          id="u11-toggle-pw-visibility"
                          class="absolute right-3 text-[#58413f] hover:text-[#840f16] cursor-pointer p-1"
                          title="Toggle password visibility"
                        >
                          <span class="material-symbols-outlined text-lg">
                            ${regState.showPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                      ${errors.password ? `
                        <p class="text-[11px] text-[#840f16] font-semibold mt-0.5">${errors.password}</p>
                      ` : `
                        <p class="text-[10px] text-[#8d7b75]">${isMm ? 'အနည်းဆုံး ၈ လုံးရှိရမည်ဖြစ်ပြီး အင်္ဂလိပ်စာလုံးနှင့် ဂဏန်းများ ပါဝင်ရမည်' : 'Min 8 characters, alphanumeric required'}</p>
                      `}
                    </div>

                    <!-- 4. Confirm Password (Must match) -->
                    <div class="space-y-1">
                      <label class="block text-xs font-bold text-[#840f16] uppercase tracking-wide">
                        ${isMm ? 'စကားဝှက်အတည်ပြုခြင်း (Confirm Password) *' : 'Confirm Password *'}
                      </label>
                      <div class="relative flex items-center">
                        <input
                          type="${regState.showConfirmPassword ? 'text' : 'password'}"
                          id="u11-reg-confirm-password"
                          required
                          value="${regState.confirmPassword || ''}"
                          placeholder="••••••••••••"
                          class="login-form-input w-full pr-10 ${errors.confirmPassword ? 'border-[#840f16] bg-[#FFF0EE]' : ''}"
                        />
                        <button
                          type="button"
                          id="u11-toggle-confirm-pw-visibility"
                          class="absolute right-3 text-[#58413f] hover:text-[#840f16] cursor-pointer p-1"
                          title="Toggle confirm password visibility"
                        >
                          <span class="material-symbols-outlined text-lg">
                            ${regState.showConfirmPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                      ${errors.confirmPassword ? `
                        <p class="text-[11px] text-[#840f16] font-semibold mt-0.5">${errors.confirmPassword}</p>
                      ` : ''}
                    </div>

                    <!-- 5. Phone Number (Optional, Myanmar format, Package 1 Unverified Note) -->
                    <div class="space-y-1">
                      <div class="flex items-center justify-between">
                        <label class="block text-xs font-bold text-[#840f16] uppercase tracking-wide">
                          ${isMm ? 'ဖုန်းနံပါတ် (Phone Number)' : 'Phone Number'}
                        </label>
                        <span class="text-[10px] text-[#8d7b75] bg-[#FBF3E2] px-2 py-0.5 rounded-full border border-[#EADFD1]">
                          ${isMm ? 'ရွေးချယ်နိုင်သည်' : 'Optional'}
                        </span>
                      </div>
                      <div class="lookup-phone-wrapper ${errors.phone ? 'border-[#840f16]' : ''}">
                        <div class="lookup-phone-prefix">+95</div>
                        <input
                          type="tel"
                          id="u11-reg-phone"
                          value="${regState.phone || ''}"
                          placeholder="9 791 234 567"
                          class="lookup-phone-input text-sm"
                        />
                      </div>
                      ${errors.phone ? `
                        <p class="text-[11px] text-[#840f16] font-semibold mt-0.5">${errors.phone}</p>
                      ` : ''}
                    </div>

                    <!-- 6. Terms of Service Agreement Checkbox -->
                    <div class="pt-2">
                      <label class="flex items-start gap-2.5 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          id="u11-reg-agree-terms"
                          ${regState.agreeTerms ? 'checked' : ''}
                          class="mt-0.5 h-4 w-4 rounded border-[#EADFD1] text-[#840f16] focus:ring-[#840f16] cursor-pointer"
                        />
                        <span class="text-xs text-[#58413f] leading-snug">
                          ${isMm ? 'EzBookNow ၏ ' : 'I agree to EzBookNow '}
                          <button type="button" id="u11-open-terms-link" class="text-[#840f16] font-bold underline hover:opacity-80 cursor-pointer">
                            ${isMm ? 'အသုံးပြုမှုစည်းမျဉ်းများ' : 'Terms of Service'}
                          </button>
                          ${isMm ? ' နှင့် ' : ' & '}
                          <button type="button" id="u11-open-privacy-link" class="text-[#840f16] font-bold underline hover:opacity-80 cursor-pointer">
                            ${isMm ? 'ကိုယ်ရေးလုံခြုံမှုမူဝါဒ' : 'Privacy Policy'}
                          </button>
                          ${isMm ? 'ကို သဘောတူပါသည် *' : ' *'}
                        </span>
                      </label>
                      ${errors.terms ? `
                        <p class="text-[11px] text-[#840f16] font-semibold mt-1 pl-6">${errors.terms}</p>
                      ` : ''}
                    </div>

                    <!-- Submit Registration Button -->
                    <div class="pt-2">
                      <button
                        type="submit"
                        id="btn-submit-email-register"
                        class="w-full btn-primary py-3 rounded-2xl font-label text-sm font-semibold shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                        ${isLoading ? 'disabled' : ''}
                      >
                        ${isLoading && loadingAction === 'email' ? `
                          <span class="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                          <span>${isMm ? 'အကောင့်ဖွင့်နေပါသည်...' : 'Creating Account...'}</span>
                        ` : `
                          <span class="material-symbols-outlined text-lg">how_to_reg</span>
                          <span>${isMm ? 'အကောင့်ဖွင့်မည်' : 'Create Account'}</span>
                        `}
                      </button>
                    </div>

                  </form>
                </div>
              ` : ''}

              <!-- Divider & Navigation to Login (U-10) -->
              <div class="pt-3 border-t border-[#EADFD1] text-center">
                <p class="text-xs text-[#58413f]">
                  ${isMm ? 'အကောင့်ရှိပြီးသားဖြစ်ပါက' : 'Already have an account?'}
                  <button 
                    id="btn-nav-to-login" 
                    class="font-bold text-[#840f16] hover:underline ml-1 cursor-pointer"
                  >
                    ${isMm ? 'ဒီနေရာတွင် အကောင့်ဝင်ပါ (Login here)' : 'Sign In here'}
                  </button>
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      <!-- ===================================================================
           SSO FIRST-TIME TERMS AGREEMENT MODAL (U-11 Requirement)
           =================================================================== -->
      ${regState.showSsoTermsModal ? `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" id="sso-terms-modal-backdrop">
          <div class="bg-[#FFF7E8] border border-[#EADFD1] rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 relative text-left max-h-[90vh] overflow-y-auto">
            
            <button id="btn-close-sso-terms" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FBF3E2] border border-[#EADFD1] flex items-center justify-center text-[#58413f] hover:text-[#840f16] cursor-pointer">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>

            <div class="text-center space-y-2">
              <div class="w-12 h-12 rounded-2xl ${regState.pendingSsoProvider === 'facebook' ? 'bg-[#1877F2]' : 'bg-[#ffffff] border border-[#EADFD1]'} text-white flex items-center justify-center mx-auto shadow-md">
                ${regState.pendingSsoProvider === 'facebook' ? `
                  <svg class="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                ` : `
                  <svg class="w-6 h-6" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                `}
              </div>
              <h3 class="font-headline text-xl font-extrabold text-[#231916]">
                ${isMm ? `${regState.pendingSsoProvider === 'facebook' ? 'Facebook' : 'Google'} ဖြင့် ပထမဆုံး အကောင့်ဖွင့်ခြင်း` : `First-time Registration with ${regState.pendingSsoProvider === 'facebook' ? 'Facebook' : 'Google'}`}
              </h3>
              <p class="text-xs text-[#58413f]">
                ${isMm ? 'EzBookNow သို့ ဆက်လက်ဝင်ရောက်ရန် အသုံးပြုမှုစည်းမျဉ်းများနှင့် ကိုယ်ရေးလုံခြုံမှုမူဝါဒကို သဘောတူပေးပါ' : 'Please review and accept our Terms of Service & Privacy Policy to finish creating your account.'}
              </p>
            </div>

            <div class="bg-[#FFF8F6] border border-[#EADFD1] rounded-2xl p-4 space-y-2 text-xs text-[#58413f] leading-relaxed">
              <div class="flex items-start gap-2">
                <span class="material-symbols-outlined text-sm text-[#840f16] mt-0.5">verified_user</span>
                <span>${isMm ? 'သင့်လူမှုကွန်ရက် အကောင့်မှ အမည်နှင့် အီးမေးလ်ကို ရယူ၍ စနစ်တွင် အကောင့်သစ် ဖွင့်လှစ်ပေးပါမည်။' : 'We will securely use your basic profile information (Name & Email) to setup your EzBookNow account.'}</span>
              </div>
              <div class="flex items-start gap-2">
                <span class="material-symbols-outlined text-sm text-[#840f16] mt-0.5">lock</span>
                <span>${isMm ? 'သင့်စကားဝှက်များကို ကျွန်ုပ်တို့ မည်သည့်အခါမျှ သိမ်းဆည်းခြင်း မရှိပါ။' : 'Your social passwords are never stored or accessed by EzBookNow.'}</span>
              </div>
            </div>

            <div class="space-y-2 pt-1">
              <button
                type="button"
                id="btn-confirm-sso-terms-agree"
                class="btn-primary-action w-full flex items-center justify-center gap-2 py-3 rounded-2xl cursor-pointer"
              >
                <span class="material-symbols-outlined text-base">check_circle</span>
                <span>${isMm ? 'သဘောတူပြီး အကောင့်ဖွင့်မည် (Agree & Continue)' : 'Agree & Create Account'}</span>
              </button>
              <button
                type="button"
                id="btn-cancel-sso-terms"
                class="w-full py-2.5 rounded-2xl text-xs font-bold text-[#58413f] hover:bg-[#FBF3E2] transition cursor-pointer"
              >
                ${isMm ? 'မလုပ်တော့ပါ (Cancel)' : 'Cancel'}
              </button>
            </div>

          </div>
        </div>
      ` : ''}

      <!-- ===================================================================
           MAIL-01 CONFIRMATION EMAIL WORKFLOW MODAL (U-11 Requirement)
           =================================================================== -->
      ${regState.showMail01Modal ? `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" id="mail01-modal-backdrop">
          <div class="bg-[#FFF7E8] border border-[#EADFD1] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 relative text-left max-h-[90vh] overflow-y-auto">
            
            <button id="btn-close-mail01-modal" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FBF3E2] border border-[#EADFD1] flex items-center justify-center text-[#58413f] hover:text-[#840f16] cursor-pointer">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>

            <div class="text-center space-y-2 border-b border-[#EADFD1] pb-4">
              <div class="w-14 h-14 rounded-2xl bg-[#840f16]/10 text-[#840f16] flex items-center justify-center mx-auto shadow-sm">
                <span class="material-symbols-outlined text-3xl">mark_email_unread</span>
              </div>
              <div class="inline-flex items-center gap-1.5 bg-[#840f16]/10 text-[#840f16] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                <span>MAIL-01 Confirmation Notice</span>
              </div>
              <h3 class="font-headline text-2xl font-extrabold text-[#231916]">
                ${isMm ? 'အတည်ပြုအီးမေးလ် ပေးပို့ပြီးပါပြီ' : 'Confirmation Email Sent!'}
              </h3>
              <p class="text-xs sm:text-sm text-[#58413f]">
                ${isMm ? `သင့်အကောင့်ကို အသက်သွင်းရန် <strong class="text-[#231916]">${regState.registeredUserEmail || 'your email'}</strong> သို့ အတည်ပြုလင့်ခ် ပေးပို့ထားပါသည်။` : `We have sent a verification link (MAIL-01) to <strong class="text-[#231916]">${regState.registeredUserEmail || 'your email'}</strong>.`}
              </p>
            </div>

            <!-- Email Simulation Card -->
            <div class="bg-[#FFF8F6] border border-[#EADFD1] rounded-2xl p-4 space-y-3">
              <div class="flex items-center justify-between text-xs border-b border-[#EADFD1] pb-2">
                <span class="font-bold text-[#840f16]">📨 EzBookNow Verification Service</span>
                <span class="text-[#8d7b75]">Subject: Confirm your registration</span>
              </div>
              <p class="text-xs text-[#58413f] leading-relaxed">
                ${isMm ? `မင်္ဂလာပါ <strong>${regState.registeredUserName || 'Alex'}</strong>၊<br/>EzBookNow တွင် အကောင့်ဖွင့်ပေးသည့်အတွက် ကျေးဇူးတင်ပါသည်။ အောက်ပါခလုတ်ကို နှိပ်၍ သင့်အီးမေးလ်ကို အတည်ပြုပြီး စားပွဲဝိုင်း စတင်စိုတ်ယူနိုင်ပါပြီ။` : `Hello <strong>${regState.registeredUserName || 'Alex'}</strong>,<br/>Thank you for registering on EzBookNow. Click the link below to verify your email address and activate your account.`}
              </p>

              <!-- Simulated MAIL-01 Interactive Link Button -->
              <div class="pt-2">
                <button
                  type="button"
                  id="btn-simulate-mail01-click"
                  class="btn-primary w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md cursor-pointer"
                >
                  <span class="material-symbols-outlined text-base">verified</span>
                  <span>${isMm ? '👉 [စမ်းသပ်ချက်] အီးမေးလ်အတည်ပြုရန် ဤနေရာကို နှိပ်ပါ' : '👉 [Simulate Click] Verify Email & Activate Account'}</span>
                </button>
              </div>
            </div>

            <!-- Resend or Close -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2">
              <button
                type="button"
                id="btn-resend-mail01"
                class="text-xs font-bold text-[#840f16] hover:underline cursor-pointer flex items-center gap-1"
              >
                <span class="material-symbols-outlined text-sm">replay</span>
                <span>${isMm ? 'အတည်ပြုအီးမေးလ် မရောက်ပါက ပြန်ပို့ရန်' : 'Resend confirmation email'}</span>
              </button>
              <button
                type="button"
                id="btn-dismiss-mail01"
                class="text-xs font-bold text-[#58413f] hover:text-[#231916] cursor-pointer"
              >
                ${isMm ? 'ပိတ်မည် (Close)' : 'Close & Do this later'}
              </button>
            </div>

          </div>
        </div>
      ` : ''}

    `;
  }

  function attachRegisterViewEvents(root) {
    if (!root) return;

    // Tab Navigation: switch to Login
    const loginTabBtn = root.querySelector('#tab-btn-login-from-reg');
    if (loginTabBtn) {
      loginTabBtn.addEventListener('click', () => {
        store.setActiveTab('login');
      });
    }

    const navToLoginBtn = root.querySelector('#btn-nav-to-login');
    if (navToLoginBtn) {
      navToLoginBtn.addEventListener('click', () => {
        store.setActiveTab('login');
      });
    }

    // Toggle Email Registration Form
    const toggleEmailBtn = root.querySelector('#btn-toggle-email-register-form');
    if (toggleEmailBtn) {
      toggleEmailBtn.addEventListener('click', () => {
        store.toggleEmailRegisterForm();
      });
    }

    // 1. Facebook SSO Register
    const fbBtn = root.querySelector('#btn-register-sso-facebook');
    if (fbBtn) {
      fbBtn.addEventListener('click', () => {
        store.executeSsoRegistration('facebook');
      });
    }

    // 2. Google SSO Register
    const googleBtn = root.querySelector('#btn-register-sso-google');
    if (googleBtn) {
      googleBtn.addEventListener('click', () => {
        store.executeSsoRegistration('google');
      });
    }

    // SSO First-Time Terms Modal Handlers
    const confirmSsoTermsBtn = root.querySelector('#btn-confirm-sso-terms-agree');
    if (confirmSsoTermsBtn) {
      confirmSsoTermsBtn.addEventListener('click', () => {
        store.confirmSsoRegistrationWithTerms();
      });
    }

    const cancelSsoTermsBtn = root.querySelector('#btn-cancel-sso-terms');
    if (cancelSsoTermsBtn) {
      cancelSsoTermsBtn.addEventListener('click', () => {
        store.cancelSsoRegistration();
      });
    }

    const closeSsoTermsBtn = root.querySelector('#btn-close-sso-terms');
    if (closeSsoTermsBtn) {
      closeSsoTermsBtn.addEventListener('click', () => {
        store.cancelSsoRegistration();
      });
    }

    // Toggle Password Visibilities
    const togglePwBtn = root.querySelector('#u11-toggle-pw-visibility');
    if (togglePwBtn) {
      togglePwBtn.addEventListener('click', () => {
        const current = store.getState().registerState.showPassword;
        store.setRegisterField('showPassword', !current);
      });
    }

    const toggleConfirmPwBtn = root.querySelector('#u11-toggle-confirm-pw-visibility');
    if (toggleConfirmPwBtn) {
      toggleConfirmPwBtn.addEventListener('click', () => {
        const current = store.getState().registerState.showConfirmPassword;
        store.setRegisterField('showConfirmPassword', !current);
      });
    }

    // Terms & Privacy Links in form
    const termsLink = root.querySelector('#u11-open-terms-link');
    if (termsLink) {
      termsLink.addEventListener('click', () => {
        store.openInfoModal('terms');
      });
    }

    const privacyLink = root.querySelector('#u11-open-privacy-link');
    if (privacyLink) {
      privacyLink.addEventListener('click', () => {
        store.openInfoModal('privacy');
      });
    }

    // Email Registration Form Submit
    const emailRegForm = root.querySelector('#u11-email-registration-form');
    if (emailRegForm) {
      emailRegForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = root.querySelector('#u11-reg-name');
        const emailInput = root.querySelector('#u11-reg-email');
        const pwInput = root.querySelector('#u11-reg-password');
        const confirmPwInput = root.querySelector('#u11-reg-confirm-password');
        const phoneInput = root.querySelector('#u11-reg-phone');
        const agreeTermsInput = root.querySelector('#u11-reg-agree-terms');

        const formData = {
          name: nameInput ? nameInput.value : '',
          email: emailInput ? emailInput.value : '',
          password: pwInput ? pwInput.value : '',
          confirmPassword: confirmPwInput ? confirmPwInput.value : '',
          phone: phoneInput ? phoneInput.value : '',
          agreeTerms: agreeTermsInput ? agreeTermsInput.checked : false
        };

        // Update state fields
        store.state.registerState.name = formData.name;
        store.state.registerState.email = formData.email;
        store.state.registerState.password = formData.password;
        store.state.registerState.confirmPassword = formData.confirmPassword;
        store.state.registerState.phone = formData.phone;
        store.state.registerState.agreeTerms = formData.agreeTerms;

        store.executeEmailRegistration(formData);
      });
    }

    // Real-time input updates for clean UX
    const regNameInput = root.querySelector('#u11-reg-name');
    if (regNameInput) {
      regNameInput.addEventListener('input', (e) => {
        store.state.registerState.name = e.target.value;
      });
    }

    const regEmailInput = root.querySelector('#u11-reg-email');
    if (regEmailInput) {
      regEmailInput.addEventListener('input', (e) => {
        store.state.registerState.email = e.target.value;
      });
    }

    const regPwInput = root.querySelector('#u11-reg-password');
    if (regPwInput) {
      regPwInput.addEventListener('input', (e) => {
        store.state.registerState.password = e.target.value;
      });
    }

    const regConfirmPwInput = root.querySelector('#u11-reg-confirm-password');
    if (regConfirmPwInput) {
      regConfirmPwInput.addEventListener('input', (e) => {
        store.state.registerState.confirmPassword = e.target.value;
      });
    }

    const regPhoneInput = root.querySelector('#u11-reg-phone');
    if (regPhoneInput) {
      regPhoneInput.addEventListener('input', (e) => {
        store.state.registerState.phone = e.target.value;
      });
    }

    const regAgreeTerms = root.querySelector('#u11-reg-agree-terms');
    if (regAgreeTerms) {
      regAgreeTerms.addEventListener('change', (e) => {
        store.state.registerState.agreeTerms = e.target.checked;
      });
    }

    // MAIL-01 Confirmation Modal Handlers
    const simulateMail01Btn = root.querySelector('#btn-simulate-mail01-click');
    if (simulateMail01Btn) {
      simulateMail01Btn.addEventListener('click', () => {
        const email = store.getState().registerState.registeredUserEmail;
        store.verifyMail01Confirmation(email);
      });
    }

    const resendMail01Btn = root.querySelector('#btn-resend-mail01');
    if (resendMail01Btn) {
      resendMail01Btn.addEventListener('click', () => {
        const email = store.getState().registerState.registeredUserEmail;
        store.resendMail01Confirmation(email);
      });
    }

    const closeMail01Btn = root.querySelector('#btn-close-mail01-modal');
    if (closeMail01Btn) {
      closeMail01Btn.addEventListener('click', () => {
        store.closeMail01Modal();
      });
    }

    const dismissMail01Btn = root.querySelector('#btn-dismiss-mail01');
    if (dismissMail01Btn) {
      dismissMail01Btn.addEventListener('click', () => {
        store.closeMail01Modal();
      });
    }

    // Footer actions
    const privacyBtn = root.querySelector('#register-footer-privacy-btn');
    if (privacyBtn) {
      privacyBtn.addEventListener('click', () => {
        store.openInfoModal('privacy');
      });
    }

    const termsBtn = root.querySelector('#register-footer-terms-btn');
    if (termsBtn) {
      termsBtn.addEventListener('click', () => {
        store.openInfoModal('terms');
      });
    }

    const langBtn = root.querySelector('#register-footer-lang-btn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        store.toggleLanguage();
      });
    }

    const returnHomeBtn = root.querySelector('#register-return-home-btn');
    if (returnHomeBtn) {
      returnHomeBtn.addEventListener('click', () => {
        store.setActiveTab('discover');
      });
    }
  }

  window.YoyakuComponents.renderRegisterView = renderRegisterView;
  window.YoyakuComponents.attachRegisterViewEvents = attachRegisterViewEvents;
})();
