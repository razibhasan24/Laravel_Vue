<script setup>
import { reactive, ref, onMounted, toRaw } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const orderId = route.params.id;

const order = reactive({
  customer_id: "",
  order_date: "",
  order_total: 0,
  status_id: 1,
  paid_amount: 0,
  remarks: "",
  items: [],
  customers: [],
  // products removed
});

const isLoading = ref(false);
const error = ref("");

// Fetch order and customers only
onMounted(async () => {
  isLoading.value = true;
  try {
    const [resOrder, resCustomers] = await Promise.all([
      fetch(
        `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/orders/${orderId}`
      ),
      fetch(
        "http://razib.intelsofts.com/projects/laravel/update_mex/public/api/customers"
      ),
    ]);

    if (!resOrder.ok || !resCustomers.ok) {
      throw new Error("Failed fetching data");
    }

    const orderData = await resOrder.json();
    const customerData = await resCustomers.json();

    order.customers = customerData.customers || [];

    Object.assign(order, orderData.order || orderData);

    updateTotal();
  } catch (err) {
    console.error(err);
    error.value = "Failed to load data.";
  } finally {
    isLoading.value = false;
  }
});

// Update total based on items in order
const updateTotal = () => {
  order.order_total = order.items.reduce(
    (sum, item) => sum + item.qty * item.rate + item.vat,
    0
  );
  order.paid_amount = order.order_total;
};

// Submit updated order
const updateOrder = async () => {
  try {
    const response = await fetch(
      `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/orders/${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(toRaw(order)),
      }
    );

    if (!response.ok) throw new Error("Failed to update");

    const result = await response.json();
    console.log("Updated:", result);
    router.push("/orders");
  } catch (error) {
    console.error("Error updating order:", error);
    error.value = "Failed to update order.";
  }
};
</script>

<template>
  <div class="container">
    <h2>Edit Order</h2>

    <div v-if="isLoading">Loading...</div>
    <div v-else>
      <div v-if="error" class="error">{{ error }}</div>

      <label>Customer</label>
      <select v-model="order.customer_id">
        <option disabled value="">Please select a customer</option>
        <option
          v-for="customer in order.customers"
          :key="customer.id"
          :value="customer.id"
        >
          {{ customer.name }}
        </option>
      </select>

      <label>Order Date</label>
      <input type="date" v-model="order.order_date" />

      <label>Remarks</label>
      <textarea v-model="order.remarks"></textarea>

      <h3>Items</h3>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>VAT</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in order.items" :key="index">
            <td>{{ item.product_name || "Unknown Product" }}</td>
            <td>
              <input
                type="number"
                min="0"
                v-model.number="item.qty"
                @input="updateTotal"
              />
            </td>
            <td>
              <input
                type="number"
                min="0"
                step="0.01"
                v-model.number="item.rate"
                @input="updateTotal"
              />
            </td>
            <td>
              <input
                type="number"
                min="0"
                step="0.01"
                v-model.number="item.vat"
                @input="updateTotal"
              />
            </td>
            <td>{{ (item.qty * item.rate + item.vat).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>

      <p><strong>Total:</strong> {{ order.order_total.toFixed(2) }}</p>

      <button @click="updateOrder">Update Order</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

label {
  display: block;
  margin-top: 15px;
  font-weight: 600;
}

select,
input[type="date"],
textarea {
  width: 100%;
  padding: 6px;
  margin-top: 5px;
  box-sizing: border-box;
}

table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
}

td,
th {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

button {
  margin-top: 20px;
  padding: 10px 15px;
  font-size: 1rem;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
