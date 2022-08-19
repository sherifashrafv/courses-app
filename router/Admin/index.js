import Admin from "@/views/Admin/Auth/index.vue";
import YourCourses from "@/views/Admin/YourCourses/index.vue";
export default [
  {
    name: "admin",
    path: "/admin",
    meta: {
      layout: "custome",
    },
    component: Admin,
    children: [{ name: "", path: "", component: YourCourses }],
  },
];
