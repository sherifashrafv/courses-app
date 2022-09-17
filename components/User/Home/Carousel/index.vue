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
      <div v-for="course in courses" :Key="course.id">
        <router-link
          tag="div"
          role="button"
          :to="`/coursePage/${course.categoryCourse}/${course.userid}/${course.id}/${course.courseName}`"
          class="carousel-card"
        >
          <img class="img_card_carosuel" :src="course.backgroundImage" alt="" />
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
                :ref="'courses' + course.id"
              >
                <img src="@/assets/Images/Icons/wishlist.png" alt="" />
              </span>
              <span v-else style="opacity: 0.3" class="img_wishlist_course">
                <img src="@/assets/Images/Icons/wishlist.png" alt="" />
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </Slick>
    <!-- <button v-if="coursesGot.length > 0" class="next_button" @click="prev">
      <i class="fa-solid fa-chevron-left"></i>
    </button>
    <button v-if="coursesGot.length > 0" class="prev_button" @click="next">
      <i class="fa-solid fa-chevron-right"></i>
    </button> -->
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
      savedCourses: false,
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
              slidesToShow: 1,
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
              variableWidth: true,
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
      console.log("handleBeforeChange");
      if (slick == 0) {
        this.$refs.prevbutton.classList.add("d-none");
      } else if (slick > 0) {
        this.$refs.prevbutton.classList.remove("d-none");
        this.$refs.prevbutton.classList.add("d-flex");
      }
    },
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
      let refurnce = localStorage.getItem("user-info");
      let id = JSON.parse(refurnce).id;
      if (found) {
        this.$refs["courses" + item.id][0].classList.remove("active");
        axios.delete(`/wishList/${id}/${item.id}.json`).then(() => {
          this.getWishList(id);
        });
      } else {
        this.$refs["courses" + item.id][0].classList.add("active");
        await axios.post(`/wishList/${id}/${item.id}.json`, item).then(() => {
          this.getWishList(id);
        });
      }
    },
  },
  beforeUpdate() {
    if (this.$refs.slick) {
      this.$refs.slick.destroy();
    }
  },
  mounted() {
    let refurnce = localStorage.getItem("user-info");
    let id = JSON.parse(refurnce).id;
    this.getWishList(id);
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
        this.getWishList(newValue.id);
      }
    },
    wishList(newwishList) {
      if (newwishList) {
        newwishList.forEach((ele) => {
          const found = newwishList.find((course) => course.id === ele.id);
          if (found) {
            this.$refs["courses" + ele.id][0].classList.add("active");
          } else {
            this.$refs["courses" + ele.id][0].classList.remove("active");
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
  margin-top: 2rem;
}
@media (max-width: 600px) {
  .card-call-to-action {
    margin-top: 2rem;
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
    margin-top: 2rem;
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
  /* >>> .slick-track {
    transform: translate(0, 0) !important;
  } */
}

/* Custom */

@media (max-width: 1199px) {
}
/*  */
</style>
