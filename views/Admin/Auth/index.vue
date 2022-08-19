<template>
  <div class="admin-login_parent position-relative">
    <div class="admin_login d-flex flex-column align-items-center">
      <div class="img_user">
        <img
          class="img-fluid"
          src="../../../assets/Images/Icons/xx.png"
          alt=""
        />
      </div>
      <h1 class="admin_text-title">Admin Login</h1>
      <form @submit.prevent="login" class="w-100">
        <div class="position-relative mb-2">
          <input
            type="text"
            placeholder="Email"
            class="form-control input_customize"
          />
        </div>
        <div class="position-relative mb-2">
          <span class="icon_form">
            <i class="fa-solid fa-key"></i>
          </span>
          <input
            type="text"
            placeholder="Email"
            class="form-control input_customize"
          />
        </div>
        <button class="submit_admin_form">
          <ve-loader v-if="loader"></ve-loader>
          <span v-else>Login</span>
        </button>
      </form>
      <!-- <transition appear name="fade">
        <div class="erro_r">Fields Must Be Full</div>
      </transition>

      <transition appear name="fade">
        <div class="erro_r">
          <span> Email Is Required </span>
        </div>
      </transition>
      <transition appear name="fade">
        <div class="erro_r">
          <span>Password Is Required </span>
        </div>
      </transition>
      <transition appear name="fade">
        <div class="erro_r">
          <span>Email Or Password Not Valid</span>
        </div>
      </transition> -->
    </div>
  </div>
</template>
<script>
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  name: "SignUp-Admin",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations: {
    email: { email, minLength: minLength(0, 25) },
    password: { required, minLength: minLength(0, 25) },
  },
  computed: {
    Loader() {
      return this.$store.state.admin.authloader;
    },
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch("admin/AddCourse");
      } else {
        console.log("not-validate");
      }
    },
  },
};
</script>
<style>
.admin-login_parent {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.admin_login {
  width: 300px;
  max-width: 100%;
  display: flex;
  justify-content: center;
}
.img_user {
  width: 60px;
  height: 60px;
}
.admin_text-title {
  color: var(--map-numbers-count);
  font-size: 26px;
  margin-top: 15px;
  letter-spacing: 1.5px;
  text-transform: capitalize;
  font-family: "Roboto", "sans-serif" !important;
}
.input_admin {
  width: 100%;
  border: 1px solid #596166;
  border-radius: 5px;
  background: white;
  height: 40px;
  outline: none;
  padding: 15px 35px;
  transition: 0.5s ease-in-out;
}
.input_admin:focus {
  border: 1px solid #ff0000;
}
.submit_admin_form {
  background: #ff0000;
  width: 100%;
  border: none;
  height: 45px;
  border-radius: 7px;
  font-weight: bold;
  color: white;
  font-family: "Abhaya Libre ExtraBold";
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  transition: 0.5s ease-in-out;
}
.submit_admin_form:hover {
  opacity: 0.5;
}
.icon_form {
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  font-size: 13px;
  color: #596166;
}
.icon_form::after {
  content: "";
  position: absolute;
  right: -10px;
  width: 1px;
  height: 100%;
  background: #596166;
}
.erro_r {
  color: white;
  margin-top: 15px;
  background: #c1392b;
  width: 100%;
  height: 40px;
  text-align: center;
  font-weight: bold;
  line-height: 40px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
