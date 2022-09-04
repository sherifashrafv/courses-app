<template>
  <section
    class="home_vedio d-flex flex-column justify-content-center align-items-center"
  >
    <p class="home_vedio_title">Learn Online</p>
    <p class="home_vedios-subtitle">
      The biggest Arabic library of video based courses
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
    <button class="btn-home-vedios">sign up</button>
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
