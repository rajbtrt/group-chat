import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
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
        credintials.uid = userCredintials.user.uid;
        try {
          return setDoc(doc(db, "users", uid), credintials).then((res) => {
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

  // Register
  login(credintials) {
    const auth = getAuth();
    return signInWithEmailAndPassword(
      auth,
      credintials.email,
      credintials.password
    )
      .then(() => {
        return "User Logged in";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  },

  signOut() {
    const auth = getAuth();
    return signOut(auth)
      .then(() => {
        return "User Logged out";
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
