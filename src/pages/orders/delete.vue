<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const orderId = route.params.id;

const deleting = ref(false);
const error = ref("");
const order = ref(null);
const loading = ref(true);

// Fetch order details for confirmation
const fetchOrder = async () => {
  try {
    const res = await fetch(
      `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/orders/${orderId}`
    );
    if (!res.ok) throw new Error("Failed to fetch order");
    const data = await res.json();
    order.value = data.order || data; // depending on API response
  } catch (err) {
    error.value = "Failed to load order details.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchOrder();
});

// Delete order
const deleteOrder = async () => {
  if (!confirm("Are you sure you want to delete this order?")) return;

  deleting.value = true;
  error.value = "";
  try {
    const response = await fetch(
      `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/orders/${orderId}`,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Failed to delete order");

    alert("Order deleted successfully.");
    router.push("/orders"); // redirect after delete
  } catch (err) {
    console.error("Error deleting order:", err);
    error.value = "Failed to delete the order.";
  } finally {
    deleting.value = false;
  }
};
</script>

<template>
  <div class="container">
    <h2>Delete Order</h2>

    <div v-if="loading">Loading order details...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="order">
      <p>
        Are you sure you want to delete the order with ID:
        <strong>{{ orderId }}</strong
        >?
      </p>
      <p>
        <strong>Customer:</strong>
        {{ order.customer?.name || order.customer_name || "N/A" }}
      </p>
      <p><strong>Order Date:</strong> {{ order.order_date || "N/A" }}</p>
      <p><strong>Total:</strong> {{ order.order_total || "N/A" }}</p>

      <button @click="deleteOrder" :disabled="deleting">
        {{ deleting ? "Deleting..." : "Yes, Delete" }}
      </button>
      <router-link to="/orders">
        <button>Cancel</button>
      </router-link>
    </div>

    <div v-else>
      <p>Order not found.</p>
      <router-link to="/orders">
        <button>Back to Orders</button>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
}

.error {
  color: red;
  margin-bottom: 1em;
}

button {
  margin-right: 10px;
  padding: 8px 16px;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}
</style>
