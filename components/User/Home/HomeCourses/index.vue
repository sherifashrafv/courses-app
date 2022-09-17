<template>
  <div>
    <section class="tabs_vedios">
      <div class="container">
        <div>
          <ul
            class="tabs-parent d-flex flex-row align-items-center gap-5 tabs_home px-5 py-1"
          >
            <li
              @click="activeTab = 'SalesMarketing'"
              :class="[CategoryTitle === 'SalesMarketing' ? 'active' : '']"
            >
              Featured Courses
            </li>
            <li
              @click="activeTab = 'MediaPhotographyFilm'"
              :class="[
                CategoryTitle === 'MediaPhotographyFilm' ? 'active' : '',
              ]"
            >
              Most Viewed
            </li>
            <li
              @click="activeTab = 'Arts & Design'"
              :class="[CategoryTitle === 'ArtsDesign' ? 'active' : '']"
            >
              New Courses
            </li>
          </ul>
          <!-- carousel -->

          <!-- end -->
        </div>
        <div class="position-relative">
          <ve-carousel :courses="coursesListed" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
export default {
  name: "home-courses",
  data() {
    return {
      activeTab: "SalesMarketing",
      courses: [],
      coursesListed: [],
      activeMenu: false,
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
        console.log(res.data.documents);
        for (let key in newData) {
          newData[key].id = key;
          course.push(newData[key]);
        }
        this.courses = course;
      });
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
              console.log(course);
            }
            this.coursesListed.push(...course);
          });
        });
      }
      if (oldCourse) {
        this.coursesListed = [];
        console.log("newData");
      }
    },
    async activeTab(newCategory) {
      if (newCategory) {
        console.log("newCategory");
        const regx = newCategory.replace(/[/^\s+|\s+$/|&;$%@"<>()+,]/gm, "");
        this.activeTab = regx;
        this.activeMenu = true;
        this.CategoryTitle = regx;
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
    if (this.activeTab.includes("SalesMarketing")) {
      this.getCourse("SalesMarketing");
    } else {
      this.coursesListed = [];
      this.courses = [];
    }
  },
};
</script>
<style></style>
