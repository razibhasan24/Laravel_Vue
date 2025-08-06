<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const apiUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/purchases`;

const purchase = ref({
  agent_id: "",
  purchase_date: "",
  remarks: "",
  purchase_total: "",
  status_id: "",
  items: [{ currency_id: "", qty: "", rate: "", vat: "" }],
});

const message = ref("");

function addItem() {
  purchase.value.items.push({ currency_id: "", qty: "", rate: "", vat: "" });
}

function removeItem(index) {
  purchase.value.items.splice(index, 1);
}

async function submitPurchase() {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(purchase.value),
    });

    const result = await response.json();

    if (response.ok) {
      message.value = result.message || "Purchase created successfully!";
      router.push("/purchases");
    } else {
      message.value = result.message || "Submission failed.";
      console.error(result);
    }
  } catch (error) {
    message.value = "Upload failed: " + error.message;
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
        <div>Email: info@moneyexchange.com | Phone: +880 123456789</div>
      </div>
    </header>

    <!-- 🔷 Main Section -->
    <main
      class="main-section flex-grow-1 position-relative text-white front-weight-blod d-flex flex-column"
    >
      <div class="overlay"></div>
      <div class="container py-5 position-relative z-2">
        <h2 class="text-center mb-4">Create Purchase</h2>
        <router-link to="/purchases" class="btn btn-info mb-3"
          >⬅ Back</router-link
        >

        <!-- 🔹 Message -->
        <div class="alert alert-info" v-if="message">{{ message }}</div>

        <!-- 🔹 Purchase Form -->
        <form
          @submit.prevent="submitPurchase"
          class="form-box text-white front-weight-blod mb-5 mx-auto"
        >
          <div class="form-group mb-3">
            <label>Agent ID</label>
            <input
              v-model="purchase.agent_id"
              type="number"
              class="form-control"
              required
            />
          </div>

          <div class="form-group mb-3">
            <label>Purchase Date</label>
            <input
              v-model="purchase.purchase_date"
              type="date"
              class="form-control"
              required
            />
          </div>

          <div class="form-group mb-3">
            <label>Remarks</label>
            <input
              v-model="purchase.remarks"
              type="text"
              class="form-control"
            />
          </div>

          <div class="form-group mb-3">
            <label>Purchase Total</label>
            <input
              v-model="purchase.purchase_total"
              type="number"
              class="form-control"
              required
            />
          </div>

          <div class="form-group mb-4">
            <label>Status ID</label>
            <input
              v-model="purchase.status_id"
              type="number"
              class="form-control"
              required
            />
          </div>
        </form>

        <!-- 🔹 Purchase Items -->
        <div class="purchase-items-box mt-4">
          <h3 class="mb-3">Add Purchase Items</h3>
          <div class="table-responsive">
            <table class="table table-custom text-black.">
              <thead>
                <tr>
                  <th>Currency ID</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>VAT</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in purchase.items" :key="index">
                  <td>
                    <input
                      v-model="item.currency_id"
                      type="number"
                      class="form-control"
                      required
                    />
                  </td>
                  <td>
                    <input
                      v-model="item.qty"
                      type="number"
                      class="form-control"
                      required
                    />
                  </td>
                  <td>
                    <input
                      v-model="item.rate"
                      type="number"
                      class="form-control"
                      required
                    />
                  </td>
                  <td>
                    <input
                      v-model="item.vat"
                      type="number"
                      class="form-control"
                      required
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger btn-sm"
                      @click="removeItem(index)"
                      v-if="purchase.items.length > 1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="d-flex mt-3" style="gap: 30px">
            <button type="button" class="btn btn-warning" @click="addItem">
              ➕ Add Item
            </button>
            <button
              type="submit"
              class="btn btn-success"
              @click="submitPurchase"
            >
              ✅ Submit Purchase
            </button>
          </div>
        </div>
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
  background-image: url("/img/background.webp");
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: hidden;
}

.overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(84, 79, 79, 0.85); /* Deep opacity */
  z-index: 1;
}

.z-2 {
  position: relative;
  z-index: 2;
}

/* Form box */
.form-box {
  max-width: 500px;
  background-color: rgba(171, 157, 157, 0.05);
  padding: 30px;
  color: black;
}

label {
  font-weight: bold;
}

.form-control {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.form-control:focus {
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  outline: none;
  box-shadow: none;
}

/* Table Styling */
.table-custom {
  background-color: rgba(255, 255, 255, 0.05);
}

.table-custom th {
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

.table-custom td {
  background-color: rgba(255, 255, 255, 0.05);
}

/* Buttons */
.btn-success {
  background-color: #28a745;
  border: none;
}
.btn-success:hover {
  background-color: #218838;
}
.btn-warning {
  background-color: #ffc107;
  color: #212529;
  border: none;
}
.btn-warning:hover {
  background-color: #218838;
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
    padding: 1rem;
  }

  .topbar h4 {
    font-size: 1rem;
  }

  .topbar .text-end {
    font-size: 1rem;
  }

  .table th,
  .table td {
    font-size: 1rem;
  }
}
</style>
