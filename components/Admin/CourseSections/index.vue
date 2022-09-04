<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mb-5">
        <div class="d-flex flex-row justify-content-between">
          <h1 class="no_sections_added_yet-title">Content Course</h1>
          <button @click="showModalHandel" class="btn btn-dark add_section">
            Add Section
          </button>
          <ModalAddSection
            :show="showModal"
            :modalHide="hideModalHendelar"
            :information="details"
            @cancel="cancelHandelar"
          ></ModalAddSection>
        </div>
      </div>
      <div v-for="(sec, i) in sections" :key="sec.id" class="col-12">
        <div :data-card="`#${sec.title}`" class="card_section_have_been_add">
          <h1 class="title_section_course m-0">
            Lesson {{ i + 1 }} : {{ sec.title }}
          </h1>
          <span
            @click="delete_element({ id: sec.id, sectionTitle: sec.title })"
            class="delete_section"
          >
            <i class="fa-solid fa-xmark"></i>
          </span>
          <span
            @click="
              activeTabs.length <= 0
                ? openSections({
                    sectionTitle: sec.title,
                    userId: sec.userId,
                  })
                : closeTabs()
            "
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
              <h2 class="add_lesson-title">Lessons:</h2>
              <button
                @click="showModalHandelLessons"
                class="btn btn-dark add_lesson-button"
              >
                Add Lesson
              </button>
              <!-- modal-lessons -->
              <ModalAddLesson
                :modalHide="hideModalHendelarLessons"
                :show="showModalLessons"
                :sectionTitle="sec.title"
                :userId="id"
                :categoryName="categoryName"
                @getLessons="getLessons"
                @close="hideModalHendelarLessons"
              ></ModalAddLesson>
              <!-- end-lessons-modal -->
            </div>
            <div v-if="loader" class="loader_lessons_active">
              <ve-loader></ve-loader>
            </div>
            <div v-else>
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
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import ModalAddSection from "@/components/Admin/ModalAddSection/index.vue";
import ModalAddLesson from "../ModalAddLesson/index.vue";
import axios from "axios";
export default {
  name: "courses-Sections",
  props: {
    details: {
      type: Object,
    },
    sections: {
      type: Object,
    },
  },
  components: {
    ModalAddSection,
    ModalAddLesson,
  },
  data() {
    return {
      showModal: false,
      showModalLessons: false,
      vedioModal: false,
      lessons: [],
      id: "",
      categoryName: "",
      courseid: "",
      lessonId: "",
      activeTabs: "",
      loader: true,
      url: "",
    };
  },
  watch: {
    "$route.params": {
      handler: function (params) {
        this.getCourse({
          categoryName: params.category,
          id: params.id,
          courseTitle: params.title,
        });
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    showModalHandel() {
      this.showModal = !this.showModal;
    },
    hideModalHendelar() {
      this.showModal = false;
    },
    cancelHandelar() {
      this.showModal = false;
      this.$emit("getSections", {
        categoryName: this.categoryName,
        id: this.id,
        courseId: this.courseid,
      });
    },
    showModalHandelLessons() {
      this.showModalLessons = !this.showModalLessons;
    },
    hideModalHendelarLessons() {
      this.showModalLessons = false;
    },
    async openSections({ sectionTitle }) {
      this.activeTabs = sectionTitle;
      this.getLessons(sectionTitle);
    },
    closeTabs() {
      this.activeTabs = "";
    },
    async delete_element({ id, sectionTitle }) {
      console.log(this.id, this.categoryName, this.courseid);
      await axios
        .delete(
          `/${this.categoryName}-sections/${this.id}/${this.courseid}/${id}.json`
        )
        .then(() => {
          this.deleteAllLessons(sectionTitle);
          this.$emit("getSections", {
            categoryName: this.categoryName,
            id: this.id,
            courseId: this.courseid,
          });
        });
    },
    async deleteAllLessons(sectionTitle) {
      await axios.delete(
        `/${this.categoryName}-lessons/${this.id}/${sectionTitle}.json`
      );
    },
    async getLessons(title) {
      await axios
        .get(`/${this.categoryName}-lessons/${this.id}/${title}.json`)
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
    openVedioModal({ url }) {
      this.url = url;
      this.vedioModal = !this.vedioModal;
    },
    hideVedioModal() {
      this.vedioModal = false;
    },
  },
  mounted() {
    const categoryName = this.$route.params.category;
    const myRegx = categoryName.replace(/[/^\s+|\s+$/|&;$%@"<>()+,]/gm, "");
    this.id = this.$route.params.id;
    this.categoryName = myRegx;
    this.courseid = this.$route.params.courseId;
    // this.getLessons();
  },
};
</script>
<style scoped>
.fade-enter-from {
  display: none;
  height: 0;
}
.fade-enter-to {
  display: block;
  height: 100%;
}
.fade-enter-active {
  transition: all 0.5s ease-in;
}
.fade-leave-from {
  display: block;
  height: 100%;
}
.fade-leave-to {
  display: none;
  height: 0%;
}
.fade-leave-active {
  transition: 0.5s ease-out;
}
</style>
