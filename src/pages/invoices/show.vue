<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const invoice = ref(null);
const message = ref("");

async function fetchInvoice() {
  try {
    const res = await fetch(
      `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/invoices/${route.params.id}`
    );
    if (res.ok) {
      invoice.value = await res.json();
    } else {
      message.value = "Failed to load invoice.";
    }
  } catch (e) {
    message.value = "Error: " + e.message;
  }
}

onMounted(fetchInvoice);

function back() {
  router.push("/invoices");
}
</script>

<template>
  <div class="container" v-if="invoice">
    <h2>Invoice #{{ invoice.id }}</h2>
    <p><strong>Customer ID:</strong> {{ invoice.customer_id }}</p>
    <p><strong>Date:</strong> {{ invoice.invoice_date }}</p>
    <p><strong>Status:</strong> {{ invoice.status }}</p>
    <p><strong>Total Amount:</strong> {{ invoice.total_amount.toFixed(2) }}</p>

    <h3>Items</h3>
    <table border="1" cellpadding="6" cellspacing="0">
      <thead>
        <tr>
          <th>Description</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>VAT</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in invoice.items" :key="idx">
          <td>{{ item.description }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.rate.toFixed(2) }}</td>
          <td>{{ item.vat.toFixed(2) }}</td>
          <td>{{ item.total_amount.toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>

    <button @click="back">Back to list</button>
  </div>
  <p v-else>{{ message }}</p>
</template>

<style scoped>
.container {
  max-width: 700px;
  margin: auto;
}
button {
  margin-top: 15px;
  padding: 8px 15px;
  background-color: #003366;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0055aa;
}
table {
  margin-top: 15px;
  width: 100%;
  border-collapse: collapse;
}
th {
  background-color: #003366;
  color: white;
}
td,
th {
  padding: 8px;
  text-align: center;
}
</style>
