/**
 * BottomNavbarComponent
 * Flipkart-Style Fixed Bottom Navbar & Ultra Smooth Scroll Engine
 */
class BottomNavbarComponent {
  constructor() {
    this.categorySheetOpen = false;
    this.initScrollListener();
    this.initSmoothScrollInterceptor();

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.categorySheetOpen) {
        this.closeCategorySheet();
      }
    });
  }

  /**
   * Set active link based on current route
   * @param {string} route
   */
  setActiveLink(route) {
    const items = ['home', 'products', 'contact'];
    items.forEach(id => {
      const el = document.getElementById(`bnav-${id}`);
      if (el) el.classList.remove('active');
    });

    const catBtn = document.getElementById('bnav-categories');
    if (catBtn) catBtn.classList.remove('active');

    if (route.startsWith('/products')) {
      document.getElementById('bnav-products')?.classList.add('active');
    } else if (route.startsWith('/contact')) {
      document.getElementById('bnav-contact')?.classList.add('active');
    } else if (route === '/' || route === '' || route.startsWith('/#')) {
      document.getElementById('bnav-home')?.classList.add('active');
    }

    if (this.categorySheetOpen) {
      this.closeCategorySheet();
    }
  }

  /**
   * Handle navigation click; if already on the active route, ultra-smooth scroll to top
   */
  onNavClick(name) {
    const currentHash = window.location.hash.slice(1) || '/';
    let target = '/';
    if (name === 'products') target = '/products';
    if (name === 'contact') target = '/contact';

    if (currentHash === target || currentHash.startsWith(target + '?')) {
      this.ultraSmoothScrollToTop();
    }
    this.closeCategorySheet();
  }

  /**
   * Toggle Flipkart-style Categories bottom sheet drawer
   */
  toggleCategorySheet() {
    this.categorySheetOpen = !this.categorySheetOpen;
    const sheet = document.getElementById('fk-category-sheet');
    const backdrop = document.getElementById('fk-category-sheet-backdrop');
    const catBtn = document.getElementById('bnav-categories');

    if (sheet && backdrop) {
      if (this.categorySheetOpen) {
        sheet.classList.add('open');
        backdrop.classList.add('open');
        catBtn?.classList.add('active');
        document.body.style.overflow = 'hidden'; // lock background
      } else {
        this.closeCategorySheet();
      }
    }
  }

  /**
   * Close Flipkart-style Categories bottom sheet
   */
  closeCategorySheet() {
    this.categorySheetOpen = false;
    const sheet = document.getElementById('fk-category-sheet');
    const backdrop = document.getElementById('fk-category-sheet-backdrop');
    const catBtn = document.getElementById('bnav-categories');

    if (sheet) sheet.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    if (catBtn) catBtn.classList.remove('active');
    document.body.style.overflow = '';
  }

  /**
   * Ultra Smooth Scroll to Top with custom cubic bezier momentum easing
   * @param {number} duration - Scroll duration in ms
   */
  ultraSmoothScrollToTop(duration = 450) {
    const startPosition = window.pageYOffset || document.documentElement.scrollTop;
    if (startPosition <= 0) return;

    const startTime = performance.now();

    // High performance easeInOutCubic curve for butter-smooth deceleration
    const easeInOutCubic = (t) => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);

      window.scrollTo(0, Math.round(startPosition * (1 - easeProgress)));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  /**
   * Ultra smooth scroll to any target element or offset
   * @param {number|HTMLElement} target
   * @param {number} duration
   * @param {number} offset
   */
  ultraSmoothScrollTo(target, duration = 450, offset = 80) {
    let targetY = 0;
    if (typeof target === 'number') {
      targetY = target;
    } else if (target instanceof HTMLElement) {
      const rect = target.getBoundingClientRect();
      targetY = rect.top + window.pageYOffset - offset;
    }

    const startY = window.pageYOffset || document.documentElement.scrollTop;
    const distance = targetY - startY;
    if (Math.abs(distance) < 2) return;

    const startTime = performance.now();

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, Math.round(startY + distance * ease));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }

  /**
   * Initialize passive scroll listener for floating scroll-to-top button
   */
  initScrollListener() {
    window.addEventListener('scroll', () => {
      const btn = document.getElementById('fk-scroll-to-top');
      if (!btn) return;

      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > 260) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });
  }

  /**
   * Intercept internal navigation and hash links for ultra smooth scrolling
   */
  initSmoothScrollInterceptor() {
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      // If it's a section anchor like #section-id
      if (href && href.startsWith('#') && !href.startsWith('#/')) {
        const targetId = href.substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          e.preventDefault();
          this.ultraSmoothScrollTo(targetEl, 500, 85);
        }
      }
    });
  }
}

// Global component instance
window.bottomNavbarComponent = new BottomNavbarComponent();
window.ultraSmoothScrollToTop = (duration) => window.bottomNavbarComponent.ultraSmoothScrollToTop(duration);
window.ultraSmoothScrollTo = (target, duration, offset) => window.bottomNavbarComponent.ultraSmoothScrollTo(target, duration, offset);

