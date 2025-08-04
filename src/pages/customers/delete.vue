<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

// Initialize Vue Router and Route
const router = useRouter();
const route = useRoute();
const customerId = route.params.id;

// Reactive object to hold customer data
const customer = ref({});

// Full API URL
const apiUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/customers/${customerId}`;

// এই ফাংশনটি কাস্টমারকে ডিলিট করার জন্য ব্যবহৃত হয়
async function handleDelete() {
  if (confirm("Are you sure you want to delete this customer?")) {
    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        alert("Customer deleted successfully.");
        router.push("/customers");
      } else {
        alert("Failed to delete. Please try again.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Server error. Please try again later.");
    }
  }
}

// এই ফাংশনটি কম্পোনেন্ট লোড হওয়ার সময় কাস্টমারের তথ্য আনতে ব্যবহৃত হয়
onMounted(async () => {
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const data = await response.json();
    customer.value = data;
  } catch (err) {
    console.error("Error loading customer data:", err);
  }
});
</script>

<template>
  <h1>Delete Customer</h1>
  <router-link to="/customers">← Back to Customers</router-link>

  <h4>Are you sure?</h4>
  <p><strong>Name:</strong> {{ customer.name }}</p>
  <p><strong>ID Type:</strong> {{ customer.id_type }}</p>
  <p><strong>ID Number:</strong> {{ customer.id_number }}</p>
  <p><strong>Phone:</strong> {{ customer.phone }}</p>
  <p><strong>Address:</strong> {{ customer.address }}</p>

  <input
    type="button"
    style="
      width: 100px;
      background-color: red;
      color: white;
      border: none;
      padding: 5px;
      margin-top: 10px;
    "
    @click="handleDelete"
    value="Delete"
  />
</template>
