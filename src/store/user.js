import { defineStore } from "pinia";
import userService from "../service/userService";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    errors: null,
    usersList: [],
    currentUser: "",
    groupMembersDetails: [],
  }),
  getters: {
    getUserslist(state) {
      return state.usersList;
    },
    getCurrentUser(state) {
      return state.currentUser;
    },
    getGroupMembersDetails(state) {
      return state.groupMembersDetails;
    },
  },
  actions: {
    async fetchAllUsers() {
      return new Promise((resolve) => {
        userService
          .getAllUsers()
          .then((doc) => {
            doc.forEach((res) => {
              this.usersList.push(res.data());
              resolve(res);
            });
          })
          .catch(({ response }) => {
            this.errors = response;
          });
      });
    },

    async fetchUser(userID) {
      this.groupMembersDetails = [];
      return new Promise((resolve) => {
        userService
          .getUser(userID)
          .then((doc) => {
            doc.forEach((res) => {
              this.groupMembersDetails.push(res.data());
              resolve(res);
            });
          })
          .catch(({ response }) => {
            this.errors = response;
          });
      });
    },

    async fetchCurrentUser() {
      return new Promise((resolve) => {
        userService
          .getCurrentUser()
          .then((doc) => {
            this.currentUser = doc.data();
            resolve(doc);
          })
          .catch(({ response }) => {
            this.errors = response;
          });
      });
    },
  },
});
