<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const invoiceId = route.params.id;

const invoice = ref({});

const baseUrl = `http://razib.intelsofts.com/projects/laravel/mex/api/`;
const endpoint = `invoices/${invoiceId}`;

async function handleDelete(event) {
  if (confirm("Are you sure?")) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      //let c= await response.json();
      router.push("/invoices");

      console.log(c);
    } catch (err) {
      console.error("Fetch Error:", err);
      throw err;
    }
  }
}

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
    console.log(c);
  } catch (err) {
    console.error("Fetch Error:", err);
    throw err;
  }
});
</script>
<template>
  <h1>Delete</h1>
  <router-link to="/invoices">Back</router-link>
  <h4>Are you sure?</h4>
  {{ invoice.name }}<br />
  {{ invoice.mobile }}<br />
  {{ invoice.email }}
  <input
    type="button"
    style="width: 70px"
    @click="handleDelete"
    value="Delete"
  />
</template>
