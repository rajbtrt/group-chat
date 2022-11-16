import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { firebaseInitConfig } from "../helpers/firebaseConfig";
import { collection, doc, setDoc, getFirestore } from "firebase/firestore";
const db = getFirestore(firebaseInitConfig);

export default {
  // Register
  register(credintials) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(
      auth,
      credintials.email,
      credintials.password
    )
      .then((userCredintials) => {
        let uid = userCredintials.user.uid;
        try {
          return setDoc(doc(db, "users", uid), {
            email: credintials.email,
          }).then((res) => {
            return "user registerd";
          });
        } catch (err) {
          console.error("writeToDB failed. reason :", err);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  },

  getCurrentUser() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        return user;
      } else {
        return {};
      }
    });
  },
};
