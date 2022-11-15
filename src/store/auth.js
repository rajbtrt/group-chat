// @ts-check
import { defineStore } from "pinia";
import authService from "../service/authService";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    errors: null,
    user: {},
    // Authenticated: !!jwtService.getToken(),
  }),
  getters: {
    currentUser(state) {
      return state.user;
    },
    isAuthenticated(state) {
    //   return state.Authenticated;
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
        //   .then((res) => {
        //     console.log(res);
        //   })
        //   .catch(({ response }) => {
        //     this.errors = response;
        //   });
      });
    },
  },
});
