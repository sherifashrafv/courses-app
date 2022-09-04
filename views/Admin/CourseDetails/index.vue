<template>
  <div>
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
              <div class="img_course_background">
                <img :src="course.backgroundImage" alt="" />
              </div>
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
        </div>
      </div>
    </section>

    <!--what_you_learn  -->
    <WhatYouWillLearn
      :courseName="course.courseName"
      :userId="id"
      :categoryName="course.categoryCourse"
    ></WhatYouWillLearn>
    <!-- end -->
    <!-- course-content -->
    <section v-if="sections.length <= 0" class="course_Content">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="d-flex flex-row justify-content-between">
              <h4 class="no_sections_added_yet-title">Content Course</h4>
              <button @click="showModalHandel" class="btn btn-dark add_section">
                Add Section
              </button>
            </div>
            <ModalAddSection
              :show="showModal"
              :modalHide="hideModalHendelar"
              :information="course"
              @cancelModal="cancelHandel"
              @getCategories="getSections"
            ></ModalAddSection>
            <div
              class="add_section-courses_empty d-flex justify-content-center"
            >
              <img
                src="@/assets/Images/Admin/Your-Courses/Courses-Empty.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <Sections :sections="sections" @getSections="getSections" v-else></Sections>
  </div>
</template>
<script>
import axios from "axios";
import ModalAddSection from "@/components/Admin/ModalAddSection/index.vue";
import Sections from "@/components/Admin/CourseSections/index.vue";
import WhatYouWillLearn from "@/components/Admin/WLearn/index.vue";
export default {
  name: "course-details-page",
  components: {
    ModalAddSection,
    Sections,
    WhatYouWillLearn,
  },
  data() {
    return {
      email: "",
      id: null,
      route: "",
      course: [],
      image: "",
      showModal: false,
      CategoryCourse: "",
      courseId: "",
      sections: [],
    };
  },
  watch: {
    "$route.params": {
      handler: function (params) {
        const myRegx = params.category.replace(
          /[/^\s+|\s+$/|&;$%@"<>()+,]/gm,
          ""
        );
        this.route = myRegx;
        this.id = params.id;
        this.courseId = params.courseId;
        this.getCourse({
          categoryName: params.category,
          id: params.id,
          courseId: params.courseId,
        });
        this.getSections({
          categoryName: params.category,
          id: params.id,
          courseId: params.courseId,
        });
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async getCourse({ categoryName, courseId, id }) {
      console.log(categoryName, categoryName, id);
      await axios.get(`/${categoryName}/${id}/${courseId}.json`).then((res) => {
        console.log(res.data);
        this.course = res.data;
      });
    },
    showModalHandel() {
      this.showModal = !this.showModal;
    },
    hideModalHendelar() {
      this.showModal = false;
    },
    cancelHandel() {
      this.showModal = false;
    },
    async getSections({ categoryName, courseId, id }) {
      await axios
        .get(`/${categoryName}-sections/${id}/${courseId}.json`)
        .then((res) => {
          let newData = res.data;
          let course = [];
          for (let key in newData) {
            newData[key].id = key;
            course.push(newData[key]);
          }
          this.sections = course;
        });
    },
  },
  mounted() {
    // await this.getSections();
  },
};
</script>
<style></style>
