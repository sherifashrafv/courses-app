<template>
  <div>
    <header ref="navbar" class="nav_specific_styles">
      <div class="container">
        <div
          class="w-100 d-flex flex-row align-items-center justify-content-between"
        >
          <!-- logo&subscribe -->
          <div class="logo_subscripe d-flex flex-row align-items-center gap-4">
            <div class="logo_links d-flex align-items-center">
              <span @click="dropMenuHandelar" class="icon_menu_mobile">
                <img src="@/assets/Images/Icons/menus.png" alt="" />
                <DropMenu
                  :show="dropMenu"
                  :modalHide="hideMenuHandelar"
                ></DropMenu>
              </span>
              <h4 class="logo me-3 m-0 p-0">
                <router-link
                  exact
                  :to="`/${$i18n.locale}/`"
                  class="logo_image d-flex flex-row align-items-center text-decoration-none"
                >
                  <img src="@/assets/Images/Icons/xx.png" />
                  almonmon
                </router-link>
              </h4>
            </div>
            <div class="links_mentors_main-parent">
              <ul class="links_mentors p-0 d-flex flex-row align-items-center">
                <li
                  class="d-flex align-items-center justify-content-between"
                  role="button"
                  @click="showModalHandler"
                >
                  <h5 class="m-0">{{ $t("navbar.courses") }}</h5>
                  <i class="fa-solid fa-chevron-down fs-6 ms-2 mt-1 me-2"></i>
                </li>
                <li>
                  <router-link
                    role="button"
                    tag="h5"
                    class="m-0 p=0"
                    :to="`/${$i18n.locale}/Mentors`"
                  >
                    {{ $t("navbar.Instractors") }}
                  </router-link>
                </li>
                <li class="btn-subscribe">
                  <router-link tag="span" :to="`/${$i18n.locale}/subscribe`">
                    {{ $t("navbar.Subscripe") }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <!-- end logo&subscribe -->
          <div class="search_langs position-relative">
            <div>
              <ul class="user_menu d-flex gap-3 align-items-center">
                <ve-SearchTerm></ve-SearchTerm>
                <li class="mobile_serach_component">
                  <span class="search_typing"> Search... </span>
                  <img
                    src="@/assets/Images/Icons/magnifying-glass.png"
                    alt=""
                  />
                </li>
                <li class="space_line">
                  <hr />
                </li>
                <li
                  role="button"
                  v-if="languages === 'en'"
                  @click="switchLang('ar')"
                  class="lang"
                >
                  <p>ع</p>
                </li>
                <li
                  role="button"
                  v-if="languages === 'ar'"
                  @click="switchLang('en')"
                  class="lang"
                >
                  <p
                    style="
                      margin: 0;
                      text-align: center;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                      padding: 0;
                      font-family: 'Roboto', 'sans-serif' !important;
                      font-size: 24px;
                      line-height: 50px;
                      text-transform: uppercase;
                    "
                  >
                    En
                  </p>
                </li>
                <li class="actions">
                  <img src="@/assets/Images/Icons/monitorlevels.png" alt="" />
                </li>
                <li v-if="currentUser"></li>
                <li v-else class="login">
                  <router-link :to="`/${$i18n.locale}/login`">{{
                    $t("registering.Login")
                  }}</router-link>
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
                  <router-link
                    tag="span"
                    class=""
                    :to="`/${$i18n.locale}/signup`"
                  >
                    {{ $t("registering.signUp") }}
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <NavMenu
        @hide="hideModal"
        :modalHide="hideModal"
        :show="ShowModal"
      ></NavMenu>
    </header>
    <router-view />
  </div>
</template>
<script>
import NavMenu from "@/components/User/Home/menuModal/index.vue";
import SettingsMenu from "@/components/shared/Nav/NavMenu/index.vue";
import DropMenu from "@/components/shared/dropMenu/index.vue";
const lang = localStorage.getItem("lang") || "en";
export default {
  name: "nav-bar",
  components: {
    NavMenu,
    SettingsMenu,
    DropMenu,
  },
  data() {
    return {
      ShowModal: false,
      currentUser: false,
      showSettingsMenu: false,
      user: [],
      menuCourses: false,
      CourseByNanme: [],
      dropMenu: false,
      languages: lang,
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
      if (window.scrollY >= 50) {
        this.$refs.navbar.classList.add("fixed-nav-bar");
        let body = document.querySelector("body");
        body.style.marginTop = "9vh";
      } else {
        this.$refs.navbar.classList.remove("fixed-nav-bar");
        let body = document.querySelector("body");
        body.style.marginTop = "0";
      }
    },
    dropMenuHandelar() {
      const body = document.getElementsByTagName("body")[0];
      body.classList.toggle("overflow-hidden");
      console.log("dooxxx");
      this.dropMenu = !this.dropMenu;
    },
    hideMenuHandelar() {
      this.dropMenu = false;
      const body = document.getElementsByTagName("body")[0];
      body.classList.remove("overflow-hidden");
    },
    switchLang(locale) {
      console.log(locale);
      localStorage.setItem("lang", locale);
      this.$i18n.locale = locale;
      this.$router.push({
        params: { lang: locale },
      });
      window.location.reload();
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
