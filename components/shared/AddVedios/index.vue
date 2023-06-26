<template>
  <transition name="fade">
    <div @click.self="modalHide" class="modal-container" v-if="show">
      <div class="modal-content">
        <form class="form_validation_login">
          <div class="input-group mb-4">
            <input
              type="text"
              v-model="courseName"
              placeholder="Course Name"
              :class="'form-control input_customize vedios'"
            />
          </div>
          <select
            class="form-select level_course mb-4"
            aria-label="Default select example"
            v-model="courseLevel"
          >
            <option disabled selected>Course-Level</option>
            <option value="Expert">Expert</option>
            <option value="Begginer">Begginer</option>
            <option value="General">General</option>
            <option value="Master">Master</option>
          </select>
          <div class="input_type_file_background-course my-4">
            <input
              @change="uploadImage"
              id="file"
              type="file"
              class="file-upload"
              accept="image/*"
            />
            <label
              for="file"
              class="input_file_uploader-background position-relative"
            >
              Upolad Background For Your Course
              <img
                class="image_add-file"
                src="@/assets/Images/Icons/add-image.png"
                alt=""
              />
            </label>
          </div>
          <div class="description_about_course mb-3">
            <textarea
              v-model="discription"
              class="text_area_course-discrpition"
              placeholder="Description About Course"
              cols="30"
              rows="10"
            ></textarea>
          </div>
          <Button @click.prevent="submit" class="btn btn-danger fw-bold w-100">
            <ve-loader v-if="buttonLoader"></ve-loader>
            <span v-else>Add-Course</span>
          </Button>
          <hr class="line_login_dec" />
        </form>
      </div>
    </div>
  </transition>
</template>
<script>
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "Modal-Vedio",
  props: {
    show: {
      type: Boolean,
    },
    modalHide: {
      type: Function,
    },
    id: {
      type: String,
    },
    courseCategory: {
      type: String,
    },
  },

  data() {
    return {
      courseName: "",
      courseLevel: "Course-Level",
      discription: "",
      backgroundImage: [],
      userInformation: [],
    };
  },
  computed: {
    getInstructor() {
      return this.$store.state.insturctor;
    },
    buttonLoader() {
      return this.$store.state.buttonLoader;
    },
  },
  validations: {
    courseName: { required, minLength: minLength(0, 25) },
    courseLevel: { required },
    discription: { minLength: minLength(0, 1000) },
    backgroundImage: { required },
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store
          .dispatch("addCourse", {
            instructor: this.getInstructor,
            information: {
              courseName: this.courseName,
              courseLevel: this.courseLevel,
              discription: this.discription,
            },
            courseName: this.courseName,
            id: this.id,
            categoryCourse: this.courseCategory,
            backgroundImage: this.backgroundImage,
          })
          .then(() => {
            this.$emit("cancelHandel");
            this.$emit("getCourses", {
              id: this.id,
              courseCategory: this.courseCategory,
            });
          });
      } else {
        console.log("not validation");
      }
    },
    getInstructorInformation({ id }) {
      this.$store.dispatch("getUserInstructor", {
        id: id,
      });
    },
    uploadImage(e) {
      this.backgroundImage = e.target.files[0];
    },
  },
  mounted() {
    this.getInstructorInformation({ id: this.id });
  },
  components: {},
};
</script>
<style scoped>
.modal-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 999999999;
  background-color: rgba(0, 0, 0, 0.65px);
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100vh;
}
.dialog-videoPlayerPreview-container {
  padding: 55.25% 0 0;
}
.fade-enter-active,
.fade-leave-active {
  opacity: 0;
}

.fade-enter,
.fade-leave-to {
  transition: opacity 0.25s ease-in-out;
}
.modal-content {
  max-width: 600px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 600px;
  overflow-y: scroll;
  background: #141717;
  z-index: 9999999999999999;
  padding: 45px 0 0 0;
}
.ddsd {
  background: red;
  width: 70px;
  height: 80px;
}
.close_handelar {
  position: absolute;
  top: 0;
  right: 0;
}
.form-control .input_customize .vedios {
  border: 1px solid black;
}
.level_course {
  height: 49px;
  background: #252a2a !important;
  border: none;
  color: #818383 !important;
  padding: 0 45px !important;
  border-radius: 5px !important;
  background-image: url("@/assets/Images/Admin/Your-Courses/down-arrow.png") !important;
  background-repeat: no-repeat !important;
  background-position: right 0.75rem center !important;
  background-size: 16px 12px !important;
}
.form-select:focus {
  box-shadow: none !important;
}
.input_type_file_background-course {
  height: 40px;
  width: 100%;
  background: #252a2a;
  position: relative;
}
.input_type_file_background-course input[type="file"] {
  width: 100%;
  height: 100%;
  visibility: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
.btn_categories_add {
  height: 49px;
  border: none;
  background: #21e;
  color: white;
  font-weight: 400;
  padding: 11px;
  border-radius: 5px;
}
.text_area_course-discrpition {
  width: 100%;
  background: #252a2a !important;
  border: none;
  appearance: none !important;
  resize: none;
  padding: 16px 31px;
  color: #818383 !important;
  outline: none;
  caret-color: #eb2027;
}
.input_file_uploader-background {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-weight: 200;
  text-transform: capitalize;
  cursor: pointer;
}
img.image_add-file {
  position: absolute;
  top: 54%;
  right: 13%;
  width: 30px;
  height: 30px;
  transform: translateY(-50%);
}
</style>
