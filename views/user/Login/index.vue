<template>
  <div
    class="login_parent d-flex flex-row align-items-center justify-content-center"
  >
    <div class="login_container my-5">
      <div class="auth-content">
        <div class="auth-header">
          <h5 class="auth-title text-center">Login</h5>
          <h6 class="account_exist text-center">Login With Your Email</h6>
        </div>
        <form @submit.prevent class="form_validation_login">
          <div class="input-group mb-4">
            <input
              v-model="email"
              type="text"
              placeholder="Email"
              :class="
                $v.email.$error
                  ? 'form-control input_customize error'
                  : 'form-control input_customize'
              "
            />
            <span class="input_icon"
              ><i class="fa-regular fa-envelope"></i
            ></span>
          </div>
          <div class="input-group mb-4 position-relative">
            <input
              v-model="password"
              ref="passowrdtrigger"
              placeholder="Password"
              type="password"
              :class="
                $v.password.$error
                  ? 'form-control input_customize error'
                  : 'form-control input_customize'
              "
            />
            <span class="input_icon"><i class="fa-solid fa-lock"></i></span>
            <span ref="icon" @click="passowrdtrigger()" class="show_password">
              <i ref="specifc" class="fa-solid fa-eye"></i>
            </span>
          </div>
          <div class="form-check">
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="defaultCheck1"
                />
                <label
                  id="input_check_lavel"
                  class="form-check-label"
                  for="defaultCheck1"
                >
                  Login With Your Email
                </label>
              </div>
              <div v-if="error" class="error bg-danger text-white p-3">
                {{ errorMessage }}
              </div>
            </div>
          </div>
          <button
            @click="submit"
            class="login_submit_form mt-4 d-flex flex-row align-items-center justify-content-center"
          >
            <ve-loader v-if="Loader"></ve-loader>
            <div v-else>
              <span
                ><i class="fa-regular fa-envelope text-white fw-bold"></i>
              </span>
              <span class="text-white fw-normal ps-2"
                >Login With Your Email</span
              >
            </div>
          </button>
          <div class="mt-3 text-center">
            <router-link :to="`/forgetPassword`" class="link_forget_password"
              >Forgot your password ?</router-link
            >
          </div>
          <hr class="line_login_dec" />
          <p class="text-center">
            <span style="font-size: 15px"> Dont have an account ? </span>
            <router-link class="sign_up_link ms-2" :to="`/signUp`">
              SignUp
            </router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  name: "login-page",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(0, 25) },
  },
  methods: {
    submit() {
      this.$store.commit("LOADER", true);
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log("validation");
        this.$store.dispatch("logIn", {
          email: this.email,
          password: this.password,
        });
      } else {
        console.log("not validation");
        this.$v.errors = true;
        this.$store.commit("LOADER", false);
      }
    },
    loginWithFaceBook() {
      this.$store.dispatch("FacebookSignUp");
    },
    passowrdtrigger() {
      let password = this.$refs.passowrdtrigger;
      let icon = this.$refs.icon;
      let spec = this.$refs.specifc;
      if (password.type === "password") {
        password.type = "text";
        icon.classList.toggle("active");
        spec.classList = "";
        spec.className = "fa-solid fa-eye";
      } else {
        icon.classList.toggle("active");
        password.type = "password";
        spec.classList = "";
        spec.className = "fa-solid fa-eye-slash";
      }
    },
  },
  computed: {
    error() {
      return this.$store.state.ErrorLogin;
    },
    errorMessage() {
      return this.$store.state.ErrorMessage;
    },
    Loader() {
      return this.$store.state.loader;
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
.face_book_register_button {
  background: #4267b2;
  border-radius: 4px;
  padding: 10px 21px;
  font-size: 17px;
  font-weight: 500;
  width: 250px;
}
.google_register_button {
  border-radius: 4px;
  padding: 10px 21px;
  font-size: 17px;
  font-weight: 500;
  background: #4285f4;
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
.form_validation_login {
  width: 450px !important;
  margin: auto;
}
.input_customize {
  background: #252a2a !important;
  border: none !important;
  height: 49px !important;
  color: #818383 !important;
  padding: 0 45px !important;
  box-shadow: none !important;
  border-radius: 5px !important;
  caret-color: #eb2027;
}
.input_customize::placeholder {
  color: #818383 !important;
}
.input_icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 14px;
  font-size: 20px;
  color: #818383;
  z-index: 444;
}
.show_password {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 14px;
  font-size: 20px;
  color: #818383;
  z-index: 444;
  cursor: pointer;
}
.form-check-label {
  font-style: italic !important;
  color: var(--map-numbers-count) !important;
  font-size: 12px !important;
}
.form-check-input {
  width: 16px;
  height: 16px;
}
.form-check-input:checked[type="checkbox"] {
  background-image: url("../../../assets/Images/Icons/correct.png") !important;
  /* background: none !important; */
}
.form-check-input:checked {
  border: none !important;
  box-shadow: none !important;
}
.form-check-input:active {
  filter: brightness(0);
}
.form-check-input:focus {
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
}
#input_check_lavel {
  color: #959696 !important;
  font-size: 12px !important;
}
.login_submit_form {
  margin-top: 15px;
  border: none;
  outline: none;
  width: 100%;
  height: 45px;
  border-radius: 5px;
  padding: 0 30px;
  background: #dc3545;
}
.link_forget_password {
  position: relative;
  margin-top: 15px;
  color: #0a8db1;
  font-size: 18px;
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
</style>
