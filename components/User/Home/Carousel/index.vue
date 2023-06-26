<template>
  <div>
    <h1 class="title_carousel mb-5">{{ this.title }}</h1>
    <Slick
      id="slick_slider"
      ref="slick"
      class="mt-4"
      :options="settings"
      :dots="true"
    >
      <!--  -->
      <template v-if="loading">
        <div v-for="(lis, i) in fakeArray" :key="i * 20" class="carousel-card">
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
      <!--  -->
      <template v-else>
        <div v-for="course in courses" :Key="course.id">
          <router-link
            tag="div"
            role="button"
            :to="`/coursePage/${course.categoryCourse}/${course.userid}/${course.id}/${course.courseName}`"
            class="carousel-card"
          >
            <img
              v-if="course.backgroundImage"
              class="img_card_carosuel"
              :src="course.backgroundImage"
              alt=""
            />
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
                  :ref="'courses' + course.id"
                >
                  <img src="@/assets/Images/Icons/wishlist.png" alt="" />
                </span>
                <!-- <span v-else style="opacity: 0.3" class="img_wishlist_course">
                <img src="@/assets/Images/Icons/wishlist.png" alt="" /> -->
                <!-- </span> -->
              </div>
            </div>
          </router-link>
        </div>
      </template>
    </Slick>
  </div>
</template>
<script>
import Slick from "vue-slick";
import "slick-carousel/slick/slick.css";
import axios from "axios";
export default {
  name: "ve-carousel-courses",
  components: { Slick },
  data() {
    return {
      coursesGot: [],
      prevBu: false,
      nextBu: false,
      wishList: [],
      wishListed: [],
      full: [],
      savedCourses: false,
      fakeArray: Array(8).fill(""),
      user: null,
      id: null,
      settings: {
        arrows: true,
        infinite: true,
        initialSlide: 1,
        speed: 500,
        slidesToScroll: 1,
        slidesToShow: 3,
        variableWidth: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 4,
              variableWidth: true,
              slidesToScroll: 1,
              arrows: true,
            },
          },

          {
            breakpoint: 767,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              variableWidth: false,
              arrows: true,
            },
          },
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              variableWidth: true,
              arrows: true,
            },
          },
          {
            breakpoint: 639,
            settings: {
              slidesToShow: 1,
              arrows: true,
              variableWidth: false,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 638,
            settings: {
              slidesToShow: 1,
              arrows: true,
              variableWidth: false,
              slidesToScroll: 1,
            },
          },
        ],
      },
    };
  },
  methods: {
    next() {
      this.$refs.slick.next();
    },
    prev() {
      this.$refs.slick.prev();
    },
    handleBeforeChange(event, slick) {
      if (slick == 0) {
        this.$refs.prevbutton.classList.add("d-none");
      } else if (slick > 0) {
        this.$refs.prevbutton.classList.remove("d-none");
        this.$refs.prevbutton.classList.add("d-flex");
      }
    },
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

      if (this.user) {
        if (this.wishList === null) {
          this.$refs["courses" + item.id][0].classList.add("active");
          await axios
            .post(`savedCourses/${this.id}/${item.id}.json`, {
              ...item,
            })
            .then(() => {
              this.getWishList();
            })
            .catch((error) => {
              console.log(error);
            });
        } else if (this.wishList) {
          let found = this.wishListed.find((ele) => ele.id == item.id);
          if (found) {
            await axios
              .delete(`savedCourses/${this.id}/${item.id}.json`)
              .then(() => {
                this.getWishList();
              });
            this.$refs["courses" + item.id][0].classList.remove("active");
          } else {
            await axios
              .post(`savedCourses/${this.id}/${item.id}.json`, {
                ...item,
              })
              .then(() => {
                this.getWishList();
              });
          }
        } else if (this.wishList.length === 0) {
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
  mounted() {
    let user = localStorage.getItem("user-info");
    this.user = JSON.parse(user);
    if (user) {
      this.id = JSON.parse(user).id;
    }
    this.getWishList();
    this.$watch(
      (vm) => [vm.courses, vm.wishListed],
      (val) => {
        val[0].forEach((ele) => {
          let found = val[1].find((course) => course.id === ele.id);
          if (found) {
            this.$refs["courses" + ele.id][0].classList.add("active");
          } else {
            this.$refs["courses" + ele.id][0].classList.remove("active");
          }
        });
      },
      {
        immediate: true, // run immediately
        deep: true, // detects changes inside objects. not needed here, but maybe in other cases
      }
    );
  },
  updated() {
    this.$nextTick(function () {
      if (this.$refs.slick) {
        this.$refs.slick.create(this.settings);
      }
    });
  },
  props: {
    title: {
      type: String,
    },
    courses: {
      type: Array,
    },
    loading: {
      type: Boolean,
    },
  },
  watch: {
    courses(newValue) {
      if (newValue) {
        this.coursesGot = newValue;
      }
    },
    user(newValue) {
      if (newValue) {
        this.savedCourses = true;
        // this.getWishList(newValue.id);
      }
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

  computed: {
    users() {
      return this.$store.state.user;
    },
  },
};
</script>
<style scoped>
.title_carousel {
  font-weight: 500;
  line-height: 1.31;
  letter-spacing: 0.52px;
  font-size: 24px;
  padding: 0 1rem;
}
@media (max-width: 768px) {
  .title_carousel {
    padding: 0 0 !important;
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
>>> .slick-track {
  margin-left: 0 !important;
  display: flex !important;
  gap: 20px !important;
  justify-content: flex-start !important;
  align-items: flex-start !important;
}
.carousel-card {
  min-width: 280px;
  max-width: 280px;
  height: fit-content;
}
.card-title {
  font-family: "Roboto", "sans-serif";
  height: 43px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1.25;
  margin-top: 1rem;
  color: white !important;
}
@media (max-width: 639px) {
  .carousel-card {
    max-width: 100% !important;
  }
}
@media (max-width: 600px) {
  .card-call-to-action {
    margin-top: 2rem;
  }
  .carousel-card {
    max-width: 100%;
  }
}
@media (max-width: 768px) {
  .card-call-to-action {
    margin-top: 2rem;
  }
  .next_button,
  .prev_button {
    display: flex;
  }
}
/* Small Screens */
@media (min-width: 768px) and (max-width: 991px) {
  .card-call-to-action {
    margin-top: 4rem;
  }
}
@media (min-width: 992px) {
  .card-call-to-action {
    margin-top: 1rem;
  }
  .next_button,
  .prev_button {
    display: flex;
  }
}
@media (min-width: 1200px) {
  .slick-slide {
    width: 254px;
  }
}
@media (max-width: 1199px) {
}
.fade-in-enter-active {
  transition: all 0.5s ease;
}

.fade-in-leave-active {
  transition: all 0.5s ease;
}

.fade-in-enter,
.fade-in-leave-to {
  position: absolute; /* add for smooth transition between elements */
  opacity: 0;
}
/*  */
</style>
