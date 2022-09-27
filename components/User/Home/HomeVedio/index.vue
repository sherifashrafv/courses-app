<template>
  <section
    class="home_vedio d-flex flex-column justify-content-center align-items-center"
  >
    <p class="home_vedio_title">{{ $t("home.Learn Online") }}</p>
    <p class="home_vedios-subtitle">
      {{ $t("home.The biggest Arabic library of video based courses") }}
    </p>
    <img
      @click="showModalHandel"
      class="home_vedios_play"
      src="@/assets/Images/Icons/play-button2.png"
      alt=""
    />
    <Vd-Modal
      :url="'https://www.youtube.com/embed/7_JgswKYPnQ?autoplay=1&mute=1'"
      :show="showModal"
      :modalHide="modalHide"
    >
    </Vd-Modal>
    <router-link
      tag="button"
      class="btn-home-vedios"
      :to="`/${$i18n.locale}/signUp`"
    >
      {{ $t("registering.signUp") }}
    </router-link>
  </section>
</template>
<script>
export default {
  name: "home-vedio",
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    showModalHandel() {
      this.showModal = !this.showModal;
    },
    modalHide() {
      this.showModal = false;
    },
  },
};
</script>
