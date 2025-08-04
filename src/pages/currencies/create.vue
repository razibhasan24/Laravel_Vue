<script setup>
import { ref } from "vue";

// Correct base URL for your API
const baseUrl = `http://razib.intelsofts.com/projects/laravel/update_mex/public/api/`;
const endpoint = `currencies`;

const currency = ref({
  currency_code: "",
  currency_name: "",
  symbol: "",
  file: null,
});

const message = ref("");

function handleFile(event) {
  currency.value.file = event.target.files[0];
}

async function submitCurrency() {
  const formData = new FormData();
  formData.append("currency_code", currency.value.currency_code);
  formData.append("currency_name", currency.value.currency_name);
  formData.append("symbol", currency.value.symbol);
  formData.append("image", currency.value.file);

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
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
  <h1>Create Currency</h1>
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
      <input type="file" @change="handleFile" accept="image/*" required />
    </div>
    <div>
      <input type="submit" value="Submit" />
    </div>
  </form>
</template>
