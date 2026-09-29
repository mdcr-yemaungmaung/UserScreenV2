(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;
  const t = (k) => window.I18n ? window.I18n.t(k) : (window.YoyakuI18n ? window.YoyakuI18n.t(k) : k);

  // Master Township Hierarchy & Zones for Yangon and Myanmar
  const LOCATION_ZONES = [
    {
      id: 'all',
      nameEn: 'All Yangon & Beyond',
      nameMm: 'ရန်ကုန်နှင့် နယ်မြို့များ (အားလုံး)',
      icon: 'explore',
      townships: [
        { id: 'All Areas', nameEn: 'All Areas', nameMm: 'နေရာဒေသ အားလုံး', sub: 'Across Myanmar', icon: 'explore' }
      ]
    },
    {
      id: 'central',
      nameEn: 'Central & Diplomatic',
      nameMm: 'ဗဟန်း၊ ဒဂုံ၊ သံတမန်ရိပ်သာဇုန်',
      icon: 'location_city',
      townships: [
        { id: 'Bahan Township', nameEn: 'Bahan Township', nameMm: 'ဗဟန်းမြို့နယ်', sub: 'Golden Valley & Diplomatic', icon: 'pin_drop' },
        { id: 'Dagon Township', nameEn: 'Dagon Township', nameMm: 'ဒဂုံမြို့နယ်', sub: 'Pagoda & Cultural District', icon: 'temple_buddhist' },
        { id: 'Sanchaung Township', nameEn: 'Sanchaung Township', nameMm: 'စမ်းချောင်းမြို့နယ်', sub: 'Cafe Hub & Shin Saw Pu', icon: 'storefront' },
        { id: 'Kamayut Township', nameEn: 'Kamayut Township', nameMm: 'ကမာရွတ်မြို့နယ်', sub: 'Hledan & University Corridor', icon: 'school' },
        { id: 'Ahlone Township', nameEn: 'Ahlone Township', nameMm: 'အလုံမြို့နယ်', sub: 'Riverside Sanctuary', icon: 'nature_people' }
      ]
    },
    {
      id: 'downtown',
      nameEn: 'Downtown Heritage',
      nameMm: 'မြို့လယ် ရှေးဟောင်းအမွေအနှစ်ဇုန်',
      icon: 'apartment',
      townships: [
        { id: 'Yangon Downtown', nameEn: 'Yangon Downtown (Central)', nameMm: 'ရန်ကုန်မြို့လယ် (ကျောက်တံတား)', sub: 'Colonial & Sule Pagoda', icon: 'apartment' },
        { id: 'Kyauktada Township', nameEn: 'Kyauktada Township', nameMm: 'ကျောက်တံတားမြို့နယ်', sub: 'Heritage Arcade & Merchant St', icon: 'account_balance' },
        { id: 'Botataung Township', nameEn: 'Botataung / River Pier', nameMm: 'ဗိုလ်တထောင် / ဆိပ်ကမ်း', sub: 'Riverfront & Jetty 6', icon: 'directions_boat' },
        { id: 'Seikkan Township', nameEn: 'Seikkan Township', nameMm: 'ဆိပ်ကမ်းမြို့နယ်', sub: 'Port & Marine Pier', icon: 'sailing' },
        { id: 'Pabedan Township', nameEn: 'Pabedan Township', nameMm: 'ပန်းဘဲတန်းမြို့နယ်', sub: 'Bogyoke Market & Junction', icon: 'shopping_bag' },
        { id: 'Latha Township', nameEn: 'Latha & Chinatown', nameMm: 'လသာ / တရုတ်တန်း', sub: 'Chinatown & Night Stalls', icon: 'ramen_dining' }
      ]
    },
    {
      id: 'inya_north',
      nameEn: 'Inya Lake & North Yangon',
      nameMm: 'အင်းလျားကန်စပ်နှင့် မရမ်းကုန်းဇုန်',
      icon: 'water',
      townships: [
        { id: 'Inya Lake Waterfront', nameEn: 'Inya Lake Waterfront', nameMm: 'အင်းလျားကန်ပေါင်', sub: 'Scenic Lakefront Dining', icon: 'water' },
        { id: 'Mayangone Township', nameEn: 'Mayangone Township', nameMm: 'မရမ်းကုန်းမြို့နယ်', sub: 'Kaba Aye Pagoda Corridor', icon: 'pin_drop' },
        { id: 'Yankin Township', nameEn: 'Yankin Township', nameMm: 'ရန်ကင်းမြို့နယ်', sub: 'Myanmar Plaza Area', icon: 'local_mall' },
        { id: 'Hlaing Township', nameEn: 'Hlaing Township', nameMm: 'လှိုင်မြို့နယ်', sub: 'Insein Rd & MICT Park', icon: 'business' },
        { id: 'Parami Area', nameEn: 'Parami / 8 Mile', nameMm: 'ပါရမီ / ၈ မိုင်', sub: 'Residential Dining Corridors', icon: 'home' }
      ]
    },
    {
      id: 'east_suburbs',
      nameEn: 'East & Suburban Yangon',
      nameMm: 'အရှေ့ပိုင်းနှင့် ဆင်ခြေဖုံးမြို့နယ်များ',
      icon: 'holiday_village',
      townships: [
        { id: 'Tamwe Township', nameEn: 'Tamwe Township', nameMm: 'တာမွေမြို့နယ်', sub: 'Kyite Ka San & Local Gems', icon: 'near_me' },
        { id: 'South Okkalapa', nameEn: 'South Okkalapa', nameMm: 'တောင်ဥက္ကလာပ', sub: 'Garden Streets & Tea Hubs', icon: 'local_cafe' },
        { id: 'Thingangyun Township', nameEn: 'Thingangyun Township', nameMm: 'သင်္ဃန်းကျွန်းမြို့နယ်', sub: 'AKK Mall & Thuwanna', icon: 'stadium' },
        { id: 'North Dagon', nameEn: 'North Dagon', nameMm: 'မြောက်ဒဂုံမြို့နယ်', sub: 'Pinlon & Modern Cafes', icon: 'landscape' }
      ]
    },
    {
      id: 'regional',
      nameEn: 'Regional Destinations',
      nameMm: 'မန္တလေး၊ ပုဂံနှင့် ခရီးသွားဒေသများ',
      icon: 'terrain',
      townships: [
        { id: 'Mandalay Heritage', nameEn: 'Mandalay Heritage', nameMm: 'မန္တလေးမြို့', sub: 'Royal Palace & 66th St', icon: 'castle' },
        { id: 'Bagan Archaeological', nameEn: 'Bagan Archaeological', nameMm: 'ပုဂံ ရှေးဟောင်းဒေသ', sub: 'Old Bagan & Sunset Views', icon: 'temple_hindu' },
        { id: 'Inle Lake Heritage', nameEn: 'Inle Lake Shan State', nameMm: 'အင်းလေးကန်', sub: 'Floating Gardens & Shan Dining', icon: 'sailing' }
      ]
    }
  ];

  // Master Cuisine Clusters
  const CUISINE_GROUPS = [
    {
      id: 'all_cuisines',
      nameEn: 'All Cuisines',
      nameMm: 'ဟင်းလျာ အားလုံး',
      icon: 'restaurant_menu',
      items: [
        { id: 'All Cuisines', nameEn: 'All Cuisines', nameMm: 'အစားအစာ အားလုံး', icon: 'restaurant_menu', sub: 'Explore Everything' }
      ]
    },
    {
      id: 'myanmar_regional',
      nameEn: 'Myanmar & Regional Specialties',
      nameMm: 'မြန်မာ့ရိုးရာနှင့် တိုင်းရင်းသား လက်ရာများ',
      icon: 'rice_bowl',
      items: [
        { id: 'Burmese', nameEn: 'Burmese Royal & Traditional', nameMm: 'မြန်မာ နန်းတွင်းရိုးရာ', icon: 'rice_bowl', sub: 'Curries, Salads & Soups' },
        { id: 'Teahouse & Snacks', nameEn: 'Teahouse & Traditional Snacks', nameMm: 'လက်ဖက်ရည်နှင့် မုန့်', icon: 'local_cafe', sub: 'Mohinga, Paratha & Chai' },
        { id: 'Shan Traditional', nameEn: 'Shan Heritage & Clay Pot', nameMm: 'ရှမ်းရိုးရာ အထူးလက်ရာ', icon: 'soup_kitchen', sub: 'Shan Noodles & Tofu' },
        { id: 'Rakhine Spicy', nameEn: 'Rakhine Spicy Seafood', nameMm: 'ရခိုင်စပ်စပ် ပင်လယ်စာ', icon: 'whatshot', sub: 'Mont Di & Fresh Fish' }
      ]
    },
    {
      id: 'east_asian',
      nameEn: 'Japanese & East Asian',
      nameMm: 'ဂျပန်၊ တရုတ်နှင့် အာရှဟင်းလျာများ',
      icon: 'ramen_dining',
      items: [
        { id: 'Japanese', nameEn: 'Japanese & Sushi', nameMm: 'ဂျပန် / ဆူရှီ', icon: 'ramen_dining', sub: 'Nigiri, Ramen & Robata' },
        { id: 'Omakase', nameEn: 'Omakase & Kaiseki', nameMm: 'အိုမာကာဆေ အဆင့်မြင့်', icon: 'set_meal', sub: 'Chef Tasting Degustation' },
        { id: 'Chinese & Dim Sum', nameEn: 'Chinese & Dim Sum', nameMm: 'တရုတ်နှင့် ဒင်းဆမ်း', icon: 'soup_kitchen', sub: 'Cantonese Roasts & Har Gow' },
        { id: 'Korean BBQ', nameEn: 'Korean BBQ & Hotpot', nameMm: 'ကိုရီးယား အကင်နှင့် ဟော့ပေါ့', icon: 'local_fire_department', sub: 'Bulgogi & Kimchi Stews' }
      ]
    },
    {
      id: 'western_european',
      nameEn: 'Western & European Dining',
      nameMm: 'အီတလီ၊ ပြင်သစ်နှင့် ဥရောပဟင်းလျာများ',
      icon: 'dinner_dining',
      items: [
        { id: 'Italian', nameEn: 'Italian & Wood-fired Pizza', nameMm: 'အီတလီ / ပီဇာ', icon: 'local_pizza', sub: 'Handmade Pasta & Neapolitan' },
        { id: 'French', nameEn: 'French Fine Dining', nameMm: 'ပြင်သစ် အဆင့်မြင့်', icon: 'wine_bar', sub: 'Haute Cuisine & Cellar Wines' },
        { id: 'European', nameEn: 'European Fusion Bistro', nameMm: 'ဥရောပ ဟင်းလျာ', icon: 'dinner_dining', sub: 'Continental Classics' },
        { id: 'Steakhouse & Grill', nameEn: 'Steakhouse & Dry-Aged Beef', nameMm: 'စတိတ်နှင့် အမဲသားကင်', icon: 'kebab_dining', sub: 'Wagyu & Charcoal Cuts' }
      ]
    },
    {
      id: 'southeast_asian',
      nameEn: 'Southeast Asian & Seafood',
      nameMm: 'ထိုင်းနှင့် ပင်လယ်စာ အထူးဟင်းလျာများ',
      icon: 'sailing',
      items: [
        { id: 'Thai & Southeast Asian', nameEn: 'Thai & Southeast Asian', nameMm: 'ထိုင်းနှင့် အာရှဟင်းလျာ', icon: 'lunch_dining', sub: 'Tom Yum, Curries & Wok' },
        { id: 'Seafood & Grill', nameEn: 'Day-Boat Seafood & Catch', nameMm: 'ပင်လယ်စာနှင့် အကင်', icon: 'sailing', sub: 'Lobster, Crab & Bincho Fish' },
        { id: 'Casual Dining', nameEn: 'Casual Dining & Bistro', nameMm: 'မိသားစု စားသောက်ဆိုင်', icon: 'restaurant', sub: 'Comfort Feasts' }
      ]
    },
    {
      id: 'bakery_cafe',
      nameEn: 'Bakery, Cafe & Lounges',
      nameMm: 'မုန့်တိုက်၊ ကော်ဖီနှင့် ဘားများ',
      icon: 'bakery_dining',
      items: [
        { id: 'Artisanal Bakery & Cafe', nameEn: 'Artisanal Bakery & Cafe', nameMm: 'မုန့်တိုက်နှင့် ကော်ဖီဆိုင်', icon: 'bakery_dining', sub: 'Sourdough, Pastries & Brunch' },
        { id: 'Specialty Coffee', nameEn: 'Shan Specialty Coffee', nameMm: 'အထူးကော်ဖီဆိုင်', icon: 'local_cafe', sub: 'Pour-Over & Cold Brews' },
        { id: 'Cocktail & Lounge', nameEn: 'Cocktail Bar & Sunset Lounge', nameMm: 'ကော့တေးနှင့် ညနေခင်းဘား', icon: 'nightlife', sub: 'Mixology & Wine Terrace' }
      ]
    }
  ];

  // Helper logic to calculate live matching restaurants count
  function calculateMatchingCount(rState) {
    const { RESTAURANTS_DATA } = window.YoyakuData || {};
    if (!RESTAURANTS_DATA) return 0;

    return RESTAURANTS_DATA.filter(r => {
      // 1. Keyword match
      if (rState.keyword && rState.keyword.trim() !== '') {
        const kw = rState.keyword.toLowerCase().trim();
        const mName = (r.name || '').toLowerCase().includes(kw);
        const mNameMM = (r.nameMM || '').toLowerCase().includes(kw);
        const mVenue = (r.venueName || '').toLowerCase().includes(kw);
        const mCuisine = (r.cuisine || '').toLowerCase().includes(kw);
        const mArea = (r.area || '').toLowerCase().includes(kw);
        const mLocation = (r.location || '').toLowerCase().includes(kw);
        const mAddress = (r.address || '').toLowerCase().includes(kw);
        const mTagline = (r.tagline || '').toLowerCase().includes(kw);
        const mFeatures = (r.features || []).some(f => f.toLowerCase().includes(kw));
        const mFacilities = (r.facilities || []).some(f => (f.label || '').toLowerCase().includes(kw) || (f.labelMM || '').toLowerCase().includes(kw));
        const mHighlights = (r.highlights || []).some(h => (h.title || '').toLowerCase().includes(kw) || (h.desc || '').toLowerCase().includes(kw));
        if (!mName && !mNameMM && !mVenue && !mCuisine && !mArea && !mLocation && !mAddress && !mTagline && !mFeatures && !mFacilities && !mHighlights) {
          return false;
        }
      }

      // 2. Area match (supports multi-select array `selectedAreas` or single `area`)
      const selectedAreas = rState.selectedAreas && rState.selectedAreas.length > 0 
        ? rState.selectedAreas 
        : (rState.area && rState.area !== 'All Areas' && rState.area !== 'All' && rState.area !== 'အားလုံး' ? [rState.area] : []);

      if (selectedAreas.length > 0) {
        const rArea = (r.area || '').toLowerCase();
        const rLoc = (r.location || '').toLowerCase();
        const rAddr = (r.address || '').toLowerCase();

        const matchesAnyArea = selectedAreas.some(targetArea => {
          if (targetArea === 'All Areas' || targetArea === 'All') return true;
          const target = targetArea.toLowerCase().replace('township', '').trim();
          return rArea.includes(target) || rLoc.includes(target) || rAddr.includes(target) || target.includes(rArea);
        });

        if (!matchesAnyArea) return false;
      }

      // 3. Cuisine match (supports multi-select array `selectedCuisines` or single `cuisine`)
      const selectedCuisines = rState.selectedCuisines && rState.selectedCuisines.length > 0
        ? rState.selectedCuisines
        : (rState.cuisine && rState.cuisine !== 'All Cuisines' && rState.cuisine !== 'All' && rState.cuisine !== 'အားလုံး' ? [rState.cuisine] : []);

      if (selectedCuisines.length > 0) {
        const rCuisine = (r.cuisine || '').toLowerCase();
        const rDesc = (r.description || '').toLowerCase();
        const rTag = (r.tagline || '').toLowerCase();

        const matchesAnyCuisine = selectedCuisines.some(targetCuisine => {
          if (targetCuisine === 'All Cuisines' || targetCuisine === 'All') return true;
          const target = targetCuisine.toLowerCase().split('&')[0].trim();
          return rCuisine.includes(target) || rDesc.includes(target) || rTag.includes(target);
        });

        if (!matchesAnyCuisine) return false;
      }

      // 4. Seating Preference match
      if (rState.seatingPreference && rState.seatingPreference !== 'all') {
        const pref = rState.seatingPreference.toLowerCase();
        const rFeatures = (r.features || []).map(f => f.toLowerCase());
        const rFacilities = (r.facilities || []).map(f => (f.label || '').toLowerCase());
        const combined = [...rFeatures, ...rFacilities].join(' ');
        if (!combined.includes(pref)) {
          if (pref.includes('private') && !combined.includes('private') && !combined.includes('vip') && !combined.includes('tatami')) return false;
          if (pref.includes('outdoor') && !combined.includes('outdoor') && !combined.includes('garden') && !combined.includes('lawn') && !combined.includes('patio')) return false;
          if (pref.includes('lake') && !combined.includes('lake') && !combined.includes('view') && !combined.includes('sunset') && !combined.includes('river')) return false;
          if (pref.includes('bar') && !combined.includes('bar') && !combined.includes('counter')) return false;
        }
      }

      // 5. Features / Amenities match (Multi-select)
      if (rState.selectedFeatures && rState.selectedFeatures.length > 0) {
        const rFeatures = (r.features || []).map(f => f.toLowerCase());
        const rFacilities = (r.facilities || []).map(f => (f.label || '').toLowerCase());
        const rDining = r.diningInfo || {};
        const dietaryStr = (rDining.dietary || '').toLowerCase();
        const payStr = (rDining.payments || []).join(' ').toLowerCase();
        const combined = [...rFeatures, ...rFacilities, dietaryStr, payStr].join(' ');

        for (const sf of rState.selectedFeatures) {
          const sfLower = sf.toLowerCase();
          if (sfLower.includes('wifi') && !combined.includes('wi-fi') && !combined.includes('wifi')) return false;
          if (sfLower.includes('parking') && !combined.includes('parking') && !combined.includes('valet')) return false;
          if (sfLower.includes('ac') || sfLower.includes('air')) {
            if (!combined.includes('air conditioning') && !combined.includes('ac') && !combined.includes('conditioned')) return false;
          }
          if (sfLower.includes('private') && !combined.includes('private') && !combined.includes('vip') && !combined.includes('tatami')) return false;
          if (sfLower.includes('outdoor') && !combined.includes('outdoor') && !combined.includes('garden') && !combined.includes('terrace') && !combined.includes('patio')) return false;
          if (sfLower.includes('lake') && !combined.includes('lake') && !combined.includes('water') && !combined.includes('river') && !combined.includes('sunset')) return false;
          if (sfLower.includes('halal') && !combined.includes('halal')) return false;
          if (sfLower.includes('veg') && !combined.includes('veg') && !dietaryStr.includes('vegan') && !dietaryStr.includes('vegetarian')) return false;
          if (sfLower.includes('wine') && !combined.includes('wine') && !combined.includes('sommelier') && !combined.includes('bar')) return false;
          if (sfLower.includes('music') && !combined.includes('music') && !combined.includes('jazz') && !combined.includes('harp') && !combined.includes('live')) return false;
          if (sfLower.includes('generator') && !combined.includes('generator') && !combined.includes('backup')) return false;
          if (sfLower.includes('pet') && !combined.includes('pet') && !combined.includes('pup')) return false;
        }
      }

      // 6. Price range match
      if (rState.budgetTier && rState.budgetTier !== 'all') {
        const priceStr = (r.priceRange || '').replace(/,/g, '');
        const nums = priceStr.match(/\d+/g);
        if (nums && nums.length > 0) {
          const minP = parseInt(nums[0], 10);
          const maxP = nums.length > 1 ? parseInt(nums[1], 10) : minP;
          if (rState.budgetTier === 'under15k' && minP > 15000) return false;
          if (rState.budgetTier === '15k-35k' && (maxP < 15000 || minP > 35000)) return false;
          if (rState.budgetTier === '35k-60k' && (maxP < 35000 || minP > 60000)) return false;
          if (rState.budgetTier === '60k+' && maxP < 60000) return false;
        }
      }

      if (rState.minPrice && !isNaN(Number(rState.minPrice))) {
        const reqMin = Number(rState.minPrice);
        const priceStr = (r.priceRange || '').replace(/,/g, '');
        const nums = priceStr.match(/\d+/g);
        if (nums && nums.length > 1) {
          const maxP = parseInt(nums[1], 10);
          if (maxP < reqMin) return false;
        }
      }

      if (rState.maxPrice && !isNaN(Number(rState.maxPrice))) {
        const reqMax = Number(rState.maxPrice);
        const priceStr = (r.priceRange || '').replace(/,/g, '');
        const nums = priceStr.match(/\d+/g);
        if (nums && nums.length > 0) {
          const minP = parseInt(nums[0], 10);
          if (minP > reqMax) return false;
        }
      }

      return true;
    }).length;
  }

  function renderSearchConditionModal(state) {
    if (!state.searchConditionOpen) return '';

    const isMm = state.currentLanguage === 'MM';
    const rState = state.resultsState || {};

    const activeKeyword = rState.keyword || '';
    const activeArea = rState.area || 'All Areas';
    const activeSelectedAreas = rState.selectedAreas || (rState.area && rState.area !== 'All Areas' ? [rState.area] : []);
    const activeCuisine = rState.cuisine || 'All Cuisines';
    const activeSelectedCuisines = rState.selectedCuisines || (rState.cuisine && rState.cuisine !== 'All Cuisines' ? [rState.cuisine] : []);
    
    const activeDateMode = rState.dateMode || (rState.selectedDate === 'any' ? 'any' : 'specific');
    const activeDate = rState.selectedDate || 'any';
    const activeDateLabel = rState.dateLabel || (activeDate === 'any' ? 'Any Date' : 'Today');
    
    const activeTimeMode = rState.timeMode || (rState.time === 'any' ? 'any' : 'specific');
    const activeTime = rState.time || '18:30';
    const activePartySize = rState.partySize || 'All Sizes';
    const activeBudgetTier = rState.budgetTier || 'all';
    const activeFeatures = rState.selectedFeatures || [];
    const activeSeating = rState.seatingPreference || 'all';

    const activeLocationZone = rState.activeLocationZone || 'all';
    const activeCuisineCategory = rState.activeCuisineCategory || 'all_cuisines';
    const locationQuery = rState.locationQuery || '';

    const matchCount = calculateMatchingCount(rState);

    // Time presets
    const timePeriods = [
      { id: 'any', label: t('time_period_any'), icon: 'all_inclusive', sub: t('time_period_any_sub') },
      { id: 'lunch', label: t('time_period_lunch'), icon: 'wb_sunny', sub: t('time_period_lunch_sub'), defaultTime: '12:30' },
      { id: 'afternoon', label: t('time_period_afternoon'), icon: 'local_cafe', sub: t('time_period_afternoon_sub'), defaultTime: '15:30' },
      { id: 'dinner', label: t('time_period_dinner'), icon: 'dark_mode', sub: t('time_period_dinner_sub'), defaultTime: '18:30' },
      { id: 'late', label: t('time_period_late'), icon: 'nightlife', sub: t('time_period_late_sub'), defaultTime: '21:30' }
    ];

    const exactTimes = ['11:30', '12:00', '12:30', '13:00', '13:30', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];

    // Party sizes
    const partySizes = [
      { id: 'All Sizes', label: t('party_size_all'), icon: 'group' },
      { id: '1', label: t('party_size_1'), icon: 'person' },
      { id: '2', label: t('party_size_2'), icon: 'people' },
      { id: '3', label: t('party_size_3'), icon: 'group' },
      { id: '4', label: t('party_size_4'), icon: 'groups' },
      { id: '6', label: t('party_size_6'), icon: 'groups_2' },
      { id: '8+', label: t('party_size_8plus'), icon: 'diversity_3' }
    ];

    // Budget tiers
    const budgetTiers = [
      { id: 'all', label: t('budget_all'), sub: t('budget_all_sub') },
      { id: 'under15k', label: '< 15,000 MMK', sub: t('budget_under15k_sub') },
      { id: '15k-35k', label: '15K – 35K MMK', sub: t('budget_15k_35k_sub') },
      { id: '35k-60k', label: '35K – 60K MMK', sub: t('budget_35k_60k_sub') },
      { id: '60k+', label: '60,000+ MMK', sub: t('budget_60k_plus_sub') }
    ];

    // Seating preferences
    const seatingOptions = [
      { id: 'all', label: t('seating_style_all'), icon: 'table_restaurant' },
      { id: 'Private Room', label: t('seating_private_room'), icon: 'meeting_room' },
      { id: 'Lake View Window', label: t('seating_lake_view'), icon: 'water' },
      { id: 'Outdoor Seating', label: t('seating_outdoor'), icon: 'deck' },
      { id: 'Bar Counter', label: t('seating_bar_counter'), icon: 'local_bar' }
    ];

    // Amenities & Dietary options (Multi-select)
    const featurePills = [
      { id: 'Wi-Fi', label: t('feat_wifi'), icon: 'wifi' },
      { id: 'Air Conditioned', label: t('feat_ac'), icon: 'ac_unit' },
      { id: 'Valet Parking', label: t('feat_parking'), icon: 'directions_car' },
      { id: '24/7 Backup Generator', label: t('feat_generator'), icon: 'bolt' },
      { id: 'Halal Friendly', label: t('feat_halal'), icon: 'verified' },
      { id: 'Vegetarian Options', label: t('feat_veg'), icon: 'spa' },
      { id: 'Lake / Sunset View', label: t('feat_lake_view'), icon: 'nature_people' },
      { id: 'Private Room', label: t('feat_private_room'), icon: 'meeting_room' },
      { id: 'Outdoor Seating', label: t('feat_garden'), icon: 'deck' },
      { id: 'Wine & Cocktail Bar', label: t('feat_wine'), icon: 'wine_bar' },
      { id: 'Live Music', label: t('feat_live_music'), icon: 'music_note' },
      { id: 'Pet Friendly', label: t('feat_pet_friendly'), icon: 'pets' }
    ];

    // Popular Quick Keywords
    const popularTags = [
      'Omakase',
      'Inya Sunset',
      'Shan Khauk Swe',
      'Private VIP',
      'Dim Sum',
      'Wood-fired Pizza',
      'Live Jazz',
      'Riverfront Grill'
    ];

    // Filter Townships based on location search or active zone
    const currentZone = LOCATION_ZONES.find(z => z.id === activeLocationZone) || LOCATION_ZONES[0];
    let displayedTownships = [];

    if (locationQuery.trim()) {
      const lq = locationQuery.toLowerCase().trim();
      LOCATION_ZONES.forEach(z => {
        z.townships.forEach(t => {
          if (t.nameEn.toLowerCase().includes(lq) || t.nameMm.toLowerCase().includes(lq) || t.sub.toLowerCase().includes(lq)) {
            displayedTownships.push(t);
          }
        });
      });
    } else if (activeLocationZone === 'all') {
      displayedTownships = LOCATION_ZONES.flatMap(z => z.townships);
    } else {
      displayedTownships = currentZone.townships;
    }

    return `
      <div id="search-condition-overlay" class="fixed inset-0 z-50 bg-[#241A18]/65 backdrop-blur-md flex flex-col justify-end md:justify-center items-center overflow-hidden">
        
        <!-- Animated Main Modal Container -->
        <div 
          id="search-condition-modal" 
          class="w-full h-[100dvh] md:h-[92vh] md:max-w-5xl bg-[#FBF4E8] text-[#241A18] md:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-search-condition-enter border border-[#E8DDD0]"
        >
          
          <!-- TOP NAVIGATION HEADER -->
          <div class="sticky top-0 z-30 bg-[#FFFDFC]/95 backdrop-blur-md px-4 sm:px-6 lg:px-8 h-14 sm:h-16 border-b border-[#E8DDD0] flex items-center justify-between gap-3 sm:gap-4 shrink-0 shadow-2xs pt-[env(safe-area-inset-top,0px)]">
            <div class="flex items-center gap-3">
              <button 
                id="search-cond-close-btn"
                class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#F8EFE5] hover:bg-[#F3DFD5] text-[#241A18] hover:text-[#9B1C25] active:scale-95 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                title="${t('close_btn')}"
                aria-label="Close search conditions"
              >
                <span class="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <!-- Reset Button -->
            <button 
              id="search-cond-reset-btn"
              class="px-3.5 py-1.5 sm:py-2 rounded-full bg-[#F8EFE5] hover:bg-[#F3DFD5] text-[#6D6561] hover:text-[#9B1C25] font-label text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <span class="material-symbols-outlined text-base">restart_alt</span>
              <span>${t('reset_btn')}</span>
            </button>
          </div>

          <!-- SCROLLABLE CONDITIONS FORM BODY -->
          <div class="flex-1 overflow-y-auto px-4 sm:px-8 py-6 space-y-8 divide-y divide-[#E8DDD0]/70">

            <!-- SECTION 1: SEARCH KEYWORD & DISH -->
            <div class="space-y-3 pt-1">
              <div class="flex items-center justify-between">
                <label class="font-label text-xs sm:text-sm font-bold text-[#241A18] flex items-center gap-1.5 uppercase tracking-wider">
                  <span class="material-symbols-outlined text-[#9B1C25] text-base">search</span>
                  <span>${t('keyword_label')}</span>
                </label>
                <span class="font-label text-xs text-[#6D6561] font-semibold">${activeKeyword ? `"${activeKeyword}"` : t('all_venues')}</span>
              </div>
              
              <div class="relative flex items-center">
                <span class="material-symbols-outlined absolute left-4 text-[#A19690] text-xl pointer-events-none">search</span>
                <input 
                  type="text"
                  id="cond-keyword-input"
                  placeholder="${t('cond_kw_placeholder')}"
                  value="${activeKeyword}"
                  class="w-full bg-[#FFFDFC] border border-[#E8DDD0] focus:border-[#9B1C25] focus:ring-2 focus:ring-[#9B1C25]/15 rounded-2xl pl-11 pr-10 py-3.5 font-body text-sm text-[#241A18] placeholder:text-[#A19690] focus:outline-none transition-all shadow-2xs"
                />
                ${activeKeyword ? `
                  <button 
                    id="cond-clear-kw-btn"
                    class="absolute right-3 w-7 h-7 rounded-full bg-[#F8EFE5] hover:bg-[#F3DFD5] text-[#6D6561] flex items-center justify-center cursor-pointer transition-colors"
                    title="${t('clear_btn')}"
                  >
                    <span class="material-symbols-outlined text-sm">close</span>
                  </button>
                ` : ''}
              </div>

              <!-- Popular Quick Tag Suggestions -->
              <div class="flex items-center flex-wrap gap-1.5 pt-1">
                <span class="font-label text-[11px] text-[#6D6561] font-semibold mr-1">${t('popular_suggestions')}</span>
                ${popularTags.map(tag => `
                  <button 
                    data-cond-quick-tag="${tag}"
                    class="search-chip-btn px-2.5 py-1 rounded-full text-xs font-label font-medium border border-[#E8DDD0] bg-[#FFFDFC] hover:bg-[#F3DFD5] hover:text-[#9B1C25] text-[#6D6561] cursor-pointer"
                  >
                    #${tag}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- SECTION 2: DATE & TIME (FLEXIBLE "ANY DATE" VS SPECIFIC DATE) -->
            <div class="space-y-6 pt-6">
              
              <!-- Date Strategy / Flexibility Controls -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <label class="font-label text-xs sm:text-sm font-bold text-[#241A18] flex items-center gap-1.5 uppercase tracking-wider">
                    <span class="material-symbols-outlined text-[#9B1C25] text-base">calendar_today</span>
                    <span>${t('date_preference_label')}</span>
                  </label>
                  <span class="font-label text-xs font-bold text-[#9B1C25]">
                    ${activeDateMode === 'any' || activeDate === 'any' ? t('any_date') : activeDateLabel}
                  </span>
                </div>

                <!-- Date Mode Toggle Pills -->
                <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  
                  <!-- Option 1: Any Date (Flexible) -->
                  <button
                    data-cond-datemode="any"
                    class="search-chip-btn p-3 rounded-2xl border text-center cursor-pointer flex flex-col items-center justify-center gap-1 transition-all ${
                      activeDateMode === 'any' || activeDate === 'any'
                        ? 'bg-[#9B1C25] text-white border-[#9B1C25] shadow-sm'
                        : 'bg-[#FFFDFC] text-[#241A18] border-[#E8DDD0] hover:border-[#9B1C25]'
                    }"
                  >
                    <span class="material-symbols-outlined text-lg ${activeDateMode === 'any' || activeDate === 'any' ? 'text-[#FFF4F1]' : 'text-[#9B1C25]'}">all_inclusive</span>
                    <span class="font-headline text-xs font-bold leading-tight">${t('any_date')}</span>
                    <span class="hidden lg:block font-body text-[10px] ${activeDateMode === 'any' || activeDate === 'any' ? 'text-[#FFF4F1]/80' : 'text-[#6D6561]'}">${t('browse_all')}</span>
                  </button>

                  <!-- Quick Presets -->
                  ${['Today', 'Tomorrow', 'This Weekend', 'Next Week'].map(dLabel => {
                    const isSel = activeDateMode !== 'any' && activeDate !== 'any' && activeDateLabel === dLabel;
                    const dateText = dLabel === 'Today' ? t('date_today') : dLabel === 'Tomorrow' ? t('date_tomorrow') : dLabel === 'This Weekend' ? t('date_weekend') : t('date_next_week');
                    const subText = dLabel === 'Today' ? t('date_tonight') : t('date_advance');
                    return `
                      <button
                        data-cond-date="${dLabel}"
                        class="search-chip-btn p-3 rounded-2xl border text-center cursor-pointer flex flex-col items-center justify-center gap-1 transition-all ${
                          isSel
                            ? 'bg-[#9B1C25] text-white border-[#9B1C25] shadow-sm'
                            : 'bg-[#FFFDFC] text-[#241A18] border-[#E8DDD0] hover:border-[#9B1C25]'
                        }"
                      >
                        <span class="material-symbols-outlined text-lg ${isSel ? 'text-[#FFF4F1]' : 'text-[#9B1C25]'}">event</span>
                        <span class="font-headline text-xs font-bold leading-tight">
                          ${dateText}
                        </span>
                        <span class="hidden lg:block font-body text-[10px] ${isSel ? 'text-[#FFF4F1]/80' : 'text-[#6D6561]'}">${subText}</span>
                      </button>
                    `;
                  }).join('')}

                </div>
              </div>

              <!-- Time Slot & Periods -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <label class="font-label text-xs sm:text-sm font-bold text-[#241A18] flex items-center gap-1.5 uppercase tracking-wider">
                    <span class="material-symbols-outlined text-[#9B1C25] text-base">schedule</span>
                    <span>${t('time_period_title')}</span>
                  </label>
                  <span class="font-label text-xs text-[#6D6561] font-semibold">${activeTime === 'any' ? t('time_period_any') : activeTime}</span>
                </div>

                <!-- Period Cards -->
                <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  ${timePeriods.map(tp => {
                    const isSel = (tp.id === 'any' && (activeTime === 'any' || activeTimeMode === 'any')) || 
                                  (tp.id !== 'any' && activeTimeMode === tp.id);
                    return `
                      <button
                        data-cond-timeperiod="${tp.id}"
                        data-cond-defaulttime="${tp.defaultTime || 'any'}"
                        class="search-chip-btn p-2.5 rounded-2xl border text-left cursor-pointer flex flex-col justify-between transition-all ${
                          isSel
                            ? 'bg-[#9B1C25] text-white border-[#9B1C25] shadow-sm'
                            : 'bg-[#FFFDFC] text-[#241A18] border-[#E8DDD0] hover:border-[#9B1C25]'
                        }"
                      >
                        <div class="flex items-center justify-between">
                          <span class="material-symbols-outlined text-base ${isSel ? 'text-[#FFF4F1]' : 'text-[#9B1C25]'}">${tp.icon}</span>
                          ${isSel ? '<span class="material-symbols-outlined text-xs text-white">check</span>' : ''}
                        </div>
                        <div>
                          <div class="font-headline text-xs font-bold leading-tight mt-1">${tp.label}</div>
                          <div class="hidden lg:block font-body text-[10px] ${isSel ? 'text-[#FFF4F1]/80' : 'text-[#6D6561]'}">${tp.sub}</div>
                        </div>
                      </button>
                    `;
                  }).join('')}
                </div>

                <!-- Exact Time Slots Chips -->
                <div class="pt-2">
                  <span class="font-label text-[11px] font-bold text-[#6D6561] block mb-1.5 uppercase tracking-wider">${t('exact_hourly_slots')}</span>
                  <div class="flex flex-wrap gap-1.5">
                    ${exactTimes.map(tVal => {
                      const isSel = activeTime === tVal;
                      return `
                        <button
                          data-cond-time="${tVal}"
                          class="search-chip-btn px-3 py-1.5 rounded-xl border text-xs font-label font-bold cursor-pointer ${
                            isSel
                              ? 'bg-[#9B1C25] text-white border-[#9B1C25] shadow-xs'
                              : 'bg-[#FFFDFC] text-[#241A18] border-[#E8DDD0] hover:border-[#9B1C25]'
                          }"
                        >
                          ${tVal}
                        </button>
                      `;
                    }).join('')}
                  </div>
                </div>
              </div>

              <!-- Party Size / Number of Guests -->
              <div class="space-y-3">
                <label class="font-label text-xs sm:text-sm font-bold text-[#241A18] flex items-center gap-1.5 uppercase tracking-wider">
                  <span class="material-symbols-outlined text-[#9B1C25] text-base">group</span>
                  <span>${t('party_size_section_title')}</span>
                </label>

                <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  ${partySizes.map(ps => {
                    const isSel = activePartySize === ps.id;
                    return `
                      <button
                        data-cond-partysize="${ps.id}"
                        class="search-chip-btn p-2.5 rounded-2xl border text-center cursor-pointer flex flex-col items-center justify-center gap-1 transition-all ${
                          isSel
                            ? 'bg-[#9B1C25] text-white border-[#9B1C25] shadow-xs'
                            : 'bg-[#FFFDFC] text-[#241A18] border-[#E8DDD0] hover:border-[#9B1C25]'
                        }"
                      >
                        <span class="material-symbols-outlined text-lg ${isSel ? 'text-[#FFF4F1]' : 'text-[#9B1C25]'}">${ps.icon}</span>
                        <span class="font-headline text-xs font-bold leading-tight">${ps.label}</span>
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>

            </div>

            <!-- SECTION 3: EXPANDED LOCATION / TOWNSHIP SYSTEM -->
            <div class="space-y-4 pt-6">
              <div class="flex items-center justify-between">
                <div>
                  <label class="font-label text-xs sm:text-sm font-bold text-[#241A18] flex items-center gap-1.5 uppercase tracking-wider">
                    <span class="material-symbols-outlined text-[#9B1C25] text-base">location_on</span>
                    <span>${t('locations_section_title')}</span>
                  </label>
                  <p class="font-body text-xs text-[#6D6561] mt-0.5">
                    ${t('locations_section_desc')}
                  </p>
                </div>
                ${activeSelectedAreas.length > 0 && !activeSelectedAreas.includes('All Areas') ? `
                  <span class="font-label text-xs text-[#9B1C25] font-bold">${activeSelectedAreas.length} ${t('selected_count_suffix')}</span>
                ` : ''}
              </div>

              <!-- Zone Segment Tabs -->
              <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                ${LOCATION_ZONES.map(z => {
                  const isSel = activeLocationZone === z.id;
                  return `
                    <button
                      data-cond-zone="${z.id}"
                      class="px-3.5 py-1.5 rounded-full border text-xs font-label font-bold flex items-center gap-1.5 shrink-0 cursor-pointer transition-all ${
                        isSel
                          ? 'bg-[#9B1C25] text-white border-[#9B1C25] shadow-xs'
                          : 'bg-[#FFFDFC] text-[#6D6561] border-[#E8DDD0] hover:border-[#9B1C25] hover:text-[#241A18]'
                      }"
                    >
                      <span class="material-symbols-outlined text-sm ${isSel ? 'text-white' : 'text-[#9B1C25]'}">${z.icon}</span>
                      <span>${isMm ? z.nameMm : z.nameEn}</span>
                    </button>
                  `;
                }).join('')}
              </div>

              <!-- Quick Township Filter Search -->
              <div class="relative flex items-center">
                <span class="material-symbols-outlined absolute left-3.5 text-[#A19690] text-lg pointer-events-none">travel_explore</span>
                <input
                  type="text"
                  id="cond-location-search"
                  placeholder="${t('township_search_placeholder')}"
                  value="${locationQuery}"
                  class="w-full bg-[#FFFDFC] border border-[#E8DDD0] focus:border-[#9B1C25] focus:ring-2 focus:ring-[#9B1C25]/15 rounded-xl pl-10 pr-9 py-2.5 font-body text-xs text-[#241A18] placeholder:text-[#A19690] focus:outline-none transition-all"
                />
                ${locationQuery ? `
                  <button 
                    id="cond-clear-loc-btn"
                    class="absolute right-2.5 w-6 h-6 rounded-full bg-[#F8EFE5] hover:bg-[#F3DFD5] text-[#6D6561] flex items-center justify-center cursor-pointer transition-colors"
                  >
                    <span class="material-symbols-outlined text-xs">close</span>
                  </button>
                ` : ''}
              </div>

              <!-- Townships Grid (Supports Multi-Select & Single Tap) -->
              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-72 overflow-y-auto pr-1">
                ${displayedTownships.map(tItem => {
                  const isSel = (tItem.id === 'All Areas' && (activeSelectedAreas.length === 0 || activeSelectedAreas.includes('All Areas') || activeArea === 'All Areas')) ||
                                activeSelectedAreas.includes(tItem.id) || activeArea === tItem.id;
                  return `
                    <button
                      data-cond-area-item="${tItem.id}"
                      class="search-chip-btn p-3 rounded-2xl border text-left cursor-pointer flex flex-col justify-between gap-1 transition-all ${
                        isSel
                          ? 'bg-[#9B1C25] text-white border-[#9B1C25] shadow-sm'
                          : 'bg-[#FFFDFC] text-[#241A18] border-[#E8DDD0] hover:border-[#9B1C25]'
                      }"
                    >
                      <div class="flex items-center justify-between w-full">
                        <span class="material-symbols-outlined text-base ${isSel ? 'text-[#FFF4F1]' : 'text-[#9B1C25]'}">${tItem.icon}</span>
                        ${isSel ? '<span class="material-symbols-outlined text-xs text-white">check_circle</span>' : ''}
                      </div>
                      <div>
                        <div class="font-headline text-xs font-extrabold leading-snug line-clamp-1">${isMm ? tItem.nameMm : tItem.nameEn}</div>
                        <div class="font-body text-[10px] ${isSel ? 'text-[#FFF4F1]/80' : 'text-[#6D6561]'} line-clamp-1">${tItem.sub}</div>
                      </div>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- SECTION 4: EXPANDED CUISINES & DINING CATEGORIES -->
            <div class="space-y-4 pt-6">
              <div class="flex items-center justify-between">
                <div>
                  <label class="font-label text-xs sm:text-sm font-bold text-[#241A18] flex items-center gap-1.5 uppercase tracking-wider">
                    <span class="material-symbols-outlined text-[#9B1C25] text-base">restaurant_menu</span>
                    <span>${t('cuisines_section_title')}</span>
                  </label>
                  <p class="font-body text-xs text-[#6D6561] mt-0.5">
                    ${t('cuisines_section_desc')}
                  </p>
                </div>
                ${activeSelectedCuisines.length > 0 && !activeSelectedCuisines.includes('All Cuisines') ? `
                  <span class="font-label text-xs text-[#9B1C25] font-bold">${activeSelectedCuisines.length} ${t('selected_count_suffix')}</span>
                ` : ''}
              </div>

              <!-- Cuisine Category Navigation -->
              <div class="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                ${CUISINE_GROUPS.map(cg => {
                  const isSel = activeCuisineCategory === cg.id;
                  return `
                    <button
                      data-cond-cuisine-cat="${cg.id}"
                      class="px-3.5 py-1.5 rounded-full border text-xs font-label font-bold flex items-center gap-1.5 shrink-0 cursor-pointer transition-all ${
                        isSel
                          ? 'bg-[#9B1C25] text-white border-[#9B1C25] shadow-xs'
                          : 'bg-[#FFFDFC] text-[#6D6561] border-[#E8DDD0] hover:border-[#9B1C25] hover:text-[#241A18]'
                      }"
                    >
                      <span class="material-symbols-outlined text-sm ${isSel ? 'text-white' : 'text-[#9B1C25]'}">${cg.icon}</span>
                      <span>${isMm ? cg.nameMm : cg.nameEn}</span>
                    </button>
                  `;
                }).join('')}
              </div>

              <!-- Cuisine Items Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                ${(() => {
                  const targetGroup = CUISINE_GROUPS.find(g => g.id === activeCuisineCategory) || CUISINE_GROUPS[0];
                  const itemsToShow = activeCuisineCategory === 'all_cuisines'
                    ? CUISINE_GROUPS.flatMap(g => g.items)
                    : targetGroup.items;

                  return itemsToShow.map(co => {
                    const isSel = (co.id === 'All Cuisines' && (activeSelectedCuisines.length === 0 || activeSelectedCuisines.includes('All Cuisines') || activeCuisine === 'All Cuisines')) ||
                                  activeSelectedCuisines.includes(co.id) || activeCuisine === co.id;
                    return `
                      <button
                        data-cond-cuisine-item="${co.id}"
                        class="search-chip-btn p-3 rounded-2xl border text-left cursor-pointer flex flex-col justify-between gap-1 transition-all ${
                          isSel
                            ? 'bg-[#9B1C25] text-white border-[#9B1C25] shadow-sm'
                            : 'bg-[#FFFDFC] text-[#241A18] border-[#E8DDD0] hover:border-[#9B1C25]'
                        }"
                      >
                        <div class="flex items-center justify-between w-full">
                          <span class="material-symbols-outlined text-base ${isSel ? 'text-[#FFF4F1]' : 'text-[#9B1C25]'}">${co.icon}</span>
                          ${isSel ? '<span class="material-symbols-outlined text-xs text-white">check_circle</span>' : ''}
                        </div>
                        <div>
                          <div class="font-headline text-xs font-extrabold leading-snug line-clamp-1">${isMm ? co.nameMm : co.nameEn}</div>
                          <div class="font-body text-[10px] ${isSel ? 'text-[#FFF4F1]/80' : 'text-[#6D6561]'} line-clamp-1">${co.sub}</div>
                        </div>
                      </button>
                    `;
                  }).join('');
                })()}
              </div>
            </div>

            <!-- SECTION 5: ATMOSPHERE & SEATING PREFERENCES -->
            <div class="space-y-3 pt-6">
              <label class="font-label text-xs sm:text-sm font-bold text-[#241A18] flex items-center gap-1.5 uppercase tracking-wider">
                <span class="material-symbols-outlined text-[#9B1C25] text-base">chair</span>
                <span>${t('atmosphere_section_title')}</span>
              </label>

              <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                ${seatingOptions.map(so => {
                  const isSel = activeSeating === so.id;
                  return `
                    <button
                      data-cond-seating="${so.id}"
                      class="search-chip-btn p-2.5 rounded-2xl border text-left cursor-pointer flex flex-col justify-between transition-all ${
                        isSel
                          ? 'bg-[#9B1C25] text-white border-[#9B1C25] shadow-xs'
                          : 'bg-[#FFFDFC] text-[#241A18] border-[#E8DDD0] hover:border-[#9B1C25]'
                      }"
                    >
                      <div class="flex items-center justify-between">
                        <span class="material-symbols-outlined text-base ${isSel ? 'text-white' : 'text-[#9B1C25]'}">${so.icon}</span>
                        ${isSel ? '<span class="material-symbols-outlined text-xs text-white">check</span>' : ''}
                      </div>
                      <span class="font-headline text-xs font-bold leading-tight mt-1">${so.label}</span>
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- SECTION 6: BUDGET RANGE & PRICE MMK -->
            <div class="space-y-3 pt-6">
              <div class="flex items-center justify-between">
                <label class="font-label text-xs sm:text-sm font-bold text-[#241A18] flex items-center gap-1.5 uppercase tracking-wider">
                  <span class="material-symbols-outlined text-[#9B1C25] text-base">payments</span>
                  <span>${t('budget_section_title')}</span>
                </label>
                <span class="font-label text-xs text-[#6D6561] font-semibold">${activeBudgetTier === 'all' ? t('budget_no_limit') : activeBudgetTier}</span>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
                ${budgetTiers.map(bt => {
                  const isSel = activeBudgetTier === bt.id;
                  return `
                    <button
                      data-cond-budget="${bt.id}"
                      class="search-chip-btn p-2.5 rounded-2xl border text-left cursor-pointer flex flex-col justify-between transition-all ${
                        isSel
                          ? 'bg-[#9B1C25] text-white border-[#9B1C25] shadow-sm'
                          : 'bg-[#FFFDFC] text-[#241A18] border-[#E8DDD0] hover:border-[#9B1C25]'
                      }"
                    >
                      <span class="font-headline text-xs font-black leading-snug">${bt.label}</span>
                      <span class="font-body text-[10px] ${isSel ? 'text-[#FFF4F1]/80' : 'text-[#6D6561]'}">${bt.sub}</span>
                    </button>
                  `;
                }).join('')}
              </div>

              <!-- Custom Min / Max inputs -->
              <div class="pt-2 grid grid-cols-2 gap-3 max-w-md">
                <div>
                  <label class="font-label text-[11px] text-[#6D6561] font-semibold block mb-1">${t('min_price_label')}</label>
                  <input
                    type="number"
                    id="cond-minprice-input"
                    placeholder="e.g. 20000"
                    value="${rState.minPrice || ''}"
                    class="w-full bg-[#FFFDFC] border border-[#E8DDD0] focus:border-[#9B1C25] focus:ring-2 focus:ring-[#9B1C25]/15 rounded-xl px-3 py-2 font-body text-xs text-[#241A18] placeholder:text-[#A19690] focus:outline-none"
                  />
                </div>
                <div>
                  <label class="font-label text-[11px] text-[#6D6561] font-semibold block mb-1">${t('max_price_label')}</label>
                  <input
                    type="number"
                    id="cond-maxprice-input"
                    placeholder="e.g. 100000"
                    value="${rState.maxPrice || ''}"
                    class="w-full bg-[#FFFDFC] border border-[#E8DDD0] focus:border-[#9B1C25] focus:ring-2 focus:ring-[#9B1C25]/15 rounded-xl px-3 py-2 font-body text-xs text-[#241A18] placeholder:text-[#A19690] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <!-- SECTION 7: SPECIAL AMENITIES, DIETARY & FACILITIES (MULTI-SELECT) -->
            <div class="space-y-3 pt-6 pb-6">
              <div class="flex items-center justify-between">
                <label class="font-label text-xs sm:text-sm font-bold text-[#241A18] flex items-center gap-1.5 uppercase tracking-wider">
                  <span class="material-symbols-outlined text-[#9B1C25] text-base">local_offer</span>
                  <span>${t('amenities_section_title')}</span>
                </label>
                ${activeFeatures.length > 0 ? `
                  <span class="font-label text-xs text-[#9B1C25] font-bold">${activeFeatures.length} ${t('selected_count_suffix')}</span>
                ` : ''}
              </div>

              <div class="flex flex-wrap gap-2">
                ${featurePills.map(fp => {
                  const isSel = activeFeatures.includes(fp.id);
                  return `
                    <button
                      data-cond-feature="${fp.id}"
                      class="search-chip-btn px-3.5 py-2 rounded-2xl border text-xs font-label font-semibold flex items-center gap-1.5 cursor-pointer ${
                        isSel
                          ? 'bg-[#9B1C25] text-white border-[#9B1C25] shadow-xs'
                          : 'bg-[#FFFDFC] text-[#241A18] border-[#E8DDD0] hover:border-[#9B1C25]'
                      }"
                    >
                      <span class="material-symbols-outlined text-sm ${isSel ? 'text-white' : 'text-[#9B1C25]'}">${fp.icon}</span>
                      <span>${fp.label}</span>
                      ${isSel ? '<span class="material-symbols-outlined text-xs text-white">check</span>' : ''}
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

          </div>

          <!-- STICKY BOTTOM ACTION BAR WITH LIVE MATCH COUNTER -->
          <div class="sticky bottom-0 z-30 bg-[#FFFDFC]/95 backdrop-blur-md px-4 sm:px-8 py-3.5 sm:py-4 border-t border-[#E8DDD0] flex items-center justify-between gap-4 shrink-0 shadow-[0_-4px_16px_rgba(36,26,24,0.06)]">
            
            <div class="flex items-center gap-2.5">
              <div class="w-3 h-3 rounded-full ${matchCount > 0 ? 'bg-[#104b2b] animate-pulse' : 'bg-[#BA1A1A]'}"></div>
              <div>
                <span class="font-headline text-sm sm:text-base font-extrabold text-[#241A18] block leading-tight">
                  ${matchCount} ${t('venues_match_criteria')}
                </span>
                <span class="font-body text-[11px] text-[#6D6561]">
                  ${matchCount > 0 ? t('realtime_available_slots') : t('try_expanding_conditions')}
                </span>
              </div>
            </div>

            <div class="flex items-center gap-2.5">
              <button
                id="search-cond-cancel-btn"
                class="hidden sm:inline-flex px-4 py-2.5 rounded-full font-label text-xs font-bold text-[#6D6561] hover:text-[#241A18] hover:bg-[#F8EFE5] transition-colors cursor-pointer"
              >
                ${t('cancel')}
              </button>

              <button
                id="search-cond-apply-btn"
                class="px-6 sm:px-8 py-3 rounded-full bg-[#9B1C25] hover:bg-[#7F161E] text-white font-label text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg active:scale-95"
              >
                <span>${t('search_action_btn')}</span>
                <span class="material-symbols-outlined text-base">search</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    `;
  }

  function attachSearchConditionModalEvents(containerElement = document) {
    const overlay = containerElement.querySelector('#search-condition-overlay');
    if (!overlay) return;

    // Close buttons
    const closeBtn = containerElement.querySelector('#search-cond-close-btn');
    const cancelBtn = containerElement.querySelector('#search-cond-cancel-btn');
    
    const closeModal = () => {
      const modal = containerElement.querySelector('#search-condition-modal');
      if (modal) {
        modal.classList.remove('animate-search-condition-enter');
        modal.classList.add('animate-search-condition-exit');
        setTimeout(() => {
          store.closeSearchConditions();
        }, 180);
      } else {
        store.closeSearchConditions();
      }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    // Click outside modal to dismiss
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });

    // Reset All button
    const resetBtn = containerElement.querySelector('#search-cond-reset-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        store.resetSearchConditions();
      });
    }

    // Keyword input
    const kwInput = containerElement.querySelector('#cond-keyword-input');
    if (kwInput) {
      kwInput.addEventListener('input', (e) => {
        store.updateResultsState('keyword', e.target.value);
      });
    }

    // Clear Keyword
    const clearKwBtn = containerElement.querySelector('#cond-clear-kw-btn');
    if (clearKwBtn) {
      clearKwBtn.addEventListener('click', () => {
        store.updateResultsState('keyword', '');
      });
    }

    // Quick tag suggestions
    containerElement.querySelectorAll('[data-cond-quick-tag]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tag = e.currentTarget.getAttribute('data-cond-quick-tag');
        store.updateResultsState('keyword', tag);
      });
    });

    // Date mode: Any Date vs Specific
    containerElement.querySelectorAll('[data-cond-datemode]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const mode = e.currentTarget.getAttribute('data-cond-datemode');
        if (mode === 'any') {
          store.updateResultsState({
            dateMode: 'any',
            selectedDate: 'any',
            dateLabel: 'Any Date'
          });
        }
      });
    });

    // Date presets
    containerElement.querySelectorAll('[data-cond-date]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const dateLabel = e.currentTarget.getAttribute('data-cond-date');
        store.updateResultsState({
          dateMode: 'specific',
          dateLabel,
          selectedDate: dateLabel === 'Today' ? 'Today' : dateLabel === 'Tomorrow' ? 'Tomorrow' : dateLabel === 'This Weekend' ? 'Weekend' : 'Next Week'
        });
      });
    });

    // Time Period Selector
    containerElement.querySelectorAll('[data-cond-timeperiod]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pId = e.currentTarget.getAttribute('data-cond-timeperiod');
        const defTime = e.currentTarget.getAttribute('data-cond-defaulttime');
        store.updateResultsState({
          timeMode: pId,
          time: defTime
        });
      });
    });

    // Exact Time slot pills
    containerElement.querySelectorAll('[data-cond-time]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const time = e.currentTarget.getAttribute('data-cond-time');
        store.updateResultsState({
          timeMode: 'specific',
          time: time
        });
      });
    });

    // Party size pills
    containerElement.querySelectorAll('[data-cond-partysize]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const size = e.currentTarget.getAttribute('data-cond-partysize');
        store.updateResultsState('partySize', size);
      });
    });

    // Location Zone Tabs
    containerElement.querySelectorAll('[data-cond-zone]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const zoneId = e.currentTarget.getAttribute('data-cond-zone');
        store.updateResultsState('activeLocationZone', zoneId);
      });
    });

    // Location Search input
    const locSearchInput = containerElement.querySelector('#cond-location-search');
    if (locSearchInput) {
      locSearchInput.addEventListener('input', (e) => {
        store.updateResultsState('locationQuery', e.target.value);
      });
    }

    const clearLocBtn = containerElement.querySelector('#cond-clear-loc-btn');
    if (clearLocBtn) {
      clearLocBtn.addEventListener('click', () => {
        store.updateResultsState('locationQuery', '');
      });
    }

    // Township Item selection (Multi-Select toggle or Single All)
    containerElement.querySelectorAll('[data-cond-area-item]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const areaId = e.currentTarget.getAttribute('data-cond-area-item');
        if (areaId === 'All Areas') {
          store.updateResultsState({
            area: 'All Areas',
            selectedAreas: ['All Areas']
          });
          return;
        }

        const curAreas = (store.getState().resultsState.selectedAreas || []).filter(a => a !== 'All Areas');
        let nextAreas;
        if (curAreas.includes(areaId)) {
          nextAreas = curAreas.filter(a => a !== areaId);
        } else {
          nextAreas = [...curAreas, areaId];
        }

        if (nextAreas.length === 0) {
          nextAreas = ['All Areas'];
        }

        store.updateResultsState({
          area: nextAreas.length === 1 ? nextAreas[0] : (nextAreas.length > 1 ? `${nextAreas.length} Townships` : 'All Areas'),
          selectedAreas: nextAreas
        });
      });
    });

    // Cuisine Category Tab
    containerElement.querySelectorAll('[data-cond-cuisine-cat]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const catId = e.currentTarget.getAttribute('data-cond-cuisine-cat');
        store.updateResultsState('activeCuisineCategory', catId);
      });
    });

    // Cuisine Item selection (Multi-Select toggle)
    containerElement.querySelectorAll('[data-cond-cuisine-item]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cuisineId = e.currentTarget.getAttribute('data-cond-cuisine-item');
        if (cuisineId === 'All Cuisines') {
          store.updateResultsState({
            cuisine: 'All Cuisines',
            selectedCuisines: ['All Cuisines']
          });
          return;
        }

        const curCuisines = (store.getState().resultsState.selectedCuisines || []).filter(c => c !== 'All Cuisines');
        let nextCuisines;
        if (curCuisines.includes(cuisineId)) {
          nextCuisines = curCuisines.filter(c => c !== cuisineId);
        } else {
          nextCuisines = [...curCuisines, cuisineId];
        }

        if (nextCuisines.length === 0) {
          nextCuisines = ['All Cuisines'];
        }

        store.updateResultsState({
          cuisine: nextCuisines.length === 1 ? nextCuisines[0] : (nextCuisines.length > 1 ? `${nextCuisines.length} Cuisines` : 'All Cuisines'),
          selectedCuisines: nextCuisines
        });
      });
    });

    // Budget tier pills
    containerElement.querySelectorAll('[data-cond-budget]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tier = e.currentTarget.getAttribute('data-cond-budget');
        store.updateResultsState('budgetTier', tier);
      });
    });

    // Min / Max price inputs
    const minPInput = containerElement.querySelector('#cond-minprice-input');
    if (minPInput) {
      minPInput.addEventListener('change', (e) => {
        store.updateResultsState('minPrice', e.target.value);
      });
    }

    const maxPInput = containerElement.querySelector('#cond-maxprice-input');
    if (maxPInput) {
      maxPInput.addEventListener('change', (e) => {
        store.updateResultsState('maxPrice', e.target.value);
      });
    }

    // Seating pills
    containerElement.querySelectorAll('[data-cond-seating]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const seating = e.currentTarget.getAttribute('data-cond-seating');
        store.updateResultsState('seatingPreference', seating);
      });
    });

    // Feature chips (Multi-select)
    containerElement.querySelectorAll('[data-cond-feature]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const feature = e.currentTarget.getAttribute('data-cond-feature');
        const curFeatures = store.getState().resultsState.selectedFeatures || [];
        let next;
        if (curFeatures.includes(feature)) {
          next = curFeatures.filter(f => f !== feature);
        } else {
          next = [...curFeatures, feature];
        }
        store.updateResultsState('selectedFeatures', next);
      });
    });

    // Apply button
    const applyBtn = containerElement.querySelector('#search-cond-apply-btn');
    if (applyBtn) {
      applyBtn.addEventListener('click', () => {
        const modal = containerElement.querySelector('#search-condition-modal');
        if (modal) {
          modal.classList.remove('animate-search-condition-enter');
          modal.classList.add('animate-search-condition-exit');
          setTimeout(() => {
            store.applySearchConditions();
          }, 180);
        } else {
          store.applySearchConditions();
        }
      });
    }
  }

  window.YoyakuComponents.renderSearchConditionModal = renderSearchConditionModal;
  window.YoyakuComponents.attachSearchConditionModalEvents = attachSearchConditionModalEvents;
  window.YoyakuComponents.calculateMatchingCount = calculateMatchingCount;
})();

