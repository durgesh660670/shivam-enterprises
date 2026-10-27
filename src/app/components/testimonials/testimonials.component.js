/**
 * TestimonialsComponent
 * Angular Component Controller for Testimonials
 */
class TestimonialsComponent {
  constructor() {
    this.testimonials = [];
  }

  async ngOnInit() {
    this.testimonials = await window.productService.getTestimonials();
    this.renderTestimonials();
  }

  renderTestimonials() {
    const el = document.getElementById('testimonials-grid');
    if (!el) return;

    el.innerHTML = this.testimonials.map(t => `
      <div class="testimonial-card">
        <div class="testimonial-header">
          <div class="testimonial-user">
            <div class="user-avatar">${t.name.charAt(0)}</div>
            <div>
              <div class="user-name">${t.name}</div>
              <div class="user-location">${t.location}</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="color: #f59e0b; font-size: 1.1rem;">
              ${'&#9733;'.repeat(t.rating)}${'&#9734;'.repeat(5 - t.rating)}
            </div>
            <div style="font-size: 0.75rem; color: var(--gray-400); margin-top: 2px;">${t.date}</div>
          </div>
        </div>

        <div class="review-product-tag">Product: <strong>${t.product}</strong></div>
        <p style="font-size: 0.92rem; color: var(--gray-700); line-height: 1.6; margin: 0;">
          "${t.comment}"
        </p>
      </div>
    `).join('');
  }
}

window.testimonialsComponent = new TestimonialsComponent();
