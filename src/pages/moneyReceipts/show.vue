<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
// import { API_BASE_URL, RECEIPTS_ENDPOINT } from "@/constants";

const route = useRoute();
const receipt = ref({});
const message = ref("");

onMounted(async () => {
  const response = await fetch(
    `${API_BASE_URL}${RECEIPTS_ENDPOINT}/${route.params.id}`
  );
  const data = await response.json();

  if (data.message === "Not Found") {
    message.value = "Receipt not found.";
  } else {
    receipt.value = data;
  }
});
</script>

<template>
  <h1>View Receipt</h1>
  <router-link to="/receipts">Back</router-link>
  <p v-if="message">{{ message }}</p>

  <div v-else>
    <p><strong>Receipt Number:</strong> {{ receipt.receipt_number }}</p>
    <p><strong>Transaction ID:</strong> {{ receipt.transaction_id }}</p>
    <p><strong>Total Amount:</strong> {{ receipt.total_amount }}</p>
    <p><strong>Issued By:</strong> {{ receipt.issued_by }}</p>
    <p><strong>Issued Date:</strong> {{ receipt.issued_date }}</p>
    <p><strong>Notes:</strong> {{ receipt.notes }}</p>
  </div>
</template>
