(() => {
  window.YoyakuComponents = window.YoyakuComponents || {};


  function renderToast(state) {
    if (!state.toastMessage) return '';

    return `
      <div id="toast-container" class="fixed bottom-20 md:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#241A18]/95 backdrop-blur-md text-[#FFFDFC] px-5 py-2.5 rounded-full shadow-2xl border border-[#4a3631] flex items-center gap-2.5 animate-fadeIn max-w-[90vw] pointer-events-none">
        <span class="material-symbols-outlined text-[#C69A2B] text-lg shrink-0">check_circle</span>
        <span class="font-label text-xs font-bold tracking-tight truncate">${state.toastMessage}</span>
      </div>
    `;
  }


  window.YoyakuComponents.renderToast = renderToast;
})();
