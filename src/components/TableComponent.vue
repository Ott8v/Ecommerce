<template>
  <div>
    <q-table
      :style="style"
      flat
      bordered
      :title="title"
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
defineProps({ title: String, columns: Array, rows: Array, style: Object });
</script>
