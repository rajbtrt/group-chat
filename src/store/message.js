import { defineStore } from "pinia";
import { firebaseInitConfig } from "../helpers/firebaseConfig";
import messageService from "../service/messageService";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { getStorage, getDownloadURL } from "firebase/storage";
import { ref as fbRef } from "firebase/storage";

const db = getFirestore(firebaseInitConfig);
const storage = getStorage();

export const useMessageStore = defineStore({
  id: "message",
  state: () => ({
    errors: null,
    groupMessage: [],
  }),
  getters: {
    getGroupMessage(state) {
      state.groupMessage.map((res) => {
        if (res.type === "video/mp4" || res.type === "image/png" || res.type === "audio/mpeg") {
          getDownloadURL(fbRef(storage, res.messageText)).then((url) => {
            res.messageText = url;
          });
        }
      });
      return state.groupMessage;
    },
  },
  actions: {
    async fetchAllMessageOfGroup(groupID) {
      this.groupMessage = [];
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

    async getLoadMessage(groupID) {
      return new Promise((resolve) => {
        messageService
          .getLoaderMessages(groupID)
          .then((doc) => {
            doc.forEach((res) => {
              console.log(res.data());
              this.groupMessage.push({ id: res.id, ...res.data() });
              resolve(res);
            });
          })
          .catch(({ response }) => {
            this.errors = response;
          });
      });
    },

    async UploadImage(file) {
      return new Promise((resolve) => {
        messageService
          .uploadFile(file)
          .then((doc) => {
            resolve(doc);
          })
          .catch(({ response }) => {
            this.errors = response;
          });
      });
    },
  },
});
