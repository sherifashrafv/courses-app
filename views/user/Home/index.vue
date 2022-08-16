<template>
  <div>
    <HomeVedio />
    <CoursesAndFetured />
    <World />
    <Subscripe />
  </div>
</template>
<script>
import HomeVedio from "@/components/User/Home/HomeVedio/index.vue";
import CoursesAndFetured from "@/components/User/Home/HomeCourses/index.vue";
import World from "@/components/User/Home/Map/index.vue";
import Subscripe from "@/components/User/Home/Subscripe/index.vue";
export default {
  name: "home-page",
  components: { HomeVedio, CoursesAndFetured, World, Subscripe },
};
</script>
