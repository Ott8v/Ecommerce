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
      @row-click="(index) => clickRow(index)"
    />
  </div>
</template>
<script setup>
defineProps({
  title: String,
  columns: Array,
  rows: Array,
  style: Object,
  clickRow: { type: Function, require: false, default: () => {} },
});
</script>
