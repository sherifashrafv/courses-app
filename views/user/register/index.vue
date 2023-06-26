<template>
  <div
    class="login_parent d-flex flex-row align-items-center justify-content-center"
  >
    <Teleport to="#Errros">
      <transition name="fade">
        <div v-if="userExist" class="user_exist_error">
          account exists with different sign up way try to log in
        </div>
      </transition>
    </Teleport>

    <div class="login_container my-5">
      <div class="auth-content">
        <div class="auth-header">
          <h5 class="auth-title text-center">SignUp For Free Email</h5>
          <h6
            style="line-height: 1.5; letter-spacing: 0.2"
            class="account_exist text-center"
          >
            To The Biggest Video Based Arabic Content Library Of Courses
          </h6>
        </div>
        <!--  -->
        <div
          class="sign_up_social_registering d-flex flex-column align-items-center gap-2 justify-content-center"
        >
          <div
            @click="fc_signUp"
            role="button"
            class="d-flex flex-row align-items-center face_book_register_button_signUp gap-3 my-4"
          >
            <span class="f_icon">
              <i class="fa-brands fa-facebook-f"></i>
            </span>
            <span class="m-auto"> Facebook SignUp </span>
          </div>
        </div>
        <!--  -->
        <h5 class="or_text">OR</h5>
        <form class="form_validation_login">
          <router-link
            tag="button"
            to="/signUpWithEmail"
            class="login_submit_form mt-4 d-flex flex-row align-items-center justify-content-center"
          >
            <span
              ><i class="fa-regular fa-envelope text-white fw-bold"></i>
            </span>
            <span class="text-white fw-normal ps-2">
              SignUp With Your Email
            </span>
          </router-link>
          <div class="mt-3 text-center"></div>
          <hr class="line_login_dec" />
          <p class="text-center">
            <span style="font-size: 15px"> Already have an account </span>
            <router-link class="sign_up_link ms-2" to="/login">
              Login
            </router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
// const store = require("@/store/index").default;
import Teleport from "vue2-teleport";
export default {
  name: "register-page",
  components: {
    Teleport,
  },
  methods: {
    fc_signUp() {
      this.$store.dispatch("FacebookSignUp");
    },
    google_signUp() {
      this.$store.dispatch("GoogleSignUp");
    },
  },
  computed: {
    userExist() {
      return this.$store.state.userExist;
    },
  },
  watch: {
    userExist(newvalue) {
      if (newvalue) {
        setTimeout(() => {
          this.$store.commit("USER_EXIST", false);
        }, 2000);
      }
    },
  },
};
</script>
<style>
.login_container {
  max-width: 650px;
  width: 100%;
  background: #141717;
  height: 697px;
  border-radius: 10px;
  box-shadow: 0 0 20px 0 #ffffff1a;
}
.auth-content {
  margin: 70px auto;
  width: 450px;
}
.auth-title {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.67;
  color: #eee;
}
.account_exist {
  color: #a1a1a1;
  font-size: 17px;
}
.face_book_register_button_signUp {
  background: #4267b2;
  border-radius: 4px;
  padding: 10px 21px;
  font-size: 17px;
  font-weight: 500;
  width: 100%;
}
.google_register_button_signUp {
  border-radius: 4px;
  padding: 10px 21px;
  font-size: 17px;
  font-weight: 500;
  background: #4285f4;
  width: 100%;
}
.f_icon {
  font-size: 18px;
}
.google_image {
  width: 28px;
  height: 28px;
  background: white;
}
.google_image img {
  width: 100%;
  height: 100%;
}
.or_text {
  position: relative;
  color: #a1a1a1;
  font-size: 16px;
  margin: 30px auto;
  width: fit-content;
}
.or_text::before {
  content: "";
  position: absolute;
  top: 50%;
  left: -19px;
  transform: translate(-50%, -50%);
  background: #a1a1a1;
  height: 1px;
  width: 20px;
}
.or_text::after {
  content: "";
  position: absolute;
  top: 50%;
  right: -39px;
  transform: translate(-50%, -50%);
  background: #a1a1a1;
  height: 1px;
  width: 20px;
}

.line_login_dec {
  margin: 26px 0;
  width: 100%;
  height: 1px;
  border-top: 3px solid #252a2a;
}
.sign_up_link {
  font-size: 16px;
  color: #0a8db1;
  font-weight: 700;
}
.show_password {
  font-size: 12px;
}
.user_exist_error {
  background: #eb2027;
  padding: 15px;
  border-radius: 5px 0 0 7px;
  text-transform: capitalize;
  font-weight: 300;
  position: fixed;
  top: 20%;
  right: 0;
  transition: 0.5s all ease-in-out;
}
/* rules that target nested elements */
.fade-enter-active,
.fade-leave-active {
  opacity: 0;
}

.fade-enter,
.fade-leave-to {
  transition: opacity 0.25s ease-in-out;
}
</style>
