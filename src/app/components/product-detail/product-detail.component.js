/**
 * ProductDetailComponent
 * Angular Component Controller for Detailed Product Modal
 */
class ProductDetailComponent {
  constructor() {
    this.currentProduct = null;
    this.initSubscription();
  }

  initSubscription() {
    window.enquiryService.subscribe(state => {
      const modalEl = document.getElementById('product-detail-modal');
      if (!modalEl) return;

      if (state.detailModal.isOpen && state.detailModal.product) {
        this.currentProduct = state.detailModal.product;
        this.renderModal(this.currentProduct);
        modalEl.classList.add('active');
      } else {
        modalEl.classList.remove('active');
      }
    });
  }

  renderModal(p) {
    document.getElementById('detail-product-title').innerText = p.title;
    document.getElementById('detail-product-price').innerText = p.price;
    document.getElementById('detail-product-category').innerText = p.categoryName;
    document.getElementById('detail-product-img').src = p.localImage || p.imageUrl;
    document.getElementById('detail-product-img').alt = p.title;

    const specsTable = document.getElementById('detail-specs-body');
    if (p.specs && Object.keys(p.specs).length > 0) {
      specsTable.innerHTML = Object.entries(p.specs).map(([key, val]) => `
        <tr>
          <td>${key}</td>
          <td>${val}</td>
        </tr>
      `).join('');
    } else {
      specsTable.innerHTML = '<tr><td colspan="2">Standard manufacturer specifications apply</td></tr>';
    }

    const descEl = document.getElementById('detail-product-desc');
    if (p.description) {
      descEl.innerText = p.description;
      document.getElementById('detail-product-desc-box').style.display = 'block';
    } else {
      document.getElementById('detail-product-desc-box').style.display = 'none';
    }
  }

  onRequestQuote() {
    window.enquiryService.closeDetailModal();
    if (this.currentProduct) {
      window.enquiryService.openEnquiryModal(this.currentProduct);
    }
  }
}

window.productDetailComponent = new ProductDetailComponent();
