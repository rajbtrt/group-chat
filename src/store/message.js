import { defineStore } from "pinia";
import { firebaseInitConfig } from "../helpers/firebaseConfig";
import messageService from "../service/messageService";
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
  getDoc,
} from "firebase/firestore";
const db = getFirestore(firebaseInitConfig);

export const useMessageStore = defineStore({
  id: "message",
  state: () => ({
    errors: null,
    groupMessage: [],
  }),
  getters: {
    getGroupMessage(state) {
      return state.groupMessage;
    },
  },
  actions: {
    async fetchAllMessageOfGroup(groupID) {
      return new Promise((resolve) => {
        messageService
          .getAllMessageOfGroup(groupID)
          .then((doc) => {
            console.log(doc);
            doc.forEach((res) => {
              this.groupMessage.push({ id: res.id, ...res.data() });
              resolve(res);
            });
          })
          .catch(({ response }) => {
            this.errors = response;
          });
      });
    },

    async sendMessage(messageDetails, groupID) {
      return new Promise((resolve) => {
        messageService
          .sendMessage(messageDetails, groupID)
          .then((res) => {
            resolve(res);
          })
          .catch(({ response }) => {
            this.errors = response;
          });
      });
    },

    // async getNewMessage(groupID) {
    //   const q = collection(
    //     db,
    //     "messages",
    //     groupID,
    //     "message",
    //     orderBy("sentAt")
    //   );
    //   return new Promise((resolve) => {
    //     onSnapshot(q, (querySnapshot) => {
    //       querySnapshot.forEach((doc) => {
    //         console.log(doc);
    //       });
    //     });
    //   });
    // },
  },
});
