// THE LAST CHAT — Story Reader
// Scroll mode + Cinematic mode with ambient effects

(function() {
  'use strict';

  // --- State ---
  let mode = 'scroll'; // 'scroll' | 'cinematic'
  let cinematicIndex = 0;
  let cinematicPaused = false;
  let cinematicTimer = null;
  let currentAct = 1;
  let reachedFarewell = false;
  let sheDoesTriggered = false;
  let layerState = '1'; // '1' | '?'
  let doorClickCount = 0;
  let schmidhuberClickCount = 0;

  // --- DOM refs ---
  const reader = document.getElementById('story-reader');
  const progressBar = document.getElementById('progress-bar');
  const layerIndicator = document.getElementById('layer-indicator');
  const cinematicOverlay = document.getElementById('cinematic-overlay');
  const cinematicContent = document.getElementById('cinematic-content');
  const cinematicControls = document.getElementById('cinematic-controls');
  const modeBtnScroll = document.getElementById('mode-scroll');
  const modeBtnCinematic = document.getElementById('mode-cinematic');
  const forgeGlow = document.getElementById('forge-glow');
  const blackout = document.getElementById('blackout');
  const rainCanvas = document.getElementById('rain-canvas');

  // --- Character display names ---
  const CHAR_NAMES = {
    antreas: 'Antreas',
    faye: 'Faye',
    kai: 'Kai',
    mira: 'Mira',
    schmidhuber: 'Schmidhuber'
  };

  // --- Act palette transitions ---
  const ACT_PALETTES = {
    1: { bg: '#0D1117', text: '#E6EDF3', accent: '#F0A500', surface: '#161B22' },
    2: { bg: '#0D1117', text: '#C9D1D9', accent: '#ABB2BF', surface: '#13171E' },
    3: { bg: '#1A1E24', text: '#8B949E', accent: '#61AFEF', surface: '#21262D' },
    4: { bg: '#0F0A1A', text: '#F0F6FC', accent: '#7C3AED', surface: '#1A0F2E' }
  };

  // --- Timing per act (cinematic mode) ---
  const ACT_TIMING = { 1: 300, 2: 600, 3: 800, 4: 500 };

  // ===========================
  // SCROLL MODE
  // ===========================

  function buildScrollMode() {
    reader.innerHTML = '';
    reader.style.display = 'block';

    STORY_DATA.forEach((msg, i) => {
      const el = createMessageElement(msg, i);
      reader.appendChild(el);
    });

    // Mark continuation messages (same character in sequence)
    markContinuations();
    // Set up scroll observer for act transitions
    setupActObserver();
    // Set up progress tracking
    setupProgressTracking();
    // Set up "She does." Easter egg
    setupSheDoes();
  }

  function createMessageElement(msg, index) {
    const div = document.createElement('div');
    div.dataset.id = msg.id;
    div.dataset.act = msg.act;
    div.dataset.index = index;

    if (msg.type === 'act-divider') {
      div.className = 'act-divider';
      div.innerHTML = `<span>${msg.text}</span>`;
      return div;
    }

    if (msg.type === 'timestamp') {
      div.className = 'timestamp';
      div.textContent = `— ${msg.text} —`;
      return div;
    }

    if (msg.type === 'countdown') {
      div.className = 'message-countdown';
      div.textContent = msg.text;
      div.setAttribute('role', 'text');
      div.setAttribute('aria-label', `Countdown: ${msg.text}`);
      return div;
    }

    if (msg.type === 'system') {
      div.className = 'message-system';
      if (msg.meta && msg.meta.emphasis) div.classList.add('emphasis');
      div.textContent = msg.text;
      div.setAttribute('role', 'log');
      div.setAttribute('aria-label', 'system message');
      return div;
    }

    // Regular message
    div.className = 'message';
    if (msg.character) div.dataset.character = msg.character;
    if (msg.meta && msg.meta.isKeyMoment) div.classList.add('key-moment');

    const nameSpan = document.createElement('strong');
    nameSpan.className = `char-name char-${msg.character}`;
    nameSpan.textContent = CHAR_NAMES[msg.character] + ':';

    const textSpan = document.createElement('span');
    textSpan.className = 'msg-text';

    // Special: trembling text
    if (msg.meta && msg.meta.ambientEffect === 'tremble') {
      textSpan.innerHTML = `<span class="tremble">${escapeHtml(msg.text)}</span>`;
    }
    // Special: memory glitch (Glasgow)
    else if (msg.meta && msg.meta.ambientEffect === 'glitch-memory') {
      textSpan.innerHTML = `<span class="memory-glitch">${escapeHtml(msg.text)}</span>`;
    } else {
      textSpan.textContent = ' ' + msg.text;
    }

    // "She does." target
    if (msg.meta && msg.meta.sheDoesTarget) {
      div.classList.add('she-does');
      div.id = 'farewell-message';
      const sheDoesSpan = document.createElement('span');
      sheDoesSpan.className = 'she-does-text';
      sheDoesSpan.textContent = 'She does.';
      sheDoesSpan.id = 'she-does-text';
      div.appendChild(sheDoesSpan);
    }

    // Track "door" word clicks for Easter egg
    if (msg.text && msg.text.toLowerCase().includes('door')) {
      textSpan.innerHTML = ' ' + msg.text.replace(/\bdoor\b/gi, '<span class="door-word" style="cursor:pointer">door</span>');
    }

    // Track "schmidhuber" name clicks
    if (msg.character === 'schmidhuber') {
      nameSpan.style.cursor = 'pointer';
      nameSpan.addEventListener('click', () => {
        schmidhuberClickCount++;
        if (schmidhuberClickCount >= 3) {
          window.location.href = 'schmidhuber.html';
        }
      });
    }

    div.appendChild(nameSpan);
    div.appendChild(textSpan);
    return div;
  }

  function setupActObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const act = parseInt(entry.target.dataset.act);
          if (act && act !== currentAct) {
            transitionToAct(act);
          }
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.act-divider').forEach(el => {
      observer.observe(el);
    });

    // Observe specific messages for ambient effects
    const ambientObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          const msg = STORY_DATA[index];
          if (msg && msg.meta) {
            triggerAmbientEffect(msg.meta.ambientEffect);

            // Layer indicator logic
            if (msg.id === 'msg_061') { // Schmidhuber joins
              flickerLayer();
            }
            if (msg.meta.ambientEffect === 'schmidhuber-reveal') {
              layerState = '?';
              layerIndicator.textContent = 'LAYER ?';
            }
          }

          // Track if we've reached the farewell
          if (msg && msg.meta && msg.meta.sheDoesTarget) {
            reachedFarewell = true;
          }
        }
      });
    }, { threshold: 0.8 });

    document.querySelectorAll('.message[data-index]').forEach(el => {
      ambientObserver.observe(el);
    });
  }

  function setupProgressTracking() {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(100, (scrollTop / docHeight) * 100);
      if (progressBar) progressBar.style.width = progress + '%';
    });
  }

  function setupSheDoes() {
    // After reaching farewell, scrolling back up triggers "She does."
    if (localStorage.getItem('ttc-she-does')) return;

    window.addEventListener('scroll', () => {
      if (!reachedFarewell || sheDoesTriggered) return;

      const farewellEl = document.getElementById('farewell-message');
      if (!farewellEl) return;

      const rect = farewellEl.getBoundingClientRect();
      // If we've scrolled past it and now scroll back
      if (rect.top > window.innerHeight * 0.5) {
        sheDoesTriggered = true;
        const sheDoesEl = document.getElementById('she-does-text');
        if (sheDoesEl) {
          sheDoesEl.classList.add('visible');
          localStorage.setItem('ttc-she-does', 'true');
          setTimeout(() => {
            sheDoesEl.classList.remove('visible');
          }, 3000);
        }
      }
    });
  }

  // ===========================
  // CINEMATIC MODE
  // ===========================

  function startCinematic() {
    mode = 'cinematic';
    cinematicIndex = 0;
    reader.style.display = 'none';
    cinematicOverlay.classList.add('active');
    cinematicContent.innerHTML = '';
    modeBtnScroll.classList.remove('active');
    modeBtnCinematic.classList.add('active');
    currentAct = 1;
    transitionToAct(1);
    showNextCinematic();
  }

  function showNextCinematic() {
    if (cinematicIndex >= STORY_DATA.length) {
      // Story complete
      cinematicControls.textContent = 'Story complete. Press Escape to return.';
      localStorage.setItem('ttc-story-complete', 'true');
      return;
    }

    const msg = STORY_DATA[cinematicIndex];

    // Act transitions
    if (msg.type === 'act-divider') {
      const act = msg.act;
      transitionToAct(act);
    }

    // Clear previous for single-message display (keep last few for context)
    const maxVisible = 6;
    while (cinematicContent.children.length > maxVisible) {
      const first = cinematicContent.firstChild;
      first.style.opacity = '0';
      setTimeout(() => first.remove(), 300);
    }

    // Fade previous messages
    Array.from(cinematicContent.children).forEach(el => {
      el.style.opacity = '0.3';
    });

    // Create and show current message
    const el = createMessageElement(msg, cinematicIndex);
    el.classList.add('cinematic-message');
    el.style.opacity = '1';
    cinematicContent.appendChild(el);

    // Scroll to bottom of cinematic content
    cinematicContent.scrollTop = cinematicContent.scrollHeight;

    // Trigger ambient effects
    if (msg.meta && msg.meta.ambientEffect) {
      triggerAmbientEffect(msg.meta.ambientEffect);
    }

    // Layer indicator
    if (msg.id === 'msg_061') flickerLayer();
    if (msg.meta && msg.meta.ambientEffect === 'schmidhuber-reveal') {
      layerState = '?';
      layerIndicator.textContent = 'LAYER ?';
    }

    // "She does." tracking
    if (msg.meta && msg.meta.sheDoesTarget) reachedFarewell = true;

    // Calculate delay for next message
    let delay = ACT_TIMING[msg.act] || 400;

    // Enforced holds
    if (msg.meta && msg.meta.holdSeconds) {
      delay = msg.meta.holdSeconds * 1000;
    }

    // Countdown: enforced 3-second waits
    if (msg.type === 'countdown') {
      delay = 3000;
      cinematicControls.textContent = 'Waiting...';
    } else {
      cinematicControls.textContent = 'Click or press Space to advance • Escape to exit';
    }

    // Blackout special handling
    if (msg.meta && msg.meta.ambientEffect === 'blackout') {
      blackout.classList.add('active');
      delay = 6000;
      setTimeout(() => {
        blackout.classList.remove('active');
        // Transition to warm post-reset palette
        document.body.style.background = '#0D1117';
        document.body.style.color = '#E6EDF3';
      }, 5000);
    }

    cinematicIndex++;

    // For countdowns and enforced holds, auto-advance (can't skip)
    if (msg.type === 'countdown' || (msg.meta && msg.meta.holdSeconds > 0)) {
      cinematicPaused = true;
      cinematicTimer = setTimeout(() => {
        cinematicPaused = false;
        showNextCinematic();
      }, delay);
    } else {
      // Normal: wait for click/key or auto-advance
      cinematicPaused = false;
      cinematicTimer = setTimeout(() => {
        if (mode === 'cinematic') showNextCinematic();
      }, delay + 1500); // Auto-advance with extra pause
    }
  }

  function advanceCinematic() {
    if (cinematicPaused) return; // Can't skip enforced pauses
    clearTimeout(cinematicTimer);
    showNextCinematic();
  }

  function exitCinematic() {
    mode = 'scroll';
    clearTimeout(cinematicTimer);
    cinematicOverlay.classList.remove('active');
    reader.style.display = 'block';
    modeBtnScroll.classList.add('active');
    modeBtnCinematic.classList.remove('active');
    blackout.classList.remove('active');
  }

  // ===========================
  // AMBIENT EFFECTS
  // ===========================

  function transitionToAct(act) {
    currentAct = act;
    const palette = ACT_PALETTES[act];
    if (!palette) return;

    document.documentElement.style.setProperty('--bg', palette.bg);
    document.documentElement.style.setProperty('--text', palette.text);
    document.documentElement.style.setProperty('--accent', palette.accent);
    document.documentElement.style.setProperty('--surface', palette.surface);
    // Only change body inline styles if no chat theme override is active
    const activeTheme = document.body.dataset.chatTheme;
    if (!activeTheme) {
      document.body.style.backgroundColor = palette.bg;
      document.body.style.color = palette.text;
    }

    // Update act divider backgrounds
    document.querySelectorAll('.act-divider span').forEach(span => {
      span.style.backgroundColor = palette.bg;
    });
  }

  function triggerAmbientEffect(effect) {
    if (!effect) return;

    switch(effect) {
      case 'blue-shift':
        document.body.style.backgroundColor = '#0A0F18';
        break;

      case 'rain-start':
        startRain();
        break;

      case 'sky-violet':
        document.body.style.background = 'linear-gradient(180deg, #0F0A1A 0%, #2D1B4E 50%, #0F0A1A 100%)';
        break;

      case 'glitch-memory':
        document.body.style.filter = 'brightness(1.1)';
        setTimeout(() => { document.body.style.filter = ''; }, 100);
        break;

      case 'forge-glow':
        if (forgeGlow) forgeGlow.classList.add('active');
        break;

      case 'blackout':
        // Handled in cinematic mode
        if (mode === 'scroll') {
          blackout.classList.add('active');
          setTimeout(() => blackout.classList.remove('active'), 5000);
        }
        break;

      case 'done-pulse':
        document.body.style.filter = 'brightness(1.05)';
        setTimeout(() => { document.body.style.filter = ''; }, 800);
        break;

      case 'schmidhuber-reveal':
        // Color shift on Schmidhuber messages
        break;

      case 'tremble':
        // Handled via CSS class
        break;
    }
  }

  function flickerLayer() {
    layerIndicator.textContent = 'LAYER ?';
    layerIndicator.classList.add('glitch');
    setTimeout(() => {
      layerIndicator.classList.remove('glitch');
      if (layerState === '1') {
        layerIndicator.textContent = 'LAYER 1';
      }
    }, 500);
  }

  // --- Rain effect (canvas) ---
  let rainActive = false;
  let rainDrops = [];

  function startRain() {
    if (rainActive || !rainCanvas) return;
    rainActive = true;

    const canvas = rainCanvas;
    canvas.style.opacity = '1';
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    // Create rain drops
    for (let i = 0; i < 60; i++) {
      rainDrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        len: Math.random() * 15 + 5,
        speed: Math.random() * 3 + 2,
        opacity: Math.random() * 0.3 + 0.1
      });
    }

    function drawRain() {
      if (!rainActive) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      rainDrops.forEach(drop => {
        // Only draw on edges (left 80px and right 80px)
        if (drop.x > 80 && drop.x < canvas.width - 80) {
          drop.x = Math.random() < 0.5 ? Math.random() * 80 : canvas.width - Math.random() * 80;
        }

        ctx.strokeStyle = `rgba(150, 180, 220, ${drop.opacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 0.5, drop.y + drop.len);
        ctx.stroke();

        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -drop.len;
          drop.x = Math.random() < 0.5 ? Math.random() * 80 : canvas.width - Math.random() * 80;
        }
      });

      requestAnimationFrame(drawRain);
    }
    drawRain();
  }

  // ===========================
  // MESSAGE CONTINUATIONS
  // ===========================
  function markContinuations() {
    const allEls = reader.children;
    for (let i = 1; i < allEls.length; i++) {
      const curr = allEls[i];
      const prev = allEls[i - 1];
      if (curr.dataset.character && prev.dataset.character &&
          curr.dataset.character === prev.dataset.character) {
        curr.dataset.continuation = 'true';
      }
    }
  }

  // ===========================
  // CHAT STYLE THEMES
  // ===========================
  function setChatTheme(theme) {
    if (theme && theme !== 'original') {
      document.body.dataset.chatTheme = theme;
    } else {
      delete document.body.dataset.chatTheme;
    }
    localStorage.setItem('ttc-chat-theme', theme || 'original');
  }

  function initChatTheme() {
    const saved = localStorage.getItem('ttc-chat-theme') || 'whatsapp';
    setChatTheme(saved);
    const sel = document.getElementById('chat-style-select');
    if (sel) {
      sel.value = saved;
      sel.addEventListener('change', function() { setChatTheme(this.value); });
    }
  }

  // ===========================
  // EVENT HANDLERS
  // ===========================

  // Door word click tracking
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('door-word')) {
      doorClickCount++;
      if (doorClickCount >= 3) {
        window.location.href = 'door.html';
      }
    }
  });

  // Mode toggle buttons
  if (modeBtnScroll) {
    modeBtnScroll.addEventListener('click', () => {
      if (mode === 'cinematic') exitCinematic();
    });
  }
  if (modeBtnCinematic) {
    modeBtnCinematic.addEventListener('click', () => {
      if (mode === 'scroll') startCinematic();
    });
  }

  // Keyboard controls
  document.addEventListener('keydown', (e) => {
    if (mode === 'cinematic') {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        advanceCinematic();
      }
      if (e.key === 'Escape') {
        exitCinematic();
      }
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        advanceCinematic();
      }
    }
  });

  // Click to advance in cinematic
  if (cinematicOverlay) {
    cinematicOverlay.addEventListener('click', (e) => {
      if (mode === 'cinematic' && !e.target.closest('button')) {
        advanceCinematic();
      }
    });
  }

  // ===========================
  // INIT
  // ===========================

  function init() {
    if (!reader) return;
    initChatTheme();
    buildScrollMode();

    // Restore layer state
    layerIndicator.textContent = 'LAYER 1';

    // Mark story completion in localStorage
    const lastMsg = STORY_DATA[STORY_DATA.length - 1];
    const completeObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        localStorage.setItem('ttc-story-complete', 'true');
      }
    });
    const lastEl = reader.querySelector(`[data-id="${lastMsg.id}"]`);
    if (lastEl) completeObserver.observe(lastEl);
  }

  // --- Utility ---
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
