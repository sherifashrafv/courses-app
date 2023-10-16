<template>
  <div class="what_you_learn">
    <div class="container">
      <div class="row">
        <div v-if="data == null" class="col-md-12 col-lg-8">
          <div class="">
            <h3>What You Learn</h3>
          </div>
          <div class="main_learn_layout">
            <div
              :class="
                $v.FirstTextArea.$error
                  ? 'learn_description error d-flex flex-row align-items-center justify-content-center'
                  : 'learn_description d-flex flex-row align-items-center justify-content-center'
              "
            >
              <div
                v-if="openTextArea1"
                class="position-relative w-100 w-100 h-100"
              >
                <textarea
                  class="text_what-you_learn w-100 h-100"
                  cols="30"
                  rows="10"
                  maxlength="168"
                  ref="textarea1"
                  v-model="FirstTextArea"
                ></textarea>
                <span @click="openText1" class="cancel_text_area">X</span>
              </div>
              <div
                v-else
                @click="openText1"
                role="button"
                class="add_what_you_Learn"
              >
                Add Some description
              </div>
              <!--  -->
            </div>

            <div
              v-if="image1.length <= 0"
              :class="
                $v.image1.$error
                  ? 'learn_description _img_uploded error'
                  : 'learn_description _img_uploded'
              "
            >
              <input
                id="img_learn"
                type="file"
                class="file-upload"
                accept="image/*"
                @change="uploadImage"
              />
              <label
                for="img_learn"
                class="upload_content_img d-flex flex-column justify-content-center align-items-center"
              >
                Upload Image
                <img
                  src="../../../assets/Images/Icons/gallery.png"
                  alt=""
                  class="image_add-file"
              /></label>
            </div>
            <!--  -->
            <div v-else class="learn_description _img_uploded_active">
              <img :src="image1" alt="" />
            </div>
            <!--  -->
            <div
              :class="
                $v.SecondTextArea.$error
                  ? 'learn_description error d-flex flex-row align-items-center justify-content-center'
                  : 'learn_description d-flex flex-row align-items-center justify-content-center'
              "
            >
              <div
                v-if="openTextArea2"
                class="position-relative w-100 w-100 h-100"
              >
                <textarea
                  class="text_what-you_learn w-100 h-100"
                  cols="30"
                  rows="10"
                  maxlength="168"
                  ref="textarea2"
                  v-model="SecondTextArea"
                ></textarea>
                <span @click="openText2" class="cancel_text_area">X</span>
              </div>

              <div
                v-else
                @click="openText2"
                role="button"
                class="add_what_you_Learn"
              >
                Add Some description
              </div>
            </div>

            <div
              :class="
                $v.ThrdTextArea.$error
                  ? 'learn_description error d-flex flex-row align-items-center justify-content-center'
                  : 'learn_description d-flex flex-row align-items-center justify-content-center'
              "
            >
              <div
                v-if="openTextArea3"
                class="position-relative w-100 w-100 h-100"
              >
                <textarea
                  class="text_what-you_learn w-100 h-100"
                  cols="30"
                  rows="10"
                  maxlength="168"
                  ref="textarea3"
                  v-model="ThrdTextArea"
                ></textarea>
                <span @click="openText3" class="cancel_text_area">X</span>
              </div>
              <div
                v-else
                @click="openText3"
                role="button"
                class="add_what_you_Learn"
              >
                Add Some description
              </div>
              <!--  -->
            </div>
            <div
              v-if="image2.length <= 0"
              :class="
                $v.image2.$error
                  ? 'learn_description img_spesifc error position-relative'
                  : 'learn_description img_spesifc  position-relative'
              "
            >
              <input
                id="img_learn2"
                type="file"
                class="file-upload"
                accept="image/*"
                @change="uploadImage2"
              />
              <label
                for="img_learn2"
                class="upload_content_img d-flex flex-column justify-content-center align-items-center"
              >
                Upload Image
                <img
                  src="../../../assets/Images/Icons/gallery.png"
                  alt=""
                  class="image_add-file"
              /></label>
              <!-- <img src="../../../../src/assets/Images/Home/3.png" alt="" /> -->
            </div>
            <div v-else class="learn_description img_spesifc active">
              <img :src="image2" alt="" />
            </div>
          </div>
          <div class="submit_informations">
            <button
              @click="add_first_description"
              class="btn_submit_information"
            >
              <span v-if="loader" class="loader_lessons_active">
                <ve-loader></ve-loader>
              </span>
              <span v-else>submit</span>
            </button>
          </div>
          <!--  -->
        </div>
        <EditContent
          :id="id"
          :courseName="courseName"
          :categoryCourse="categoryCourse"
          :data="data"
          @getDetails="getWhatYouWillOBJ"
          v-else
        />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { required, minLength } from "vuelidate/lib/validators";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "@firebase/storage";
