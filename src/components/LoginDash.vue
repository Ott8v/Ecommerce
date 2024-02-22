<template>
  <div class="q-pa-md">
    <q-btn color="black" :label="stringChange" @click="goLogin()">
      <div v-show="doNotShow">
        <q-menu>
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Settings</div>
              <q-toggle v-model="mobileData" label="Use Mobile Data" />
              <q-toggle v-model="bluetooth" label="Bluetooth" />
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <img src="https://cdn.quasar.dev/img/avatar4.jpg" />
              </q-avatar>

              <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

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
      </div>
    </q-btn>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router";
import { userStore } from "src/stores/user";
import { computed } from "vue";
const store = userStore();
const route = useRoute();
const stringChange = computed(() => {
  return store.loginStatus ? "Account" : "Login";
});

const doNotShow = computed(() => {
  console.log(store.loginStatus);
  return store.loginStatus;
});

const goLogin = () => {
  if (!store.loginStatus) {
    route.push({ name: "login" });
  }
};
const logOut = store.logOut();
</script>
