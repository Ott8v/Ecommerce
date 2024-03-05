<template>
  <div class="row q-pt-md items-center">
    <div class="col-grow q-pl-sm items-center">
      <TableComponent
        title="Items"
        :columns="columnsItems"
        :rows="rowsItems"
        :style="styleItems"
      />
    </div>
    <div class="col-grow q-pl-sm items-center">
      <TableComponent
        title="Users"
        :columns="columnsUsers"
        :rows="rowsUsers"
        :style="styleUsers"
      />
    </div>
    <div class="col-grow q-pl-sm items-center">
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

const styleItems = ref({
  height: "530px",
  minWidth: "200px",
});

const styleUsers = ref({
  height: "530px",
  minWidth: "200px",
});

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

const columnsUsers = ref([
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
    name: "surname",
    label: "Surname",
    field: "surname",
    align: "center",
  },
]);

async function getAllItems() {
  querySnapshotItems.value = await getDocs(collection(db, "items"));
  querySnapshotItems.value.forEach((doc) => {
    let obj = {
      id: doc.id,
      name: doc.data().name,
      img: doc.data().image,
      quantity: doc.data().quantity,
      price: doc.data().price,
    };
    rowsItems.value.push(obj);
  });
}
async function geatAllUsers() {
  querySnapshotUsers.value = await getDocs(collection(db, "users"));
  querySnapshotUsers.value.forEach((doc) => {
    let obj = {
      id: doc.id,
      name: doc.data().name,
      surname: doc.data().surname,
    };
    rowsUsers.value.push(obj);
  });
}

onBeforeMount(() => {
  getAllItems();
  geatAllUsers();
});
</script>
