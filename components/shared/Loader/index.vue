<template>
  <span :style="stylesh" class="spinner-border text-white"></span>
</template>
<script>
export default {
  props: ["stylesh"],
  name: "ve-loader",
};
</script>
<style>
.spinner-border {
  width: 1rem !important;
  height: 1rem !important;
}
</style>
