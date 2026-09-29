/* ==========================================================================
   EzBookNow Screen U-01 — 予約ページ (SNS Landing / Direct Booking Page)
   Route: /s/{slug}
   Core landing page for customer table reservations.
   Allows selection of:
     - Date (Interactive bounded calendar)
     - Party Size (1–12 Guests with quick-select chips)
     - Time Slot (Lunch & Dinner service tabs with real-time seat availability)
     - Seating Area Preference (Standard, Window, Chef's Counter, VIP Room)
   Navigation:
     - "お店の情報を見る" (View Store Info) -> navigates to U-05 (/s/{slug}/info)
     - "Proceed to Booking" -> navigates to U-02 (/s/{slug}/book)
   ========================================================================== */

(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;
  const { generateCalendarGrid } = window.YoyakuComponents;

  function getTodayString() {
    const m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const d = new Date();
    return `${m[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  }

  // Unified reusable stepper for all booking steps (U-01, U-02, U-03, U-04)
  function renderBookingStepper(currentStep, slug) {
    const t = (k) => (window.I18n ? window.I18n.t(k) : (window.YoyakuI18n ? window.YoyakuI18n.t(k) : k));
    const step1Title = t('step1') || 'Date & Schedule';
    const step2Title = t('step2') || 'Guest Details';
    const step3Title = currentStep === 4 ? (t('step3_complete') || 'Complete') : (t('step3') || 'Confirmation');

    const steps = [
      { num: 1, label: 'STEP 01', title: step1Title, path: `#/s/${slug}` },
      { num: 2, label: 'STEP 02', title: step2Title, path: `#/s/${slug}/book` },
      { num: 3, label: 'STEP 03', title: step3Title, path: `#/s/${slug}/confirm` }
    ];

    return `
      <div class="px-1 sm:px-2 select-none">
        <div class="grid grid-cols-3 gap-2 sm:gap-4 text-left">
          ${steps.map(s => {
            const isCompleted = currentStep > s.num || (currentStep === 4);
            const isCurrent = currentStep === s.num && currentStep < 4;
            const isClickable = isCompleted && currentStep !== 4;

            let badgeHtml = '';
            let labelColor = '';
            let barColor = '';

            if (isCompleted) {
              badgeHtml = `
                <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-[#065F46] text-white shadow-2xs">
                  <span class="material-symbols-outlined text-sm font-bold">check</span>
                </div>
              `;
              labelColor = 'text-[#065F46]';
              barColor = 'bg-[#065F46]';
            } else if (isCurrent) {
              badgeHtml = `
                <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 bg-[#9B1C25] text-white shadow-md ring-4 ring-[#9B1C25]/20">
                  ${s.num}
                </div>
              `;
              labelColor = 'text-[#9B1C25]';
              barColor = 'bg-[#9B1C25]';
            } else {
              badgeHtml = `
                <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shrink-0 bg-[#E8DDD0] text-[#6D6561]">
                  ${s.num}
                </div>
              `;
              labelColor = 'text-[#9A908B]';
              barColor = 'bg-[#E8DDD0]/70';
            }

            const content = `
              <div class="flex flex-col justify-between h-full">
                <div class="flex items-center gap-2 sm:gap-2.5">
                  ${badgeHtml}
                  <div class="min-w-0">
                    <div class="font-label text-[10px] font-bold uppercase tracking-wider ${labelColor}">${s.label}</div>
                    <div class="font-headline text-xs sm:text-sm font-bold text-[#241A18] truncate">${s.title}</div>
                  </div>
                </div>
                <div class="mt-2.5 h-1.5 rounded-full w-full ${barColor} transition-all duration-300"></div>
              </div>
            `;

            if (isClickable) {
              return `<a href="${s.path}" class="block group cursor-pointer hover:opacity-85 transition-opacity" title="Back to ${s.title}">${content}</a>`;
            }
            return `<div class="block">${content}</div>`;
          }).join('')}
        </div>
      </div>
    `;
  }
  window.YoyakuComponents.renderBookingStepper = renderBookingStepper;

  function renderBookingStep1(state) {
    const modalState = state.bookingModalState || {};
    const restaurant = modalState.restaurant || (window.YoyakuData && window.YoyakuData.RESTAURANTS_DATA && window.YoyakuData.RESTAURANTS_DATA[0]);
    if (!restaurant) return '';

    const bData = modalState.bookingData || {
      date: getTodayString(),
      time: '18:30',
      guests: 2,
      seatingPreference: 'Standard'
    };
    if (!bData.date) bData.date = getTodayString();

    const t = (k) => window.I18n ? window.I18n.t(k) : k;
    const isMm = (window.I18n ? window.I18n.getLang() : '') === 'mm';
    const slug = (store && store.getRestaurantSlug) ? store.getRestaurantSlug(restaurant) : (restaurant.slug || 'gilded-fork');

    // Service period slots (Lunch & Dinner)
    const isLunchTime = bData.time && parseInt(bData.time.split(':')[0], 10) < 16;
    const selectedService = modalState.selectedService || (isLunchTime ? 'lunch' : 'dinner');

    const lunchSlots = [
      { time: '11:30', isLimited: false, status: t('slot_available') },
      { time: '12:00', isLimited: false, status: t('slot_available') },
      { time: '12:30', isLimited: true, status: t('slot_limited') },
      { time: '13:00', isLimited: false, status: t('slot_available') },
      { time: '13:30', isLimited: false, status: t('slot_available') }
    ];

    const dinnerSlots = [
      { time: '17:30', isLimited: false, status: t('slot_available') },
      { time: '18:00', isLimited: false, status: t('slot_available') },
      { time: '18:30', isLimited: false, status: t('slot_available') },
      { time: '19:00', isLimited: true, status: t('slot_limited') },
      { time: '19:30', isLimited: false, status: t('slot_available') },
      { time: '20:00', isLimited: false, status: t('slot_available') },
      { time: '20:30', isLimited: true, status: t('slot_limited') },
      { time: '21:00', isLimited: false, status: t('slot_available') }
    ];

    const activeSlots = selectedService === 'lunch' ? lunchSlots : dinnerSlots;

    function getSeatingLabel(seatId) {
      switch (seatId) {
        case 'Window View': return t('seat_window');
        case "Chef's Counter": return t('seat_counter');
        case 'Private Room': return t('seat_private');
        case 'Standard':
        default: return t('seat_standard');
      }
    }

    const quickParties = [
      { size: 2, label: '2 Guests', sub: 'Couple / Duo' },
      { size: 4, label: '4 Guests', sub: 'Popular' },
      { size: 6, label: '6 Guests', sub: 'Family' },
      { size: 8, label: '8+ Guests', sub: 'VIP Room' }
    ];

    const seatingCards = [
      {
        id: 'Standard',
        label: t('seat_standard'),
        icon: 'chair',
        sublabel: t('seat_standard_sub'),
        badge: 'Main Floor • Standard',
        badgeClass: 'bg-stone-100 text-stone-700 border-stone-200'
      },
      {
        id: 'Window View',
        label: t('seat_window'),
        icon: 'grid_view',
        sublabel: t('seat_window_sub'),
        badge: 'Scenic Garden • High Demand',
        badgeClass: 'bg-amber-50 text-amber-800 border-amber-200'
      },
      {
        id: "Chef's Counter",
        label: t('seat_counter'),
        icon: 'countertops',
        sublabel: t('seat_counter_sub'),
        badge: 'Live Kitchen View',
        badgeClass: 'bg-rose-50 text-rose-800 border-rose-200'
      },
      {
        id: 'Private Room',
        label: t('seat_private'),
        icon: 'meeting_room',
        sublabel: t('seat_private_sub'),
        badge: 'VIP Suite • Maximum Privacy',
        badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200'
      }
    ];

    return `
      <div class="max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-8 pb-32 sm:pb-16 space-y-6 text-left animate-fadeIn">
        
        <!-- RESTAURANT BANNER & STORE INFO ENTRY -->
        <div class="bg-[#FFFDFC] border border-[#E8DDD0] rounded-3xl p-5 sm:p-6 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center gap-4 min-w-0">
            <div class="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden shrink-0 border border-[#E8DDD0] bg-stone-100 shadow-2xs">
              <img
                src="${restaurant.heroImage || restaurant.images[0]}"
                alt="${restaurant.name}"
                class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center gap-1 text-[11px] font-bold text-[#C69A2B] bg-[#FFF8EE] px-2.5 py-0.5 rounded-full border border-[#E8DDD0]">
                  <span class="material-symbols-outlined text-xs fill-1">star</span>
                  ${restaurant.rating || 4.9}
                </span>
                <span class="text-xs font-semibold text-[#065F46] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  Instant Confirmation
                </span>
              </div>
              <h1 class="font-headline text-lg sm:text-xl font-bold text-[#241A18] truncate mt-1">
                ${isMm ? (restaurant.nameMM || restaurant.name) : restaurant.name}
              </h1>
              <p class="font-body text-xs text-[#6D6561] flex items-center gap-1.5 truncate mt-0.5">
                <span class="material-symbols-outlined text-sm text-[#9B1C25]">location_on</span>
                <span>${restaurant.area || restaurant.location || 'Yangon'}</span>
                <span class="text-[#E8DDD0]">•</span>
                <span>${restaurant.cuisine || 'Fine Dining'}</span>
                <span class="text-[#E8DDD0]">•</span>
                <span class="text-[#C69A2B] font-bold">$$$$</span>
              </p>
            </div>
          </div>

          <!-- U-05 Store Info Link Button -->
          <a
            href="#/s/${slug}/info"
            id="u01-view-shop-info-btn"
            class="w-full sm:w-auto px-5 py-2.5 rounded-full font-label text-xs font-bold text-[#241A18] bg-[#F8EFE5] hover:bg-[#E8DDD0] border border-[#E8DDD0] transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-2xs hover:shadow-sm"
          >
            <span class="material-symbols-outlined text-base text-[#9B1C25]">storefront</span>
            <span>${t('viewShopInfo')}</span>
          </a>
        </div>

        <!-- UNIFIED STEPPER PROGRESS BAR -->
        ${renderBookingStepper(1, slug)}

        <!-- STEP 1 CONTENT CARD -->
        <div class="bg-[#FFFDFC] rounded-3xl border border-[#E8DDD0] shadow-sm overflow-hidden p-5 sm:p-8 space-y-7 relative">
          
          <div class="border-b border-[#E8DDD0] pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <h2 class="font-headline text-2xl sm:text-3xl text-[#241A18] font-bold">
                ${t('select_date_schedule')}
              </h2>
              <p class="font-body text-xs text-[#6D6561] mt-1">
                ${t('realtime_availability_hint')}
              </p>
            </div>
            <div class="flex items-center gap-1.5 text-xs font-semibold text-[#065F46] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <span class="material-symbols-outlined text-sm">event_available</span>
              <span>60-Day Realtime Window</span>
            </div>
          </div>

          <!-- Calendar Component -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2 font-headline text-base font-bold text-[#241A18]">
                <span class="material-symbols-outlined text-lg text-[#9B1C25]">calendar_month</span>
                <span>Select Dining Date</span>
              </div>
              <span class="font-label text-xs font-bold text-[#9B1C25] bg-[#9B1C25]/10 px-2.5 py-0.5 rounded-full">
                ${bData.date}
              </span>
            </div>
            <div id="booking-modal-calendar-container" class="bg-[#F8EFE5] p-4 sm:p-5 rounded-2xl border border-[#E8DDD0] shadow-2xs">
              ${generateCalendarGrid({
                selectedDateStr: bData.date || undefined,
                onDaySelectAttr: 'data-modal-calendar-day'
              })}
            </div>
          </div>

          <!-- Service Period & Time Slots -->
          <div>
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div class="flex items-center gap-2 font-headline text-base font-bold text-[#241A18]">
                <span class="material-symbols-outlined text-lg text-[#9B1C25]">schedule</span>
                <span>Select Arrival Time</span>
              </div>

              <!-- Lunch / Dinner Tabs -->
              <div class="flex items-center bg-[#F8EFE5] p-1 rounded-full border border-[#E8DDD0] self-start sm:self-auto">
                <button
                  type="button"
                  data-service-toggle="lunch"
                  class="px-4 py-1.5 rounded-full font-label text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${selectedService === 'lunch' ? 'bg-[#9B1C25] text-white shadow-xs' : 'text-[#6D6561] hover:text-[#241A18]'}"
                >
                  <span class="material-symbols-outlined text-sm">wb_sunny</span>
                  <span>Lunch (11:30–14:00)</span>
                </button>
                <button
                  type="button"
                  data-service-toggle="dinner"
                  class="px-4 py-1.5 rounded-full font-label text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${selectedService === 'dinner' ? 'bg-[#9B1C25] text-white shadow-xs' : 'text-[#6D6561] hover:text-[#241A18]'}"
                >
                  <span class="material-symbols-outlined text-sm">nights_stay</span>
                  <span>Dinner (17:30–21:30)</span>
                </button>
              </div>
            </div>

            <!-- Time Slot Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              ${activeSlots.map(slot => {
                const isSelected = bData.time === slot.time;
                const isLimited = slot.isLimited;
                return `
                  <button
                    type="button"
                    data-select-time="${slot.time}"
                    class="p-3.5 rounded-2xl border flex flex-col items-center justify-center transition-all cursor-pointer relative group ${
                      isSelected
                        ? 'bg-[#9B1C25] text-white border-[#9B1C25] shadow-md ring-4 ring-[#9B1C25]/20 scale-[1.02]'
                        : 'bg-white text-[#241A18] border-[#E8DDD0] hover:border-[#9B1C25] hover:shadow-xs'
                    }"
                  >
                    <span class="font-headline text-base font-bold">${slot.time}</span>
                    <span class="text-[10px] font-label font-bold px-2 py-0.5 rounded-full mt-1.5 ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : isLimited
                        ? 'bg-[#FFF3E0] text-[#D08E1C] border border-[#FFE0B2]'
                        : 'bg-[#E8F5E9] text-[#104b2b] border border-[#C8E6C9]'
                    }">
                      ${slot.status}
                    </span>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Party Size Selector & Quick Chips -->
          <div>
            <div class="flex items-center gap-2 font-headline text-base font-bold text-[#241A18] mb-3">
              <span class="material-symbols-outlined text-lg text-[#9B1C25]">groups</span>
              <span>${t('party_size_title')}</span>
            </div>

            <!-- Quick Size Chips -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
              ${quickParties.map(qp => {
                const isSelected = bData.guests === qp.size || (qp.size === 8 && bData.guests >= 8);
                return `
                  <button
                    type="button"
                    data-quick-party="${qp.size}"
                    class="p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#241A18] text-white border-[#241A18] shadow-sm'
                        : 'bg-[#F8EFE5] text-[#241A18] border-[#E8DDD0] hover:border-[#9B1C25]'
                    }"
                  >
                    <div class="font-headline text-xs sm:text-sm font-bold">${qp.label}</div>
                    <div class="font-body text-[10px] opacity-80 mt-0.5">${qp.sub}</div>
                  </button>
                `;
              }).join('')}
            </div>

            <!-- Stepper Adjuster -->
            <div class="bg-[#F8EFE5] p-4 rounded-2xl border border-[#E8DDD0] flex items-center justify-between gap-4">
              <div>
                <div class="font-headline text-sm font-bold text-[#241A18]">Custom Party Count</div>
                <div class="font-body text-xs text-[#6D6561]">${t('party_size_hint')}</div>
              </div>
              <div class="flex items-center gap-3 bg-white px-3.5 py-1.5 rounded-full border border-[#E8DDD0] shadow-2xs">
                <button
                  type="button"
                  id="step1-guests-minus"
                  class="w-8 h-8 rounded-full bg-[#F8EFE5] text-[#241A18] font-bold shadow-2xs hover:bg-[#9B1C25] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                  title="Decrease party size"
                >-</button>
                <span class="font-headline text-sm font-bold text-[#241A18] min-w-[70px] text-center">
                  ${bData.guests} ${t('guests')}
                </span>
                <button
                  type="button"
                  id="step1-guests-plus"
                  class="w-8 h-8 rounded-full bg-[#F8EFE5] text-[#241A18] font-bold shadow-2xs hover:bg-[#9B1C25] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                  title="Increase party size"
                >+</button>
              </div>
            </div>

            ${bData.guests >= 8 ? `
              <div class="mt-3 bg-amber-50/90 border border-amber-200 rounded-2xl p-3 flex items-start gap-2.5 text-left animate-fadeIn">
                <span class="material-symbols-outlined text-amber-700 text-base mt-0.5 shrink-0">workspace_premium</span>
                <p class="font-body text-xs text-amber-900 leading-relaxed">
                  <strong>VIP Group Notice:</strong> For parties of 8 or more, a complimentary private room setup is automatically requested with our master host.
                </p>
              </div>
            ` : ''}
          </div>

          <!-- Seating Area Preference Cards -->
          <div>
            <div class="flex items-center gap-2 font-headline text-base font-bold text-[#241A18] mb-3">
              <span class="material-symbols-outlined text-lg text-[#9B1C25]">chair</span>
              <span>${t('seating_area_preference')}</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              ${seatingCards.map(seat => {
                const isSelected = bData.seatingPreference === seat.id;
                return `
                  <button
                    type="button"
                    data-select-seating="${seat.id}"
                    class="p-4 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between group ${
                      isSelected
                        ? 'bg-[#241A18] text-white border-[#241A18] shadow-md ring-2 ring-[#241A18]/20'
                        : 'bg-white text-[#241A18] border-[#E8DDD0] hover:border-[#9B1C25] hover:shadow-xs'
                    }"
                  >
                    <div>
                      <div class="flex justify-between items-start mb-2">
                        <span class="material-symbols-outlined text-2xl ${isSelected ? 'text-[#C69A2B]' : 'text-[#9B1C25]'}">
                          ${seat.icon}
                        </span>
                        ${isSelected ? '<span class="material-symbols-outlined text-[#C69A2B] text-lg font-bold">check_circle</span>' : ''}
                      </div>
                      <div class="font-headline text-sm font-bold ${isSelected ? 'text-white' : 'text-[#241A18]'}">
                        ${seat.label}
                      </div>
                      <div class="font-body text-[11px] mt-0.5 ${isSelected ? 'text-amber-100/80' : 'text-[#6D6561]'}">
                        ${seat.sublabel}
                      </div>
                    </div>
                    <div class="mt-3 pt-2.5 border-t ${isSelected ? 'border-white/10' : 'border-[#E8DDD0]/50'}">
                      <span class="inline-block text-[9px] font-bold font-label uppercase px-2 py-0.5 rounded-full ${
                        isSelected ? 'bg-white/10 text-amber-300' : seat.badgeClass
                      }">
                        ${seat.badge}
                      </span>
                    </div>
                  </button>
                `;
              }).join('')}
            </div>
          </div>

          <!-- RESERVATION SUMMARY BAR -->
          <div class="bg-gradient-to-r from-[#F8EFE5] to-[#F5E8D9] p-5 sm:p-6 rounded-2xl border border-[#E8DDD0] shadow-xs">
            <div class="space-y-1.5 min-w-0">
              <div class="font-label text-[10px] font-bold text-[#6D6561] uppercase tracking-wider flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-[#9B1C25]"></span>
                <span>${t('reservation_summary_bar')}</span>
              </div>
              <div class="font-headline text-base sm:text-lg font-bold text-[#241A18] truncate">
                ${restaurant.name}
              </div>
              <div class="font-body text-xs sm:text-sm text-[#6D6561] flex flex-wrap items-center gap-x-2.5 gap-y-1.5 pt-0.5">
                <span class="flex items-center gap-1 font-semibold text-[#241A18]">
                  <span class="material-symbols-outlined text-sm text-[#9B1C25]">calendar_today</span>
                  <span>${bData.date}</span>
                </span>
                <span class="text-[#E8DDD0]">•</span>
                <span class="flex items-center gap-1 font-semibold text-[#241A18]">
                  <span class="material-symbols-outlined text-sm text-[#9B1C25]">schedule</span>
                  <span>${bData.time}</span>
                </span>
                <span class="text-[#E8DDD0]">•</span>
                <span class="flex items-center gap-1 font-semibold text-[#241A18]">
                  <span class="material-symbols-outlined text-sm text-[#9B1C25]">group</span>
                  <span>${bData.guests} ${t('guests')}</span>
                </span>
                <span class="text-[#E8DDD0]">•</span>
                <span class="flex items-center gap-1 font-semibold text-[#241A18]">
                  <span class="material-symbols-outlined text-sm text-[#9B1C25]">chair</span>
                  <span>${getSeatingLabel(bData.seatingPreference)}</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Bottom Action Buttons & Member Status -->
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#E8DDD0]">
            ${state.isAuthenticated ? `
              <div class="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                <span class="material-symbols-outlined text-sm text-emerald-600">verified</span>
                <span>${t('logged_in_as')} <strong>${state.myPageData.userName || 'Alex Aung'}</strong> • Fast Auto-Fill</span>
              </div>
            ` : `
              <div class="flex items-center gap-2 text-xs font-medium text-[#6D6561]">
                <span class="material-symbols-outlined text-sm text-[#9B1C25]">flash_on</span>
                <span>Fast Guest or Member Booking • Free Cancellation</span>
              </div>
            `}

            <div class="flex items-center gap-3 w-full sm:w-auto justify-end">
              <a
                href="#/"
                id="step1-cancel-btn"
                class="w-full sm:w-auto px-6 py-3 rounded-full border border-[#E8DDD0] font-label text-xs sm:text-sm font-semibold text-[#6D6561] hover:bg-[#F8EFE5] transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span class="material-symbols-outlined text-sm">home</span>
                <span>${t('ezbooknow_home')}</span>
              </a>
              <button
                type="button"
                id="step1-next-btn"
                class="w-full sm:w-auto bg-[#9B1C25] hover:bg-[#7F161E] text-white font-label text-xs sm:text-sm font-bold px-8 py-3.5 rounded-full shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
              >
                <span>${t('proceed_to_booking')}</span>
                <span class="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>

        </div>

        <!-- MOBILE STICKY SUMMARY & CTA BAR -->
        <div class="fixed bottom-0 left-0 right-0 sm:hidden bg-[#FFFDFC]/95 backdrop-blur-md border-t border-[#E8DDD0] px-4 py-3 z-40 shadow-xl flex items-center justify-between gap-3 animate-fadeIn">
          <div class="min-w-0">
            <div class="text-[10px] font-bold uppercase tracking-wider text-[#9B1C25] font-label flex items-center gap-1">
              <span class="material-symbols-outlined text-xs">restaurant</span>
              <span>${bData.date}</span>
            </div>
            <div class="text-xs font-bold text-[#241A18] truncate font-headline mt-0.5">
              ${bData.time} • ${bData.guests} ${t('guests')} (${getSeatingLabel(bData.seatingPreference)})
            </div>
          </div>
          <button
            type="button"
            id="mobile-step1-next-btn"
            class="bg-[#9B1C25] hover:bg-[#7F161E] text-white font-label text-xs font-bold px-5 py-2.5 rounded-full shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <span>Continue</span>
            <span class="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

      </div>
    `;
  }

  function attachBookingStep1Events(containerElement = document) {
    const modalCalContainer = containerElement.querySelector('#booking-modal-calendar-container');
    if (modalCalContainer) {
      const currentDateVal = store.getState().bookingModalState.bookingData.date || getTodayString();
      const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const now = new Date();
      let activeCalYear = now.getFullYear();
      let activeCalMonth = now.getMonth();
      if (currentDateVal) {
        const parts = currentDateVal.replace(',', '').split(' ');
        if (parts.length >= 3) {
          const mIdx = monthNamesShort.findIndex(m => m.toLowerCase().startsWith(parts[0].toLowerCase().substring(0, 3)));
          if (mIdx !== -1) activeCalMonth = mIdx;
          const parsedYear = parseInt(parts[2], 10);
          if (!isNaN(parsedYear)) activeCalYear = parsedYear;
        }
      }

      function renderModalCalendar() {
        if (!modalCalContainer) return;
        modalCalContainer.innerHTML = generateCalendarGrid({
          year: activeCalYear,
          month: activeCalMonth,
          selectedDateStr: store.getState().bookingModalState.bookingData.date || getTodayString(),
          onDaySelectAttr: 'data-modal-calendar-day'
        });
        bindModalCalendarEvents();
      }

      function bindModalCalendarEvents() {
        if (!modalCalContainer) return;
        const prevBtn = modalCalContainer.querySelector('#cal-prev-month');
        if (prevBtn) {
          prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (prevBtn.disabled) return;
            activeCalMonth--;
            if (activeCalMonth < 0) { activeCalMonth = 11; activeCalYear--; }
            renderModalCalendar();
          });
        }
        const nextBtn = modalCalContainer.querySelector('#cal-next-month');
        if (nextBtn) {
          nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (nextBtn.disabled) return;
            activeCalMonth++;
            if (activeCalMonth > 11) { activeCalMonth = 0; activeCalYear++; }
            renderModalCalendar();
          });
        }
        modalCalContainer.querySelectorAll('[data-modal-calendar-day]').forEach(dayBtn => {
          dayBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const dateStr = e.currentTarget.getAttribute('data-date-str');
            if (dateStr) {
              store.setBookingStep(1, { bookingData: { date: dateStr } });
            }
          });
        });
      }

      bindModalCalendarEvents();
    }

    // Service toggle (lunch vs dinner)
    containerElement.querySelectorAll('[data-service-toggle]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const service = e.currentTarget.getAttribute('data-service-toggle');
        const defaultTime = service === 'lunch' ? '12:30' : '18:30';
        store.setBookingStep(1, {
          selectedService: service,
          bookingData: { time: defaultTime }
        });
      });
    });

    // Time slot click
    containerElement.querySelectorAll('[data-select-time]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const time = e.currentTarget.getAttribute('data-select-time');
        store.setBookingStep(1, { bookingData: { time } });
      });
    });

    // Quick party buttons
    containerElement.querySelectorAll('[data-quick-party]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const size = parseInt(e.currentTarget.getAttribute('data-quick-party'), 10);
        if (!isNaN(size)) {
          store.setBookingStep(1, { bookingData: { guests: size } });
        }
      });
    });

    // Minus / Plus buttons
    const minus1 = containerElement.querySelector('#step1-guests-minus');
    if (minus1) {
      minus1.addEventListener('click', () => {
        const cur = store.getState().bookingModalState.bookingData.guests || 2;
        if (cur > 1) store.setBookingStep(1, { bookingData: { guests: cur - 1 } });
      });
    }

    const plus1 = containerElement.querySelector('#step1-guests-plus');
    if (plus1) {
      plus1.addEventListener('click', () => {
        const cur = store.getState().bookingModalState.bookingData.guests || 2;
        if (cur < 16) store.setBookingStep(1, { bookingData: { guests: cur + 1 } });
      });
    }

    // Seating preference
    containerElement.querySelectorAll('[data-select-seating]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const seatingPreference = e.currentTarget.getAttribute('data-select-seating');
        store.setBookingStep(1, { bookingData: { seatingPreference } });
      });
    });

    // Next button navigation (Desktop & Mobile)
    function proceedToStep2() {
      store.setBookingStep(2);
      const r = store.getState().bookingModalState.restaurant;
      const slug = store.getRestaurantSlug ? store.getRestaurantSlug(r) : 'gilded-fork';
      window.location.hash = `#/s/${slug}/book`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const step1Next = containerElement.querySelector('#step1-next-btn');
    if (step1Next) {
      step1Next.addEventListener('click', proceedToStep2);
    }

    const mobileStep1Next = containerElement.querySelector('#mobile-step1-next-btn');
    if (mobileStep1Next) {
      mobileStep1Next.addEventListener('click', proceedToStep2);
    }
  }

  window.YoyakuComponents.renderBookingStep1 = renderBookingStep1;
  window.YoyakuComponents.renderBookingPage = renderBookingStep1;
  window.YoyakuComponents.attachBookingStep1Events = attachBookingStep1Events;
})();
