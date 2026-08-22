/* ============================================================
   EzBookNow Screen U-20 — Account Settings Screen
   ============================================================ */

const ScreenU20 = (() => {
  function render() {
    const emailForm = `
      <div class="card flex flex-col gap-4">
        <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary);">${I18n.t('change_email')}</h3>
        <form onsubmit="event.preventDefault(); showToast('success', 'Email Updated', 'Email changed successfully.');">
          <div class="form-group">
            <label class="form-label">${I18n.t('email_address')}</label>
            <input type="email" class="form-input" value="${Router.getAuth().email}">
          </div>
          <div class="flex justify-end">
            <button type="submit" class="btn btn-primary btn-sm">${I18n.t('save')}</button>
          </div>
        </form>
      </div>
    `;

    const passwordForm = `
      <div class="card flex flex-col gap-4">
        <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary);">${I18n.t('change_password')}</h3>
        <form onsubmit="event.preventDefault(); showToast('success', 'Password Saved', 'Password updated successfully.');">
          <div class="form-group">
            <label class="form-label">${I18n.t('current_password')}</label>
            <input type="password" class="form-input" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">${I18n.t('new_password')}</label>
              <input type="password" class="form-input" required>
            </div>
            <div class="form-group">
              <label class="form-label">${I18n.t('confirm_new_password')}</label>
              <input type="password" class="form-input" required>
            </div>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="btn btn-primary btn-sm">${I18n.t('save')}</button>
          </div>
        </form>
      </div>
    `;

    const deleteCard = `
      <div class="card flex flex-col gap-4" style="border-left:4px solid var(--color-error); background:rgba(186, 26, 26, 0.02);">
        <h3 class="text-label-md text-error" style="font-weight:700;">${I18n.t('account_deletion')}</h3>
        <p class="text-body-sm text-muted">${I18n.t('delete_account_warning')}</p>
        
        <form onsubmit="ScreenU20.handleDelete(event)">
          <div class="form-group">
            <label class="form-label">${I18n.t('delete_account_reason')}</label>
            <select class="form-select" id="delete-reason">
              <option value="">Select a reason...</option>
              <option value="1">Found alternative app</option>
              <option value="2">Privacy concerns</option>
              <option value="3">Not using it anymore</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-check">
              <input type="checkbox" id="delete-confirm-chk" required>
              <span style="font-weight:600; font-size:13px;">${I18n.t('confirm_delete')}</span>
            </label>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="btn btn-danger btn-sm">${I18n.t('delete_my_account')}</button>
          </div>
        </form>
      </div>
    `;

    const content = `
      <div class="flex items-center gap-2 mb-4">
        <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/user/mypage')">← ${I18n.t('back')}</button>
      </div>

      ${Components.pageHeader(I18n.t('account_settings'), '')}

      <div class="flex flex-col gap-6" style="max-width:720px; margin:0 auto;">
        ${emailForm}
        ${passwordForm}
        ${deleteCard}
      </div>
    `;

    App.renderUserPage(content);
  }

  function handleDelete(e) {
    e.preventDefault();
    const chk = document.getElementById('delete-confirm-chk').checked;
    if (!chk) {
      showToast('error', 'Required Check', 'Please verify understanding statement.');
      return;
    }

    const confirmHtml = Components.confirmModal(
      I18n.t('delete_account'),
      'Are you sure you want to permanently delete your account? This action cannot be undone and your profile will be anonymized.',
      'ScreenU20.executeDeletion()',
      'Delete My Account',
      true
    );

    const div = document.createElement('div');
    div.innerHTML = confirmHtml;
    document.body.appendChild(div.firstElementChild);
  }

  function executeDeletion() {
    showToast('success', 'Account Deleted', 'Your account has been deleted.');
    Router.authState.user.isLoggedIn = false;
    Router.navigate('/user/login');
  }

  return { render, handleDelete, executeDeletion };
})();
