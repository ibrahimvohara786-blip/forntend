document.addEventListener('click', (event) => {
  const sidebar = document.querySelector('#sidebar');
  const scrim = document.querySelector('#sidebar-scrim');
  if (!sidebar || !scrim) return;
  if (event.target.closest('#sidebar-toggle')) { sidebar.classList.add('open'); scrim.classList.add('visible'); }
  else if (event.target === scrim || event.target.closest('.sidebar-link')) { sidebar.classList.remove('open'); scrim.classList.remove('visible'); }
});
