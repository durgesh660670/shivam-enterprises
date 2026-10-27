/**
 * ContactComponent
 * Angular Component Controller for Contact page
 */
class ContactComponent {
  constructor() {}

  async ngOnInit() {}

  onSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('contact-page-form');
    if (!form) return;

    const salutation = form.elements['salutation'].value;
    const name = document.getElementById('contact-name').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const product = document.getElementById('contact-product').value;
    const requirement = document.getElementById('contact-requirement').value.trim();

    window.enquiryService.submitEnquiry({
      name: `${salutation} ${name}`,
      phone,
      email,
      product,
      requirement
    });

    form.reset();
  }
}

window.contactComponent = new ContactComponent();
