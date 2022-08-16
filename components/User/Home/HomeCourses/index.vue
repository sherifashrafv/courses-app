<template>
  <div>
    <section class="tabs_vedios">
      <div class="container">
        <div>
          <ul
            class="tabs-parent d-flex flex-row align-items-center gap-5 tabs_home"
          >
            <li class="active">Featured Courses</li>
            <li>Most Viewed</li>
            <li>New Courses</li>
          </ul>
          <!-- carousel -->

          <!-- end -->
        </div>
        <div class="position-relative">
          <ve-carousel />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  name: "home-courses",
};
</script>
<style></style>
