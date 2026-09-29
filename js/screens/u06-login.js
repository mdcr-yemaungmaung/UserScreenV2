(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;
  const t = (k) => window.I18n ? window.I18n.t(k) : (window.YoyakuI18n ? window.YoyakuI18n.t(k) : k);

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
              ${t('login_tab_btn')}
            </button>

            <!-- Tab 2: Lookup Reservation -->
            <button
              type="button"
              id="tab-lookup-btn"
              class="login-tab-button ${activeTab === 'lookup' ? 'active' : ''}"
            >
              ${t('lookup_tab_btn')}
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
                    <span>${t('continue_with_facebook')}</span>
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
                    <span>${t('continue_with_google')}</span>
                  </button>

                  <!-- Button 3: Login with Email -->
                  <button
                    type="button"
                    id="btn-open-email-login"
                    class="btn-auth-email"
                  >
                    <span class="material-symbols-outlined" style="font-size: 1.125rem; color: #443632;">mail</span>
                    <span>${t('login_with_email')}</span>
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
                      <span>${t('continue_as_guest')}</span>
                    </button>
                    <!-- Subtext underneath button -->
                    <p class="guest-helper-text">
                      ${t('continue_as_guest_sub')}
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
                      <span>${t('back_to_options')}</span>
                    </button>
                    <span style="font-size: 0.75rem; font-weight: 700; color: #840f16;">${t('email_sign_in_heading')}</span>
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
                        ${t('email_address')} *
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
                          ${t('password')} *
                        </label>
                        <button
                          type="button"
                          id="btn-forgot-password-link"
                          style="background: transparent; border: none; font-size: 0.71875rem; font-weight: 600; color: #840f16; cursor: pointer;"
                        >
                          ${t('forgot_password')}
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
                        ${t('remember_me')}
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
                      <span>${t('login')}</span>
                    </button>
                  </form>

                  <!-- Sign Up Footer -->
                  <div style="text-align: center; font-size: 0.71875rem; color: #554340; padding-top: 0.35rem;">
                    <span>${t('dont_have_account')}</span>
                    <button
                      type="button"
                      id="btn-open-signup-link"
                      style="background: transparent; border: none; font-weight: 700; color: #840f16; cursor: pointer; margin-left: 0.25rem;"
                    >
                      ${t('sign_up_here')}
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
                    ${t('lookup_info_text')}
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
                      ${t('test_sample_bookings')}
                    </span>
                    <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; align-items: center;">
                      ${
                        cBooking
                          ? `
                        <button type="button" id="btn-fill-sample-recent" data-res="${cBooking.reservationNo || cBooking.id}" data-phone="${cBooking.guestPhone || '09791234567'}" class="text-[10px] font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-2.5 py-1 rounded-full transition-colors cursor-pointer border border-emerald-300 flex items-center gap-1 shadow-2xs">
                          <span class="material-symbols-outlined text-xs">history</span>
                          <span>${t('recent_lookup_label')} ${cBooking.reservationNo}</span>
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
                      ${t('reservation_number_field')} *
                    </label>
                    <input
                      type="text"
                      id="lookup-resno-input"
                      required
                      autocomplete="off"
                      placeholder="${t('reservation_number_placeholder')}"
                      value="${loginState.lookupResNo || ''}"
                      class="lookup-input-field"
                    />
                  </div>

                  <!-- Invalid Format Helper Text (if applicable) -->
                  <div class="lookup-validation-msg" id="lookup-format-msg" style="${isInvalidFormat ? 'display: block;' : 'display: none;'}">
                    ${t('invalid_code_error')}
                  </div>

                  <!-- Field 2: Phone Number with Country Code prefix +95 -->
                  <div class="lookup-phone-wrapper" style="margin-top: ${isInvalidFormat ? '0' : '0.2rem'};">
                    <span class="lookup-phone-prefix">+95</span>
                    <input
                      type="tel"
                      id="lookup-phone-input"
                      required
                      autocomplete="tel"
                      placeholder="${t('phone_lookup_placeholder')}"
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
                    <span>${t('lookup_submit_btn')}</span>
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
                                ? t('cancelled')
                                : lookupResult.status === 'Pending'
                                ? t('pending')
                                : lookupResult.status === 'Completed'
                                ? t('completed')
                                : t('confirmed')
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
                            title="${t('copy_reservation_id')}"
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
                        <span style="color: #8d7b75; display: block; font-size: 0.5625rem; text-transform: uppercase; font-weight: 700;">${t('date_label')}</span>
                        <span style="font-weight: 800; color: #231916; font-size: 0.75rem;">${lookupResult.date || 'Today'}</span>
                      </div>
                      <div style="background-color: #ffffff; padding: 0.45rem; border-radius: 10px; border: 1px solid #ECE4DA;">
                        <span style="color: #8d7b75; display: block; font-size: 0.5625rem; text-transform: uppercase; font-weight: 700;">${t('time_label')}</span>
                        <span style="font-weight: 800; color: #231916; font-size: 0.75rem;">${lookupResult.time || '18:30'}</span>
                      </div>
                      <div style="background-color: #ffffff; padding: 0.45rem; border-radius: 10px; border: 1px solid #ECE4DA;">
                        <span style="color: #8d7b75; display: block; font-size: 0.5625rem; text-transform: uppercase; font-weight: 700;">${t('guests_label')}</span>
                        <span style="font-weight: 800; color: #231916; font-size: 0.75rem;">${lookupResult.guests || 2} ${t('guests')}</span>
                      </div>
                      <div style="background-color: #ffffff; padding: 0.45rem; border-radius: 10px; border: 1px solid #ECE4DA;">
                        <span style="color: #8d7b75; display: block; font-size: 0.5625rem; text-transform: uppercase; font-weight: 700;">${t('guest_name')}</span>
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
                        <span>${t('view_full_details_btn')}</span>
                      </button>
                      <button
                        type="button"
                        id="btn-open-lookup-pass"
                        class="btn-secondary-action"
                        style="height: 38px; font-size: 0.75rem; padding: 0 0.85rem; font-weight: 700;"
                      >
                        <span class="material-symbols-outlined" style="font-size: 0.95rem;">qr_code</span>
                        <span>${t('pass_btn_label')}</span>
                      </button>
                      ${
                        lookupResult.status !== 'Cancelled' && lookupResult.status !== 'Completed'
                          ? `
                        <button
                          type="button"
                          id="btn-lookup-direct-cancel"
                          class="btn-secondary-action"
                          style="height: 38px; font-size: 0.75rem; padding: 0 0.75rem; color: #9f1239; border-color: #fecdd3;"
                          title="${t('cancel_booking_action')}"
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
                        title="${t('clear_and_search_another')}"
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
                  <h3 style="font-weight: 700; font-size: 0.8125rem; color: #231916; margin: 0;">${t('reset_password')}</h3>
                </div>

                ${
                  resetEmailSent
                    ? `
                  <div style="padding: 0.875rem; border-radius: 14px; background-color: #f0fdf4; border: 1px solid #bbf7d0; color: #166534; display: flex; flex-direction: column; gap: 0.4rem;">
                    <p style="font-size: 0.71875rem; font-weight: 700; margin: 0;">${t('reset_link_sent_title')}</p>
                    <p style="font-size: 0.6875rem; margin: 0;">${t('reset_link_sent_sub')}</p>
                    <button
                      type="button"
                      id="btn-return-login-reset"
                      class="btn-primary-action"
                      style="height: 36px; font-size: 0.75rem; background-color: #166534 !important;"
                    >
                      ${t('return_to_login')}
                    </button>
                  </div>
                `
                    : `
                  <p style="font-size: 0.75rem; color: #58413f; margin: 0; line-height: 1.4;">
                    ${t('reset_instructions')}
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
                      ${t('send_reset_link')}
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
                  <h3 style="font-weight: 700; font-size: 0.8125rem; color: #231916; margin: 0;">${t('create_account_heading')}</h3>
                </div>

                <form id="signup-new-form" style="display: flex; flex-direction: column; gap: 0.75rem;">
                  <div>
                    <label style="display: block; font-size: 0.71875rem; font-weight: 700; color: #58413f; margin-bottom: 0.2rem;">${t('full_name')} *</label>
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
                    <label style="display: block; font-size: 0.71875rem; font-weight: 700; color: #58413f; margin-bottom: 0.2rem;">${t('email')} *</label>
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
                    <label style="display: block; font-size: 0.71875rem; font-weight: 700; color: #58413f; margin-bottom: 0.2rem;">${t('password')} *</label>
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
                    ${t('complete_registration')}
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
            ${t('privacy_policy')}
          </button>
          <span>•</span>
          <button
            type="button"
            id="login-footer-terms-btn"
            class="login-footer-link"
          >
            ${t('terms_of_service')}
          </button>
          <span>•</span>
          <button
            type="button"
            id="login-footer-lang-btn"
            class="login-footer-link lang-highlight"
          >
            ${(window.I18n ? window.I18n.getRawLang() : 'EN') === 'MM' ? 'English' : 'မြန်မာ'}
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
                  <span>${t('digital_dining_pass')}</span>
                </div>
                <button type="button" id="btn-close-pass-modal" class="w-8 h-8 rounded-full bg-[#F8EFE5] hover:bg-[#E8DDD0] flex items-center justify-center text-[#6D6561] hover:text-[#241A18] cursor-pointer transition-colors">
                  <span class="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              <div class="space-y-1">
                <h4 class="font-headline font-bold text-base text-[#241A18]">${state.inspectedPassBooking.restaurantName || 'Restaurant'}</h4>
                <div class="flex items-center justify-center gap-1.5">
                  <span class="text-[11px] font-bold text-[#6D6561] uppercase tracking-wider">${t('reservation_no_colon')}</span>
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
                  <span class="text-[#6D6561]">${t('date_and_time')}</span>
                  <span>${state.inspectedPassBooking.date} • ${state.inspectedPassBooking.time}</span>
                </div>
                <div class="flex items-center justify-between font-semibold">
                  <span class="text-[#6D6561]">${t('party_size_colon')}</span>
                  <span>${state.inspectedPassBooking.guests} ${t('guests_suffix')}</span>
                </div>
                <div class="flex items-center justify-between font-semibold">
                  <span class="text-[#6D6561]">${t('guest_name')}:</span>
                  <span>${state.inspectedPassBooking.guestName || 'Guest'}</span>
                </div>
              </div>

              <p class="text-[11px] text-[#6D6561] leading-relaxed">
                ${t('present_pass_prompt')}
              </p>

              <button
                type="button"
                id="btn-dismiss-pass-modal"
                class="w-full btn-primary py-3 rounded-full font-label text-xs font-bold shadow-md cursor-pointer"
              >
                ${t('close_pass_btn')}
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
                  <span>${t('cancel_reservation_heading')}</span>
                </div>
                <button type="button" id="btn-close-direct-cancel-modal" class="w-8 h-8 rounded-full bg-[#F8EFE5] hover:bg-[#E8DDD0] flex items-center justify-center text-[#6D6561] hover:text-[#241A18] cursor-pointer transition-colors">
                  <span class="material-symbols-outlined text-lg">close</span>
                </button>
              </div>

              <div class="space-y-1 text-left">
                <h4 class="font-headline font-bold text-sm text-[#241A18]">${lookupResult.restaurantName}</h4>
                <p class="font-mono text-xs font-bold text-[#9B1C25]">${lookupResult.reservationNo || lookupResult.id}</p>
                <p class="text-xs text-[#6D6561]">${lookupResult.date} at ${lookupResult.time} (${lookupResult.guests} ${t('guests_suffix')})</p>
              </div>

              <div class="text-left space-y-2">
                <label class="text-xs font-bold text-[#241A18] block">${t('reason_for_cancellation')}</label>
                <div class="space-y-1.5 text-xs text-[#554340] bg-[#F8EFE5]/50 p-3 rounded-xl border border-[#E8DDD0]">
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="direct-cancel-reason" value="schedule" checked class="text-[#9B1C25]">
                    <span>${t('reason_change_plans')}</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="direct-cancel-reason" value="emergency" class="text-[#9B1C25]">
                    <span>${t('reason_emergency')}</span>
                  </label>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="direct-cancel-reason" value="other" class="text-[#9B1C25]">
                    <span>${t('reason_other')}</span>
                  </label>
                </div>
              </div>

              <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-center justify-between font-bold">
                <span>${t('cancellation_fee')}</span>
                <span class="font-extrabold text-emerald-950">${t('free_mmk')}</span>
              </div>

              <div class="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  id="btn-abort-direct-cancel"
                  class="flex-1 py-3 px-4 rounded-full border border-[#E8DDD0] bg-[#FFFDFC] text-xs font-bold text-[#241A18] hover:bg-[#F8EFE5] cursor-pointer transition-colors"
                >
                  ${t('keep_booking')}
                </button>
                <button
                  type="button"
                  id="btn-confirm-direct-cancel"
                  class="flex-1 py-3 px-4 rounded-full bg-[#9B1C25] hover:bg-[#7F161E] text-white text-xs font-bold shadow-md cursor-pointer transition-colors"
                >
                  ${t('confirm_cancel')}
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
        store.showToast(t('browsing_as_guest'));
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
          store.showToast(`${t('reset_email_sent')} (${email})`);
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

        store.showToast(t('account_created_success'));
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
          store.setLoginError(t('invalid_code_error'));
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
          store.showToast(`${t('reservation_copied_toast')}: ${no}`);
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
