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
  limit,
  startAfter,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
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
      orderBy("sentAt", "desc"),
      limit(10)
    );
    return new Promise((resolve) => {
      onSnapshot(q, (querySnapshot) => {
        resolve(querySnapshot);
      });
    });
  },

  async getLoaderMessages(groupID) {
    let lastVisible = "";
    const first = query(
      collection(db, "messages", groupID, "message"),
      orderBy("sentAt", "desc"),
      limit(10)
    );
    await getDocs(first).then((res) => {
      lastVisible = res.docs[res.docs.length - 1];
    });
    return getDocs(
      query(
        collection(db, "messages", groupID, "message"),
        orderBy("sentAt", "desc"),
        startAfter(lastVisible),
        limit(10)
      )
    );
  },

  uploadFile(file) {
    const storage = getStorage();
    const storageRef = ref(storage, `images/${file.name}`);
    return uploadBytes(storageRef, file).then((snapshot) => {
      return snapshot;
    });
  },
};
