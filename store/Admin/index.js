import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import { db } from "@/Firebase/firebase.js";
import axios from "axios";
import { collection, onSnapshot } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import router from "@/router";
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
  },
  mutations: {
    SHOW_NAV(state, payLoad) {
      state.visibilityNav = payLoad;
    },
    GET_CATEGORIES(state, payLoad) {
      state.CategoriesListed.push(payLoad);
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
      onSnapshot(collection(db, "Categories"), (querySnapshot) => {
        // const CategoriesListed = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          commit("GET_CATEGORIES", data);
          commit("SET_LOADER", false);
        });
      });
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
            });
        });
      });
    },
    intractorsApply: async (
      { commit },
      { informations, CvPicture, accepted }
    ) => {
      const storage = getStorage();
      const storageRef = await ref(
        storage,
        `instractors/${
          Math.random((91000000 * 5405465312) / 950000) + CvPicture.name
        }`
      );
      commit("SET_LOADER", true);
      await uploadBytesResumable(storageRef, CvPicture, CvPicture).then(() => {
        getDownloadURL(storageRef).then((url) => {
          axios
            .post("/instactors", {
              ...informations,
              accepted,
              cvImage: url,
            })
            .then((res) => {
              commit("SET_LOADER", false);
              router.push("/instractor-page");
              // to save in locale storge
              localStorage.setItem(
                "instractor-information",
                JSON.stringify(res.data)
              );
              // end
            })
            .catch((error) => {
              console.log("network is not available", error);
            });
        });
      });
    },
    AcceptTheInstructor: async ({ commit }, instr) => {
      axios
        .get(`/instactors?email=${instr.email}&password=${instr}`)
        .then((res) => {
          commit("SET_INSTRACTOR", ...res.data);
        });
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
