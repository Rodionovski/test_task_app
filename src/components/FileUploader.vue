<template>
  <div class="file-uploader">
    <input
      type="file"
      accept=".csv"
      @change="onFileChange"
      :disabled="isLoading"
      id="fileInput"
      hidden
    />
    <label for="fileInput" class="custom-file-upload">
      📁 Обрати CSV-файл
    </label>

    <p v-if="fileName" class="file-name">✅ {{ fileName }}</p>
    <p v-if="isLoading" class="loading-text">Завантаження файлу...</p>
    <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>

    <div v-if="parsedData.length" class="experiment-selection">
      <h3>Оберіть експерименти для порівняння:</h3>
      <div class="actions">
        <button @click="selectAllExperiments">Вибрати всі</button>
        <button @click="deselectAllExperiments">Зняти всі</button>
      </div>

      <div class="experiment-list">
        <label
          v-for="id in uniqueExperimentIds"
          :key="id"
          class="experiment-item"
        >
          <input type="checkbox" :value="id" v-model="selectedExperiments" />
          {{ id }}
        </label>
      </div>

      <h3>Оберіть метрики для відображення:</h3>
      <div class="actions">
        <button @click="selectAllMetrics">Вибрати всі</button>
        <button @click="deselectAllMetrics">Зняти всі</button>
      </div>

      <div class="metric-list">
        <label
          v-for="metric in uniqueMetricNames"
          :key="metric"
          class="metric-item"
        >
          <input type="checkbox" :value="metric" v-model="selectedMetrics" />
          {{ metric }}
        </label>
      </div>
    </div>

    <button
      v-if="parsedData.length"
      @click="goToMetrics"
      :disabled="
        selectedExperiments.length === 0 || selectedMetrics.length === 0
      "
      class="go-metrics-btn"
    >
      Переглянути графіки
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Papa from "papaparse";

const router = useRouter();
const store = useStore();

const fileName = ref("");
const isLoading = ref(false);
const errorMessage = ref("");
const parsedData = ref([]);
const selectedExperiments = ref([]);
const selectedMetrics = ref([]);

function onFileChange(event) {
  const file = event.target.files[0];
  if (!file) return;

  fileName.value = file.name;
  isLoading.value = true;
  errorMessage.value = "";

  Papa.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      parsedData.value = results.data;
      selectedExperiments.value = uniqueExperimentIds.value;
      selectedMetrics.value = uniqueMetricNames.value;
      isLoading.value = false;
    },
    error: (error) => {
      errorMessage.value = `Помилка при обробці файлу: ${error.message}`;
      isLoading.value = false;
    },
  });
}

const uniqueExperimentIds = computed(() => {
  const ids = parsedData.value.map((row) => row.experiment_id);
  return [...new Set(ids)].sort((a, b) => a.localeCompare(b));
});

const uniqueMetricNames = computed(() => {
  const metrics = parsedData.value.map((row) => row.metric_name);
  return [...new Set(metrics)].sort();
});

function selectAllExperiments() {
  selectedExperiments.value = [...uniqueExperimentIds.value];
}

function deselectAllExperiments() {
  selectedExperiments.value = [];
}

function selectAllMetrics() {
  selectedMetrics.value = [...uniqueMetricNames.value];
}

function deselectAllMetrics() {
  selectedMetrics.value = [];
}

function goToMetrics() {
  const filteredData = parsedData.value.filter(
    (row) =>
      selectedExperiments.value.includes(row.experiment_id) &&
      selectedMetrics.value.includes(row.metric_name)
  );

  store.dispatch("updateFilteredData", filteredData);

  router.push({ name: "Metrics" });
}
</script>

<style scoped>
.file-uploader {
  max-width: 700px;
  margin: 20px auto;
  padding: 10px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.custom-file-upload {
  display: inline-block;
  padding: 12px 24px;
  cursor: pointer;
  background-color: #42a5f5;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.3s ease;
  margin-bottom: 10px;
}

.custom-file-upload:hover {
  background-color: #1e88e5;
}

.file-name {
  margin-top: 10px;
  color: green;
  font-weight: 500;
}

.loading-text {
  color: #42b983;
  font-weight: 600;
}

.error-text {
  color: #e63946;
  font-weight: 700;
}

.actions {
  margin-bottom: 10px;
}

.actions button {
  margin-right: 10px;
  padding: 6px 12px;
  border: none;
  background-color: #42b983;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.actions button:hover {
  background-color: #369870;
}

.experiment-list,
.metric-list {
  max-height: 180px;
  overflow-y: auto;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fafafa;
}

.experiment-item,
.metric-item {
  display: block;
  margin-bottom: 6px;
  cursor: pointer;
}

.experiment-item input,
.metric-item input {
  margin-right: 8px;
}

.go-metrics-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #42a5f5;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.go-metrics-btn:disabled {
  background-color: #a1c2f0;
  cursor: not-allowed;
}
</style>
