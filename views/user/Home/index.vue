<template>
  <div>
    <WithAuth v-if="auth"></WithAuth>
    <WithOutAuth v-else></WithOutAuth>
  </div>
</template>
<script>
import WithAuth from "@/views/user/Home/WithOutAuth/index.vue";
import WithOutAuth from "@/views/user/Home/WithAuth/index";
export default {
  name: "home-page",
  metaInfo: {
    title: "Home",
    titleTemplate: "%s - Moon-Site",
  },
  data() {
    return {
      auth: false,
    };
  },
  components: { WithOutAuth, WithAuth },
  mounted() {
    let userAuth = localStorage.getItem("user-info");
    if (userAuth) {
      this.auth = true;
    }
  },
};
</script>
