/* ============================================================
   EzBookNow Screen Jump Adapter — user-yoyaku (v2.2 Specification)
   Bridges the cross-app Screen Jump devtool to the
   EzBookNow v2.2 routing and screen structure.
   
   Active Pkg1 Core Screens: U-01 to U-14
   Post-Pkg1 Deferred Screens: U-51+
   Deleted: U-21 / U-59 (Waitlist completely removed)
   ============================================================ */
(() => {
  const store = window.store;
  if (!store) return;

  const JUMP_MAP = {
    'U-01': () => { window.location.hash = '#/s/gilded-fork'; },
    'U-02': () => { window.location.hash = '#/s/gilded-fork/book'; },
    'U-03': () => { window.location.hash = '#/s/gilded-fork/confirm'; },
    'U-04': () => { window.location.hash = '#/s/gilded-fork/complete'; },
    'U-05': () => { window.location.hash = '#/s/gilded-fork/info'; },
    'U-06': () => { window.location.hash = '#/login'; },
    'U-07': () => { window.location.hash = '#/register'; },
    'U-08': () => { window.location.hash = '#/forgot-password'; },
    'U-09': () => { window.location.hash = '#/mypage'; },
    'U-10': () => {
      const res = (store.getState().reservations || [])[0];
      const id = res ? (res.reservationNo || res.id) : 'RSV-2026-001';
      window.location.hash = `#/reservations/${id}`;
    },
    'U-11': () => { window.location.hash = '#/settings'; },
    'U-12': () => { window.location.hash = '#/'; },
    'U-13': () => {
      store.openOtpModal({ caller: 'settings', phoneNumber: store.getState().myPageData.userPhone || '+95 9 123 456 789' });
    },
    'U-14': () => { window.location.hash = '#/notifications'; },
    'U-51': () => { window.location.hash = '#/discover'; },
    'U-52': () => { window.location.hash = '#/search'; },
    'U-54': () => {
      store.setActiveTab('mypage');
      store.setMyPageActiveMenu('coupons');
    },
    'U-56': () => {
      store.setActiveTab('mypage');
      store.setMyPageActiveMenu('notif-settings');
    },
    'U-60': () => {
      store.setActiveTab('mypage');
      store.setMyPageActiveMenu('points');
    }
  };

  function currentScreen() {
    const hash = window.location.hash || '';
    if (hash.includes('/complete')) return { id: 'U-04', name: '予約完了', pkg: 'Pkg1' };
    if (hash.includes('/confirm')) return { id: 'U-03', name: '予約確認', pkg: 'Pkg1' };
    if (hash.includes('/book')) return { id: 'U-02', name: '予約入力', pkg: 'Pkg1' };
    if (hash.includes('/info')) return { id: 'U-05', name: '店舗情報ページ', pkg: 'Pkg1' };
    if (hash.match(/^#\/s\/[^/?#]+/)) return { id: 'U-01', name: '予約ページ (SNS Landing)', pkg: 'Pkg1' };
    if (hash.startsWith('#/login')) return { id: 'U-06', name: 'ログイン / 予約照会', pkg: 'Pkg1' };
    if (hash.startsWith('#/register')) return { id: 'U-07', name: '会員登録', pkg: 'Pkg1' };
    if (hash.startsWith('#/forgot-password')) return { id: 'U-08', name: 'パスワードリセット', pkg: 'Pkg1' };
    if (hash.startsWith('#/reservations')) return { id: 'U-10', name: '予約詳細・変更・キャンセル', pkg: 'Pkg1' };
    if (hash.startsWith('#/settings')) return { id: 'U-11', name: 'アカウント設定・退会', pkg: 'Pkg1' };
    if (hash === '#/' || hash === '#/root') return { id: 'U-12', name: 'サービス紹介 (ルートLP)', pkg: 'Pkg1' };
    if (hash.startsWith('#/notifications')) return { id: 'U-14', name: '通知センター', pkg: 'Pkg1' };
    if (hash.startsWith('#/mypage')) return { id: 'U-09', name: 'マイページ (予約履歴)', pkg: 'Pkg1' };
    if (hash.startsWith('#/discover')) return { id: 'U-51', name: 'トップ (ホーム)', pkg: 'Post-Pkg1' };
    if (hash.startsWith('#/search')) return { id: 'U-52', name: '検索結果一覧', pkg: 'Post-Pkg1' };

    const st = store.getState();
    if (st.otpModalState && st.otpModalState.isOpen) return { id: 'U-13', name: 'SMS認証 (OTP入力)', pkg: 'Pkg1' };
    if (st.selectedReservationId) return { id: 'U-10', name: '予約詳細・変更・キャンセル', pkg: 'Pkg1' };
    if (st.bookingModalState && st.bookingModalState.isOpen && st.bookingModalState.restaurant) {
      if (st.bookingModalState.step === 4) return { id: 'U-04', name: '予約完了', pkg: 'Pkg1' };
      if (st.bookingModalState.step === 3) return { id: 'U-03', name: '予約確認', pkg: 'Pkg1' };
      if (st.bookingModalState.step === 2) return { id: 'U-02', name: '予約入力', pkg: 'Pkg1' };
      return { id: 'U-01', name: '予約ページ (SNS Landing)', pkg: 'Pkg1' };
    }
    if (st.selectedRestaurant) return { id: 'U-05', name: '店舗情報ページ', pkg: 'Pkg1' };
    if (st.activeTab === 'login') return { id: 'U-06', name: 'ログイン / 予約照会', pkg: 'Pkg1' };
    if (st.activeTab === 'register') return { id: 'U-07', name: '会員登録', pkg: 'Pkg1' };
    if (st.activeTab === 'root-lp') return { id: 'U-12', name: 'サービス紹介 (ルートLP)', pkg: 'Pkg1' };
    if (st.activeTab === 'mypage') return { id: 'U-09', name: 'マイページ (予約履歴)', pkg: 'Pkg1' };
    return { id: 'U-01', name: '予約ページ (SNS Landing)', pkg: 'Pkg1' };
  }

  function getPkgStyle(pkg) {
    if (pkg === 'Pkg1') return 'background:#9B1C25;color:#fff;';
    return 'background:#64748b;color:#fff;';
  }

  function refreshBadge() {
    let badge = document.getElementById('screen-id-badge');
    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'screen-id-badge';
      badge.style.cssText = 'display:none;';
      document.body.appendChild(badge);
      badge.addEventListener('click', toggleDevDrawer);
    } else {
      badge.style.display = 'none';
    }
  }

  function toggleDevDrawer() {
    let drawer = document.getElementById('screen-jump-drawer-v2');
    if (!drawer) {
      drawer = document.createElement('div');
      drawer.id = 'screen-jump-drawer-v2';
      drawer.style.cssText = 'position:fixed;top:0;right:0;width:340px;height:100%;background:#FFFDFC;border-left:1px solid #E8DDD0;box-shadow:-4px 0 24px rgba(0,0,0,0.15);z-index:10000;display:flex;flex-direction:column;font-family:Manrope,sans-serif;';
      
      const pkg1Screens = [
        { id: 'U-01', name: '予約ページ (SNS Landing)', path: '#/s/gilded-fork' },
        { id: 'U-02', name: '予約入力', path: '#/s/gilded-fork/book' },
        { id: 'U-03', name: '予約確認', path: '#/s/gilded-fork/confirm' },
        { id: 'U-04', name: '予約完了', path: '#/s/gilded-fork/complete' },
        { id: 'U-05', name: '店舗情報ページ', path: '#/s/gilded-fork/info' },
        { id: 'U-06', name: 'ログイン / 予約照会', path: '#/login' },
        { id: 'U-07', name: '会員登録', path: '#/register' },
        { id: 'U-08', name: 'パスワードリセット', path: '#/forgot-password' },
        { id: 'U-09', name: 'マイページ (予約履歴)', path: '#/mypage' },
        { id: 'U-10', name: '予約詳細・変更・キャンセル', path: '#/reservations/RSV-2026-001' },
        { id: 'U-11', name: 'アカウント設定・退会', path: '#/settings' },
        { id: 'U-12', name: 'サービス紹介 (ルートLP)', path: '#/' },
        { id: 'U-13', name: 'SMS認証 (OTP入力)', action: 'U-13' },
        { id: 'U-14', name: '通知センター', path: '#/notifications' }
      ];

      const postPkg1Screens = [
        { id: 'U-51', name: 'トップ (ホーム)', path: '#/discover' },
        { id: 'U-52', name: '検索結果一覧', path: '#/search' },
        { id: 'U-54', name: 'クーポン一覧', action: 'U-54' },
        { id: 'U-56', name: '通知設定・Viber連携', action: 'U-56' },
        { id: 'U-60', name: 'ポイント・会員ランク', action: 'U-60' }
      ];

      drawer.innerHTML = `
        <div style="padding:16px 20px;border-bottom:1px solid #E8DDD0;display:flex;justify-content:space-between;align-items:center;background:#FBF4E8;">
          <div>
            <div style="font-size:10px;font-weight:800;color:#9B1C25;text-transform:uppercase;letter-spacing:1px;">Screen Jump Devtool</div>
            <div style="font-size:14px;font-weight:700;color:#241A18;">EzBookNow v2.2 Catalog</div>
          </div>
          <button id="close-drawer-v2-btn" style="border:none;background:#F8EFE5;width:28px;height:28px;border-radius:999px;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#6D6561;">
            <span class="material-symbols-outlined" style="font-size:16px;">close</span>
          </button>
        </div>

        <div style="flex:1;overflow-y:auto;padding:16px 20px;display:flex;flex-direction:column;gap:20px;">
          <!-- Pkg1 Section Only -->
          <div>
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;">
              <span style="font-size:10px;font-weight:800;background:#9B1C25;color:#fff;padding:2px 8px;border-radius:10px;">Pkg1 Core Screens (U-01 ~ U-14)</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;">
              ${pkg1Screens.map(s => `
                <button data-jump-id="${s.id}" style="width:100%;text-align:left;padding:8px 12px;border:1px solid #E8DDD0;border-radius:12px;background:#FFFDFC;display:flex;align-items:center;gap:10px;cursor:pointer;transition:background 0.15s;">
                  <span style="font-family:monospace;font-size:11px;font-weight:700;color:#9B1C25;background:#F3DFD5;padding:2px 6px;border-radius:6px;">${s.id}</span>
                  <span style="font-size:12px;font-weight:600;color:#241A18;flex:1;">${s.name}</span>
                </button>
              `).join('')}
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(drawer);

      drawer.querySelector('#close-drawer-v2-btn').addEventListener('click', () => {
        drawer.style.display = 'none';
      });

      drawer.querySelectorAll('[data-jump-id]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-jump-id');
          if (JUMP_MAP[id]) {
            JUMP_MAP[id]();
            drawer.style.display = 'none';
            setTimeout(refreshBadge, 100);
          }
        });
      });
      return;
    }

    drawer.style.display = drawer.style.display === 'none' ? 'flex' : 'none';
  }

  function init() {
    refreshBadge();
    window.addEventListener('hashchange', refreshBadge);
    if (store.subscribe) store.subscribe(refreshBadge);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  window.ScreenJumpAdapter = { refreshBadge, jumpTo: (id) => JUMP_MAP[id] && JUMP_MAP[id]() };
})();
