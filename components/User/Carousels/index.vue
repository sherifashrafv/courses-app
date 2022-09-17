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
          <div v-for="(course, index) in courses" :key="course.id">
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
                    v-if="savedCourses"
                    @click.capture="addToWish($event, course, index)"
                    class="img_wishlist_course"
                    :ref="'courseSaved' + course.id"
                  >
                    <img src="@/assets/Images/Icons/wishlist.png" alt="" />
                  </span>
                  <span
                    ref="courseSaved"
                    v-else
                    style="opacity: 0.3"
                    class="img_wishlist_course"
                  >
                    <img src="@/assets/Images/Icons/wishlist.png" alt="" />
                  </span>
                </div>
              </div>
            </router-link>
          </div>
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
      coursesGot: [],
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
              slidesToScroll: 1,
              initialSlide: 1,
              // infinite: false,
              // centerMode: true,
              // variableWidth: true,
              dots: false,
              arrows: false,
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
      wishList: [],
      wishListed: [],
      savedCourses: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    async getWishList(id) {
      await axios
        .get(`/wishList/${id}.json`)
        .then((res) => {
          let newData = res.data;
          let wishList = [];
          for (let key in newData) {
            newData[key].id = key;
            // this.wishList.push(newData[key]);
            wishList.push(newData[key]);
          }
          this.wishList = wishList;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async addToWish(e, item) {
      e.preventDefault();
      const found = this.wishList.find((course) => course.id === item.id);
      if (found) {
        this.$refs["courseSaved" + item.id][0].classList.remove("active");
        axios.delete(`/wishList/${this.user.id}/${item.id}.json`).then(() => {
          this.getWishList(this.user.id);
        });
      } else {
        this.$refs["courseSaved" + item.id][0].classList.add("active");
        await axios
          .post(`/wishList/${this.user.id}/${item.id}.json`, item)
          .then(() => {
            this.getWishList(this.user.id);
          });
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
  },
  mounted() {
    let refurnce = localStorage.getItem("user-info");
    let id = JSON.parse(refurnce).id;
    this.getWishList(id);
  },
  watch: {
    courses(newValue) {
      if (newValue) {
        // this.handleBeforeChange();
        this.coursesGot = newValue;
      }
    },
    user(newValue) {
      if (newValue) {
        this.savedCourses = true;
        this.getWishList(newValue.id);
      }
    },
    wishList(newwishList) {
      if (newwishList) {
        newwishList.forEach((ele) => {
          const found = newwishList.find((course) => course.id === ele.id);
          if (found) {
            this.$refs["courseSaved" + ele.id][0].classList.add("active");
          } else {
            this.$refs["courseSaved" + ele.id][0].classList.remove("active");
          }
          //
          axios.get(`/wishList/${this.user.id}/${ele.id}.json`).then((res) => {
            let newData = res.data;
            let course = [];
            for (let key in newData) {
              newData[key].id = key;
              course.push(newData[key]);
              console.log(course);
            }
            this.wishListed = course;
          });
        });
      }
    },
    "$route.name": {
      handler: function (name) {
        if (name) {
          this.savedCourses = true;
        }
      },
      deep: true,
      immediate: true,
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
    align-items: flex-start !important;
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
    margin-top: 9rem;
  }
}
@media (min-width: 1200px) {
}
@media (max-width: 1199px) {
}
</style>
