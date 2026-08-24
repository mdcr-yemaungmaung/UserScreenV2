(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;

  // ---------------------------------------------------------------------------
  // Date helpers (local time, day-granularity)
  // ---------------------------------------------------------------------------

  function startOfToday() {
    const t = new Date();
    return new Date(t.getFullYear(), t.getMonth(), t.getDate());
  }

  function addDays(date, n) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);
  }

  function toSerial(year, monthIndex, day) {
    return year * 10000 + (monthIndex + 1) * 100 + day;
  }

  function formatDisplayDate(year, monthIndex, day, monthNames) {
    return `${monthNames[monthIndex].substring(0, 3)} ${day}, ${year}`;
  }

  // ---------------------------------------------------------------------------
  // Mock availability (deterministic, per research.md R3 / constitution IV)
  //
  // - Deterministic hash rule marks ~15% of dates unavailable; the same date
  //   always resolves identically across renders/sessions.
  // - AVAILABILITY_OVERRIDES keys are whole-day offsets from today
  //   (e.g. 3 => today+3) with `true` = forced unavailable, `false` = forced
  //   available, for reproducible demo/quickstart scenarios (S5/S6).
  // - DEMO_TODAY_UNAVAILABLE simulates "no bookable slots left today" (S6).
  // ---------------------------------------------------------------------------

  const AVAILABILITY_OVERRIDES = {
    3: true,  // today+3 forced unavailable for demo
    5: false, // today+5 forced available for demo
  };

  const DEMO_TODAY_UNAVAILABLE = false;

  function defaultIsUnavailableFn(year, monthIndex, day, todayMid) {
    const offset = Math.round(
      (new Date(year, monthIndex, day).getTime() - todayMid.getTime()) / 86400000
    );
    if (Object.prototype.hasOwnProperty.call(AVAILABILITY_OVERRIDES, offset)) {
      return AVAILABILITY_OVERRIDES[offset];
    }
    if (offset === 0 && DEMO_TODAY_UNAVAILABLE) {
      return true;
    }
    const h = (year * 733 + (monthIndex + 1) * 37 + day * 13) % 100;
    return h < 15;
  }

  // Helper to compare if a specific calendar cell matches the selectedDateStr
  function isSameDate(year, month, day, selectedDateStr, monthNames) {
    if (!selectedDateStr) return false;

    const monthShort = monthNames[month].substring(0, 3);
    const formatted1 = `${monthShort} ${day}, ${year}`;
    const formatted2 = `${monthNames[month]} ${day}, ${year}`;
    const formattedISO = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const formattedShortISO = `${year}-${month + 1}-${day}`;

    if (
      selectedDateStr === formatted1 ||
      selectedDateStr === formatted2 ||
      selectedDateStr === formattedISO ||
      selectedDateStr === formattedShortISO
    ) {
      return true;
    }

    // Parse structured string: e.g. "Aug 14, 2026" or "2026-08-14"
    const cleaned = selectedDateStr.replace(/,/g, ' ').replace(/-/g, ' ').replace(/\//g, ' ').trim().split(/\s+/);
    if (cleaned.length >= 3) {
      if (cleaned[0].length === 4 && !isNaN(cleaned[0])) {
        const pYear = parseInt(cleaned[0], 10);
        const pMonth = parseInt(cleaned[1], 10) - 1;
        const pDay = parseInt(cleaned[2], 10);
        return pYear === year && pMonth === month && pDay === day;
      } else {
        const pMonthIdx = monthNames.findIndex(m => m.toLowerCase().startsWith(cleaned[0].toLowerCase().substring(0, 3)));
        const pDay = parseInt(cleaned[1], 10);
        const pYear = parseInt(cleaned[2], 10);
        return pMonthIdx === month && pDay === day && pYear === year;
      }
    }
    return false;
  }

  /**
   * Generate calendar grid HTML for a specific year & month.
   *
   * Booking window contract (specs/002-booking-calendar-window):
   * - Selectable range defaults to [today, today+59] (60 days inclusive),
   *   recomputed from the system clock on every call.
   * - Backward navigation is blocked at the current month; forward navigation
   *   stops at the month containing maxDate (controls render `disabled`).
   * - Days outside the window or without availability render disabled and
   *   non-selectable; visual precedence: selected > today > disabled.
   */
  function generateCalendarGrid({
    year,
    month,
    selectedDateStr,
    onDaySelectAttr = 'data-calendar-select-day',
    minDate,
    maxDate,
    isUnavailableFn = null,
  }) {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const todayMid = startOfToday();
    const curYear = todayMid.getFullYear();
    const curMonth = todayMid.getMonth();

    // Booking window bounds (FR-001/FR-010): recomputed every call.
    const winMin = minDate ? startOfDay(minDate) : todayMid;
    const winMax = maxDate ? startOfDay(maxDate) : addDays(winMin, 59);
    const minSerial = toSerial(winMin.getFullYear(), winMin.getMonth(), winMin.getDate());
    const maxSerial = toSerial(winMax.getFullYear(), winMax.getMonth(), winMax.getDate());

    // If year or month are not valid numbers, derive from selectedDateStr,
    // falling back to the current month (never a hardcoded date).
    if ((year === undefined || month === undefined) && selectedDateStr) {
      const parts = selectedDateStr.replace(/,/g, ' ').replace(/-/g, ' ').replace(/\//g, ' ').trim().split(/\s+/);
      if (parts.length >= 3) {
        if (parts[0].length === 4 && !isNaN(parts[0])) {
          if (year === undefined) year = parseInt(parts[0], 10);
          if (month === undefined) month = parseInt(parts[1], 10) - 1;
        } else {
          const mIdx = monthNames.findIndex(m => m.toLowerCase().startsWith(parts[0].toLowerCase().substring(0, 3)));
          if (mIdx !== -1 && month === undefined) {
            month = mIdx;
          }
          const parsedYear = parseInt(parts[2], 10);
          if (!isNaN(parsedYear) && year === undefined) {
            year = parsedYear;
          }
        }
      }
    }

    year = typeof year === 'number' ? year : curYear;
    month = typeof month === 'number' ? month : curMonth;

    const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Navigation gating (FR-002 backward blocked / FR-003 forward bounded).
    const monthStartSerial = toSerial(year, month, 1);
    const curMonthStartSerial = toSerial(curYear, curMonth, 1);
    const prevDisabled = monthStartSerial <= curMonthStartSerial;
    const nextDisabled = new Date(year, month + 1, 1) > winMax;

    const navEnabledClass = 'hover:bg-[#840f16] hover:text-white cursor-pointer';
    const navDisabledClass = 'opacity-40 cursor-not-allowed';

    let html = `
      <div class="calendar-widget font-body text-left">
        <!-- Month Navigation & Header -->
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4 pb-2 border-b border-[#EADFD1]">
          <div class="flex items-center gap-2">
            <button
              type="button"
              id="cal-prev-month"
              ${prevDisabled ? 'disabled' : ''}
              class="w-8 h-8 rounded-full bg-white border border-[#EADFD1] flex items-center justify-center text-[#231916] transition-colors shadow-2xs ${prevDisabled ? navDisabledClass : navEnabledClass}"
              title="Previous Month"
            >
              <span class="material-symbols-outlined text-lg">chevron_left</span>
            </button>

            <div class="flex items-center gap-1.5 font-headline text-base font-bold text-[#231916]">
              <span class="material-symbols-outlined text-lg text-[#840f16]">calendar_month</span>
              <span>${monthNames[month]} ${year}</span>
            </div>

            <button
              type="button"
              id="cal-next-month"
              ${nextDisabled ? 'disabled' : ''}
              class="w-8 h-8 rounded-full bg-white border border-[#EADFD1] flex items-center justify-center text-[#231916] transition-colors shadow-2xs ${nextDisabled ? navDisabledClass : navEnabledClass}"
              title="Next Month"
            >
              <span class="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>

          ${selectedDateStr ? `
          <div class="font-label text-xs font-semibold text-[#840f16] bg-[#840f16]/10 px-3 py-1 rounded-full border border-[#840f16]/20">
            Selected: ${selectedDateStr}
          </div>` : ''}
        </div>

        <!-- Day of Week Headers -->
        <div class="grid grid-cols-7 gap-1 text-center mb-3 font-label text-[11px] text-[#8d7b75] font-bold tracking-wider uppercase">
          <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
        </div>

        <!-- Calendar Days Grid -->
        <div class="grid grid-cols-7 gap-2">
    `;

    // Empty cells before 1st day of month
    for (let i = 0; i < firstDayOfWeek; i++) {
      html += `<div class="h-10"></div>`;
    }

    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const dateFormatted = formatDisplayDate(year, month, day, monthNames);

      // Check if selected
      const isSelected = isSameDate(year, month, day, selectedDateStr, monthNames);

      const isToday = (year === curYear && month === curMonth && day === todayMid.getDate());

      // Window membership (FR-001..FR-003)
      const serial = toSerial(year, month, day);
      const inWindow = serial >= minSerial && serial <= maxSerial;

      // Availability (FR-006): no slots => disabled, including today (no exemption)
      const unavailableFn = isUnavailableFn || defaultIsUnavailableFn;
      const hasAvailability = !unavailableFn(year, month, day, todayMid);

      let isDisabled = !inWindow || !hasAvailability;

      // Selected dates are never disabled (selection only lands on enabled days)
      isDisabled = isDisabled && !isSelected;

      html += `
        <button
          type="button"
          ${isDisabled ? 'disabled' : ''}
          ${onDaySelectAttr}="${year}-${month + 1}-${day}"
          data-date-str="${dateFormatted}"
          class="h-10 w-full rounded-2xl font-label text-xs font-semibold transition-all flex items-center justify-center relative ${
            isSelected
              ? 'bg-[#840f16] text-white shadow-md font-bold ring-2 ring-[#840f16]/30 cursor-pointer scale-105 z-10'
              : isDisabled
              ? 'text-[#8d7b75] opacity-60 cursor-not-allowed bg-[#EADFD1]/30 border border-[#EADFD1]/50 rounded-2xl'
              : isToday
              ? 'bg-[#FFF8EE] text-[#840f16] font-bold border-2 border-[#840f16] hover:bg-[#840f16]/10 cursor-pointer shadow-2xs'
              : 'bg-white text-[#231916] hover:bg-[#840f16]/10 border border-[#EADFD1] cursor-pointer shadow-2xs'
          }"
        >
          <span>${day}</span>
        </button>
      `;
    }

    html += `
        </div>
      </div>
    `;

    return html;
  }

  function startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  window.YoyakuComponents.generateCalendarGrid = generateCalendarGrid;
})();
