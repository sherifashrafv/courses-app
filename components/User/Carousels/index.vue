<template>
  <section class="section_carousle content position-relative">
    <VueSlickCarousel
      id="slick_slider"
      ref="carousel"
      class="mt-4"
      v-bind="settings"
      @beforeChange="handleBeforeChange"
    >
      <div class="carousel-card main_card_content_discripe">
        <div
          class="discription_about-courses d-flex flex-column align-items-start"
        >
          <p class="discription_about_title">Start Your Learning Journey</p>
          <p class="subtitle_discription-carousel_card">
            Browse through our courses catalog and choose what you want to learn
          </p>
          <router-link class="btn btn-light" to="/">
            Browse Courses
          </router-link>
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
    <button ref="prevbutton" class="prev_button disc_section" @click="prev">
      <i class="fa-solid fa-chevron-left"></i>
    </button>
    <button class="next_button disc_section" @click="next">
      <i class="fa-solid fa-chevron-right"></i>
    </button>
  </section>
</template>
<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
export default {
  name: "carousel-cards",
  components: { VueSlickCarousel },
  data() {
    return {
      settings: {
        arrows: false,
        infinite: false,
        // initialSlide: 4,
        speed: 500,
        centerMode: false,
        variableWidth: true,
        slidesToScroll: 1,
        slidesToShow: 3,
        centerPadding: "10px",
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              initialSlide: 1,
              infinite: false,
              centerMode: true,
              variableWidth: true,
              dots: false,
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
      const slickCards = document.querySelectorAll(".carousel-card");
      console.log(slickCards.length);
      console.log();
      this.$refs.carousel.next();
    },
    prev() {
      this.$refs.carousel.prev();
    },
    // Events listeners
    handleBeforeChange(event, slick, currentSlide) {
      console.log(event, slick, currentSlide);
      if (slick == 0) {
        this.$refs.prevbutton.classList.add("d-none");
      } else if (slick > 0) {
        this.$refs.prevbutton.classList.remove("d-none");
        this.$refs.prevbutton.classList.add("d-flex");
      }
      // console.log("handleAfterChange", slick, currentSlide);
    },
  },
  mounted() {
    this.handleBeforeChange();
  },
};
</script>
<style>
.carousel-card.main_card_content_discripe {
  min-width: 490px !important;
  max-width: 490px !important;
  height: 255px !important;
  margin-right: 20px;
  background: transparent !important;
}
.slick-track {
  margin-left: 0 !important;
  margin-right: 0 !important;
  display: flex !important;
  margin-right: 20px;
}
.carousel-card {
  margin: 0 11px;
}
.slick-track.slick-center {
  width: 100% !important;
}
.discription_about-courses {
  height: 100%;
  padding: 0 24px;
}
section.section_carousle.content {
  background: #1b1f1f;
  padding: 50px 100px;
  margin: 80px 0;
}
.discription_about_title {
  font-size: 30px;
  color: #d4d4d4;
}
.subtitle_discription-carousel_card {
  font-size: 16px;
  margin-top: 11px;
  margin-bottom: 35px;
  color: #a1a1a1;
}
.next_button.disc_section {
  right: 7.2% !important;
  height: 72%;
  top: 50%;
  transform: translatey(-50%);
}
.prev_button.disc_section {
  left: 7.2%;
  height: 72%;
  top: 50%;
  transform: translatey(-50%);
}
</style>
