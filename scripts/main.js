/* ============================================================================
 * Codapus Studio — landing page interactions
 * ----------------------------------------------------------------------------
 * Plain, uncompressed vanilla JavaScript. Only handles the few interactions
 * that HTML and CSS cannot do natively:
 *
 *   1. Toggle a "scrolled" class on the site header once the user scrolls past
 *      a small threshold (so the header gets a backdrop / border).
 *   2. Toggle the mobile navigation panel open and close.
 *   3. Reveal sections as they enter the viewport (IntersectionObserver) so
 *      they fade up gracefully.
 *   4. Auto-close the mobile menu when a nav link is followed.
 *
 * Smooth scrolling between sections is handled by `scroll-behavior: smooth`
 * in the stylesheet — no JavaScript is needed for it.
 * ========================================================================= */

(function () {
  'use strict';

  // ---- 1. Sticky header: add .is-scrolled past a threshold ----------------
  var header = document.getElementById('siteHeader');
  var SCROLL_THRESHOLD = 20;

  function updateHeaderState() {
    if (!header) return;
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', updateHeaderState, { passive: true });
  updateHeaderState();


  // ---- 2. Mobile navigation toggle ----------------------------------------
  var navToggle = document.getElementById('navToggle');
  var primaryNav = document.querySelector('.primary-nav');

  function setNavOpen(isOpen) {
    if (!primaryNav || !navToggle) return;
    primaryNav.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      var isOpen = primaryNav.classList.contains('is-open');
      setNavOpen(!isOpen);
    });
  }

  // Close the mobile menu when a link inside it is clicked
  var navLinks = document.querySelectorAll('.nav-list a');
  for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function () {
      setNavOpen(false);
    });
  }


  // ---- 3. Reveal-on-scroll using IntersectionObserver ---------------------
  var revealTargets = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealTargets.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    });

    revealTargets.forEach(function (target) {
      observer.observe(target);
    });
  } else {
    // No IntersectionObserver support: just reveal everything immediately.
    revealTargets.forEach(function (target) {
      target.classList.add('is-visible');
    });
  }
})();
