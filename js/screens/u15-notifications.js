/* ============================================================
   EzBookNow Screen U-15 — Notifications Screen
   ============================================================ */

const ScreenU15 = (() => {
  let activeTab = 'unread'; // 'unread' or 'all'

  function getNotificationTone(type) {
    switch (type) {
      case 'reservation_confirmed':
        return { bg: '#dcfce7', text: '#166534', dot: '#22c55e' };
      case 'reminder':
        return { bg: '#fef9c3', text: '#854d0e', dot: '#eab308' };
      case 'waitlist_available':
        return { bg: '#dbeafe', text: '#1e40af', dot: '#3b82f6' };
      case 'review_reply':
        return { bg: '#f5e7ff', text: '#7c3aed', dot: '#8b5cf6' };
      default:
        return { bg: '#ede9fe', text: '#5b21b6', dot: '#8b5cf6' };
    }
  }

  function render() {
    const lang = I18n.getLang();
    const list = MockData.notifications;

    const unreadList = list.filter(n => n.readAt === null);
    const displayedList = activeTab === 'unread' ? unreadList : list;

    const toolbar = `
      <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div class="tabs mb-0" style="border-bottom:none;">
          <button class="tab ${activeTab === 'unread' ? 'active' : ''}" onclick="ScreenU15.setTab('unread')">${I18n.t('unread')} (${unreadList.length})</button>
          <button class="tab ${activeTab === 'all' ? 'active' : ''}" onclick="ScreenU15.setTab('all')">${I18n.t('all_notifications')}</button>
        </div>
        ${unreadList.length > 0 ? `
          <button class="btn btn-secondary btn-sm" onclick="ScreenU15.markAllRead()">${I18n.t('mark_all_read')}</button>
        ` : ''}
      </div>
    `;

    let listHtml = '';
    if (displayedList.length === 0) {
      listHtml = Components.emptyState(
        'bell',
        I18n.t('no_notifications'),
        I18n.t('all_caught_up')
      );
    } else {
      listHtml = `
        <div class="card p-0 flex flex-col overflow-hidden" style="border-radius:var(--radius-xl);">
          ${displayedList.map(n => {
            const title = lang === 'mm' ? (n.title_mm || n.title) : n.title;
            const body = lang === 'mm' ? (n.body_mm || n.body) : n.body;
            const isUnread = n.readAt === null;
            const tone = getNotificationTone(n.type);
            
            let iconCode = '🔔';
            if (n.type === 'reservation_confirmed') iconCode = '✓';
            if (n.type === 'reminder') iconCode = '⏰';
            if (n.type === 'waitlist_available') iconCode = '⏳';
            if (n.type === 'review_reply') iconCode = '💬';

            return `
              <div class="notification-item ${isUnread ? 'unread' : ''}" onclick="ScreenU15.handleNotifClick('${n.id}', '${n.link}')">
                <div class="notification-item__icon" style="font-weight:600; background:${tone.bg}; color:${tone.text};">
                  ${iconCode}
                </div>
                <div class="notification-item__content">
                  <div class="notification-item__title">${title}</div>
                  <div class="notification-item__text">${body}</div>
                </div>
                <div class="flex flex-col items-end gap-1">
                  <div class="notification-item__time">${MockData.timeAgo(n.createdAt)}</div>
                  ${isUnread ? `<span class="badge-dot" style="background:${tone.dot}; width:8px; height:8px;"></span>` : ''}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    const content = `
      <div class="flex items-center gap-2 mb-4">
        <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/user/mypage')">← ${I18n.t('back')}</button>
      </div>

      ${Components.pageHeader(I18n.t('notification_center'), '')}

      <div style="max-width:720px; margin:0 auto;">
        ${toolbar}
        ${listHtml}
      </div>
    `;

    App.renderUserPage(content);
  }

  function setTab(tab) {
    activeTab = tab;
    render();
  }

  function markAllRead() {
    MockData.notifications.forEach(n => {
      n.readAt = new Date().toISOString();
    });
    showToast('success', 'Notifications', 'All notifications marked as read.');
    render();
  }

  function handleNotifClick(id, link) {
    const notif = MockData.notifications.find(n => n.id === id);
    if (notif) {
      notif.readAt = new Date().toISOString();
    }
    if (link) {
      Router.navigate(link.replace('#', ''));
    } else {
      render();
    }
  }

  return { render, setTab, markAllRead, handleNotifClick };
})();
