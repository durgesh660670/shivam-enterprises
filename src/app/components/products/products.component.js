/**
 * ProductsComponent
 * Angular Component Controller for Products Catalog
 */
class ProductsComponent {
  constructor() {
    this.categories = [];
    this.allProducts = [];
    this.filteredProducts = [];
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.currentSort = 'default';
  }

  async ngOnInit(params = {}) {
    this.categories = await window.productService.getCategories();
    this.allProducts = await window.productService.getProducts();

    this.currentCategory = params.category || 'all';
    this.searchQuery = params.q || '';

    this.renderSidebar();
    this.applyFiltersAndSort();
  }

  renderSidebar() {
    const el = document.getElementById('sidebar-categories');
    if (!el) return;

    const totalCount = this.allProducts.length;

    let html = `
      <li>
        <button 
          class="category-btn ${this.currentCategory === 'all' ? 'active' : ''}" 
          onclick="window.productsComponent.selectCategory('all')"
        >
          <span>All Categories</span>
          <span class="category-badge">${totalCount}</span>
        </button>
      </li>
    `;

    this.categories.forEach(cat => {
      const count = this.allProducts.filter(p => p.categoryId === cat.id).length;
      html += `
        <li>
          <button 
            class="category-btn ${this.currentCategory === cat.id ? 'active' : ''}" 
            onclick="window.productsComponent.selectCategory('${cat.id}')"
          >
            <span>${cat.name}</span>
            <span class="category-badge">${count}</span>
          </button>
        </li>
      `;
    });

    el.innerHTML = html;
  }

  selectCategory(catId) {
    this.currentCategory = catId;
    window.location.hash = catId === 'all' ? '#/products' : `#/products?category=${catId}`;
  }

  onSortChange(sortVal) {
    this.currentSort = sortVal;
    this.applyFiltersAndSort();
  }

  clearFilters() {
    this.currentCategory = 'all';
    this.searchQuery = '';
    window.location.hash = '#/products';
  }

  applyFiltersAndSort() {
    let prods = [...this.allProducts];

    // Filter by Category
    if (this.currentCategory && this.currentCategory !== 'all') {
      prods = prods.filter(p => p.categoryId === this.currentCategory);
      const cat = this.categories.find(c => c.id === this.currentCategory);
      document.getElementById('catalog-title').innerText = cat ? cat.name : 'Products';
      document.getElementById('breadcrumb-category').innerText = cat ? ` > ${cat.name}` : '';
    } else {
      document.getElementById('catalog-title').innerText = this.searchQuery ? `Search Results for "${this.searchQuery}"` : 'All Products';
      document.getElementById('breadcrumb-category').innerText = '';
    }

    // Filter by Search Query
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase().trim();
      prods = prods.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        (p.specs && Object.values(p.specs).some(v => v.toLowerCase().includes(q)))
      );
    }

    // Sort
    if (this.currentSort === 'price-low') {
      prods.sort((a, b) => this.extractPrice(a.price) - this.extractPrice(b.price));
    } else if (this.currentSort === 'price-high') {
      prods.sort((a, b) => this.extractPrice(b.price) - this.extractPrice(a.price));
    } else if (this.currentSort === 'title-asc') {
      prods.sort((a, b) => a.title.localeCompare(b.title));
    }

    this.filteredProducts = prods;
    this.renderProducts();
  }

  extractPrice(priceStr) {
    const match = priceStr.match(/₹\s*([0-9]+)/);
    return match ? parseInt(match[1], 10) : 9999;
  }

  renderProducts() {
    const gridEl = document.getElementById('catalog-products-grid');
    const emptyEl = document.getElementById('no-products-view');
    const countEl = document.getElementById('catalog-count-text');

    if (!gridEl || !emptyEl) return;

    countEl.innerText = `Showing ${this.filteredProducts.length} product${this.filteredProducts.length === 1 ? '' : 's'}`;

    if (this.filteredProducts.length === 0) {
      gridEl.innerHTML = '';
      emptyEl.classList.remove('d-none');
      return;
    }

    emptyEl.classList.add('d-none');

    gridEl.innerHTML = this.filteredProducts.map(p => `
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
            ${p.specs.Material ? `<div class="spec-row"><span class="spec-key">Material:</span> <span class="spec-val">${p.specs.Material}</span></div>` : ''}
          </div>

          <div class="prod-actions">
            <button class="btn btn-outline-secondary btn-sm" onclick="window.productsComponent.viewProductDetails('${p.id}')">
              Details
            </button>
            <button class="btn btn-primary btn-sm" onclick="window.productsComponent.requestQuote('${p.id}')">
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

window.productsComponent = new ProductsComponent();
