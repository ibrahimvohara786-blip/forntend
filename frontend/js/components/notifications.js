window.showToast = (message, type = 'success') => {
  let region = document.querySelector('#toast-region');
  if (!region) { region = document.createElement('div'); region.id = 'toast-region'; region.className = 'toast-region'; region.setAttribute('aria-live', 'polite'); document.body.append(region); }
  const duplicate = [...region.children].find((toast) => toast.textContent === message && toast.classList.contains(type));
  if (duplicate) {
    window.clearTimeout(duplicate.dismissTimer);
    duplicate.dismissTimer = window.setTimeout(() => duplicate.remove(), 3500);
    return duplicate;
  }
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.setAttribute('role', 'status');
  toast.textContent = message;
  while (region.children.length >= 3) region.firstElementChild.remove();
  region.append(toast);
  toast.dismissTimer = window.setTimeout(() => toast.remove(), 3500);
  return toast;
};
document.addEventListener('click', (event) => {
  if (event.target.closest('[data-logout]')) { event.preventDefault(); localStorage.removeItem('beAccurateAuthenticated'); window.location.href = 'login.html'; }
});
