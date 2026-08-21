(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};


  function renderToast(state) {
    if (!state.toastMessage) return '';

    return `
      <div id="toast-container" class="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#231916] text-white px-6 py-3 rounded-full shadow-2xl border border-[#D08E1C]/40 flex items-center gap-3 animate-bounce">
        <span class="material-symbols-outlined text-[#D08E1C]">info</span>
        <span class="font-label text-xs font-semibold">${state.toastMessage}</span>
      </div>
    `;
  }


  window.YoyakuComponents.renderToast = renderToast;
})();
