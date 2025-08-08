<script setup>
import { reactive, ref, onMounted, toRaw } from "vue";

// Reactive order object
const order = reactive({
  customer_id: "",
  order_date: "",
  order_total: 0,
  status_id: 1,
  paid_amount: 0,
  remarks: "",
  items: [],
  customers: [],
  products: [],
});

// Reactive new item for adding to the order
const newItem = reactive({
  product_id: "",
  qty: 1,
  rate: 0,
  vat: 0,
});

// Fetch customers and products on mount
onMounted(async () => {
  try {
    const [resCustomers, resProducts] = await Promise.all([
      fetch(
        "http://razib.intelsofts.com/projects/laravel/update_mex/public/api/customers"
      ),
      fetch(
        "http://razib.intelsofts.com/projects/laravel/update_mex/public/api/products"
      ),
    ]);

    const customerData = await resCustomers.json();
    const productData = await resProducts.json();

    order.customers = customerData.customers || [];
    order.products = productData.products || [];
  } catch (error) {
    console.error("Error fetching customers or products:", error);
  }
});

// When product changes, update rate & vat
const updateNewItemDetails = () => {
  const product = order.products.find((p) => p.id === newItem.product_id);
  if (product) {
    newItem.rate = product.price || 0;
    newItem.vat = product.vat || 0;
  }
};

// Add item to order.items
const addItem = () => {
  if (!newItem.product_id) return alert("Select a product first");

  const selectedProduct = order.products.find(
    (p) => p.id === newItem.product_id
  );
  if (!selectedProduct) return;

  order.items.push({
    product_id: newItem.product_id,
    product_name: selectedProduct.name,
    qty: newItem.qty,
    rate: newItem.rate,
    vat: newItem.vat,
  });

  // Reset newItem
  newItem.product_id = "";
  newItem.qty = 1;
  newItem.rate = 0;
  newItem.vat = 0;

  updateTotal();
};

// Calculate total
const updateTotal = () => {
  order.order_total = order.items.reduce((sum, item) => {
    return sum + item.qty * item.rate + item.vat;
  }, 0);

  order.paid_amount = order.order_total;
};

// Remove item from order
const removeItem = (index) => {
  order.items.splice(index, 1);
  updateTotal();
};

