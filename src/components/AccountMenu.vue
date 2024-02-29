<template>
  <div class="q-pa-md">
    <q-icon class="fas fa-user" style="cursor: pointer;" size="20px" @click="goLogin()">
      <q-menu>
        <div class="row no-wrap q-pa-md" v-show="doNotShow">
          <div class="column items-center">
            <div class="text-subtitle1 text-weight-medium text-center text-capitalize" style="border-bottom: 10px">
              {{ getName.name }} {{ getName.surname }}
            </div>

            <q-btn color="primary" label="Logout" push size="sm" @click="logOut()" v-close-popup />
          </div>
        </div>
      </q-menu>
    </q-icon>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { userStore } from "src/stores/user";
import { computed } from "vue";
import { getAuth, signOut } from "firebase/auth";

const store = userStore();
const route = useRouter();

const doNotShow = computed(() => {
  return store.loginStatus;
});

const getName = computed(() => {
  return store.getInfo;
});

const goLogin = () => {
  if (!store.loginStatus) {
    route.push({ name: "login" });
  }
};

const logOut = () => {

  const auth = getAuth();
  signOut(auth)
    .then(() => {
      store.logOut();
      route.push({ name: "home" });
    })
    .catch((error) => {
      console.log(error);
    });
};
</script>
