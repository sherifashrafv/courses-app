import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
// for styles
import "../public/css/main.css";
// for default layout
import defaultLayout from "@/layout/default.vue";
// ve-carousel
import Carousel from "@/components/User/Home/Carousel/index.vue";
// fontAwesome
import "@fortawesome/fontawesome-free/css/all.css";
// BOOTSTRAP
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
// end
// for slick slider
import "slick-carousel/slick/slick.css";
Vue.config.productionTip = false;
import Slick from "vue-slick";
Vue.component("ve-slick", Slick);
Vue.component("ve-carousel", Carousel);
Vue.component("default-layout", defaultLayout);
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
