<template>
  <section>
    <!-- <h1>sdsadsads</h1> -->
    <CarouselPage :title="'Course Categories'"></CarouselPage>
    <CarouselTabs></CarouselTabs>
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel
          :list="fakeArray"
          :courses="ArtsDesignListed"
          :title="'Arts & Design'"
        >
        </ve-carousel>
      </div>
    </div>
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel :courses="SoftSkillsListed" :title="'Soft Skills'">
        </ve-carousel>
      </div>
    </div>
    <SubscribeForPrice />
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel
          :courses="MediaPhotographyFilmListed"
          :title="'MediaPhotographyFilm'"
        >
        </ve-carousel>
      </div>
    </div>
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel
          :courses="BusinessManagementListed"
          :title="'BusinessManagement'"
        >
        </ve-carousel>
      </div>
    </div>
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel :courses="SalesMarketingListed" :title="'SalesMarketing'">
        </ve-carousel>
      </div>
    </div>
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel
          :courses="SoftSkillsListed"
          :title="'Enjoy Learning Arts and Crafts'"
        >
        </ve-carousel>
      </div>
    </div>
    <div class="container">
      <div class="row position-relative my-5">
        <ve-carousel :courses="ArtsDesignListed" :title="'Crash Courses'">
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
    };
  },
  components: {
    CarouselPage,
    CarouselTabs,
    SubscribeForPrice,
  },
  methods: {
    // getLanguages
    async getLanguages() {
      await axios.get("/Languages.json").then((res) => {
        let newData = res.data;
        let course = [];
        console.log(res.data);
        for (let key in newData) {
          newData[key].id = key;
          course.push(newData[key]);
        }
        this.Languages = course;
      });
    },
    // ArtsAndDesign
    async ArtsAndDesign() {
      await axios.get("/ArtsDesign.json").then((res) => {
        let newData = res.data;
        let course = [];
        console.log(res.data);
        for (let key in newData) {
          newData[key].id = key;
          course.push(newData[key]);
        }
        this.ArtsDesign = course;
      });
    },
    //GSoftSkills
    async GSoftSkills() {
      await axios.get("/SoftSkills.json").then((res) => {
        let newData = res.data;
        let course = [];
        console.log(res.data);
        for (let key in newData) {
          newData[key].id = key;
          course.push(newData[key]);
        }
        this.SoftSkills = course;
      });
    },
    //  MediaPhotographyFilm
    async GMediaPhotographyFilm() {
      await axios.get("/MediaPhotographyFilm.json").then((res) => {
        let newData = res.data;
        let course = [];
        console.log(res.data);
        for (let key in newData) {
          newData[key].id = key;
          course.push(newData[key]);
        }
        this.MediaPhotographyFilm = course;
      });
    },
    //  BusinessManagement
    async GBusinessManagement() {
      await axios.get("/BusinessManagement.json").then((res) => {
        let newData = res.data;
        let course = [];
        console.log(res.data);
        for (let key in newData) {
          newData[key].id = key;
          course.push(newData[key]);
        }
        this.BusinessManagement = course;
      });
    },
    //  BusinessManagement
    async GSalesMarketing() {
      await axios.get("/SalesMarketing.json").then((res) => {
        let newData = res.data;
        let course = [];
        console.log(res.data);
        for (let key in newData) {
          newData[key].id = key;
          course.push(newData[key]);
        }
        this.SalesMarketing = course;
      });
    },
  },
  mounted() {
    this.getLanguages();
    this.ArtsAndDesign();
    this.GSoftSkills();
    this.GMediaPhotographyFilm();
    this.GBusinessManagement();
    this.GSalesMarketing();
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
