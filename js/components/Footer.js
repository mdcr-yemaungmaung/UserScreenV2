(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;



  function renderFooter(state) {
    const isMm = state.currentLanguage === 'MM';

    return `
      <footer id="app-footer" class="hidden lg:block bg-[#1c1311] text-[#e8dfd8] pt-12 pb-12 border-t border-[#362723] mt-16 font-body">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <!-- Main Footer Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-[#362723]">
            
            <!-- Column 1: Brand & Tagline -->
            <div class="lg:col-span-2 space-y-4">
              <div class="flex items-center gap-2.5 cursor-pointer group" id="footer-brand-logo">
                <div class="h-9 w-auto flex items-center group-hover:scale-105 transition-transform shrink-0">
                  <svg class="h-9 w-auto" viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="footPinLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#B22222"/>
                        <stop offset="100%" stop-color="#93181F"/>
                      </linearGradient>
                      <linearGradient id="footPinRight" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#7C0E15"/>
                        <stop offset="100%" stop-color="#55050A"/>
                      </linearGradient>
                    </defs>
                    <path d="M 100 12 C 58 12 24 46 24 88 C 24 128 62 170 100 216 L 100 12 Z" fill="url(#footPinLeft)" />
                    <path d="M 100 12 L 100 216 C 138 170 176 128 176 88 C 176 46 142 12 100 12 Z" fill="url(#footPinRight)" />
                    <path d="M 93 208 C 94 185 88 150 78 126 C 67 99 68 56 100 56 C 132 56 133 99 122 126 C 112 150 106 185 107 208 Z" fill="#FFF7E8" />
                    <circle cx="100" cy="94" r="14" fill="#93181F" />
                    <circle cx="98" cy="92" r="13" fill="#B22222" />
                  </svg>
                </div>
                <span class="font-headline text-2xl font-black tracking-tight text-white">
                  Yoyaku
                </span>
              </div>

              <p class="text-sm text-[#bcaaa4] max-w-sm leading-relaxed">
                ${
                  isMm
                    ? 'ရန်ကုန်မြို့၏ နာမည်ကြီး လက်ဖက်ရည်ဆိုင်များ၊ မိသားစု စားသောက်ဆိုင်များနှင့် အဆင့်မြင့် ရေပြင်ထက် စားသောက်ဆိုင်များတွင် စားပွဲဝိုင်းများကို အချိန်မရွေး ချက်ချင်း စိုတ်ယူလိုက်ပါ။'
                    : 'Yangon’s top dining reservation platform. Discover, explore, and instantly book tables for every craving, budget, and occasion across the city.'
                }
              </p>

              <div class="pt-2 space-y-2 text-xs text-[#d7ccc8]">
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-sm text-[#d08e1c]">call</span>
                  <span>${isMm ? 'ဖုန်းလိုင်း - ' : 'Hotline: '} <a href="tel:+959791234567" class="font-bold text-white hover:text-[#d08e1c] transition-colors">+95 9 791 234 567</a></span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-sm text-[#d08e1c]">location_on</span>
                  <span>${isMm ? 'ရန်ကုန်မြို့၊ မြန်မာနိုင်ငံ' : 'Yangon, Myanmar'}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="material-symbols-outlined text-sm text-[#d08e1c]">schedule</span>
                  <span>${isMm ? 'ဝန်ဆောင်မှုအချိန် - မနက် ၈:၀၀ မှ ည ၁၀:၀၀ အထိ' : 'Support Hours: 8:00 AM - 10:00 PM Daily'}</span>
                </div>
              </div>
            </div>

            <!-- Column 2: Quick Navigation -->
            <div class="space-y-3">
              <h4 class="font-headline text-base font-bold text-white tracking-wide uppercase text-xs text-[#d08e1c]">
                ${isMm ? 'အမြန်သွားရန်' : 'Quick Links'}
              </h4>
              <ul class="space-y-2.5 text-sm text-[#bcaaa4]">
                <li>
                  <button data-footer-tab="discover" class="hover:text-white transition-colors cursor-pointer text-left">
                    ${isMm ? 'ပင်မ စာမျက်နှာ' : 'Discover Home'}
                  </button>
                </li>
                <li>
                  <button data-footer-tab="resultlist" class="hover:text-white transition-colors cursor-pointer text-left">
                    ${isMm ? 'စားသောက်ဆိုင်များ ရှာရန်' : 'Explore All Restaurants'}
                  </button>
                </li>
                <li>
                  <button data-footer-tab="curated" class="hover:text-white transition-colors cursor-pointer text-left">
                    ${isMm ? 'အထူး ရွေးချယ်ထားသော ဆိုင်များ' : 'Curated Collections'}
                  </button>
                </li>
                <li>
                  <button data-footer-tab="reservations" class="hover:text-white transition-colors cursor-pointer text-left">
                    ${isMm ? 'ကျွန်ုပ်၏ စိုတ်ယူမှုများ' : 'My Reservations'}
                  </button>
                </li>
                <li>
                  <button data-footer-tab="favorites" class="hover:text-white transition-colors cursor-pointer text-left">
                    ${isMm ? 'သိမ်းဆည်းထားသော ဆိုင်များ' : 'Saved Favorites'}
                  </button>
                </li>
                <li>
                  <button data-footer-tab="mypage" class="hover:text-white transition-colors cursor-pointer text-left">
                    ${isMm ? 'အကောင့်နှင့် ကူပွန်များ' : 'Member Account & Rewards'}
                  </button>
                </li>
              </ul>
            </div>

            <!-- Column 3: Popular Cuisines & Types -->
            <div class="space-y-3">
              <h4 class="font-headline text-base font-bold text-white tracking-wide uppercase text-xs text-[#d08e1c]">
                ${isMm ? 'အစားအစာ အမျိုးအစားများ' : 'Popular Cuisines'}
              </h4>
              <ul class="space-y-2.5 text-sm text-[#bcaaa4]">
                <li>
                  <button data-footer-cuisine="Teahouse & Snacks" class="hover:text-white transition-colors cursor-pointer text-left">
                    ${isMm ? 'လက်ဖက်ရည်ဆိုင်နှင့် မုန့်များ' : 'Teahouses & Local Snacks'}
                  </button>
                </li>
                <li>
                  <button data-footer-cuisine="Burmese" class="hover:text-white transition-colors cursor-pointer text-left">
                    ${isMm ? 'မြန်မာ အစားအစာ' : 'Burmese Home-style'}
                  </button>
                </li>
                <li>
                  <button data-footer-cuisine="Japanese" class="hover:text-white transition-colors cursor-pointer text-left">
                    ${isMm ? 'ဂျပန် အစားအစာ' : 'Japanese & Sushi Bars'}
                  </button>
                </li>
                <li>
                  <button data-footer-cuisine="Italian" class="hover:text-white transition-colors cursor-pointer text-left">
                    ${isMm ? 'အီတလီနှင့် ပီဇာ' : 'Italian & Wood-fired Pizza'}
                  </button>
                </li>
                <li>
                  <button data-footer-cuisine="French" class="hover:text-white transition-colors cursor-pointer text-left">
                    ${isMm ? 'ပြင်သစ် အဆင့်မြင့် စားသောက်ဖွယ်ရာ' : 'French Fine Dining'}
                  </button>
                </li>
              </ul>
            </div>

            <!-- Column 4: Top Neighborhoods -->
            <div class="space-y-3">
              <h4 class="font-headline text-base font-bold text-white tracking-wide uppercase text-xs text-[#d08e1c]">
                ${isMm ? 'နာမည်ကြီး မြို့နယ်များ' : 'Yangon Areas'}
              </h4>
              <ul class="space-y-2.5 text-sm text-[#bcaaa4]">
                <li>
                  <button data-footer-area="Yangon Downtown" class="hover:text-white transition-colors cursor-pointer text-left">
                    ${isMm ? 'ရန်ကုန် မြို့ထဲ' : 'Yangon Downtown'}
                  </button>
                </li>
                <li>
                  <button data-footer-area="Dagon Township" class="hover:text-white transition-colors cursor-pointer text-left">
                    ${isMm ? 'ဒဂုံ မြို့နယ်' : 'Dagon Township'}
                  </button>
                </li>
                <li>
                  <button data-footer-area="Bahan Township" class="hover:text-white transition-colors cursor-pointer text-left">
                    ${isMm ? 'ဗဟန်း မြို့နယ်' : 'Bahan Township'}
                  </button>
                </li>
                <li>
                  <button data-footer-area="Inya Lake Waterfront" class="hover:text-white transition-colors cursor-pointer text-left">
                    ${isMm ? 'အင်းလျားကန်ဘေး' : 'Inya Lake Waterfront'}
                  </button>
                </li>
                <li>
                  <button data-footer-area="Ahlone Township" class="hover:text-white transition-colors cursor-pointer text-left">
                    ${isMm ? 'အလုံ မြို့နယ်' : 'Ahlone Township'}
                  </button>
                </li>
              </ul>
            </div>

          </div>

          <!-- Bottom Bar -->
          <div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8d7b75]">
            <div class="flex flex-col sm:flex-row items-center gap-3">
              <div>
                © 2026 <span class="text-white font-bold">Yoyaku</span>. ${
                  isMm
                    ? 'မူပိုင်ခွင့်များ ရယူထားပြီးဖြစ်သည်။'
                    : 'All rights reserved. Fast & Instant Table Reservations in Myanmar.'
                }
              </div>
              
              <!-- Footer Language Switcher (Mobile & Tablet thumb-friendly) -->
              <div class="inline-flex rounded-full p-0.5 bg-[#362723] border border-[#4a3631]">
                <button
                  type="button"
                  data-footer-set-lang="EN"
                  class="px-2.5 py-0.5 rounded-full text-[11px] font-label font-bold transition-all cursor-pointer ${
                    !isMm ? 'bg-[#9B1C25] text-white shadow-xs' : 'text-[#bcaaa4] hover:text-white'
                  }"
                >
                  EN
                </button>
                <button
                  type="button"
                  data-footer-set-lang="MM"
                  class="px-2.5 py-0.5 rounded-full text-[11px] font-label font-bold transition-all cursor-pointer ${
                    isMm ? 'bg-[#9B1C25] text-white shadow-xs' : 'text-[#bcaaa4] hover:text-white'
                  }"
                >
                  မြန်မာ
                </button>
              </div>
            </div>

            <!-- Social Links & Community -->
            <div class="flex items-center gap-6">
              <button id="footer-privacy-btn" class="hover:text-white transition-colors cursor-pointer">
                ${isMm ? 'ကိုယ်ရေးအချက်အလက် လုံခြုံမှုမူဝါဒ' : 'Privacy Policy'}
              </button>
              <span>•</span>
              <button id="footer-terms-btn" class="hover:text-white transition-colors cursor-pointer">
                ${isMm ? 'လုပ်ငန်းသုံး စည်းမျဉ်းများ' : 'Terms of Service'}
              </button>
              <span>•</span>
              <button id="footer-owner-btn" class="hover:text-white transition-colors cursor-pointer">
                ${isMm ? 'ဆိုင်ပိုင်ရှင်များ' : 'Partner with Us'}
              </button>
            </div>
          </div>

        </div>
      </footer>
    `;
  }

  function attachFooterEvents(root) {
    // Footer Privacy, Terms, Owner Application
    const privacyBtn = root.querySelector('#footer-privacy-btn');
    if (privacyBtn) {
      privacyBtn.addEventListener('click', () => store.openInfoModal('privacy'));
    }

    const termsBtn = root.querySelector('#footer-terms-btn');
    if (termsBtn) {
      termsBtn.addEventListener('click', () => store.openInfoModal('terms'));
    }

    const ownerBtn = root.querySelector('#footer-owner-btn');
    if (ownerBtn) {
      ownerBtn.addEventListener('click', () => store.openInfoModal('owner_application'));
    }
    // Footer Language Switcher
    root.querySelectorAll('[data-footer-set-lang]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = e.currentTarget.getAttribute('data-footer-set-lang');
        if (lang) {
          store.setLanguage(lang);
        }
      });
    });

    // Brand Logo Click
    const logo = root.querySelector('#footer-brand-logo');
    if (logo) {
      logo.addEventListener('click', () => {
        store.setSelectedRestaurant(null);
        store.setActiveTab('discover');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Footer Navigation Tabs
    root.querySelectorAll('[data-footer-tab]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-footer-tab');
        store.setSelectedRestaurant(null);
        store.setActiveTab(tab);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // Footer Cuisine Filters
    root.querySelectorAll('[data-footer-cuisine]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const cuisine = e.currentTarget.getAttribute('data-footer-cuisine');
        store.setSelectedRestaurant(null);
        store.updateResultsState({ cuisine, area: 'All Areas', keyword: '' });
        store.setActiveTab('resultlist');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // Footer Area Filters
    root.querySelectorAll('[data-footer-area]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const area = e.currentTarget.getAttribute('data-footer-area');
        store.setSelectedRestaurant(null);
        store.updateResultsState({ area, cuisine: 'All Cuisines', keyword: '' });
        store.setActiveTab('resultlist');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }


  window.YoyakuComponents.renderFooter = renderFooter;
  window.YoyakuComponents.attachFooterEvents = attachFooterEvents;
})();
