/* ==========================================================================
   Social Space - UI & Dynamic Interactive Background Controller
   ========================================================================== */

class UIController {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.mobileToggle = document.querySelector('.mobile-toggle');
    this.mobileDropdown = document.querySelector('.mobile-menu-dropdown');
    this.modalBackdrop = document.getElementById('accessModal');

    // Dynamic Background Elements
    this.orbPink = document.getElementById('orbPink');
    this.orbYellow = document.getElementById('orbYellow');
    this.orbCyan = document.getElementById('orbCyan');
    this.orbPurple = document.getElementById('orbPurple');
    this.bgCanvas = document.getElementById('bgCanvas');
  }

  init() {
    this.bindScrollEvents();
    this.bindModal();
    this.bindMobileMenu();
    this.initDynamicBackground();
  }

  // Sticky Navbar Blur Effect & Parallax Orbs Scroll Handling
  bindScrollEvents() {
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      // Navbar Glass Blur
      if (currentScrollY > 40) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }

      // Parallax Shifts on Glow Orbs
      const scrollFactor = currentScrollY * 0.25;
      if (this.orbPink) {
        this.orbPink.style.transform = `translate3d(${Math.sin(currentScrollY * 0.002) * 40}px, ${scrollFactor * 0.4}px, 0)`;
      }
      if (this.orbYellow) {
        this.orbYellow.style.transform = `translate3d(${-Math.cos(currentScrollY * 0.002) * 50}px, ${-scrollFactor * 0.35}px, 0)`;
      }
      if (this.orbCyan) {
        this.orbCyan.style.transform = `translate3d(${Math.cos(currentScrollY * 0.003) * 35}px, ${scrollFactor * 0.5}px, 0)`;
      }
      if (this.orbPurple) {
        this.orbPurple.style.transform = `translate3d(${-Math.sin(currentScrollY * 0.0025) * 45}px, ${-scrollFactor * 0.3}px, 0)`;
      }

      lastScrollY = currentScrollY;
    }, { passive: true });
  }

  // Dynamic Ambient Particle & Light Wave Engine on Canvas
  initDynamicBackground() {
    if (!this.bgCanvas) return;

    const canvas = this.bgCanvas;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    // Particle Colors matching Social Space Palette
    const colors = [
      'rgba(255, 0, 255, ',    // Pink
      'rgba(255, 201, 0, ',    // Yellow
      'rgba(0, 255, 255, ',    // Cyan
      'rgba(124, 58, 237, '    // Violet
    ];

    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 30), 45);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        baseVy: (Math.random() - 0.5) * 0.4
      });
    }

    let lastScroll = window.scrollY;
    let scrollVelocity = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      scrollVelocity = (currentScroll - lastScroll) * 0.15;
      lastScroll = currentScroll;
    }, { passive: true });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Dampen scroll velocity smoothly
      scrollVelocity *= 0.92;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move with velocity + scroll momentum
        p.x += p.vx;
        p.y += p.vy - scrollVelocity;

        // Wrap around boundaries
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Draw glowing particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.colorPrefix + p.alpha + ')';
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.colorPrefix + '0.8)';
        ctx.fill();

        // Connect nearby particles with subtle glowing filaments
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 140) * 0.18;
            ctx.strokeStyle = p.colorPrefix + lineAlpha + ')';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();
  }

  // Modal Dialog Open / Close
  bindModal() {
    const openBtns = document.querySelectorAll('[data-open-modal]');
    const closeBtns = document.querySelectorAll('[data-close-modal]');

    openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        if (this.modalBackdrop) {
          this.modalBackdrop.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.closeModal();
      });
    });

    if (this.modalBackdrop) {
      this.modalBackdrop.addEventListener('click', (e) => {
        if (e.target === this.modalBackdrop) {
          this.closeModal();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modalBackdrop.classList.contains('active')) {
        this.closeModal();
      }
    });
  }

  closeModal() {
    if (this.modalBackdrop) {
      this.modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  // Mobile Menu Toggle & Smooth Scroll Link Close
  bindMobileMenu() {
    if (!this.mobileToggle || !this.mobileDropdown) return;

    this.mobileToggle.addEventListener('click', () => {
      const isOpen = this.mobileDropdown.classList.toggle('active');
      this.mobileToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.mobileDropdown.classList.remove('active');
        this.mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }
}
