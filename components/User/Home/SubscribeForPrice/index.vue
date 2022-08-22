<template>
  <div class="container">
    <div class="subscribe_with_price">
      <div class="subscribe_wrapper">
        <div class="subscribe_description">
          <h2 class="subscribe_title">
            Subscribe
            <span>for a great price</span>
          </h2>
          <p>And get access to all almentor courses whenever you like</p>
          <button class="btn_btn-saveIntersted active">Choose Plan</button>
        </div>
        <div class="d-flex flex-row gap-4">
          <div class="simplified-subscription-card ng-star-inserted_s">
            <h6 class="simplified-subscription-card__title">Monthly Plan</h6>
            <div class="simplified-subscription-card__body">
              <!---->
              <p
                class="simplified-subscription-card__final-price ng-star-inserted"
              >
                119.99
                <span class="simplified-subscription-card__currency">
                  EGP/mo
                </span>
              </p>
              <!---->
              <p class="simplified-subscription-card__billing-period">
                Billed monthly
              </p>
            </div>
          </div>
          <!--  -->
          <div class="simplified-subscription-card ng-star-inserted_s">
            <h6 class="simplified-subscription-card__title yearly">
              Yearly Plan
            </h6>
            <div class="simplified-subscription-card__body">
              <!---->
              <p
                class="simplified-subscription-card__final-price ng-star-inserted"
              >
                119.99
                <span class="simplified-subscription-card__currency">
                  EGP/mo
                </span>
              </p>
              <!---->
              <p class="simplified-subscription-card__billing-period">
                Billed monthly
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Subscribe-price",
};
</script>
<style></style>
