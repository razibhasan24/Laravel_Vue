<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { API_BASE_URL, RECEIPTS_ENDPOINT } from "@/constants";

const router = useRouter();
const route = useRoute();
const message = ref("");

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

onMounted(async () => {
  const response = await fetch(
    `${API_BASE_URL}${RECEIPTS_ENDPOINT}/${route.params.id}`
  );
  receipts.value = await response.json();
});

async function updateReceipt() {
  const formData = new FormData();
  for (const key in receipts.value) {
    formData.append(key, receipts.value[key]);
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}${RECEIPTS_ENDPOINT}/${route.params.id}`,
      {
        method: "POST",
        body: formData,
        headers: {
          "X-HTTP-Method-Override": "PUT", // Laravel expects PUT, but fetch uses POST with override
        },
      }
    );

    const result = await response.json();
    message.value = result.message || "Updated successfully";
    router.push("/receipts");
  } catch (error) {
    message.value = "Update failed: " + error.message;
  }
}
</script>

<template>
  <h1>Edit Money Receipt</h1>
  <router-link to="/receipts">Back</router-link>
  <p>{{ message }}</p>

  <form @submit.prevent="updateReceipt">
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
      <input type="submit" value="Update" />
    </div>
  </form>
</template>
