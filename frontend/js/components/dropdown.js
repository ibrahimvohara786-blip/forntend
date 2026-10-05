document.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-dropdown]');
  document.querySelectorAll('.dropdown-menu').forEach((menu) => {
    const shouldOpen = trigger && trigger.dataset.dropdown === menu.id;
    menu.hidden = shouldOpen ? !menu.hidden : true;
  });
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') document.querySelectorAll('.dropdown-menu').forEach((menu) => { menu.hidden = true; });
});
