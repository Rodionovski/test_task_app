<script setup>
import { ref, onMounted, computed } from "vue";
import { Chart } from "primevue/chart";

const parsedData = ref([]);

onMounted(() => {
  const data = localStorage.getItem("filteredData");
  if (data) {
    parsedData.value = JSON.parse(data);
  }
});

const groupedByMetric = computed(() => {
  const map = new Map();

  for (const row of parsedData.value) {
    const { metric_name, experiment_id, step, value } = row;

    if (!map.has(metric_name)) {
      map.set(metric_name, {});
    }

    if (!map.get(metric_name)[experiment_id]) {
      map.get(metric_name)[experiment_id] = [];
    }

    map.get(metric_name)[experiment_id].push({
      x: Number(step),
      y: Number(value),
    });
  }

  return map;
});

function getChartData(metricName) {
  const experimentData = groupedByMetric.value.get(metricName) || {};
  return {
    datasets: Object.entries(experimentData).map(
      ([experimentId, points], i) => ({
        label: experimentId,
        data: points.sort((a, b) => a.x - b.x),
        borderColor: chartColors[i % chartColors.length],
        tension: 0.3,
        fill: false,
      })
    ),
  };
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        color: "#333",
      },
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      type: "linear",
      title: {
        display: true,
        text: "Step",
      },
      ticks: {
        color: "#666",
      },
    },
    y: {
      title: {
        display: true,
        text: "Value",
      },
      ticks: {
        color: "#666",
      },
    },
  },
};

const chartColors = [
  "#42A5F5",
  "#66BB6A",
  "#FFA726",
  "#EF5350",
  "#AB47BC",
  "#26A69A",
  "#FF7043",
  "#9CCC65",
];
</script>

<template>
  <div class="metrics-chart">
    <h3>Графіки метрик</h3>
    <div
      v-for="(experimentGroup, metricName) in groupedByMetric"
      :key="metricName"
      class="chart-container"
    >
      <h4>{{ metricName }}</h4>
      <Chart
        type="line"
        :data="getChartData(metricName)"
        :options="chartOptions"
      />
    </div>
  </div>
</template>

<style scoped>
.metrics-chart {
  margin-top: 40px;
}

.chart-container {
  margin-bottom: 50px;
}
</style>
