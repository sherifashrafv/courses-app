<template>
  <section>
    <!-- <h1>sdsadsads</h1> -->
    <CarouselPage :title="$t('Course Categories')"></CarouselPage>
    <CarouselTabs></CarouselTabs>
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel
          :courses="ArtsDesignListed"
          :title="$t('Categories.Arts & Design')"
          :loading="loader"
        >
        </ve-carousel>
      </div>
    </div>
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel
          :courses="SoftSkillsListed"
          :title="$t('Categories.Soft Skills')"
          :loading="loader"
        >
        </ve-carousel>
      </div>
    </div>
    <SubscribeForPrice />
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel
          :courses="MediaPhotographyFilmListed"
          :title="$t('Categories.Media, Photography & Film')"
          :loading="loader"
        >
        </ve-carousel>
      </div>
    </div>
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel
          :courses="BusinessManagementListed"
          :title="$t('Categories.Business Management')"
          :loading="loader"
        >
        </ve-carousel>
      </div>
    </div>
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel
          :courses="SalesMarketingListed"
          :title="$t('Categories.Sales & Marketing')"
          :loading="loader"
        >
        </ve-carousel>
      </div>
    </div>
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel
          :courses="SoftSkillsListed"
          :title="$t('Categories.Enjoy Learning Arts and Crafts')"
          :loading="loader"
        >
        </ve-carousel>
      </div>
    </div>
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel
          :courses="ArtsDesignListed"
          :title="$t('Categories.Crash Courses')"
          :loading="loader"
        >
        </ve-carousel>
      </div>
    </div>
    <SubscribeForPrice class="mb-5" />
  </section>
</template>
<script>
import CarouselPage from "@/components/shared/courses-page-carousel/index.vue";
import CarouselTabs from "@/components/User/Home/HomeCourses/index.vue";

import SubscribeForPrice from "@/components/User/Home/SubscribeForPrice/index.vue";
import axios from "axios";
export default {
  name: "courses-page",
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
    CarouselPage,
    CarouselTabs,
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
            let course = [];
            for (let key in newData) {
              newData[key].id = key;
              course.push(newData[key]);
              console.log(course);
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
