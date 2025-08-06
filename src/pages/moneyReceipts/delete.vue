<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
// import { API_BASE_URL, RECEIPTS_ENDPOINT } from "@/constants";

const route = useRoute();
const router = useRouter();
const message = ref("");

onMounted(async () => {
  const confirmDelete = confirm(
    "Are you sure you want to delete this receipt?"
  );
  if (confirmDelete) {
    const res = await fetch(
      `${API_BASE_URL}${RECEIPTS_ENDPOINT}/${route.params.id}`,
      {
        method: "DELETE",
      }
    );
    const result = await res.json();
    message.value = result.message || "Deleted";
    router.push("/receipts");
  } else {
    router.push("/receipts");
  }
});
</script>

<template>
  <p>{{ message }}</p>
</template>
