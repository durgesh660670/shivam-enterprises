/**
 * ProductService
 * Angular-style injectable service managing catalog, categories, specifications and company details.
 */
class ProductService {
  constructor() {
    this._data = null;
    this._initialized = false;
  }

  async init() {
    if (this._initialized) return this._data;
    try {
      // First try fetching the JSON file if served via HTTP
      const res = await fetch('assets/data/products.json');
      if (res.ok) {
        this._data = await res.json();
      }
    } catch (e) {
      // Fallback if opened via file:// protocol
      console.warn('Fetch failed (likely file:// protocol), using embedded catalog data', e);
    }

    if (!this._data && window.__SHIVAM_DATA__) {
      this._data = window.__SHIVAM_DATA__;
    }

    this._initialized = true;
    return this._data;
  }

  async getCompanyInfo() {
    await this.init();
    return this._data?.company || {};
  }

  async getCategories() {
    await this.init();
    return this._data?.categories || [];
  }

  async getCategoryById(id) {
    await this.init();
    return this._data?.categories?.find(c => c.id === id) || null;
  }

  async getProducts(categoryId = null, query = null) {
    await this.init();
    let prods = this._data?.products || [];

    if (categoryId && categoryId !== 'all') {
      prods = prods.filter(p => p.categoryId === categoryId);
    }

    if (query && query.trim()) {
      const q = query.toLowerCase().trim();
      prods = prods.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        (p.specs && Object.values(p.specs).some(v => v.toLowerCase().includes(q)))
      );
    }

    return prods;
  }

  async getProductById(id) {
    await this.init();
    return this._data?.products?.find(p => p.id === id) || null;
  }

  async getFeaturedProducts(limit = 8) {
    await this.init();
    return (this._data?.products || []).slice(0, limit);
  }

  async getTestimonials() {
    await this.init();
    return this._data?.testimonials || [];
  }
}

// Export singleton instance
window.productService = new ProductService();
