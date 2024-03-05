<template>
  <q-dialog persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="fa-solid fa-box" color="primary" text-color="white" />
        <span class="q-ml-sm">Do you want to delete the Item Hello </span>
      </q-card-section>

      <!-- Notice v-close-popup -->
      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          flat
          label="Delete element"
          color="red"
          @click="dl"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
defineProps({
  obj: Object,
  dl: { type: Function, require: false, default: () => {} },
});
</script>
