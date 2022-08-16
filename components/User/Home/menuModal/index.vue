<template>
  <transition name="fade">
    <div @click.self="modalHide" class="modal-container" v-if="show">
      <div class="modal-content">
        <div
          class="categories_get_random d-flex flex-row justify-content-between"
        >
          <div class="categories_nav_list m-0">
            <div class="head_title_categories p-4">
              <h4>Categories</h4>
            </div>
            <ul class="main_menu_categories d-flex flex-column w-100">
              <li class="">
                <div
                  class="w-100 p-3 d-flex flex-row justify-content-between align-items-center"
                >
                  <span class="tab_text_categories">Languages</span>
                  <span class="arrow_category_list"
                    ><i class="fa-solid fa-chevron-right"></i
                  ></span>
                </div>
              </li>
              <li class="">
                <div
                  class="w-100 p-3 d-flex flex-row justify-content-between align-items-center"
                >
                  <span class="tab_text_categories">Arts & Design</span>
                  <span class="arrow_category_list"
                    ><i class="fa-solid fa-chevron-right"></i
                  ></span>
                </div>
              </li>
              <li class="">
                <div
                  class="w-100 p-3 d-flex flex-row justify-content-between align-items-center"
                >
                  <span class="tab_text_categories">Soft Skills</span>
                  <span class="arrow_category_list"
                    ><i class="fa-solid fa-chevron-right"></i
                  ></span>
                </div>
              </li>
              <li class="">
                <div
                  class="w-100 p-3 d-flex flex-row justify-content-between align-items-center"
                >
                  <span class="tab_text_categories"
                    >Media, Photography & Film</span
                  >
                  <span class="arrow_category_list"
                    ><i class="fa-solid fa-chevron-right"></i
                  ></span>
                </div>
              </li>
              <li class="">
                <div
                  class="w-100 p-3 d-flex flex-row justify-content-between align-items-center"
                >
                  <span class="tab_text_categories">Business Management</span>
                  <span class="arrow_category_list"
                    ><i class="fa-solid fa-chevron-right"></i
                  ></span>
                </div>
              </li>
              <li class="">
                <div
                  class="w-100 p-3 d-flex flex-row justify-content-between align-items-center"
                >
                  <span class="tab_text_categories">Sales & Marketing</span>
                  <span class="arrow_category_list"
                    ><i class="fa-solid fa-chevron-right"></i
                  ></span>
                </div>
              </li>
              <li class="">
                <div
                  class="w-100 p-3 d-flex flex-row justify-content-between align-items-center"
                >
                  <span class="tab_text_categories"
                    >Technology, Science & Productivity</span
                  >
                  <span class="arrow_category_list"
                    ><i class="fa-solid fa-chevron-right"></i
                  ></span>
                </div>
              </li>
              <li class="">
                <div
                  class="w-100 p-3 d-flex flex-row justify-content-between align-items-center"
                >
                  <span class="tab_text_categories"
                    >Parenting & Relationships</span
                  >
                  <span class="arrow_category_list"
                    ><i class="fa-solid fa-chevron-right"></i
                  ></span>
                </div>
              </li>
              <li class="">
                <div
                  class="w-100 p-3 d-flex flex-row justify-content-between align-items-center"
                >
                  <span class="tab_text_categories">Kids Development</span>
                  <span class="arrow_category_list"
                    ><i class="fa-solid fa-chevron-right"></i
                  ></span>
                </div>
              </li>
              <li class="">
                <div
                  class="w-100 p-3 d-flex flex-row justify-content-between align-items-center"
                >
                  <span class="tab_text_categories">Lifestyle & Health</span>
                  <span class="arrow_category_list"
                    ><i class="fa-solid fa-chevron-right"></i
                  ></span>
                </div>
              </li>
              <li class="">
                <div
                  class="w-100 p-3 d-flex flex-row justify-content-between align-items-center"
                >
                  <span class="tab_text_categories">Entrepreneurship</span>
                  <span class="arrow_category_list"
                    ><i class="fa-solid fa-chevron-right"></i
                  ></span>
                </div>
              </li>
              <li class="">
                <div
                  class="w-100 p-3 d-flex flex-row justify-content-between align-items-center"
                >
                  <span class="tab_text_categories"
                    >Mental Health & Wellness</span
                  >
                  <span class="arrow_category_list"
                    ><i class="fa-solid fa-chevron-right"></i
                  ></span>
                </div>
              </li>
              <li class="">
                <div
                  class="w-100 p-3 d-flex flex-row justify-content-between align-items-center"
                >
                  <span class="tab_text_categories">Languages</span>
                  <span class="arrow_category_list"
                    ><i class="fa-solid fa-chevron-right"></i
                  ></span>
                </div>
              </li>
            </ul>
            <div
              class="button_browse_courses_categories d-flex align-items-center justify-content-between"
            >
              <span class="m-auto"> Browse Courses </span>
              <span>
                <i class="fa-solid fa-arrow-right-long"></i>
              </span>
            </div>
          </div>
          <div class="data_fetched d-flex flex-column">
            <router-link
              to=""
              class="listed-course d-flex flex-row align-items-center mb-5"
            >
              <div class="course_image">
                <img src="@/assets/Images/Home/download.png" alt="" />
              </div>
              <div class="content_of_course">
                <p class="title_course">IELTS Exam Preparation</p>
                <p class="author_instractor">Mohamed Arafa</p>
              </div>
            </router-link>
            <router-link
              to=""
              class="listed-course d-flex flex-row align-items-center mb-5"
            >
              <div class="course_image">
                <img src="@/assets/Images/Home/download.png" alt="" />
              </div>
              <div class="content_of_course">
                <p class="title_course">IELTS Exam Preparation</p>
                <p class="author_instractor">Mohamed Arafa</p>
              </div>
            </router-link>
            <router-link
              to=""
              class="listed-course d-flex flex-row align-items-center mb-5"
            >
              <div class="course_image">
                <img src="@/assets/Images/Home/download.png" alt="" />
              </div>
              <div class="content_of_course">
                <p class="title_course">IELTS Exam Preparation</p>
                <p class="author_instractor">Mohamed Arafa</p>
              </div>
            </router-link>
            <router-link
              to=""
              class="listed-course d-flex flex-row align-items-center mb-5"
            >
              <div class="course_image">
                <img src="@/assets/Images/Home/download.png" alt="" />
              </div>
              <div class="content_of_course">
                <p class="title_course">IELTS Exam Preparation</p>
                <p class="author_instractor">Mohamed Arafa</p>
              </div>
            </router-link>
            <router-link to="1322" class="view_all_courses"
              >View All</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "ve-modal",
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
};
</script>
<style scoped>
.modal-container {
  position: absolute;
  left: 0;
  top: 100%;
  right: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
}
.modal-container .modal-content {
  width: 912px;
  min-width: unset !important;
  max-width: unset !important;
  top: 66px;
  left: 211.875px;
  position: fixed;
  height: fit-content;
  z-index: 1500;
  max-height: 650px;
  min-height: 650px;
}
.modal-container .modal-content::before {
  content: "";
  position: absolute;
  top: -7%;
  left: 25px;
  border-width: 23px;
  border-color: transparent transparent #1b1f1f transparent;
  border-style: dashed dashed dashed dashed;
  z-index: 1;
}
.fade-enter-active,
.fade-leave-active {
  opacity: 0;
}

