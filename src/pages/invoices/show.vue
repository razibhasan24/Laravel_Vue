<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const invoiceId = route.params.id;

const apiUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/invoices/${invoiceId}`;

const invoice = ref({});

onMounted(async () => {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await response.json();
    invoice.value = data;
    console.log(data);
  } catch (err) {
    console.error("Fetch Error:", err);
  }
});
</script>

<template>
  <h1>Invoice Details</h1>
  <router-link to="/invoices">Back</router-link>
  <div>
    <strong>Customer ID:</strong> {{ invoice.customer_id }}<br />
    <strong>Invoice Date:</strong> {{ invoice.invoice_date }}<br />
    <strong>Status:</strong> {{ invoice.status }}<br />
    <strong>Total Amount:</strong> {{ invoice.total_amount }}<br />
    <strong>Remarks:</strong> {{ invoice.remarks }}
  </div>
</template>
