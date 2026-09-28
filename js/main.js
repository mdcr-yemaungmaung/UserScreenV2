/* ==========================================================================
   EzBookNow User Application Runtime & Routing Controller
   EzBookNow v2.2 ID Renumbering & Routing Specification:
     - U-01: #/s/{slug}             Booking Landing Page
     - U-02: #/s/{slug}/book        Booking Input Form
     - U-03: #/s/{slug}/confirm     Booking Confirmation Page
     - U-04: #/s/{slug}/complete    Booking Success & QR Pass
     - U-05: #/s/{slug}/info        Store Info Page
     - U-06: #/login                Login & Reservation Lookup
     - U-07: #/register             Member Signup
     - U-08: #/forgot-password      Password Reset
     - U-09: #/mypage               My Page & History
     - U-10: #/reservations/{id}    Booking Details / Modify / Cancel
     - U-11: #/settings             Account Settings
     - U-12: #/                     Platform Root LP (Service Intro)
     - U-13: (Modal)                SMS OTP Verification Modal
     - U-14: #/notifications        Notification Center
     - Deferred:
       - U-51: #/discover           Home Discovery
       - U-52: #/search             Search Results
       - U-54: #/coupons            Coupons
       - U-60: #/points             Points & Membership
   ========================================================================== */

(() => {
  const store = window.store;
  const {
    renderTopNavBar,
    attachTopNavBarEvents,
    renderBottomNavBar,
    attachBottomNavBarEvents,
    renderFooter,
    attachFooterEvents,
    renderDiscoverView,
    attachDiscoverViewEvents,
    renderResultListView,
    attachResultListViewEvents,
    renderRestaurantDetailView,
    attachRestaurantDetailViewEvents,
    renderBookingStep1,
    attachBookingStep1Events,
    renderBookingStep2,
    attachBookingStep2Events,
    renderBookingStep3,
    attachBookingStep3Events,
    renderBookingStep4,
    attachBookingStep4Events,
    renderFavoritesView,
    attachFavoritesViewEvents,
    renderCuratedView,
    attachCuratedViewEvents,
    renderMyPageView,
    attachMyPageViewEvents,
    renderBookingDetailView,
    attachBookingDetailViewEvents,
    renderLoginView,
    attachLoginViewEvents,
    renderRegisterView,
    attachRegisterViewEvents,
    renderServiceIntroView,
    attachServiceIntroEvents,
    renderSmsOtpModal,
    attachSmsOtpEvents,
    renderInfoModals,
    attachInfoModalsEvents,
    renderToast,
    renderSearchConditionModal,
    attachSearchConditionModalEvents
  } = window.YoyakuComponents || {};

  function syncRouteDrivenState() {
    const hash = window.location.hash || '';

    // If empty hash, default to U-01 (Booking page for default restaurant: /s/gilded-fork)
    if (!hash || hash === '#') {
      window.location.hash = '#/s/gilded-fork';
      return;
    }

    // U-04: /s/{slug}/complete
    const completeMatch = hash.match(/^#\/s\/([^/?#]+)\/complete/);
    if (completeMatch) {
      const rest = store.getRestaurantBySlug ? store.getRestaurantBySlug(completeMatch[1]) : null;
      if (rest) {
        store.openBookingModal(rest);
        store.setBookingStep(4);
      }
      return;
    }

    // U-03: /s/{slug}/confirm
    const confirmMatch = hash.match(/^#\/s\/([^/?#]+)\/confirm/);
    if (confirmMatch) {
      const rest = store.getRestaurantBySlug ? store.getRestaurantBySlug(confirmMatch[1]) : null;
      if (rest) {
        store.openBookingModal(rest);
        store.setBookingStep(3);
      }
      return;
    }

    // U-02: /s/{slug}/book
    const bookMatch = hash.match(/^#\/s\/([^/?#]+)\/book/);
    if (bookMatch) {
      const rest = store.getRestaurantBySlug ? store.getRestaurantBySlug(bookMatch[1]) : null;
      if (rest) {
        store.openBookingModal(rest);
        store.setBookingStep(2);
      }
      return;
    }

    // U-05: /s/{slug}/info (Store Info)
    const infoMatch = hash.match(/^#\/s\/([^/?#]+)\/info/);
    if (infoMatch) {
      const rest = store.getRestaurantBySlug ? store.getRestaurantBySlug(infoMatch[1]) : null;
      if (rest) {
        store.closeBookingModal();
        store.setSelectedRestaurant(rest);
      }
      return;
    }

    // U-01: /s/{slug} (SNS Landing & Direct Booking)
    const bookingMatch = hash.match(/^#\/s\/([^/?#]+)/);
    if (bookingMatch) {
      const rest = store.getRestaurantBySlug ? store.getRestaurantBySlug(bookingMatch[1]) : null;
      if (rest) {
        store.setSelectedRestaurant(null);
        store.openBookingModal(rest);
        store.setBookingStep(1);
      }
      return;
    }

    // Guest Lookup direct route: #/lookup
    if (hash.startsWith('#/lookup')) {
      store.closeBookingModal();
      store.setSelectedRestaurant(null);
      store.clearSelectedReservationDetail();
      store.setLoginTab('lookup');
      store.setActiveTab('login');

      const queryMatch = hash.match(/\?(.*)$/);
      if (queryMatch) {
        const params = new URLSearchParams(queryMatch[1]);
        const qRes = params.get('res') || params.get('resNo');
        const qPhone = params.get('phone');
        if (qRes) {
          store.executeLookupReservation(qRes, qPhone || '');
        }
      }
      return;
    }

    // U-06: /login
    if (hash.startsWith('#/login')) {
      store.closeBookingModal();
      store.setSelectedRestaurant(null);
      store.clearSelectedReservationDetail();
      store.setActiveTab('login');
      return;
    }

    // U-07: /register
    if (hash.startsWith('#/register')) {
      store.closeBookingModal();
      store.setSelectedRestaurant(null);
      store.clearSelectedReservationDetail();
      store.setActiveTab('register');
      return;
    }

    // U-08: /forgot-password
    if (hash.startsWith('#/forgot-password')) {
      store.closeBookingModal();
      store.setSelectedRestaurant(null);
      store.setActiveTab('login');
      store.setLoginField('showForgotPassword', true);
      return;
    }

    // U-09: /mypage
    if (hash.startsWith('#/mypage')) {
      store.closeBookingModal();
      store.setSelectedRestaurant(null);
      store.clearSelectedReservationDetail();
      store.setActiveTab('mypage');
      return;
    }

    // U-10: /reservations/{id}
    const resDetailMatch = hash.match(/^#\/reservations\/([^/?#]+)/);
    if (resDetailMatch) {
      store.closeBookingModal();
      store.setSelectedRestaurant(null);
      const isGuestMode = hash.includes('guest=true') || !!store.state.isGuestReservationView || (store.state.loginState && store.state.loginState.lookupResult !== null);
      const origin = store.state.reservationDetailOrigin || (isGuestMode ? 'lookup' : 'reservations');
      store.selectReservationForDetail(resDetailMatch[1], isGuestMode, origin);
      return;
    }

    // U-11: /settings
    if (hash.startsWith('#/settings')) {
      store.closeBookingModal();
      store.setSelectedRestaurant(null);
      store.clearSelectedReservationDetail();
      store.setActiveTab('mypage');
      store.setMyPageActiveMenu('account');
      return;
    }

    // U-12: #/ (Root Platform LP)
    if (hash === '#/' || hash === '#/root') {
      store.closeBookingModal();
      store.setSelectedRestaurant(null);
      store.clearSelectedReservationDetail();
      store.setActiveTab('root-lp');
      return;
    }

    // U-14: /notifications
    if (hash.startsWith('#/notifications')) {
      store.closeBookingModal();
      store.setSelectedRestaurant(null);
      store.clearSelectedReservationDetail();
      store.setActiveTab('mypage');
      store.setMyPageActiveMenu('notifications');
      return;
    }

    // Post-Pkg1 Deferred routes
    if (hash.startsWith('#/discover')) {
      store.closeBookingModal();
      store.setSelectedRestaurant(null);
      store.clearSelectedReservationDetail();
      store.setActiveTab('discover');
      return;
    }

    if (hash.startsWith('#/search') || hash.startsWith('#/resultlist')) {
      store.closeBookingModal();
      store.setSelectedRestaurant(null);
      store.clearSelectedReservationDetail();
      store.setActiveTab('resultlist');
      return;
    }
  }

  function renderApp() {
    const root = document.getElementById('root');
    if (!root) return;

    const state = store.getState();

    // Determine Main View Content
    let mainContentHtml = '';

    if (state.selectedReservationId && renderBookingDetailView) {
      // U-10 Booking Detail
      mainContentHtml = renderBookingDetailView(state);
    } else if (state.bookingModalState.isOpen && state.bookingModalState.restaurant) {
      // U-01 ~ U-04 Booking Sequence
      const step = state.bookingModalState.step;
      if (step === 1 && renderBookingStep1) {
        mainContentHtml = renderBookingStep1(state);
      } else if (step === 2 && renderBookingStep2) {
        mainContentHtml = renderBookingStep2(state);
      } else if (step === 3 && renderBookingStep3) {
        mainContentHtml = renderBookingStep3(state);
      } else if (step === 4 && renderBookingStep4) {
        mainContentHtml = renderBookingStep4(state);
      }
    } else if (state.selectedRestaurant && renderRestaurantDetailView) {
      // U-05 Shop Info
      mainContentHtml = renderRestaurantDetailView(state.selectedRestaurant, state);
    } else if (state.activeTab === 'root-lp' && renderServiceIntroView) {
      // U-12 Root LP
      mainContentHtml = renderServiceIntroView(state);
    } else {
      switch (state.activeTab) {
        case 'discover':
          mainContentHtml = renderDiscoverView ? renderDiscoverView(state) : '';
          break;
        case 'resultlist':
          mainContentHtml = renderResultListView ? renderResultListView(state) : '';
          break;
        case 'reservations':
        case 'mypage':
          mainContentHtml = renderMyPageView ? renderMyPageView(state) : '';
          break;
        case 'favorites':
          mainContentHtml = renderFavoritesView ? renderFavoritesView(state) : '';
          break;
        case 'curated':
          mainContentHtml = renderCuratedView ? renderCuratedView(state) : '';
          break;
        case 'login':
          mainContentHtml = renderLoginView ? renderLoginView(state) : '';
          break;
        case 'register':
          mainContentHtml = renderRegisterView ? renderRegisterView(state) : '';
          break;
        default:
          mainContentHtml = renderBookingStep1 ? renderBookingStep1(state) : '';
      }
    }

    const isAuthPage = !state.bookingModalState.isOpen && !state.selectedRestaurant && (state.activeTab === 'login' || state.activeTab === 'register');

    // Full Shell Assembly for Auth Pages (Login & Register)
    if (isAuthPage) {
      root.innerHTML = `
        <div class="min-h-screen w-full bg-[#FBF4E8] flex items-center justify-center">
          <main class="w-full flex items-center justify-center">
            ${mainContentHtml}
          </main>
          ${renderToast ? renderToast(state) : ''}
          ${renderInfoModals ? renderInfoModals(state) : ''}
          ${renderSmsOtpModal ? renderSmsOtpModal(state) : ''}
        </div>
      `;

      if (window.YoyakuPrototype && window.YoyakuPrototype.enhanceRuntime) {
        window.YoyakuPrototype.enhanceRuntime(root);
      }

      if (state.activeTab === 'login' && attachLoginViewEvents) {
        attachLoginViewEvents(root);
      } else if (state.activeTab === 'register' && attachRegisterViewEvents) {
        attachRegisterViewEvents(root);
      }
      if (attachInfoModalsEvents) attachInfoModalsEvents(root);
      if (attachSmsOtpEvents) attachSmsOtpEvents(root);
      return;
    }

    const isDirectBookingFlow = !!(state.bookingModalState && state.bookingModalState.isOpen);
    const hideBottomNav = isDirectBookingFlow || !!state.selectedRestaurant || !!state.selectedReservationId || state.activeTab === 'root-lp';

    root.innerHTML = `
      <div class="min-h-screen flex flex-col justify-between ${hideBottomNav ? 'pb-0' : 'pb-20 md:pb-0'}">
        <!-- Top Navigation Header -->
        ${renderTopNavBar ? renderTopNavBar(state) : ''}

        <!-- Main Body Container -->
        <main class="flex-1">
          ${mainContentHtml}
        </main>

        <!-- App Footer -->
        ${renderFooter ? renderFooter(state) : ''}

        <!-- Toast Overlay -->
        ${renderToast ? renderToast(state) : ''}

        <!-- Info & Auth Modals Overlay -->
        ${renderInfoModals ? renderInfoModals(state) : ''}

        <!-- U-13 SMS OTP Modal Overlay -->
        ${renderSmsOtpModal ? renderSmsOtpModal(state) : ''}

        <!-- Search Condition Animated Full-Screen Overlay -->
        ${renderSearchConditionModal ? renderSearchConditionModal(state) : ''}

        <!-- Mobile Bottom Navigation Bar -->
        ${hideBottomNav ? '' : (renderBottomNavBar ? renderBottomNavBar(state) : '')}
      </div>
    `;

    if (window.YoyakuPrototype && window.YoyakuPrototype.enhanceRuntime) {
      window.YoyakuPrototype.enhanceRuntime(root);
    }

    // Attach All Dynamic Event Handlers
    if (attachTopNavBarEvents) attachTopNavBarEvents(root);
    if (!hideBottomNav && attachBottomNavBarEvents) attachBottomNavBarEvents(root);
    if (attachFooterEvents) attachFooterEvents(root);
    if (attachInfoModalsEvents) attachInfoModalsEvents(root);
    if (attachSmsOtpEvents) attachSmsOtpEvents(root);

    if (state.searchConditionOpen && attachSearchConditionModalEvents) {
      attachSearchConditionModalEvents(root);
    }

    if (state.selectedReservationId && attachBookingDetailViewEvents) {
      attachBookingDetailViewEvents(root);
    } else if (state.bookingModalState.isOpen && state.bookingModalState.restaurant) {
      const step = state.bookingModalState.step;
      if (step === 1 && attachBookingStep1Events) {
        attachBookingStep1Events(root);
      } else if (step === 2 && attachBookingStep2Events) {
        attachBookingStep2Events(root);
      } else if (step === 3 && attachBookingStep3Events) {
        attachBookingStep3Events(root);
      } else if (step === 4 && attachBookingStep4Events) {
        attachBookingStep4Events(root);
      }
    } else if (state.selectedRestaurant && attachRestaurantDetailViewEvents) {
      attachRestaurantDetailViewEvents(root);
    } else if (state.activeTab === 'root-lp' && attachServiceIntroEvents) {
      attachServiceIntroEvents(root);
    } else {
      switch (state.activeTab) {
        case 'discover':
          if (attachDiscoverViewEvents) attachDiscoverViewEvents(root);
          break;
        case 'resultlist':
          if (attachResultListViewEvents) attachResultListViewEvents(root);
          break;
        case 'reservations':
        case 'mypage':
          if (attachMyPageViewEvents) attachMyPageViewEvents(root);
          break;
        case 'favorites':
          if (attachFavoritesViewEvents) attachFavoritesViewEvents(root);
          break;
        case 'curated':
          if (attachCuratedViewEvents) attachCuratedViewEvents(root);
          break;
      }
    }
  }

  function startApp() {
    syncRouteDrivenState();
    renderApp();
    store.subscribe(renderApp);

    window.addEventListener('hashchange', () => {
      syncRouteDrivenState();
      renderApp();
    });

    // Re-render when crossing the lg breakpoint (window resize / device rotation)
    let lastIsDesktop = window.innerWidth >= 1024;
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const isDesktop = window.innerWidth >= 1024;
        if (isDesktop !== lastIsDesktop) {
          lastIsDesktop = isDesktop;
          if (!isDesktop && store.state.activeTab === 'mypage') {
            store.setMyPageActiveMenu('menu');
          } else {
            store.notify();
          }
        }
      }, 150);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp, { once: true });
  } else {
    startApp();
  }

  window.YoyakuPrototype = window.YoyakuPrototype || {};
  window.YoyakuPrototype.renderApp = renderApp;
})();
