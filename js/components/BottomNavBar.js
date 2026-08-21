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
      <nav class="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFF7E8]/95 backdrop-blur-lg border-t border-[#EADFD1] px-3 py-2">
        <div class="flex items-center justify-around max-w-md mx-auto">
          ${items
            .map(item => {
              const isActive = state.activeTab === item.id;
              return `
                <button
                  data-bottom-tab="${item.id}"
                  aria-label="${item.label}"
                  title="${item.label}"
                  class="w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer relative ${
                    isActive
                      ? 'bg-[#840f16] text-white shadow-sm font-bold scale-105'
                      : 'text-[#58413f] hover:text-[#231916] hover:bg-[#840f16]/10'
                  }"
                >
                  <div class="relative flex items-center justify-center">
                    <span class="material-symbols-outlined text-2xl">${item.icon}</span>
                    ${
                      item.badge && item.badge > 0
                        ? `<span class="absolute -top-1.5 -right-2.5 bg-[#D08E1C] text-white font-label text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#FFF7E8]">
                            ${item.badge}
                          </span>`
                        : ''
                    }
                  </div>
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
