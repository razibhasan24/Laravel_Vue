<template>
  <div class="currency-page">
    <!-- Top Bar -->
    <div
      class="d-flex justify-content-between align-items-center p-3 bg-info text-dark"
    >
      <div>
        <img
          src="/img/logo.webp"
          alt="Logo"
          class="img-fluid"
          style="height: 100px"
        />
      </div>
      <div class="text-end">
        <h4 class="mb-0">Money Exchange Ltd.</h4>
        <small>123 Gulshan Avenue, Dhaka</small><br />
        <small>Email: contact@moneyexchange.com | Phone: +880 123456789</small>
      </div>
    </div>

    <!-- 🔶 Main Content Section with background -->
    <div class="main-content position-relative text-white">
      <div class="overlay"></div>

      <div class="container py-5 position-relative z-2">
        <h2 class="mb-4">Manage Currency</h2>
        <router-link to="/currencies/create" class="btn btn-success mb-3"
          >➕ New Currency</router-link
        >

        <div class="table-responsive">
          <table
            class="table table-bordered table-hover table-custom text-center"
          >
            <thead class="table">
              <tr>
                <th>ID</th>
                <th>Currency Code</th>
                <th>Currency Name</th>
                <th>Symbol</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="currency in currencies" :key="currency.id">
                <td>{{ currency.id }}</td>
                <td>{{ currency.currency_code }}</td>
                <td>{{ currency.currency_name }}</td>
                <td>{{ currency.symbol }}</td>
                <td>
                  <img
                    v-if="currency.image"
                    :src="`http://razib.intelsofts.com/projects/laravel/update_mex/public/img/${currency.image}`"
                    alt="Currency"
                    height="50"
                  />
                </td>
                <td>
                  <router-link
                    :to="`/currencies/show/${currency.id}`"
                    class="btn btn-info btn-sm me-1"
                    >View</router-link
                  >
                  <router-link
                    :to="`/currencies/edit/${currency.id}`"
                    class="btn btn-warning btn-sm me-1"
                    >Edit</router-link
                  >
                  <router-link
                    :to="`/currencies/delete/${currency.id}`"
                    class="btn btn-danger btn-sm"
                    >Delete</router-link
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-dark text-white text-center py-3">
      &copy; 2025 Money Exchange Ltd. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const currencies = ref([]);
const apiUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/currencies`;

onMounted(async () => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    currencies.value = data.currencies || data;
  } catch (err) {
    console.error("Fetch Error:", err);
  }
});
</script>

<style scoped>
/* No background on full page */
.currency-page {
  max-width: 1300px;
  margin: 30px auto 0;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  box-sizing: border-box;
}

/* Background only in content */
.main-content {
  position: relative;
  background-image: url("/img/background.webp");
  background-size: cover;
  background-position: center;
  overflow: hidden;
}

/* Overlay to darken image */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* Opacity */
  z-index: 1;
}

/* Table customization */
.table-custom {
  background-color: transparent !important;
  color: #ffff;
}
.table-custom th,
.table-custom td {
  background-color: transparent !important;
  color: #ffff;
  border-color: #ffff;
}

/* Ensure content shows above overlay */
.z-2 {
  position: relative;
  z-index: 2;
}
</style>
