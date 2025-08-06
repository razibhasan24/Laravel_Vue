<script setup>
import { ref } from "vue";

const baseUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/money_stocks`;

const stock = ref({
  currency_id: "",
  qty: "",
  transaction_type: "",
  remarks: "",
  purchase_id: "",
  order_id: "",
  receipt_id: "",
});

const message = ref("");

async function submitStock() {
  const formData = new FormData();
  formData.append("currency_id", stock.value.currency_id);
  formData.append("qty", stock.value.qty);
  formData.append("transaction_type", stock.value.transaction_type);
  formData.append("remarks", stock.value.remarks);
  formData.append("purchase_id", stock.value.purchase_id);
  formData.append("order_id", stock.value.order_id);
  formData.append("receipt_id", stock.value.receipt_id);

  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    message.value = result.message || "Stock entry created successfully!";
  } catch (error) {
    message.value = "Error: " + error.message;
  }
}
</script>

<template>
  <div class="page-container d-flex flex-column min-vh-100">
    <!-- Topbar -->
    <header
      class="topbar bg-info text-dark d-flex justify-content-between align-items-center p-3"
    >
      <div class="d-flex align-items-center">
        <img src="/img/logo.webp" alt="Logo" class="logo" />
      </div>
      <div class="text-end">
        <h3 class="mb-0">Money Exchange Ltd.</h3>
        <div>123 Gulshan Avenue, Dhaka</div>
        <div>Email: info@moneyexchange.com | Phone: +880 123456789</div>
      </div>
    </header>

    <!-- Main Section -->
    <main class="main-section position-relative flex-grow-1 py-5">
      <div class="overlay"></div>
      <div class="container position-relative z-2">
        <div class="bg-white p-4 rounded shadow-lg">
          <h2 class="text-center mb-4">Create Money Stock</h2>

          <router-link to="/money_stocks" class="btn btn-secondary mb-3"
            >← Back to List</router-link
          >

          <div v-if="message" class="alert alert-info">{{ message }}</div>

          <form @submit.prevent="submitStock">
            <div class="row g-3 text-white">
              <div class="col-md-6">
                <label class="form-label">Currency ID</label>
                <input
                  v-model="stock.currency_id"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">Quantity</label>
                <input v-model="stock.qty" type="number" class="form-control" />
              </div>
              <div class="col-md-6">
                <label class="form-label">Transaction Type</label>
                <input
                  v-model="stock.transaction_type"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">Remarks</label>
                <input
                  v-model="stock.remarks"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">Purchase ID</label>
                <input
                  v-model="stock.purchase_id"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">Order ID</label>
                <input
                  v-model="stock.order_id"
                  type="text"
                  class="form-control"
                />
              </div>
              <div class="col-md-6">
                <label class="form-label">Receipt ID</label>
                <input
                  v-model="stock.receipt_id"
                  type="text"
                  class="form-control"
                />
              </div>
            </div>

            <div class="mt-4">
              <button type="submit" class="btn btn-success w-90">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer bg-dark text-white text-center py-3 mt-auto">
      &copy; 2025 Money Exchange Ltd. All rights reserved.
    </footer>
  </div>
</template>

<style scoped>
.page-container {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.logo {
  height: 100px;
  object-fit: contain;
}

/* Background */
.main-section {
  background: url("/img/background.webp") no-repeat center center/cover;
  position: relative;
}

/* Overlay to darken background slightly */
.main-section .overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.z-2 {
  position: relative;
  z-index: 2;
}

/* Form container box */
.bg-white {
  background-color: transparent !important;
  border-radius: 10px;
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

/* Labels and inputs */
label {
  font-weight: 600;
  color: #ffffff;
}

.form-control {
  background-color: rgba(255, 255, 255, 0.527);
  border: 1px solid #ced4da;
  border-radius: 5px;
}

.btn-success {
  background-color: #0c684d;
  border: none;
}

.btn-success:hover {
  background-color: #4be243;
}

/* Footer */
.footer {
  font-size: 0.9rem;
}
</style>
