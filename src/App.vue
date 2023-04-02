<template lang="">
  <div>
    <div class="form-container">
      <form @submit.prevent action="">
        <input v-model="id" type="text" placeholder="Enter your unique id" />
        <input
          v-model="password"
          type="text"
          placeholder="Enter your password"
        />
        <div v-if="isLoading">Loading...</div>
        <button class="submit" @click="submit">Login</button>
        <button class="logout" id="red" @click="logout">Logout</button>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { useAuthStore } from "./store/auth";
export default {
  data() {
    return {
      id: "",
      password: "",
      isLoggedIn: true,
      isLoading: false,
    };
  },
  methods: {
    submit() {
      this.isLoading = true;
      axios
        .post(
          "http://3.80.215.203/api/login",
          {
            unique_id: this.id,
            password: this.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          const store = useAuthStore();
          if (response.status === 200 || response.response?.data === 200) {
            store.setAuthStatus();
            this.isLoggedIn = store.getIsLoggedIn;
            let isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
            if (isLoggedIn == "" || !isLoggedIn) {
              localStorage.setItem(
                "isLoggedIn",
                JSON.stringify(this.isLoggedIn)
              );
            }
          }
          alert("You've successfully logged in");
          this.isLoading = false;
        })
        .catch((error) => {
          console.log(error);
          this.isLoading = false;
          alert(`${error.message}`);
        });
    },
    logout() {
      axios
        .get("http://3.80.215.203/api/logout")
        .then((data) => alert(data))
        .catch((error) => alert(error));
    },
  },
  mounted() {
    const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
    if (!isLoggedIn) {
      return;
    } else {
      const store = useAuthStore();
      store.setAuthStatus(isLoggedIn);
    }
  },
};
</script>
<style lang=""></style>
