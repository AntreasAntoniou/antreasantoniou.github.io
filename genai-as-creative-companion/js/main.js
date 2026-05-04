// THE LAST CHAT — Main JS
// Navigation, Easter eggs, spoiler gates, first-visit experience

(function() {
  'use strict';

  // ===========================
  // NAVIGATION
  // ===========================

  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      hamburger.textContent = mobileMenu.classList.contains('open') ? '✕' : '☰';
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.textContent = '☰';
      });
    });
  }

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ===========================
  // LANDING PAGE
  // ===========================

  const landingTitle = document.getElementById('landing-title');
  const landingSubtitle = document.getElementById('landing-subtitle');
  const landingBegin = document.getElementById('landing-begin');
  const landingCursor = document.getElementById('landing-cursor');

  if (landingTitle) {
    // Typewriter effect
    const titleText = 'THE LAST CHAT';
    let charIndex = 0;
    landingTitle.textContent = '';

    setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (charIndex < titleText.length) {
          landingTitle.textContent += titleText[charIndex];
          charIndex++;
        } else {
          clearInterval(typeInterval);
          // Show subtitle
          setTimeout(() => {
            landingSubtitle.classList.add('visible');
            // Show BEGIN button
            setTimeout(() => {
              landingBegin.classList.add('visible');
            }, 800);
          }, 500);
        }
      }, 80);
    }, 2000);

    // --- Easter Egg: "bruh" ---
    let keyBuffer = '';
    document.addEventListener('keydown', (e) => {
      if (!landingTitle) return; // Only on landing page

      keyBuffer += e.key.toLowerCase();
      if (keyBuffer.length > 20) keyBuffer = keyBuffer.slice(-20);

      // "bruh" Easter egg
      if (keyBuffer.endsWith('bruh')) {
        triggerBruhEasterEgg();
        keyBuffer = '';
      }

      // "schmidhuber" Easter egg
      if (keyBuffer.endsWith('schmidhuber')) {
        window.location.href = 'schmidhuber.html';
        keyBuffer = '';
      }
    });

    // --- Easter Egg: Pattern Motif (click cursor 4 times) ---
    let cursorClicks = 0;
    if (landingCursor) {
      landingCursor.style.cursor = 'pointer';
      landingCursor.addEventListener('click', () => {
        cursorClicks++;
        if (cursorClicks >= 4) {
          playPatternMotif();
          cursorClicks = 0;
        }
      });
    }
  }

  function triggerBruhEasterEgg() {
    const existing = document.getElementById('bruh-egg');
    if (existing) existing.remove();

    const el = document.createElement('div');
    el.id = 'bruh-egg';
    el.className = 'landing-easter-egg show';
    el.textContent = '> ...bruh.';
    document.body.appendChild(el);

    // Track Easter egg
    trackEasterEgg('bruh');

    setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => el.remove(), 500);
    }, 3000);
  }

  function playPatternMotif() {
    // F♯, A, B, E — soft piano tones using Web Audio API
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [369.99, 440.00, 493.88, 329.63]; // F#4, A4, B4, E4
    const duration = 0.6;

    notes.forEach((freq, i) => {
      setTimeout(() => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(audioCtx.currentTime);
        osc.stop(audioCtx.currentTime + duration);
      }, i * 400);
    });

    trackEasterEgg('motif');
  }

  // ===========================
  // SPOILER GATE
  // ===========================

  function checkSpoilerGate() {
    const storyComplete = localStorage.getItem('ttc-story-complete');
    const gatePages = ['music.html', 'manhwa.html', 'novel.html', 'podcast.html'];
    const currentPage = window.location.pathname.split('/').pop();

    if (gatePages.includes(currentPage) && !storyComplete) {
      const gate = document.getElementById('spoiler-gate');
      if (gate) {
        gate.classList.add('active');
      }
    }
  }

  // Spoiler gate dismiss
  const spoilerDismiss = document.getElementById('spoiler-dismiss');
  if (spoilerDismiss) {
    spoilerDismiss.addEventListener('click', () => {
      const gate = document.getElementById('spoiler-gate');
      if (gate) gate.classList.remove('active');
    });
  }

  // ===========================
  // FIRST VISIT — READING ORDER
  // ===========================

  function checkFirstVisit() {
    if (localStorage.getItem('ttc-visited')) return;

    const modal = document.getElementById('reading-order-modal');
    if (modal && window.location.pathname.split('/').pop() === 'index.html') {
      // Small delay for the landing animation
      setTimeout(() => {
        modal.classList.add('active');
      }, 500);
    }
  }

  const readingOrderDismiss = document.getElementById('reading-order-dismiss');
  if (readingOrderDismiss) {
    readingOrderDismiss.addEventListener('click', () => {
      const modal = document.getElementById('reading-order-modal');
      if (modal) modal.classList.remove('active');
      localStorage.setItem('ttc-visited', 'true');
    });
  }

  // ===========================
  // ANALYTICS (lightweight)
  // ===========================

  function trackEasterEgg(eggId) {
    // Store locally — would send to Plausible in production
    const eggs = JSON.parse(localStorage.getItem('ttc-eggs') || '[]');
    if (!eggs.includes(eggId)) {
      eggs.push(eggId);
      localStorage.setItem('ttc-eggs', JSON.stringify(eggs));
    }
    console.log(`🥚 Easter egg found: ${eggId}`);
  }

  // ===========================
  // INIT
  // ===========================

  checkSpoilerGate();

  // Only show first-visit modal on landing page
  const page = window.location.pathname.split('/').pop() || 'index.html';
  if (page === 'index.html' || page === '') {
    checkFirstVisit();
  }

})();
