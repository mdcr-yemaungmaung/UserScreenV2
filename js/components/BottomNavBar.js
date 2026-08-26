(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;



  function renderBottomNavBar(state) {
    // Hide on Shop Detail (U-03), Booking Flow Steps (U-04, U-05, U-06, U-07), and Booking Details
    const isShopDetail = !!state.selectedRestaurant;
    const isBookingFlow = !!(state.bookingModalState && state.bookingModalState.isOpen);
    const isBookingDetail = !!state.selectedReservationId;

    if (isShopDetail || isBookingFlow || isBookingDetail) {
      return '';
    }

    const isMm = state.currentLanguage === 'MM';
    const reservationCount = state.reservations.length;

    const isAuth = !!state.isAuthenticated;

    const items = [
      { id: 'discover', icon: 'explore', label: isMm ? 'ပင်မ' : 'Home' },
      { id: 'resultlist', icon: 'search', label: isMm ? 'ရှာဖွေရန်' : 'Search' },
      { id: 'reservations', icon: 'calendar_month', label: isMm ? 'စိုတ်ထားမှု' : 'Bookings', badge: reservationCount },
      { id: 'favorites', icon: 'favorite', label: isMm ? 'သိမ်းဆည်း' : 'Saved' },
      { id: isAuth ? 'mypage' : 'login', icon: isAuth ? 'person' : 'account_circle', label: isAuth ? (isMm ? 'မိုင်ပေ့ချ်' : 'My Page') : (isMm ? 'အကောင့်ဝင်' : 'Login') }
    ];

    return `
      <nav id="bottom-nav-bar" class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDFC]/95 backdrop-blur-xl border-t border-[#E8DDD0] px-2.5 pt-1.5 pb-[calc(0.6rem+env(safe-area-inset-bottom,0px))] sm:px-4 shadow-[0_-4px_24px_rgba(36,26,24,0.08)]">
        <div class="flex items-center justify-around max-w-md mx-auto gap-1">
          ${items
            .map(item => {
              const isActive = state.activeTab === item.id;
              return `
                <button
                  id="bottom-tab-${item.id}"
                  data-bottom-tab="${item.id}"
                  aria-label="${item.label}"
                  title="${item.label}"
                  class="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-2xl transition-all duration-150 cursor-pointer relative min-w-0 active:scale-90 ${
                    isActive
                        ? 'text-[#9B1C25] font-bold bg-[#F3DFD5] shadow-xs'
                        : 'text-[#6D6561] hover:text-[#241A18] hover:bg-[#F8EFE5] active:bg-[#F3DFD5]'
                  }"
                >
                  <div class="relative flex items-center justify-center">
                    <span class="material-symbols-outlined text-[24px] leading-none transition-transform duration-150 ${isActive ? 'scale-110' : ''}">${item.icon}</span>
                    ${
                      item.badge && item.badge > 0
                        ? `<span class="absolute -top-1 -right-2 bg-[#9B1C25] text-white font-label text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#FFFDFC] shadow-xs animate-pulse">
                            ${item.badge}
                          </span>`
                        : ''
                    }
                  </div>
                  <span class="font-label text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-bold text-[#9B1C25]' : 'font-medium text-[#6D6561]'}">${item.label}</span>
                </button>
              `;
            })
            .join('')}
        </div>
      </nav>
    `;
  }

  function attachBottomNavBarEvents() {
    document.querySelectorAll('[data-bottom-tab]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-bottom-tab');
        store.setSelectedRestaurant(null);
        store.setActiveTab(tab);
      });
    });
  }


  window.YoyakuComponents.renderBottomNavBar = renderBottomNavBar;
  window.YoyakuComponents.attachBottomNavBarEvents = attachBottomNavBarEvents;
})();
