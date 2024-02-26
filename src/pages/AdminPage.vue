<template>
  <h3>Hi {{ store.getInfo.nome }} {{ store.getInfo.cognome }},</h3>
  <CreateDash />
</template>
<script setup>
import CreateDash from "../components/CreateDash.vue";
import { userStore } from "../stores/user.js";
const store = userStore();
</script>
