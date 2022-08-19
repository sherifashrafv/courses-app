import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/user/Home/index.vue";
import Login from "@/views/user/Login/index.vue";
import Register from "@/views/user/register/index.vue";
import SignUpWithEmail from "@/views/user/LoginWithEmail/index.vue";
import NProgress from "nprogress";
import Instractors from "@/views/user/Instractors/index.vue";
// import Admin from "./Admin/index.js";
import BecomeMentor from "@/views/user/BecomeMentor/index.vue";
import InstractorsAuth from "@/views/Admin/Home/index.vue";
import YourCourses from "@/views/Admin/YourCourses/index.vue";
import InstractorPageWating from "@/views/user/InstractorPage/index.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signUp",
    name: "signUp",
    component: Register,
  },
  {
    path: "/signUpWithEmail",
    name: "signUpWithEmail",
    component: SignUpWithEmail,
  },
  {
    path: "/instractors",
    name: "instractors",
    component: Instractors,
  },
  {
    path: "/Become-Mentor",
    name: "Become-Mentor",
    component: BecomeMentor,
  },
  {
    path: "/instractor-page",
    name: "become-instractor",
    component: InstractorPageWating,
  },
  {
    name: "admin",
    path: "/admin",
    component: InstractorsAuth,
    meta: {
      layout: "custome-layout",
    },
    children: [{ name: "", path: "", component: YourCourses }],
  },
];
// const routes = [...baseRoutes, ...Admin];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});
export default router;
