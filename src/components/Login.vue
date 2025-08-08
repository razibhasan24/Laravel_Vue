<!-- <template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" type="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Log in</button>
    <p v-if="error">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const email = ref("");
const password = ref("");
const error = ref("");

async function handleLogin() {
  try {
    await authStore.login({ email: email.value, password: password.value });
    router.push("/dashboard");
  } catch {
    error.value = "Login failed. Please check your credentials.";
  }
}
</script> -->
