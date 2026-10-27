/**
 * AboutComponent
 * Angular Component Controller for About page
 */
class AboutComponent {
  constructor() {
    this.company = null;
  }

  async ngOnInit() {
    this.company = await window.productService.getCompanyInfo();
  }
}

window.aboutComponent = new AboutComponent();
