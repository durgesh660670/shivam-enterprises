/**
 * AppComponent
 * Root Angular Component Controller
 */
class AppComponent {
  constructor() {
    this.title = 'Shivam Enterprises';
  }

  ngOnInit() {
    console.log('Shivam Enterprises Angular App Initialized');
  }
}

window.appComponent = new AppComponent();
