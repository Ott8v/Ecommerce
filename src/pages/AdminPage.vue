<template>
  <div class="row">
    <div class="col q-pl-lg">
      <h3>Hi {{ store.getInfo.nome }} {{ store.getInfo.cognome }},</h3>
      <p>
        Welcome to the admin page. Here you can create/delete and update items.
      </p>
    </div>
    <div class="col q-pt-xl">
      <CreateDash />
    </div>
  </div>
</template>
<script setup>
import CreateDash from "../components/CreateDash.vue";
import { userStore } from "../stores/user.js";
const store = userStore();
</script>
