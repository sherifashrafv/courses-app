import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store/index";
// for default layout
import defaultLayout from "@/layout/default.vue";
import CustomeLayout from "@/layout/Custome.vue";
// for global styles
import "../public/css/main.css";
// ve-carousel
import Carousel from "@/components/User/Home/Carousel/index.vue";
// fontAwesome
import "@fortawesome/fontawesome-free/css/all.css";
// BOOTSTRAP
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import Vuelidate from "vuelidate";
// loading proggress bar
import NProgress from "vue-nprogress";
// for teleport
import Skeleton from "@/components/shared/Skeleton/index.vue";
import SkeletonMentors from "@/components/shared/SkeletonInstructors/index.vue";
import PortalVue from "portal-vue";
import InfiniteScroll from "v-infinite-scroll";
import "v-infinite-scroll/dist/v-infinite-scroll.css";
import VueSweetalert2 from "vue-sweetalert2";
import Loader from "@/components/shared/Loader/index.vue";
import VedioModal from "@/components/shared/vediioModal/index.vue";
import "sweetalert2/dist/sweetalert2.min.css";
import VueMeta from "vue-meta";

Vue.use(VueSweetalert2);

const theme = localStorage.getItem("theme");
if (theme === "light") {
  require("../public/css/lightTheme.css");
} else if (theme === "") {
  require("../public/css/main.css");
}

Vue.use(Vuelidate)
  .use(VueSweetalert2)
  .use(VueSweetalert2)
  .use(InfiniteScroll)
  .use(PortalVue)
  .use(NProgress)
  .use(VueMeta);
//
Vue.component("ve-carousel", Carousel);
Vue.component("default-layout", defaultLayout);
Vue.component("custome-layout", CustomeLayout);
Vue.component("ve-skeleton", Skeleton);
Vue.component("ve-skeleton-mentors", SkeletonMentors);
// for modals
Vue.component("ve-loader", Loader);
Vue.component("Vd-Modal", VedioModal);

//
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
