import { defineStore } from "pinia";
import authService from "../service/authService";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    errors: null,
  }),
  getters: {},
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

    async login(credintials) {
      return new Promise((resolve) => {
        authService
          .login(credintials)
          .then((res) => {
            resolve(res);
          })
          .catch(({ response }) => {
            this.errors = response;
          });
      });
    },

    async logout() {
      return new Promise((resolve) => {
        authService
          .signOut()
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
