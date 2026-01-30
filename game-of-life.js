/**
 * Game of Life - Interactive Background
 * Click to spawn patterns, hover/dwell to generate cells
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    cellSize: 8,
    updateInterval: 100,
    dwellTime: 500,        // ms before hover spawns cells
    dwellRadius: 3,        // cells to spawn on dwell
    fadeSteps: 10,         // how many generations cells fade over
    spawnPatterns: true,   // spawn patterns on click vs random cells
    activationDelay: 3000, // ms before interactions are enabled
  };

  // Famous patterns
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
    lwss: [ // Lightweight spaceship
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

  class GameOfLife {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.cols = 0;
      this.rows = 0;
      this.grid = [];
      this.ages = [];  // Track cell age for fading
      this.running = true;
      this.dwellTimer = null;
      this.lastDwellPos = null;
      
      this.resize();
      this.initGrid();
      this.bindEvents();
      this.loop();
    }

    resize() {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      this.canvas.width = rect.width;
      this.canvas.height = rect.height;
      
      const oldCols = this.cols;
      const oldRows = this.rows;
      const oldGrid = this.grid;
      const oldAges = this.ages;
      
      this.cols = Math.ceil(this.canvas.width / CONFIG.cellSize);
      this.rows = Math.ceil(this.canvas.height / CONFIG.cellSize);
      
      // Preserve existing cells on resize
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
      this.activated = false;
      
      // Activate after delay
      setTimeout(() => {
        this.activated = true;
      }, CONFIG.activationDelay);
    }

    spawnPattern(centerX, centerY, patternName) {
      if (!patternName) {
        patternName = patternNames[Math.floor(Math.random() * patternNames.length)];
      }
      const pattern = PATTERNS[patternName];
      
      // Random rotation (0, 90, 180, 270)
      const rotation = Math.floor(Math.random() * 4);
      
      pattern.forEach(([dy, dx]) => {
        let rx = dx, ry = dy;
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
          
          if (alive) {
            if (neighbors === 2 || neighbors === 3) {
              newGrid[y][x] = 1;
              newAges[y][x] = Math.min(this.ages[y][x] + 1, CONFIG.fadeSteps);
            }
          } else {
            if (neighbors === 3) {
              newGrid[y][x] = 1;
              newAges[y][x] = 0;
            }
          }
        }
      }

      this.grid = newGrid;
      this.ages = newAges;
    }

    getColors() {
      const style = getComputedStyle(document.documentElement);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      
      return {
        accent: style.getPropertyValue('--accent').trim() || (isDark ? '#5b8cc9' : '#1e3a5f'),
        bg: style.getPropertyValue('--bg').trim() || (isDark ? '#030712' : '#ffffff'),
      };
    }

    hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 30, g: 58, b: 95 };
    }

    draw() {
      const colors = this.getColors();
      const accentRgb = this.hexToRgb(colors.accent);
      
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          if (this.grid[y][x]) {
            const age = this.ages[y][x];
            const fadeRatio = 1 - (age / CONFIG.fadeSteps) * 0.7;
            const alpha = 0.15 + fadeRatio * 0.5;
            
            this.ctx.fillStyle = `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, ${alpha})`;
            this.ctx.fillRect(
              x * CONFIG.cellSize,
              y * CONFIG.cellSize,
              CONFIG.cellSize - 1,
              CONFIG.cellSize - 1
            );
          }
        }
      }
    }

    loop() {
      if (this.running) {
        this.step();
        this.draw();
      }
      setTimeout(() => this.loop(), CONFIG.updateInterval);
    }

    getCellCoords(event) {
      const rect = this.canvas.getBoundingClientRect();
      const x = Math.floor((event.clientX - rect.left) / CONFIG.cellSize);
      const y = Math.floor((event.clientY - rect.top) / CONFIG.cellSize);
      return { x, y };
    }

    bindEvents() {
      // Click to spawn pattern
      this.canvas.addEventListener('click', (e) => {
        if (!this.activated) return;
        const { x, y } = this.getCellCoords(e);
        if (CONFIG.spawnPatterns) {
          this.spawnPattern(x, y);
        } else {
          this.spawnRandom(x, y, 2);
        }
      });

      // Hover/dwell to spawn
      this.canvas.addEventListener('mousemove', (e) => {
        if (!this.activated) return;
        const { x, y } = this.getCellCoords(e);
        const pos = `${x},${y}`;
        
        if (this.lastDwellPos !== pos) {
          this.lastDwellPos = pos;
          clearTimeout(this.dwellTimer);
          this.dwellTimer = setTimeout(() => {
            if (this.activated) {
              this.spawnRandom(x, y, CONFIG.dwellRadius);
            }
          }, CONFIG.dwellTime);
        }
      });

      this.canvas.addEventListener('mouseleave', () => {
        clearTimeout(this.dwellTimer);
        this.lastDwellPos = null;
      });

      // Resize handler
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          this.resize();
          this.draw();
        }, 100);
      });

      // Theme change observer
      const observer = new MutationObserver(() => this.draw());
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
      });
    }

    pause() { this.running = false; }
    resume() { this.running = true; }
  }

  // Initialize when DOM is ready
  function init() {
    const container = document.querySelector('.gol-container');
    if (!container) return;
    
    const canvas = document.createElement('canvas');
    canvas.id = 'gol-canvas';
    canvas.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: auto;
      z-index: 0;
    `;
    container.appendChild(canvas);
    
    window.gameOfLife = new GameOfLife(canvas);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
