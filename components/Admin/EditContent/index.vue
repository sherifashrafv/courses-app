<template>
  <div class="col-md-12 col-lg-8">
    <div class="main_learn_layout">
      <div class="learn_description position-relative">
        <div class="edit_text">
          <i style="font-size: 15px" class="fa-solid fa-keyboard"></i>
        </div>

        <textarea
          class="text_what-you_learn w-100 h-100"
          cols="30"
          ref="editText1"
          rows="10"
          maxlength="168"
          v-model="refText1"
        ></textarea>
      </div>
      <div class="learn_description _img_uploded position-relative">
        <img :src="img1" alt="" />
        <div class="edit">
          <input
            id="img_modified"
            type="file"
            class="img_modifed"
            accept="image/*"
            @change="modifiedImage1({ $event, id: data.id })"
          />
          <label for="img_modified" class="img_modified_label">
            <i class="fa-solid fa-pen-to-square"></i>
          </label>
        </div>
      </div>
      <div class="learn_description position-relative">
        <div class="edit_text">
          <i style="font-size: 15px" class="fa-solid fa-keyboard"></i>
        </div>

        <textarea
          class="text_what-you_learn w-100 h-100"
          cols="30"
          ref="editText2"
          rows="10"
          maxlength="168"
          v-model="refText2"
        ></textarea>
      </div>
      <div class="learn_description position-relative">
        <div class="edit_text">
          <i style="font-size: 15px" class="fa-solid fa-keyboard"></i>
        </div>
        <textarea
          class="text_what-you_learn w-100 h-100"
          cols="30"
          ref="editText3"
          rows="10"
          maxlength="168"
          :placeholder="refText3"
          v-model="refText3"
        ></textarea>
      </div>
      <div class="learn_description img_spesifc position-relative">
        <img :src="img2" alt="" />
        <div class="edit">
          <input
            id="img_modified2"
            type="file"
            class="img_modifed"
            accept="image/*"
            @change="modifiedImage2({ $event, id: data.id })"
          />
          <label for="img_modified2" class="img_modified_label">
            <i class="fa-solid fa-pen-to-square"></i>
          </label>
        </div>
      </div>
    </div>
    <div class="submit_informations">
      <button @click="EditBlog" class="btn_submit_information">
        <span v-if="loader" class="loader_lessons_active">
          <ve-loader></ve-loader>
        </span>
        <span v-else>edit</span>
      </button>
    </div>
  </div>
</template>

<script>
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";
export default {
  name: "editContent",
  props: {
    data: {
      type: Object,
    },
    categoryCourse: {
      type: String,
    },
    courseName: {
      type: String,
    },
    id: {
      type: Number,
    },
  },
  data: function () {
    return {
      textedit1: true,
      textedit2: true,
      textedit3: true,
      refText1: this.data[0].FirstTextArea,
      refText2: this.data[0].SecondTextArea,
      refText3: this.data[0].ThrdTextArea,
      ModifiedImage1: [],
      ModifiedImage2: [],
      imageModifed1: "",
      imageModifed2: "",
      img1: this.data[0].image1,
      img2: this.data[0].image2,
    };
  },
  methods: {
    editText1() {
      this.textedit1 = !this.textedit1;
    },
    editText2() {
      this.textedit2 = !this.textedit2;
      this.refText2 = "";
      this.$nextTick(() => this.$refs.editText2.focus());
    },
    editText3() {
      this.textedit3 = !this.textedit3;
      this.refText3 = "";
      this.$nextTick(() => this.$refs.editText3.focus());
    },
    // / 1 \\\\\\\\\\\\\\\\\\
    modifiedImage1({ $event, id }) {
      this.specifcId = id;
      this.ModifiedImage1 = $event.target.files[0];
      this.$emit("getDetails");
    },
    modifiedImage2({ $event, id }) {
      this.specifcId = id;
      this.ModifiedImage2 = $event.target.files[0];
    },
    async editImage1() {
      var elementToChange = document.getElementsByTagName("body")[0];
      elementToChange.style.cursor = "progress";
      //
      const image = this.ModifiedImage1;
      console.log(image.name);
      const storage = getStorage();
      const storageRef = await ref(
        storage,
        `random/${Math.random((91000000 * 5405465312) / 950000) + image.name}`
      );
      await uploadBytesResumable(storageRef, image, image).then(() => {
        getDownloadURL(storageRef).then((url) => {
          elementToChange.style.cursor = "default";
          this.img1 = url;
        });
      });
      // commit("SET_LOADER", true);
    },
    async editImage2() {
      var elementToChange = document.getElementsByTagName("body")[0];
      elementToChange.style.cursor = "progress";
      //
      const image = this.ModifiedImage2;
      const storage = getStorage();
      const storageRef = await ref(
        storage,
        `random/${Math.random((91000000 * 5405465312) / 950000) + image.name}`
      );
      await uploadBytesResumable(storageRef, image, image).then(() => {
        getDownloadURL(storageRef).then((url) => {
          elementToChange.style.cursor = "default";
          this.img2 = url;
        });
      });
      // commit("SET_LOADER", true);
    },
    async EditBlog() {
      const data = {
        FirstTextArea: this.refText1,
        SecondTextArea: this.refText2,
        ThrdTextArea: this.refText3,
        image1: this.img1,
        image2: this.img2,
      };
      await axios
        .put(
          `what You Will Learn-${this.categoryCourse}/${this.id}/${this.courseName}.json `,
          data
        )
        .then(() => {
          this.loader = false;
          this.$emit("getDetails");
        });
    },
  },
  watch: {
    ModifiedImage1(newImage) {
      if (newImage) {
        this.editImage1();
      }
    },
    ModifiedImage2(newImage) {
      if (newImage) {
        this.editImage2();
      }
    },
    imageModifed2(newValue) {
      if (newValue) {
        this.updateImage2({ newValue, id: this.specifcId });
      }
    },
    // imageModifed1(newValue) {
    //   // if (newValue) {
    //   //   this.
    //   // }
    // },
  },

  mounted() {
    console.log(this.$route.params);
  },
};
</script>

<style></style>
