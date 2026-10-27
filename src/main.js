/**
 * Main Application Bootstrapper
 * Boots Angular component architecture and client-side routing
 */
(function bootstrap() {
  document.addEventListener('DOMContentLoaded', async () => {
    console.log('Bootstrapping Shivam Enterprises Angular App...');

    const appRoot = document.querySelector('app-root');
    if (!appRoot) {
      console.error('<app-root> not found in document!');
      return;
    }

    // 1. Mount root App template
    appRoot.innerHTML = window.__TEMPLATES__.app;

    // 2. Mount child component templates
    const headerEl = appRoot.querySelector('header-component');
    if (headerEl) headerEl.innerHTML = window.__TEMPLATES__.header;

    const navbarEl = appRoot.querySelector('navbar-component');
    if (navbarEl) navbarEl.innerHTML = window.__TEMPLATES__.navbar;

    const footerEl = appRoot.querySelector('footer-component');
    if (footerEl) footerEl.innerHTML = window.__TEMPLATES__.footer;

    const enquiryModalEl = appRoot.querySelector('enquiry-modal-component');
    if (enquiryModalEl) enquiryModalEl.innerHTML = window.__TEMPLATES__.enquiryModal;

    const detailModalEl = appRoot.querySelector('product-detail-component');
    if (detailModalEl) detailModalEl.innerHTML = window.__TEMPLATES__.productDetail;

    // 3. Initialize services
    if (window.productService) {
      await window.productService.init();
    }

    // 4. Initialize root component
    if (window.appComponent && window.appComponent.ngOnInit) {
      window.appComponent.ngOnInit();
    }

    // 5. Initialize client-side router
    if (window.appRouter) {
      window.appRouter.init();
    }

    console.log('Shivam Enterprises Angular App Bootstrapped successfully!');
  });
})();
