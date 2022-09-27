<template>
  <div>
    <CarouselsWithDescription
      :loading="loader"
      :list="fakeArray"
      :courses="LanguagesListed"
    />
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel
          :loading="loader"
          :list="fakeArray"
          :courses="ArtsDesignListed"
          :title="$t('categoires.ArtsDesign')"
        >
        </ve-carousel>
      </div>
    </div>
    <Interesting />
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel
          :loading="loader"
          :courses="SoftSkillsListed"
          :title="$t('categoires.SoftSkills')"
        >
        </ve-carousel>
      </div>
    </div>
    <SubscribeForPrice />
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel
          :loading="loader"
          :courses="MediaPhotographyFilmListed"
          :title="$t('categoires.MediaPhotographyFilm')"
        >
        </ve-carousel>
      </div>
    </div>
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel
          :loading="loader"
          :courses="BusinessManagementListed"
          :title="$t('categoires.BusinessManagement')"
        >
        </ve-carousel>
      </div>
    </div>
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel
          :loading="loader"
          :courses="SalesMarketingListed"
          :title="$t('categoires.SalesMarketing')"
        >
        </ve-carousel>
      </div>
    </div>
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel
          :loading="loader"
          :courses="SoftSkillsListed"
          :title="$t('categoires.EnjoyLearningArtsandCrafts')"
        >
        </ve-carousel>
      </div>
    </div>
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel
          :loading="loader"
          :courses="ArtsDesignListed"
          :title="$t('categoires.CrashCourses')"
        >
        </ve-carousel>
      </div>
    </div>
    <SubscribeForPrice />
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel
          :loading="loader"
          :courses="SoftSkillsListed"
          :title="$t('categoires.ForYourMentalHealth')"
        >
        </ve-carousel>
      </div>
    </div>
  </div>
</template>
<script>
import CarouselsWithDescription from "@/components/User/Carousels/index.vue";
import Interesting from "@/components/User/Interesting/index.vue";
import SubscribeForPrice from "@/components/User/Home/SubscribeForPrice/index.vue";
import axios from "axios";
export default {
  name: "With-Auth",
  data() {
    return {
      fakeArray: Array(8).fill(""),
      Languages: [],
      LanguagesListed: [],
      coursesOjc: [],
      //
      ArtsDesign: [],
      ArtsDesignListed: [],
      ///
      SoftSkills: [],
      SoftSkillsListed: [],
      //
      MediaPhotographyFilm: [],
      MediaPhotographyFilmListed: [],
      //
      BusinessManagement: [],
      BusinessManagementListed: [],
      //
      SalesMarketing: [],
      SalesMarketingListed: [],
      loader: true,
    };
  },
  components: {
    CarouselsWithDescription,
    Interesting,
    SubscribeForPrice,
  },
  methods: {
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
    this.getAll();
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
              console.log(course);
            }
            this.LanguagesListed.push(...course);
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
              console.log(course);
            }
            this.ArtsDesignListed.push(...course);
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
              console.log(course);
            }
            this.SoftSkillsListed.push(...course);
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
            console.log(res.data);
            let course = [];
            for (let key in newData) {
              newData[key].id = key;
              course.push(newData[key]);
              console.log(newData);
            }
            this.MediaPhotographyFilmListed.push(...course);
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
              console.log(course);
            }
            this.BusinessManagementListed.push(...course);
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
              console.log(course);
            }
            this.SalesMarketingListed.push(...course);
          });
        });
      }
    },
  },
};
</script>
