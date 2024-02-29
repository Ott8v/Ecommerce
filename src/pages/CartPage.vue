<template>
  <q-page v-if="loading" class="flex flex-center">
    <q-spinner-bars size="100px" color="primary" />
  </q-page>
</template>

<script setup>
import { ref } from "vue";

let loading = ref(true)

</script>
