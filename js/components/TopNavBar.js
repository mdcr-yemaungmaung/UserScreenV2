(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;



  function renderTopNavBar(state) {
    const isMm = state.currentLanguage === 'MM';
    const isMyPageActive = state.activeTab === 'mypage';
    const unreadNotifsCount = state.myPageData.notifications.filter(n => n.isUnread).length;
    const isOnline = window.PwaManager ? window.PwaManager.isOnline : true;
    const isStandalone = window.PwaManager ? window.PwaManager.isStandalone : false;

    return `
      ${!isOnline ? `
        <div class="bg-[#231916] text-[#FBF3E2] px-4 py-2 text-center text-xs font-label font-bold flex items-center justify-center gap-2 border-b border-amber-500/40 z-50">
          <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span class="material-symbols-outlined text-sm text-amber-400">cloud_off</span>
          <span>${isMm ? 'လိုင်းမရှိပါ (Offline Mode) — သင်၏ QR Pass နှင့် စိုတ်ယူထားမှုများကို ကြည့်ရှုနိုင်ပါသည်' : 'Offline Mode Active — Your saved bookings & QR passes remain available.'}</span>
        </div>
      ` : ''}
      <header class="sticky top-0 z-40 bg-[#FFF7E8]/95 backdrop-blur-md border-b border-[#EADFD1] transition-all">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          <!-- Brand Logo -->
          <button id="nav-brand-logo" class="flex items-center gap-2.5 cursor-pointer group text-left shrink-0">
            <div class="h-10 w-auto flex items-center group-hover:scale-105 transition-transform shrink-0">
              <svg class="h-10 w-auto" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="navPinLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#93181F"/>
                    <stop offset="100%" stop-color="#7C0E15"/>
                  </linearGradient>
                  <linearGradient id="navPinRight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#6F0A11"/>
                    <stop offset="100%" stop-color="#55050A"/>
                  </linearGradient>
                </defs>
                <!-- LEFT HALF OF PIN -->
                <path d="M 100 12 C 58 12 24 46 24 88 C 24 128 62 170 100 216 L 100 12 Z" fill="url(#navPinLeft)" />
                <!-- RIGHT HALF OF PIN -->
                <path d="M 100 12 L 100 216 C 138 170 176 128 176 88 C 176 46 142 12 100 12 Z" fill="url(#navPinRight)" />
                <!-- SPOON CUTOUT -->
                <path d="M 93 208 C 94 185 88 150 78 126 C 67 99 68 56 100 56 C 132 56 133 99 122 126 C 112 150 106 185 107 208 Z" fill="#FFF7E8" />
                <!-- CENTER RED DOT -->
                <circle cx="100" cy="94" r="14" fill="#7C0E15" />
                <circle cx="98" cy="92" r="13" fill="#93181F" />
              </svg>
            </div>
            <div class="hidden lg:block">
              <span class="font-headline text-2xl font-black tracking-tight text-[#1B2028] block leading-none">
                Yoyaku
              </span>
            </div>
          </button>

          <!-- Header Actions: Owner Link, Check Booking, Language & Auth -->
          <div class="flex items-center gap-2 sm:gap-3">
            
            <!-- Restaurant Owners Application Link -->
            <button
              id="nav-owner-link"
              class="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#840f16]/5 border border-[#840f16]/20 font-label text-[11px] font-bold text-[#840f16] hover:bg-[#840f16] hover:text-white transition-all cursor-pointer"
              title="${isMm ? 'ဆိုင်ပိုင်ရှင်များ' : 'For Restaurant Owners'}"
            >
              <span class="material-symbols-outlined text-sm">storefront</span>
              <span class="truncate">${isMm ? 'ဆိုင်ပိုင်ရှင်များ' : 'For Restaurant Owners'}</span>
            </button>

            <!-- Check Guest Booking Link -->
            <button
              id="nav-check-booking-link"
              class="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FBF3E2] border border-[#EADFD1] font-label text-[11px] font-bold text-[#58413f] hover:text-[#840f16] hover:border-[#840f16] transition-all cursor-pointer"
              title="${isMm ? 'စိုတ်ထားမှု စစ်ဆေးရန်' : 'Check Reservation'}"
            >
              <span class="material-symbols-outlined text-sm">confirmation_number</span>
              <span class="truncate">${isMm ? 'စိုတ်ထားမှု စစ်ဆေးရန်' : 'Check Reservation'}</span>
            </button>

            <!-- Language Selector Switcher -->
            <div class="relative inline-block text-left">
              <button
                id="lang-dropdown-btn"
                class="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full bg-[#FBF3E2] border border-[#EADFD1] font-label text-xs font-bold text-[#58413f] hover:text-[#231916] hover:border-[#840f16] transition-colors cursor-pointer"
              >
                <span class="material-symbols-outlined text-base text-[#840f16]">language</span>
                <span>${state.currentLanguage === 'EN' ? 'EN' : 'မြန်မာ'}</span>
                <span class="material-symbols-outlined text-sm">expand_more</span>
              </button>

              <!-- Dropdown Menu -->
              <div
                id="lang-dropdown-menu"
                class="hidden absolute right-0 mt-2 w-36 rounded-2xl bg-[#FFF7E8] border border-[#EADFD1] shadow-xl z-50 overflow-hidden py-1"
              >
                <button
                  data-lang="EN"
                  class="w-full text-left px-4 py-2 font-label text-xs font-bold flex items-center justify-between cursor-pointer hover:bg-[#FBF3E2] ${
                    state.currentLanguage === 'EN' ? 'text-[#840f16]' : 'text-[#58413f]'
                  }"
                >
                  <span>English (EN)</span>
                  ${state.currentLanguage === 'EN' ? '<span class="material-symbols-outlined text-sm">check</span>' : ''}
                </button>
                <button
                  data-lang="MM"
                  class="w-full text-left px-4 py-2 font-label text-xs font-bold flex items-center justify-between cursor-pointer hover:bg-[#FBF3E2] ${
                    state.currentLanguage === 'MM' ? 'text-[#840f16]' : 'text-[#58413f]'
                  }"
                >
                  <span>မြန်မာ (MM)</span>
                  ${state.currentLanguage === 'MM' ? '<span class="material-symbols-outlined text-sm">check</span>' : ''}
                </button>
              </div>
            </div>

            ${state.isAuthenticated ? `
              <!-- Notifications Bell Icon -->
              <button
                id="nav-notif-btn"
                class="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FBF3E2] border border-[#EADFD1] hover:border-[#840f16] flex items-center justify-center text-[#58413f] hover:text-[#840f16] transition-colors cursor-pointer shrink-0"
                title="${isMm ? 'အသိပေးချက်များ' : 'Notifications'}"
              >
                <span class="material-symbols-outlined text-xl">notifications</span>
                ${unreadNotifsCount > 0 ? `
                  <span class="absolute -top-1 -right-1 w-4 h-4 bg-[#840f16] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    ${unreadNotifsCount}
                  </span>
                ` : ''}
              </button>

              <!-- Profile Avatar & Dropdown Popup -->
              <div class="relative inline-block text-left">
                <button
                  id="nav-profile-menu-btn"
                  class="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 transition-all cursor-pointer shrink-0 flex items-center justify-center font-headline font-bold text-sm bg-[#840f16] text-white ${
                    isMyPageActive
                      ? 'border-[#840f16] ring-2 ring-[#840f16]/40 shadow-md'
                      : 'border-[#EADFD1] hover:border-[#840f16]'
                  }"
                  title="${isMm ? (state.myPageData.userNameMM || state.myPageData.userName || 'Profile') : (state.myPageData.userName || 'Profile')}"
                >
                  <span class="uppercase">${(state.myPageData.userName || 'a').charAt(0)}</span>
                </button>

                <!-- Profile Dropdown Popup Menu -->
                <div
                  id="nav-profile-dropdown-menu"
                  class="hidden absolute right-0 mt-2.5 w-60 rounded-2xl bg-white border border-[#EADFD1] shadow-2xl z-50 overflow-hidden py-2 text-left"
                >
                  <!-- User Header -->
                  <div class="px-4 py-2.5">
                    <div class="font-headline font-bold text-sm text-[#231916] truncate">
                      ${isMm ? (state.myPageData.userNameMM || state.myPageData.userName || 'alex') : (state.myPageData.userName || 'alex')}
                    </div>
                    <div class="font-body text-xs text-[#8d7b75] truncate mt-0.5">
                      ${state.myPageData.userEmail || 'alex@example.com'}
                    </div>
                  </div>

                  <div class="border-t border-[#EADFD1] my-1.5"></div>

                  <!-- My Page Option -->
                  <button
                    id="profile-dropdown-mypage-btn"
                    class="w-full text-left px-4 py-2.5 font-label text-xs font-bold text-[#231916] hover:bg-[#FBF3E2] hover:text-[#840f16] flex items-center gap-3 transition-colors cursor-pointer"
                  >
                    <span class="material-symbols-outlined text-lg text-[#58413f]">person</span>
                    <span>${isMm ? 'ကျွန်ုပ်၏ စာမျက်နှာ' : 'My Page'}</span>
                  </button>

                  <div class="border-t border-[#EADFD1] my-1.5"></div>

                  <!-- Logout Option -->
                  <button
                    id="profile-dropdown-logout-btn"
                    class="w-full text-left px-4 py-2.5 font-label text-xs font-bold text-[#840f16] hover:bg-[#840f16]/10 flex items-center gap-3 transition-colors cursor-pointer"
                  >
                    <span class="material-symbols-outlined text-lg">logout</span>
                    <span>${isMm ? 'အကောင့်ထွက်ရန်' : 'Logout'}</span>
                  </button>
                </div>
              </div>
            ` : `
              <!-- Login / Sign Up buttons when unauthenticated -->
              <button
                id="nav-login-btn"
                class="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#840f16] text-[#840f16] font-label text-xs font-bold hover:bg-[#840f16] hover:text-white transition-all cursor-pointer"
              >
                ${isMm ? 'အကောင့်ဝင်ရန်' : 'Login'}
              </button>
              <button
                id="nav-signup-btn"
                class="hidden sm:inline-block px-4 py-2 rounded-full bg-[#840f16] text-white font-label text-xs font-bold hover:bg-[#680b11] shadow-sm transition-all cursor-pointer"
              >
                ${isMm ? 'အကောင့်ဖွင့်ရန်' : 'Sign Up'}
              </button>
            `}

          </div>
        </div>
      </header>
    `;
  }

  function attachTopNavBarEvents() {
    // Brand logo
    const logo = document.getElementById('nav-brand-logo');
    if (logo) {
      logo.addEventListener('click', () => {
        store.setSelectedRestaurant(null);
        store.setActiveTab('discover');
      });
    }

    // Owner application link
    const ownerBtn = document.getElementById('nav-owner-link');
    if (ownerBtn) {
      ownerBtn.addEventListener('click', () => {
        store.openInfoModal('owner_application');
      });
    }

    // Check booking link
    const checkBtn = document.getElementById('nav-check-booking-link');
    if (checkBtn) {
      checkBtn.addEventListener('click', () => {
        store.setSelectedRestaurant(null);
        store.setLoginTab('lookup');
        store.setActiveTab('login');
      });
    }

    // Notifications button
    const notifBtn = document.getElementById('nav-notif-btn');
    if (notifBtn) {
      notifBtn.addEventListener('click', () => {
        store.openInfoModal('notifications');
      });
    }

    // Login / Signup buttons
    const loginBtn = document.getElementById('nav-login-btn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => {
        store.setSelectedRestaurant(null);
        store.setLoginTab('login');
        store.setActiveTab('login');
      });
    }

    const signupBtn = document.getElementById('nav-signup-btn');
    if (signupBtn) {
      signupBtn.addEventListener('click', () => {
        store.setSelectedRestaurant(null);
        store.setActiveTab('register');
      });
    }

    // Nav tabs
    document.querySelectorAll('[data-nav-tab]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-nav-tab');
        store.setSelectedRestaurant(null);
        store.setActiveTab(tab);
      });
    });

    // Profile dropdown toggle
    const profileBtn = document.getElementById('nav-profile-menu-btn');
    const profileMenu = document.getElementById('nav-profile-dropdown-menu');
    if (profileBtn && profileMenu) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // Close language dropdown if open
        if (langMenu) langMenu.classList.add('hidden');
        profileMenu.classList.toggle('hidden');
      });

      profileMenu.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      document.addEventListener('click', () => {
        profileMenu.classList.add('hidden');
      });
    }

    // Profile Dropdown: My Page link
    const profileMyPageBtn = document.getElementById('profile-dropdown-mypage-btn');
    if (profileMyPageBtn) {
      profileMyPageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (profileMenu) profileMenu.classList.add('hidden');
        store.setSelectedRestaurant(null);
        store.setActiveTab('mypage');
        store.setMyPageActiveMenu('reservations');
      });
    }

    // Profile Dropdown: Logout link
    const profileLogoutBtn = document.getElementById('profile-dropdown-logout-btn');
    if (profileLogoutBtn) {
      profileLogoutBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (profileMenu) profileMenu.classList.add('hidden');
        const isMm = store.getState().currentLanguage === 'MM';
        store.toggleAuth(false);
        store.setActiveTab('discover');
        store.showToast(isMm ? 'အကောင့်ထွက်ပြီးပါပြီ' : 'Logged out successfully');
      });
    }

    // Language dropdown toggle
    const langBtn = document.getElementById('lang-dropdown-btn');
    const langMenu = document.getElementById('lang-dropdown-menu');
    if (langBtn && langMenu) {
      langBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (profileMenu) profileMenu.classList.add('hidden');
        langMenu.classList.toggle('hidden');
      });

      langMenu.addEventListener('click', (e) => {
        e.stopPropagation();
      });

      document.addEventListener('click', () => {
        langMenu.classList.add('hidden');
      });
    }

    // Language item select
    document.querySelectorAll('[data-lang]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.currentTarget.getAttribute('data-lang');
        store.setLanguage(lang);
      });
    });
  }


  window.YoyakuComponents.renderTopNavBar = renderTopNavBar;
  window.YoyakuComponents.attachTopNavBarEvents = attachTopNavBarEvents;
})();
