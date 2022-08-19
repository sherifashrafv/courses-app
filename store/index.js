import Vuex from "vuex";
import Vue from "vue";
import AdminStore from "@/store/Admin/index.js";
// firebase imports
import {
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/Firebase/firebase";
import router from "@/router";
Vue.use(Vuex);
let user = localStorage.getItem("user-info");
//
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/";
//
export default new Vuex.Store({
  state: {
    user: user ? JSON.parse(user) : [],
    AuthError: null,
    progressLoading: false,
  },
  getters: {},
  mutations: {
    SIGN_UP_WITH_FACEBOOK(state, payload) {
      state.user.push(payload);
    },
    SIGN_UP_WITH_Google(state, payload) {
      state.user.push(payload);
    },
    ERROR_MESSAGES(state, payload) {
      state.AuthError = payload;
    },
    PROGRESS_LOADING(state, payload) {
      state.loading = payload;
    },
    LOGIN_METHOD(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    // to login with face book
    FacebookSignUp({ commit }) {
      const provider = new FacebookAuthProvider();
      signInWithPopup(auth, provider)
        .then((res) => {
          const user = res.user;
          commit("SIGN_UP_WITH_FACEBOOK", {
            displayName: user.displayName,
            image: user.photoURL,
            email: user.email,
          });
          localStorage.setItem(
            "user-info",
            JSON.stringify({
              displayName: user.displayName,
              image: user.photoURL,
              email: user.email,
            })
          );
          axios.post("/users", {
            name: user.displayName,
            image: user.photoURL,
            email: user.email,
          });
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // google signup
    GoogleSignUp({ commit }) {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((res) => {
          const user = res.user;
          commit("SIGN_UP_WITH_Google", {
            displayName: user.displayName,
            image: user.photoURL,
            email: user.email,
          });
          localStorage.setItem(
            "user-info",
            JSON.stringify({
              displayName: user.displayName,
              image: user.photoURL,
              email: user.email,
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // SignUpWithEmailPassword
    createUser: ({ commit }, { email, password, name }) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          router.push("/");
          commit("SIGN_UP_WITH_Google", {
            displayName: user.displayName,
            email: user.email,
          });
          localStorage.setItem(
            "user-info",
            JSON.stringify({
              displayName: name,
              email: user.email,
            })
          );
          const id = userCredential.user.uid;
          console.log(id);
          console.log(password);
        })
        .catch((error) => {
          if (error.code == "auth/email-already-in-use") {
            commit("ERROR_MESSAGES", "email is already in use");
          } else if (error.code == "auth/invalid-email") {
            commit("SET_ERROR", "invalid email");
          } else if (error.code == "auth/operation-not-allowed") {
            commit("SET_ERROR", "operation-not-allowed");
          } else if (error.code == "auth/weak-password") {
            commit("SET_ERROR", "Weak-Password");
          }
        });
    },

    logIn: async ({ commit }, { email, password }) => {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const id = userCredential.user.uid;
          commit("USER_ID", id);
          commit("SET_USER", userCredential.user);
          localStorage.setItem("user-info", JSON.stringify({ id: id }));
          router.push("/");
        })
        .catch((error) => {
          console.log("error"), error;
          // if (error.code == "auth/invalid-email") {
          // }
        });
    },
  },
  modules: {
    admin: AdminStore,
  },
});
