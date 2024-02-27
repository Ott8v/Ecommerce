<template>
  <h3>Hi {{ store.getInfo.nome }} {{ store.getInfo.cognome }},</h3>
  <p>Welcome to the admin page. Here you can create/delete and update items.</p>
  <CreateDash />
</template>
<script setup>
import CreateDash from "../components/CreateDash.vue";
import { userStore } from "../stores/user.js";
const store = userStore();
</script>
