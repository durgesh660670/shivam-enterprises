/**
 * EnquiryModalComponent
 * Angular Component Controller for Enquiry Modal
 */
class EnquiryModalComponent {
  constructor() {
    this.currentProduct = null;
    this.initSubscription();
  }

  initSubscription() {
    window.enquiryService.subscribe(state => {
      const modalEl = document.getElementById('enquiry-modal');
      const previewEl = document.getElementById('modal-product-preview');
      if (!modalEl) return;

      if (state.enquiryModal.isOpen) {
        this.currentProduct = state.enquiryModal.product;
        if (this.currentProduct) {
          previewEl.classList.remove('d-none');
          document.getElementById('modal-product-name').innerText = this.currentProduct.title;
          document.getElementById('modal-product-price').innerText = this.currentProduct.price;
          document.getElementById('modal-product-img').src = this.currentProduct.localImage || this.currentProduct.imageUrl;
        } else {
          previewEl.classList.add('d-none');
        }
        modalEl.classList.add('active');
      } else {
        modalEl.classList.remove('active');
      }
    });
  }

  onSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('modal-name').value.trim();
    const phone = document.getElementById('modal-phone').value.trim();
    const email = document.getElementById('modal-email').value.trim();
    const quantity = document.getElementById('modal-quantity').value.trim();
    const notes = document.getElementById('modal-notes').value.trim();

    window.enquiryService.submitEnquiry({
      product: this.currentProduct ? this.currentProduct.title : 'General Wholesale',
      name,
      phone,
      email,
      quantity,
      notes
    });

    document.getElementById('enquiry-form').reset();
  }
}

window.enquiryModalComponent = new EnquiryModalComponent();
