import { firebaseInitConfig } from "../helpers/firebaseConfig";
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
} from "firebase/firestore";
const db = getFirestore(firebaseInitConfig);

export default {
  // Create Group
  createGroup(groupDetails) {
    return addDoc(collection(db, "chatroom"), groupDetails)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // Get All Rooms
  getAllGroup() {
    return getDocs(collection(db, "chatroom"));
  },

  getGroup() {
    const docSnap = getDoc(doc(db, "chatroom", "kQ5LpdrLBIdkA6o8fpBV"));
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  },

  // Update Group Details
  updateGroup(groupID, groupDetails) {
    updateDoc(doc(db, "chatroom", groupID), groupDetails)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  // Delete Group
  deleteGroup(groupID) {
    deleteDoc(doc(db, "chatroom", groupID))
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
