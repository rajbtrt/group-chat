import { createApp } from "vue";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import "./style.css";
import { firebaseInitConfig } from "./helpers/firebaseConfig";
import App from "./App.vue";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import VueClipboard from "vue3-clipboard";
import router from "./router";
const pinia = createPinia();
export const app = createApp(App);
import VueCryptojs from "vue-cryptojs";

firebaseInitConfig();
app.use(VueCryptojs);
app.use(PrimeVue);
app.use(pinia);
app.use(ToastService);
app.use(ConfirmationService);
app.use(router);
app.use(VueClipboard, { autoSetContainer: true, appendToBody: true });

app.mount("#app");
