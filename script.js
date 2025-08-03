// Toggle navigation menu visibility (for mobile/hamburger menu)
function toggleMenu() {
    const nav = document.querySelector('nav[role="navigation"] ul');
    nav.classList.toggle('visible');
  }
  
  // Hamburger icon event
  document.addEventListener('DOMContentLoaded', () => {
    // Create hamburger icon
    const nav = document.querySelector('nav[role="navigation"]');
    const hamburger = document.createElement('button');
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.setAttribute('id', 'hamburger');
    hamburger.innerHTML = '&#9776;';
    hamburger.style.fontSize = '2rem';
    hamburger.style.background = 'none';
    hamburger.style.border = 'none';
    hamburger.style.color = '#fff';
    hamburger.style.cursor = 'pointer';
    hamburger.style.display = 'none';
    hamburger.style.position = 'absolute';
    hamburger.style.top = '1rem';
    hamburger.style.right = '1rem';
    nav.prepend(hamburger);
  
    // Show hamburger on small screens
    function handleResize() {
      if (window.innerWidth <= 600) {
        hamburger.style.display = 'block';
        nav.querySelector('ul').classList.remove('visible');
      } else {
        hamburger.style.display = 'none';
        nav.querySelector('ul').classList.remove('visible');
      }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
  
    hamburger.addEventListener('click', toggleMenu);
  });
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav[role="navigation"] a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        // Close menu on mobile after click
        const navList = document.querySelector('nav[role="navigation"] ul');
        if (window.innerWidth <= 600) navList.classList.remove('visible');
      }
    });
  });
  
  // Filter feature for Projects section
  function filterProjects(category) {
    document.querySelectorAll('#projects article').forEach(article => {
      if (category === 'all' || article.dataset.category === category) {
        article.style.display = '';
      } else {
        article.style.display = 'none';
      }
    });
  }
  
  // Example: Add filter buttons (call this after DOMContentLoaded)
  function setupProjectFilters() {
    const categories = ['all', 'web', 'api'];
    const filterBar = document.createElement('div');
    filterBar.setAttribute('id', 'project-filters');
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      btn.addEventListener('click', () => filterProjects(cat));
      filterBar.appendChild(btn);
    });
    document.getElementById('projects').prepend(filterBar);
  }
  document.addEventListener('DOMContentLoaded', setupProjectFilters);
  
  // Lightbox effect for project images
  function createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.position = 'fixed';
    lightbox.style.top = 0;
    lightbox.style.left = 0;
    lightbox.style.width = '100vw';
    lightbox.style.height = '100vh';
    lightbox.style.background = 'rgba(0,0,0,0.8)';
    lightbox.style.display = 'none';
    lightbox.style.alignItems = 'center';
    lightbox.style.justifyContent = 'center';
    lightbox.style.zIndex = 1000;
    lightbox.innerHTML = '<img src="" alt="Project image" style="max-width:90vw;max-height:80vh;border-radius:8px;"><button id="close-lightbox" aria-label="Close lightbox" style="position:absolute;top:2rem;right:2rem;font-size:2rem;background:none;border:none;color:#fff;cursor:pointer;">&times;</button>';
    document.body.appendChild(lightbox);
  
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.id === 'close-lightbox') {
        lightbox.style.display = 'none';
      }
    });
  
    document.querySelectorAll('#projects img').forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => {
        lightbox.querySelector('img').src = img.src;
        lightbox.querySelector('img').alt = img.alt;
        lightbox.style.display = 'flex';
      });
    });
  }
  document.addEventListener('DOMContentLoaded', createLightbox);
  
  // Contact form validation with real-time feedback
  const contactForm = document.querySelector('#contact form');
  if (contactForm) {
    const nameInput = contactForm.querySelector('#name');
    const emailInput = contactForm.querySelector('#email');
    const messageInput = contactForm.querySelector('#message');
  
    function showError(input, message) {
      let error = input.nextElementSibling;
      if (!error || !error.classList.contains('error-message')) {
        error = document.createElement('span');
        error.className = 'error-message';
        error.style.color = '#d32f2f';
        error.style.fontSize = '0.95rem';
        input.after(error);
      }
      error.textContent = message;
    }
  
    function clearError(input) {
      const error = input.nextElementSibling;
      if (error && error.classList.contains('error-message')) {
        error.textContent = '';
      }
    }
  
    function validateName() {
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Name is required.');
        return false;
      }
      clearError(nameInput);
      return true;
    }
  
    function validateEmail() {
      const email = emailInput.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        showError(emailInput, 'Email is required.');
        return false;
      }
      if (!emailPattern.test(email)) {
        showError(emailInput, 'Please enter a valid email address.');
        return false;
      }
      clearError(emailInput);
      return true;
    }
  
    function validateMessage() {
      if (!messageInput.value.trim()) {
        showError(messageInput, 'Message is required.');
        return false;
      }
      clearError(messageInput);
      return true;
    }
  
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    messageInput.addEventListener('input', validateMessage);
  
    contactForm.addEventListener('submit', function (e) {
      let valid = true;
      if (!validateName()) valid = false;
      if (!validateEmail()) valid = false;
      if (!validateMessage()) valid = false;
      if (!valid) e.preventDefault();
    });
  }
  
  