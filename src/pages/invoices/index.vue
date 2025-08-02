<script setup>
import { ref, onMounted } from "vue";

const invoices = ref([]);

onMounted(async () => {
  try {
    const res = await fetch("/api/invoices");
    const data = await res.json();

    invoices.value = data.invoices || [];
    console.log("", invoices.value);
  } catch (err) {
    console.error("", err);
  }
});
</script>

<template>
  <h1>Manage Invoices</h1>
  <router-link to="/invoices/create">New Invoice</router-link>

  <table class="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Customer ID</th>
        <th>Invoice Date</th>
        <th>Total Amount</th>
        <th>Status ID</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="invoice in invoices" :key="invoice.id">
        <td>{{ invoice.id }}</td>
        <td>{{ invoice.customer_id }}</td>
        <td>{{ invoice.invoice_date }}</td>
        <td>{{ invoice.total_amount }}</td>
        <td>{{ invoice.status }}</td>
        <td class="btn-group">
          <router-link :to="`/invoices/show/${invoice.id}`">View</router-link>
          <router-link :to="`/invoices/edit/${invoice.id}`">Edit</router-link>
          <router-link :to="`/invoices/delete/${invoice.id}`"
            >Delete</router-link
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>
