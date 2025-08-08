import { createApp } from "vue";
import App from "./App.vue";
import router from "./route";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Chart from "chart.js/auto";

const app = createApp(App);
app.use(router);
app.mount("#app");
