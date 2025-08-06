<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const message = ref("");

const customers = ref([]);
const invoice = ref({
  customer_id: "",
  invoice_date: "",
  total_amount: 0,
  status: "",
  items: [],
});

const newItem = ref({
  description: "",
  qty: 0,
  rate: 0,
  vat: 0,
});

function addItem() {
  if (
    !newItem.value.description ||
    newItem.value.qty <= 0 ||
    newItem.value.rate <= 0
  ) {
    alert("Please fill valid item details.");
    return;
  }

  const total =
    newItem.value.qty * newItem.value.rate +
    (newItem.value.qty * newItem.value.rate * newItem.value.vat) / 100;

  invoice.value.items.push({
    description: newItem.value.description,
    qty: newItem.value.qty,
    rate: newItem.value.rate,
    vat: newItem.value.vat,
    total_amount: total,
  });

  newItem.value = { description: "", qty: 0, rate: 0, vat: 0 };
  updateTotalAmount();
}

function removeItem(index) {
  invoice.value.items.splice(index, 1);
  updateTotalAmount();
}

function updateTotalAmount() {
  invoice.value.total_amount = invoice.value.items.reduce(
    (sum, item) => sum + item.total_amount,
    0
  );
}

async function submitInvoice() {
  if (
    !invoice.value.customer_id ||
    !invoice.value.invoice_date ||
    invoice.value.items.length === 0
  ) {
    alert("Please fill all required fields and add at least one item.");
    return;
  }

  try {
    const response = await fetch(
      "http://razib.intelsofts.com/projects/laravel/update_mex/public/api/invoices",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(invoice.value),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    await response.json();
    message.value = "Invoice created successfully!";
    router.push("/invoices");
  } catch (error) {
    message.value = "Error creating invoice: " + error.message;
  }
}

async function fetchCustomers() {
  try {
    const res = await fetch(
      "http://razib.intelsofts.com/projects/laravel/update_mex/public/api/customers"
    );
    if (res.ok) customers.value = await res.json();
  } catch {}
}

onMounted(() => {
  fetchCustomers();
});
</script>

<template>
  <div class="page-container d-flex flex-column min-vh-100">
    <!-- Topbar -->
    <header
      class="topbar bg-info text-dark py-3 px-4 d-flex justify-content-between align-items-center"
    >
      <div class="d-flex align-items-center gap-3">
        <img src="/img/logo.webp" alt="Logo" class="logo" />
      </div>
      <div class="text-end small">
        <h3 class="mb-0">Money Exchange Ltd.</h3>
        <div>123 Gulshan Avenue, Dhaka</div>
        <div>Email: info@moneyexchange.com | Phone: +880 123456789</div>
      </div>
    </header>

    <!-- Main Section -->
    <main
      class="main-section flex-grow-1 position-relative text-white d-flex flex-column align-items-center"
    >
      <div class="overlay"></div>

      <div class="content-section z-2">
        <!-- Invoice Info -->
        <section class="section-box">
          <h2 style="display: flex; justify-content: center">Create Invoice</h2>
          <div>
            <label>Customer:</label>
            <select v-model="invoice.customer_id" required>
              <option value="" disabled>Select customer</option>
              <option
                v-for="customer in customers"
                :key="customer.id"
                :value="customer.id"
              >
                {{ customer.name }}
              </option>
            </select>
          </div>
          <div>
            <label>Invoice Date:</label>
            <input v-model="invoice.invoice_date" type="date" required />
          </div>
          <div>
            <label>Status:</label>
            <input v-model="invoice.status" type="text" placeholder="Status" />
          </div>
        </section>

        <!-- Add Items -->
        <section class="section-box">
          <h3 style="display: flex; justify-content: center">Add Items</h3>
          <div>
            <label>Description:</label
            ><input v-model="newItem.description" type="text" />
          </div>
          <div>
            <label>Quantity:</label
            ><input v-model.number="newItem.qty" type="number" min="1" />
          </div>
          <div>
            <label>Rate:</label
            ><input
              v-model.number="newItem.rate"
              type="number"
              min="0"
              step="0.01"
            />
          </div>
          <div>
            <label>VAT %:</label
            ><input
              v-model.number="newItem.vat"
              type="number"
              min="0"
              step="0.01"
            />
          </div>
          <button style="border-radius: 20px; margin-top: 5px" @click="addItem">
            ➕ Add Item
          </button>
        </section>

        <!-- Invoice Items -->
        <section class="section-box">
          <h4 style="display: flex; justify-content: center">Invoice Items</h4>
          <table>
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>VAT %</th>
                <th>Total Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in invoice.items" :key="index">
                <td>{{ item.description }}</td>
                <td>{{ item.qty }}</td>
                <td>{{ item.rate.toFixed(2) }}</td>
                <td>{{ item.vat.toFixed(2) }}</td>
                <td>{{ item.total_amount.toFixed(2) }}</td>
                <td class="delete_btn">
                  <button @click="removeItem(index)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <strong>Total Amount:</strong> {{ invoice.total_amount.toFixed(2) }}
          </div>
          <button style="border-radius: 20px" @click="submitInvoice">
            ✅ Submit Invoice
          </button>
          <p class="success-message">{{ message }}</p>
        </section>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer bg-dark text-center text-white py-3 mt-auto">
      &copy; 2025 Money Exchange Ltd. All rights reserved.
    </footer>
  </div>
</template>

<style>
.page-container {
  background-color: #d8cbcb;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #fff;
  max-width: 1300px;
  margin: 30px auto 0;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
  border-radius: 20px;
}

/* Topbar */
.topbar .logo {
  height: 100px;
  object-fit: contain;
}

/* Background and overlay */
.main-section {
  background-image: url("/img/background.webp");
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
  padding: 40px 20px;
}

.main-section .overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(86, 83, 83, 0.8); /* deep opacity */
  z-index: 1;
}

.z-2 {
  position: relative;
  z-index: 2;
}

.content-section {
  max-width: 800px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* Section Box */
.section-box {
  background-color: rgba(255, 255, 255, 0.05); /* faint box */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(16, 15, 15, 0.05);
}

/* Inputs */
input,
select {
  width: 100%;
  padding: 8px;
  margin: 8px 0 16px 0;
  border-radius: 4px;
  border: none;
  background-color: #3a3939;
  color: #fff;
}

/* Buttons */
button {
  padding: 10px 20px;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #00a31e;
}
/* .delete_btn:hover {
  background-color: #a30000;
} */

/* Table */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
}

th,
td {
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px;
  text-align: center;
}

th {
  background-color: rgba(0, 0, 0, 0.5);
}

.success-message {
  color: #00ff88;
  margin-top: 10px;
  font-weight: bold;
}

/* Footer */
.footer {
  font-size: 14px;
}
</style>
