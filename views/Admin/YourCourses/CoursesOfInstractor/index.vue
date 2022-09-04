<template>
  <div class="container">
    <div
      class="d-flex flex-row align-items-center justify-content-between my-3"
    >
      <h1 class="length_courses">You Have <span> </span>Course</h1>
      <button
        @click="showModalHandelar"
        class="btn btn-danger custome_instractors_styles"
      >
        Add Course
      </button>
    </div>
    <ModalVediosAdd
      :show="showModal"
      :modalHide="hideModal"
      @cancelHandel="hideModal"
    ></ModalVediosAdd>
    <div class="break-line my-4"></div>
  </div>
</template>
<script>
import ModalVediosAdd from "@/components/Admin/ModalVedios/index.vue";
// import axios from "axios";
// import axios from "axios";
export default {
  name: "CoursesListed",
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    showModalHandelar() {
      this.showModal = !this.showModal;
    },
    hideModal() {
      this.showModal = false;
    },
    async deleteItem(course) {
      console.log(course);
      // let category = course.Category;
      // let myRegx = category.replace(/[/^\s+|\s+$/|&;$%@"<>()+,]/gm, "");
      // await axios.delete(`/${myRegx}/` + course.id);

      //   this.$store.dispatch("admin/deleteCourse", {
      //     id: id,
      //     category: myRegx,
      //     userId: uid,
      //     title: title,
      //   });
    },
  },
  computed: {
    // getAllCourses() {
    //   return this.$store.state.admin.CategoriesMix;
    // },
  },
  components: {
    ModalVediosAdd,
  },
};
</script>
<style>
.content_about_course_card {
  display: flex;
  flex-direction: column;
}
.courses_card {
  padding: 20px;
  border-radius: 10px;
  background: #141717;
}
.image_background_course-card img {
  width: 236px;
  object-fit: cover;
  border-radius: 10px;
  align-self: stretch;
  height: 150px;
}
.title_about_course_card_intractor {
  font-weight: 500;
  font-size: 18px;
  line-height: 1.33;
  margin: 0 0 3px;
  color: var(--map-numbers-count);
  text-transform: capitalize;
}
.intractor_name_card {
  font-size: 13px;
  line-height: 2;
  text-transform: capitalize;
  color: #a1a1a1;
}
.description_about-course_card {
  font-size: 12px;
  /* display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; */
  color: #6c6c6c;
}
.length_courses {
  margin: 0;
  font-size: 25px;
  color: #eee;
}
span.delete_course {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
}
span.delete_course img {
  width: 30px;
  height: 30px;
  object-fit: cover;
  object-position: center;
}
button.btn.btn-danger.custome_instractors_styles {
  background: #f44336 !important;
  padding: 4px 31px !important;
}
</style>
