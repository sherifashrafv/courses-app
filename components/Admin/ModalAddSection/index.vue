<template>
  <Teleport to="#Modal">
    <transition name="fade">
      <div @click.self="modalHide" class="modal-container" v-if="show">
        <div class="modal-content">
          <form class="form_validation_login">
            <div class="input-group mb-4">
              <input
                v-model="sectionName"
                type="text"
                placeholder="Section Name"
                :class="
                  $v.sectionName.$error
                    ? 'form-control input_customize error'
                    : 'form-control input_customize'
                "
              />
            </div>
            <Button
              @click.prevent="submit"
              class="btn btn-danger w-100 mt-2 fw-bold m-auto"
              >Add-Course</Button
            >
            <hr class="line_login_dec" />
          </form>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
<script>
import axios from "axios";
import Teleport from "vue2-teleport";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "modalAddVedios",

  props: {
    show: {
      type: Boolean,
      default: false,
      required: false,
    },
    modalHide: {
      type: Function,
    },
    information: {
      type: Object,
    },
    sectionTitle: {
      type: String,
    },
    userId: {
      type: String,
    },
    categoryName: {
      type: String,
    },
  },
  data() {
    return {
      sectionName: "",
      email: "",
      courseTitle: "",
      id: null,
      courseid: "",
      categoryCourse: "",
    };
  },
  validations: {
    sectionName: { required, minLength: minLength(0, 250) },
  },
  computed: {
    Loader() {
      return this.$store.state.admin.loader;
    },
  },
  watch: {
    "$route.params": {
      handler: function (params) {
        this.courseid = params.courseId;
        this.id = params.id;
        this.categoryCourse = params.category;
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        await axios
          .post(
            `/${this.categoryCourse}-sections/${this.id}/${this.courseid}/.json`,
            {
              title: this.sectionName,
            }
          )
          .then(() => {
            this.$emit("cancelModal");
            this.$emit("cancel");
            this.$emit("getCategories", {
              categoryName: this.categoryCourse,
              id: this.id,
              courseId: this.courseid,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("not validation");
      }
    },
  },

  mounted() {
    // this.getSections();
  },
  components: {
    Teleport,
  },
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
