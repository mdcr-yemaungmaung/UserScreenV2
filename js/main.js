(() => {
  const store = window.store;
  const { renderTopNavBar, attachTopNavBarEvents, renderBottomNavBar, attachBottomNavBarEvents, renderFooter, attachFooterEvents, renderDiscoverView, attachDiscoverViewEvents, renderResultListView, attachResultListViewEvents, renderRestaurantDetailView, attachRestaurantDetailViewEvents, renderBookingStep1, attachBookingStep1Events, renderBookingStep2, attachBookingStep2Events, renderBookingStep3, attachBookingStep3Events, renderBookingStep4, attachBookingStep4Events, renderFavoritesView, attachFavoritesViewEvents, renderCuratedView, attachCuratedViewEvents, renderMyPageView, attachMyPageViewEvents, renderBookingDetailView, attachBookingDetailViewEvents, renderLoginView, attachLoginViewEvents, renderRegisterView, attachRegisterViewEvents, renderInfoModals, attachInfoModalsEvents, renderToast } = window.YoyakuComponents;

  function renderApp() {
    const root = document.getElementById('root');
    if (!root) return;

    const state = store.getState();

    // Determine Main View Content
    let mainContentHtml = '';

    if (state.selectedReservationId && renderBookingDetailView) {
      mainContentHtml = renderBookingDetailView(state);
    } else if (state.bookingModalState.isOpen && state.bookingModalState.restaurant) {
      const step = state.bookingModalState.step;
      if (step === 1) {
        mainContentHtml = renderBookingStep1(state);
      } else if (step === 2) {
        mainContentHtml = renderBookingStep2(state);
      } else if (step === 3) {
        mainContentHtml = renderBookingStep3(state);
      } else if (step === 4) {
        mainContentHtml = renderBookingStep4(state);
      }
    } else if (state.selectedRestaurant) {
      mainContentHtml = renderRestaurantDetailView(state.selectedRestaurant, state);
    } else {
      switch (state.activeTab) {
        case 'discover':
          mainContentHtml = renderDiscoverView(state);
          break;
        case 'resultlist':
          mainContentHtml = renderResultListView(state);
          break;
        case 'reservations':
          mainContentHtml = renderMyPageView(state);
          break;
        case 'favorites':
          mainContentHtml = renderFavoritesView(state);
          break;
        case 'curated':
          mainContentHtml = renderCuratedView(state);
          break;
        case 'mypage':
          mainContentHtml = renderMyPageView(state);
          break;
        case 'login':
          mainContentHtml = renderLoginView(state);
          break;
        case 'register':
          mainContentHtml = renderRegisterView(state);
          break;
        default:
          mainContentHtml = renderDiscoverView(state);
      }
    }

    const isAuthPage = !state.bookingModalState.isOpen && !state.selectedRestaurant && (state.activeTab === 'login' || state.activeTab === 'register');

    // Full Shell Assembly for Auth Pages (Login & Register)
    if (isAuthPage) {
      root.innerHTML = `
        <div class="min-h-screen w-full bg-[#F8F4EC] flex items-center justify-center">
          <!-- Main Body Container -->
          <main class="w-full flex items-center justify-center">
            ${mainContentHtml}
          </main>

          <!-- Toast Overlay -->
          ${renderToast(state)}

          <!-- Info & Auth Modals Overlay -->
          ${renderInfoModals(state)}
        </div>
      `;

      window.YoyakuPrototype.enhanceRuntime(root);

      // Attach Login or Register & Modal Event Handlers
      if (state.activeTab === 'login') {
        attachLoginViewEvents(root);
      } else if (state.activeTab === 'register') {
        attachRegisterViewEvents(root);
      }
      attachInfoModalsEvents(root);
      return;
    }

    const hideBottomNav = !!state.selectedRestaurant || !!(state.bookingModalState && state.bookingModalState.isOpen) || !!state.selectedReservationId;

    root.innerHTML = `
      <div class="min-h-screen flex flex-col justify-between ${hideBottomNav ? 'pb-0' : 'pb-20 lg:pb-0'}">
        
        <!-- Top Navigation Header -->
        ${renderTopNavBar(state)}

        <!-- Main Body Container -->
        <main class="flex-1">
          ${mainContentHtml}
        </main>

        <!-- App Footer -->
        ${renderFooter(state)}

        <!-- Toast Overlay -->
        ${renderToast(state)}

        <!-- Info & Auth Modals Overlay -->
        ${renderInfoModals(state)}

        <!-- Mobile Bottom Navigation Bar -->
        ${renderBottomNavBar(state)}

      </div>
    `;

    window.YoyakuPrototype.enhanceRuntime(root);

    // Attach All Dynamic Event Handlers
    attachTopNavBarEvents(root);
    attachBottomNavBarEvents(root);
    attachFooterEvents(root);
    attachInfoModalsEvents(root);

    if (state.selectedReservationId && attachBookingDetailViewEvents) {
      attachBookingDetailViewEvents(root);
    } else if (state.bookingModalState.isOpen && state.bookingModalState.restaurant) {
      const step = state.bookingModalState.step;
      if (step === 1) {
        attachBookingStep1Events(root);
      } else if (step === 2) {
        attachBookingStep2Events(root);
      } else if (step === 3) {
        attachBookingStep3Events(root);
      } else if (step === 4) {
        attachBookingStep4Events(root);
      }
    } else if (state.selectedRestaurant) {
      attachRestaurantDetailViewEvents(root);
    } else {
      switch (state.activeTab) {
        case 'discover':
          attachDiscoverViewEvents(root);
          break;
        case 'resultlist':
          attachResultListViewEvents(root);
          break;
        case 'reservations':
          attachMyPageViewEvents(root);
          break;
        case 'favorites':
          attachFavoritesViewEvents(root);
          break;
        case 'curated':
          attachCuratedViewEvents(root);
          break;
        case 'mypage':
          attachMyPageViewEvents(root);
          break;
        case 'login':
          attachLoginViewEvents(root);
          break;
        case 'register':
          attachRegisterViewEvents(root);
          break;
      }
    }
  }


  function startApp() {
    renderApp();
    store.subscribe(renderApp);

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

  window.YoyakuPrototype.renderApp = renderApp;
})();
