/* ============================================================
   EzBookNow Screen U-14 — Coupons List Screen
   ============================================================ */

const ScreenU14 = (() => {
  function render() {
    const listHtml = MockData.coupons.length === 0 ? 
      Components.emptyState('tag', I18n.t('no_coupons'), I18n.t('check_back_later')) :
      `<div class="grid grid-2 gap-6">
        ${MockData.coupons.map(c => {
          const discountVal = c.type === 'percentage' ? `${c.value}%` : `${MockData.formatMMK(c.value)}`;
          return `
            <div class="card card--glass flex justify-between items-center gap-4 relative overflow-hidden" style="border-left: 5px solid var(--color-secondary);">
              <div>
                <div class="text-overline" style="color:var(--color-secondary); font-weight:700;">${I18n.t('discount')}</div>
                <h3 class="text-headline-md mb-2" style="font-weight:700; color:var(--color-primary);">${discountVal} ${I18n.t('discount')}</h3>
                <div style="font-size:14px; font-weight:600; color:var(--color-on-surface);">${c.name}</div>
                <div style="font-size:12px; color:var(--color-outline); margin-top:2px;">${I18n.t('min_order')}: ${MockData.formatMMK(c.minOrder)}</div>
                <div style="font-size:11px; color:var(--color-outline); margin-top:6px;">📅 ${I18n.t('valid_until')} ${MockData.formatDate(c.validUntil)}</div>
              </div>
              <div class="flex flex-col gap-2 items-end">
                <div class="p-2 bg-surface-container text-primary font-mono text-label-sm" style="border-radius:4px; font-weight:700; border:1px dashed var(--color-outline-variant);">${c.code}</div>
                <button class="btn btn-primary btn-sm" onclick="ScreenU14.copyCode('${c.code}')">${I18n.t('use_coupon')}</button>
              </div>
            </div>
          `;
        }).join('')}
      </div>`;

    const content = `
      <div class="flex items-center gap-2 mb-4">
        <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/user/mypage')">← ${I18n.t('back')}</button>
      </div>

      ${Components.pageHeader(I18n.t('available_coupons'), '')}

      ${listHtml}
    `;

    App.renderUserPage(content);
  }

  function copyCode(code) {
    navigator.clipboard.writeText(code).then(() => {
      showToast('success', 'Coupon Copied', `Coupon code "${code}" copied to clipboard.`);
    }).catch(() => {
      showToast('success', 'Coupon', `Use code: ${code}`);
    });
  }

  return { render, copyCode };
})();
