/**
 * EnquiryService
 * Angular-style injectable service managing modal dialogs, quote requests, and user notifications.
 */
class EnquiryService {
  constructor() {
    this._listeners = [];
    this._modalState = {
      isOpen: false,
      product: null
    };
    this._detailModalState = {
      isOpen: false,
      product: null
    };
  }

  subscribe(callback) {
    this._listeners.push(callback);
    return () => {
      this._listeners = this._listeners.filter(cb => cb !== callback);
    };
  }

  _notify() {
    this._listeners.forEach(cb => cb({
      enquiryModal: this._modalState,
      detailModal: this._detailModalState
    }));
  }

  openEnquiryModal(product = null) {
    this._modalState = {
      isOpen: true,
      product: product
    };
    this._notify();
  }

  closeEnquiryModal() {
    this._modalState = {
      isOpen: false,
      product: null
    };
    this._notify();
  }

  openDetailModal(product) {
    this._detailModalState = {
      isOpen: true,
      product: product
    };
    this._notify();
  }

  closeDetailModal() {
    this._detailModalState = {
      isOpen: false,
      product: null
    };
    this._notify();
  }

  submitEnquiry(data) {
    console.log('Inquiry submitted:', data);
    this.closeEnquiryModal();
    this.showToast(`Thank you ${data.name || ''}! Your requirement has been sent to Shivam Enterprises. We will contact you at ${data.phone}.`, 'success');
  }

  showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      <div>${message}</div>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }
}

// Export singleton instance
window.enquiryService = new EnquiryService();
