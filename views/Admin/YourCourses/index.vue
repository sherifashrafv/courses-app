<template>
  <div class="courses_empty">
    <img src="@/assets/Images/Admin/Your-Courses/Courses-Empty.png" alt="" />
    <h2>You do not have any courses in progress</h2>
    <p>Start a new course to be able to track it here.</p>
    <button @click="showModalHandler" class="btn btn-danger add-Course">
      Add Your Own Course
    </button>
    <ModalVedios :show="ShowModal" :modalHide="hideModal"></ModalVedios>
  </div>
</template>
<script>
import ModalVedios from "@/components/Admin/ModalVedios/index.vue";
export default {
  name: "your-courses",
  components: {
    ModalVedios,
  },
  data() {
    return {
      ShowModal: false,
      currentUser: false,
      showSettingsMenu: false,
    };
  },
  methods: {
    showModalHandler() {
      this.ShowModal = !this.ShowModal;
    },
    hideModal() {
      this.ShowModal = false;
    },
  },
};
</script>
<style></style>
