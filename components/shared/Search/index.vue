<template>
  <span>
    <li class="serach_comp">
      <div class="w-100 h-100">
        <div class="input_serach_async h-100 position-relative">
          <input
            v-model="course"
            placeholder="Search courses, topics, instructors..."
            class="w-100 h-100"
            type="text"
          />
          <div class="results">
            <div
              style="color: #a1a1a1; font-size: 18px"
              class="d-flex align-items-center justify-content-end"
            >
              <!-- <p class="me-2 mb-0">{{ course }}</p>
              <i class="fa-solid fa-magnifying-glass fs-5"></i> -->
            </div>
            <div class="d-flex align-items-center justify-content-center gap-4">
              <div>
                <h6>Categories</h6>
              </div>
              <div>
                <select
                  v-model="courseLevel"
                  class="form-select level_course mb-4"
                  aria-label="Default select example"
                >
                  <option disabled value="Categories" selected>
                    Categories
                  </option>
                  <option
                    v-for="(course, i) in Categories"
                    :key="i * 50"
                    :value="course"
                    :selected="course == 'Categories'"
                  >
                    {{ course }}
                  </option>
                </select>
              </div>
            </div>
            <ul class="res_inbox mt-4">
              <li
                v-for="(query, i) in data"
                :key="i * 200"
                style="color: #a1a1a1"
              >
                {{ query }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </li>
  </span>
</template>
<script>
import { dd } from "@/Firebase/firebase";

export default {
  name: "search-terms",
  data() {
    return {
      options: false,
      options2: false,
      course: "",
      data: [],
      Categories: [
        "Categories",
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
  methods: {
    checkValueChange(newValue) {
      if (newValue === "") {
        console.log("not-done");
      } else {
        console.log("done-", newValue);
      }
    },
    Openoptions() {
      this.options = !this.options;
    },
    getCategoryDataFromFirebase(nwv) {
      if (nwv) {
        dd.collectionGroup("courses")
          .where("title", "==", nwv)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.data = doc.data();
            });
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      }
    },
  },

  watch: {
    course(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.getCategoryDataFromFirebase(newValue);
        }, 300);
      }
      if (newValue === "") {
        this.data = [];
      }
    },
    data(newValue) {
      if (newValue) {
        this.data = newValue;
      }
    },
  },
};
</script>
<style scoped>
.results {
  position: absolute;
  top: 100%;
  left: 0px;
  padding: 15px;
  background: #252a2a;
  border-radius: 3px 4px 5px 5px;
  width: 100%;
  height: 255px;
  z-index: 2;
  overflow: hidden;
  display: none;
}
.level_course {
  height: 32px;
  background: #101212 !important;
  border: none;
  color: #818383 !important;
  padding: 0 18px !important;
  border-radius: 5px !important;
  background-image: url("@/assets/Images/Admin/Your-Courses/down-arrow.png") !important;
  background-repeat: no-repeat !important;
  background-position: right 0.75rem center !important;
  background-size: 16px 12px !important;
  box-shadow: none !important;
  margin-top: 1rem;
}
</style>
