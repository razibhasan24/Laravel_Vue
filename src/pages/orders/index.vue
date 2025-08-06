<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const orders = ref([]);
const router = useRouter();

onMounted(async () => {
  try {
    const res = await fetch(
      "http://razib.intelsofts.com/projects/laravel/update_mex/public/api/orders"
    );
    const data = await res.json();
    orders.value = data.orders || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
});

const goToCreateOrder = () => {
  router.push("/create-order");
};
</script>

<template>
  <div class="order-list-container">
    <div class="header">
      <h2>Order List</h2>
      <button @click="goToCreateOrder">+ Create New Order</button>
    </div>

    <table class="order-table" v-if="orders.length">
      <thead>
        <tr>
          <th>#</th>
          <th>Customer</th>
          <th>Date</th>
          <th>Total</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="order.id">
          <td>{{ index + 1 }}</td>
          <td>{{ order.customer_name || order.customer?.name }}</td>
          <td>{{ order.order_date }}</td>
          <td>{{ order.order_total }}</td>
          <td>{{ order.status_id }}</td>
          <td>
            <!-- Future: View/Edit buttons -->
            <button @click="() => alert('Coming soon')">View</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else>
      <p>No orders found.</p>
    </div>
  </div>
</template>

<style scoped>
.order-list-container {
  max-width: 1000px;
  margin: auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px #ccc;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.order-table {
  width: 100%;
  border-collapse: collapse;
}
.order-table th,
.order-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}
.order-table th {
  background-color: #f4f4f4;
}
button {
  padding: 6px 12px;
  background-color: #007bff;
  border: none;
  color: #fff;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
