<template>
  <section>
    <div class="container">
      <div
        class="interests_section d-flex flex-lg-row flex-md-column flex-sm-column justify-content-lg-between align-items-md-center justify-content-sm-between"
      >
        <div class="describe_intrsted align-self-md-start d-flex flex-column">
          <h4>What are your interests?</h4>
          <h5>Help us show you courses that you actually like</h5>
          <img
            src="@/assets/Images/instrests/home-user-interests-illustration.png"
            alt=""
          />
        </div>
        <div>
          <div class="skils_interesting-in">
            <div
              v-for="(skill, indx) in skills"
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
          <div class="d-flex flex-row justify-content-end">
            <button
              :class="
                skillUpdated.length > 0
                  ? 'btn_btn-saveIntersted active'
                  : 'btn_btn-saveIntersted'
              "
            >
              Save interests
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
      skills: [
        { title: "Arts", isActive: false },
        { title: "Brand", isActive: false },
        { title: "Career Development", isActive: false },
        { title: "Change Management", isActive: false },
        { title: "Children", isActive: false },
        { title: "Communication", isActive: false },
        { title: "Customer Experience", isActive: false },
        { title: "Education", isActive: false },
        { title: "Entrepreneurship", isActive: false },
        { title: "Healthcare", isActive: false },
        { title: "Human Resources", isActive: false },
        { title: "Interviews", isActive: false },
        { title: "Leadership", isActive: false },
        { title: "Learning", isActive: false },
        { title: "Life Improvement", isActive: false },
        { title: "Nutrition", isActive: false },
        { title: "Presenting", isActive: false },
        { title: "Project Management", isActive: false },
        { title: "Psychology", isActive: false },
        { title: "Social Media", isActive: false },
        { title: "Sports", isActive: false },
        { title: "Strategy", isActive: false },
        { title: "Teaching", isActive: false },
        { title: "Technology", isActive: false },
        { title: "Work Environment", isActive: false },
        { title: "Analytics", isActive: false },
        { title: "Animation", isActive: false },
        { title: "Corporate Culture", isActive: false },
        { title: "Design", isActive: false },
        { title: "English", isActive: false },
        { title: "Self Awareness", isActive: false },
        { title: "Self Development", isActive: false },
        { title: "Productivity", isActive: false },
      ],
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
