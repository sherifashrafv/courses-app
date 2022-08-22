<template>
  <div>
    <CarouselsWithDescription />
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel :title="'Popular Courses'"> </ve-carousel>
      </div>
    </div>
    <Interesting />
    <SubscribeForPrice />
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel :title="'Recently viewed'"> </ve-carousel>
      </div>
    </div>
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel :title="'Learn English'"> </ve-carousel>
      </div>
    </div>
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel :title="'For Your Mental Health'"> </ve-carousel>
      </div>
    </div>
  </div>
</template>
<script>
import CarouselsWithDescription from "@/components/User/Carousels/index.vue";
import Interesting from "@/components/User/Interesting/index.vue";
import SubscribeForPrice from "@/components/User/Home/SubscribeForPrice/index.vue";
export default {
  name: "With-Auth",
  components: {
    CarouselsWithDescription,
    Interesting,
    SubscribeForPrice,
  },
};
</script>
