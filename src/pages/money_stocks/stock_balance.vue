<script setup>
import { ref, onMounted } from "vue";

const stockBalances = ref([]);
const loading = ref(true);
const error = ref("");
const currentPage = ref(1);
const lastPage = ref(1);
const perPage = 10;

const baseUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/stock_balance`;

async function fetchStockBalances(page = 1) {
  loading.value = true;
  error.value = "";

  try {
    const response = await fetch(`${baseUrl}?page=${page}`);
    if (!response.ok) throw new Error("Failed to fetch stock balances");

    const result = await response.json();
    stockBalances.value = result.data || [];
    currentPage.value = result.current_page;
    lastPage.value = result.last_page;
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
}

function goToPage(page) {
  if (page >= 1 && page <= lastPage.value) {
    fetchStockBalances(page);
  }
}

onMounted(async () => {
  await fetchStockBalances(); // Fetch once to get lastPage
  goToPage(lastPage.value); // Load the latest page first
});
</script>

<template>
  <div class="page-container d-flex flex-column min-vh-100">
    <!-- Topbar -->
    <header
      class="topbar bg-info text-dark py-3 px-4 d-flex justify-content-between align-items-center"
    >
      <h3 class="mb-0">Money Exchange Ltd.</h3>
      <div class="text-end small">
        <div>123 Gulshan Avenue, Dhaka</div>
        <div>Email: info@moneyexchange.com | Phone: +880 123456789</div>
      </div>
    </header>

    <!-- Main Section -->
    <main class="main-section flex-grow-1 py-5">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2>Stock Balances</h2>
          <router-link to="/stock_balance/create" class="btn btn-success">
            ➕ Add Currency
          </router-link>
        </div>

        <div v-if="loading" class="text-center">
          <p>Loading...</p>
        </div>

        <div v-if="error" class="alert alert-danger">{{ error }}</div>

        <table
          v-if="!loading && stockBalances.length"
          class="table custom-table text-center"
        >
          <thead>
            <tr class="text-uppercase bg-dark text-white">
              <th>Currency ID</th>
              <th>Currency Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody class="text-dark">
            <tr v-for="currency in stockBalances" :key="currency.currency_id">
              <td>{{ currency.currency_id }}</td>
              <td>{{ currency.currency_name }}</td>
              <td>{{ currency.qty }}</td>
            </tr>
          </tbody>
        </table>

        <div v-else-if="!loading" class="alert alert-info">
          No stock balances found.
        </div>

        <!-- Pagination Controls -->
        <nav v-if="lastPage > 1" class="mt-4">
          <ul class="pagination justify-content-center">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <button class="page-link" @click="goToPage(currentPage - 1)">
                « Prev
              </button>
            </li>

            <li
              class="page-item"
              v-for="page in lastPage"
              :key="page"
              :class="{ active: page === currentPage }"
            >
              <button class="page-link" @click="goToPage(page)">
                {{ page }}
              </button>
            </li>

            <li
              class="page-item"
              :class="{ disabled: currentPage === lastPage }"
            >
              <button class="page-link" @click="goToPage(currentPage + 1)">
                Next »
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer bg-dark text-center text-white py-3 mt-auto">
      &copy; 2025 Money Exchange Ltd. All rights reserved.
    </footer>
  </div>
</template>

<style scoped>
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

.main-section {
  background-image: url("/img/background.webp"); /* Match background */
  background-size: cover;
  background-position: center;
}

.table.custom-table {
  background-color: rgba(154, 148, 148, 0.3);
  color: #fff;
  border-radius: 10px;
  backdrop-filter: blur(3px);
}

.table.custom-table thead {
  background-color: rgba(0, 60, 90, 0.8);
  color: #ffffff;
}

.table.custom-table tbody td {
  background-color: rgba(255, 255, 255, 0.1);
  /* color: #ffffff; */
}
.table-custom th {
  background-color: rgba(0, 60, 90, 0.8);
  color: #fff;
  border: 2px solid rgb(255, 255, 255);
}
/* .table-custom td {
  background-color: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
} */

.btn-success {
  background-color: #28a745;
  border: none;
}
.btn-success:hover {
  background-color: #218838;
}

.pagination .page-link {
  cursor: pointer;
}

.alert {
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: bold;
  margin-bottom: 20px;
}

.alert-info {
  background-color: #d1ecf1;
  color: #0c5460;
}
.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
