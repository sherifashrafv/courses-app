<template>
  <section>
    <ve-skeleton-mentors :list="fakeApi" v-if="Skeleton"></ve-skeleton-mentors>
    <div v-else class="container">
      <div class="row justify-content-center">
        <h4 class="my-5">{{ $t("Our Instructors") }}</h4>
        <div
          v-for="instrct in result"
          :key="instrct.id"
          class="col-lg-2 col-md-3 col-sm-6"
        >
          <div class="instractors_parent_container d-flex flex-column">
            <div class="mentor-cards-container_item mb-5">
              <img class="img_mentor-personal" :src="instrct.userimage" />
              <h5 class="mentor-card__author mt-2">
                {{ instrct.displayName }}
              </h5>
              <p class="mentor_card_bio">
                {{ instrct.discription }}
              </p>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="d-flex flex-row align-items-center">
            <span v-if="empty"></span>
            <button
              @click="fetchMorePosts"
              class="btn btn-success load_More_data"
              v-else
            >
              {{ $t("loadMore") }}
              <ve-loader v-if="loader"></ve-loader>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { dd } from "@/Firebase/firebase";
const colorRef = dd.collection("instructors").orderBy("displayName");

export default {
  name: "instractors-page",
  metaInfo: {
    title: "Mentors",
    titleTemplate: "%s - Moon-Site",
  },
  data() {
    return {
      result: [],
      lastDoc: null,
      empty: false,
      loader: false,
      Skeleton: true,
      fakeApi: Array(12).fill(""),
    };
  },
  watch: {
    empty(newValue) {
      if (newValue) {
        this.empty = newValue;
      }
    },
  },
  methods: {
    updateState(collections) {
      const isCollectionEmpty = collections.size === 0;
      if (!isCollectionEmpty) {
        const colors = collections.docs.map((color) => color.data());
        const Lastdoc = collections.docs[collections.docs.length - 1];
        this.result.push(...colors);
        this.Skeleton = false;
        this.lastDoc = Lastdoc;
      } else {
        console.log("not data");
        this.empty = true;
      }
      this.loader = false;
    },
    //
    fetchMorePosts() {
      this.loader = true;
      colorRef
        .startAfter(this.lastDoc)
        .limit(12)
        .get()
        .then((collections) => {
          this.updateState(collections);
        });
    },
  },
  mounted() {
    colorRef
      .limit(12)
      .get()
      .then((collections) => {
        this.updateState(collections);
      });
  },
};
</script>
<style scoped>
/* .mentor-cards-container_item {
} */
.instractors_parent_container {
  /* width: 1140px; */
  display: flex;
  flex-direction: column;
  flex-wrap: wrap !important;
}
.instractors_parent_container div {
  height: 711px;
  /* width: calc(100% / 5); */
  height: 282px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.mentor_card_bio {
  font-size: 14px;
  color: var(--author-bio);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  margin: 0;
  width: 146px;
  color: #a1a1a1;
}
.img_mentor-personal {
  max-width: 120px;
  max-height: 120px;
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 24px;
}
.mentor-card__author {
  line-height: 1.94;
  letter-spacing: 0.36px;
  font-weight: 500;
  color: var(--map-numbers-count);
  margin-bottom: 8px;
  width: 200px;
  font-size: 21px;
  text-transform: capitalize;
  font-weight: 600;
}
.mentor_card_bio {
  font-size: 14px;
  color: #a1a1a1;
}
button.btn.btn-success.load_More_data {
  background: transparent !important;
  border: 1px solid #3f3f3f;
  border-radius: 15px;
  font-weight: bold;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  margin: auto;
  height: 60px;
  width: 400px;
  margin: 3rem auto;
  color: #ddd;
  font-weight: 200;
  font-style: italic;
  transition: all 0.3s ease-in-out;
}
button.btn.btn-success.load_More_data:hover {
  font-style: normal;
  border-color: #eb2027;
}
</style>
