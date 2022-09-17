import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "@/store/index";
import i18n from "@/i18n.js";
// for styles
import "../public/css/main.css";
// for default layout
import defaultLayout from "@/layout/default.vue";
import CustomeLayout from "@/layout/Custome.vue";
// ve-carousel
import Carousel from "@/components/User/Home/Carousel/index.vue";
// fontAwesome
import "@fortawesome/fontawesome-free/css/all.css";
// BOOTSTRAP
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
// slick // for slick slider
// import Slick from "vue-slick";
// import "slick-carousel/slick/slick.css";
// validation package
import Vuelidate from "vuelidate";
// loading proggress bar
import NProgress from "vue-nprogress";
Vue.use(NProgress);
// for teleport
import Skeleton from "@/components/shared/Skeleton/index.vue";
import SkeletonMentors from "@/components/shared/SkeletonInstructors/index.vue";
import PortalVue from "portal-vue";
Vue.use(PortalVue);
// for ModalVedios
import Loader from "@/components/shared/Loader/index.vue";
//
import VedioModal from "@/components/shared/vediioModal/index.vue";

// end teleport
import SearchTerm from "@/components/shared/Search/index.vue";

Vue.config.productionTip = false;
// Vue.component("ve-slick", Slick);
Vue.component("ve-carousel", Carousel);
Vue.component("default-layout", defaultLayout);
Vue.component("custome-layout", CustomeLayout);
Vue.component("ve-SearchTerm", SearchTerm);
Vue.component("ve-skeleton", Skeleton);
Vue.component("ve-skeleton-mentors", SkeletonMentors);
// for modals
Vue.component("ve-loader", Loader);
Vue.component("Vd-Modal", VedioModal);

//
Vue.use(Vuelidate);
new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
