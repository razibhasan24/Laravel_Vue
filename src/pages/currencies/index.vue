<script setup>
import { ref, onMounted } from "vue";

const currencies = ref([]);

// সঠিক API URL
const apiUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/currencies`;

// এই ফাংশনটি কম্পোনেন্ট লোড হওয়ার সময় সব কারেন্সি ডেটা লোড করে
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
    currencies.value = data.currencies || data; // fallback if API returns array
    console.log(currencies.value);
  } catch (err) {
    console.error("Fetch Error:", err);
  }
});
</script>

<template>
  <h1>Manage Currency</h1>
  <router-link to="/currencies/create">New Currency</router-link>

  <table class="table" border="1" cellpadding="8" cellspacing="0">
    <thead>
      <tr>
        <th>ID</th>
        <th>Currency Code</th>
        <th>Currency Name</th>
        <th>Symbol</th>
        <th>Image</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="currency in currencies" :key="currency.id">
        <td>{{ currency.id }}</td>
        <td>{{ currency.currency_code }}</td>
        <td>{{ currency.currency_name }}</td>
        <td>{{ currency.symbol }}</td>
        <td>
          <img
            v-if="currency.image"
            :src="`http://razib.intelsofts.com/projects/laravel/update_mex/public/img/${currency.image}`"
            alt="Currency Image"
            height="80"
          />
        </td>
        <td class="btn-group">
          <router-link :to="`/currencies/show/${currency.id}`"
            >View</router-link
          >
          |
          <router-link :to="`/currencies/edit/${currency.id}`"
            >Edit</router-link
          >
          |
          <router-link :to="`/currencies/delete/${currency.id}`"
            >Delete</router-link
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>
