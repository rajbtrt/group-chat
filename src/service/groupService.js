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
  query,
  where,
  arrayUnion,
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

  joinGroup(groupCode, currentUser) {
    return getDocs(
      query(collection(db, "chatroom"), where("groupCode", "==", groupCode))
    ).then((res) => {
      res.forEach((response) => {
        const washingtonRef = doc(db, "chatroom", response.id);
        updateDoc(washingtonRef, {
          groupMembers: arrayUnion(currentUser),
        });
      });
    });
  },

  // Get All Rooms
  getAllGroup() {
    return getDocs(collection(db, "chatroom"));
  },

  getGroup(userID) {
    const q = query(
      collection(db, "chatroom"),
      where("groupMembers", "array-contains", userID)
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
