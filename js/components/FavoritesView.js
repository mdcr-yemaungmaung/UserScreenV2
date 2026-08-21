(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;
  const { RESTAURANTS_DATA } = window.YoyakuData;
  const { renderRestaurantCard, attachRestaurantCardEvents } = window.YoyakuComponents;





  function renderFavoritesView(state) {
    const isMm = state.currentLanguage === 'MM';
    const favoriteIds = state.favorites;
    const favRestaurants = RESTAURANTS_DATA.filter(r => favoriteIds.includes(r.id));

    return `
      <div class="space-y-8 pb-16 text-left max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        
        <!-- HEADER -->
        <div class="border-b border-[#EADFD1] pb-6">
          <h1 class="font-headline text-3xl font-extrabold text-[#231916]">
            ${isMm ? 'သိမ်းဆည်းထားသော စားသောက်ဆိုင်များ' : 'Saved Favorites'}
          </h1>
          <p class="font-body text-xs sm:text-sm text-[#58413f] mt-1">
            ${isMm ? 'သင်သိမ်းဆည်းထားသော စားသောက်ဆိုင်များ စာရင်း' : 'Your personal wishlist of fine dining venues for future celebrations.'}
          </p>
        </div>

        <!-- GRID OR EMPTY -->
        ${
          favRestaurants.length === 0
            ? `
              <div class="bg-[#FBF3E2] rounded-3xl p-12 border border-[#EADFD1] text-center space-y-4 my-8">
                <div class="w-16 h-16 bg-[#840f16]/10 text-[#840f16] rounded-full flex items-center justify-center mx-auto">
                  <span class="material-symbols-outlined text-3xl">favorite_border</span>
                </div>
                <h3 class="font-headline text-2xl font-bold text-[#231916]">No saved venues yet</h3>
                <p class="font-body text-xs sm:text-sm text-[#58413f] max-w-md mx-auto">
                  Click the heart icon on any restaurant card to save it to your wishlist.
                </p>
                <button
                  id="fav-empty-discover-btn"
                  class="btn-primary px-8 py-3.5 rounded-full font-label text-xs font-semibold shadow-md inline-flex items-center gap-2 cursor-pointer mt-2"
                >
                  <span>Explore Venues</span>
                  <span class="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            `
            : `
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${favRestaurants.map(rest => renderRestaurantCard(rest, state)).join('')}
              </div>
            `
        }

      </div>
    `;
  }

  function attachFavoritesViewEvents(containerElement = document) {
    attachRestaurantCardEvents(containerElement);

    const emptyBtn = containerElement.querySelector('#fav-empty-discover-btn');
    if (emptyBtn) {
      emptyBtn.addEventListener('click', () => {
        store.setActiveTab('discover');
      });
    }
  }


  window.YoyakuComponents.renderFavoritesView = renderFavoritesView;
  window.YoyakuComponents.attachFavoritesViewEvents = attachFavoritesViewEvents;
})();
