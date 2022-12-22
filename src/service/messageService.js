import { firebaseInitConfig } from "../helpers/firebaseConfig";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getCountFromServer,
  getFirestore,
  onSnapshot,
  getDoc,
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

  getMessageCountOfGroup(groupID) {
    const q = collection(db, "messages", groupID, "message");
    return new Promise((resolve) => {
      const data = getCountFromServer(q);
      resolve(data);
    });
  },

  async getLoaderMessages(groupID, lastMsgID) {
    let lastVisible = "";
    const first = doc(db, "messages", groupID, "message", lastMsgID);
    await getDoc(first).then((res) => {
      console.log(res);
      lastVisible = res;
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
