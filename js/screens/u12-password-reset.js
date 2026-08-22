/* ============================================================
   EzBookNow Screen U-12 — Password Reset Screen
   ============================================================ */

const ScreenU12 = (() => {
  let step = 1; // 1 = input email, 2 = input new password

  function render() {
    let cardContent = '';

    if (step === 1) {
      cardContent = `
        <div class="login-card__logo">🔑</div>
        <h1 class="login-card__title">${I18n.t('reset_password')}</h1>
        <p class="login-card__subtitle">${I18n.t('reset_password_desc')}</p>
        
        <div class="login-card__form animate-fade-in">
          <form onsubmit="ScreenU12.requestLink(event)">
            <div class="form-group">
              <label class="form-label">${I18n.t('email_address')}</label>
              <input type="email" class="form-input" id="reset-email" placeholder="name@example.com" required>
            </div>
            <button type="submit" class="btn btn-primary btn-block btn-lg mt-6">
              ${I18n.t('send_reset_link')}
            </button>
          </form>
        </div>

        <div class="login-card__footer">
          <a class="text-primary" style="font-weight:600;" onclick="Router.navigate('/user/login')">← ${I18n.t('back')} ${I18n.t('login')}</a>
        </div>
      `;
    } else {
      cardContent = `
        <div class="login-card__logo">🔒</div>
        <h1 class="login-card__title">${I18n.t('set_new_password')}</h1>
        <p class="login-card__subtitle">Please enter a strong new password.</p>

        <div class="login-card__form animate-fade-in">
          <form onsubmit="ScreenU12.setNewPassword(event)">
            <div class="form-group">
              <label class="form-label">${I18n.t('new_password')}</label>
              <input type="password" class="form-input" id="new-password" required placeholder="••••••••">
            </div>
            <div class="form-group">
              <label class="form-label">${I18n.t('confirm_new_password')}</label>
              <input type="password" class="form-input" id="confirm-new-password" required placeholder="••••••••">
            </div>
            <button type="submit" class="btn btn-primary btn-block btn-lg mt-6">
              ${I18n.t('save')}
            </button>
          </form>
        </div>
      `;
    }

    App.renderLoginPage(cardContent);
  }

  function requestLink(e) {
    e.preventDefault();
    const email = document.getElementById('reset-email').value;
    showToast('success', 'Reset Link Sent', `${I18n.t('reset_email_sent')} (simulating redirect to stage 2 in 2s)`);
    
    // Simulate clicking the email link after 2 seconds
    setTimeout(() => {
      step = 2;
      render();
    }, 2000);
  }

  function setNewPassword(e) {
    e.preventDefault();
    const pwd = document.getElementById('new-password').value;
    const confirm = document.getElementById('confirm-new-password').value;

    if (pwd !== confirm) {
      showToast('error', 'Error', I18n.t('passwords_not_match'));
      return;
    }

    showToast('success', 'Success', I18n.t('password_updated'));
    step = 1; // Reset step
    Router.navigate('/user/login');
  }

  return { render, requestLink, setNewPassword };
})();
