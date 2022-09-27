<template>
  <Teleport to="#Modal">
    <transition name="slide-fade">
      <div @click.self="modalHide" class="modal-container" v-if="show">
        <div class="modal-content">
          <span v-if="currentUser" class="mt-5"> </span>
          <div
            v-else
            class="header-mobile-menu__auth-link d-flex justify-content-center"
          >
            <div>
              <router-link
                @click.native="modalHide"
                to="signup"
                class="svg_icon_links d-flex align-items-center"
                href="#"
              >
                <i
                  style="margin-right: 12px"
                  class="fa-solid fa-user-plus icon_registering"
                ></i>
                {{ $t("registering.signUp") }}
              </router-link>
            </div>
            <div class="header-mobile-menu__vertical-separator"></div>
            <div>
              <router-link
                @click.native="modalHide"
                to="/login"
                class="svg_icon_links d-flex align-items-center"
                href="#"
              >
                <i
                  style="margin-right: 12px"
                  class="fa-solid fa-arrow-right-from-bracket icon_registering"
                ></i>
                {{ $t("registering.Login") }}
              </router-link>
            </div>
          </div>
          <div
            ref="mobileLinks"
            class="header-mobile-menu__upper-navigation-links d-flex flex-column"
          >
            <div
              @click="categoriesHandelar"
              style="margin-bottom: 20px"
              role="button"
              class="header-mobile-menu__upper-navigation-links-link courses_categories d-flex align-items-center"
            >
              {{ $t("navbar.courses") }}
              <span style="margin-left: 24px">
                <i class="fa-solid fa-chevron-right"></i>
              </span>
            </div>
            <router-link
              to="/categories/Languages"
              tag="span"
              role="button"
              @click.native="modalHide"
              class="header-mobile-menu__upper-navigation-links-link"
            >
              {{ $t("footer.Popular courses") }}
            </router-link>
            <hr class="fasla" />
            <router-link
              @click.native="modalHide"
              tag="span"
              role="button"
              to="/Mentors"
              class="header-mobile-menu__upper-navigation-links-link"
            >
              {{ $t("footer.Instructors") }}
            </router-link>
            <hr class="fasla" />
            <router-link
              @click.native="modalHide"
              role="button"
              tag="span"
              :to="`/${$i18n.locale}/subscribe`"
              class="header-mobile-menu__upper-navigation-links-link"
            >
              {{ $t("navbar.Subscribe") }}
            </router-link>
            <hr class="fasla" />
            <div
              v-if="languages === 'en'"
              @click="switchLang('ar')"
              role="button"
              style="font-weight: 500"
              class="header-mobile-menu__upper-navigation-links-link"
            >
              <span style="margin-right: 12px">
                <i class="fa-solid fa-globe"></i>
              </span>
              العربية
            </div>
            <!--  -->
            <div
              role="button"
              v-if="languages === 'ar'"
              @click="switchLang('en')"
              style="font-weight: 500"
              class="header-mobile-menu__upper-navigation-links-link"
            >
              <span style="margin-right: 12px">
                <i class="fa-solid fa-globe"></i>
              </span>
              English
            </div>
            <hr class="fasla" />
          </div>
          <!-- Categories_referrer -->
          <div
            ref="categoriesList"
            class="header-mobile-menu__upper-navigation-links d-flex d-none flex-column"
            style="overflow-x: hidden"
          >
            <div
              @click="backForword"
              style="margin-bottom: 20px"
              role="button"
              class="header-mobile-menu__upper-navigation-links-link courses_categories d-flex align-items-center"
            >
              <span style="margin-right: 20px">
                <i
                  style="transform: rotate(180deg)"
                  class="fa-solid fa-chevron-right"
                ></i>
              </span>
              {{ $t("back.Subscribecomponent") }}
            </div>
            <router-link
              to="/courses"
              tag="button"
              @click.native="modalHide"
              style="
                margin-left: 40px;
                padding: 0;
                background: var(--button-color-vedios);
                font-size: 15px;
                color: white;
                font-weight: bold;
                text-transform: capitalize;
                border-radius: 7px;
                outline: none;
                width: 183px;
                height: 41px;
                line-height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
              "
              class="btn-courses"
            >
              {{ $t("journey.Browse Courses") }}
            </router-link>
            <hr class="fasla" />
            <div
              v-for="(category, indx) in Categories"
              :key="indx * 20"
              style="
                color: #d4d4d4;
                font-size: 16px;
                margin: 0 40px;
                padding: 0;
              "
              class="header-mobile-menu__upper-navigation-links-link"
            >
              <router-link
                tag="span"
                role="button"
                class="d-block"
                @click.native="modalHide"
                :to="{
                  exact,
                  name: 'categories',
                  params: { name: category },
                }"
              >
                {{ category }}
              </router-link>
              <hr class="fasla" />
            </div>
          </div>
          <!--  -->
        </div>
      </div>
    </transition>
  </Teleport>
</template>
<script>
import Teleport from "vue2-teleport";

export default {
  name: "drop-menu",
  data() {
    return {
      currentUser: false,
      Categories: [
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
      languages: "",
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
    categoriesHandelar() {
      this.$refs.mobileLinks.classList.add("d-none");
      this.$refs.categoriesList.classList.remove("d-none");
    },
    backForword() {
      this.$refs.mobileLinks.classList.remove("d-none");
      this.$refs.categoriesList.classList.add("d-none");
    },
    reportWindowSize() {
      console.log(window.innerWidth);
      if (window.innerWidth) {
        this.modalHide();
      }
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
  mounted() {
    const lang = localStorage.getItem("lang") || "en";
    this.languages = lang;
    window.onresize = this.reportWindowSize;
    let user = localStorage.getItem("user-info");
    if (user) {
      this.currentUser = true;
    }
  },
};
</script>
<style scoped>
.modal-container {
  position: fixed;
  left: 0;
  top: 0;
  left: 0;
  z-index: -5;
  background-color: #141717;
  width: 100%;
  height: 100vh;
  z-index: 999;
}
.modal-container .modal-content {
  width: 100%;
  min-width: unset !important;
  max-width: unset !important;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 1500;
  height: 100%;
  padding-top: 8rem;
}
.header-mobile-menu__vertical-separator {
  width: 1px;
  background-color: #2a2a2a;
  color: #2a2a2a;
  margin: 0 40px;
}
.svg_icon_links {
  color: #0a8db1;
  font-size: 20px;
  text-decoration: none;
  text-transform: capitalize;
}
.svg_icon_links i {
  font-size: 17px;
}
.svg_icon_links:hover:not(.icon_registering) {
  text-decoration: underline;
}
.header-mobile-menu__auth-link {
  border-bottom: 1px solid #2a2a2a;
  margin: 0 20px;
  padding-bottom: 20px;
}
.header-mobile-menu__upper-navigation-links-link {
  color: #eee;
  font-size: 18px;
  font-weight: 500;
  margin-left: 19px;
  padding: 8px 0;
}
.fasla {
  margin: 20px 0;
  background-color: #2a2a2a;
  color: #2a2a2a;
  opacity: 1;
}

.header-mobile-menu__upper-navigation-links {
  margin: 28px 20px;
}
.slide-fade-enter-active {
  transition: all 0.1s ease-in;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-100%);
}
</style>
