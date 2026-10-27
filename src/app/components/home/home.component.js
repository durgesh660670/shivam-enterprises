/**
 * HomeComponent
 * Angular Component Controller for Home page
 */
class HomeComponent {
  constructor() {
    this.categories = [];
    this.featuredProducts = [];
  }

  async ngOnInit() {
    this.categories = await window.productService.getCategories();
    this.featuredProducts = await window.productService.getFeaturedProducts(8);
    this.renderCategories();
    this.renderFeaturedProducts();
  }

  renderCategories() {
    const el = document.getElementById('home-categories-grid');
    if (!el) return;

    const icons = {
      'polyester-bra-cups': '&#128087;',
      'cotton-bra-cups': '&#127807;',
      'thermo-foam-bra-cup': '&#10052;',
      'push-up-bra-cup': '&#11088;',
      'underarms-sweat-pads': '&#128167;',
      'sports-bra-cups': '&#127939;',
      'new-items': '&#10024;'
    };

    el.innerHTML = this.categories.map(cat => `
      <a href="#/products?category=${cat.id}" class="cat-card">
        <div class="cat-icon-box">${icons[cat.id] || '&#128087;'}</div>
        <div>
          <div class="cat-title">${cat.name}</div>
          <div class="cat-count">Click to view items &rarr;</div>
        </div>
      </a>
    `).join('');
  }

  renderFeaturedProducts() {
    const el = document.getElementById('home-featured-products-grid');
    if (!el) return;

    el.innerHTML = this.featuredProducts.map(p => `
      <div class="prod-card">
        <div class="prod-img-box">
          <span class="prod-badge">${p.categoryName}</span>
          <img 
            src="${p.localImage || p.imageUrl}" 
            alt="${p.title}" 
            loading="lazy"
            onerror="this.onerror=null;this.src='${p.imageUrl}'"
          />
        </div>
        <div class="prod-body">
          <h3 class="prod-title" title="${p.title}">${p.title}</h3>
          <div class="prod-price">${p.price}</div>
          
          <div class="prod-specs-mini">
            ${p.specs.Shape ? `<div class="spec-row"><span class="spec-key">Shape:</span> <span class="spec-val">${p.specs.Shape}</span></div>` : ''}
            ${p.specs.Size ? `<div class="spec-row"><span class="spec-key">Size:</span> <span class="spec-val">${p.specs.Size}</span></div>` : ''}
            ${p.specs.Thickness ? `<div class="spec-row"><span class="spec-key">Thickness:</span> <span class="spec-val">${p.specs.Thickness}</span></div>` : ''}
          </div>

          <div class="prod-actions">
            <button class="btn btn-outline-secondary btn-sm" onclick="window.homeComponent.viewProductDetails('${p.id}')">
              Details
            </button>
            <button class="btn btn-primary btn-sm" onclick="window.homeComponent.requestQuote('${p.id}')">
              Get Quote
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  async viewProductDetails(id) {
    const product = await window.productService.getProductById(id);
    if (product) {
      window.enquiryService.openDetailModal(product);
    }
  }

  async requestQuote(id) {
    const product = await window.productService.getProductById(id);
    window.enquiryService.openEnquiryModal(product);
  }
}

window.homeComponent = new HomeComponent();
