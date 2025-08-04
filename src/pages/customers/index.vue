<script setup>
import { ref, onMounted } from "vue";

// Reactive list for customer data
const customers = ref([]);

// Full API URL (you can change this to production later)
const apiUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/customers`;

// এই ফাংশনটি কম্পোনেন্ট লোড হওয়ার সময় কাস্টমারদের ডেটা লোড করে
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
    customers.value = data.customers || data; // fallback if no `customers` key
    console.log(customers.value);
  } catch (err) {
    console.error("Fetch Error:", err);
  }
});
</script>

<template>
  <h1>Manage Customer</h1>
  <router-link to="/customers/create">New Customer</router-link>

  <table class="table" border="1" cellpadding="8" cellspacing="0">
    <thead>
      <tr>
        <th>ID</th>
        <th>ID Proof Document</th>
        <!-- Changed Photo to ID Proof Document -->
        <th>Name</th>
        <th>ID Type</th>
        <th>ID Number</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="customer in customers" :key="customer.id">
        <td>{{ customer.id }}</td>
        <td>
          <!-- Show PDF link if file exists -->
          <a
            v-if="customer.id_poof_document"
            :href="`http://razib.intelsofts.com/projects/laravel/update_mex/public/pdf/${customer.id_poof_document}`"
            target="_blank"
            rel="noopener noreferrer"
          >
            View PDF
          </a>
          <span v-else>No Document</span>
        </td>
        <td>{{ customer.name }}</td>
        <td>{{ customer.id_type }}</td>
        <td>{{ customer.id_number }}</td>
        <td>{{ customer.phone }}</td>
        <td>{{ customer.address }}</td>
        <td class="btn-group">
          <router-link :to="`/customers/show/${customer.id}`">View</router-link>
          |
          <router-link :to="`/customers/edit/${customer.id}`">Edit</router-link>
          |
          <router-link :to="`/customers/delete/${customer.id}`"
            >Delete</router-link
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>
