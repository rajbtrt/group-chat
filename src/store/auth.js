import { defineStore } from "pinia";
import authService from "../service/authService";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    errors: null,
    user: {},
  }),
  getters: {
    currentUser(state) {
      return state.user;
    },
  },
  actions: {
    /**
     * Attempt to login a user
     * @param {object} credintials
     */
    async register(credintials) {
      return new Promise((resolve) => {
        authService
          .register(credintials)
          .then((res) => {
            resolve(res);
          })
          .catch(({ response }) => {
            this.errors = response;
          });
      });
    },

    async getCurrentUser() {
      authService.getCurrentUser();
    },
  },
});
