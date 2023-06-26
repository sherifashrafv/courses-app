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
                  :to="`/`"
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
                  <h5 class="m-0">courses</h5>
                  <i class="fa-solid fa-chevron-down fs-6 ms-2 mt-1 me-2"></i>
                </li>
                <li>
                  <router-link
                    role="button"
                    tag="h5"
                    class="m-0 p=0"
                    :to="`/Mentors`"
                  >
                    Instractors
                  </router-link>
                </li>
                <li class="btn-subscribe">
                  <router-link tag="span" :to="`/subscribe`">
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
                <li class="serach_comp">
                  <div class="w-100 h-100">
                    <div class="input_serach_async h-100 position-relative">
                      <input
                        v-model="searchTerm"
                        placeholder="Search courses, topics, instructors..."
                        class="w-100 h-100"
                        type="text"
                      />
                      <div v-if="searchTerm.length > 0" class="result_term">
                        <ul class="m-0">
                          <li
                            v-for="(res, indx) in filteredList"
                            :key="indx * 75201"
                          >
                            <router-link
                              class="content_result_term d-flex align-items-center my-4"
                              tag="span"
                              @click="emptyTerm"
                              :to="`/coursePage/${res.categoryCourse}/${res.userid}/${res.id}/${res.courseName}`"
                            >
                              <span>
                                <i class="fa-solid fa-clapperboard me-3"></i>
                              </span>
                              {{ res.courseName }}
                            </router-link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li @click="openSearchTerm" class="mobile_serach_component">
                  <span class="search_typing"> Search... </span>
                  <img
                    src="@/assets/Images/Icons/magnifying-glass.png"
                    alt=""
                  />
                </li>
                <SearchModal
                  :show="searchTrig"
                  :modalHide="hideModalSearch"
                ></SearchModal>
                <li class="space_line">
                  <hr />
                </li>
                <li class="light_dark-mode">
                  <img src="../../../assets/Images/Icons/contrast.png" alt="" />
                </li>
                <li v-if="currentUser"></li>
                <li v-else class="login">
                  <router-link :to="{ name: 'login' }">Login</router-link>
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
                  <router-link tag="span" class="w-100 d-block" :to="`/signup`">
                    SignUp
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
    <router-view></router-view>
  </div>
