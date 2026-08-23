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
              <div class="flex justify-center my-8">
                ${window.YoyakuComponents.renderEmptyState({
                  icon: 'favorite_border',
                  title: 'No saved venues yet',
                  message: 'Click the heart icon on any restaurant card to save it to your wishlist.',
                  actionLabel: 'Explore Venues',
                  actionId: 'fav-empty-discover-btn'
                })}
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
