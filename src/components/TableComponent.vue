<template>
  <div>
    <q-table
      style="height: 530px; min-width: 200px; max-width: 650px; width: 650px"
      flat
      bordered
      title="Items"
      :rows="rows"
      :columns="columns"
      virtual-scroll
      separator="cell"
      :pagination="{ rowsPerPage: 0 }"
      :rows-per-page-options="[0]"
    />
  </div>
</template>
<script setup>
defineProps({ columns: Array, rows: Array });
</script>
