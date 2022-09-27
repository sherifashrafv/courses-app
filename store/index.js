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
  },
  actions: {
    // to login with face book
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
            router.push("/");
            window.scrollTo(0, 0);
            window.location.reload();
          });
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
          // router.push("/");
        })
        .catch((error) => {
          console.log(error);
          if (error.code == "auth/account-exists-with-different-credential") {
            commit("USER_EXIST", true);
          }
        });
    },
    //  create user-SignUpWithEmail-Password
    createUser: async (
      { commit },
      { email, password, userImage, lastName, name }
    ) => {
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
                router.push("/");
                window.scrollTo(0, 0);
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
        .catch((error) => {
          if (error.code == "auth/email-already-in-use") {
            commit("ERROR_HANDLE", {
              payload: true,
              payload2: "email already in use",
            });
          } else if (error.code == "auth/invalid-email") {
            commit("ERROR_HANDLE", {
              payload: true,
              payload2: "Wrong Email",
            });
          } else if (error.code == "auth/weak-password") {
            commit("ERROR_HANDLE", {
              payload: true,
              payload2: "Week Password",
            });
          }
        });
    },
    // log-in
    logIn: async ({ commit }, { email, password }) => {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const id = user.uid;
          localStorage.setItem("user-info", JSON.stringify({ id: id, email }));
          router.push("/");
          window.scrollTo(0, 0);
          window.location.reload();
        })
        .catch((error) => {
          console.log("error", error);
          if (error.code == "auth/wrong-password") {
            console.log("error", error);
            commit("ERROR_HANDLE", {
              payload: true,
              payload2: "Wrong Password",
            });
          }
          if (error.code == "auth/user-not-found") {
            commit("ERROR_HANDLE", {
              payload: true,
              payload2: "user not found",
            });
          }
          if (error.code == "auth/user-not-found") {
            commit("ERROR_HANDLE", {
              payload: true,
              payload2: "user not found",
            });
          }
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
          });
        });
      });
    },
    // get-instructor-information
    getUserInstructor: async ({ commit }, { id }) => {
      console.log(id);
      const q = query(collection(db, "instructors"), where("id", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
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
      console.log(instructor);
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
