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

        <div class="q-py-md">
          <!--<q-btn color="purple" label="Account Settings">-->
          <q-icon class="fas fa-user" style="cursor: pointer;" size="20px">
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

                  <q-btn color="primary" label="Logout" push size="sm" v-close-popup />
                </div>
              </div>
            </q-menu>
          </q-icon>
          <!--</q-btn>-->
        </div>
      </q-toolbar>
    </q-header>

    <div v-if="store.userRole == 'admin'">
      <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
        <q-list>
          <q-item-label header> Dashboard </q-item-label>

          <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
        </q-list>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </div>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { userStore } from "stores/user.js";
import EssentialLink from "components/EssentialLink.vue";

const store = userStore();
let text = ref('')
const leftDrawerOpen = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
const linksList = [];
</script>
