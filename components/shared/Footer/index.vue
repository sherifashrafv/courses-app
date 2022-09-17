<template>
  <footer class="footer_parent">
    <div class="footer_upper">
      <div class="container">
        <div class="row">
          <!--  -->
          <div
            class="d-inline-flex justify-content-center col-md-3 col-sm-12 mb-md-0 mb-4"
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
                  About
                </router-link>
                <router-link
                  role="button"
                  class="links_footer"
                  tag="li"
                  to="/About"
                >
                  Press
                </router-link>
                <router-link
                  role="button"
                  class="links_footer"
                  tag="li"
                  to="/About"
                >
                  Team
                </router-link>
                <router-link
                  role="button"
                  class="links_footer"
                  tag="li"
                  to="/About"
                >
                  Contact
                </router-link>
              </ul>
            </div>
          </div>
          <!--  -->
          <div
            class="d-inline-flex justify-content-center col-md-3 col-sm-12 mb-md-0 mb-4"
          >
            <div class="d-flex flex-column align-items-start">
              <h1 class="footer_explore">Explore</h1>
              <ul class="link_footer_parent">
                <router-link
                  class="links_footer"
                  tag="li"
                  role="button"
                  to="/courses"
                >
                  Browse courses
                </router-link>
                <router-link
                  role="button"
                  class="links_footer"
                  tag="li"
                  to="/About"
                >
                  Popular courses
                </router-link>
                <router-link
                  role="button"
                  class="links_footer"
                  tag="li"
                  to="/About"
                >
                  Subscription Plans
                </router-link>
                <router-link
                  role="button"
                  class="links_footer"
                  tag="li"
                  to="/About"
                >
                  Instructors
                </router-link>
                <router-link
                  role="button"
                  class="links_footer"
                  tag="li"
                  to="/About"
                >
                  Learning Partners
                </router-link>
              </ul>
            </div>
          </div>
          <!--  -->
          <div
            class="d-inline-flex justify-content-center col-md-3 col-sm-12 mb-md-0 mb-4"
          >
            <div class="d-flex flex-column align-items-start">
              <h1 class="footer_explore m-0">Business</h1>
              <router-link style="" class="instructor-text my-3" to="/x"
                >Become an instructor</router-link
              >
              <router-link to="/" tag="span" class="btn_subscribe">
                Train your team
              </router-link>
            </div>
          </div>
          <!--  -->
          <div
            class="d-inline-flex justify-content-center col-md-3 col-sm-12 mb-md-0 mb-4"
          >
            <div class="px-3">
              <div class="d-flex flex-column justify-content-center">
                <div class="card_footer_apps">
                  <p class="our-text-footer">Our new app is coming soon</p>
                  <img
                    class="mb-3"
                    src="@/assets/Images/Home/app-store.svg"
                    alt=""
                  />
                  <img src="@/assets/Images/Home/play-store.svg" alt="" />
                </div>
                <div class="my-2 d-flex flex-row justify-content-end">
                  <div class="d-flex flex-column">
                    <p class="find_footer">Find talks & books on</p>
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
          <!--  -->
          <div class=""></div>
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
