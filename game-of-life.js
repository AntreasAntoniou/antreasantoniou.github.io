/**
 * Game of Life - an ambient, page-wide interactive field.
 * Click empty space to seed patterns; dwell anywhere to generate cells.
 */

(function() {
  'use strict';

  const CONFIG = {
    cellSize: 8,
    updateInterval: 100,
    dwellTime: 500,
    dwellRadius: 3,
    fadeSteps: 10,
    spawnPatterns: true,
    discoveryDelay: 5000,
  };

  const PATTERNS = {
    glider: [
      [0, 1], [1, 2], [2, 0], [2, 1], [2, 2]
    ],
    blinker: [
      [0, 0], [0, 1], [0, 2]
    ],
    toad: [
      [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2]
    ],
    beacon: [
      [0, 0], [0, 1], [1, 0], [2, 3], [3, 2], [3, 3]
    ],
    lwss: [
      [0, 1], [0, 4], [1, 0], [2, 0], [2, 4], [3, 0], [3, 1], [3, 2], [3, 3]
    ],
    rpentomino: [
      [0, 1], [0, 2], [1, 0], [1, 1], [2, 1]
    ],
    acorn: [
      [0, 1], [1, 3], [2, 0], [2, 1], [2, 4], [2, 5], [2, 6]
    ],
    block: [
      [0, 0], [0, 1], [1, 0], [1, 1]
    ],
    pulsar: [
      [0, 2], [0, 3], [0, 4], [0, 8], [0, 9], [0, 10],
      [2, 0], [2, 5], [2, 7], [2, 12],
      [3, 0], [3, 5], [3, 7], [3, 12],
      [4, 0], [4, 5], [4, 7], [4, 12],
      [5, 2], [5, 3], [5, 4], [5, 8], [5, 9], [5, 10],
      [7, 2], [7, 3], [7, 4], [7, 8], [7, 9], [7, 10],
      [8, 0], [8, 5], [8, 7], [8, 12],
      [9, 0], [9, 5], [9, 7], [9, 12],
      [10, 0], [10, 5], [10, 7], [10, 12],
      [12, 2], [12, 3], [12, 4], [12, 8], [12, 9], [12, 10],
    ],
  };

  const patternNames = Object.keys(PATTERNS);
  const interactiveSelector = 'a, button, input, textarea, select, label';

  function createInitialSeeds(cols, rows, availablePatterns, random = Math.random) {
    const seedCount = 3 + Math.floor(random() * 4);
    const xMargin = Math.min(Math.floor(cols / 2), Math.max(2, Math.floor(cols * 0.08)));
    const yMargin = Math.min(Math.floor(rows / 2), Math.max(2, Math.floor(rows * 0.08)));
    const xSpan = Math.max(1, cols - (xMargin * 2));
    const ySpan = Math.max(1, rows - (yMargin * 2));

    return Array.from({ length: seedCount }, () => ({
      x: Math.min(cols - 1, xMargin + Math.floor(random() * xSpan)),
      y: Math.min(rows - 1, yMargin + Math.floor(random() * ySpan)),
      patternName: availablePatterns[Math.floor(random() * availablePatterns.length)],
      rotation: Math.floor(random() * 4),
    }));
  }

  class GameOfLife {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.cols = 0;
      this.rows = 0;
      this.grid = [];
      this.ages = [];
      this.running = false;
      this.activated = false;
      this.presentation = document.getElementById('gol-presentation');
      this.atmosphere = document.getElementById('gol-atmosphere');
      this.control = document.getElementById('gol-control');
      this.controlIcon = document.getElementById('gol-control-icon');
      this.controlLabel = document.getElementById('gol-control-label');
      this.startInvitation = 'EMERGE';
      this.controlRevealed = false;
      this.discoveryTimer = null;
      this.loopTimer = null;
      this.dwellTimer = null;
      this.lastDwellPos = null;
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

      this.resize();
      this.initGrid();
      this.renderAtmosphere();
      this.setStartInvitation();
      this.bindEvents();

      if (!this.reducedMotion.matches) {
        this.scheduleDiscovery();
      }
    }

    resize() {
      const oldCols = this.cols;
      const oldRows = this.rows;
      const oldGrid = this.grid;
      const oldAges = this.ages;

      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.cols = Math.ceil(this.canvas.width / CONFIG.cellSize);
      this.rows = Math.ceil(this.canvas.height / CONFIG.cellSize);

      if (oldCols > 0) {
        this.grid = this.createEmptyGrid();
        this.ages = this.createEmptyGrid();
        for (let y = 0; y < Math.min(oldRows, this.rows); y++) {
          for (let x = 0; x < Math.min(oldCols, this.cols); x++) {
            this.grid[y][x] = oldGrid[y][x];
            this.ages[y][x] = oldAges[y][x];
          }
        }
      }
    }

    createEmptyGrid() {
      return Array(this.rows).fill(null).map(() => Array(this.cols).fill(0));
    }

    initGrid() {
      this.grid = this.createEmptyGrid();
      this.ages = this.createEmptyGrid();
    }

    spawnInitialPatterns() {
      const seeds = createInitialSeeds(this.cols, this.rows, patternNames);
      seeds.forEach(({ x, y, patternName, rotation }) => {
        this.spawnPattern(x, y, patternName, rotation);
      });
      this.draw();
    }

    start() {
      if (this.activated || this.reducedMotion.matches) return;
      this.activated = true;
      this.presentation?.classList.add('has-started');
      this.spawnInitialPatterns();
      this.resume();
      this.setControlState('Pause Game of Life', true);
    }

    toggle() {
      if (!this.activated) {
        this.start();
      } else if (this.running) {
        this.pause();
        this.setControlState('Resume Game of Life', false);
      } else {
        this.resume();
        this.setControlState('Pause Game of Life', true);
      }
    }

    setControlState(label, active) {
      if (this.controlLabel) this.controlLabel.textContent = label;
      if (this.control) {
        this.control.setAttribute('aria-label', label);
        this.control.classList.toggle('is-active', active);
      }
    }

    setStartInvitation() {
      if (this.controlLabel) this.controlLabel.textContent = this.startInvitation;
      if (this.controlIcon) this.controlIcon.className = 'fas fa-seedling';
      if (this.control) {
        this.control.setAttribute('aria-label', `Start Game of Life: ${this.startInvitation}`);
        this.control.classList.remove('is-active');
      }
    }

    renderAtmosphere() {
      if (!this.atmosphere) return;
      const cells = Array.from({ length: 24 }, (_, index) => {
        const cell = document.createElement('span');
        cell.className = 'gol-atmosphere-cell';
        cell.style.setProperty('--cell-index', index);
        cell.style.setProperty('--cell-x', `${(index * 37) % 101}%`);
        return cell;
      });
      this.atmosphere.replaceChildren(...cells);
    }

    scheduleDiscovery() {
      clearTimeout(this.discoveryTimer);
      if (this.controlRevealed || this.reducedMotion.matches || !this.control) return;
      this.discoveryTimer = setTimeout(() => this.revealControl(), CONFIG.discoveryDelay);
    }

    revealControl() {
      if (!this.control || this.reducedMotion.matches) return;
      this.controlRevealed = true;
      this.presentation?.classList.add('is-revealed');
      this.control.classList.add('is-revealed');
      this.control.setAttribute('aria-hidden', 'false');
      this.control.tabIndex = 0;
    }

    hideControl() {
      if (!this.control) return;
      this.controlRevealed = false;
      this.presentation?.classList.remove('is-revealed');
      this.control.classList.remove('is-revealed', 'is-active');
      this.control.setAttribute('aria-hidden', 'true');
      this.control.tabIndex = -1;
      this.setStartInvitation();
    }

    spawnPattern(centerX, centerY, patternName, rotationOverride) {
      const selectedName = patternName || patternNames[Math.floor(Math.random() * patternNames.length)];
      const pattern = PATTERNS[selectedName];
      if (!pattern) return;

      const rotation = Number.isInteger(rotationOverride)
        ? rotationOverride
        : Math.floor(Math.random() * 4);

      pattern.forEach(([dy, dx]) => {
        let rx = dx;
        let ry = dy;
        for (let r = 0; r < rotation; r++) {
          [rx, ry] = [-ry, rx];
        }
        const x = centerX + rx;
        const y = centerY + ry;
        if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
          this.grid[y][x] = 1;
          this.ages[y][x] = 0;
        }
      });
    }

    spawnRandom(centerX, centerY, radius) {
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (Math.random() < 0.4) {
            const x = centerX + dx;
            const y = centerY + dy;
            if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
              this.grid[y][x] = 1;
              this.ages[y][x] = 0;
            }
          }
        }
      }
    }

    spawnAtClientPoint(clientX, clientY, patternName) {
      if (!this.activated || this.reducedMotion.matches) return;
      if (!this.running) return;
      const x = Math.floor(clientX / CONFIG.cellSize);
      const y = Math.floor(clientY / CONFIG.cellSize);

      if (CONFIG.spawnPatterns || patternName) {
        this.spawnPattern(x, y, patternName);
      } else {
        this.spawnRandom(x, y, 2);
      }
      this.draw();
    }

    countNeighbors(x, y) {
      let count = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          const nx = (x + dx + this.cols) % this.cols;
          const ny = (y + dy + this.rows) % this.rows;
          count += this.grid[ny][nx];
        }
      }
      return count;
    }

    step() {
      const newGrid = this.createEmptyGrid();
      const newAges = this.createEmptyGrid();

      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          const neighbors = this.countNeighbors(x, y);
          const alive = this.grid[y][x];

          if (alive && (neighbors === 2 || neighbors === 3)) {
            newGrid[y][x] = 1;
            newAges[y][x] = Math.min(this.ages[y][x] + 1, CONFIG.fadeSteps);
          } else if (!alive && neighbors === 3) {
            newGrid[y][x] = 1;
            newAges[y][x] = 0;
          }
        }
      }

      this.grid = newGrid;
      this.ages = newAges;
    }

    getAccentRgb() {
      const style = getComputedStyle(document.documentElement);
      const hex = style.getPropertyValue('--accent').trim() || '#1e3a5f';
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      } : { r: 30, g: 58, b: 95 };
    }

    draw() {
      const accent = this.getAccentRgb();
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          if (!this.grid[y][x]) continue;
          const fadeRatio = 1 - (this.ages[y][x] / CONFIG.fadeSteps) * 0.7;
          const alpha = 0.15 + fadeRatio * 0.5;
          this.ctx.fillStyle = `rgba(${accent.r}, ${accent.g}, ${accent.b}, ${alpha})`;
          this.ctx.fillRect(
            x * CONFIG.cellSize,
            y * CONFIG.cellSize,
            CONFIG.cellSize - 1,
            CONFIG.cellSize - 1,
          );
        }
      }
    }

    loop() {
      if (!this.running) {
        this.loopTimer = null;
        return;
      }
      this.step();
      this.draw();
      this.loopTimer = setTimeout(() => this.loop(), CONFIG.updateInterval);
    }

    bindEvents() {
      if (this.control) {
        this.control.addEventListener('click', () => this.toggle());
      }
      document.addEventListener('click', (event) => {
        const target = event.target instanceof Element ? event.target : null;
        if (target?.closest(interactiveSelector)) return;
        this.spawnAtClientPoint(event.clientX, event.clientY);
      });

      document.addEventListener('pointermove', (event) => {
        if (!this.activated || this.reducedMotion.matches) return;
        if (!this.running) return;
        const x = Math.floor(event.clientX / CONFIG.cellSize);
        const y = Math.floor(event.clientY / CONFIG.cellSize);
        const pos = `${x},${y}`;
        if (this.lastDwellPos === pos) return;

        this.lastDwellPos = pos;
        clearTimeout(this.dwellTimer);
        this.dwellTimer = setTimeout(() => {
          if (this.activated && !this.reducedMotion.matches) {
            if (this.running) this.spawnRandom(x, y, CONFIG.dwellRadius);
          }
        }, CONFIG.dwellTime);
      }, { passive: true });

      document.addEventListener('pointerleave', () => {
        clearTimeout(this.dwellTimer);
        this.lastDwellPos = null;
      });

      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          this.resize();
          this.draw();
        }, 100);
      });

      const themeObserver = new MutationObserver(() => this.draw());
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme'],
      });

      this.reducedMotion.addEventListener('change', (event) => {
        if (event.matches) {
          this.activated = false;
          clearTimeout(this.discoveryTimer);
          this.pause();
          this.initGrid();
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.presentation?.classList.remove('has-started');
          this.hideControl();
        } else {
          this.scheduleDiscovery();
        }
      });
    }

    pause() {
      this.running = false;
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }

    resume() {
      if (!this.activated || this.running || this.reducedMotion.matches) return;
      this.running = true;
      this.loop();
    }
  }

  function init() {
    const canvas = document.createElement('canvas');
    canvas.id = 'gol-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);
    window.gameOfLife = new GameOfLife(canvas);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
