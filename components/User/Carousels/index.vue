<template>
  <div>
    <section class="bg_activity">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="carousel-card main_card_content_discripe active">
              <div
                class="discription_about-courses active d-flex flex-column align-items-center justify-content-center"
              >
                <p class="discription_about_title">
                  Start Your Learning Journey
                </p>
                <p class="subtitle_discription-carousel_card">
                  Browse through our courses catalog and choose what you want to
                  learn
                </p>
                <router-link class="btn btn-light" to="/courses">
                  Browse Courses
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section class="section_carousle content position-relative">
        <Slick id="slick_slider" ref="slick" class="mt-4" :options="settings">
          <div class="carousel-card main_card_content_discripe">
            <div
              class="discription_about-courses d-flex flex-column align-items-start justify-content-center"
            >
              <p class="discription_about_title">Start Your Learning Journey</p>
              <p class="subtitle_discription-carousel_card">
                Browse through our courses catalog and choose what you want to
                learn
              </p>
              <router-link class="btn btn-light" to="/courses">
                Browse Courses
              </router-link>
            </div>
          </div>
          <!-- laading -->
          <template v-if="loading">
            <div v-for="(lis, i) in empty" :key="i * 20" class="carousel-card">
              <div class="movie--isloading">
                <div class="loading-image"></div>
                <div class="loading-content">
                  <div class="loading-text-container">
                    <div class="loading-main-text"></div>
                    <div class="loading-sub-text"></div>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <!-- end-loading -->
          <template v-else>
            <div v-for="course in courses" :key="course.id">
              <router-link
                tag="div"
                role="button"
                :to="`/coursePage/${course.categoryCourse}/${course.userid}/${course.id}/${course.courseName}`"
                class="carousel-card"
              >
                <img class="img_card_carosuel" :src="course.backgroundImage" />
                <div class="course_body">
                  <p class="card-title">{{ course.courseName }}</p>
                  <div
                    class="card-call-to-action d-flex flex-row align-items-center justify-content-between"
                  >
                    <p class="course-card-subtitle">
                      {{ course.FirstName + " " + course.LastName }}
                    </p>
                    <span
                      @click.capture="addToSavedVedios($event, course)"
                      class="img_wishlist_course"
                      :ref="'coursestx' + course.id"
                    >
                      <img src="@/assets/Images/Icons/wishlist.png" alt="" />
                    </span>
                  </div>
                </div>
              </router-link>
            </div>
          </template>
        </Slick>
      </section>
    </section>
  </div>
</template>
<script>
import Slick from "vue-slick";
import "slick-carousel/slick/slick.css";
import axios from "axios";

