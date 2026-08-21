// Yoyaku PWA Service Worker
const CACHE_NAME = 'yoyaku-pwa-v1';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/fonts.css',
  '/css/styles.css',
  '/css/overrides.css',
  '/js/runtime.js',
  '/js/data/restaurants.js',
  '/js/state.js',
  '/js/pwa.js',
  '/js/components/CalendarPicker.js',
  '/js/components/RestaurantCard.js',
  '/js/components/TopNavBar.js',
  '/js/components/BottomNavBar.js',
  '/js/components/Footer.js',
  '/js/components/Toast.js',
  '/js/components/InfoModals.js',
  '/js/components/FavoritesView.js',
  '/js/components/CuratedView.js',
  '/js/screens/u01-home.js',
  '/js/screens/u02-search.js',
  '/js/screens/u03-shop-detail.js',
  '/js/screens/u04-calendar.js',
  '/js/screens/u05-booking-input.js',
  '/js/screens/u06-booking-confirm.js',
  '/js/screens/u07-booking-complete.js',
  '/js/screens/u08-mypage.js',
  '/js/screens/u09-booking-detail.js',
  '/js/screens/u10-login.js',
  '/js/screens/u17-notificationsettings.js',
  '/js/screens/u20-accountsetting.js',
  '/js/main.js',
  '/assets/icons/icon-192.svg',
  '/assets/icons/icon-512.svg',
  '/assets/icons/icon-maskable.svg',
  '/assets/images/seeds.jpg',
  '/assets/images/padonmar.jpg',
  '/assets/images/gekko.jpg',
  '/assets/images/alchimiste.jpg',
  '/assets/images/lopera.jpg',
  '/assets/images/rangoon.jpg',
  '/assets/images/gilded_fork.jpg',
  '/assets/images/avatar-placeholder.svg'
];

// Install Event: Pre-cache App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('[SW] Some core assets failed to pre-cache:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up stale caches and claim clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log('[SW] Clearing old cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Stale-While-Revalidate for local assets & Cache-first with network fallback
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // For HTML navigation requests: Network first, fall back to cached index.html
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          return caches.match('/index.html') || caches.match('/');
        })
    );
    return;
  }

  // For static assets (JS, CSS, Images, Fonts) on same origin
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Third party requests (e.g., Google Fonts, CDN stylesheets if any)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(request).then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      }).catch(() => null);
    })
  );
});
