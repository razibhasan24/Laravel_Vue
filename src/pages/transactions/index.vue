<script setup>
import { ref, onMounted, computed } from "vue";

const transactions = ref([]);
const loading = ref(true);
const error = ref("");

// Pagination state
const currentPage = ref(1);
const itemsPerPage = 5;

const apiUrl =
  "http://razib.intelsofts.com/projects/laravel/update_mex/public/api/transactions";

// Fetch data
async function fetchTransactions() {
  loading.value = true;
  error.value = "";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (Array.isArray(data)) {
      transactions.value = data.reverse(); // latest first
      currentPage.value = 1; // show last page first
    } else {
      throw new Error("API did not return an array");
    }
  } catch (err) {
    error.value = err.message || "Failed to fetch transactions";
  } finally {
    loading.value = false;
  }
}

// Pagination computed
const totalPages = computed(() =>
  Math.ceil(transactions.value.length / itemsPerPage)
);

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return transactions.value.slice(start, start + itemsPerPage);
});

// Page navigation
function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}

onMounted(fetchTransactions);
</script>

<template>
  <div class="page-container d-flex flex-column min-vh-100">
    <!-- Topbar -->
    <header
      class="topbar bg-info text-dark py-3 px-4 d-flex justify-content-between align-items-center"
    >
      <div class="d-flex align-items-center">
        <img src="/img/logo.webp" alt="Logo" class="logo me-3" />
      </div>
      <div class="text-end">
        <h3 class="mb-0">Money Exchange Ltd.</h3>
        <div>123 Gulshan Avenue, Dhaka</div>
        <div>Email: info@moneyexchange.com | Phone: +880 123456789</div>
      </div>
    </header>

    <!-- Main Section -->
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

        <div v-if="!loading && !error && paginatedTransactions.length">
          <div class="table-responsive">
            <table class="table custom-table text-center">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer ID</th>
                  <th>Agent ID</th>
                  <th>Transaction Date</th>
                  <th>Total Paid</th>
                  <th>Total Received</th>
                  <th>Status</th>
                  <th>Payment Method</th>
                  <th>Remarks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="transaction in paginatedTransactions"
                  :key="transaction.id"
                >
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
                    >
                      View
                    </router-link>
                    <router-link
                      :to="`/transactions/edit/${transaction.id}`"
                      class="btn btn-sm btn-warning me-1"
                    >
                      Edit
                    </router-link>
                    <router-link
                      :to="`/transactions/delete/${transaction.id}`"
                      class="btn btn-sm btn-danger"
                    >
                      Delete
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <nav class="mt-4">
            <ul class="pagination justify-content-center">
              <li
                class="page-item"
                :class="{ disabled: currentPage === 1 }"
                @click="goToPage(currentPage - 1)"
              >
                <a class="page-link" href="#">Prev</a>
              </li>

              <li
                v-for="page in totalPages"
                :key="page"
                class="page-item"
                :class="{ active: currentPage === page }"
                @click="goToPage(page)"
              >
                <a class="page-link" href="#">{{ page }}</a>
              </li>

              <li
                class="page-item"
                :class="{ disabled: currentPage === totalPages }"
                @click="goToPage(currentPage + 1)"
              >
                <a class="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
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
.page-container {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.logo {
  height: 100px;
  object-fit: contain;
}

.main-section {
  background: url("/img/background.webp") no-repeat center center/cover;
  position: relative;
  min-height: 100vh;
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.z-2 {
  position: relative;
  z-index: 2;
}

.custom-table {
  background-color: rgba(0, 0, 0, 0.3);
  color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  backdrop-filter: blur(3px);
}

.custom-table th {
  background-color: rgba(0, 60, 90, 0.8);
  color: #ffffff;
  font-weight: 600;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.custom-table td {
  background-color: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  vertical-align: middle;
}

.custom-table tbody tr:hover {
  background-color: rgba(0, 128, 255, 0.15);
  transition: background-color 0.3s ease;
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

/* Buttons */
.btn-info {
  background-color: #17a2b8;
  border: none;
}
.btn-info:hover {
  background-color: #138496;
}
.btn-warning {
  background-color: #ffc107;
  border: none;
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
