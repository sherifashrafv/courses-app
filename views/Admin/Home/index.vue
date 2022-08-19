<template>
  <div :class="navVisibility ? 'nav-visible' : 'nav-hide'">
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,300&display=swap"
      rel="stylesheet"
    />
    <div :class="navVisibility ? 'nav-visible sc-y' : 'nav-hide sc-y'">
      <AdminHeader />
      <router-view />
    </div>
  </div>
</template>
<script>
import AdminHeader from "@/components/Admin/AdminHeader/index.vue";
export default {
  name: "Admin-Vue",
  components: {
    AdminHeader,
  },
  computed: {
    navVisibility() {
      return this.$store.state.admin.visibilityNav;
    },
  },
  methods: {
    toggleNav() {
      this.$store.commit("admin/SHOW_NAV", !this.navVisibility);
    },
    deleteItem(id) {
      this.$store.dispatch("admin/DeleteItem", id);
    },
  },
  mounted() {
    // let admin = localStorage.getItem("admin");
    // if (!admin) {
    //   this.$router.push("/");
    // }
  },
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
body {
  font-family: "Lato", sans-serif;
}
.sc-y {
  overflow-y: scroll;
}
.nav-visible {
  padding: 90px 15px;
  padding-left: 188px !important;
  transition: padding-left 0.5s;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #000;
  color: #ffff;
}
.nav-hide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #181820;
  padding: 90px 15px;
  transition: padding-left 0.5s;
  color: #ffff;
}
.icon {
  position: fixed;
  top: 0;
  background: #111312;
  left: calc(200px - 7px);
  transition: padding-left 0.5s;
  transform-origin: center;
  color: white;
  font-size: 15px;
  width: 35px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  cursor: pointer;
}
.icon-hide {
  position: absolute;
  top: 0;
  background: #333;
  left: 0;
  transition: padding-left 0.5s;
  color: white;
  font-size: 15px;
  width: 35px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  cursor: pointer;
}
@media screen and (max-width: 600px) and (max-width: 992px) {
  .nav-visible .sc-y,
  .nav-hide .sc-y {
    overflow-y: scroll;
  }
}
@media screen and (max-width: 992px) {
  .nav-visible .sc-y,
  .nav-hide .sc-y {
    overflow-y: scroll;
  }
}
</style>
