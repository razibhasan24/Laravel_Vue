<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

// Router instance
const router = useRouter();
const route = useRoute();
const invoiceId = route.params.id;

// Reactive invoice data
const invoice = ref({});

// Delete handler
async function handleDelete() {
  if (confirm("Are you sure?")) {
    try {
      const response = await fetch(
        `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/invoices/${invoiceId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Delete Error:", errorData);
        alert(`Delete failed: ${errorData.message}`);
        return;
      }

      alert("Invoice deleted successfully.");
      router.push("/invoices");
    } catch (error) {
      console.error("Delete Error:", error);
      alert("An unexpected error occurred.");
    }
  }
}

// Fetch invoice details
onMounted(async () => {
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Fetch failed: " + errorText);
    }

    const data = await response.json();
    invoice.value = data;
  } catch (err) {
    console.error("Fetch Error:", err);
  }
});
</script>

<template>
  <div class="container" style="padding: 20px">
    <h1>Delete Invoice</h1>
    <router-link to="/invoices">⬅ Back to List</router-link>

    <h4 style="margin-top: 20px">
      Are you sure you want to delete this invoice?
    </h4>

    <div style="margin-top: 15px">
      <strong>Customer ID:</strong> {{ invoice.customer_id }} <br />
      <strong>Invoice Date:</strong> {{ invoice.invoice_date }} <br />
      <strong>Status:</strong> {{ invoice.status }} <br />
      <strong>Total Amount:</strong> {{ invoice.total_amount }} <br />
      <strong>Remarks:</strong> {{ invoice.remarks }}
    </div>

    <button
      @click="handleDelete"
      style="
        margin-top: 20px;
        background: red;
        color: white;
        padding: 10px 20px;
        border: none;
        cursor: pointer;
      "
    >
      Delete
    </button>
  </div>
</template>