import {
  // collection,
  doc,
  // getDocs,
  // query,
  // setDoc,
  updateDoc,
  // where,
} from "@firebase/firestore";
import { db } from "@/Firebase/firebase";
import EditContent from "@/components/Admin/EditContent";
export default {
  name: "about-Course-learn",
  components: {
    EditContent,
  },
  data() {
    return {
      id: null,
      courseid: "",
      categoryCourse: "",
      openTextArea1: false,
      openTextArea2: false,
      openTextArea3: false,
      FirstTextArea: "",
      ThrdTextArea: "",
      SecondTextArea: "",
      data: null,
      courseName: "",
      text1: false,
      textInofrmation1: "",
      backgroundImage: [],
      backgroundImage2: [],
      ModifiedImage1: [],
      ModifiedImage2: [],
      image1: "",
      image2: "",
      imageModifed1: "",
      imageModifed2: "",
      loader: false,
      specifcId: "",
      refText1: "",
      refText2: "",
      refText3: "",
    };
  },

  validations: {
    FirstTextArea: { required, minLength: minLength(0, 168) },
    SecondTextArea: { required, minLength: minLength(0, 168) },
    ThrdTextArea: { required, minLength: minLength(0, 168) },
    image1: { required },
    image2: { required },
  },
  methods: {
    showModalHandelar() {
      this.showModal = !this.showModal;
    },
    openText1() {
      this.openTextArea1 = !this.openTextArea1;
      setTimeout(() => {
        this.$refs.textarea1.focus();
      });
    },
    openText2() {
      this.openTextArea2 = !this.openTextArea2;
      setTimeout(() => {
        this.$refs.textarea2.focus();
      });
    },
    openText3() {
      this.openTextArea3 = !this.openTextArea3;
      setTimeout(() => {
        this.$refs.textarea3.focus();
      });
    },
    cancelText() {
      this.openTextArea = !this.openTextArea;
    },
    async add_first_description() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loader = true;
        await axios
          .post(
            `what You Will Learn-${this.categoryCourse}/${this.id}/${this.courseName}.json `,
            {
              FirstTextArea: this.FirstTextArea,
              SecondTextArea: this.SecondTextArea,
              ThrdTextArea: this.ThrdTextArea,
              image1: this.image1,
              image2: this.image2,
            }
          )
          .then((res) => {
            console.log(res.data);
            this.loader = false;
            this.getWhatYouWillOBJ();
          });
      } else {
        console.log("not-validation");
      }
    },
    async getWhatYouWillOBJ() {
      // const q = query(
      //   collection(db, `what You Will Learn-${this.categoryCourse}`),
      //   where(`id`, "==", this.id)
      // );
      // const querySnapshot = await getDocs(q);
      // querySnapshot.forEach((doc) => {
      //   this.data = doc.data();
      // });
      await axios
        .get(
          `what You Will Learn-${this.categoryCourse}/${this.id}/${this.courseName}.json `
        )
        .then((res) => {
          if (res.data) {
            const newData = res.data;
            console.log(newData);
            let course = [];
            for (let key in newData) {
              newData[key].id = key;
              course.push(newData[key]);
            }
            this.data = course;
            console.log("true");
          } else {
            this.data = null;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    uploadImage(e) {
      this.backgroundImage = e.target.files[0];
    },
    uploadImage2(e) {
      this.backgroundImage2 = e.target.files[0];
    },
    async changeImage1() {
      var elementToChange = document.getElementsByTagName("body")[0];
      elementToChange.style.cursor = "progress";
      //
      const image = this.backgroundImage;
      const storage = getStorage();
      const storageRef = await ref(
        storage,
        `random/${Math.random((91000000 * 5405465312) / 950000) + image.name}`
      );
      await uploadBytesResumable(storageRef, image, image).then(() => {
        getDownloadURL(storageRef).then((url) => {
          elementToChange.style.cursor = "default";
          this.image1 = url;
        });
      });
      // commit("SET_LOADER", true);
    },
    async changeImage2() {
      var elementToChange = document.getElementsByTagName("body")[0];
      elementToChange.style.cursor = "progress";
      //
      const image = this.backgroundImage2;
      const storage = getStorage();
      const storageRef = await ref(
        storage,
        `random/${Math.random((91000000 * 5405465312) / 950000) + image.name}`
      );
      await uploadBytesResumable(storageRef, image, image).then(() => {
        getDownloadURL(storageRef).then((url) => {
          elementToChange.style.cursor = "default";
          this.image2 = url;
        });
      });
      // commit("SET_LOADER", true);
    },
    modifiedImage1({ $event, id }) {
      this.specifcId = id;
      this.ModifiedImage1 = $event.target.files[0];
      this.getWhatYouWillOBJ();
    },
    modifiedImage2({ $event, id }) {
      this.specifcId = id;
      this.ModifiedImage2 = $event.target.files[0];
      this.getWhatYouWillOBJ();
    },
    async updateImage1({ newValue }) {
      const washingtonRef = doc(
        db,
        `what You Will Learn-${this.categoryCourse}`,
        this.courseName
      );
      updateDoc(washingtonRef, {
        image1: newValue,
      }).then(() => {
        this.getWhatYouWillOBJ();
      });
    },
    async updateImage2({ newValue }) {
      const washingtonRef = doc(
        db,
        `what You Will Learn-${this.categoryCourse}`,
        this.courseName
      );
      updateDoc(washingtonRef, {
        image2: newValue,
      }).then(() => {
        this.getWhatYouWillOBJ();
      });
      // await axios.put(
      //   `what You Will Learn-${this.categoryCourse}/${this.id}/${this.courseName}/${id}/image1/0.json `,
      //   newValue
      // );
    },
    async editImage1() {
      var elementToChange = document.getElementsByTagName("body")[0];
      elementToChange.style.cursor = "progress";
      //
      const image = this.ModifiedImage1;
      const storage = getStorage();
      const storageRef = await ref(
        storage,
        `random/${Math.random((91000000 * 5405465312) / 950000) + image.name}`
      );
      await uploadBytesResumable(storageRef, image, image).then(() => {
        getDownloadURL(storageRef).then((url) => {
          elementToChange.style.cursor = "default";
          this.imageModifed1 = url;
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
          this.imageModifed2 = url;
        });
      });
      // commit("SET_LOADER", true);
    },

    // async add_edit_description() {
    //   this.$v.$touch();
    //   if (!this.$v.$invalid) {
    //     this.loader = true;
    //     // setDoc(
    //     //   doc(
    //     //     db,
    //     //     `what You Will Learn-${this.categoryCourse}`,
    //     //     this.courseName
    //     //   ),
    //     //   {
    //     //     FirstTextArea: this.FirstTextArea,
    //     //     SecondTextArea: this.SecondTextArea,
    //     //     ThrdTextArea: this.ThrdTextArea,
    //     //     image1: this.image1,
    //     //     image2: this.image2,
    //     //     id: this.courseid,
    //     //   }
    //     // ).then(() => {

    //     // });
    //     await axios
    //       .post(
    //         `what You Will Learn-${this.categoryCourse}/${this.id}/${this.courseName}.json `,
    //         {
    //           FirstTextArea: this.refText1,
    //           SecondTextArea: this.refText2,
    //           ThrdTextArea: this.refText3,
    //           image1: this.image1,
    //           image2: this.image2,
    //         }
    //       )
    //       .then((res) => {
    //         console.log(res);
    //         this.data = res.data;
    //         // this.getWhatYouWillOBJ();
    //         this.loader = false;
    //       });
    //   } else {
    //     console.log("not-validation");
    //   }
    // },
  },
  watch: {
    "$route.params": {
      handler: function (params) {
        this.courseid = params.courseId;
        // this.id = params.id;
        this.categoryCourse = params.category;
      },
      deep: true,
      immediate: true,
    },
    backgroundImage(newImage) {
      if (newImage) {
        this.changeImage1();
      }
    },
    backgroundImage2(newImage) {
      if (newImage) {
        this.changeImage2();
      }
    },
    //
    ModifiedImage1(newImage) {
      if (newImage) {
        this.editImage1();
      }
    },
    imageModifed1(newValue) {
      if (newValue) {
        this.updateImage1({ newValue, id: this.specifcId });
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
    data(newValue) {
      if (newValue) {
        this.refText1 = newValue.FirstTextArea;
      }
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.courseName = this.$route.params.title;
    this.getWhatYouWillOBJ();
  },
};
</script>
<style></style>
