<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

// ✅ Change to your actual API base
const API_BASE_URL =
  "http://razib.intelsofts.com/projects/laravel/update_mex/public/api";
const RECEIPTS_ENDPOINT = "/receipts";

const receipts = ref([]);
const router = useRouter();
const message = ref("");
const loading = ref(true);

const currentPage = ref(1);
const itemsPerPage = 10;

async function fetchReceipts() {
  loading.value = true;
  try {
    const response = await fetch(`${API_BASE_URL}${RECEIPTS_ENDPOINT}`);
    const data = await response.json();
    receipts.value = (data.receipts || data).reverse(); // Latest first
  } catch (e) {
    message.value = "Failed to load receipts.";
  } finally {
    loading.value = false;
  }
}

async function deleteReceipt(id) {
  if (!confirm("Are you sure you want to delete this receipt?")) return;

  try {
    const response = await fetch(`${API_BASE_URL}${RECEIPTS_ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    message.value = result.message || "Deleted successfully";
    await fetchReceipts();
  } catch (e) {
    message.value = "Delete failed.";
  }
}

onMounted(fetchReceipts);

// Pagination logic
const totalPages = computed(() =>
  Math.ceil(receipts.value.length / itemsPerPage)
);

const paginatedReceipts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return receipts.value.slice(start, start + itemsPerPage);
});

function goToPage(page) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}
</script>

<template>
  <div class="container mt-4">
    <h1 class="mb-3">All Money Receipts</h1>
    <router-link class="btn btn-success mb-3" to="/receipts/create">
      ➕ Create New
    </router-link>

    <div v-if="message" class="alert alert-info">{{ message }}</div>
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary"></div>
    </div>

    <div v-if="!loading && paginatedReceipts.length">
      <table class="table table-bordered table-hover text-center">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Receipt Number</th>
            <th>Total</th>
            <th>Issued Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="receipt in paginatedReceipts" :key="receipt.id">
            <td>{{ receipt.id }}</td>
            <td>{{ receipt.receipt_number }}</td>
            <td>{{ receipt.total_amount }}</td>
            <td>{{ receipt.issued_date }}</td>
            <td>
              <router-link
                :to="`/receipts/${receipt.id}`"
                class="btn btn-sm btn-info me-1"
              >
                View
              </router-link>
              <router-link
                :to="`/receipts/${receipt.id}/edit`"
                class="btn btn-sm btn-warning me-1"
              >
                Edit
              </router-link>
              <button
                class="btn btn-sm btn-danger"
                @click="deleteReceipt(receipt.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <nav class="mt-4">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a
              class="page-link"
              href="#"
              @click.prevent="goToPage(currentPage - 1)"
            >
              Prev
            </a>
          </li>

          <li
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: currentPage === page }"
          >
            <a class="page-link" href="#" @click.prevent="goToPage(page)">
              {{ page }}
            </a>
          </li>

          <li
            class="page-item"
            :class="{ disabled: currentPage === totalPages }"
          >
            <a
              class="page-link"
              href="#"
              @click.prevent="goToPage(currentPage + 1)"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>

    <div v-if="!loading && !receipts.length" class="alert alert-warning">
      No receipts found.
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1100px;
  margin: 0 auto;
}

.table th,
.table td {
  vertical-align: middle;
}

.page-link {
  cursor: pointer;
}
</style>
