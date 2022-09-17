<template>
  <div>
    <div class="container p-5 position-relative">
      <h3 style="color: #eee">{{ title }}</h3>
      <VueSlickCarousel id="slick_slider" ref="carousel" v-bind="settings">
        <!-- first-col -->
        <div class="category-fh-100">
          <div
            class="imag_categories_ h-100 img_1 w-100 d-flex flex-column justify-content-center align-items-center"
          >
            <h5>Languages</h5>
          </div>
        </div>
        <!-- end -->
        <!-- second-col -->
        <div class="DBB-boxes d-flex flex-column gap-5 justify-content-between">
          <div
            class="category_half_height img_1 d-flex flex-column align-items-center justify-content-center"
          >
            <h4>Arts & Design</h4>
          </div>
          <div
            class="category_half_height img_2 d-flex flex-column align-items-center justify-content-center"
          >
            <h4>Soft Skills</h4>
          </div>
        </div>
        <!-- end -->
        <!-- third_col -->
        <div
          class="category-full-width-cards d-flex flex-column justify-content-between"
        >
          <div
            class="media_photos_films d-flex flex-column justify-content-center align-items-center"
          >
            <h3>Media, Photography & Film</h3>
          </div>
          <div
            class="flex_wrapper_business d-flex flex-row justify-content-center align-items-center gap-5"
          >
            <div
              class="Business_Management d-flex text-center flex-column justify-content-center align-items-center"
            >
              <h4>Business Management</h4>
            </div>
            <div
              class="Sales_Marketing text-center d-flex flex-column justify-content-center align-items-center"
            >
              <h4>Sales & Marketing</h4>
            </div>
          </div>
        </div>
        <!-- end -->
        <!-- fourth-col -->
        <div class="category-fh-100">
          <div
            class="imag_categories_ h-100 img_2 w-100 d-flex flex-column justify-content-center align-items-center"
          >
            <h5>Languages</h5>
          </div>
        </div>
        <!-- end -->
        <!-- start-fifth -->
        <div class="DBB-boxes d-flex flex-column gap-5 justify-content-between">
          <div
            class="category_half_height img_3 d-flex flex-column align-items-center justify-content-center"
          >
            <h4>Parenting & Relationships</h4>
          </div>
          <div
            class="category_half_height img_4 d-flex flex-column align-items-center justify-content-center"
          >
            <h4>Kids Development</h4>
          </div>
        </div>
        <!-- end-fifth -->
        <div
          class="category-full-width-cards d-flex flex-column justify-content-between"
        >
          <div
            class="Lifestyle_Health d-flex flex-column justify-content-center align-items-center"
          >
            <h3>Lifestyle & Health</h3>
          </div>
          <div
            class="flex_wrapper_business d-flex flex-row justify-content-center align-items-center gap-5"
          >
            <div
              class="Entrepreneurship d-flex text-center flex-column justify-content-center align-items-center"
            >
              <h4>Entrepreneurship</h4>
            </div>
            <div
              class="Mental_Health_Wellness text-center d-flex flex-column justify-content-center align-items-center"
            >
              <h4>Mental Health & Wellness</h4>
            </div>
          </div>
        </div>
        <!-- sixth-col -->

        <div class="category-fh-100">
          <div
            class="imag_categories_ h-100 img_5 w-100 d-flex flex-column justify-content-center align-items-center"
          >
            <h5>Education</h5>
          </div>
        </div>
        <!-- end -->
      </VueSlickCarousel>
      <button ref="prevbutton" class="disc_section_prev_button" @click="prev">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button ref="nexbutton" class="next_button_disc_section" @click="next">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>
