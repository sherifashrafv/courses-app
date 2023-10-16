<template>
  <section class="wish_courses_list">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="p-5 mt-5">
            <h3 class="title_saved_courses">Saved Courses</h3>
            <div class="mt-4">
              <div class="row d-flex justify-content-center align-items-center">
                <div v-if="loader" style="margin: 10rem" class="lds-roller">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div
                  v-if="empty"
                  class="empty_saved_courses d-flex justify-content-center align-items-center text-center flex-column"
                >
                  <h3 style="color: #858e90">Empty !</h3>
                  <img src="@/assets/Images/Icons/WatingForAggree.png" alt="" />
                </div>
                <template v-else>
                  <router-link
                    role="button"
                    tag="div"
                    v-for="course in wish"
                    :key="course.id"
                    class="col-12 mb-2"
                    :to="`/coursePage/${course.categoryCourse}/${course.userid}/${course.id}/${course.courseName}`"
                  >
                    <div class="course_list_card d-flex position-relative">
                      <div class="img_course">
                        <img :src="course.backgroundImage" alt="" />
                      </div>
                      <div class="content_about_course_card">
                        <h1 class="horizontal-course-card__title">
                          {{ course.courseName }}
                        </h1>
                        <p class="horizontal-course-card__subtitle">
                          {{ course.FirstName + " " + course.LastName }}
                        </p>
                        <div class="d-flex flex-column">
                          <p class="horizontal-course-card__description">
                            {{ course.discription }}
                          </p>
                        </div>
                        <span
                          @click.self="deleteFromFavorit(course.id)"
                          class="fs-1"
                        >
                          x
                        </span>
                      </div>
                    </div>
                  </router-link>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
// import axios from "axios";
export default {
  name: "favorite-page",
  data() {
    return {
      wishList: [],
      wishListed: [],
      wish: [],
      loader: true,
      empty: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },

  watch: {
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
    wishListed(newValue) {
      let user = localStorage.getItem("user-info");
      let id = JSON.parse(user).id;
      if (newValue) {
        newValue.forEach((ele) => {
          axios.get(`/savedCourses/${id}/${ele.id}.json`).then((res) => {
            let newData = res.data;
            let course = [];
            this.loader = false;
            for (let key in newData) {
              course.push(newData[key]);
            }
            this.wish.push(...course);
          });
        });
      }
    },
    deleteFromFavorit(id) {
      console.log(id);
    },
  },
  mounted() {
    this.getWishList();
    document.title = this.$route.name;
  },
  methods: {
    async getWishList() {
      let user = localStorage.getItem("user-info");
      let id = JSON.parse(user).id;
      axios
        .get(`/savedCourses/${id}.json`)
        .then((res) => {
          this.loader = false;
          this.wishList = res.data;
          if (res.data === null) {
            this.empty = true;
          } else {
            this.empty = false;
          }
        })
        .catch((error) => {
          console.log(error.code);
        });
    },
  },
};
</script>
<style scoped>
.title_saved_courses {
  margin-bottom: 8px;
  font-size: 24px;
  color: #eeeeee;
}
.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #a1a1a1;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
