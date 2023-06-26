import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
// import { db } from "@/Firebase/firebase.js";
import axios from "axios";
// import { collection, onSnapshot } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
// import router from "@/router";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import router from "@/router";
export default {
  namespaced: true,
  state: {
    visibilityNav: true,
    CategoriesListed: [],
    loader: false,
    AcceptTheInstructor: false,
    instractors: null,
    CategoriesMix: [],
  },
  mutations: {
    SHOW_NAV(state, payLoad) {
      state.visibilityNav = payLoad;
    },
    GET_CATEGORIES(state, payLoad) {
      state.CategoriesListed = payLoad;
    },
    SET_LOADER(state, payLoad) {
      state.loader = payLoad;
    },
    SET_LOADER_INSTRACTOR(state, payload) {
      state.authloader = payload;
    },
    SET_INSTRACTOR(state, payLoad) {
      state.instractors = payLoad;
    },
  },
  actions: {
    getProducts: async ({ commit }) => {
      let result = await axios.get("/Categories");
      if (result.status == 200 && result.data.length > 0) {
        commit("GET_CATEGORIES", result.data);
      } else {
        console.log("conection not good");
      }
    },
    AddCourse: async ({ commit }, { firebaseFiles, form }) => {
      const NameOfCategories = firebaseFiles.Categorieslisted;
      const image = firebaseFiles.image;
      const storage = getStorage();
      const storageRef = await ref(
        storage,
        `${NameOfCategories}/${
          Math.random((91000000 * 5405465312) / 950000) + image.name
        }`
      );
      // get instructor information
      await uploadBytesResumable(storageRef, image, image).then(() => {
        getDownloadURL(storageRef).then((url) => {
          axios
            .post(`/${NameOfCategories}`, {
              ...form,
              image: url,
            })
            .then(() => {
              commit("SET_LOADER", false);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    },
    // update informations
    updatedInformationUser: async ({ commit }, { firebaseFiles, form }) => {
      const NameOfCategories = firebaseFiles.Categorieslisted;
      const image = firebaseFiles.image;
      const storage = getStorage();
      const storageRef = await ref(
        storage,
        `${NameOfCategories}/${
          Math.random((91000000 * 5405465312) / 950000) + image.name
        }`
      );
      // regex
      const myRegx = NameOfCategories.replace(
        /[/^\s+|\s+$/|&;$%@"<>()+,]/gm,
        ""
      );
      // get instractor information
      await uploadBytesResumable(storageRef, image, image).then(() => {
        getDownloadURL(storageRef).then((url) => {
          axios
            .post(`/${myRegx}`, {
              ...form,
              image: url,
            })
            .then(() => {
              commit("SET_LOADER", false);
              window.location.reload();
            })
            .catch((err) => {
              console.log(err);
            });
        });
      });
    },
    //
    AcceptTheInstructor: async ({ commit }, instr) => {
      axios
        .get(`/instactors?email=${instr.email}&password=${instr}`)
        .then((res) => {
          commit("SET_INSTRACTOR", ...res.data);
        });
    },
    // get cousrses of the user
    get_ArtsDesign: async (store, { email, userId }) => {
      const result = await axios.get(
        `/ArtsDesign?email=${email}&userId=${userId}`
      );
      if (result.status == 200 && result.data.length > 0) {
        store.state.CategoriesMix.push(...result.data);
      } else {
        console.log("==0");
      }
    },
    get_Languages: async (store, { email, userId }) => {
      const result = await axios.get(
        `/Languages?email=${email}&userId=${userId}`
      );
      if (result.status == 200 && result.data.length > 0) {
        store.state.CategoriesMix.push(...result.data);
      } else {
        console.log("==0");
      }
    },
    get_SoftSkills: async (store, { email, userId }) => {
      let result = await axios.get(
        `/SoftSkills?email=${email}&userId=${userId}`
      );
      if (result.status == 200 && result.data.length > 0) {
        store.state.CategoriesMix.push(...result.data);
        console.log("> 0 ");
      } else {
        console.log("==0");
      }
    },
    get_MediaPhotographyFilm: async (store, { email, userId }) => {
      const result = await axios.get(
        `/MediaPhotographyFilm?email=${email}&userId=${userId}`
      );
      if (result.status == 200 && result.data.length > 0) {
        store.state.CategoriesMix.push(...result.data);
        console.log("> 0 ");
      } else {
        console.log("==0");
      }
    },
    get_TechnologyScienceProductivity: async (store, { email, userId }) => {
      const result = await axios.get(
        `/TechnologyScienceProductivity?email=${email}&userId=${userId}`
      );
      if (result.status == 200 && result.data.length > 0) {
        store.state.CategoriesMix.push(...result.data);
        console.log("> 0 ");
      } else {
        console.log("==0");
      }
    },
    get_ParentingRelationships: async (store, { email, userId }) => {
      let result = await axios.get(
        `/ParentingRelationships?email=${email}&userId=${userId}`
      );
      if (result.status == 200 && result.data.length > 0) {
        store.state.CategoriesMix.push(...result.data);
        console.log("> 0 ");
      } else {
        console.log("==0");
      }
    },
    get_Entrepreneurship: async (store, { email, userId }) => {
      const result = await axios.get(
        `/Entrepreneurship?email=${email}&userId=${userId}`
      );
      if (result.status == 200 && result.data.length > 0) {
        store.state.CategoriesMix.push(...result.data);
        console.log("> 0 ");
      } else {
        console.log("==0");
      }
    },
    get_MentalHealthWellness: async (store, { email, userId }) => {
      const result = await axios.get(
        `/Entrepreneurship?email=${email}&userId=${userId}`
      );
      if (result.status == 200 && result.data.length > 0) {
        store.state.CategoriesMix.push(...result.data);
        console.log("> 0 ");
      } else {
        console.log("==0");
      }
    },

    //
    // logInAdmin: async ({ commit }, { email, password }) => {
    //   commit("SET_LOADER_INSTRACTOR", true);
    //   await signInWithEmailAndPassword(auth, email, password)
    //     .then((userCredential) => {
    //       commit("SET_LOADER_INSTRACTOR", false);
    //       commit("SET_LOADER_INSTRACTOR", userCredential.user);
    //       localStorage.setItem(
    //         "instractor",
    //         JSON.stringify({
    //           email: userCredential.user.email,
    //           password: password,
    //         })
    //       );
    //       router.push("/adminPannel");
    //     })
    //     .catch((error) => {
    //       if (error) {
    //         commit("SET_LOADER_INSTRACTOR", false);
    //         console.log(error);
    //       }
    //       // if (error.code == "auth/invalid-email") {
    //       // }
    //     });
    // },
  },
  getters: {},
};