<script>
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
export default {
  name: "carousel-courses-page",
  components: { VueSlickCarousel },
  data() {
    return {
      settings: {
        arrows: false,
        infinite: false,
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
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1,
            },
          },
        ],
      },
      categories: [
        {
          title: "Languages",
        },
      ],
    };
  },
  methods: {
    getImage(item) {
      return require(item);
    },
    next() {
      this.$refs.carousel.next();
    },
    prev() {
      this.$refs.carousel.prev();
    },
    // handleBeforeChange(event, slick) {
    //   if (slick == 0) {
    //     this.$refs.prevbutton.classList.add("d-none");
    //   } else if (slick > 0) {
    //     this.$refs.prevbutton.classList.remove("d-none");
    //     this.$refs.prevbutton.classList.add("d-flex");
    //   }
    // },
  },
  props: ["title"],
  mounted() {
    // this.handleBeforeChange();
  },
};
</script>
<style scoped>
.DBB-boxes {
  width: 280px !important;
  height: 323px !important;
}
.category-fh-100 {
  height: 328px;
  width: 270px !important;
}
.flex_wrapper_business > div {
  width: calc(100% / 2);
}
.imag_categories_.h-100.img_1 {
  background-image: url("@/assets/Images/CoursesPage/Languages.jpg");
  width: 100%;
  height: 100%;
  background-position: 50%;
  background-size: cover;
  border-radius: 10px;
}
.imag_categories_.h-100.img_2 {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/Images/CoursesPage/Technology\,\ Science\ &\ Productivity.jpg");
  background-position: 50%;
  background-size: cover;
  border-radius: 10px;
}
.imag_categories_.h-100.img_5 {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/Images/CoursesPage/Education.jpg");
  background-position: 50%;
  background-size: cover;
  border-radius: 10px;
}
.slick-slider {
  margin: 2.3rem 0rem 0rem 0rem !important;
}
>>> .slick-slide {
  margin: 0px 30px !important;
}
.category_half_height {
  width: 244px;
  height: 129px;
}
.category_half_height.img_1 {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/Images/CoursesPage/Arts\ &\ Design.jpg");
  background-position: 50%;
  background-size: cover;
  border-radius: 10px;
}
.category_half_height.img_2 {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/Images/CoursesPage/Soft\ Skills.jpg");
  background-position: 50%;
  background-size: cover;
  border-radius: 10px;
}
.category_half_height.img_3 {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/Images/CoursesPage/Parenting\ &\ Relationships.jpg");
  background-position: 50%;
  background-size: cover;
  border-radius: 10px;
}
.category_half_height.img_4 {
  width: 100%;
  height: 100%;
  background-image: url("@/assets/Images/CoursesPage/Kids\ Development.jpg");
  background-position: 50%;
  background-size: cover;
  border-radius: 10px;
}
.media_photos_films {
  width: 100% !important;
  height: 132px;
  background-image: url("@/assets/Images/CoursesPage/Media\,\ Photography\ &\ Film.jpg");
  background-position: 50%;
  background-size: cover;
  border-radius: 10px;
}
.category-full-width-cards {
  width: 524px !important;
  height: 323px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  gap: 25px;
}
.Sales_Marketing {
  background-image: url("@/assets/Images/CoursesPage/Sales\ &\ Marketing.jpg");
  background-position: 50%;
  background-size: cover;
  border-radius: 10px;
  height: 132px;
  width: 244px;
}
.Business_Management {
  background-image: url("@/assets/Images/CoursesPage/Business\ Management.jpg");
  background-position: 50%;
  background-size: cover;
  border-radius: 10px;
  height: 132px;
  width: 244px;
}
.Mental_Health_Wellness {
  background-image: url("@/assets/Images/CoursesPage/Mental\ Health\ &\ Wellness.jpg");
  background-position: 50%;
  background-size: cover;
  border-radius: 10px;
  height: 132px;
  width: 244px;
}
.Lifestyle_Health {
  background-image: url("@/assets/Images/CoursesPage/Lifestyle\ &\ Health.jpg");
  background-position: 50%;
  background-size: cover;
  border-radius: 10px;
  height: 132px;
  width: 100%;
}
.Entrepreneurship {
  background-image: url("@/assets/Images/CoursesPage/Entrepreneurship.jpg");
  background-position: 50%;
  background-size: cover;
  border-radius: 10px;
  height: 132px;
  width: 100%;
}
>>> .slick-track {
  display: flex !important;
}
.next_button_disc_section {
  position: absolute;
  border-radius: 50%;
  background-color: #0d0d0d;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #909090;
  font-size: 20px;
  right: 0 !important;
  height: 38px !important;
  top: 50% !important;
  transform: translateY(-50%);
  width: 38px;
}
.disc_section_prev_button {
  position: absolute;
  border-radius: 50%;
  background-color: #0d0d0d;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #909090;
  font-size: 20px;
  left: 0 !important;
  height: 38px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  width: 38px;
  display: none;
}
</style>
