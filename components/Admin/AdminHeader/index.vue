<template>
  <div>
    <div>
      <nav
        class="profile_settings_head d-flex flex-row align-items-center justify-content-between"
      >
        <div class="w-100 d-flex align-items-center justify-content-center">
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
      </nav>
      <header
        :class="navVisibility ? 'admin-header pt-2 ' : 'admin-header_hide pt-2'"
      >
        <nav>
          <ul class="links-admin_settings">
            <li class="home_router-link">
              <router-link class="text-capitalize" :to="{ name: 'home' }">
                <span><i class="fa-solid fa-arrow-left"></i></span>
                <span> Go To Home </span>
              </router-link>
            </li>
            <li :class="{ active: $route.name == 'settings' }">
              <router-link
                class="text-capitalize align-items-center d-flex gap-2 w-100"
                :to="{ name: 'settings' }"
              >
                <span class="bg-user">
                  <img
                    class="img-fluid"
                    src="@/assets/Images/Icons/mechanicalgears.png"
                    alt=""
                  />
                </span>
                Settings
              </router-link>
            </li>

            <li
              @click="SelectedCourses"
              :class="{ active: $route.name == 'courses' }"
              class="listed_categories-links position-relative"
            >
              <div
                class="text-capitalize align-items-center d-flex gap-2 w-100"
                to="category"
              >
                <span v-if="$route.name == 'courses'"> </span>
                <span v-else class="bg-user">
                  <img
                    class="img-fluid"
                    src="@/assets/Images/Icons/online-learning.png"
                    alt=""
                  />
                </span>
                <span v-if="$route.name == 'courses'">
                  {{ $route.params.name }}
                </span>
                <span v-else> Courses </span>
                <i class="fa-solid fa-chevron-down"></i>
              </div>
              <div style="overflow: hidden">
                <ul ref="courseslinks" class="courses_listed_links">
                  <li tag="li" v-for="(list, i) in Categories" :key="i * 2">
                    <router-link
                      :to="{
                        name: 'courses',
                        params: { name: list },
                      }"
                    >
                      {{ list }}
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
            <li
              @click="logout"
              class="logout_box text-white d-block text-capitalize align-items-center gap-2"
            >
              <div class="d-flex align-items-center gap-2">
                <span class="bg-logout">
                  <img
                    class="img-fluid"
                    src="@/assets/Images/Icons/log-out.png"
                    alt=""
                  />
                </span>
                LogOut
              </div>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  </div>
</template>
<script>
export default {
  name: "nav-settings",
  data() {
    return {
      coursesList: [],
      id: null,
      email: "",
      Categories: [
        "Languages",
        "Arts & Design",
        "Soft Skills",
        "Media, Photography & Film",
        "Business Management",
        "Sales & Marketing",
        "Technology, Science & Productivity",
        "Parenting & Relationships",
        "Lifestyle & Health",
        "Entrepreneurship",
        "Mental Health & Wellness",
      ],
    };
  },
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
    SelectedCourses() {
      this.$refs.courseslinks.classList.toggle("active");
    },
    logout() {
      localStorage.removeItem("user-info");
      this.$router.push("/");
      window.location.reload();
    },
  },
  mounted() {
    this.email = this.$route.params.email;
    this.id = this.$route.params.id;
  },
  watch: {
    "$route.params": {
      handler: function (params) {
        this.email = params.email;
        this.id = params.id;
        if (params.id) {
          this.$store.dispatch("getUserInformation", { id: params.id });
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style scoped>
.profile_settings_head {
  background: #1e2121;
}
.home_router-link a:hover {
  background: transparent !important;
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
.user-log_out,
.listed_categories-links {
  text-decoration: none;
  display: block;
  color: white;
  padding: 15px 20px;
}
.links-admin_settings {
  height: 200px;
}
.links-admin_settings li {
  margin-bottom: 10px;
  cursor: pointer;
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
.bg-logout {
  height: 35px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 0 4px;
  background: #cc3737;
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
ul.courses_listed_anmimation {
  position: absolute;
  top: 100%;
}
.courses_listed_links {
  margin-top: 20px !important;
  transition: all 0.5s ease-in-out;
  transform: translateY(-131%);
  opacity: 0;
  height: 0;
}
.courses_listed_links.active {
  background: transparent !important;
  transform: translateY(0);
  opacity: 1;
  height: 165px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.courses_listed_links li {
  transition: all 0.5s ease-in-out;
  padding: 15px;
  word-break: break-word;
}
.courses_listed_links li a {
  background: transparent !important;
  padding: 0 !important;
}
.courses_listed_links.active li:hover,
a.router-link-exact-active.router-link-active {
  background: #252a2a !important;
}
.logout_box {
  padding: 15px 20px;
}
</style>
