/**
 * Yoyaku / EzBookNow — Internationalization (i18n) Engine
 * Supported Locales: English (EN), Myanmar (MM), Japanese (JA)
 */
(() => {
  window.YoyakuI18n = window.YoyakuI18n || {};

  const SUPPORTED_LANGS = ['EN', 'MM', 'JA'];
  const DEFAULT_LANG = 'EN';

  const LANG_METADATA = {
    EN: { code: 'EN', name: 'English', nativeName: 'English (EN)', flag: '🇬🇧' },
    MM: { code: 'MM', name: 'Myanmar', nativeName: 'မြန်မာ (MM)', flag: '🇲🇲' },
    JA: { code: 'JA', name: 'Japanese', nativeName: '日本語 (JA)', flag: '🇯🇵' }
  };

  /**
   * Helper function: returns localized string based on active language
   * Usage: t('Hello', 'မင်္ဂလာပါ', 'こんにちは')
   */
  function t(en, mm, ja) {
    const lang = (window.store && window.store.getState)
      ? (window.store.getState().currentLanguage || DEFAULT_LANG)
      : (localStorage.getItem('yoyaku_lang') || DEFAULT_LANG);

    if (lang === 'JA') {
      return (ja !== undefined && ja !== null && ja !== '') ? ja : en;
    }
    if (lang === 'MM') {
      return (mm !== undefined && mm !== null && mm !== '') ? mm : en;
    }
    return en;
  }

  // Common UI Dictionary
  const DICT = {
    // Brand
    brandName: { en: 'Yoyaku', mm: 'Yoyaku', ja: 'Yoyaku (予約)' },
    brandTagline: { en: 'Premier Myanmar Dining & Table Reservations', mm: 'မြန်မာနိုင်ငံ၏ ထိပ်တန်း စားသောက်ဆိုင် စားပွဲကြိုတင်မှာယူမှုစနစ်', ja: 'ミャンマー最高峰の厳選レストラン・テーブル即時予約' },

    // Stepper
    step1: { en: 'Date & Slots', mm: 'ရက်စွဲနှင့် အချိန်', ja: '日時・空席選択' },
    step2: { en: 'Guest Details', mm: 'ဧည့်သည် အချက်အလက်', ja: 'お客様情報' },
    step3: { en: 'Confirm', mm: 'အတည်ပြုချက်', ja: '予約内容の確認' },
    step4: { en: 'Complete', mm: 'ပြီးမြောက်ပါပြီ', ja: '予約完了' },

    // Common Buttons
    back: { en: 'Back', mm: 'နောက်သို့', ja: '戻る' },
    next: { en: 'Continue', mm: 'ရှေ့သို့ ဆက်သွားမည်', ja: '次へ進む' },
    confirm: { en: 'Confirm Reservation', mm: 'ကြိုတင်မှာယူမှု အတည်ပြုမည်', ja: '予約を確定する' },
    cancel: { en: 'Cancel', mm: 'မလုပ်တော့ပါ', ja: 'キャンセル' },
    close: { en: 'Close', mm: 'ပိတ်မည်', ja: '閉じる' },
    save: { en: 'Save Changes', mm: 'အပြောင်းအလဲ သိမ်းမည်', ja: '変更を保存' },
    search: { en: 'Search', mm: 'ရှာဖွေရန်', ja: '検索' },
    viewDetails: { en: 'View Details', mm: 'အသေးစိတ် ကြည့်မည်', ja: '詳細を見る' },
    viewShopInfo: { en: 'View Restaurant Info', mm: 'ဆိုင်အချက်အလက် ကြည့်မည်', ja: 'お店の情報を見る' },
    bookTable: { en: 'Reserve Table', mm: 'စားပွဲ ကြိုတင်မှာယူမည်', ja: '席を予約する' },
    home: { en: 'Home', mm: 'ပင်မ', ja: 'ホーム' },
    myPage: { en: 'My Page', mm: 'မိုင်ပေ့ဂျ်', ja: 'マイページ' },
    login: { en: 'Log In', mm: 'အကောင့်ဝင်ရန်', ja: 'ログイン' },
    register: { en: 'Register', mm: 'အကောင့်သစ်ဖွင့်ရန်', ja: '新規登録' },
    logout: { en: 'Log Out', mm: 'အကောင့်ထွက်မည်', ja: 'ログアウト' },

    // Statuses
    confirmed: { en: 'Confirmed', mm: 'အတည်ပြုပြီး', ja: '予約確定' },
    cancelled: { en: 'Cancelled', mm: 'ပယ်ဖျက်ပြီး', ja: 'キャンセル済み' },
    completed: { en: 'Completed', mm: 'ပြီးမြောက်ပြီး', ja: '来店済み' },
    pending: { en: 'Pending', mm: 'အတည်ပြုရန် စောင့်ဆိုင်းနေ', ja: '確認待ち' },

    // Top Navigation
    forOwners: { en: 'For Restaurant Owners', mm: 'ဆိုင်ပိုင်ရှင်များ', ja: '掲載希望の飲食店様へ' },
    checkReservation: { en: 'Check Reservation', mm: 'မှာယူမှု စစ်ဆေးရန်', ja: '予約照会' },
    notifications: { en: 'Notifications', mm: 'အသိပေးချက်များ', ja: 'お知らせ' },
    language: { en: 'Language', mm: 'ဘာသာစကား', ja: '言語' },

    // Settings
    displayLanguage: { en: 'System Display Language', mm: 'စနစ်ပြသရေး ဘာသာစကား', ja: 'システム表示言語' },
    displayLanguageSub: { en: 'Choose your preferred interface language across Yoyaku (EN / MM / JA)', mm: 'Yoyaku စနစ်တစ်ခုလုံးတွင် အသုံးပြုမည့် ဘာသာစကား ရွေးချယ်ပါ (အင်္ဂလိပ် / မြန်မာ / ဂျပန်)', ja: 'Yoyakuシステム全体で表示する言語を選択してください (EN / MM / JA)' },
    languageSavedToast: { en: 'Display language updated successfully!', mm: 'ဘာသာစကား အောင်မြင်စွာ ပြောင်းလဲပြီးပါပြီ။', ja: '表示言語を変更しました。' },

    // Core Booking Flow Terms
    selectDate: { en: 'Select Date', mm: 'ရက်စွဲ ရွေးချယ်ပါ', ja: '日付を選択' },
    selectTime: { en: 'Select Time Slot', mm: 'အချိန် ရွေးချယ်ပါ', ja: '時間を選択' },
    selectParty: { en: 'Party Size', mm: 'ဧည့်သည် အရေအတွက်', ja: '人数' },
    seatingPreference: { en: 'Seating Preference', mm: 'လိုချင်သော ဝိုင်းအမျိုးအစား', ja: '希望座席' },
    specialRequests: { en: 'Special Requests', mm: 'အထူးမှာကြားချက်များ', ja: 'ご要望・アレルギー' },
    guestName: { en: 'Guest Name', mm: 'ဧည့်သည် အမည်', ja: 'お名前' },
    phoneNumber: { en: 'Phone Number', mm: 'ဖုန်းနံပါတ်', ja: '電話番号' },
    emailAddress: { en: 'Email Address', mm: 'အီးမေးလ်လိပ်စာ', ja: 'メールアドレス' },
    optional: { en: 'Optional', mm: 'မဖြစ်မနေ မဟုတ်ပါ', ja: '任意' },
    required: { en: 'Required', mm: 'မဖြစ်မနေ ဖြည့်ရန်', ja: '必須' },
    bookingNumber: { en: 'Booking Number', mm: 'ဘွတ်ကင် အမှတ်', ja: '予約番号' },
    digitalPass: { en: 'Digital QR Check-in Pass', mm: 'ဒစ်ဂျစ်တယ် QR ဝင်ရောက်ခွင့်ကတ်', ja: '来店用QRコード' },

    // Auth & Lookup
    lookupByNo: { en: 'Lookup by Booking No.', mm: 'ဘွတ်ကင်အမှတ်ဖြင့် ရှာရန်', ja: '予約番号で照会' },
    enterBookingNo: { en: 'Enter Booking Number', mm: 'ဘွတ်ကင်အမှတ် ရိုက်ထည့်ပါ', ja: '予約番号を入力' },
    enterPhoneForLookup: { en: 'Enter Phone Number used for Booking', mm: 'မှာယူစဉ်က ဖုန်းနံပါတ် ရိုက်ထည့်ပါ', ja: '予約時の電話番号を入力' }
  };

  function text(key) {
    const item = DICT[key];
    if (!item) return '';
    return t(item.en, item.mm, item.ja);
  }

  window.YoyakuI18n.SUPPORTED_LANGS = SUPPORTED_LANGS;
  window.YoyakuI18n.LANG_METADATA = LANG_METADATA;
  window.YoyakuI18n.DEFAULT_LANG = DEFAULT_LANG;
  window.YoyakuI18n.t = t;
  window.YoyakuI18n.text = text;
  window.YoyakuI18n.DICT = DICT;
  window.t = t;
})();
