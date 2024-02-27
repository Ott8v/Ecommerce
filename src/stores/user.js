import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const userStore = defineStore(
  "user",
  () => {
    let userInfo = ref({});
    let isLogged = ref(false);
    let role = ref("");

    const giveInfo = (obj) => {
      userInfo.value = obj;
    };
    const logIn = () => {
      isLogged.value = true;
    };
    const logOut = () => {
      isLogged.value = false;
      userInfo.value = {};
      role.value = "";
    };
    const giveRole = (value) => {
      role.value = value;
    };

    const loginStatus = computed(() => isLogged.value);
    const getInfo = computed(() => userInfo.value);
    const userRole = computed(() => role.value);

    return {
      userInfo,
      isLogged,
      role,
      loginStatus,
      giveInfo,
      getInfo,
      logIn,
      logOut,
      giveRole,
      userRole,
    };
  },
  { persist: true }
);
