import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import axios from "axios";
import "./assets/tailwind.css";
import VueProgressBar from "@aacassandra/vue3-progressbar";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas, far, fab);

const options = {
  color: "#fcc49c",
  failedColor: "#fcc49c",
  thickness: "5px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300,
  },
  autoRevert: true,
  location: "top",
  inverse: false,
};

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    app.config.globalProperties.$Progress.start();

    return config;
  },
  function (error) {
    // Do something with request error
    app.config.globalProperties.$Progress.fail();
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    app.config.globalProperties.$Progress.finish();

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    app.config.globalProperties.$Progress.fail();

    return Promise.reject(error);
  }
);

const app = createApp(App);
app.use(router);
app.use(VueProgressBar, options);
app.component("fa", FontAwesomeIcon);
app.mount("#app");
router.beforeEach((to, from, next) => {
  document.querySelector(".input-search").value = "";

  next();
  from();
  to();
});
