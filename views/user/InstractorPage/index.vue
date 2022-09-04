<template>
  <div>
    <div>
      <WithOutAccept />
    </div>
  </div>
</template>
<script>
import WithOutAccept from "@/views/user/InstractorPage/instractorWating/index.vue";
import { mapState } from "vuex";
// import axios from "axios";
// import axios from "axios";
// import InstarctorDashBoard from "@/views/Admin/Home/index.vue";
export default {
  name: "instractor-wating",
  data() {
    return {
      email: "",
      id: null,
      information: [],
      accepted: null,
    };
  },
  components: {
    WithOutAccept,
    // InstarctorDashBoard,
  },
  computed: {
    ...mapState("admin", ["instractors"]),
  },
  methods: {
    // async AcceptTheInstructor() {
    //   await axios
    //     .get(`/instactors?email=${this.email}&id=${this.id}`)
    //     .then((res) => {
    //       res.data.forEach((ele) => {
    //         this.accepted = ele.accepted;
    //       });
    //       this.information = res.data;
    //     });
    // },
  },
  created() {
    // const instructor = localStorage.getItem("instractor-information");
    // this.email = JSON.parse(instructor).Email;
    // this.id = JSON.parse(instructor).id;
    // this.AcceptTheInstructor();
    //
  },
  watch: {
    // accepted(newAccepted) {
    //   if (newAccepted) {
    //     this.$router.push(`/instractor/user/${this.email}/id/${this.id}`);
    //   }
    // },
  },
};
</script>
