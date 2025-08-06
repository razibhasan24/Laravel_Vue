<script setup>
import { ref, onMounted } from "vue";
// import { API_BASE_URL, RECEIPTS_ENDPOINT } from "@/constants";
import { useRouter } from "vue-router";

const receipts = ref([]);
const router = useRouter();
const message = ref("");

async function fetchReceipts() {
  const response = await fetch(`${API_BASE_URL}${RECEIPTS_ENDPOINT}`);
  receipts.value = await response.json();
}

async function deleteReceipt(id) {
  if (!confirm("Are you sure you want to delete this receipt?")) return;

  const response = await fetch(`${API_BASE_URL}${RECEIPTS_ENDPOINT}/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();
  message.value = result.message || "Deleted successfully";
  await fetchReceipts();
}

onMounted(fetchReceipts);
</script>

<template>
  <h1>All Money Receipts</h1>
  <router-link to="/receipts/create">+ Create New</router-link>
  <p>{{ message }}</p>

  <table border="1" cellpadding="5">
    <thead>
      <tr>
        <th>ID</th>
        <th>Receipt Number</th>
        <th>Total</th>
        <th>Issued Date</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="receipt in receipts" :key="receipt.id">
        <td>{{ receipt.id }}</td>
        <td>{{ receipt.receipt_number }}</td>
        <td>{{ receipt.total_amount }}</td>
        <td>{{ receipt.issued_date }}</td>
        <td>
          <router-link :to="`/receipts/${receipt.id}`">View</router-link> |
          <router-link :to="`/receipts/${receipt.id}/edit`">Edit</router-link> |
          <button @click="deleteReceipt(receipt.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
