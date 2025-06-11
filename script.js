// QR Code generation
window.addEventListener('DOMContentLoaded', function() {
  // Profile picture zoom modal
  const picLink = document.getElementById('profile-pic-link');
  const modal = document.getElementById('pic-modal');
  const modalImg = document.getElementById('modal-img');
  const modalClose = document.getElementById('modal-close');
  if (picLink && modal && modalImg && modalClose) {
    picLink.addEventListener('click', function(e) {
      e.preventDefault();
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
    modalClose.addEventListener('click', function() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    });
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }

  // Generate QR code to current site or custom URL
  const qrEl = document.getElementById('qrcode');
  if (qrEl && window.QRCode) {
    let url = window.location.href;
    new QRCode(qrEl, {
      text: url,
      width: 120,
      height: 120,
      colorDark: '#222',
      colorLight: '#fff',
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  // Light/Dark mode toggle
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    // Change icon
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
  });

  // Contact form validation (only show message, do not block real submission)
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      let name = form.name.value.trim();
      let email = form.email.value.trim();
      let msg = form.message.value.trim();
      let msgEl = document.getElementById('form-msg');
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
      // Allow real submission to Formspree
      msgEl.textContent = 'Sending...';
      msgEl.style.color = 'gray';
    });
  }

  // Optional: Scroll animation on section reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.18 });
  document.querySelectorAll('main section').forEach(sec => {
    sec.classList.add('invisible');
    observer.observe(sec);
  });
});
