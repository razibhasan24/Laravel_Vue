<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const purchaseId = route.params.id;

const baseUrl = `http://127.0.0.1:8000/api/`;
const endpoint = `purchases/${purchaseId}`;

const purchase = ref({
  agent_id: "",
  purchase_date: "",
  remarks: "",
  purchase_total: "",
  status_id: "",
});

const file = ref(null);
const message = ref("");

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    purchase.value = await response.json();
  } catch (err) {
    console.error("Fetch Error:", err);
  }
});

function handleFile(event) {
  file.value = event.target.files[0];
}

async function submitpurchase() {
  const formData = new FormData();
  formData.append("agent_id", purchase.value.agent_id);
  formData.append("purchase_date", purchase.value.purchase_date);
  formData.append("remarks", purchase.value.remarks);
  formData.append("purchase_total", purchase.value.purchase_total);
  formData.append("status_id", purchase.value.status_id);

  if (file.value) {
    formData.append("photo", file.value);
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
  <h1>Edit Purchase</h1>
  <router-link to="/purchases">Back</router-link>
  <p style="color: green">{{ message }}</p>

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
