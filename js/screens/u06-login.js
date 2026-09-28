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
    const isJa = state.currentLanguage === 'JA';
    const t = (en, mm, ja) => window.YoyakuI18n ? window.YoyakuI18n.t(en, mm, ja) : (isJa ? (ja || en) : (isMm ? mm : en));
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
    const cBooking = (state.bookingModalState && state.bookingModalState.createdBooking) || null;

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
              ${t('Login', 'အကောင့်ဝင်ရန်', 'ログイン')}
            </button>

            <!-- Tab 2: Lookup Reservation -->
            <button
              type="button"
              id="tab-lookup-btn"
              class="login-tab-button ${activeTab === 'lookup' ? 'active' : ''}"
            >
              ${t('Lookup Reservation', 'ဘွတ်ကင်စစ်ဆေးရန်', '予約確認')}
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
                    ${t(
                      'If you booked without an account, you can easily view, verify, and cancel your reservation using your reservation code and registered phone number.',
                      'အကောင့်မဖွင့်ဘဲ ဘွတ်ကင်ယူထားပါက သင်၏ ဘွတ်ကင်နံပါတ်နှင့် ဖုန်းနံပါတ်ဖြင့် အသေးစိတ်ကြည့်ရှုနိုင်ပြီး ပယ်ဖျက်နိုင်ပါသည်။',
                      'アカウントをお持ちでない場合でも、予約番号とお電話番号を入力することで予約の照会・キャンセルが可能です。'
                    )}
                  </p>
                </div>

                <!-- Error Notice Banner -->
                ${
                  errorMessage
                    ? `
                  <div class="lookup-error-banner animate-fadeIn">
                    <span class="material-symbols-outlined" style="font-size: 16px; color: #991B1B;">error</span>
                    <span style="flex: 1;">${errorMessage}</span>
                  </div>
                `
                    : ''
                }

                <form id="lookup-form" style="display: flex; flex-direction: column; gap: 0.5rem;">
                  
                  <!-- Sample prefill helper chips -->
                  <div style="display: flex; flex-direction: column; gap: 0.35rem; margin-bottom: 0.25rem;">
                    <span style="font-size: 0.6875rem; color: #6D6561; font-weight: 600;">
                      ${t('Test with sample bookings:', 'စမ်းသပ်ရန် နမူနာ အချက်အလက်များ:', 'テスト用サンプル予約:')}
                    </span>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; align-items: center;">
                      ${
                        cBooking
                          ? `
                        <button type="button" id="btn-fill-sample-recent" data-res="${cBooking.reservationNo || cBooking.id}" data-phone="${cBooking.guestPhone || '09791234567'}" class="text-[10px] font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-full transition-colors cursor-pointer border border-emerald-300 flex items-center gap-1 shadow-2xs">
                          <span class="material-symbols-outlined text-xs">history</span>
                          <span>${t('Recent:', 'လတ်တလော:', '最新:')} ${cBooking.reservationNo}</span>
                        </button>
                      `
                          : ''
                      }
                      <button type="button" id="btn-fill-sample-1" data-res="RSV-665304" data-phone="09791234567" class="text-[10px] font-bold text-[#9B1C25] bg-[#9B1C25]/10 hover:bg-[#9B1C25]/20 px-2.5 py-1 rounded-full transition-colors cursor-pointer border border-[#9B1C25]/20 flex items-center gap-1 shadow-2xs">
                        <span class="material-symbols-outlined text-xs">restaurant</span>
                        <span>RSV-665304 (Gilded Fork)</span>
                      </button>
                      <button type="button" id="btn-fill-sample-2" data-res="RES-2026-002" data-phone="09791234567" class="text-[10px] font-bold text-[#6D6561] bg-[#6D6561]/10 hover:bg-[#6D6561]/20 px-2.5 py-1 rounded-full transition-colors cursor-pointer border border-[#6D6561]/20 flex items-center gap-1 shadow-2xs">
                        <span class="material-symbols-outlined text-xs">restaurant</span>
                        <span>RES-2026-002 (Mandalay)</span>
                      </button>
                    </div>
                  </div>

                  <!-- Field 1: Reservation Number Box -->
                  <div class="lookup-input-box">
                    <label for="lookup-resno-input" class="lookup-input-label">
                      ${t('Reservation Number', 'ဘွတ်ကင် နံပါတ်', '予約番号')} *
                    </label>
                    <input
                      type="text"
                      id="lookup-resno-input"
                      required
                      autocomplete="off"
                      placeholder="${t('e.g. RSV-665304 or RES-2026-002', 'ဥပမာ RSV-665304 သို့မဟုတ် RES-2026-002', '例: RSV-665304 または RES-2026-002')}"
                      value="${loginState.lookupResNo || ''}"
                      class="lookup-input-field"
                    />
                  </div>

                  <!-- Invalid Format Helper Text (if applicable) -->
                  <div class="lookup-validation-msg" id="lookup-format-msg" style="${isInvalidFormat ? 'display: block;' : 'display: none;'}">
                    ${t('Please enter a valid reservation code (e.g. RSV-665304)', 'နံပါတ် ပုံစံမမှန်ပါ (ဥပမာ RSV-665304)', '有効な予約番号を入力してください (例: RSV-665304)')}
                  </div>

                  <!-- Field 2: Phone Number with Country Code prefix +95 -->
                  <div class="lookup-phone-wrapper" style="margin-top: ${isInvalidFormat ? '0' : '0.2rem'};">
                    <span class="lookup-phone-prefix">+95</span>
                    <input
                      type="tel"
                      id="lookup-phone-input"
                      required
                      autocomplete="tel"
                      placeholder="${t('Phone Number (e.g. 09791234567)', 'ဖုန်းနံပါတ် (ဥပမာ 09791234567)', 'お電話番号 (例: 09791234567)')}"
                      value="${loginState.lookupPhone || ''}"
                      class="lookup-phone-input"
                    />
                  </div>

                  <!-- Submit Action Button: Look up reservation -->
                  <button
                    type="submit"
                    id="btn-submit-lookup"
                    ${isLoading ? 'disabled' : ''}
                    class="w-full btn-primary py-3 rounded-2xl font-label text-sm font-semibold shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-1 active:scale-[0.98] transition-all"
                  >
                    ${
                      loadingAction === 'lookup'
                        ? '<span style="width: 16px; height: 16px; border: 2px solid #ffffff; border-top-color: transparent; border-radius: 50%; display: inline-block; animation: spin 1s linear infinite;"></span>'
                        : '<span class="material-symbols-outlined text-lg">search</span>'
                    }
                    <span>${t('Look up reservation', 'ဘွတ်ကင် ရှာဖွေမည်', '予約を照会する')}</span>
                  </button>
                </form>

                <!-- LOOKUP RESULT PREVIEW -->
                ${
                  lookupResult
                    ? `
                  <div class="animate-fadeIn" style="padding: 1rem; border-radius: 16px; background-color: #FAF8F5; border: 1.5px solid rgba(132, 15, 22, 0.25); display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.5rem; box-shadow: 0 4px 16px rgba(36,26,24,0.06);">
                    
                    <!-- Header with Status Pill and QR Icon -->
                    <div style="display: flex; align-items: flex-start; justify-content: space-between; border-bottom: 1px solid #EADFD1; padding-bottom: 0.6rem;">
                      <div>
                        <div style="display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.25rem;">
                          <span style="padding: 0.2rem 0.5rem; border-radius: 6px; font-size: 0.65rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; ${
                            lookupResult.status === 'Cancelled'
                              ? 'background-color: #ffe4e6; color: #9f1239; border: 1px solid #fecdd3;'
                              : lookupResult.status === 'Pending'
                              ? 'background-color: #fef3c7; color: #92400e; border: 1px solid #fde68a;'
                              : lookupResult.status === 'Completed'
                              ? 'background-color: #f1f5f9; color: #334155; border: 1px solid #cbd5e1;'
                              : 'background-color: #d1fae5; color: #065f46; border: 1px solid #a7f3d0;'
                          }">
                            ${
                              lookupResult.status === 'Cancelled'
                                ? t('Cancelled', 'ပယ်ဖျက်ပြီး', 'キャンセル済み')
                                : lookupResult.status === 'Pending'
                                ? t('Pending Approval', 'စောင့်ဆိုင်းဆဲ', '承認待ち')
                                : lookupResult.status === 'Completed'
                                ? t('Completed', 'ပြီးမြောက်ပြီး', '完了')
                                : t('Confirmed', 'အတည်ပြုပြီး', '確定')
                            }
                          </span>
                          <span style="font-size: 0.6875rem; color: #6D6561;">${lookupResult.createdAt ? new Date(lookupResult.createdAt).toLocaleDateString() : ''}</span>
                        </div>
                        <h4 style="font-weight: 800; font-size: 0.9375rem; color: #231916; margin: 0;">${lookupResult.restaurantName || 'Restaurant'}</h4>
                        <div style="display: flex; align-items: center; gap: 0.35rem; margin-top: 0.2rem;">
                          <span style="font-family: monospace; font-size: 0.75rem; color: #840f16; font-weight: 800; letter-spacing: 0.02em;">${lookupResult.reservationNo || lookupResult.id}</span>
                          <button
                            type="button"
                            id="btn-copy-lookup-resno"
                            data-resno="${lookupResult.reservationNo || lookupResult.id}"
                            title="${t('Copy Reservation ID', 'ဘွတ်ကင် နံပါတ် ကူးယူရန်', '予約番号をコピー')}"
                            style="background: transparent; border: none; padding: 2px; cursor: pointer; color: #8d7b75; display: inline-flex; align-items: center;"
                          >
                            <span class="material-symbols-outlined" style="font-size: 0.875rem;">content_copy</span>
                          </button>
                        </div>
                      </div>
                      <div style="width: 36px; height: 36px; border-radius: 10px; background-color: rgba(132, 15, 22, 0.1); color: #840f16; display: flex; align-items: center; justify-content: center; shrink: 0;">
                        <span class="material-symbols-outlined" style="font-size: 1.25rem;">qr_code_2</span>
                      </div>
                    </div>

                    <!-- Details Grid -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.45rem; font-size: 0.6875rem;">
                      <div style="background-color: #ffffff; padding: 0.45rem; border-radius: 10px; border: 1px solid #ECE4DA;">
                        <span style="color: #8d7b75; display: block; font-size: 0.5625rem; text-transform: uppercase; font-weight: 700;">${t('Date', 'ရက်စွဲ', '日付')}</span>
                        <span style="font-weight: 800; color: #231916; font-size: 0.75rem;">${lookupResult.date || 'Today'}</span>
                      </div>
                      <div style="background-color: #ffffff; padding: 0.45rem; border-radius: 10px; border: 1px solid #ECE4DA;">
                        <span style="color: #8d7b75; display: block; font-size: 0.5625rem; text-transform: uppercase; font-weight: 700;">${t('Time', 'အချိန်', '時間')}</span>
                        <span style="font-weight: 800; color: #231916; font-size: 0.75rem;">${lookupResult.time || '18:30'}</span>
                      </div>
                      <div style="background-color: #ffffff; padding: 0.45rem; border-radius: 10px; border: 1px solid #ECE4DA;">
                        <span style="color: #8d7b75; display: block; font-size: 0.5625rem; text-transform: uppercase; font-weight: 700;">${t('Guests', 'လူဦးရေ', '人数')}</span>
                        <span style="font-weight: 800; color: #231916; font-size: 0.75rem;">${lookupResult.guests || 2} ${t('Guests', 'ဦး', '名')}</span>
                      </div>
                      <div style="background-color: #ffffff; padding: 0.45rem; border-radius: 10px; border: 1px solid #ECE4DA;">
                        <span style="color: #8d7b75; display: block; font-size: 0.5625rem; text-transform: uppercase; font-weight: 700;">${t('Guest Name', 'ဧည့်သည် အမည်', 'お名前')}</span>
                        <span style="font-weight: 800; color: #231916; font-size: 0.75rem; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; display: block;">${lookupResult.guestName || 'Guest'}</span>
                      </div>
                    </div>

                    <!-- Action Buttons Row -->
                    <div style="display: flex; gap: 0.4rem; flex-wrap: wrap;">
                      <button
                        type="button"
                        id="btn-open-lookup-detail"
                        class="btn-primary-action"
                        style="flex: 1.5; min-width: 120px; height: 38px; font-size: 0.75rem; font-weight: 700;"
                      >
                        <span class="material-symbols-outlined" style="font-size: 0.95rem;">receipt_long</span>
                        <span>${t('View Full Details', 'မှာယူမှု အသေးစိတ်', '予約詳細を見る')}</span>
                      </button>
                      <button
                        type="button"
                        id="btn-open-lookup-pass"
                        class="btn-secondary-action"
                        style="height: 38px; font-size: 0.75rem; padding: 0 0.85rem; font-weight: 700;"
                      >
                        <span class="material-symbols-outlined" style="font-size: 0.95rem;">qr_code</span>
                        <span>${t('Pass', 'ဝင်ခွင့်ကတ်', 'パス')}</span>
                      </button>
                      ${
                        lookupResult.status !== 'Cancelled' && lookupResult.status !== 'Completed'
                          ? `
                        <button
                          type="button"
                          id="btn-lookup-direct-cancel"
                          class="btn-secondary-action"
                          style="height: 38px; font-size: 0.75rem; padding: 0 0.75rem; color: #9f1239; border-color: #fecdd3;"
                          title="${t('Cancel Booking', 'ဘွတ်ကင် ပယ်ဖျက်ရန်', '予約をキャンセル')}"
                        >
                          <span class="material-symbols-outlined" style="font-size: 0.95rem;">cancel</span>
                        </button>
                      `
                          : ''
                      }
                      <button
                        type="button"
                        id="btn-clear-lookup"
                        class="btn-secondary-action"
                        style="height: 38px; font-size: 0.75rem; padding: 0 0.65rem;"
                        title="${t('Clear & Search Another', 'အသစ်ပြန်ရှာမည်', '新しい検索')}"
                      >
                        <span class="material-symbols-outlined" style="font-size: 0.95rem;">refresh</span>
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

        <!-- DIGITAL PASS MODAL (FOR LOOKUP & CHECK-IN) -->
        ${
          state.inspectedPassBooking
            ? `
          <div id="lookup-pass-modal" class="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div class="bg-[#FFFDFC] rounded-3xl border border-[#E8DDD0] shadow-2xl max-w-sm w-full p-6 text-center space-y-4 relative animate-in fade-in zoom-in-95 duration-200">
              <div class="flex items-center justify-between border-b border-[#E8DDD0] pb-3">
                <div class="font-headline font-bold text-base text-[#241A18] flex items-center gap-2">
                  <span class="material-symbols-outlined text-[#9B1C25]">qr_code_2</span>
                  <span>${t('Digital Dining Pass', 'ဒီဂျစ်တယ် ဝင်ခွင့်ကတ်', 'デジタルお食事パス')}</span>
                </div>
                <button type="button" id="btn-close-pass-modal" class="w-8 h-8 rounded-full bg-[#F8EFE5] hover:bg-[#E8DDD0] flex items-center justify-center text-[#6D6561] hover:text-[#241A18] cursor-pointer transition-colors">
                  <span class="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              <div class="space-y-1">
                <h4 class="font-headline font-bold text-base text-[#241A18]">${state.inspectedPassBooking.restaurantName || 'Restaurant'}</h4>
                <div class="flex items-center justify-center gap-1.5">
                  <span class="text-[11px] font-bold text-[#6D6561] uppercase tracking-wider">${t('Reservation No', 'ဘွတ်ကင် နံပါတ်', '予約番号')}:</span>
                  <span class="font-mono text-sm font-extrabold text-[#9B1C25]">${state.inspectedPassBooking.reservationNo || state.inspectedPassBooking.id}</span>
                </div>
              </div>

              <!-- QR Code Image -->
              <div class="p-4 bg-white rounded-2xl border border-[#E8DDD0] inline-block shadow-inner mx-auto">
                <img
                  src="${window.YoyakuPrototype ? window.YoyakuPrototype.createQrDataUri(`YOYAKU-${state.inspectedPassBooking.reservationNo || state.inspectedPassBooking.id}`) : `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=YOYAKU-${state.inspectedPassBooking.reservationNo || state.inspectedPassBooking.id}`}"
                  alt="QR Pass"
                  class="w-40 h-40 sm:w-44 sm:h-44 mx-auto object-contain"
                />
              </div>

              <div class="bg-[#F8EFE5] rounded-xl p-3 text-xs text-[#241A18] space-y-1.5 text-left">
                <div class="flex items-center justify-between font-semibold">
                  <span class="text-[#6D6561]">${t('Date & Time', 'ရက်စွဲနှင့် အချိန်', '日時')}:</span>
                  <span>${state.inspectedPassBooking.date} • ${state.inspectedPassBooking.time}</span>
                </div>
                <div class="flex items-center justify-between font-semibold">
                  <span class="text-[#6D6561]">${t('Party Size', 'လူဦးရေ', '人数')}:</span>
                  <span>${state.inspectedPassBooking.guests} ${t('Guests', 'ဦး', '名')}</span>
                </div>
                <div class="flex items-center justify-between font-semibold">
                  <span class="text-[#6D6561]">${t('Guest', 'ဧည့်သည်', 'お名前')}:</span>
                  <span>${state.inspectedPassBooking.guestName || 'Guest'}</span>
                </div>
              </div>

              <p class="text-[11px] text-[#6D6561] leading-relaxed">
                ${t('Present this digital QR pass to the restaurant host upon arrival for prompt seating.', 'စားသောက်ဆိုင်သို့ ရောက်ရှိချိန်တွင် စားပွဲဝိုင်း ချက်ချင်းရရှိရန် ဤ QR ကုဒ်ကို ဝန်ထမ်းများအား ပြသပေးပါ။', 'ご来店時にレストラン受付にてこちらのQRコードをご提示ください。')}
              </p>

              <button
                type="button"
                id="btn-dismiss-pass-modal"
                class="w-full btn-primary py-3 rounded-full font-label text-xs font-bold shadow-md cursor-pointer"
              >
                ${t('Close Pass', 'ပိတ်မည်', '閉じる')}
              </button>
            </div>
          </div>
        `
            : ''
        }

        <!-- DIRECT CANCEL MODAL FOR LOOKUP RESULT -->
        ${
          loginState.showDirectCancelModal && lookupResult
            ? `
          <div id="lookup-cancel-modal" class="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
            <div class="bg-[#FFFDFC] rounded-3xl border border-[#E8DDD0] shadow-2xl max-w-sm w-full p-6 text-center space-y-4 relative animate-in fade-in zoom-in-95 duration-200">
              <div class="flex items-center justify-between border-b border-[#E8DDD0] pb-3">
                <div class="font-headline font-bold text-base text-[#9B1C25] flex items-center gap-2">
                  <span class="material-symbols-outlined text-[#9B1C25]">cancel</span>
                  <span>${t('Cancel Reservation', 'ဘွတ်ကင် ပယ်ဖျက်ရန်', '予約のキャンセル')}</span>
                </div>
                <button type="button" id="btn-close-direct-cancel-modal" class="w-8 h-8 rounded-full bg-[#F8EFE5] hover:bg-[#E8DDD0] flex items-center justify-center text-[#6D6561] hover:text-[#241A18] cursor-pointer transition-colors">
                  <span class="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              <div class="space-y-1 text-left">
                <h4 class="font-headline font-bold text-sm text-[#241A18]">${lookupResult.restaurantName}</h4>
                <p class="font-mono text-xs font-bold text-[#9B1C25]">${lookupResult.reservationNo || lookupResult.id}</p>
                <p class="text-xs text-[#6D6561]">${lookupResult.date} at ${lookupResult.time} (${lookupResult.guests} ${t('Guests', 'ဦး', '名')})</p>
              </div>

              <div class="text-left space-y-2">
                <label class="text-xs font-bold text-[#241A18] block">${t('Reason for cancellation:', 'ပယ်ဖျက်ရသည့် အကြောင်းအရင်း:', 'キャンセル理由:')}</label>
                <div class="space-y-1.5 text-xs text-[#554340] bg-[#F8EFE5]/50 p-3 rounded-xl border border-[#E8DDD0]">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="direct-cancel-reason" value="schedule" checked class="text-[#9B1C25]">
                    <span>${t('Change of plans or schedule', 'အစီအစဉ် ရက်စွဲ ပြောင်းလဲသွားခြင်း', '予定の変更')}</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="direct-cancel-reason" value="emergency" class="text-[#9B1C25]">
                    <span>${t('Personal emergency or illness', 'အရေးပေါ်ကိစ္စ သို့မဟုတ် ကျန်းမာရေး', '急用・体調不良')}</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="direct-cancel-reason" value="other" class="text-[#9B1C25]">
                    <span>${t('Other reason', 'အခြား အကြောင်းအရင်း', 'その他')}</span>
                  </label>
                </div>
              </div>

              <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-center justify-between font-bold">
                <span>${t('Cancellation Fee:', 'ပယ်ဖျက်ခ:', 'キャンセル手数料:')}</span>
                <span class="font-extrabold text-emerald-950">${t('Free (0 MMK)', 'အခမဲ့ (၀ ကျပ်)', '無料 (0 MMK)')}</span>
              </div>

              <div class="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  id="btn-abort-direct-cancel"
                  class="flex-1 py-3 px-4 rounded-full border border-[#E8DDD0] bg-[#FFFDFC] text-xs font-bold text-[#241A18] hover:bg-[#F8EFE5] cursor-pointer transition-colors"
                >
                  ${t('Keep Booking', 'မလုပ်တော့ပါ', '予約を維持')}
                </button>
                <button
                  type="button"
                  id="btn-confirm-direct-cancel"
                  class="flex-1 py-3 px-4 rounded-full bg-[#9B1C25] hover:bg-[#7F161E] text-white text-xs font-bold shadow-md cursor-pointer transition-colors"
                >
                  ${t('Confirm Cancel', 'အတည်ပြု ပယ်ဖျက်မည်', 'キャンセル確定')}
                </button>
              </div>
            </div>
          </div>
        `
            : ''
        }

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

    // Lookup sample prefill chips
    const fillSample = (resNo, phone) => {
      const resInput = root.querySelector('#lookup-resno-input');
      const phoneInput = root.querySelector('#lookup-phone-input');
      if (resInput) resInput.value = resNo;
      if (phoneInput) phoneInput.value = phone;
      store.clearLoginError();
      store.setLoginField('isInvalidFormat', false);
      store.executeLookupReservation(resNo, phone);
    };

    const sampleRecentBtn = root.querySelector('#btn-fill-sample-recent');
    if (sampleRecentBtn) {
      sampleRecentBtn.addEventListener('click', () => {
        const res = sampleRecentBtn.getAttribute('data-res');
        const phone = sampleRecentBtn.getAttribute('data-phone') || '09791234567';
        if (res) fillSample(res, phone);
      });
    }

    const sample1Btn = root.querySelector('#btn-fill-sample-1');
    if (sample1Btn) {
      sample1Btn.addEventListener('click', () => {
        fillSample('RSV-665304', '09791234567');
      });
    }

    const sample2Btn = root.querySelector('#btn-fill-sample-2');
    if (sample2Btn) {
      sample2Btn.addEventListener('click', () => {
        fillSample('RES-2026-002', '09791234567');
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

        // Validation checking: accept standard reservation IDs
        if (!resNo || resNo.length < 3) {
          store.setLoginField('isInvalidFormat', true);
          const isMm = store.getState().currentLanguage === 'MM';
          const isJa = store.getState().currentLanguage === 'JA';
          const msg = isJa ? '予約番号の形式が正しくありません (例: RSV-665304)' : (isMm ? 'ဘွတ်ကင်နံပါတ် ပုံစံမမှန်ပါ (ဥပမာ RSV-665304)' : 'Reservation number format is invalid (e.g. RSV-665304).');
          store.setLoginError(msg);
          return;
        } else {
          store.setLoginField('isInvalidFormat', false);
        }

        store.executeLookupReservation(resNo, phone);
      });
    }

    // Copy Reservation No button
    const copyResNoBtn = root.querySelector('#btn-copy-lookup-resno');
    if (copyResNoBtn) {
      copyResNoBtn.addEventListener('click', () => {
        const no = copyResNoBtn.getAttribute('data-resno') || '';
        if (no) {
          navigator.clipboard.writeText(no);
          const isMm = store.getState().currentLanguage === 'MM';
          const isJa = store.getState().currentLanguage === 'JA';
          const msg = isJa ? `予約番号をコピーしました: ${no}` : (isMm ? `ဘွတ်ကင်နံပါတ် ${no} အား ကူးယူပြီးပါပြီ` : `Copied reservation code: ${no}`);
          store.showToast(msg);
        }
      });
    }

    // Open lookup detail (U-10 in guest mode)
    const openLookupDetailBtn = root.querySelector('#btn-open-lookup-detail');
    if (openLookupDetailBtn) {
      openLookupDetailBtn.addEventListener('click', () => {
        const res = store.getState().loginState.lookupResult;
        if (res) {
          store.selectReservationForDetail(res.id, true, 'lookup');
          window.location.hash = `#/reservations/${res.reservationNo || res.id}`;
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

    // Close Pass Modal handlers
    const closePassBtn = root.querySelector('#btn-close-pass-modal');
    if (closePassBtn) {
      closePassBtn.addEventListener('click', () => {
        store.closeInspectionPass();
      });
    }
    const dismissPassBtn = root.querySelector('#btn-dismiss-pass-modal');
    if (dismissPassBtn) {
      dismissPassBtn.addEventListener('click', () => {
        store.closeInspectionPass();
      });
    }

    // Direct Cancel Modal trigger & actions
    const directCancelTrigger = root.querySelector('#btn-lookup-direct-cancel');
    if (directCancelTrigger) {
      directCancelTrigger.addEventListener('click', () => {
        store.setLoginField('showDirectCancelModal', true);
      });
    }

    const closeDirectCancelBtn = root.querySelector('#btn-close-direct-cancel-modal');
    if (closeDirectCancelBtn) {
      closeDirectCancelBtn.addEventListener('click', () => {
        store.setLoginField('showDirectCancelModal', false);
      });
    }

    const abortDirectCancelBtn = root.querySelector('#btn-abort-direct-cancel');
    if (abortDirectCancelBtn) {
      abortDirectCancelBtn.addEventListener('click', () => {
        store.setLoginField('showDirectCancelModal', false);
      });
    }

    const confirmDirectCancelBtn = root.querySelector('#btn-confirm-direct-cancel');
    if (confirmDirectCancelBtn) {
      confirmDirectCancelBtn.addEventListener('click', () => {
        const res = store.getState().loginState.lookupResult;
        if (res) {
          store.cancelReservation(res.id);
          store.setLoginField('showDirectCancelModal', false);
        }
      });
    }

    // Clear lookup button
    const clearLookupBtn = root.querySelector('#btn-clear-lookup');
    if (clearLookupBtn) {
      clearLookupBtn.addEventListener('click', () => {
        store.clearLookupResult();
        const resInput = root.querySelector('#lookup-resno-input');
        const phoneInput = root.querySelector('#lookup-phone-input');
        if (resInput) resInput.value = '';
        if (phoneInput) phoneInput.value = '';
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
