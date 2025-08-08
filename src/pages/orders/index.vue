<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const orders = ref([]);
const isLoading = ref(false);
const error = ref("");
const router = useRouter();

// Pagination
const currentPage = ref(1);
const pageSize = 10; // orders per page

const totalPages = computed(() => {
  return Math.ceil(orders.value.length / pageSize);
});

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  const end = start + pageSize;
  return orders.value.slice(start, end);
});

// Fetch orders
const fetchOrders = async () => {
  isLoading.value = true;
  try {
    const response = await fetch(
      "http://razib.intelsofts.com/projects/laravel/update_mex/public/api/orders"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    orders.value = data.orders || data || [];
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    error.value = "Failed to load orders.";
  } finally {
    isLoading.value = false;
  }
};

// Navigation functions
const goToCreate = () => router.push("/orders/create");
const goToShow = (id) => router.push(`/orders/${id}`);
const goToEdit = (id) => router.push(`/orders/edit/${id}`);
const goToDelete = (id) => router.push(`/orders/delete/${id}`);

// Change page
const setPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

onMounted(fetchOrders);
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
      class="main-section flex-grow-1 position-relative text-white d-flex flex-column"
    >
      <div class="overlay"></div>
      <div class="container py-5 position-relative z-2">
        <h2 class="mb-4">Orders</h2>
        <button class="btn btn-success mb-3" @click="goToCreate">
          ➕ Create New Order
        </button>

        <!-- Loading -->
        <div v-if="isLoading">Loading orders...</div>

        <!-- Error -->
        <div v-else-if="error" class="text-danger">{{ error }}</div>

        <!-- Table -->
        <div v-else>
          <div class="table-responsive">
            <table
              class="table table-bordered table-hover table-custom text-center"
            >
              <thead>
                <tr>
                  <th>#</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Status</th>
                  <th>Remarks</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(order, index) in paginatedOrders" :key="order.id">
                  <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                  <td>{{ order.customer?.name || order.customer_id }}</td>
                  <td>{{ order.order_date }}</td>
                  <td>{{ order.order_total }}</td>
                  <td>{{ order.paid_amount }}</td>
                  <td>
                    <span
                      :class="{
                        pending: order.status_id === 1,
                        completed: order.status_id !== 1,
                      }"
                    >
                      {{ order.status_id === 1 ? "Pending" : "Completed" }}
                    </span>
                  </td>
                  <td>{{ order.remarks }}</td>
                  <td>
                    <button
                      class="btn btn-sm btn-info me-1"
                      @click="goToShow(order.id)"
                    >
                      View
                    </button>
                    <button
                      class="btn btn-sm btn-warning me-1"
                      @click="goToEdit(order.id)"
                    >
                      Edit
                    </button>
                    <button
                      class="btn btn-sm btn-danger"
                      @click="goToDelete(order.id)"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="orders.length === 0" class="text-white mt-3">
            No orders found.
          </div>

          <!-- Pagination -->
          <nav aria-label="Page navigation" v-if="totalPages > 1">
            <ul class="pagination justify-content-center">
              <li
                class="page-item"
                :class="{ disabled: currentPage === 1 }"
                @click.prevent="setPage(currentPage - 1)"
              >
                <a class="page-link" href="#">Previous</a>
              </li>

              <li
                v-for="page in totalPages"
                :key="page"
                class="page-item"
                :class="{ active: currentPage === page }"
                @click.prevent="setPage(page)"
              >
                <a class="page-link" href="#">{{ page }}</a>
              </li>

              <li
                class="page-item"
                :class="{ disabled: currentPage === totalPages }"
                @click.prevent="setPage(currentPage + 1)"
              >
                <a class="page-link" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </main>

    <!-- Footer -->
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
.pagination {
  margin-top: 20px;
}
.page-item.disabled .page-link {
  pointer-events: none;
  opacity: 0.5;
  cursor: default;
}
.page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
  color: white;
}

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
</style>
