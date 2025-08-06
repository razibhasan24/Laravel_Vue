<script setup>
import { ref } from "vue";

const baseUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/`;
const endpoint = `currencies`;

const currency = ref({
  currency_code: "",
  currency_name: "",
  symbol: "",
  file: null,
});

const message = ref("");
const success = ref(false);

function handleFile(event) {
  currency.value.file = event.target.files[0];
}

async function submitCurrency() {
  const formData = new FormData();
  formData.append("currency_code", currency.value.currency_code);
  formData.append("currency_name", currency.value.currency_name);
  formData.append("symbol", currency.value.symbol);
  formData.append("image", currency.value.file);

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    message.value = result.message || "Upload successful";
    success.value = true;
  } catch (error) {
    message.value = "Upload failed: " + error.message;
    success.value = false;
  }
}
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
        <h2 class="mb-4">Create Currency</h2>
        <router-link to="/currencies" class="btn btn-light mb-4"
          >⬅ Back</router-link
        >

        <div
          class="alert"
          :class="success ? 'alert-success' : 'alert-danger'"
          v-if="message"
        >
          {{ message }}
        </div>

        <form @submit.prevent="submitCurrency" class="currency-form">
          <div class="form-group mb-3">
            <label>Currency Code</label>
            <input
              v-model="currency.currency_code"
              type="text"
              class="form-control"
              required
            />
          </div>

          <div class="form-group mb-3">
            <label>Currency Name</label>
            <input
              v-model="currency.currency_name"
              type="text"
              class="form-control"
              required
            />
          </div>

          <div class="form-group mb-3">
            <label>Symbol</label>
            <input
              v-model="currency.symbol"
              type="text"
              class="form-control"
              required
            />
          </div>

          <div class="form-group mb-4">
            <label>Image</label>
            <input
              type="file"
              @change="handleFile"
              accept="image/*"
              class="form-control"
              required
            />
          </div>

          <button type="submit" class="btn btn-success w-100">
            ✅ Submit Currency
          </button>
        </form>
      </div>
    </main>

    <!-- 🔹 Footer -->
    <footer class="footer bg-dark text-center text-white py-3 mt-auto">
      &copy; 2025 Money Exchange Ltd. All rights reserved.
    </footer>
  </div>
</template>

<style scoped>
/* Layout base */
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

/* Topbar logo */
.topbar .logo {
  height: 100px;
  object-fit: contain;
}

/* Main section background image */
.main-section {
  background-image: url("/img/background.webp"); /* 👈 Use your image */
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(98, 91, 91, 0.8); /* Deep opacity */
  z-index: 1;
}

.z-2 {
  position: relative;
  z-index: 2;
}

/* Form */
.currency-form {
  max-width: 500px;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.6); /* Form semi bg */
  padding: 25px;
  border-radius: 10px;
  color: #ffffff;
}

.currency-form label {
  font-weight: bold;
}

.currency-form .form-control {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #fff;
}

.currency-form .form-control::placeholder {
  color: #ccc;
}

.currency-form .form-control:focus {
  background-color: rgba(255, 255, 255, 0.2);
  outline: none;
  box-shadow: none;
  color: #fff;
}

.alert {
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: bold;
  margin-bottom: 20px;
}

.alert-success {
  background-color: #28a745;
  color: white;
}

.alert-danger {
  background-color: #dc3545;
  color: white;
}

.btn-success {
  background-color: #28a745;
  border: none;
}
.btn-success:hover {
  background-color: #218838;
}

/* Footer */
.footer {
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 576px) {
  .container {
    padding: 1rem;
  }

  .topbar h4 {
    font-size: 1rem;
  }

  .topbar .text-end {
    font-size: 0.75rem;
  }
}
</style>
