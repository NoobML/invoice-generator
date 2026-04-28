# 🧾 Invoice Generator

A simple, fully client-side invoice maker built with plain HTML, CSS, and JavaScript.  
Create professional invoices, preview them in real time, and print or save as PDF – all without any backend or dependencies.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen)

---

## 📸 Demo Screenshots

Since a full invoice may not fit in one screenshot, here are two parts of a generated invoice:

**Invoice Preview – Part 1**  
![Invoice Part 1](images/invoice-part1.png)

**Invoice Preview – Part 2**  
![Invoice Part 2](images/invoice-part2.png)

*To add your own screenshots, place them inside an `images/` folder and adjust the paths above.*

---

## ✨ Features

- 🧾 **Complete Invoice Form** – Fill in your company details, client info, line items, discounts, taxes, and notes.
- 📊 **Live Calculation** – Subtotal, discount, tax, and total update instantly as you type.
- ➕ **Dynamic Items** – Add or remove items with a single click; each row calculates its own amount.
- 🖨️ **Print-Ready Layout** – A polished invoice layout with print‑friendly CSS; use your browser to save as PDF.
- 💾 **Offline First** – Works entirely in the browser, no internet connection required.
- 📱 **Responsive** – Usable on desktops, tablets, and phones.
- 🎨 **Clean, Modern UI** – Soft colors, clear typography, and a professional look.

---

## 📁 Project Structure

```
invoice-generator/
├── index.html
├── style.css
├── script.js
├── README.md
└── images/
    ├── invoice-part1.png
    └── invoice-part2.png
```


---

## 🚀 Getting Started

1. **Download or clone** this repository:

   ```bash
   git clone https://github.com/NoobML/invoice-generator.git
   ```

2. Open `index.html` in any modern web browser (Chrome, Firefox, Edge, Safari).

3. Fill in the form and generate your invoice.

**No server, build tool, or installation required.**

---

## 🧠 Usage Guide

### 1. Enter Your Company & Client Information
- Fill in the **From** section with your company’s name, email, phone, and address.  
- Enter the client’s details in the **Bill To** section.

### 2. Add Invoice Items
- The default table has one empty row.  
- Click **+ Add Item** to add more rows.  

For each item, enter:
- Description (e.g., “Website Design”)  
- Quantity (default 1)  
- Rate (unit price in dollars)  

- The **Amount** column auto-calculates as `Quantity × Rate`.  
- Remove any row using the ✕ button.

### 3. Adjust Discount & Tax
- Set the **Discount (%)** and **Tax (%)**.  
- Discount is subtracted from the subtotal, then tax is applied on the remaining amount.

### 4. Add Notes (Optional)
- Use the **Notes / Terms** field for payment instructions, thank-you messages, etc.

### 5. Generate & Preview
- Click **Generate Invoice** to see a live preview below the form.  
- All totals are recalculated from the current form values.

### 6. Print or Save as PDF
- Click **Print / Save PDF**.  
- In the browser’s print dialog, choose **Save as PDF** as the destination.  
- Adjust margins and scaling if necessary (optimized for A4/US Letter).

### 7. Reset
- Click **Reset** to clear all fields and start over.  
- A confirmation dialog will appear.

---

## 🖨️ Printing Tips

- Uses a `@media print` block to hide the form and show only the invoice preview.  
- Enable **“Background graphics”** in print settings for best results.  
- Multi-page invoices are handled automatically by the browser.

---

## 🎨 Customization

You can easily tweak the design:

- **Colours:** Edit `:root` variables in `style.css` (e.g., `--primary: #2563eb`)  
- **Font:** Change `font-family` in the `body` selector  
- **Logo:** Add an `<img>` tag inside invoice preview (`script.js → generateInvoiceHTML()`)  
- **Terms:** Modify the default message or add static content  

---

## 📚 Technical Details

- No frameworks — Pure **HTML5, CSS3, JavaScript**  
- Event-driven UI — Instant recalculation & preview updates  
- HTML escaping — Prevents XSS from user input  
- Print styles — Injected dynamically into `<head>`  

---

## 🌐 Browser Support

Works on modern browsers:

- Chrome ≥ 60  
- Firefox ≥ 55  
- Safari ≥ 11  
- Edge ≥ 79  

---

## 🤝 Contributing

Contributions are welcome:

1. Fork the project  
2. Create a branch  
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. Commit changes  
   ```bash
   git commit -m "Add amazing feature"
   ```
4. Push to GitHub  
   ```bash
   git push origin feature/amazing-feature
   ```
5. Open a Pull Request  

---

## 📝 License

This project is **MIT licensed**.  
Free to use, modify, and distribute.

---

## 🙏 Acknowledgements

- Inspired by the need for a quick offline invoicing tool  
- Built for freelancers and small businesses  
