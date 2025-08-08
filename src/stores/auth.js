// import { defineStore } from "pinia";
// import { login, logout, getUser } from "../api/auth";

// export const useAuthStore = defineStore("auth", {
//   state: () => ({
//     user: null,
//     status: "",
//   }),
//   getters: {
//     isAuthenticated: (state) => !!state.user,
//   },
//   actions: {
//     async login(credentials) {
//       this.status = "loading";
//       try {
//         await login(credentials);
//         const response = await getUser();
//         this.user = response.data;
//         this.status = "success";
//       } catch (error) {
//         this.status = "error";
//         this.user = null;
//         throw error;
//       }
//     },
//     async logout() {
//       await logout();
//       this.user = null;
//     },
//     async fetchUser() {
//       try {
//         const response = await getUser();
//         this.user = response.data;
//       } catch {
//         this.user = null;
//       }
//     },
//   },
// });
