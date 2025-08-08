<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const purchases = ref([]);
const message = ref("");
const loading = ref(true);

const currentPage = ref(1);
const itemsPerPage = 5;

const apiUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/purchases`;

onMounted(async () => {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    purchases.value = (data.purchases || data).reverse(); // latest first
    currentPage.value = 1; // show latest first
  } catch (error) {
    message.value = "Failed to load purchases: " + error.message;
  } finally {
    loading.value = false;
  }
});

const totalPages = computed(() =>
  Math.ceil(purchases.value.length / itemsPerPage)
);

const paginatedPurchases = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return purchases.value.slice(start, start + itemsPerPage);
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}
</script>

<template>
  <div class="page-container d-flex flex-column min-vh-100">
    <!-- 🔷 Topbar -->
    <header
      class="topbar bg-info text-dark py-3 px-4 d-flex justify-content-between align-items-center"
    >
      <div class="d-flex align-items-center gap-3">
        <img src="/img/logo.webp" alt="Logo" class="logo" />
      </div>
      <div class="text-end small">
        <h3 class="mb-0">Money Exchange Ltd.</h3>
        <div>123 Gulshan Avenue, Dhaka</div>
        <div>Email: contact@moneyexchange.com | Phone: +880 123456789</div>
      </div>
    </header>

    <!-- 🔷 Main Content -->
    <main
      class="main-section flex-grow-1 position-relative text-white d-flex flex-column"
    >
      <div class="overlay"></div>
      <div class="container py-5 position-relative z-2">
        <h1 class="mb-4">Manage Purchases</h1>
        <router-link to="/purchases/create" class="btn btn-success mb-4"
          >➕ New Purchase</router-link
        >
        <p v-if="message" class="text-danger">{{ message }}</p>

        <div v-if="loading" class="text-center">
          <div class="spinner-border text-light" role="status"></div>
          <p>Loading...</p>
        </div>

        <div
          v-if="!loading && !message && paginatedPurchases.length"
          class="table-responsive bg-transparent rounded"
        >
          <table
            class="table table-bordered table-hover table-custom text-center"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Agent ID</th>
                <th>Status ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Remarks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="purchase in paginatedPurchases" :key="purchase.id">
                <td>{{ purchase.id }}</td>
                <td>{{ purchase.agent_id }}</td>
                <td>{{ purchase.status_id }}</td>
                <td>{{ purchase.purchase_date }}</td>
                <td>{{ purchase.purchase_total }}</td>
                <td>{{ purchase.remarks }}</td>
                <td>
                  <router-link
                    :to="`/purchases/show/${purchase.id}`"
                    class="btn btn-sm btn-info me-1"
                    >View</router-link
                  >
                  <router-link
                    :to="`/purchases/edit/${purchase.id}`"
                    class="btn btn-sm btn-warning me-1"
                    >Edit</router-link
                  >
                  <router-link
                    :to="`/purchases/delete/${purchase.id}`"
                    class="btn btn-sm btn-danger"
                    >Delete</router-link
                  >
                </td>
              </tr>
            </tbody>
          </table>

          <!-- 🔽 Pagination -->
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
          v-if="!loading && !message && !purchases.length"
          class="alert alert-warning"
        >
          ⚠️ No purchases found.
        </div>
      </div>
    </main>

    <!-- 🔷 Footer -->
    <footer class="footer bg-dark text-center text-white py-3 mt-auto">
      &copy; 2025 Money Exchange Ltd. All rights reserved.
    </footer>
  </div>
</template>

<style scoped>
/* 🔹 Layout */
.page-container {
  background-color: #ffffff;
  color: #ffffff;
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

.topbar .logo {
  height: 100px;
  object-fit: contain;
}

.main-section {
  background-image: url("/img/background.webp");
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.main-section .overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(125, 116, 116, 0.4);
  z-index: 1;
}

.z-2 {
  position: relative;
  z-index: 2;
}

/* 🔹 Table Styling */
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

/* 🔹 Pagination */
.pagination .page-link {
  color: #000;
  cursor: pointer;
}
.pagination .active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
  color: white;
}

/* 🔹 Buttons */
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

/* 🔹 Footer */
.footer {
  font-size: 0.9rem;
}

/* 🔹 Responsive */
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
</style>
