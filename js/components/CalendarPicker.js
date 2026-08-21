(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};
  const store = window.store;



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
   * Helper to generate calendar grid HTML for a specific year & month.
   */
  function generateCalendarGrid({ year, month, selectedDateStr = 'Aug 14, 2026', onDaySelectAttr = 'data-calendar-select-day' }) {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // If year or month are not valid numbers, derive from selectedDateStr
    if (selectedDateStr) {
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

    year = typeof year === 'number' ? year : 2026;
    month = typeof month === 'number' ? month : 7;

    const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sun
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();

    let html = `
      <div class="calendar-widget font-body text-left">
        <!-- Month Navigation & Header -->
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4 pb-2 border-b border-[#EADFD1]">
          <div class="flex items-center gap-2">
            <button
              type="button"
              id="cal-prev-month"
              class="w-8 h-8 rounded-full bg-white border border-[#EADFD1] flex items-center justify-center text-[#231916] hover:bg-[#840f16] hover:text-white transition-colors cursor-pointer shadow-2xs"
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
              class="w-8 h-8 rounded-full bg-white border border-[#EADFD1] flex items-center justify-center text-[#231916] hover:bg-[#840f16] hover:text-white transition-colors cursor-pointer shadow-2xs"
              title="Next Month"
            >
              <span class="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>

          <div class="font-label text-xs font-semibold text-[#840f16] bg-[#840f16]/10 px-3 py-1 rounded-full border border-[#840f16]/20">
            Selected: ${selectedDateStr || 'Aug 14, 2026'}
          </div>
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
      const monthShort = monthNames[month].substring(0, 3);
      const dateFormatted = `${monthShort} ${day}, ${year}`;
      
      // Check if selected
      const isSelected = isSameDate(year, month, day, selectedDateStr, monthNames);
      
      // Check if today (2026-08-14 or system date)
      const isToday = (year === 2026 && month === 7 && day === 14) ||
                      (year === currentYear && month === currentMonth && day === currentDate);

      // Calculate if past date
      let isPast = false;
      if (year === 2026 && month === 7) {
        isPast = day < 14;
      } else if (year === currentYear && month === currentMonth) {
        isPast = day < currentDate;
      } else if (year < 2026 || (year === 2026 && month < 7)) {
        isPast = true;
      }

      // Selected dates are never disabled
      const isDisabled = isPast && !isSelected;

      html += `
        <button
          type="button"
          ${isDisabled ? 'disabled' : ''}
          ${onDaySelectAttr}="${year}-${month + 1}-${day}"
          data-date-str="${dateFormatted}"
          class="h-10 w-full rounded-2xl font-label text-xs font-semibold transition-all flex items-center justify-center relative ${
            isSelected
              ? 'bg-[#840f16] text-white shadow-md font-bold ring-2 ring-[#840f16]/30 cursor-pointer scale-105 z-10'
              : isToday
              ? 'bg-[#FFF8EE] text-[#840f16] font-bold border-2 border-[#840f16] hover:bg-[#840f16]/10 cursor-pointer shadow-2xs'
              : isDisabled
              ? 'text-[#EADFD1] opacity-40 cursor-not-allowed bg-transparent'
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


  window.YoyakuComponents.generateCalendarGrid = generateCalendarGrid;
})();
