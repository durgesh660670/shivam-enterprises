/**
 * App Router
 * Client-side Router matching Angular routing architecture
 */
class AppRouter {
  constructor() {
    this.routes = [
      { path: '/', component: 'home' },
      { path: '/products', component: 'products' },
      { path: '/about', component: 'about' },
      { path: '/testimonials', component: 'testimonials' },
      { path: '/contact', component: 'contact' }
    ];

    window.addEventListener('hashchange', () => this.handleRoute());
  }

  init() {
    this.handleRoute();
  }

  handleRoute() {
    const rawHash = window.location.hash.slice(1) || '/';
    const [pathPart, queryPart] = rawHash.split('?');
    const path = pathPart || '/';

    const params = {};
    if (queryPart) {
      new URLSearchParams(queryPart).forEach((val, key) => {
        params[key] = val;
      });
    }

    let route = this.routes.find(r => r.path === path);
    if (!route) {
      // Check prefix
      if (path.startsWith('/products')) route = { path: '/products', component: 'products' };
      else route = { path: '/', component: 'home' };
    }

    this.renderRoute(route.component, params, path);
  }

  renderRoute(componentName, params, fullPath) {
    const outlet = document.querySelector('router-outlet');
    if (!outlet) return;

    // Get template HTML from component registry
    const template = window.__TEMPLATES__[componentName] || '';
    outlet.innerHTML = template;

    // Update active nav link
    if (window.navbarComponent) {
      window.navbarComponent.setActiveLink(fullPath);
    }

    // Ultra smooth scroll to top
    if (window.bottomNavbarComponent && window.bottomNavbarComponent.ultraSmoothScrollToTop) {
      window.bottomNavbarComponent.ultraSmoothScrollToTop(400);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Initialize component controller
    switch (componentName) {
      case 'home':
        if (window.homeComponent && window.homeComponent.ngOnInit) {
          window.homeComponent.ngOnInit();
        }
        break;
      case 'products':
        if (window.productsComponent && window.productsComponent.ngOnInit) {
          window.productsComponent.ngOnInit(params);
        }
        break;
      case 'about':
        if (window.aboutComponent && window.aboutComponent.ngOnInit) {
          window.aboutComponent.ngOnInit();
        }
        break;
      case 'testimonials':
        if (window.testimonialsComponent && window.testimonialsComponent.ngOnInit) {
          window.testimonialsComponent.ngOnInit();
        }
        break;
      case 'contact':
        if (window.contactComponent && window.contactComponent.ngOnInit) {
          window.contactComponent.ngOnInit();
        }
        break;
    }
  }
}

window.appRouter = new AppRouter();
