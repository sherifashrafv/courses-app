<template>
  <section>
    <div class="container">
      <div
        class="interests_section d-flex flex-lg-row flex-md-column flex-sm-column justify-content-lg-between align-items-md-center justify-content-sm-between"
      >
        <div class="describe_intrsted align-self-md-start d-flex flex-column">
          <h4>{{ $t("What are your interests") }}</h4>
          <h5>{{ $t("Help us show you courses that you actually like") }}</h5>
          <img
            src="@/assets/Images/instrests/home-user-interests-illustration.png"
            alt=""
          />
        </div>
        <div>
          <div class="skils_interesting-in">
            <div
              v-for="(skill, indx) in this.$t('skills')"
              :key="indx"
              class="'skill_checkboxes_add position-relative"
            >
              <input
                type="checkbox"
                :value="skill.title"
                :id="skill.title"
                class="check_out-box"
                v-model="skillUpdated"
              />
              <label
                :class="
                  skill.isActive
                    ? 'skill_checkboxes_add active position-relative '
                    : 'skill_checkboxes_add position-relative'
                "
                @click="skill.isActive = !skill.isActive"
                :for="skill.title"
                >{{ skill.title }}</label
              >
            </div>
          </div>
          <div class="intersted-button d-flex flex-row">
            <button
              :class="
                skillUpdated.length > 0
                  ? 'btn_btn-saveIntersted active'
                  : 'btn_btn-saveIntersted'
              "
            >
              {{ $t("Save interests") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "interest-page",
  data() {
    return {
      skillUpdated: [],
    };
  },
  methods: {
    changeColor() {
      this.isActive = !this.isActive;
    },
  },
};
</script>
<style></style>
