# Shivam Enterprises - Angular Frontend Web Application

A pixel-perfect, modern clone of [https://www.shivambracup.com/](https://www.shivambracup.com/) (Shivam Enterprises, Mumbai - Leading Manufacturer & Wholesaler of Polyester Bra Cups, Cotton Bra Cups, Thermo Foam Bra Cups, and Lingerie Accessories).

This project is built using pure **HTML5** and **CSS3** structured strictly in accordance with **Angular Component Architecture**.

---

## 🌟 Features

- **Angular Component Structure**: Organized with individual `.component.html`, `.component.css`, and `.component.js` files for modular maintainability.
- **Client-Side SPA Routing**: Hash-based routing (`#/`, `#/products`, `#/about`, `#/testimonials`, `#/contact`) with reactive tab switching.
- **Dynamic Product Catalog**:
  - 13 verified products across all 7 categories:
    1. *Polyester Bra Cups* (Heavy Push Up Level 1, Level 2, Level 3, Lightly Padded)
    2. *Cotton Bra Cups* (Molded Round, Triangle, Classic Round)
    3. *Thermo Foam Bra Cup* (Round, Triangle)
    4. *Push Up Bra Cup* (Imported Push Up)
    5. *Underarms Sweat Pads* (Reusable Cotton)
    6. *Sports Bra Cups* (Beige Molded for Lingerie)
    7. *New Items* (Molded Beige Bra Cups)
- **Local Assets & Fallbacks**: High-resolution product images stored locally in `src/assets/images/` with fallback to CDN.
- **Interactive Search & Filter**: Real-time search across titles, categories, and technical specs (thickness, shape, material), plus price sorting.
- **Interactive Modals**:
  - **Product Detail Modal**: Full specification tables (shape, size, thickness, finishing, usage, padding level).
  - **Quick Quote Modal**: Direct inquiry form with preselected product context, quantity, contact info, and toast confirmation.
- **Authentic Shivam Enterprises Profile**: Complete factsheet including GSTIN (27AFAPV0007R1Z6), CEO Ashokkumar Mahabali Verma, Goregaon East Mumbai facility, ICICI bank verification, and verified customer testimonials from across India.

---

## 📁 Project Architecture

```
shivam/
├── angular.json                 # Angular project workspace configuration
├── package.json                 # Scripts and metadata
├── tsconfig.json                # TypeScript compiler config
├── README.md                    # Project documentation
├── index.html                   # Root entry launcher
├── styles.css                   # Root styles import
└── src/
    ├── index.html               # Main HTML host containing <app-root></app-root>
    ├── styles.css               # Global theme variables, reset & component styles
    ├── main.js                  # Application bootstrapper
    ├── templates.js             # Component templates registry
    ├── favicon.ico              # Shivam Enterprises branding icon
    ├── assets/
    │   ├── data/
    │   │   ├── products.json    # Complete catalog & company dataset
    │   │   └── catalog-data.js  # Offline/embedded dataset
    │   └── images/              # High quality downloaded product images & logos
    └── app/
        ├── app.component.html   # Root shell layout
        ├── app.component.css    # Scoped styles for app shell
        ├── app.component.js     # Root component controller
        ├── app.routes.js        # Angular client-side router
        ├── services/
        │   ├── product.service.js   # Catalog & data service
        │   └── enquiry.service.js   # Inquiry & notification service
        └── components/
            ├── header/          # Header with Trustseal, contact & search
            │   ├── header.component.html
            │   ├── header.component.css
            │   └── header.component.js
            ├── navbar/          # Sticky navigation with category mega-dropdown
            │   ├── navbar.component.html
            │   ├── navbar.component.css
            │   └── navbar.component.js
            ├── home/            # Hero, quick categories, featured products, factsheet
            │   ├── home.component.html
            │   ├── home.component.css
            │   └── home.component.js
            ├── products/        # Filterable catalog with sidebar and sorting
            │   ├── products.component.html
            │   ├── products.component.css
            │   └── products.component.js
            ├── product-detail/  # Detailed specifications popup
            │   ├── product-detail.component.html
            │   ├── product-detail.component.css
            │   └── product-detail.component.js
            ├── about/           # Company profile, factsheet, why us, infrastructure
            │   ├── about.component.html
            │   ├── about.component.css
            │   └── about.component.js
            ├── testimonials/    # Verified customer ratings & reviews
            │   ├── testimonials.component.html
            │   ├── testimonials.component.css
            │   └── testimonials.component.js
            ├── contact/         # Registered address, CEO details & quote form
            │   ├── contact.component.html
            │   ├── contact.component.css
            │   └── contact.component.js
            ├── enquiry-modal/   # Pop-up quotation modal
            │   ├── enquiry-modal.component.html
            │   ├── enquiry-modal.component.css
            │   └── enquiry-modal.component.js
            └── footer/          # Comprehensive footer with links & guarantees
                ├── footer.component.html
                ├── footer.component.css
                └── footer.component.js
```

---

## 🚀 How to Run the Project

### Option 1: Direct in Browser (No Server Required)
Simply double click `shivam/index.html` or `shivam/src/index.html` in Windows Explorer to open it in Chrome, Edge, Firefox, or any modern browser.

### Option 2: Using Node / NPM
In your terminal, navigate to the `shivam` folder and run:
```bash
cd D:\Test\shivam
npm start
```
This serves the project locally at `http://localhost:4200`.

### Option 3: Using Python or VS Code Live Server
```bash
cd D:\Test\shivam\src
npx serve . -p 8080
```
or open with the **Live Server** extension in VS Code.

---

## 🏢 Company Credentials Cloned

- **Company Name**: Shivam Enterprises
- **CEO / Proprietor**: Ashokkumar Mahabali Verma
- **Established**: 2017
- **GST Number**: `27AFAPV0007R1Z6`
- **Address**: Ashoknagar, Kama Estate, Walbhat Road, Near Mahanagar Gas Pump, Goregaon East, Mumbai - 400063, Maharashtra, India
- **Sales Hotline**: `07949323547` / `+91 7949323547` (89% Response Rate)
- **Primary Website**: [https://www.shivambracup.com/](https://www.shivambracup.com/)
