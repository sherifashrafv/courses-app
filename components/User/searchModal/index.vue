<template>
  <Teleport to="#Modal">
    <transition name="fade">
      <div @click.self="modalHide" class="modal-container" v-if="show">
        <div class="modal-content">
          <div
            class="input_search_results d-flex align-items-center position-relative"
          >
            <span>
              <img src="@/assets/Images/Icons/magnifying-glass.png" alt="" />
            </span>
            <input
              v-model="searchTerm"
              type="text"
              placeholder="Search courses, topics, instructors...')"
            />
            <div v-if="searchTerm.length > 0" class="result_term">
              <ul class="m-0">
                <li v-for="(res, indx) in filteredList" :key="indx * 75201">
                  <router-link
                    class="content_result_term d-flex align-items-center my-4"
                    tag="span"
                    @click="modalHide"
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
      </div>
    </transition>
  </Teleport>
</template>
<script>
import axios from "axios";
import Teleport from "vue2-teleport";
export default {
  name: "ve-search",
  data() {
    return {
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
  components: {
    Teleport,
  },
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
  methods: {
    reportWindowSize() {
      if (window.innerWidth) {
        this.modalHide();
      }
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
  },
  mounted() {
    window.addEventListener("resize", () => {
      this.reportWindowSize();
    });
    this.getAll();
  },
  computed: {
    filteredList() {
      return this.all.filter((course) => {
        return course.courseName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      });
    },
  },
  watch: {
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
};
</script>
<style scoped>
.modal-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 1000;
  background-color: rgb(0 0 0 / 82%);
  width: 100%;
  height: 100vh;
}
.modal-container .modal-content {
  width: 100%;
  min-width: unset !important;
  max-width: unset !important;
  top: 75px;
  left: 50%;
  position: fixed;
  z-index: 1500;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
}
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
