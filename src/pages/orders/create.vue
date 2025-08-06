<script setup>
import { reactive, ref, onMounted, toRaw } from "vue";

// order object holds everything
const order = reactive({
  customer_id: "",
  order_date: "",
  order_total: 0,
  status_id: 1,
  paid_amount: 0,
  remarks: "",
  items: [],
  customers: [],
  products: [],
});

// new item for adding to order
const newItem = reactive({
  product_id: "",
  qty: 1,
  rate: 0,
  vat: 0,
});

// fetch customers and products
onMounted(async () => {
  try {
    const [resCustomers, resProducts] = await Promise.all([
      fetch(
        "http://razib.intelsofts.com/projects/laravel/update_mex/public/api/customers"
      ),
      fetch(
        "http://razib.intelsofts.com/projects/laravel/update_mex/public/api/products"
      ),
    ]);

    const customerData = await resCustomers.json();
    const productData = await resProducts.json();

    order.customers = customerData.customers || [];
    order.products = productData.products || [];
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// Add item to order.items
const addItem = () => {
  const selectedProduct = order.products.find(
    (p) => p.id === newItem.product_id
  );
  if (!selectedProduct) return;

  order.items.push({
    product_id: newItem.product_id,
    product_name: selectedProduct.name,
    qty: newItem.qty,
    rate: newItem.rate,
    vat: newItem.vat,
  });

  updateTotal();
};

// Update order total
const updateTotal = () => {
  order.order_total = order.items.reduce((sum, item) => {
    return sum + (item.qty * item.rate + item.vat);
  }, 0);
  order.paid_amount = order.order_total;
};

// Submit the order
const submitOrder = async () => {
  try {
    const response = await fetch(
      "http://razib.intelsofts.com/projects/laravel/update_mex/public/api/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(toRaw(order)),
      }
    );

    const result = await response.json();
    console.log("Order submitted:", result);
  } catch (error) {
    console.error("Error submitting order:", error);
  }
};
</script>

<template>
  <div class="order-container">
    <h2>Create Order</h2>
    <div class="form-section">
      <label>Customer</label>
      <select v-model="order.customer_id">
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
    </div>

    <h3>Add Items</h3>
    <div class="form-section">
      <select v-model="newItem.product_id">
        <option
          v-for="product in order.products"
          :key="product.id"
          :value="product.id"
        >
          {{ product.name }}
        </option>
      </select>
      <input type="number" placeholder="Qty" v-model.number="newItem.qty" />
      <input type="number" placeholder="Rate" v-model.number="newItem.rate" />
      <input type="number" placeholder="VAT" v-model.number="newItem.vat" />
      <button @click="addItem">Add</button>
    </div>

    <table class="order-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>VAT</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in order.items" :key="index">
          <td>{{ item.product_name }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.rate }}</td>
          <td>{{ item.vat }}</td>
          <td>{{ (item.qty * item.rate + item.vat).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="totals">
      <p><strong>Total:</strong> {{ order.order_total }}</p>
    </div>

    <button @click="submitOrder">Submit Order</button>
  </div>
</template>

<style scoped>
.order-container {
  padding: 20px;
  max-width: 800px;
  margin: auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px #ccc;
}
.form-section {
  margin-bottom: 20px;
}
label {
  display: block;
  margin-top: 10px;
}
input,
select,
textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}
.order-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
.order-table th,
.order-table td {
  border: 1px solid #ccc;
  padding: 10px;
}
.totals {
  text-align: right;
  margin-top: 20px;
}
</style>
