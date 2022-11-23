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
  orderBy,
  query,
} from "firebase/firestore";
const db = getFirestore(firebaseInitConfig);

export default {
  sendMessage(messageDetails, groupID) {
    return addDoc(
      collection(db, "messages", groupID, "message"),
      messageDetails
    )
      .then((res) => {
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getAllMessageOfGroup(groupID) {
    const q = query(
      collection(db, "messages", groupID, "message"),
      orderBy("sentAt")
    );
    return new Promise((resolve) => {
      onSnapshot(q, (querySnapshot) => {
        resolve(querySnapshot);
      });
    });
  },
};
