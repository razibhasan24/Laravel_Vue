<script setup>
import { ref, computed, onMounted } from "vue";

const stocks = ref([]);
const loading = ref(true);
const error = ref("");

const currentPage = ref(1);
const perPage = ref(10);

const apiUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/money_stocks`;

onMounted(async () => {
  try {
    const res = await fetch(apiUrl);
    const data = await res.json();
    const items = Array.isArray(data) ? data : data.data || [];

    // Sort latest first (by id descending)
    stocks.value = items.sort((a, b) => b.id - a.id);
  } catch (e) {
    error.value = e.message || "Failed to load data";
  } finally {
    loading.value = false;
  }
});

// Pagination logic
const pagedStocks = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return stocks.value.slice(start, start + perPage.value);
});
const totalPages = computed(() =>
  Math.ceil(stocks.value.length / perPage.value)
);
function goPage(p) {
  if (p >= 1 && p <= totalPages.value) {
    currentPage.value = p;
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
        <h2 class="text-center mb-4 text-white">Money Stock List</h2>
        <router-link to="/money_stocks/create" class="btn btn-success mb-3"
          >➕ Create Stock</router-link
        >

        <div v-if="loading" class="text-center text-white">
          <div class="spinner-border"></div>
          <p>Loading...</p>
        </div>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>

        <div
          v-if="!loading && !error && pagedStocks.length"
          class="table-responsive"
        >
          <table class="table table-custom text-center">
            <thead>
              <tr>
                <th>ID</th>
                <th>Currency ID</th>
                <th>Qty</th>
                <th>Type</th>
                <th>Remarks</th>
                <th>Purchase ID</th>
                <th>Order ID</th>
                <th>Receipt ID</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in pagedStocks" :key="s.id">
                <td>{{ s.id }}</td>
                <td>{{ s.currency_id }}</td>
                <td>{{ s.qty }}</td>
                <td>{{ s.transaction_type }}</td>
                <td>{{ s.remarks }}</td>
                <td>{{ s.purchase_id }}</td>
                <td>{{ s.order_id }}</td>
                <td>{{ s.receipt_id }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          v-if="!loading && !error && !pagedStocks.length"
          class="alert alert-warning text-center"
        >
          ⚠️ No records available.
        </div>

        <nav v-if="totalPages > 1" class="d-flex justify-content-center mt-4">
          <ul class="pagination pagination-light">
            <li class="page-item" :class="{ disabled: currentPage === 1 }">
              <a class="page-link" @click.prevent="goPage(currentPage - 1)"
                >Previous</a
              >
            </li>
            <li
              v-for="p in totalPages"
              :key="p"
              class="page-item"
              :class="{ active: p === currentPage }"
            >
              <a class="page-link" @click.prevent="goPage(p)">{{ p }}</a>
            </li>
            <li
              class="page-item"
              :class="{ disabled: currentPage === totalPages }"
            >
              <a class="page-link" @click.prevent="goPage(currentPage + 1)"
                >Next</a
              >
            </li>
          </ul>
        </nav>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer bg-dark text-white text-center py-3 mt-auto">
      &copy; 2025 Money Exchange Ltd.
    </footer>
  </div>
</template>

<style scoped>
.page-container {
  font-family: sans-serif;
}
.topbar .logo {
  height: 80px;
  object-fit: contain;
}

.main-section {
  background: url("/img/background.webp") no-repeat center/cover;
  position: relative;
}
.main-section .overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.z-2 {
  position: relative;
  z-index: 2;
}

.table-custom {
  background-color: rgba(0, 0, 0, 0.3);
  /* color: #fff; */
  border-radius: 10px;
  backdrop-filter: blur(3px);
}
.table-custom th {
  background-color: rgba(0, 60, 90, 0.8);
  color: #fff;
  border: 2px solid rgb(255, 255, 255);
}
.table-custom td {
  background-color: rgba(255, 255, 255, 0.05);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.table-custom tbody tr:hover {
  background-color: rgba(0, 128, 255, 0.15);
  transition: background-color 0.3s;
}

.pagination-light .page-link {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: none;
}
.pagination-light .pagination-light .page-item.active .page-link {
  background-color: rgba(66, 133, 244, 0.9);
  color: #fff;
}
.pagination-light .page-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>
