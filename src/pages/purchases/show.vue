<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const purchaseId = route.params.id;

const purchase = ref({});

const baseUrl = `http://127.0.0.1:8000/api/`;
const endpoint = `purchase/${purchaseId}`;

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    let c = await response.json();
    purchase.value = c;
    console.log(c);
  } catch (err) {
    console.error("Fetch Error:", err);
    throw err;
  }
});
</script>
<template>
  <h1>Details</h1>
  <router-link to="/purchase">Back</router-link>
  {{ purchase.agent_id }}<br />
  {{ purchase.purchase_date }}<br />
  {{ purchase.remarks }}<br />
  {{ purchase.purchase_total }}<br />
  {{ purchase.status_id }}
</template>
