<template>
  <div>
    <div v-for="inst in this.information" :key="inst.id">
      <InstarctorDashBoard v-if="inst.accepted" />
      <WithOutAccept v-else />
    </div>
  </div>
</template>
<script>
import WithOutAccept from "@/views/user/InstractorPage/instractorWating/index.vue";
import { mapState } from "vuex";
import axios from "axios";
// import axios from "axios";
import InstarctorDashBoard from "@/views/Admin/Home/index.vue";
export default {
  name: "instractor-wating",
  data() {
    return {
      email: [],
      password: [],
      information: [],
    };
  },
  components: {
    WithOutAccept,
    InstarctorDashBoard,
  },
  computed: {
    ...mapState("admin", ["instractors"]),
  },
  methods: {
    async AcceptTheInstructor() {
      await axios
        .get(`/instactors?email=${this.email}&password=${this.password}`)
        .then((res) => {
          this.information = res.data;
        });
    },
  },
  created() {
    const instructor = localStorage.getItem("instractor-information");
    this.email = JSON.parse(instructor).Email;
    this.password = JSON.parse(instructor).Password;
    this.AcceptTheInstructor();
    // this.$store.dispatch("admin/AcceptTheInstructor", this.instructorAuth);
    //
  },
  mounted() {},
};
</script>
