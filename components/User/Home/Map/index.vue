<template>
  <section class="world-map">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="world_map_body position-relative">
            <img
              class="world_image img-fluid"
              src="@/assets/Images/Home/map.png"
              alt=""
            />
            <!-- bulltis -->
            <transition-group tag="div" appear class="map__bullets" name="list">
              <span v-for="(bul, indx) in fakeArray" :key="indx">
                {{ bul }}</span
              >
            </transition-group>
            <!--  -->
            <div class="body_world_content">
              <p class="map_counter">
                <countTo
                  :startVal="0"
                  :endVal="3416953"
                  :duration="1000"
                ></countTo>
                <!-- 3,416,953 -->
              </p>
              <p class="map__text">
                <span>Learning </span>
                <span>experiences </span>
                <span>worldwide </span>
                <span class="map_counting"><br />&amp; counting...</span>
              </p>
            </div>
            <div class="button_browse_courses">
              <button class="btn-courses">Browse Courses</button>
            </div>
            <!--  -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import countTo from "vue-count-to";

export default {
  name: "map-home",
  components: { countTo },
  data() {
    return {
      fakeArray: Array(12).fill(""),
    };
  },
};
</script>
<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
