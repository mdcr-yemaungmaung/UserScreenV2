/* ==========================================================================
   EzBookNow Screen U-12 — サービス紹介 (ルートLP) / Platform Landing Page
   Route: / (or #/)
   Comprehensive bilingual root landing page introducing EzBookNow:
     - Hero Section with value proposition & quick search / direct explore
     - How It Works (3 Steps: Select Table -> Instant Input -> Digital QR Pass)
     - Featured Direct Restaurant Landing Cards (linking to /s/{slug})
     - Diners & Restaurants Key Benefits
     - Owner / Merchant Registration CTA
   ========================================================================== */

(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};

  function renderServiceIntroView(state) {
    const isMm = state.currentLanguage === 'MM';
    const restaurants = (window.YoyakuData && window.YoyakuData.RESTAURANTS_DATA) || [];
    const featured = restaurants.slice(0, 4);

    return `
      <div class="w-full bg-[#FBF4E8] text-[#241A18] pb-16">
        <!-- Hero Section -->
        <section class="relative overflow-hidden bg-gradient-to-b from-[#FFF8F2] to-[#FBF4E8] border-b border-[#E8DDD0] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
          <div class="max-w-5xl mx-auto text-center relative z-10">
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9B1C25]/10 text-[#9B1C25] font-label text-xs font-bold mb-6 tracking-wide">
              <span class="material-symbols-outlined text-sm">stars</span>
              <span>${isMm ? 'EzBookNow မြန်မာနိုင်ငံ၏ စားပွဲကြိုတင်ရယူစနစ်' : 'EzBookNow — Modern Dining & Table Reservations'}</span>
            </div>

            <h1 class="font-headline text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#241A18] tracking-tight leading-tight max-w-3xl mx-auto mb-6">
              ${isMm
                ? 'သင်အကြိုက်ဆုံး ဆိုင်များ၏ စားပွဲကို <span class="text-[#9B1C25]">စက္ကန့်ပိုင်းအတွင်း</span> ကြိုတင်ရယူပါ'
                : 'Direct, Instant Table Reservations at <span class="text-[#9B1C25]">Premier Restaurants</span>'}
            </h1>

            <p class="font-body text-base sm:text-lg text-[#6D6561] max-w-2xl mx-auto mb-10 leading-relaxed">
              ${isMm
                ? 'ဖုန်းဆက်စောင့်ဆိုင်းစရာမလိုဘဲ အချိန်နှင့်တပြေးညီ ရရှိနိုင်သော စားပွဲများကို တိုက်ရိုက်ရွေးချယ်ပြီး SMS / QR Pass ဖြင့် အတည်ပြုချက် ရယူလိုက်ပါ။'
                : 'No phone calls or waiting. Select your party size and time slot with real-time seat availability, confirmed instantly via SMS & digital QR pass.'}
            </p>

            <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#/s/gilded-fork"
                class="w-full sm:w-auto px-8 py-4 rounded-full font-label text-sm font-bold text-white bg-[#9B1C25] hover:bg-[#7F161E] active:scale-95 shadow-lg shadow-[#9B1C25]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span class="material-symbols-outlined text-lg">calendar_month</span>
                <span>${isMm ? 'အထူးစားသောက်ဆိုင် ချက်ချင်းဘွတ်ကင်လုပ်မည်' : 'Experience Direct Booking'}</span>
              </a>
              <a
                href="#/login"
                class="w-full sm:w-auto px-6 py-4 rounded-full font-label text-sm font-bold text-[#241A18] bg-[#FFFDFC] border border-[#E8DDD0] hover:bg-[#F8EFE5] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span class="material-symbols-outlined text-lg">search_check</span>
                <span>${isMm ? 'ဘွတ်ကင်အမှတ်ဖြင့် စစ်ဆေးရန်' : 'Lookup Reservation'}</span>
              </a>
            </div>
          </div>
        </section>

        <!-- How It Works (3 Steps) -->
        <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div class="text-center max-w-2xl mx-auto mb-12">
            <span class="text-[11px] font-extrabold uppercase tracking-widest text-[#9B1C25] font-label">
              ${isMm ? 'လွယ်ကူမြန်ဆန်သော အဆင့် ၃ ဆင့်' : 'Fast & Seamless'}
            </span>
            <h2 class="font-headline text-2xl sm:text-3xl font-bold text-[#241A18] mt-2">
              ${isMm ? 'စားပွဲကြိုတင်ရယူပုံ အဆင့်ဆင့်' : 'How EzBookNow Works'}
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Step 1 -->
            <div class="bg-[#FFFDFC] border border-[#E8DDD0] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:-translate-y-1 transition-transform">
              <div>
                <div class="w-12 h-12 rounded-2xl bg-[#9B1C25]/10 text-[#9B1C25] flex items-center justify-center font-headline text-lg font-bold mb-5">
                  1
                </div>
                <h3 class="font-headline text-lg font-bold text-[#241A18] mb-2">
                  ${isMm ? 'ရက်စွဲနှင့် အချိန် ရွေးချယ်ပါ' : 'Select Slot & Party'}
                </h3>
                <p class="font-body text-xs sm:text-sm text-[#6D6561] leading-relaxed">
                  ${isMm
                    ? 'လူဦးရေ၊ နေ့ရက်နှင့် အချိန်ဇယားကို တိုက်ရိုက် ကြည့်ရှုပြီး လွတ်လပ်စွာ ရွေးချယ်နိုင်ပါသည်။'
                    : 'Open the store direct link (/s/{slug}). Choose date, guests, and instant real-time available time slots.'}
                </p>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="bg-[#FFFDFC] border border-[#E8DDD0] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:-translate-y-1 transition-transform">
              <div>
                <div class="w-12 h-12 rounded-2xl bg-[#C69A2B]/10 text-[#C69A2B] flex items-center justify-center font-headline text-lg font-bold mb-5">
                  2
                </div>
                <h3 class="font-headline text-lg font-bold text-[#241A18] mb-2">
                  ${isMm ? 'အချက်အလက် ဖြည့်သွင်း အတည်ပြုပါ' : 'Input Details & Verify'}
                </h3>
                <p class="font-body text-xs sm:text-sm text-[#6D6561] leading-relaxed">
                  ${isMm
                    ? 'ဧည့်သည် သို့မဟုတ် အသင်းဝင်အဖြစ် လိုအပ်သော အချက်အလက်များ ဖြည့်သွင်းပြီး SMS OTP ဖြင့် လုံခြုံစွာ အတည်ပြုပါ။'
                    : 'Book as a logged-in member or guest. Seamless 6-digit SMS OTP verification secures your table.'}
                </p>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="bg-[#FFFDFC] border border-[#E8DDD0] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:-translate-y-1 transition-transform">
              <div>
                <div class="w-12 h-12 rounded-2xl bg-[#104b2b]/10 text-[#104b2b] flex items-center justify-center font-headline text-lg font-bold mb-5">
                  3
                </div>
                <h3 class="font-headline text-lg font-bold text-[#241A18] mb-2">
                  ${isMm ? 'ချက်ချင်း QR Pass ရယူပါ' : 'Instant Digital QR Pass'}
                </h3>
                <p class="font-body text-xs sm:text-sm text-[#6D6561] leading-relaxed">
                  ${isMm
                    ? 'ဘွတ်ကင် အောင်မြင်ပြီးသည်နှင့် ဒစ်ဂျစ်တယ် QR Pass ကို ရရှိမည်ဖြစ်ပြီး ဆိုင်တွင် ပြသကာ အလွယ်တကူ ဝင်ရောက်နိုင်ပါသည်။'
                    : 'Receive your instant confirmation screen and contactless QR pass. Present at check-in or manage via My Page.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Featured Restaurants Showcase with Direct Links -->
        <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span class="text-[11px] font-extrabold uppercase tracking-widest text-[#9B1C25] font-label">
                ${isMm ? 'တိုက်ရိုက်လင့်ခ်များ' : 'Direct Booking Portals'}
              </span>
              <h2 class="font-headline text-2xl sm:text-3xl font-bold text-[#241A18] mt-1">
                ${isMm ? 'နာမည်ကြီး စားသောက်ဆိုင်များ' : 'Featured Restaurants'}
              </h2>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${featured.map(r => {
              const slug = r.id === 'rest-1' ? 'gilded-fork' : r.id;
              return `
                <div class="bg-[#FFFDFC] border border-[#E8DDD0] rounded-2xl overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between">
                  <div>
                    <div class="relative h-40 bg-stone-200 overflow-hidden">
                      <img
                        src="${r.heroImage || r.images[0]}"
                        alt="${r.name}"
                        class="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div class="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white font-label text-[11px] font-bold flex items-center gap-1">
                        <span class="material-symbols-outlined text-xs text-[#C69A2B] fill-1">star</span>
                        <span>${r.rating}</span>
                      </div>
                    </div>

                    <div class="p-4">
                      <span class="text-[10px] font-extrabold uppercase tracking-wider text-[#9B1C25] font-label">${r.cuisine || 'Dining'}</span>
                      <h3 class="font-headline text-base font-bold text-[#241A18] truncate mt-0.5">${isMm ? (r.nameMM || r.name) : r.name}</h3>
                      <p class="font-body text-xs text-[#6D6561] line-clamp-2 mt-1">${isMm ? (r.overviewStoryMM || r.description) : r.description}</p>
                    </div>
                  </div>

                  <div class="p-4 pt-0 space-y-2">
                    <a
                      href="#/s/${slug}"
                      class="w-full py-2.5 rounded-full font-label text-xs font-bold text-white bg-[#9B1C25] hover:bg-[#7F161E] active:scale-95 transition-all text-center flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <span class="material-symbols-outlined text-sm">calendar_add_on</span>
                      <span>${isMm ? 'စားပွဲရွေးမည်' : 'Book Table'}</span>
                    </a>
                    <a
                      href="#/s/${slug}/info"
                      class="w-full py-2 rounded-full font-label text-xs font-semibold text-[#6D6561] bg-[#F8EFE5] hover:bg-[#E8DDD0] text-center block transition-colors cursor-pointer"
                    >
                      ${isMm ? 'ဆိုင်အချက်အလက်' : 'Store Info'}
                    </a>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>

        <!-- Merchant / Partner Callout -->
        <section class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div class="rounded-3xl bg-[#241A18] text-[#FFF4F1] p-8 sm:p-12 relative overflow-hidden shadow-xl">
            <div class="relative z-10 max-w-xl">
              <span class="text-[11px] font-extrabold uppercase tracking-widest text-[#E2BF66] font-label">
                ${isMm ? 'ဆိုင်ရှင်များအတွက်' : 'For Restaurant Partners'}
              </span>
              <h2 class="font-headline text-2xl sm:text-3xl font-bold mt-2 mb-4 text-[#FFF4F1]">
                ${isMm ? 'သင်၏ ဆိုင်တွင် EzBookNow ကြိုတင်ဘွတ်ကင်စနစ်ကို အသုံးပြုလိုပါသလား?' : 'Grow your table reservations with EzBookNow'}
              </h2>
              <p class="font-body text-xs sm:text-sm text-[#E8DDD0] mb-6 leading-relaxed">
                ${isMm
                  ? 'လိုင်းခေါ်ဆိုမှုနှင့် အချိန်ကုန်သက်သာစေမည့် တိုက်ရိုက် SNS လင့်ခ်များနှင့် စားပွဲစီမံခန့်ခွဲမှုစနစ်ကို အခုပဲ စတင်လိုက်ပါ။'
                  : 'Eliminate booking phone bottlenecks with branded SNS booking links, automated SMS confirmations, and QR guest management.'}
              </p>
              <a
                href="mailto:partner@ezbooknow.com"
                class="inline-flex items-center gap-2 px-6 py-3 rounded-full font-label text-xs font-bold text-[#241A18] bg-[#E2BF66] hover:bg-[#C69A2B] transition-colors cursor-pointer"
              >
                <span class="material-symbols-outlined text-base">storefront</span>
                <span>${isMm ? 'မိတ်ဖက်အဖြစ် ဆက်သွယ်ရန်' : 'Join as Restaurant Partner'}</span>
              </a>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  function attachServiceIntroEvents(root) {
    // Navigation links are standard hash hrefs handled by window hashchange listener
  }

  window.YoyakuComponents.renderServiceIntroView = renderServiceIntroView;
  window.YoyakuComponents.attachServiceIntroEvents = attachServiceIntroEvents;
})();
