<template>
  <Teleport to="#Modal">
    <transition name="fade">
      <div @click.self="modalHide" class="modal-container" v-if="show">
        <div class="modal-content">
          <form class="form_validation_login">
            <h5 class="text-center mb-3">Apply As Mentor</h5>
            <div class="input-group mb-4">
              <input
                v-model="FirstName"
                type="text"
                placeholder="FirstName"
                :class="'form-control input_customize vedios'"
              />
            </div>
            <div class="input-group mb-4">
              <input
                v-model="LastName"
                type="text"
                placeholder="Last Name"
                :class="'form-control input_customize vedios'"
              />
            </div>
            <div class="input-group mb-4">
              <input
                v-model="Password"
                type="text"
                placeholder="Password"
                :class="'form-control input_customize vedios'"
              />
            </div>
            <div class="input-group mb-4">
              <input
                v-model="MobilePhone"
                type="text"
                placeholder="Mobile Phone"
                :class="'form-control input_customize vedios'"
              />
            </div>
            <div class="input-group mb-4">
              <input
                v-model="Email"
                type="text"
                placeholder="Email"
                :class="'form-control input_customize vedios'"
              />
            </div>
            <div class="input-group mb-4">
              <input
                v-model="linkedInUrl"
                type="text"
                placeholder="Linked In Profile"
                :class="'form-control input_customize vedios'"
              />
            </div>
            <div class="input-group mb-4">
              <input
                v-model="FacebookUrl"
                type="text"
                placeholder="Facebook Page"
                :class="'form-control input_customize vedios'"
              />
            </div>
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
                Upolad Your Cv
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
                placeholder="What are the topics that you would like to introduce on the platform?"
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <Button
              @click.prevent="submit"
              class="btn btn-danger fw-bold w-100"
            >
              <ve-loader v-if="Loader" :style="'margin:auto;'"></ve-loader>
              <span v-else>Apply as Instructor</span>
            </Button>
            <hr class="line_login_dec" />
          </form>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
<script>
// import axios from "axios";
import Teleport from "vue2-teleport";
import { required, minLength, email, numeric } from "vuelidate/lib/validators";
import maxLength from "vuelidate/lib/validators/maxLength";
export default {
  name: "ve-modal",
  props: {
    show: {
      type: Boolean,
      default: false,
      required: false,
    },
    modalHide: {
      type: Function,
    },
  },
  data() {
    return {
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      MobilePhone: "",
      linkedInUrl: "",
      FacebookUrl: "",
      discription: "",
      CvPicture: [],
    };
  },

  validations: {
    FirstName: { required, minLength: minLength(0, 25) },
    LastName: { required, minLength: minLength(0, 25) },
    Email: { email, required, minLength: minLength(0, 25) },
    MobilePhone: { required, numeric, minLength: minLength(0, 11) },
    Password: {
      required,
      strongPassword(password) {
        return (
          /[a-z]/.test(password) && //checks for a-z
          /[0-9]/.test(password) && //checks for 0-9
          /\W|_/.test(password) && //checks for special char
          password.length >= 8
        );
      },
    },
    FacebookUrl: {
      required,
      validateFaceBookUrl(FacebookUrl) {
        const regx =
          /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\\.]*\/)*([\w\-\\.]*)/gi;
        return regx.test(FacebookUrl);
      },
      maxLength: maxLength(2083),
    },
    linkedInUrl: {
      required,
      validateFaceBookUrl(linkedInUrl) {
        return /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\\/%?=~_|!:,.;]*[-A-Z0-9+&@#\\/%=~_|])/gi.test(
          linkedInUrl
        );
      },
      maxLength: maxLength(2083),
    },
    discription: {
      required,
      maxLength: maxLength(2083),
    },
    CvPicture: {
      required,
    },
  },
  computed: {
    get_Categories_listed() {
      return this.$store.state.admin.CategoriesListed;
    },
    Loader() {
      return this.$store.state.admin.loader;
    },
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store
          .dispatch("admin/intractorsApply", {
            informations: {
              FirstName: this.FirstName,
              LastName: this.LastName,
              Email: this.Email,
              Password: this.Password,
              MobilePhone: this.MobilePhone,
              linkedInUrl: this.linkedInUrl,
              FacebookUrl: this.FacebookUrl,
              discription: this.discription,
            },
            CvPicture: this.CvPicture,
            accepted: false,
          })
          .then(() => {
            this.$emit("cancelHandel");
          });
      } else {
        console.log("not validation");
      }
    },
    uploadImage(e) {
      this.CvPicture = e.target.files[0];
    },
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
  right: 29%;
  width: 30px;
  height: 30px;
  transform: translateY(-50%);
}
</style>
