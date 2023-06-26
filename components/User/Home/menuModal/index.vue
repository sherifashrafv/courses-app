<template>
  <transition name="fade">
    <div @click.self="modalHide" class="modal-container" v-if="show">
      <div class="modal-content">
        <div
          class="categories_get_random d-flex flex-row justify-content-between"
        >
          <div class="categories_nav_list m-0">
            <div class="head_title_categories">
              <h4 class="m-0">Categories</h4>
            </div>
            <ul class="main_menu_categories d-flex flex-column w-100">
              <li
                v-for="(course, i) in Categories"
                :key="i"
                @mouseenter="activeTab = course"
                :class="[CategoryTitle === course ? 'active' : '']"
              >
                <div
                  class="w-100 p-3 d-flex flex-row justify-content-between align-items-center"
                >
                  <span class="tab_text_categories">{{ course }}</span>
                  <span class="arrow_category_list"
                    ><i class="fa-solid fa-chevron-right"></i
                  ></span>
                </div>
              </li>
            </ul>
            <router-link
              to="courses"
              tag="div"
              class="button_browse_courses_categories d-flex align-items-center justify-content-between"
              @click.native="$emit('hide')"
            >
              <span class="m-auto">BrowseCourses</span>
              <span>
                <i class="fa-solid fa-arrow-right-long"></i>
              </span>
            </router-link>
          </div>
          <div class="data_fetched d-flex flex-column position-relative">
            <ul
              v-if="activeTab === CategoryTitle"
              class="courses_listed-links_mx"
            >
              <li v-if="activeMenu" class="spinner_getItems">
                <ve-loader></ve-loader>
              </li>
              <li v-else>
                <transition-group class="content__list" name="company">
                  <li
                    v-for="course in coursesListed.slice(0, 4)"
                    :key="course.id"
                  >
                    <router-link
                      @click.native="modalHide"
                      :to="`/coursePage/${course.categoryCourse}/${course.userid}/${course.id}/${course.courseName}`"
                      class="listed-course d-flex flex-row align-items-center mb-5"
                    >
                      <div class="course_image">
                        <img :src="course.backgroundImage" alt="" />
                      </div>
                      <div class="content_of_course">
                        <p class="title_course">{{ course.courseName }}</p>
                        <p class="author_instractor">
                          {{ course.FirstName + " " + course.LastName }}
                        </p>
                      </div>
                    </router-link>
                  </li>
                </transition-group>
              </li>
            </ul>
            <span
              @click="goTo"
              :class="
                activeMenu ? 'view_all_courses d-none' : 'view_all_courses'
              "
              role="button"
            >
              viewAll
            </span>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import axios from "axios";
