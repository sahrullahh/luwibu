import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "./assets/tailwind.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas, far, fab);

const app = createApp(App);
app.use(router);
app.component("fa", FontAwesomeIcon);
app.mount("#app");
router.beforeEach((to, from, next) => {
  document.querySelector(".input-search").value = "";

  next();
  from();
  to();
});
