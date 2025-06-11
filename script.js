document.addEventListener('DOMContentLoaded', () => {
  // Profile picture zoom modal
  const picLink = document.getElementById('profile-pic-link');
  const modal = document.getElementById('pic-modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');

  if (picLink && modal && modalImg && modalClose) {
    picLink.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });

    [modalClose, modal].forEach(element => {
      element.addEventListener('click', (e) => {
        if (e.target === modal || e.target === modalClose) {
          modal.style.display = 'none';
          document.body.style.overflow = '';
        }
      });
    });
  }

  // QR Code generation
  const qrEl = document.getElementById('qrcode');
  if (qrEl && window.QRCode) {
    new QRCode(qrEl, {
      text: window.location.href,
      width: 120,
      height: 120,
      colorDark: '#222',
      colorLight: '#fff',
      correctLevel: QRCode.CorrectLevel.H,
    });
  }

  // Light/Dark mode toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      themeToggle.querySelector('i').classList.toggle('fa-moon');
      themeToggle.querySelector('i').classList.toggle('fa-sun');
    });
  }

  // Contact form validation
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const msg = form.message.value.trim();
      const msgEl = document.getElementById('form-msg');

      if (!name || !email || !msg) {
        e.preventDefault();
        msgEl.textContent = 'Please fill out all fields.';
        msgEl.style.color = 'crimson';
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        e.preventDefault();
        msgEl.textContent = 'Please enter a valid email address.';
        msgEl.style.color = 'crimson';
        return;
      }

      // Allow form submission
      msgEl.textContent = 'Sending...';
      msgEl.style.color = 'gray';
    });
  }

  // Section fade-in animation on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('main section').forEach(sec => {
    sec.classList.add('invisible');
    observer.observe(sec);
  });
});
