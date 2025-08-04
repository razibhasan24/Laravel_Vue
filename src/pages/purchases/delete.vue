<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const purchaseId = route.params.id;

const purchase = ref(null);
const message = ref("");

const apiUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/purchases/${purchaseId}`;

// Fetch the specific purchase for display
onMounted(async () => {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const result = await response.json();
    purchase.value = result.purchase || result;
  } catch (error) {
    message.value = "Error loading purchase: " + error.message;
  }
});

// Handle deletion
async function handleDelete() {
  if (!confirm("Are you sure you want to delete this purchase?")) return;

  try {
    const response = await fetch(apiUrl, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
    });

    const result = await response.json();

    if (response.ok) {
      message.value = result.message || "Purchase deleted successfully!";
      router.push("/purchases");
    } else {
      message.value = result.message || "Delete failed.";
    }
  } catch (error) {
    message.value = "Delete failed: " + error.message;
  }
}
</script>

<template>
  <h1>Delete Purchase</h1>
  <router-link to="/purchases">Back</router-link>

  <div v-if="message">{{ message }}</div>

  <div v-if="purchase">
    <p><strong>Agent ID:</strong> {{ purchase.agent_id }}</p>
    <p><strong>Status ID:</strong> {{ purchase.status_id }}</p>
    <p><strong>Date:</strong> {{ purchase.purchase_date }}</p>
    <p><strong>Total:</strong> {{ purchase.purchase_total }}</p>
    <p><strong>Remarks:</strong> {{ purchase.remarks }}</p>

    <h3>Items</h3>
    <table border="1" cellpadding="5">
      <thead>
        <tr>
          <th>Currency ID</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>VAT</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in purchase.items || []" :key="index">
          <td>{{ item.currency_id }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.rate }}</td>
          <td>{{ item.vat }}</td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 20px">
      <button @click="handleDelete">Yes, Delete</button>
    </div>
  </div>

  <div v-else>
    <p>Loading purchase details...</p>
  </div>
</template>

<style scoped>
table {
  margin-top: 10px;
  border-collapse: collapse;
}
td,
th {
  padding: 5px;
}
</style>
