import Vuex from "vuex";
import Vue from "vue";
import AdminStore from "@/store/Admin/index.js";
// firebase imports
import {
  signInWithPopup,
  FacebookAuthProvider,
  // GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db, auth } from "@/Firebase/firebase";
import router from "@/router";
Vue.use(Vuex);
let user = localStorage.getItem("user-info");
let insturctor = localStorage.getItem("instructor-apply");
import axios from "axios";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
axios.defaults.baseURL = "https://almentor-vuejs-default-rtdb.firebaseio.com/";
export default new Vuex.Store({
  state: {
    user: user ? JSON.parse(user) : [],
    AuthError: null,
    progressLoading: false,
    buttonLoader: false,
    insturctor: insturctor ? JSON.parse(insturctor) : [],
    userExist: false,
    ErrorLogin: false,
    ErrorMessage: "",
    loader: false,
  },
  getters: {},
  mutations: {
    SIGN_UP_WITH_FACEBOOK(state, payload) {
      state.user = payload;
    },
    SIGN_UP_WITH_Google(state, payload) {
      state.user = payload;
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
    LOGOUT_METHOD(state, payload) {
      state.user = payload;
    },
    USER_INFORMATION(state, payload) {
      state.user = payload;
    },
    INSTURACTOR_INFORMATION(state, payload) {
      state.insturctor = payload;
    },
    SET_BUTTON_LOADER(state, payload) {
      state.buttonLoader = payload;
    },
    USER_EXIST(state, payload) {
      state.userExist = payload;
    },
    ERROR_HANDLE(state, { payload, payload2 }) {
      state.ErrorLogin = payload;
      state.ErrorMessage = payload2;
    },
    LOADER(state, payload) {
      state.loader = payload;
    },
  },
  actions: {
    // Login With Facebook
    FacebookSignUp({ commit }) {
      const provider = new FacebookAuthProvider();
      signInWithPopup(auth, provider)
        .then((res) => {
          const user = res.user;
          setDoc(doc(db, "users", user.uid), {
            password: "",
            firstName: "",
            email: user.email,
            lastName: "",
            id: user.uid,
            userimage: user.photoURL,
            displayName: user.displayName,
          }).then(() => {
            localStorage.setItem(
              "user-info",
              JSON.stringify({
                firstName: "",
                email: user.email,
                lastName: "",
                id: user.uid,
                userimage: user.photoURL,
              })
            );
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
            router.push("/");
            window.location.reload();
            this.dispatch("getUserInformation", user.uid);
          });
        })
        .catch((error) => {
          console.log(error);
          if (error.code == "auth/account-exists-with-different-credential") {
            commit("USER_EXIST", true);
          }
        });
    },
    // user-SignUp-WithEmail-Password
    createUser: async (
      { commit },
      { email, password, userImage, lastName, name }
    ) => {
      console.log(email, password, userImage, lastName, name);
      commit("LOADER", true);
      const storage = getStorage();
      const image = userImage;
      const storageRef = await ref(
        storage,
        `users/${Math.random((91000000 * 5405465312) / 950000) + image.name}`
      );
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          uploadBytesResumable(storageRef, image, image).then(() => {
            getDownloadURL(storageRef).then((url) => {
              user.photoURL = url;
              setDoc(doc(db, "users", user.uid), {
                password,
                firstName: name,
                email,
                lastName,
                id: user.uid,
                userimage: url,
                InstructorAccepted: false,
                displayName: name + " " + lastName,
              }).then(() => {
                commit("LOADER", false);
                router.push("/");
                window.location.reload();
                localStorage.setItem(
                  "user-info",
                  JSON.stringify({
                    password,
                    firstName: name,
                    email,
                    lastName,
                    id: user.uid,
                    userimage: url,
                  })
                );
              });
            });
          });
        })
        .catch((e) => {
          Vue.swal.fire({
            icon: "error",
            title: "Oops...",
            text: e.code,
          });
          commit("LOADER", false);
        });
    },
    // log-in
    logIn: async ({ commit }, { email, password }) => {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const id = user.uid;
          localStorage.setItem("user-info", JSON.stringify({ id: id, email }));
          // router.push("/");
          window.scrollTo(0, 0);
          // window.location.reload();
        })
        .catch((e) => {
          Vue.swal.fire({
            icon: "error",
            title: "Oops...",
            text: e.code,
          });
          commit("LOADER", false);
        });
    },
    // log-out
    logOut: async ({ commit }) => {
      localStorage.removeItem("user-info");
      window.location.reload();
      await signOut(auth);
      commit("USER_ID", null);
    },
    // get-userInformation
    getUserInformation: async ({ commit }, { id }) => {
      const q = query(collection(db, "users"), where("id", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        commit("USER_INFORMATION", doc.data());
      });
    },
    // insturctor-apply
    intractorsApply: async (
      { commit },
      { informations, CvPicture, accepted, user }
    ) => {
      commit("LOADER", true);
      const storage = getStorage();
      const storageRef = await ref(
        storage,
        `instractors/${
          Math.random((91000000 * 5405465312) / 950000) + CvPicture.name
        }`
      );
      await uploadBytesResumable(storageRef, CvPicture, CvPicture).then(() => {
        getDownloadURL(storageRef).then((url) => {
          const washingtonRef = doc(db, "users", user.id);
          updateDoc(washingtonRef, {
            InstructorAccepted: true,
          }).then(() => {
            const q = query(
              collection(db, "users"),
              where("id", "==", user.id)
            );
            getDocs(q).then((doc) => {
              doc.forEach((doc) => {
                commit("USER_INFORMATION", doc.data());
              });
            });
          });
          setDoc(doc(db, "instructors", user.id), {
            ...informations,
            userimage: user.userimage,
            id: user.id,
            cvPic: url,
            day: "",
            gender: "",
            month: "",
            year: "",
            country: "",
            city: "",
          }).then(() => {
            localStorage.setItem(
              "instructor-apply",
              JSON.stringify({
                ...informations,
                id: user.id,
                cvPic: url,
                accepted: accepted,
              })
            );
            commit("LOADER", false);
          });
        });
      });
    },
    // get-instructor-information
    getUserInstructor: async ({ commit }, { id }) => {
      const q = query(collection(db, "instructors"), where("id", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        commit("INSTURACTOR_INFORMATION", doc.data());
      });
    },
    // add-course
    addCourse: async (
      { commit },
      {
        id,
        categoryCourse,
        backgroundImage,
        information,
        courseName,
        instructor,
      }
    ) => {
      commit("SET_BUTTON_LOADER", true);
      const storage = getStorage();
      const storageRef = await ref(
        storage,
        `${categoryCourse}/${
          Math.random((91000000 * 5405465312) / 950000) + backgroundImage.name
        }`
      );
      await uploadBytesResumable(
        storageRef,
        backgroundImage,
        backgroundImage
      ).then(() => {
        getDownloadURL(storageRef).then((url) => {
          const { email, firstName, lastName, userimage } = instructor;
          commit("SET_BUTTON_LOADER", false);
          axios
            .post(`/${categoryCourse}/${id}.json`, {
              ...information,
              userid: id,
              backgroundImage: url,
              courseName: courseName,
              Email: email,
              FirstName: firstName,
              LastName: lastName,
              userimage: userimage,
              categoryCourse: categoryCourse,
            })
            .then(() => {
              commit("SET_BUTTON_LOADER", false);
            });
        });
      });
    },
  },
  modules: {
    admin: AdminStore,
  },
});
