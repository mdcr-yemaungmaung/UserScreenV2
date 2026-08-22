/* ============================================================
   EzBookNow Screen U-17 — Notification Settings Screen
   ============================================================ */

const ScreenU17 = (() => {
  let webPushSubscribed = false;
  let viberConsented = false;

  function render() {
    const channels = [
      { key: 'in_app', label: I18n.t('in_app'), active: true },
      { key: 'email', label: I18n.t('email_notifications'), active: true },
      { key: 'sms', label: `${I18n.t('sms_notifications')} (${I18n.t('coming_soon')})`, active: false, disabled: true }
    ];

    const channelToggles = `
      <div class="card flex flex-col gap-5">
        <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary);">${I18n.t('notification_channels')}</h3>
        <div class="flex flex-col gap-4">
          ${channels.map(ch => `
            <div class="flex justify-between items-center">
              <div>
                <div style="font-weight:600; font-size:14px;">${ch.label}</div>
                <div style="font-size:12px; color:var(--color-outline); margin-top:2px;">Get booking updates and alerts</div>
              </div>
              <label class="toggle">
                <input type="checkbox" ${ch.active ? 'checked' : ''} ${ch.disabled ? 'disabled' : ''}>
                <span class="toggle__slider"></span>
              </label>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    const webPushCard = `
      <div class="card flex flex-col gap-4">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary);">${I18n.t('web_push')}</h3>
            <p class="text-body-sm text-muted mt-2" style="max-width:400px;">${I18n.t('web_push_desc')}</p>
          </div>
          <span class="badge ${webPushSubscribed ? 'badge--success' : 'badge--expired'}">
            ${webPushSubscribed ? I18n.t('channel_active') : I18n.t('channel_inactive')}
          </span>
        </div>
        
        <div class="flex justify-end mt-2">
          <button class="btn ${webPushSubscribed ? 'btn-secondary' : 'btn-primary'}" onclick="ScreenU17.toggleWebPush()">
            ${webPushSubscribed ? 'Disable' : I18n.t('subscribe_web_push')}
          </button>
        </div>
      </div>
    `;

    const viberCard = `
      <div class="card flex flex-col gap-4">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary);">${I18n.t('viber_consent')}</h3>
            <p class="text-body-sm text-muted mt-2" style="max-width:400px;">${I18n.t('viber_consent_desc')}</p>
          </div>
          <span class="badge ${viberConsented ? 'badge--success' : 'badge--expired'}">
            ${viberConsented ? I18n.t('channel_active') : I18n.t('channel_inactive')}
          </span>
        </div>

        <div class="flex justify-end mt-2">
          <button class="btn ${viberConsented ? 'btn-danger' : 'btn-primary'}" onclick="ScreenU17.toggleViberConsent()">
            ${viberConsented ? I18n.t('revoke_consent') : I18n.t('give_consent')}
          </button>
        </div>
      </div>
    `;

    const content = `
      <div class="flex items-center gap-2 mb-4">
        <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/user/mypage')">← ${I18n.t('back')}</button>
      </div>

      ${Components.pageHeader(I18n.t('notification_settings'), '')}

      <div class="flex flex-col gap-6" style="max-width:720px; margin:0 auto;">
        ${channelToggles}
        ${webPushCard}
        ${viberCard}
      </div>
    `;

    App.renderUserPage(content);
  }

  function toggleWebPush() {
    webPushSubscribed = !webPushSubscribed;
    showToast('success', 'Web Push', webPushSubscribed ? 'Subscribed to web push notifications.' : 'Unsubscribed from web push.');
    render();
  }

  function toggleViberConsent() {
    viberConsented = !viberConsented;
    showToast('success', 'Viber Consent', viberConsented ? 'Viber communication consent granted.' : 'Viber communication consent revoked.');
    render();
  }

  return { render, toggleWebPush, toggleViberConsent };
})();
