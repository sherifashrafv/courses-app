<template>
  <section
    :style="{
      'background-image': ` 
linear-gradient(
  to top,
  hsl(0, 0%, 0%) 0%,
  hsla(0, 0%, 0%, 0.964) 7.4%,
  hsla(0, 0%, 0%, 0.918) 15.3%,
  hsla(0, 0%, 0%, 0.862) 23.4%,
  hsla(0, 0%, 0%, 0.799) 31.6%,
  hsla(0, 0%, 0%, 0.73) 39.9%,
  hsla(0, 0%, 0%, 0.655) 48.2%,
  hsla(0, 0%, 0%, 0.577) 56.2%,
  hsla(0, 0%, 0%, 0.497) 64%,
  hsla(0, 0%, 0%, 0.417) 71.3%,
  hsla(0, 0%, 0%, 0.337) 78.1%,
  hsla(0, 0%, 0%, 0.259) 84.2%,
  hsla(0, 0%, 0%, 0.186) 89.6%,
  hsla(0, 0%, 0%, 0.117) 94.1%,
  hsla(0, 0%, 0%, 0.054) 97.6%,
  hsla(0, 0%, 0%, 0) 100%
),url(${course.backgroundImage})`,
    }"
    class="vedio_banner-main-section"
  >
    <div class="container">
      <div class="row overflow-hidden">
        <div class="col-md-12 col-lg-8">
          <div class="course_main_wrapper">
            <div
              :style="{
                'background-image': `url(${course.backgroundImage})`,
              }"
              class="img_course_background"
            >
              <!-- <img :src="course.backgroundImage" alt="" /> -->
            </div>
          </div>
          <div class="category_title_course">
            <h3>
              Categories : <span> {{ $route.params.categoryCourse }} </span>
            </h3>
          </div>
          <div class="category-links_dev my-4">
            <router-link tag="span" class="links_bordex" to="/courses/languages"
              >languages</router-link
            >
            <router-link tag="span" class="links_bordex" to="/courses/languages"
              >Arts & Desgin</router-link
            >
            <router-link tag="span" class="links_bordex" to="/courses/languages"
              >Soft Skills</router-link
            >
            <router-link tag="span" class="links_bordex" to="/courses/languages"
              >Media, Photography & Film</router-link
            >
          </div>
          <div class="about_course my-3">
            <h1>About this course</h1>
          </div>
          <div
            class="mentor_information mt-4 d-flex flex-row align-items-center gap-3"
          >
            <div class="img_mentor">
              <img :src="course.userimage" alt="" />
            </div>
            <div class="instructor_information">
              <p class="name">{{ course.FirstName + " " + course.LastName }}</p>
              <p class="job_title">Front End</p>
            </div>
          </div>
          <div class="course_description-with_page">
            <p class="desc">
              {{ course.discription }}
            </p>
          </div>
          <div class="Course_Content">
            <h2 class="m-0">Course Content</h2>
          </div>
        </div>
        <div class="col-md-12 col-lg-4">
          <div class="details_wrapper">
            <div class="content">
              <p class="title_course_desxx">
                {{ course.courseName }}
              </p>
              <div class="details_level_course d-flex flex-column">
                <div class="d-flex flex-row align-items-center mb-3">
                  <img
                    style="width: 20px; margin-right: 15px"
                    src="@/assets/Images/Icons/volume.png"
                    alt=""
                  />
                  <p class="course_level_title m-0">
                    level : {{ course.courseLevel }}
                  </p>
                </div>
                <div class="d-flex flex-row align-items-center mb-3">
                  <img
                    style="width: 20px; margin-right: 15px"
                    src="@/assets/Images/Icons/man-user.png"
                    alt=""
                  />
                  <p class="course_level_title m-0">
                    instructor :
                    {{ course.FirstName + " " + course.LastName }}
                  </p>
                </div>
                <div class="d-flex flex-row align-items-center mb-3">
                  <img
                    style="width: 20px; margin-right: 15px"
                    src="@/assets/Images/Icons/categories.png"
                    alt=""
                  />
                  <p class="course_level_title m-0">
                    Course-Category : {{ course.categoryCourse }}
                  </p>
                </div>
                <p class="horizontal-course-card__description">
                  <span style="color: #d4d4d4; text-transform: capitalize">
                    discription:
                  </span>
                  {{ course.discription }}
                </p>
                <div class="break-line my-4"></div>
              </div>
              <div
                style="cursor: pointer"
                class="d-flex justify-content-center"
              >
                <div class="share_modal d-flex align-items-center">
                  <img
                    style="
                      width: 15px;
                      margin-right: 8px;
                      object-fit: cover;
                      object-position: center;
                    "
                    src="@/assets/Images/Icons/share.png"
                    alt=""
                  />
                  <p class="m-0">Share Course</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12"></div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
export default {
  name: "CoursePage",
  data() {
    return {
      userid: "",
      id: "",
      title: "",
      course: [],
    };
  },
  methods: {
    async get_course() {
      await axios
        .get(`/${this.title}/${this.userid}/${this.id}.json`)
        .then((res) => {
          this.course = res.data;
        });
    },
  },
  mounted() {
    this.title = this.$route.params.categoryCourse;
    this.id = this.$route.params.id;
    this.userid = this.$route.params.userid;
    this.get_course();
  },
};
</script>
<style></style>
