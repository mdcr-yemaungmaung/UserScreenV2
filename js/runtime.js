(function () {
  const prototype = window.YoyakuPrototype = window.YoyakuPrototype || {};

  const ICON_MAP = {
    account_circle: '◉',
    add: '+',
    arrow_back: '←',
    arrow_forward: '→',
    calendar_month: '📅',
    calendar_today: '📆',
    call: '☎',
    campaign: '📣',
    chair: '🪑',
    check: '✓',
    check_circle: '✔',
    chevron_left: '‹',
    chevron_right: '›',
    close: '✕',
    confirmation_number: '🎟',
    edit: '✎',
    expand_less: '▴',
    expand_more: '▾',
    favorite: '♥',
    favorite_border: '♡',
    grid_view: '▦',
    group: '👤',
    groups: '👥',
    info: 'ℹ',
    keyboard_arrow_down: '▾',
    keyboard_arrow_up: '▴',
    language: '🌐',
    local_activity: '🏷',
    local_fire_department: '🔥',
    location_on: '📍',
    map: '🗺',
    near_me: '➤',
    notifications: '🔔',
    notifications_active: '🔔',
    payments: '💳',
    person: '👤',
    photo_camera: '📷',
    qr_code_2: '▣',
    restart_alt: '↺',
    restaurant: '🍽',
    restaurant_menu: '📖',
    schedule: '🕒',
    search: '⌕',
    search_off: '∅',
    star: '★',
    storefront: '🏪',
    table_restaurant: '🍽',
    trending_up: '↗',
    tune: '⚙',
    verified: '✔',
    visibility: '👁',
    visibility_off: '🙈',
    lock: '🔒',
    lock_reset: '↺',
    mail: '✉',
    key: '🔑',
    phone_iphone: '📱',
    person_remove: '👤',
    zoom_in: '⊕',
  };

  const IMAGE_FALLBACK = 'assets/images/gilded_fork.jpg';
  const AVATAR_FALLBACK = 'assets/images/avatar-placeholder.svg';

  prototype.normalizeAssetPath = function normalizeAssetPath(value) {
    if (typeof value !== 'string') {
      return value;
    }
    if (value.startsWith('/images/')) {
      return value.replace('/images/', 'assets/images/');
    }
    return value;
  };

  prototype.normalizeDataAssets = function normalizeDataAssets(target) {
    if (!target || typeof target !== 'object') {
      return target;
    }

    const visit = (value) => {
      if (Array.isArray(value)) {
        for (let index = 0; index < value.length; index += 1) {
          value[index] = visit(value[index]);
        }
        return value;
      }

      if (value && typeof value === 'object') {
        for (const [key, entry] of Object.entries(value)) {
          value[key] = visit(entry);
        }
        return value;
      }

      if (typeof value === 'string') {
        if (value.startsWith('/images/')) {
          return value.replace('/images/', 'assets/images/');
        }
        if (value.startsWith('http://') || value.startsWith('https://')) {
          return IMAGE_FALLBACK;
        }
      }

      return value;
    };

    return visit(target);
  };

  prototype.createQrDataUri = function createQrDataUri(content) {
    const size = 21;
    let hash = 0;
    const text = String(content || 'YOYAKU');
    for (let index = 0; index < text.length; index += 1) {
      hash = ((hash << 5) - hash + text.charCodeAt(index)) >>> 0;
    }

    const cellSize = 8;
    const quietZone = 4;
    let rects = '';

    const isFinderCell = (x, y, startX, startY) => {
      const relX = x - startX;
      const relY = y - startY;
      if (relX < 0 || relX > 6 || relY < 0 || relY > 6) {
        return false;
      }
      const outer = relX === 0 || relX === 6 || relY === 0 || relY === 6;
      const inner = relX >= 2 && relX <= 4 && relY >= 2 && relY <= 4;
      return outer || inner;
    };

    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const finder =
          isFinderCell(x, y, 0, 0) ||
          isFinderCell(x, y, size - 7, 0) ||
          isFinderCell(x, y, 0, size - 7);

        let filled = finder;
        if (!finder) {
          const seed = (hash + x * 92821 + y * 68917 + (x * y * 17)) >>> 0;
          filled = (seed % 7) < 3;
        }

        if (filled) {
          rects += '<rect x="' + ((x + quietZone) * cellSize) + '" y="' + ((y + quietZone) * cellSize) + '" width="' + cellSize + '" height="' + cellSize + '" rx="1" fill="#231916" />';
        }
      }
    }

    const dimension = (size + quietZone * 2) * cellSize;
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + dimension + '" height="' + dimension + '" viewBox="0 0 ' + dimension + ' ' + dimension + '"><rect width="100%" height="100%" fill="#FFF7E8"/>' + rects + '</svg>';
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  };

  prototype.createMapEmbedDataUri = function createMapEmbedDataUri(name, address) {
    const safeName = String(name || 'Yoyaku Venue');
    const safeAddress = String(address || 'Address unavailable');
    const html = '<!doctype html><html><body style="margin:0;font-family:Segoe UI,Arial,sans-serif;background:linear-gradient(135deg,#fff7e8,#f3ead9);color:#231916;display:flex;align-items:center;justify-content:center;height:100%;"><div style="text-align:center;padding:24px;max-width:280px;"><div style="font-size:40px;margin-bottom:10px;">📍</div><div style="font-weight:700;font-size:18px;margin-bottom:8px;">' + safeName.replace(/</g, '&lt;') + '</div><div style="font-size:13px;line-height:1.6;color:#58413f;">' + safeAddress.replace(/</g, '&lt;') + '</div><div style="margin-top:14px;font-size:12px;color:#840f16;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">Offline Map Preview</div></div></body></html>';
    return 'data:text/html;charset=UTF-8,' + encodeURIComponent(html);
  };

  prototype.applyOfflineMedia = function applyOfflineMedia(container) {
    const scope = container || document;

    scope.querySelectorAll('img').forEach((image) => {
      const original = image.getAttribute('src') || '';
      if (original.includes('api.qrserver.com')) {
        const match = original.match(/YOYAKU-([^&]+)/);
        image.setAttribute('src', prototype.createQrDataUri(match ? match[1] : 'YOYAKU'));
        return;
      }
      if (original.startsWith('/images/')) {
        image.setAttribute('src', original.replace('/images/', 'assets/images/'));
        return;
      }
      if (original.startsWith('http://') || original.startsWith('https://')) {
        const nextSource = /avatar|user/i.test(original) || /avatar/i.test(image.alt || '')
          ? AVATAR_FALLBACK
          : IMAGE_FALLBACK;
        image.setAttribute('src', nextSource);
      }
      image.onerror = function onImageError() {
        this.onerror = null;
        this.src = /avatar|user/i.test(this.alt || '') ? AVATAR_FALLBACK : IMAGE_FALLBACK;
      };
    });

    scope.querySelectorAll('iframe').forEach((iframe) => {
      const source = iframe.getAttribute('src') || '';
      if (source.includes('maps.google.com')) {
        iframe.removeAttribute('src');
        iframe.setAttribute('srcdoc', '<!doctype html><html><body style="margin:0;font-family:Segoe UI,Arial,sans-serif;background:#f3ead9;color:#231916;display:flex;align-items:center;justify-content:center;height:100%;"><div style="text-align:center;padding:24px;"><div style="font-size:42px;margin-bottom:12px;">📍</div><div style="font-weight:700;font-size:18px;margin-bottom:8px;">Offline Map Preview</div><div style="font-size:13px;line-height:1.5;max-width:260px;">Location preview is unavailable offline. Address details remain visible above.</div></div></body></html>');
      }
    });
  };

  prototype.replaceMaterialSymbols = function replaceMaterialSymbols(container) {
    const scope = container || document;
    scope.querySelectorAll('.material-symbols-outlined').forEach((node) => {
      if (node.dataset.iconified === 'true') {
        return;
      }
      const iconName = (node.textContent || '').trim();
      node.textContent = ICON_MAP[iconName] || '•';
      node.dataset.iconified = 'true';
      node.classList.add('prototype-symbol');
      node.setAttribute('aria-hidden', 'true');
    });
  };

  prototype.enhanceRuntime = function enhanceRuntime(container) {
    prototype.applyOfflineMedia(container);
  };
}());
