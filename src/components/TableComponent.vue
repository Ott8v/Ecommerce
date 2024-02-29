<template>
  <div>
    <q-table
      style="height: 530px; min-width: 200px; max-width: 600px; width: 600px"
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
defineProps({ title: String, columns: Array, rows: Array });
</script>
