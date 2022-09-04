<template>
  <div>
    <header ref="navbar" class="nav_specific_styles">
      <div class="container-fluid">
        <div
          class="w-100 d-flex flex-row align-items-center justify-content-between"
        >
          <!-- logo&subscribe -->
          <div class="logo_subscripe d-flex flex-row align-items-center gap-4">
            <div class="logo_links">
              <h4 class="logo ms-3 m-0 p-0">
                <router-link
                  exact
                  to="/"
                  class="logo_image d-flex flex-row align-items-center text-decoration-none"
                >
                  <img src="@/assets/Images/Icons/xx.png" />
                  almonmon
                </router-link>
              </h4>
            </div>
            <div>
              <ul class="links_mentors p-0 d-flex flex-row align-items-center">
                <li role="button" @click="showModalHandler">
                  <h5 class="m-0">
                    courses
                    <i class="fa-solid fa-chevron-down fs-6 ms-1"></i>
                  </h5>
                </li>
                <li>
                  <router-link
                    role="button"
                    tag="h5"
                    class="m-0 p=0"
                    to="/instractors"
                  >
                    instractors
                  </router-link>
                </li>
                <li class="btn-subscribe">
                  <router-link tag="span" to="/Subscripe">
                    Subscripe
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <!-- end logo&subscribe -->
          <div class="search_langs position-relative">
            <div>
              <ul class="user_menu d-flex gap-3 align-items-center">
                <li class="lang">
                  <p>ع</p>
                </li>
                <li class="actions">
                  <img src="@/assets/Images/Icons/monitorlevels.png" alt="" />
                </li>
                <li v-if="currentUser"></li>
                <li v-else class="login">
                  <router-link to="/login">Login</router-link>
                </li>
                <li
                  @click="showSettings"
                  v-if="currentUser"
                  role="button"
                  class="current_user-image position-relative"
                >
                  <img
                    v-if="getUser.userimage"
                    :src="getUser.userimage"
                    alt=""
                  />
                  <img
                    v-else
                    src="@/assets/Images/Icons/avatar_user.jpg"
                    alt=""
                  />

                  <SettingsMenu
                    :modalHide="hideSettingsMenu"
                    :show="showSettingsMenu"
                    @cancel="hideSettingsMenu"
                  ></SettingsMenu>
                  <!--  -->
                </li>
                <li v-else role="button" class="btn-sign-up">
                  <router-link tag="span" class="" to="/signup">
                    SignUp
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <NavMenu :modalHide="hideModal" :show="ShowModal"></NavMenu>
    </header>
    <router-view />
  </div>
</template>
<script>
import NavMenu from "@/components/User/Home/menuModal/index.vue";
import SettingsMenu from "@/components/shared/Nav/NavMenu/index.vue";
export default {
  name: "nav-bar",
  components: {
    NavMenu,
    SettingsMenu,
  },
  data() {
    return {
      ShowModal: false,
      currentUser: false,
      showSettingsMenu: false,
      user: [],
      menuCourses: false,
      CourseByNanme: [],
    };
  },
  methods: {
    showModalHandler() {
      this.ShowModal = !this.ShowModal;
    },
    hideModal() {
      this.ShowModal = false;
    },
    showSettings() {
      this.showSettingsMenu = !this.showSettingsMenu;
    },
    hideSettingsMenu() {
      this.showSettingsMenu = false;
    },
    navFixed() {
      if (window.scrollY >= 0) {
        this.$refs.navbar.classList.add("fixed-nav-bar");
        let body = document.querySelector("body");
        body.style.marginTop = "9vh";
      } else {
        this.$refs.navbar.classList.remove("fixed-nav-bar");
        let body = document.querySelector("body");
        body.style.marginTop = "0";
      }
    },
  },
  computed: {
    getUser() {
      return this.$store.state.user;
    },
  },
  watch: {
    getUser(newValue) {
      if (newValue) {
        this.user = newValue;
      }
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      this.$store.dispatch("getUserInformation", {
        id: JSON.parse(user).id,
      });
      this.currentUser = true;
    }
    window.addEventListener("scroll", this.navFixed);
  },
};
</script>
