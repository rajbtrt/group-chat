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
    const q = query(
      collection(db, "chatroom"),
      where("uidgroupMembers", "array-contains", "2kQspY88uDViSTzmXqOZqfF1cqt2")
    );
    return getDocs(q);
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
