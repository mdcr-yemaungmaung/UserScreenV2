/**
 * Yoyaku / EzBookNow — Internationalization (i18n) Engine
 * Supported Locales: English (EN), Myanmar (MM), Japanese (JA)
 * All UI strings are centralized in this dictionary.
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

  // Comprehensive Multi-lingual UI Dictionary
  const DICT = {
    // Brand & Taglines
    brandName: { en: 'Yoyaku', mm: 'Yoyaku', ja: 'Yoyaku (予約)' },
    brandTagline: { en: 'Premier Myanmar Dining & Table Reservations', mm: 'မြန်မာနိုင်ငံ၏ ထိပ်တန်း စားသောက်ဆိုင် စားပွဲကြိုတင်မှာယူမှုစနစ်', ja: 'ミャンマー最高峰の厳選レストラン・テーブル即時予約' },

    // Stepper Navigation
    step1: { en: 'Date & Slots', mm: 'ရက်စွဲနှင့် အချိန်', ja: '日時・空席選択' },
    step2: { en: 'Guest Details', mm: 'ဧည့်သည် အချက်အလက်', ja: 'お客様情報' },
    step3: { en: 'Confirm', mm: 'အတည်ပြုချက်', ja: '予約内容の確認' },
    step4: { en: 'Complete', mm: 'ပြီးမြောက်ပါပြီ', ja: '予約完了' },

    // Common Buttons & Actions
    back: { en: 'Back', mm: 'နောက်သို့', ja: '戻る' },
    next: { en: 'Continue', mm: 'ရှေ့သို့ ဆက်သွားမည်', ja: '次へ進む' },
    continue: { en: 'Continue', mm: 'ရှေ့သို့ ဆက်သွားမည်', ja: '次へ進む' },
    confirm: { en: 'Confirm Reservation', mm: 'ကြိုတင်မှာယူမှု အတည်ပြုမည်', ja: '予約を確定する' },
    cancel: { en: 'Cancel', mm: 'မလုပ်တော့ပါ', ja: 'キャンセル' },
    close: { en: 'Close', mm: 'ပိတ်မည်', ja: '閉じる' },
    save: { en: 'Save Changes', mm: 'အပြောင်းအလဲ သိမ်းမည်', ja: '変更を保存' },
    search: { en: 'Search', mm: 'ရှာဖွေရန်', ja: '検索' },
    details: { en: 'Details', mm: 'အသေးစိတ်', ja: '詳細' },
    viewDetails: { en: 'View Details', mm: 'အသေးစိတ် ကြည့်မည်', ja: '詳細を見る' },
    viewShopInfo: { en: 'View Restaurant Info', mm: 'ဆိုင်အချက်အလက် ကြည့်မည်', ja: 'お店の情報を見る' },
    bookTable: { en: 'Reserve Table', mm: 'စားပွဲ ကြိုတင်မှာယူမည်', ja: '席を予約する' },
    bookNow: { en: 'Book Now', mm: 'ကြိုတင်မှာယူမည်', ja: '今すぐ予約' },
    home: { en: 'Home', mm: 'ပင်မ', ja: 'ホーム' },
    myPage: { en: 'My Page', mm: 'မိုင်ပေ့ဂျ်', ja: 'マイページ' },
    login: { en: 'Log In', mm: 'အကောင့်ဝင်ရန်', ja: 'ログイン' },
    signIn: { en: 'Sign In', mm: 'အကောင့်ဝင်ရန်', ja: 'サインイン' },
    register: { en: 'Register', mm: 'အကောင့်သစ်ဖွင့်ရန်', ja: '新規登録' },
    signUp: { en: 'Sign Up', mm: 'အကောင့်သစ်ဖွင့်ရန်', ja: '新規登録' },
    logout: { en: 'Log Out', mm: 'အကောင့်ထွက်မည်', ja: 'ログアウト' },
    or: { en: 'OR', mm: 'သို့မဟုတ်', ja: 'または' },
    guests: { en: 'Guests', mm: 'ဦး', ja: '名様' },
    guest: { en: 'Guest', mm: 'ဧည့်သည်', ja: 'お名前' },
    partySize: { en: 'Party Size', mm: 'ဧည့်သည် အရေအတွက်', ja: '人数' },
    total: { en: 'Total', mm: 'စုစုပေါင်း', ja: '合計' },
    loading: { en: 'Loading...', mm: 'လုပ်ဆောင်နေသည်...', ja: '読み込み中...' },
    connecting: { en: 'Connecting...', mm: 'ချိတ်ဆက်နေသည်...', ja: '接続中...' },
    error: { en: 'Error', mm: 'အမှား', ja: 'エラー' },
    success: { en: 'Success', mm: 'အောင်မြင်ပါသည်', ja: '成功' },

    // Statuses
    confirmed: { en: 'Confirmed', mm: 'အတည်ပြုပြီး', ja: '予約確定' },
    cancelled: { en: 'Cancelled', mm: 'ပယ်ဖျက်ပြီး', ja: 'キャンセル済み' },
    completed: { en: 'Completed', mm: 'ပြီးမြောက်ပြီး', ja: '来店済み' },
    pending: { en: 'Pending Approval', mm: 'အတည်ပြုရန် စောင့်ဆိုင်းနေ', ja: '承認待ち' },
    upcoming: { en: 'Upcoming', mm: 'လာမည့် စိုတ်ထားမှုများ', ja: '予約中' },
    all: { en: 'All', mm: 'အားလုံး', ja: 'すべて' },
    required: { en: 'Required', mm: 'မဖြစ်မနေ ဖြည့်ရန်', ja: '必須' },
    optional: { en: 'Optional', mm: 'မဖြစ်မနေ မဟုတ်ပါ', ja: '任意' },

    // Top Navigation & Shell
    forOwners: { en: 'For Restaurant Owners', mm: 'ဆိုင်ပိုင်ရှင်များ', ja: '掲載希望の飲食店様へ' },
    checkReservation: { en: 'Check Booking', mm: 'ဘွတ်ကင်စစ်ဆေးရန်', ja: '予約確認' },
    checkReservationTitle: { en: 'Check Reservation / Guest Lookup', mm: 'စိုတ်ထားမှု စစ်ဆေးရန်', ja: '予約確認・照会' },
    notifications: { en: 'Notifications', mm: 'အသိပေးချက်များ', ja: 'お知らせ' },
    language: { en: 'Language', mm: 'ဘာသာစကား', ja: '言語' },
    selectLanguage: { en: 'Select Language', mm: 'ဘာသာစကား ရွေးချယ်ပါ', ja: '言語を選択' },
    offlineModeNotice: { en: 'Offline Mode Active — Your saved bookings & QR passes remain available.', mm: 'လိုင်းမရှိပါ (Offline Mode) — သင်၏ QR Pass နှင့် စိုတ်ယူထားမှုများကို ကြည့်ရှုနိုင်ပါသည်', ja: 'オフラインモード - 保存済みの予約情報とQRコードは引き続き利用可能です。' },
    for_restaurant_owners: { en: 'For Restaurant Owners', mm: 'ဆိုင်ပိုင်ရှင်များ', ja: '飲食店掲載のご案内' },
    check_booking: { en: 'Check Booking', mm: 'ဘွတ်ကင်စစ်ဆေးရန်', ja: '予約確認' },
    check_reservation_lookup: { en: 'Check Reservation / Guest Lookup', mm: 'စိုတ်ထားမှု စစ်ဆေးရန်', ja: '予約確認・照会' },
    loggedOutToast: { en: 'Logged out successfully', mm: 'အကောင့်ထွက်ပြီးပါပြီ', ja: 'ログアウトしました' },

    // Bottom Navigation
    navHome: { en: 'Home', mm: 'ပင်မ', ja: 'ホーム' },
    navSearch: { en: 'Search', mm: 'ရှာဖွေရန်', ja: '検索' },
    navBookings: { en: 'Bookings', mm: 'စိုတ်ထားမှု', ja: '予約一覧' },
    navSaved: { en: 'Saved', mm: 'သိမ်းဆည်း', ja: 'お気に入り' },
    navMyPage: { en: 'My Page', mm: 'မိုင်ပေ့ချ်', ja: 'マイページ' },

    // Settings
    displayLanguage: { en: 'System Display Language', mm: 'စနစ်ပြသရေး ဘာသာစကား', ja: 'システム表示言語 (Language)' },
    displayLanguageSub: { en: 'Choose your preferred interface language across Yoyaku (EN / MM / JA)', mm: 'Yoyaku စနစ်တစ်ခုလုံးတွင် အသုံးပြုမည့် ဘာသာစကား ရွေးချယ်ပါ (အင်္ဂလိပ် / မြန်မာ / ဂျပန်)', ja: 'Yoyakuシステム全体で表示する言語を選択してください (EN / MM / JA)' },
    languageSavedToast: { en: 'Display language updated successfully!', mm: 'ဘာသာစကား အောင်မြင်စွာ ပြောင်းလဲပြီးပါပြီ။', ja: '表示言語を変更しました。' },
    currentLanguageLabel: { en: 'Current Language: ', mm: 'လက်ရှိ ရွေးချယ်ထားသော ဘာသာစကား: ', ja: '現在の設定: ' },
    accountSecurityPrefs: { en: 'Account Security & Preferences', mm: 'အကောင့် လုံခြုံရေးနှင့် ဆက်တင်များ', ja: 'アカウント設定・表示言語' },
    accountWithdrawnNotice: { en: 'This Account Has Been Withdrawn', mm: 'ဤအကောင့်ကို ဖျက်သိမ်းထားပါသည်', ja: 'このアカウントは退会手続き済みです' },
    accountWithdrawnSub: { en: 'You requested account deletion. Personal data anonymized.', mm: 'အကောင့်ဖျက်သိမ်းပြီးဖြစ်၍ အချက်အလက်များကို ပယ်ဖျက်ပြီးဖြစ်ပါသည်။', ja: 'アカウント削除がリクエストされ、個人情報は匿名化されています。' },
    reactivateAccount: { en: 'Reactivate Account (Demo)', mm: 'အကောင့် ပြန်လည်အသက်သွင်းမည် (Demo)', ja: 'アカウントを再有効化 (Demo)' },
    accountReactivatedToast: { en: 'Account reactivated successfully!', mm: 'အကောင့်ကို ပြန်လည်အသက်သွင်းပြီးပါပြီ', ja: 'アカウントを再有効化しました！' },

    // Core Booking Terms (Form fields)
    selectDate: { en: 'Select Date', mm: 'ရက်စွဲ ရွေးချယ်ပါ', ja: '日付を選択' },
    selectTime: { en: 'Select Time Slot', mm: 'အချိန် ရွေးချယ်ပါ', ja: '時間を選択' },
    selectParty: { en: 'Party Size', mm: 'ဧည့်သည် အရေအတွက်', ja: '人数' },
    seatingPreference: { en: 'Seating Preference', mm: 'လိုချင်သော ဝိုင်းအမျိုးအစား', ja: '希望座席' },
    specialRequests: { en: 'Special Requests', mm: 'အထူးမှာကြားချက်များ', ja: 'ご要望・アレルギー' },
    guestName: { en: 'Guest Name', mm: 'ဧည့်သည် အမည်', ja: 'お名前' },
    phoneNumber: { en: 'Phone Number', mm: 'ဖုန်းနံပါတ်', ja: '電話番号' },
    emailAddress: { en: 'Email Address', mm: 'အီးမေးလ်လိပ်စာ', ja: 'メールアドレス' },
    bookingNumber: { en: 'Booking Number', mm: 'ဘွတ်ကင် အမှတ်', ja: '予約番号' },
    digitalPass: { en: 'Digital QR Check-in Pass', mm: 'ဒစ်ဂျစ်တယ် QR ဝင်ရောက်ခွင့်ကတ်', ja: '来店用QRコード' },

    // Screen U-01: Booking Landing Page
    select_date_schedule: { en: 'Select Date & Schedule', mm: 'ရက်စွဲနှင့် အချိန် ရွေးချယ်ပါ', ja: '日時・空席選択' },
    realtime_availability_hint: { en: 'Real-time table availability updated instantly', mm: 'လွတ်လပ်စွာ စားသုံးနိုင်သော အချိန်ဇယားများ', ja: 'リアルタイムで空席を即時更新' },
    dinner_slots: { en: 'Dinner Service Slots', mm: 'ညစာ စားသုံးချိန်များ', ja: 'ディナータイム空席' },
    slots_available_count: { en: '6 Slots Available', mm: 'ရရှိနိုင်သော အချိန် ၆ ခု', ja: '空席 6枠' },
    slot_available: { en: 'Available', mm: 'အဆင်ပြေ', ja: '空席あり' },
    slot_limited: { en: 'Limited', mm: 'နီးကပ်', ja: '残りわずか' },
    party_size_title: { en: 'Party Size', mm: 'လူဦးရေ ရွေးချယ်ပါ', ja: 'ご来店人数' },
    party_size_hint: { en: 'Table configuration and guest seating tailored for comfort', mm: 'သက်တောင့်သက်သာ စားသုံးနိုင်ရန် စားပွဲ ပြင်ဆင်ပေးပါမည်', ja: 'ご人数に合わせた快適なお席をご用意いたします' },
    seating_area_preference: { en: 'Seating Area Preference', mm: 'နေရာ ထိုင်ခင်း အမျိုးအစား', ja: '希望座席タイプ' },
    seat_standard: { en: 'Standard', mm: 'ရိုးရိုး စားပွဲ', ja: '一般テーブル席' },
    seat_standard_sub: { en: 'Main Dining Floor', mm: 'အဓိက ခန်းမ', ja: 'メインフロア' },
    seat_window: { en: 'Window View', mm: 'ပြတင်းပေါက် ဘေး', ja: '窓際席' },
    seat_window_sub: { en: 'Garden & View', mm: 'ဥယျာဉ် ရှုခင်း', ja: '庭園・景色一望' },
    seat_counter: { en: "Chef's Counter", mm: 'စားဖိုမှူး ကောင်တာ', ja: 'シェフズカウンター' },
    seat_counter_sub: { en: 'Front Row View', mm: 'အနီးကပ် ချက်ပြုတ်မှု', ja: '調理風景を目の前で' },
    seat_private: { en: 'Private Room', mm: 'သီးသန့် အခန်း', ja: '完全個室' },
    seat_private_sub: { en: 'VIP Dining Suite', mm: 'ဗွီအိုင်ပီ သီးသန့်', ja: 'VIPプライベート' },
    reservation_summary_bar: { en: 'RESERVATION SUMMARY', mm: 'ရွေးချယ်ထားသော ဘွတ်ကင်အချက်အလက်များ', ja: '選択中の予約内容' },
    logged_in_as: { en: 'Logged in as', mm: 'အကောင့်ဝင်ရောက်ထားသူ -', ja: 'ログイン中:' },
    bypasses_login_hint: { en: 'Bypasses login & auto-fills profile', mm: 'အကောင့်ဝင်ပြီးဖြစ်၍ အချက်အလက်များ အလိုအလျောက် ဖြည့်ပေးမည်', ja: 'お客様情報自動入力・SMS認証不要' },
    instant_booking_available_hint: { en: 'Instant booking available for both registered members and guests', mm: 'အကောင့်ရှိသူရော ဧည့်သည်ပါ အလွယ်တကူ စိုတ်ယူနိုင်ပါသည်', ja: '会員様・ゲスト様ともに素早く予約可能です' },
    ezbooknow_home: { en: 'EzBookNow Home', mm: 'မူလစာမျက်နှာ', ja: 'ホーム' },
    proceed_to_booking: { en: 'Proceed to Booking', mm: 'ကြိုတင်မှာယူမည်', ja: '予約へ進む' },
    proceed_to_booking_auth: { en: 'Proceed to Booking', mm: 'ကြိုတင်မှာယူမည်', ja: '予約入力へ進む' },
    select_booking_option: { en: 'Select Booking Option', mm: 'မှာယူမည့် နည်းလမ်း ရွေးချယ်ပါ', ja: '予約方法の選択' },
    intercept_modal_desc: {
      en: 'Log in with your Yoyaku account to auto-fill your contact details, earn reward points, and skip SMS verification. Or continue as guest with phone number only.',
      mm: 'သင့် Yoyaku အကောင့်ဖြင့် ဝင်ရောက်ပါက အချက်အလက်များကို အလိုအလျောက် ဖြည့်ပေးမည်ဖြစ်ပြီး SMS OTP စစ်ဆေးရန် မလိုတော့ပါ။ အကောင့်မဖွင့်ဘဲ ဧည့်သည်အဖြစ်လည်း ဆက်လက်လုပ်ဆောင်နိုင်ပါသည်။',
      ja: 'アカウントでログインするとお客様情報が自動入力され、SMS認証も不要になります。アカウントなしでゲスト予約も可能です。'
    },
    login_or_create_fast: { en: 'Log In / Create Account (Fast)', mm: 'အကောင့်ဝင်ရောက်မည် (အချက်အလက်ဖြည့်ပြီး)', ja: 'ログインして自動入力' },
    continue_as_guest: { en: 'Continue as Guest', mm: 'ဧည့်သည်အဖြစ် ဆက်သွားမည်', ja: 'ゲストとして続ける' },

    // Screen U-02: Booking Input Form
    guest_details_title: { en: 'Guest Details', mm: 'ဧည့်သည် အချက်အလက် ဖြည့်သွင်းပါ', ja: 'お客様情報の入力' },
    contact_info_title: { en: 'Contact Information', mm: 'ဧည့်သည် အချက်အလက်များ', ja: 'お客様のご連絡先' },
    full_name_required: { en: 'Full Name *', mm: 'အမည် အပြည့်အစုံ *', ja: 'お名前 (フルネーム) *' },
    name_placeholder: { en: 'e.g. Evelyn St. Clair', mm: 'ဥပမာ - မောင်မောင်', ja: '例: 山田 太郎' },
    phone_sms_label: { en: 'Phone Number (for SMS Verification) *', mm: 'ဖုန်းနံပါတ် (SMS အတည်ပြုရန်) *', ja: '電話番号 (SMS認証用) *' },
    email_required_label: { en: 'Email Address *', mm: 'အီးမေးလ် လိပ်စာ *', ja: 'メールアドレス *' },
    special_requests_title: { en: 'Special Requests / Dietary Notes', mm: 'အထူး တောင်းဆိုချက်များ / စားသောက်မှု မှတ်ချက်', ja: 'ご要望・アレルギー等' },
    special_requests_placeholder: { en: 'Any allergies, celebration details, or seating notes...', mm: 'ဓာတ်မတည့်သည့် အစားအစာ၊ အထိမ်းအမှတ်ပွဲ သို့မဟုတ် အခြားမှတ်ချက်များ...', ja: 'アレルギーや記念日のお祝いなど...' },
    payment_preference_title: { en: 'Payment Preference', mm: 'ငွေပေးချေမှု ပုံစံ ရွေးချယ်ပါ', ja: 'お支払い方法の選択' },
    pay_qr_desc: { en: 'Instant QR payment option with promotional dining perk.', mm: 'QR ဖျောက်ခတ်ပြီး ချက်ချင်း ၅၀,၀၀၀ ကျပ် လျှော့ဈေး ရယူပါ။', ja: '即時QR決済（プロモーション割引適用）' },
    pay_at_restaurant: { en: 'Pay at Restaurant', mm: 'ဆိုင်တွင် ပေးချေမည်', ja: '来店時のお支払い' },
    pay_at_restaurant_desc: { en: 'No upfront charge. Settle bill after dining at venue.', mm: 'ကြိုတင် ပေးချေရန် မလိုပါ။ စားသောက်ပြီးမှ ဆိုင်တွင် ပေးချေပါ။', ja: '事前決済不要。ご来店後に現地にてお支払い。' },
    back_to_date_slots: { en: 'Back to Date & Slots', mm: 'နောက်သို့', ja: '戻る: 日時・人数選択' },
    continue_to_confirm: { en: 'Continue to Confirmation', mm: 'အတည်ပြုချက် စစ်ဆေးမည်', ja: '次へ: 予約内容の確認' },

    // Screen U-03: Booking Confirmation
    confirm_reservation_heading: { en: 'Confirm Reservation', mm: 'ဘွတ်ကင် အချက်အလက် အတည်ပြုပါ', ja: '予約内容のご確認' },
    restaurant_table_details: { en: 'Restaurant & Table Details', mm: 'ဆိုင်နှင့် စားပွဲဝိုင်း အချက်အလက်', ja: '店舗・ご予約情報' },
    guest_payment_info: { en: 'Guest & Payment Information', mm: 'ဧည့်သည်နှင့် ငွေပေးချေမှု အချက်အလက်', ja: 'お客様・お支払い情報' },
    guest_name: { en: 'Guest Name', mm: 'ဧည့်သည် အမည်', ja: 'お名前' },
    phone_number: { en: 'Phone Number', mm: 'ဖုန်းနံပါတ်', ja: '電話番号' },
    email_address: { en: 'Email Address', mm: 'အီးမေးလ်', ja: 'メールアドレス' },
    payment_preference: { en: 'Payment Preference', mm: 'ငွေပေးချေမှု ပုံစံ', ja: 'お支払い方法' },
    special_requests: { en: 'Special Requests / Dietary Notes', mm: 'အထူး တောင်းဆိုချက် / မှတ်ချက်', ja: 'ご要望・アレルギー等' },
    estimated_pricing_breakdown: { en: 'Estimated Pricing Breakdown', mm: 'ခန့်မှန်းခြေ ကုန်ကျစရိတ် တွက်ချက်မှု', ja: 'お見積り明細' },
    experience_tasting_menu: { en: 'Experience Tasting Menu', mm: 'အထူး ဟင်းပွဲ မီနူး', ja: 'ディナーコース' },
    wine_pairing: { en: 'Sommelier Wine Pairing', mm: 'ဝိုင် တွဲဖက် သောက်သုံးမှု', ja: 'ワインペアリング' },
    qr_instant_discount: { en: 'KBZPay / QR Instant Discount', mm: 'KBZPay / QR အထူး လျှော့ဈေး', ja: 'KBZPay / QR 即時割引' },
    commercial_tax: { en: 'Commercial Tax (8.5%)', mm: 'ကုန်သွယ်ခွန် (၈.၅%)', ja: '商業税 (8.5%)' },
    service_charge: { en: 'Service Charge (18%)', mm: 'ဝန်ဆောင်ခ (၁၈%)', ja: 'サービス料 (18%)' },
    estimated_total: { en: 'Estimated Total', mm: 'စုစုပေါင်း ခန့်မှန်းကုန်ကျစရိတ်', ja: '合計（概算）' },
    terms_agreement: { en: 'I agree to the cancellation policy and restaurant terms of service.', mm: 'ပယ်ဖျက်ခြင်းဆိုင်ရာ စည်းမျဉ်းများနှင့် စည်းကမ်းချက်များကို သဘောတူပါသည်။', ja: 'キャンセルポリシーおよび利用規約に同意します。' },
    back_to_details: { en: 'Back to Details', mm: 'နောက်သို့', ja: '戻る: お客様情報' },
    confirm_and_complete: { en: 'Confirm & Complete', mm: 'ကြိုတင်မှာယူမှု အတည်ပြုမည်', ja: '予約を確定する' },
    reservation_confirmed_toast: { en: 'Reservation confirmed!', mm: 'ဘွတ်ကင် အောင်မြင်စွာ တင်ပြီးပါပြီ။', ja: '予約が完了しました！' },
    pay_qr_promo_label: { en: 'KBZPay / AYA Pay QR (Promo Applied)', mm: 'KBZPay / AYA Pay QR (၅၀,၀၀၀ ကျပ် လျှော့ပြီး)', ja: 'KBZPay / AYA Pay QR (割引適用)' },

    // Screen U-04: Booking Complete & QR Pass
    step3_complete: { en: 'Complete', mm: 'ပြီးမြောက်ပါပြီ', ja: '予約完了' },
    reservation_confirmed_title: { en: 'Reservation Confirmed!', mm: 'ကြိုတင်မှာယူမှု အောင်မြင်ပါသည်။', ja: 'ご予約が完了しました！' },
    reservation_confirmed_sub: { en: 'Your table is reserved. Present this contactless QR pass upon arrival.', mm: 'ဆိုင်သို့ ရောက်ရှိသောအခါ အောက်ပါ ဒစ်ဂျစ်တယ် QR Pass ကို ပြသပါ။', ja: 'ご来店時にこちらのQRコードをご提示ください。' },
    reservation_reference: { en: 'Reservation Reference', mm: 'ဘွတ်ကင် နံပါတ်', ja: '予約番号' },
    guest_access_notice: { en: 'Guest Access Notice', mm: 'ဧည့်သည် စစ်ဆေးခြင်း အသိပေးချက်', ja: 'ゲスト照会のご案内' },
    guest_access_notice_text: {
      en: 'Save your booking reference number. You can look up and cancel your booking anytime without an account via "Lookup Reservation".',
      mm: 'သင်၏ ဘွတ်ကင်နံပါတ်ကို မှတ်သားထားပါ။ အကောင့်မဖွင့်ဘဲ "ဘွတ်ကင်စစ်ဆေးရန်" မှ အချိန်မရွေး ပြန်လည်ကြည့်ရှု/ပယ်ဖျက်နိုင်ပါသည်။',
      ja: '予約番号をお控えください。アカウントをお持ちでない場合も「予約確認」からいつでも照会・キャンセルが可能です。'
    },
    view_booking_details: { en: 'View Booking Details', mm: 'ဘွတ်ကင် အသေးစိတ် ကြည့်မည်', ja: '予約詳細を見る' },
    lookup_via_guest_flow: { en: 'Lookup This Booking via Guest Flow', mm: 'ဧည့်သည် ရှာဖွေမှုဖြင့် ချက်ချင်း စစ်ဆေးမည်', ja: 'ゲスト照会画面で確認する' },
    go_to_mypage: { en: 'Go to My Page', mm: 'မိုင်ပေ့ဂျ် သို့ သွားမည်', ja: 'マイページへ' },
    return_to_home: { en: 'Return to EzBookNow Home', mm: 'EzBookNow ပင်မစာမျက်နှာ', ja: 'ホームへ戻る' },

    // Screen U-05: Restaurant Store Information
    back_to_booking: { en: 'Back to Booking', mm: 'ကြိုတင်ဘွတ်ကင် သို့', ja: '予約ページへ戻る' },
    add_to_favorites: { en: 'Add to favorites', mm: 'အကြိုက်ဆုံးသို့ ထည့်မည်', ja: 'お気に入りに追加' },
    remove_from_favorites: { en: 'Remove from favorites', mm: 'အကြိုက်ဆုံးမှ ဖယ်ရှားမည်', ja: 'お気に入りから削除' },
    open_gallery: { en: 'Open restaurant gallery', mm: 'စားသောက်ဆိုင် ဓာတ်ပုံပြခန်း ဖွင့်မည်', ja: '写真ギャラリーを開く' },
    view_gallery: { en: 'View Gallery', mm: 'ပုံများကြည့်ရန်', ja: '写真を見る' },
    special_notice: { en: 'Special Announcement / Notice', mm: 'အထူးအသိပေးချက် (Notice)', ja: '店舗からのお知らせ' },
    price_range: { en: 'Price Range', mm: 'စျေးနှုန်း', ja: '予算' },
    cuisine_style: { en: 'Cuisine Style', mm: 'အစားအစာအမျိုးအစား', ja: '料理ジャンル' },
    opening_hours: { en: 'Opening Hours', mm: 'ဖွင့်ချိန်', ja: '営業時間' },
    public_phone: { en: 'Public Phone:', mm: 'ဆက်သွယ်ရန် ဖုန်းနံပါတ်:', ja: '電話番号:' },
    tab_overview: { en: 'Overview', mm: 'ဆိုင်အချက်အလက်', ja: '店舗情報' },
    tab_menus: { en: 'Menus', mm: 'မီနူးများ', ja: 'メニュー' },
    tab_reviews: { en: 'Reviews', mm: 'ထင်မြင်ချက်များ', ja: '口コミ' },
    about_this_shop: { en: 'About This Shop', mm: 'ဆိုင်အကြောင်း (About)', ja: 'お店の紹介' },
    facilities_amenities: { en: 'Facilities & Amenities', mm: 'အဆောက်အအုံနှင့် ဝန်ဆောင်မှုများ (Facilities)', ja: '設備・サービス' },
    photo_gallery_title: { en: 'Photo Gallery', mm: 'ဆိုင်၏ ပုံပြခန်း (Gallery)', ja: 'フォトギャラリー' },
    location_and_map: { en: 'Location & Map', mm: 'တည်နေရာနှင့် မြေပုံ', ja: 'アクセス・地図' },
    open_in_google_maps: { en: 'Open in Google Maps', mm: 'Google Maps တွင်ဖွင့်မည်', ja: 'Google Mapsで開く' },
    popular_dishes: { en: 'Popular Dishes', mm: 'လူကြိုက်များသော ဟင်းလျာများ', ja: 'おすすめ料理' },
    items_suffix: { en: 'items', mm: 'ခု', ja: '品' },
    verified_guest_reviews: { en: 'verified guest reviews', mm: 'ခု စုစုပေါင်း သုံးသပ်ချက်', ja: '件の口コミ' },
    service_label: { en: 'Service', mm: 'ဝန်ဆောင်မှု (Service)', ja: 'サービス' },
    value_label: { en: 'Value', mm: 'ဈေးနှုန်းနှင့် တန်ဖိုး (Value)', ja: 'コスパ' },
    ambience_label: { en: 'Ambience', mm: 'ပတ်ဝန်းကျင် (Atmosphere)', ja: '雰囲気' },
    verified_diner: { en: 'Verified Diner', mm: 'အတည်ပြုပြီး အလည်အပတ်', ja: '認証済み来店者' },
    no_reviews_yet: { en: 'No reviews yet.', mm: 'မှတ်ချက် မရှိသေးပါ။ ပထမဆုံး သုံးသပ်ချက် ပေးပို့နိုင်ပါသည်။', ja: 'まだレビューがありません。' },
    instant_reservation: { en: 'Instant Reservation', mm: 'ချက်ချင်း စာပွဲ ကြိုတင်ယူခြင်း', ja: '即時予約' },
    book_a_table: { en: 'Book a Table', mm: 'စာပွဲ ကြိုတင်မှာယူမည်', ja: 'テーブルを予約する' },
    zero_booking_fees: { en: 'Zero booking fees. Instant confirmation.', mm: 'အပိုကြေးမရှိပါ။ ချက်ချင်း အတည်ပြုချက်ရရှိပါမည်။', ja: '手数料無料・即時予約確定' },
    confirmation_pass_stored: { en: 'Instant confirmation pass stored in app', mm: 'အတည်ပြုချက် လက်မှတ်ကို အက်ပ်အတွင်း သိမ်းဆည်းပေးပါမည်', ja: 'アプリ内に来店パスが保存されます' },
    close_gallery_lightbox: { en: 'Close gallery lightbox', mm: 'ဓာတ်ပုံပြခန်း ပိတ်မည်', ja: 'ギャラリーを閉じる' },
    prev_image: { en: 'Previous', mm: 'ယခင်ပုံ', ja: '前の写真' },
    next_image: { en: 'Next', mm: 'နောက်ပုံ', ja: '次の写真' },

    // Screen U-06: Login & Guest Reservation Lookup
    lookupByNo: { en: 'Lookup by Booking No.', mm: 'ဘွတ်ကင်အမှတ်ဖြင့် ရှာရန်', ja: '予約番号で照会' },
    enterBookingNo: { en: 'Enter Booking Number', mm: 'ဘွတ်ကင်အမှတ် ရိုက်ထည့်ပါ', ja: '予約番号を入力' },
    enterPhoneForLookup: { en: 'Enter Phone Number used for Booking', mm: 'မှာယူစဉ်က ဖုန်းနံပါတ် ရိုက်ထည့်ပါ', ja: '予約時の電話番号を入力' },
    login_tab_btn: { en: 'Login', mm: 'အကောင့်ဝင်ရန်', ja: 'ログイン' },
    lookup_tab_btn: { en: 'Lookup Reservation', mm: 'ဘွတ်ကင်စစ်ဆေးရန်', ja: '予約確認' },
    lookup_info_text: {
      en: 'If you booked without an account, you can easily view, verify, and cancel your reservation using your reservation code and registered phone number.',
      mm: 'အကောင့်မဖွင့်ဘဲ ဘွတ်ကင်ယူထားပါက သင်၏ ဘွတ်ကင်နံပါတ်နှင့် ဖုန်းနံပါတ်ဖြင့် အသေးစိတ်ကြည့်ရှုနိုင်ပြီး ပယ်ဖျက်နိုင်ပါသည်။',
      ja: 'アカウントをお持ちでない場合でも、予約番号とお電話番号を入力することで予約の照会・キャンセルが可能です。'
    },
    continue_with_facebook: { en: 'Continue with Facebook', mm: 'Facebook ဖြင့် ဆက်လက်လုပ်ဆောင်မည်', ja: 'Facebookで続ける' },
    continue_with_google: { en: 'Continue with Google', mm: 'Google ဖြင့် ဆက်လက်လုပ်ဆောင်မည်', ja: 'Googleで続ける' },
    login_with_email: { en: 'Login with Email', mm: 'အီးမေးလ်ဖြင့် ဝင်မည်', ja: 'メールでログイン' },
    continue_as_guest: { en: 'Continue as Guest', mm: 'ဧည့်သည်အဖြစ် ဆက်လက်လုပ်ဆောင်မည်', ja: 'ゲストとして予約' },
    continue_as_guest_sub: { en: 'Book with just your phone number, no registration needed.', mm: 'ဖုန်းနံပါတ်ဖြင့်သာ ဘွတ်ကင်ယူနိုင်ပြီး အကောင့်ဖွင့်ရန် မလိုပါ', ja: '会員登録なしでお電話番号のみでご予約いただけます。' },
    back_to_options: { en: 'Back to Options', mm: 'ရွေးချယ်မှုများသို့', ja: 'ログイン方法の選択へ戻る' },
    email_sign_in_heading: { en: 'Email Sign In', mm: 'အီးမေးလ်ဖြင့် ဝင်ရောက်ခြင်း', ja: 'メールログイン' },
    forgot_password: { en: 'Forgot password?', mm: 'စကားဝှက် မေ့နေပါသလား?', ja: 'パスワードをお忘れですか？' },
    remember_me: { en: 'Remember me', mm: 'အကောင့် မှတ်ထားမည်', ja: 'ログイン状態を保持する' },
    dont_have_account: { en: "Don't have an account?", mm: 'အကောင့် မရှိသေးပါက', ja: 'アカウントをお持ちでない方' },
    sign_up_here: { en: 'Sign up here', mm: 'ဒီနေရာတွင် အကောင့်သစ်ဖွင့်ပါ', ja: '新規会員登録はこちら' },
    reset_password: { en: 'Reset Password', mm: 'စကားဝှက် ပြန်လည်သတ်မှတ်ရန်', ja: 'パスワードの再設定' },
    reset_link_sent_title: { en: 'Reset Link Sent Successfully', mm: 'စကားဝှက် ပြောင်းလဲရန် လင့်ခ် ပေးပို့ပြီးပါပြီ', ja: '再設定リンクを送信しました' },
    reset_link_sent_sub: { en: 'Please check your email inbox to reset your password.', mm: 'သင့်အီးမေးလ် inbox ထဲတွင် လင့်ခ်ကို စစ်ဆေးပေးပါ', ja: 'メールボックスをご確認の上、再設定を行ってください。' },
    return_to_login: { en: 'Return to Login', mm: 'အကောင့်ဝင်ရန် ပြန်သွားမည်', ja: 'ログインへ戻る' },
    reset_instructions: { en: 'Enter your registered email address to receive password reset instructions.', mm: 'သင့်အကောင့် အီးမေးလ်ကို ထည့်ပါ။ စကားဝှက်အသစ် ပြောင်းလဲရန် လင့်ခ် ပေးပို့ပါမည်။', ja: 'ご登録のメールアドレスを入力してください。再設定のご案内をお送りします。' },
    send_reset_link: { en: 'Send Reset Link', mm: 'လင့်ခ် ပေးပို့မည်', ja: '再設定メールを送信' },
    create_account_heading: { en: 'Create Account', mm: 'အကောင့်သစ် ဖွင့်ရန်', ja: '新規会員登録' },
    full_name: { en: 'Full Name', mm: 'အမည်', ja: 'お名前' },
    email: { en: 'Email', mm: 'အီးမေးလ်', ja: 'メールアドレス' },
    password: { en: 'Password', mm: 'စကားဝှက်', ja: 'パスワード' },
    complete_registration: { en: 'Complete Registration', mm: 'အကောင့် အတည်ပြုဖွင့်မည်', ja: '登録を完了する' },
    privacy_policy: { en: 'Privacy Policy', mm: 'ကိုယ်ရေးလုံခြုံမှု မူဝါဒ', ja: 'プライバシーポリシー' },
    terms_of_service: { en: 'Terms of Service', mm: 'စည်းမျဉ်းနှင့် သတ်မှတ်ချက်များ', ja: '利用規約' },
    account_created_success: { en: 'Account created successfully!', mm: 'အကောင့်အသစ် အောင်မြင်စွာ ဖွင့်ပြီးပါပြီ', ja: 'アカウントが正常に作成されました！' },
    reservation_copied_toast: { en: 'Copied reservation code', mm: 'ဘွတ်ကင်နံပါတ် ကူးယူပြီးပါပြီ', ja: '予約番号をコピーしました' },
    test_sample_bookings: { en: 'Test with sample bookings:', mm: 'စမ်းသပ်ရန် နမူနာ အချက်အလက်များ:', ja: 'テスト用サンプル予約:' },
    recent_lookup_label: { en: 'Recent:', mm: 'လတ်တလော:', ja: '最新:' },
    reservation_number_field: { en: 'Reservation Number', mm: 'ဘွတ်ကင် နံပါတ်', ja: '予約番号' },
    reservation_number_placeholder: { en: 'e.g. RSV-665304 or RES-2026-002', mm: 'ဥပမာ RSV-665304 သို့မဟုတ် RES-2026-002', ja: '例: RSV-665304 または RES-2026-002' },
    invalid_code_error: { en: 'Please enter a valid reservation code (e.g. RSV-665304)', mm: 'နံပါတ် ပုံစံမမှန်ပါ (ဥပမာ RSV-665304)', ja: '有効な予約番号を入力してください (例: RSV-665304)' },
    phone_lookup_placeholder: { en: 'Phone Number (e.g. 09791234567)', mm: 'ဖုန်းနံပါတ် (ဥပမာ 09791234567)', ja: 'お電話番号 (例: 09791234567)' },
    lookup_submit_btn: { en: 'Look up reservation', mm: 'ဘွတ်ကင် ရှာဖွေမည်', ja: '予約を照会する' },
    copy_reservation_id: { en: 'Copy Reservation ID', mm: 'ဘွတ်ကင် နံပါတ် ကူးယူရန်', ja: '予約番号をコピー' },
    date_label: { en: 'Date', mm: 'ရက်စွဲ', ja: '日付' },
    time_label: { en: 'Time', mm: 'အချိန်', ja: '時間' },
    guests_label: { en: 'Guests', mm: 'လူဦးရေ', ja: '人数' },
    view_full_details_btn: { en: 'View Full Details', mm: 'မှာယူမှု အသေးစိတ်', ja: '予約詳細を見る' },
    pass_btn_label: { en: 'Pass', mm: 'ဝင်ခွင့်ကတ်', ja: 'パス' },
    cancel_booking_action: { en: 'Cancel Booking', mm: 'ဘွတ်ကင် ပယ်ဖျက်ရန်', ja: '予約をキャンセル' },
    clear_and_search_another: { en: 'Clear & Search Another', mm: 'အသစ်ပြန်ရှာမည်', ja: '新しい検索' },
    digital_dining_pass: { en: 'Digital Dining Pass', mm: 'ဒီဂျစ်တယ် ဝင်ခွင့်ကတ်', ja: 'デジタルお食事パス' },
    reservation_no_colon: { en: 'Reservation No:', mm: 'ဘွတ်ကင် နံပါတ်:', ja: '予約番号:' },
    date_and_time: { en: 'Date & Time:', mm: 'ရက်စွဲနှင့် အချိန်:', ja: '日時:' },
    party_size_colon: { en: 'Party Size:', mm: 'လူဦးရေ:', ja: '人数:' },
    present_pass_prompt: {
      en: 'Present this digital QR pass to the restaurant host upon arrival for prompt seating.',
      mm: 'စားသောက်ဆိုင်သို့ ရောက်ရှိချိန်တွင် စားပွဲဝိုင်း ချက်ချင်းရရှိရန် ဤ QR ကုဒ်ကို ဝန်ထမ်းများအား ပြသပေးပါ။',
      ja: 'ご来店時にレストラン受付にてこちらのQRコードをご提示ください。'
    },
    close_pass_btn: { en: 'Close Pass', mm: 'ပိတ်မည်', ja: '閉じる' },
    cancel_reservation_heading: { en: 'Cancel Reservation', mm: 'ဘွတ်ကင် ပယ်ဖျက်ရန်', ja: '予約のキャンセル' },
    reason_for_cancellation: { en: 'Reason for cancellation:', mm: 'ပယ်ဖျက်ရသည့် အကြောင်းအရင်း:', ja: 'キャンセル理由:' },
    reason_change_plans: { en: 'Change of plans or schedule', mm: 'အစီအစဉ် ရက်စွဲ ပြောင်းလဲသွားခြင်း', ja: '予定の変更' },
    reason_emergency: { en: 'Personal emergency or illness', mm: 'အရေးပေါ်ကိစ္စ သို့မဟုတ် ကျန်းမာရေး', ja: '急用・体調不良' },
    reason_other: { en: 'Other reason', mm: 'အခြား အကြောင်းအရင်း', ja: 'その他' },
    cancellation_fee: { en: 'Cancellation Fee:', mm: 'ပယ်ဖျက်ခ:', ja: 'キャンセル手数料:' },
    free_mmk: { en: 'Free (0 MMK)', mm: 'အခမဲ့ (၀ ကျပ်)', ja: '無料 (0 MMK)' },
    keep_booking: { en: 'Keep Booking', mm: 'မလုပ်တော့ပါ', ja: '予約を維持' },
    confirm_cancel: { en: 'Confirm Cancel', mm: 'အတည်ပြု ပယ်ဖျက်မည်', ja: 'キャンセル確定' },
    browsing_as_guest: { en: 'Browsing as Guest', mm: 'ဧည့်သည်အဖြစ် ဆက်လက်ဝင်ရောက်ထားပါသည်', ja: 'ゲストとして閲覧中' },
    please_enter_res_no: { en: 'Please enter your reservation number.', mm: 'ဘွတ်ကင်နံပါတ် ရိုက်ထည့်ပေးပါ။', ja: '予約番号を入力してください。' },
    reservation_found: { en: 'Reservation found!', mm: 'ဘွတ်ကင် အချက်အလက် တွေ့ရှိပါသည်', ja: '予約情報が見つかりました！' },
    reservation_not_found: { en: 'Reservation not found. Please check your reservation number and phone number.', mm: 'ဘွတ်ကင်နံပါတ် သို့မဟုတ် ဖုန်းနံပါတ် မှားယွင်းနေပါသည်။ စစ်ဆေးပြီး ထပ်မံကြိုးစားပါ။', ja: '予約情報が見つかりませんでした。予約番号とお電話番号をご確認ください。' },

    // Screen U-07: Member Signup & Registration
    create_your_account: { en: 'Create Your Account', mm: 'အကောင့်အသစ် ဖွင့်ပါ', ja: '新規アカウント登録' },
    register_facebook: { en: 'Register with Facebook', mm: 'Facebook ဖြင့် အကောင့်ဖွင့်ရန်', ja: 'Facebookで登録' },
    register_google: { en: 'Register with Google', mm: 'Google ဖြင့် အကောင့်ဖွင့်ရန်', ja: 'Googleで登録' },
    register_email: { en: 'Register with Email', mm: 'အီးမေးလ်ဖြင့် အကောင့်ဖွင့်ရန်', ja: 'メールアドレスで登録' },
    full_name_required_label: { en: 'Full Name *', mm: 'အမည် (Full Name) *', ja: 'お名前 *' },
    full_name_register_placeholder: { en: 'e.g. Alex Aung', mm: 'ဥပမာ - မောင်မောင် သို့မဟုတ် Alex Aung', ja: '例: 山田 太郎' },
    name_character_hint: { en: '1-100 characters (Unicode & English supported)', mm: 'စာလုံးရေ ၁ မှ ၁၀၀ လုံးအတွင်း (မြန်မာ/အင်္ဂလိပ် ရေးနိုင်ပါသည်)', ja: '1〜100文字 (日本語・英語対応)' },
    email_address_field: { en: 'Email Address *', mm: 'အီးမေးလ်လိပ်စာ (Email Address) *', ja: 'メールアドレス *' },
    email_verification_link_hint: { en: 'Verification link will be sent to this email', mm: 'အတည်ပြုလင့်ခ် (MAIL-01) လက်ခံရရှိရန် မှန်ကန်သောအီးမေးလ် ထည့်ပါ', ja: '認証リンクがこのメールアドレスに送信されます' },
    password_field: { en: 'Password *', mm: 'စကားဝှက် (Password) *', ja: 'パスワード *' },
    password_rules_hint: { en: 'Min 8 characters, alphanumeric required', mm: 'အနည်းဆုံး ၈ လုံးရှိရမည်ဖြစ်ပြီး အင်္ဂလိပ်စာလုံးနှင့် ဂဏန်းများ ပါဝင်ရမည်', ja: '半角英数8文字以上' },
    confirm_password_field: { en: 'Confirm Password *', mm: 'စကားဝှက်အတည်ပြုခြင်း (Confirm Password) *', ja: 'パスワード確認 *' },
    phone_number_optional: { en: 'Phone Number', mm: 'ဖုန်းနံပါတ် (Phone Number)', ja: '電話番号' },
    terms_agreement_label: { en: 'I agree to EzBookNow Terms of Service & Privacy Policy *', mm: 'EzBookNow ၏ အသုံးပြုမှုစည်းမျဉ်းများနှင့် ကိုယ်ရေးလုံခြုံမှုမူဝါဒကို သဘောတူပါသည် *', ja: '利用規約およびプライバシーポリシーに同意する *' },
    creating_account_loading: { en: 'Creating Account...', mm: 'အကောင့်ဖွင့်နေပါသည်...', ja: 'アカウント作成中...' },
    create_account_btn: { en: 'Create Account', mm: 'အကောင့်ဖွင့်မည်', ja: 'アカウントを作成' },
    already_have_account: { en: 'Already have an account?', mm: 'အကောင့်ရှိပြီးသားဖြစ်ပါက', ja: 'すでにアカウントをお持ちですか？' },
    signin_here: { en: 'Sign In here', mm: 'ဒီနေရာတွင် အကောင့်ဝင်ပါ', ja: 'こちらからログイン' },

    // Screen U-08: Password Reset
    reset_password: { en: 'Reset Password', mm: 'စကားဝှက် ပြန်လည်သတ်မှတ်ရန်', ja: 'パスワード再設定' },
    reset_password_desc: { en: 'Enter your registered email address and we will send a password reset link.', mm: 'မှတ်ပုံတင်ထားသော အီးမေးလ်လိပ်စာ ရိုက်ထည့်ပါ။ စကားဝှက်ပြန်လည်သတ်မှတ်ရန် လင့်ခ်ပေးပို့ပါမည်။', ja: 'ご登録のメールアドレス宛に再設定リンクをお送りします。' },
    send_reset_link: { en: 'Send Reset Link', mm: 'လင့်ခ် ပေးပို့မည်', ja: '再設定リンクを送信' },
    set_new_password: { en: 'Set New Password', mm: 'စကားဝှက် အသစ် သတ်မှတ်ပါ', ja: '新しいパスワードを設定' },
    new_password: { en: 'New Password', mm: 'စကားဝှက် အသစ်', ja: '新しいパスワード' },
    confirm_new_password: { en: 'Confirm New Password', mm: 'စကားဝှက် အသစ် အတည်ပြုပါ', ja: '新しいパスワードの確認' },
    reset_email_sent: { en: 'Reset link sent successfully!', mm: 'ပြန်လည်သတ်မှတ်ရန် လင့်ခ် ပို့ပြီးပါပြီ', ja: '再設定リンクを送信しました' },
    passwords_not_match: { en: 'Passwords do not match', mm: 'စကားဝှက်များ မတူညီပါ', ja: 'パスワードが一致しません' },
    password_updated: { en: 'Password updated successfully!', mm: 'စကားဝှက် အောင်မြင်စွာ ပြောင်းလဲပြီးပါပြီ', ja: 'パスワードを更新しました' },

    // Screen U-09: My Page & Dashboard
    reservation_history: { en: 'Reservation History', mm: 'စိုတ်ထားမှု မှတ်တမ်း', ja: '予約履歴' },
    no_reservations_found: { en: 'No reservations found', mm: 'စိုတ်ထားမှု မှတ်တမ်း မရှိသေးပါ', ja: '予約履歴はありません' },
    no_reservations_msg: {
      en: 'You have no reservations. Browse our curated dining catalog to book your next experience.',
      mm: 'ရန်ကုန်မြို့ရှိ အဆင့်မြင့် စားသောက်ဆိုင်များကို ရှာဖွေပြီး စားပွဲဝိုင်း ချက်ချင်း စိုတ်ယူလိုက်ပါ',
      ja: 'レストランを探して特別なひとときを予約しましょう。'
    },
    explore_restaurants: { en: 'Explore Restaurants', mm: 'ဆိုင်များ ရှာဖွေရန်', ja: 'レストランを探す' },
    rebook: { en: 'Rebook', mm: 'ပြန်စိုတ်ရန်', ja: '再予約' },
    saved_favorites: { en: 'Saved Favorites', mm: 'အကြိုက်ဆုံး ဆိုင်များ', ja: 'お気に入り' },
    vouchers_coupons: { en: 'Vouchers & Promo Codes', mm: 'ဘောက်ချာနှင့် ကူပွန်များ', ja: 'クーポン' },
    points_vip: { en: 'Points & VIP Membership', mm: 'အမှတ်နှင့် အသင်းဝင်အဆင့်', ja: 'ポイント・会員ランク' },
    notification_center: { en: 'Notification Center', mm: 'အသိပေးချက် စင်တာ', ja: 'お知らせ' },
    mark_all_read: { en: 'Mark all as read', mm: 'အားလုံး ဖတ်ပြီးကြောင်း မှတ်သားရန်', ja: 'すべて既読にする' },
    no_notifications: { en: 'No notifications', mm: 'အသိပေးချက် မရှိသေးပါ', ja: 'お知らせはありません' },
    all_caught_up: { en: "You're all caught up!", mm: 'အသိပေးချက်အားလုံး ဖတ်ပြီးပါပြီ', ja: 'すべて確認済みです' },
    system_announcements: { en: 'System Announcements', mm: 'အထူး ကြေညာချက်များ', ja: 'お知らせ' },
    account_settings: { en: 'Account Settings', mm: 'အကောင့် ဆက်တင်', ja: 'アカウント設定' },
    back_to_reservations: { en: 'Back to Reservations', mm: 'ကြိုတင်စာရင်းများသို့', ja: '予約一覧へ' },
    back_to_discover: { en: 'Back to Discover', mm: 'ပင်မ ရှာဖွေရေးသို့', ja: 'ホームへ' },
    back_to_lookup: { en: 'Back to Lookup', mm: 'ဧည့်သည် စစ်ဆေးမှုသို့', ja: '照会画面へ' },
    call_restaurant: { en: 'Call Restaurant', mm: 'ဆိုင်သို့ ဖုန်းခေါ်ဆိုရန်', ja: '電話をかける' },

    // Screen U-12: Service Introduction (Root LP)
    lp_hero_title: { en: 'EzBookNow — Modern Dining & Table Reservations', mm: 'EzBookNow မြန်မာနိုင်ငံ၏ စားပွဲကြိုတင်ရယူစနစ်', ja: 'ミャンマー最高峰の厳選レストラン・即時予約' },
    lp_hero_subtitle: {
      en: 'Reserve tables at the most exclusive restaurants in Yangon with instant confirmation and contactless check-in passes.',
      mm: 'ရန်ကုန်မြို့၏ ထိပ်တန်းစားသောက်ဆိုင်များတွင် စားပွဲဝိုင်းများကို ချက်ချင်း အတည်ပြုချက်နှင့် ဒစ်ဂျစ်တယ် QR Pass ဖြင့် အလွယ်တကူ စိုတ်ယူနိုင်ပါသည်',
      ja: 'ヤンゴンの最高峰レストランを即時予約。来店用QRパスでスマートにご案内いたします。'
    },
    experience_direct_booking: { en: 'Experience Direct Booking', mm: 'အထူးစားသောက်ဆိုင် ချက်ချင်းဘွတ်ကင်လုပ်မည်', ja: '今すぐテーブルを予約' },
    how_it_works: { en: 'How EzBookNow Works', mm: 'စားပွဲကြိုတင်ရယူပုံ အဆင့်ဆင့်', ja: 'ご利用の流れ' },
    how_it_works_sub: { en: 'Fast & Seamless in 3 Steps', mm: 'လွယ်ကူမြန်ဆန်သော အဆင့် ၃ ဆင့်', ja: 'わずか3ステップで完了' },
    step1_desc: { en: 'Select Slot & Party', mm: 'ရက်စွဲနှင့် အချိန် ရွေးချယ်ပါ', ja: '日時・人数を選択' },
    step2_desc: { en: 'Input Details & Verify', mm: 'အချက်အလက် ဖြည့်သွင်း အတည်ပြုပါ', ja: 'お客様情報の入力・認証' },
    step3_desc: { en: 'Instant Digital QR Pass', mm: 'ချက်ချင်း QR Pass ရယူပါ', ja: '来店用QRコードの発行' },
    featured_restaurants: { en: 'Featured Restaurants', mm: 'နာမည်ကြီး စားသောက်ဆိုင်များ', ja: '注目の名店' },
    for_partners: { en: 'For Restaurant Partners', mm: 'ဆိုင်ရှင်များအတွက်', ja: '飲食店掲載のご案内' },
    for_partners_sub: { en: 'Grow your table reservations with EzBookNow', mm: 'သင်၏ ဆိုင်တွင် EzBookNow ကြိုတင်ဘွတ်ကင်စနစ်ကို အသုံးပြုလိုပါသလား?', ja: 'EzBookNowで集客・テーブル予約を加速' },
    partner_cta: { en: 'Join as Restaurant Partner', mm: 'မိတ်ဖက်အဖြစ် ဆက်သွယ်ရန်', ja: '掲載のお問い合わせ' },

    // Screen U-13: SMS OTP Verification Modal
    sms_verification: { en: 'SMS Verification', mm: 'SMS အတည်ပြုကုဒ် ရိုက်ထည့်ပါ', ja: 'SMS認証コードの入力' },
    sms_sent_prefix: { en: 'A 6-digit verification code was sent via SMS to', mm: 'ဂဏန်း ၆ လုံးပါ လျှို့ဝှက်အတည်ပြုကုဒ်ကို SMS ပေးပို့ထားပါသည်:', ja: '宛てに送信された6桁の認証コードを入力してください:' },
    enter_code_label: { en: 'Enter 6-Digit Code', mm: 'အတည်ပြုကုဒ် (ဂဏန်း ၆ လုံး)', ja: '6桁のコード' },
    didnt_receive_code: { en: "Didn't receive code?", mm: 'ကုဒ်မရရှိသေးပါက', ja: 'コードが届かない場合' },
    resend_sms: { en: 'Resend SMS', mm: 'ကုဒ်ပြန်လည်တောင်းမည်', ja: 'SMSを再送信' },
    verify_and_continue: { en: 'Verify & Continue', mm: 'အတည်ပြုပြီး ရှေ့ဆက်မည်', ja: '認証して次へ進む' },

    // Screen U-14: Notifications
    unread: { en: 'Unread', mm: 'မဖတ်ရသေးသော', ja: '未読' },
    all_notifications: { en: 'All Notifications', mm: 'အားလုံး', ja: 'すべて' },

    // Screen U-53: Write Review
    your_rating: { en: 'Your Rating', mm: 'သင့်အဆင့်သတ်မှတ်ချက်', ja: '評価' },
    add_photos: { en: 'Add Photos', mm: 'ဓာတ်ပုံထည့်သွင်းရန်', ja: '写真を追加' },
    photo_hint: { en: 'Upload up to 4 photos (JPG, PNG)', mm: 'ဓာတ်ပုံ ၄ ပုံအထိ တင်နိုင်ပါသည်', ja: '最大4枚までアップロード可能 (JPG, PNG)' },
    write_review_title: { en: 'Write a Review', mm: 'သုံးသပ်ချက် ရေးသားမည်', ja: '口コミを投稿' },
    your_comment: { en: 'Your Review', mm: 'သင့်မှတ်ချက်', ja: 'レビュー内容' },
    comment_placeholder: { en: 'Share details of your dining experience...', mm: 'စားသောက်မှု အတွေ့အကြုံ အသေးစိတ် ရေးသားပါ...', ja: 'お料理や接客、お店の雰囲気についてお聞かせください...' },
    submit_review: { en: 'Submit Review', mm: 'သုံးသပ်ချက် ပေးပို့မည်', ja: '投稿する' },
    review_submitted: { en: 'Thank you for your valuable feedback!', mm: 'သင့်အကြံပြုချက်အတွက် ကျေးဇူးတင်ပါသည်!', ja: '貴重なご意見ありがとうございます！' },

    // Screen U-54: Available Coupons
    no_coupons: { en: 'No coupons available', mm: 'ကူပွန်မရှိသေးပါ', ja: '利用可能なクーポンはありません' },
    check_back_later: { en: 'Check back later for exclusive deals!', mm: 'နောက်မှ ထပ်မံစစ်ဆေးပေးပါ', ja: 'お得なクーポンが届くまでお待ちください' },
    discount: { en: 'Discount', mm: 'လျှော့ဈေး', ja: '割引' },
    min_order: { en: 'Min. Order', mm: 'အနည်းဆုံး မှာယူမှု', ja: '最低利用金額' },
    valid_until: { en: 'Valid until', mm: 'အသုံးပြုနိုင်သည့် နောက်ဆုံးရက်', ja: '有効期限' },
    use_coupon: { en: 'Use Coupon', mm: 'ကူပွန်သုံးမည်', ja: 'クーポンを利用' },
    available_coupons: { en: 'Available Coupons', mm: 'ရရှိနိုင်သော ကူပွန်များ', ja: '保有クーポン' },

    // Screen U-57: Payment Gateway
    payment_processing: { en: 'Payment Processing', mm: 'ငွေပေးချေမှု ဆောင်ရွက်နေသည်', ja: '決済処理中' },
    select_provider: { en: 'Select Payment Provider', mm: 'ငွေပေးချေမှု ဝန်ဆောင်မှု ရွေးချယ်ပါ', ja: '決済サービスを選択' },
    payment_amount: { en: 'Payment Amount', mm: 'ပေးချေရမည့် ပမာဏ', ja: 'お支払い金額' },
    start_payment: { en: 'Proceed to Payment', mm: 'ငွေပေးချေမှု ဆက်လက်လုပ်ဆောင်မည်', ja: '決済へ進む' },
    online_payment: { en: 'Online Payment', mm: 'အွန်လိုင်း ငွေပေးချေမှု', ja: 'オンライン決済' },

    // Screen U-58: Announcements
    no_announcements: { en: 'No announcements at this time', mm: 'လတ်တလော ကြေညာချက် မရှိပါ', ja: '現在お知らせはありません' },
    posted_on: { en: 'Posted on', mm: 'ထုတ်ပြန်သည့်ရက်', ja: '掲載日' },
    announcements: { en: 'Announcements', mm: 'ကြေညာချက်များ', ja: 'お知らせ' },

    // Screen U-60: Points & Membership
    membership_rank: { en: 'Membership Rank', mm: 'အသင်းဝင် အဆင့်', ja: '会員ランク' },
    current_points: { en: 'Current Points', mm: 'လက်ရှိ အမှတ်', ja: '現在のポイント' },
    available_benefits: { en: 'Available Benefits', mm: 'ရရှိနိုင်သော အကျိုးခံစားခွင့်များ', ja: '利用可能な特典' },
    points_membership: { en: 'Points & Membership', mm: 'အမှတ်နှင့် အသင်းဝင်စနစ်', ja: 'ポイント・会員プログラム' },
    points_history: { en: 'Points History', mm: 'အမှတ် ရရှိ/သုံးစွဲမှု မှတ်တမ်း', ja: 'ポイント履歴' },

    // Screen U-10: Booking Details & Management
    status_confirmed: { en: 'Confirmed', mm: 'အတည်ပြုပြီး', ja: '予約確定' },
    status_pending: { en: 'Pending Approval', mm: 'စောင့်ဆိုင်းဆဲ', ja: '確認待ち' },
    status_completed: { en: 'Completed', mm: 'ပြီးမြောက်ပြီး', ja: '来店済み' },
    status_cancelled: { en: 'Cancelled', mm: 'ပယ်ဖျက်ပြီး', ja: 'キャンセル済み' },
    guest_inquiry_mode: { en: 'Guest Inquiry Mode', mm: 'ဧည့်သည် စုံစမ်းမှု အခြေအနေ', ja: 'ゲスト照会モード' },
    limited_actions: { en: 'Limited Actions', mm: 'ကန့်သတ်ချက်ရှိသည်', ja: '一部制限あり' },
    guest_inquiry_desc: {
      en: 'You are viewing this reservation via guest lookup. Some member benefits, point rewards, and profile sync are limited.',
      mm: 'သင်သည် ကြိုတင်စာရင်း အမှတ်စဉ်နှင့် ဖုန်းနံပါတ်ဖြင့် ဧည့်သည်အဖြစ် ကြည့်ရှုနေပါသည်။ အသင်းဝင်အမှတ်များနှင့် အကောင့်မှတ်တမ်းများကို ရယူနိုင်ရန် အကောင့်ဝင်ရောက်ပါ။',
      ja: 'ゲスト照会でこの予約を表示しています。会員ポイントやプロフィール同期などの特典は制限されています。'
    },
    login_to_save_booking: { en: 'Log in or Register to save booking to profile', mm: 'အကောင့်ဝင်ရောက်ရန် သို့မဟုတ် အကောင့်ဖွင့်ရန်', ja: 'ログインまたは登録して予約を保存' },
    back_to_lookup: { en: 'Back to Lookup', mm: 'ဧည့်သည် စစ်ဆေးမှုသို့', ja: 'ゲスト照会へ戻る' },
    back_to_discover: { en: 'Back to Discover', mm: 'ပင်မ ရှာဖွေရေးသို့', ja: '店舗検索へ戻る' },
    back_to_reservations: { en: 'Back to Reservations', mm: 'ကြိုတင်စာရင်းများသို့', ja: '予約一覧へ戻る' },
    lookup_reservation: { en: 'Lookup Reservation', mm: 'ဧည့်သည် စစ်ဆေးမှု', ja: '予約照会' },
    call_restaurant_btn: { en: 'Call Restaurant', mm: 'ဆိုင်သို့ ဖုန်းခေါ်ဆိုရန်', ja: '店舗へ電話' },
    copy_id_btn: { en: 'Copy ID', mm: 'ကူးယူရန်', ja: 'IDコピー' },
    copied_btn: { en: 'Copied!', mm: 'ကူးယူပြီး!', ja: 'コピー完了！' },
    qr_pass_btn: { en: 'QR Pass', mm: 'QR ကတ်', ja: 'QRパス' },
    add_to_calendar: { en: 'Add to Calendar', mm: 'ပြက္ခဒိန်တွင် သိမ်းရန်', ja: 'カレンダーに追加' },
    view_location_map: { en: 'View Location Map', mm: 'လမ်းညွှန် မြေပုံကြည့်ရန်', ja: '地図・道案内を見る' },
    reservation_specifications: { en: 'Reservation Specifications', mm: 'ကြိုတင်စာရင်း အချက်အလက် အပြည့်အစုံ', ja: 'ご予約詳細内容' },
    date_label: { en: 'Date', mm: 'ရက်စွဲ', ja: '日付' },
    time_label: { en: 'Time', mm: 'အချိန်', ja: '時間' },
    party_size_title: { en: 'Party Size', mm: 'လူဦးရေ', ja: '人数' },
    guest_unit: { en: 'Guests', mm: 'ဦး', ja: '名' },
    primary_guest_name: { en: 'Primary Guest Name', mm: 'မှာယူသူ အမည်', ja: 'ご予約者様名' },
    contact_phone: { en: 'Contact Phone', mm: 'ဆက်သွယ်ရန် ဖုန်းနံပါတ်', ja: 'ご連絡先電話番号' },
    seating_area_pref: { en: 'Seating / Area Preference', mm: 'စားပွဲဝိုင်း အမျိုးအစား', ja: '希望座席・エリア' },
    selected_course_menu: { en: 'Selected Course / Menu', mm: 'ရွေးချယ်ထားသော မီနူး / ကော်စ်', ja: '選択コース・メニュー' },
    payment_status_estimate: { en: 'Payment Status & Estimate', mm: 'ငွေပေးချေမှု အခြေအနေ', ja: 'お支払い状況・概算' },
    booking_channel: { en: 'Booking Channel', mm: 'မှာယူခဲ့သည့် ချန်နယ်', ja: '予約経路' },
    ezbooknow_portal: { en: 'EzBookNow Web Portal', mm: 'EzBookNow အွန်လိုင်း ဝဘ်ဆိုက်', ja: 'EzBookNow Webサイト' },
    special_requests_notes: { en: 'Special Requests & Dietary Notes', mm: 'အထူးမှာကြားချက်နှင့် ဓာတ်မတည့်မှုများ', ja: 'ご要望・アレルギー等の注意事項' },
    no_special_requests: { en: 'No specific dietary notes or special requests provided.', mm: 'အထူးမှာကြားချက် မရှိပါ', ja: '特記事項・ご要望はありません。' },
    modify_or_cancel_title: { en: 'Modify or Cancel Reservation', mm: 'ကြိုတင်စာရင်း ပြင်ဆင်ခြင်းနှင့် ပယ်ဖျက်ခြင်း', ja: '予約変更・キャンセル' },
    booking_cancelled_title: { en: 'This Reservation Has Been Cancelled', mm: 'ဤကြိုတင်စာရင်းအား ပယ်ဖျက်ပြီးပါပြီ', ja: 'この予約はキャンセルされました' },
    booking_cancelled_desc: {
      en: 'This booking has been cancelled and table released. You may rebook anytime if your plans change.',
      mm: 'ကြိုတင်စာရင်း ပယ်ဖျက်ခြင်း ပြီးဆုံးပါပြီ။ ထပ်မံစားသုံးလိုပါက အောက်ပါခလုတ်မှတစ်ဆင့် ပြန်လည်မှာယူနိုင်ပါသည်။',
      ja: '予約はキャンセルされ、座席は開放されました。ご都合がよろしければいつでも再予約いただけます。'
    },
    cancellation_policy_title: { en: 'Cancellation & Change Policy', mm: 'အခမဲ့ ပယ်ဖျက်နိုင်မှု စည်းမျဉ်းသတ်မှတ်ချက်', ja: 'キャンセルポリシー・変更規定' },
    cancellation_policy_desc: {
      en: 'Free cancellation and modification available up to 2 hours before reservation time. For changes within 2 hours of arrival, please contact the restaurant directly.',
      mm: 'သတ်မှတ်ရက်ချိန်း မတိုင်မီ ၂ နာရီအလိုအထိ အခမဲ့ ပြင်ဆင်ခြင်းနှင့် ပယ်ဖျက်ခြင်း ပြုလုပ်နိုင်ပါသည်။ သတ်မှတ်ချိန်ကျော်လွန်ပါက ဆိုင်သို့ တိုက်ရိုက်ဖုန်းဆက် အကြောင်းကြားပေးပါ။',
      ja: 'ご予約日時の2時間前まで無料で変更・キャンセルが可能です。2時間以内の場合は店舗へ直接お電話ください。'
    },
    change_reservation_btn: { en: 'Change Reservation', mm: 'ကြိုတင်စာရင်း ပြင်ဆင်ရန်', ja: '予約内容を変更' },
    cancel_reservation_btn: { en: 'Cancel Reservation', mm: 'ကြိုတင်စာရင်း ပယ်ဖျက်ရန်', ja: '予約をキャンセル' },
    rebook_this_restaurant: { en: 'Rebook This Restaurant', mm: 'ယခင်အချက်အလက်များဖြင့် ပြန်လည်မှာယူရန်', ja: 'この店舗を再予約' },
    change_details_modal_title: { en: 'Change Reservation Details', mm: 'ရက်စွဲနှင့် အချိန် ပြင်ဆင်ရန်', ja: '予約日時の変更' },
    new_date_label: { en: 'New Date', mm: 'ရက်စွဲ အသစ်', ja: '新しい日付' },
    new_time_label: { en: 'New Time', mm: 'အချိန် အသစ်', ja: '新しい時間' },
    party_size_label: { en: 'Number of Guests', mm: 'ဧည့်သည် အရေအတွက်', ja: '人数' },
    estimated_total_label: { en: 'Estimated Total:', mm: 'ခန့်မှန်း ကုန်ကျငွေ စုစုပေါင်း:', ja: '概算合計金額:' },
    confirm_change_btn: { en: 'Confirm Change', mm: 'အတည်ပြု ပြောင်းလဲရန်', ja: '変更を確定' },
    save_changes_btn: { en: 'Save Changes', mm: 'ပြင်ဆင်မှု သိမ်းဆည်းမည်', ja: '変更を保存' },
    keep_existing_btn: { en: 'Keep Existing', mm: 'မပြောင်းလဲတော့ပါ', ja: '変更しない' },
    cancel_modal_title: { en: 'Cancel Reservation', mm: 'ကြိုတင်စာရင်း ပယ်ဖျက်ရန် အတည်ပြုခြင်း', ja: '予約キャンセルの確認' },
    cancel_modal_desc: {
      en: 'Are you sure you want to cancel this booking? Please select the primary reason for cancellation.',
      mm: 'သင်၏ စားပွဲဝိုင်း စိုတ်ထားမှုကို ပယ်ဖျက်လိုပါသလား။ ပယ်ဖျက်ရသည့် အကြောင်းအရင်းကို ရွေးချယ်ပေးပါ။',
      ja: 'この予約をキャンセルしてもよろしいですか？主な理由をお聞かせください。'
    },
    cancel_reason_schedule: { en: 'Change in personal schedule or date', mm: 'အစီအစဉ် ရက်စွဲ/အချိန် ပြောင်းလဲသွားခြင်း', ja: '予定・日時の変更' },
    cancel_reason_health: { en: 'Health or family emergency', mm: 'ကျန်းမာရေး သို့မဟုတ် အရေးပေါ်ကိစ္စ', ja: '体調不良・急用' },
    cancel_reason_venue: { en: 'Selected a different restaurant', mm: 'အခြား စားသောက်ဆိုင်သို့ ပြောင်းလဲစားသုံးခြင်း', ja: '別の店舗に変更' },
    cancel_reason_other: { en: 'Other reason', mm: 'အခြား အကြောင်းပြချက်', ja: 'その他' },
    cancel_fee_label: { en: 'Cancellation Fee:', mm: 'ပယ်ဖျက်ခ ကောက်ခံမှု:', ja: 'キャンセル料:' },
    cancel_fee_free: { en: 'Free (0 MMK)', mm: 'အခမဲ့ (၀ ကျပ်)', ja: '無料 (0 MMK)' },
    keep_reservation_btn: { en: 'Keep Reservation', mm: 'မလုပ်တော့ပါ', ja: '予約を維持' },
    confirm_cancellation_btn: { en: 'Confirm Cancellation', mm: 'အတည်ပြု ပယ်ဖျက်မည်', ja: 'キャンセルを確定' },
    digital_qr_pass: { en: 'Digital QR Pass', mm: 'ဒီဂျစ်တယ် ဝင်ခွင့်ကတ်', ja: 'デジタルQRパス' },
    reservation_id_label: { en: 'Reservation ID', mm: 'ဘွတ်ကင် နံပါတ်', ja: '予約番号' },
    present_qr_hint: {
      en: 'Present this digital pass at the restaurant reception for instant table check-in.',
      mm: 'စားသောက်ဆိုင်သို့ ရောက်ရှိချိန်တွင် ဤ QR ကုဒ်အား ဝန်ထမ်းများထံ ပြသပေးပါ။',
      ja: 'ご来店時に受付スタッフへこのデジタルパスをご提示ください。'
    },
    close_pass_btn: { en: 'Close Pass', mm: 'ပိတ်မည်', ja: '閉じる' },
    calendar_event_added: { en: 'Calendar event downloaded / added!', mm: 'ပြက္ခဒိန်ထဲသို့ ထည့်သွင်းပြီးပါပြီ!', ja: 'カレンダーに追加しました！' },
    booking_updated_toast: { en: 'Reservation details updated successfully!', mm: 'ကြိုတင်စာရင်း အချက်အလက်များ အောင်မြင်စွာ ပြင်ဆင်ပြီးပါပြီ!', ja: '予約内容を更新しました！' },
    booking_cancelled_toast: { en: 'Reservation has been cancelled.', mm: 'ကြိုတင်စာရင်း ပယ်ဖျက်ပြီးပါပြီ။', ja: '予約をキャンセルしました。' },
    booking_id_copied: { en: 'Reservation ID copied to clipboard!', mm: 'ကြိုတင်စာရင်း အမှတ်စဉ်ကို ကူးယူပြီးပါပြီ!', ja: '予約番号をクリップボードにコピーしました！' },
    connecting_venue_concierge: { en: 'Connecting to venue concierge:', mm: 'ဆိုင်နှင့် ဆက်သွယ်နေပါသည်:', ja: '店舗受付に発信中:' },
    opening_venue_map: { en: 'Opening venue location:', mm: 'ဆိုင်တည်နေရာ မြေပုံ ဖွင့်နေပါသည်:', ja: '店舗の位置情報を開いています:' },

    // Screen U-11: Account Settings & Security
    accountSecurityPrefs: { en: 'Account Security & Preferences', mm: 'အကောင့် လုံခြုံရေးနှင့် ဆက်တင်များ', ja: 'アカウント設定・表示言語' },
    accountWithdrawnNotice: { en: 'This Account Has Been Withdrawn', mm: 'ဤအကောင့်ကို ဖျက်သိမ်းထားပါသည်', ja: 'このアカウントは退会手続き済みです' },
    accountWithdrawnDesc: {
      en: 'Your account is scheduled for permanent deletion and PDPA anonymization within 30 days.',
      mm: 'ရက်ပေါင်း ၃၀ အတွင်း ကိုယ်ရေးအချက်အလက်များကို PDPA ဥပဒေနှင့်အညီ အပြီးပိုင်ဖျက်သိမ်းခြင်း လုပ်ဆောင်နေပါသည်။',
      ja: '30日以内に個人情報保護規定（PDPA）に準拠した完全匿名化・データ削除が完了します。'
    },
    reactivate_account_demo: { en: 'Reactivate Account (Demo)', mm: 'အကောင့် ပြန်လည်အသက်သွင်းမည် (Demo)', ja: 'アカウントを再有効化 (Demo)' },
    displayLanguage: { en: 'System Display Language', mm: 'စနစ်ပြသရေး ဘာသာစကား', ja: 'システム表示言語 (Language)' },
    display_language_updated: { en: 'Display language updated successfully', mm: 'စနစ်ပြသရေး ဘာသာစကား ပြောင်းလဲပြီးပါပြီ', ja: '表示言語を更新しました' },
    currentLanguageLabel: { en: 'Current Language: ', mm: 'လက်ရှိ ရွေးချယ်ထားသော ဘာသာစကား: ', ja: '現在の設定: ' },
    languageSelectDesc: {
      en: 'Choose your preferred system display language. All booking steps, details, and notifications update immediately.',
      mm: 'အသုံးပြုလိုသည့် ဘာသာစကား ရွေးချယ်ပါ။ စနစ်တစ်ခုလုံးရှိ မျက်နှာပြင်များ၊ အသိပေးချက်များနှင့် ဘွတ်ကင်လုပ်ဆောင်ချက်များသည် ချက်ချင်း ပြောင်းလဲသွားပါမည်။',
      ja: 'Yoyakuシステム全体で表示する言語を選択してください。すべての画面、通知、予約手続きが即座に切り替わります。'
    },
    emailAddressChange: { en: 'Email Address Change', mm: 'အီးမေးလ်လိပ်စာ ပြောင်းလဲခြင်း', ja: 'メールアドレスの変更' },
    pendingPrefix: { en: 'Pending:', mm: 'အသစ်စောင့်ဆိုင်းနေ:', ja: '確認待ち:' },
    verifiedBadge: { en: 'Verified', mm: 'အတည်ပြုပြီး', ja: '認証済み' },
    unverifiedBadge: { en: 'Unverified', mm: 'အတည်မပြုရသေး', ja: '未認証' },
    pendingEmailAlert: { en: 'Pending Email Verification:', mm: 'အတည်ပြုရန် စောင့်ဆိုင်းနေသော အီးမေးလ်အသစ်:', ja: '確認待ちのメールアドレス:' },
    pendingEmailDesc: {
      en: 'Click the verification link sent to your new email inbox to complete the change.',
      mm: 'အီးမေးလ်အသစ်ထံ ပို့ထားသော အတည်ပြုလင့်ခ်ကို နှိပ်ပြီးမှသာ အတည်ဖြစ်ပါမည်။',
      ja: '新しいメールアドレス宛に送信された認証リンクをクリックして完了してください。'
    },
    simulateVerifyLink: { en: 'Simulate Verify Link', mm: 'လင့်ခ်နှိပ်ခြင်း စမ်းသပ်ရန်', ja: '認証リンクをテスト' },
    currentEmailAddress: { en: 'Current Email Address', mm: 'လက်ရှိ အီးမေးလ်လိပ်စာ', ja: '現在のメールアドレス' },
    newEmailAddress: { en: 'New Email Address', mm: 'အီးမေးလ်လိပ်စာ အသစ်', ja: '新しいメールアドレス' },
    newEmailPlaceholder: { en: 'e.g. alex.new@example.com', mm: 'ဥပမာ- user@example.com', ja: '例: alex.new@example.com' },
    securityReauth: { en: 'Security Re-authentication (Current Password)', mm: 'လုံခြုံရေး အတည်ပြုရန် စကားဝှက် ရိုက်ထည့်ပါ', ja: 'セキュリティ再認証 (現在のパスワード)' },
    currentPasswordPlaceholder: { en: 'Enter current account password', mm: 'လက်ရှိ စကားဝှက် ရိုက်ထည့်ပါ', ja: '現在のパスワードを入力' },
    orViaSSO: { en: 'Or via SSO', mm: 'သို့မဟုတ်', ja: 'またはSNS連携' },
    reauthWithGoogle: { en: 'Re-authenticate with Google', mm: 'Google အကောင့်ဖြင့် Re-authenticate ပြုလုပ်မည်', ja: 'Googleで再認証' },
    sendVerificationLink: { en: 'Send Verification Link', mm: 'အတည်ပြုလင့်ခ် ပို့မည်', ja: '認証リンクを送信' },
    passwordChange: { en: 'Password Change', mm: 'စကားဝှက် ပြောင်းလဲခြင်း', ja: 'パスワードの変更' },
    passwordChangeRules: { en: 'Minimum 8 characters with combination of letters and numbers', mm: 'အနည်းဆုံး စာလုံး (၈) လုံး၊ အင်္ဂလိပ်စာလုံးနှင့် ဂဏန်းတွဲ၍ ပြောင်းလဲပါ', ja: '英数字混在8文字以上' },
    currentPassword: { en: 'Current Password', mm: 'လက်ရှိ စကားဝှက်', ja: '現在のパスワード' },
    newPasswordRulesPlaceholder: { en: 'Enter new password (min 8 chars, letters + numbers)', mm: 'စကားဝှက်အသစ် (အနည်းဆုံး ၈ လုံး၊ အင်္ဂလိပ်စာလုံး + ဂဏန်း)', ja: '新しいパスワードを入力 (英数字8文字以上)' },
    confirmNewPasswordPlaceholder: { en: 'Re-enter new password', mm: 'စကားဝှက်အသစ်ကို အတည်ပြုရန် ထပ်မံရိုက်ထည့်ပါ', ja: '新しいパスワードを再入力' },
    updatePasswordBtn: { en: 'Update Password', mm: 'စကားဝှက် အသစ်သိမ်းမည်', ja: 'パスワードを変更' },
    phoneNumberChange: { en: 'Phone Number Change', mm: 'ဖုန်းနံပါတ် ပြောင်းလဲခြင်း', ja: '電話番号の変更' },
    importantNotePhone: { en: 'Important Note on Phone Verification', mm: 'အရေးကြီး သတိပေးချက်', ja: '電話番号認証について' },
    phoneVerificationNotice: {
      en: 'Updating your phone number requires entering an SMS OTP. Once verified, this number will receive dining reminders and emergency contact.',
      mm: 'ဖုန်းနံပါတ်ပြောင်းလဲပါက SMS OTP ကုဒ်ဖြင့် အတည်ပြုရမည်ဖြစ်သည်။ အတည်ပြုပြီးပါက ဘွတ်ကင်သတိပေးချက်များကို ဤနံပါတ်သို့ ပေးပို့ပါမည်။',
      ja: '電話番号の変更にはSMS OTP認証が必要です。認証後、予約通知やリマインダーがこの番号に届きます。'
    },
    currentPhoneNumber: { en: 'Current Phone Number', mm: 'လက်ရှိ ဖုန်းနံပါတ်', ja: '現在の電話番号' },
    newPhoneNumber: { en: 'New Phone Number', mm: 'ဖုန်းနံပါတ် အသစ်ထည့်ရန်', ja: '新しい電話番号' },
    updateVerifyOtp: { en: 'Update & Verify via OTP', mm: 'ဖုန်းနံပါတ်ပြောင်းလဲပြီး OTP ရယူမည်', ja: '変更してOTP認証へ' },
    enterOtpCode: { en: 'Enter OTP Verification Code', mm: 'OTP ကုဒ် ရိုက်ထည့်ရန်', ja: 'OTP認証コードを入力' },
    accountWithdrawal: { en: 'Account Withdrawal (Permanent Deletion)', mm: 'အကောင့်ဖျက်သိမ်းခြင်း', ja: 'アカウント退会・削除' },
    accountWithdrawalDesc: { en: 'Irreversible deletion, reservation cancellation, and PDPA compliance', mm: 'အကောင့်ဖျက်သိမ်းခြင်းဆိုင်ရာ စည်းမျဉ်းများ၊ ကြိုတင်မှာယူမှုများနှင့် PDPA ဥပဒေ', ja: 'データの完全削除・予約キャンセル・PDPA準拠' },
    dangerZone: { en: 'Danger Zone', mm: 'သတိပေးချက်', ja: '注意ゾーン' },
    irreversible: { en: 'Irreversible', mm: 'သတိပေးချက်', ja: '復元不可' },
    irreversibleDesc: {
      en: 'Once deleted, profile history, dining points, and VIP membership cannot be recovered.',
      mm: 'ဖျက်သိမ်းပြီးပါက အကောင့်မှတ်တမ်း၊ ရရှိထားသော အမှတ်များနှင့် VIP အဆင့်များကို ပြန်လည်ရယူနိုင်မည် မဟုတ်ပါ။',
      ja: '退会後は利用履歴、保有ポイント、VIP会員ランク等のすべてのデータが失われます。'
    },
    upcomingBookingsWarning: { en: 'Upcoming Bookings', mm: 'ကြိုတင်မှာယူမှုများ', ja: '今後の予約について' },
    upcomingBookingsDesc: { en: 'Active dining reservations will be automatically cancelled.', mm: 'လက်ရှိ ကြိုတင်မှာယူထားသော စားပွဲဝိုင်းများ အားလုံး အလိုအလျောက် ပယ်ဖျက်သွားပါမည်။', ja: '予約中のテーブルはすべて自動的にキャンセルされます。' },
    pdpaAnonymization: { en: 'PDPA Anonymization', mm: 'ကိုယ်ရေးအချက်အလက် (PDPA)', ja: '個人情報の匿名化 (PDPA)' },
    pdpaAnonymizationDesc: { en: 'Personal contact details will be completely wiped from server logs.', mm: 'ကိုယ်ရေးအချက်အလက်များနှင့် ဖုန်းနံပါတ်များကို စနစ်မှတ်တမ်းများမှ လုံးဝ ဖျက်သိမ်းပေးပါမည်။', ja: '個人情報やお電話番号等はサーバー上から完全に消去・匿名化されます。' },
    reasonWithdrawal: { en: 'Reason for Account Withdrawal', mm: 'ဖျက်သိမ်းရသည့် အကြောင်းရင်း ရွေးချယ်ပါ', ja: '退会理由を選択してください' },
    selectReasonPrompt: { en: '-- Select a primary reason --', mm: '-- အကြောင်းရင်း ရွေးချယ်ရန် --', ja: '-- 理由を選択 --' },
    reasonNoLongerUsing: { en: 'No longer using the service', mm: 'အသုံးမပြုတော့သောကြောင့် (No longer using the service)', ja: '利用しなくなったため' },
    reasonSwitchAccount: { en: 'Switching to another account', mm: 'အခြားအကောင့်တစ်ခု ပြောင်းလဲအသုံးပြုလို၍ (Switching to another account)', ja: '別のアカウントを利用するため' },
    reasonBookingIssues: { en: 'Booking difficulties', mm: 'စားပွဲဝိုင်း ကြိုတင်မှာယူမှု ပြဿနာများကြောင့် (Booking/reservation difficulties)', ja: '予約が取りにくいため' },
    reasonUnsatisfied: { en: 'Unsatisfied with service', mm: 'စနစ် သို့မဟုတ် ဝန်ဆောင်မှုအား မနှစ်သက်၍ (Unsatisfied with service)', ja: 'サービス内容に不満があるため' },
    reasonOther: { en: 'Other reason', mm: 'အခြား အကြောင်းပြချက် (Other reason)', ja: 'その他' },
    additionalFeedback: { en: 'Additional Feedback (Optional)', mm: 'ဖြည့်စွက် အကြံပြုချက် (ရွေးချယ်နိုင်သည်)', ja: 'ご意見・ご要望（任意）' },
    additionalFeedbackPlaceholder: { en: 'Help us improve by leaving any additional remarks...', mm: 'ကျွန်ုပ်တို့၏ ဝန်ဆောင်မှုကို တိုးတက်ကောင်းမွန်စေရန် အကြံပြုချက် ရေးသားနိုင်ပါသည်...', ja: '今後のサービス向上のため、ご意見をお聞かせください...' },
    confirmWithdrawalCheck: { en: 'I understand that account withdrawal is permanent and cannot be undone.', mm: 'အကောင့်ဖျက်သိမ်းခြင်းသည် နောက်ပြန်ပြင်၍မရကြောင်း သဘောပေါက် နားလည်ပါသည်။', ja: '退会後のデータ復元はできないことを理解しました。' },
    deleteMyAccountBtn: { en: 'Permanently Delete My Account', mm: 'အကောင့် အပြီးပိုင် ဖျက်သိမ်းမည်', ja: 'アカウントを完全に削除する' },
    enterValidEmailToast: { en: 'Please enter a valid email address.', mm: 'ကျေးဇူးပြု၍ အီးမေးလ်လိပ်စာ မှန်ကန်စွာ ထည့်ပါ', ja: '有効なメールアドレスを入力してください。' },
    enterValidPhoneToast: { en: 'Please enter a valid phone number.', mm: 'ကျေးဇူးပြု၍ ဖုန်းနံပါတ် ထည့်ပါ', ja: '有効な電話番号を入力してください。' },
    selectReasonWithdrawalToast: { en: 'Please select a reason for withdrawal.', mm: 'ကျေးဇူးပြု၍ ဖျက်သိမ်းရသည့် အကြောင်းရင်း ရွေးချယ်ပါ', ja: '退会理由を選択してください。' },
    agreeConditionsToast: { en: 'Please confirm that you agree to the conditions.', mm: 'စည်းကမ်းချက်များကို သဘောတူရန် အမှန်ခြစ်ပါ', ja: '条件に同意してください。' },
    otpSentSimulateToast: { en: 'Simulated OTP sent via SMS.', mm: 'SMS သို့ OTP ပေးပို့ပြီးပါပြီ', ja: 'SMSにOTPコードを送信しました。' },
    phoneUpdatedSuccessToast: { en: 'Phone number updated successfully!', mm: 'ဖုန်းနံပါတ် အောင်မြင်စွာ ပြောင်းလဲပြီးပါပြီ', ja: '電話番号を変更しました！' },
    accountWithdrawnSuccessToast: { en: 'Account successfully withdrawn and marked for deletion.', mm: 'အကောင့် ဖျက်သိမ်းခြင်း အောင်မြင်ပါသည်', ja: 'アカウントの退会手続きが完了しました。' },

    // Screen U-56: Notification Settings
    notificationSettings: { en: 'Notification Settings', mm: 'အသိပေးချက် ဆက်တင်', ja: '通知設定' },
    inAppNotifications: { en: 'In-App Notifications', mm: 'App အတွင်း အသိပေးချက် (In-App)', ja: 'アプリ内通知' },
    inAppNotificationsDesc: {
      en: 'Instant notification center alerts, table confirmation badges, and waitlist calls.',
      mm: 'စိုတ်ထားမှု အတည်ပြုချက်၊ စားပွဲဝိုင်း အခြေအနေနှင့် ဘောက်ချာသတိပေးချက်များကို App တွင် ချက်ချင်း ပြသမည်',
      ja: '予約確定、空席案内、クーポン配布などをアプリ内でお知らせ'
    },
    webPushNotifications: { en: 'Web Push Notifications', mm: 'Web Push (Browser) အသိပေးချက်', ja: 'Webプッシュ通知' },
    webPushNotificationsDesc: {
      en: 'Real-time browser notifications when reservations change or table is ready.',
      mm: 'Browser မှတစ်ဆင့် အချိန်နှင့်တပြေးညီ အသိပေးချက်များ လက်ခံရယူခြင်း',
      ja: 'ブラウザ経由で予約変更やお席のご用意をリアルタイムにお知らせ'
    },
    emailNotifications: { en: 'Email Notifications', mm: 'အီးမေးလ် (Email) အသိပေးချက်', ja: 'メール通知' },
    emailNotificationsDesc: {
      en: 'Reservation confirmation receipts and billing vouchers sent to your email.',
      mm: 'စားပွဲဝိုင်း ပြေစာနှင့် အတည်ပြုစာ ပို့မည်',
      ja: '予約確認メール・電子バウチャーをお届けします'
    },
    viberNotifications: { en: 'Viber Notifications', mm: 'Viber အသိပေးချက်', ja: 'Viber通知' },
    futurePhase: { en: 'Future Phase', mm: 'နောက်ပိုင်းအဆင့်', ja: '開発中' },
    viberNotificationsDesc: {
      en: 'Automated Viber Bot dining alerts, table check-in pass delivery, and restaurant updates.',
      mm: 'Viber Bot မှတစ်ဆင့် အလိုအလျောက် သတိပေးချက်နှင့် QR စားပွဲဝိုင်းကုဒ် ရယူခြင်း',
      ja: 'Viberボットによる予約リマインダー・来店用QRコードのお届け'
    },
    smsNotifications: { en: 'SMS Text Notifications', mm: 'SMS (မက်ဆေ့ခ်ျ) အသိပေးချက်', ja: 'SMS通知' },
    smsNotificationsDesc: {
      en: 'Direct SMS dispatch for booking confirmations and last-minute cancellation alerts.',
      mm: 'ဖုန်း SMS ဖြင့် အရေးပေါ် စားပွဲဝိုင်း အသိပေးချက်နှင့် OTP ကုဒ်များ လက်ခံခြင်း',
      ja: '予約確定・直前キャンセルのSMS通知'
    },
    phoneNumberSettings: { en: 'Phone Number Settings', mm: 'ဖုန်းနံပါတ် ဆက်တင်များ', ja: '電話番号設定' },
    savePhoneNumber: { en: 'Save Phone Number', mm: 'ဖုန်းနံပါတ် သိမ်းဆည်းမည်', ja: '電話番号を保存' },
    viberIntegrationConsent: { en: 'Viber Integration Consent & Bot Connect', mm: 'Viber ချိတ်ဆက်မှု သဘောတူညီချက်', ja: 'Viberボット連携・同意' },
    viberIntegrationDesc: {
      en: 'Pre-granting consent ensures your account is bound automatically when the Viber service is deployed.',
      mm: 'ကြိုတင် သဘောတူညီချက် ပေးထားပါက ဝန်ဆောင်မှု စတင်သည်နှင့် အလိုအလျောက် ချိတ်ဆက်ပေးပါမည်။',
      ja: '事前に同意いただくことで、Viber機能リリース時に自動連携されます。'
    },
    viberBotStatus: { en: 'EzBookNow Viber Bot Status:', mm: 'EzBookNow Viber Bot ချိတ်ဆက်မှု အခြေအနေ:', ja: 'EzBookNow Viberボット状態:' },
    consentGranted: { en: 'Consent Granted', mm: 'သဘောတူညီချက် ပေးထားသည်', ja: '連携同意済み' },
    consentNotGranted: { en: 'Consent Not Granted', mm: 'သဘောတူညီချက် မပေးရသေးပါ', ja: '未同意' },
    grantConsent: { en: 'Grant Consent', mm: 'သဘောတူညီချက် ပေးမည်', ja: '連携に同意する' },
    revokeConsent: { en: 'Revoke Consent', mm: 'သဘောတူညီချက် ပယ်ဖျက်မည်', ja: '同意を解除' },
    autoReminders: { en: 'Auto Reminders', mm: 'အလိုအလျောက် သတိပေးချက်', ja: '自動リマインダー' },
    autoRemindersDesc: {
      en: 'Receive automated alerts 2 hours before your dining time.',
      mm: 'စားသောက်ချိန် မတိုင်မီ ၂ နာရီအလိုတွင် Viber စာတိုဖြင့် သတိပေးမည်',
      ja: 'ご来店時間の2時間前に自動で通知をお送りします。'
    },
    directQrDelivery: { en: 'Direct QR Delivery', mm: 'QR Dining Pass', ja: '来店QRコードの直接配信' },
    directQrDeliveryDesc: {
      en: 'Check-in QR tickets delivered straight into Viber messenger.',
      mm: 'စားသောက်ဆိုင် Check-in QR လက်မှတ်ကို Viber တွင် တိုက်ရိုက် ရယူနိုင်မည်',
      ja: '受付用QRコードがViberチャットに直接届きます。'
    },
    vipFlashDeals: { en: 'VIP Flash Deals', mm: 'အထူး ဘောက်ချာများ', ja: '限定シークレット特典' },
    vipFlashDealsDesc: {
      en: 'Instant Viber alerts when waitlist seats or chef discounts open up.',
      mm: 'လူကြိုက်များသော ဆိုင်များ၏ သီးသန့် ပရိုမိုးရှင်းများကို ဦးဦးဖျားဖျား ရရှိမည်',
      ja: '空席速報や特別コースのご案内を先行してお知らせします。'
    },
    viberLaunchNotice: {
      en: 'When Viber integration launches, account will link via your registered phone number.',
      mm: 'Viber ဝန်ဆောင်မှု စတင်သည့်အခါ ဖုန်းနံပါတ်ဖြင့် စနစ်က အလိုအလျောက် ချိတ်ဆက်ပေးပါမည်။',
      ja: 'Viber機能提供開始時、ご登録の電話番号と自動連携されます。'
    },
    consentTimestamp: { en: 'Timestamp:', mm: 'သဘောတူထားသည့်ရက်:', ja: '同意日時:' },

    // Screen U-51: Home / Discover & U-52: Search
    search_dining_venues: { en: 'Search Dining Venues', mm: 'စားသောက်ဆိုင်များ ရှာဖွေရန်', ja: 'レストランを検索' },
    explore_book_premier: {
      en: 'Explore and book premier Myanmar culinary destinations in real time',
      mm: 'ရန်ကုန်မြို့၏ ထိပ်တန်းစားသောက်ဆိုင်များကို အချိန်မရွေး ကြိုတင်စိုတ်ယူနိုင်ပါသည်',
      ja: 'ヤンゴンの名店をリアルタイムで即時予約'
    },
    search_placeholder: {
      en: 'Search by restaurant name, cuisine, township, or dish...',
      mm: 'ဆိုင်အမည်၊ ဟင်းလျာ၊ မြို့နယ် သို့မဟုတ် အစားအသောက် ရှာဖွေရန်...',
      ja: '店舗名、料理ジャンル、エリア、料理名で検索...'
    },
    open_search_conditions: { en: 'Open Search Conditions', mm: 'ရှာဖွေမှု သတ်မှတ်ချက်များ ဖွင့်ရန်', ja: '絞り込み条件を開く' },
    conditions_label: { en: 'Conditions', mm: 'သတ်မှတ်ချက်များ', ja: '絞り込み' },
    active_filters_label: { en: 'Active:', mm: 'သတ်မှတ်ချက်များ:', ja: '適用条件:' },
    clear_all_filters: { en: 'Clear all', mm: 'အားလုံးရှင်းမည်', ja: 'すべて解除' },
    restaurants_found: { en: 'Restaurants found', mm: 'ဆိုင်များ တွေ့ရှိပါသည်', ja: '件の店舗が見つかりました' },
    sort_label: { en: 'Sort:', mm: 'အစီအစဉ်:', ja: '並び順:' },
    no_matching_restaurants: { en: 'No matching restaurants found', mm: 'ကိုက်ညီသော စားသောက်ဆိုင် မတွေ့ရှိပါ', ja: '該当するレストランが見つかりませんでした' },
    adjust_search_conditions_hint: {
      en: 'Try broadening your search keyword or resetting specific search conditions.',
      mm: 'ရှာဖွေမှု သတ်မှတ်ချက်များကို ပြောင်းလဲပြီး ထပ်မံကြိုးစားကြည့်ပါ',
      ja: 'キーワードを変更するか、絞り込み条件をリセットしてお試しください。'
    },
    adjust_search_conditions_btn: { en: 'Adjust Search Conditions', mm: 'သတ်မှတ်ချက်များ ပြင်ဆင်ရှာဖွေမည်', ja: '条件を変更する' },
    sort_popularity: { en: 'Popularity', mm: 'လူကြိုက်အများဆုံး', ja: '人気順' },
    sort_rating: { en: 'Highest Rating', mm: 'အဆင့်သတ်မှတ်ချက် အမြင့်ဆုံး', ja: '評価順' },
    sort_reviews: { en: 'Most Reviews', mm: 'သုံးသပ်ချက် အများဆုံး', ja: '口コミ数順' },
    view_mode_list: { en: 'List', mm: 'စာရင်း', ja: 'リスト' },
    view_mode_map: { en: 'Map', mm: 'မြေပုံ', ja: '地図' },
    map_view_title: { en: 'Yangon Dining Map View', mm: 'ရန်ကုန် စားသောက်ဆိုင်များ မြေပုံ', ja: 'ヤンゴン飲食マップ' },
    clear_keyword_title: { en: 'Clear text', mm: 'စာသားရှင်းမည်', ja: 'テキストをクリア' },
    remove_filter_title: { en: 'Remove filter', mm: 'စစ်ထုတ်မှု ပယ်ဖျက်မည်', ja: '条件を削除' },

    // Screen U-52: Search Conditions Modal
    time_period_any: { en: 'Any Time', mm: 'အချိန်မရွေး', ja: 'いつでも' },
    time_period_any_sub: { en: 'Flexible', mm: 'တစ်နေ့လုံး', ja: '指定なし' },
    time_period_lunch: { en: 'Lunch (11:30–14:30)', mm: 'နေ့လယ်စာ (11:30–14:30)', ja: 'ランチ (11:30–14:30)' },
    time_period_lunch_sub: { en: 'Lunch Service', mm: 'နေ့လယ်စာစားချိန်', ja: '昼食時間帯' },
    time_period_afternoon: { en: 'Afternoon (14:30–17:30)', mm: 'မွန်းလွဲပိုင်း (14:30–17:30)', ja: 'カフェ・午後 (14:30–17:30)' },
    time_period_afternoon_sub: { en: 'Afternoon Dining', mm: 'မွန်းလွဲချိန်', ja: 'カフェ・ティータイム' },
    time_period_dinner: { en: 'Dinner (17:30–21:30)', mm: 'ညစာ (17:30–21:30)', ja: 'ディナー (17:30–21:30)' },
    time_period_dinner_sub: { en: 'Prime Evening', mm: 'ညစာစားချိန်', ja: '夕食時間帯' },
    time_period_late: { en: 'Late Night (21:30–Late)', mm: 'ညဉ့်နက် (21:30–Late)', ja: 'レイトナイト (21:30以降)' },
    time_period_late_sub: { en: 'Late Dining', mm: 'ညဉ့်နက်ပိုင်း', ja: '深夜営業' },
    party_size_all: { en: 'Any Party Size', mm: 'လူဦးရေ အားလုံး', ja: '指定なし' },
    party_size_1: { en: '1 Person (Solo)', mm: '၁ ယောက် (တစ်ဦးတည်း)', ja: '1名 (ひとり)' },
    party_size_2: { en: '2 Guests (Date)', mm: '၂ ယောက် (အတွဲ / မိတ်ဆွေ)', ja: '2名 (デート・友人)' },
    party_size_3: { en: '3 Guests', mm: '၃ ယောက်', ja: '3名' },
    party_size_4: { en: '4 Guests (Family)', mm: '၄ ယောက် (မိသားစု)', ja: '4名 (ファミリー)' },
    party_size_6: { en: '6 Guests (Group)', mm: '၆ ယောက် (အဖွဲ့လိုက်)', ja: '6名 (グループ)' },
    party_size_8plus: { en: '8+ Guests (Banquet)', mm: '၈+ ယောက် (VIP ဘန်ကက်)', ja: '8名以上 (宴会)' },
    budget_all: { en: 'Any Budget', mm: 'အားလုံး', ja: '予算指定なし' },
    budget_all_sub: { en: 'No price limit', mm: 'ဈေးနှုန်းကန့်သတ်မထားပါ', ja: '上限・下限なし' },
    budget_under15k_sub: { en: 'Budget Friendly', mm: 'အလွန်သက်သာသော', ja: 'お手頃' },
    budget_15k_35k_sub: { en: 'Casual Mid-tier', mm: 'ပုံမှန်စားသောက်ဆိုင်', ja: 'カジュアル' },
    budget_35k_60k_sub: { en: 'Premium Dining', mm: 'အဆင့်မြင့်စားသောက်ဆိုင်', ja: 'プレミアム' },
    budget_60k_plus_sub: { en: 'Luxury & Fine Dining', mm: 'နန်းတွင်းအဆင့်မြင့်', ja: '高級・ファインダイニング' },
    seating_style_all: { en: 'Any Seating Style', mm: 'ထိုင်ခုံအားလုံး', ja: '座席指定なし' },
    seating_private_room: { en: 'VIP Private Room', mm: 'သီးသန့် VIP / တာတာမိခန်း', ja: '個室・VIP席' },
    seating_lake_view: { en: 'Lake & Waterfront View', mm: 'ကန်ရေပြင် / နေဝင်ဆည်းဆာရှုခင်း', ja: '湖畔・リバービュー' },
    seating_outdoor: { en: 'Outdoor Garden Lawn', mm: 'ဥယျာဉ် / အပြင်ဘက်မြက်ခင်း', ja: 'テラス・ガーデン' },
    seating_bar_counter: { en: 'Chef Counter & Bar', mm: 'စားဖိုမှူးကောင်တာ / ဘား', ja: 'カウンター・バー' },
    feat_wifi: { en: 'Free High-Speed Wi-Fi', mm: 'အခမဲ့ ဝိုင်ဖိုင် (Wi-Fi)', ja: '無料Wi-Fi完備' },
    feat_ac: { en: 'Full Air Conditioning', mm: 'လေအေးပေးစက် အပြည့်', ja: '冷房完備' },
    feat_parking: { en: 'Private / Valet Parking', mm: 'သီးသန့် ကားပါကင် / Valet', ja: '駐車場・バレーパーキング' },
    feat_generator: { en: '24/7 Backup Generator', mm: '၂၄ နာရီ မီးစက်အပြည့်', ja: '24時間自家発電設備' },
    feat_halal: { en: 'Halal Friendly', mm: 'ဟလာလ် အသိအမှတ်ပြု', ja: 'ハラール対応' },
    feat_veg: { en: 'Vegetarian / Vegan', mm: 'သက်သတ်လွတ် ရရှိနိုင်', ja: 'ベジタリアン対応' },
    feat_lake_view: { en: 'Lake / Sunset Panorama', mm: 'ကန်ရှုခင်း / နေဝင်ချိန်', ja: '夕日・パノラマビュー' },
    feat_private_room: { en: 'VIP Dining Alcoves', mm: 'VIP သီးသန့်ခန်းများ', ja: 'VIP個室' },
    feat_garden: { en: 'Garden Terrace', mm: 'ပြင်ပ ဥယျာဉ်ထိုင်ခုံ', ja: 'ガーデンテラス' },
    feat_wine: { en: 'Wine Cellar & Cocktails', mm: 'ဝိုင်နှင့် ကော့တေးဘား', ja: 'ワインセラー・バー' },
    feat_live_music: { en: 'Live Jazz & Music', mm: 'တိုက်ရိုက် တေးဂီတ / Jazz', ja: '生演奏・ライブ音楽' },
    feat_pet_friendly: { en: 'Pet-Friendly Patio', mm: 'အိမ်မွေးတိရိစ္ဆာန် ခွင့်ပြု', ja: 'ペット同伴可' },
    close_btn: { en: 'Close', mm: 'ပိတ်မည်', ja: '閉じる' },
    reset_btn: { en: 'Reset', mm: 'ပြန်စမည်', ja: 'リセット' },
    keyword_label: { en: 'Keyword, Restaurant, or Dish', mm: 'အမည် / ဟင်းလျာ / အဓိကစကားလုံး', ja: 'キーワード・店名・料理名' },
    all_venues: { en: 'All venues', mm: 'အားလုံး', ja: 'すべての店舗' },
    cond_kw_placeholder: {
      en: 'e.g. Inya Lake, Omakase, Sourdough, Padonmar, Dim Sum, Garden Terrace...',
      mm: 'ဥပမာ- ရွှေတိဂုံအနီး၊ အိုမာကာဆေ၊ မုန့်ဟင်းခါး၊ သီးသန့် VIP ခန်း...',
      ja: '例: インヤー湖、おまかせ、パドンマー、飲茶、テラス席...'
    },
    clear_btn: { en: 'Clear', mm: 'ရှင်းမည်', ja: 'クリア' },
    popular_suggestions: { en: 'Popular:', mm: 'အကြံပြုချက်များ:', ja: 'おすすめ検索:' },
    date_preference_label: { en: 'Reservation Date', mm: 'ရက်စွဲ သတ်မှတ်ချက်', ja: 'ご来店日' },
    any_date: { en: 'Flexible / Any Date', mm: 'ရက်စွဲမကန့်သတ်ပါ', ja: '日付指定なし' },
    browse_all: { en: 'Browse All', mm: 'အမြဲတမ်းရှာဖွေမည်', ja: 'すべて見る' },
    date_today: { en: 'Today', mm: 'ယနေ့', ja: '今日' },
    date_tonight: { en: 'Tonight', mm: 'ယနေ့ည', ja: '今夜' },
    date_tomorrow: { en: 'Tomorrow', mm: 'မနက်ဖြန်', ja: '明日' },
    date_weekend: { en: 'Weekend', mm: 'စနေ/တနင်္ဂနွေ', ja: '今週末' },
    date_next_week: { en: 'Next Week', mm: 'လာမည့်အပတ်', ja: '来週' },
    date_advance: { en: 'Advance', mm: 'ကြိုတင်', ja: '事前予約' },
    time_period_title: { en: 'Preferred Dining Time & Period', mm: 'အချိန်အပိုင်းအခြား ရွေးချယ်ရန်', ja: '希望時間帯' },
    exact_hourly_slots: { en: 'Exact Hourly Slots', mm: 'သီးသန့် အချိန်နာရီ', ja: '具体的な時間指定' },
    party_size_section_title: { en: 'Party Size / Number of Guests', mm: 'လူဦးရေ (ဧည့်သည်အရေအတွက်)', ja: 'ご利用人数' },
    locations_section_title: { en: 'Locations & Townships', mm: 'တည်နေရာနှင့် မြို့နယ်များ', ja: 'エリア・タウンシップ' },
    locations_section_desc: {
      en: 'Filter by regional zones, browse townships, or multi-select dining areas',
      mm: 'မြို့နယ်ဇုန်အလိုက် ရွေးချယ်နိုင်သလို မြို့နယ်အမည် ရိုက်ထည့်၍လည်း ရှာဖွေနိုင်ပါသည်',
      ja: 'エリア区分、タウンシップ、主要飲食スポットから複数選択可能'
    },
    selected_count_suffix: { en: 'Selected', mm: 'ခု ရွေးချယ်ထား', ja: '件選択中' },
    township_search_placeholder: {
      en: 'Type to find township (e.g. Bahan, Inya Lake, Sanchaung, Mandalay...)',
      mm: 'မြို့နယ် ရှာဖွေပါ (ဥပမာ- ဗဟန်း၊ မရမ်းကုန်း၊ စမ်းချောင်း၊ ကျောက်တံတား...)',
      ja: 'タウンシップ名を入力 (例: バハン、インヤー湖、サンチャウン...)'
    },
    cuisines_section_title: { en: 'Cuisines & Dining Genres', mm: 'ဟင်းလျာနှင့် အစားအစာ အမျိုးအစားများ', ja: '料理ジャンル・カテゴリー' },
    cuisines_section_desc: {
      en: 'Select from Burmese heritage, Japanese omakase, Italian trattorias, or artisan bakeries',
      mm: 'မြန်မာ့ရိုးရာ၊ ဂျပန်၊ အီတလီ၊ ပင်လယ်စာနှင့် ကော်ဖီဆိုင်များစွာမှ စိတ်ကြိုက်ရွေးချယ်ပါ',
      ja: 'ミャンマー伝統料理、日本食・寿司、イタリアン、シーフードなどから選択'
    },
    atmosphere_section_title: { en: 'Atmosphere & Seating Arrangements', mm: 'ထိုင်ခုံနှင့် အငွေ့အသက် ရွေးချယ်မှု', ja: '雰囲気・座席タイプ' },
    budget_section_title: { en: 'Budget Range per Guest (MMK)', mm: 'ခန့်မှန်း ကုန်ကျစရိတ် (MMK per Guest)', ja: 'ご予算 (1名あたり MMK)' },
    budget_no_limit: { en: 'No Limit', mm: 'မကန့်သတ်', ja: '上限なし' },
    min_price_label: { en: 'Min Price (MMK)', mm: 'အနည်းဆုံး (MMK)', ja: '下限金額 (MMK)' },
    max_price_label: { en: 'Max Price (MMK)', mm: 'အများဆုံး (MMK)', ja: '上限金額 (MMK)' },
    amenities_section_title: { en: 'Dietary Options & Venue Facilities', mm: 'အထူးဝန်ဆောင်မှုများနှင့် အဆင်ပြေမှုများ', ja: '設備・こだわり条件' },
    venues_match_criteria: { en: 'Venues Match Criteria', mm: 'ဆိုင် တွေ့ရှိပါသည်', ja: '件の店舗が該当' },
    realtime_available_slots: { en: 'Real-time available slots', mm: 'ချက်ချင်း စိုတ်ယူနိုင်ပါသည်', ja: '即時予約可能' },
    try_expanding_conditions: { en: 'Try expanding date or location', mm: 'သတ်မှတ်ချက်များကို ပြန်လည်ညှိနှိုင်းပါ', ja: '条件を緩和してお試しください' },
    search_action_btn: { en: 'Search', mm: 'ရှာဖွေပါ', ja: '検索する' },

    // Screen U-51: Home / Discover
    home_tonight_short: { en: 'Tonight', mm: 'ယနေ့', ja: '今夜' },
    home_booked_today: { en: 'Booked Today', mm: 'ယနေ့ဘွတ်ကင်', ja: '本日の予約' },
    home_booked_today_full: { en: 'Tables Booked Today', mm: 'ယနေ့ စားပွဲဘွတ်ကင်', ja: '本日の成立予約数' },
    home_avg_rating: { en: 'Avg Rating', mm: 'ပျမ်းမျှရမှတ်', ja: '平均評価' },
    home_avg_rating_full: { en: 'Average Guest Rating', mm: 'ဧည့်သည် ပျမ်းမျှရမှတ်', ja: 'ゲストの平均評価' },
    home_partner_venues: { en: 'Partner Venues', mm: 'မိတ်ဖက်ဆိုင်များ', ja: '提携店' },
    home_partner_venues_full: { en: 'Partner Venues', mm: 'ရန်ကုန် မိတ်ဖက်ဆိုင်များ', ja: '提携レストラン' },
    home_social_proof_aria: { en: 'Trust and social proof', mm: 'ယုံကြည်မှု အချက်အလက်', ja: '信頼と実績' },
    home_available_tonight: { en: 'Available tonight', mm: 'ယနေ့ည ရရှိနိုင်သော အချိန်များ', ja: '今夜空きあり' },
    home_book_table_for: { en: 'Book table for', mm: 'တွင် စားပွဲဝိုင်း စိုတ်ယူမည်', ja: 'で予約' },
    home_hero_pill: { en: 'Curated Table Reservations • Yangon', mm: 'ရန်ကုန်မြို့၏ အဆင့်မြင့် စားသောက်ဆိုင် စားပွဲဝိုင်းများ', ja: '厳選レストラン予約 • ヤンゴン' },
    home_hero_headline: { 
      en: 'Reserve extraordinary dining, <br class="hidden sm:inline" /><span class="font-serif italic font-normal text-[#840f16]">effortlessly perfected.</span>', 
      mm: 'အမှတ်တရ ညစာစားပွဲနှင့် <span class="font-serif italic font-normal text-[#840f16]">ထူးခြားသော အတွေ့အကြုံများ</span>', 
      ja: '上質なダイニングを、<br class="hidden sm:inline" /><span class="font-serif italic font-normal text-[#840f16]">スマートに予約。</span>' 
    },
    home_hero_subtitle: {
      en: 'Instant table access at Yangon’s most celebrated venues — from heritage tea houses to scenic lakefront sanctuaries.',
      mm: 'နာမည်ကြီး ရိုးရာလက်ဖက်ရည်ဆိုင်များ၊ သာယာသော အင်းလျားကန်စပ် ညစာနှင့် သီးသန့် အဆင့်မြင့် စားသောက်ဆိုင်များတွင် စားပွဲဝိုင်းများကို အချိန်မရွေး ချက်ချင်း စိုတ်ယူလိုက်ပါ။',
      ja: 'ヤンゴンの名店・湖畔レストラン・老舗ティーハウスの空席を即時予約。'
    },
    home_search_dish_label: { en: 'Restaurant or Dish', mm: 'ဆိုင်အမည် / ဟင်းလျာ', ja: '店舗名 / 料理' },
    home_search_dish_aria: { en: 'Search by restaurant or dish', mm: 'ဆိုင်အမည် သို့မဟုတ် ဟင်းလျာဖြင့် ရှာဖွေပါ', ja: '店舗名または料理名で検索' },
    home_search_location_label: { en: 'Location', mm: 'တည်နေရာ', ja: 'エリア' },
    home_select_location: { en: 'Select Location', mm: 'နေရာဒေသ ရွေးချယ်ပါ', ja: 'エリアを選択' },
    home_search_cuisine_label: { en: 'Cuisine', mm: 'အစားအစာ', ja: '料理ジャンル' },
    home_select_cuisine: { en: 'Select Cuisine', mm: 'အစားအစာ အမျိုးအစား ရွေးချယ်ပါ', ja: '料理ジャンルを選択' },
    home_search_conditions_title: { en: 'Search Conditions', mm: 'ရှာဖွေမှု သတ်မှတ်ချက်များ', ja: '検索条件' },
    home_conditions_btn: { en: 'Conditions', mm: 'သတ်မှတ်ချက်', ja: '条件' },
    home_find_tables_btn: { en: 'Find Tables', mm: 'ရှာဖွေပါ', ja: '空席を探す' },
    home_promo_banner_tag: { en: 'Exclusive Dining Offer', mm: 'ပရိုမိုးရှင်း အထူးအစီအစဉ်', ja: '特別ダイニングオファー' },
    home_promo_banner_text: { en: '20% Off Weekend Dining Pass with KBZPay', mm: 'KBZPay & WavePay ဖြင့် စိုတ်ယူပါက ၂၀% လျှော့ဈေး', ja: 'KBZPayご利用で週末20%OFF' },
    home_claim_voucher: { en: 'Claim Voucher', mm: 'ကူပွန်ယူမည်', ja: 'クーポンを獲得' },
    home_sys_banner_tag: { en: 'System Announcement', mm: 'စနစ်ဆိုင်ရာ အသိပေးချက်', ja: 'お知らせ' },
    home_sys_banner_text: { en: 'Instant Table Confirmation Enabled in Yangon', mm: 'ဗဟန်း၊ ဒဂုံ၊ မြို့ထဲတွင် Instant Pass စတင်ပါပြီ', ja: 'ヤンゴン市内での即時予約機能が開始されました' },
    home_banner_book_btn: { en: 'Book Table', mm: 'စိုတ်ယူရန်', ja: '予約する' },
    home_tonight_sub: { en: 'Live availability · One tap to book', mm: 'တစ်ချက်နှိပ်ရုံဖြင့် စိုတ်ယူပါ', ja: '空き状況をリアルタイム表示 · 1タップで予約' },
    home_tonight_title: { en: 'Tonight’s Open Tables', mm: 'ယနေ့ည ဗလာစားပွဲဝိုင်းများ', ja: '今夜の空席' },
    home_tonight_desc: { en: 'Skip the calendar — tap a free dinner slot tonight and reserve instantly.', mm: 'ယနေ့ညအတွက် လစ်လပ်နေသော စားပွဲဝိုင်းများကို အချိန်ရွေးကာ ချက်ချင်း စိုတ်ယူနိုင်ပါသည်', ja: 'カレンダー選択不要 — 今夜のディナー空席を即時予約。' },
    home_collections_title: { en: 'Curated Collections', mm: 'အထူး စုစည်းမှုများ', ja: '特集・コレクション' },
    home_collections_desc: { en: 'Hand-picked culinary editorial guides crafted for romantic evenings, celebrations, and heritage flavors.', mm: 'အစီအစဉ်အမျိုးမျိုးအတွက် အထူးသီးသန့် ရွေးချယ်ပေးထားသော စားသောက်ဆိုင်များ', ja: '記念日、デート、伝統料理などシーンに合わせた厳選ガイド。' },
    home_collections_all_btn: { en: 'Explore All Guides', mm: 'စုစည်းမှု အားလုံး ကြည့်ရန်', ja: 'すべてのガイドを見る' },
    home_curators_issue: { en: 'Curator’s Issue', mm: 'အယ်ဒီတာ့ ရွေးချယ်မှု', ja: 'キュレーター厳選' },
    home_explore_guide: { en: 'Explore Guide', mm: 'လမ်းညွှန် ကြည့်ရှုမည်', ja: 'ガイドを見る' },
    home_curators_choice_edition: { en: 'Curator’s Choice Edition', mm: 'အယ်ဒီတာ့ ရွေးချယ်မှု', ja: 'エディターズチョイス' },
    home_explore_curated_dining_guide: { en: 'Explore Curated Dining Guide', mm: 'စားသောက်ဆိုင်များ စိုတ်ယူရန်', ja: '特集ガイドを見る' },
    home_venues_included_4: { en: '4 Tables Included', mm: '၄ ဆိုင် ပါဝင်ပါသည်', ja: '4店舗掲載' },
    home_venues_included_5: { en: '5 Venues Included', mm: '၅ ဆိုင် ပါဝင်ပါသည်', ja: '5店舗掲載' },
    home_venues_included_6: { en: '6 Venues Included', mm: '၆ ဆိုင် ပါဝင်ပါသည်', ja: '6店舗掲載' },
    home_trending_title: { en: 'Trending Dishes', mm: 'ရေပန်းစားသော ဟင်းလျာများ', ja: '人気の料理' },
    home_trending_desc: { en: 'Top trending signature dishes curated dynamically based on guest popularity and high ratings.', mm: 'ဧည့်သည်များ အကြိုက်ဆုံးနှင့် လူကြိုက်အများဆုံး ထိပ်တန်း ဟင်းလျာများ', ja: 'ゲストの口コミと高評価に基づいたトレンドメニュー。' },
    home_hot_promo_title: { en: 'Hot Promotions', mm: 'အထူးပရိုမိုးရှင်း စားသောက်ဆိုင်များ', ja: 'お得なプロモーション' },
    home_hot_promo_desc: { en: 'Limited-time exclusive dining deals, promotional offers, and special table discounts in Yangon.', mm: 'အချိန်အကန့်အသတ်ဖြင့် ရရှိနိုင်သော အထူးလျှော့စျေးနှင့် ပရိုမိုးရှင်း စားသောက်ဆိုင်များ', ja: 'ヤンゴンの期間限定特典や特別割引プラン。' },

    // Screen U-09: My Page
    mypage_confirmed: { en: 'Confirmed', mm: 'အတည်ပြုပြီး', ja: '予約確定' },
    mypage_pending: { en: 'Pending', mm: 'စောင့်ဆိုင်းဆဲ', ja: '確認待ち' },
    mypage_completed: { en: 'Completed', mm: 'ပြီးမြောက်ပြီး', ja: '来店済み' },
    mypage_cancelled: { en: 'Cancelled', mm: 'ပယ်ဖျက်ပြီး', ja: 'キャンセル済み' },
    mypage_res_history: { en: 'Reservation History', mm: 'စိုတ်ထားမှု မှတ်တမ်း', ja: '予約履歴' },
    mypage_upcoming: { en: 'Upcoming', mm: 'လာမည့် စိုတ်ထားမှုများ', ja: '今後の予約' },
    mypage_all: { en: 'All', mm: 'အားလုံး', ja: 'すべて' },
    mypage_no_res_title: { en: 'No reservations found', mm: 'စိုတ်ထားမှု မှတ်တမ်း မရှိသေးပါ', ja: '予約が見つかりません' },
    mypage_no_res_msg: { en: 'Browse our curated dining catalog to book your next experience.', mm: 'ရန်ကုန်မြို့ရှိ အဆင့်မြင့် စားသောက်ဆိုင်များကို ရှာဖွေပြီး စားပွဲဝိုင်း ချက်ချင်း စိုတ်ယူလိုက်ပါ', ja: 'レストラン一覧から次のお店を予約しましょう。' },
    mypage_explore_restaurants: { en: 'Explore Restaurants', mm: 'ဆိုင်များ ရှာဖွေရန်', ja: 'レストランを探す' },
    mypage_guest_unit: { en: 'guests', mm: 'ဦး', ja: '名様' },
    mypage_details_and_modify: { en: 'Details & Modify', mm: 'အသေးစိတ်နှင့် ပြင်ဆင်ရန်', ja: '詳細・変更' },
    mypage_view_qr_pass: { en: 'View QR Pass', mm: 'QR ကုဒ်ကြည့်ရန်', ja: 'QRパス表示' },
    mypage_qr_pass: { en: 'QR Pass', mm: 'QR ကုဒ်', ja: 'QRパス' },
    mypage_rebook_title: { en: 'Rebook with Same Conditions', mm: 'ယခင် အချက်အလက်များဖြင့် ပြန်စိုတ်ရန်', ja: '同じ条件で再予約' },
    mypage_rebook: { en: 'Rebook', mm: 'ပြန်စိုတ်ရန်', ja: '再予約' },
    mypage_saved_favorites: { en: 'Saved Favorites', mm: 'အကြိုက်ဆုံး ဆိုင်များ', ja: 'お気に入り' },
    mypage_book_table: { en: 'Book Table', mm: 'ဝိုင်းစိုတ်မည်', ja: '予約する' },
    mypage_remove_fav: { en: 'Remove', mm: 'အကြိုက်ဆုံးမှ ဖယ်ရှားရန်', ja: '削除' },
    mypage_vouchers_title: { en: 'Vouchers & Promo Codes', mm: 'ဘောက်ချာနှင့် ကူပွန်များ', ja: 'クーポン・特典' },
    mypage_copy_code: { en: 'Copy Code', mm: 'ကုဒ်ကူးမည်', ja: 'コードをコピー' },
    mypage_points_vip: { en: 'Points & VIP Membership', mm: 'အမှတ်နှင့် အသင်းဝင်အဆင့်', ja: 'ポイント＆会員ステータス' },
    mypage_notif_center: { en: 'Notification Center', mm: 'အသိပေးချက် စင်တာ', ja: 'お知らせセンター' },
    mypage_mark_all_read: { en: 'Mark all as read', mm: 'အားလုံး ဖတ်ပြီးကြောင်း မှတ်သားရန်', ja: 'すべて既読にする' },
    mypage_no_notifs: { en: 'No notifications', mm: 'အသိပေးချက် မရှိသေးပါ', ja: 'お知らせはありません' },
    mypage_sys_announcements: { en: 'System Announcements', mm: 'အထူး ကြေညာချက်များ', ja: 'システムからのお知らせ' },
    mypage_tab_reservations: { en: 'Reservation History', mm: 'စိုတ်ထားမှု မှတ်တမ်း', ja: '予約履歴' },
    mypage_tab_favorites: { en: 'Favorites', mm: 'အကြိုက်ဆုံး ဆိုင်များ', ja: 'お気に入り' },
    mypage_tab_coupons: { en: 'Coupons', mm: 'ဘောက်ချာနှင့် ကူပွန်များ', ja: 'クーポン' },
    mypage_tab_points: { en: 'Points & Membership', mm: 'အမှတ်နှင့် အသင်းဝင်အဆင့်', ja: 'ポイント・会員' },
    mypage_tab_notifications: { en: 'Notification Center', mm: 'အသိပေးချက် စင်တာ', ja: 'お知らせ' },
    mypage_tab_notif_settings: { en: 'Notification Settings', mm: 'အသိပေးချက် ဆက်တင်', ja: '通知設定' },
    mypage_tab_announcements: { en: 'Announcements', mm: 'အထူး ကြေညာချက်များ', ja: 'お知らせ' },
    mypage_tab_account: { en: 'Account Settings', mm: 'အကောင့် ဆက်တင်', ja: 'アカウント設定' },
    mypage_tab_design_system: { en: 'Design System', mm: 'ဒီဇိုင်း စနစ်', ja: 'デザインシステム' },
    mypage_title: { en: 'My Page', mm: 'ကျွန်ုပ်၏ စာမျက်နှာ', ja: 'マイページ' },
    mypage_verified_member: { en: 'Verified Member', mm: 'အတည်ပြုပြီး အဖွဲ့ဝင်', ja: '認証済み会員' },
    mypage_book_new_table: { en: 'Book New Table', mm: 'ဝိုင်းအသစ် စိုတ်ရန်', ja: '新規予約' },
    mypage_back_to_menu: { en: 'Back to Menu', mm: 'ကျွန်ုပ်၏ စာမျက်နှာ မီနူးသို့ ပြန်သွားရန်', ja: 'メニューに戻る' },
    mypage_language_setting: { en: 'Language', mm: 'ဘာသာစကား', ja: '言語' },
    mypage_current_lang: { en: 'Active Language', mm: 'လက်ရှိ ဘာသာစကား', ja: '選択中の言語' },
    mypage_logout: { en: 'Logout', mm: 'အကောင့်ထွက်ရန်', ja: 'ログアウト' },
    mypage_pwa_title: { en: 'Yoyaku Mobile PWA', mm: 'Yoyaku PWA အက်ပ်', ja: 'Yoyaku モバイル PWA' },
    mypage_pwa_desc: { en: 'Instant offline passes and lightning-fast table reservations.', mm: 'အော့ဖ်လိုင်း QR Pass နှင့် လျင်မြန်သော ဝိုင်းစိုတ်မှုအတွက် သင့်ဖုန်းတွင် ထည့်သွင်းပါ', ja: 'オフラインQRパス対応、すばやく予約できます。' },
    mypage_install_app: { en: 'Install App', mm: 'အက်ပ် ထည့်သွင်းရန်', ja: 'アプリをインストール' },
    mypage_qr_modal_title: { en: 'Table Check-in Pass', mm: 'စားပွဲဝိုင်း Check-in QR', ja: 'チェックイン用QRパス' },
    mypage_close_qr: { en: 'Close QR pass', mm: 'QR pass ကို ပိတ်မည်', ja: 'QRパスを閉じる' },
    mypage_restaurant_label: { en: 'Restaurant', mm: 'စားသောက်ဆိုင်', ja: '店舗' },
    mypage_res_id_label: { en: 'Reservation ID', mm: 'ဘွတ်ကင် နံပါတ်', ja: '予約番号' },
    mypage_qr_desc: { en: 'Present this digital pass upon arrival for instant table seating.', mm: 'စားသောက်ဆိုင်သို့ ရောက်ရှိပါက ဤ QR ကုဒ်ကို ပြသပါ', ja: 'ご来店時にこのデジタルパスをご提示ください。' },
    mypage_close_pass: { en: 'Close Pass', mm: 'ပိတ်မည်', ja: '閉じる' },
    mypage_write_review_title: { en: 'Write a Review', mm: 'သုံးသပ်ချက် ရေးသားရန်', ja: '口コミを投稿' },
    mypage_review_desc: { en: 'Share your dining experience with other guests', mm: 'သင်၏ စားသောက်မှု အတွေ့အကြုံကို မျှဝေပါ', ja: 'お食事の感想を他のゲストと共有しましょう' },
    mypage_close_review: { en: 'Close review dialog', mm: 'သုံးသပ်ချက်ရေးရန် dialog ကို ပိတ်မည်', ja: '口コミ投稿を閉じる' },
    mypage_overall_rating: { en: 'Overall Rating', mm: 'အလုံးစုံ အဆင့်သတ်မှတ်ချက်', ja: '総合評価' },
    mypage_rating_selector_label: { en: 'Review rating selector', mm: 'သုံးသပ်ချက် အဆင့်သတ်မှတ်မှု', ja: '評価の選択' },
    mypage_rate_star_prefix: { en: 'Rate', mm: '', ja: '星' },
    mypage_rate_star_suffix: { en: 'out of 5', mm: 'ပွင့် အဆင့်သတ်မှတ်မည်', ja: 'つ' },
    mypage_your_review: { en: 'Your Review', mm: 'သုံးသပ်ချက် အသေးစိတ်', ja: '口コミ内容' },
    mypage_review_placeholder: { en: 'Share what you loved about the food, ambiance, seating, and service...', mm: 'အစားအသောက် အရသာ၊ ဝန်ဆောင်မှုနှင့် ဆိုင်အပြင်အဆင် အကြောင်းကို ရေးသားပါ...', ja: '料理、雰囲気、座席、サービスなどの感想をご記入ください...' },
    mypage_publish_review: { en: 'Publish Review', mm: 'သုံးသပ်ချက် တင်သွင်းမည်', ja: '口コミを投稿する' },
    mypage_otp_title: { en: 'Verify Phone Number (OTP)', mm: 'ဖုန်းနံပါတ် OTP အတည်ပြုခြင်း', ja: '電話番号認証 (OTP)' },
    mypage_close_otp: { en: 'Close OTP verification dialog', mm: 'OTP အတည်ပြု dialog ကို ပိတ်မည်', ja: 'OTP認証を閉じる' },
    mypage_otp_desc_prefix: { en: 'We have sent a 6-digit verification code to', mm: 'လျှို့ဝှက် ဂဏန်း ၆ လုံးပါ SMS ကို', ja: '確認用6桁のコードを次の番号にSMS送信しました：' },
    mypage_otp_desc_suffix: { en: 'via SMS.', mm: 'သို့ ပေးပို့ထားပါသည်။', ja: '' },
    mypage_demo_code: { en: 'Demo Code:', mm: 'နမူနာကုဒ်:', ja: 'デモコード:' },
    mypage_autofill: { en: 'Auto Fill', mm: 'အလိုအလျောက် ထည့်ရန်', ja: '自動入力' },
    mypage_didnt_receive_code: { en: "Didn't receive code?", mm: 'ကုဒ်မရရှိသေးပါသလား?', ja: 'コードが届きませんか？' },
    mypage_resend_sms: { en: 'Resend SMS', mm: 'SMS ပြန်လည်ပေးပို့ရန်', ja: 'SMSを再送信' },
    mypage_verify_btn: { en: 'Verify & Confirm', mm: 'အတည်ပြုမည်', ja: '認証して確認' },
    mypage_withdraw_title: { en: 'Permanently Withdraw Account?', mm: 'အကောင့် အပြီးတိုင် ဖျက်သိမ်းရန် သေချာပါသလား?', ja: 'アカウントを完全に退会しますか？' },
    mypage_withdraw_desc: { en: 'All active reservations, saved favorites, and your accumulated 2,450 Gourmet Points will be permanently deleted.', mm: 'သင်၏ စားပွဲဝိုင်း မှတ်တမ်းများ၊ အကြိုက်ဆုံးဆိုင်များနှင့် Gourmet Points (2,450 PTS) များ အားလုံး ပျက်ပြယ်သွားပါမည်။', ja: '予約中のテーブル、お気に入り、保有ポイントがすべて完全に削除されます。' },
    mypage_keep_account: { en: 'Keep Account', mm: 'မဖျက်တော့ပါ', ja: '退会しない' },
    mypage_confirm_delete: { en: 'Confirm Delete', mm: 'အပြီးတိုင် ဖျက်မည်', ja: '削除を実行' },
    mypage_details: { en: 'Details', mm: 'အသေးစိတ်', ja: '詳細' },
    mypage_review: { en: 'Review', mm: 'သုံးသပ်ချက်', ja: '口コミ' },
    mypage_res_id_label: { en: 'Reservation ID', mm: 'ဘွတ်ကင် နံပါတ်', ja: '予約番号' },
    mypage_restaurant_label: { en: 'Restaurant', mm: 'စားသောက်ဆိုင်', ja: '店舗' },
    mypage_current_lang_en: { en: 'Currently English', mm: 'အင်္ဂလိပ်ဘာသာ အသုံးပြုနေသည်', ja: '現在: 英語' },
    mypage_current_lang_mm: { en: 'Currently Myanmar', mm: 'မြန်မာဘာသာ အသုံးပြုနေသည်', ja: '現在: ミャンマー語' },
    mypage_current_lang_ja: { en: 'Currently Japanese', mm: 'ဂျပန်ဘာသာ အသုံးပြုနေသည်', ja: '現在: 日本語' },
    toast_logged_out: { en: 'Logged out successfully.', mm: 'အကောင့်ထွက်ပြီးပါပြီ', ja: 'ログアウトしました' },
    toast_coupon_copied: { en: 'Coupon code copied to clipboard!', mm: 'ကူပွန်ကုဒ် ကူးယူပြီးပါပြီ!', ja: 'クーポンコードをコピーしました！' },
    toast_fav_removed: { en: 'Removed from favorites.', mm: 'အကြိုက်ဆုံးမှ ဖယ်ရှားပြီးပါပြီ။', ja: 'お気に入りから削除しました。' },
    toast_notifs_all_read: { en: 'All notifications marked as read.', mm: 'အသိပေးချက်များအားလုံး ဖတ်ပြီးကြောင်း မှတ်သားလိုက်ပါပြီ။', ja: 'すべての通知を既読にしました。' },
    toast_copied: { en: 'Copied!', mm: 'ကူးယူပြီးပါပြီ!', ja: 'コピー完了！' },

    // Screen U-05: Shop Info
    shop_back_to_booking: { en: 'Back to Booking', mm: 'ကြိုတင်ဘွတ်ကင် သို့', ja: '予約に戻る' },
    shop_remove_fav: { en: 'Remove from favorites', mm: 'အကြိုက်ဆုံးမှ ဖယ်ရှားမည်', ja: 'お気に入り解除' },
    shop_add_fav: { en: 'Add to favorites', mm: 'အကြိုက်ဆုံးသို့ ထည့်မည်', ja: 'お気に入り追加' },
    shop_open_gallery: { en: 'Open restaurant gallery', mm: 'စားသောက်ဆိုင် ဓာတ်ပုံပြခန်း ဖွင့်မည်', ja: 'ギャラリーを開く' },
    shop_view_gallery: { en: 'View Gallery', mm: 'ပုံများကြည့်ရန်', ja: '写真を見る' },
    shop_special_notice: { en: 'Special Announcement / Notice', mm: 'အထူးအသိပေးချက် (Notice)', ja: 'お知らせ・注意事項' },
    shop_price_range: { en: 'Price Range', mm: 'စျေးနှုန်း', ja: '予算・価格帯' },
    shop_cuisine_style: { en: 'Cuisine Style', mm: 'အစားအစာအမျိုးအစား', ja: '料理ジャンル' },
    shop_opening_hours: { en: 'Opening Hours', mm: 'ဖွင့်ချိန်', ja: '営業時間' },
    shop_public_phone: { en: 'Public Phone:', mm: 'ဆက်သွယ်ရန် ဖုန်းနံပါတ်:', ja: '電話番号:' },
    shop_tab_overview: { en: 'Overview', mm: 'ဆိုင်အချက်အလက်', ja: '店舗情報' },
    shop_tab_menus: { en: 'Menus', mm: 'မီနူးများ', ja: 'メニュー' },
    shop_tab_reviews: { en: 'Reviews', mm: 'ထင်မြင်ချက်များ', ja: '口コミ' },
    shop_about_title: { en: 'About This Shop', mm: 'ဆိုင်အကြောင်း (About)', ja: 'お店について' },
    shop_facilities_title: { en: 'Facilities & Amenities', mm: 'အဆောက်အအုံနှင့် ဝန်ဆောင်မှုများ (Facilities)', ja: '設備・サービス' },
    shop_photo_gallery_title: { en: 'Photo Gallery', mm: 'ဆိုင်၏ ပုံပြခန်း (Gallery)', ja: 'フォトギャラリー' },
    shop_location_map_title: { en: 'Location & Map', mm: 'တည်နေရာနှင့် မြေပုံ', ja: 'アクセス・地図' },
    shop_open_google_maps: { en: 'Open in Google Maps', mm: 'Google Maps တွင်ဖွင့်မည်', ja: 'Googleマップで開く' },
    shop_popular_dishes: { en: 'Popular Dishes', mm: 'လူကြိုက်များသော ဟင်းလျာများ', ja: '人気メニュー' },
    shop_items_suffix: { en: 'items', mm: 'ခု', ja: '品' },
    shop_based_on_reviews: { en: 'verified guest reviews', mm: 'ဧည့်သည် သုံးသပ်ချက်များ', ja: '件の口コミ' },
    shop_service_rating: { en: 'Service', mm: 'ဝန်ဆောင်မှု (Service)', ja: '接客・サービス' },
    shop_value_rating: { en: 'Value', mm: 'ဈေးနှုန်းနှင့် တန်ဖိုး (Value)', ja: 'コストパフォーマンス' },
    shop_ambience_rating: { en: 'Ambience', mm: 'ပတ်ဝန်းကျင် (Atmosphere)', ja: '雰囲気' },
    shop_verified_diner: { en: 'Verified Diner', mm: 'အတည်ပြုပြီး အလည်အပတ်', ja: '認証済み利用者' },
    shop_no_reviews_yet: { en: 'No reviews yet.', mm: 'မှတ်ချက် မရှိသေးပါ။ ပထမဆုံး သုံးသပ်ချက် ပေးပို့နိုင်ပါသည်။', ja: 'まだ口コミはありません。' },
    shop_instant_reservation: { en: 'Instant Reservation', mm: 'ချက်ချင်း စာပွဲ ကြိုတင်ယူခြင်း', ja: '即時予約' },
    shop_book_a_table: { en: 'Book a Table', mm: 'စာပွဲ ကြိုတင်မှာယူမည်', ja: 'テーブルを予約' },
    shop_zero_fees_hint: { en: 'Zero booking fees. Instant confirmation.', mm: 'အပိုကြေးမရှိပါ။ ချက်ချင်း အတည်ပြုချက်ရရှိပါမည်။', ja: '手数料無料。即時予約確定。' },
    shop_book_now: { en: 'Book Now', mm: 'ကြိုတင်မှာယူမည်', ja: '今すぐ予約' },
    shop_instant_confirmation_pass_hint: { en: 'Instant confirmation pass stored in app', mm: 'အတည်ပြုချက် လက်မှတ်ကို အက်ပ်အတွင်း သိမ်းဆည်းပေးပါမည်', ja: 'アプリ内に即時パスが保存されます' },
    shop_close_gallery: { en: 'Close gallery lightbox', mm: 'ဓာတ်ပုံပြခန်း ပိတ်မည်', ja: 'ギャラリーを閉じる' },
    shop_photo_gallery: { en: 'Restaurant photo gallery', mm: 'စားသောက်ဆိုင် ဓာတ်ပုံပြခန်း', ja: 'レストラン写真ギャラリー' },
    shop_prev_image: { en: 'Previous', mm: 'ယခင်ပုံ', ja: '前へ' },
    shop_next_image: { en: 'Next', mm: 'နောက်ပုံ', ja: '次へ' },

    // Screen U-07: Register
    register_title: { en: 'Create Your Account', mm: 'အကောင့်အသစ် ဖွင့်ပါ', ja: 'アカウント作成' },
    register_connecting: { en: 'Connecting...', mm: 'ချိတ်ဆက်နေသည်...', ja: '接続中...' },
    register_with_fb: { en: 'Register with Facebook', mm: 'Facebook ဖြင့် အကောင့်ဖွင့်ရန်', ja: 'Facebookで登録' },
    register_with_google: { en: 'Register with Google', mm: 'Google ဖြင့် အကောင့်ဖွင့်ရန်', ja: 'Googleで登録' },
    register_with_email: { en: 'Register with Email', mm: 'အီးမေးလ်ဖြင့် အကောင့်ဖွင့်ရန်', ja: 'メールアドレスで登録' },
    register_name_label: { en: 'Full Name *', mm: 'အမည် (Full Name) *', ja: 'お名前 *' },
    register_name_placeholder: { en: 'e.g. Alex Aung', mm: 'ဥပမာ - မောင်မောင် သို့မဟုတ် Alex Aung', ja: '例: 山田 太郎' },
    register_name_hint: { en: '1-100 characters (Unicode & English supported)', mm: 'စာလုံးရေ ၁ မှ ၁၀၀ လုံးအတွင်း (မြန်မာ/အင်္ဂလိပ် ရေးနိုင်ပါသည်)', ja: '1〜100文字（英語・ミャンマー語対応）' },
    register_email_label: { en: 'Email Address *', mm: 'အီးမေးလ်လိပ်စာ (Email Address) *', ja: 'メールアドレス *' },
    register_email_hint: { en: 'Verification link will be sent to this email', mm: 'အတည်ပြုလင့်ခ် (MAIL-01) လက်ခံရရှိရန် မှန်ကန်သောအီးမေးလ် ထည့်ပါ', ja: 'このメールアドレスに確認リンクを送信します' },
    register_password_label: { en: 'Password *', mm: 'စကားဝှက် (Password) *', ja: 'パスワード *' },
    register_password_hint: { en: 'Min 8 characters, alphanumeric required', mm: 'အနည်းဆုံး ၈ လုံးရှိရမည်ဖြစ်ပြီး အင်္ဂလိပ်စာလုံးနှင့် ဂဏန်းများ ပါဝင်ရမည်', ja: '8文字以上、英数字を含めてください' },
    register_confirm_password_label: { en: 'Confirm Password *', mm: 'စကားဝှက်အတည်ပြုခြင်း (Confirm Password) *', ja: 'パスワード（確認） *' },
    register_phone_label: { en: 'Phone Number', mm: 'ဖုန်းနံပါတ် (Phone Number)', ja: '電話番号' },
    register_optional: { en: 'Optional', mm: 'ရွေးချယ်နိုင်သည်', ja: '任意' },
    register_agree_prefix: { en: 'I agree to EzBookNow ', mm: 'EzBookNow ၏ ', ja: '利用規約およびプライバシーポリシーに' },
    register_agree_and: { en: ' & ', mm: ' နှင့် ', ja: 'および' },
    register_agree_suffix: { en: ' *', mm: 'ကို သဘောတူပါသည် *', ja: '同意する *' },
    register_creating: { en: 'Creating Account...', mm: 'အကောင့်ဖွင့်နေပါသည်...', ja: 'アカウント作成中...' },
    register_create_btn: { en: 'Create Account', mm: 'အကောင့်ဖွင့်မည်', ja: 'アカウントを作成' },
    register_already_have: { en: 'Already have an account?', mm: 'အကောင့်ရှိပြီးသားဖြစ်ပါက', ja: 'すでにアカウントをお持ちですか？' },
    register_signin_here: { en: 'Sign In here', mm: 'ဒီနေရာတွင် အကောင့်ဝင်ပါ', ja: 'ログインはこちら' },
    register_sso_agree_continue: { en: 'Agree & Create Account', mm: 'သဘောတူပြီး အကောင့်ဖွင့်မည်', ja: '同意してアカウントを作成' },
    register_confirm_email_sent: { en: 'Confirmation Email Sent!', mm: 'အတည်ပြုအီးမေးလ် ပေးပို့ပြီးပါပြီ', ja: '確認メールを送信しました！' },
    register_simulate_verify_btn: { en: '👉 [Simulate Click] Verify Email & Activate Account', mm: '👉 [စမ်းသပ်ချက်] အီးမေးလ်အတည်ပြုရန် ဤနေရာကို နှိပ်ပါ', ja: '👉 [テスト] メールを確認してアカウントを有効化' },
    register_resend_email: { en: 'Resend confirmation email', mm: 'အတည်ပြုအီးမေးလ် မရောက်ပါက ပြန်ပို့ရန်', ja: '確認メールを再送' },
    register_close_later: { en: 'Close & Do this later', mm: 'ပိတ်မည် (Close)', ja: '閉じる（後で確認）' },

    // Screen U-12: Service Intro
    intro_hero_title: { en: 'EzBookNow — Modern Dining & Table Reservations', mm: 'EzBookNow မြန်မာနိုင်ငံ၏ စားပွဲကြိုတင်ရယူစနစ်', ja: 'EzBookNow — ヤンゴンのレストラン即時予約' },
    intro_direct_booking_btn: { en: 'Experience Direct Booking', mm: 'အထူးစားသောက်ဆိုင် ချက်ချင်းဘွတ်ကင်လုပ်မည်', ja: '直接予約を体験する' },
    intro_lookup_res_btn: { en: 'Lookup Reservation', mm: 'ဘွတ်ကင်အမှတ်ဖြင့် စစ်ဆေးရန်', ja: '予約番号で照会' },
    intro_how_it_works_badge: { en: 'Fast & Seamless', mm: 'လွယ်ကူမြန်ဆန်သော အဆင့် ၃ ဆင့်', ja: 'かんたん3ステップ' },
    intro_how_it_works_title: { en: 'How EzBookNow Works', mm: 'စားပွဲကြိုတင်ရယူပုံ အဆင့်ဆင့်', ja: 'ご予約の流れ' },
    intro_step1_title: { en: 'Select Slot & Party', mm: 'ရက်စွဲနှင့် အချိန် ရွေးချယ်ပါ', ja: '日時・人数を選択' },
    intro_step2_title: { en: 'Input Details & Verify', mm: 'အချက်အလက် ဖြည့်သွင်း အတည်ပြုပါ', ja: 'お客様情報を入力' },
    intro_step3_title: { en: 'Instant Digital QR Pass', mm: 'ချက်ချင်း QR Pass ရယူပါ', ja: 'デジタルQRパス即時発行' },
    intro_featured_badge: { en: 'Direct Booking Portals', mm: 'တိုက်ရိုက်လင့်ခ်များ', ja: 'ダイレクト予約' },
    intro_featured_title: { en: 'Featured Restaurants', mm: 'နာမည်ကြီး စားသောက်ဆိုင်များ', ja: '注目のレストラン' },
    intro_book_table_btn: { en: 'Book Table', mm: 'စားပွဲရွေးမည်', ja: '予約する' },
    intro_store_info_btn: { en: 'Store Info', mm: 'ဆိုင်အချက်အလက်', ja: '店舗情報' },
    intro_partner_badge: { en: 'For Restaurant Partners', mm: 'ဆိုင်ရှင်များအတွက်', ja: '飲食店オーナー様へ' },
    intro_partner_title: { en: 'Grow your table reservations with EzBookNow', mm: 'သင်၏ ဆိုင်တွင် EzBookNow ကြိုတင်ဘွတ်ကင်စနစ်ကို အသုံးပြုလိုပါသလား?', ja: 'EzBookNowで集客・ネット予約を導入しませんか？' },
    intro_partner_btn: { en: 'Join as Restaurant Partner', mm: 'မိတ်ဖက်အဖြစ် ဆက်သွယ်ရန်', ja: '提携店のお申し込み' },

    // System Toasts & Validation Messages
    toast_res_cancelled: { en: 'Reservation has been cancelled', mm: 'မှာယူမှုကို အောင်မြင်စွာ ပယ်ဖျက်ပြီးပါပြီ', ja: '予約がキャンセルされました' },
    toast_res_datetime_updated: { en: 'Reservation date & time updated successfully!', mm: 'မှာယူမှု ရက်စွဲနှင့် အချိန် ပြောင်းလဲခြင်း အောင်မြင်ပါသည်', ja: '予約日時が正常に変更されました' },
    toast_review_submitted: { en: 'Review submitted successfully! +500 Points earned.', mm: 'သုံးသပ်ချက် (Review) ပေးပို့မှု အောင်မြင်ပါသည်!', ja: '口コミが送信されました！+500ポイント獲得' },
    toast_rebook_init: { en: 'Re-booking initialized with your saved preferences!', mm: 'ယခင် အချက်အလက်များဖြင့် ပြန်လည်မှာယူမှု စတင်နေပါသည်', ja: '以前の条件で再予約を開始しました' },
    toast_phone_verified: { en: 'Phone verified successfully', mm: 'ဖုန်းနံပါတ် အတည်ပြုပြီးပါပြီ', ja: '電話番号の認証が完了しました' },
    toast_otp_resent: { en: 'New SMS verification code sent', mm: 'အတည်ပြုကုဒ် အသစ် ပေးပို့ပြီးပါပြီ', ja: '新しい認証コードをSMS送信しました' },
    toast_web_push_subscribed: { en: 'Web Push notifications successfully subscribed!', mm: 'Web Push အသိပေးချက်ကို အောင်မြင်စွာ ခွင့်ပြုထားပါပြီ', ja: 'Webプッシュ通知を有効にしました' },
    toast_web_push_unsubscribed: { en: 'Web Push notifications unsubscribed.', mm: 'Web Push အသိပေးချက်ကို ပယ်ဖျက်လိုက်ပါပြီ', ja: 'Webプッシュ通知を解除しました' },
    toast_logged_in: { en: 'Logged in successfully!', mm: 'အောင်မြင်စွာ အကောင့်ဝင်ပြီးပါပြီ', ja: 'ログインしました' },
    toast_email_verified: { en: 'Email verified! Account activated successfully.', mm: 'အီးမေးလ် အတည်ပြုခြင်း အောင်မြင်ပြီး အကောင့်ဖွင့်ပြီးပါပြီ!', ja: 'メールアドレスが確認され、アカウントが有効化されました' },
    err_locked: { en: 'Account temporarily locked due to failed attempts. Please try again in 15 minutes.', mm: 'အကြိမ်ကြိမ် မှားယွင်းမှုကြောင့် အကောင့်ကို ယာယီပိတ်ထားပါသည်။ ၁၅ မိနစ်အကြာတွင် ပြန်လည်ကြိုးစားပါ။', ja: 'ログイン試行回数が制限を超えました。15分後に再度お試しください。' },
    err_suspended: { en: 'Your account has been suspended. Please contact us.', mm: 'သင့်အကောင့်ကို ရပ်ဆိုင်းထားပါသည်။ ကျေးဇူးပြု၍ စီမံခန့်ခွဲသူထံ ဆက်သွယ်ပါ။', ja: 'アカウントが停止されています。サポートにお問い合わせください。' },
    err_ratelimit: { en: 'Too many attempts. Please try again later.', mm: 'ကြိုးစားမှု အကြိမ်ရေ များလွန်းနေပါသည်။ ခဏအကြာမှ ထပ်မံကြိုးစားပါ။', ja: '試行回数が多すぎます。しばらく待ってから再度お試しください。' },
    err_credentials: { en: 'Email address or password is incorrect', mm: 'အီးမေးလ် သို့မဟုတ် စကားဝှက် မှားယွင်းနေပါသည်', ja: 'メールアドレスまたはパスワードが正しくありません' },
    val_name_len: { en: 'Name must be between 1 and 100 characters', mm: 'အမည်ကို အနည်းဆုံး ၁ လုံးမှ ၁၀၀ လုံးအတွင်း ထည့်ပေးပါ', ja: 'お名前は1〜100文字で入力してください' },
    val_email_valid: { en: 'Please enter a valid email address', mm: 'မှန်ကန်သော အီးမေးလ်လိပ်စာ ထည့်ပေးပါ', ja: '有効なメールアドレスを入力してください' },
    val_email_exists: { en: 'This email address is already registered', mm: 'ဤအီးမေးလ်လိပ်စာဖြင့် အကောင့်ဖွင့်ထားပြီးဖြစ်ပါသည်', ja: 'このメールアドレスは既に登録されています' },
    val_pass_format: { en: 'Password must be at least 8 characters and contain both letters and numbers', mm: 'စကားဝှက်သည် အနည်းဆုံး ၈ လုံးရှိရမည်ဖြစ်ပြီး အင်္ဂလိပ်စာလုံးနှင့် ဂဏန်းများ ပါဝင်ရမည်', ja: 'パスワードは8文字以上で英数字を含めてください' },
    val_pass_match: { en: 'Passwords do not match', mm: 'အတည်ပြုစကားဝှက်နှင့် မကိုက်ညီပါ', ja: 'パスワードが一致しません' },
    val_phone_mm: { en: 'Please enter a valid Myanmar phone number (starts with +95 or 09)', mm: 'မြန်မာဖုန်းနံပါတ် ပုံစံမှန်ကန်စွာ ထည့်သွင်းပါ (+95 သို့မဟုတ် 09...)', ja: 'ミャンマーの有効な電話番号（+95または09で始まる）を入力してください' },
    val_terms_required: { en: 'You must agree to the Terms of Service to create an account', mm: 'အကောင့်မဖွင့်မီ အသုံးပြုမှုစည်းမျဉ်းများကို သဘောတူရန် လိုအပ်ပါသည်', ja: '利用規約への同意が必要です' },

    // Calendar
    cal_prev_month: { en: 'Previous Month', mm: 'ယခင်လ', ja: '前月' },
    cal_next_month: { en: 'Next Month', mm: 'နောက်လ', ja: '翌月' },
    cal_selected_date: { en: 'Selected:', mm: 'ရွေးချယ်ထားသော ရက်:', ja: '選択中:' },
    months: {
      en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      mm: ['ဇန်နဝါရီ', 'ဖေဖော်ဝါရီ', 'မတ်', 'ဧပြီ', 'မေ', 'ဇွန်', 'ဇူလိုင်', 'သြဂုတ်', 'စက်တင်ဘာ', 'အောက်တိုဘာ', 'နိုဝင်ဘာ', 'ဒီဇင်ဘာ'],
      ja: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    days_short: {
      en: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      mm: ['နွေ', 'လာ', 'ဂါ', 'ဟူး', 'တေး', 'ကြာ', 'နေ'],
      ja: ['日', '月', '火', '水', '木', '金', '土']
    }
  };

  /**
   * Resolve active language code: 'EN', 'MM', 'JA'
   */
  function getLang() {
    const lang = (window.store && window.store.getState)
      ? (window.store.getState().currentLanguage || DEFAULT_LANG)
      : (localStorage.getItem('yoyaku_lang') || DEFAULT_LANG);
    return lang ? lang.toUpperCase() : DEFAULT_LANG;
  }

  /**
   * Helper function: returns localized string based on active language
   * Supports:
   *  1. Key lookup: t('step1')
   *  2. Direct inline fallback: t('Hello', 'မင်္ဂလာပါ', 'こんにちは')
   */
  function t(keyOrEn, mm, ja) {
    if (!keyOrEn) return '';
    const currentLang = getLang();
    const langKey = currentLang.toLowerCase();

    // 1. If key is in DICT
    if (typeof keyOrEn === 'string' && DICT[keyOrEn]) {
      const entry = DICT[keyOrEn];
      if (typeof entry === 'object') {
        const val = entry[langKey] || entry['en'];
        return val !== undefined ? val : keyOrEn;
      }
      return entry;
    }

    // 2. Direct inline fallback if 3 arguments passed
    if (mm !== undefined || ja !== undefined) {
      if (currentLang === 'JA') {
        return (ja !== undefined && ja !== null && ja !== '') ? ja : keyOrEn;
      }
      if (currentLang === 'MM') {
        return (mm !== undefined && mm !== null && mm !== '') ? mm : keyOrEn;
      }
      return keyOrEn;
    }

    return keyOrEn;
  }

  function text(key) {
    return t(key);
  }

  function getMonthNames(lang) {
    const l = (lang || getLang()).toLowerCase();
    return (DICT.months && DICT.months[l]) || DICT.months.en;
  }

  function getDayHeaders(lang) {
    const l = (lang || getLang()).toLowerCase();
    return (DICT.days_short && DICT.days_short[l]) || DICT.days_short.en;
  }

  function formatMonthYear(year, monthIndex, lang) {
    const l = (lang || getLang()).toUpperCase();
    const months = getMonthNames(l);
    if (l === 'JA') {
      return `${year}年 ${months[monthIndex]}`;
    }
    return `${months[monthIndex]} ${year}`;
  }

  window.YoyakuI18n.SUPPORTED_LANGS = SUPPORTED_LANGS;
  window.YoyakuI18n.LANG_METADATA = LANG_METADATA;
  window.YoyakuI18n.DEFAULT_LANG = DEFAULT_LANG;
  window.YoyakuI18n.t = t;
  window.YoyakuI18n.text = text;
  window.YoyakuI18n.getLang = () => getLang().toLowerCase();
  window.YoyakuI18n.getRawLang = () => getLang();
  window.YoyakuI18n.getMonthNames = getMonthNames;
  window.YoyakuI18n.getDayHeaders = getDayHeaders;
  window.YoyakuI18n.formatMonthYear = formatMonthYear;
  window.YoyakuI18n.DICT = DICT;

  // Global shorthands so any component or screen can use I18n.t(...) or window.t(...)
  window.I18n = window.YoyakuI18n;
  window.t = t;
})();
