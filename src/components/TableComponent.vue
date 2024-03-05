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
      @row-click="(evt, row, index) => clickRow(row, index)"
    />
  </div>
</template>
<script setup>
defineProps({
  title: String,
  columns: Array,
  rows: Array,
  style: { type: Object, require: false, default: () => {} },
  clickRow: { type: Function, require: false, default: () => {} },
});
</script>
