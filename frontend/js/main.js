const isLoginPage = /\/pages\/login\.html$/.test(window.location.pathname);
if (!isLoginPage && localStorage.getItem('beAccurateAuthenticated') !== 'true') {
  window.location.replace('login.html');
} else if (!isLoginPage) {
  document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page || 'dashboard';
    const root = document.querySelector('#app-root');
    if (root) root.innerHTML = `<aside id="sidebar-slot"></aside><div class="sidebar-scrim" id="sidebar-scrim"></div><div class="workspace"><div id="navbar-slot"></div><main class="page-content" id="page-content"></main></div>`;
    window.dispatchEvent(new CustomEvent('beaccurate:ready', { detail: { page } }));
  });
}
