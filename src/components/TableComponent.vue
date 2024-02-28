<template>
  <div class="q-pa-md">
    <q-table
      style="height: 400px"
      flat
      bordered
      ref="tableRef"
      title="Treats"
      :rows="rows"
      :columns="columns"
      :table-colspan="9"
      row-key="index"
      virtual-scroll
      :virtual-scroll-item-size="48"
      :pagination="pagination"
      :rows-per-page-options="[0]"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th />

          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props" :key="`m_${props.row.index}`">
          <q-td> Index: {{ props.row.index }} </q-td>

          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr
          :props="props"
          :key="`e_${props.row.index}`"
          class="q-virtual-scroll--with-prev"
        >
          <q-td colspan="100%">
            <div class="text-left">
              This is the second row generated from the same data:
              {{ props.row.name }} (Index: {{ props.row.index }}).
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

const columns = [
  {
    name: "desc",
    required: true,
    label: "Dessert (100g serving)",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
];

const seed = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
];

const seedSize = seed.length;

let rows = [];
for (let i = 0; i < 1000; i++) {
  rows = rows.concat(
    seed.map((r, j) => ({ ...r, index: i * seedSize + j + 1 }))
  );
}

export default {
  setup() {
    const tableRef = ref(null);

    onMounted(() => {
      tableRef.value.scrollTo(5000);
    });

    return {
      tableRef,

      columns,
      rows,

      pagination: {
        rowsPerPage: 0,
      },
    };
  },
};
</script>
