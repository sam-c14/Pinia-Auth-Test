import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({ isLoggedIn: false }),
  getters: {
    getIsLoggedIn: (state) => state.isLoggedIn,
  },
  actions: {
    setAuthStatus(status = false) {
      this.isLoggedIn = status ? status : !this.isLoggedIn;
    },
  },
});
