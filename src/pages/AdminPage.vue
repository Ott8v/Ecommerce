<template>
  <div class="row">
    <div class="column q-px-lg">
      <h3>Hi {{ store.getInfo.nome }} {{ store.getInfo.cognome }},</h3>
      <p>
        Welcome to the admin page. Here you can create/delete and update items.
      </p>
    </div>
    <div class="column q-pt-xl q-px-lg">
      <label>Create Item</label>
      <CreateDash />
    </div>
    <div class="column">
      <TableComponent />
    </div>
  </div>
</template>
<script setup>
import CreateDash from "../components/CreateDash.vue";
import TableComponent from "../components/TableComponent.vue";
import { userStore } from "../stores/user.js";
const store = userStore();
</script>
