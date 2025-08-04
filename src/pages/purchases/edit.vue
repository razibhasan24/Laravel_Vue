<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const purchaseId = route.params.id;

const apiUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/purchases/${purchaseId}`;

const purchase = ref({
  agent_id: "",
  purchase_date: "",
  remarks: "",
  purchase_total: "",
  status_id: "",
  items: [],
});

const message = ref("");

// Fetch purchase details
onMounted(async () => {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const result = await response.json();
    purchase.value = result.purchase || result; // fallback if wrapped
  } catch (error) {
    message.value = "Failed to load purchase: " + error.message;
  }
});

function addItem() {
  purchase.value.items.push({ currency_id: "", qty: "", rate: "", vat: "" });
}

function removeItem(index) {
  purchase.value.items.splice(index, 1);
}

async function updatePurchase() {
  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(purchase.value),
    });

    const result = await response.json();

    if (response.ok) {
      message.value = result.message || "Purchase updated successfully!";
      router.push("/purchases");
    } else {
      message.value = result.message || "Update failed.";
      console.error(result);
    }
  } catch (error) {
    message.value = "Update failed: " + error.message;
  }
}
</script>

<template>
  <h1>Edit Purchase</h1>
  <router-link to="/purchases">Back</router-link>
  <div>{{ message }}</div>

  <form @submit.prevent="updatePurchase">
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
      <input type="submit" value="Update" />
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
