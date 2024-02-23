<template>
  <div class="q-pa-md">
    <q-btn color="black" :label="stringChange" @click="goLogin()">
      <q-menu>
        <div class="row no-wrap q-pa-md" v-show="doNotShow">
          <div class="column items-center">
            <div
              class="text-subtitle1 text-weight-medium text-center text-capitalize"
              style="border-bottom: 10px"
            >
              {{ getName.nome }} {{ getName.cognome }}
            </div>

            <q-btn
              color="primary"
              label="Logout"
              push
              size="sm"
              @click="logOut()"
              v-close-popup
            />
          </div>
        </div>
      </q-menu>
    </q-btn>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { userStore } from "src/stores/user";
import { computed } from "vue";
const store = userStore();
const route = useRouter();
const stringChange = computed(() => {
  return store.loginStatus ? "Account" : "Login";
});

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
  store.logOut();
};
</script>
