import { defineStore } from "pinia";
import groupService from "../service/groupService";
import { firebaseInitConfig } from "../helpers/firebaseConfig";

import {
  collection,
  onSnapshot,
  query,
  getFirestore,
  where,
  orderBy,
} from "firebase/firestore";

const db = getFirestore(firebaseInitConfig);

export const useGroupStore = defineStore({
  id: "group",
  state: () => ({
    errors: null,
    allGroup: [],
    lastSeen: [],
  }),
  getters: {
    getAllGroup(state) {
      return state.allGroup;
    },
    getLastSeen(state) {
      return state.lastSeen;
    },
  },
  actions: {
    async fetchAllGroup() {
      this.allGroup = [];
      return new Promise((resolve) => {
        groupService
          .readAllGroup()
          .then((doc) => {
            doc.forEach((res) => {
              this.allGroup.push({ id: res.id, ...res.data() });
              resolve(res);
            });
          })
          .catch(({ response }) => {
            this.errors = response;
          });
      });
    },

    async fetchGroup(userID) {
      return new Promise((resolve) => {
        groupService
          .readGroup(userID)
          .then((doc) => {

            doc.forEach((res) => {
              this.allGroup.push({ id: res.id, ...res.data() });
              this.allGroup.sort(function(a,b){
                return new Date(b.createDate) - new Date(a.createDate);
              });
              // console.log(this.allGroup);
              resolve(res);
            });
          })
          .catch(({ response }) => {
            this.errors = response;
          });
      });
    },

    async fetchNewGroup(userID) {
      const q = query(
        collection(db, "chatroom"),
        where("groupMembers", "array-contains", userID)
      );
      return new Promise((resolve) => {
        onSnapshot(q, (querySnapshot) => {
          if (querySnapshot.docChanges().length <= 1) {
            querySnapshot.docChanges().forEach((res) => {
              this.allGroup.unshift({ id: res.doc.id, ...res.doc.data() });
            });
          }
        });
      });
    },

    async createGroup(groupDetails) {
      return new Promise((resolve) => {
        groupService
          .createGroup(groupDetails)
          .then((res) => {
            resolve(res);
          })
          .catch(({ response }) => {
            this.errors = response;
          });
      });
    },

    async updateGroup(groupID, data) {
      return new Promise((resolve) => {
        groupService
          .updateGroup(groupID, data)
          .then((res) => {
            resolve(res);
          })
          .catch(({ response }) => {
            this.errors = response;
          });
      });
    },

    async updateSeenByField(groupID, data) {
      return new Promise((resolve) => {
        groupService
          .updateSeenByField(groupID, data)
          .then((res) => {
            resolve(res);
          })
          .catch(({ response }) => {
            this.errors = response;
          });
      });
    },

    async deleteRoom(groupID) {
      return new Promise((resolve) => {
        groupService
          .deleteRoom(groupID)
          .then((res) => {
            resolve(res);
          })
          .catch(({ response }) => {
            this.errors = response;
          });
      });
    },

    async joinGroup(groupCode, userID) {
      return new Promise((resolve) => {
        groupService
          .joinGroup(groupCode, userID)
          .then((res) => {
            resolve(res);
          })
          .catch(({ response }) => {
            this.errors = response;
          });
      });
    },

    async fetchlastSeen(groupID) {
      return new Promise((resolve) => {
        groupService
          .readLastSeen(groupID)
          .then((doc) => {
            doc.forEach((res) => {
              this.lastSeen.push(res.data());
              resolve(res);
            });
          })
          .catch(({ response }) => {
            this.errors = response;
          });
      });
    },
  },
});
