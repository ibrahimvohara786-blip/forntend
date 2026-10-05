window.addEventListener('beaccurate:ready', ({ detail }) => {
  const isDashboard = detail.page === 'dashboard';
  const slot = document.querySelector('#navbar-slot');
  if (!slot) return;
  slot.innerHTML = `<header class="topbar${isDashboard ? ' dashboard-topbar' : ''}">
    <button class="icon-button mobile-menu" id="sidebar-toggle" type="button" aria-label="Open navigation"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>
    <label class="topbar-search"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></svg><input type="search" aria-label="Search" placeholder="Search students, classes..."></label>
    <span class="topbar-spacer"></span>
    <div class="menu-wrap"><button class="icon-button" type="button" data-dropdown="notifications-menu" aria-label="Notifications"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-8 12h4"/></svg></button><div class="dropdown-menu" id="notifications-menu" hidden><div class="notification-item"><strong>Attendance target reached</strong><br><span class="muted">Class 10-A is at 96% today.</span></div><div class="notification-item"><strong>Review required</strong><br><span class="muted">2 student records need attention.</span></div><div class="notification-item"><strong>Report ready</strong><br><span class="muted">September summary is available.</span></div></div></div>
    <div class="menu-wrap"><button class="button button-quiet user-label" type="button" data-dropdown="user-menu"><span class="avatar">${isDashboard ? 'JP' : 'AD'}</span> ${isDashboard ? 'J. Patel' : 'Alex Davis'} <span aria-hidden="true">⌄</span></button><div class="dropdown-menu" id="user-menu" hidden><a href="profile.html">Profile</a><button type="button" data-logout>Logout</button></div></div>
  </header>`;
  const brand = document.createElement('a');
  brand.className = 'brand topbar-brand';
  brand.href = 'dashboard.html';
  const logoSize = 40;
  const logoPath = isDashboard ? '../assets/images/logo-camera.svg' : '../assets/images/logo.png';
  brand.innerHTML = `<span class="brand-logo"><img src="${logoPath}" alt="Be Accurate camera logo" width="${logoSize}" height="${logoSize}"></span><span class="brand-wordmark"><span class="brand-be">Be</span><span class="brand-accurate">Accurate</span></span>`;
  brand.querySelector('img').addEventListener('error', (event) => event.currentTarget.parentElement.remove(), { once: true });
  slot.querySelector('.topbar').prepend(brand);
});
