/* ============================================================
   EzBookNow Screen U-19 — Announcements List Screen
   ============================================================ */

const ScreenU19 = (() => {
  function render() {
    const lang = I18n.getLang();
    const list = MockData.announcements;

    const listHtml = list.length === 0 ?
      Components.emptyState('info', I18n.t('no_announcements'), '') :
      `<div class="flex flex-col gap-6" style="max-width:720px; margin:0 auto;">
        ${list.map(ann => {
          const title = lang === 'mm' ? (ann.title_mm || ann.title) : ann.title;
          const body = lang === 'mm' ? (ann.body_mm || ann.body) : ann.body;
          return `
            <div class="card card--glass flex flex-col gap-3">
              <div class="flex justify-between items-start flex-wrap gap-2">
                <h3 class="text-headline-sm" style="font-size:16px; color:var(--color-primary); font-weight:700;">${title}</h3>
                <span class="text-label-sm text-muted">${I18n.t('posted_on')}: ${MockData.formatDate(ann.date)}</span>
              </div>
              <p class="text-body-sm text-muted" style="line-height:1.6;">${body}</p>
            </div>
          `;
        }).join('')}
      </div>`;

    const content = `
      <div class="flex items-center gap-2 mb-4">
        <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/user/mypage')">← ${I18n.t('back')}</button>
      </div>

      ${Components.pageHeader(I18n.t('announcements'), '')}

      ${listHtml}
    `;

    App.renderUserPage(content);
  }

  return { render };
})();
