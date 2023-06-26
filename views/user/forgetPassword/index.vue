<template>
  <div class="container">
    <div class="row">
      <div class="box">
        <div class="forget-password-form">
          <h1>Send Message To Your Email</h1>
          <form @submit.prevent class="forget_form d-flex flex-column">
            <label for="Email">Email</label>
            <input
              v-model="email"
              type="text"
              name="email"
              :class="
                $v.email.$error
                  ? 'input_forget_password error '
                  : 'input_forget_password'
              "
            />
            <div class="error_required" v-if="!$v.email.required">
              Field is required.
            </div>
            <div class="error_required" v-if="message.length > 0">
              {{ message }}
            </div>
            <button @click="submit" class="btn_forget_password mt-5">
              <ve-loader v-if="loader" />
              <span v-else>Send email</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { email, required } from "vuelidate/lib/validators";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
export default {
  name: "forget-password",
  data() {
    return {
      email: "",
      message: "",
      loader: false,
    };
  },
  validations: {
    email: { email, required },
  },
  methods: {
    async submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loader = true;
        const auth = getAuth();
        sendPasswordResetEmail(auth, this.email)
          .then(() => {
            this.$swal
              .fire({
                position: "center",
                icon: "success",
                title:
                  "Check Your Email , Message is In Your Email Just Verify And Login ",
                showConfirmButton: true,
              })
              .then((result) => {
                this.loader = false;
                if (result.isConfirmed) {
                  this.$router.push("/login");
                }
              });
          })
          .catch((error) => {
            this.loader = false;
            const errorCode = error.code;
            if (errorCode === "auth/user-not-found") {
              this.message = "Email Not Found";
            }
            if (errorCode === "auth/too-many-requests") {
              this.message = "Check Your Email Please !";
            }
          });
      } else {
        this.loader = false;
        console.log("not-validate");
      }
    },
  },
};
</script>
<style scoped>
.box {
  padding: 100px 25px;
}
.error_required {
  color: #ff5722;
  margin-top: 0.5em;
}
.forget-password-form {
  padding: 50px;
  background: #141717;
  margin: 2rem 0;
  max-width: 600px;
  border-radius: 10px;
  margin: auto;
}
.forget-password-form h1 {
  width: 100%;
  font-size: 22px;
  color: #eee;
  margin-bottom: 50px !important;
}
.forget_form label {
  width: 100%;
  font-size: 19px;
  color: #eee;
  margin-bottom: 14px !important;
}
.input_forget_password {
  height: 45px !important;
  border-radius: 4px;
  background: #252a2a;
  border: none;
  outline: none;
  color: #eee;
  caret-color: #ff5722;
  padding: 0 20px !important;
}
.input_forget_password.error {
  border: 1px solid #ff907e;
}
.forget-password-form_btn {
  margin-top: 20px;
}
.btn_forget_password {
  background-color: #eb2027;
  border-radius: 5px;
  color: #fff;
  /* padding: 8px 23px; */
  height: 45px;
  width: 170px;
  line-height: 45px;
  text-align: center;
  border: none;
}
.input_forget_password .disabled {
  opacity: 0.5;
}
>>> .swal2-success-circular-line-left {
  background: transparent !important;
}
>>> .swal2-icon.swal2-success {
  border-color: #545454 !important;
  color: #545454 !important;
}
>>> .span.swal2-success-line-tip,
>>> .span.swal2-success-line-long {
  background-color: #eb2027 !important;
}
>>>>.swal2-popup.swal2-modal.swal2-icon-success.swal2-show {
  background: #141717 !important;
}
>>> h2#swal2-title {
  color: #eee !important    ;
}
</style>
