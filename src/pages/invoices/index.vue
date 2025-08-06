<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const invoices = ref([]);
const message = ref("");
const router = useRouter();

async function fetchInvoices() {
  try {
    const res = await fetch(
      "http://razib.intelsofts.com/projects/laravel/update_mex/public/api/invoices"
    );
    if (res.ok) {
      invoices.value = await res.json();
    } else {
      message.value = "Failed to fetch invoices.";
    }
  } catch (e) {
    message.value = "Error: " + e.message;
  }
}

function goToCreate() {
  router.push("/invoices/create");
}

function goToShow(id) {
  router.push(`/invoices/${id}`);
}

function goToEdit(id) {
  router.push(`/invoices/edit/${id}`);
}

function goToDelete(id) {
  router.push(`/invoices/delete/${id}`);
}

onMounted(fetchInvoices);
</script>

<template>
  <div class="page-container d-flex flex-column min-vh-100">
    <!-- 🔹 Topbar -->
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

    <!-- 🔹 Main Section -->
    <main
      class="main-section flex-grow-1 position-relative text-white d-flex flex-column"
    >
      <div class="overlay"></div>
      <div class="container py-5 position-relative z-2">
        <h2 class="mb-4">Invoices</h2>
        <button class="btn btn-success mb-3" @click="goToCreate">
          ➕ Create New Invoice
        </button>

        <div class="table-responsive">
          <table
            class="table table-bordered table-hover table-custom text-center"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer ID</th>
                <th>Invoice Date</th>
                <th>Status</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="invoice in invoices" :key="invoice.id">
                <td>{{ invoice.id }}</td>
                <td>{{ invoice.customer_id }}</td>
                <td>{{ invoice.invoice_date }}</td>
                <td>{{ invoice.status }}</td>
                <td>
                  {{
                    invoice.total_amount !== null &&
                    invoice.total_amount !== undefined &&
                    !isNaN(invoice.total_amount)
                      ? Number(invoice.total_amount).toFixed(2)
                      : "0.00"
                  }}
                </td>
                <td>
                  <button
                    class="btn btn-sm btn-info me-1"
                    @click="goToShow(invoice.id)"
                  >
                    View
                  </button>
                  <button
                    class="btn btn-sm btn-warning me-1"
                    @click="goToEdit(invoice.id)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-sm btn-danger"
                    @click="goToDelete(invoice.id)"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p v-if="message" class="text-danger mt-3">{{ message }}</p>
      </div>
    </main>

    <!-- 🔹 Footer -->
    <footer class="footer bg-dark text-center text-white py-3 mt-auto">
      &copy; 2025 Money Exchange Ltd. All rights reserved.
    </footer>
  </div>
</template>

<style scoped>
/* 🔹 Layout Container */
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

/* 🔹 Topbar */
.topbar .logo {
  height: 100px;
  object-fit: contain;
}

/* 🔹 Main Section Background */
.main-section {
  background-image: url("/img/background.webp"); /* Use your background image */
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(125, 116, 116, 0.4); /* Opacity */
  z-index: 1;
}

.z-2 {
  position: relative;
  z-index: 2;
}

/* 🔹 Table Styling */
.table-custom {
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent */
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
