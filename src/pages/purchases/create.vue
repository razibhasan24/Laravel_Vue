<script setup>
import { ref } from "vue";

const baseUrl = `http://127.0.0.1:8000/api/`;
const endpoint = `purchases`;

const purchase = ref({
  agent_id: "",
  purchase_date: "",
  remarks: "",
  purchase_total: "",
  status_id: "",
});

const message = ref("");

function handleFile(event) {
  purchase.value.file = event.target.files[0];
}

async function submitpurchase() {
  const formData = new FormData();
  formData.append("agent_id", purchase.value.agent_id);
  formData.append("purchase_date", purchase.value.purchase_date);
  formData.append("remarks", purchase.value.remarks);
  formData.append("purchase_total", purchase.value.purchase_total);
  formData.append("status_id", purchase.value.status_id);

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      body: formData, // no need to set Content-Type
    });

    const result = await response.json();
    message.value = result.message || "Upload successful";
  } catch (error) {
    message.value = "Upload failed: " + error.message;
  }
}
</script>
<template>
  <h1>Create purchase</h1>
  <router-link to="/purchases">Back</router-link>
  {{ message }}
  <form @submit.prevent="submitpurchase">
    <div>
      Agent Id<br />
      <input v-model="purchase.agent_id" type="text" name="agent_id" />
    </div>
    <div>
      Purchase Date<br />
      <input
        v-model="purchase.purchase_date"
        type="date"
        name="purchase_date"
      />
    </div>
    <div>
      Remarks<br />
      <input v-model="purchase.remarks" type="text" name="remarks" />
    </div>
    <div>
      Purchase Total<br />
      <input
        v-model="purchase.purchase_total"
        type="number"
        name="purchase_total"
      />
    </div>
    <div>
      Status Id<br />
      <input v-model="purchase.status_id" type="text" name="status_id" />
    </div>
    <div>
      <input type="submit" value="Submit" />
    </div>
  </form>
</template>
