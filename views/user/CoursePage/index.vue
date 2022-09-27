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
              :style="[
                course.backgroundImage
                  ? { backgroundImage: `url(${course.backgroundImage})` }
                  : {
                      backgroundImage: `url(https://app.almentor.net/assets/images/images-logo-placeholder.svg)`,
                    },
              ]"
              class="img_course_background position-relative"
            >
              <div @click="showModalVd" class="modal_open_vedio">
                <div v-if="previewVedio.length > 0" class="icon_vedio_modal">
                  <i class="fa-solid fa-play"></i>
                </div>
              </div>
              <Vd-Modal :url="urlvd" :show="showVd" :modalHide="hideVd">
              </Vd-Modal>
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
            <div class="img_mentor position-relative">
              <img v-if="course.userimage" :src="course.userimage" alt="" />
              <img
                v-else
                src="../../../assets/Images/Icons/Loader.svg"
                alt=""
              />
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
            <h2 class="mb-0 mt-4">In this course you will learn</h2>
            <AboutCourseContent></AboutCourseContent>
          </div>
          <div class="course_benfits">
            <h2 class="course_benfits_title">Course Benefits</h2>
            <ul class="benfits p-2 mb-0 mt-3">
              <li class="p-2 mb-3">
                <span>
                  <img
                    class="benfit_img"
                    src="@/assets/Images/Icons/padlock.png"
                    alt=""
                  />
                </span>
                <span class="title_benfit ps-3">Access anywhere, anytime.</span>
              </li>
              <li class="p-2 mb-3">
                <span>
                  <img
                    class="benfit_img"
                    src="@/assets/Images/Icons/open-book.png"
                    alt=""
                  />
                </span>
                <span class="title_benfit ps-3">Learn at your own pace. </span>
              </li>
              <li class="p-2 mb-3">
                <span>
                  <img
                    class="benfit_img"
                    src="@/assets/Images/Icons/certification.png"
                    alt=""
                  />
                </span>
                <span class="title_benfit ps-3"
                  >Certificate of completion.</span
                >
              </li>
              <li class="p-2 mb-3">
                <span>
                  <img
                    class="benfit_img"
                    src="@/assets/Images/Icons/pdf.png"
                    alt=""
                  />
                </span>
                <span class="title_benfit ps-3"
                  >Download PDF file for course content.</span
                >
              </li>
              <li class="p-2 mb-3">
                <span>
                  <img
                    class="benfit_img"
                    src="@/assets/Images/Icons/communication.png"
                    alt=""
                  />
                </span>
                <span class="title_benfit ps-3">Ask the mentor.</span>
              </li>
            </ul>
          </div>
          <div class="bg_whg">
            <h1>Course requirements and prerequisites</h1>
            <div class="ind_c d-flex align-items-center">
              <span></span>
              <h4>Some business or management experience is preferable.</h4>
            </div>
          </div>
          <div class="container">
            <div class="row position-relative my-5">
              <ve-carousel
                :title="'Courses you might like'"
                :courses="ArtsDesignListed"
              >
              </ve-carousel>
            </div>
          </div>
          <!--  -->
          <div class="course_content">
            <h4 class="course_benfits_title mb-5">Course Content</h4>
            <div v-for="(sec, i) in sections" :key="sec.id" class="col-12">
              <div
                :data-card="`#${sec.title}`"
                style="height: 60px"
                class="card_section_have_been_add d-flex align-items-center justify-content-between"
              >
                <h1 class="title_section_course m-0">
                  Section {{ i + 1 }} : {{ sec.title }}
                </h1>
                <span
                  @click="
                    activeTabs.length <= 0
                      ? openSections({
                          sectionTitle: sec.title,
                          userId: sec.userId,
                        })
                      : closeTabs()
                  "
                  style="right: 12px; position: static"
                  class="open_sections"
                >
                  <i
                    :class="
                      activeTabs == sec.title
                        ? 'fa-solid fa-minus'
                        : 'fa-solid fa-plus'
                    "
                  ></i>
                </span>
              </div>

              <transition name="fade">
                <div
                  v-if="activeTabs === sec.title"
                  class="section_main_wrapper_open"
                >
                  <div
                    class="add-lesson d-flex align-items-center justify-content-between"
                  >
                    <h2 class="add_lesson-title">Lessons</h2>
                    <!-- end-lessons-modal -->
                  </div>
                  <div
                    v-for="(lesson, i) in lessons"
                    :key="lesson.id"
                    class="lessons_added"
                  >
                    <h1
                      @click="openVedioModal({ url: lesson.url })"
                      class="lesson_title"
                    >
                      Lesson {{ i + 1 }} : {{ lesson.title }}
                    </h1>
                    <Vd-Modal
                      :url="url"
                      :show="vedioModal"
                      :modalHide="hideVedioModal"
                    >
                    </Vd-Modal>
                  </div>
                </div>
              </transition>
            </div>
            <div
              v-if="sections.length === 0"
              style="height: 60px"
              class="card_section_have_been_add d-flex align-items-center justify-content-between"
            >
              <h1 class="title_section_course m-0">Nothing Added Yet</h1>
            </div>
            <div
              v-if="sections.length > 0"
              style="height: 60px"
              class="card_section_have_been_add d-flex align-items-center justify-content-between"
            >
              <h1 class="title_section_course m-0">End</h1>
            </div>
          </div>
          <div class="course_content"></div>
        </div>
        <div class="detx_wrpp col-md-12 col-lg-4">
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
        <div class="box_md_">
          <p></p>
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
import AboutCourseContent from "@/components/User/AboutCourseContent/index.vue";
export default {
  name: "CoursePage",
  components: {
    AboutCourseContent,
  },
  data() {
    return {
      userid: "",
      id: "",
      title: "",
      course: [],
      categoryCourse: "",
      lessons: [],
      activeTabs: "",
      url: "",
      vedioModal: false,
      //
      ArtsDesign: [],
      ArtsDesignListed: [],
      sections: [],
      previewVedio: [],
      titleCourse: "",
      urlvd: "",
      showVd: false,
      preview: false,
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
    async ArtsAndDesign() {
      await axios.get("/ArtsDesign.json").then((res) => {
        let newData = res.data;
        let course = [];
        console.log(res.data);
        for (let key in newData) {
          newData[key].id = key;
          course.push(newData[key]);
        }
        this.ArtsDesign = course;
      });
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
    async getLessons(title) {
      await axios
        .get(`/${this.categoryCourse}-lessons/${this.userid}/${title}.json`)
        .then((res) => {
          this.loader = false;
          console.log(res.data);
          let newData = res.data;
          let course = [];
          for (let key in newData) {
            newData[key].id = key;
            course.push(newData[key]);
          }
          this.lessons = course;
          this.lessonId = course.id;
        });
    },
    async openSections({ sectionTitle }) {
      this.activeTabs = sectionTitle;
      this.getLessons(sectionTitle);
    },
    closeTabs() {
      this.activeTabs = "";
    },
    openVedioModal({ url }) {
      this.url = url;
      this.vedioModal = !this.vedioModal;
    },
    hideVedioModal() {
      this.vedioModal = false;
    },
    async getPreviwVedio() {
      await axios
        .get(
          `/${this.categoryCourse}-previews/${this.userid}/${this.titleCourse}.json`
        )
        .then((res) => {
          this.loader = false;
          console.log(res.data);
          let newData = res.data;
          let course = [];
          for (let key in newData) {
            newData[key].id = key;
            course.push(newData[key]);
          }
          this.previewVedio = course;
        });
    },
    showModalVd() {
      this.showVd = !this.showVd;
    },
    hideVd() {
      this.showVd = false;
    },
  },
  watch: {
    async ArtsDesign(newgetcourses) {
      if (newgetcourses) {
        newgetcourses.forEach((ele) => {
          axios.get(`/ArtsDesign/${ele.id}.json`).then((res) => {
            let newData = res.data;
            let course = [];
            for (let key in newData) {
              newData[key].id = key;
              course.push(newData[key]);
              console.log(course);
            }
            this.ArtsDesignListed.push(...course);
          });
        });
      }
    },
    "$route.params": {
      handler: function (params) {
        const myRegx = params.categoryCourse.replace(
          /[/^\s+|\s+$/|&;$%@"<>()+,]/gm,
          ""
        );
        this.getSections({
          categoryName: myRegx,
          id: params.userid,
          courseId: params.id,
        });
      },
      deep: true,
      immediate: true,
    },
    previewVedio(newValue) {
      newValue.forEach((element) => {
        this.urlvd = element.url;
      });
    },
  },
  mounted() {
    this.title = this.$route.params.categoryCourse;
    this.categoryCourse = this.$route.params.categoryCourse;
    this.titleCourse = this.$route.params.courseTitle;
    this.id = this.$route.params.id;
    this.userid = this.$route.params.userid;
    this.get_course();
    this.ArtsAndDesign();
    this.getPreviwVedio();
    document.title = this.$route.params.courseTitle;
  },
};
</script>
<style scoped>
.modal_open_vedio {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon_vedio_modal {
  width: 40px;
  height: 40px;
  background: white;
  text-align: center;
  border-radius: 50%;
  color: black;
  line-height: 40px;
  cursor: pointer;
}
</style>
