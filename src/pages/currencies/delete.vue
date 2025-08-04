<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const currencyId = route.params.id;

// Full API URL with ID directly
const apiUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/currencies/${currencyId}`;

const currency = ref({});

// এই ফাংশনটি ডিলিট বাটনে ক্লিক করার পর ডেটা সার্ভার থেকে মুছে ফেলে
async function handleDelete() {
  if (confirm("Are you sure?")) {
    try {
      await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      router.push("/currencies");
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  }
}

// এই ফাংশনটি কম্পোনেন্ট লোড হওয়ার সাথে সাথে কারেন্সির ডেটা লোড করে
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
  } catch (err) {
    console.error("Fetch Error:", err);
  }
});
</script>

<template>
  <h1>Delete Currency</h1>
  <router-link to="/currencies">Back</router-link>
  <h4>Are you sure you want to delete the following currency?</h4>

  <p><strong>Currency Code:</strong> {{ currency.currency_code }}</p>
  <p><strong>Currency Name:</strong> {{ currency.currency_name }}</p>
  <p><strong>Symbol:</strong> {{ currency.symbol }}</p>

  <input
    type="button"
    style="width: 70px"
    @click="handleDelete"
    value="Delete"
  />
</template>
