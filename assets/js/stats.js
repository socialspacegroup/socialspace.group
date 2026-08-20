/* ==========================================================================
   Social Space - Stats Controller Module
   ========================================================================== */

class StatsController {
  constructor() {
    this.statElements = document.querySelectorAll('[data-target-stat]');
    this.hasAnimated = false;
  }

  init() {
    this.initIntersectionObserver();
  }

  // Observer to trigger number counting animation if stat elements exist
  initIntersectionObserver() {
    if (!this.statElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.animateAllStats();
          this.hasAnimated = true;
        }
      });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.stats-section-box');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  animateAllStats() {
    this.statElements.forEach(el => {
      const targetStr = el.getAttribute('data-target-stat');
      const isPlus = targetStr.includes('+');
      const isM = targetStr.includes('M');
      const numericVal = parseFloat(targetStr.replace(/[^0-9.]/g, ''));

      if (isNaN(numericVal)) return;

      const duration = 2000;
      const startTime = performance.now();

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = Math.floor(easeProgress * numericVal);

        if (isM) {
          el.textContent = `${(easeProgress * numericVal).toFixed(1)}M${isPlus ? '+' : ''}`;
        } else {
          el.textContent = `${currentVal.toLocaleString()}${isPlus ? '+' : ''}`;
        }

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = targetStr;
        }
      };

      requestAnimationFrame(step);
    });
  }
}
