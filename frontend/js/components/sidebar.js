const links = [
  ['dashboard', 'Dashboard', 'M3 3h8v8H3zM13 3h8v5h-8zM13 10h8v11h-8zM3 13h8v8H3z'],
  ['students', 'Students', 'M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6M23 11h-6'],
  ['attendance', 'Attendance', 'M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2ZM8 14h3v3H8z'],
  ['ai-attendance', 'AI Attendance', 'M12 3a9 9 0 1 0 9 9M12 7a5 5 0 1 0 5 5M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z'],
  ['attendance-history', 'Attendance History', 'M3 12a9 9 0 1 0 3-6.7L3 8m0-5v5h5m4-1v5l3 2'],
  ['reports', 'Reports', 'M4 19V5m0 14h17M8 16v-4m5 4V7m5 9V9'],
  ['profile', 'Profile', 'M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z']
];
const dashboardLinks = [
  ['dashboard', 'Dashboard', 'M3 3h8v8H3zM13 3h8v5h-8zM13 10h8v11h-8zM3 13h8v8H3z'],
  ['attendance', 'Attendance', 'M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z'],
  ['reports', 'Reports', 'M4 19V5m0 14h17M8 16v-4m5 4V7m5 9V9'],
  ['ai-attendance', 'AI Analytics', 'M12 3a9 9 0 1 0 9 9M12 7a5 5 0 1 0 5 5M12 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z'],
  ['students', 'Employees', 'M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6M23 11h-6'],
  ['profile', 'Settings', 'M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 2.9-.2-.1a1.7 1.7 0 0 0-1.8.1l-.2.1h-3.4l-.1-.2a1.7 1.7 0 0 0-1.6-1l-.2.1-.2.1-1.7-2.9.1-.2a1.7 1.7 0 0 0-.3-1.8l-.1-.2v-3.4l.2-.1a1.7 1.7 0 0 0 1-1.6l-.1-.2-.1-.2 2.9-1.7.2.1a1.7 1.7 0 0 0 1.8-.3l.2-.1h3.4l.1.2a1.7 1.7 0 0 0 1.6 1l.2-.1.2-.1 1.7 2.9-.1.2a1.7 1.7 0 0 0 .3 1.8l.1.2v3.4Z'],
  ['help', 'Help', 'M9.1 9a3 3 0 1 1 5.8 1c-.7 1.1-2.9 1.5-2.9 3.5M12 17h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z', '#help']
];
function icon(path) { return `<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${path}"/></svg>`; }
window.addEventListener('beaccurate:ready', ({ detail }) => {
  const slot = document.querySelector('#sidebar-slot');
  if (!slot) return;
  const navLinks = detail.page === 'dashboard' ? dashboardLinks : links;
  const logoPath = detail.page === 'dashboard' ? '../assets/images/logo-camera.svg' : '../assets/images/logo.png';
  slot.innerHTML = `<aside class="sidebar" id="sidebar"><a class="brand sidebar-brand" href="dashboard.html"><span class="brand-logo"><img src="${logoPath}" alt="Be Accurate camera logo" width="40" height="40"></span><span class="brand-wordmark"><span class="brand-be">Be</span><span class="brand-accurate">Accurate</span></span></a><nav class="sidebar-nav" aria-label="Main navigation">${navLinks.map(([id,label,path,href]) => `<a class="sidebar-link ${detail.page === id ? 'active' : ''}" ${detail.page === id ? 'aria-current="page"' : ''} href="${href || `${id}.html`}">${icon(path)}<span>${label}</span></a>`).join('')}</nav><div class="sidebar-bottom"><a class="sidebar-link" href="#logout" data-logout>${icon('M10 17l5-5-5-5m5 5H3m9-9h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7')}<span>Logout</span></a></div></aside>`;
  slot.querySelector('.sidebar-brand img').addEventListener('error', (event) => event.currentTarget.parentElement.remove(), { once: true });
});

window.addEventListener('beaccurate:ready', ({ detail }) => {
  if (detail.page !== 'student-details') return;
  const studentsLink = document.querySelector('.sidebar-link[href="students.html"]');
  studentsLink?.classList.add('active');
  studentsLink?.setAttribute('aria-current', 'page');
});
