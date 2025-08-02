<template>
  <router-view />
</template>

<!--<script setup>-->
<!--import { ref, computed } from "vue";-->
<!--import Papa from "papaparse";-->
<!--import MetricsChart from "@/components/MetricsChart.vue";-->

<!--const file = ref(null);-->
<!--const parsedData = ref([]);-->
<!--const selectedExperiments = ref([]);-->
<!--const selectedMetrics = ref([]);-->
<!--const isLoading = ref(false);-->
<!--const errorMessage = ref("");-->

<!--function onFileChange(event) {-->
<!--  const target = event.target;-->
<!--  if (target.files && target.files.length > 0) {-->
<!--    file.value = target.files[0];-->
<!--    isLoading.value = true;-->
<!--    errorMessage.value = "";-->
<!--    Papa.parse(file.value, {-->
<!--      header: true,-->
<!--      skipEmptyLines: true,-->
<!--      complete: (results) => {-->
<!--        parsedData.value = results.data;-->
<!--        selectedExperiments.value = getUniqueExperimentIds();-->
<!--        selectedMetrics.value = getUniqueMetricNames();-->
<!--        isLoading.value = false;-->
<!--      },-->
<!--      error: (error) => {-->
<!--        errorMessage.value = "Помилка при обробці файлу: " + error.message;-->
<!--        isLoading.value = false;-->
<!--      },-->
<!--    });-->
<!--  }-->
<!--}-->

<!--function getUniqueExperimentIds() {-->
<!--  const ids = parsedData.value.map((row) => row.experiment_id);-->
<!--  return [...new Set(ids)].sort((a, b) => a.localeCompare(b));-->
<!--}-->

<!--function getUniqueMetricNames() {-->
<!--  const metrics = parsedData.value.map((row) => row.metric_name);-->
<!--  return [...new Set(metrics)].sort();-->
<!--}-->

<!--const filteredData = computed(() =>-->
<!--  parsedData.value.filter(-->
<!--    (row) =>-->
<!--      selectedExperiments.value.includes(row.experiment_id) &&-->
<!--      selectedMetrics.value.includes(row.metric_name)-->
<!--  )-->
<!--);-->

<!--function selectAllExperiments() {-->
<!--  selectedExperiments.value = getUniqueExperimentIds();-->
<!--}-->

<!--function deselectAllExperiments() {-->
<!--  selectedExperiments.value = [];-->
<!--}-->

<!--function selectAllMetrics() {-->
<!--  selectedMetrics.value = getUniqueMetricNames();-->
<!--}-->

<!--function deselectAllMetrics() {-->
<!--  selectedMetrics.value = [];-->
<!--}-->
<!--</script>-->

<!--<template>-->
<!--  <div class="file-uploader">-->
<!--    <input-->
<!--      type="file"-->
<!--      accept=".csv"-->
<!--      @change="onFileChange"-->
<!--      :disabled="isLoading"-->
<!--    />-->

<!--    <p v-if="isLoading" class="loading-text">-->
<!--      Завантаження файлу, зачекайте...-->
<!--    </p>-->

<!--    <p v-if="errorMessage" class="error-text">-->
<!--      {{ errorMessage }}-->
<!--    </p>-->

<!--    <div v-if="parsedData.length" class="experiment-selection">-->
<!--      <h3>Оберіть експерименти для порівняння:</h3>-->
<!--      <div class="actions">-->
<!--        <button @click="selectAllExperiments">Вибрати всі</button>-->
<!--        <button @click="deselectAllExperiments">Зняти всі</button>-->
<!--      </div>-->

<!--      <div class="experiment-list">-->
<!--        <label-->
<!--          v-for="id in getUniqueExperimentIds()"-->
<!--          :key="id"-->
<!--          class="experiment-item"-->
<!--        >-->
<!--          <input type="checkbox" :value="id" v-model="selectedExperiments" />-->
<!--          {{ id }}-->
<!--        </label>-->
<!--      </div>-->

<!--      <h3>Оберіть метрики для відображення:</h3>-->
<!--      <div class="actions">-->
<!--        <button @click="selectAllMetrics">Вибрати всі</button>-->
<!--        <button @click="deselectAllMetrics">Зняти всі</button>-->
<!--      </div>-->

<!--      <div class="metric-list">-->
<!--        <label-->
<!--          v-for="metric in getUniqueMetricNames()"-->
<!--          :key="metric"-->
<!--          class="metric-item"-->
<!--        >-->
<!--          <input type="checkbox" :value="metric" v-model="selectedMetrics" />-->
<!--          {{ metric }}-->
<!--        </label>-->
<!--      </div>-->
<!--    </div>-->

<!--    <MetricsChart-->
<!--      v-if="filteredData.length"-->
<!--      :data="filteredData"-->
<!--      :selectedExperiments="selectedExperiments"-->
<!--    />-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped lang="scss">-->
<!--.file-uploader {-->
<!--  max-width: 700px;-->
<!--  margin: 20px auto;-->
<!--  padding: 10px;-->
<!--  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;-->
<!--  color: #333;-->

<!--  input[type="file"] {-->
<!--    margin-bottom: 15px;-->
<!--  }-->

<!--  .loading-text {-->
<!--    color: #42b983;-->
<!--    font-weight: 600;-->
<!--  }-->

<!--  .error-text {-->
<!--    color: #e63946;-->
<!--    font-weight: 700;-->
<!--  }-->

<!--  h3 {-->
<!--    margin-top: 25px;-->
<!--    margin-bottom: 10px;-->
<!--  }-->

<!--  .actions {-->
<!--    margin-bottom: 10px;-->
<!--    button {-->
<!--      margin-right: 10px;-->
<!--      padding: 6px 12px;-->
<!--      border: none;-->
<!--      background-color: #42b983;-->
<!--      color: white;-->
<!--      font-weight: 600;-->
<!--      cursor: pointer;-->
<!--      border-radius: 4px;-->
<!--      transition: background-color 0.3s;-->

<!--      &:hover {-->
<!--        background-color: #369870;-->
<!--      }-->
<!--    }-->
<!--  }-->

<!--  .experiment-list,-->
<!--  .metric-list {-->
<!--    max-height: 180px;-->
<!--    overflow-y: auto;-->
<!--    padding: 5px;-->
<!--    border: 1px solid #ccc;-->
<!--    border-radius: 6px;-->
<!--    background: #fafafa;-->
<!--  }-->

<!--  .experiment-item,-->
<!--  .metric-item {-->
<!--    display: block;-->
<!--    margin-bottom: 6px;-->
<!--    cursor: pointer;-->

<!--    input[type="checkbox"] {-->
<!--      margin-right: 8px;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->
