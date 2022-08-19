<template>
  <div>
    <WithOutAuth v-if="auth"></WithOutAuth>
    <WithAuth v-else></WithAuth>
  </div>
</template>
<script>
import WithOutAuth from "@/views/user/Home/WithOutAuth/index.vue";
import WithAuth from "@/views/user/Home/WithAuth/index";
export default {
  name: "home-page",
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
