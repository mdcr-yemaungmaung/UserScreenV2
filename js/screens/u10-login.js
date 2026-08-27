(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;

  // SVG Icons matching reference design
  const facebookSvg = `
    <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 18px; height: 18px; flex-shrink: 0; fill: #ffffff;">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  `;

  const googleSvg = `
    <svg viewBox="0 0 24 24" aria-hidden="true" style="width: 18px; height: 18px; flex-shrink: 0;">
      <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"/>
      <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.97 0 12s.45 3.84 1.24 5.42l4.04-3.15z"/>
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
    </svg>
  `;

  // Cutlery Icon for Top Brand
  const cutleryIcon = `
    <svg viewBox="0 0 24 24" fill="currentColor" style="width: 22px; height: 22px; color: #840f16;">
      <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm8-7c-2.21 0-4 1.79-4 4v7h2.5v9h2.5V2h-1z"/>
    </svg>
  `;

  function renderLoginView(state) {
    const isMm = state.currentLanguage === 'MM';
    const loginState = state.loginState || {};
    const activeTab = loginState.activeTab || 'login'; // 'login' | 'lookup'
    const isLoading = !!loginState.isLoading;
    const loadingAction = loginState.loadingAction;
    const errorMessage = loginState.errorMessage;
    const showForgot = !!loginState.showForgotPassword;
    const resetEmailSent = !!loginState.resetEmailSent;
    const showSignUp = !!loginState.showSignUp;
    const showEmailForm = !!loginState.showEmailForm;
    const lookupResult = loginState.lookupResult;
    const rememberMe = loginState.rememberMe !== false;
    const showPassword = !!loginState.showPassword;
    const isInvalidFormat = !!loginState.isInvalidFormat;

    return `
      <div id="u10-login-screen" class="login-screen-bg select-none">
        
        <!-- TOP BRANDING (EXACT MATCH TO OFFICIAL YOYAKU LOGO) -->
        <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 0.5rem;">
          <!-- Official Yoyaku Pin & Spoon Mark -->
          <div class="mb-2">
            <svg style="width: 48px; height: 58px;" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="loginPinLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#93181F"/>
                  <stop offset="100%" stop-color="#7C0E15"/>
                </linearGradient>
                <linearGradient id="loginPinRight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#6F0A11"/>
                  <stop offset="100%" stop-color="#55050A"/>
                </linearGradient>
              </defs>
              <path d="M 100 12 C 58 12 24 46 24 88 C 24 128 62 170 100 216 L 100 12 Z" fill="url(#loginPinLeft)" />
              <path d="M 100 12 L 100 216 C 138 170 176 128 176 88 C 176 46 142 12 100 12 Z" fill="url(#loginPinRight)" />
              <path d="M 93 208 C 94 185 88 150 78 126 C 67 99 68 56 100 56 C 132 56 133 99 122 126 C 112 150 106 185 107 208 Z" fill="#FFF7E8" />
              <circle cx="100" cy="94" r="14" fill="#7C0E15" />
              <circle cx="98" cy="92" r="13" fill="#93181F" />
            </svg>
          </div>

          <!-- Brand Title -->
          <h1 class="login-brand-title font-headline font-black text-[#1B2028]">
            Yoyaku
          </h1>
        </div>

        <!-- MAIN COMPACT CARD CONTAINER (EXACT MATCH TO REFERENCE IMAGE) -->
        <div class="login-card-container">
          
          <!-- TOP TABS: LOGIN & LOOKUP RESERVATION -->
          <div class="login-tabs-header">
            <!-- Tab 1: Login -->
            <button
              type="button"
              id="tab-login-btn"
              class="login-tab-button ${activeTab === 'login' && !showForgot && !showSignUp ? 'active' : ''}"
            >
              ${isMm ? 'အကောင့်ဝင်ရန်' : 'Login'}
            </button>

            <!-- Tab 2: Lookup Reservation -->
            <button
              type="button"
              id="tab-lookup-btn"
              class="login-tab-button ${activeTab === 'lookup' ? 'active' : ''}"
            >
              ${isMm ? 'ဘွတ်ကင်စစ်ဆေးရန်' : 'Lookup Reservation'}
            </button>
          </div>

          <!-- CARD BODY -->
          <div class="login-card-content">
            
            <!-- TAB 1: LOGIN ACTIONS (SCREENSHOT 1) -->
            ${
              activeTab === 'login' && !showForgot && !showSignUp
                ? `
              
              ${
                !showEmailForm
                  ? `
                <!-- DEFAULT SOCIAL & DIRECT OPTIONS VIEW -->
                <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                  
                  <!-- Button 1: Continue with Facebook -->
                  <button
                    type="button"
                    id="btn-facebook-auth"
                    ${isLoading ? 'disabled' : ''}
                    class="btn-auth-facebook"
                  >
                    ${
                      loadingAction === 'facebook'
                        ? '<span style="width: 16px; height: 16px; border: 2px solid #ffffff; border-top-color: transparent; border-radius: 50%; display: inline-block; animation: spin 1s linear infinite;"></span>'
                        : facebookSvg
                    }
                    <span>${isMm ? 'Facebook ဖြင့် ဆက်လက်လုပ်ဆောင်မည်' : 'Continue with Facebook'}</span>
                  </button>

                  <!-- Button 2: Continue with Google -->
                  <button
                    type="button"
                    id="btn-google-auth"
                    ${isLoading ? 'disabled' : ''}
                    class="btn-auth-google"
                  >
                    ${
                      loadingAction === 'google'
                        ? '<span style="width: 16px; height: 16px; border: 2px solid #840f16; border-top-color: transparent; border-radius: 50%; display: inline-block; animation: spin 1s linear infinite;"></span>'
                        : googleSvg
                    }
                    <span>${isMm ? 'Google ဖြင့် ဆက်လက်လုပ်ဆောင်မည်' : 'Continue with Google'}</span>
                  </button>

                  <!-- Button 3: Login with Email -->
                  <button
                    type="button"
                    id="btn-open-email-login"
                    class="btn-auth-email"
                  >
                    <span class="material-symbols-outlined" style="font-size: 1.125rem; color: #443632;">mail</span>
                    <span>${isMm ? 'အီးမေးလ်ဖြင့် ဝင်မည်' : 'Login with Email'}</span>
                  </button>

                  <!-- OR DIVIDER -->
                  <div class="auth-or-divider" style="margin: 0.25rem 0;">
                    <span>OR</span>
                  </div>

                  <!-- Button 4: Continue as Guest -->
                  <div>
                    <button
                      type="button"
                      id="btn-continue-guest"
                      class="w-full btn-primary py-3 rounded-2xl font-label text-sm font-semibold shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span class="material-symbols-outlined text-lg">person_outline</span>
                      <span>${isMm ? 'ဧည့်သည်အဖြစ် ဆက်လက်လုပ်ဆောင်မည်' : 'Continue as Guest'}</span>
                    </button>
                    <!-- Subtext underneath button -->
                    <p class="guest-helper-text">
                      ${isMm ? 'ဖုန်းနံပါတ်ဖြင့်သာ ဘွတ်ကင်ယူနိုင်ပြီး အကောင့်ဖွင့်ရန် မလိုပါ' : 'Book with just your phone number, no registration needed.'}
                    </p>
                  </div>

                </div>
              `
                  : `
                <!-- EXPANDED EMAIL & PASSWORD FORM -->
                <div style="display: flex; flex-direction: column; gap: 0.875rem;">
                  <div style="display: flex; align-items: center; justify-content: space-between; padding-bottom: 0.25rem;">
                    <button
                      type="button"
                      id="btn-back-to-social"
                      style="background: transparent; border: none; font-size: 0.75rem; font-weight: 700; color: #58413f; cursor: pointer; display: inline-flex; align-items: center; gap: 0.25rem;"
                    >
                      <span class="material-symbols-outlined" style="font-size: 0.875rem;">arrow_back</span>
                      <span>${isMm ? 'ရွေးချယ်မှုများသို့' : 'Back to Options'}</span>
                    </button>
                    <span style="font-size: 0.75rem; font-weight: 700; color: #840f16;">${isMm ? 'အီးမေးလ်ဖြင့် ဝင်ရောက်ခြင်း' : 'Email Sign In'}</span>
                  </div>

                  ${
                    errorMessage
                      ? `
                    <div class="lookup-error-banner" style="margin-bottom: 0.25rem;">
                      <span class="material-symbols-outlined" style="font-size: 16px;">info</span>
                      <div style="flex: 1;">${errorMessage}</div>
                    </div>
                  `
                      : ''
                  }

                  <form id="email-login-form" style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <div>
                      <label for="login-email-input" style="display: block; font-size: 0.71875rem; font-weight: 700; color: #554340; margin-bottom: 0.25rem;">
                        ${isMm ? 'အီးမေးလ်လိပ်စာ' : 'Email Address'} *
                      </label>
                      <input
                        type="email"
                        id="login-email-input"
                        required
                        autocomplete="email"
                        placeholder="alex@example.com"
                        value="${loginState.email || 'alex@example.com'}"
                        class="login-form-input"
                      />
                    </div>

                    <div>
                      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.25rem;">
                        <label for="login-password-input" style="font-size: 0.71875rem; font-weight: 700; color: #554340;">
                          ${isMm ? 'စကားဝှက်' : 'Password'} *
                        </label>
                        <button
                          type="button"
                          id="btn-forgot-password-link"
                          style="background: transparent; border: none; font-size: 0.71875rem; font-weight: 600; color: #840f16; cursor: pointer;"
                        >
                          ${isMm ? 'စကားဝှက် မေ့နေပါသလား?' : 'Forgot password?'}
                        </button>
                      </div>

                      <div style="position: relative;">
                        <input
                          type="${showPassword ? 'text' : 'password'}"
                          id="login-password-input"
                          required
                          placeholder="••••••••"
                          value="${loginState.password || 'password123'}"
                          class="login-form-input"
                          style="padding-right: 2.25rem;"
                        />
                        <button
                          type="button"
                          id="btn-toggle-password-view"
                          style="position: absolute; right: 0.5rem; top: 50%; transform: translateY(-50%); background: transparent; border: none; color: #8d7b75; cursor: pointer; padding: 0.25rem;"
                        >
                          <span class="material-symbols-outlined" style="font-size: 1rem;">${showPassword ? 'visibility_off' : 'visibility'}</span>
                        </button>
                      </div>
                    </div>

                    <!-- Remember Me Checkbox -->
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                      <input
                        type="checkbox"
                        id="login-remember-checkbox"
                        ${rememberMe ? 'checked' : ''}
                        style="cursor: pointer;"
                      />
                      <label for="login-remember-checkbox" style="font-size: 0.71875rem; color: #554340; cursor: pointer; user-select: none;">
                        ${isMm ? 'အကောင့် မှတ်ထားမည်' : 'Remember me'}
                      </label>
                    </div>

                    <!-- Submit Login Button -->
                    <button
                      type="submit"
                      id="btn-submit-email-login"
                      ${isLoading ? 'disabled' : ''}
                      class="w-full btn-primary py-3 rounded-2xl font-label text-sm font-semibold shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                    >
                      ${
                        loadingAction === 'email'
                          ? '<span style="width: 16px; height: 16px; border: 2px solid #ffffff; border-top-color: transparent; border-radius: 50%; display: inline-block; animation: spin 1s linear infinite;"></span>'
                          : '<span class="material-symbols-outlined text-lg">lock</span>'
                      }
                      <span>${isMm ? 'အကောင့်ဝင်မည်' : 'Log In'}</span>
                    </button>
                  </form>

                  <!-- Sign Up Footer -->
                  <div style="text-align: center; font-size: 0.71875rem; color: #554340; padding-top: 0.35rem;">
                    <span>${isMm ? 'အကောင့် မရှိသေးပါက' : "Don't have an account?"}</span>
                    <button
                      type="button"
                      id="btn-open-signup-link"
                      style="background: transparent; border: none; font-weight: 700; color: #840f16; cursor: pointer; margin-left: 0.25rem;"
                    >
                      ${isMm ? 'ဒီနေရာတွင် အကောင့်သစ်ဖွင့်ပါ' : 'Sign up here'}
                    </button>
                  </div>
                </div>
              `
              }

            `
                : activeTab === 'lookup'
                  ? `
              <!-- TAB 2: LOOKUP RESERVATION VIEW (SCREENSHOT 2) -->
              <div style="display: flex; flex-direction: column; gap: 0.75rem;">
                
                <!-- Info Notice Card -->
                <div class="lookup-info-card">
                  <span class="material-symbols-outlined lookup-info-icon">info</span>
                  <p class="lookup-info-text">
                    ${isMm ? 'အကောင့်မဖွင့်ဘဲ ဘွတ်ကင်ယူထားပါက သင်၏ ဘွတ်ကင်နံပါတ်နှင့် ဖုန်းနံပါတ်ဖြင့် အသေးစိတ်ကြည့်ရှုနိုင်ပြီး ပယ်ဖျက်နိုင်ပါသည်။' : 'If you booked without an account, you can view and cancel your reservation using your reservation number and phone number.'}
                  </p>
                </div>

                <!-- Error Notice Banner (Exact match to screenshot 2) -->
                ${
                  errorMessage
                    ? `
                  <div class="lookup-error-banner">
                    <span class="material-symbols-outlined" style="font-size: 16px; color: #991B1B;">info</span>
                    <span>${errorMessage}</span>
                  </div>
                `
                    : ''
                }

                <form id="lookup-form" style="display: flex; flex-direction: column;">
                  
                  <!-- Field 1: Reservation Number Box -->
                  <div class="lookup-input-box">
                    <label for="lookup-resno-input" class="lookup-input-label">
                      ${isMm ? 'ဘွတ်ကင် နံပါတ်' : 'Reservation Number'}
                    </label>
                    <input
                      type="text"
                      id="lookup-resno-input"
                      required
                      placeholder="R20260815-K7M2QX"
                      value="${loginState.lookupResNo || 'R20260815-K7M2QX'}"
                      class="lookup-input-field"
                    />
                  </div>

                  <!-- Invalid Format Helper Text (if applicable) -->
                  <div class="lookup-validation-msg" id="lookup-format-msg" style="${isInvalidFormat ? 'display: block;' : 'display: none;'}">
                    ${isMm ? 'နံပါတ် ပုံစံမမှန်ပါ' : 'Invalid Format'}
                  </div>

                  <!-- Field 2: Phone Number with Country Code prefix +95 -->
                  <div class="lookup-phone-wrapper" style="margin-top: ${isInvalidFormat ? '0' : '0.4rem'};">
                    <span class="lookup-phone-prefix">+95</span>
                    <input
                      type="tel"
                      id="lookup-phone-input"
                      required
                      placeholder="${isMm ? 'ဖုန်းနံပါတ်' : 'Phone Number'}"
                      value="${loginState.lookupPhone || ''}"
                      class="lookup-phone-input"
                    />
                  </div>

                  <!-- Submit Action Button: Look up reservation -->
                  <button
                    type="submit"
                    id="btn-submit-lookup"
                    ${isLoading ? 'disabled' : ''}
                    class="w-full btn-primary py-3 rounded-2xl font-label text-sm font-semibold shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    ${
                      loadingAction === 'lookup'
                        ? '<span style="width: 16px; height: 16px; border: 2px solid #ffffff; border-top-color: transparent; border-radius: 50%; display: inline-block; animation: spin 1s linear infinite;"></span>'
                        : '<span class="material-symbols-outlined text-lg">search</span>'
                    }
                    <span>${isMm ? 'ဘွတ်ကင် ရှာဖွေမည်' : 'Look up reservation'}</span>
                  </button>
                </form>

                <!-- LOOKUP RESULT PREVIEW -->
                ${
                  lookupResult
                    ? `
                  <div style="padding: 0.85rem; border-radius: 14px; background-color: #FAF8F5; border: 1px solid rgba(132, 15, 22, 0.25); display: flex; flex-direction: column; gap: 0.6rem; margin-top: 0.5rem;">
                    <div style="display: flex; align-items: flex-start; justify-content: space-between;">
                      <div>
                        <span style="padding: 0.15rem 0.45rem; border-radius: 5px; background-color: #0f766e; color: #ffffff; font-size: 0.625rem; font-weight: 700; text-transform: uppercase;">
                          ${lookupResult.status || 'Confirmed'}
                        </span>
                        <h4 style="font-weight: 700; font-size: 0.8125rem; color: #231916; margin: 0.2rem 0 0 0;">${lookupResult.restaurantName || 'The Glass Pavilion'}</h4>
                        <p style="font-family: monospace; font-size: 0.6875rem; color: #840f16; font-weight: 700; margin: 0.1rem 0 0 0;">${lookupResult.reservationNo || lookupResult.id}</p>
                      </div>
                      <div style="width: 32px; height: 32px; border-radius: 8px; background-color: rgba(132, 15, 22, 0.1); color: #840f16; display: flex; align-items: center; justify-content: center;">
                        <span class="material-symbols-outlined" style="font-size: 1.125rem;">qr_code_2</span>
                      </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; font-size: 0.6875rem;">
                      <div style="background-color: #ffffff; padding: 0.4rem; border-radius: 8px; border: 1px solid #ECE4DA;">
                        <span style="color: #8d7b75; display: block; font-size: 0.5625rem; text-transform: uppercase; font-weight: 700;">${isMm ? 'ရက်စွဲ' : 'Date'}</span>
                        <span style="font-weight: 700; color: #231916;">${lookupResult.date || 'Today'}</span>
                      </div>
                      <div style="background-color: #ffffff; padding: 0.4rem; border-radius: 8px; border: 1px solid #ECE4DA;">
                        <span style="color: #8d7b75; display: block; font-size: 0.5625rem; text-transform: uppercase; font-weight: 700;">${isMm ? 'အချိန်' : 'Time'}</span>
                        <span style="font-weight: 700; color: #231916;">${lookupResult.time || '18:30'}</span>
                      </div>
                    </div>

                    <div style="display: flex; gap: 0.4rem;">
                      <button
                        type="button"
                        id="btn-open-lookup-detail"
                        class="btn-primary-action"
                        style="flex: 1; height: 36px; font-size: 0.75rem;"
                      >
                        <span class="material-symbols-outlined" style="font-size: 0.875rem;">receipt_long</span>
                        <span>${isMm ? 'မှာယူမှု အသေးစိတ် (U-09)' : 'View Details'}</span>
                      </button>
                      <button
                        type="button"
                        id="btn-open-lookup-pass"
                        class="btn-secondary-action"
                        style="height: 36px; font-size: 0.75rem; padding: 0 0.75rem;"
                      >
                        <span class="material-symbols-outlined" style="font-size: 0.875rem;">qr_code</span>
                        <span>Pass</span>
                      </button>
                    </div>
                  </div>
                `
                    : ''
                }
              </div>
            `
                  : ''
            }

            <!-- FORGOT PASSWORD VIEW -->
            ${
              showForgot
                ? `
              <div style="display: flex; flex-direction: column; gap: 0.875rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem; padding-bottom: 0.4rem; border-bottom: 1px solid #EADFD1;">
                  <button
                    type="button"
                    id="btn-back-from-forgot-pwd"
                    style="width: 28px; height: 28px; border-radius: 50%; background-color: #FFF8F6; border: 1px solid #EADFD1; display: flex; align-items: center; justify-content: center; color: #58413f; cursor: pointer;"
                  >
                    <span class="material-symbols-outlined" style="font-size: 0.875rem;">arrow_back</span>
                  </button>
                  <h3 style="font-weight: 700; font-size: 0.8125rem; color: #231916; margin: 0;">${isMm ? 'စကားဝှက် ပြန်လည်သတ်မှတ်ရန်' : 'Reset Password'}</h3>
                </div>

                ${
                  resetEmailSent
                    ? `
                  <div style="padding: 0.875rem; border-radius: 14px; background-color: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; display: flex; flex-direction: column; gap: 0.4rem;">
                    <p style="font-size: 0.71875rem; font-weight: 700; margin: 0;">${isMm ? 'စကားဝှက် ပြောင်းလဲရန် လင့်ခ် ပေးပို့ပြီးပါပြီ' : 'Reset Link Sent Successfully'}</p>
                    <p style="font-size: 0.6875rem; margin: 0;">${isMm ? 'သင့်အီးမေးလ် inbox ထဲတွင် လင့်ခ်ကို စစ်ဆေးပေးပါ' : 'Please check your email inbox to reset your password.'}</p>
                    <button
                      type="button"
                      id="btn-return-login-reset"
                      class="btn-primary-action"
                      style="height: 36px; font-size: 0.75rem; background-color: #166534 !important;"
                    >
                      ${isMm ? 'အကောင့်ဝင်ရန် ပြန်သွားမည်' : 'Return to Login'}
                    </button>
                  </div>
                `
                    : `
                  <p style="font-size: 0.75rem; color: #58413f; margin: 0; line-height: 1.4;">
                    ${isMm ? 'သင့်အကောင့် အီးမေးလ်ကို ထည့်ပါ။ စကားဝှက်အသစ် ပြောင်းလဲရန် လင့်ခ် ပေးပို့ပါမည်။' : 'Enter your registered email address to receive password reset instructions.'}
                  </p>

                  <form id="forgot-form" style="display: flex; flex-direction: column; gap: 0.75rem;">
                    <input
                      type="email"
                      id="forgot-email-val"
                      required
                      placeholder="alex@example.com"
                      value="alex@example.com"
                      class="login-form-input"
                    />
                    <button
                      type="submit"
                      class="btn-primary-action"
                    >
                      ${isMm ? 'လင့်ခ် ပေးပို့မည်' : 'Send Reset Link'}
                    </button>
                  </form>
                `
                }
              </div>
            `
                : ''
            }

            <!-- SIGN UP VIEW -->
            ${
              showSignUp
                ? `
              <div style="display: flex; flex-direction: column; gap: 0.875rem;">
                <div style="display: flex; align-items: center; gap: 0.5rem; padding-bottom: 0.4rem; border-bottom: 1px solid #EADFD1;">
                  <button
                    type="button"
                    id="btn-back-from-signup-view"
                    style="width: 28px; height: 28px; border-radius: 50%; background-color: #FFF8F6; border: 1px solid #EADFD1; display: flex; align-items: center; justify-content: center; color: #58413f; cursor: pointer;"
                  >
                    <span class="material-symbols-outlined" style="font-size: 0.875rem;">arrow_back</span>
                  </button>
                  <h3 style="font-weight: 700; font-size: 0.8125rem; color: #231916; margin: 0;">${isMm ? 'အကောင့်သစ် ဖွင့်ရန်' : 'Create Account'}</h3>
                </div>

                <form id="signup-new-form" style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <div>
                    <label style="display: block; font-size: 0.71875rem; font-weight: 700; color: #58413f; margin-bottom: 0.2rem;">${isMm ? 'အမည်' : 'Full Name'} *</label>
                    <input
                      type="text"
                      required
                      id="signup-name-val"
                      placeholder="Alex Aung"
                      value="Alex Aung"
                      class="login-form-input"
                    />
                  </div>

                  <div>
                    <label style="display: block; font-size: 0.71875rem; font-weight: 700; color: #58413f; margin-bottom: 0.2rem;">${isMm ? 'အီးမေးလ်' : 'Email'} *</label>
                    <input
                      type="email"
                      required
                      id="signup-email-val"
                      placeholder="alex@example.com"
                      value="alex@example.com"
                      class="login-form-input"
                    />
                  </div>

                  <div>
                    <label style="display: block; font-size: 0.71875rem; font-weight: 700; color: #58413f; margin-bottom: 0.2rem;">${isMm ? 'စကားဝှက်' : 'Password'} *</label>
                    <input
                      type="password"
                      required
                      minlength="6"
                      id="signup-pwd-val"
                      placeholder="••••••••"
                      value="Secret123!"
                      class="login-form-input"
                    />
                  </div>

                  <button
                    type="submit"
                    class="btn-primary-action"
                    style="margin-top: 0.25rem;"
                  >
                    ${isMm ? 'အကောင့် အတည်ပြုဖွင့်မည်' : 'Complete Registration'}
                  </button>
                </form>
              </div>
            `
                : ''
            }

          </div>

        </div>

        <!-- FOOTER LINKS (EXACT MATCH TO REFERENCE DESIGN) -->
        <div class="login-footer-nav">
          <button
            type="button"
            id="login-footer-privacy-btn"
            class="login-footer-link"
          >
            ${isMm ? 'ကိုယ်ရေးလုံခြုံမှု မူဝါဒ' : 'Privacy Policy'}
          </button>
          <span>•</span>
          <button
            type="button"
            id="login-footer-terms-btn"
            class="login-footer-link"
          >
            ${isMm ? 'စည်းမျဉ်းနှင့် သတ်မှတ်ချက်များ' : 'Terms of Service'}
          </button>
          <span>•</span>
          <button
            type="button"
            id="login-footer-lang-btn"
            class="login-footer-link lang-highlight"
          >
            ${isMm ? 'English' : 'မြန်မာ'}
          </button>
        </div>

      </div>
    `;
  }

  function attachLoginViewEvents(root = document) {
    if (!root) return;

    // Tabs switching
    const tabLogin = root.querySelector('#tab-login-btn');
    if (tabLogin) {
      tabLogin.addEventListener('click', () => {
        store.setLoginField('showSignUp', false);
        store.setLoginField('showForgotPassword', false);
        store.clearLoginError();
        store.setLoginTab('login');
      });
    }

    const tabLookup = root.querySelector('#tab-lookup-btn');
    if (tabLookup) {
      tabLookup.addEventListener('click', () => {
        store.setLoginField('showSignUp', false);
        store.setLoginField('showForgotPassword', false);
        store.clearLoginError();
        store.setLoginTab('lookup');
      });
    }

    // Social buttons
    const fbBtn = root.querySelector('#btn-facebook-auth');
    if (fbBtn) {
      fbBtn.addEventListener('click', () => {
        store.executeSocialLogin('facebook');
      });
    }

    const googleBtn = root.querySelector('#btn-google-auth');
    if (googleBtn) {
      googleBtn.addEventListener('click', () => {
        store.executeSocialLogin('google');
      });
    }

    // Continue as guest
    const guestBtn = root.querySelector('#btn-continue-guest');
    if (guestBtn) {
      guestBtn.addEventListener('click', () => {
        store.setActiveTab('discover');
        const isMm = store.getState().currentLanguage === 'MM';
        store.showToast(isMm ? 'ဧည့်သည်အဖြစ် ဆက်လက်ဝင်ရောက်ထားပါသည်' : 'Browsing as Guest');
      });
    }

    // Demo login
    const demoBtn = root.querySelector('#btn-demo-account-login');
    if (demoBtn) {
      demoBtn.addEventListener('click', () => {
        store.executeEmailLogin('alex@example.com', 'password123');
      });
    }

    // Open email login form
    const openEmailBtn = root.querySelector('#btn-open-email-login');
    if (openEmailBtn) {
      openEmailBtn.addEventListener('click', () => {
        store.setLoginField('showEmailForm', true);
      });
    }

    const backToSocialBtn = root.querySelector('#btn-back-to-social');
    if (backToSocialBtn) {
      backToSocialBtn.addEventListener('click', () => {
        store.setLoginField('showEmailForm', false);
      });
    }

    // Toggle password view
    const togglePassBtn = root.querySelector('#btn-toggle-password-view');
    if (togglePassBtn) {
      togglePassBtn.addEventListener('click', () => {
        const cur = !store.getState().loginState.showPassword;
        store.setLoginField('showPassword', cur);
      });
    }

    // Remember me
    const rememberCheckbox = root.querySelector('#login-remember-checkbox');
    if (rememberCheckbox) {
      rememberCheckbox.addEventListener('change', (e) => {
        store.setLoginField('rememberMe', e.target.checked);
      });
    }

    // Email login submit
    const emailForm = root.querySelector('#email-login-form');
    if (emailForm) {
      emailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = root.querySelector('#login-email-input');
        const passInput = root.querySelector('#login-password-input');
        const email = emailInput ? emailInput.value : '';
        const pass = passInput ? passInput.value : '';
        store.executeEmailLogin(email, pass);
      });
    }

    // Forgot password flow
    const forgotLink = root.querySelector('#btn-forgot-password-link');
    if (forgotLink) {
      forgotLink.addEventListener('click', () => {
        store.setLoginField('showForgotPassword', true);
        store.setLoginField('resetEmailSent', false);
      });
    }

    const backFromForgot = root.querySelector('#btn-back-from-forgot-pwd');
    if (backFromForgot) {
      backFromForgot.addEventListener('click', () => {
        store.setLoginField('showForgotPassword', false);
        store.setLoginField('resetEmailSent', false);
      });
    }

    const forgotForm = root.querySelector('#forgot-form');
    if (forgotForm) {
      forgotForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = root.querySelector('#forgot-email-val');
        const email = emailInput ? emailInput.value : '';
        if (email) {
          store.setLoginField('resetEmailSent', true);
          const isMm = store.getState().currentLanguage === 'MM';
          store.showToast(isMm ? `${email} သို့ လင့်ခ် ပို့ပြီးပါပြီ` : `Password reset link sent to ${email}`);
        }
      });
    }

    const returnLoginReset = root.querySelector('#btn-return-login-reset');
    if (returnLoginReset) {
      returnLoginReset.addEventListener('click', () => {
        store.setLoginField('showForgotPassword', false);
        store.setLoginField('resetEmailSent', false);
      });
    }

    // Sign up flow
    const openSignUpBtn = root.querySelector('#btn-open-signup-link');
    if (openSignUpBtn) {
      openSignUpBtn.addEventListener('click', () => {
        store.setActiveTab('register');
      });
    }

    const backFromSignUp = root.querySelector('#btn-back-from-signup-view');
    if (backFromSignUp) {
      backFromSignUp.addEventListener('click', () => {
        store.setLoginField('showSignUp', false);
      });
    }

    const signupNewForm = root.querySelector('#signup-new-form');
    if (signupNewForm) {
      signupNewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = root.querySelector('#signup-name-val');
        const emailInput = root.querySelector('#signup-email-val');
        const pwdInput = root.querySelector('#signup-pwd-val');

        const name = nameInput ? nameInput.value : 'Alex Aung';
        const email = emailInput ? emailInput.value : 'alex@example.com';
        const phone = '09791234567';

        store.state.isAuthenticated = true;
        store.state.myPageData.authProvider = 'email';
        store.state.myPageData.userName = name;
        store.state.myPageData.userEmail = email;
        store.state.myPageData.userPhone = phone;
        store.setLoginField('showSignUp', false);
        store.setActiveTab('mypage');

        const isMm = store.getState().currentLanguage === 'MM';
        store.showToast(isMm ? 'အကောင့်အသစ် အောင်မြင်စွာ ဖွင့်ပြီးပါပြီ' : 'Account created successfully!');
      });
    }

    // Lookup sample prefill
    const sampleFillBtn = root.querySelector('#btn-fill-sample-lookup');
    if (sampleFillBtn) {
      sampleFillBtn.addEventListener('click', () => {
        const resInput = root.querySelector('#lookup-resno-input');
        const phoneInput = root.querySelector('#lookup-phone-input');
        if (resInput) resInput.value = 'R20260815-K7M2QX';
        if (phoneInput) phoneInput.value = '09791234567';
        store.clearLoginError();
      });
    }

    // Lookup form submit
    const lookupForm = root.querySelector('#lookup-form');
    if (lookupForm) {
      lookupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const resInput = root.querySelector('#lookup-resno-input');
        const phoneInput = root.querySelector('#lookup-phone-input');
        const resNo = resInput ? resInput.value.trim() : '';
        const phone = phoneInput ? phoneInput.value.trim() : '';

        // Validation checking
        if (!resNo.startsWith('R') && !resNo.startsWith('RES')) {
          store.setLoginField('isInvalidFormat', true);
          store.setLoginError('Reservation number format is invalid (e.g. R20260815-K7M2QX).');
          return;
        } else {
          store.setLoginField('isInvalidFormat', false);
        }

        store.executeLookupReservation(resNo, phone);
      });
    }

    // Open lookup detail (U-09 in guest mode)
    const openLookupDetailBtn = root.querySelector('#btn-open-lookup-detail');
    if (openLookupDetailBtn) {
      openLookupDetailBtn.addEventListener('click', () => {
        const res = store.getState().loginState.lookupResult;
        if (res) {
          store.selectReservationForDetail(res.id, true, 'lookup');
        }
      });
    }

    // Open lookup pass
    const openLookupPassBtn = root.querySelector('#btn-open-lookup-pass');
    if (openLookupPassBtn) {
      openLookupPassBtn.addEventListener('click', () => {
        const res = store.getState().loginState.lookupResult;
        if (res) {
          store.openInspectionPass(res);
        }
      });
    }

    // Footer actions
    const privacyBtn = root.querySelector('#login-footer-privacy-btn');
    if (privacyBtn) {
      privacyBtn.addEventListener('click', () => {
        store.openInfoModal('privacy');
      });
    }

    const termsBtn = root.querySelector('#login-footer-terms-btn');
    if (termsBtn) {
      termsBtn.addEventListener('click', () => {
        store.openInfoModal('terms');
      });
    }

    const langBtn = root.querySelector('#login-footer-lang-btn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        store.toggleLanguage();
      });
    }

    const returnHomeBtn = root.querySelector('#login-return-home-btn');
    if (returnHomeBtn) {
      returnHomeBtn.addEventListener('click', () => {
        store.setActiveTab('discover');
      });
    }
  }

  window.YoyakuComponents.renderLoginView = renderLoginView;
  window.YoyakuComponents.attachLoginViewEvents = attachLoginViewEvents;
})();
