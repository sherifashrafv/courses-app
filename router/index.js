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
import InstractorsAuth from "@/views/user/InstractorPage/index.vue";
// import YourCourses from "@/views/Admin/YourCourses/index.vue";
import InstractorPageWating from "@/views/user/InstractorPage/index.vue";
// import CoursePages from "@/views/Admin/CoursesPage/index.vue";
import InstarctorDashBoard from "@/views/Admin/Home/index.vue";
import ProfileSettings from "@/views/Admin/YourCourses/index.vue";
import CoursesPage from "@/views/Admin/CoursesPage/index.vue";
import CourseDetails from "@/views/Admin/CourseDetails/index.vue";
import SpecifcCoursePage from "@/views/user/CoursePage/index.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    name: "coursePage",
    path: "/coursePage/:categoryCourse/:userid/:id",
    component: SpecifcCoursePage,
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
