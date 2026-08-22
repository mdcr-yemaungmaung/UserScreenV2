/* ============================================================
   EzBookNow Screen Jump Adapter — user-yoyaku
   Bridges the shared cross-app Screen Jump devtool
   (shared/devtools/screen-catalog.js & screen-jump.js) to the
   Yoyaku store-driven SPA, which has no hash routing.

   Maps Screen IDs (U-xx) to Yoyaku store actions, keeps the
   floating badge and the drawer active highlight in sync with
   the live store state.
   ============================================================ */
(() => {
  if (typeof ScreenJump === 'undefined' || typeof ScreenCatalog === 'undefined') return;
  const store = window.store;
  if (!store) return;

  const CATALOG = ScreenCatalog;
  const originalJumpTo = ScreenJump.jumpTo;
  const originalToggleDrawer = ScreenJump.toggleDrawer;

  // Yoyaku screens implemented in this prototype (mirrors the catalog 'yoyaku' variant)
  const YOYAKU_IDS = ['U-01', 'U-02', 'U-03', 'U-04', 'U-05', 'U-06', 'U-07', 'U-08', 'U-09', 'U-10', 'U-17', 'U-20'];

  function getScreen(id) {
    return CATALOG.allScreens('yoyaku').find(s => s.id === id) || CATALOG.allScreens().find(s => s.id === id) || null;
  }

  function firstRestaurant() {
    const data = (window.YoyakuData && window.YoyakuData.RESTAURANTS_DATA) || [];
    return data[0] || null;
  }

  function ensureBookingModal() {
    const state = store.getState();
    if (!state.bookingModalState.isOpen || !state.bookingModalState.restaurant) {
      store.setSelectedRestaurant(null);
      const r = firstRestaurant();
      if (r) store.openBookingModal(r);
    }
  }

  // Screen ID -> store action
  const JUMP_MAP = {
    'U-01': () => { store.closeBookingModal(); store.setSelectedRestaurant(null); store.setActiveTab('discover'); },
    'U-02': () => { store.closeBookingModal(); store.setSelectedRestaurant(null); store.setActiveTab('resultlist'); },
    'U-03': () => {
      store.closeBookingModal();
      const r = firstRestaurant();
      if (r) store.setSelectedRestaurant(r);
    },
    'U-04': () => {
      store.setSelectedRestaurant(null);
      const r = firstRestaurant();
      if (r) { store.openBookingModal(r); store.setBookingStep(1); }
    },
    'U-05': () => { ensureBookingModal(); store.setBookingStep(2); },
    'U-06': () => { ensureBookingModal(); store.setBookingStep(3); },
    'U-07': () => {
      ensureBookingModal();
      const st = store.getState();
      const base = st.reservations[0];
      const createdBooking = base ? Object.assign({}, base) : {
        reservationNo: 'RES-2026-NEW',
        restaurantName: st.bookingModalState.restaurant ? st.bookingModalState.restaurant.name : 'Yoyaku Restaurant',
        date: st.bookingModalState.bookingData.date,
        time: st.bookingModalState.bookingData.time,
        guests: st.bookingModalState.bookingData.guests,
        guestName: st.bookingModalState.guestData.guestName
      };
      store.setBookingStep(4, { createdBooking });
    },
    'U-08': () => {
      store.closeBookingModal(); store.setSelectedRestaurant(null); store.setActiveTab('mypage');
      store.closeMyPageModal(); store.setMyPageActiveMenu('reservations');
    },
    'U-09': () => { store.closeBookingModal(); store.setSelectedRestaurant(null); store.setActiveTab('reservations'); },
    'U-10': () => { store.closeBookingModal(); store.setSelectedRestaurant(null); store.setActiveTab('login'); },
    'U-11': () => { store.closeBookingModal(); store.setSelectedRestaurant(null); store.setActiveTab('register'); },
    'U-17': () => {
      store.closeBookingModal(); store.setSelectedRestaurant(null); store.setActiveTab('mypage');
      store.closeMyPageModal(); store.setMyPageActiveMenu('notif-settings');
    },
    'U-20': () => {
      store.closeBookingModal(); store.setSelectedRestaurant(null); store.setActiveTab('mypage');
      store.closeMyPageModal(); store.setMyPageActiveMenu('account');
    }
  };

  function currentScreen() {
    const st = store.getState();
    if (st.bookingModalState.isOpen && st.bookingModalState.restaurant) {
      if (st.bookingModalState.step === 4) return getScreen('U-07');
      if (st.bookingModalState.step === 3) return getScreen('U-06');
      if (st.bookingModalState.step === 2) return getScreen('U-05');
      return getScreen('U-04');
    }
    if (st.selectedRestaurant) return getScreen('U-03');
    switch (st.activeTab) {
      case 'resultlist': return getScreen('U-02');
      case 'reservations': return getScreen('U-09');
      case 'mypage':
        if (st.myPageActiveMenu === 'notif-settings') return getScreen('U-17');
        if (st.myPageActiveMenu === 'account') return getScreen('U-20');
        return getScreen('U-08');
      case 'login': return getScreen('U-10');
      case 'register': return getScreen('U-11');
      default: return getScreen('U-01');
    }
  }

  function getPkgStyle(pkg) {
    if (pkg === 'Pkg1') return 'background:#0284c7;color:#fff;';
    if (pkg === 'Pkg2') return 'background:#16a34a;color:#fff;';
    if (pkg === 'Pkg3') return 'background:#7c3aed;color:#fff;';
    return 'background:#64748b;color:#fff;';
  }

  function refreshBadge() {
    const badge = document.getElementById('screen-id-badge');
    if (!badge) return;
    const screen = currentScreen();
    const id = screen ? screen.id : 'Unknown';
    const pkg = (screen && screen.pkg && screen.app !== 'hub')
      ? `<span style="font-size:9.5px;font-weight:800;padding:1px 6px;border-radius:10px;${getPkgStyle(screen.pkg)}">${screen.pkg}</span>`
      : '';
    badge.innerHTML = `
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#aaf457" stroke-width="2.6">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
      <span>${id}</span>${pkg}
      <span style="font-size:9.5px;color:#94a3b8;margin-left:1px;">(Jump)</span>
    `;

    document.querySelectorAll('.sj-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.sj-item-id').forEach(el => el.classList.remove('active'));
    if (screen) {
      const activeEl = document.getElementById('nav-item-' + screen.id);
      if (activeEl) {
        activeEl.classList.add('active');
        const idSpan = activeEl.querySelector('.sj-item-id');
        if (idSpan) idSpan.classList.add('active');
      }
    }
  }

  function jumpTo(id) {
    if (ScreenJump.getDrawerVariant() === 'yoyaku' && JUMP_MAP[id]) {
      JUMP_MAP[id]();
      const drawer = document.getElementById('screen-jump-drawer');
      const overlay = document.getElementById('screen-jump-overlay');
      if (drawer && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        if (overlay) overlay.classList.remove('open');
      }
      refreshBadge();
    } else {
      originalJumpTo(id);
    }
  }

  function toggleDrawer() {
    originalToggleDrawer();
    refreshBadge();
  }

  function init() {
    ScreenJump.init({ app: 'user', variant: 'yoyaku' });
    ScreenJump.jumpTo = jumpTo;
    ScreenJump.toggleDrawer = toggleDrawer;
    refreshBadge();

    // Re-apply active highlight after the drawer opens via the badge click
    // (the shared tool's internal click handler is not observable).
    const badge = document.getElementById('screen-id-badge');
    if (badge) {
      badge.addEventListener('click', () => setTimeout(refreshBadge, 50));
    }

    if (store.subscribe) store.subscribe(() => refreshBadge());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
