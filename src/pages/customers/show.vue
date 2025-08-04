<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

// Get customer ID from route
const route = useRoute();
const customerId = route.params.id;

// Reactive customer object
const customer = ref({});

// Correct full API URL (replaces baseUrl + endpoint)
const apiUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/customers/${customerId}`;

// এই ফাংশনটি কাস্টমারের বিস্তারিত তথ্য লোড করে যখন কম্পোনেন্ট লোড হয়
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
    console.log(data);
  } catch (err) {
    console.error("Fetch Error:", err);
  }
});
</script>

<template>
  <h1>Customer Details</h1>
  <router-link to="/customers">← Back to Customer List</router-link>

  <p><strong>Name:</strong> {{ customer.name }}</p>
  <p><strong>ID Type:</strong> {{ customer.id_type }}</p>
  <p><strong>ID Number:</strong> {{ customer.id_number }}</p>
  <p><strong>Phone:</strong> {{ customer.phone }}</p>
  <p><strong>Address:</strong> {{ customer.address }}</p>
</template>
