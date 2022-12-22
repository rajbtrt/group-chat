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
  getDoc,
  query,
  where,
  arrayUnion,
  orderBy,
} from "firebase/firestore";
const db = getFirestore(firebaseInitConfig);

export default {
  // Create Group
  createGroup(groupDetails) {
    return addDoc(collection(db, "chatroom"), groupDetails)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  },

  joinGroup(groupCode, currentUser) {
    return getDocs(
      query(collection(db, "chatroom"), where("groupCode", "==", groupCode))
    ).then((res) => {
      res.forEach((response) => {
        const Ref = doc(db, "chatroom", response.id);
        updateDoc(washingtonRef, {
          groupMembers: arrayUnion(currentUser),
        });
      });
    });
  },

  // Get All Rooms
  readAllGroup() {
    return getDocs(collection(db, "chatroom"));
  },

  readGroup(userID) {
    const q = query(
      collection(db, "chatroom"),
      where("groupMembers", "array-contains", userID)
    );
    return new Promise((resolve) => {
      onSnapshot(q, (querySnapshot) => {
        // console.log(querySnapshot);
        resolve(querySnapshot);
      });
    });
  },

  // Update Group Details
  updateGroup(groupID, data) {
    return updateDoc(doc(db, "chatroom", groupID), data);
  },

  // Update Group Details
  updateSeenByField(groupID, data) {
    const q = doc(db, "chatroom", groupID, "seen", data.uid);
    return setDoc(q, { lastSeen: data.lastSeen });
  },

  readLastSeen(groupID) {
    const q = collection(db, "chatroom", groupID, "seen");
    return getDocs(q);
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
