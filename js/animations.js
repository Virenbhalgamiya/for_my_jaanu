/* ============================================
   ROMANTIC ANIMATIONS - VANILLA JS
   Cinematic, Intentional, Deeply Human
   ============================================ */

/**
 * ANIMATION PHILOSOPHY:
 * - Every movement feels like a deep breath
 * - No sharp reactions, only gentle responses
 * - Motion supports emotion, never distracts
 * - Animations feel inevitable, not surprising
 */

/**
 * ROMANTIC PETALS BACKGROUND - Cinematic & Dreamy
 * Creates falling petals with Studio Ghibli-like aesthetic
 * Page-specific intensity for emotional pacing
 */
function createRomanticPetals() {
  // Check if petals container already exists
  if (document.querySelector('.petals-background')) return;
  
  const petalsContainer = document.createElement('div');
  petalsContainer.className = 'petals-background';
  document.body.insertBefore(petalsContainer, document.body.firstChild);
  
  // Detect current page for intensity control
  const currentPageId = document.querySelector('.page:not(.hidden)')?.id || 'page-1';
  
  // Page-specific petal counts (subtle everywhere, slightly more on Page 3)
  const petalCounts = {
    'page-1': 15,  // Minimal - gentle introduction
    'page-2': 18,  // Minimal - reflective mood
    'page-3': 35,  // Peak romantic moment - more visible
    'page-4': 12   // Slowest, calmest - fading away
  };
  
  const petalCount = petalCounts[currentPageId] || 20;
  const sizes = ['tiny', 'tiny', 'small', 'small', 'medium', 'large']; // More tiny/small = more subtle
  
  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    
    // Page 3 gets a few hearts mixed in (10% of petals)
    const isHeartOnPage3 = currentPageId === 'page-3' && Math.random() < 0.1;
    petal.className = isHeartOnPage3 ? 'heart-subtle' : 'petal';
    
    if (!isHeartOnPage3) {
      // Random size for petals
      const sizeClass = sizes[Math.floor(Math.random() * sizes.length)];
      petal.classList.add(sizeClass);
    }
    
    // Random horizontal position
    petal.style.left = `${Math.random() * 100}%`;
    
    // Slow, romantic duration (15-35 seconds) - Studio Ghibli pace
    // Page 4 gets even slower
    const baseDuration = currentPageId === 'page-4' ? 25 : 15;
    const duration = baseDuration + Math.random() * 20;
    petal.style.animationDuration = `${duration}s`;
    
    // Staggered delays for continuous, seamless fall
    const delay = Math.random() * 20;
    petal.style.animationDelay = `-${delay}s`;
    
    // Very subtle opacity (0.05 - 0.15 max)
    const opacity = 0.05 + Math.random() * 0.1;
    petal.style.setProperty('--petal-opacity', opacity);
    
    petalsContainer.appendChild(petal);
  }
  
  // Add observer to update petals when page changes
  observePageChanges(petalsContainer);
}

/**
 * Update petal density when navigating between pages
 */
function observePageChanges(petalsContainer) {
  let lastPageId = null;
  const intensityMap = {
    'page-1': 0.6,  // Very minimal
    'page-2': 0.7,  // Minimal
    'page-3': 1.0,  // Peak (full visibility)
    'page-4': 0.5   // Fading away
  };

  const updateForCurrentPage = () => {
    const currentPage = document.querySelector('.page:not(.hidden)');
    const pageId = currentPage?.id || 'page-1';
    if (pageId === lastPageId) return;
    lastPageId = pageId;

    const intensity = intensityMap[pageId] || 0.7;
    petalsContainer.style.opacity = (intensity * 0.85).toString();
    // If desired, we could add/remove petals here for more dynamic density
  };

  // Initial update
  updateForCurrentPage();

  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'attributes' || m.type === 'childList') {
        updateForCurrentPage();
        break;
      }
    }
  });

  observer.observe(document.body, {
    attributes: true,
    childList: true,
    subtree: true,
    attributeFilter: ['class']
  });
}

// Initialize petals when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('📄 DOM Content Loaded - Creating petals');
    setTimeout(createRomanticPetals, 100);
  });
} else {
  console.log('📄 DOM already loaded - Creating petals immediately');
  setTimeout(createRomanticPetals, 100);
}

class RomanticAnimationController {
  constructor() {
    this.currentPage = 1;
    this.isTransitioning = false;
    this.revealedElements = new Set();
    this.init();
  }

  init() {
    // Initialize page on load
    this.setupPageTransitions();
    this.setupScrollReveals();
    this.setupTextReveals();
    this.setupMicroInteractions();
    
    // Enter current page
    this.enterPage();
  }

