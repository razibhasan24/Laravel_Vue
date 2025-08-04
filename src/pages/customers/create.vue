<script setup>
import { ref } from "vue";

const customer = ref({
  name: "",
  id_type: "",
  id_number: "",
  phone: "",
  address: "",
  file: null,
});

const message = ref("");

function handleFile(event) {
  customer.value.file = event.target.files[0];
}

async function submitCustomer() {
  const formData = new FormData();
  formData.append("name", customer.value.name);
  formData.append("id_type", customer.value.id_type);
  formData.append("id_number", customer.value.id_number);
  formData.append("phone", customer.value.phone);
  formData.append("address", customer.value.address);
  formData.append("id_poof_document", customer.value.file); // pdf file

  try {
    const response = await fetch(
      "http://razib.intelsofts.com/projects/laravel/update_mex/public/api/customers",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();
    message.value = result.message || "Upload successful";
  } catch (error) {
    message.value = "Upload failed: " + error.message;
  }
}
</script>

<template>
  <h1>Create Customer</h1>
  <router-link to="/customers">Back</router-link>
  <div>{{ message }}</div>
  <form @submit.prevent="submitCustomer">
    <div>
      Name<br />
      <input v-model="customer.name" type="text" name="name" />
    </div>
    <div>
      Id_Type<br />
      <input v-model="customer.id_type" type="text" name="id_type" />
    </div>
    <div>
      ID_Number<br />
      <input v-model="customer.id_number" type="text" name="id_number" />
    </div>
    <div>
      Address<br />
      <input v-model="customer.address" type="text" name="address" />
    </div>
    <div>
      Phone<br />
      <input v-model="customer.phone" type="text" name="phone" />
    </div>
    <div>
      Id_Poof_Document<br />
      <input
        type="file"
        @change="handleFile"
        accept="application/pdf"
        required
      />
    </div>
    <div>
      <input type="submit" name="submit" value="Submit" />
    </div>
  </form>
</template>
