<template>
  <div>
    <Nav />
    <Footer />
  </div>
</template>
<script>
import Nav from "@/components/shared/Nav/index.vue";
import Footer from "@/components/shared/Footer/index.vue";
export default {
  name: "default-layout",
  components: {
    Nav,
    Footer,
  },
};
</script>
<style></style>
