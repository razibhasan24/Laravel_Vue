<script setup>
import { ref } from "vue";

const baseUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/`;
const endpoint = `money_receipts`;

const receipts = ref({
  receipt_number: "",
  transaction_id: "",
  customer_id: "",
  agent_id: "",
  total_amount: "",
  payment_method: "",
  status: "",
  issued_by: "",
  issued_date: "",
  notes: "",
});

const message = ref("");

async function submitCustomer() {
  const formData = new FormData();
  formData.append("receipt_number", receipts.value.receipt_number);
  formData.append("transaction_id", receipts.value.transaction_id);
  formData.append("customer_id", receipts.value.customer_id);
  formData.append("agent_id", receipts.value.agent_id);
  formData.append("total_amount", receipts.value.total_amount);
  formData.append("payment_method", receipts.value.payment_method);
  formData.append("status", receipts.value.status);
  formData.append("issued_by", receipts.value.issued_by);
  formData.append("issued_date", receipts.value.issued_date);
  formData.append("notes", receipts.value.notes);

  if (receipts.value.file) {
    formData.append("file", receipts.value.file);
  }

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
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
  <h1>Create Money Receipt</h1>
  <router-link to="/receipts">Back</router-link>
  <p>{{ message }}</p>

  <form @submit.prevent="submitCustomer">
    <div>
      Receipt Number:<br />
      <input v-model="receipts.receipt_number" type="text" />
    </div>
    <div>
      Transaction ID:<br />
      <input v-model="receipts.transaction_id" type="number" />
    </div>
    <div>
      Customer ID:<br />
      <input v-model="receipts.customer_id" type="number" />
    </div>
    <div>
      Agent ID:<br />
      <input v-model="receipts.agent_id" type="number" />
    </div>
    <div>
      Total Amount:<br />
      <input v-model="receipts.total_amount" type="number" />
    </div>
    <div>
      Payment Method:<br />
      <input v-model="receipts.payment_method" type="text" />
    </div>
    <div>
      Status:<br />
      <input v-model="receipts.status" type="text" />
    </div>
    <div>
      Issued By:<br />
      <input v-model="receipts.issued_by" type="text" />
    </div>
    <div>
      Issued Date:<br />
      <input v-model="receipts.issued_date" type="date" />
    </div>
    <div>
      Notes:<br />
      <textarea v-model="receipts.notes"></textarea>
    </div>
    <div>
      <input type="submit" value="Submit" />
    </div>
  </form>
</template>
