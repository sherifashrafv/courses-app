<template>
  <div class="settings_instractors">
    <div class="information_insturctor_wrapper w-100">
      <h1 class="personal_title">Personal Information</h1>
      <div class="position-relative">
        <div class="img_profile_settings_avatar position-relative">
          <img :src="instructor.userimage" alt="" />
          <input
            @change="uploadImage"
            id="imaguser"
            type="file"
            class="file-upload_user-image"
            accept="image/*"
          />
          <label class="img_patch_user" for="imaguser">
            <img src="@/assets/Images/Icons/camera-icon.png" alt="" />
          </label>
        </div>
      </div>
      <div class="edit_forms_instractors">
        <div class="container">
          <div class="row mb-5 align-items-center">
            <div class="col-lg-2 col-md-2">
              <div class="name_instractor">
                <h1 class="m-0">Name</h1>
              </div>
            </div>
            <div class="col-lg-10 col-md-10">
              <input
                v-model="instructor.displayName"
                :class="
                  $v.name.$error
                    ? 'input_instructor_name error'
                    : 'input_instructor_name'
                "
                type="text"
                placeholder="Name"
              />
            </div>
          </div>
          <div class="row mb-5 align-items-center">
            <div class="col-lg-2 col-md-2">
              <div class="name_instractor">
                <h1 class="m-0">gender</h1>
              </div>
            </div>
            <div class="col-lg-10 col-md-10">
              <div class="input_instructor_gender d-flex flex-row">
                <div class="select_gender position-relative">
                  <input
                    type="checkbox"
                    @change="getValue($event)"
                    v-model="gender"
                    value="men"
                    id="men"
                  />
                  <label
                    for="men"
                    :class="
                      gender === 'men' ? 'active' : 'normal_gender_selcted'
                    "
                    >Men</label
                  >
                </div>
                <div class="select_gender position-relative">
                  <input
                    type="checkbox"
                    value="women"
                    id="women"
                    @change="getValue($event)"
                  />
                  <label
                    :class="
                      gender === 'women' ? 'active' : 'normal_gender_selcted'
                    "
                    for="women"
                    >Women</label
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-5 align-items-center">
            <div class="col-lg-2 col-md-2">
              <div class="name_instractor">
                <h1 class="m-0">Date of Birth</h1>
              </div>
            </div>
            <div class="col-lg-10 col-md-10">
              <div class="date_of_birth d-flex flex-row flex-wrap">
                <div class="select_days">
                  <select
                    v-model="dayConfirm"
                    :class="
                      $v.dayConfirm.$error
                        ? 'form-select date_of_birth_select error'
                        : 'form-select date_of_birth_select'
                    "
                  >
                    <option
                      v-for="(list, i) in daysListed"
                      :key="list"
                      v-bind:selected="i == 1"
                    >
                      {{ list }}
                    </option>
                  </select>
                </div>
                <div class="select_days">
                  <select
                    v-model="monthSelect"
                    :class="
                      $v.monthSelect.$error
                        ? 'form-select date_of_birth_select error'
                        : 'form-select date_of_birth_select'
                    "
                  >
                    <option
                      v-for="list in monthOfYear"
                      :key="list.abbreviation"
                      v-bind:selected="list.abbreviation == 1"
                    >
                      {{ list.abbreviation }}
                    </option>
                  </select>
                </div>
                <div class="select_days">
                  <select
                    v-model="YearsConfirm"
                    :class="
                      $v.YearsConfirm.$error
                        ? 'form-select date_of_birth_select error'
                        : 'form-select date_of_birth_select'
                    "
                  >
                    <option
                      v-for="(list, i) in yearsListed"
                      :key="list"
                      v-bind:selected="i == 1"
                    >
                      {{ list }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="row mb-5">
            <div class="col-lg-2 col-md-2">
              <div class="name_instractor">
                <h1 class="m-0">Country</h1>
              </div>
              <div style="margin-top: 37px !important" class="name_instractor">
                <h1 class="m-0">City</h1>
              </div>
            </div>
            <div class="col-lg-10 col-md-10">
              <div class="date_of_birth d-flex flex-row position-relative">
                <vueCountriesCities
                  :city="true"
                  @country="selectedCountry = $event"
                  @city="selectedCity = $event"
                >
                </vueCountriesCities>
                <div v-if="instructor.country" ref="city" class="country_picUp">
                  Your Country is {{ instructor.country }}
                </div>
                <div v-if="instructor.city" ref="city" class="city_picUp">
                  Your City is {{ instructor.city }}
                </div>
              </div>
            </div>
          </div>
          <button
            @click="editInformation({ id: id })"
            class="btn btn-danger user-settings-personal-info__container-form-submit-btn"
          >
            <div v-if="spinner" class="spinner-border text-dark" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <span v-else>Submit-Edit</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vueCountriesCities from "vue-countries-cities";
import { required, minLength } from "vuelidate/lib/validators";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "@firebase/storage";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "@firebase/firestore";
import { db } from "@/Firebase/firebase";
export default {
  name: "your-courses",
  components: { vueCountriesCities },
  data() {
    return {
      //datails about user
      id: "",
      name: "",
      gender: "",
      daysListed: [],
      yearsListed: [],
      dayConfirm: "1",
      YearsConfirm: "",
      selectedCountry: "",
      selectedCity: "",
      monthSelect: "",
      gotImage: [],
      spinner: false,
      monthOfYear: [
        {
          abbreviation: "Jan",
          name: "January",
        },
        {
          abbreviation: "Feb",
          name: "February",
        },
        {
          abbreviation: "Mar",
          name: "March",
        },
        {
          abbreviation: "Apr",
          name: "April",
        },
        {
          abbreviation: "May",
          name: "May",
        },
        {
          abbreviation: "Jun",
          name: "June",
        },
        {
          abbreviation: "Jul",
          name: "July",
        },
        {
          abbreviation: "Aug",
          name: "August",
        },
        {
          abbreviation: "Sep",
          name: "September",
        },
        {
          abbreviation: "Oct",
          name: "October",
        },
        {
          abbreviation: "Nov",
          name: "November",
        },
        {
          abbreviation: "Dec",
          name: "December",
        },
      ],
    };
  },
  validations: {
    name: { required, minLength: minLength(0, 25) },
    gender: { required },
    dayConfirm: { required },
    YearsConfirm: { required },
    monthSelect: { required },
    selectedCountry: { required },
    selectedCity: { required },
    monthOfYear: { required },
  },
  methods: {
    getValue(e) {
      this.gender = e.target.value;
    },
    rangeDays() {
      const start = 1;
      const end = 30;
      const range = [...Array(end - start + 1).keys()].map((x) => x + start);
      this.daysListed = range;
    },
    rangeYears() {
      const now = new Date().getUTCFullYear();
      const years = Array(now - (now - 101))
        .fill("")
        .map((v, idx) => now - idx);
      this.yearsListed = years;
    },
    async changeImage({ id }) {
      var elementToChange = document.getElementsByTagName("body")[0];
      elementToChange.style.cursor = "progress";
      //
      const image = this.gotImage;
      const storage = getStorage();
      const storageRef = await ref(
        storage,
        `instracors/${
          Math.random((91000000 * 5405465312) / 950000) + image.name
        }`
      );
      const instructorRef = doc(db, "instructors", id);
      const usersRef = doc(db, "users", id);
      await uploadBytesResumable(storageRef, image, image).then(() => {
        getDownloadURL(storageRef).then((url) => {
          this.userImage = url;
          updateDoc(instructorRef, {
            userimage: url,
          }).then(() => {
            // commit("SET_LOADER", true);
            elementToChange.style.cursor = "default";
            const q = query(
              collection(db, "instructors"),
              where("id", "==", id)
            );
            getDocs(q).then((doc) => {
              doc.forEach((doc) => {
                this.$store.commit("INSTURACTOR_INFORMATION", doc.data());
              });
            });
          });
          updateDoc(usersRef, {
            userimage: url,
          }).then(() => {
            // commit("SET_LOADER", true);
            const userQuery = query(
              collection(db, "users"),
              where("id", "==", id)
            );
            getDocs(userQuery).then((doc) => {
              doc.forEach((doc) => {
                this.$store.commit("USER_INFORMATION", doc.data());
              });
            });
          });
        });
      });
    },
    uploadImage(e) {
      this.gotImage = e.target.files[0];
    },
    validation() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log("form validation success");
      } else {
        console.log("form not Validation");
      }
    },
    editInformation({ id }) {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.spinner = true;
        const instructorRef = doc(db, "users", id);
        updateDoc(instructorRef, {
          FirstName: this.name,
          day: this.dayConfirm,
          year: this.YearsConfirm,
          month: this.monthSelect,
          country: this.selectedCountry,
          city: this.selectedCity,
          gender: this.gender,
        }).then(() => {
          this.spinner = false;
          const q = query(collection(db, "users"), where("id", "==", id));
          getDocs(q).then((doc) => {
            doc.forEach((doc) => {
              this.$store.commit("USER_INFORMATION", doc.data());
            });
          });
        });
      } else {
        console.log("not validation");
      }
    },
  },
  mounted() {
    this.$store.dispatch("getUserInformation", {
      id: this.$route.params.id,
    });
    this.id = this.$route.params.id;
    this.currentUser = true;
    this.rangeDays();
    this.rangeYears();
  },
  computed: {
    instructor() {
      return this.$store.state.user;
    },
  },
  watch: {
    gotImage(newImage) {
      if (newImage) {
        this.changeImage({ id: this.$route.params.id });
      }
    },
    instructor(newInstr) {
      if (newInstr) {
        this.name = newInstr.displayName;
        this.gender = newInstr.gender;
        this.dayConfirm = newInstr.day;
        this.YearsConfirm = newInstr.year;
        this.monthSelect = newInstr.month;
        this.selectedCity = newInstr.city;
        this.selectedCountry = newInstr.country;
      }
    },
  },
};
</script>
<style scoped>
.settings_instractors {
  padding: 60px;
  border-radius: 10px;
  display: flex;
  align-items: baseline;
  background: #141717;
}
.personal_title {
  font-size: 22px;
  color: var(--map-numbers-count);
}
.img_profile_settings_avatar {
  border-radius: 50%;
  margin: 50px 0 60px;
  width: fit-content;
}
.img_profile_settings_avatar img {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
}
.name_instractor h1 {
  font-size: 18px;
  padding-left: 15px;
  line-height: 45px;
  color: var(--map-numbers-count);
}
.name_instractor {
  height: 45px;
}
.input_instructor_name {
  border-radius: 4px;
  height: 45px;
  outline: none;
  border: none;
  padding: 0 25px;
  color: #d4d4d4;
  background: #252a2a;
  width: 100%;
  font-family: "Roboto", "sans-serif" !important;
  font-weight: 900;
  text-transform: capitalize;
}
.input_instructor_gender > div {
  width: calc(100% / 2);
}
.input_instructor_gender {
  border: 1px solid #ff907e;
  border-radius: 7px;
  height: 50px;
}
.select_gender input {
  display: none;
}
.select_gender label {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  left: 50%;
  font-size: 17px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.select_gender label.active {
  background: #ff907e;
  color: #252a2a;
  font-weight: bold;
}
.date_of_birth_select {
  background: #252a2a;
  padding: 0 20px;
  border: none;
  color: #d4d4d4;
  width: 200px;
  height: 45px;
  background-image: url("@/assets/Images/Admin/Your-Courses/down-arrow.png") !important;
  background-repeat: no-repeat !important;
  background-position: right 0.75rem center !important;
  background-size: 16px 12px !important;
  padding: 0 31px;
}
.date_of_birth_select:focus {
  box-shadow: none !important;
}
.date_of_birth {
  gap: 4vw;
}
.countries-cities {
  display: flex !important;
  padding: 0 !important;
  flex-direction: column;
  gap: 35px;
}
/* >>> .countries-cities div:nth-child(2) {
  display: none !important;
  background: red !important;
} */
>>> .countries-cities .select-box {
  border-color: transparent !important;
  border: none !important;
  color: #d4d4d4;
  background: transparent !important;
}
>>> .countries-cities .select-box select {
  background: #252a2a !important;
  color: #d4d4d4 !important;
  background-image: url("@/assets/Images/Admin/Your-Courses/down-arrow.png") !important;
  background-repeat: no-repeat !important;
  background-position: right 0.75rem center !important;
  background-size: 16px 12px !important;
  width: 80% !important;
  height: 45px !important;
  border-radius: 0.375rem !important;
  padding: 0 19px;
}
>>> .countries-cities .select-box svg {
  display: none !important;
}
button.btn.btn-danger.user-settings-personal-info__container-form-submit-btn {
  width: 177px;
  height: 48px;
  background: #eb2027;
}
.normal_gender_selcted {
  color: #ff907e;
}
.input_updated_profile_image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
}
.input_updated_profile_image input {
  display: none;
}
.input_file_uploader-user_image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.input_file_uploader-user_image position-relative img {
  width: 20px !important;
  height: 20px !important;
}
.file-upload_user-image {
  display: none;
}
.img_patch_user {
  position: absolute;
  bottom: 0;
  right: 5px;
  cursor: pointer;
}
.img_patch_user img {
  width: 40px !important;
  height: 40px !important;
}
input.input_instructor_name.error {
  border: 1px solid #ff907e;
}
select.form-select.date_of_birth_select.error {
  border: 1px solid #ff907e;
}
/* >>> div#citites div:nth-child(2) {
  display: block !important;
}
>>> div#citites div:first-child {
  display: none !important;
} */
.city_picUp {
  color: #d4d4d4 !important;
  min-width: 300px;
  height: 45px;
  position: absolute;
  top: 75%;
  left: 37%;
  font-weight: 300;
}
.country_picUp {
  min-width: 300px;
  height: 45px;
  position: absolute;
  top: 11%;
  left: 37%;
  font-weight: 300;
  color: #d4d4d4 !important;
}
</style>
