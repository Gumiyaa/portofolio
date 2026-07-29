/* ============================================
   ANIMATION.JS
   Scroll Reveal • Loading Screen • Skill Bars • Floating Shapes
   ============================================ */

(function () {
  'use strict';

  // ============================================
  // LOADING SCREEN
  // ============================================
  const loadingScreen = document.getElementById('loadingScreen');
  const loadingBar = document.getElementById('loadingBar');

  if (loadingScreen && loadingBar) {
    let progress = 0;
    const loadingInterval = setInterval(() => {
      progress += Math.random() * 30 + 5;
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);
        loadingBar.style.width = progress + '%';

        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          document.body.style.overflow = '';
          // Trigger initial animations after load
          initScrollReveal();
          animateSkillBars();
        }, 400);
      } else {
        loadingBar.style.width = progress + '%';
      }
    }, 120);
  } else {
    // If loading screen elements don't exist, init directly
    document.addEventListener('DOMContentLoaded', () => {
      initScrollReveal();
      animateSkillBars();
    });
  }

  // ============================================
  // SCROLL REVEAL (Intersection Observer)
  // ============================================
  let scrollObserver = null;

  function initScrollReveal() {
    const fadeElements = document.querySelectorAll('.fade-up');

    if (fadeElements.length === 0) return;

    scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Animate skill tags when the skill section becomes visible
            if (entry.target.closest('#skills') || entry.target.closest('.skill-category')) {
              const tags = entry.target.querySelectorAll('.skill-tag');
              tags.forEach((tag, i) => {
                setTimeout(() => {
                  tag.style.opacity = '1';
                  tag.style.transform = 'translateY(0)';
                }, i * 80);
              });
            }

            // Optionally unobserve after reveal
            // scrollObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    fadeElements.forEach((el) => {
      scrollObserver.observe(el);
    });
  }

  // ============================================
  // COUNTER ANIMATION FOR FACTS
  // ============================================
  function animateCounters() {
    const factNumbers = document.querySelectorAll('.fact-number');

    factNumbers.forEach((el) => {
      const text = el.textContent;
      const num = parseFloat(text);
      const suffix = text.includes('+') ? '+' : '';
      const isDecimal = text.includes('.');

      if (isNaN(num)) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              observer.unobserve(entry.target);
              animateCounter(entry.target, num, isDecimal, suffix);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
    });
  }

  function animateCounter(element, target, isDecimal, suffix) {
    const duration = 1500;
    const startTime = performance.now();
    const startValue = 0;

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (target - startValue) * eased;

      if (isDecimal) {
        element.textContent = currentValue.toFixed(2) + suffix;
      } else {
        element.textContent = Math.floor(currentValue) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + suffix;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // ============================================
  // PARALLAX FLOATING SHAPES
  // ============================================
  function initFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    if (shapes.length === 0) return;

    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      shapes.forEach((shape, index) => {
        const speed = 10 + index * 5;
        const moveX = x * speed;
        const moveY = y * speed;
        shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });
  }

  // ============================================
  // INIT
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    // Only run these if loading screen didn't handle it
    if (!loadingScreen || !loadingBar) {
      initScrollReveal();
      animateSkillBars();
    }
    animateCounters();
    initFloatingShapes();
  });

  // Initialize skill tags with hidden state
  const skillTags = document.querySelectorAll('.skill-tag');
  skillTags.forEach(tag => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(10px)';
    tag.style.transition = 'all 0.5s ease';
  });
})();