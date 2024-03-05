<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title style="cursor: pointer;" @click="route.push({ name: 'home' })"> Ecommerce </q-toolbar-title>
        <q-input dark dense standout v-model="text" input-class="text-right">
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>

        <q-icon class="fas fa-cart-shopping q-mx-lg" @click="cart()" style="cursor: pointer;" size="20px" />
        <AccountMenu />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { userStore } from "stores/user.js";
import AccountMenu from "components/AccountMenu.vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const route = useRouter();
const store = userStore();
const $q = useQuasar();
let text = ref('')

function cart() {
  if (store.isLogged) {
    route.push({ name: 'cart' })
  } else {
    $q.notify({
      message: "You need to be logged in to view your cart",
      color: "red",
      timeout: 2000,
      position: "top",
    });
  }
}
</script>
