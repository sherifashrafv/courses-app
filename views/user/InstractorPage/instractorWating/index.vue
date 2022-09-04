<template>
  <section>
    <div class="instractor_wating-for_accept">
      <div class="container">
        <div class="row">
          <div
            class="d-flex flex-column justify-content-between align-items-center"
          >
            <div class="img_instractor_wating">
              <img src="@/assets/Images/Icons/WatingForAggree.png" alt="" />
            </div>
            <div class="instructor_wating-massage">
              <p>
                Follow this page, you will be an instructor within hours, your
                details will be reviewed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "instractor-wating",
  data() {
    return {
      ShowModal: false,
      id: null,
    };
  },
  methods: {
    getInstructorInformation(id) {
      this.$store.dispatch("getUserInstructor", {
        id: id,
      });
    },
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    insturctor() {
      return this.$store.state.insturctor;
    },
  },
  watch: {
    user(newvalue) {
      if (newvalue) {
        this.id = newvalue.id;
        this.getInstructorInformation(newvalue.id);
      }
    },
    insturctor(value) {
      this.accepted = value.accepted;
      this.email = value.Email;
      this.id = value.id;
      if (value.accepted) {
        this.$router.push(`/instractor/user/${value.Email}/id/${value.id}`);
      } else {
        this.$router.push("/instractor");
      }
    },
  },
  mounted() {},
};
</script>
<style></style>
