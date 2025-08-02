<script setup>
import { ref, onMounted } from "vue";

const purchases = ref([]);
const baseUrl = `http://127.0.0.1:8000/api/`;
const endpoint = `purchases`;

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await response.json();
    purchases.value = data.purchases; // Adjust this line if API response differs
  } catch (err) {
    console.error("Fetch Error:", err);
    purchases.value = [];
  }
});
</script>

<template>
  <h1>Manage Purchase</h1>
  <router-link to="/purchases/create">New Purchase</router-link>

  <table class="table">
    <thead>
      <tr>
        <th>#Id</th>
        <th>Agent_Id</th>
        <th>Purchase_Date</th>
        <th>Remarks</th>
        <th>Purchase_Total</th>
        <th>Status_Id</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="purchase in purchases" :key="purchase.id">
        <td>{{ purchase.id }}</td>
        <td>
          <img
            :src="`http://127.0.0.1:8000/img/${purchase.photo}`"
            alt="User Photo"
            height="100"
          />
        </td>
        <td>{{ purchase.agent_id }}</td>
        <td>{{ purchase.purchase_date }}</td>
        <td>{{ purchase.remarks }}</td>
        <td>{{ purchase.purchase_total }}</td>
        <td>{{ purchase.status_id }}</td>
        <td class="btn-group">
          <router-link :to="`/purchases/show/${purchase.id}`">View</router-link>
          <router-link :to="`/purchases/edit/${purchase.id}`">Edit</router-link>
          <router-link :to="`/purchases/delete/${purchase.id}`"
            >Delete</router-link
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>