export default {
  name: "carousel-cards",
  components: { Slick },
  data() {
    return {
      slick: false,
      wishList: [],
      wishListed: [],
      empty: Array(8).fill(""),
      settings: {
        infinite: false,
        // initialSlide: 4,
        speed: 500,
        // centerMode: true,
        variableWidth: true,
        slidesToScroll: 1,
        slidesToShow: 3,
        arrows: true,
        // centerPadding: "10px",
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 3,
              initialSlide: 4,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 2,
              initialSlide: 1,
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
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async getWishList() {
      let user = localStorage.getItem("user-info");
      if (user) {
        let id = JSON.parse(user).id;
        axios
          .get(`/savedCourses/${id}.json`)
          .then((res) => {
            this.wishList = res.data;
          })
          .catch((error) => {
            console.log(error.code);
          });
      }
    },
    async addToSavedVedios(e, item) {
      e.preventDefault();
      this.$refs["coursestx" + item.id][0].classList.add("active");
      let user = localStorage.getItem("user-info");
      let id = JSON.parse(user).id;
      if (user) {
        if (this.wishList === null) {
          await axios
            .post(`savedCourses/${id}/${item.id}.json`, {
              ...item,
            })
            .then(() => {
              this.getWishList();
            })
            .catch((error) => {
              console.log(error);
            });
        }
        //
        else if (this.wishList) {
          let found = this.wishListed.find((ele) => ele.id == item.id);
          //
          if (found) {
            await axios
              .delete(`savedCourses/${id}/${item.id}.json`)
              .then(() => {
                this.getWishList();
              });
            this.$refs["coursestx" + item.id][0].classList.remove("active");
          }
          //
          else {
            await axios
              .post(`savedCourses/${id}/${item.id}.json`, {
                ...item,
              })
              .then(() => {
                this.getWishList();
              });
          }
        }
        //
        else if (this.wishList.length === 0) {
          console.log(0);
        }
      } else {
        this.$router.push(`/login`);
      }
    },
  },
  beforeUpdate() {
    if (this.$refs.slick) {
      this.$refs.slick.destroy();
    }
  },
  updated() {
    this.$nextTick(function () {
      if (this.$refs.slick) {
        this.$refs.slick.create(this.settings);
      }
    });
  },
  props: {
    courses: {
      type: Array,
    },
    loading: {
      type: Boolean,
    },
  },
  mounted() {
    this.getWishList();
    this.$watch(
      (vm) => [vm.courses, vm.wishListed],
      (val) => {
        val[0].forEach((ele) => {
          let found = val[1].find((course) => course.id === ele.id);
          if (found) {
            this.$refs["coursestx" + ele.id][0].classList.add("active");
          } else {
            this.$refs["coursestx" + ele.id][0].classList.remove("active");
          }
        });
      },
      {
        immediate: true, // run immediately
        deep: true, // detects changes inside objects. not needed here, but maybe in other cases
      }
    );
  },
  watch: {
    "$route.name": {
      handler: function (name) {
        if (name) {
          this.savedCourses = true;
        }
      },
      deep: true,
      immediate: true,
    },
    wishList(newValue) {
      if (newValue) {
        let newData = newValue;
        let course = [];
        for (let key in newData) {
          newData[key].id = key;
          course.push(newData[key]);
        }
        this.wishListed = course;
      }
    },
  },
};
</script>
<style scoped>
.carousel-card.main_card_content_discripe {
  min-width: 490px !important;
  max-width: 490px !important;
  height: 255px !important;
  margin-right: 20px;
  background: transparent !important;
}
>>> .slick-track {
  margin-left: 0 !important;
  display: flex !important;
  margin-right: 20px !important;
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
.next_button_disc_section {
  position: absolute;
  border-radius: 10px;
  background-color: var(--navigation-button-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 11px;
  right: 7.2% !important;
  height: 72% !important;
  top: 50% !important;
  transform: translateY(-50%);
  width: 38px;
}

.disc_section_prev_button {
  position: absolute;
  border-radius: 10px;
  background-color: var(--navigation-button-background);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 11px;
  left: 7.2% !important;
  height: 72% !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  width: 38px;
  display: none;
}
@media (max-width: 600px) {
  .discription_about-courses.active {
    align-items: center !important;
  }
}
@media (max-width: 768px) {
  .carousel-card.main_card_content_discripe.active {
    display: block !important;
  }
  section.section_carousle.content {
    display: none !important;
  }

  .title_carousel {
    padding: 0 0 !important;
  }
  .discription_about-courses {
    padding: 0 0;
  }
}
>>> .slick-next,
button.slick-next.slick-arrow {
  font-size: 0;
  line-height: 0;
  position: absolute;
  top: 50%;
  display: block;
  width: 20px;
  height: 20px;
  padding: 0;
  transform: translate(50%, -50%);
  cursor: pointer;
  color: transparent;
  border: none;
  outline: none;
  background: transparent;
  height: 100%;
  width: 38px;
  background: #252a2a;
  border-radius: 10px;
}
>>> .slick-prev {
  font-size: 0;
  line-height: 0;
  position: absolute;
  top: 50%;
  display: block;
  width: 20px;
  height: 20px;
  padding: 0;
  transform: translate(-50%, -50%);
  cursor: pointer;
  color: transparent;
  border: none;
  outline: none;
  background: transparent;
  height: 100%;
  width: 38px;
  background: #252a2a;
  border-radius: 10px;
}

>>> button.slick-prev.slick-arrow.slick-disabled,
>>> button.slick-next.slick-arrow.slick-disabled {
  display: none !important;
}
>>> .slick-next:hover,
>>> .slick-next:focus,
>>> .slick-prev:hover,
>>> .slick-prev:focus {
  background: #252a2a !important;
}
@media (min-width: 768px) and (max-width: 991px) {
  .carousel-card.main_card_content_discripe.active {
    display: block !important;
    max-width: 100% !important;
  }
  section.section_carousle.content {
    display: none !important;
  }
}
@media (min-width: 992px) {
  .carousel-card.main_card_content_discripe.active {
    display: none !important;
  }
  section.section_carousle.content {
    display: block !important;
  }
}
@media (max-width: 1223px) {
  .carousel-card.main_card_content_discripe.active {
    display: block !important;
    max-width: 100% !important;
    margin: 50px 0 80px 0;
  }
  section.section_carousle.content {
    display: none !important;
  }
  .carousel-card.main_card_content_discripe {
    max-width: 100% !important;
    min-width: 100% !important;
  }
  .bg_activity {
    background: #1b1f1f;
    background: #1b1f1f;
    padding: 33px 0;
    margin-top: 6rem;
  }
}
@media (min-width: 1200px) {
}
@media (max-width: 1199px) {
}
</style>
