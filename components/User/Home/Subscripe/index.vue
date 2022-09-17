<template>
  <section class="subscribe">
    <div class="home_subscribe">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-12 col-sm-12">
            <div
              class="subscription-details w-100 d-flex flex-column align-items-lg-start justify-content-lg-end align-items-md-center justify-content-md-center"
            >
              <div>
                <p class="home_subscribe_title">
                  Unlimited access to all <br />
                  Almentor Courses
                </p>
                <p class="home_subscribe_subtitle">Subscribe Now!</p>
                <p class="home__subscribe-text">
                  Save more, and get access to our huge library
                </p>
              </div>
              <div
                class="link_subscribe d-flex justify-content-lg-end justify-content-md-center justify-content-sm-center"
              >
                <router-link
                  to="/ss"
                  role="button"
                  tag="div"
                  class="btn btn-danger subscribe_link"
                >
                  subscribe now
                </router-link>
              </div>
            </div>
          </div>
          <!--  -->
          <!--  -->
          <div class="col-lg-6 col-md-12 col-sm-12">
            <div class="card-subscribe d-flex flex-row gap-5">
              <div
                class="card-subscribe_parent d-flex flex-column justify-content-center align-items-center"
              >
                <div class="subscribe_card">
                  <img
                    class="img_subscribe"
                    src="@/assets/Images/Home/subscribe-monthly.svg"
                    alt=""
                  />
                  <p class="per_mounth d-flex flex-column align-items-center">
                    <span
                      class="price_subscribe_parent d-flex flex-row align-items-center justify-content-center gap-2"
                    >
                      <span class="pricing">119.99</span>
                      <span class="currency_subscribe">EGB</span>
                    </span>
                    <span class="per_mounth_text">Per Month</span>
                    <span class="mounth_plan_sbuscribe_text">Monthly Plan</span>
                  </p>
                </div>
              </div>
              <div
                class="card-subscribe_parent d-flex flex-column justify-content-center align-items-center"
              >
                <div class="subscription-card-ribbon">
                  <span class="big_sale_subscription-card"
                    >Best Value: Big Save</span
                  >
                </div>
                <div class="subscribe_card">
                  <img
                    class="img_subscribe"
                    src="@/assets/Images/Home/subscribe-yearly.svg"
                    alt=""
                  />
                  <p class="per_mounth d-flex flex-column align-items-center">
                    <span
                      class="price_subscribe_parent d-flex flex-row align-items-center justify-content-center gap-2"
                    >
                      <span class="pricing">79.99</span>
                      <span class="currency_subscribe">EGB</span>
                    </span>
                    <span class="per_mounth_text">Per Yearly</span>
                    <span class="mounth_plan_sbuscribe_text ng-star-inserted"
                      >Yearly Plan</span
                    >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!--  -->
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "subscribe-page",
};
</script>
<style></style>
