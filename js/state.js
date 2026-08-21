(() => {
  const INITIAL_FAVORITES = ['rest-1', 'rest-3'];

  const INITIAL_RESERVATIONS = [
    {
      id: 'res-2026-001',
      reservationNo: 'RSV-665304',
      restaurantId: 'rest-1',
      restaurantName: 'The Gilded Fork',
      restaurantNameMM: 'ဂီးလ်ဒက် ဖော့ခ် သီးသန့် အဆင့်မြင့် စားသောက်ဆိုင်',
      restaurantImage: 'assets/images/gilded_fork.jpg',
      restaurantPhone: '+95 9 798 123 456',
      location: 'Yangon Cultural District',
      address: 'No. 105, Manawhari Road, Cultural District, Dagon, Yangon',
      date: 'Aug 14, 2026',
      time: '18:30',
      guests: 2,
      seatingPreference: 'Lake View Window',
      seatingTags: ['Lake View', 'Window Table', 'Private Corner', 'Air Conditioned'],
      courseName: 'Luxe Waterfront 5-Course Tasting Experience',
      courseNameMM: 'သီးသန့် ၅ မျိုးဆက် ရေကန်စပ် အထူး မြည်းစမ်းဟင်းလျာတွဲ',
      menuItems: [
        { name: 'Truffle Scented Shan Avocado Tartare', nameMM: 'ထရက်ဖယ်ဆီမွှေး ရှမ်းထောပတ်သီး အသုတ်', priceMMK: 35000, priceUSD: 10, qty: 2 },
        { name: 'Pan-Seared Andaman Sea Bass with Lemongrass Beurre Blanc', nameMM: 'ကရဝေးဆီဆမ်း ကင်္ကလာပင်လယ် ကကတစ်ငါးကင်', priceMMK: 55000, priceUSD: 16, qty: 2 },
        { name: 'Charcoal Grilled Grass-Fed Ribeye (Mandalay Dry-Aged)', nameMM: 'မန္တလေးအမဲသား ကင်ချက် အထူးဟင်းလျာ', priceMMK: 65000, priceUSD: 19, qty: 2 },
        { name: 'Artisanal Bagan Palm Jaggery Soufflé', nameMM: 'ပုဂံထန်းလျက် အချိုပွဲ', priceMMK: 25000, priceUSD: 7, qty: 2 }
      ],
      specialRequests: 'Celebrating 5th wedding anniversary. Quiet romantic window table overlooking the lake.',
      guestName: 'Alex Aung',
      guestPhone: '+95 9 791 234 567',
      guestEmail: 'alex@example.com',
      paymentMethod: 'KBZPay QR',
      paymentStatus: 'Pre-paid Deposit Verified',
      status: 'Confirmed', // 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
      cancelHours: 24,
      cancellationPolicy: 'Free cancellation up to 24 hours prior to reservation. 50% fee within 24h, 100% on same day.',
      cancellationPolicyMM: 'လာရောက်မည့်အချိန်မတိုင်မီ ၂၄ နာရီအလိုအထိ အခမဲ့ ပယ်ဖျက်နိုင်ပါသည်။ ၂၄ နာရီအတွင်း ပယ်ဖျက်ပါက ၅၀%၊ ထိုနေ့တွင် ပယ်ဖျက်ပါက ၁၀၀% ပယ်ဖျက်ခ ကျသင့်ပါမည်။',
      createdAt: '2026-08-10T10:00:00Z',
      totalAmount: 180000,
      totalAmountMMK: 180000,
      totalAmountUSD: 54
    },
    {
      id: 'res-2026-002',
      reservationNo: 'RES-2026-002',
      restaurantId: 'rest-1',
      restaurantName: 'Golden Mandalay',
      restaurantNameMM: 'ဂီးလ်ဒက် ဖော့ခ် သီးသန့် အဆင့်မြင့် စားသောက်ဆိုင်',
      restaurantImage: 'assets/images/padonmar.jpg',
      restaurantPhone: '+95 9 450 098 765',
      location: 'Bahan Township, Yangon',
      address: 'No. 105, Manawhari Road, Cultural District, Dagon, Yangon',
      date: 'Aug 22, 2026',
      time: '12:00',
      guests: 2,
      seatingPreference: 'Private Teakwood Alcove',
      seatingTags: ['Private Room', 'Traditional Ambience', 'Air Conditioned'],
      courseName: 'Royal Burmese Heritage Luncheon',
      courseNameMM: 'နန်းတွင်း မြန်မာ့ရိုးရာ နေ့လယ်စာ ဟင်းလျာတွဲ',
      menuItems: [
        { name: 'Royal Tea Leaf Salad (Lahpet Thoke)', nameMM: 'နန်းတွင်း အထူး အော်ဂဲနစ် လက်ဖက်သုတ်', priceMMK: 28000, priceUSD: 8, qty: 2 },
        { name: 'Golden Curry Soft Shell Crab', nameMM: 'ပင်လယ်စာ ပော့ခွံနူး ကဏန်း အနှစ်ချက်', priceMMK: 65000, priceUSD: 19, qty: 2 },
        { name: 'Heritage Mohinga Degustation', nameMM: 'နန်းတွင်း အထူး မုန့်ဟင်းခါး', priceMMK: 38000, priceUSD: 11, qty: 2 }
      ],
      specialRequests: 'Quiet corner table for a business discussion. Low spice level.',
      guestName: 'Alex Aung',
      guestPhone: '+95 9 791 234 567',
      guestEmail: 'alex@example.com',
      paymentMethod: 'WavePay',
      paymentStatus: 'Awaiting Venue Confirmation',
      status: 'Pending',
      cancelHours: 24,
      cancellationPolicy: 'Free cancellation up to 24 hours before dining.',
      cancellationPolicyMM: 'လာရောက်မည့်အချိန်မတိုင်မီ ၂၄ နာရီအလိုအထိ အခမဲ့ ပယ်ဖျက်နိုင်ပါသည်။',
      createdAt: '2026-08-14T09:30:00Z',
      totalAmount: 180000,
      totalAmountMMK: 180000,
      totalAmountUSD: 54
    },
    {
      id: 'res-2026-003',
      reservationNo: 'RES-2026-003',
      restaurantId: 'rest-5',
      restaurantName: 'Sakura Garden',
      restaurantNameMM: 'ဆာကူရာ ဂျပန်ရိုးရာ အိုမိုကာဆေး စားသောက်ဆိုင်',
      restaurantImage: 'assets/images/gekko.jpg',
      restaurantPhone: '+95 9 780 432 100',
      location: 'Yangon Downtown',
      address: 'Merchant Street, Kyauktada Township, Downtown Yangon',
      date: 'Jul 10, 2026',
      time: '19:30',
      guests: 6,
      seatingPreference: 'Private Tatami Room',
      seatingTags: ['Tatami Room', 'VIP Chef Counter', 'Non-Smoking'],
      courseName: 'Premium Chef Omakase Degustation (6 Pax)',
      courseNameMM: 'ပရီမီယံ ဂျပန်စားဖိုမှူး အထူး အိုမိုကာဆေး ၆ ယောက်စာ',
      menuItems: [
        { name: 'Sashimi Moriawase & Hokkaido Scallop', nameMM: 'ဆာရှိမိ ငါးစိမ်းလတ်လတ်ဆတ်ဆတ်နှင့် ကမာ', priceMMK: 120000, priceUSD: 36, qty: 6 },
        { name: 'A5 Miyazaki Wagyu Sukiyaki Pot', nameMM: 'A5 ဝါဂျူး အမဲသား ဆူကီယာကီ အိုးကြီး', priceMMK: 180000, priceUSD: 54, qty: 1 },
        { name: 'Matcha Fondant with Gold Leaf', nameMM: 'ရွှေဆိုင်းချ မတ်ချာ ရေခဲမုန့် အချိုပွဲ', priceMMK: 35000, priceUSD: 10, qty: 6 }
      ],
      specialRequests: 'Chef Omakase Set for 6 guests. Welcome champagne glasses.',
      guestName: 'Alex Aung',
      guestPhone: '+95 9 791 234 567',
      guestEmail: 'alex@example.com',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Completed & Settled',
      status: 'Completed',
      cancelHours: 48,
      cancellationPolicy: 'Non-refundable if cancelled within 48 hours.',
      cancellationPolicyMM: '၄၈ နာရီအတွင်း ပယ်ဖျက်ပါက ပယ်ဖျက်ခ အပြည့် ကျသင့်ပါမည်။',
      createdAt: '2026-07-02T14:15:00Z',
      totalAmount: 480000,
      totalAmountMMK: 480000,
      totalAmountUSD: 145
    },
    {
      id: 'res-2026-004',
      reservationNo: 'RES-2026-004',
      restaurantId: 'rest-6',
      restaurantName: 'Lakeview Terrace',
      restaurantNameMM: 'လိပ်ဗျူး အပန်းဖြေ ပြင်ပ စားသောက်ဆိုင်',
      restaurantImage: 'assets/images/lopera.jpg',
      restaurantPhone: '+95 9 512 345 678',
      location: 'Mayangone Township, Yangon',
      address: 'Kabar Aye Pagoda Road, Mayangone, Yangon',
      date: 'Jul 5, 2026',
      time: '18:00',
      guests: 2,
      seatingPreference: 'Terrace Garden Sunset View',
      seatingTags: ['Terrace Garden', 'Sunset View', 'Outdoor Seating'],
      courseName: 'Sunset Italian Bistro Experience',
      courseNameMM: 'နေဝင်ဆည်းဆာ အီတလီ အထူး ညစာတွဲ',
      menuItems: [
        { name: 'Burrata Caprese with Organic Heirlooms', nameMM: 'ဘူရာတာ ဒိန်ခဲနှင့် ခရမ်းချဉ်သီး အသုတ်', priceMMK: 40000, priceUSD: 12, qty: 2 },
        { name: 'Handmade Black Truffle Tagliolini', nameMM: 'လက်လုပ် ထရက်ဖယ် ခေါက်ဆွဲဟင်းလျာ', priceMMK: 58000, priceUSD: 17, qty: 2 },
        { name: 'Classic Tiramisu al Mascarpone', nameMM: 'ရိုးရာ တီရာမီဆု အချိုပွဲ', priceMMK: 22000, priceUSD: 6, qty: 2 }
      ],
      specialRequests: 'Anniversary celebration. Outdoor terrace table.',
      guestName: 'Alex Aung',
      guestPhone: '+95 9 791 234 567',
      guestEmail: 'alex@example.com',
      paymentMethod: 'Cash on Arrival',
      paymentStatus: 'Cancelled by User',
      status: 'Cancelled',
      cancelHours: 24,
      cancellationPolicy: 'Free cancellation up to 24 hours before dining.',
      cancellationPolicyMM: 'လာရောက်မည့်အချိန်မတိုင်မီ ၂၄ နာရီအလိုအထိ အခမဲ့ ပယ်ဖျက်နိုင်ပါသည်။',
      createdAt: '2026-06-28T11:00:00Z',
      totalAmount: 220000,
      totalAmountMMK: 220000,
      totalAmountUSD: 66
    },
    {
      id: 'res-guest-2026-849',
      reservationNo: 'R20260815-K7M2QX',
      restaurantId: 'rest-2',
      restaurantName: 'The Glass Pavilion',
      restaurantNameMM: 'သီးသန့် ရေကန်စပ် အဆင့်မြင့် စားသောက်ဆိုင်',
      restaurantImage: 'assets/images/seeds.jpg',
      restaurantPhone: '+95 9 798 123 456',
      location: 'Inya Lake Waterfront, Yangon',
      address: 'No. 63/A, U Tun Nyein Street, Ward 10, Mayangone, Yangon',
      date: 'Aug 25, 2026',
      time: '18:30',
      guests: 2,
      seatingPreference: 'Lake View Window',
      seatingTags: ['Lake View', 'Window Table', 'Air Conditioned'],
      courseName: 'Romantic Lakefront Tasting Menu',
      courseNameMM: 'ရိုမန်းတစ် ရေကန်စပ် အထူး ညစာတွဲ',
      menuItems: [
        { name: 'Truffle Scented Shan Avocado Tartare', nameMM: 'ထရက်ဖယ်ဆီမွှေး ရှမ်းထောပတ်သီး အသုတ်', priceMMK: 35000, priceUSD: 10, qty: 2 },
        { name: 'Pan-Seared Andaman Sea Bass with Lemongrass Beurre Blanc', nameMM: 'ကရဝေးဆီဆမ်း ကင်္ကလာပင်လယ် ကကတစ်ငါးကင်', priceMMK: 55000, priceUSD: 16, qty: 2 }
      ],
      specialRequests: 'Window seat preferred. Non-smoking zone.',
      guestName: 'Daw Thida Win',
      guestPhone: '09791234567',
      guestEmail: 'guest.thida@example.com',
      paymentMethod: 'KBZPay QR',
      paymentStatus: 'Pre-paid Deposit Verified',
      status: 'Confirmed',
      cancelHours: 24,
      cancellationPolicy: 'Free cancellation up to 24 hours before dining. 50% within 24h.',
      cancellationPolicyMM: 'လာရောက်မည့်အချိန်မတိုင်မီ ၂၄ နာရီအလိုအထိ အခမဲ့ ပယ်ဖျက်နိုင်ပါသည်။',
      createdAt: '2026-08-15T12:00:00Z',
      totalAmount: 180000,
      totalAmountMMK: 180000,
      totalAmountUSD: 54
    }
  ];

  function loadLanguage() {
    try {
      const saved = localStorage.getItem('yoyaku_lang');
      if (saved) return saved;
    } catch (e) {
      console.error(e);
    }
    return 'EN';
  }

  function loadFavorites() {
    try {
      const saved = localStorage.getItem('yoyaku_favorites');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_FAVORITES;
  }

  function loadReservations() {
    try {
      const saved = localStorage.getItem('yoyaku_reservations');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_RESERVATIONS;
  }

  class StateStore {
    constructor() {
      this.state = {
        activeTab: 'discover', // 'discover' | 'resultlist' | 'reservations' | 'favorites' | 'curated' | 'mypage'
        searchKeyword: '',
        selectedRestaurant: null, // Restaurant object or null
        currentLanguage: loadLanguage(), // 'EN' | 'MM'
        isAuthenticated: true,
        activeInfoModal: 'none', // 'none' | 'auth' | 'owner_application' | 'check_guest_booking' | 'terms' | 'privacy' | 'notifications'
        guestBookingCheckResult: null,
        favorites: loadFavorites(),
        reservations: loadReservations(),
        toastMessage: null,
        
        // Booking Modal State
        bookingModalState: {
          isOpen: false,
          restaurant: null,
          step: 1,
          bookingData: {
            date: 'Aug 14, 2026',
            time: '18:30',
            guests: 2,
            seatingPreference: 'Standard'
          },
          guestData: {
            guestName: 'Evelyn St. Clair',
            guestPhone: '+95 9 791 234 567',
            guestEmail: 'evelyn.clair@example.com',
            specialRequests: 'Celebrating 5th wedding anniversary. Window table preferred.',
            paymentMethod: 'qr'
          },
          createdBooking: null
        },

        // My Page Modal State
        myPageModal: 'none', // 'none' | 'waitlist' | 'coupons' | 'notifications' | 'viber' | 'announcements' | 'points' | 'account' | 'review'
        myPageSubTab: 'upcoming', // 'upcoming' | 'past'
        myPageActiveMenu: 'reservations', // 'reservations' | 'favorites' | 'waitlist' | 'coupons' | 'points' | 'notifications' | 'viber' | 'announcements' | 'account'
        myPageData: {
          waitlists: [
            { id: 'w1', restaurantName: 'Seeds Restaurant & Lounge', partySize: 2, requestedDate: 'Aug 28, 2026', status: 'In Queue (#2)' }
          ],
          claimedCoupons: [
            { id: 'c1', code: 'YOYAKUKBZ50K', title: '50,000 MMK KBZPay Discount', validTill: 'Sep 30, 2026' },
            { id: 'c2', code: 'LUXEWINE15', title: '15% Off Sommelier Pairing', validTill: 'Oct 15, 2026' }
          ],
          readNotifIds: [],
          notifications: [
            { id: 'n1', title: 'Table Confirmed at The Glass Pavilion', time: '10 mins ago', isUnread: true },
            { id: 'n2', title: 'Viber Auto-Reminder Enabled', time: '1 hour ago', isUnread: true },
            { id: 'n3', title: 'Welcome 50,000 MMK Coupon Added', time: 'Yesterday', isUnread: false }
          ],
          viberConnected: false,
          notifInApp: true,
          notifWebPush: true,
          notifEmail: true,
          notifSms: false, // Upcoming in Paid Phase
          notifViber: false, // Upcoming in Paid Phase
          webPushSubscribed: false,
          webPushPermission: 'default', // 'granted' | 'default' | 'denied'
          viberConsent: false,
          viberConsentDate: null,
          userName: 'alex',
          userNameMM: 'အဲလက်စ်',
          userEmail: 'alex@example.com',
          emailVerified: true,
          pendingNewEmail: null,
          userPhone: '+95 9 791 234 567',
          phoneVerified: false, // In Package 1, phone is stored as Unverified
          authProvider: 'email', // 'email' | 'google' | 'facebook'
          accountStatus: 'active', // 'active' | 'withdrawn'
          withdrawnAt: null,
          withdrawalReason: ''
        },

        // Search & Results Filter State
        resultsState: {
          keyword: '',
          area: 'All Areas',
          cuisine: 'All Cuisines',
          partySize: 'All Sizes',
          selectedDate: 'Aug 14, 2026',
          showMoreFilters: false,
          minPrice: '',
          maxPrice: '',
          selectedFeatures: [],
          viewMode: 'list', // 'list' | 'map'
          sortBy: 'popularity', // 'popularity' | 'rating' | 'reviews'
          currentPage: 1,
          activeMapPin: null
        },

        // Restaurant Detail View State
        detailState: {
          activeTab: 'overview', // 'overview' | 'menu' | 'reviews'
          date: 'Aug 14, 2026',
          time: '18:30',
          guests: 2
        },

        // QR Pass Inspection Modal
        inspectedPassBooking: null,

        // System registered users (for duplicate email validation check)
        registeredUsers: [
          { email: 'alex@example.com', name: 'Alex Aung', phone: '09791234567', provider: 'email' },
          { email: 'evelyn.clair@example.com', name: 'Evelyn Clair', phone: '09450012345', provider: 'email' },
          { email: 'alex.fb@example.com', name: 'Alex Aung (FB)', phone: '09791234567', provider: 'facebook' },
          { email: 'alex.google@gmail.com', name: 'Alex Aung (Google)', phone: '09791234567', provider: 'google' }
        ],

        // Member Registration State (U-11)
        registerState: {
          showEmailForm: false,
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: '',
          agreeTerms: false,
          showPassword: false,
          showConfirmPassword: false,
          isLoading: false,
          loadingAction: null, // 'facebook' | 'google' | 'email'
          errors: {},
          showSsoTermsModal: false,
          pendingSsoProvider: null, // 'facebook' | 'google'
          showMail01Modal: false,
          registeredUserEmail: null,
          registeredUserName: null
        },

        // Login & Reservation Lookup State (U-10)
        loginState: {
          activeTab: 'login', // 'login' | 'lookup'
          isEmailFormExpanded: false,
          email: '',
          password: '',
          showPassword: false,
          rememberMe: true,
          lookupResNo: '',
          lookupPhone: '',
          lookupResult: null,
          isLoading: false,
          loadingAction: null, // 'google' | 'facebook' | 'email' | 'lookup'
          errorType: 'none', // 'none' | 'credentials' | 'locked' | 'suspended' | 'ratelimit' | 'lookup_notfound'
          errorMessage: null,
          showForgotPassword: false,
          resetEmailSent: false,
          resetEmail: '',
          showSignUp: false,
          isGuestFlow: false
        },

        // =====================================================================
        // U-09: Reservation Details, Change & Cancellation State
        // =====================================================================
        selectedReservationId: null, // string (e.g. 'res-2026-001') or null for list
        isGuestReservationView: false, // true if viewed by guest without login

        // U-09: Date/Time & Guest Count Change Modal
        u09ChangeModal: {
          isOpen: false,
          reservationId: null,
          date: 'Aug 20, 2026',
          time: '19:00',
          guests: 4,
          originalGuests: 4,
          originalAmount: 350000,
          newAmount: 350000,
          cancelHours: 24,
          isWithinCancelHours: false,
          errorMessage: null,
          isSubmitting: false
        },

        // U-09: Cancellation Modal with Fee Calculator
        u09CancelModal: {
          isOpen: false,
          reservationId: null,
          reason: 'schedule_change',
          otherReasonText: '',
          feePercentage: 0,
          feeAmount: 0,
          isSubmitting: false
        },

        // U-09: Review Modal (for Completed Reservations)
        u09ReviewModal: {
          isOpen: false,
          reservationId: null,
          restaurantId: null,
          restaurantName: '',
          overallRating: 5,
          foodRating: 5,
          serviceRating: 5,
          ambienceRating: 5,
          valueRating: 5,
          comment: '',
          photos: [],
          isSubmitting: false
        },

        // U-09: Quick QR Pass Modal
        u09QrPassModal: {
          isOpen: false,
          reservationId: null
        }
      };

      this.listeners = [];
    }

    subscribe(listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }

    notify() {
      this.listeners.forEach(listener => listener(this.state));
    }

    getState() {
      return this.state;
    }

    setActiveTab(tab) {
      this.state.activeTab = tab;
      if (tab !== 'resultlist') {
        // Keep search keyword intact if desired
      }
      this.notify();
    }

    setSearchKeyword(keyword) {
      this.state.searchKeyword = keyword;
      this.state.resultsState.keyword = keyword;
      this.notify();
    }

    setSelectedRestaurant(restaurant) {
      this.state.selectedRestaurant = restaurant;
      if (restaurant) {
        this.state.detailState = {
          activeTab: 'overview',
          date: 'Aug 14, 2026',
          time: '18:30',
          guests: 2
        };
      }
      this.notify();
    }

    toggleFavorite(id) {
      let next;
      if (this.state.favorites.includes(id)) {
        next = this.state.favorites.filter(favId => favId !== id);
        this.showToast('Removed from favorites');
      } else {
        next = [...this.state.favorites, id];
        this.showToast('Added to saved favorites!');
      }
      this.state.favorites = next;
      try {
        localStorage.setItem('yoyaku_favorites', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      this.notify();
    }

    setLanguage(lang) {
      this.state.currentLanguage = lang;
      try {
        localStorage.setItem('yoyaku_lang', lang);
      } catch (e) {
        console.error(e);
      }
      this.notify();
    }

    toggleAuth(status = null) {
      if (status !== null) {
        this.state.isAuthenticated = status;
      } else {
        this.state.isAuthenticated = !this.state.isAuthenticated;
      }
      this.notify();
    }

    openInfoModal(modalName) {
      this.state.activeInfoModal = modalName;
      if (modalName !== 'check_guest_booking') {
        this.state.guestBookingCheckResult = null;
      }
      this.notify();
    }

    closeInfoModal() {
      this.state.activeInfoModal = 'none';
      this.state.guestBookingCheckResult = null;
      this.notify();
    }

    setGuestBookingCheckResult(result) {
      this.state.guestBookingCheckResult = result;
      this.notify();
    }

    addReservation(newBooking) {
      const next = [newBooking, ...this.state.reservations];
      this.state.reservations = next;
      try {
        localStorage.setItem('yoyaku_reservations', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      this.notify();
    }

    cancelReservation(id) {
      const target = this.state.reservations.find(b => b.id === id);
      if (target) {
        target.status = 'Cancelled';
      }
      try {
        localStorage.setItem('yoyaku_reservations', JSON.stringify(this.state.reservations));
      } catch (e) {
        console.error(e);
      }
      this.showToast('Reservation cancelled');
      this.notify();
    }

    // =========================================================================
    // U-09: Reservation Details, Change & Cancellation Actions
    // =========================================================================
    selectReservationForDetail(reservationId, isGuest = false) {
      this.state.selectedReservationId = reservationId;
      this.state.isGuestReservationView = isGuest;
      this.state.activeTab = 'reservations';
      this.notify();
    }

    clearSelectedReservationDetail() {
      this.state.selectedReservationId = null;
      this.state.isGuestReservationView = false;
      this.notify();
    }

    openU09ChangeModal(resId) {
      const res = this.state.reservations.find(b => b.id === resId);
      if (!res) return;

      const baseAmount = res.totalAmountMMK || res.totalAmount || 350000;
      this.state.u09ChangeModal = {
        isOpen: true,
        reservationId: resId,
        date: res.date || 'Aug 20, 2026',
        time: res.time || '19:00',
        guests: res.guests || 2,
        originalGuests: res.guests || 2,
        originalAmount: baseAmount,
        newAmount: baseAmount,
        cancelHours: res.cancelHours || 24,
        isWithinCancelHours: false,
        errorMessage: null,
        isSubmitting: false
      };
      this.notify();
    }

    closeU09ChangeModal() {
      this.state.u09ChangeModal.isOpen = false;
      this.notify();
    }

    updateU09ChangeField(field, value) {
      const m = this.state.u09ChangeModal;
      if (!m.isOpen) return;

      if (field === 'guests') {
        const g = Math.max(1, Math.min(20, parseInt(value, 10) || 1));
        m.guests = g;
        const perPerson = m.originalAmount / (m.originalGuests || 1);
        m.newAmount = Math.round(perPerson * g);
      } else {
        m[field] = value;
      }
      this.notify();
    }

    confirmU09Change(resId) {
      const m = this.state.u09ChangeModal;
      const res = this.state.reservations.find(b => b.id === resId);
      if (!res) return;

      res.date = m.date;
      res.time = m.time;
      res.guests = m.guests;
      res.totalAmount = m.newAmount;
      res.totalAmountMMK = m.newAmount;
      res.totalAmountUSD = Math.round(m.newAmount / 3300);
      res.updatedAt = new Date().toISOString();

      try {
        localStorage.setItem('yoyaku_reservations', JSON.stringify(this.state.reservations));
      } catch (e) {
        console.error(e);
      }

      const isMm = this.state.currentLanguage === 'MM';
      this.state.myPageData.notifications.unshift({
        id: 'n_' + Date.now(),
        title: isMm
          ? `${res.restaurantName} မှာယူမှု ရက်စွဲနှင့် အချိန် (${m.date}၊ ${m.time}) သို့ ပြောင်းလဲပြီးပါပြီ`
          : `Reservation at ${res.restaurantName} changed to ${m.date} at ${m.time}`,
        time: 'Just now',
        isUnread: true
      });

      this.state.u09ChangeModal.isOpen = false;
      this.showToast(isMm ? 'မှာယူမှု ရက်စွဲနှင့် အချိန် ပြောင်းလဲခြင်း အောင်မြင်ပါသည်' : 'Reservation date & time updated successfully!');
      this.notify();
    }

    openU09CancelModal(resId) {
      const res = this.state.reservations.find(b => b.id === resId);
      if (!res) return;

      const total = res.totalAmountMMK || res.totalAmount || 350000;
      // Calculate fee based on restaurant policy
      // If booking is >24h away: 0% fee; if <24h: 50% fee; if same-day: 100%
      const feePercent = 0; // Default free cancellation window for demo
      const feeAmt = Math.round(total * (feePercent / 100));

      this.state.u09CancelModal = {
        isOpen: true,
        reservationId: resId,
        reason: 'schedule_change',
        otherReasonText: '',
        feePercentage: feePercent,
        feeAmount: feeAmt,
        isSubmitting: false
      };
      this.notify();
    }

    closeU09CancelModal() {
      this.state.u09CancelModal.isOpen = false;
      this.notify();
    }

    setU09CancelReason(reason, otherText = '') {
      this.state.u09CancelModal.reason = reason;
      this.state.u09CancelModal.otherReasonText = otherText;
      this.notify();
    }

    confirmU09Cancellation(resId) {
      const res = this.state.reservations.find(b => b.id === resId);
      if (!res) return;

      res.status = 'Cancelled';
      res.cancelledAt = new Date().toISOString();
      res.cancellationReason = this.state.u09CancelModal.reason;

      try {
        localStorage.setItem('yoyaku_reservations', JSON.stringify(this.state.reservations));
      } catch (e) {
        console.error(e);
      }

      const isMm = this.state.currentLanguage === 'MM';
      this.state.myPageData.notifications.unshift({
        id: 'n_' + Date.now(),
        title: isMm
          ? `${res.restaurantName} (${res.reservationNo}) မှာယူမှုကို ပယ်ဖျက်ပြီးပါပြီ`
          : `Reservation at ${res.restaurantName} (${res.reservationNo}) was cancelled`,
        time: 'Just now',
        isUnread: true
      });

      this.state.u09CancelModal.isOpen = false;
      this.showToast(isMm ? 'မှာယူမှုကို အောင်မြင်စွာ ပယ်ဖျက်ပြီးပါပြီ' : 'Reservation has been cancelled');
      this.notify();
    }

    openU09ReviewModal(resId) {
      const res = this.state.reservations.find(b => b.id === resId);
      if (!res) return;

      this.state.u09ReviewModal = {
        isOpen: true,
        reservationId: resId,
        restaurantId: res.restaurantId,
        restaurantName: res.restaurantName,
        overallRating: 5,
        foodRating: 5,
        serviceRating: 5,
        ambienceRating: 5,
        valueRating: 5,
        comment: '',
        photos: [],
        isSubmitting: false
      };
      this.notify();
    }

    closeU09ReviewModal() {
      this.state.u09ReviewModal.isOpen = false;
      this.notify();
    }

    setU09ReviewField(field, value) {
      if (this.state.u09ReviewModal.isOpen) {
        this.state.u09ReviewModal[field] = value;
        this.notify();
      }
    }

    submitU09Review(resId) {
      const rev = this.state.u09ReviewModal;
      const res = this.state.reservations.find(b => b.id === resId);
      if (!res) return;

      res.hasReviewed = true;
      try {
        localStorage.setItem('yoyaku_reservations', JSON.stringify(this.state.reservations));
      } catch (e) {
        console.error(e);
      }

      const isMm = this.state.currentLanguage === 'MM';
      this.state.myPageData.notifications.unshift({
        id: 'n_' + Date.now(),
        title: isMm
          ? `${rev.restaurantName} အတွက် သုံးသပ်ချက် ပေးပို့မှု အောင်မြင်ပါသည် (+500 Points ရရှိပါသည်)`
          : `Thank you for reviewing ${rev.restaurantName}! (+500 Gourmet Points earned)`,
        time: 'Just now',
        isUnread: true
      });

      this.state.u09ReviewModal.isOpen = false;
      this.showToast(isMm ? 'သုံးသပ်ချက် (Review) ပေးပို့မှု အောင်မြင်ပါသည်!' : 'Review submitted successfully! +500 Points earned.');
      this.notify();
    }

    rebookReservation(resId) {
      const res = this.state.reservations.find(b => b.id === resId);
      if (!res) return;

      const { RESTAURANTS_DATA } = window.YoyakuData || {};
      const targetRest = (RESTAURANTS_DATA && RESTAURANTS_DATA.find(r => r.id === res.restaurantId)) || {
        id: res.restaurantId,
        name: res.restaurantName,
        images: [res.restaurantImage],
        image: res.restaurantImage,
        location: res.location,
        address: res.address || res.location,
        phone: res.restaurantPhone || '+95 9 798 123 456'
      };

      this.state.bookingModalState = {
        isOpen: true,
        restaurant: targetRest,
        step: 1,
        bookingData: {
          date: 'Aug 28, 2026',
          time: res.time || '19:00',
          guests: res.guests || 2,
          seatingPreference: res.seatingPreference || 'Lake View Window'
        },
        guestData: {
          guestName: res.guestName || this.state.myPageData.userName || 'Alex Aung',
          guestPhone: res.guestPhone || this.state.myPageData.userPhone || '+95 9 791 234 567',
          guestEmail: res.guestEmail || this.state.myPageData.userEmail || 'alex@example.com',
          specialRequests: res.specialRequests || '',
          paymentMethod: res.paymentMethod || 'qr'
        },
        createdBooking: null
      };

      const isMm = this.state.currentLanguage === 'MM';
      this.showToast(isMm ? 'ယခင် အချက်အလက်များဖြင့် ပြန်လည်မှာယူမှု စတင်နေပါသည်' : 'Re-booking initialized with your saved preferences!');
      this.notify();
    }

    showToast(message) {
      this.state.toastMessage = message;
      this.notify();
      setTimeout(() => {
        if (this.state.toastMessage === message) {
          this.state.toastMessage = null;
          this.notify();
        }
      }, 3000);
    }

    // Booking Modal Actions
    openBookingModal(restaurant, date, time, guests) {
      this.state.bookingModalState = {
        isOpen: true,
        restaurant,
        step: 1,
        bookingData: {
          date: date || 'Aug 14, 2026',
          time: time || '18:30',
          guests: guests || 2,
          seatingPreference: 'Standard'
        },
        guestData: {
          guestName: this.state.myPageData.userName || 'Evelyn St. Clair',
          guestPhone: this.state.myPageData.userPhone || '+95 9 791 234 567',
          guestEmail: this.state.myPageData.userEmail || 'evelyn.clair@example.com',
          specialRequests: 'Celebrating 5th wedding anniversary. Window table preferred.',
          paymentMethod: 'qr'
        },
        createdBooking: null
      };
      this.notify();
    }

    closeBookingModal() {
      this.state.bookingModalState.isOpen = false;
      this.notify();
    }

    setBookingStep(step, extraData = {}) {
      this.state.bookingModalState.step = step;
      if (extraData.bookingData) {
        this.state.bookingModalState.bookingData = {
          ...this.state.bookingModalState.bookingData,
          ...extraData.bookingData
        };
      }
      if (extraData.guestData) {
        this.state.bookingModalState.guestData = {
          ...this.state.bookingModalState.guestData,
          ...extraData.guestData
        };
      }
      if (extraData.createdBooking) {
        this.state.bookingModalState.createdBooking = extraData.createdBooking;
      }
      this.notify();
    }

    // My Page Modal Actions
    openMyPageModal(modalName, passBookingId = null) {
      this.state.myPageModal = modalName;
      if (passBookingId) {
        this.state.activePassBookingId = passBookingId;
      }
      this.notify();
    }

    closeMyPageModal() {
      this.state.myPageModal = 'none';
      this.notify();
    }

    setMyPageSubTab(subTab) {
      this.state.myPageSubTab = subTab;
      this.notify();
    }

    setMyPageActiveMenu(menuId) {
      this.state.myPageActiveMenu = menuId;
      this.notify();
    }

    updateMyPageData(updater) {
      this.state.myPageData = updater(this.state.myPageData);
      this.notify();
    }

    // Results State Actions
    updateResultsState(keyOrObject, value) {
      if (typeof keyOrObject === 'object') {
        this.state.resultsState = { ...this.state.resultsState, ...keyOrObject };
      } else {
        this.state.resultsState[keyOrObject] = value;
      }
      this.notify();
    }

    // Detail State Actions
    updateDetailState(keyOrObject, value) {
      if (typeof keyOrObject === 'object') {
        this.state.detailState = { ...this.state.detailState, ...keyOrObject };
      } else {
        this.state.detailState[keyOrObject] = value;
      }
      this.notify();
    }

    setInspectedPassBooking(booking) {
      this.state.inspectedPassBooking = booking;
      this.notify();
    }

    // Account Settings Actions (U-20)
    requestEmailChange(newEmail, passwordOrSso) {
      this.state.myPageData.pendingNewEmail = newEmail;
      // Add notification
      const isMm = this.state.currentLanguage === 'MM';
      this.state.myPageData.notifications.unshift({
        id: 'n_' + Date.now(),
        title: isMm ? `အီးမေးလ်ပြောင်းလဲမှု အတည်ပြုချက် ${newEmail} သို့ ပို့ထားပါသည်` : `Verification sent to ${newEmail}`,
        time: 'Just now',
        isUnread: true
      });
      this.notify();
    }

    confirmPendingEmail() {
      if (this.state.myPageData.pendingNewEmail) {
        const oldEmail = this.state.myPageData.userEmail;
        const newEmail = this.state.myPageData.pendingNewEmail;
        this.state.myPageData.userEmail = newEmail;
        this.state.myPageData.emailVerified = true;
        this.state.myPageData.pendingNewEmail = null;
        
        const isMm = this.state.currentLanguage === 'MM';
        this.state.myPageData.notifications.unshift({
          id: 'n_' + Date.now(),
          title: isMm ? `အီးမေးလ်လိပ်စာ ပြောင်းလဲမှု အောင်မြင်ပါသည်။ (${oldEmail} သို့လည်း အသိပေးချက် ပို့ထားပါသည်)` : `Email successfully updated. (Security alert sent to ${oldEmail})`,
          time: 'Just now',
          isUnread: true
        });
        this.notify();
      }
    }

    updatePhoneNumber(newPhone) {
      this.state.myPageData.userPhone = newPhone;
      // Changing phone number explicitly resets phone_verified to FALSE
      this.state.myPageData.phoneVerified = false;
      const isMm = this.state.currentLanguage === 'MM';
      this.state.myPageData.notifications.unshift({
        id: 'n_' + Date.now(),
        title: isMm ? `ဖုန်းနံပါတ် ${newPhone} သို့ ပြောင်းလဲထားပြီး အတည်ပြုရန် စောင့်ဆိုင်းနေပါသည်` : `Phone updated to ${newPhone} (Unverified)`,
        time: 'Just now',
        isUnread: true
      });
      this.notify();
    }

    verifyPhoneNumberOtp(enteredOtp) {
      this.state.myPageData.phoneVerified = true;
      const isMm = this.state.currentLanguage === 'MM';
      this.state.myPageData.notifications.unshift({
        id: 'n_' + Date.now(),
        title: isMm ? `ဖုန်းနံပါတ် အောင်မြင်စွာ အတည်ပြုပြီးပါပြီ` : `Phone number successfully verified`,
        time: 'Just now',
        isUnread: true
      });
      this.notify();
    }

    withdrawAccount(reason, feedback = '') {
      // 1. Cancel all upcoming and pending reservations
      const cancelledCount = this.state.reservations.filter(r => r.status === 'Confirmed' || r.status === 'Pending').length;
      this.state.reservations = this.state.reservations.map(r => {
        if (r.status === 'Confirmed' || r.status === 'Pending') {
          return { ...r, status: 'Cancelled' };
        }
        return r;
      });

      // 2. Mark account status as withdrawn
      this.state.myPageData.accountStatus = 'withdrawn';
      this.state.myPageData.withdrawnAt = new Date().toISOString();
      this.state.myPageData.withdrawalReason = reason;

      const isMm = this.state.currentLanguage === 'MM';
      this.state.myPageData.notifications.unshift({
        id: 'n_' + Date.now(),
        title: isMm ? `အကောင့်ဖျက်သိမ်းပြီးပါပြီ။ ကျန်ရှိသော စိုတ်ထားမှု (${cancelledCount}) ခုကို အလိုအလျောက် ပယ်ဖျက်လိုက်ပါသည်။` : `Account withdrawn. ${cancelledCount} upcoming reservations automatically cancelled.`,
        time: 'Just now',
        isUnread: true
      });

      this.notify();
    }

    reactivateAccount() {
      this.state.myPageData.accountStatus = 'active';
      this.state.myPageData.withdrawnAt = null;
      this.state.myPageData.withdrawalReason = '';
      this.notify();
    }

    // U-17 Notification Settings & Viber Integration Actions
    toggleNotificationChannel(channelKey) {
      if (channelKey in this.state.myPageData) {
        this.state.myPageData[channelKey] = !this.state.myPageData[channelKey];
        const isMm = this.state.currentLanguage === 'MM';
        const isEnabled = this.state.myPageData[channelKey];
        const channelNames = {
          notifInApp: isMm ? 'App အတွင်း အသိပေးချက်' : 'In-App Notifications',
          notifWebPush: isMm ? 'Web Push အသိပေးချက်' : 'Web Push Notifications',
          notifEmail: isMm ? 'အီးမေးလ် အသိပေးချက်' : 'Email Notifications',
          notifViber: isMm ? 'Viber အသိပေးချက်' : 'Viber Notifications',
          notifSms: isMm ? 'SMS အသိပေးချက်' : 'SMS Notifications'
        };
        const name = channelNames[channelKey] || channelKey;
        this.showToast(isEnabled ? `${name}: ${isMm ? 'ဖွင့်ထားပါသည်' : 'Enabled'}` : `${name}: ${isMm ? 'ပိတ်ထားပါသည်' : 'Disabled'}`);
        this.notify();
      }
    }

    setWebPushSubscription(subscribed) {
      this.state.myPageData.webPushSubscribed = subscribed;
      this.state.myPageData.webPushPermission = subscribed ? 'granted' : 'default';
      this.state.myPageData.notifWebPush = subscribed;
      const isMm = this.state.currentLanguage === 'MM';
      if (subscribed) {
        this.showToast(isMm ? 'Web Push အသိပေးချက်ကို အောင်မြင်စွာ ခွင့်ပြုထားပါပြီ' : 'Web Push notifications successfully subscribed!');
        this.state.myPageData.notifications.unshift({
          id: 'n_' + Date.now(),
          title: isMm ? 'Web Push အသိပေးချက် ခွင့်ပြုချက် အောင်မြင်ပါသည်' : 'Web Push notifications activated for this browser',
          time: 'Just now',
          isUnread: true
        });
      } else {
        this.showToast(isMm ? 'Web Push အသိပေးချက်ကို ပယ်ဖျက်လိုက်ပါပြီ' : 'Web Push notifications unsubscribed.');
      }
      this.notify();
    }

    updateNotificationPhoneNumber(newPhone) {
      this.state.myPageData.userPhone = newPhone;
      // In Package 1, phone number is explicitly stored as Unverified status
      this.state.myPageData.phoneVerified = false;
      const isMm = this.state.currentLanguage === 'MM';
      this.showToast(isMm ? 'ဖုန်းနံပါတ် သိမ်းဆည်းပြီးပါပြီ (Package 1: အတည်မပြုရသေးပါ)' : 'Phone number saved (Package 1: Unverified status)');
      this.state.myPageData.notifications.unshift({
        id: 'n_' + Date.now(),
        title: isMm ? `ဖုန်းနံပါတ် ${newPhone} ကို စနစ်တွင် သိမ်းဆည်းထားပါသည် (အတည်မပြုရသေးပါ)` : `Phone number ${newPhone} updated (Unverified status)`,
        time: 'Just now',
        isUnread: true
      });
      this.notify();
    }

    setViberConsent(consent) {
      this.state.myPageData.viberConsent = consent;
      this.state.myPageData.viberConnected = consent;
      this.state.myPageData.viberConsentDate = consent ? new Date().toISOString() : null;
      const isMm = this.state.currentLanguage === 'MM';
      if (consent) {
        this.showToast(isMm ? 'Viber ချိတ်ဆက်မှု သဘောတူညီချက် ပေးပြီးပါပြီ (Paid Phase တွင် အသက်ဝင်မည်)' : 'Viber Integration consent granted (Will activate in Paid Phase)');
        this.state.myPageData.notifications.unshift({
          id: 'n_' + Date.now(),
          title: isMm ? 'Viber ချိတ်ဆက်မှု သဘောတူညီချက် မှတ်တမ်းတင်ပြီးပါပြီ' : 'Viber Integration consent granted for notifications',
          time: 'Just now',
          isUnread: true
        });
      } else {
        this.showToast(isMm ? 'Viber ချိတ်ဆက်မှု သဘောတူညီချက်ကို ပယ်ဖျက်လိုက်ပါပြီ' : 'Viber Integration consent revoked.');
      }
      this.notify();
    }

    sendTestNotification() {
      const isMm = this.state.currentLanguage === 'MM';
      const testTitle = isMm ? 'စမ်းသပ်အသိပေးချက် - စားပွဲဝိုင်း အတည်ပြုခြင်း' : 'Test Push Notification - Table Confirmation';
      const testMsg = isMm ? 'The Glass Pavilion တွင် စားပွဲဝိုင်း နံပါတ် A-12 ကို စိုတ်ထားပြီးပါပြီ။' : 'Your table for 2 at The Glass Pavilion is ready!';
      
      this.state.myPageData.notifications.unshift({
        id: 'n_' + Date.now(),
        title: testTitle,
        time: 'Just now',
        isUnread: true
      });
      this.showToast(`🔔 [Web Push] ${testTitle}: ${testMsg}`);
      this.notify();
    }

    // Login & Lookup Methods (U-10)
    setLoginTab(tab) {
      this.state.loginState.activeTab = tab;
      this.state.loginState.errorType = 'none';
      this.state.loginState.errorMessage = null;
      this.notify();
    }

    toggleEmailLoginForm(forceValue) {
      this.state.loginState.isEmailFormExpanded = forceValue !== undefined ? forceValue : !this.state.loginState.isEmailFormExpanded;
      this.notify();
    }

    setLoginField(field, value) {
      this.state.loginState[field] = value;
      this.notify();
    }

    setLoginError(typeOrMsg, maybeMsg) {
      if (maybeMsg !== undefined) {
        this.state.loginState.errorType = typeOrMsg;
        this.state.loginState.errorMessage = maybeMsg;
      } else {
        this.state.loginState.errorType = 'error';
        this.state.loginState.errorMessage = typeOrMsg;
      }
      this.state.loginState.isLoading = false;
      this.state.loginState.loadingAction = null;
      this.notify();
    }

    clearLoginError() {
      this.state.loginState.errorType = 'none';
      this.state.loginState.errorMessage = null;
      this.notify();
    }

    executeSocialLogin(provider) {
      this.state.loginState.isLoading = true;
      this.state.loginState.loadingAction = provider;
      this.notify();

      setTimeout(() => {
        this.state.loginState.isLoading = false;
        this.state.loginState.loadingAction = null;
        this.state.isAuthenticated = true;
        this.state.myPageData.authProvider = provider;
        this.state.myPageData.userName = provider === 'facebook' ? 'Alex Aung (FB)' : 'Alex Aung (Google)';
        this.state.myPageData.userEmail = provider === 'facebook' ? 'alex.fb@example.com' : 'alex.google@gmail.com';
        
        // If guest flow was active, resume booking, else navigate to mypage
        if (this.state.loginState.isGuestFlow && this.state.bookingModalState.restaurant) {
          this.state.bookingModalState.isOpen = true;
        } else {
          this.setActiveTab('mypage');
        }
        
        const isMm = this.state.currentLanguage === 'MM';
        this.showToast(isMm ? `${provider === 'facebook' ? 'Facebook' : 'Google'} ဖြင့် အောင်မြင်စွာ ဝင်ရောက်ပြီးပါပြီ` : `Signed in with ${provider === 'facebook' ? 'Facebook' : 'Google'}!`);
      }, 700);
    }

    executeEmailLogin(email, password) {
      this.state.loginState.isLoading = true;
      this.state.loginState.loadingAction = 'email';
      this.notify();

      setTimeout(() => {
        this.state.loginState.isLoading = false;
        this.state.loginState.loadingAction = null;
        const cleanEmail = (email || '').trim().toLowerCase();

        // Security / Demo error conditions
        if (cleanEmail.includes('locked')) {
          const isMm = this.state.currentLanguage === 'MM';
          this.setLoginError('locked', isMm ? 'အကြိမ်ကြိမ် မှားယွင်းမှုကြောင့် အကောင့်ကို ယာယီပိတ်ထားပါသည်။ ၁၅ မိနစ်အကြာတွင် ပြန်လည်ကြိုးစားပါ။' : 'Account temporarily locked due to failed attempts. Please try again in 15 minutes.');
          return;
        }
        if (cleanEmail.includes('suspend')) {
          const isMm = this.state.currentLanguage === 'MM';
          this.setLoginError('suspended', isMm ? 'သင့်အကောင့်ကို ရပ်ဆိုင်းထားပါသည်။ ကျေးဇူးပြု၍ စီမံခန့်ခွဲသူထံ ဆက်သွယ်ပါ။' : 'Your account has been suspended. Please contact us.');
          return;
        }
        if (cleanEmail.includes('rate')) {
          const isMm = this.state.currentLanguage === 'MM';
          this.setLoginError('ratelimit', isMm ? 'ကြိုးစားမှု အကြိမ်ရေ များလွန်းနေပါသည်။ ခဏအကြာမှ ထပ်မံကြိုးစားပါ။' : 'Too many attempts. Please try again later.');
          return;
        }
        if (!cleanEmail.includes('@') || !cleanEmail.includes('.') || (password || '').length < 6) {
          const isMm = this.state.currentLanguage === 'MM';
          this.setLoginError('credentials', isMm ? 'အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားယွင်းနေပါသည်' : 'Email address or password is incorrect');
          return;
        }

        // Successful authentication
        this.state.isAuthenticated = true;
        this.state.myPageData.authProvider = 'email';
        this.state.myPageData.userEmail = cleanEmail;
        this.state.myPageData.userName = cleanEmail.split('@')[0] || 'alex';
        this.state.loginState.errorType = 'none';
        this.state.loginState.errorMessage = null;

        if (this.state.loginState.isGuestFlow && this.state.bookingModalState.restaurant) {
          this.state.bookingModalState.isOpen = true;
        } else {
          this.setActiveTab('mypage');
        }

        const isMm = this.state.currentLanguage === 'MM';
        this.showToast(isMm ? 'အောင်မြင်စွာ အကောင့်ဝင်ပြီးပါပြီ' : 'Logged in successfully!');
      }, 750);
    }

    executeLookupReservation(resNo, phone) {
      this.state.loginState.isLoading = true;
      this.state.loginState.loadingAction = 'lookup';
      this.notify();

      setTimeout(() => {
        this.state.loginState.isLoading = false;
        this.state.loginState.loadingAction = null;
        const cleanResNo = (resNo || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        const cleanPhone = (phone || '').replace(/[^0-9]/g, '');

        if (!cleanResNo || !cleanPhone) {
          const isMm = this.state.currentLanguage === 'MM';
          this.setLoginError('lookup_notfound', isMm ? 'ဘွတ်ကင်နံပါတ် သို့မဟုတ် ဖုန်းနံပါတ် မကိုက်ညီပါ။' : 'Reservation number or phone number does not match.');
          return;
        }

        // Match against existing bookings
        const match = this.state.reservations.find(r => {
          const rNo = (r.reservationNo || r.id || '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
          const rPh = (r.guestPhone || '').replace(/[^0-9]/g, '');
          const noMatches = rNo === cleanResNo || cleanResNo.includes(rNo) || rNo.includes(cleanResNo) || cleanResNo.endsWith('001') || cleanResNo.endsWith('k7m2qx');
          const phMatches = rPh.endsWith(cleanPhone.slice(-7)) || cleanPhone.endsWith(rPh.slice(-7)) || cleanPhone.includes('791234567');
          return noMatches && phMatches;
        });

        if (match || cleanResNo.includes('k7m2qx') || cleanResNo.includes('001')) {
          this.state.loginState.lookupResult = match || this.state.reservations[0];
          this.state.loginState.errorType = 'none';
          this.state.loginState.errorMessage = null;
          const isMm = this.state.currentLanguage === 'MM';
          this.showToast(isMm ? 'ဘွတ်ကင် အချက်အလက် တွေ့ရှိပါသည်' : 'Reservation found!');
        } else {
          this.state.loginState.lookupResult = null;
          const isMm = this.state.currentLanguage === 'MM';
          this.setLoginError('lookup_notfound', isMm ? 'ဘွတ်ကင်နံပါတ် သို့မဟုတ် ဖုန်းနံပါတ် မကိုက်ညီပါ။' : 'Reservation number or phone number does not match.');
        }
        this.notify();
      }, 700);
    }

    // =========================================================================
    // U-11: Member Registration State & Handlers
    // =========================================================================
    setRegisterField(field, value) {
      this.state.registerState[field] = value;
      // Clear corresponding error on edit
      if (this.state.registerState.errors && this.state.registerState.errors[field]) {
        delete this.state.registerState.errors[field];
      }
      this.notify();
    }

    clearRegisterErrors() {
      this.state.registerState.errors = {};
      this.notify();
    }

    toggleEmailRegisterForm(forceValue) {
      this.state.registerState.showEmailForm = forceValue !== undefined ? forceValue : !this.state.registerState.showEmailForm;
      this.clearRegisterErrors();
      this.notify();
    }

    executeSsoRegistration(provider) {
      const isMm = this.state.currentLanguage === 'MM';
      this.state.registerState.pendingSsoProvider = provider;
      this.state.registerState.showSsoTermsModal = true;
      this.notify();
    }

    cancelSsoRegistration() {
      this.state.registerState.showSsoTermsModal = false;
      this.state.registerState.pendingSsoProvider = null;
      this.notify();
    }

    confirmSsoRegistrationWithTerms() {
      const provider = this.state.registerState.pendingSsoProvider || 'google';
      const isMm = this.state.currentLanguage === 'MM';

      this.state.registerState.isLoading = true;
      this.state.registerState.loadingAction = provider;
      this.state.registerState.showSsoTermsModal = false;
      this.notify();

      setTimeout(() => {
        this.state.registerState.isLoading = false;
        this.state.registerState.loadingAction = null;
        this.state.registerState.pendingSsoProvider = null;

        const userName = provider === 'facebook' ? 'Alex Aung (FB)' : 'Alex Aung (Google)';
        const userEmail = provider === 'facebook' ? 'alex.fb@example.com' : 'alex.google@gmail.com';
        const userPhone = '+95 9 791 234 567';

        // Add to registered users list if not already
        if (!this.state.registeredUsers.some(u => u.email.toLowerCase() === userEmail.toLowerCase())) {
          this.state.registeredUsers.push({
            email: userEmail,
            name: userName,
            phone: userPhone,
            provider
          });
        }

        // Authenticate user
        this.state.isAuthenticated = true;
        this.state.myPageData.authProvider = provider;
        this.state.myPageData.userName = userName;
        this.state.myPageData.userNameMM = 'အဲလက်စ်';
        this.state.myPageData.userEmail = userEmail;
        this.state.myPageData.userPhone = userPhone;
        this.state.myPageData.emailVerified = true;
        this.state.myPageData.phoneVerified = false; // Package 1: Unverified

        this.state.myPageData.notifications.unshift({
          id: 'n_' + Date.now(),
          title: isMm ? `${provider === 'facebook' ? 'Facebook' : 'Google'} SSO ဖြင့် အကောင့်အသစ် ဖွင့်ပြီးပါပြီ` : `Welcome to Yoyaku! Account registered via ${provider === 'facebook' ? 'Facebook' : 'Google'} SSO.`,
          time: 'Just now',
          isUnread: true
        });

        if (this.state.loginState.isGuestFlow && this.state.bookingModalState.restaurant) {
          this.state.bookingModalState.isOpen = true;
        } else {
          this.setActiveTab('mypage');
        }

        this.showToast(isMm ? `${provider === 'facebook' ? 'Facebook' : 'Google'} ဖြင့် အကောင့်ဖွင့်ခြင်း အောင်မြင်ပါသည်!` : `Account created with ${provider === 'facebook' ? 'Facebook' : 'Google'}!`);
      }, 750);
    }

    executeEmailRegistration({ name, email, password, confirmPassword, phone, agreeTerms }) {
      const isMm = this.state.currentLanguage === 'MM';
      const errors = {};

      const cleanName = (name || '').trim();
      const cleanEmail = (email || '').trim().toLowerCase();
      const cleanPassword = password || '';
      const cleanConfirmPassword = confirmPassword || '';
      const cleanPhone = (phone || '').trim();

      // 1. Name validation: 1 to 100 characters (Unicode friendly)
      if (!cleanName || cleanName.length < 1 || cleanName.length > 100) {
        errors.name = isMm ? 'အမည်ကို အနည်းဆုံး ၁ လုံးမှ ၁၀၀ လုံးအတွင်း ထည့်ပေးပါ' : 'Name must be between 1 and 100 characters';
      }

      // 2. Email validation: Format check & Uniqueness check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!cleanEmail || !emailRegex.test(cleanEmail)) {
        errors.email = isMm ? 'မှန်ကန်သော အီးမေးလ်လိပ်စာ ထည့်ပေးပါ' : 'Please enter a valid email address';
      } else {
        const isDuplicate = this.state.registeredUsers.some(u => u.email.toLowerCase() === cleanEmail);
        if (isDuplicate) {
          // Rule 4: "This email address is already registered"
          errors.email = isMm ? 'ဤအီးမေးလ်လိပ်စာဖြင့် အကောင့်ဖွင့်ထားပြီးဖြစ်ပါသည်' : 'This email address is already registered';
        }
      }

      // 3. Password validation: min 8 chars, letters and numbers required
      const hasLetter = /[a-zA-Z]/.test(cleanPassword);
      const hasNumber = /[0-9]/.test(cleanPassword);
      if (!cleanPassword || cleanPassword.length < 8 || !hasLetter || !hasNumber) {
        errors.password = isMm ? 'စကားဝှက်သည် အနည်းဆုံး ၈ လုံးရှိရမည်ဖြစ်ပြီး အင်္ဂလိပ်စာလုံးနှင့် ဂဏန်းများ ပါဝင်ရမည်' : 'Password must be at least 8 characters and contain both letters and numbers';
      }

      // 4. Confirm Password validation: Must match
      if (cleanPassword !== cleanConfirmPassword) {
        errors.confirmPassword = isMm ? 'အတည်ပြုစကားဝှက်နှင့် မကိုက်ညီပါ' : 'Passwords do not match';
      }

      // 5. Phone validation (Optional, Myanmar format +95 or 09...)
      if (cleanPhone) {
        const phoneRegex = /^(\+?959|09|\+?95\s?9|\+?9509)\d{7,9}$/;
        const strippedPhone = cleanPhone.replace(/[\s\-]/g, '');
        if (!phoneRegex.test(strippedPhone) && !/^(\+95|0)\d{8,11}$/.test(strippedPhone)) {
          errors.phone = isMm ? 'မြန်မာဖုန်းနံပါတ် ပုံစံမှန်ကန်စွာ ထည့်သွင်းပါ (+95 သို့မဟုတ် 09...)' : 'Please enter a valid Myanmar phone number (starts with +95 or 09)';
        }
      }

      // 6. Terms Agreement validation
      if (!agreeTerms) {
        errors.terms = isMm ? 'အကောင့်မဖွင့်မီ အသုံးပြုမှုစည်းမျဉ်းများကို သဘောတူရန် လိုအပ်ပါသည်' : 'You must agree to the Terms of Service to create an account';
      }

      if (Object.keys(errors).length > 0) {
        this.state.registerState.errors = errors;
        this.notify();
        return false;
      }

      // Start Registration Execution
      this.state.registerState.isLoading = true;
      this.state.registerState.loadingAction = 'email';
      this.state.registerState.errors = {};
      this.notify();

      setTimeout(() => {
        this.state.registerState.isLoading = false;
        this.state.registerState.loadingAction = null;

        // Save new user to registered database
        this.state.registeredUsers.push({
          email: cleanEmail,
          name: cleanName,
          phone: cleanPhone || '09791234567',
          provider: 'email'
        });

        // Set pending user data
        this.state.myPageData.userName = cleanName;
        this.state.myPageData.userEmail = cleanEmail;
        this.state.myPageData.userPhone = cleanPhone || '+95 9 791 234 567';
        this.state.myPageData.authProvider = 'email';
        this.state.myPageData.emailVerified = false; // Unverified until MAIL-01 link clicked
        this.state.myPageData.phoneVerified = false; // Stored as Unverified in Package 1

        // Trigger MAIL-01 Confirmation flow
        this.state.registerState.showMail01Modal = true;
        this.state.registerState.registeredUserEmail = cleanEmail;
        this.state.registerState.registeredUserName = cleanName;

        this.notify();
      }, 750);

      return true;
    }

    verifyMail01Confirmation(email) {
      const isMm = this.state.currentLanguage === 'MM';
      this.state.myPageData.emailVerified = true;
      this.state.isAuthenticated = true;
      this.state.registerState.showMail01Modal = false;

      this.state.myPageData.notifications.unshift({
        id: 'n_' + Date.now(),
        title: isMm ? 'အီးမေးလ်လိပ်စာ အတည်ပြုပြီးပါပြီ။ Yoyaku မှ ကြိုဆိုပါသည်!' : 'Email verified successfully! Welcome to Yoyaku.',
        time: 'Just now',
        isUnread: true
      });

      if (this.state.loginState.isGuestFlow && this.state.bookingModalState.restaurant) {
        this.state.bookingModalState.isOpen = true;
      } else {
        this.setActiveTab('mypage');
      }

      this.showToast(isMm ? 'အီးမေးလ် အတည်ပြုခြင်း အောင်မြင်ပြီး အကောင့်ဖွင့်ပြီးပါပြီ!' : 'Email verified! Account activated successfully.');
    }

    resendMail01Confirmation(email) {
      const isMm = this.state.currentLanguage === 'MM';
      this.showToast(isMm ? `${email} သို့ အတည်ပြုလင့်ခ် (MAIL-01) ပြန်လည်ပေးပို့ပြီးပါပြီ` : `Confirmation email (MAIL-01) resent to ${email}`);
    }

    closeMail01Modal() {
      this.state.registerState.showMail01Modal = false;
      this.notify();
    }
  }

  window.store = new StateStore();

  window.YoyakuPrototype.store = window.store;
})();
