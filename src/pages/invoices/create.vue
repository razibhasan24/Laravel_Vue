<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const message = ref("");

const customers = ref([]);
const invoice = ref({
  customer_id: "",
  invoice_date: "",
  total_amount: 0,
  status: "",
  items: [],
});

const newItem = ref({
  description: "",
  qty: 0,
  rate: 0,
  vat: 0,
});

function addItem() {
  if (
    !newItem.value.description ||
    newItem.value.qty <= 0 ||
    newItem.value.rate <= 0
  ) {
    alert("Please fill valid item details.");
    return;
  }
  const total =
    newItem.value.qty * newItem.value.rate +
    (newItem.value.qty * newItem.value.rate * newItem.value.vat) / 100;

  invoice.value.items.push({
    description: newItem.value.description,
    qty: newItem.value.qty,
    rate: newItem.value.rate,
    vat: newItem.value.vat,
    total_amount: total,
  });

  newItem.value = { description: "", qty: 0, rate: 0, vat: 0 };
  updateTotalAmount();
}

function removeItem(index) {
  invoice.value.items.splice(index, 1);
  updateTotalAmount();
}

function updateTotalAmount() {
  invoice.value.total_amount = invoice.value.items.reduce(
    (sum, item) => sum + item.total_amount,
    0
  );
}

async function submitInvoice() {
  if (
    !invoice.value.customer_id ||
    !invoice.value.invoice_date ||
    invoice.value.items.length === 0
  ) {
    alert("Please fill all required fields and add at least one item.");
    return;
  }

  try {
    const response = await fetch(
      "http://razib.intelsofts.com/projects/laravel/update_mex/public/api/invoices",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(invoice.value),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
    }

    await response.json();
    message.value = "Invoice created successfully!";
    router.push("/invoices"); // Redirect to list page after creation
  } catch (error) {
    message.value = "Error creating invoice: " + error.message;
  }
}

async function fetchCustomers() {
  try {
    const res = await fetch(
      "http://razib.intelsofts.com/projects/laravel/update_mex/public/api/customers"
    );
    if (res.ok) customers.value = await res.json();
  } catch {}
}

onMounted(() => {
  fetchCustomers();
});
</script>

<template>
  <div class="container">
    <h2>Create Invoice</h2>

    <div>
      <label>Customer:</label>
      <select v-model="invoice.customer_id" required>
        <option value="" disabled>Select customer</option>
        <option
          v-for="customer in customers"
          :key="customer.id"
          :value="customer.id"
        >
          {{ customer.name }}
        </option>
      </select>
    </div>

    <div>
      <label>Invoice Date:</label>
      <input v-model="invoice.invoice_date" type="date" required />
    </div>

    <div>
      <label>Status:</label>
      <input v-model="invoice.status" type="text" placeholder="Status" />
    </div>

    <hr />

    <h3>Add Items</h3>
    <div>
      <label>Description:</label>
      <input v-model="newItem.description" type="text" />
    </div>
    <div>
      <label>Quantity:</label>
      <input v-model.number="newItem.qty" type="number" min="1" />
    </div>
    <div>
      <label>Rate:</label>
      <input v-model.number="newItem.rate" type="number" min="0" step="0.01" />
    </div>
    <div>
      <label>VAT %:</label>
      <input v-model.number="newItem.vat" type="number" min="0" step="0.01" />
    </div>

    <button @click="addItem">Add Item</button>

    <h4>Invoice Items</h4>
    <table border="1" cellpadding="6" cellspacing="0">
      <thead>
        <tr>
          <th>Description</th>
          <th>Qty</th>
          <th>Rate</th>
          <th>VAT %</th>
          <th>Total Amount</th>
          <th>Remove</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in invoice.items" :key="index">
          <td>{{ item.description }}</td>
          <td>{{ item.qty }}</td>
          <td>{{ item.rate.toFixed(2) }}</td>
          <td>{{ item.vat.toFixed(2) }}</td>
          <td>{{ item.total_amount.toFixed(2) }}</td>
          <td><button @click="removeItem(index)">X</button></td>
        </tr>
      </tbody>
    </table>

    <div>
      <strong>Total Amount: </strong>{{ invoice.total_amount.toFixed(2) }}
    </div>

    <button @click="submitInvoice">Submit Invoice</button>

    <p style="color: green">{{ message }}</p>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
label {
  display: block;
  margin-top: 10px;
}
input,
select {
  width: 100%;
  padding: 6px;
  margin-top: 4px;
}
button {
  margin-top: 10px;
  padding: 8px 15px;
  background-color: #003366;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #0055aa;
}
table {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
}
th {
  background-color: #003366;
  color: white;
}
td,
th {
  padding: 8px;
  text-align: center;
}
</style>
