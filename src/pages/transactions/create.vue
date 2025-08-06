<script setup>
import { ref } from "vue";

const baseUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/`;
const endpoint = `transactions`;

const transaction = ref({
  customer_id: "",
  agent_id: "",
  transaction_date: "",
  total_amount_paid: "",
  total_received: "",
  status: "",
  payment_method: "",
  remarks: "",
});

const message = ref("");

async function submitTransaction() {
  const formData = new FormData();
  formData.append("customer_id", transaction.value.customer_id);
  formData.append("agent_id", transaction.value.agent_id);
  formData.append("transaction_date", transaction.value.transaction_date);
  formData.append("total_amount_paid", transaction.value.total_amount_paid);
  formData.append("total_received", transaction.value.total_received);
  formData.append("status", transaction.value.status);
  formData.append("payment_method", transaction.value.payment_method);
  formData.append("remarks", transaction.value.remarks);

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      message.value = result.message || "Transaction created successfully";
    } else {
      message.value = result.message || "Failed to create transaction";
    }
  } catch (error) {
    message.value = "Upload failed: " + error.message;
  }
}
</script>

<template>
  <div class="page-container">
    <!-- ✅ Topbar -->
    <header
      class="topbar bg-info text-dark py-3 px-4 d-flex justify-content-between align-items-center"
    >
      <!-- Left: Logo -->
      <div class="d-flex align-items-center">
        <img src="/img/logo.webp" alt="Logo" class="logo me-3" />
      </div>

      <!-- Right: Company Info -->
      <div class="text-end">
        <h3 class="mb-0">Money Exchange Ltd.</h3>
        <div>123 Gulshan Avenue, Dhaka</div>
        <div>Email: info@moneyexchange.com | Phone: +880 123456789</div>
      </div>
    </header>

    <!-- ✅ Main Form Area -->
    <div class="overlay"></div>
    <div class="content-wrapper">
      <div class="form-card">
        <h2 class="text-center mb-4">Create Transaction</h2>
        <router-link class="btn btn-outline-light mb-3" to="/transactions"
          >← Back to List</router-link
        >

        <p v-if="message" class="alert alert-info">{{ message }}</p>

        <form @submit.prevent="submitTransaction">
          <div class="row mb-3">
            <div class="col-md-6">
              <label>Customer ID</label>
              <input
                v-model="transaction.customer_id"
                type="text"
                class="form-control"
              />
            </div>
            <div class="col-md-6">
              <label>Agent ID</label>
              <input
                v-model="transaction.agent_id"
                type="text"
                class="form-control"
              />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label>Transaction Date</label>
              <input
                v-model="transaction.transaction_date"
                type="date"
                class="form-control"
              />
            </div>
            <div class="col-md-6">
              <label>Total Amount Paid</label>
              <input
                v-model="transaction.total_amount_paid"
                type="number"
                class="form-control"
              />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label>Total Received</label>
              <input
                v-model="transaction.total_received"
                type="number"
                class="form-control"
              />
            </div>
            <div class="col-md-6">
              <label>Status</label>
              <input
                v-model="transaction.status"
                type="text"
                class="form-control"
              />
            </div>
          </div>

          <div class="row mb-4">
            <div class="col-md-6">
              <label>Payment Method</label>
              <input
                v-model="transaction.payment_method"
                type="text"
                class="form-control"
              />
            </div>
            <div class="col-md-6">
              <label>Remarks</label>
              <input
                v-model="transaction.remarks"
                type="text"
                class="form-control"
              />
            </div>
          </div>

          <button type="submit" class="btn btn-success w-100">Submit</button>
        </form>
      </div>
    </div>

    <!-- Footer (Optional) -->
    <footer class="footer bg-dark text-white text-center py-3 mt-auto">
      &copy; 2025 Money Exchange Ltd. All rights reserved.
    </footer>
  </div>
</template>

<style scoped>
/* Page background */
.page-container {
  background: url("/img/background.webp") no-repeat center center/cover;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 1300px;
  margin: 30px auto 0;
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
}

/* Topbar */
.topbar {
  z-index: 10;
}
.logo {
  height: 100px;
  object-fit: contain;
}

/* Background overlay */
.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

/* Content Wrapper */
.content-wrapper {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 600px;
  margin: 40px auto;
  padding: 0 20px;
}

/* Form Card */
.form-card {
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 30px;
  color: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
}

/* Inputs */
.form-control {
  background-color: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
}
.form-control:focus {
  background-color: rgba(255, 255, 255, 0.25);
  border-color: #66ccff;
  box-shadow: none;
  color: #fff;
}

/* Label */
label {
  margin-bottom: 0.4rem;
  font-weight: 500;
}

/* Buttons */
.btn-success {
  font-weight: bold;
}
.btn-outline-light {
  border-color: #fff;
  color: #fff;
}
.btn-outline-light:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Message Alert */
.alert-info {
  background-color: rgba(0, 123, 255, 0.2);
  border: 1px solid #007bff;
  color: #fff;
}

/* Footer */
.footer {
  font-size: 0.9rem;
  z-index: 2;
}
</style>
