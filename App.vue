<template>
  <div>
    <component :is="layout"> </component>
  </div>
</template>
<script>
const defaultlayout = "default";
export default {
  computed: {
    layout() {
      return this.$route.meta.layout || defaultlayout + "-layout";
    },
  },
};
</script>
<style></style>
