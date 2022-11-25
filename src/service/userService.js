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
  query,
  where,
} from "firebase/firestore";
const db = getFirestore(firebaseInitConfig);

export default {
  // Get Users
  getAllUsers() {
    return getDocs(collection(db, "users"));
  },

  // Get Specific user
  getUser(userID) {
    const q = query(collection(db, "users"), where("uid", "in", userID));
    return getDocs(q);
  },

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
