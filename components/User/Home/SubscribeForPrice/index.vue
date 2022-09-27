<template>
  <div class="container">
    <div class="subscribe_with_price">
      <div class="subscribe_wrapper">
        <div class="subscribe_description">
          <h2 class="subscribe_title">
            {{ $t("subscribeForPrice.Subscribe") }}
            <span>
              {{ $t("subscribeForPrice.for a great price") }}
            </span>
          </h2>
          <p>{{ $t("subscribeForPrice.And get access") }}</p>
          <button class="btn_btn-saveIntersted active">
            {{ $t("subscribeForPrice.Choose Plan") }}
          </button>
        </div>
        <div class="d-flex flex-row gap-4 flex-wrap justify-content-center">
          <div class="simplified-subscription-card ng-star-inserted_s">
            <h6 class="simplified-subscription-card__title">
              {{ $t("subscribeForPrice.Monthly Plan") }}
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
                {{ $t("subscribeForPrice.Billed monthly") }}
              </p>
            </div>
          </div>
          <!--  -->
          <div class="simplified-subscription-card ng-star-inserted_s">
            <h6 class="simplified-subscription-card__title yearly">
              {{ $t("subscribeForPrice.Yearly Plan") }}
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
                {{ $t("subscribeForPrice.Billed monthly") }}
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
