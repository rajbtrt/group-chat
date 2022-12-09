import { defineStore } from "pinia";
import groupService from "../service/groupService";

export const useGroupStore = defineStore({
  id: "group",
  state: () => ({
    errors: null,
    allGroup: [],
  }),
  getters: {
    getAllGroup(state) {
      return state.allGroup;
    },
  },
  actions: {
    async fetchAllGroup() {
      this.allGroup = [];
      return new Promise((resolve) => {
        groupService
          .getAllGroup()
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
          .getGroup(userID)
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
  },
});