  /**
   * PAGE TRANSITIONS - Soft, like turning a page
   */
  setupPageTransitions() {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = parseInt(btn.getAttribute('data-next-page'));
        if (targetPage) this.transitionToPage(targetPage);
      });
    });
  }

  transitionToPage(pageNumber) {
    if (this.isTransitioning) return;
    
    this.isTransitioning = true;
    const currentPageEl = document.getElementById(`page-${this.currentPage}`);
    const nextPageEl = document.getElementById(`page-${pageNumber}`);
    
    if (!nextPageEl) return;

    // Exit current page - fade out slowly
    currentPageEl.classList.add('exit');

    // Wait for exit animation, then show next page
    setTimeout(() => {
      currentPageEl.classList.add('hidden');
      currentPageEl.classList.remove('exit', 'enter');
      
      nextPageEl.classList.remove('hidden');
      nextPageEl.classList.add('enter');
      
      this.currentPage = pageNumber;
      this.revealedElements.clear();
      
      // Reset scroll position
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Setup animations for new page
      this.setupScrollReveals();
      this.setupTextReveals();
      
      this.isTransitioning = false;
    }, 600);
  }

  /**
   * ENTER PAGE - Cinematic arrival
   * Fade in from opacity 0 → 1
   * Slight upward movement
   * Duration: 1200ms with cubic-bezier easing
   */
  enterPage() {
    const page = document.getElementById(`page-${this.currentPage}`);
    if (page) {
      page.classList.remove('hidden');
      page.classList.add('enter');
    }
  }

  /**
   * SCROLL-BASED REVEALS - IntersectionObserver
   * Elements animate in when scrolled into view
   * Each element reveals only once
   */
  setupScrollReveals() {
    const revealElements = document.querySelectorAll('.reveal:not(.hidden)');
    
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.revealedElements.has(entry.target)) {
          this.revealedElements.add(entry.target);
          
          // Add stagger class based on position
          const siblings = entry.target.parentElement?.querySelectorAll('.reveal');
          if (siblings) {
            siblings.forEach((el, idx) => {
              if (el === entry.target) {
                const staggerClass = `reveal-stagger-${(idx % 4) + 1}`;
                entry.target.classList.remove('reveal-stagger-1', 'reveal-stagger-2', 'reveal-stagger-3', 'reveal-stagger-4');
                entry.target.classList.add(staggerClass);
              }
            });
          }
          
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
  }

  /**
   * TEXT LINE REVEALS - Romantic staggered appearance
   * Each line appears sequentially
   * English first, then Hindi (emotional emphasis)
   * Delay: 300-500ms between lines
   */
  setupTextReveals() {
    const textContainers = document.querySelectorAll('[data-text-reveal]');
    
    textContainers.forEach(container => {
      const lines = container.querySelectorAll('.text-line, .hindi-line');
      
      lines.forEach((line, index) => {
        // Reset animation
        line.style.animation = 'none';
        line.offsetHeight; // Trigger reflow
        
        const baseDelay = line.classList.contains('hindi-line') ? 200 : 0;
        const delay = (index * 400) + baseDelay;
        
        line.style.animation = `textLineReveal 0.8s var(--ease-gentle) ${delay}ms forwards`;
      });
    });
  }

  /**
   * MICRO INTERACTIONS - Button and card responses
   * Gentle scale and shadow bloom
   * Smooth color shifts within palette
   */
  setupMicroInteractions() {
    // Button hover interactions are CSS-based for performance
    
    // Card interactions
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.7s var(--ease-smooth)';
      });
    });

    // Input focus (if needed for future additions)
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.style.boxShadow = '0 0 0 3px rgba(232, 212, 204, 0.4)';
      });
      
      input.addEventListener('blur', () => {
        input.style.boxShadow = 'none';
      });
    });
  }

  /**
   * LANGUAGE SWITCH - Bilingual support
   * Toggle between English and full Hindi display
   */
  toggleLanguage() {
    const body = document.body;
    body.classList.toggle('hindi-mode');
    
    // Store preference
    const isHindiMode = body.classList.contains('hindi-mode');
    localStorage.setItem('language-mode', isHindiMode ? 'hindi' : 'english');
  }

  /**
   * RESTORE LANGUAGE PREFERENCE
   */
  restoreLanguagePreference() {
    const savedMode = localStorage.getItem('language-mode');
    if (savedMode === 'hindi') {
      document.body.classList.add('hindi-mode');
    }
  }
}

/**
 * INITIALIZATION
 * Wait for DOM to be ready, then start animations
 */
document.addEventListener('DOMContentLoaded', () => {
  const animationController = new RomanticAnimationController();
  animationController.restoreLanguagePreference();
  
  // Make controller globally available for debugging/navigation
  window.animationController = animationController;
  
  // Log that animations are ready (development)
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log('✨ Romantic animations initialized. Use animationController.transitionToPage(n) to navigate.');
  }
});

/**
 * SMOOTH SCROLL SUPPORT
 * Progressive enhancement for browsers that don't support it natively
 */
if (!('scrollBehavior' in document.documentElement.style)) {
  window.addEventListener('hashchange', (e) => {
    e.preventDefault();
  });
}

/**
 * REDUCE MOTION SUPPORT
 * Respect user's motion preferences for accessibility
 * If user prefers reduced motion, disable all animations
 */
function supportsReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

if (supportsReducedMotion()) {
  const style = document.createElement('style');
  style.innerHTML = `
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  `;
  document.head.appendChild(style);
  console.log('📱 Reduced motion mode enabled.');
}

/**
 * KEYBOARD NAVIGATION
 * Support arrow keys and keyboard navigation for accessibility
 */
document.addEventListener('keydown', (e) => {
  if (!window.animationController) return;
  
  const controller = window.animationController;
  const currentPage = controller.currentPage;
  
  // Arrow keys for navigation
  if (e.key === 'ArrowRight' && currentPage < 4) {
    controller.transitionToPage(currentPage + 1);
  } else if (e.key === 'ArrowLeft' && currentPage > 1) {
    controller.transitionToPage(currentPage - 1);
  }
});
