import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const userStore = defineStore(
  "user",
  () => {
    let userInfo = ref({});
    let isLogged = ref(false);
    const loginStatus = computed(() => isLogged.value);
    const logIn = () => {
      isLogged.value = true;
    };
    const logOut = () => {
      isLogged.value = false;
    };
    return { userInfo, isLogged, loginStatus, logIn, logOut };
  },
  { persist: true }
);
