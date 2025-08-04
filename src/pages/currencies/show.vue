<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

// রাউট থেকে currency ID পাওয়া হচ্ছে
const route = useRoute();
const currencyId = route.params.id;

// রিয়াক্টিভ ভ্যালু হিসেবে currency ডিফাইন করা হয়েছে
const currency = ref({});

// সম্পূর্ণ API URL
const apiUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/currencies/${currencyId}`;

// এই ফাংশনটি কম্পোনেন্ট লোড হওয়ার সময় currency ডেটা লোড করে
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
    currency.value = data;
    console.log(data);
  } catch (err) {
    console.error("Fetch Error:", err);
  }
});
</script>

<template>
  <h1>Currency Details</h1>
  <router-link to="/currencies">Back</router-link>

  <p><strong>Currency Code:</strong> {{ currency.currency_code }}</p>
  <p><strong>Currency Name:</strong> {{ currency.currency_name }}</p>
  <p><strong>Symbol:</strong> {{ currency.symbol }}</p>
  <div v-if="currency.image">
    <strong>Image:</strong><br />
    <img
      :src="`http://razib.intelsofts.com/projects/laravel/update_mex/public/img/${currency.image}`"
      alt="Currency Image"
      height="100"
    />
  </div>
</template>
