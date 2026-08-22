/* ============================================================
   EzBookNow Screen U-13 — Write a Review Screen
   ============================================================ */

const ScreenU13 = (() => {
  let selectedRating = 5;

  function render(params) {
    const lang = I18n.getLang();
    const id = params.id || 'RES-2026-001';
    
    // Look up reservation or shop
    let shopName = 'The Glass Pavilion';
    const res = MockData.reservations.find(r => r.id === id);
    if (res) {
      shopName = lang === 'mm' ? (res.shopName_mm || res.shopName) : res.shopName;
    } else {
      const rest = MockData.restaurants.find(r => r.id === id);
      if (rest) {
        shopName = lang === 'mm' ? (rest.name_mm || rest.name) : rest.name;
      }
    }

    const starWidget = `
      <div class="form-group flex flex-col items-center justify-center p-4 card card--flat mb-6">
        <label class="form-label mb-2">${I18n.t('your_rating')}</label>
        <div class="star-rating" style="font-size:32px;">
          ${[1, 2, 3, 4, 5].map(i => `
            <span class="star-rating__star ${i <= selectedRating ? 'filled' : ''}" 
                  style="cursor:pointer; font-size:36px;" 
                  onclick="ScreenU13.setRating(${i}, '${id}')">
              ★
            </span>
          `).join('')}
        </div>
      </div>
    `;

    const uploaderHtml = `
      <div class="form-group">
        <label class="form-label">${I18n.t('add_photos')}</label>
        <div class="file-upload" onclick="document.getElementById('review-file').click()">
          <span class="file-upload__icon">📷</span>
          <div class="file-upload__text">Drag & drop files or click to upload</div>
          <div class="file-upload__hint">${I18n.t('photo_hint')}</div>
          <input type="file" id="review-file" class="hidden" accept="image/*" multiple onchange="ScreenU13.handleFileChange(this)">
        </div>
        <div id="preview-container" class="flex gap-2 mt-4 flex-wrap"></div>
      </div>
    `;

    const content = `
      <div class="flex items-center gap-2 mb-4">
        <button class="btn btn-ghost btn-sm" onclick="history.back()">← ${I18n.t('back')}</button>
      </div>

      ${Components.pageHeader(I18n.t('write_review_title'), shopName)}

      <div style="max-width:600px; margin:0 auto;">
        <form class="card flex flex-col gap-5" onsubmit="ScreenU13.submitReview(event, '${id}')">
          ${starWidget}

          <div class="form-group">
            <label class="form-label">${I18n.t('your_comment')}<span class="required">*</span></label>
            <textarea class="form-textarea" id="review-comment" placeholder="${I18n.t('comment_placeholder')}" required></textarea>
          </div>

          ${uploaderHtml}

          <button type="submit" class="btn btn-primary btn-block btn-lg mt-4">
            ${I18n.t('submit_review')}
          </button>
        </form>
      </div>
    `;

    App.renderUserPage(content);
  }

  function setRating(val, id) {
    selectedRating = val;
    render({ id });
  }

  function handleFileChange(input) {
    const preview = document.getElementById('preview-container');
    if (!preview) return;
    preview.innerHTML = '';
    
    Array.from(input.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.style.width = '70px';
        img.style.height = '70px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '6px';
        img.style.border = '1px solid var(--color-outline-variant)';
        preview.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  }

  function submitReview(e, id) {
    e.preventDefault();
    const comment = document.getElementById('review-comment').value.trim();
    
    // Add review mockup
    MockData.reviews.unshift({
      id: `rev-${Date.now()}`,
      shopId: 'r1',
      userName: Router.getAuth().name,
      rating: selectedRating,
      comment,
      date: new Date().toISOString().split('T')[0],
      reply: null,
      repliedAt: null
    });

    showToast('success', 'Review Submitted', I18n.t('review_submitted'));
    Router.navigate('/user/mypage');
  }

  return { render, setRating, handleFileChange, submitReview };
})();
