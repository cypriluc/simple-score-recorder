import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

/* N PROGRESS */
import "nprogress/nprogress.css";

/* FONT AWESOME */
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlay,
  faPause,
  faStop,
  faCheck,
  faTimes,
  faCube,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faPlay, faPause, faStop, faCheck, faTimes, faCube, faMapMarkerAlt);

/* BOOTSTRAP */
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
