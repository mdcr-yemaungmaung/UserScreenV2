(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;

  function renderNotificationSettingsView(state) {
    const isMm = state.currentLanguage === 'MM';
    const myData = state.myPageData || {};

    const notifInApp = myData.notifInApp !== false;
    const notifWebPush = myData.notifWebPush !== false;
    const notifEmail = myData.notifEmail !== false;

    const webPushSubscribed = !!myData.webPushSubscribed;
    const viberConsent = !!myData.viberConsent;
    const userPhone = myData.userPhone || '+95 9 791 234 567';

    return `
      <div id="u17-notification-settings-container" class="space-y-4 animate-fadeIn text-left">
        
        <!-- SECTION HEADER -->
        <div class="border-b border-[#EADFD1] pb-4">
          <h2 class="font-headline text-2xl sm:text-3xl font-extrabold text-[#231916]">
            ${isMm ? 'အသိပေးချက် ဆက်တင်' : 'Notification Settings'}
          </h2>
        </div>

        <!-- UNIFIED NOTIFICATION SETTINGS SECTION -->
        <div class="space-y-6">
          
          <!-- SUBSECTION 1: NOTIFICATION CHANNELS -->
          <div class="space-y-2.5">
            <!-- Channel 1: In-App Notifications -->
            <div class="bg-white rounded-xl border border-[#EADFD1] p-4 space-y-2 hover:border-[#840f16]/40 transition-colors shadow-2xs">
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-9 h-9 rounded-xl bg-[#840f16]/10 text-[#840f16] flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-lg">app_badging</span>
                  </div>
                  <span class="font-headline font-bold text-sm text-[#231916] truncate">${isMm ? 'App အတွင်း အသိပေးချက် (In-App)' : 'In-App Notifications'}</span>
                </div>

                <label class="toggle-switch-wrapper shrink-0">
                  <input
                    type="checkbox"
                    id="u17-toggle-inapp"
                    class="toggle-switch-input"
                    ${notifInApp ? 'checked' : ''}
                  />
                  <span class="toggle-switch-slider"></span>
                </label>
              </div>

              <p class="font-body text-xs text-[#58413f] leading-relaxed pl-12">
                ${isMm ? 'စိုတ်ထားမှု အတည်ပြုချက်၊ စားပွဲဝိုင်း အခြေအနေနှင့် ဘောက်ချာသတိပေးချက်များကို App တွင် ချက်ချင်း ပြသမည်' : 'Instant notification center alerts, table confirmation badges, and waitlist calls.'}
              </p>
            </div>

            <!-- Channel 2: Web Push Notifications -->
            <div class="bg-white rounded-xl border border-[#EADFD1] p-4 space-y-2 hover:border-[#840f16]/40 transition-colors shadow-2xs">
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-9 h-9 rounded-xl bg-[#840f16]/10 text-[#840f16] flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-lg">public</span>
                  </div>
                  <span class="font-headline font-bold text-sm text-[#231916] truncate">${isMm ? 'Web Push (Browser) အသိပေးချက်' : 'Web Push Notifications'}</span>
                </div>

                <label class="toggle-switch-wrapper shrink-0">
                  <input
                    type="checkbox"
                    id="u17-toggle-webpush"
                    class="toggle-switch-input"
                    ${notifWebPush ? 'checked' : ''}
                  />
                  <span class="toggle-switch-slider"></span>
                </label>
              </div>

              <p class="font-body text-xs text-[#58413f] leading-relaxed pl-12">
                ${isMm ? 'Browser မှတစ်ဆင့် အချိန်နှင့်တပြေးညီ အသိပေးချက်များ လက်ခံရယူခြင်း' : 'Real-time browser notifications when reservations change or table is ready.'}
              </p>
            </div>

            <!-- Channel 3: Email Notifications -->
            <div class="bg-white rounded-xl border border-[#EADFD1] p-4 space-y-2 hover:border-[#840f16]/40 transition-colors shadow-2xs">
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-9 h-9 rounded-xl bg-[#840f16]/10 text-[#840f16] flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-lg">mail</span>
                  </div>
                  <span class="font-headline font-bold text-sm text-[#231916] truncate">${isMm ? 'အီးမေးလ် (Email) အသိပေးချက်' : 'Email Notifications'}</span>
                </div>

                <label class="toggle-switch-wrapper shrink-0">
                  <input
                    type="checkbox"
                    id="u17-toggle-email"
                    class="toggle-switch-input"
                    ${notifEmail ? 'checked' : ''}
                  />
                  <span class="toggle-switch-slider"></span>
                </label>
              </div>

              <p class="font-body text-xs text-[#58413f] leading-relaxed pl-12">
                ${isMm ? `${myData.userEmail || 'alex@example.com'} သို့ စားပွဲဝိုင်း ပြေစာနှင့် အတည်ပြုစာ ပို့မည်` : `Reservation confirmation receipts and billing vouchers sent to ${myData.userEmail || 'alex@example.com'}.`}
              </p>
            </div>

            <!-- Channel 4: Viber Notifications (Upcoming) -->
            <div class="bg-white/70 rounded-xl border border-[#EADFD1] p-4 space-y-2 opacity-85 shadow-2xs">
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-9 h-9 rounded-xl bg-[#840f16]/10 text-[#840f16] flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-lg">chat</span>
                  </div>
                  <span class="font-headline font-bold text-sm text-[#231916] truncate">${isMm ? 'Viber အသိပေးချက်' : 'Viber Notifications'}</span>
                </div>

                <div class="shrink-0 text-right">
                  <span class="inline-flex items-center gap-1 text-[11px] font-label text-[#8d7b75] bg-[#EADFD1]/40 px-2.5 py-1 rounded-full border border-[#EADFD1]">
                    <span class="material-symbols-outlined text-[13px]">lock</span>
                    <span>${isMm ? 'နောက်ပိုင်းအဆင့်' : 'Future Phase'}</span>
                  </span>
                </div>
              </div>

              <p class="font-body text-xs text-[#58413f] leading-relaxed pl-12">
                ${isMm ? 'Viber Bot မှတစ်ဆင့် အလိုအလျောက် သတိပေးချက်နှင့် QR စားပွဲဝိုင်းကုဒ် ရယူခြင်း' : 'Automated Viber Bot dining alerts, table check-in pass delivery, and restaurant updates.'}
              </p>
            </div>

            <!-- Channel 5: SMS Notifications (Upcoming) -->
            <div class="bg-white/70 rounded-xl border border-[#EADFD1] p-4 space-y-2 opacity-85 shadow-2xs">
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                  <div class="w-9 h-9 rounded-xl bg-[#840f16]/10 text-[#840f16] flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-lg">sms</span>
                  </div>
                  <span class="font-headline font-bold text-sm text-[#231916] truncate">${isMm ? 'SMS (မက်ဆေ့ခ်ျ) အသိပေးချက်' : 'SMS Text Notifications'}</span>
                </div>

                <div class="shrink-0 text-right">
                  <span class="inline-flex items-center gap-1 text-[11px] font-label text-[#8d7b75] bg-[#EADFD1]/40 px-2.5 py-1 rounded-full border border-[#EADFD1]">
                    <span class="material-symbols-outlined text-[13px]">lock</span>
                    <span>${isMm ? 'နောက်ပိုင်းအဆင့်' : 'Future Phase'}</span>
                  </span>
                </div>
              </div>

              <p class="font-body text-xs text-[#58413f] leading-relaxed pl-12">
                ${isMm ? 'ဖုန်း SMS ဖြင့် အရေးပေါ် စားပွဲဝိုင်း အသိပေးချက်နှင့် OTP ကုဒ်များ လက်ခံခြင်း' : 'Direct SMS dispatch for booking confirmations and last-minute cancellation alerts.'}
              </p>
            </div>
          </div>

          <!-- SUBSECTION 2: PHONE NUMBER SETTINGS -->
          <div class="space-y-3 pt-3 border-t border-[#EADFD1]">
            <div class="flex items-center gap-2.5 pb-2 border-b border-[#EADFD1]/80">
              <div class="w-8 h-8 rounded-xl bg-[#840f16]/10 text-[#840f16] flex items-center justify-center font-bold shrink-0">
                <span class="material-symbols-outlined text-lg">phone_iphone</span>
              </div>
              <h3 class="font-headline font-bold text-base text-[#231916]">
                ${isMm ? 'ဖုန်းနံပါတ် ဆက်တင်များ' : 'Phone Number Settings'}
              </h3>
            </div>

            <div class="bg-white rounded-xl border border-[#EADFD1] p-5">
              <form id="u17-phone-form" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <!-- Current Phone Display -->
                  <div>
                    <label class="block font-label text-xs font-bold text-[#231916] uppercase tracking-wider mb-2.5">
                      ${isMm ? 'လက်ရှိ ဖုန်းနံပါတ်' : 'Current Phone Number'}
                    </label>
                    <div class="w-full bg-[#EADFD1]/40 border border-[#EADFD1] rounded-xl px-4 py-2.5 font-body text-xs text-[#231916] font-medium flex items-center justify-between">
                      <span>${userPhone}</span>
                      <span class="material-symbols-outlined text-[#8d7b75] text-sm">call</span>
                    </div>
                  </div>

                  <!-- New Phone Input with Myanmar Prefix -->
                  <div>
                    <label for="u17-input-phone" class="block font-label text-xs font-bold text-[#231916] uppercase tracking-wider mb-2.5">
                      ${isMm ? 'ဖုန်းနံပါတ် အသစ်ထည့်ရန်' : 'Update Phone Number'} <span class="text-[#840f16]">*</span>
                    </label>
                    <div class="flex items-center gap-2">
                      <div class="bg-[#EADFD1]/60 border border-[#EADFD1] rounded-xl px-3.5 py-2.5 font-label font-bold text-xs text-[#231916] shrink-0 flex items-center gap-1.5">
                        <span>🇲🇲</span>
                        <span>+95</span>
                      </div>
                      <input
                        type="tel"
                        id="u17-input-phone"
                        value="${userPhone.replace(/^\+95\s?/, '')}"
                        placeholder="09 791 234 567"
                        class="flex-1 bg-white border border-[#EADFD1] focus:border-[#840f16] rounded-xl px-4 py-2.5 font-body text-xs text-[#231916] focus:outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div class="flex justify-end">
                  <button
                    type="submit"
                    class="btn-primary px-6 py-2.5 rounded-full font-label text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-2"
                  >
                    <span class="material-symbols-outlined text-sm">save</span>
                    <span>${isMm ? 'ဖုန်းနံပါတ် သိမ်းဆည်းမည်' : 'Save Phone Number'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- SUBSECTION 3: VIBER INTEGRATION CONSENT -->
          <div class="space-y-3 pt-3 border-t border-[#EADFD1]">
            <div class="flex items-center gap-2.5 pb-2 border-b border-[#EADFD1]/80">
              <div class="w-8 h-8 rounded-xl bg-[#7360f2]/15 text-[#7360f2] flex items-center justify-center font-bold shrink-0">
                <span class="material-symbols-outlined text-lg">mark_chat_read</span>
              </div>
              <h3 class="font-headline font-bold text-base text-[#231916]">
                ${isMm ? 'Viber ချိတ်ဆက်မှု သဘောတူညီချက်' : 'Viber Integration Consent & Bot Connect'}
              </h3>
            </div>

            <div class="bg-white rounded-xl border border-[#EADFD1] p-5 space-y-4">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#EADFD1]/70">
                <div class="space-y-1">
                  <div class="font-headline font-bold text-sm text-[#231916] flex items-center gap-2">
                    <span>${isMm ? 'EzBookNow Viber Bot ချိတ်ဆက်မှု အခြေအနေ:' : 'EzBookNow Viber Bot Status:'}</span>
                    ${
                      viberConsent
                        ? `<span class="text-[#104b2b] text-xs font-label font-bold bg-[#104b2b]/10 border border-[#104b2b]/25 px-2.5 py-0.5 rounded-full">${isMm ? 'သဘောတူညီချက် ပေးထားသည်' : 'Consent Granted'}</span>`
                        : `<span class="text-[#8d7b75] text-xs font-label font-bold bg-[#EADFD1]/40 border border-[#EADFD1] px-2.5 py-0.5 rounded-full">${isMm ? 'သဘောတူညီချက် မပေးရသေးပါ' : 'Consent Not Granted'}</span>`
                    }
                  </div>
                  <p class="font-body text-xs text-[#58413f]">
                    ${isMm 
                      ? 'ကြိုတင် သဘောတူညီချက် ပေးထားပါက ဝန်ဆောင်မှု စတင်သည်နှင့် အလိုအလျောက် ချိတ်ဆက်ပေးပါမည်။' 
                      : 'Pre-granting consent ensures your account is bound automatically when the Viber service is deployed.'}
                  </p>
                </div>

                <div class="shrink-0">
                  ${
                    !viberConsent
                      ? `
                        <button
                          type="button"
                          id="u17-grant-viber-consent-btn"
                          class="btn-primary px-6 py-2.5 rounded-full font-label text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-2 active:scale-95"
                        >
                          <span class="material-symbols-outlined text-sm">check_circle</span>
                          <span>${isMm ? 'သဘောတူညီချက် ပေးမည်' : 'Grant Consent'}</span>
                        </button>
                      `
                      : `
                        <button
                          type="button"
                          id="u17-revoke-viber-consent-btn"
                          class="bg-white border border-[#840f16] text-[#840f16] hover:bg-[#840f16] hover:text-white px-5 py-2.5 rounded-full font-label text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
                        >
                          <span>${isMm ? 'သဘောတူညီချက် ပယ်ဖျက်မည်' : 'Revoke Consent'}</span>
                        </button>
                      `
                  }
                </div>
              </div>

              <!-- Viber Features 3-Column Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div class="p-3.5 rounded-xl bg-[#FFF8F6] border border-[#EADFD1] space-y-1">
                  <div class="flex items-center gap-1.5 text-[#840f16] font-bold text-xs font-headline">
                    <span class="material-symbols-outlined text-base">alarm</span>
                    <span>${isMm ? 'အလိုအလျောက် သတိပေးချက်' : 'Auto Reminders'}</span>
                  </div>
                  <p class="text-[11px] font-body text-[#58413f]">
                    ${isMm ? 'စားသောက်ချိန် မတိုင်မီ ၂ နာရီအလိုတွင် Viber စာတိုဖြင့် သတိပေးမည်' : 'Receive automated alerts 2 hours before your dining time.'}
                  </p>
                </div>

                <div class="p-3.5 rounded-xl bg-[#FFF8F6] border border-[#EADFD1] space-y-1">
                  <div class="flex items-center gap-1.5 text-[#840f16] font-bold text-xs font-headline">
                    <span class="material-symbols-outlined text-base">qr_code</span>
                    <span>${isMm ? 'QR Dining Pass' : 'Direct QR Delivery'}</span>
                  </div>
                  <p class="text-[11px] font-body text-[#58413f]">
                    ${isMm ? 'စားသောက်ဆိုင် Check-in QR လက်မှတ်ကို Viber တွင် တိုက်ရိုက် ရယူနိုင်မည်' : 'Check-in QR tickets delivered straight into Viber messenger.'}
                  </p>
                </div>

                <div class="p-3.5 rounded-xl bg-[#FFF8F6] border border-[#EADFD1] space-y-1">
                  <div class="flex items-center gap-1.5 text-[#840f16] font-bold text-xs font-headline">
                    <span class="material-symbols-outlined text-base">campaign</span>
                    <span>${isMm ? 'အထူး ဘောက်ချာများ' : 'VIP Flash Deals'}</span>
                  </div>
                  <p class="text-[11px] font-body text-[#58413f]">
                    ${isMm ? 'လူကြိုက်များသော ဆိုင်များ၏ သီးသန့် ပရိုမိုးရှင်းများကို ဦးဦးဖျားဖျား ရရှိမည်' : 'Instant Viber alerts when waitlist seats or chef discounts open up.'}
                  </p>
                </div>
              </div>

              <!-- Footer Note -->
              <div class="pt-2 text-[11px] font-body text-[#8d7b75] border-t border-[#EADFD1]/60 flex items-center justify-between flex-wrap gap-2">
                <span>${isMm ? 'Viber ဝန်ဆောင်မှု စတင်သည့်အခါ ဖုန်းနံပါတ်ဖြင့် စနစ်က အလိုအလျောက် ချိတ်ဆက်ပေးပါမည်။' : 'When Viber integration launches, account will link via your registered phone number.'}</span>
                ${myData.viberConsentDate ? `<span class="font-mono text-[10px]">${isMm ? 'သဘောတူထားသည့်ရက်:' : 'Timestamp:'} ${new Date(myData.viberConsentDate).toLocaleDateString()}</span>` : ''}
              </div>
            </div>
          </div>

        </div>

      </div>
    `;
  }

  function attachNotificationSettingsEvents(containerElement = document) {
    // 1. Channel Toggles
    const toggleInApp = containerElement.querySelector('#u17-toggle-inapp');
    if (toggleInApp) {
      toggleInApp.addEventListener('change', () => {
        store.toggleNotificationChannel('notifInApp');
      });
    }

    const toggleWebPush = containerElement.querySelector('#u17-toggle-webpush');
    if (toggleWebPush) {
      toggleWebPush.addEventListener('change', () => {
        store.toggleNotificationChannel('notifWebPush');
      });
    }

    const toggleEmail = containerElement.querySelector('#u17-toggle-email');
    if (toggleEmail) {
      toggleEmail.addEventListener('change', () => {
        store.toggleNotificationChannel('notifEmail');
      });
    }

    // 2. Web Push Subscribe & Unsubscribe Actions
    const subscribePushBtn = containerElement.querySelector('#u17-subscribe-push-btn');
    if (subscribePushBtn) {
      subscribePushBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if ('Notification' in window && Notification.permission !== 'granted') {
          try {
            Notification.requestPermission().then(permission => {
              store.setWebPushSubscription(permission === 'granted' || true);
            }).catch(() => {
              store.setWebPushSubscription(true);
            });
          } catch (err) {
            store.setWebPushSubscription(true);
          }
        } else {
          store.setWebPushSubscription(true);
        }
      });
    }

    const unsubscribePushBtn = containerElement.querySelector('#u17-unsubscribe-push-btn');
    if (unsubscribePushBtn) {
      unsubscribePushBtn.addEventListener('click', (e) => {
        e.preventDefault();
        store.setWebPushSubscription(false);
      });
    }

    const testPushBtn = containerElement.querySelector('#u17-test-push-btn');
    if (testPushBtn) {
      testPushBtn.addEventListener('click', (e) => {
        e.preventDefault();
        store.sendTestNotification();
      });
    }

    // 3. Phone Number Form Save
    const phoneForm = containerElement.querySelector('#u17-phone-form');
    if (phoneForm) {
      phoneForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const phoneInput = containerElement.querySelector('#u17-input-phone');
        let phoneVal = phoneInput ? phoneInput.value.trim() : '';
        if (phoneVal) {
          if (!phoneVal.startsWith('+95') && !phoneVal.startsWith('95')) {
            phoneVal = '+95 ' + phoneVal.replace(/^0/, '');
          }
          store.updateNotificationPhoneNumber(phoneVal);
        }
      });
    }

    // 4. Viber Integration Consent
    const grantViberBtn = containerElement.querySelector('#u17-grant-viber-consent-btn');
    if (grantViberBtn) {
      grantViberBtn.addEventListener('click', (e) => {
        e.preventDefault();
        store.setViberConsent(true);
      });
    }

    const revokeViberBtn = containerElement.querySelector('#u17-revoke-viber-consent-btn');
    if (revokeViberBtn) {
      revokeViberBtn.addEventListener('click', (e) => {
        e.preventDefault();
        store.setViberConsent(false);
      });
    }
  }

  window.YoyakuComponents.renderNotificationSettingsView = renderNotificationSettingsView;
  window.YoyakuComponents.attachNotificationSettingsEvents = attachNotificationSettingsEvents;
})();
