<template>
  <div class="q-ma-md">
    <q-table
      style="height: 400px; min-width: 200px; max-width: 600px; width: 600px"
      flat
      bordered
      title="Items"
      :rows="rows"
      :columns="columns"
      virtual-scroll
      :rows-per-page-options="[0]"
    />
  </div>
</template>
<script setup>
defineProps({ columns: Array, rows: Array });
</script>
