document.addEventListener('click', (event) => {
  const opener = event.target.closest('[data-modal-open]');
  if (opener) { const modal = document.getElementById(opener.dataset.modalOpen); if (modal) { modal.hidden = false; modal.querySelector('input,button,select,textarea')?.focus(); } }
  if (event.target.matches('[data-modal-close], .modal-backdrop')) { const modal = event.target.closest('.modal-backdrop') || event.target; modal.hidden = true; }
});
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') document.querySelectorAll('.modal-backdrop:not([hidden])').forEach((modal) => { modal.hidden = true; }); });
