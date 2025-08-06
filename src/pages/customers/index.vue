<script setup>
import { ref, onMounted } from "vue";

const customers = ref([]);
const apiUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/customers`;

onMounted(async () => {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    customers.value = data.customers || data;
  } catch (err) {
    console.error("Fetch Error:", err);
  }
});
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
        <h4 class="mb-0">Money Exchange Ltd.</h4>
        <div>123 Gulshan Avenue, Dhaka</div>
        <div>Email: contact@moneyexchange.com | Phone: +880 123456789</div>
      </div>
    </header>

    <!-- 🔷 Main Section with Background -->
    <main
      class="main-section flex-grow-1 position-relative text-white d-flex flex-column"
    >
      <div class="overlay"></div>
      <div class="container py-5 position-relative z-2">
        <h1 class="mb-4">Manage Customer</h1>
        <router-link to="/customers/create" class="btn btn-success mb-4"
          >➕ New Customer</router-link
        >

        <div class="table-responsive bg-transparent rounded">
          <table
            class="table table-bordered table-hover table-custom text-center"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>ID Proof Document</th>
                <th>Name</th>
                <th>ID Type</th>
                <th>ID Number</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody style="color: #ffffff">
              <tr v-for="customer in customers" :key="customer.id">
                <td>{{ customer.id }}</td>
                <td>
                  <a
                    v-if="customer.id_poof_document"
                    :href="`http://razib.intelsofts.com/projects/laravel/update_mex/public/pdf/${customer.id_poof_document}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-info text-decoration-underline"
                  >
                    View PDF
                  </a>
                  <span v-else>No Document</span>
                </td>
                <td>{{ customer.name }}</td>
                <td>{{ customer.id_type }}</td>
                <td>{{ customer.id_number }}</td>
                <td>{{ customer.phone }}</td>
                <td>{{ customer.address }}</td>
                <td>
                  <router-link
                    :to="`/customers/show/${customer.id}`"
                    class="btn btn-sm btn-info me-1"
                    >View</router-link
                  >
                  <router-link
                    :to="`/customers/edit/${customer.id}`"
                    class="btn btn-sm btn-warning me-1"
                    >Edit</router-link
                  >
                  <router-link
                    :to="`/customers/delete/${customer.id}`"
                    class="btn btn-sm btn-danger"
                    >Delete</router-link
                  >
                </td>
              </tr>
            </tbody>
          </table>
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
/* 🔹 Page layout */
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

/* 🔹 Topbar */
.topbar .logo {
  height: 100px;
  object-fit: contain;
}

/* 🔹 Main section background image */
.main-section {
  background-image: url("/img/background.webp"); /* Use your preferred image */
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

/* 🔹 Overlay for dark effect */
.main-section .overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.4); /* Opacity */
  z-index: 1;
}

/* 🔹 Content above overlay */
.z-2 {
  position: relative;
  z-index: 2;
}

/* 🔹 Table style */
.table-custom {
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
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

.table-custom th,
.table-custom td {
  background-color: transparent !important;
  color: #ffff;
  border-color: #ffff;
}

.table-custom tbody tr:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* 🔹 Text links */
a.text-info {
  color: #ffff !important;
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
  background-color: #000;
  font-size: 0.9rem;
}

/* 🔹 Responsive design */
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
