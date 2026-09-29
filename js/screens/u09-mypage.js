(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;
  const t = (k) => window.I18n ? window.I18n.t(k) : (window.YoyakuI18n ? window.YoyakuI18n.t(k) : k);
  const { renderRatingBadge, renderCuisineTag, renderTrendingCard } = window.YoyakuComponents || {};
  const MYPAGE_MODAL_FOCUSABLE_SELECTOR = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let myPageModalFocusReturnTarget = null;
  let myPageModalKeydownHandler = null;

  function rememberMyPageModalTrigger(target = document.activeElement) {
    if (target && typeof target.focus === 'function') {
      myPageModalFocusReturnTarget = target;
    }
  }

  function getMyPageModalFocusableElements(modalShell) {
    if (!modalShell) return [];
    return Array.from(modalShell.querySelectorAll(MYPAGE_MODAL_FOCUSABLE_SELECTOR)).filter(el => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true');
  }

  function syncMyPageModalAccessibility(containerElement) {
    if (myPageModalKeydownHandler) {
      document.removeEventListener('keydown', myPageModalKeydownHandler);
      myPageModalKeydownHandler = null;
    }

    const modalShell = containerElement.querySelector('[data-mypage-modal-shell]');
    if (!modalShell) {
      if (myPageModalFocusReturnTarget && document.contains(myPageModalFocusReturnTarget)) {
        myPageModalFocusReturnTarget.focus();
      }
      myPageModalFocusReturnTarget = null;
      return;
    }

    const focusableElements = getMyPageModalFocusableElements(modalShell);
    const initialFocusTarget = modalShell.querySelector('[data-mypage-modal-initial-focus]') || focusableElements[0] || modalShell;
    if (!modalShell.contains(document.activeElement) && typeof initialFocusTarget.focus === 'function') {
      initialFocusTarget.focus();
    }

    myPageModalKeydownHandler = (event) => {
      const liveModalShell = document.querySelector('[data-mypage-modal-shell]');
      if (!liveModalShell) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        store.closeMyPageModal();
        return;
      }

      if (event.key !== 'Tab') return;

      const liveFocusableElements = getMyPageModalFocusableElements(liveModalShell);
      if (!liveFocusableElements.length) {
        event.preventDefault();
        liveModalShell.focus();
        return;
      }

      const firstFocusable = liveFocusableElements[0];
      const lastFocusable = liveFocusableElements[liveFocusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstFocusable) {
        event.preventDefault();
        lastFocusable.focus();
      } else if (!event.shiftKey && document.activeElement === lastFocusable) {
        event.preventDefault();
        firstFocusable.focus();
      }
    };

    document.addEventListener('keydown', myPageModalKeydownHandler);
  }

  function renderDiningPlateIcon() {
    return `
      <div class="w-12 h-12 rounded-xl bg-[#FFF8F6] border border-[#EADFD1] flex items-center justify-center shrink-0 shadow-2xs">
        <svg class="w-8 h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Fork -->
          <path d="M13 14V20C13 21.6569 14.3431 23 16 23V34" stroke="#840f16" stroke-width="2" stroke-linecap="round"/>
          <path d="M16 14V23" stroke="#840f16" stroke-width="1.8" stroke-linecap="round"/>
          <path d="M19 14V20C19 21.6569 17.6569 23 16 23" stroke="#840f16" stroke-width="2" stroke-linecap="round"/>
          <!-- Plate Rim -->
          <circle cx="26" cy="24" r="10" fill="#FBF3E2" stroke="#D08E1C" stroke-width="2"/>
          <circle cx="26" cy="24" r="6.5" stroke="#EADFD1" stroke-width="1.5" stroke-dasharray="2 2"/>
          <!-- Knife -->
          <path d="M35 14V34M35 14C35 14 32 16.5 32 20.5V23.5H35" stroke="#840f16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    `;
  }

  function renderStatusPill(status) {
    const s = (status || '').toLowerCase();
    if (s === 'confirmed') {
      return `
        <span class="resv-status-badge resv-status-confirmed">
          <span class="material-symbols-outlined text-sm status-icon">check_circle</span>
          <span>${t('mypage_confirmed')}</span>
        </span>
      `;
    }
    if (s === 'pending') {
      return `
        <span class="resv-status-badge resv-status-pending">
          <span class="material-symbols-outlined text-sm status-icon">schedule</span>
          <span>${t('mypage_pending')}</span>
        </span>
      `;
    }
    if (s === 'completed') {
      return `
        <span class="resv-status-badge resv-status-completed">
          <span class="material-symbols-outlined text-sm status-icon">task_alt</span>
          <span>${t('mypage_completed')}</span>
        </span>
      `;
    }
    if (s === 'cancelled' || s === 'canceled') {
      return `
        <span class="resv-status-badge resv-status-cancelled">
          <span class="material-symbols-outlined text-sm status-icon">cancel</span>
          <span>${t('mypage_cancelled')}</span>
        </span>
      `;
    }
    return `
      <span class="resv-status-badge resv-status-default">
        <span class="material-symbols-outlined text-sm">info</span>
        <span>${status}</span>
      </span>
    `;
  }

  // Mobile status icon (icon-only, no text, no box shape)
  function renderStatusIcon(status) {
    const s = (status || '').toLowerCase();
    const statusConfig = {
      confirmed: { icon: 'check_circle', color: '#059669' },
      pending: { icon: 'schedule', color: '#D97706' },
      completed: { icon: 'task_alt', color: '#475569' },
      cancelled: { icon: 'cancel', color: '#DC2626' }
    };
    const config = statusConfig[s] || { icon: 'help', color: '#9CA3AF' };
    return `<span class="material-symbols-outlined text-xl" style="color: ${config.color};">${config.icon}</span>`;
  }

  // 1. RESERVATIONS PANEL (Modern Luxe Concierge Passport Redesign)
  function renderReservationsPanel(state, isMm) {
    const currentSubTab = state.myPageSubTab || 'upcoming';
    const allReservations = state.reservations || [];
    let displayedReservations = allReservations;

    if (currentSubTab === 'upcoming') {
      displayedReservations = allReservations.filter(r => r.status === 'Confirmed' || r.status === 'Pending');
    } else if (currentSubTab === 'past') {
      displayedReservations = allReservations;
    }

    return `
      <div class="space-y-6">
        <!-- Header & Sub-Tabs -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EADFD1] pb-4">
          <div>
            <h2 class="font-headline text-2xl font-bold text-[#231916]">
              ${t('mypage_res_history')}
            </h2>
          </div>

          <div class="flex items-center gap-6">
            <button
              data-subtab="upcoming"
              class="pb-2 font-label text-xs sm:text-sm tracking-wide transition-all cursor-pointer relative ${
                currentSubTab === 'upcoming'
                  ? 'font-bold text-[#840f16] border-b-2 border-[#840f16]'
                  : 'font-semibold text-[#58413f] hover:text-[#231916]'
              }"
            >
              ${t('mypage_upcoming')} (${allReservations.filter(r => r.status === 'Confirmed' || r.status === 'Pending').length})
            </button>
            <button
              data-subtab="past"
              class="pb-2 font-label text-xs sm:text-sm tracking-wide transition-all cursor-pointer relative ${
                currentSubTab === 'past'
                  ? 'font-bold text-[#840f16] border-b-2 border-[#840f16]'
                  : 'font-semibold text-[#58413f] hover:text-[#231916]'
              }"
            >
              ${t('mypage_all')} (${allReservations.length})
            </button>
          </div>
        </div>

        <!-- Reservations List -->
        <div class="space-y-4">
          ${
            displayedReservations.length === 0
              ? `
                ${window.YoyakuComponents.renderEmptyState({
                  icon: 'event_busy',
                  title: t('mypage_no_res_title'),
                  message: t('mypage_no_res_msg'),
                  actionLabel: t('mypage_explore_restaurants'),
                  actionId: 'mypage-explore-btn'
                })}
              `
              : displayedReservations
                  .map(item => {
                    const status = item.status || 'Pending';
                    const statusLower = status.toLowerCase();
                    const isCompleted = statusLower === 'completed';

                    return `
                      <div class="luxe-card group bg-[#FFFDFC] rounded-2xl sm:rounded-3xl border border-[#E8DDD0] overflow-hidden p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3.5 sm:gap-4 text-left">

                        <!-- Top Row: Restaurant Name & Location (Left), Status Badge (Right) -->
                        <div class="flex items-start justify-between gap-3 w-full">
                          <div class="min-w-0 flex-1 space-y-1">
                            <h3
                              class="font-headline text-lg sm:text-xl md:text-2xl font-bold text-[#1E1B13] leading-snug truncate my-0.5"
                            >
                              ${isMm ? (item.restaurantNameMM || item.restaurantName) : item.restaurantName}
                            </h3>
                            <!-- Location -->
                            <div class="flex items-center gap-1.5 text-xs sm:text-sm text-[#58413f] font-medium font-body min-w-0">
                              <svg class="w-3.5 h-3.5 text-[#840F16] shrink-0" style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                                <circle cx="12" cy="10" r="3"/>
                              </svg>
                              <span class="truncate">${item.location || 'Yangon Cultural District'}</span>
                            </div>
                          </div>
                          <div class="shrink-0 pt-0.5 flex items-center">
                            <!-- Desktop/Tablet: Full status pill with text -->
                            <span class="hidden sm:inline-flex">
                              ${renderStatusPill(item.status, isMm)}
                            </span>
                            <!-- Mobile: Icon only, no text, no box -->
                            <span class="inline-flex sm:hidden">
                              ${renderStatusIcon(item.status)}
                            </span>
                          </div>
                        </div>

                        <!-- Middle Row: Date, Time, Guests Badges -->
                        <div class="flex items-center flex-wrap gap-x-4 sm:gap-x-3.5 gap-y-2 text-xs sm:text-sm font-medium font-body">
                          <!-- Date -->
                          <span class="inline-flex items-center gap-1 sm:gap-1.5 px-0 sm:px-2.5 py-0 sm:py-1 bg-transparent sm:bg-[#FAF3E8] border-0 sm:border sm:border-[#EADFD1]/80 rounded-none sm:rounded-lg text-[#231916] whitespace-nowrap">
                            <svg class="w-3.5 h-3.5 text-[#840F16] shrink-0" style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                              <line x1="16" y1="2" x2="16" y2="6"/>
                              <line x1="8" y1="2" x2="8" y2="6"/>
                              <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            <span class="font-semibold">${item.date}</span>
                          </span>

                          <!-- Time -->
                          <span class="inline-flex items-center gap-1 sm:gap-1.5 px-0 sm:px-2.5 py-0 sm:py-1 bg-transparent sm:bg-[#FAF3E8] border-0 sm:border sm:border-[#EADFD1]/80 rounded-none sm:rounded-lg text-[#231916] whitespace-nowrap">
                            <svg class="w-3.5 h-3.5 text-[#840F16] shrink-0 ml-[2px]" style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <circle cx="12" cy="12" r="10"/>
                              <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            <span class="font-semibold">${item.time}</span>
                          </span>

                          <!-- Guests -->
                          <span class="inline-flex items-center gap-1 sm:gap-1.5 px-0 sm:px-2.5 py-0 sm:py-1 bg-transparent sm:bg-[#FAF3E8] border-0 sm:border sm:border-[#EADFD1]/80 rounded-none sm:rounded-lg text-[#231916] whitespace-nowrap">
                            <svg class="w-3.5 h-3.5 text-[#840F16] shrink-0" style="width: 14px; height: 14px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                              <circle cx="9" cy="7" r="4"/>
                              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                            <span class="font-semibold">${item.guests} ${t('mypage_guest_unit')}</span>
                          </span>
                        </div>

                        <!-- Bottom Action Bar -->
                        <div class="pt-3 border-t border-[#E8DDD0]/70 flex flex-wrap items-center justify-between gap-2.5 w-full">
                          <div class="text-[11px] font-mono text-[#8d7b75] hidden sm:inline-block">
                            ID: <span class="font-bold text-[#58413f]">#${item.id}</span>
                          </div>

                          <div class="flex items-center flex-wrap gap-2 w-full sm:w-auto justify-start sm:justify-end">
                            <!-- Details & Modify Button -->
                            <button
                              data-mypage-view-detail-id="${item.id}"
                              class="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-[#840f16] hover:text-white text-[#231916] border border-[#EADFD1] font-label font-bold text-xs transition-colors cursor-pointer shadow-2xs"
                              title="${t('mypage_details_and_modify')}"
                              aria-label="${t('mypage_details_and_modify')}"
                            >
                              <span class="material-symbols-outlined text-base">visibility</span>
                              <span>${t('mypage_details')}</span>
                            </button>

                            <!-- QR Pass Button (only for Confirmed) -->
                            ${status === 'Confirmed' ? `
                            <button
                              data-mypage-view-pass-id="${item.id}"
                              class="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-[#840f16] hover:text-white text-[#231916] border border-[#EADFD1] font-label font-bold text-xs transition-colors cursor-pointer shadow-2xs"
                              title="${t('mypage_view_qr_pass')}"
                              aria-label="${t('mypage_view_qr_pass')}"
                            >
                              <span class="material-symbols-outlined text-base">qr_code_2</span>
                              <span>${t('mypage_qr_pass')}</span>
                            </button>
                            ` : ''}

                            <!-- Extra Actions for Completed (Rebook) -->
                            ${
                              isCompleted
                                ? `
                                  <button
                                    data-rebook-id="${item.id}"
                                    data-rebook-rest-id="${item.restaurantId}"
                                    data-rebook-rest-name="${item.restaurantName}"
                                    data-rebook-date="${item.date}"
                                    data-rebook-time="${item.time}"
                                    data-rebook-guests="${item.guests}"
                                    class="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-[#FAF4EB] border border-[#EADFD1] text-[#58413F] font-label font-bold text-xs px-3.5 py-2 rounded-full transition-colors cursor-pointer shadow-2xs"
                                    title="${t('mypage_rebook_title')}"
                                  >
                                    <span class="material-symbols-outlined text-base">restart_alt</span>
                                    <span>${t('mypage_rebook')}</span>
                                  </button>
                                `
                                : ''
                            }
                          </div>
                        </div>

                      </div>
                    `;
                  })
                  .join('')
          }
        </div>
      </div>
    `;
  }



  // 6. NOTIFICATIONS PANEL
  function renderNotificationsPanel(state, isMm) {
    const myData = state.myPageData || {};
    const notifications = myData.notifications || [];

    return `
      <div class="space-y-6">
        <div class="flex items-center justify-between border-b border-[#EADFD1] pb-4">
          <div>
            <h2 class="font-headline text-2xl font-bold text-[#231916]">
              ${t('mypage_notif_center')}
            </h2>
          </div>

          <button
            id="mark-all-notifs-read-btn"
            class="text-xs font-label font-bold text-[#840f16] hover:underline cursor-pointer"
          >
            ${t('mypage_mark_all_read')}
          </button>
        </div>

        <div class="space-y-3">
          ${
            notifications.length === 0
              ? `
                ${window.YoyakuComponents.renderEmptyState({
                  icon: 'notifications_off',
                  title: t('mypage_no_notifs')
                })}
              `
              : notifications
                  .map(
                    n => `
                      <div class="bg-[#FFF8F6] p-4 rounded-xl border ${
                        n.isUnread ? 'border-[#840f16]/30 bg-[#FFF3D6]/20' : 'border-[#EADFD1]'
                      } flex items-start justify-between gap-3 shadow-xs">
                        <div class="flex items-start gap-3">
                          <div class="w-8 h-8 rounded-full ${
                            n.isUnread ? 'bg-[#840f16] text-white' : 'bg-[#EADFD1] text-[#58413f]'
                          } flex items-center justify-center shrink-0 mt-0.5">
                            <span class="material-symbols-outlined text-base">notifications</span>
                          </div>
                          <div class="space-y-0.5">
                            <div class="font-headline font-bold text-sm text-[#231916]">${n.title}</div>
                            <div class="font-body text-[11px] text-[#8d7b75]">${n.time}</div>
                          </div>
                        </div>

                        ${
                          n.isUnread
                            ? `<span class="w-2.5 h-2.5 rounded-full bg-[#840f16] shrink-0 mt-2"></span>`
                            : ''
                        }
                      </div>
                    `
                  )
                  .join('')
          }
        </div>
      </div>
    `;
  }


  // MAIN MY PAGE VIEW RENDERER
  function renderMyPageView(state) {
    const isMm = state.currentLanguage === 'MM';
    const myData = state.myPageData || {};
    const activeModal = state.myPageModal || 'none';
    let activeMenu = state.myPageActiveMenu || 'reservations';
    if (activeMenu === 'reservations-view') activeMenu = 'reservations';

    const activePassBooking = (state.reservations || []).find(r => r.id === state.activePassBookingId) || (state.reservations && state.reservations[0]) || null;
    const activePassResNo = activePassBooking?.reservationNo || activePassBooking?.id || 'R20260815-K7M2QX';
    const activePassRestName = isMm ? (activePassBooking?.restaurantNameMM || activePassBooking?.restaurantName) : activePassBooking?.restaurantName;
    const activePassQrImg = window.YoyakuPrototype ? window.YoyakuPrototype.createQrDataUri(`YOYAKU-${activePassResNo}`) : `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=YOYAKU-PASS-${activePassResNo}`;

    const menuItems = [
      { id: 'reservations', label: t('mypage_tab_reservations'), icon: 'calendar_today' },
      { id: 'notifications', label: t('mypage_tab_notifications'), icon: 'notifications' },
      { id: 'account', label: t('mypage_tab_account'), icon: 'manage_accounts' },
      { id: 'design-system', label: t('mypage_tab_design_system'), icon: 'palette' }
    ];

    // Helper to render the active screen in the right container
    function renderActiveScreenPanel() {
      if (activeMenu === 'account') {
        return window.YoyakuComponents.renderAccountSettingsView ? window.YoyakuComponents.renderAccountSettingsView(state) : '';
      }
      if (activeMenu === 'notifications') {
        return renderNotificationsPanel(state, isMm);
      }
      if (activeMenu === 'design-system') {
        return window.YoyakuComponents.renderComponentGallery
          ? window.YoyakuComponents.renderComponentGallery(state)
          : '';
      }
      // Default: reservations
      return renderReservationsPanel(state, isMm);
    }

    const isMobileMenuOverview = activeMenu === 'menu';

    return `
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 space-y-6 lg:space-y-8 text-left">

        <!-- DESKTOP HEADER -->
        <div class="hidden lg:flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#EADFD1] pb-4">
          <div>
            <h1 class="font-headline text-3xl sm:text-4xl font-extrabold text-[#231916] tracking-tight">
              ${t('mypage_title')}
            </h1>
          </div>

          <button
            id="mypage-new-reservation-btn"
            class="btn-primary px-6 py-2.5 rounded-full font-label text-xs font-semibold shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>${t('mypage_book_new_table')}</span>
            <span class="material-symbols-outlined text-sm">add</span>
          </button>
        </div>

        <!-- ========================================================================= -->
        <!-- TWO-COLUMN LAYOUT (DESKTOP width ≥ 1024px: SIDE BY SIDE IN ONE VIEWPORT) -->
        <!-- ========================================================================= -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <!-- MOBILE/TABLET VIEW (< 1024px) -->
          <div class="lg:hidden col-span-1 space-y-4">
            ${
              !isMobileMenuOverview
                ? `
                  <!-- Back to My Page Menu Bar on Mobile -->
                  <div class="flex items-center">
                    <button
                      data-mypage-back="menu"
                      class="inline-flex items-center gap-2 text-xs font-label font-bold text-[#840f16] hover:text-[#680b11] cursor-pointer py-1"
                    >
                      <span class="material-symbols-outlined text-base">arrow_back</span>
                      <span>${t('mypage_back_to_menu')}</span>
                    </button>
                  </div>

                  <!-- Active Mobile Screen Panel -->
                  <div class="space-y-4">
                    ${renderActiveScreenPanel()}
                  </div>
                `
                : `
                  <!-- Mobile User Profile Card -->
                  <div class="bg-[#FFF8F6] rounded-xl border border-[#EADFD1] p-6 text-center shadow-sm space-y-3 relative">
                    <div class="relative inline-block mx-auto">
                      <img
                        src="assets/images/user_avatar.jpg"
                        alt="${myData.userName || 'alex'}"
                        onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80';"
                        class="w-20 h-20 rounded-full object-cover border-4 border-[#EADFD1] mx-auto shadow-md"
                      />
                    </div>

                    <div class="space-y-1">
                      <h2 class="font-headline font-bold text-xl text-[#231916]">
                        ${isMm ? (myData.userNameMM || myData.userName || 'alex') : (myData.userName || 'alex')}
                      </h2>
                      <p class="font-body text-xs text-[#58413f]">
                        ${myData.userEmail || 'alex@example.com'}
                      </p>
                    </div>

                    <div class="pt-1">
                      <span class="inline-flex items-center gap-1.5 bg-[#E6F4EA] text-[#137333] border border-[#137333]/30 text-xs font-label font-bold tracking-wider px-3.5 py-1 rounded-full shadow-2xs">
                        <span class="material-symbols-outlined text-sm text-[#137333]">verified</span>
                        <span>${t('mypage_verified_member')}</span>
                      </span>
                    </div>
                  </div>

                  <!-- Mobile Language Preference Card (Single-tap notch-safe switcher) -->
                  <div class="bg-[#FFF8F6] rounded-xl border border-[#EADFD1] p-3.5 shadow-xs flex items-center justify-between gap-3">
                    <div class="flex items-center gap-2.5 min-w-0">
                      <div class="w-8 h-8 rounded-full bg-[#840f16]/10 text-[#840f16] flex items-center justify-center shrink-0">
                        <span class="material-symbols-outlined text-base">language</span>
                      </div>
                      <div class="min-w-0">
                        <div class="font-headline font-bold text-xs text-[#231916]">${t('mypage_language_setting')}</div>
                        <div class="font-body text-[11px] text-[#8d7b75]">${isMm ? t('mypage_current_lang_mm') : t('mypage_current_lang_en')}</div>
                      </div>
                    </div>

                    <div class="inline-flex rounded-full p-1 bg-[#EADFD1]/60 border border-[#EADFD1] shrink-0" role="radiogroup" aria-label="Language selector">
                      <button
                        type="button"
                        data-mypage-set-lang="EN"
                        class="px-3 py-1 rounded-full font-label text-xs font-bold transition-all cursor-pointer ${
                          !isMm ? 'bg-[#840f16] text-white shadow-xs' : 'text-[#58413f] hover:text-[#231916]'
                        }"
                      >
                        EN
                      </button>
                      <button
                        type="button"
                        data-mypage-set-lang="MM"
                        class="px-3 py-1 rounded-full font-label text-xs font-bold transition-all cursor-pointer ${
                          isMm ? 'bg-[#840f16] text-white shadow-xs' : 'text-[#58413f] hover:text-[#231916]'
                        }"
                      >
                        မြန်မာ
                      </button>
                    </div>
                  </div>

                  <!-- Mobile Menu List -->
                  <div class="bg-[#FFF8F6] rounded-xl border border-[#EADFD1] divide-y divide-[#EADFD1] overflow-hidden shadow-sm">
                    ${menuItems
                      .map(
                        item => `
                          <button
                            data-mypage-nav="${item.id}"
                            class="w-full flex items-center justify-between p-4 text-left hover:bg-[#FBF3E2] transition-colors cursor-pointer"
                          >
                            <div class="flex items-center gap-3.5">
                              <span class="material-symbols-outlined text-xl text-[#840f16]">${item.icon}</span>
                              <span class="font-headline font-bold text-sm text-[#231916]">${item.label}</span>
                            </div>
                            <span class="material-symbols-outlined text-lg text-[#8d7b75]">chevron_right</span>
                          </button>
                        `
                      )
                      .join('')}
                  </div>

                  <!-- Mobile Logout -->
                  <button
                    data-mypage-nav="logout"
                    class="w-full py-3 rounded-xl border border-[#840f16]/30 bg-[#FFF8F6] text-[#840f16] font-headline font-bold text-sm hover:bg-[#840f16]/10 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span class="material-symbols-outlined text-lg">logout</span>
                    <span>${t('mypage_logout')}</span>
                  </button>
                `
            }
          </div>

          <!-- ========================================================================= -->
          <!-- LEFT SIDEBAR: MY PAGE MENU (DESKTOP ONLY width ≥ 1024px) -->
          <!-- ========================================================================= -->
          <div class="hidden lg:block lg:col-span-4 xl:col-span-3 bg-[#FFFDFC] rounded-xl border border-[#E8DDD0] p-6 space-y-6 shadow-sm sticky top-24">

            <!-- User Profile Summary -->
            <div class="flex items-center gap-3.5 pb-4 border-b border-[#EADFD1]/80">
              <img
                src="assets/images/user_avatar.jpg"
                alt="${myData.userName || 'alex'}"
                onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80';"
                class="w-12 h-12 rounded-xl object-cover border border-[#EADFD1] shadow-sm shrink-0"
              />
              <div class="space-y-0.5 min-w-0">
                <h2 class="font-headline font-bold text-base text-[#231916] truncate">
                  ${isMm ? (myData.userNameMM || myData.userName || 'alex') : (myData.userName || 'alex')}
                </h2>
                <p class="font-body text-xs text-[#58413f] truncate">
                  ${myData.userEmail || 'alex@example.com'}
                </p>
                <div class="pt-1">
                  <span class="inline-flex items-center gap-1 bg-[#E6F4EA] text-[#137333] border border-[#137333]/30 text-[10px] font-label font-bold tracking-wider px-2.5 py-0.5 rounded-full">
                    <span class="material-symbols-outlined text-[12px] text-[#137333]">verified</span>
                    <span>${t('mypage_verified_member')}</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- Navigation Links -->
            <nav class="space-y-1.5">
              ${menuItems
                .map(item => {
                  const isActive = activeMenu === item.id;
                  if (isActive) {
                    return `
                      <button
                        data-mypage-nav="${item.id}"
                        class="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#840f16] text-white font-label font-bold text-xs tracking-wide shadow-sm transition-all text-left cursor-pointer"
                      >
                        <span class="material-symbols-outlined text-lg">${item.icon}</span>
                        <span class="truncate flex-1">${item.label}</span>
                        <span class="material-symbols-outlined text-sm opacity-80">chevron_right</span>
                      </button>
                    `;
                  }
                  return `
                    <button
                      data-mypage-nav="${item.id}"
                      class="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#58413f] hover:bg-[#840f16]/8 hover:text-[#840f16] font-label font-semibold text-xs tracking-wide transition-colors text-left cursor-pointer"
                    >
                      <span class="material-symbols-outlined text-lg text-[#8d7b75]">${item.icon}</span>
                      <span class="truncate flex-1">${item.label}</span>
                    </button>
                  `;
                })
                .join('')}

              <div class="pt-3 border-t border-[#EADFD1]">
                <button
                  data-mypage-nav="logout"
                  class="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[#840f16] hover:bg-[#840f16]/10 font-label font-bold text-xs tracking-wide transition-colors text-left cursor-pointer"
                >
                  <span class="material-symbols-outlined text-lg">logout</span>
                  <span>${t('mypage_logout')}</span>
                </button>
              </div>
            </nav>

          </div>

          <!-- ========================================================================= -->
          <!-- RIGHT COLUMN: SCREEN CONTENT (DESKTOP ONLY width ≥ 1024px) -->
          <!-- ========================================================================= -->
          <div class="hidden lg:block lg:col-span-8 xl:col-span-9 min-h-[620px]">
            ${renderActiveScreenPanel()}
          </div>

        </div>

        <!-- ========================================================================= -->
        <!-- MODALS (QR PASS, REVIEW, PHONE OTP) -->
        <!-- ========================================================================= -->

        <!-- PASS / QR MODAL -->
        ${
          activeModal === 'qr_pass'
            ? `
              <div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-3 sm:p-4 animate-fadeIn">
                <div
                  data-mypage-modal-shell
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="mypage-qr-pass-title"
                  aria-describedby="mypage-qr-pass-description"
                  tabindex="-1"
                  class="mt-auto w-full max-w-md rounded-[24px] border border-[#EADFD1] bg-[#FFF8F6] p-6 text-center shadow-2xl max-h-[90vh] overflow-y-auto sm:mt-0 sm:rounded-2xl"
                >
                  <div class="flex justify-between items-center border-b border-[#EADFD1] pb-3">
                    <div class="flex items-center gap-2">
                      <span class="material-symbols-outlined text-[#840f16]">qr_code_2</span>
                      <h3 id="mypage-qr-pass-title" class="font-headline text-lg font-bold text-[#231916]">${t('mypage_qr_modal_title')}</h3>
                    </div>
                    <button
                      type="button"
                      data-mypage-modal-close
                      data-mypage-modal-initial-focus
                      aria-label="${t('mypage_close_qr')}"
                      class="w-8 h-8 rounded-full bg-[#FBF3E2] hover:bg-[#EADFD1] flex items-center justify-center text-[#58413f] hover:text-[#840f16] cursor-pointer transition-colors"
                    >
                      <span class="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>

                  <!-- Restaurant & Reservation ID -->
                  <div class="space-y-2">
                    <div class="font-headline font-bold text-base text-[#231916]">${activePassRestName || t('mypage_restaurant_label')}</div>

                    <!-- Reservation ID Display without Box Shape -->
                    <div class="flex items-center justify-center gap-1.5">
                      <span class="text-[11px] font-bold text-[#7A6B65] uppercase tracking-wider">${t('mypage_res_id_label')}:</span>
                      <span class="font-mono text-xs sm:text-sm font-extrabold text-[#840f16] tracking-wide">${activePassResNo}</span>
                    </div>
                  </div>

                  <!-- QR Code -->
                  <div class="p-4 bg-white rounded-2xl border border-[#EADFD1] inline-block shadow-inner">
                    <img
                      src="${activePassQrImg}"
                      alt="QR Code"
                      class="w-44 h-44 mx-auto object-contain"
                      loading="lazy"
                    />
                  </div>

                  <p id="mypage-qr-pass-description" class="font-body text-xs text-[#58413f] leading-relaxed">${t('mypage_qr_desc')}</p>

                  <button type="button" data-mypage-modal-close class="btn-primary w-full py-3 rounded-full font-label text-xs font-bold cursor-pointer">
                    ${t('mypage_close_pass')}
                  </button>
                </div>
              </div>
            `
            : ''
        }



        <!-- PHONE OTP VERIFICATION MODAL -->
        ${
          activeModal === 'phone_otp'
            ? `
              <div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-3 sm:p-4 animate-fadeIn">
                <div
                  data-mypage-modal-shell
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="mypage-phone-otp-title"
                  aria-describedby="mypage-phone-otp-description"
                  tabindex="-1"
                  class="mt-auto w-full max-w-md rounded-[24px] border border-[#EADFD1] bg-[#FFF8F6] p-6 text-left shadow-2xl max-h-[90vh] overflow-y-auto sm:mt-0 sm:rounded-xl"
                >
                  <div class="flex justify-between items-center border-b border-[#EADFD1] pb-3">
                    <div class="flex items-center gap-2.5">
                      <div class="w-8 h-8 rounded-full bg-[#D08E1C]/10 text-[#D08E1C] flex items-center justify-center">
                        <span class="material-symbols-outlined text-lg">sms</span>
                      </div>
                      <h3 id="mypage-phone-otp-title" class="font-headline text-lg font-bold text-[#231916]">${t('mypage_otp_title')}</h3>
                    </div>
                    <button
                      type="button"
                      data-mypage-modal-close
                      aria-label="${t('mypage_close_otp')}"
                      class="w-8 h-8 rounded-full bg-[#FBF3E2] hover:bg-[#EADFD1] flex items-center justify-center text-[#58413f] cursor-pointer"
                    >
                      <span class="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>

                  <div class="space-y-3">
                    <p id="mypage-phone-otp-description" class="font-body text-xs text-[#58413f] leading-relaxed">
                      ${t('mypage_otp_desc_prefix')} <strong class="text-[#231916]">${myData.userPhone || ''}</strong> ${t('mypage_otp_desc_suffix')}
                    </p>

                    <div class="p-3 bg-[#FFF3D6] rounded-xl border border-[#EADFD1] flex items-center justify-between text-xs">
                      <span class="text-[#58413f] font-mono">${t('mypage_demo_code')} <strong>123456</strong></span>
                      <button id="u20-autofill-otp-btn" type="button" class="text-[#840f16] font-bold underline cursor-pointer hover:opacity-80">
                        ${t('mypage_autofill')}
                      </button>
                    </div>

                    <form id="u20-otp-form" class="space-y-3 pt-1">
                      <div>
                        <input
                          type="text"
                          id="u20-otp-input"
                          data-mypage-modal-initial-focus
                          maxlength="6"
                          placeholder="______"
                          class="w-full text-center tracking-[0.5em] font-mono text-2xl py-3 rounded-xl border border-[#EADFD1] focus:border-[#840f16] bg-white focus:outline-none"
                          required
                        />
                      </div>

                      <div class="flex items-center justify-between text-xs text-[#58413f] pt-1">
                        <span>${t('mypage_didnt_receive_code')}</span>
                        <button type="button" id="u20-resend-otp-btn" class="text-[#840f16] font-bold hover:underline cursor-pointer">
                          ${t('mypage_resend_sms')}
                        </button>
                      </div>

                      <button
                        type="submit"
                        class="btn-primary w-full py-3 rounded-full font-label font-bold text-xs cursor-pointer shadow-md mt-2"
                      >
                        ${t('mypage_verify_btn')}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            `
            : ''
        }

        <!-- ACCOUNT WITHDRAWAL CONFIRMATION MODAL -->
        ${
          activeModal === 'confirm_withdrawal'
            ? `
              <div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-end sm:items-center justify-center p-3 sm:p-4 animate-fadeIn">
                <div
                  data-mypage-modal-shell
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="mypage-confirm-withdraw-title"
                  aria-describedby="mypage-confirm-withdraw-description"
                  tabindex="-1"
                  class="mt-auto w-full max-w-md rounded-[24px] border border-[#840f16]/30 bg-[#FFF8F6] p-6 text-left shadow-2xl max-h-[90vh] overflow-y-auto sm:mt-0 sm:rounded-xl"
                >
                  <div class="w-12 h-12 rounded-full bg-[#840f16]/10 text-[#840f16] flex items-center justify-center mx-auto">
                    <span class="material-symbols-outlined text-2xl">warning</span>
                  </div>

                  <div class="text-center space-y-1">
                    <h3 id="mypage-confirm-withdraw-title" class="font-headline text-lg font-bold text-[#231916]">${t('mypage_withdraw_title')}</h3>
                    <p id="mypage-confirm-withdraw-description" class="font-body text-xs text-[#58413f]">
                      ${t('mypage_withdraw_desc')}
                    </p>
                  </div>

                  <div class="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      data-mypage-modal-close
                      data-mypage-modal-initial-focus
                      class="flex-1 py-2.5 rounded-full border border-[#EADFD1] text-[#58413f] hover:bg-[#FBF3E2] font-label text-xs font-semibold cursor-pointer"
                    >
                      ${t('mypage_keep_account')}
                    </button>
                    <button
                      id="u20-confirm-withdraw-final-btn"
                      class="flex-1 py-2.5 rounded-full bg-[#840f16] hover:bg-[#680b11] text-white font-label text-xs font-bold cursor-pointer shadow-md"
                    >
                      ${t('mypage_confirm_delete')}
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

  // ATTACH MY PAGE EVENTS
  function attachMyPageViewEvents(containerElement) {
    if (!containerElement) return;
    const isMm = store.getState().currentLanguage === 'MM';

    // New reservation button in header
    const newResvBtn = containerElement.querySelector('#mypage-new-reservation-btn');
    if (newResvBtn) {
      newResvBtn.addEventListener('click', () => {
        window.location.hash = '#/s/gilded-fork';
      });
    }

    // Language Switcher in MyPage (Mobile notch-safe)
    containerElement.querySelectorAll('[data-mypage-set-lang]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.currentTarget.getAttribute('data-mypage-set-lang');
        if (lang) {
          store.setLanguage(lang);
        }
      });
    });

    // Mobile Back to Menu button
    containerElement.querySelectorAll('[data-mypage-back]').forEach(btn => {
      btn.addEventListener('click', () => {
        store.setMyPageActiveMenu('menu');
      });
    });

    // Navigation item click
    containerElement.querySelectorAll('[data-mypage-nav]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const navId = e.currentTarget.getAttribute('data-mypage-nav');
        if (navId === 'logout') {
          store.toggleAuth(false);
          window.location.hash = '#/login';
          store.showToast(t('toast_logged_out'));
        } else {
          store.setMyPageActiveMenu(navId);
        }
      });
    });

    // Sub-tab toggling in reservation history
    containerElement.querySelectorAll('[data-subtab]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const subTab = e.currentTarget.getAttribute('data-subtab');
        store.setMyPageSubTab(subTab);
      });
    });

    // Copy reservation ID
    containerElement.querySelectorAll('[data-copy-resv-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const code = e.currentTarget.getAttribute('data-copy-resv-id');
        if (code) {
          navigator.clipboard.writeText(code);
          store.showToast(t('booking_id_copied'));
        }
      });
    });

    // Add to Calendar utility
    containerElement.querySelectorAll('[data-add-calendar-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const resId = e.currentTarget.getAttribute('data-add-calendar-id');
        const st = store.getState();
        const resv = (st.reservations || []).find(r => r.id === resId);
        if (resv) {
          store.showToast(`Calendar reminder added for ${resv.restaurantName} on ${resv.date} at ${resv.time}!`);
        } else {
          store.showToast(t('cal_selected_date'));
        }
      });
    });

    // Call venue concierge
    containerElement.querySelectorAll('[data-call-venue-phone]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const phone = e.currentTarget.getAttribute('data-call-venue-phone');
        if (phone) {
          store.showToast(`${t('connecting_venue_concierge')} ${phone}`);
        }
      });
    });

    // View Details & Modify (Navigate to U-10)
    containerElement.querySelectorAll('[data-mypage-view-detail-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const resId = e.currentTarget.getAttribute('data-mypage-view-detail-id');
        store.selectReservationForDetail(resId, false, 'reservations');
        window.location.hash = `#/reservations/${resId}`;
      });
    });

    // View QR Pass modal
    containerElement.querySelectorAll('[data-mypage-view-pass-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const passId = e.currentTarget.getAttribute('data-mypage-view-pass-id');
        rememberMyPageModalTrigger(e.currentTarget);
        store.openMyPageModal('qr_pass', passId);
      });
    });

    // Rebook with same conditions
    containerElement.querySelectorAll('[data-rebook-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const resId = e.currentTarget.getAttribute('data-rebook-id');
        store.rebookReservation(resId);
      });
    });

    // Mark all notifs read
    const markAllReadBtn = containerElement.querySelector('#mark-all-notifs-read-btn');
    if (markAllReadBtn) {
      markAllReadBtn.addEventListener('click', () => {
        store.updateMyPageData(data => ({
          ...data,
          notifications: (data.notifications || []).map(n => ({ ...n, isUnread: false }))
        }));
        store.showToast(t('toast_notifs_all_read'));
      });
    }

    // Restaurant title click -> view restaurant detail
    containerElement.querySelectorAll('[data-resv-select-id]').forEach(el => {
      el.addEventListener('click', (e) => {
        const restId = e.currentTarget.getAttribute('data-resv-select-id');
        const { RESTAURANTS_DATA } = window.YoyakuData || {};
        const target = (RESTAURANTS_DATA || []).find(r => r.id === restId) || (RESTAURANTS_DATA && RESTAURANTS_DATA[0]);
        if (target) store.setSelectedRestaurant(target);
      });
    });

    // Explore button in empty state
    const exploreBtn = containerElement.querySelector('#mypage-explore-btn');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', () => {
        window.location.hash = '#/s/gilded-fork';
      });
    }

    // Modal close button
    containerElement.querySelectorAll('[data-mypage-modal-close]').forEach(btn => {
      btn.addEventListener('click', () => {
        store.closeMyPageModal();
      });
    });

    // Sub-component event attachment (Account Settings U-20 & Notification Settings U-17)
    const state = store.getState();
    const activeMenu = state.myPageActiveMenu || 'reservations';
    if (activeMenu === 'account' && window.YoyakuComponents.attachAccountSettingsEvents) {
      window.YoyakuComponents.attachAccountSettingsEvents(containerElement);
    }
    if (activeMenu === 'design-system' && window.YoyakuComponents.attachComponentGalleryEvents) {
      window.YoyakuComponents.attachComponentGalleryEvents(containerElement);
      if (window.YoyakuComponents.attachRestaurantCardEvents) {
        window.YoyakuComponents.attachRestaurantCardEvents(containerElement);
      }
    }

    // OTP Modal events
    const autofillOtpBtn = containerElement.querySelector('#u20-autofill-otp-btn');
    if (autofillOtpBtn) {
      autofillOtpBtn.addEventListener('click', () => {
        const otpInput = containerElement.querySelector('#u20-otp-input');
        if (otpInput) otpInput.value = '123456';
      });
    }

    const resendOtpBtn = containerElement.querySelector('#u20-resend-otp-btn');
    if (resendOtpBtn) {
      resendOtpBtn.addEventListener('click', () => {
        store.showToast(t('toast_otp_resent'));
      });
    }

    const otpForm = containerElement.querySelector('#u20-otp-form');
    if (otpForm) {
      otpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const otpInput = containerElement.querySelector('#u20-otp-input');
        const code = otpInput ? otpInput.value.trim() : '';
        const res = store.verifyPhoneNumberOtp(code);
        store.closeMyPageModal();
        store.showToast(res.message);
      });
    }

    // Withdrawal Modal: Final Confirm
    const confirmWithdrawBtn = containerElement.querySelector('#u20-confirm-withdraw-final-btn');
    if (confirmWithdrawBtn) {
      confirmWithdrawBtn.addEventListener('click', () => {
        const res = store.withdrawAccount('Permanent withdrawal confirmed');
        store.closeMyPageModal();
        store.showToast(res.message);
      });
    }

    syncMyPageModalAccessibility(containerElement);
  }

  window.YoyakuComponents.renderMyPageView = renderMyPageView;
  window.YoyakuComponents.attachMyPageViewEvents = attachMyPageViewEvents;
  window.YoyakuComponents.renderReservationsListView = renderMyPageView;
  window.YoyakuComponents.attachReservationsListViewEvents = attachMyPageViewEvents;
})();
