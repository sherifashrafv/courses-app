<template>
  <div>
    <component :is="layout">
      <slot></slot>
    </component>
  </div>
</template>

<script>
const defaultlayout = "default-layout";
export default {
  computed: {
    layout() {
      return this.$route.meta.layout || defaultlayout;
    },
  },
};
</script>
