<template>
  <div v-if="getAllCourses.length <= 0" class="courses_empty">
    <img src="@/assets/Images/Admin/Your-Courses/Courses-Empty.png" alt="" />
    <h2>You do not have any courses in progress</h2>
    <p>Start a new course to be able to track it here.</p>
    <button @click="showModalHandler" class="btn btn-danger add-Course">
      Add Your Own Course
    </button>
    <ModalVedios
      :userInformation="information"
      :show="ShowModal"
      :modalHide="hideModal"
    ></ModalVedios>
  </div>
  <Courses
    v-else
    :informationInstractor="information"
    :courses="getAllCourses"
  ></Courses>
</template>
<script>
import ModalVedios from "@/components/Admin/ModalVedios/index.vue";
import axios from "axios";
import Courses from "@/views/Admin/YourCourses/CoursesOfInstractor/index.vue";
export default {
  name: "your-courses",
  components: {
    ModalVedios,
    Courses,
  },
  data() {
    return {
      ShowModal: false,
      currentUser: false,
      showSettingsMenu: false,
      information: null,
      email: "",
      id: null,
    };
  },
  methods: {
    showModalHandler() {
      this.ShowModal = !this.ShowModal;
    },
    hideModal() {
      this.ShowModal = false;
    },
    async getUserInformation() {
      await axios
        .get(`/instactors?Email=${this.email}&id=${this.id}`)
        .then((res) => {
          const spread = [...res.data];
          spread.forEach((ele) => {
            this.information = ele;
          });
        });
    },
    getArtsDesign() {
      this.$store.dispatch("admin/get_ArtsDesign", {
        email: this.$route.params.email,
        userId: this.$route.params.id,
      });
    },
    get_SoftSkills() {
      this.$store.dispatch("admin/get_SoftSkills", {
        email: this.$route.params.email,
        userId: this.$route.params.id,
      });
    },
    get_MediaPhotographyFilm() {
      this.$store.dispatch("admin/get_MediaPhotographyFilm", {
        email: this.$route.params.email,
        userId: this.$route.params.id,
      });
    },
    get_TechnologyScienceProductivity() {
      this.$store.dispatch("admin/get_TechnologyScienceProductivity", {
        email: this.$route.params.email,
        userId: this.$route.params.id,
      });
    },
    get_ParentingRelationships() {
      this.$store.dispatch("admin/get_ParentingRelationships", {
        email: this.$route.params.email,
        userId: this.$route.params.id,
      });
    },
    get_Entrepreneurship() {
      this.$store.dispatch("admin/get_Entrepreneurship", {
        email: this.$route.params.email,
        userId: this.$route.params.id,
      });
    },
    get_MentalHealthWellness() {
      this.$store.dispatch("admin/get_MentalHealthWellness", {
        email: this.$route.params.email,
        userId: this.$route.params.id,
      });
    },
  },
  created() {
    this.email = this.$route.params.email;
    this.id = this.$route.params.id;
  },
  computed: {
    getAllCourses() {
      return this.$store.state.admin.CategoriesMix;
    },
  },
  mounted() {
    this.getUserInformation();
    this.getArtsDesign();
    this.get_SoftSkills();
    this.get_MediaPhotographyFilm();
    this.get_TechnologyScienceProductivity();
    this.get_ParentingRelationships();
    this.get_Entrepreneurship();
    this.get_MentalHealthWellness();
  },
};
</script>
<style></style>
