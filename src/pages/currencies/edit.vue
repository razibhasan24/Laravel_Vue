<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const currencyId = route.params.id;

// Correct API URL
const apiUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/currencies/${currencyId}`;

const currency = ref({
  currency_code: "",
  currency_name: "",
  symbol: "",
});

const file = ref(null);
const message = ref("");

// এই ফাংশনটি কম্পোনেন্ট লোড হওয়ার সময় কারেন্সি ডেটা লোড করে
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

// ফাইল নির্বাচন করলে এই ফাংশন ফাইল স্টেটে সেট করে
function handleFile(event) {
  file.value = event.target.files[0];
}

// এই ফাংশনটি কারেন্সি ডেটা সাবমিট করে
async function submitCurrency() {
  const formData = new FormData();
  formData.append("currency_code", currency.value.currency_code);
  formData.append("currency_name", currency.value.currency_name);
  formData.append("symbol", currency.value.symbol);
  formData.append("image", file.value); // ✅ fix here

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    message.value = result.message || "Upload successful";
  } catch (error) {
    message.value = "Upload failed: " + error.message;
  }
}
</script>

<template>
  <h1>Update Currency</h1>
  <router-link to="/currencies">Back</router-link>
  <div>{{ message }}</div>

  <form @submit.prevent="submitCurrency">
    <div>
      Currency Code<br />
      <input
        v-model="currency.currency_code"
        type="text"
        name="currency_code"
        required
      />
    </div>
    <div>
      Currency Name<br />
      <input
        v-model="currency.currency_name"
        type="text"
        name="currency_name"
        required
      />
    </div>
    <div>
      Symbol<br />
      <input v-model="currency.symbol" type="text" name="symbol" required />
    </div>
    <div>
      Image<br />
      <input type="file" @change="handleFile" accept="image/*" />
    </div>
    <div>
      <input type="submit" value="Submit" />
    </div>
  </form>
</template>
