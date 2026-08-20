/* ==========================================================================
   Social Space - Main Application Entry Point
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize UI Controller (Modals, Mobile Menu, Dynamic Background)
  const ui = new UIController();
  ui.init();

  // Initialize Stats Controller (Animated numerical counters & live active members simulation)
  const stats = new StatsController();
  stats.init();

  // Render Dynamic Montserrat Articles Feed
  renderArticles();

  // Initialize Scroll Reveal Animations
  initScrollReveal();

  console.log('🚀 Social Space Landing Page Initialized');
});

// Render dynamic articles from CONFIG (Montserrat focused typography)
function renderArticles() {
  const articlesContainer = document.getElementById('articlesGrid');
  if (!articlesContainer || !CONFIG.ARTICLES) return;

  articlesContainer.innerHTML = CONFIG.ARTICLES.map(article => `
    <article class="card-glass card-glass-interactive article-card reveal">
      <div>
        <div class="badge ${article.tagClass} article-category-tag">
          ${article.category}
        </div>
        <h3 class="article-title">${article.title}</h3>
        <p class="article-summary">${article.summary}</p>
      </div>

      <div class="article-footer-meta">
        <div class="article-author">
          <div class="author-avatar"></div>
          <div>
            <div>${article.author}</div>
            <div style="font-size: 0.75rem; color: var(--color-text-dim); font-weight: 400;">${article.role}</div>
          </div>
        </div>
        <div style="font-size: 0.78rem; color: var(--color-cyan); font-weight: 600;">
          ${article.readTime}
        </div>
      </div>
    </article>
  `).join('');
}

// Scroll Reveal Observer
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(el => revealObserver.observe(el));
}
