<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const invoices = ref([]);
const message = ref("");
const router = useRouter();

async function fetchInvoices() {
  try {
    const res = await fetch(
      "http://razib.intelsofts.com/projects/laravel/update_mex/public/api/invoices"
    );
    if (res.ok) {
      invoices.value = await res.json();
    } else {
      message.value = "Failed to fetch invoices.";
    }
  } catch (e) {
    message.value = "Error: " + e.message;
  }
}

function goToCreate() {
  router.push("/invoices/create");
}

function goToShow(id) {
  router.push(`/invoices/${id}`);
}

function goToEdit(id) {
  router.push(`/invoices/edit/${id}`);
}

function goToDelete(id) {
  router.push(`/invoices/delete/${id}`);
}

onMounted(fetchInvoices);
</script>

<template>
  <div class="container">
    <h2>Invoices</h2>
    <button @click="goToCreate">Create New Invoice</button>

    <table
      border="1"
      cellpadding="6"
      cellspacing="0"
      style="margin-top: 20px; width: 100%; border-collapse: collapse"
    >
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer ID</th>
          <th>Invoice Date</th>
          <th>Status</th>
          <th>Total Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="invoice in invoices" :key="invoice.id">
          <td>{{ invoice.id }}</td>
          <td>{{ invoice.customer_id }}</td>
          <td>{{ invoice.invoice_date }}</td>
          <td>{{ invoice.status }}</td>
          <td>
            {{
              invoice.total_amount !== null &&
              invoice.total_amount !== undefined &&
              !isNaN(invoice.total_amount)
                ? Number(invoice.total_amount).toFixed(2)
                : "0.00"
            }}
          </td>
          <td>
            <button @click="goToShow(invoice.id)">Show</button>
            <button @click="goToEdit(invoice.id)">Edit</button>
            <button @click="goToDelete(invoice.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p style="color: red">{{ message }}</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
}
button {
  margin: 0 5px 5px 0;
  padding: 5px 12px;
  background-color: #003366;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0055aa;
}
table th {
  background-color: #003366;
  color: white;
  padding: 8px;
  text-align: center;
}
table td {
  padding: 8px;
  text-align: center;
}
</style>
