import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/user/Home/index.vue";
import Login from "@/views/user/Login/index.vue";
import Register from "@/views/user/register/index.vue";
import NProgress from "nprogress";
import Mentors from "@/views/user/Instractors/index.vue";
import "nprogress/nprogress.css";
// import Admin from "./Admin/index.js";
import SignUpWithEmail from "@/views/user/LoginWithEmail/index.vue";
import BecomeMentor from "@/views/user/BecomeMentor/index.vue";
import InstractorsAuth from "@/views/user/InstractorPage/index.vue";
import InstractorPageWating from "@/views/user/InstractorPage/index.vue";
import InstarctorDashBoard from "@/views/Admin/Home/index.vue";
import ProfileSettings from "@/views/Admin/YourCourses/index.vue";
import CoursesPage from "@/views/Admin/CoursesPage/index.vue";
import CourseDetails from "@/views/Admin/CourseDetails/index.vue";
import SpecifcCoursePage from "@/views/user/CoursePage/index.vue";
import Courses from "@/views/Shared/Courses/index.vue";
import FavoriteCourses from "@/views/user/FavourteWishList/index.vue";
import categories from "@/views/user/Categories/index.vue";
import forgetPassword from "@/views/user/forgetPassword/index.vue";
import Subscribe from "@/views/user/subscribe/index.vue";
import VueMeta from "vue-meta";

Vue.use(VueMeta);
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    name: "coursePage",
    path: "/coursePage/:categoryCourse/:userid/:id/:courseTitle",
    component: SpecifcCoursePage,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signUpWithEmail",
    name: "signUpWithEmail",
    component: SignUpWithEmail,
  },
  {
    path: "/favorite-page",
    name: "favorites",
    component: FavoriteCourses,
  },
  {
    path: "/signUp",
    name: "signUp",
    component: Register,
  },
  {
    path: "/Mentors",
    name: "Mentors",
    component: Mentors,
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
    path: "/courses",
    name: "courses-page",
    component: Courses,
  },
  {
    name: "instractor",
    path: "/instractor",
    component: InstractorsAuth,
  },
  {
    name: "instractorsUser",
    path: "/instractor/user/:email/id/:id",
    component: InstarctorDashBoard,
    meta: {
      layout: "custome-layout",
    },
    children: [
      {
        name: "settings",
        path: "",
        component: ProfileSettings,
        meta: {
          layout: "custome-layout",
        },
      },
      {
        name: "courses",
        path: "courses/:name",
        component: CoursesPage,
        meta: {
          layout: "custome-layout",
        },
      },
      {
        name: "courseName",
        path: "vedios/:category/:courseId/:title",
        component: CourseDetails,
      },
    ],
  },
  {
    name: "instractor",
    path: "/instractor",
    component: InstractorsAuth,
  },
  {
    name: "categories",
    path: "/categories/:name",
    component: categories,
  },
  {
    name: "forgetPassword",
    path: "/forgetPassword",
    component: forgetPassword,
  },
  {
    name: "subscribe",
    path: "/subscribe",
    component: Subscribe,
  },

  //
];
// const routes = [...baseRoutes, ...Admin];
const router = new VueRouter({
  mode: "hash",
  base: "/",
  routes,
  scrollBehavior() {
    // page scroll to top for all route navigations
    return { x: 0, y: 0 };
  },
});
router.beforeResolve((to, from, next) => {
  if (to.name) {
    // Start the route progress bar.
    NProgress.start();
  }
  next();
});

router.afterEach(() => {
  NProgress.done();
});
export default router;
