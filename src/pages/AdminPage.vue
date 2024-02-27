<template>
  <div class="row">
    <div class="col">
      <h3>Hi {{ store.getInfo.nome }} {{ store.getInfo.cognome }},</h3>
      <p>
        Welcome to the admin page. Here you can create/delete and update items.
      </p>
    </div>
    <div class="col">
      <CreateDash />
    </div>
  </div>
</template>
<script setup>
import CreateDash from "../components/CreateDash.vue";
import { userStore } from "../stores/user.js";
const store = userStore();
</script>
