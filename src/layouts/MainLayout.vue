<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn v-show="store.userRole == 'admin'" flat dense round icon="menu" aria-label="Menu"
          @click="toggleLeftDrawer" />

        <q-toolbar-title> Ecommerce </q-toolbar-title>
        <q-input dark dense standout v-model="text" input-class="text-right">
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>

        <q-icon class="fas fa-cart-shopping q-mx-lg" style="cursor: pointer;" size="20px" />
        <AccountMenu />
      </q-toolbar>
    </q-header>

    <q-drawer v-if="store.userRole == 'admin'" v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Dashboard </q-item-label>

        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { userStore } from "stores/user.js";
import EssentialLink from "components/EssentialLink.vue";
import AccountMenu from "components/AccountMenu.vue";

const store = userStore();
let text = ref('')
const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
const linksList = [];
</script>
