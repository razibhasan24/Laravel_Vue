<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const invoice = ref(null);
const message = ref("");
const error = ref("");

async function fetchInvoice() {
  try {
    const res = await fetch(
      `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/invoices/${route.params.id}`
    );
    if (res.ok) invoice.value = await res.json();
    else error.value = "Invoice not found.";
  } catch (e) {
    error.value = e.message;
  }
}

async function deleteInvoice() {
  if (!confirm("Are you sure you want to delete this invoice?")) return;

  try {
    const res = await fetch(
      `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/invoices/${route.params.id}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      alert("Invoice deleted successfully.");
      router.push("/invoices");
    } else {
      const errText = await res.text();
      throw new Error(errText);
    }
  } catch (e) {
    message.value = "Failed to delete invoice: " + e.message;
  }
}

onMounted(fetchInvoice);
</script>

<template>
  <div class="container" v-if="invoice">
    <h2>Delete Invoice #{{ invoice.id }}</h2>
    <p>Are you sure you want to delete this invoice?</p>
    <p><strong>Customer ID:</strong> {{ invoice.customer_id }}</p>
    <p><strong>Invoice Date:</strong> {{ invoice.invoice_date }}</p>
    <p><strong>Status:</strong> {{ invoice.status }}</p>

    <button @click="deleteInvoice">Yes, Delete</button>
    <button @click="$router.back()">Cancel</button>

    <p style="color: red">{{ message }}</p>
  </div>
  <p v-else-if="error">{{ error }}</p>
  <p v-else>Loading...</p>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  margin-top: 40px;
}
button {
  margin: 10px 10px 0 0;
  padding: 8px 15px;
  background-color: #cc0000;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #ff3333;
}
</style>
