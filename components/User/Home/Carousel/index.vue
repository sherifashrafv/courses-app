<template>
  <div>
    <VueSlickCarousel
      id="slick_slider"
      ref="carousel"
      class="mt-4"
      v-bind="settings"
      :dots="true"
    >
      <div class="carousel-card">
        <img
          class="img_card_carosuel"
          src="@/assets/Images/Home/1.png"
          alt=""
        />
        <div class="course_body">
          <p class="card-title">Master Playing The Oud</p>
          <div
            class="card-call-to-action d-flex flex-row align-items-center justify-content-between"
          >
            <p class="course-card-subtitle">ahmed elsayed</p>
            <span class="img_wishlist_course">
              <img src="@/assets/Images/Icons/wishlist.png" alt="" />
            </span>
          </div>
        </div>
      </div>
      <div class="carousel-card">
        <img
          class="img_card_carosuel"
          src="@/assets/Images/Home/1.png"
          alt=""
        />
        <div class="course_body">
          <p class="card-title">Master Playing The Oud</p>
          <div
            class="card-call-to-action d-flex flex-row align-items-center justify-content-between"
          >
            <p class="course-card-subtitle">ahmed elsayed</p>
            <span class="img_wishlist_course">
              <img src="@/assets/Images/Icons/wishlist.png" alt="" />
            </span>
          </div>
        </div>
      </div>
      <div class="carousel-card">
        <img
          class="img_card_carosuel"
          src="@/assets/Images/Home/1.png"
          alt=""
        />
        <div class="course_body">
          <p class="card-title">Master Playing The Oud</p>
          <div
            class="card-call-to-action d-flex flex-row align-items-center justify-content-between"
          >
            <p class="course-card-subtitle">ahmed elsayed</p>
            <span class="img_wishlist_course">
              <img src="@/assets/Images/Icons/wishlist.png" alt="" />
            </span>
          </div>
        </div>
      </div>
      <div class="carousel-card">
        <img
          class="img_card_carosuel"
          src="@/assets/Images/Home/1.png"
          alt=""
        />
        <div class="course_body">
          <p class="card-title">Master Playing The Oud</p>
          <div
            class="card-call-to-action d-flex flex-row align-items-center justify-content-between"
          >
            <p class="course-card-subtitle">ahmed elsayed</p>
            <span class="img_wishlist_course">
              <img src="@/assets/Images/Icons/wishlist.png" alt="" />
            </span>
          </div>
        </div>
      </div>
    </VueSlickCarousel>
    <button class="next_button" @click="prev">
      <i class="fa-solid fa-chevron-left"></i>
    </button>
    <button class="prev_button" @click="next">
      <i class="fa-solid fa-chevron-right"></i>
    </button>
  </div>
</template>
<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
export default {
  name: "ve-carousel-courses",
  components: { VueSlickCarousel },
  data() {
    return {
      settings: {
        arrows: false,
        infinite: true,
        initialSlide: 2,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 4,
        centerPadding: "10px",
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 4,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },
  methods: {
    next() {
      this.$refs.carousel.next();
    },
    prev() {
      this.$refs.carousel.prev();
    },
  },
};
</script>
<style></style>
