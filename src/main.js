import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";

const app = createApp(App);

app.use(store);
app.use(router);
app.use(PrimeVue);

app.mount("#app");
