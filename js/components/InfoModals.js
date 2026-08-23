(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;



  function renderInfoModals(state) {
    const activeModal = state.activeInfoModal;
    if (!activeModal || activeModal === 'none') return '';

    const isMm = state.currentLanguage === 'MM';

    if (activeModal === 'auth') {
      return `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div class="bg-[#FFF7E8] border border-[#EADFD1] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 relative">
            
            <button id="close-info-modal" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FBF3E2] border border-[#EADFD1] flex items-center justify-center text-[#58413f] hover:text-[#840f16] cursor-pointer">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>

            <div class="text-center space-y-2">
              <div class="w-12 h-12 rounded-2xl bg-[#840f16] text-white flex items-center justify-center mx-auto shadow-md">
                <span class="material-symbols-outlined text-2xl">account_circle</span>
              </div>
              <h3 class="font-headline text-2xl font-extrabold text-[#231916]">
                ${isMm ? 'Yoyaku အကောင့်ဝင်ရန်' : 'Welcome to Yoyaku'}
              </h3>
              <p class="font-body text-xs sm:text-sm text-[#58413f]">
                ${isMm ? 'ကြိုတင်စိုတ်ယူထားသော စားပွဲဝိုင်းများကို စီမံခန့်ခွဲရန် အကောင့်ဝင်ပါ' : 'Sign in to access VIP bookings, points rewards, and saved favorites.'}
              </p>
            </div>

            <form id="auth-form" class="space-y-4 text-left">
              <div class="space-y-1">
                <label class="font-label text-xs font-bold text-[#58413f] uppercase tracking-wider">${isMm ? 'ဖုန်းနံပါတ် သို့မဟုတ် အီးမေးလ်' : 'Phone or Email'}</label>
                <input
                  type="text"
                  required
                  placeholder="+95 9 791 234 567"
                  value="evelyn.clair@example.com"
                  class="w-full bg-[#FFF8F6] border border-[#EADFD1] focus:border-[#840f16] rounded-2xl p-3 font-body text-sm text-[#231916] focus:outline-none"
                />
              </div>

              <div class="space-y-1">
                <label class="font-label text-xs font-bold text-[#58413f] uppercase tracking-wider">${isMm ? 'စကားဝှက်' : 'Password'}</label>
                <input
                  type="password"
                  required
                  value="••••••••••••"
                  class="w-full bg-[#FFF8F6] border border-[#EADFD1] focus:border-[#840f16] rounded-2xl p-3 font-body text-sm text-[#231916] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                class="w-full btn-primary py-3.5 rounded-2xl font-label text-sm font-semibold shadow-md cursor-pointer"
              >
                ${isMm ? 'အကောင့်ဝင်မည် (Login)' : 'Sign In to Account'}
              </button>
            </form>

            <div class="pt-2 border-t border-[#EADFD1] text-center text-xs text-[#58413f]">
              <span>${isMm ? 'အကောင့်မရှိသေးပါက' : "Don't have an account?"}</span>
              <button id="auth-toggle-signup" class="font-bold text-[#840f16] hover:underline ml-1 cursor-pointer">
                ${isMm ? 'အကောင့်သစ်ဖွင့်ပါ (Sign Up)' : 'Create New Account'}
              </button>
            </div>

          </div>
        </div>
      `;
    }

    if (activeModal === 'owner_application') {
      return `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div class="bg-[#FFF7E8] border border-[#EADFD1] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            <button id="close-info-modal" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FBF3E2] border border-[#EADFD1] flex items-center justify-center text-[#58413f] hover:text-[#840f16] cursor-pointer">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>

            <div class="space-y-2 text-left border-b border-[#EADFD1] pb-4">
              <div class="inline-flex items-center gap-1.5 bg-[#840f16]/10 text-[#840f16] px-3 py-1 rounded-full text-xs font-label font-bold uppercase tracking-wider">
                <span>${isMm ? 'ဆိုင်ပိုင်ရှင်များ' : 'For Restaurant Owners'}</span>
              </div>
              <h3 class="font-headline text-2xl font-extrabold text-[#231916]">
                ${isMm ? 'ဆိုင်သစ် စာရင်းသွင်း လျှောက်ထားရန်' : 'Partner Venue Application'}
              </h3>
              <p class="font-body text-xs sm:text-sm text-[#58413f]">
                ${isMm ? 'သင့်စားသောက်ဆိုင်ကို Yoyaku တွင် စာရင်းသွင်း၍ စားပွဲဝိုင်း ကြိုတင်မှာယူမှုများကို လက်ခံလိုက်ပါ' : 'Join Yangon’s premier restaurant reservation platform. Submit your venue details below.'}
              </p>
            </div>

            <form id="owner-app-form" class="space-y-4 text-left">
              <div class="space-y-1">
                <label class="font-label text-xs font-bold text-[#58413f] uppercase tracking-wider">${isMm ? 'ဆိုင်အမည် (Restaurant Name)' : 'Restaurant Name *'}</label>
                <input type="text" required placeholder="e.g. Golden Leaf Teahouse" class="w-full bg-[#FFF8F6] border border-[#EADFD1] rounded-2xl p-3 text-sm focus:outline-none focus:border-[#840f16]" />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="space-y-1">
                  <label class="font-label text-xs font-bold text-[#58413f] uppercase tracking-wider">${isMm ? 'မြို့နယ် (Township/Area)' : 'Township Area *'}</label>
                  <select class="w-full bg-[#FFF8F6] border border-[#EADFD1] rounded-2xl p-3 text-xs sm:text-sm focus:outline-none focus:border-[#840f16]">
                    <option>Bahan Township</option>
                    <option>Dagon Township</option>
                    <option>Yangon Downtown</option>
                    <option>Inya Lake Waterfront</option>
                    <option>Ahlone Township</option>
                  </select>
                </div>

                <div class="space-y-1">
                  <label class="font-label text-xs font-bold text-[#58413f] uppercase tracking-wider">${isMm ? 'အစားအစာအမျိုးအစား' : 'Cuisine Category *'}</label>
                  <select class="w-full bg-[#FFF8F6] border border-[#EADFD1] rounded-2xl p-3 text-xs sm:text-sm focus:outline-none focus:border-[#840f16]">
                    <option>Burmese</option>
                    <option>Teahouse & Snacks</option>
                    <option>Japanese & Sushi</option>
                    <option>Casual Dining</option>
                    <option>European / Fine Dining</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="space-y-1">
                  <label class="font-label text-xs font-bold text-[#58413f] uppercase tracking-wider">${isMm ? 'ဆက်သွယ်ရန် ဖုန်းနံပါတ်' : 'Contact Phone Number *'}</label>
                  <input type="tel" required placeholder="+95 9 ..." class="w-full bg-[#FFF8F6] border border-[#EADFD1] rounded-2xl p-3 text-sm focus:outline-none focus:border-[#840f16]" />
                </div>

                <div class="space-y-1">
                  <label class="font-label text-xs font-bold text-[#58413f] uppercase tracking-wider">${isMm ? 'စားပွဲဝိုင်း စုစုပေါင်း' : 'Total Seating Capacity'}</label>
                  <input type="number" min="10" value="40" class="w-full bg-[#FFF8F6] border border-[#EADFD1] rounded-2xl p-3 text-sm focus:outline-none focus:border-[#840f16]" />
                </div>
              </div>

              <div class="space-y-1">
                <label class="font-label text-xs font-bold text-[#58413f] uppercase tracking-wider">${isMm ? 'အခြား အသေးစိတ် အချက်အလက်များ' : 'Additional Venue Notes'}</label>
                <textarea rows="2" placeholder="${isMm ? 'ဝိုင်ဆိုင်၊ ပါကင်၊ ပရိုမိုးရှင်း အစီအစဉ်များ...' : 'Special seating options, parking availability...'}" class="w-full bg-[#FFF8F6] border border-[#EADFD1] rounded-2xl p-3 text-sm focus:outline-none focus:border-[#840f16]"></textarea>
              </div>

              <button type="submit" class="w-full btn-primary py-3.5 rounded-2xl font-label text-sm font-semibold shadow-md cursor-pointer">
                ${isMm ? 'လျှောက်လွှာ တင်သွင်းမည် (Submit Application)' : 'Submit Partner Application'}
              </button>
            </form>

          </div>
        </div>
      `;
    }

    if (activeModal === 'check_guest_booking') {
      const result = state.guestBookingCheckResult;

      return `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div class="bg-[#FFF7E8] border border-[#EADFD1] rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            <button id="close-info-modal" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FBF3E2] border border-[#EADFD1] flex items-center justify-center text-[#58413f] hover:text-[#840f16] cursor-pointer">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>

            <div class="space-y-2 text-left border-b border-[#EADFD1] pb-4">
              <div class="inline-flex items-center gap-1.5 bg-[#840f16]/10 text-[#840f16] px-3 py-1 rounded-full text-xs font-label font-bold uppercase tracking-wider">
                <span>${isMm ? 'စိုတ်ထားမှု စစ်ဆေးရန်' : 'Check Reservation'}</span>
              </div>
              <h3 class="font-headline text-2xl font-extrabold text-[#231916]">
                ${isMm ? 'ဧည့်သည် စိုတ်ထားမှု စစ်ဆေးရန်' : 'Verify Guest Reservation'}
              </h3>
              <p class="font-body text-xs sm:text-sm text-[#58413f]">
                ${isMm ? 'အကောင့်မရှိဘဲ စိုတ်ယူထားပါက စိုတ်ယူမှုနံပါတ် သို့မဟုတ် ဖုန်းနံပါတ်ဖြင့် ရှာဖွေစစ်ဆေးပါ' : 'Lookup your table reservation using your booking code (e.g. RSV-849201) or phone number.'}
              </p>
            </div>

            <form id="check-booking-form" class="space-y-3 text-left">
              <div class="flex gap-2">
                <input
                  type="text"
                  id="guest-lookup-input"
                  required
                  placeholder="RSV-849201 or +95 9 791..."
                  value="${result?.query || 'RSV-849201'}"
                  class="flex-1 bg-[#FFF8F6] border border-[#EADFD1] focus:border-[#840f16] rounded-2xl p-3 font-body text-sm text-[#231916] focus:outline-none"
                />
                <button type="submit" class="btn-primary px-5 py-3 rounded-2xl font-label text-sm font-bold shadow-md cursor-pointer shrink-0">
                  ${isMm ? 'ရှာမည်' : 'Verify'}
                </button>
              </div>
            </form>

            ${result ? `
              <div class="p-4 rounded-2xl bg-[#FBF3E2] border border-[#EADFD1] text-left space-y-3 animate-fadeIn">
                ${result.found ? `
                  <div class="flex items-center justify-between">
                    <span class="font-label text-xs font-bold text-[#840f16] uppercase tracking-wider">✅ Reservation Verified</span>
                    <span class="px-2.5 py-0.5 rounded-full bg-[#840f16]/10 text-[#840f16] font-label text-xs font-bold">${result.booking.status}</span>
                  </div>
                  <div class="space-y-1">
                    <h4 class="font-headline text-lg font-bold text-[#231916]">${result.booking.restaurantName}</h4>
                    <div class="font-label text-xs text-[#58413f] flex items-center gap-2">
                      <span class="material-symbols-outlined text-sm text-[#840f16]">calendar_today</span>
                      <span>${result.booking.date} at ${result.booking.time} (${result.booking.guests} Guests)</span>
                    </div>
                    <div class="font-label text-xs text-[#58413f] flex items-center gap-2">
                      <span class="material-symbols-outlined text-sm text-[#840f16]">person</span>
                      <span>Guest: ${result.booking.guestName} (${result.booking.guestPhone})</span>
                    </div>
                  </div>
                  <div class="pt-2 flex justify-end">
                    <button id="guest-view-qr" class="text-xs font-label font-bold text-[#840f16] hover:underline cursor-pointer flex items-center gap-1">
                      <span class="material-symbols-outlined text-sm">qr_code_2</span>
                      <span>View Instant QR Dining Pass</span>
                    </button>
                  </div>
                ` : `
                  <div class="text-xs font-label text-[#840f16] font-bold">
                    ❌ No booking found matching "${result.query}". Please check your reservation code.
                  </div>
                `}
              </div>
            ` : ''}

          </div>
        </div>
      `;
    }

    if (activeModal === 'terms') {
      return `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div class="bg-[#FFF7E8] border border-[#EADFD1] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-4 relative max-h-[85vh] overflow-y-auto text-left">
            
            <button id="close-info-modal" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FBF3E2] border border-[#EADFD1] flex items-center justify-center text-[#58413f] hover:text-[#840f16] cursor-pointer">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>

            <h3 class="font-headline text-2xl font-extrabold text-[#231916]">
              ${isMm ? 'လုပ်ငန်းသုံး စည်းမျဉ်းများ (Terms of Service)' : 'Terms of Service'}
            </h3>

            <div class="font-body text-xs sm:text-sm text-[#58413f] space-y-3 leading-relaxed">
              <p><strong>1. Acceptance of Terms:</strong> By using Yoyaku dining reservation platform, you agree to comply with all terms and booking policies.</p>
              <p><strong>2. Table Guarantee:</strong> Table reservations are held for 15 minutes past scheduled dining time. Late arrivals may be re-allocated based on restaurant capacity.</p>
              <p><strong>3. Cancellations & Modifications:</strong> Cancellations can be made free of charge up to 1 hour prior to dining time via My Reservations page.</p>
              <p><strong>4. Payment & Deposit:</strong> Pre-paid deposits via KBZPay, WavePay, or AYA Pay are securely held and applied directly to your final bill.</p>
            </div>

            <div class="pt-4 text-right">
              <button id="close-info-modal" class="btn-primary px-6 py-2.5 rounded-xl font-label text-xs font-bold shadow-md cursor-pointer">
                ${isMm ? 'နားလည်ပါပြီ' : 'I Understand'}
              </button>
            </div>

          </div>
        </div>
      `;
    }

    if (activeModal === 'privacy') {
      return `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div class="bg-[#FFF7E8] border border-[#EADFD1] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-4 relative max-h-[85vh] overflow-y-auto text-left">
            
            <button id="close-info-modal" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FBF3E2] border border-[#EADFD1] flex items-center justify-center text-[#58413f] hover:text-[#840f16] cursor-pointer">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>

            <h3 class="font-headline text-2xl font-extrabold text-[#231916]">
              ${isMm ? 'ကိုယ်ရေးအချက်အလက် လုံခြုံမှုမူဝါဒ (Privacy Policy)' : 'Privacy Policy'}
            </h3>

            <div class="font-body text-xs sm:text-sm text-[#58413f] space-y-3 leading-relaxed">
              <p><strong>1. Data Encryption:</strong> Your contact phone numbers, emails, and payment transaction tokens are encrypted using industry-standard protocols.</p>
              <p><strong>2. Usage Purpose:</strong> Contact details are solely used for sending instant table confirmation passes and Viber notifications.</p>
              <p><strong>3. Third-party Privacy:</strong> We never share or sell personal guest information to unauthorized external marketeers.</p>
            </div>

            <div class="pt-4 text-right">
              <button id="close-info-modal" class="btn-primary px-6 py-2.5 rounded-xl font-label text-xs font-bold shadow-md cursor-pointer">
                ${isMm ? 'နားလည်ပါပြီ' : 'I Understand'}
              </button>
            </div>

          </div>
        </div>
      `;
    }

    if (activeModal === 'notifications') {
      const notifs = state.myPageData.notifications;

      return `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div class="bg-[#FFF7E8] border border-[#EADFD1] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 relative text-left">
            
            <button id="close-info-modal" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FBF3E2] border border-[#EADFD1] flex items-center justify-center text-[#58413f] hover:text-[#840f16] cursor-pointer">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>

            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-xl text-[#840f16]">notifications</span>
              <h3 class="font-headline text-xl font-bold text-[#231916]">
                ${isMm ? 'အသိပေးချက်များ' : 'Notifications'}
              </h3>
            </div>

            <div class="space-y-2 max-h-64 overflow-y-auto">
              ${notifs.map(n => `
                <div class="p-3 rounded-2xl bg-[#FFF8F6] border border-[#EADFD1] space-y-1">
                  <div class="font-headline text-sm font-bold text-[#231916]">${n.title}</div>
                  <div class="font-label text-[10px] text-[#58413f]">${n.time}</div>
                </div>
              `).join('')}
            </div>

          </div>
        </div>
      `;
    }

    if (activeModal === 'pwa_install' || (window.PwaManager && window.PwaManager.showInstallModal)) {
      const isIos = window.PwaManager ? window.PwaManager.isIos() : false;
      const canPrompt = window.PwaManager ? window.PwaManager.canPromptInstall() : false;

      return `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn text-left">
          <div class="bg-[#FFF7E8] border border-[#EADFD1] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto">
            
            <button id="close-pwa-modal-btn" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FBF3E2] border border-[#EADFD1] flex items-center justify-center text-[#58413f] hover:text-[#840f16] cursor-pointer">
              <span class="material-symbols-outlined text-lg">close</span>
            </button>

            <!-- App Badge & Header -->
            <div class="space-y-3">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#840f16] to-[#231916] p-0.5 shadow-md flex items-center justify-center">
                <div class="w-full h-full rounded-[14px] bg-[#840f16] flex items-center justify-center text-white">
                  <span class="material-symbols-outlined text-2xl">restaurant</span>
                </div>
              </div>

              <div>
                <span class="inline-block px-2.5 py-0.5 rounded-full bg-[#840f16]/10 text-[#840f16] font-label text-[10px] font-bold uppercase tracking-wider mb-1">
                  Progressive Web App (PWA)
                </span>
                <h3 class="font-headline text-2xl font-extrabold text-[#231916]">
                  ${isMm ? 'Yoyaku အက်ပ်ကို ထည့်သွင်းပါ' : 'Install Yoyaku App'}
                </h3>
                <p class="font-body text-xs text-[#58413f] mt-1 leading-relaxed">
                  ${
                    isMm
                      ? 'ဖုန်းတွင် အက်ပ်အနေဖြင့် ထည့်သွင်းထားပါက အင်တာနက် မရှိချိန်တွင်လည်း သင်၏ QR Pass နှင့် စားပွဲဝိုင်းများကို အချိန်မရွေး ကြည့်ရှုနိုင်ပါသည်'
                      : 'Get full-screen speed, instant table booking, and offline access to all your confirmed dining QR passes.'
                  }
                </p>
              </div>
            </div>

            <!-- Highlights -->
            <div class="space-y-2.5 bg-[#FFF8F6] p-4 rounded-2xl border border-[#EADFD1]">
              <div class="flex items-center gap-3 text-xs text-[#231916]">
                <span class="material-symbols-outlined text-[#840f16] text-base shrink-0">offline_pin</span>
                <span class="font-bold">${isMm ? 'အော့ဖ်လိုင်း QR Pass ရယူနိုင်ခြင်း' : 'Offline Access to QR Dining Passes'}</span>
              </div>
              <div class="flex items-center gap-3 text-xs text-[#231916]">
                <span class="material-symbols-outlined text-[#840f16] text-base shrink-0">speed</span>
                <span class="font-bold">${isMm ? 'လျင်မြန် ချောမွေ့သော မျက်နှာပြင်' : 'Instant Loading & Fullscreen Experience'}</span>
              </div>
              <div class="flex items-center gap-3 text-xs text-[#231916]">
                <span class="material-symbols-outlined text-[#840f16] text-base shrink-0">notifications_active</span>
                <span class="font-bold">${isMm ? 'ဘွတ်ကင် အချိန်မီ သတိပေးချက်များ' : 'Real-Time Table Reminder Alerts'}</span>
              </div>
            </div>

            <!-- Install Instructions / Action -->
            ${
              canPrompt
                ? `
              <button
                type="button"
                id="pwa-prompt-install-action-btn"
                class="w-full py-3.5 bg-[#840f16] hover:bg-[#680b11] text-white rounded-2xl font-label text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span class="material-symbols-outlined text-lg">download</span>
                <span>${isMm ? 'ဖုန်းတွင် အက်ပ် ထည့်သွင်းမည်' : 'Install Yoyaku App Now'}</span>
              </button>
            `
                : isIos
                  ? `
              <div class="p-4 rounded-2xl bg-[#FBF3E2] border border-[#EADFD1] space-y-3">
                <div class="font-headline font-bold text-xs text-[#231916] uppercase tracking-wider">
                  ${isMm ? 'iOS Safari တွင် ထည့်သွင်းနည်း' : 'Instructions for iPhone / iPad'}
                </div>
                <div class="space-y-2 text-xs text-[#58413f]">
                  <div class="flex items-start gap-2.5">
                    <span class="w-5 h-5 rounded-full bg-[#840f16] text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                    <span>${isMm ? 'Safari ဘရောက်ဆာ အောက်ခြေရှိ <b>Share (မျှဝေရန်)</b> ခလုတ်ကို နှိပ်ပါ' : 'Tap the <b>Share</b> button <span class="material-symbols-outlined text-xs align-middle">ios_share</span> in Safari’s toolbar.'}</span>
                  </div>
                  <div class="flex items-start gap-2.5">
                    <span class="w-5 h-5 rounded-full bg-[#840f16] text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                    <span>${isMm ? 'အောက်သို့ ဆွဲချပြီး <b>"Add to Home Screen"</b> ကို ရွေးချယ်ပါ' : 'Scroll down and tap <b>"Add to Home Screen"</b> <span class="material-symbols-outlined text-xs align-middle">add_box</span>.'}</span>
                  </div>
                </div>
              </div>
            `
                  : `
              <div class="p-4 rounded-2xl bg-[#FBF3E2] border border-[#EADFD1] space-y-2">
                <div class="font-headline font-bold text-xs text-[#231916]">
                  ${isMm ? 'ဘရောက်ဆာ ဆက်တင်မှ ထည့်သွင်းရန်' : 'Install via Browser Menu'}
                </div>
                <p class="font-body text-xs text-[#58413f] leading-relaxed">
                  ${
                    isMm
                      ? 'ဘရောက်ဆာ၏ ညာဘက်အပေါ်ထောင့်ရှိ Menu (⋮) ကို နှိပ်ပြီး <b>"Install app"</b> သို့မဟုတ် <b>"Add to Home screen"</b> ကို ရွေးချယ်ပါ'
                      : 'Click the browser menu (⋮) and choose <b>"Install Yoyaku"</b> or <b>"Add to Home Screen"</b>.'
                  }
                </p>
              </div>
            `
            }

            <div class="text-center pt-1">
              <button
                type="button"
                id="pwa-dismiss-modal-btn"
                class="font-label text-xs font-bold text-[#8d7b75] hover:text-[#231916] cursor-pointer"
              >
                ${isMm ? 'နောက်မှ ပြုလုပ်မည်' : 'Maybe Later'}
              </button>
            </div>

          </div>
        </div>
      `;
    }

    return '';
  }

  function attachInfoModalsEvents(container = document) {
    // Close buttons
    container.querySelectorAll('#close-info-modal, #close-pwa-modal-btn, #pwa-dismiss-modal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.PwaManager) {
          window.PwaManager.closeInstallModal();
        }
        store.closeInfoModal();
      });
    });

    // PWA Prompt Install Button Action
    const pwaPromptBtn = container.querySelector('#pwa-prompt-install-action-btn');
    if (pwaPromptBtn) {
      pwaPromptBtn.addEventListener('click', () => {
        if (window.PwaManager) {
          window.PwaManager.promptInstall();
          window.PwaManager.closeInstallModal();
        }
        store.closeInfoModal();
      });
    }

    // Auth Submit
    const authForm = container.querySelector('#auth-form');
    if (authForm) {
      authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        store.toggleAuth(true);
        store.closeInfoModal();
        store.showToast('Successfully signed in!');
      });
    }

    const signupBtn = container.querySelector('#auth-toggle-signup');
    if (signupBtn) {
      signupBtn.addEventListener('click', () => {
        store.closeInfoModal();
        store.setActiveTab('register');
      });
    }

    // Owner Application Submit
    const ownerForm = container.querySelector('#owner-app-form');
    if (ownerForm) {
      ownerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        store.closeInfoModal();
        store.showToast('Partner Application Submitted! Our team will contact you within 24 hours.');
      });
    }

    // Guest Booking Check Form
    const checkForm = container.querySelector('#check-booking-form');
    if (checkForm) {
      checkForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const val = container.querySelector('#guest-lookup-input')?.value.trim().toUpperCase();
        if (!val) return;

        const state = store.getState();
        const match = state.reservations.find(b =>
          b.reservationNo.toUpperCase().includes(val) ||
          b.guestPhone.includes(val) ||
          b.guestName.toLowerCase().includes(val.toLowerCase())
        );

        if (match) {
          store.setGuestBookingCheckResult({ query: val, found: true, booking: match });
        } else {
          store.setGuestBookingCheckResult({ query: val, found: false });
        }
      });
    }

    // View QR from check modal
    const viewQrBtn = container.querySelector('#guest-view-qr');
    if (viewQrBtn) {
      viewQrBtn.addEventListener('click', () => {
        const res = store.getState().guestBookingCheckResult;
        if (res && res.booking) {
          store.closeInfoModal();
          store.setInspectedPassBooking(res.booking);
        }
      });
    }
  }


  window.YoyakuComponents.renderInfoModals = renderInfoModals;
  window.YoyakuComponents.attachInfoModalsEvents = attachInfoModalsEvents;
})();
