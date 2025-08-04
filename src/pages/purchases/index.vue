<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const purchases = ref([]);
const message = ref("");

const apiUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/purchases`;

onMounted(async () => {
  try {
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    purchases.value = data.purchases || data; // fallback support
  } catch (error) {
    message.value = "Failed to load purchases: " + error.message;
  }
});
</script>

<template>
  <h1>Manage Purchases</h1>
  <router-link to="/purchases/create">+ New Purchase</router-link>
  <p style="color: red">{{ message }}</p>

  <table border="1" cellpadding="8" cellspacing="0" style="margin-top: 15px">
    <thead>
      <tr>
        <th>ID</th>
        <th>Agent ID</th>
        <th>Status ID</th>
        <th>Date</th>
        <th>Total</th>
        <th>Remarks</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="purchase in purchases" :key="purchase.id">
        <td>{{ purchase.id }}</td>
        <td>{{ purchase.agent_id }}</td>
        <td>{{ purchase.status_id }}</td>
        <td>{{ purchase.purchase_date }}</td>
        <td>{{ purchase.purchase_total }}</td>
        <td>{{ purchase.remarks }}</td>
        <td>
          <router-link :to="`/purchases/show/${purchase.id}`">View</router-link>
          |
          <router-link :to="`/purchases/edit/${purchase.id}`">Edit</router-link>
          |
          <router-link :to="`/purchases/delete/${purchase.id}`"
            >Delete</router-link
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  padding: 8px;
  text-align: left;
}
</style>
