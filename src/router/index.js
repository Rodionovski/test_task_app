import { createRouter, createWebHistory } from "vue-router";
import FileUploader from "@/components/FileUploader.vue";
import MetricsChart from "@/components/MetricsChart.vue";

const routes = [
  {
    path: "/",
    name: "FileUploader",
    component: FileUploader,
  },
  {
    path: "/metrics",
    name: "Metrics",
    component: MetricsChart,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
