<template>
  <div class="container-fluid">
    <main class="px-3 py-4">
      <div class="mb-4 border-bottom">
        <h2>Dashboard Overview</h2>
      </div>

      <!-- Cards Set 1 -->
      <div class="row g-4 mb-4">
        <div
          class="col-12 col-md-4"
          v-for="(value, key, index) in statsSet1"
          :key="'set1-' + key"
        >
          <div
            class="card p-3 shadow-sm"
            :style="cardStylesSet1[index % cardStylesSet1.length]"
          >
            <h5 class="text-capitalize">{{ key.replace(/_/g, " ") }}</h5>
            <h3>{{ formatValue(value) }}</h3>
          </div>
        </div>
      </div>

      <!-- Cards Set 2 -->
      <div class="row g-4 mb-4">
        <div
          class="col-12 col-md-4"
          v-for="(value, key, index) in statsSet2"
          :key="'set2-' + key"
        >
          <div
            class="card p-3 shadow-sm"
            :style="cardStylesSet2[index % cardStylesSet2.length]"
          >
            <h5 class="text-capitalize">{{ key.replace(/_/g, " ") }}</h5>
            <h3>{{ formatValue(value) }}</h3>
          </div>
        </div>
      </div>

      <!-- Cards Set 3 -->
      <div class="row g-4 mb-4">
        <div
          class="col-12 col-md-4"
          v-for="(value, key, index) in statsSet3"
          :key="'set3-' + key"
        >
          <div
            class="card p-3 shadow-sm"
            :style="cardStylesSet3[index % cardStylesSet3.length]"
          >
            <h5 class="text-capitalize">{{ key.replace(/_/g, " ") }}</h5>
            <h3>{{ formatValue(value) }}</h3>
          </div>
        </div>
      </div>

      <!-- Chart -->
      <div class="card p-4 shadow-sm mb-4">
        <h5>Monthly Users</h5>
        <canvas ref="chartCanvas" height="100"></canvas>
      </div>
    </main>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import Chart from "chart.js/auto";

export default {
  name: "Dashboard",
  setup() {
    const statsSet1 = reactive({
      Total_Customers: 50,
      Total_Purchases: 120,
      revenue: 12000,
    });

    const statsSet2 = reactive({
      Total_Orders: 100,
      pending_orders: 15,
      completed_orders: 85,
    });

    const statsSet3 = reactive({
      Total_Sales: 70,
      Total_payments: 65,
      Total_Users: 80,
    });

    // Define color styles for each set's cards
    const cardStylesSet1 = [
      { backgroundColor: "#ff6b6b", color: "white" }, // red-ish
      { backgroundColor: "#feca57", color: "black" }, // yellow-ish
      { backgroundColor: "#54a0ff", color: "white" }, // blue-ish
    ];

    const cardStylesSet2 = [
      { backgroundColor: "#1dd1a1", color: "white" }, // green-ish
      { backgroundColor: "#ee5253", color: "white" }, // red-ish
      { backgroundColor: "#ff9f43", color: "black" }, // orange-ish
    ];

    const cardStylesSet3 = [
      { backgroundColor: "#576574", color: "white" }, // grey-ish
      { backgroundColor: "#10ac84", color: "white" }, // teal-ish
      { backgroundColor: "#c8d6e5", color: "black" }, // light grey
    ];

    const chartCanvas = ref(null);

    const formatValue = (val) =>
      typeof val === "number" ? val.toLocaleString() : val;

    const renderChart = () => {
      new Chart(chartCanvas.value.getContext("2d"), {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          datasets: [
            {
              label: "Users",
              data: [200, 400, 600, 800, 1000, 1200, statsSet1.total_users],
              backgroundColor: "rgba(13, 110, 253, 0.2)",
              borderColor: "rgba(13, 110, 253, 1)",
              borderWidth: 2,
              tension: 0.4,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    onMounted(() => {
      renderChart();
    });

    return {
      statsSet1,
      statsSet2,
      statsSet3,
      chartCanvas,
      formatValue,
      cardStylesSet1,
      cardStylesSet2,
      cardStylesSet3,
    };
  },
};
</script>

<style scoped>
.card {
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
}
</style>
