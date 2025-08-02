<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const invoicesId = route.params.id;

const baseUrl = `http://razib.intelsofts.com/projects/laravel/mex/api/`;
const endpoint = `invoices/${invoicesId}`;
//const invoice = ref({});

const invoice = ref({
  name: "",
  mobile: "",
  email: "",
});

const file = ref(null);
const message = ref("");

onMounted(async () => {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    let c = await response.json();
    invoice.value = c;
    //console.log(c.invoice)
  } catch (err) {
    console.error("Fetch Error:", err);
    throw err;
  }
});

function handleFile(event) {
  file.value = event.target.files[0];
}

async function submitinvoice() {
  const formData = new FormData();
  //formData.append('id', invoiceId);
  formData.append("name", invoice.value.name);
  formData.append("mobile", invoice.value.mobile);
  formData.append("email", invoice.value.email);
  formData.append("photo", file.value); // image file

  //console.log(file.value);

  try {
    //console.log(`${baseUrl}${endpoint}`);

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      body: formData, // no need to set Content-Type
    });

    const result = await response.json();

    message.value = result.message || "Upload successful";
  } catch (error) {
    message.value = "Upload failed: " + error.message;
  }
}
</script>
<template>
  <h1>Create invoices</h1>
  <router-link to="/invoices">Back</router-link>
  {{ message }}
  <form @submit.prevent="submitinvoice">
    <div>
      Name<br />
      <input v-model="invoice.name" type="text" name="name" />
    </div>
    <div>
      Mobile<br />
      <input v-model="invoice.mobile" type="text" name="mobile" />
    </div>
    <div>
      Email<br />
      <input v-model="invoice.email" type="text" name="email" />
    </div>
    <div>
      Photo<br />
      <input type="file" @change="handleFile" accept="image/*" />
    </div>
    <div>
      <input type="submit" name="submit" value="Submit" />
    </div>
  </form>
</template>
