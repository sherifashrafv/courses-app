import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/user/Home/index.vue";
import Login from "@/views/user/Login/index.vue";
import Register from "@/views/user/register/index.vue";

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
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
