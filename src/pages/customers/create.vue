<script setup>
import { ref } from "vue";

const customer = ref({
  name: "",
  id_type: "",
  id_number: "",
  phone: "",
  address: "",
  file: null,
});

const message = ref("");
const success = ref(false);

function handleFile(event) {
  customer.value.file = event.target.files[0];
}

async function submitCustomer() {
  const formData = new FormData();
  formData.append("name", customer.value.name);
  formData.append("id_type", customer.value.id_type);
  formData.append("id_number", customer.value.id_number);
  formData.append("phone", customer.value.phone);
  formData.append("address", customer.value.address);
  formData.append("id_poof_document", customer.value.file);

  try {
    const response = await fetch(
      "http://razib.intelsofts.com/projects/laravel/update_mex/public/api/customers",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    message.value = result.message || "Customer created successfully!";
    success.value = true;
  } catch (error) {
    message.value = "Upload failed: " + error.message;
    success.value = false;
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
        <h4 class="mb-0">Money Exchange Ltd.</h4>
      </div>
      <div class="text-end small">
        <div>123 Gulshan Avenue, Dhaka</div>
        <div>Email: info@moneyexchange.com | Phone: +880 123456789</div>
      </div>
    </header>

    <!-- 🔷 Main Section with background image -->
    <main
      class="main-section flex-grow-1 position-relative text-white d-flex flex-column"
    >
      <div class="overlay"></div>
      <div class="container py-5 position-relative z-2">
        <h2 class="mb-4">Create Customer</h2>
        <router-link to="/customers" class="btn btn-light mb-3"
          >⬅ Back</router-link
        >

        <!-- 🔹 Message -->
        <div
          class="alert"
          :class="success ? 'alert-success' : 'alert-danger'"
          v-if="message"
        >
          {{ message }}
        </div>

        <!-- 🔹 Form -->
        <form @submit.prevent="submitCustomer" class="form-box">
          <div class="form-group mb-3">
            <label>Name</label>
            <input
              v-model="customer.name"
              type="text"
              class="form-control"
              required
            />
          </div>

          <div class="form-group mb-3">
            <label>ID Type</label>
            <input
              v-model="customer.id_type"
              type="text"
              class="form-control"
              required
            />
          </div>

          <div class="form-group mb-3">
            <label>ID Number</label>
            <input
              v-model="customer.id_number"
              type="text"
              class="form-control"
              required
            />
          </div>

          <div class="form-group mb-3">
            <label>Phone</label>
            <input
              v-model="customer.phone"
              type="text"
              class="form-control"
              required
            />
          </div>

          <div class="form-group mb-3">
            <label>Address</label>
            <input
              v-model="customer.address"
              type="text"
              class="form-control"
              required
            />
          </div>

          <div class="form-group mb-4">
            <label>ID Proof Document (PDF)</label>
            <input
              type="file"
              class="form-control"
              @change="handleFile"
              accept="application/pdf"
              required
            />
          </div>

          <button type="submit" class="btn btn-success w-100">✅ Submit</button>
        </form>
      </div>
    </main>

    <!-- 🔷 Footer -->
    <footer class="footer bg-dark text-white text-center py-3 mt-auto">
      &copy; 2025 Money Exchange Ltd. All rights reserved.
    </footer>
  </div>
</template>

<style scoped>
/* Layout */
.page-container {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #ffffff;
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

/* Main Section Background */
.main-section {
  background-image: url("/img/background.webp"); /* Your background */
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8); /* Deep dark overlay */
  z-index: 1;
}

.z-2 {
  position: relative;
  z-index: 2;
}

/* Form box */
.form-box {
  max-width: 500px;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 30px;
  border-radius: 10px;
  color: #ffffff;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
}

.form-control {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.form-control:focus {
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  color: #cccccc;
}

/* Alert */
.alert {
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: bold;
}

.alert-success {
  background-color: #28a745;
  color: white;
}

.alert-danger {
  background-color: #dc3545;
  color: white;
}

/* Buttons */
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
