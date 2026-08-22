/* ============================================================
   EzBookNow Screen U-18 — Online Payment Screen (Sandbox)
   ============================================================ */

const ScreenU18 = (() => {
  let selectedProvider = 'kbzpay';
  let isProcessing = false;

  function render() {
    const amount = parseInt(sessionStorage.getItem('booking_amount') || '40000');
    const formattedAmount = MockData.formatMMK(amount);

    let mainContent = '';

    if (isProcessing) {
      mainContent = `
        <div class="card flex flex-col justify-center items-center p-8 text-center" style="min-height:300px;">
          <div class="app-loading mb-4"><div class="spinner"></div></div>
          <h3 class="text-headline-sm">${I18n.t('payment_processing')}</h3>
          <p class="text-body-sm text-muted mt-2">Connecting securely with mobile payment gateway...</p>
        </div>
      `;
    } else {
      mainContent = `
        <div class="layout-sidebar-right">
          <section class="card flex flex-col gap-6">
            <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary);">${I18n.t('select_provider')}</h3>
            
            <div class="flex flex-col gap-3">
              <label class="form-check p-4 border rounded" style="border:1.5px solid ${selectedProvider === 'kbzpay' ? 'var(--color-primary)' : 'var(--color-outline-variant)'}; border-radius:var(--radius-lg); background:${selectedProvider === 'kbzpay' ? 'rgba(19, 21, 70, 0.02)' : 'transparent'}; cursor:pointer;">
                <input type="radio" name="pay-provider" value="kbzpay" ${selectedProvider === 'kbzpay' ? 'checked' : ''} onchange="ScreenU18.setProvider('kbzpay')">
                <div class="flex gap-4 items-center">
                  <div style="font-size:24px;">📱</div>
                  <div>
                    <strong>KBZPay Online SDK</strong>
                    <div style="font-size:12px;color:var(--color-outline);">Pay using KBZPay mobile app directly</div>
                  </div>
                </div>
              </label>

              <label class="form-check p-4 border rounded" style="border:1.5px solid ${selectedProvider === 'wave' ? 'var(--color-primary)' : 'var(--color-outline-variant)'}; border-radius:var(--radius-lg); background:${selectedProvider === 'wave' ? 'rgba(19, 21, 70, 0.02)' : 'transparent'}; cursor:pointer;">
                <input type="radio" name="pay-provider" value="wave" ${selectedProvider === 'wave' ? 'checked' : ''} onchange="ScreenU18.setProvider('wave')">
                <div class="flex gap-4 items-center">
                  <div style="font-size:24px;">📱</div>
                  <div>
                    <strong>WaveMoney SDK</strong>
                    <div style="font-size:12px;color:var(--color-outline);">Pay using WaveMoney e-wallet app</div>
                  </div>
                </div>
              </label>
            </div>
          </section>

          <aside class="booking-summary card flex flex-col gap-4">
            <h4 style="font-size:16px;font-weight:700;color:var(--color-primary);">${I18n.t('payment_amount')}</h4>
            <div class="booking-summary__total flex justify-between items-center mb-4">
              <span>${I18n.t('total')}</span>
              <span>${formattedAmount}</span>
            </div>
            <button class="btn btn-primary btn-block btn-lg" onclick="ScreenU18.processPayment()">
              ${I18n.t('start_payment')}
            </button>
            <button class="btn btn-ghost btn-block" onclick="history.back()">
              ${I18n.t('cancel')}
            </button>
          </aside>
        </div>
      `;
    }

    const content = `
      <div class="flex items-center gap-2 mb-4">
        <button class="btn btn-ghost btn-sm" onclick="history.back()">← ${I18n.t('back')}</button>
      </div>

      ${Components.pageHeader(I18n.t('online_payment'), 'Reservation Gateway Sandbox')}

      <div style="max-width:960px; margin:0 auto;">
        ${mainContent}
      </div>
    `;

    App.renderUserPage(content);
  }

  function setProvider(prov) {
    selectedProvider = prov;
    render();
  }

  function processPayment() {
    isProcessing = true;
    render();

    // Simulate completion
    setTimeout(() => {
      isProcessing = false;
      showToast('success', 'Payment Successful', 'Online payment sandbox verified.');
      
      // Auto complete booking
      if (typeof ScreenU06 !== 'undefined') {
        ScreenU06.completeBooking();
      }
    }, 2000);
  }

  return { render, setProvider, processPayment };
})();
