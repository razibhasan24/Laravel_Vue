<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const apiUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/purchases`;

const purchase = ref({
  agent_id: "",
  purchase_date: "",
  remarks: "",
  purchase_total: "",
  status_id: "",
  items: [{ currency_id: "", qty: "", rate: "", vat: "" }],
});

const message = ref("");

function addItem() {
  purchase.value.items.push({ currency_id: "", qty: "", rate: "", vat: "" });
}

function removeItem(index) {
  purchase.value.items.splice(index, 1);
}

async function submitPurchase() {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(purchase.value),
    });

    const result = await response.json();

    if (response.ok) {
      message.value = result.message || "Purchase created successfully!";
      router.push("/purchases");
    } else {
      message.value = result.message || "Submission failed.";
      console.error(result);
    }
  } catch (error) {
    message.value = "Upload failed: " + error.message;
  }
}
</script>

<template>
  <h1>Create Purchase</h1>
  <router-link to="/purchases">Back</router-link>
  <div>{{ message }}</div>

  <form @submit.prevent="submitPurchase">
    <div>
      Agent ID:<br />
      <input v-model="purchase.agent_id" type="number" required />
    </div>
    <div>
      Purchase Date:<br />
      <input v-model="purchase.purchase_date" type="date" required />
    </div>
    <div>
      Remarks:<br />
      <input v-model="purchase.remarks" type="text" />
    </div>
    <div>
      Purchase Total:<br />
      <input v-model="purchase.purchase_total" type="number" required />
    </div>
    <div>
      Status ID:<br />
      <input v-model="purchase.status_id" type="number" required />
    </div>

    <h3>Purchase Items</h3>
    <table border="1" cellpadding="5">
      <thead>
        <tr>
          <th>Currency ID</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>VAT</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in purchase.items" :key="index">
          <td><input v-model="item.currency_id" type="number" required /></td>
          <td><input v-model="item.qty" type="number" required /></td>
          <td><input v-model="item.rate" type="number" required /></td>
          <td><input v-model="item.vat" type="number" required /></td>
          <td>
            <button
              type="button"
              @click="removeItem(index)"
              v-if="purchase.items.length > 1"
            >
              Remove
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <button type="button" @click="addItem">Add Item</button>

    <div style="margin-top: 20px">
      <input type="submit" value="Submit" />
    </div>
  </form>
</template>

<style scoped>
table {
  margin-top: 10px;
  border-collapse: collapse;
}
td,
th {
  padding: 5px;
}
</style>
