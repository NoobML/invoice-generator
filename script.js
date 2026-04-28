// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
  // References
  const itemsBody = document.getElementById('itemsBody');
  const addItemBtn = document.getElementById('addItemBtn');
  const generateBtn = document.getElementById('generateBtn');
  const printBtn = document.getElementById('printBtn');
  const resetBtn = document.getElementById('resetBtn');
  const invoicePreview = document.getElementById('invoicePreview');

  const discountInput = document.getElementById('discount');
  const taxInput = document.getElementById('tax');
  const subtotalEl = document.getElementById('subtotal');
  const discountAmountEl = document.getElementById('discountAmount');
  const taxAmountEl = document.getElementById('taxAmount');
  const totalEl = document.getElementById('total');

  // Add a new item row
  function addItemRow(description = '', quantity = 1, rate = 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" class="item-desc" value="${description}" placeholder="Item description"></td>
      <td><input type="number" class="item-qty" value="${quantity}" min="1" step="any"></td>
      <td><input type="number" class="item-rate" value="${rate}" min="0" step="0.01"></td>
      <td class="item-amount">$0.00</td>
      <td><button type="button" class="remove-item-btn" title="Remove item">✕</button></td>
    `;
    itemsBody.appendChild(tr);
    attachRowEvents(tr);
    calculateTotals();
  }

  // Attach events to inputs and remove button in a row
  function attachRowEvents(row) {
    const qtyInput = row.querySelector('.item-qty');
    const rateInput = row.querySelector('.item-rate');
    const removeBtn = row.querySelector('.remove-item-btn');

    const updateRowAmount = () => {
      const qty = parseFloat(qtyInput.value) || 0;
      const rate = parseFloat(rateInput.value) || 0;
      const amount = qty * rate;
      const amountCell = row.querySelector('.item-amount');
      amountCell.textContent = '$' + amount.toFixed(2);
      calculateTotals();
    };

    qtyInput.addEventListener('input', updateRowAmount);
    rateInput.addEventListener('input', updateRowAmount);

    removeBtn.addEventListener('click', () => {
      row.remove();
      calculateTotals();
    });

    // initial calculation
    updateRowAmount();
  }

  // Calculate subtotal, discount, tax, total
  function calculateTotals() {
    const rows = itemsBody.querySelectorAll('tr');
    let subtotal = 0;
    rows.forEach(row => {
      const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
      const rate = parseFloat(row.querySelector('.item-rate').value) || 0;
      subtotal += qty * rate;
    });

    const discountPercent = parseFloat(discountInput.value) || 0;
    const taxPercent = parseFloat(taxInput.value) || 0;

    const discountAmount = subtotal * (discountPercent / 100);
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = taxableAmount * (taxPercent / 100);
    const total = taxableAmount + taxAmount;

    subtotalEl.textContent = subtotal.toFixed(2);
    discountAmountEl.textContent = discountAmount.toFixed(2);
    taxAmountEl.textContent = taxAmount.toFixed(2);
    totalEl.textContent = total.toFixed(2);
  }

  // Listen for discount/tax changes
  discountInput.addEventListener('input', calculateTotals);
  taxInput.addEventListener('input', calculateTotals);

  // Generate invoice preview HTML
  function generateInvoiceHTML() {
    const invoiceNumber = document.getElementById('invoiceNumber').value || 'INV-000';
    const invoiceDate = document.getElementById('invoiceDate').value || new Date().toISOString().slice(0,10);
    const dueDate = document.getElementById('dueDate').value || '';
    const fromName = document.getElementById('fromName').value || 'Your Company';
    const fromEmail = document.getElementById('fromEmail').value || '';
    const fromPhone = document.getElementById('fromPhone').value || '';
    const fromAddress = document.getElementById('fromAddress').value || '';
    const toName = document.getElementById('toName').value || 'Client Name';
    const toEmail = document.getElementById('toEmail').value || '';
    const toPhone = document.getElementById('toPhone').value || '';
    const toAddress = document.getElementById('toAddress').value || '';
    const notes = document.getElementById('notes').value || '';

    // Items
    const rows = itemsBody.querySelectorAll('tr');
    let itemsHTML = '';
    let subtotal = 0, discountAmount = 0, taxAmount = 0, total = 0;

    rows.forEach(row => {
      const desc = row.querySelector('.item-desc').value || 'Item';
      const qty = parseFloat(row.querySelector('.item-qty').value) || 0;
      const rate = parseFloat(row.querySelector('.item-rate').value) || 0;
      const amount = qty * rate;
      itemsHTML += `
        <tr>
          <td>${escapeHTML(desc)}</td>
          <td class="center">${qty}</td>
          <td class="center">$${rate.toFixed(2)}</td>
          <td class="right">$${amount.toFixed(2)}</td>
        </tr>`;
      subtotal += amount;
    });

    const discountPercent = parseFloat(discountInput.value) || 0;
    const taxPercent = parseFloat(taxInput.value) || 0;
    discountAmount = subtotal * (discountPercent / 100);
    const taxableAmount = subtotal - discountAmount;
    taxAmount = taxableAmount * (taxPercent / 100);
    total = taxableAmount + taxAmount;

    // Build invoice HTML
    return `
      <div class="invoice-header">
        <h1>INVOICE</h1>
        <div class="invoice-meta">
          <p><strong>Invoice #:</strong> ${invoiceNumber}</p>
          <p><strong>Date:</strong> ${invoiceDate}</p>
          ${dueDate ? `<p><strong>Due Date:</strong> ${dueDate}</p>` : ''}
        </div>
      </div>

      <div class="invoice-addresses">
        <div class="from">
          <h3>From:</h3>
          <p><strong>${escapeHTML(fromName)}</strong></p>
          <p>${escapeHTML(fromAddress)}</p>
          <p>Email: ${escapeHTML(fromEmail)}</p>
          <p>Phone: ${escapeHTML(fromPhone)}</p>
        </div>
        <div class="to">
          <h3>Bill To:</h3>
          <p><strong>${escapeHTML(toName)}</strong></p>
          <p>${escapeHTML(toAddress)}</p>
          <p>Email: ${escapeHTML(toEmail)}</p>
          <p>Phone: ${escapeHTML(toPhone)}</p>
        </div>
      </div>

      <table class="invoice-table">
        <thead>
          <tr>
            <th>Description</th>
            <th class="center">Qty</th>
            <th class="center">Rate</th>
            <th class="right">Amount</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHTML}
        </tbody>
      </table>

      <div class="invoice-totals">
        <table class="totals-table">
          <tr>
            <td>Subtotal</td>
            <td class="right">$${subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Discount (${discountPercent}%)</td>
            <td class="right">-$${discountAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Tax (${taxPercent}%)</td>
            <td class="right">$${taxAmount.toFixed(2)}</td>
          </tr>
          <tr class="total-row">
            <td><strong>Total</strong></td>
            <td class="right"><strong>$${total.toFixed(2)}</strong></td>
          </tr>
        </table>
      </div>

      <div class="invoice-notes">
        ${notes ? `<p><strong>Notes:</strong> ${escapeHTML(notes)}</p>` : ''}
        <p>Thank you for your business!</p>
      </div>
    `;
  }

  // Essential HTML escaping
  function escapeHTML(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  // Show preview
  generateBtn.addEventListener('click', () => {
    const invoiceHTML = generateInvoiceHTML();
    invoicePreview.innerHTML = invoiceHTML;
    invoicePreview.style.display = 'block';
    // Scroll to preview
    invoicePreview.scrollIntoView({ behavior: 'smooth' });
  });

  // Print (or save as PDF via browser print)
  printBtn.addEventListener('click', () => {
    // Ensure preview is up to date
    if (invoicePreview.style.display === 'none' || !invoicePreview.innerHTML) {
      generateBtn.click(); // generate first
    }
    window.print();
  });

  // Reset form
  resetBtn.addEventListener('click', () => {
    if (confirm('Clear all fields?')) {
      document.querySelectorAll('input:not([type="button"]), textarea').forEach(el => el.value = '');
      itemsBody.innerHTML = '';
      addItemRow(); // start with one empty row
      calculateTotals();
      invoicePreview.style.display = 'none';
    }
  });

  // Add item row
  addItemBtn.addEventListener('click', () => addItemRow());

  // Initial rows – start with one empty item
  addItemRow();
  calculateTotals();

  // Extra styles for printed invoice (inject into head or use inline)
  const printStyles = document.createElement('style');
  printStyles.textContent = `
    .invoice-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
    .invoice-header h1 { color: #2563eb; font-size: 2em; margin: 0; }
    .invoice-meta { text-align: right; }
    .invoice-addresses { display: flex; justify-content: space-between; margin-bottom: 20px; }
    .invoice-addresses div { flex: 1; }
    .to { text-align: right; }
    .invoice-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    .invoice-table th { background: #f9fafb; }
    .center { text-align: center; }
    .right { text-align: right; }
    .totals-table { margin-left: auto; width: 250px; }
    .totals-table td { padding: 4px 0; }
    .total-row { border-top: 2px solid #000; }
    .invoice-notes { margin-top: 30px; font-style: italic; }
  `;
  document.head.appendChild(printStyles);
});