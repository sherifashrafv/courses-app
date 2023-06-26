<template>
  <section>
    <div v-if="data === null">
      <div class="main_learn_layout">
        <div
          class="learn_description position-relative d-flex align-items-center"
        >
          <div class="nothing_added_yet">Nothing Addedd Yet</div>
        </div>
        <div
          class="learn_description _img_uploded position-relative d-flex align-items-center"
        >
          <div class="nothing_added_yet">Nothing Addedd Yet</div>
        </div>
        <div
          class="learn_description position-relative d-flex flex-column justify-content-center align-items-center"
        >
          <p>nothing_added_yet</p>
        </div>
        <div
          class="learn_description _img_uploded position-relative d-flex align-items-center"
        >
          <div class="nothing_added_yet">Nothing Addedd Yet</div>
        </div>
        <div
          class="learn_description img_spesifc flex-column justify-content-center align-items-center position-relative"
        >
          <p class="nothing_added_yet">Nothing Addedd Yet</p>
        </div>
      </div>
    </div>
    <div v-else class="col-md-12 col-lg-8">
      <div class="main_learn_layout">
        <div class="learn_description position-relative">
          <span>
            {{ data.FirstTextArea }}
          </span>
        </div>
        <div class="learn_description _img_uploded position-relative">
          <img :src="data.image1" alt="" />
        </div>
        <div class="learn_description position-relative">
          <span>
            {{ data.SecondTextArea }}
          </span>
        </div>
        <div class="learn_description position-relative">
          <span>
            {{ data.ThrdTextArea }}
          </span>
        </div>
        <div class="learn_description img_spesifc position-relative">
          <img :src="data.image2" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { collection, getDocs, query, where } from "@firebase/firestore";
import { db } from "@/Firebase/firebase";
export default {
  name: "about-course-content",
  data() {
    return {
      data: null,
      id: "",
      categoryCourse: "",
      userId: "",
      title: "",
    };
  },
  methods: {
    async getWhatYouWillOBJ() {
      const q = query(
        collection(db, `what You Will Learn-${this.categoryCourse}`),
        where(`id`, "==", this.userId)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        this.data = doc.data();
      });
    },
  },
  mounted() {
    this.getWhatYouWillOBJ();
  },
  watch: {
    "$route.params": {
      handler: function (params) {
        this.id = params.id;
        this.userId = params.userid;
        this.categoryCourse = params.categoryCourse;
        this.title = params.courseTitle;
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>
<style scoped>
.nothing_added_yet {
}
</style>
