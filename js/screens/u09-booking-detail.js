(() => {
  'use strict';

  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;

  // Helper to format currency
  function formatMMK(amount) {
    if (!amount) return '0 MMK';
    return Number(amount).toLocaleString('en-US') + ' MMK';
  }

  // Render Status Badge (Clean typography without container box shape)
  function renderStatusBadge(status, isMm) {
    const s = (status || 'confirmed').toLowerCase();
    if (s === 'confirmed') {
      return `
        <span class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
          <span class="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
          <span>${isMm ? 'အတည်ပြုပြီး' : 'Confirmed'}</span>
        </span>
      `;
    }
    if (s === 'pending') {
      return `
        <span class="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700">
          <span class="material-symbols-outlined text-sm text-amber-600">schedule</span>
          <span>${isMm ? 'စောင့်ဆိုင်းဆဲ' : 'Pending Approval'}</span>
        </span>
      `;
    }
    if (s === 'completed') {
      return `
        <span class="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700">
          <span class="material-symbols-outlined text-sm text-slate-500">task_alt</span>
          <span>${isMm ? 'ပြီးမြောက်ပြီး' : 'Completed'}</span>
        </span>
      `;
    }
    if (s === 'cancelled') {
      return `
        <span class="inline-flex items-center gap-1.5 text-xs font-bold text-rose-700">
          <span class="material-symbols-outlined text-sm text-rose-600">cancel</span>
          <span>${isMm ? 'ပယ်ဖျက်ပြီး' : 'Cancelled'}</span>
        </span>
      `;
    }
    return `
      <span class="inline-flex items-center gap-1.5 text-xs font-bold text-[#58413f]">
        <span>${status}</span>
      </span>
    `;
  }

  // Main View Renderer for U-09
  function renderBookingDetailView(state) {
    const isMm = state.currentLanguage === 'MM';
    const isGuest = !!state.isGuestReservationView;
    const resId = state.selectedReservationId;

    // Find reservation in store or mock fallback
    const res = (state.reservations || []).find(r => r.id === resId) || {
      id: resId || 'res_default',
      reservationNo: resId ? `EZ-2026-${resId.replace(/\D/g, '').padStart(4, '0') || '8894'}` : 'EZ-2026-8894',
      restaurantId: '1',
      restaurantName: 'Le Planteur Fine Dining & Wine Bar',
      restaurantNameMM: 'လီပလန်တား အဆင့်မြင့် ပြင်သစ်စားသောက်ဆိုင်',
      location: 'Bahan Township, Yangon',
      locationMM: 'ဗဟန်းမြို့နယ်၊ ရန်ကုန်မြို့',
      phone: '+95 1 541 997',
      address: '80 University Avenue Road, Bahan Township, Yangon',
      date: 'Aug 24, 2026',
      time: '19:30',
      guests: 4,
      seating: 'Window View - Garden Terrace',
      seatingMM: 'ဥယျာဉ်ရှုခင်း ပြတင်းပေါက် စားပွဲဝိုင်း',
      courseName: '6-Course French Heritage Tasting Menu',
      courseNameMM: '၆ မျိုးပါ အဆင့်မြင့် ပြင်သစ် ရိုးရာအရသာ မီနူး',
      customerName: state.currentUser ? state.currentUser.name : 'Daw Hla Hla Win',
      customerPhone: state.currentUser ? state.currentUser.phone : '+95 9 790 123 456',
      customerEmail: state.currentUser ? state.currentUser.email : 'hlahla.win@example.com',
      totalAmountMMK: 350000,
      totalAmountUSD: 106,
      paymentStatus: 'Pay at Restaurant on Arrival',
      paymentStatusMM: 'ဆိုင်အရောက် ငွေချေရန်',
      status: 'Confirmed',
      specialRequests: 'Window table requested. 1 guest has shellfish allergy. Celebrating a wedding anniversary.',
      createdAt: '2026-08-15 14:20'
    };

    const isCancelled = (res.status || '').toLowerCase() === 'cancelled';
    const isCompleted = (res.status || '').toLowerCase() === 'completed';
    const canModify = !isCancelled && !isCompleted;

    const resNumber = res.reservationNo || (res.id ? `EZ-2026-${res.id.replace(/\D/g, '').padStart(4, '0') || '8894'}` : 'EZ-2026-8894');
    const restName = isMm ? (res.restaurantNameMM || res.restaurantName) : res.restaurantName;
    const restLocation = isMm ? (res.locationMM || res.location) : res.location;
    const courseTitle = isMm ? (res.courseNameMM || res.courseName || 'A La Carte Selection') : (res.courseName || 'A La Carte Selection');
    const seatingTitle = isMm ? (res.seatingMM || res.seating || 'Standard Table') : (res.seating || 'Standard Table');
    const paymentTitle = isMm ? (res.paymentStatusMM || res.paymentStatus || 'Pay at Restaurant') : (res.paymentStatus || 'Pay at Restaurant');

    const origin = state.reservationDetailOrigin || (isGuest ? 'lookup' : 'reservations');
    const isFromLookup = origin === 'lookup' || isGuest;
    const isFromDiscover = origin === 'discover';

    // Contextual Labels for Back Button & Parent Breadcrumb
    const backLabel = isFromLookup
      ? (isMm ? 'ဧည့်သည် စစ်ဆေးမှုသို့' : 'Back to Lookup')
      : isFromDiscover
        ? (isMm ? 'ပင်မ ရှာဖွေရေးသို့' : 'Back to Discover')
        : (isMm ? 'ကြိုတင်စာရင်းများသို့' : 'Back to Reservations');

    const parentLabel = isFromLookup
      ? (isMm ? 'ဧည့်သည် စစ်ဆေးမှု' : 'Lookup Reservation')
      : (isMm ? 'ကြိုတင်စာရင်းများ' : 'My Reservations');

    return `
      <div id="u09-booking-detail-page" class="min-h-screen bg-[#FFF7E8] text-[#231916] pb-24 font-body antialiased">

        <!-- TOP BREADCRUMB & CONTEXT-AWARE NAVIGATION BAR -->
        <div class="bg-[#FFF7E8] sticky top-16 z-20">
          <div class="max-w-4xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3">

            <!-- Left: Smart Back Button & Breadcrumbs -->
            <div class="flex items-center gap-2 sm:gap-3.5 min-w-0">
              <button
                id="u09-back-btn"
                class="flex items-center gap-2 font-label text-xs sm:text-sm font-bold text-[#840f16] hover:text-[#600b10] transition-colors cursor-pointer py-1"
                title="${isMm ? 'နောက်သို့ ပြန်သွားရန်' : 'Back'}"
              >
                <span class="material-symbols-outlined text-sm sm:text-base text-[#840f16]">arrow_back</span>
                <span>${backLabel}</span>
              </button>

              <!-- Breadcrumb Trail -->
              <nav aria-label="Breadcrumb" class="hidden sm:flex items-center gap-1.5 font-label text-xs text-[#6D6561] min-w-0">
                <span class="text-[#C5B7A8]">/</span>
                <button id="u09-breadcrumb-discover" class="hover:text-[#840f16] hover:underline transition-colors cursor-pointer shrink-0">
                  ${isMm ? 'ပင်မ' : 'Discover'}
                </button>
                <span class="text-[#C5B7A8]">&gt;</span>
                <button id="u09-breadcrumb-parent" class="hover:text-[#840f16] hover:underline transition-colors cursor-pointer shrink-0">
                  ${parentLabel}
                </button>
                <span class="text-[#C5B7A8]">&gt;</span>
                <span class="font-bold text-[#840f16] truncate max-w-[140px] md:max-w-[200px]" title="${resNumber}">${resNumber}</span>
              </nav>
            </div>

            <!-- Right: Return to Discover Quick Pill Button -->
            <div class="flex items-center gap-2 shrink-0">
              <button
                id="u09-nav-discover-btn"
                type="button"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E8DDD0] bg-[#FFFDFC] hover:bg-[#FBF3E2] hover:border-[#840f16]/30 text-xs font-label font-bold text-[#58413f] hover:text-[#840f16] transition-all cursor-pointer shadow-2xs active:scale-95"
                title="${isMm ? 'ပင်မ ရှာဖွေရေး စာမျက်နှာသို့ သွားရန်' : 'Return to Discover'}"
              >
                <span class="material-symbols-outlined text-sm text-[#840f16]">explore</span>
                <span>${isMm ? 'ရှာဖွေမည်' : 'Discover'}</span>
              </button>
            </div>

          </div>
        </div>

        <main class="max-w-4xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8 space-y-6">

          <!-- GUEST MODE NOTICE BANNER (IF GUEST) -->
          ${isGuest ? `
            <div class="bg-amber-50 border border-amber-300 rounded-2xl p-4 sm:p-5 shadow-xs flex items-start gap-3.5">
              <span class="material-symbols-outlined text-amber-700 text-2xl shrink-0 mt-0.5">info</span>
              <div class="space-y-1 flex-1 text-sm">
                <div class="font-bold text-amber-900 flex items-center gap-2">
                  <span>${isMm ? 'ဧည့်သည် စုံစမ်းမှု အခြေအနေ (Guest Inquiry Mode)' : 'Guest Inquiry Mode'}</span>
                  <span class="text-[11px] font-semibold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">${isMm ? 'ကန့်သတ်ချက်ရှိသည်' : 'Limited Actions'}</span>
                </div>
                <p class="text-amber-800 leading-relaxed text-xs sm:text-sm">
                  ${isMm
                    ? 'သင်သည် ကြိုတင်စာရင်း အမှတ်စဉ်နှင့် ဖုန်းနံပါတ်ဖြင့် ဧည့်သည်အဖြစ် ကြည့်ရှုနေပါသည်။ အသင်းဝင်အမှတ်များနှင့် အကောင့်မှတ်တမ်းများကို ရယူနိုင်ရန် အကောင့်ဝင်ရောက်ပါ။'
                    : 'You are viewing this reservation via guest lookup. Some member benefits, point rewards, and profile sync are limited.'}
                </p>
                <div class="pt-1">
                  <button id="u09-guest-login-link" class="text-xs font-bold text-[#840F16] hover:underline inline-flex items-center gap-1 cursor-pointer">
                    <span>${isMm ? 'အကောင့်ဝင်ရောက်ရန် သို့မဟုတ် အကောင့်ဖွင့်ရန်' : 'Log in or Register to save booking to profile'}</span>
                    <span class="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- SECTION 1: RESERVATION SUMMARY HEADER CARD -->
          <div class="bg-transparent lg:bg-[#FFFDF9] rounded-none lg:rounded-2xl border-0 lg:border lg:border-[#EADFD1] p-0 lg:p-8 shadow-none lg:shadow-sm space-y-6">

            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div class="space-y-1.5">
                <h1 class="font-headline text-lg sm:text-xl font-bold text-[#231916]">
                  ${restName}
                </h1>
                <div class="flex items-center gap-2.5 text-xs sm:text-sm text-[#58413f] flex-wrap">
                  <div class="flex items-center gap-1 text-xs">
                    <span class="material-symbols-outlined text-sm text-[#840F16]">location_on</span>
                    <span>${restLocation}</span>
                  </div>
                  <span class="text-[#D3C4B4] text-xs">•</span>
                  <div class="flex items-center gap-1">
                    ${renderStatusBadge(res.status, isMm)}
                  </div>
                  <span class="text-[#D3C4B4] text-xs">•</span>
                  <span class="text-xs text-[#7A6B65] font-mono font-medium">
                    #${resNumber}
                  </span>
                </div>
              </div>

              <!-- Quick Copy & QR Action -->
              <div class="flex items-center gap-2.5 self-start sm:self-center">
                <button
                  id="u09-copy-id-btn"
                  data-res-no="${resNumber}"
                  class="px-3.5 py-2 rounded-full bg-[#FAF3E8] hover:bg-[#EADFD1] text-[#231916] border border-[#EADFD1] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                  title="Copy Reservation Number"
                >
                  <span class="material-symbols-outlined text-sm">content_copy</span>
                  <span id="u09-copy-btn-text">${isMm ? 'ကူးယူရန်' : 'Copy ID'}</span>
                </button>

                <button
                  id="u09-view-pass-btn"
                  class="btn-primary px-4 py-2 rounded-full font-label font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
                  title="View Digital QR Pass"
                >
                  <span class="material-symbols-outlined text-sm">qr_code_2</span>
                  <span>${isMm ? 'QR ကတ်' : 'QR Pass'}</span>
                </button>
              </div>
            </div>

          </div>

          <!-- ACTION TILES: CALL, CALENDAR, MAP (ABOVE SPECIFICATIONS) -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">

            <!-- Call Shop Concierge -->
            <button
              id="u09-call-shop-btn"
              data-phone="${res.phone || '+95 1 541 997'}"
              class="p-4 rounded-2xl bg-[#FFFDFC] hover:bg-[#F8EFE5] border border-[#E8DDD0] hover:border-[#840F16]/40 text-left transition-all flex items-center gap-3.5 cursor-pointer group shadow-2xs"
            >
              <div class="w-11 h-11 rounded-xl bg-white border border-[#EADFD1] group-hover:border-[#840F16]/30 group-hover:bg-[#FFF8F6] text-[#840F16] flex items-center justify-center transition-colors shrink-0 shadow-2xs">
                <span class="material-symbols-outlined text-xl text-[#840F16]">call</span>
              </div>
              <div class="min-w-0">
                <div class="text-xs font-bold text-[#231916] group-hover:text-[#840F16] transition-colors truncate">${isMm ? 'ဆိုင်သို့ ဖုန်းခေါ်ဆိုရန်' : 'Call Restaurant'}</div>
                <div class="text-[11px] font-mono text-[#58413f] truncate">${res.phone || '+95 1 541 997'}</div>
              </div>
            </button>

            <!-- Add to Calendar -->
            <button
              id="u09-calendar-btn"
              class="p-4 rounded-2xl bg-[#FFFDFC] hover:bg-[#F8EFE5] border border-[#E8DDD0] hover:border-[#840F16]/40 text-left transition-all flex items-center gap-3.5 cursor-pointer group shadow-2xs"
            >
              <div class="w-11 h-11 rounded-xl bg-white border border-[#EADFD1] group-hover:border-[#840F16]/30 group-hover:bg-[#FFF8F6] text-[#840F16] flex items-center justify-center transition-colors shrink-0 shadow-2xs">
                <span class="material-symbols-outlined text-xl text-[#840F16]">event</span>
              </div>
              <div class="min-w-0">
                <div class="text-xs font-bold text-[#231916] group-hover:text-[#840F16] transition-colors truncate">${isMm ? 'ပြက္ခဒိန်တွင် သိမ်းရန်' : 'Add to Calendar'}</div>
                <div class="text-[11px] text-[#58413f] truncate">${res.date} • ${res.time}</div>
              </div>
            </button>

            <!-- Get Directions / Map -->
            <button
              id="u09-map-btn"
              data-address="${res.address || res.location || 'Yangon'}"
              class="p-4 rounded-2xl bg-[#FFFDFC] hover:bg-[#F8EFE5] border border-[#E8DDD0] hover:border-[#840F16]/40 text-left transition-all flex items-center gap-3.5 cursor-pointer group shadow-2xs"
            >
              <div class="w-11 h-11 rounded-xl bg-white border border-[#EADFD1] group-hover:border-[#840F16]/30 group-hover:bg-[#FFF8F6] text-[#840F16] flex items-center justify-center transition-colors shrink-0 shadow-2xs">
                <span class="material-symbols-outlined text-xl text-[#840F16]">map</span>
              </div>
              <div class="min-w-0">
                <div class="text-xs font-bold text-[#231916] group-hover:text-[#840F16] transition-colors truncate">${isMm ? 'လမ်းညွှန် မြေပုံကြည့်ရန်' : 'View Location Map'}</div>
                <div class="text-[11px] text-[#58413f] truncate">${restLocation}</div>
              </div>
            </button>

          </div>

          <!-- SECTION 2: DETAILED RESERVATION SPECIFICATIONS -->
          <div class="bg-transparent lg:bg-[#FFFDFC] rounded-none lg:rounded-2xl border-0 lg:border lg:border-[#E8DDD0] p-0 lg:p-8 shadow-none lg:shadow-sm space-y-6">

            <div class="flex items-center justify-between border-b border-[#F0E5D8] pb-3">
              <h2 class="font-headline text-lg sm:text-xl font-bold text-[#231916] flex items-center gap-2">
                <span class="material-symbols-outlined text-[#840F16]">receipt_long</span>
                <span>${isMm ? 'ကြိုတင်စာရင်း အချက်အလက် အပြည့်အစုံ' : 'Reservation Specifications'}</span>
              </h2>
            </div>

            <!-- KEY ATTRIBUTE HIGHLIGHTS (Date, Time, Guests) -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5">

              <!-- Date Tile -->
              <div class="bg-[#FFFDFC] rounded-xl p-4 border border-[#E8DDD0] flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-xl bg-[#840F16]/10 flex items-center justify-center text-[#840F16] shrink-0">
                  <span class="material-symbols-outlined text-2xl">calendar_month</span>
                </div>
                <div>
                  <div class="text-[11px] font-semibold text-[#7A6B65] uppercase tracking-wider">${isMm ? 'ရက်စွဲ' : 'Date'}</div>
                  <div class="font-headline text-base sm:text-lg font-bold text-[#231916]">${res.date}</div>
                </div>
              </div>

              <!-- Time Tile -->
              <div class="bg-[#FFFDFC] rounded-xl p-4 border border-[#E8DDD0] flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-xl bg-[#840F16]/10 flex items-center justify-center text-[#840F16] shrink-0">
                  <span class="material-symbols-outlined text-2xl">schedule</span>
                </div>
                <div>
                  <div class="text-[11px] font-semibold text-[#7A6B65] uppercase tracking-wider">${isMm ? 'အချိန်' : 'Time'}</div>
                  <div class="font-headline text-base sm:text-lg font-bold text-[#231916]">${res.time}</div>
                </div>
              </div>

              <!-- Guests Tile -->
              <div class="bg-[#FFFDFC] rounded-xl p-4 border border-[#E8DDD0] flex items-center gap-3.5">
                <div class="w-11 h-11 rounded-xl bg-[#840F16]/10 flex items-center justify-center text-[#840F16] shrink-0">
                  <span class="material-symbols-outlined text-2xl">group</span>
                </div>
                <div>
                  <div class="text-[11px] font-semibold text-[#7A6B65] uppercase tracking-wider">${isMm ? 'လူဦးရေ' : 'Party Size'}</div>
                  <div class="font-headline text-base sm:text-lg font-bold text-[#231916]">
                    ${res.guests} ${isMm ? 'ဦး' : (res.guests === 1 ? 'Guest' : 'Guests')}
                  </div>
                </div>
              </div>

            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

              <!-- Customer Name -->
              <div class="p-4 rounded-xl bg-[#FFFDFC] border border-[#E8DDD0] space-y-1">
                <div class="text-xs font-semibold text-[#7A6B65] flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm text-[#840F16]">person</span>
                  <span>${isMm ? 'မှာယူသူ အမည်' : 'Primary Guest Name'}</span>
                </div>
                <div class="font-headline text-base font-bold text-[#231916]">${res.customerName}</div>
              </div>

              <!-- Phone Number -->
              <div class="p-4 rounded-xl bg-[#FFFDFC] border border-[#E8DDD0] space-y-1">
                <div class="text-xs font-semibold text-[#7A6B65] flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm text-[#840F16]">call</span>
                  <span>${isMm ? 'ဆက်သွယ်ရန် ဖုန်းနံပါတ်' : 'Contact Phone'}</span>
                </div>
                <div class="font-headline text-base font-bold text-[#231916] font-mono">${res.customerPhone}</div>
              </div>

              <!-- Seating Preference -->
              <div class="p-4 rounded-xl bg-[#FFFDFC] border border-[#E8DDD0] space-y-1">
                <div class="text-xs font-semibold text-[#7A6B65] flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm text-[#840F16]">table_restaurant</span>
                  <span>${isMm ? 'စားပွဲဝိုင်း အမျိုးအစား' : 'Seating / Area Preference'}</span>
                </div>
                <div class="font-body text-sm font-bold text-[#231916]">${seatingTitle}</div>
              </div>

              <!-- Selected Menu/Course -->
              <div class="p-4 rounded-xl bg-[#FFFDFC] border border-[#E8DDD0] space-y-1">
                <div class="text-xs font-semibold text-[#7A6B65] flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm text-[#840F16]">restaurant_menu</span>
                  <span>${isMm ? 'ရွေးချယ်ထားသော မီနူး / ကော်စ်' : 'Selected Course / Menu'}</span>
                </div>
                <div class="font-body text-sm font-bold text-[#231916]">${courseTitle}</div>
              </div>

              <!-- Payment Method & Estimate -->
              <div class="p-4 rounded-xl bg-[#FFFDFC] border border-[#E8DDD0] space-y-1">
                <div class="text-xs font-semibold text-[#7A6B65] flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm text-[#840F16]">payments</span>
                  <span>${isMm ? 'ငွေပေးချေမှု အခြေအနေ' : 'Payment Status & Estimate'}</span>
                </div>
                <div class="font-body text-sm font-bold text-[#231916] flex items-center justify-between">
                  <span>${paymentTitle}</span>
                  <span class="text-xs font-bold text-[#840F16]">${formatMMK(res.totalAmountMMK)}</span>
                </div>
              </div>

              <!-- Booking Channel & Created Date -->
              <div class="p-4 rounded-xl bg-[#FFFDFC] border border-[#E8DDD0] space-y-1">
                <div class="text-xs font-semibold text-[#7A6B65] flex items-center gap-1.5">
                  <span class="material-symbols-outlined text-sm text-[#840F16]">devices</span>
                  <span>${isMm ? 'မှာယူခဲ့သည့် ချန်နယ်' : 'Booking Channel'}</span>
                </div>
                <div class="font-body text-xs font-medium text-[#58413f]">
                  ${isMm ? 'EzBookNow အွန်လိုင်း ဝဘ်ဆိုက်' : 'EzBookNow Web Portal'}
                  ${res.createdAt ? ` • <span class="text-[#7A6B65]">${res.createdAt}</span>` : ''}
                </div>
              </div>

            </div>

            <!-- Notes & Special Requests -->
            <div class="p-4 sm:p-5 rounded-xl bg-[#FFFDFC] border border-[#E8DDD0] space-y-1.5">
              <div class="text-xs font-bold text-[#58413f] flex items-center gap-1.5 uppercase tracking-wider">
                <span class="material-symbols-outlined text-base text-[#840F16]">note_alt</span>
                <span>${isMm ? 'အထူးမှာကြားချက်နှင့် ဓာတ်မတည့်မှုများ' : 'Special Requests & Dietary Notes'}</span>
              </div>
              <p class="text-xs sm:text-sm text-[#231916] leading-relaxed">
                ${res.specialRequests || (isMm ? 'အထူးမှာကြားချက် မရှိပါ' : 'No specific dietary notes or special requests provided.')}
              </p>
            </div>

          </div>

          <!-- SECTION 3: CHANGE AND CANCELLATION ACTIONS -->
          <div class="bg-transparent lg:bg-[#FFFDFC] rounded-none lg:rounded-2xl border-0 lg:border lg:border-[#E8DDD0] p-0 lg:p-8 shadow-none lg:shadow-sm space-y-6">

            <div class="flex items-center justify-between border-b border-[#F0E5D8] pb-3">
              <h2 class="font-headline text-lg sm:text-xl font-bold text-[#231916] flex items-center gap-2">
                <span class="material-symbols-outlined text-[#840F16]">edit_calendar</span>
                <span>${isMm ? 'ကြိုတင်စာရင်း ပြင်ဆင်ခြင်းနှင့် ပယ်ဖျက်ခြင်း' : 'Modify or Cancel Reservation'}</span>
              </h2>
            </div>

            <!-- Cancellation Policy & Deadline Notice Box -->
            <div class="p-4 sm:p-5 rounded-xl ${isCancelled ? 'bg-rose-50 border-rose-200' : 'bg-[#FFFDFC] border-[#E8DDD0]'} border flex items-start gap-3.5">
              <span class="material-symbols-outlined ${isCancelled ? 'text-rose-600' : 'text-[#840F16]'} text-2xl shrink-0 mt-0.5">
                ${isCancelled ? 'cancel' : 'verified_user'}
              </span>
              <div class="space-y-1 text-xs sm:text-sm leading-relaxed">
                ${isCancelled ? `
                  <div class="font-bold text-rose-900">${isMm ? 'ဤကြိုတင်စာရင်းအား ပယ်ဖျက်ပြီးပါပြီ' : 'This Reservation Has Been Cancelled'}</div>
                  <p class="text-rose-700">
                    ${isMm ? 'ကြိုတင်စာရင်း ပယ်ဖျက်ခြင်း ပြီးဆုံးပါပြီ။ ထပ်မံစားသုံးလိုပါက အောက်ပါခလုတ်မှတစ်ဆင့် ပြန်လည်မှာယူနိုင်ပါသည်။' : 'This booking has been cancelled and table released. You may rebook anytime if your plans change.'}
                  </p>
                ` : `
                  <div class="font-bold text-[#231916]">${isMm ? 'အခမဲ့ ပယ်ဖျက်နိုင်မှု စည်းမျဉ်းသတ်မှတ်ချက်' : 'Cancellation & Change Policy'}</div>
                  <p class="text-[#58413f]">
                    ${isMm
                      ? 'သတ်မှတ်ရက်ချိန်း မတိုင်မီ ၂ နာရီအလိုအထိ အခမဲ့ ပြင်ဆင်ခြင်းနှင့် ပယ်ဖျက်ခြင်း ပြုလုပ်နိုင်ပါသည်။ သတ်မှတ်ချိန်ကျော်လွန်ပါက ဆိုင်သို့ တိုက်ရိုက်ဖုန်းဆက် အကြောင်းကြားပေးပါ။'
                      : 'Free cancellation and modification available up to 2 hours before reservation time. For changes within 2 hours of arrival, please contact the restaurant directly.'}
                  </p>
                `}
              </div>
            </div>

            <!-- Action Buttons Grid -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">

              <!-- Change Reservation Button -->
              <button
                id="u09-change-btn"
                ${!canModify ? 'disabled' : ''}
                class="flex-1 py-3.5 px-6 rounded-full font-label font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all ${
                  canModify
                    ? 'btn-primary cursor-pointer active:scale-[0.99]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                }"
              >
                <span class="material-symbols-outlined text-base">edit</span>
                <span>${isMm ? 'ကြိုတင်စာရင်း ပြင်ဆင်ရန်' : 'Change Reservation'}</span>
              </button>

              <!-- Cancel Reservation Button -->
              <button
                id="u09-cancel-btn"
                ${!canModify ? 'disabled' : ''}
                class="flex-1 py-3.5 px-6 rounded-full font-label font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all ${
                  canModify
                    ? 'bg-[#231916] hover:bg-[#3D2C27] text-white cursor-pointer active:scale-[0.99]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                }"
              >
                <span class="material-symbols-outlined text-base">close</span>
                <span>${isMm ? 'ကြိုတင်စာရင်း ပယ်ဖျက်ရန်' : 'Cancel Reservation'}</span>
              </button>

            </div>

          </div>

          <!-- REBOOK BUTTON (if cancelled/completed) -->
          ${(isCancelled || isCompleted) ? `
            <div class="pt-2">
              <button
                id="u09-rebook-btn"
                data-rest-id="${res.restaurantId || '1'}"
                class="btn-primary w-full py-3.5 px-6 rounded-full font-label font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span class="material-symbols-outlined text-base">repeat</span>
                <span>${isMm ? 'ယခင်အချက်အလက်များဖြင့် ပြန်လည်မှာယူရန်' : 'Rebook This Restaurant'}</span>
              </button>
            </div>
          ` : ''}

        </main>

        <!-- =================================================================== -->
        <!-- MODALS: CHANGE RESERVATION MODAL -->
        <!-- =================================================================== -->
        <div id="u09-change-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 hidden">
          <div class="bg-[#FFF8F6] rounded-3xl border-2 border-[#EADFD1] shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative z-10 opacity-100 animate-in fade-in zoom-in-95 duration-200">

            <div class="flex items-center justify-between border-b-2 border-[#EADFD1] pb-3.5">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-[#840F16]/10 flex items-center justify-center text-[#840F16]">
                  <span class="material-symbols-outlined text-xl">edit_calendar</span>
                </div>
                <h3 class="font-headline text-lg sm:text-xl font-bold text-[#231916]">
                  ${isMm ? 'ရက်စွဲနှင့် အချိန် ပြင်ဆင်ရန်' : 'Change Reservation Details'}
                </h3>
              </div>
              <button id="u09-close-change-modal-btn" class="w-8 h-8 rounded-full bg-[#FAF3E8] hover:bg-[#EADFD1] flex items-center justify-center text-[#58413f] hover:text-[#231916] cursor-pointer transition-colors">
                <span class="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <form id="u09-change-form" class="space-y-4 text-left">

              <!-- Date Input -->
              <div class="space-y-1">
                <label class="text-xs font-bold text-[#58413f] uppercase tracking-wider">${isMm ? 'ရက်စွဲ အသစ်' : 'New Date'}</label>
                <input
                  type="date"
                  id="u09-change-date-input"
                  value="2026-08-26"
                  class="w-full px-4 py-3 rounded-2xl border-2 border-[#EADFD1] bg-white text-[#231916] font-medium text-sm focus:outline-none focus:border-[#840F16] shadow-xs"
                  required
                />
              </div>

              <!-- Time Select -->
              <div class="space-y-1">
                <label class="text-xs font-bold text-[#58413f] uppercase tracking-wider">${isMm ? 'အချိန် အသစ်' : 'New Time'}</label>
                <select
                  id="u09-change-time-select"
                  class="w-full px-4 py-3 rounded-2xl border-2 border-[#EADFD1] bg-white text-[#231916] font-medium text-sm focus:outline-none focus:border-[#840F16] shadow-xs"
                >
                  <option value="17:30">17:30</option>
                  <option value="18:00">18:00</option>
                  <option value="18:30">18:30</option>
                  <option value="19:00">19:00</option>
                  <option value="19:30" selected>19:30</option>
                  <option value="20:00">20:00</option>
                  <option value="20:30">20:30</option>
                  <option value="21:00">21:00</option>
                </select>
              </div>

              <!-- Guests Stepper -->
              <div class="space-y-1">
                <label class="text-xs font-bold text-[#58413f] uppercase tracking-wider">${isMm ? 'ဧည့်သည် အရေအတွက်' : 'Number of Guests'}</label>
                <div class="flex items-center gap-3">
                  <button
                    type="button"
                    id="u09-guest-minus-btn"
                    class="w-11 h-11 rounded-2xl bg-[#FAF3E8] hover:bg-[#EADFD1] border border-[#EADFD1] font-bold text-xl text-[#231916] flex items-center justify-center cursor-pointer transition-colors shadow-2xs"
                  >-</button>
                  <input
                    type="number"
                    id="u09-change-guests-input"
                    value="${res.guests || 4}"
                    min="1"
                    max="20"
                    class="w-24 text-center py-2.5 rounded-2xl border-2 border-[#EADFD1] bg-white font-headline text-lg font-bold text-[#231916] shadow-xs"
                  />
                  <button
                    type="button"
                    id="u09-guest-plus-btn"
                    class="w-11 h-11 rounded-2xl bg-[#FAF3E8] hover:bg-[#EADFD1] border border-[#EADFD1] font-bold text-xl text-[#231916] flex items-center justify-center cursor-pointer transition-colors shadow-2xs"
                  >+</button>
                  <span class="text-xs font-semibold text-[#58413f]">${isMm ? 'ဦး' : 'Guests'}</span>
                </div>
              </div>

              <!-- Recalculated Amount Preview -->
              <div class="p-4 rounded-2xl bg-[#FFFDFC] border border-[#E8DDD0] flex items-center justify-between text-xs sm:text-sm shadow-2xs">
                <span class="font-bold text-[#58413f]">${isMm ? 'ခန့်မှန်း ကုန်ကျငွေ စုစုပေါင်း:' : 'Estimated Total:'}</span>
                <span id="u09-change-total-preview" class="font-headline font-extrabold text-[#840F16] text-base">${formatMMK(res.totalAmountMMK)}</span>
              </div>

              <div class="pt-3 flex items-center gap-3">
                <button
                  type="button"
                  id="u09-cancel-change-modal-btn"
                  class="flex-1 py-3.5 px-5 rounded-full bg-[#231916] hover:bg-[#3D2C27] text-white font-label font-bold text-xs shadow-md flex items-center justify-center cursor-pointer transition-all active:scale-[0.98]"
                >
                  ${isMm ? 'မလုပ်တော့ပါ' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  id="u09-submit-change-btn"
                  class="btn-primary flex-1 py-3.5 px-5 rounded-full font-label font-bold text-xs shadow-md flex items-center justify-center cursor-pointer transition-all active:scale-[0.98]"
                >
                  ${isMm ? 'အတည်ပြု ပြောင်းလဲရန်' : 'Confirm Change'}
                </button>
              </div>

            </form>

          </div>
        </div>

        <!-- =================================================================== -->
        <!-- MODALS: CANCEL CONFIRMATION MODAL -->
        <!-- =================================================================== -->
        <div id="u09-cancel-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 hidden">
          <div class="bg-[#FFF8F6] rounded-3xl border-2 border-rose-200 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative z-10 opacity-100 animate-in fade-in zoom-in-95 duration-200">

            <div class="flex items-center justify-between border-b-2 border-rose-100 pb-3.5">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center text-rose-700">
                  <span class="material-symbols-outlined text-xl">cancel</span>
                </div>
                <h3 class="font-headline text-lg sm:text-xl font-bold text-rose-900">
                  ${isMm ? 'ကြိုတင်စာရင်း ပယ်ဖျက်ရန် အတည်ပြုခြင်း' : 'Cancel Reservation'}
                </h3>
              </div>
              <button id="u09-close-cancel-modal-btn" class="w-8 h-8 rounded-full bg-[#FAF3E8] hover:bg-[#EADFD1] flex items-center justify-center text-[#58413f] hover:text-[#231916] cursor-pointer transition-colors">
                <span class="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div class="space-y-4 text-left text-sm">
              <p class="text-[#58413f] leading-relaxed">
                ${isMm
                  ? 'သင်၏ စားပွဲဝိုင်း စိုတ်ထားမှုကို ပယ်ဖျက်လိုပါသလား။ ပယ်ဖျက်ရသည့် အကြောင်းအရင်းကို ရွေးချယ်ပေးပါ။'
                  : 'Are you sure you want to cancel this booking? Please select the primary reason for cancellation.'}
              </p>

              <!-- Reason Radios -->
              <div class="space-y-2.5 bg-[#FFFDFC] p-4 rounded-2xl border border-[#E8DDD0] shadow-2xs">
                <label class="flex items-center gap-3 text-xs sm:text-sm text-[#231916] font-medium cursor-pointer">
                  <input type="radio" name="u09-cancel-reason" value="schedule_change" checked class="text-[#840F16] focus:ring-[#840F16] w-4 h-4">
                  <span>${isMm ? 'အစီအစဉ် ရက်စွဲ/အချိန် ပြောင်းလဲသွားခြင်း' : 'Change in personal schedule or date'}</span>
                </label>
                <label class="flex items-center gap-3 text-xs sm:text-sm text-[#231916] font-medium cursor-pointer">
                  <input type="radio" name="u09-cancel-reason" value="health_emergency" class="text-[#840F16] focus:ring-[#840F16] w-4 h-4">
                  <span>${isMm ? 'ကျန်းမာရေး သို့မဟုတ် အရေးပေါ်ကိစ္စ' : 'Health or family emergency'}</span>
                </label>
                <label class="flex items-center gap-3 text-xs sm:text-sm text-[#231916] font-medium cursor-pointer">
                  <input type="radio" name="u09-cancel-reason" value="venue_choice" class="text-[#840F16] focus:ring-[#840F16] w-4 h-4">
                  <span>${isMm ? 'အခြား စားသောက်ဆိုင်သို့ ပြောင်းလဲစားသုံးခြင်း' : 'Selected a different restaurant'}</span>
                </label>
                <label class="flex items-center gap-3 text-xs sm:text-sm text-[#231916] font-medium cursor-pointer">
                  <input type="radio" name="u09-cancel-reason" value="other" class="text-[#840F16] focus:ring-[#840F16] w-4 h-4">
                  <span>${isMm ? 'အခြား အကြောင်းပြချက်' : 'Other reason'}</span>
                </label>
              </div>

              <!-- Cancellation Fee Statement -->
              <div class="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-center justify-between font-bold shadow-2xs">
                <span>${isMm ? 'ပယ်ဖျက်ခ ကောက်ခံမှု:' : 'Cancellation Fee:'}</span>
                <span class="font-extrabold text-emerald-950">${isMm ? 'အခမဲ့ (၀ ကျပ်)' : 'Free (0 MMK)'}</span>
              </div>
            </div>

            <div class="pt-2 flex items-center gap-3">
              <button
                type="button"
                id="u09-abort-cancel-modal-btn"
                class="btn-primary flex-1 py-3.5 px-5 rounded-full font-label font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
              >
                <span class="material-symbols-outlined text-base">check_circle</span>
                <span>${isMm ? 'မလုပ်တော့ပါ' : 'Keep Reservation'}</span>
              </button>
              <button
                type="button"
                id="u09-confirm-cancel-final-btn"
                class="flex-1 py-3.5 px-5 rounded-full bg-[#231916] hover:bg-[#3D2C27] text-white font-label font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all active:scale-[0.98]"
              >
                <span class="material-symbols-outlined text-base">cancel</span>
                <span>${isMm ? 'အတည်ပြု ပယ်ဖျက်မည်' : 'Confirm Cancellation'}</span>
              </button>
            </div>

          </div>
        </div>

        <!-- =================================================================== -->
        <!-- MODALS: DIGITAL QR PASS MODAL -->
        <!-- =================================================================== -->
        <div id="u09-qr-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 hidden">
          <div class="bg-[#FFF8F6] rounded-3xl border-2 border-[#EADFD1] shadow-2xl max-w-sm w-full p-6 text-center space-y-5 relative z-10 opacity-100 animate-in fade-in zoom-in-95 duration-200">

            <div class="flex items-center justify-between border-b-2 border-[#EADFD1] pb-3.5">
              <div class="font-headline font-bold text-base text-[#231916] flex items-center gap-2">
                <span class="material-symbols-outlined text-[#840F16]">qr_code_2</span>
                <span>${isMm ? 'ဒီဂျစ်တယ် ဝင်ခွင့်ကတ်' : 'Digital QR Pass'}</span>
              </div>
              <button id="u09-close-qr-modal-btn" class="w-8 h-8 rounded-full bg-[#FAF3E8] hover:bg-[#EADFD1] flex items-center justify-center text-[#58413f] hover:text-[#231916] cursor-pointer transition-colors">
                <span class="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div class="space-y-2">
              <div class="text-xs font-semibold text-[#7A6B65]">${restName}</div>

              <!-- Reservation ID Display without Box Shape -->
              <div class="flex items-center justify-center gap-1.5">
                <span class="text-[11px] font-bold text-[#7A6B65] uppercase tracking-wider">${isMm ? 'ဘွတ်ကင် နံပါတ်' : 'Reservation ID'}:</span>
                <span class="font-mono text-xs sm:text-sm font-extrabold text-[#840F16] tracking-wide">${resNumber}</span>
              </div>
            </div>

            <!-- QR Code Graphic Mock -->
            <div class="p-4 bg-white rounded-2xl border-2 border-[#EADFD1] inline-block shadow-inner mx-auto">
              <img
                src="${window.YoyakuPrototype ? window.YoyakuPrototype.createQrDataUri(`YOYAKU-${resNumber}`) : `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=YOYAKU-PASS-${resNumber}`}"
                alt="QR Pass"
                class="w-44 h-44 mx-auto object-contain"
                loading="lazy"
              />
            </div>

            <div class="text-xs text-[#58413f] leading-relaxed">
              ${isMm ? 'စားသောက်ဆိုင်သို့ ရောက်ရှိချိန်တွင် ဤ QR ကုဒ်အား ဝန်ထမ်းများထံ ပြသပေးပါ။' : 'Present this digital pass at the restaurant reception for instant table check-in.'}
            </div>

            <button
              id="u09-dismiss-qr-modal-btn"
              class="btn-primary w-full py-3 px-5 rounded-full font-label text-xs font-bold shadow-md cursor-pointer"
            >
              ${isMm ? 'ပိတ်မည်' : 'Close Pass'}
            </button>

          </div>
        </div>

      </div>
    `;
  }

  // Attach Event Listeners for U-09
  function attachBookingDetailViewEvents(containerElement) {
    if (!containerElement) return;

    // Back button (Context-Aware)
    const backBtn = containerElement.querySelector('#u09-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        const state = store.getState();
        const origin = state.reservationDetailOrigin;
        const isGuest = !!state.isGuestReservationView;
        store.clearSelectedReservationDetail();
        if (origin === 'lookup' || isGuest) {
          store.setLoginTab('lookup');
          store.setActiveTab('login');
        } else if (origin === 'discover') {
          store.setActiveTab('discover');
        } else {
          store.setActiveTab('reservations');
        }
      });
    }

    // Breadcrumb: Discover link
    const breadcrumbDiscover = containerElement.querySelector('#u09-breadcrumb-discover');
    if (breadcrumbDiscover) {
      breadcrumbDiscover.addEventListener('click', () => {
        store.clearSelectedReservationDetail();
        store.setActiveTab('discover');
      });
    }

    // Breadcrumb: Parent (Lookup or My Reservations)
    const breadcrumbParent = containerElement.querySelector('#u09-breadcrumb-parent');
    if (breadcrumbParent) {
      breadcrumbParent.addEventListener('click', () => {
        const state = store.getState();
        const origin = state.reservationDetailOrigin;
        const isGuest = !!state.isGuestReservationView;
        store.clearSelectedReservationDetail();
        if (origin === 'lookup' || isGuest) {
          store.setLoginTab('lookup');
          store.setActiveTab('login');
        } else {
          store.setActiveTab('reservations');
        }
      });
    }

    // Top Right Discover Pill Button
    const navDiscoverBtn = containerElement.querySelector('#u09-nav-discover-btn');
    if (navDiscoverBtn) {
      navDiscoverBtn.addEventListener('click', () => {
        store.clearSelectedReservationDetail();
        store.setActiveTab('discover');
      });
    }

    // Guest login link
    const guestLoginLink = containerElement.querySelector('#u09-guest-login-link');
    if (guestLoginLink) {
      guestLoginLink.addEventListener('click', () => {
        store.clearSelectedReservationDetail();
        store.setActiveTab('login');
      });
    }

    // Copy ID button
    const copyBtn = containerElement.querySelector('#u09-copy-id-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const resNo = copyBtn.getAttribute('data-res-no') || 'EZ-2026-8894';
        navigator.clipboard.writeText(resNo);
        const btnText = containerElement.querySelector('#u09-copy-btn-text');
        if (btnText) btnText.innerText = 'Copied!';
        store.showToast('Reservation ID copied to clipboard!');
        setTimeout(() => {
          if (btnText) btnText.innerText = store.getState().currentLanguage === 'MM' ? 'ကူးယူရန်' : 'Copy ID';
        }, 2000);
      });
    }

    // Call Shop Concierge button
    const callBtn = containerElement.querySelector('#u09-call-shop-btn');
    if (callBtn) {
      callBtn.addEventListener('click', () => {
        const phone = callBtn.getAttribute('data-phone') || '+95 1 541 997';
        store.showToast(`Connecting to venue concierge: ${phone}`);
      });
    }

    // Add to Calendar button
    const calBtn = containerElement.querySelector('#u09-calendar-btn');
    if (calBtn) {
      calBtn.addEventListener('click', () => {
        store.showToast('Reservation reminder saved to your calendar!');
      });
    }

    // View Map button
    const mapBtn = containerElement.querySelector('#u09-map-btn');
    if (mapBtn) {
      mapBtn.addEventListener('click', () => {
        const address = mapBtn.getAttribute('data-address');
        store.showToast(`Opening venue location: ${address}`);
      });
    }

    // Rebook button
    const rebookBtn = containerElement.querySelector('#u09-rebook-btn');
    if (rebookBtn) {
      rebookBtn.addEventListener('click', () => {
        const restId = rebookBtn.getAttribute('data-rest-id') || '1';
        const { RESTAURANTS_DATA } = window.YoyakuData || {};
        const rest = (RESTAURANTS_DATA || []).find(r => r.id === restId) || (RESTAURANTS_DATA && RESTAURANTS_DATA[0]);
        if (rest) {
          store.clearSelectedReservationDetail();
          store.openBookingModal(rest);
        }
      });
    }

    // QR Pass Modal handlers
    const viewPassBtn = containerElement.querySelector('#u09-view-pass-btn');
    const qrModal = containerElement.querySelector('#u09-qr-modal');
    const closeQrBtn = containerElement.querySelector('#u09-close-qr-modal-btn');
    const dismissQrBtn = containerElement.querySelector('#u09-dismiss-qr-modal-btn');

    if (viewPassBtn && qrModal) {
      viewPassBtn.addEventListener('click', () => {
        qrModal.classList.remove('hidden');
      });
    }
    if (closeQrBtn && qrModal) {
      closeQrBtn.addEventListener('click', () => {
        qrModal.classList.add('hidden');
      });
    }
    if (dismissQrBtn && qrModal) {
      dismissQrBtn.addEventListener('click', () => {
        qrModal.classList.add('hidden');
      });
    }

    // Change Modal handlers
    const changeBtn = containerElement.querySelector('#u09-change-btn');
    const changeModal = containerElement.querySelector('#u09-change-modal');
    const closeChangeBtn = containerElement.querySelector('#u09-close-change-modal-btn');
    const cancelChangeBtn = containerElement.querySelector('#u09-cancel-change-modal-btn');
    const changeForm = containerElement.querySelector('#u09-change-form');
    const guestInput = containerElement.querySelector('#u09-change-guests-input');
    const guestMinusBtn = containerElement.querySelector('#u09-guest-minus-btn');
    const guestPlusBtn = containerElement.querySelector('#u09-guest-plus-btn');
    const totalPreview = containerElement.querySelector('#u09-change-total-preview');

    function updateEstimatedTotal() {
      if (!guestInput || !totalPreview) return;
      const count = parseInt(guestInput.value, 10) || 1;
      const perGuest = 87500;
      const total = count * perGuest;
      totalPreview.innerText = formatMMK(total);
    }

    if (guestMinusBtn && guestInput) {
      guestMinusBtn.addEventListener('click', () => {
        let val = parseInt(guestInput.value, 10) || 1;
        if (val > 1) {
          guestInput.value = val - 1;
          updateEstimatedTotal();
        }
      });
    }

    if (guestPlusBtn && guestInput) {
      guestPlusBtn.addEventListener('click', () => {
        let val = parseInt(guestInput.value, 10) || 1;
        if (val < 20) {
          guestInput.value = val + 1;
          updateEstimatedTotal();
        }
      });
    }

    if (guestInput) {
      guestInput.addEventListener('input', updateEstimatedTotal);
    }

    if (changeBtn && changeModal) {
      changeBtn.addEventListener('click', () => {
        changeModal.classList.remove('hidden');
      });
    }
    if (closeChangeBtn && changeModal) {
      closeChangeBtn.addEventListener('click', () => {
        changeModal.classList.add('hidden');
      });
    }
    if (cancelChangeBtn && changeModal) {
      cancelChangeBtn.addEventListener('click', () => {
        changeModal.classList.add('hidden');
      });
    }

    if (changeForm && changeModal) {
      changeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const dateVal = containerElement.querySelector('#u09-change-date-input')?.value || '2026-08-26';
        const timeVal = containerElement.querySelector('#u09-change-time-select')?.value || '19:30';
        const guestsVal = parseInt(guestInput?.value || '4', 10);

        const st = store.getState();
        const resId = st.selectedReservationId;
        const resv = (st.reservations || []).find(r => r.id === resId);
        if (resv) {
          resv.date = dateVal;
          resv.time = timeVal;
          resv.guests = guestsVal;
          resv.totalAmountMMK = guestsVal * 87500;
        }

        changeModal.classList.add('hidden');
        store.showToast('Reservation date, time & guests successfully updated!');
        store.notify();
      });
    }

    // Cancel Modal handlers
    const cancelBtn = containerElement.querySelector('#u09-cancel-btn');
    const cancelModal = containerElement.querySelector('#u09-cancel-modal');
    const closeCancelBtn = containerElement.querySelector('#u09-close-cancel-modal-btn');
    const abortCancelBtn = containerElement.querySelector('#u09-abort-cancel-modal-btn');
    const confirmCancelFinalBtn = containerElement.querySelector('#u09-confirm-cancel-final-btn');

    if (cancelBtn && cancelModal) {
      cancelBtn.addEventListener('click', () => {
        cancelModal.classList.remove('hidden');
      });
    }
    if (closeCancelBtn && cancelModal) {
      closeCancelBtn.addEventListener('click', () => {
        cancelModal.classList.add('hidden');
      });
    }
    if (abortCancelBtn && cancelModal) {
      abortCancelBtn.addEventListener('click', () => {
        cancelModal.classList.add('hidden');
      });
    }

    if (confirmCancelFinalBtn && cancelModal) {
      confirmCancelFinalBtn.addEventListener('click', () => {
        const st = store.getState();
        const resId = st.selectedReservationId;
        const resv = (st.reservations || []).find(r => r.id === resId);
        if (resv) {
          resv.status = 'Cancelled';
          resv.cancelledAt = new Date().toISOString();
        }
        cancelModal.classList.add('hidden');
        store.showToast('Reservation has been cancelled.');
        store.notify();
      });
    }
  }

  window.YoyakuComponents.renderBookingDetailView = renderBookingDetailView;
  window.YoyakuComponents.attachBookingDetailViewEvents = attachBookingDetailViewEvents;
})();
