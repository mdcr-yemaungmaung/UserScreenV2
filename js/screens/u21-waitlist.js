/* ============================================================
   EzBookNow Screen U-21 — Waitlist Screen
   ============================================================ */

const ScreenU21 = (() => {
  function render() {
    const list = MockData.waitlistEntries;

    const listHtml = list.length === 0 ?
      Components.emptyState('clock', I18n.t('no_waitlist'), I18n.t('waitlist_empty_desc')) :
      `<div class="flex flex-col gap-4" style="max-width:720px; margin:0 auto;">
        ${list.map(w => {
          const isNotified = w.status === 'notified';
          return `
            <div class="card card--glass flex justify-between items-center flex-wrap gap-4 relative overflow-hidden" style="border-left: 5px solid ${isNotified ? 'var(--color-secondary)' : 'var(--color-primary)'};">
              <div>
                <h3 class="text-headline-sm" style="font-size:16px; color:var(--color-primary); font-weight:700;">${w.shopName}</h3>
                <div class="text-body-sm text-muted" style="margin-top:2px;">
                  <span>📅 Desired: ${MockData.formatDate(w.date)} at ${w.timeSlot}</span>
                  <span> · </span>
                  <span>👥 ${w.guests} ${I18n.t('guests_count', { n: '' }).trim()}</span>
                </div>
                ${isNotified ? `
                  <div style="font-size:12px; color:var(--color-secondary); font-weight:600; margin-top:6px;">
                    ⚡ Spot available! Claim expires in 12 hours.
                  </div>
                ` : ''}
              </div>
              <div class="flex items-center gap-3">
                ${Components.statusBadge(w.status)}
                ${isNotified ? `
                  <button class="btn btn-primary btn-sm" onclick="ScreenU21.claimSpot('${w.shopId}', '${w.date}', '${w.timeSlot}', '${w.guests}', '${w.id}')">${I18n.t('claim_and_book')}</button>
                ` : ''}
                <button class="btn btn-ghost btn-sm" onclick="ScreenU21.cancelEntry('${w.id}')">${I18n.t('cancel_waitlist')}</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>`;

    const content = `
      <div class="flex items-center gap-2 mb-4">
        <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/user/mypage')">← ${I18n.t('back')}</button>
      </div>

      ${Components.pageHeader(I18n.t('waitlist'), '')}

      ${listHtml}
    `;

    App.renderUserPage(content);
  }

  function claimSpot(shopId, date, time, guests, entryId) {
    sessionStorage.setItem('booking_date', new Date(date).toISOString());
    sessionStorage.setItem('booking_time', time);
    sessionStorage.setItem('booking_guests', guests);
    
    // Remove from waitlist list
    const index = MockData.waitlistEntries.findIndex(w => w.id === entryId);
    if(index !== -1) MockData.waitlistEntries.splice(index, 1);
    
    showToast('success', 'Claimed', 'Spot claimed! Proceeding to reservation details.');
    Router.navigate(`/user/booking-input/${shopId}`);
  }

  function cancelEntry(id) {
    const confirmHtml = Components.confirmModal(
      I18n.t('cancel_waitlist'),
      'Are you sure you want to cancel this waitlist entry?',
      `ScreenU21.executeCancel('${id}')`,
      I18n.t('cancel'),
      true
    );
    const div = document.createElement('div');
    div.innerHTML = confirmHtml;
    document.body.appendChild(div.firstElementChild);
  }

  function executeCancel(id) {
    const index = MockData.waitlistEntries.findIndex(w => w.id === id);
    if (index !== -1) {
      MockData.waitlistEntries.splice(index, 1);
      showToast('success', 'Cancelled', 'Waitlist entry cancelled successfully.');
      render();
    }
  }

  return { render, claimSpot, cancelEntry, executeCancel };
})();
