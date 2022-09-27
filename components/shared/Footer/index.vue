<template>
  <footer class="footer_parent">
    <div class="footer_upper">
      <div class="container">
        <div class="row">
          <!--  -->
          <div
            class="footer_cols d-inline-flex justify-content-center col-lg-3 col-md-6 col-sm-12 mb-md-0 mb-4"
          >
            <div class="d-flex flex-column align-items-start">
              <img
                class="footer_logo_icon"
                src="@/assets/Images/Icons/xx.png"
                alt=""
              />
              <ul class="link_footer_parent">
                <router-link
                  class="links_footer"
                  tag="li"
                  role="button"
                  to="/About"
                >
                  {{ $t("footer.About") }}
                </router-link>
                <router-link
                  role="button"
                  class="links_footer"
                  tag="li"
                  to="/About"
                >
                  {{ $t("footer.Press") }}
                </router-link>
                <router-link
                  role="button"
                  class="links_footer"
                  tag="li"
                  to="/About"
                >
                  {{ $t("footer.Team") }}
                </router-link>
                <router-link
                  role="button"
                  class="links_footer"
                  tag="li"
                  to="/About"
                >
                  {{ $t("footer.Contact") }}
                </router-link>
              </ul>
            </div>
          </div>
          <!--  -->
          <div
            class="footer_cols d-inline-flex justify-content-center col-lg-3 col-md-6 col-sm-12 mb-md-0 mb-4"
          >
            <div class="footer_custome_size d-flex flex-column">
              <h1 class="footer_explore">
                {{ $t("footer.Explore") }}
              </h1>
              <ul class="link_footer_parent">
                <router-link
                  class="links_footer"
                  tag="li"
                  role="button"
                  to="/courses"
                >
                  {{ $t("journey.Browse Courses") }}
                </router-link>
                <router-link
                  role="button"
                  class="links_footer"
                  tag="li"
                  to="/About"
                >
                  {{ $t("footer.Popular courses") }}
                </router-link>
                <router-link
                  role="button"
                  class="links_footer"
                  tag="li"
                  to="/About"
                >
                  {{ $t("footer.Subscription Plans") }}
                </router-link>
                <router-link
                  role="button"
                  class="links_footer"
                  tag="li"
                  to="/About"
                >
                  {{ $t("footer.Instructors") }}
                </router-link>
                <router-link
                  role="button"
                  class="links_footer"
                  tag="li"
                  to="/About"
                >
                  {{ $t("footer.Learning Partners") }}
                </router-link>
              </ul>
            </div>
          </div>
          <!--  -->
          <div
            class="footer_cols d-inline-flex justify-content-center col-lg-3 col-md-6 col-sm-12 mb-md-0 mb-4"
          >
            <div class="footer_custome_size d-flex flex-column">
              <h1 class="footer_explore m-0">
                {{ $t("footer.Business") }}
              </h1>
              <router-link style="" class="instructor-text my-3" to="/x">{{
                $t("footer.Become an instructor")
              }}</router-link>
              <router-link to="/" tag="span" class="btn_subscribe">
                {{ $t("footer.Train your team") }}
              </router-link>
            </div>
          </div>
          <!--  -->
          <div
            class="footer_cols d-inline-flex justify-content-center col-lg-3 col-md-6 col-sm-12 mb-md-0 mb-4"
          >
            <div class="px-3">
              <div class="d-flex flex-column justify-content-center">
                <div class="card_footer_apps">
                  <p class="our-text-footer">
                    {{ $t("footer.Our new app is coming soon") }}
                  </p>
                  <img
                    class="mb-3"
                    src="@/assets/Images/Home/app-store.svg"
                    alt=""
                  />
                  <img src="@/assets/Images/Home/play-store.svg" alt="" />
                </div>
                <div class="footer_social_kalmat my-2 d-flex flex-row">
                  <div class="d-flex flex-column">
                    <p class="find_footer">
                      {{ $t("footer.Find talks & books on") }}
                    </p>
                    <img
                      class="kalemat_pic"
                      src="@/assets/Images/Home/kalimat-logo-white-new.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "footer-component",
};
</script>
<style></style>
