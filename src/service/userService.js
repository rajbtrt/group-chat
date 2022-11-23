import { firebaseInitConfig } from "../helpers/firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getFirestore,
  onSnapshot,
  getDocs,
  getDoc,
} from "firebase/firestore";
const db = getFirestore(firebaseInitConfig);

export default {
  // Get Users
  getAllUsers() {
    return getDocs(collection(db, "users"));
  },

  // // Get Specific user
  // getUser() {
  //   const docSnap = getDoc(doc(db, "users", "mepU9STK7nZcw6kDmTMfhMkLu882"));
  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     console.log("No such document!");
  //   }
  // },

  // Get Current Logged In User
  async getCurrentUser() {
    const auth = getAuth();
    return new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        resolve(getDoc(doc(db, "users", user.uid)));
      });
    });
  },
};
