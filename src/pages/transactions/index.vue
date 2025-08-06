<script setup>
import { ref, onMounted } from "vue";

const transactions = ref([]);
const loading = ref(true);
const error = ref("");

const apiUrl =
  "http://razib.intelsofts.com/projects/laravel/update_mex/public/api/transactions";

async function fetchTransactions() {
  loading.value = true;
  error.value = "";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (Array.isArray(data)) {
      transactions.value = data;
    } else {
      throw new Error("API did not return an array");
    }
  } catch (err) {
    error.value = err.message || "Failed to fetch transactions";
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchTransactions();
});
</script>

<template>
  <div class="page-container d-flex flex-column min-vh-100">
    <!-- Topbar -->
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

    <!-- Main Section with Background -->
    <main
      class="main-section text-white py-5 flex-grow-1 d-flex flex-column position-relative"
    >
      <div class="overlay"></div>
      <div class="container position-relative z-2">
        <h2 class="text-center mb-4">Transactions List</h2>
        <router-link class="btn btn-success mb-3" to="/transactions/create">
          ➕ Create New Transaction
        </router-link>

        <div v-if="loading" class="text-center">
          <div class="spinner-border text-light" role="status"></div>
          <p>Loading...</p>
        </div>

        <div v-if="error" class="alert alert-danger">{{ error }}</div>

        <div v-if="!loading && !error && transactions.length">
          <div class="table-responsive">
            <table class="table custom-table text-center">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer ID</th>
                  <th>Agent ID</th>
                  <th>Transaction Date</th>
                  <th>Total Amount Paid</th>
                  <th>Total Received</th>
                  <th>Status</th>
                  <th>Payment Method</th>
                  <th>Remarks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="transaction in transactions" :key="transaction.id">
                  <td>{{ transaction.id }}</td>
                  <td>{{ transaction.customer_id }}</td>
                  <td>{{ transaction.agent_id }}</td>
                  <td>{{ transaction.transaction_date }}</td>
                  <td>{{ transaction.total_amount_paid }}</td>
                  <td>{{ transaction.total_received }}</td>
                  <td>{{ transaction.status }}</td>
                  <td>{{ transaction.payment_method }}</td>
                  <td>{{ transaction.remarks }}</td>
                  <td>
                    <router-link
                      :to="`/transactions/show/${transaction.id}`"
                      class="btn btn-sm btn-info me-1"
                      >View</router-link
                    >
                    <router-link
                      :to="`/transactions/edit/${transaction.id}`"
                      class="btn btn-sm btn-warning me-1"
                      >Edit</router-link
                    >
                    <router-link
                      :to="`/transactions/delete/${transaction.id}`"
                      class="btn btn-sm btn-danger"
                      >Delete</router-link
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div
          v-if="!loading && !error && !transactions.length"
          class="alert alert-warning"
        >
          ⚠️ No transactions found.
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
/* Layout */
.page-container {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* Topbar */
.logo {
  height: 100px;
  object-fit: contain;
}

/* Background */
.main-section {
  background: url("/img/background.webp") no-repeat center center/cover;
  position: relative;
  min-height: 100vh;
}
.main-section .overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5); /* darker overlay for contrast */
  z-index: 1;
}
.z-2 {
  position: relative;
  z-index: 2;
}

/* Table Styling */
.custom-table {
  background-color: rgba(0, 0, 0, 0.3); /* transparent dark */
  color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  backdrop-filter: blur(3px); /* glassmorphic effect */
}

.custom-table th {
  background-color: rgba(0, 60, 90, 0.8); /* navy tone */
  color: #ffffff;
  font-weight: 600;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.custom-table td {
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.976);
  vertical-align: middle;
}

.custom-table tbody tr:hover {
  background-color: rgba(0, 128, 255, 0.15);
  transition: background-color 0.3s ease;
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

/* Footer */
.footer {
  font-size: 0.9rem;
}
</style>