</template>
<script>
import NavMenu from "@/components/User/Home/menuModal/index.vue";
import SettingsMenu from "@/components/shared/Nav/NavMenu/index.vue";
import DropMenu from "@/components/shared/dropMenu/index.vue";
import SearchModal from "@/components/User/searchModal/index.vue";
import axios from "axios";
const lang = localStorage.getItem("lang") || "en";
export default {
  name: "nav-bar",
  components: {
    NavMenu,
    SettingsMenu,
    DropMenu,
    SearchModal,
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
      searchTrig: false,
      all: [],
      searchTerm: "",
      Languages: [],
      coursesOjc: [],
      //
      ArtsDesign: [],
      ///
      SoftSkills: [],
      //
      MediaPhotographyFilm: [],
      //
      BusinessManagement: [],
      //
      SalesMarketing: [],
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
      this.dropMenu = !this.dropMenu;
    },
    hideMenuHandelar() {
      this.dropMenu = false;
      const body = document.getElementsByTagName("body")[0];
      body.classList.remove("overflow-hidden");
    },
    openSearchTerm() {
      this.searchTrig = true;
    },
    hideModalSearch() {
      this.searchTrig = false;
    },
    async getAll() {
      axios
        .all([
          axios.get(`/Languages.json`),
          axios.get(`/ArtsDesign.json`),
          axios.get(`/SoftSkills.json`),
          axios.get(`/BusinessManagement.json`),
          axios.get(`/SalesMarketing.json`),
          axios.get("/MediaPhotographyFilm.json"),
        ])
        .then(
          axios.spread(
            (
              Languages,
              ArtsDesign,
              SoftSkills,
              BusinessManagement,
              SalesMarkitng,
              MediaPhotographyFilm
            ) => {
              // lang
              let lang = Languages.data;
              let course = [];
              for (let key in lang) {
                lang[key].id = key;
                course.push(lang[key]);
              }
              this.Languages = course;
              //
              let arts = ArtsDesign.data;
              let courseArtsDesign = [];
              for (let key in arts) {
                arts[key].id = key;
                courseArtsDesign.push(arts[key]);
              }
              this.ArtsDesign = courseArtsDesign;
              // end-ArtsDesign
              // //////////
              let soft = SoftSkills.data;
              let courseSoftSkills = [];
              for (let key in soft) {
                soft[key].id = key;
                courseSoftSkills.push(soft[key]);
              }
              this.SoftSkills = courseSoftSkills;
              // ////////
              // start Business
              let Business = BusinessManagement.data;
              let courseBusinessManagement = [];
              for (let key in Business) {
                Business[key].id = key;
                courseBusinessManagement.push(Business[key]);
              }
              this.BusinessManagement = courseBusinessManagement;
              // SalesMarketing
              let sales = SalesMarkitng.data;
              let courseSalesMarkitng = [];
              for (let key in sales) {
                sales[key].id = key;
                courseSalesMarkitng.push(sales[key]);
              }
              this.SalesMarketing = courseSalesMarkitng;
              // MediaPhotographyFilm
              let media = MediaPhotographyFilm.data;
              let courseMedia = [];
              for (let key in media) {
                media[key].id = key;
                courseMedia.push(media[key]);
              }
              this.MediaPhotographyFilm = courseMedia;
            }
          )
        )
        .finally(() => {
          this.loader = false;
        })
        .catch((error) => console.log(error));
    },
    emptyTerm() {
      this.searchTerm = "";
    },
    lightMode() {
      document.body.classList.toggle("light");
      const theme = document.body.className;
      if (theme === "light") {
        localStorage.setItem("theme", "light");
        require("../../../../public/css/lightTheme.css");
      } else if (theme === "") {
        require("../../../../public/css/main.css");
        localStorage.setItem("theme", "dark");
      }
    },
  },
  computed: {
    getUser() {
      return this.$store.state.user;
    },
    filteredList() {
      return this.all.filter((course) => {
        return course.courseName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      });
    },
  },
  watch: {
    getUser(newValue) {
      if (newValue) {
        this.user = newValue;
      }
    },
    // Languages
    async Languages(newgetcourses) {
      if (newgetcourses) {
        newgetcourses.forEach((ele) => {
          axios.get(`/Languages/${ele.id}.json`).then((res) => {
            let newData = res.data;
            let course = [];
            for (let key in newData) {
              newData[key].id = key;
              course.push(newData[key]);
            }
            this.all.push(...course);
          });
        });
      }
    },
    coursesListed(neObj) {
      if (neObj) {
        this.coursesOjc = neObj;
      }
    },
    // ArtsDesign
    async ArtsDesign(newgetcourses) {
      if (newgetcourses) {
        newgetcourses.forEach((ele) => {
          axios.get(`/ArtsDesign/${ele.id}.json`).then((res) => {
            let newData = res.data;
            let course = [];
            for (let key in newData) {
              newData[key].id = key;
              course.push(newData[key]);
            }
            this.all.push(...course);
          });
        });
      }
    },
    //GSoftSkills
    async SoftSkills(newgetcourses) {
      if (newgetcourses) {
        newgetcourses.forEach((ele) => {
          axios.get(`/SoftSkills/${ele.id}.json`).then((res) => {
            let newData = res.data;
            let course = [];
            for (let key in newData) {
              newData[key].id = key;
              course.push(newData[key]);
            }
            this.all.push(...course);
          });
        });
      }
    },
    //MediaPhotographyFilm
    async MediaPhotographyFilm(newgetcourses) {
      if (newgetcourses) {
        newgetcourses.forEach((ele) => {
          axios.get(`/MediaPhotographyFilm/${ele.id}.json`).then((res) => {
            let newData = res.data;
            let course = [];
            for (let key in newData) {
              newData[key].id = key;
              course.push(newData[key]);
            }
            this.all.push(...course);
          });
        });
      }
    },
    //BusinessManagement
    async BusinessManagement(newgetcourses) {
      if (newgetcourses) {
        newgetcourses.forEach((ele) => {
          axios.get(`/BusinessManagement/${ele.id}.json`).then((res) => {
            let newData = res.data;
            let course = [];
            for (let key in newData) {
              newData[key].id = key;
              course.push(newData[key]);
            }
            this.all.push(...course);
          });
        });
      }
    },
    //SalesMarketing
    async SalesMarketing(newgetcourses) {
      if (newgetcourses) {
        newgetcourses.forEach((ele) => {
          axios.get(`/SalesMarketing/${ele.id}.json`).then((res) => {
            let newData = res.data;
            let course = [];
            for (let key in newData) {
              newData[key].id = key;
              course.push(newData[key]);
            }
            this.all.push(...course);
          });
        });
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
    this.getAll();
  },
  destroyed() {
    window.removeEventListener("scroll", this.navFixed);
  },
};
</script>
<style scoped>
.input_search_results span img {
  width: 16px;
  height: 16px;
  object-fit: contain;
  object-position: center;
  margin-right: 0.8rem;
}
.input_search_results {
  background: #0c0e0e;
  padding: 14px;
  width: 265px;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between;
  height: 49px;
}
.input_search_results input {
  background: #0c0e0e;
  border: none;
  margin: 0;
  padding: 0;
  height: 28px;
  outline: none;
  caret-color: #f33728;
  color: #ddd;
}
.light_dark-mode {
  width: 40px;
  height: 40px;
  margin: 0;
  position: relative;
  text-align: center;
  border-radius: 50%;
  background: #3b4242;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  cursor: pointer;
}
.light_dark-mode img {
  width: 25px;
  height: 25px;
  object-fit: cover;
  object-position: center;
}
.result_term {
  position: absolute;
  background: #0c0e0e;
  top: 100%;
  height: 299px;
  width: 100%;
  left: 0;
  border-radius: 0 0px 12px 12px;
  overflow-y: scroll;
  overflow-x: none;
}
.content_result_term {
  padding: 15px;
  cursor: pointer;
}
.content_result_term:hover {
  background: #3b4242;
}
</style>
