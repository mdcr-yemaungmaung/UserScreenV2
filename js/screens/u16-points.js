/* ============================================================
   EzBookNow Screen U-16 — Points & Membership Screen
   ============================================================ */

const ScreenU16 = (() => {
  function render() {
    const points = 1250;
    const rank = 'Silver';
    const nextRank = 'Gold';
    const pointsNeeded = 2500 - points;
    const progressPercent = (points / 2500) * 100;

    // Membership Visual Card
    const membershipCard = `
      <div class="card flex flex-col gap-6" style="background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dim)); color: white; border-radius: var(--radius-xl); box-shadow: var(--shadow-lg); border: none;">
        <div class="flex justify-between items-start">
          <div>
            <div class="text-overline" style="color:rgba(255,255,255,0.7);">${I18n.t('membership_rank')}</div>
            <h2 class="text-headline-md" style="font-weight:700; color:var(--color-secondary-container);">${rank} Tier</h2>
          </div>
          <div style="font-size:32px;">🌟</div>
        </div>

        <div>
          <div class="text-overline" style="color:rgba(255,255,255,0.7);">${I18n.t('current_points')}</div>
          <div class="text-headline-xl" style="font-weight:800; line-height:1; margin-top:4px;">${points} PTS</div>
        </div>

        <div style="margin-top:auto;">
          <div class="flex justify-between text-label-sm mb-2" style="color:rgba(255,255,255,0.8);">
            <span>Progress to ${nextRank}</span>
            <span>${points} / 2500 PTS</span>
          </div>
          <div class="progress-bar" style="background:rgba(255,255,255,0.15); height:8px;">
            <div class="progress-bar__fill" style="width:${progressPercent}%; background:var(--color-secondary-container);"></div>
          </div>
          <div style="font-size:11px; color:rgba(255,255,255,0.6); margin-top:8px;">
            Earn ${pointsNeeded} more points to unlock ${nextRank} rewards.
          </div>
        </div>
      </div>
    `;

    // Available Benefits
    const benefitsHtml = `
      <div class="card flex flex-col gap-4">
        <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary);">${I18n.t('available_benefits')} (${rank})</h3>
        <div class="flex flex-col gap-3">
          <div class="flex items-start gap-3" style="font-size:14px;">
            <span style="color:var(--color-success);">✓</span>
            <div>
              <strong>1.2x Points Multiplier</strong>
              <p class="text-muted" style="font-size:12px; margin-top:2px;">Earn 20% more points on every completed booking.</p>
            </div>
          </div>
          <div class="flex items-start gap-3" style="font-size:14px;">
            <span style="color:var(--color-success);">✓</span>
            <div>
              <strong>Free Birthday Drink</strong>
              <p class="text-muted" style="font-size:12px; margin-top:2px;">Get a free welcome drink coupon on your birthday month.</p>
            </div>
          </div>
          <div class="flex items-start gap-3" style="font-size:14px;">
            <span style="color:var(--color-success);">✓</span>
            <div>
              <strong>Priority Waitlist</strong>
              <p class="text-muted" style="font-size:12px; margin-top:2px;">Jump ahead in waitlist queues at selected restaurants.</p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Points History
    const historyRows = `
      <tr>
        <td style="padding:12px;">RES-2026-003</td>
        <td style="padding:12px;">The Glass Pavilion Reservation</td>
        <td style="padding:12px;">Jul 10, 2026</td>
        <td style="padding:12px; font-weight:700; color:var(--color-success);">+150 PTS</td>
      </tr>
      <tr>
        <td style="padding:12px;">RES-2026-001</td>
        <td style="padding:12px;">Golden Mandalay Reservation</td>
        <td style="padding:12px;">Jul 05, 2026</td>
        <td style="padding:12px; font-weight:700; color:var(--color-success);">+100 PTS</td>
      </tr>
      <tr>
        <td style="padding:12px;">COUPON-CLAIM</td>
        <td style="padding:12px;">Claimed Promo Code LUNCH10</td>
        <td style="padding:12px;">Jul 01, 2026</td>
        <td style="padding:12px; font-weight:700; color:var(--color-error);">-50 PTS</td>
      </tr>
    `;

    const tableHtml = Components.dataTable({
      columns: ['Reference', 'Description', 'Date', 'Points'],
      rows: historyRows,
      searchPlaceholder: 'Search transactions...',
      pagination: false
    });

    const content = `
      <div class="flex items-center gap-2 mb-4">
        <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/user/mypage')">← ${I18n.t('back')}</button>
      </div>

      ${Components.pageHeader(I18n.t('points_membership'), '')}

      <div class="grid grid-2 gap-8 mb-8">
        ${membershipCard}
        ${benefitsHtml}
      </div>

      <div class="card p-0 flex flex-col overflow-hidden">
        <h3 class="text-label-md p-4" style="font-weight:700; border-bottom:1px solid var(--color-surface-container);">${I18n.t('points_history')}</h3>
        ${tableHtml}
      </div>
    `;

    App.renderUserPage(content);
  }

  return { render };
})();
