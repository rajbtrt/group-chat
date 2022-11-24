import { defineStore } from "pinia";
import { firebaseInitConfig } from "../helpers/firebaseConfig";
import messageService from "../service/messageService";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
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

    async getNewMessage(groupID) {
      const q = collection(db, "messages", groupID, "message");
      return new Promise((resolve) => {
        onSnapshot(q, (querySnapshot) => {
          if (querySnapshot.docChanges().length <= 1) {
            querySnapshot.docChanges().forEach((res) => {
              this.groupMessage.push({ id: res.doc.id, ...res.doc.data() });
            });
          }
        });
      });
    },
  },
});
