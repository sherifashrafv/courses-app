<template>
  <div class="container">
    <div class="row">
      <div v-if="loader" class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <div
        v-else
        v-for="course in coursesList"
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
          <div @click="deleteElement(course)" class="delete_element">
            <img src="@/assets/Images/Icons/delete.png" alt="" />
          </div>
          <div class="go_to_page">
            <router-link
              tag="buttton"
              :to="`/instractor/user/${course.Email}/id/${course.userid}/vedios/${course.categoryCourse}/${course.id}/${course.courseName}`"
              class="btn btn-danger go_to_page"
            >
              <i class="fa-solid fa-arrow-right-long"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "courses-page-instructor_courses",
  props: {
    coursesList: {
      type: Array,
    },
    loader: {
      type: Boolean,
    },
  },
  methods: {
    async deleteElement(elemnt) {
      await axios
        .delete(`/${elemnt.categoryCourse}/${elemnt.userid}/${elemnt.id}.json`)
        .then(() => {
          this.$emit("getCourses", {
            id: elemnt.userid,
            courseCategory: elemnt.categoryCourse,
          });
        });
    },
  },
};
</script>
<style>
.course_list_card {
  border-radius: 10px;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  min-width: unset !important;
  max-width: unset !important;
  height: 100%;
  background: #141717;
  width: 100%;
  padding: 20px;
}
.course_list_card > div {
  width: calc(100% 2);
}
.img_course img {
  width: 236px;
  object-fit: cover;
  border-radius: 10px;
  align-self: stretch;
  -webkit-margin-end: 22px;
  margin-inline-end: 22px;
  height: 150px;
}
.horizontal-course-card__title {
  font-weight: 500;
  font-size: 18px;
  line-height: 1.33;
  margin: 0 0 3px;
  color: #eee;
}
.horizontal-course-card__subtitle {
  font-size: 13px;
  line-height: 2;
  color: #a1a1a1;
}
.horizontal-course-card__description {
  font-size: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #6c6c6c;
  word-break: break-all !important;
}
.go_to_page {
  position: absolute;
  bottom: 4%;
  right: 1rem;
  padding: 0 !important;
  width: 54px;
}
button.btn.btn-danger.go_to_pag {
  padding: 1px 28px;
  margin-top: 22px !important;
}
.delete_element {
  right: 20px;
  top: 20px;
  position: absolute;
  cursor: pointer;
}
.delete_element img {
  width: 30px;
  height: 30px;
}
</style>