export default {
  name: "ve-modal",
  props: {
    show: {
      type: Boolean,
      default: false,
      required: false,
    },
    modalHide: {
      type: Function,
    },
  },
  data() {
    return {
      activeTab: "Languages",
      courses: [],
      coursesListed: [],
      activeMenu: false,
      Categories: [
        "Languages",
        "Arts & Design",
        "Soft Skills",
        "Media, Photography & Film",
        "Business Management",
        "Sales & Marketing",
        "Technology, Science & Productivity",
        "Parenting & Relationships",
        "Lifestyle & Health",
        "Entrepreneurship",
        "Mental Health & Wellness",
      ],
      CategoryTitle: "",
    };
  },
  methods: {
    async getCourse(title) {
      const regx = title.replace(/[/^\s+|\s+$/|&;$%@"<>()+,]/gm, "");
      this.activeTab = title;
      this.CategoryTitle = title;
      this.activeMenu = true;
      await axios.get(`/${regx}.json`).then((res) => {
        this.activeMenu = false;
        let newData = res.data;
        let course = [];
        for (let key in newData) {
          newData[key].id = key;
          course.push(newData[key]);
        }
        this.courses = course;
      });
    },
    goTo() {
      this.$emit("hide");
      this.$router.push(`/categories/${this.activeTab}`);
    },
    reportWindowSize() {
      if (window.innerWidth) {
        this.modalHide();
      }
    },
  },
  watch: {
    async courses(newgetcourses, oldCourse) {
      if (newgetcourses) {
        this.activeMenu = true;
        newgetcourses.forEach((ele) => {
          axios.get(`/${this.CategoryTitle}/${ele.id}.json`).then((res) => {
            this.activeMenu = false;
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
      if (oldCourse) {
        this.coursesListed = [];
      }
    },
    async activeTab(newCategory) {
      if (newCategory) {
        const regx = newCategory.replace(/[/^\s+|\s+$/|&;$%@"<>()+,]/gm, "");
        this.activeTab = regx;
        this.activeMenu = true;
        this.CategoryTitle = newCategory;
        await axios.get(`/${regx}.json`).then((res) => {
          let newData = res.data;
          let course = [];
          this.activeMenu = false;
          for (let key in newData) {
            newData[key].id = key;
            course.push(newData[key]);
          }
          this.courses = course;
        });
      } else {
        this.courses = [];
      }
    },
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.reportWindowSize();
    });
    if (this.activeTab.includes("Languages")) {
      this.getCourse("Languages");
    } else {
      this.coursesListed = [];
      this.courses = [];
    }
  },
};
</script>
<style scoped>
.modal-container {
  position: absolute;
  left: 0;
  top: 100%;
  right: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
}
.modal-container .modal-content {
  width: 912px;
  min-width: unset !important;
  max-width: unset !important;
  top: 75px;
  left: 211.875px;
  position: fixed;

  z-index: 1500;
}
.modal-container .modal-content::before {
  content: "";
  position: absolute;
  top: -5%;
  left: 25px;
  border-width: 23px;
  border-color: transparent transparent #1b1f1f transparent;
  border-style: dashed dashed dashed dashed;
  z-index: 1;
}
.fade-enter-active,
.fade-leave-active {
  opacity: 0;
}
.categories_get_random {
  height: 100vh;
}
.fade-enter,
.fade-leave-to {
  transition: opacity 0.25s ease-in-out;
}
.categories_get_random div {
  width: calc(100% / 2);
  max-height: 650px;
  padding-bottom: 10px;
}
.categories_get_random div:first-child {
  overflow-y: hidden;
  overflow-x: none;
}
.arrow_category_list {
  font-size: 12px;
  color: #3b4242;
  font-weight: bold;
}

.main_menu_categories {
  max-height: 485px;
  overflow-y: auto;
}
.main_menu_categories:hover::-webkit-scrollbar {
  opacity: 1;
  display: block;
  width: 5px;
}
.main_menu_categories::-webkit-scrollbar {
  display: none;
  opacity: 0;
  transition: all;
  width: 5px;
}
.main_menu_categories li {
  cursor: pointer;
  color: var(--map-numbers-count);
}
.main_menu_categories li:hover,
.main_menu_categories li.active {
  background: #252a2a;
}
.tab_text_categories {
  font-size: 19px;
  font-weight: 400;
  font-family: "Roboto", "sans-serif";
}
.head_title_categories {
  padding: 12px 0px 9px 17px;
  font-size: 20px;
  font-weight: 500;
  color: #a1a1a1;
  font-size: 23px;
}
.button_browse_courses_categories {
  margin-top: 10px;
  background: #eb2027;
  padding: 8px 14px;
  color: #eee;
  text-align: center;
  border-radius: 4px;
  margin-left: 15px;
  cursor: pointer;
}
.data_fetched {
  padding: 0 30px;
  background: #252a2a;
}
/* .course_image {
  margin-right: 36px;
} */
.course_image img {
  width: 150px;
  height: 90px;
  object-fit: cover;
  border-radius: 10px;
}
.author_instractor {
  color: #707070;
  line-height: 1;
  font-size: 14px;
  margin: 8px 0 0;
}
.title_course {
  color: var(--map-numbers-count);
  line-height: 1.25;
  font-size: 17px;
}
.listed-course {
  text-decoration: none;
}
.view_all_courses {
  color: #0a8db1 !important;
  margin: auto;
  text-decoration: none;
  font-weight: 600;
}
.view_all_courses:hover {
  text-decoration: underline;
}
.categories_nav_list {
  background: #1b1f1f;
}
.courses_listed-links_mx {
  max-height: 561px;
}
.courses_listed-links_mx li:first-child {
  padding-top: 15px !important;
}
a.view_all_courses.spinnerActive {
  position: absolute;
  bottom: 6%;
  left: 50%;
  transform: translateX(-50%);
}
.spinner_getItems {
  position: absolute;
  top: 50%;
  padding: 0 !important;
  left: 50%;
}

/* animation */
/* base */
.company {
  backface-visibility: hidden;
}

/* moving */
.company-move {
  transition: all 2s ease-in-out 2s;
}

/* appearing */
.company-enter-active {
  transition: all 2s ease-out;
}

/* disappearing */
.company-leave-active {
  transition: all 2s ease-in;
  position: absolute;
  z-index: 0;
}

/* appear at / disappear to */
.company-enter,
.company-leave-to {
  opacity: 0;
}
</style>