// Submit the order
const submitOrder = async () => {
  if (!order.customer_id) return alert("Please select a customer");
  if (!order.order_date) return alert("Please select an order date");
  if (order.items.length === 0) return alert("Please add at least one item");

  try {
    const response = await fetch(
      "http://razib.intelsofts.com/projects/laravel/update_mex/public/api/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(toRaw(order)),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    alert("Order submitted successfully!");
    console.log("Order submitted successfully:", result);

    // Reset order after successful submission
    order.customer_id = "";
    order.order_date = "";
    order.order_total = 0;
    order.paid_amount = 0;
    order.status_id = 1;
    order.remarks = "";
    order.items = [];
  } catch (error) {
    console.error("Error submitting order:", error);
    alert("Failed to submit order.");
  }
};
</script>

<template>
  <div class="page-container">
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

    <main
      class="main-section flex-grow-1 position-relative text-white d-flex flex-column"
    >
      <div class="overlay"></div>
      <div class="container py-5 position-relative z-2">
        <h2 class="mb-4">Create Order</h2>

        <form @submit.prevent="submitOrder" class="order-form">
          <div class="mb-3">
            <label for="customer" class="form-label">Customer</label>
            <select
              id="customer"
              v-model="order.customer_id"
              class="form-select"
              required
            >
              <option value="" disabled>Select customer</option>
              <option
                v-for="customer in order.customers"
                :key="customer.id"
                :value="customer.id"
              >
                {{ customer.name }}
              </option>
            </select>
          </div>

          <div class="mb-3">
            <label for="order_date" class="form-label">Order Date</label>
            <input
              type="date"
              id="order_date"
              v-model="order.order_date"
              class="form-control"
              required
            />
          </div>

          <div class="mb-3">
            <label for="remarks" class="form-label">Remarks</label>
            <textarea
              id="remarks"
              v-model="order.remarks"
              class="form-control"
              rows="2"
            ></textarea>
          </div>

          <hr />

          <h4>Add Items</h4>
          <div class="row g-3 align-items-end">
            <div class="col-md-4">
              <label for="product" class="form-label">Product</label>
              <select
                id="product"
                v-model="newItem.product_id"
                @change="updateNewItemDetails"
                class="form-select"
              >
                <option value="" disabled>Select product</option>
                <option
                  v-for="product in order.products"
                  :key="product.id"
                  :value="product.id"
                >
                  {{ product.name }}
                </option>
              </select>
            </div>

            <div class="col-md-2">
              <label for="qty" class="form-label">Quantity</label>
              <input
                type="number"
                id="qty"
                v-model.number="newItem.qty"
                min="1"
                class="form-control"
              />
            </div>

            <div class="col-md-2">
              <label for="rate" class="form-label">Rate</label>
              <input
                type="number"
                id="rate"
                v-model.number="newItem.rate"
                class="form-control"
                readonly
              />
            </div>

            <div class="col-md-2">
              <label for="vat" class="form-label">VAT</label>
              <input
                type="number"
                id="vat"
                v-model.number="newItem.vat"
                class="form-control"
                readonly
              />
            </div>

            <div class="col-md-2">
              <button
                type="button"
                class="btn btn-success w-100"
                @click="addItem"
              >
                Add Item
              </button>
            </div>
          </div>

          <hr />

          <h4>Order Items</h4>
          <div v-if="order.items.length === 0" class="text-white mb-3">
            No items added yet.
          </div>
          <table
            v-else
            class="table table-bordered table-hover table-custom text-center"
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>VAT</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in order.items" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item.product_name }}</td>
                <td>{{ item.qty }}</td>
                <td>{{ item.rate.toFixed(2) }}</td>
                <td>{{ item.vat.toFixed(2) }}</td>
                <td>{{ (item.qty * item.rate + item.vat).toFixed(2) }}</td>
                <td>
                  <button
                    class="btn btn-sm btn-danger"
                    @click.prevent="removeItem(index)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="text-end mt-3 mb-4">
            <h5>Total: {{ order.order_total.toFixed(2) }}</h5>
          </div>

          <button type="submit" class="btn btn-primary w-100">
            Submit Order
          </button>
        </form>
      </div>
    </main>

    <footer class="footer bg-dark text-center text-white py-3 mt-auto">
      &copy; 2025 Money Exchange Ltd. All rights reserved.
    </footer>
  </div>
</template>

<style scoped>
/* Layout */
.page-container {
  background-color: #ffffff;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1300px;
  margin: 30px auto 0;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

/* Topbar */
.topbar .logo {
  height: 100px;
  object-fit: contain;
}

/* Background */
.main-section {
  background-image: url("/img/background.webp");
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(125, 116, 116, 0.4);
  z-index: 1;
}

.z-2 {
  position: relative;
  z-index: 2;
}

/* Table */
.table-custom {
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
}

.table-custom thead {
  background-color: rgba(0, 0, 0, 0.7);
  color: #ffffff;
}

.table-custom thead th {
  border-color: rgba(255, 255, 255, 0.3);
  font-weight: 600;
}

.table-custom tbody td,
.table-custom tbody th {
  background-color: transparent !important;
  color: #ffff;
  border-color: #ffff;
}

.table-custom tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Buttons */
.btn-info {
  background-color: #17a2b8;
  border: none;
}
.btn-info:hover {
  background-color: #138496;
  color: #fff;
}
.btn-warning {
  background-color: #ffc107;
  border: none;
  color: #212529;
}
.btn-warning:hover {
  background-color: #e0a800;
}
.btn-danger {
  background-color: #dc3545;
  border: none;
}
.btn-danger:hover {
  background-color: #bd2130;
}

/* Pagination */
.pagination .page-link {
  color: #000;
  cursor: pointer;
}
.pagination .active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
  color: white;
}

/* Footer */
.footer {
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 576px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .topbar h4 {
    font-size: 1rem;
  }

  .topbar .text-end {
    font-size: 0.75rem;
  }
}

/* Form */
.order-form label {
  color: #fff;
  font-weight: 600;
}

.order-form .form-control,
.order-form .form-select,
.order-form textarea {
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.order-form .form-control:focus,
.order-form .form-select:focus,
.order-form textarea:focus {
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-color: #17a2b8;
  outline: none;
}

.order-form button.btn-primary {
  background-color: #0d6efd;
  border: none;
  font-weight: 600;
}
.order-form button.btn-primary:hover {
  background-color: #084cd3;
}
</style>
