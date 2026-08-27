(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;
  const { COLLECTIONS_DATA, RESTAURANTS_DATA } = window.YoyakuData;




  function renderCuratedView(state) {
    const isMm = state.currentLanguage === 'MM';

    return `
      <div class="space-y-8 pb-16 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        
        <!-- HEADER -->
        <div class="border-b border-[#EADFD1] pb-6">
          <div class="text-[#840f16] font-label text-xs font-bold uppercase tracking-wider mb-1">
            Editorial Guides
          </div>
          <h1 class="font-headline text-3xl font-extrabold text-[#231916]">
            ${isMm ? 'အထူး ရွေးချယ်ထားသော စုစည်းမှုများ' : 'Curated Dining Collections'}
          </h1>
          <p class="font-body text-xs sm:text-sm text-[#58413f] mt-1">
            ${isMm ? 'အထူး အခမ်းအနားများနှင့် ညစာစားပွဲများအတွက် ကျွမ်းကျင်သူများ ရွေးချယ်ထားသော လမ်းညွှန်များ' : 'Expertly crafted dining itineraries for business dinners, romantic dates, and family reunions.'}
          </p>
        </div>

        <!-- COLLECTIONS GRID -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          ${COLLECTIONS_DATA.map(col => `
            <div
              data-curated-target="${col.targetRestaurantId}"
              class="group relative h-96 sm:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-end p-6 sm:p-8 text-left text-white border border-white/15"
            >
              <img
                src="${col.image}"
                alt="${col.title}"
                referrerpolicy="no-referrer"
                loading="lazy"
                onerror="this.onerror=null; this.src='assets/images/gilded_fork.jpg';"
                class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

              <div class="relative z-10 space-y-1">
                <div class="font-label text-xs font-extrabold uppercase tracking-widest text-[#D08E1C]">
                  ${isMm ? col.categoryTagMM : col.categoryTag}
                </div>
                <h3 class="font-headline text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  ${isMm ? col.titleMM : col.title}
                </h3>
                <p class="font-body text-xs sm:text-sm text-white/80 line-clamp-2">
                  ${isMm ? col.subtitleMM : col.subtitle}
                </p>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  function attachCuratedViewEvents(containerElement = document) {
    containerElement.querySelectorAll('[data-curated-target]').forEach(card => {
      card.addEventListener('click', (e) => {
        const targetId = e.currentTarget.getAttribute('data-curated-target');
        const target = RESTAURANTS_DATA.find(r => r.id === targetId);
        if (target) store.setSelectedRestaurant(target);
      });
    });
  }


  window.YoyakuComponents.renderCuratedView = renderCuratedView;
  window.YoyakuComponents.attachCuratedViewEvents = attachCuratedViewEvents;
})();
