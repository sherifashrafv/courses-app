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
            <div id="bodyWorld" class="body_world_content">
              <p
                :class="theme == 'light' ? 'map_counter light' : 'map_counter'"
              >
                <span data-target="3416953" class="count">0</span>
              </p>
              <p :class="theme == 'light' ? 'map__text light' : 'map__text'">
                <span>Learning </span>
                <span>experiences </span>
                <span>worldwide </span>
                <span class="map_counting"><br />&amp; counting </span>
              </p>
            </div>
            <div class="button_browse_courses">
              <router-link tag="button" :to="`courses`" class="btn-courses"
                >Browse Courses</router-link
              >
            </div>
            <!--  -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// import VueJsCounter from "vue-js-counter";
export default {
  name: "map-home",
  // components: { VueJsCounter },
  data() {
    return {
      fakeArray: Array(12).fill(""),
    };
  },
  computed: {
    theme() {
      return this.$store.state.theme;
    },
  },
  methods: {
    startCounters: () => {
      const counters = document.querySelectorAll(".count");
      counters.forEach((counter) => {
        const updateCount = () => {
          const target = parseInt(+counter.getAttribute("data-target"));
          const count = parseInt(+counter.innerText);
          const increment = Math.trunc(target / 200);
          if (count < target) {
            counter.innerText = count + increment;
            setTimeout(updateCount, 1);
          } else {
            count.innerText = target;
          }
        };
        updateCount();
      });
    },
  },
  mounted() {
    window.addEventListener("scroll", this.startCounters, {
      once: true,
    });
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
.map__text.light span {
  color: #1b1f1f !important;
}
</style>
