<template>
  <div class="row">
    <div class="column">
      <h4>Hi {{ store.getInfo.nome }} {{ store.getInfo.cognome }},</h4>
    </div>
  </div>
  <div class="row">
    <div class="column">
      <TableComponent title="Users" :columns="columnsUsers" />
    </div>
    <div class="column q-pl-sm">
      <TableComponent title="Items" :columns="columnsItems" :rows="rowsItems" />
    </div>
    <div class="column q-pl-sm q-pt-sm">
      <CreateDash />
    </div>
  </div>
</template>
<script setup>
import CreateDash from "../components/CreateDash.vue";
import TableComponent from "../components/TableComponent.vue";
import { userStore } from "../stores/user.js";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { ref, onBeforeMount } from "vue";
const store = userStore();
const db = getFirestore();
const querySnapshotItems = ref(null);
const querySnapshotUsers = ref(null);
let rowsItems = ref([]);
let rowsUsers = ref([]);

const columnsItems = ref([
  {
    name: "id",
    label: "Id",
    field: "id",
    align: "center",
  },
  {
    name: "name",
    label: "Name",
    field: "name",
    align: "center",
  },
  {
    name: "quantity",
    label: "Quantity",
    field: "quantity",
    align: "center",
  },
  {
    name: "price",
    label: "Price",
    field: "price",
    align: "center",
  },
]);

const columnsUsers =
  ref[
    [
      {
        name: "name",
        label: "name",
        field: "name",
        align: "center",
      },
    ]
  ];

async function getAllItems() {
  querySnapshotItems.value = await getDocs(collection(db, "items"));
  querySnapshotItems.value.forEach((doc) => {
    let obj = {
      id: doc.id,
      img: doc.image,
      name: doc.data().name,
      quantity: doc.data().quantity,
      price: doc.data().price,
    };
    rowsItems.value.push(obj);
  });
}
async function geatAllUsers() {}

onBeforeMount(() => {
  getAllItems();
});
</script>
