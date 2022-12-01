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
  limit
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
    // const q = query(
    //   collection(db, "messages", groupID, "message"),
    //   orderBy("sentAt")
    // );
    const q = query(
      collection(db, "messages", groupID, "message"),
      orderBy("sentAt" , "desc"), limit(10)
    );
    return new Promise((resolve) => {
      onSnapshot(q, (querySnapshot) => {
        resolve(querySnapshot);
      });
    });
  },
};
