(() => {
  class PwaManager {
    constructor() {
      this.deferredPrompt = null;
      this.isInstalled = false;
      this.isOnline = navigator.onLine !== false;
      this.isStandalone = this.checkIsStandalone();
      this.showInstallModal = false;
      this.listeners = [];

      this.init();
    }

    init() {
      // 1. Register Service Worker if supported
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker
            .register('/sw.js')
            .then((reg) => {
              console.log('[PWA] Service Worker registered with scope:', reg.scope);
            })
            .catch((err) => {
              console.warn('[PWA] Service Worker registration failed:', err);
            });
        });
      }

      // 2. Listen for BeforeInstallPrompt
      window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        this.deferredPrompt = e;
        this.notify();
      });

      // 3. Listen for app installed
      window.addEventListener('appinstalled', () => {
        this.deferredPrompt = null;
        this.isInstalled = true;
        this.notify();
        if (window.store && window.store.showToast) {
          const isMm = window.store.getState()?.currentLanguage === 'MM';
          window.store.showToast(
            isMm
              ? 'Yoyaku အက်ပ်ကို သင့်ဖုန်းတွင် အောင်မြင်စွာ ထည့်သွင်းပြီးပါပြီ'
              : 'Yoyaku app successfully installed to your device!'
          );
        }
      });

      // 4. Online / Offline listeners
      window.addEventListener('online', () => {
        this.isOnline = true;
        this.notify();
        if (window.store && window.store.showToast) {
          const isMm = window.store.getState()?.currentLanguage === 'MM';
          window.store.showToast(
            isMm ? 'အင်တာနက် လိုင်း ပြန်လည် ချိတ်ဆက်မိပါပြီ' : 'Internet connection restored. Back online!'
          );
        }
      });

      window.addEventListener('offline', () => {
        this.isOnline = false;
        this.notify();
        if (window.store && window.store.showToast) {
          const isMm = window.store.getState()?.currentLanguage === 'MM';
          window.store.showToast(
            isMm
              ? 'အင်တာနက် မရှိသော်လည်း သင်၏ QR Pass နှင့် ဘွတ်ကင်များကို ဆက်လက်ကြည့်ရှုနိုင်ပါသည်'
              : 'You are offline. Your saved reservations & QR passes remain available.'
          );
        }
      });
    }

    checkIsStandalone() {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true ||
        document.referrer.includes('android-app://')
      );
    }

    subscribe(callback) {
      this.listeners.push(callback);
      return () => {
        this.listeners = this.listeners.filter((cb) => cb !== callback);
      };
    }

    notify() {
      this.listeners.forEach((cb) => {
        try {
          cb(this);
        } catch (e) {
          console.error(e);
        }
      });
      // Also request store notify if needed
      if (window.store && window.store.notify) {
        window.store.notify();
      }
    }

    canPromptInstall() {
      return !!this.deferredPrompt && !this.isStandalone;
    }

    isIos() {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    }

    async promptInstall() {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          console.log('[PWA] User accepted the install prompt');
        }
        this.deferredPrompt = null;
        this.notify();
      } else {
        // Show guidance modal for iOS or manual install
        this.openInstallModal();
      }
    }

    openInstallModal() {
      this.showInstallModal = true;
      this.notify();
    }

    closeInstallModal() {
      this.showInstallModal = false;
      this.notify();
    }
  }

  window.PwaManager = new PwaManager();
})();
