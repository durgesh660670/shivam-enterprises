/**
 * NavbarComponent
 * Angular Component Controller for navigation and active states
 */
class NavbarComponent {
  constructor() {
    this.mobileMenuOpen = false;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
    const menu = document.getElementById('main-nav-menu');
    if (menu) {
      menu.classList.toggle('open', this.mobileMenuOpen);
    }
  }

  setActiveLink(route) {
    const links = ['home', 'products', 'about', 'testimonials', 'contact'];
    links.forEach(id => {
      const el = document.getElementById(`nav-${id}`);
      if (el) el.classList.remove('active');
    });

    if (route.startsWith('/products')) {
      document.getElementById('nav-products')?.classList.add('active');
    } else if (route.startsWith('/about')) {
      document.getElementById('nav-about')?.classList.add('active');
    } else if (route.startsWith('/testimonials')) {
      document.getElementById('nav-testimonials')?.classList.add('active');
    } else if (route.startsWith('/contact')) {
      document.getElementById('nav-contact')?.classList.add('active');
    } else {
      document.getElementById('nav-home')?.classList.add('active');
    }

    // Sync active state with Flipkart bottom navbar
    if (window.bottomNavbarComponent && window.bottomNavbarComponent.setActiveLink) {
      window.bottomNavbarComponent.setActiveLink(route);
    }

    // Close mobile menu on navigate
    if (this.mobileMenuOpen) {
      this.toggleMobileMenu();
    }
  }
}

window.navbarComponent = new NavbarComponent();
