<template>
  <div>
    <nprogress-container></nprogress-container>
    <Nav />
    <Footer />
  </div>
</template>
<script>
import Nav from "@/components/shared/Nav/index.vue";
import Footer from "@/components/shared/Footer/index.vue";
import NprogressContainer from "vue-nprogress/src/NprogressContainer";
export default {
  name: "default-layout",
  components: {
    Nav,
    Footer,
    NprogressContainer,
  },
};
</script>
<style></style>
