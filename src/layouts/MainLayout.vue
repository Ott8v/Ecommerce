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

        <q-icon class="fas fa-cart-shopping q-mx-lg" @click="route.push({ name: 'cart' })" style="cursor: pointer;"
          size="20px" />
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

const route = useRouter();
let text = ref('')
</script>
