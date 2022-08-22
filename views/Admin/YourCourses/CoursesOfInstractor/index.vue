<template>
  <div class="container">
    <div
      class="d-flex flex-row align-items-center justify-content-between my-3"
    >
      <h1 class="length_courses">
        You Have <span> {{ courses.length + " " }}</span
        >Course
      </h1>
      <button
        @click="showModalHandelar"
        class="btn btn-danger custome_instractors_styles"
      >
        Add Course
      </button>
    </div>
    <div class="break-line my-4"></div>
    <ModalVediosAdd
      :userInformation="informationInstractor"
      :show="showModal"
      :modalHide="hideModal"
      @cancelHandel="hideModal"
    ></ModalVediosAdd>
    <div class="row gy-3">
      <!-- v-for="course in courses" :key="course.id" -->
      <div v-for="(course, i) in courses" :key="i * 2" class="col-12">
        <div class="courses_card d-flex flex-row gap-3 position-relative">
          <div class="image_background_course-card">
            <img :src="course.image" alt="" />
          </div>
          <div class="content_about_course_card mt-2">
            <h1 class="title_about_course_card_intractor">
              {{ course.title }}
            </h1>
            <p class="intractor_name_card">
              {{ course.FirstName + " " + course.lastName }}
            </p>
            <p class="description_about-course_card">
              {{ course.discription.substring(0, 350) }}...
            </p>
            <span
              @click="deleteItem(course.id, course.Category)"
              class="delete_course"
            >
              <img src="@/assets/Images/Icons/delete.png" alt="" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ModalVediosAdd from "@/components/Admin/ModalVedios/index.vue";
export default {
  name: "Courses-Listed-From-User",
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
    deleteItem(id, category) {
      this.$store.dispatch("admin/deleteCourse", {
        id: id,
        category: category,
      });
    },
  },
  props: {
    courses: {
      type: Array,
    },
    informationInstractor: {
      type: Object,
    },
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
