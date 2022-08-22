<template>
  <div>
    <div v-for="inst in this.information" :key="inst.id">
      <InstarctorDashBoard
        v-if="inst.accepted ? goToInstractorPage(inst.Email) : notAccepted()"
      />
      <WithOutAccept />
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
      email: "",
      id: null,
      information: [],
      accepted: null,
      notAcceptedYet: false,
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
        .get(`/instactors?email=${this.email}&id=${this.id}`)
        .then((res) => {
          this.information = res.data;
        });
    },
    goToInstractorPage(name) {
      this.$router.push(`/instractor/${name}/${this.id}`);
    },
    notAccepted() {
      this.notAcceptedYet = true;
    },
  },
  created() {
    const instructor = localStorage.getItem("instractor-information");
    this.email = JSON.parse(instructor).Email;
    this.id = JSON.parse(instructor).id;
    this.AcceptTheInstructor();

    //
  },
  mounted() {
    console.log(this.notAcceptedYet);
  },
};
</script>
