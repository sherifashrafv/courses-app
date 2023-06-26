<template>
  <div>
    <div class="main_over_lay-categories">
      <div class="over_lay_image_categories position-relative">
        <div class="backdrop_shadow_layer"></div>
        <div class="background_opacity_00"></div>
        <div class="content_over_lay">
          <div class="container">
            <div class="row">
              <div class="col-12">
                <h3>{{ title }}</h3>
                <div class="subscribe_with_price_categories">
                  <p>
                    Only at 91.67 EGP /month!
                    <span>
                      Get all of this and more when you subscribe to almentor.
                    </span>
                  </p>
                  <button class="btn_subscribe">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section class="courses mb-5">
      <div class="container">
        <div class="row gy-5">
          <template v-if="loader">
            <div
              v-for="(lis, i) in fakeArray"
              :key="i * 20"
              class="col-lg-3 col-md-6 col-sm-12"
            >
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
          <template v-else>
            <div
              v-for="course in paginatedOrders"
              :key="course.id"
              class="col-lg-3 col-md-6 col-sm-12"
            >
              <router-link
                tag="div"
                role="button"
                :to="`/coursePage/${course.categoryCourse}/${course.userid}/${course.id}/${course.courseName}`"
              >
                <div
                  style="max-width: 100% !important; min-width: 100% !important"
                  class="carousel-card"
                  role="button"
                >
                  <img
                    :src="course.backgroundImage"
                    alt=""
                    class="img_card_carosuel"
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
                        :ref="'coursesListed' + course.id"
                        class="img_wishlist_course"
                      >
                        <img src="@/assets/Images/Icons/wishlist.png" alt="" />
                      </span>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </template>
        </div>
        <div class="d-flex flex-row align-items-center">
          <button
            @click="loadMore"
            v-if="currentPage * maxPerPage < coursesListed.length"
            class="btn btn-success load_More_data"
          >
            {{ $("loadMore") }}
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import axios from "axios";
export default {
  // metaInfo: {
  //   title: ``,
  //   titleTemplate: "%s - Moon-Site",
  // },
  name: "Category-Name",
  data() {
    return {
      courses: [],
      coursesListed: [],
      category: "",
      currentPage: 1,
      maxPerPage: 8,
      fakeArray: Array(8).fill(""),
      loader: true,
      wishList: [],
      wishListed: [],
      user: null,
      id: null,
      title: "",
    };
  },
  methods: {
    async getCourses(name) {
      await axios.get(`/${name}.json`).then((res) => {
        const data = res.data;
        let newData = data;
        let course = [];
        for (let key in newData) {
          newData[key].id = key;
          course.push(newData[key]);
        }
        this.courses = course;
      });
    },
    loadMore() {
      this.currentPage += 1;
    },
    async getWishList() {
      let user = localStorage.getItem("user-info");
      let id = JSON.parse(user).id;
      axios
        .get(`/savedCourses/${id}.json`)
        .then((res) => {
          this.wishList = res.data;
        })
        .catch((error) => {
          console.log(error.code);
        });
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
  watch: {
    "$route.params": {
      handler: function (params) {
        const regx = params.name.replace(/[/^\s+|\s+$/|&;$%@"<>()+,]/gm, "");
        this.category = regx;
        if (params) {
          const regx = params.name.replace(/[/^\s+|\s+$/|&;$%@"<>()+,]/gm, "");
          this.title = regx;
          // if (localStorage.getItem("lang") === "ar") {
          //   if (regx === "Languages") {
          //     this.title = "اللغات";
          //   } else if (regx === "ArtsDesign") {
          //     this.title = "الفنون والتصميم";
          //   } else if (regx === "SoftSkills") {
          //     this.title = "المهارات اللينة";
          //   } else if (regx === "MediaPhotographyFilm") {
          //     this.title = "وسائل الإعلام والتصوير والسينما";
          //   } else if (regx === "BusinessManagement") {
          //     this.title = "ادارة اعمال";
          //   } else if (regx === "SalesMarketing") {
          //     this.title = "المبيعات والتسويق";
          //   } else if (regx === "TechnologyScienceProductivity") {
          //     this.title = "التكنولوجيا والعلوم والإنتاجية";
          //   } else if (regx === "Parenting Relationships") {
          //     this.title = "الأبوة والأمومة والعلاقات";
          //   } else if (regx === "LifestyleHealth") {
          //     this.title = "نمط الحياة والصحة";
          //   } else if (regx === "Entrepreneurship") {
          //     this.title = "ريادة الأعمال";
          //   } else if (regx === "MentalHealthWellness") {
          //     this.title = "الصحة العقلية والعافية";
          //   }
          // }
          // if (localStorage.getItem("lang") === "en") {
          //   this.title = this.$route.params.name;
          // }
          this.getCourses(regx);
          this.$route.meta.title = regx;
        }
      },
      deep: true,
      immediate: true,
    },
    $route(to) {
      document.title = to.meta.title || "Other Title";
    },
    async courses(newgetcourses, oldValue) {
      if (newgetcourses) {
        this.coursesListed = [];
        newgetcourses.forEach((ele) => {
          axios.get(`/${this.category}/${ele.id}.json`).then((res) => {
            this.loader = false;
            let newData = res.data;
            let course = [];
            for (let key in newData) {
              newData[key].id = key;
              course.push(newData[key]);
            }
            this.coursesListed.push(...course);
          });
        });
      }
      if (oldValue) {
        oldValue.forEach((ele) => {
          axios.get(`/${this.category}/${ele.id}.json`).then((res) => {
            let newData = res.data;
            let course = [];
            for (let key in newData) {
              newData[key].id = key;
              course.push(newData[key]);
            }
            this.coursesListed.push(...course);
          });
        });
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
    twoVariables(newValue) {
      newValue[0].forEach((ele) => {
        let found = newValue[1].find((course) => course.id === ele.id);
        if (found) {
          this.$refs["coursesListed" + ele.id][0].classList.add("active");
        } else {
          this.$refs["coursesListed" + ele.id][0].classList.remove("active");
        }
      });
    },
  },
  computed: {
    paginatedOrders() {
      return this.coursesListed.slice(0, this.currentPage * this.maxPerPage);
    },
    twoVariables() {
      return [this.coursesListed, this.wishListed];
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    this.user = JSON.parse(user);
    this.id = JSON.parse(user).id;
    this.getWishList();
    document.title = "Categories" + "-" + this.$route.params.name;
  },
};
</script>
<style scoped>
.over_lay_image_categories {
  width: 100%;
  height: 100%;
  background-position: 50%;
  background-size: cover;
  background-image: url("@/assets/Images/categories/59fa91ac8678ae7f3428a57973f630d81751457845330688d737bb0bef417cb3");
}
.main_over_lay-categories {
  height: 261px;
}
.background_opacity_00 {
  background: rgba(0, 0, 0, 0.4392156862745098);
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}
.backdrop_shadow_layer {
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  width: 100%;
  z-index: 2;
  position: absolute;
  top: 0;
  height: 261px;
  background: linear-gradient(
    180deg,
    rgba(10, 141, 177, 0) 19%,
    rgba(0, 83, 107, 0.17) 35%,
    rgba(0, 58, 74, 0.46) 48%,
    rgba(0, 25, 31, 0.76) 64%,
    rgba(0, 14, 18, 0.91) 80%,
    #000
  );
}
.content_over_lay {
  position: absolute;
  top: 34%;
  width: 100%;
  height: 100%;
  z-index: 999;
}
.subscribe_with_price_categories {
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 40px;
  align-items: center;
  box-shadow: 0 0 16px 0 rgb(0 0 0 / 16%);
  border-radius: 10px;
  position: relative;
}
.subscribe_with_price_categories::after {
  content: "";
  background: #0c2129
    url("@/assets/Images/categories/category-subscription-banner-bg.a56c5de4f4d9c188f6b6.png")
    no-repeat 100% 100%;
  border-radius: 10px;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.subscribe_with_price_categories p {
  font-size: 18px;
  color: var(--category-mini-subscription-banner-text-color);
  font-weight: 500;
  margin-bottom: 0;
  line-height: 18px;
  z-index: 2;
}
.subscribe_with_price_categories p span {
  color: #afe0e7;
  font-size: 16px;
  font-weight: 400;
}
.btn_subscribe {
  background: #eb2027;
  border-radius: 5px;
  color: #fff;
  z-index: 3;
  padding: 8px 26px;
  margin: 0;
  border: none;
  outline: none;
  font-weight: 500;
  line-height: 1.5;
  margin-right: 1rem;
}
button.btn.btn-success.load_More_data {
  background: transparent !important;
  border: 1px solid #3f3f3f;
  border-radius: 15px;
  font-weight: bold;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  margin: auto;
  height: 60px;
  width: 400px;
  margin: 3rem auto;
  color: #ddd;
  font-weight: 200;
  font-style: italic;
  transition: all 0.3s ease-in-out;
  font-style: italic;
  text-transform: capitalize;
}
button.btn.btn-success.load_More_data:hover {
  background: white !important;
  color: black;
  font-weight: bold;
}
.carousel-card.items {
  max-width: 100% !important;
  min-width: 100% !important;
}
</style>
