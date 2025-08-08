<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const orders = ref([]);
const error = ref("");
const loading = ref(true);

onMounted(async () => {
  loading.value = true;
  try {
    const res = await fetch(
      "http://razib.intelsofts.com/projects/laravel/update_mex/public/api/orders"
    );
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
    const data = await res.json();
    orders.value = data.orders || data || [];
  } catch (err) {
    console.error(err);
    error.value = "Failed to load orders.";
  } finally {
    loading.value = false;
  }
});

function goToShow(orderId) {
  if (!orderId) {
    console.warn("Invalid orderId in goToShow");
    return;
  }
  router.push({ name: "ShowOrder", params: { id: orderId } });
}
</script>

<template>
  <div class="container">
    <h2>Orders List</h2>

    <div v-if="loading">Loading orders...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <table v-else>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Order Date</th>
          <th>Total</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.customer?.name || order.customer_name || "N/A" }}</td>
          <td>{{ order.order_date }}</td>
          <td>{{ order.order_total }}</td>
          <td>
            <button @click="() => goToShow(order.id)">Show</button>
            <!-- Add edit/delete buttons here as needed -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1em;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f2f2f2;
}

.error {
  color: red;
  margin-top: 10px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
}
</style>
