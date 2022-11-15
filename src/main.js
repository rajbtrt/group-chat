import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
// import { jwtInterceptor } from "./helpers/interceptor";
import { firebaseInitConfig } from "./helpers/firebaseConfig";
const pinia = createPinia();
export const app = createApp(App);

app.use(PrimeVue);
app.use(pinia);
app.use(router);
app.use(ToastService);
app.use(ConfirmationService);
// jwtInterceptor();
firebaseInitConfig();

app.mount("#app");
