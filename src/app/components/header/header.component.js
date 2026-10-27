/**
 * HeaderComponent
 * Angular Component Controller for header and search
 */
class HeaderComponent {
  constructor() {
    this.searchQuery = '';
  }

  onSearchChange(value) {
    this.searchQuery = value;
  }

  onSearchSubmit() {
    const q = this.searchQuery.trim();
    if (q) {
      window.location.hash = `#/products?q=${encodeURIComponent(q)}`;
    } else {
      window.location.hash = `#/products`;
    }
  }
}

window.headerComponent = new HeaderComponent();
