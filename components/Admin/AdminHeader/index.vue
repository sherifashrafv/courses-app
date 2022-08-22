<template>
  <div>
    <div>
      <nav
        class="profile_settings_head d-flex flex-row align-items-center justify-content-center"
      >
        <div class="w-100 d-flex align-items-center justify-content-center">
          <div class="m-auto d-flex align-items-center justify-content-center">
            <div>
              <img
                class="img_logo_admin"
                src="@/assets/Images/Icons/xx.png"
                alt=""
              />
            </div>
            <div>
              <h5 class="logo_text_admin ps-1 m-0 p-0">Instractors</h5>
            </div>
          </div>
          <div class="d-flex flex-row align-items-center">
            <p style="color: #eee" class="p-0 m-0 pe-2">
              {{ this.user.displayName }}
            </p>
            <div class="instractor-image">
              <img :src="this.user.image" alt="" />
            </div>
          </div>
        </div>
        <div>
          <div class="img_user_rounded"></div>
        </div>
      </nav>
      <header
        :class="navVisibility ? 'admin-header pt-2 ' : 'admin-header_hide pt-2'"
      >
        <nav>
          <ul class="links-admin_settings">
            <li
              :class="{ active: $route.name == '' }"
              class="d-flex flex-row align-items-center"
            >
              <router-link
                class="text-capitalize align-items-center d-flex gap-2 w-100"
                to=""
              >
                <span class="bg-user">
                  <img
                    class="img-fluid"
                    src="@/assets/Images/Icons/online-learning.png"
                    alt=""
                  />
                </span>
                Courses
              </router-link>
            </li>
            <!-- <li
              :class="{ active: $route.name == '' }"
              class="d-flex flex-row align-items-center"
            >
              <div
                class="text-capitalize align-items-center d-flex gap-2 w-100"
              >
                <router-link
                  class="text-capitalize align-items-center d-flex gap-2 w-100"
                  to="/dasdsad"
                >
                  <span class="bg-box">
                    <img
                      class="img_fluid"
                      src="@/assets/Images/Icons/paymentmethod.png"
                      alt=""
                    />
                  </span>
                  PayMents
                </router-link>
              </div>
            </li>
            <li
              :class="{ active: $route.name == '' }"
              class="d-flex flex-row align-items-center"
            >
              <div
                class="text-capitalize align-items-center d-flex gap-2 w-100"
              >
                <div
                  @click="logOut"
                  class="user-log_out text-capitalize align-items-center d-flex gap-2 w-100"
                  to="/dasdsad"
                >
                  <span class="box_courses_bg">
                    <img
                      class="img-fluid"
                      src="@/assets/Images/Icons/online-learning.png"
                      alt=""
                    />
                  </span>
                  Your Courses
                </div>
              </div>
            </li>
            <li
              :class="{ active: $route.name == '' }"
              class="d-flex flex-row align-items-center"
            >
              <div
                class="text-capitalize align-items-center d-flex gap-2 w-100"
              >
                <div
                  @click="logOut"
                  class="user-log_out text-capitalize align-items-center d-flex gap-2 w-100"
                  to="/dasdsad"
                >
                  <span class="log_out_box">
                    <img
                      class="w-100 w-100"
                      src="@/assets/Images/Icons/logout_user.png"
                      alt=""
                    />
                  </span>
                  Log Out
                </div>
              </div>
            </li> -->
          </ul>
        </nav>
      </header>
    </div>
  </div>
</template>
<script>
export default {
  name: "nav-settings",
  computed: {
    navVisibility() {
      return this.$store.state.admin.visibilityNav;
    },
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    toggleNav() {
      this.$store.commit("admin/SHOW_NAV", !this.navVisibility);
    },
    logOut() {
      this.$store.dispatch("admin/logOut");
    },
  },
  mounted() {},
};
</script>
<style scoped>
.profile_settings_head {
  background: #1e2121;
}
.admin-header {
}
.profile_settings_head {
  display: block;
  position: fixed;
  left: 0;
  width: 100%;
  height: 80px;
  top: 0;
  color: #eee;
  padding: 0 40px;
  border-bottom: 1px solid #1b1b23;
  z-index: 999;
}
.icons-profile_navigation {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  color: #bcbcbf;
}
ul {
  list-style: none;
  padding: 0 !important;
  margin: 0 !important;
}
.links-admin_settings li a,
.user-log_out {
  text-decoration: none;
  display: block;
  color: white;
  padding: 15px 20px;
}
.links-admin_settings li {
  margin-bottom: 10px;
}
ul li a:hover,
.user-log_out:hover,
.active {
  cursor: pointer;
  background: #000;
}

.admin-header {
  display: block;
  width: 170px;
  position: fixed;
  top: 71px;
  bottom: 0;
  left: 0;
  color: #bcbcbf;
  transition: all 0.5s;
  z-index: 900;
}
.admin-header_hide {
  display: none;
}
nav.show {
  display: block;
}
.bg-user {
  background: #fc76a1;
  height: 35px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 0 4px;
}
.bg-box {
  height: 35px;
  background: #ffcb2d;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}
nav {
  display: block;
}
.log_out_box {
  background: #34465d;
  height: 35px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 0 4px;
}
.box_courses_bg {
  background: #0084ff;
  height: 35px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 0 4px;
}
</style>
