<template>
  <div>
    <section class="simplified-subscription-page__overlay">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 col-md-12 col-sm-12">
            <h2 class="simplified-subscription-page__plans-section__title">
              Choose Your Subscription Plan
            </h2>
            <p class="simplified-subscription-page__plans-section__subtitle">
              Get the best educational content in the Arab world at the best
              price
            </p>
            <div class="subscribe_plans_wrapper">
              <div class="card_month_plan position-relative">
                <h5 class="simplified-subscription-plan-card__title month">
                  Monthly Plan
                </h5>
                <div class="simplified-subscription-plan-card__body">
                  <p
                    class="simplified-subscription-plan-card__final-price month"
                  >
                    119.99
                    <span
                      class="simplified-subscription-plan-card__currency yearly"
                    >
                      EGP
                    </span>
                  </p>
                  <p class="simplified-subscription-plan-card__description">
                    Per Month
                  </p>
                  <p
                    class="simplified-subscription-plan-card__billing-note month"
                  >
                    Billed monthly
                  </p>
                  <button
                    class="btn btn-outline-light simplified-subscription-plan-card__select-btn"
                  >
                    select
                  </button>
                </div>
              </div>
              <div class="card_year_plan position-relative active">
                <h5 class="simplified-subscription-plan-card__title yearly">
                  YearlyPlan
                </h5>
                <div class="simplified-subscription-plan-card__ribbon">
                  big sale subscription card
                </div>
                <div class="simplified-subscription-plan-card__body">
                  <p
                    class="simplified-subscription-plan-card__final-price yearly"
                  >
                    91.67
                    <span
                      class="simplified-subscription-plan-card__currency yearly"
                    >
                      EGP
                    </span>
                  </p>
                  <p class="simplified-subscription-plan-card__description">
                    Per Month
                  </p>
                  <p
                    class="simplified-subscription-plan-card__billing-note yearly"
                  >
                    Billed yearly
                  </p>
                  <button
                    class="btn btn-outline-light simplified-subscription-plan-card__select-btn"
                  >
                    select
                  </button>
                </div>
              </div>
            </div>
            <div class="simplified-subscription-page__form">
              <p class="simplified-subscription-plan-card__billing-note">
                Do you have a discount code?
              </p>
              <div
                class="simplified_copoon d-flex align-items-center justify-content-between gap-3"
              >
                <input
                  type="text"
                  class="flex-grow-1"
                  placeholder="discountCode"
                />
                <button class="simplified-subscription-page__form_button">
                  apply
                </button>
              </div>
              <button class="btn btn-danger plan-button">next</button>
            </div>
          </div>
          <div class="col-lg-6 col-md-12 col-sm-12">
            <div class="simplified-subscription-page-benefits__container">
              <h2
                class="simplified-subscription-page-benefits__what-you-get_title"
              >
                What you get
              </h2>
              <div
                class="simplified-subscription-page-benefits__what-you-get__item d-flex align-items-center"
              >
                <img src="@/assets/Images/Icons/laptop.png" alt="" />
                <p
                  class="simplified-subscription-page-benefits__what-you-get__item-title"
                >
                  Unlimited access to all courses
                </p>
              </div>
              <div
                class="simplified-subscription-page-benefits__what-you-get__item d-flex align-items-center"
              >
                <img
                  src="@/assets/Images/Icons/percentage-discount.png"
                  alt=""
                />
                <p
                  class="simplified-subscription-page-benefits__what-you-get__item-title"
                >
                  Save on all courses
                </p>
              </div>
              <div
                class="simplified-subscription-page-benefits__what-you-get__item d-flex align-items-center"
              >
                <img src="@/assets/Images/Icons/medal.png" alt="" />
                <p
                  class="simplified-subscription-page-benefits__what-you-get__item-title"
                >
                  Earn a certificate of completion
                </p>
              </div>
              <div
                class="simplified-subscription-page-benefits__what-you-get__item d-flex align-items-center"
              >
                <img src="@/assets/Images/Icons/download.png" alt="" />
                <p
                  class="simplified-subscription-page-benefits__what-you-get__item-title"
                >
                  Download learning content on our app
                </p>
              </div>
              <div
                class="simplified-subscription-page-benefits__payment-methods"
              >
                <h3>Flexible payment methods</h3>
                <div
                  class="simplified-subscription-page-benefits__payment-methods_row"
                >
                  <div
                    class="simplified-subscription-page-benefits__payment-method-item"
                  >
                    <img src="@/assets/Images/Icons/visa-dark.svg" alt="" />
                  </div>
                  <div
                    class="simplified-subscription-page-benefits__payment-method-item"
                  >
                    <img src="@/assets/Images/Icons/fawry.svg" alt="" />
                  </div>
                  <div
                    class="simplified-subscription-page-benefits__payment-method-item"
                  >
                    <img src="@/assets/Images/Icons/mada.svg" alt="" />
                  </div>
                  <div
                    class="simplified-subscription-page-benefits__payment-method-item"
                  >
                    <img src="@/assets/Images/Icons/paypal.svg" alt="" />
                  </div>
                </div>
                <div
                  class="simplified-subscription-page-benefits__payment-methods__note"
                >
                  <p>
                    *Prices are subject to change and may vary based on country,
                    currency conversion rate, bank fees and subscription
                    package.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <!-- tabs-animation -->
          </div>
        </div>
      </div>
    </section>
    <!--  -->
    <section class="subscription-details-page-questions">
      <div class="container">
        <div class="d-flex flex-row align-items-center justify-content-between">
          <div class="subscription-details-page-questions__titles-wrapper">
            <h2 class="subscription-details-page-questions__title">
              Got Questions?
            </h2>
            <p class="subscription-details-page-questions__subtitle">
              See if our FAQs help you know more about our service
            </p>
          </div>
          <div class="img-subscription">
            <img
              src="@/assets/Images/BecomeMentor/subscriptionImg.png"
              alt=""
            />
          </div>
        </div>

        <!-- tabs-animation -->
        <div class="main_tabs-wrapper">
          <div
            @click="tabActive1()"
            role="button"
            class="d-flex flex-row align-items-center justify-content-between"
          >
            <div class="subscription-details-question_title">
              "How do I subscribe?": "How do I subscribe?",
            </div>
            <div>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
          </div>
          <div ref="tab1" class="inner_details_qus">
            <p role="button" @click="tabActive1()">
              Copy your coupon code. Paste your coupon after selecting the plan.
              Verify your coupon by clicking on “Apply” button beside the coupon
              box.
            </p>
          </div>
        </div>
        <div class="main_tabs-wrapper">
          <div
            @click="tabActive2()"
            role="button"
            class="d-flex flex-row align-items-center justify-content-between"
          >
            <div class="subscription-details-question_title">
              How does the plan renewal work?
            </div>
            <div>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
          </div>
          <div ref="tab2" class="inner_details_qus">
            <p role="button" @click="tabActive2()">
              Your plan gets automatically renewed each billing cycle for both
              available plans to guarantee you uninterrupted learning
              experience.
            </p>
          </div>
        </div>
        <div class="main_tabs-wrapper">
          <div
            @click="tabActive3()"
            role="button"
            class="d-flex flex-row align-items-center justify-content-between"
          >
            <div class="subscription-details-question_title">
              How many devices are allowed per account?
            </div>
            <div>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
          </div>
          <div ref="tab3" class="inner_details_qus">
            <p role="button" @click="tabActive3()">
              You can use up to three devices per account. If you try logging
              with a fourth device, you will have to logout from one of the
              linked devices.
            </p>
          </div>
        </div>
        <div class="main_tabs-wrapper">
          <div
            @click="tabActive4()"
            role="button"
            class="d-flex flex-row align-items-center justify-content-between"
          >
            <div class="subscription-details-question_title">
              Can I change or cancel my subscription plan?
            </div>
            <div>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
          </div>
          <div ref="tab4" class="inner_details_qus">
            <p role="button" @click="tabActive4()">
              Yes, you can change or cancel your subscription plan anytime. With
              cancellation, your plan will stay active till the end of your
              billing cycle, and then terminate. The learning progress you made
              during your subscription will be saved, but suspended till the
              next time you re-subscribe.
            </p>
          </div>
        </div>
        <div class="main_tabs-wrapper">
          <div
            @click="tabActive5()"
            role="button"
            class="d-flex flex-row align-items-center justify-content-between"
          >
            <div class="subscription-details-question_title">
              Can I refund my subscription fees after subscribing?
            </div>
            <div>
              <i class="fa-solid fa-chevron-down"></i>
            </div>
          </div>
          <div ref="tab5" class="inner_details_qus">
            <p role="button" @click="tabActive5()">
              Once you have purchased your subscription, you will not be able to
              refund any part of the subscription fees.
            </p>
          </div>
        </div>

        <!-- end -->
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: "subscribe-page",
  metaInfo: {
    title: "Subscribe",
    titleTemplate: "%s - Moon-Site",
  },
  methods: {
    tabActive1() {
      this.$refs.tab1.classList.toggle("active");
    },
    tabActive2() {
      this.$refs.tab2.classList.toggle("active");
    },
    tabActive3() {
      this.$refs.tab3.classList.toggle("active");
    },
    tabActive4() {
      this.$refs.tab4.classList.toggle("active");
    },
    tabActive5() {
      this.$refs.tab5.classList.toggle("active");
    },
  },
};
</script>
<style></style>
