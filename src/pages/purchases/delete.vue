<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const purchaseId = route.params.id;

const purchase = ref({});

const baseUrl = `http://127.0.0.1:8000/api/`;
const endpoint = `purchases/${purchaseId}`;

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
      router.push("/purchases");

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
    purchase.value = c;
    console.log(c);
  } catch (err) {
    console.error("Fetch Error:", err);
    throw err;
  }
});
</script>
<template>
  <h1>Delete</h1>
  <router-link to="/purchases">Back</router-link>
  <h4>Are you sure?</h4>
 {{ purchase.agent_id }}<br />
  {{ purchase.purchase_date }}<br />
   {{ purchase.remarks }}<br />
  {{ purchase.purchase_total }}<br />
  {{ purchase.status_id }}
  <input
    type="button"
    style="width: 70px"
    @click="handleDelete"
    value="Delete"
  />
</template>
