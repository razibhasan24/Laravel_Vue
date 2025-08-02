<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const invoiceId = route.params.id;

const invoice = ref({});

const baseUrl = `http://127.0.0.1:8000/api/`;
const endpoint = `invoices/${invoiceId}`;

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
    invoice.value = c;
    console.log(c);
  } catch (err) {
    console.error("Fetch Error:", err);
    throw err;
  }
});
</script>
<template>
  <h1>Details</h1>
  <router-link to="/invoices">Back</router-link>
  {{ invoice.name }}<br />
  {{ invoice.mobile }}<br />
  {{ invoice.email }}
</template>
