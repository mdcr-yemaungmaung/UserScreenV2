(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;

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

  function renderStatusPill(status, isMm) {
    const s = (status || '').toLowerCase();
    if (s === 'confirmed') {
      return `
        <span class="resv-status-badge resv-status-confirmed">
          <span class="material-symbols-outlined text-sm status-icon">check_circle</span>
          <span>${isMm ? 'အတည်ပြုပြီး' : 'Confirmed'}</span>
        </span>
      `;
    }
    if (s === 'pending') {
      return `
        <span class="resv-status-badge resv-status-pending">
          <span class="material-symbols-outlined text-sm status-icon">schedule</span>
          <span>${isMm ? 'စောင့်ဆိုင်းဆဲ' : 'Pending'}</span>
        </span>
      `;
    }
    if (s === 'completed') {
      return `
        <span class="resv-status-badge resv-status-completed">
          <span class="material-symbols-outlined text-sm status-icon">task_alt</span>
          <span>${isMm ? 'ပြီးမြောက်ပြီး' : 'Completed'}</span>
        </span>
      `;
    }
    if (s === 'cancelled' || s === 'canceled') {
      return `
        <span class="resv-status-badge resv-status-cancelled">
          <span class="material-symbols-outlined text-sm status-icon">cancel</span>
          <span>${isMm ? 'ပယ်ဖျက်ပြီး' : 'Cancelled'}</span>
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
              ${isMm ? 'စိုတ်ထားမှု မှတ်တမ်း' : 'Reservation History'}
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
              ${isMm ? 'လာမည့် စိုတ်ထားမှုများ' : 'Upcoming'} (${allReservations.filter(r => r.status === 'Confirmed' || r.status === 'Pending').length})
            </button>
            <button
              data-subtab="past"
              class="pb-2 font-label text-xs sm:text-sm tracking-wide transition-all cursor-pointer relative ${
                currentSubTab === 'past'
                  ? 'font-bold text-[#840f16] border-b-2 border-[#840f16]'
                  : 'font-semibold text-[#58413f] hover:text-[#231916]'
              }"
            >
              ${isMm ? 'အားလုံး' : 'All'} (${allReservations.length})
            </button>
          </div>
        </div>

        <!-- Reservations List -->
        <div class="space-y-4">
          ${
            displayedReservations.length === 0
              ? `
                <div class="bg-[#FFFDF9] rounded-xl border border-[#EADFD1] p-10 text-center space-y-4 shadow-xs">
                  <div class="w-14 h-14 bg-[#840f16]/10 text-[#840f16] rounded-full flex items-center justify-center mx-auto">
                    <span class="material-symbols-outlined text-2xl">event_busy</span>
                  </div>
                  <h3 class="font-headline text-xl font-bold text-[#231916]">
                    ${isMm ? 'စိုတ်ထားမှု မှတ်တမ်း မရှိသေးပါ' : `No ${currentSubTab} reservations found`}
                  </h3>
                  <p class="font-body text-xs sm:text-sm text-[#58413f] max-w-sm mx-auto">
                    ${isMm ? 'ရန်ကုန်မြို့ရှိ အဆင့်မြင့် စားသောက်ဆိုင်များကို ရှာဖွေပြီး စားပွဲဝိုင်း ချက်ချင်း စိုတ်ယူလိုက်ပါ' : `You have no ${currentSubTab} reservations. Browse our curated dining catalog to book your next experience.`}
                  </p>
                  <button
                    id="mypage-explore-btn"
                    class="btn-primary px-6 py-2.5 rounded-full font-label text-xs font-semibold shadow-md inline-flex items-center gap-2 cursor-pointer mt-2"
                  >
                    <span>${isMm ? 'ဆိုင်များ ရှာဖွေရန်' : 'Explore Restaurants'}</span>
                    <span class="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              `
              : displayedReservations
                  .map(item => {
                    const isCompleted = (item.status || '').toLowerCase() === 'completed';

                    return `
                      <div class="luxe-card bg-[#FFF8EE] rounded-2xl border border-[#EADECB] p-4 sm:p-5 md:p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all flex flex-col gap-3.5 sm:gap-4" style="border-radius: 16px;">
                        
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
                          <div class="shrink-0 pt-0.5">
                            ${renderStatusPill(item.status, isMm)}
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
                            <span class="font-semibold">${item.guests} ${isMm ? 'ဦး' : (item.guests === 1 ? 'guest' : 'guests')}</span>
                          </span>
                        </div>

                        <!-- Bottom Action Bar -->
                        <div class="pt-3 border-t border-[#EADFD1]/70 flex flex-wrap items-center justify-between gap-2.5 w-full">
                          <div class="text-[11px] font-mono text-[#8d7b75] hidden sm:inline-block">
                            ID: <span class="font-bold text-[#58413f]">#${item.id}</span>
                          </div>

                          <div class="flex items-center flex-wrap gap-2 w-full sm:w-auto justify-start sm:justify-end">
                            <!-- Details & Modify Button -->
                            <button
                              data-mypage-view-detail-id="${item.id}"
                              class="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-[#840f16] hover:text-white text-[#231916] border border-[#EADFD1] font-label font-bold text-xs transition-colors cursor-pointer shadow-2xs"
                              title="${isMm ? 'အသေးစိတ်နှင့် ပြင်ဆင်ရန်' : 'Details & Modify'}"
                              aria-label="${isMm ? 'အသေးစိတ်နှင့် ပြင်ဆင်ရန်' : 'Details & Modify'}"
                            >
                              <span class="material-symbols-outlined text-base">visibility</span>
                              <span>${isMm ? 'အသေးစိတ်' : 'Details'}</span>
                            </button>

                            <!-- View QR Pass Button -->
                            <button
                              data-mypage-view-pass-id="${item.id}"
                              class="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-[#840f16] hover:text-white text-[#231916] border border-[#EADFD1] font-label font-bold text-xs transition-colors cursor-pointer shadow-2xs"
                              title="${isMm ? 'QR ကုဒ်ကြည့်ရန်' : 'View QR Pass'}"
                              aria-label="${isMm ? 'QR ကုဒ်ကြည့်ရန်' : 'View QR Pass'}"
                            >
                              <span class="material-symbols-outlined text-base">qr_code_2</span>
                              <span>${isMm ? 'QR ကုဒ်' : 'QR Pass'}</span>
                            </button>

                            <!-- Extra Actions for Completed (Review & Rebook) -->
                            ${
                              isCompleted
                                ? `
                                  <button
                                    data-write-review-id="${item.id}"
                                    data-review-restaurant="${item.restaurantName}"
                                    class="inline-flex items-center justify-center gap-1.5 bg-[#FFF3D6] hover:bg-[#FFE7AB] border border-[#D08E1C]/40 text-[#8F5D0B] font-label font-bold text-xs px-3.5 py-2 rounded-full shadow-2xs transition-all cursor-pointer"
                                  >
                                    <span class="material-symbols-outlined text-sm text-[#D08E1C]">star</span>
                                    <span>${isMm ? 'သုံးသပ်ချက်' : 'Review'}</span>
                                  </button>
                                  <button
                                    data-rebook-id="${item.id}"
                                    data-rebook-rest-id="${item.restaurantId}"
                                    data-rebook-rest-name="${item.restaurantName}"
                                    data-rebook-date="${item.date}"
                                    data-rebook-time="${item.time}"
                                    data-rebook-guests="${item.guests}"
                                    class="inline-flex items-center justify-center gap-1.5 bg-white hover:bg-[#FAF4EB] border border-[#EADFD1] text-[#58413F] font-label font-bold text-xs px-3.5 py-2 rounded-full transition-colors cursor-pointer shadow-2xs"
                                    title="${isMm ? 'ယခင် အချက်အလက်များဖြင့် ပြန်စိုတ်ရန်' : 'Rebook with Same Conditions'}"
                                  >
                                    <span class="material-symbols-outlined text-base">restart_alt</span>
                                    <span>${isMm ? 'ပြန်စိုတ်ရန်' : 'Rebook'}</span>
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

  // 2. FAVORITES PANEL
  function renderFavoritesPanel(state, isMm) {
    const { RESTAURANTS_DATA } = window.YoyakuData || {};
    const favoriteRestaurants = (RESTAURANTS_DATA || []).slice(0, 3);

    return `
      <div class="space-y-6">
        <div class="border-b border-[#EADFD1] pb-4">
          <h2 class="font-headline text-2xl font-bold text-[#231916]">
            ${isMm ? 'အကြိုက်ဆုံး ဆိုင်များ' : 'Saved Favorites'}
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${favoriteRestaurants
            .map(r => `
              <div class="bg-[#FFF8F6] rounded-xl border border-[#EADFD1] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                <div class="relative h-44 overflow-hidden">
                  <img
                    src="${r.image || (r.images && r.images[0]) || 'assets/images/shop_theglasspavilion_1.jpg'}"
                    alt="${r.name}"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-label font-bold text-[#840f16] flex items-center gap-1 shadow-xs">
                    <span class="material-symbols-outlined text-xs text-amber-500">star</span>
                    <span>${r.rating || '4.9'}</span>
                  </div>
                  <div class="absolute bottom-3 left-3 bg-[#231916]/80 backdrop-blur-md text-white text-[11px] font-label font-medium px-2.5 py-0.5 rounded-full">
                    ${r.cuisine || 'Fine Dining'}
                  </div>
                </div>

                <div class="p-4 sm:p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div class="space-y-1">
                    <h3 class="font-headline font-bold text-base text-[#231916] line-clamp-1 hover:text-[#840f16] cursor-pointer" data-resv-select-id="${r.id}">
                      ${r.name}
                    </h3>
                    <p class="font-body text-xs text-[#58413f] flex items-center gap-1 line-clamp-1">
                      <span class="material-symbols-outlined text-sm text-[#8d7b75]">location_on</span>
                      <span>${r.location || r.area || 'Yangon'}</span>
                    </p>
                    <div class="font-label text-xs font-bold text-[#840f16] pt-1">
                      ${r.priceRange || '65,000 ~ 150,000 MMK'}
                    </div>
                  </div>

                  <div class="flex items-center gap-2 pt-2 border-t border-[#EADFD1]">
                    <button
                      data-favorite-book-id="${r.id}"
                      class="btn-primary flex-1 py-2 rounded-full font-label text-xs font-bold text-center cursor-pointer shadow-2xs"
                    >
                      ${isMm ? 'ဝိုင်းစိုတ်မည်' : 'Book Table'}
                    </button>
                    <button
                      data-favorite-remove-id="${r.id}"
                      class="w-8 h-8 rounded-full bg-[#FBF3E2] hover:bg-[#840f16]/10 text-[#840f16] flex items-center justify-center cursor-pointer transition-colors"
                      title="${isMm ? 'အကြိုက်ဆုံးမှ ဖယ်ရှားရန်' : 'Remove'}"
                    >
                      <span class="material-symbols-outlined text-base">favorite</span>
                    </button>
                  </div>
                </div>
              </div>
            `)
            .join('')}
        </div>
      </div>
    `;
  }

  // 3. WAITLIST PANEL
  function renderWaitlistPanel(state, isMm) {
    const myData = state.myPageData || {};
    const waitlists = myData.waitlists || [];

    return `
      <div class="space-y-6">
        <div class="border-b border-[#EADFD1] pb-4">
          <h2 class="font-headline text-2xl font-bold text-[#231916]">
            ${isMm ? 'လူပြည့် စောင့်ဆိုင်းစာရင်း' : 'Waitlist & Queue Management'}
          </h2>
        </div>

        <div class="bg-[#FFF3D6] border border-[#EADFD1] rounded-xl p-4 flex items-start gap-3 text-xs text-[#8f5d0b]">
          <span class="material-symbols-outlined text-lg text-[#D08E1C] shrink-0 mt-0.5">info</span>
          <p class="leading-relaxed">
            ${isMm ? 'စားပွဲဝိုင်း လွတ်လပ်သွားပါက SMS နှင့် Viber မှတစ်ဆင့် ၁၅ မိနစ် သီးသန့် ဝိုင်းစိုတ်လင့်ခ်ကို ပေးပို့ပေးပါမည်။' : 'When an existing booking cancels, you will receive an instant 15-minute priority booking link via SMS and Viber.'}
          </p>
        </div>

        <div class="space-y-3">
          ${
            waitlists.length === 0
              ? `
                <div class="bg-[#FFF8F6] rounded-xl border border-[#EADFD1] p-10 text-center space-y-3">
                  <span class="material-symbols-outlined text-3xl text-[#8d7b75]">hourglass_empty</span>
                  <div class="font-headline font-bold text-base text-[#231916]">${isMm ? 'လက်ရှိ စောင့်ဆိုင်းစာရင်း မရှိပါ' : 'No active waitlist queues'}</div>
                  <p class="font-body text-xs text-[#58413f]">${isMm ? 'လူပြည့်နေသော ဆိုင်များတွင် Waitlist စာရင်းသွင်းနိုင်ပါသည်' : 'You can join a waitlist when a restaurant is fully booked on your chosen date.'}</p>
                </div>
              `
              : waitlists
                  .map(
                    w => `
                      <div class="bg-[#FFF8F6] p-5 rounded-xl border border-[#EADFD1] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-xs">
                        <div class="space-y-1">
                          <div class="font-headline font-bold text-base text-[#231916]">${w.restaurantName}</div>
                          <div class="font-body text-xs text-[#58413f] flex items-center gap-3">
                            <span class="inline-flex items-center gap-1"><span class="material-symbols-outlined text-xs">calendar_month</span> ${w.requestedDate}</span>
                            <span class="inline-flex items-center gap-1"><span class="material-symbols-outlined text-xs">group</span> ${w.partySize} Guests</span>
                          </div>
                          <div class="inline-flex items-center gap-1.5 text-xs font-label font-bold text-[#104b2b] bg-[#104b2b]/10 px-2.5 py-0.5 rounded-full mt-1">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#104b2b]"></span>
                            <span>${w.status}</span>
                          </div>
                        </div>

                        <button
                          data-cancel-waitlist-id="${w.id}"
                          class="px-4 py-2 rounded-full border border-[#840f16] text-[#840f16] hover:bg-[#840f16] hover:text-white font-label text-xs font-bold cursor-pointer transition-colors shadow-2xs"
                        >
                          ${isMm ? 'စောင့်ဆိုင်းစာရင်း ပယ်ဖျက်မည်' : 'Cancel Queue'}
                        </button>
                      </div>
                    `
                  )
                  .join('')
          }
        </div>
      </div>
    `;
  }

  // 4. COUPONS PANEL
  function renderCouponsPanel(state, isMm) {
    const myData = state.myPageData || {};
    const coupons = myData.claimedCoupons || [];

    return `
      <div class="space-y-6">
        <div class="border-b border-[#EADFD1] pb-4">
          <h2 class="font-headline text-2xl font-bold text-[#231916]">
            ${isMm ? 'ဘောက်ချာနှင့် ကူပွန်များ' : 'Vouchers & Promo Codes'}
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          ${coupons
            .map(
              c => `
                <div class="bg-[#FFF8F6] p-5 rounded-xl border border-[#EADFD1] flex flex-col justify-between space-y-4 shadow-xs relative overflow-hidden">
                  <div class="absolute -right-6 -bottom-6 w-20 h-20 bg-[#840f16]/5 rounded-full pointer-events-none"></div>
                  
                  <div class="space-y-1">
                    <div class="inline-flex items-center gap-1 text-[10px] font-label font-bold uppercase tracking-wider text-[#D08E1C] bg-[#FFF3D6] px-2 py-0.5 rounded-md">
                      <span>PROMO</span>
                    </div>
                    <div class="font-headline font-bold text-base text-[#840f16]">${c.title}</div>
                    <div class="font-body text-xs text-[#58413f]">Valid till ${c.validTill} · Applicable on dining bookings</div>
                  </div>

                  <div class="flex items-center justify-between pt-3 border-t border-[#EADFD1]">
                    <div class="font-mono text-xs font-bold text-[#231916] bg-[#FBF3E2] px-3 py-1.5 rounded-lg border border-[#EADFD1]">
                      ${c.code}
                    </div>
                    <button
                      data-copy-coupon="${c.code}"
                      class="btn-primary px-4 py-1.5 rounded-full font-label font-bold text-xs cursor-pointer shadow-xs"
                    >
                      ${isMm ? 'ကုဒ်ကူးမည်' : 'Copy Code'}
                    </button>
                  </div>
                </div>
              `
            )
            .join('')}
        </div>
      </div>
    `;
  }

  // 5. POINTS & MEMBERSHIP PANEL
  function renderPointsPanel(state, isMm) {
    return `
      <div class="space-y-6">
        <div class="border-b border-[#EADFD1] pb-4">
          <h2 class="font-headline text-2xl font-bold text-[#231916]">
            ${isMm ? 'အမှတ်နှင့် အသင်းဝင်အဆင့်' : 'Points & VIP Membership'}
          </h2>
        </div>

        <!-- VIP Membership Card -->
        <div class="bg-gradient-to-br from-[#231916] via-[#3a221f] to-[#58413f] text-white p-6 sm:p-8 rounded-xl space-y-4 shadow-lg border border-[#D08E1C]/40 relative overflow-hidden">
          <div class="absolute right-0 top-0 w-48 h-48 bg-[#D08E1C]/10 rounded-full blur-2xl pointer-events-none"></div>

          <div class="flex justify-between items-start">
            <div>
              <div class="font-label text-xs uppercase font-bold tracking-widest text-[#D08E1C] flex items-center gap-1.5">
                <span class="material-symbols-outlined text-sm">workspace_premium</span>
                <span>VIP Gold Gourmet Member</span>
              </div>
              <div class="font-headline text-3xl sm:text-4xl font-extrabold text-white mt-1">2,450 <span class="text-lg font-normal text-[#EADFD1]">PTS</span></div>
            </div>
            <span class="bg-[#D08E1C]/20 border border-[#D08E1C]/50 text-[#f5d592] text-xs font-label font-bold px-3 py-1 rounded-full">
              Tier 3 / Gold
            </span>
          </div>

          <div class="space-y-1.5 pt-2">
            <div class="flex justify-between text-xs text-[#EADFD1] font-label">
              <span>Progress to Platinum Concierge</span>
              <span>2,450 / 3,000 PTS</span>
            </div>
            <div class="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-[#D08E1C] to-[#f3cb7d] rounded-full" style="width: 81.6%"></div>
            </div>
            <p class="text-[11px] text-[#EADFD1]/80">550 more points needed to unlock Platinum 24/7 personal dining concierge.</p>
          </div>
        </div>

        <!-- Point Perks Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div class="bg-[#FFF8F6] p-4 rounded-xl border border-[#EADFD1] space-y-1 text-center">
            <div class="font-headline font-bold text-lg text-[#840f16]">+500 PTS</div>
            <div class="font-label text-xs font-bold text-[#231916]">Per Online Booking</div>
            <p class="font-body text-[11px] text-[#58413f]">Awarded upon dining completion</p>
          </div>

          <div class="bg-[#FFF8F6] p-4 rounded-xl border border-[#EADFD1] space-y-1 text-center">
            <div class="font-headline font-bold text-lg text-[#840f16]">+200 PTS</div>
            <div class="font-label text-xs font-bold text-[#231916]">Verified Review</div>
            <p class="font-body text-[11px] text-[#58413f]">Share feedback with guests</p>
          </div>

          <div class="bg-[#FFF8F6] p-4 rounded-xl border border-[#EADFD1] space-y-1 text-center">
            <div class="font-headline font-bold text-lg text-[#840f16]">1 PT = 10 MMK</div>
            <div class="font-label text-xs font-bold text-[#231916]">Direct Redemption</div>
            <p class="font-body text-[11px] text-[#58413f]">Apply to course bills</p>
          </div>
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
              ${isMm ? 'အသိပေးချက် စင်တာ' : 'Notification Center'}
            </h2>
          </div>

          <button
            id="mark-all-notifs-read-btn"
            class="text-xs font-label font-bold text-[#840f16] hover:underline cursor-pointer"
          >
            ${isMm ? 'အားလုံး ဖတ်ပြီးကြောင်း မှတ်သားရန်' : 'Mark all as read'}
          </button>
        </div>

        <div class="space-y-3">
          ${
            notifications.length === 0
              ? `
                <div class="bg-[#FFF8F6] rounded-xl border border-[#EADFD1] p-10 text-center">
                  <span class="material-symbols-outlined text-3xl text-[#8d7b75]">notifications_off</span>
                  <div class="font-headline font-bold text-base text-[#231916] mt-2">${isMm ? 'အသိပေးချက် မရှိသေးပါ' : 'No notifications'}</div>
                </div>
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

  // 7. ANNOUNCEMENTS PANEL
  function renderAnnouncementsPanel(state, isMm) {
    return `
      <div class="space-y-6">
        <div class="border-b border-[#EADFD1] pb-4">
          <h2 class="font-headline text-2xl font-bold text-[#231916]">
            ${isMm ? 'အထူး ကြေညာချက်များ' : 'System Announcements'}
          </h2>
        </div>

        <div class="space-y-4">
          <div class="bg-[#FFF8F6] p-6 rounded-xl border border-[#EADFD1] space-y-3 shadow-xs">
            <div class="flex items-center gap-2">
              <span class="bg-[#840f16] text-white text-[10px] font-label font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">New Menu</span>
              <span class="font-body text-xs text-[#8d7b75]">August 2026</span>
            </div>
            <h3 class="font-headline font-bold text-lg text-[#231916]">Seasonal Monsoon Degustation Menus Launched</h3>
            <p class="font-body text-xs text-[#58413f] leading-relaxed">
              Experience special monsoon wine pairings and chef degustation sets across our top-rated lakeside dining venues in Bahan and Inya Lake. Limited seats available for weekend reservations.
            </p>
          </div>

          <div class="bg-[#FFF8F6] p-6 rounded-xl border border-[#EADFD1] space-y-3 shadow-xs">
            <div class="flex items-center gap-2">
              <span class="bg-[#D08E1C] text-white text-[10px] font-label font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">Feature</span>
              <span class="font-body text-xs text-[#8d7b75]">August 2026</span>
            </div>
            <h3 class="font-headline font-bold text-lg text-[#231916]">Viber Digital Pass Delivery (Phase 2 Preview)</h3>
            <p class="font-body text-xs text-[#58413f] leading-relaxed">
              Guests can now link their Viber account to receive instant reservation confirmations and 1-tap QR check-in passes directly on their mobile device.
            </p>
          </div>
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
      { id: 'reservations', label: isMm ? 'စိုတ်ထားမှု မှတ်တမ်း' : 'Reservation History', icon: 'calendar_today' },
      { id: 'favorites', label: isMm ? 'အကြိုက်ဆုံး ဆိုင်များ' : 'Favorites', icon: 'favorite_border' },
      { id: 'waitlist', label: isMm ? 'လူပြည့် စောင့်ဆိုင်းစာရင်း' : 'Cancel Waitlist', icon: 'schedule' },
      { id: 'coupons', label: isMm ? 'ဘောက်ချာနှင့် ကူပွန်များ' : 'Coupons', icon: 'sell' },
      { id: 'points', label: isMm ? 'အမှတ်နှင့် အသင်းဝင်အဆင့်' : 'Points & Membership', icon: 'workspace_premium' },
      { id: 'notifications', label: isMm ? 'အသိပေးချက် စင်တာ' : 'Notification Center', icon: 'notifications' },
      { id: 'notif-settings', label: isMm ? 'အသိပေးချက် ဆက်တင်' : 'Notification Settings', icon: 'tune' },
      { id: 'announcements', label: isMm ? 'အထူး ကြေညာချက်များ' : 'Announcements', icon: 'campaign' },
      { id: 'account', label: isMm ? 'အကောင့် ဆက်တင်' : 'Account Settings', icon: 'manage_accounts' }
    ];

    // Helper to render the active screen in the right container
    function renderActiveScreenPanel() {
      if (activeMenu === 'account') {
        return window.YoyakuComponents.renderAccountSettingsView ? window.YoyakuComponents.renderAccountSettingsView(state) : '';
      }
      if (activeMenu === 'notif-settings') {
        return window.YoyakuComponents.renderNotificationSettingsView ? window.YoyakuComponents.renderNotificationSettingsView(state) : '';
      }
      if (activeMenu === 'favorites') {
        return renderFavoritesPanel(state, isMm);
      }
      if (activeMenu === 'waitlist') {
        return renderWaitlistPanel(state, isMm);
      }
      if (activeMenu === 'coupons') {
        return renderCouponsPanel(state, isMm);
      }
      if (activeMenu === 'points') {
        return renderPointsPanel(state, isMm);
      }
      if (activeMenu === 'notifications') {
        return renderNotificationsPanel(state, isMm);
      }
      if (activeMenu === 'announcements') {
        return renderAnnouncementsPanel(state, isMm);
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
              ${isMm ? 'ကျွန်ုပ်၏ စာမျက်နှာ' : 'My Page'}
            </h1>
          </div>

          <button
            id="mypage-new-reservation-btn"
            class="btn-primary px-6 py-2.5 rounded-full font-label text-xs font-semibold shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>${isMm ? 'ဝိုင်းအသစ် စိုတ်ရန်' : 'Book New Table'}</span>
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
                      <span>${isMm ? 'ကျွန်ုပ်၏ စာမျက်နှာ မီနူးသို့ ပြန်သွားရန်' : 'Back to Menu'}</span>
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
                      <span class="inline-flex items-center gap-1.5 bg-[#FFF3D6] text-[#8f5d0b] border border-[#D08E1C]/40 text-xs font-label font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-2xs">
                        <span class="material-symbols-outlined text-sm text-[#D08E1C]">star</span>
                        <span>VIP Member</span>
                      </span>
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
                    <span>${isMm ? 'အကောင့်ထွက်ရန်' : 'Logout'}</span>
                  </button>
                `
            }
          </div>

          <!-- ========================================================================= -->
          <!-- LEFT SIDEBAR: MY PAGE MENU (DESKTOP ONLY width ≥ 1024px) -->
          <!-- ========================================================================= -->
          <div class="hidden lg:block lg:col-span-4 xl:col-span-3 bg-[#FBF3E2] rounded-xl border border-[#EADFD1] p-6 space-y-6 shadow-sm sticky top-24">
            
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
                  <span class="inline-flex items-center gap-1 bg-[#D08E1C]/15 text-[#8f5d0b] border border-[#D08E1C]/30 text-[10px] font-label font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    <span class="material-symbols-outlined text-[12px] text-[#D08E1C]">workspace_premium</span>
                    <span>VIP Member</span>
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
                  <span>${isMm ? 'အကောင့်ထွက်ရန်' : 'Logout'}</span>
                </button>
              </div>

              <!-- PWA Install & Offline Badge -->
              <div class="pt-3 border-t border-[#EADFD1]">
                <div class="bg-[#FFF8F6] border border-[#EADFD1] rounded-xl p-3.5 space-y-2 text-left">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-lg bg-[#840f16] text-white flex items-center justify-center">
                      <span class="material-symbols-outlined text-sm">install_mobile</span>
                    </div>
                    <span class="font-headline font-bold text-xs text-[#231916]">${isMm ? 'Yoyaku PWA အက်ပ်' : 'Yoyaku Mobile PWA'}</span>
                  </div>
                  <p class="font-body text-[11px] text-[#58413f] leading-relaxed">
                    ${isMm ? 'အော့ဖ်လိုင်း QR Pass နှင့် လျင်မြန်သော ဝိုင်းစိုတ်မှုအတွက် သင့်ဖုန်းတွင် ထည့်သွင်းပါ' : 'Instant offline passes and lightning-fast table reservations.'}
                  </p>
                  <button
                    type="button"
                    id="mypage-pwa-install-btn"
                    class="w-full py-2 px-3 rounded-xl bg-[#840f16] hover:bg-[#680b11] text-white font-label text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <span class="material-symbols-outlined text-sm">download</span>
                    <span>${isMm ? 'အက်ပ် ထည့်သွင်းရန်' : 'Install App'}</span>
                  </button>
                </div>
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
              <div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
                <div class="bg-[#FFF8F6] w-full max-w-md rounded-2xl border border-[#EADFD1] p-6 space-y-5 shadow-2xl text-center">
                  <div class="flex justify-between items-center border-b border-[#EADFD1] pb-3">
                    <div class="flex items-center gap-2">
                      <span class="material-symbols-outlined text-[#840f16]">qr_code_2</span>
                      <h3 class="font-headline text-lg font-bold text-[#231916]">${isMm ? 'စားပွဲဝိုင်း Check-in QR' : 'Table Check-in Pass'}</h3>
                    </div>
                    <button id="modal-close-btn" class="w-8 h-8 rounded-full bg-[#FBF3E2] hover:bg-[#EADFD1] flex items-center justify-center text-[#58413f] hover:text-[#840f16] cursor-pointer transition-colors">
                      <span class="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>

                  <!-- Restaurant & Reservation ID -->
                  <div class="space-y-2">
                    <div class="font-headline font-bold text-base text-[#231916]">${activePassRestName || (isMm ? 'စားသောက်ဆိုင်' : 'Restaurant')}</div>
                    
                    <!-- Reservation ID Display without Box Shape -->
                    <div class="flex items-center justify-center gap-1.5">
                      <span class="text-[11px] font-bold text-[#7A6B65] uppercase tracking-wider">${isMm ? 'ဘွတ်ကင် နံပါတ်' : 'Reservation ID'}:</span>
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

                  <p class="font-body text-xs text-[#58413f] leading-relaxed">${isMm ? 'စားသောက်ဆိုင်သို့ ရောက်ရှိပါက ဤ QR ကုဒ်ကို ပြသပါ' : 'Present this digital pass upon arrival for instant table seating.'}</p>

                  <button id="modal-close-btn" class="btn-primary w-full py-3 rounded-full font-label text-xs font-bold cursor-pointer">
                    ${isMm ? 'ပိတ်မည်' : 'Close Pass'}
                  </button>
                </div>
              </div>
            `
            : ''
        }

        <!-- WRITE REVIEW MODAL -->
        ${
          activeModal === 'review'
            ? `
              <div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
                <div class="bg-[#FFF8F6] w-full max-w-lg rounded-xl border border-[#EADFD1] p-6 space-y-6 shadow-2xl text-left">
                  <div class="flex justify-between items-center border-b border-[#EADFD1] pb-3">
                    <div>
                      <h3 class="font-headline text-lg font-bold text-[#231916]">${isMm ? 'သုံးသပ်ချက် ရေးသားရန်' : 'Write a Review'}</h3>
                      <p class="font-body text-xs text-[#58413f]" id="review-modal-restaurant-name">${isMm ? 'သင်၏ စားသောက်မှု အတွေ့အကြုံကို မျှဝေပါ' : 'Share your dining experience with other guests'}</p>
                    </div>
                    <button id="modal-close-btn" class="w-8 h-8 rounded-full bg-[#FBF3E2] hover:bg-[#EADFD1] flex items-center justify-center text-[#58413f] cursor-pointer">
                      <span class="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>

                  <form id="write-review-form" class="space-y-4">
                    <div>
                      <label class="block font-label text-xs font-bold text-[#231916] uppercase tracking-wider mb-2">
                        ${isMm ? 'အလုံးစုံ အဆင့်သတ်မှတ်ချက်' : 'Overall Rating'}
                      </label>
                      <div class="flex items-center gap-2" id="star-rating-selector">
                        <button type="button" data-star="1" class="text-amber-400 text-2xl cursor-pointer">★</button>
                        <button type="button" data-star="2" class="text-amber-400 text-2xl cursor-pointer">★</button>
                        <button type="button" data-star="3" class="text-amber-400 text-2xl cursor-pointer">★</button>
                        <button type="button" data-star="4" class="text-amber-400 text-2xl cursor-pointer">★</button>
                        <button type="button" data-star="5" class="text-amber-400 text-2xl cursor-pointer">★</button>
                        <span class="font-label text-xs font-bold text-[#D08E1C] ml-2" id="star-rating-label">5.0 - Exceptional</span>
                      </div>
                    </div>

                    <div>
                      <label class="block font-label text-xs font-bold text-[#231916] uppercase tracking-wider mb-1">
                        ${isMm ? 'သုံးသပ်ချက် အသေးစိတ်' : 'Your Review'}
                      </label>
                      <textarea
                        id="review-text-input"
                        rows="4"
                        placeholder="${isMm ? 'အစားအသောက် အရသာ၊ ဝန်ဆောင်မှုနှင့် ဆိုင်အပြင်အဆင် အကြောင်းကို ရေးသားပါ...' : 'Share what you loved about the food, ambiance, seating, and service...'}"
                        class="w-full bg-white border border-[#EADFD1] focus:border-[#840f16] rounded-xl p-3 font-body text-xs text-[#231916] focus:outline-none"
                        required
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      class="btn-primary w-full py-3 rounded-full font-label font-bold text-xs cursor-pointer shadow-md"
                    >
                      ${isMm ? 'သုံးသပ်ချက် တင်သွင်းမည်' : 'Publish Review'}
                    </button>
                  </form>
                </div>
              </div>
            `
            : ''
        }

        <!-- PHONE OTP VERIFICATION MODAL -->
        ${
          activeModal === 'phone_otp'
            ? `
              <div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
                <div class="bg-[#FFF8F6] w-full max-w-md rounded-xl border border-[#EADFD1] p-6 space-y-6 shadow-2xl text-left">
                  <div class="flex justify-between items-center border-b border-[#EADFD1] pb-3">
                    <div class="flex items-center gap-2.5">
                      <div class="w-8 h-8 rounded-full bg-[#D08E1C]/10 text-[#D08E1C] flex items-center justify-center">
                        <span class="material-symbols-outlined text-lg">sms</span>
                      </div>
                      <h3 class="font-headline text-lg font-bold text-[#231916]">${isMm ? 'ဖုန်းနံပါတ် OTP အတည်ပြုခြင်း' : 'Verify Phone Number (OTP)'}</h3>
                    </div>
                    <button id="modal-close-btn" class="w-8 h-8 rounded-full bg-[#FBF3E2] hover:bg-[#EADFD1] flex items-center justify-center text-[#58413f] cursor-pointer">
                      <span class="material-symbols-outlined text-base">close</span>
                    </button>
                  </div>

                  <div class="space-y-3">
                    <p class="font-body text-xs text-[#58413f] leading-relaxed">
                      ${isMm ? `လျှို့ဝှက် ဂဏန်း ၆ လုံးပါ SMS ကို <strong class="text-[#231916]">${myData.userPhone || ''}</strong> သို့ ပေးပို့ထားပါသည်။` : `We have sent a 6-digit verification code to <strong class="text-[#231916]">${myData.userPhone || ''}</strong> via SMS.`}
                    </p>

                    <div class="p-3 bg-[#FFF3D6] rounded-xl border border-[#EADFD1] flex items-center justify-between text-xs">
                      <span class="text-[#58413f] font-mono">${isMm ? 'နမူနာကုဒ်:' : 'Demo Code:'} <strong>123456</strong></span>
                      <button id="u20-autofill-otp-btn" type="button" class="text-[#840f16] font-bold underline cursor-pointer hover:opacity-80">
                        ${isMm ? 'အလိုအလျောက် ထည့်ရန်' : 'Auto Fill'}
                      </button>
                    </div>

                    <form id="u20-otp-form" class="space-y-3 pt-1">
                      <div>
                        <input
                          type="text"
                          id="u20-otp-input"
                          maxlength="6"
                          placeholder="______"
                          class="w-full text-center tracking-[0.5em] font-mono text-2xl py-3 rounded-xl border border-[#EADFD1] focus:border-[#840f16] bg-white focus:outline-none"
                          required
                        />
                      </div>

                      <div class="flex items-center justify-between text-xs text-[#58413f] pt-1">
                        <span>Didn't receive code?</span>
                        <button type="button" id="u20-resend-otp-btn" class="text-[#840f16] font-bold hover:underline cursor-pointer">
                          Resend SMS
                        </button>
                      </div>

                      <button
                        type="submit"
                        class="btn-primary w-full py-3 rounded-full font-label font-bold text-xs cursor-pointer shadow-md mt-2"
                      >
                        ${isMm ? 'အတည်ပြုမည်' : 'Verify & Confirm'}
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
          activeModal === 'confirm_withdraw'
            ? `
              <div class="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
                <div class="bg-[#FFF8F6] w-full max-w-md rounded-xl border border-[#840f16]/30 p-6 space-y-5 shadow-2xl text-left">
                  <div class="w-12 h-12 rounded-full bg-[#840f16]/10 text-[#840f16] flex items-center justify-center mx-auto">
                    <span class="material-symbols-outlined text-2xl">warning</span>
                  </div>

                  <div class="text-center space-y-1">
                    <h3 class="font-headline text-lg font-bold text-[#231916]">${isMm ? 'အကောင့် အပြီးတိုင် ဖျက်သိမ်းရန် သေချာပါသလား?' : 'Permanently Withdraw Account?'}</h3>
                    <p class="font-body text-xs text-[#58413f]">
                      ${isMm ? 'သင်၏ စားပွဲဝိုင်း မှတ်တမ်းများ၊ အကြိုက်ဆုံးဆိုင်များနှင့် Gourmet Points (2,450 PTS) များ အားလုံး ပျက်ပြယ်သွားပါမည်။' : 'All active reservations, saved favorites, and your accumulated 2,450 Gourmet Points will be permanently deleted.'}
                    </p>
                  </div>

                  <div class="flex items-center gap-3 pt-2">
                    <button
                      id="modal-close-btn"
                      class="flex-1 py-2.5 rounded-full border border-[#EADFD1] text-[#58413f] hover:bg-[#FBF3E2] font-label text-xs font-semibold cursor-pointer"
                    >
                      ${isMm ? 'မဖျက်တော့ပါ' : 'Keep Account'}
                    </button>
                    <button
                      id="u20-confirm-withdraw-final-btn"
                      class="flex-1 py-2.5 rounded-full bg-[#840f16] hover:bg-[#680b11] text-white font-label text-xs font-bold cursor-pointer shadow-md"
                    >
                      ${isMm ? 'အပြီးတိုင် ဖျက်မည်' : 'Confirm Delete'}
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

    // New reservation button in header
    const newResvBtn = containerElement.querySelector('#mypage-new-reservation-btn');
    if (newResvBtn) {
      newResvBtn.addEventListener('click', () => {
        store.setActiveTab('discover');
      });
    }

    // PWA install buttons
    const pwaInstallBtn = containerElement.querySelector('#mypage-pwa-install-btn');
    if (pwaInstallBtn) {
      pwaInstallBtn.addEventListener('click', () => {
        if (window.PwaManager) {
          window.PwaManager.promptInstall();
        } else {
          store.openInfoModal('pwa_install');
        }
      });
    }

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
          const isMm = store.getState().currentLanguage === 'MM';
          store.toggleAuth(false);
          store.setActiveTab('discover');
          store.showToast(isMm ? 'အကောင့်ထွက်ပြီးပါပြီ' : 'Logged out successfully.');
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
          store.showToast(`Reservation ID ${code} copied to clipboard!`);
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
          store.showToast('Reservation reminder saved to calendar.');
        }
      });
    });

    // Call venue concierge
    containerElement.querySelectorAll('[data-call-venue-phone]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const phone = e.currentTarget.getAttribute('data-call-venue-phone');
        if (phone) {
          store.showToast(`Connecting to venue concierge: ${phone}`);
        }
      });
    });

    // View Details & Modify (Navigate to U-09)
    containerElement.querySelectorAll('[data-mypage-view-detail-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const resId = e.currentTarget.getAttribute('data-mypage-view-detail-id');
        store.selectReservationForDetail(resId, false);
      });
    });

    // View QR Pass modal
    containerElement.querySelectorAll('[data-mypage-view-pass-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const passId = e.currentTarget.getAttribute('data-mypage-view-pass-id');
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

    // Write review button
    containerElement.querySelectorAll('[data-write-review-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const restName = e.currentTarget.getAttribute('data-review-restaurant');
        store.openMyPageModal('review');
        setTimeout(() => {
          const titleElem = document.getElementById('review-modal-restaurant-name');
          if (titleElem && restName) {
            titleElem.innerText = `Reviewing: ${restName}`;
          }
        }, 10);
      });
    });

    // Star rating picker in review modal
    containerElement.querySelectorAll('#star-rating-selector [data-star]').forEach(starBtn => {
      starBtn.addEventListener('click', (e) => {
        const rating = parseInt(e.currentTarget.getAttribute('data-star'), 10);
        const parent = document.getElementById('star-rating-selector');
        if (parent) {
          parent.querySelectorAll('[data-star]').forEach(b => {
            const starVal = parseInt(b.getAttribute('data-star'), 10);
            b.className = starVal <= rating ? 'text-amber-400 text-2xl cursor-pointer' : 'text-gray-300 text-2xl cursor-pointer';
          });
          const lbl = document.getElementById('star-rating-label');
          const ratingLabels = { 1: '1.0 - Poor', 2: '2.0 - Fair', 3: '3.0 - Good', 4: '4.0 - Very Good', 5: '5.0 - Exceptional' };
          if (lbl) lbl.innerText = ratingLabels[rating] || `${rating}.0`;
        }
      });
    });

    // Review submit
    const reviewForm = containerElement.querySelector('#write-review-form');
    if (reviewForm) {
      reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        store.closeMyPageModal();
        store.showToast('Thank you! Your review has been submitted (+500 Points earned).');
      });
    }

    // Cancel waitlist queue
    containerElement.querySelectorAll('[data-cancel-waitlist-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const wId = e.currentTarget.getAttribute('data-cancel-waitlist-id');
        store.updateMyPageData(data => ({
          ...data,
          waitlists: (data.waitlists || []).filter(w => w.id !== wId)
        }));
        store.showToast('Waitlist queue cancelled.');
      });
    });

    // Copy coupon code
    containerElement.querySelectorAll('[data-copy-coupon]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const code = e.currentTarget.getAttribute('data-copy-coupon');
        navigator.clipboard.writeText(code);
        e.currentTarget.innerText = 'Copied!';
        store.showToast('Coupon code copied to clipboard!');
      });
    });

    // Book favorite restaurant
    containerElement.querySelectorAll('[data-favorite-book-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const restId = e.currentTarget.getAttribute('data-favorite-book-id');
        const { RESTAURANTS_DATA } = window.YoyakuData || {};
        const rest = (RESTAURANTS_DATA || []).find(r => r.id === restId) || (RESTAURANTS_DATA && RESTAURANTS_DATA[0]);
        if (rest) {
          store.openBookingModal(rest);
        }
      });
    });

    // Remove favorite restaurant
    containerElement.querySelectorAll('[data-favorite-remove-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        store.showToast('Removed from favorites.');
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
        store.showToast('All notifications marked as read.');
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
        store.setActiveTab('discover');
      });
    }

    // Modal close button
    containerElement.querySelectorAll('#modal-close-btn').forEach(btn => {
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
    if (activeMenu === 'notif-settings' && window.YoyakuComponents.attachNotificationSettingsEvents) {
      window.YoyakuComponents.attachNotificationSettingsEvents(containerElement);
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
        store.showToast('New verification code sent via SMS!');
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
  }

  window.YoyakuComponents.renderMyPageView = renderMyPageView;
  window.YoyakuComponents.attachMyPageViewEvents = attachMyPageViewEvents;
  window.YoyakuComponents.renderReservationsListView = renderMyPageView;
  window.YoyakuComponents.attachReservationsListViewEvents = attachMyPageViewEvents;
})();
