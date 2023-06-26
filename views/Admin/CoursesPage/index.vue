<template>
  <div>
    <div class="container">
      <div
        class="d-flex flex-row align-items-center justify-content-between mt-4 mb-3"
      >
        <h4 class="length_courses m-0 p-0">
          {{ $route.params.name }}
        </h4>
        <!-- <h4 class="length_courses m-0 p-0">You have Courses</h4> -->
        <button
          @click="showModalHandel"
          class="btn btn-danger custome_instractors_styles"
        >
          Add Course
        </button>
      </div>
      <div class="break-line my-4"></div>
      <!-- modal-add-vedio -->
      <modalAddVedios
        :show="showModalVedios"
        :modalHide="hideModal"
        :courseCategory="courseCategory"
        :id="id"
        @cancelHandel="hideModal"
        @getCourses="getCourses"
      ></modalAddVedios>
      <!-- modal-end -->
      <div
        v-if="courses.length <= 0"
        class="course_empty_nothing-added d-flex flex-column align-items-center justify-content-center"
      >
        <img
          src="@/assets/Images/Admin/Your-Courses/Courses-Empty.png"
          alt=""
        />
        <h2 class="user-profile-empty-courses_title">
          You do not have any courses in {{ $route.params.name }}
        </h2>
      </div>
      <CoursesListed
        v-else
        @deleteElement="deleteCourse"
        :coursesList="courses"
        :loader="loading"
        :information="getInstructor"
        @getCourses="getCourses"
      ></CoursesListed>
    </div>
  </div>
</template>
<script>
import modalAddVedios from "@/components/shared/AddVedios/index.vue";
import CoursesListed from "@/views/Admin/CoursesPage/CoursesListed/index.vue";
import axios from "axios";
export default {
  name: "courses-page",
  components: {
    modalAddVedios,
    CoursesListed,
  },
  data() {
    return {
      loading: true,
      courses: [],
      showModalVedios: false,
      id: "",
      courseCategory: "",
    };
  },
  computed: {
    getInstructor() {
      return this.$store.state.insturctor;
    },
  },
  methods: {
    showModalHandel() {
      this.showModalVedios = !this.showModalVedios;
    },
    hideModal() {
      this.showModalVedios = false;
    },
    async getCourses({ id, courseCategory }) {
      await axios.get(`/${courseCategory}/${id}.json`).then((res) => {
        this.loading = false;
        let newData = res.data;
        let course = [];
        for (let key in newData) {
          newData[key].id = key;
          course.push(newData[key]);
        }
        this.courses = course;
      });
    },
    getInstructorInformation(id) {
      this.$store.dispatch("getUserInstructor", {
        id,
      });
    },
  },
  watch: {
    "$route.params": {
      handler: function (params) {
        const myRegx = params.name.replace(/[/^\s+|\s+$/|&;$%@"<>()+,]/gm, "");
        this.courseCategory = myRegx;
        this.id = params.id;
        if (params.id) {
          this.getInstructorInformation({ id: params.id });
        }
        if (params.name) {
          this.getCourses({ id: params.id, courseCategory: myRegx });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.getCourses();
  },
};
</script>
<style scoped>
.user-profile-empty-courses_title {
  margin: 35px 0 10px;
  font-size: 21px;
  color: #eee;
  text-align: center;
}
</style>
