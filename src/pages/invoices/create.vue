<script setup>
import { ref, onMounted } from "vue";

const invoices = ref([]);
const message = ref("");

const invoice = ref({
  customer_id: "",
  invoice_date: "",
  total_amount: "",
  status: "",
});

// GET invoices (onMounted)
onMounted(async () => {
  try {
    const res = await fetch("/api/invoices");
    const data = await res.json();
    invoices.value = data.invoices || [];
    console.log("API Response:", data);
  } catch (err) {
    console.error("Fetch error:", err);
  }
});

// POST invoice
async function submitCustomer() {
  const formData = new FormData();
  formData.append("customer_id", invoice.value.customer_id);
  formData.append("invoice_date", invoice.value.invoice_date);
  formData.append("total_amount", invoice.value.total_amount);
  formData.append("status", invoice.value.status);

  try {
    const response = await fetch("/api/invoices", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    message.value = result.message || "Upload successful";
  } catch (error) {
    message.value = "Upload failed: " + error.message;
  }
}
</script>

<template>
  <h1>Create Invoice</h1>
  <router-link to="/invoices">Back</router-link>
  <p>{{ message }}</p>

  <form @submit.prevent="submitCustomer">
    <div>
      Customer ID<br />
      <input
        v-model="invoice.customer_id"
        type="number"
        name="customer_id"
        required
      />
    </div>
    <div>
      Invoice Date<br />
      <input
        v-model="invoice.invoice_date"
        type="date"
        name="invoice_date"
        required
      />
    </div>
    <div>
      Total Amount<br />
      <input
        v-model="invoice.total_amount"
        type="number"
        name="total_amount"
        required
      />
    </div>
    <div>
      Status<br />
      <input v-model="invoice.status" type="text" name="status" required />
    </div>
    <div>
      <input type="submit" value="Submit" />
    </div>
  </form>
</template>
