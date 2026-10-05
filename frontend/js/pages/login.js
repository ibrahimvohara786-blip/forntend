const form = document.querySelector('#login-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');

const logoImage = new Image();
logoImage.alt = 'Be Accurate camera logo';
logoImage.width = 64;
logoImage.height = 64;
logoImage.addEventListener('error', () => logoImage.parentElement.remove(), { once: true });
logoImage.src = '../assets/images/logo-camera.svg';
document.querySelector('.login-brand-logo').append(logoImage);

document.querySelector('#password-toggle').addEventListener('click', () => {
  const isHidden = passwordInput.type === 'password';
  passwordInput.type = isHidden ? 'text' : 'password';
  document.querySelector('#password-toggle').setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const emailError = document.querySelector('#email-error');
  const passwordError = document.querySelector('#password-error');
  emailError.textContent = '';
  passwordError.textContent = '';
  let valid = true;
  if (!email) { emailError.textContent = 'Email is required.'; valid = false; }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { emailError.textContent = 'Enter a valid email address.'; valid = false; }
  if (!password) { passwordError.textContent = 'Password is required.'; valid = false; }
  if (!valid) return;
  if (email.toLowerCase() !== 'admin@beaccurate.ai' || password !== 'admin123') {
    window.showToast('Those demo credentials did not match. Please try again.', 'error');
    return;
  }
  localStorage.setItem('beAccurateAuthenticated', 'true');
  window.location.href = 'dashboard.html';
});
