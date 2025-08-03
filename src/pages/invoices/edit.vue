<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const invoiceId = route.params.id;

// সরাসরি API URL এখানে
const apiUrl = `http://razib.intelsofts.com/projects/laravel/mex/api/invoices/${invoiceId}`;

const invoice = ref({
  customer_id: "",
  invoice_date: "",
  remarks: "",
  total_amount: "",
  status: "",
});

const message = ref("");

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
  } catch (err) {
    console.error("Fetch Error:", err);
  }
});

async function submitInvoice() {
  const formData = new FormData();
  formData.append("customer_id", invoice.value.customer_id);
  formData.append("invoice_date", invoice.value.invoice_date);
  formData.append("remarks", invoice.value.remarks);
  formData.append("total_amount", invoice.value.total_amount);
  formData.append("status", invoice.value.status);

  try {
    const response = await fetch(apiUrl, {
      method: "POST", // অথবা PUT/PATCH যা API প্রয়োজন করে
      body: formData,
    });

    const result = await response.json();
    message.value = result.message || "Invoice updated successfully";
  } catch (error) {
    message.value = "Update failed: " + error.message;
  }
}
</script>

<template>
  <div>
    <h1>Edit Invoice</h1>
    <router-link to="/invoices">← Back</router-link>

    <p style="color: green">{{ message }}</p>

    <form @submit.prevent="submitInvoice">
      <div>
        <label>Customer ID:</label><br />
        <input v-model="invoice.customer_id" type="text" name="customer_id" />
      </div>

      <div>
        <label>Invoice Date:</label><br />
        <input v-model="invoice.invoice_date" type="date" name="invoice_date" />
      </div>

      <div>
        <label>Remarks:</label><br />
        <input v-model="invoice.remarks" type="text" name="remarks" />
      </div>

      <div>
        <label>Total Amount:</label><br />
        <input
          v-model="invoice.total_amount"
          type="number"
          name="total_amount"
        />
      </div>

      <div>
        <label>Status:</label><br />
        <input v-model="invoice.status" type="text" name="status" />
      </div>

      <div style="margin-top: 15px">
        <input type="submit" value="Update Invoice" />
      </div>
    </form>
  </div>
</template>
