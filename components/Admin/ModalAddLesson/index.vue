<template>
  <Teleport to="#Modal">
    <transition name="fade">
      <div @click.self="modalHide" class="modal-container" v-if="show">
        <div class="modal-content">
          <form class="form_validation_login">
            <div class="input-group mb-4">
              <input
                v-model="lessonName"
                type="text"
                placeholder="Lesson Title"
                :class="'form-control input_customize vedios'"
              />
            </div>
            <div class="input-group mb-4">
              <input
                v-model="youtubeLink"
                type="text"
                placeholder="Youtube Link"
                :class="'form-control input_customize vedios'"
              />
            </div>
            <Button
              @click.prevent="submit"
              class="btn btn-danger w-100 mt-2 fw-bold m-auto"
              >Add-Lesson</Button
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
// import axios from "axios";
import Teleport from "vue2-teleport";
import { required, minLength, maxLength } from "vuelidate/lib/validators";

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
      lessonName: "",
      youtubeLink: "",
      courseCategory: "",
    };
  },
  validations: {
    lessonName: { required, minLength: minLength(0, 250) },
    youtubeLink: {
      required,
      maxLength: maxLength(2083),
      validateYoutube(Youtube) {
        const regx =
          /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;
        return regx.test(Youtube);
      },
    },
  },
  computed: {
    Loader() {
      return this.$store.state.admin.loader;
    },
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        var str = this.youtubeLink;
        const res = str.split("=");
        const embeddedUrl = "https://www.youtube.com/embed/" + res[1];
        await axios
          .post(
            `/${this.categoryName}-lessons/${this.userId}/${this.sectionTitle}.json`,
            {
              url: embeddedUrl,
              title: this.lessonName,
            }
          )
          .then(() => {
            this.$emit("close");
            this.$emit("getLessons", this.sectionTitle);
          });
        console.log("done");
      } else {
        console.log("notdone");
      }
      // await axios
      //   .post("/lessons/", {
      //     lessonName: this.lessonName,
      //     userId: this.userId,
      //     sectionTitle: this.sectionTitle,
      //     youtubeLink: this.youtubeLink,
      //   })
      //   .then(() => {
      //     this.$emit("cancel");
      //     window.location.reload();
      //   });
    },
  },
  mounted() {
    this.getSections();
    this.courseCategory = this.$route.params.category;
  },
  components: {
    Teleport,
  },
  watch: {
    // sectionTitle: {
    //   immediate: true,
    //   deep: true,
    //   handler(newValue, oldValue) {
    //     console.log(newValue);
    //   },
    // },
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
