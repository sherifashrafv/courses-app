<template>
  <Teleport to="#Modal">
    <transition appear>
      <div class="modal-container" v-if="show">
        <div @click.self="modalHide" class="modal-content">
          <ul class="profile_menu">
            <li class="">
              <div
                class="information-user padding_listed_information d-flex flex-row"
              >
                <img
                  class="current_user-image_menu"
                  :src="getUser.image"
                  alt=""
                />
                <div class="ps-3">
                  <h5 class="p-0 m-0">{{ getUser.displayName }}</h5>
                  <p>{{ getUser.email }}</p>
                </div>
              </div>
            </li>
            <router-link
              to="/subscribe"
              class="subscribe_link-button d-flex flex-row align-items-center justify-content-center"
              tag="li"
            >
              <button class="subscribe_button_user">Subscribe</button>
            </router-link>
            <div class="break-line"></div>
            <ul class="profile_list_settings">
              <router-link to="ss">
                <li
                  class="d-flex flex-row align-items-center padding_listed_information"
                >
                  <span class="pe-3"
                    ><img
                      class="img_user_listed-links"
                      src="@/assets/Images/Icons/wishlist.png"
                      alt=""
                  /></span>
                  <span>Saved Courses</span>
                </li>
              </router-link>

              <router-link to="ss">
                <li
                  class="d-flex flex-row align-items-center padding_listed_information"
                >
                  <span class="pe-3"
                    ><img
                      class="img_user_listed-links"
                      src="@/assets/Images/Icons/youtube.png"
                      alt=""
                  /></span>
                  <span>my courses</span>
                </li>
              </router-link>
              <router-link to="ss">
                <li
                  class="d-flex flex-row align-items-center padding_listed_information"
                >
                  <span class="pe-3"
                    ><img
                      class="img_user_listed-links"
                      src="@/assets/Images/Icons/cogwheel.png"
                      alt=""
                  /></span>
                  <span>Account Settings</span>
                </li>
              </router-link>
              <div class="break-line"></div>
              <div class="anchor_logOut">
                <li
                  class="d-flex flex-row align-items-center padding_listed_information"
                >
                  <router-link
                    v-if="instractorsLink"
                    class="text-decoration-underline text-center"
                    to="/instractor-page"
                  >
                    Your DashBoard
                  </router-link>
                  <router-link
                    v-else
                    class="text-decoration-underline"
                    to="/Become-Mentor"
                  >
                    Become an instructor
                  </router-link>
                </li>
              </div>
              <div class="break-line"></div>
              <div class="anchor_logOut">
                <li
                  class="d-flex flex-row align-items-center padding_listed_information"
                >
                  <span class="pe-3"
                    ><img
                      class="img_user_listed-links"
                      src="@/assets/Images/Icons/logout_user.png"
                      alt=""
                  /></span>
                  <span>Logout</span>
                </li>
              </div>
            </ul>
          </ul>
        </div>
      </div>
    </transition>
  </Teleport>
  <!-- <ul class="profile_list_settings">
    <router-link to="ss">
      <li class="d-flex flex-row align-items-center padding_listed_information">
        <span class="pe-3"
          ><img
            class="img_user_listed-links"
            src="@/assets/Images/Icons/wishlist.png"
            alt=""
        /></span>
        <span>Saved Courses</span>
      </li>
    </router-link>

    <router-link to="ss">
      <li class="d-flex flex-row align-items-center padding_listed_information">
        <span class="pe-3"
          ><img
            class="img_user_listed-links"
            src="@/assets/Images/Icons/youtube.png"
            alt=""
        /></span>
        <span>my courses</span>
      </li>
    </router-link>
    <router-link to="ss">
      <li class="d-flex flex-row align-items-center padding_listed_information">
        <span class="pe-3"
          ><img
            class="img_user_listed-links"
            src="@/assets/Images/Icons/cogwheel.png"
            alt=""
        /></span>
        <span>Account Settings</span>
      </li>
    </router-link>
    <div class="break-line"></div>
    <div class="anchor_logOut">
      <li class="d-flex flex-row align-items-center padding_listed_information">
        <span class="pe-3"
          ><img
            class="img_user_listed-links"
            src="@/assets/Images/Icons/logout_user.png"
            alt=""
        /></span>
        <span>Logout</span>
      </li>
    </div>
  </ul> -->
</template>
<script>
import Teleport from "vue2-teleport";
export default {
  props: ["show", "modalHide"],
  name: "nav-menu",
  data() {
    return {
      instractorsLink: false,
    };
  },
  computed: {
    getUser() {
      return this.$store.state.user;
    },
  },
  components: {
    Teleport,
  },
  mounted() {
    const instractors = localStorage.getItem("instractor-information");
    if (instractors) {
      this.instractorsLink = true;
    } else {
      this.instractorsLink = false;
    }
  },
};
</script>
<style scoped>
/* aniimation */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
/*  */
.modal-container {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: 1000;
  width: 100%;
  height: 100vh;
}
.modal-container .modal-content {
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  height: 100vh;
  z-index: 1500;
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