.fade-enter,
.fade-leave-to {
  transition: opacity 0.25s ease-in-out;
}
.categories_get_random div {
  width: calc(100% / 2);
}
.arrow_category_list {
  font-size: 12px;
  color: #3b4242;
  font-weight: bold;
}
.data_fetched {
  background: #252a2a;
}
.main_menu_categories {
  max-height: 485px;
  overflow-y: auto;
}
.main_menu_categories::-webkit-scrollbar {
  display: none;
}
.main_menu_categories li {
  cursor: pointer;
  color: var(--map-numbers-count);
}
.main_menu_categories li:hover {
  background: #3b4242;
}
.tab_text_categories {
  font-size: 19px;
  font-weight: 400;
  font-family: "Roboto", "sans-serif";
}
.head_title_categories {
  padding: 0px 0px 25px 0px;
  font-size: 20px;
  font-weight: 500;
  color: #a1a1a1;
}
.button_browse_courses_categories {
  margin-top: 10px;
  background: #eb2027;
  padding: 8px 14px;
  color: #eee;
  text-align: center;
  border-radius: 4px;
  margin-left: 15px;
  cursor: pointer;
}
.data_fetched {
  padding: 30px;
}
/* .course_image {
  margin-right: 36px;
} */
.course_image img {
  width: 150px;
  height: 90px;
  object-fit: cover;
  border-radius: 10px;
}
.author_instractor {
  color: #707070;
  line-height: 1;
  font-size: 14px;
  margin: 8px 0 0;
}
.title_course {
  color: var(--map-numbers-count);
  line-height: 1.25;
  font-size: 17px;
}
.listed-course {
  text-decoration: none;
}
.view_all_courses {
  color: #0a8db1 !important;
  margin: auto;
  text-decoration: none;
  font-weight: 600;
}
.view_all_courses:hover {
  text-decoration: underline;
}
.categories_nav_list {
  background: #1b1f1f;
}
</style>
