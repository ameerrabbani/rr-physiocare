
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const navCta = document.querySelector('.nav-cta');

  function positionCta() {
    if (!navLinks || !navCta) return;
    if (!navLinks.classList.contains('active')) return;
    setTimeout(() => {
      const navLinksHeight = navLinks.offsetHeight;
      navCta.style.top = `calc(100% + ${navLinksHeight}px)`;
    }, 10);
  }

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      if (navCta) navCta.classList.toggle('active', isOpen);
      mobileMenuBtn.textContent = isOpen ? '✕' : '☰';
      positionCta();
    });
  }

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('active');
      hamburger.classList.toggle('open');
      if (mobileMenuBtn) mobileMenuBtn.textContent = isOpen ? '✕' : '☰';
      if (navCta) navCta.classList.toggle('active', isOpen);
      positionCta();
    });
  }

  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (navCta) navCta.classList.remove('active');
        if (mobileMenuBtn) mobileMenuBtn.textContent = '☰';
        if (hamburger) hamburger.classList.remove('open');
      });
    });
  }

  // Button hover effect
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => { btn.style.letterSpacing = '0.5px'; });
    btn.addEventListener('mouseleave', () => { btn.style.letterSpacing = '0'; });
  });

  // Counter animation for hero stats
  function animateCounter(element, target, duration = 2000) {
    const suffix = element.dataset.suffix || '';
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(target * progress);
      
      element.textContent = current + suffix;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  // Trigger counter animation on page load
  setTimeout(() => {
    document.querySelectorAll('.stat-value[data-target]').forEach(stat => {
      const target = parseInt(stat.dataset.target);
      if (!isNaN(target)) {
        animateCounter(stat, target, 2500);
      }
    });
  }, 300);
});
