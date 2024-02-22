import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const userStore = defineStore(
  "user",
  () => {
    let userInfo = ref({});
    let isLogged = ref(false);
    let role = ref("");
    const loginStatus = computed(() => isLogged.value);
    const logIn = () => {
      isLogged.value = true;
    };
    const logOut = () => {
      isLogged.value = false;
    };

    const giveRole = (value) => {
      role.value = value;
    };
    const userRole = computed(() => role.value);

    return {
      userInfo,
      isLogged,
      role,
      loginStatus,
      logIn,
      logOut,
      giveRole,
      userRole,
    };
  },
  { persist: true }
);
