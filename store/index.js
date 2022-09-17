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
    // google signup
    // GoogleSignUp() {
    //   const provider = new GoogleAuthProvider();
    //   signInWithPopup(auth, provider).catch(function (error) {
    //     // An error happened.
    //     if (error.code === "auth/account-exists-with-different-credential") {
    //       // User's email already exists.
    //       // The pending Google credential.
    //       var pendingCred = error.credential;
    //       // The provider account's email address.
    //       var email = error.email;
    //       // Get sign-in methods for this email.
    //       auth.fetchSignInMethodsForEmail(email).then(function (methods) {
    //         // Step 3.
    //         // If the user has several sign-in methods,
    //         // the first method in the list will be the "recommended" method to use.
    //         if (methods[0] === "password") {
    //           // Asks the user their password.
    //           // In real scenario, you should handle this asynchronously.
    //           auth
    //             .signInWithEmailAndPassword(email)
    //             .then(function (result) {
    //               // Step 4a.
    //               return result.user.linkWithCredential(pendingCred);
    //             })
    //             .then(function () {
    //               // Google account successfully linked to the existing Firebase user.
    //             });
    //           return;
    //         }
    //         // All the other cases are external providers.
    //         // Construct provider object for that provider.
    //         // TODO: implement getProviderForProviderId.
    //         // At this point, you should let the user know that they already have an account
    //         // but with a different provider, and let them validate the fact they want to
    //         // sign in with this provider.
    //         // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
    //         // so in real scenario you should ask the user to click on a "continue" button
    //         // that will trigger the signInWithPopup.
    //         auth.signInWithPopup(provider).then(function (result) {
    //           // Remember that the user may have signed in with an account that has a different email
    //           // address than the first one. This can happen as Firebase doesn't control the provider's
    //           // sign in flow and the user is free to login using whichever account they own.
    //           // Step 4b.
    //           // Link to Google credential.
    //           // As we have access to the pending credential, we can directly call the link method.
    //           result.user
    //             .linkAndRetrieveDataWithCredential(pendingCred)
    //             .then(function () {
    //               // Google account successfully linked to the existing Firebase user.
    //             });
    //         });
    //       });
    //     }
    //   });
    //   // signInWithPopup(auth, provider)
    //   //   .then((res) => {
    //   //     const user = res.user;
    //   //     const credential = GoogleAuthProvider.credentialFromResult(res);
    //   //     const token = credential.accessToken;
    //   //     if (credential === token) {
    //   //       console.log("error");
    //   //     } else {
    //   //       setDoc(doc(db, "users", user.uid), {
    //   //         password: "",
    //   //         firstName: "",
    //   //         email: user.email,
    //   //         lastName: "",
    //   //         id: user.uid,
    //   //         userimage: user.photoURL,
    //   //         displayName: user.displayName,
    //   //         InstructorAccepted: false,
    //   //       }).then(() => {
    //   //         localStorage.setItem(
    //   //           "user-info",
    //   //           JSON.stringify({
    //   //             firstName: "",
    //   //             email: user.email,
    //   //             lastName: "",
    //   //             id: user.uid,
    //   //             userimage: user.photoURL,
    //   //           })
    //   //         );

    //   //         // router.push("/");
    //   //       });
    //   //     }
    //   //     console.log(credential, token);

    //   //     commit("SIGN_UP_WITH_FACEBOOK", {
    //   //       displayName: user.displayName,
    //   //       image: user.photoURL,
    //   //       email: user.email,
    //   //     });
    //   //     // router.push("/");
    //   //   })
    //   //   .catch((error) => {
    //   //     const credential = GoogleAuthProvider.credentialFromError(error);
    //   //     console.log(credential);
    //   //   });
    // },
    // log in With Google
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
              payload2: "Email Wrong or Password",
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
          const { Email, FirstName, LastName, userimage } = instructor;
          commit("SET_BUTTON_LOADER", false);
          axios
            .post(`/${categoryCourse}/${id}.json`, {
              ...information,
              userid: id,
              backgroundImage: url,
              courseName: courseName,
              Email: Email,
              FirstName: FirstName,
              LastName: LastName,
              userimage: userimage,
              categoryCourse: categoryCourse,
            })
            .then(() => {
              window.location.reload();
              commit("SET_BUTTON_LOADER", false);
            });
        });
      });
    },
    // get instr
  },
  modules: {
    admin: AdminStore,
  },
});
