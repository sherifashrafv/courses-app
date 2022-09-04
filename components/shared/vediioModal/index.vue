<template>
  <Teleport to="#Modal">
    <transition name="fade">
      <div @click.self="modalHide" class="modal-container" v-if="show">
        <div class="modal-content">
          <div class="position-relative h-100">
            <span class="close_handelar">x</span>
            <div
              class="d-flex h-100 flex-row align-items-center justify-content-center"
            >
              <iframe
                class="iframe_youtube-url"
                width="100%"
                height="100%"
                :src="url"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>
<script>
import Teleport from "vue2-teleport";
export default {
  name: "ve-modal",
  props: {
    show: {
      type: Boolean,
      default: false,
      required: false,
    },
    modalHide: {
      type: Function,
    },
    url: {
      type: String,
    },
  },
  components: {
    Teleport,
  },
};
</script>
<style scoped>
.modal-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 999999999;
  background-color: rgba(0, 0, 0, 0.65px);
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100vh;
}
.dialog-videoPlayerPreview-container {
  padding: 55.25% 0 0;
}
.iframe_youtube-url {
}
/* .modal-container .modal-content {
  width: 912px;
  min-width: unset !important;
  max-width: unset !important;
  top: 66px;
  left: 211.875px;
  position: fixed;
  height: fit-content;
  z-index: 1500;
  max-height: 650px;
  min-height: 650px;
} */
.fade-enter-active,
.fade-leave-active {
  opacity: 0;
}

.fade-enter,
.fade-leave-to {
  transition: opacity 0.25s ease-in-out;
}
.modal-content {
  max-width: 80vw;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 500px;
  background: white;
  z-index: 9999999999999999;
}
.ddsd {
  background: red;
  width: 70px;
  height: 80px;
}
.close_handelar {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
