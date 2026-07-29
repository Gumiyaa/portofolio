/* ============================================
   MAIN.JS
   Navbar • Hamburger • Typing Effect • Mouse Glow
   Smooth Scroll • Contact Form • Active Nav Link
   ============================================ */

(function () {
  'use strict';

  // ============================================
  // DOM REFERENCES
  // ============================================
  const header = document.getElementById('header');
  const navMenu = document.getElementById('navMenu');
  const hamburger = document.getElementById('hamburger');
  const navOverlay = document.getElementById('navOverlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const mouseGlow = document.getElementById('mouseGlow');
  const scrollTopBtn = document.getElementById('scrollTop');
  const contactForm = document.getElementById('contactForm');
  const yearSpan = document.getElementById('year');

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  function handleNavScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });

  // ============================================
  // HAMBURGER MENU
  // ============================================
  function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  }

  function toggleOverlay() {
    if (navOverlay) {
      navOverlay.classList.toggle('active', navMenu.classList.contains('active'));
    }
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    if (navOverlay) navOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      toggleMenu();
      toggleOverlay();
    });
  }

  // Close menu when clicking overlay
  if (navOverlay) {
    navOverlay.addEventListener('click', closeMenu);
  }

  // Close menu when clicking a nav link
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      closeMenu();
    }
  });

  // ============================================
  // ACTIVE NAV LINK ON SCROLL
  // ============================================
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // ============================================
  // TYPING EFFECT
  // ============================================
  function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const roles = [
      'Freshgraduate.',
      'Web Development Enthusiast.',
      'Game Dev Enthusiast.',
      'Problem Solver.',
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function type() {
      const currentRole = roles[roleIndex];

      if (isPaused) {
        isPaused = false;
        setTimeout(type, 1500);
        return;
      }

      if (isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(type, 300);
          return;
        }

        setTimeout(type, 40);
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
          isPaused = true;
          setTimeout(type, 2000);
          isDeleting = true;
          return;
        }

        setTimeout(type, 80);
      }
    }

    // Start typing after a delay
    setTimeout(type, 1500);
  }

  initTypingEffect();

  // ============================================
  // MOUSE GLOW EFFECT
  // ============================================
  function initMouseGlow() {
    if (!mouseGlow) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateGlow() {
      currentX += (mouseX - currentX) * 0.05;
      currentY += (mouseY - currentY) * 0.05;

      mouseGlow.style.left = currentX + 'px';
      mouseGlow.style.top = currentY + 'px';

      requestAnimationFrame(animateGlow);
    }

    animateGlow();

    // Hide glow on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      mouseGlow.style.display = 'none';
    }
  }

  initMouseGlow();

  // ============================================
  // SCROLL TO TOP
  // ============================================
  function handleScrollTopVisibility() {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  if (scrollTopBtn) {
    window.addEventListener('scroll', handleScrollTopVisibility, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // ============================================
  // CONTACT FORM HANDLING
  // ============================================
  if (contactForm) {
    const formName = document.getElementById('formName');
    const formEmail = document.getElementById('formEmail');
    const formMessage = document.getElementById('formMessage');

    // Validation helpers
    function showError(input) {
      input.classList.add('error');
    }

    function clearError(input) {
      input.classList.remove('error');
    }

    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    // Real-time validation
    formName.addEventListener('blur', () => {
      if (formName.value.trim().length < 2) {
        showError(formName);
      } else {
        clearError(formName);
      }
    });

    formEmail.addEventListener('blur', () => {
      if (!validateEmail(formEmail.value.trim())) {
        showError(formEmail);
      } else {
        clearError(formEmail);
      }
    });

    formMessage.addEventListener('blur', () => {
      if (formMessage.value.trim().length < 5) {
        showError(formMessage);
      } else {
        clearError(formMessage);
      }
    });

    // Clear errors on focus
    [formName, formEmail, formMessage].forEach((input) => {
      input.addEventListener('focus', () => clearError(input));
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate name
      if (formName.value.trim().length < 2) {
        showError(formName);
        isValid = false;
      }

      // Validate email
      if (!validateEmail(formEmail.value.trim())) {
        showError(formEmail);
        isValid = false;
      }

      // Validate message
      if (formMessage.value.trim().length < 5) {
        showError(formMessage);
        isValid = false;
      }

      if (!isValid) {
        // Focus the first error
        const firstError = contactForm.querySelector('.form-input.error');
        if (firstError) firstError.focus();
        return;
      }

      // Simulate sending
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spinner" aria-hidden="true" style="animation: spin 1s linear infinite;"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
        Sending...
      `;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
          Message Sent!
        `;
        submitBtn.style.background = '#22C55E';

        // Reset form
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
          // Clear all errors
          document.querySelectorAll('.form-input.error').forEach((el) => {
            el.classList.remove('error');
          });
        }, 3000);
      }, 1500);
    });
  }

  // ============================================
  // DYNAMIC YEAR
  // ============================================
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ============================================
  // KEYBOARD NAVIGATION
  // ============================================
  document.addEventListener('keydown', (e) => {
    // Scroll to top on Home key
    if (e.key === 'Home' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // ============================================
  // PERFORMANCE: Add will-change to animated elements
  // ============================================
  function optimizeAnimations() {
    const animatedElements = document.querySelectorAll(
      '.fade-up, .card, .btn, .social-link, .shape'
    );
    animatedElements.forEach((el) => {
      el.style.willChange = 'transform, opacity';
    });
  }

  // Only run if not on low-power devices
  if (!navigator.hardwareConcurrency || navigator.hardwareConcurrency > 4) {
    optimizeAnimations();
  }

  console.log(
    '%c🚀 Gumilang Atmaja Portfolio',
    'font-size: 20px; font-weight: bold; color: #3B82F6;'
  );
  console.log(
    '%cBuilt with ❤️ using vanilla HTML, CSS & JavaScript',
    'font-size: 14px; color: #A1A1AA;'
  );
})();