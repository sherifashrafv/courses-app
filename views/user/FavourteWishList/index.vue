<template>
  <section class="wish_courses_list">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="p-5 mt-5">
            <h3 class="title_saved_courses">Saved Courses</h3>
            <div class="mt-4">
              <div class="row">
                <div v-if="loader" class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div
                  v-else
                  v-for="course in wishListed"
                  :key="course.id"
                  class="col-12 mb-2"
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
                    </div>
                    <div class="go_to_page">
                      <router-link
                        tag="buttton"
                        :to="`/coursePage/${course.categoryCourse}/${course.userid}/${course.id}`"
                        class="btn btn-danger go_to_pag"
                      >
                        <i class="fa-solid fa-arrow-right-long"></i>
                      </router-link>
                    </div>
                  </div>
                </div>
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
export default {
  name: "favorite-page",
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  data() {
    return {
      wishList: [],
      wishListed: [],
    };
  },
  watch: {
    wishList(newwishList) {
      if (newwishList) {
        newwishList.forEach((ele) => {
          axios.get(`/wishList/${this.user.id}/${ele.id}.json`).then((res) => {
            let newData = res.data;
            let course = [];
            for (let key in newData) {
              newData[key].id = key;
              course.push(newData[key]);
              console.log(course);
            }
            this.wishListed.push(...course);
          });
        });
      }
    },
  },
  mounted() {
    this.getWishList();
  },
  methods: {
    async getWishList() {
      await axios
        .get(`/wishList/${this.user.id}.json`)
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
  },
};
</script>
<style scoped>
.title_saved_courses {
  margin-bottom: 8px;
  font-size: 24px;
  color: #eeeeee;
}
</style>
