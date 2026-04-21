(function () {
  'use strict';

  /* ── 1. THEME TOGGLE ──────────────────────────────────────── */
  var html = document.documentElement;
  var toggleBtn = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('rc-theme', theme);
  }

  (function initTheme() {
    var saved = localStorage.getItem('rc-theme');
    if (saved) { applyTheme(saved); return; }
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  })();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      var current = html.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ── 2. SCROLL REVEAL ─────────────────────────────────────── */
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced) {
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(function (el) { observer.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('visible'); });
    }
  }

  /* ── 3. COUNTER ANIMATION ─────────────────────────────────── */
  var counters = document.querySelectorAll('[data-count]');
  if (!prefersReduced && counters.length && 'IntersectionObserver' in window) {
    var counterObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.getAttribute('data-count'));
        var isDecimal = target % 1 !== 0;
        var start = 0;
        var duration = 1400;
        var startTime = null;

        function step(ts) {
          if (!startTime) startTime = ts;
          var progress = Math.min((ts - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var current = start + (target - start) * eased;
          el.textContent = isDecimal
            ? current.toFixed(1)
            : Math.round(current).toLocaleString('ro-RO');
          if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
        counterObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterObs.observe(el); });
  }

  /* ── 4. WAITLIST FORM VALIDATION ─────────────────────────── */
  var form = document.getElementById('waitlist-form');
  var formStatus = form && form.querySelector('.form__status');

  function validateEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var numeInput    = form.querySelector('[name="nume"]');
      var emailInput   = form.querySelector('[name="email"]');
      var selectInput  = form.querySelector('[name="dulapuri"]');
      var valid = true;

      [numeInput, emailInput, selectInput].forEach(function (el) {
        el.classList.remove('error');
      });
      if (formStatus) { formStatus.className = 'form__status'; formStatus.textContent = ''; }

      if (!numeInput.value.trim() || numeInput.value.trim().length < 2) {
        numeInput.classList.add('error');
        valid = false;
      }
      if (!validateEmail(emailInput.value)) {
        emailInput.classList.add('error');
        valid = false;
      }
      if (!selectInput.value) {
        selectInput.classList.add('error');
        valid = false;
      }

      if (!valid) {
        if (formStatus) {
          formStatus.className = 'form__status error-msg';
          formStatus.textContent = 'Completati corect toate campurile pentru a continua.';
        }
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = 'Se proceseaza...';

      setTimeout(function () {
        form.reset();
        btn.disabled = false;
        btn.textContent = 'Deschid dosar de reconversie';
        if (formStatus) {
          formStatus.className = 'form__status success';
          formStatus.textContent =
            'Dosarul a fost inregistrat. Va contactam in 48 de ore. Multumim.';
        }
      }, 900);
    });
  }

  /* ── 5. EASTER EGG — logo 5 clickuri ─────────────────────── */
  var easterEl    = document.getElementById('easter-egg');
  var easterClose = document.getElementById('easter-close');
  var secretBtn   = document.getElementById('secret-btn');
  var logoEl      = document.getElementById('logo');
  var clickCount  = 0;
  var clickTimer  = null;

  function openEaster() {
    if (!easterEl) return;
    easterEl.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    var closeBtn = easterEl.querySelector('button');
    if (closeBtn) closeBtn.focus();
  }

  function closeEaster() {
    if (!easterEl) return;
    easterEl.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  if (logoEl) {
    logoEl.addEventListener('click', function (e) {
      e.preventDefault();
      clickCount++;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(function () { clickCount = 0; }, 1800);
      if (clickCount >= 5) { clickCount = 0; openEaster(); }
    });
  }

  if (secretBtn) {
    secretBtn.addEventListener('click', function () { openEaster(); });
  }

  if (easterClose) {
    easterClose.addEventListener('click', closeEaster);
  }

  if (easterEl) {
    easterEl.addEventListener('click', function (e) {
      if (e.target === easterEl) closeEaster();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && easterEl && !easterEl.hidden) closeEaster();
  });

  /* ── 6. KONAMI CODE ───────────────────────────────────────── */
  var konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown',
                'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  var konamiIdx = 0;

  document.addEventListener('keydown', function (e) {
    if (e.key === konami[konamiIdx]) {
      konamiIdx++;
      if (konamiIdx === konami.length) { konamiIdx = 0; openEaster(); }
    } else {
      konamiIdx = 0;
    }
  });

  /* ── 7. NAV SHADOW ON SCROLL ──────────────────────────────── */
  var nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.style.boxShadow = window.scrollY > 8
        ? '0 1px 24px rgba(0,0,0,.08)'
        : '';
    }, { passive: true });
  }

  /* ── 8. WARDROBE INTRO ANIMATION ─────────────────────────── */
  if (!prefersReduced) {
    var wardrobe = document.querySelector('.wardrobe');
    if (wardrobe) {
      wardrobe.classList.add('intro');
      setTimeout(function () { wardrobe.classList.remove('intro'); }, 1800);
    }
  }

  /* ── 9. PRESS STRIP TICKER ────────────────────────────────── */
  var stripItems = document.querySelector('.strip__items');
  if (stripItems) {
    var clone = stripItems.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    stripItems.parentNode.appendChild(clone);
    stripItems.parentNode.classList.add('strip__ticker');
  }


  /* ── 11. CONSOLE SIGNATURE ────────────────────────────────── */
  if (window.console && console.log) {
    console.log(
      '%c[RC-0001] Acces neautorizat detectat.\n%cConsultantul principal a fost notificat.\nDosar deschis: ' + new Date().toISOString(),
      'color:#B84A22;font-family:monospace;font-size:13px;font-weight:bold;',
      'color:#5C4A35;font-family:monospace;font-size:11px;'
    );
  }

  /* ── 12. PRICING PULSE ────────────────────────────────────── */
  var featured = document.querySelector('.plan--featured');
  if (featured && !prefersReduced) {
    featured.classList.add('plan--pulse');
  }

})();
