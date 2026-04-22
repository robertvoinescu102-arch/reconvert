(function () {
  'use strict';

  var html = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Theme ───────────────────────────────────────── */
  var saved = localStorage.getItem('is-theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  html.dataset.theme = saved;
  setLabel(saved);

  document.getElementById('theme-toggle').addEventListener('click', function () {
    var next = html.dataset.theme === 'dark' ? 'light' : 'dark';
    html.dataset.theme = next;
    localStorage.setItem('is-theme', next);
    setLabel(next);
  });

  function setLabel(theme) {
    var el = document.querySelector('.theme-label');
    if (el) el.textContent = theme === 'dark' ? 'INTUNERIC' : 'LUMINA';
  }

  /* ── Scroll Reveal ───────────────────────────────── */
  if ('IntersectionObserver' in window) {
    var revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); revealIO.unobserve(e.target); }
      });
    }, { threshold: 0.1 });

    if (!reduced) {
      document.querySelectorAll('.reveal').forEach(function (el) { revealIO.observe(el); });
    } else {
      document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
    }
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ── Counter Animation ───────────────────────────── */
  function countUp(el) {
    var target = parseFloat(el.dataset.count);
    var isFloat = target % 1 !== 0;
    var dur = 1400;
    var t0 = performance.now();
    var numEl = el.closest('.stat__num');
    if (numEl && !reduced) numEl.classList.add('is-counting');

    (function tick(now) {
      var p = Math.min((now - t0) / dur, 1);
      var ease = 1 - Math.pow(1 - p, 3);
      var val = target * ease;
      el.textContent = isFloat
        ? val.toLocaleString('ro-RO', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
        : Math.round(val).toLocaleString('ro-RO');
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        if (numEl) {
          numEl.classList.remove('is-counting');
          if (!reduced) {
            numEl.style.color = '#F2E62D';
            setTimeout(function () { numEl.style.color = ''; }, 450);
          }
        }
      }
    })(t0);
  }

  if ('IntersectionObserver' in window) {
    var statsIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.querySelectorAll('[data-count]').forEach(countUp);
          statsIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.hero__stats').forEach(function (el) { statsIO.observe(el); });
  }

  /* ── Ticker — duplicate for seamless loop ───────── */
  var track = document.getElementById('ticker-track');
  if (track) {
    track.innerHTML += track.innerHTML;
  }

  /* ── Waveform live animation ─────────────────────── */
  (function () {
    var poly = document.querySelector('.hero__wave .waveform');
    if (!poly || reduced) return;
    var raw = poly.getAttribute('points').trim().split(/\s+/);
    var base = raw.map(function (p) {
      var c = p.split(',');
      return [parseFloat(c[0]), parseFloat(c[1])];
    });
    var t = 0;
    function tick() {
      t += 0.022;
      var pts = base.map(function (pt) {
        var x = pt[0], y = pt[1];
        if (Math.abs(y - 50) < 0.5) return x + ',50';
        var sign = y > 50 ? 1 : -1;
        var mag  = Math.abs(y - 50);
        var anim = 50 + sign * (mag + Math.sin(t + x * 0.09) * 2.2);
        return x + ',' + anim.toFixed(1);
      });
      poly.setAttribute('points', pts.join(' '));
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }());

  /* ── Waitlist Form ───────────────────────────────── */
  var form = document.getElementById('waitlist-form');
  var statusEl = form && form.querySelector('.form__status');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name  = form.querySelector('[name="nume"]').value.trim();
      var email = form.querySelector('[name="email"]').value.trim();
      var sel   = form.querySelector('[name="apeluri"]').value;
      var rx    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (name.length < 2)    return showStatus('Numele trebuie sa aiba cel putin 2 caractere.', 'error');
      if (!rx.test(email))    return showStatus('Adresa de email nu este valida.', 'error');
      if (!sel)               return showStatus('Selectati intervalul de apeluri.', 'error');

      showStatus('Cererea a fost inregistrata. Va contactam in 48 de ore.', 'success');
      form.reset();
    });
  }

  function showStatus(msg, type) {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = 'form__status form__status--' + type;
  }

  /* ── Easter Egg — Konami Code ────────────────────── */
  var KONAMI = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  var seq = [];
  var egg = document.getElementById('easter-egg');

  document.addEventListener('keydown', function (e) {
    seq.push(e.keyCode);
    if (seq.length > KONAMI.length) seq.shift();
    if (seq.join() === KONAMI.join()) openEgg();
  });

  var trigger = document.getElementById('secret-trigger');
  var closer  = document.getElementById('easter-close');

  if (trigger) trigger.addEventListener('click', openEgg);
  if (closer)  closer.addEventListener('click', closeEgg);
  if (egg)     egg.addEventListener('click', function (e) { if (e.target === egg) closeEgg(); });

  function openEgg()  { if (egg) { egg.removeAttribute('hidden'); seq = []; } }
  function closeEgg() { if (egg) egg.setAttribute('hidden', ''); }

}());
