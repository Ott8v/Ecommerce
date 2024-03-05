<template>
  <div class="row q-pt-md items-center">
    <div class="col-grow q-pl-sm items-center">
      <TableComponent
        title="Items"
        :columns="columnsItems"
        :rows="rowsItems"
        :style="styleItems"
        :clickRow="popUp"
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
  <RowPopUp v-model="dialog" :obj="content" :dl="deleteItem" />
</template>

<script setup>
import CreateDash from "../components/CreateDash.vue";
import TableComponent from "../components/TableComponent.vue";
import RowPopUp from "src/components/RowPopUp.vue";
import {
  collection,
  getDocs,
  getFirestore,
  deleteDoc,
} from "firebase/firestore";
import { ref, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
const db = getFirestore();
const $q = useQuasar();
const querySnapshotItems = ref(null);
const querySnapshotUsers = ref(null);
let rowsItems = ref([]);
let rowsUsers = ref([]);
let dialog = ref(false);
let content = ref({});
let ind = ref({});

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

function popUp(row, index) {
  if (dialog.value == true) {
    dialog.value = false;
  }
  dialog.value = true;
  content.value = row;
  ind.value = index;
}

async function deleteItem() {
  try {
    await deleteDoc(doc(db, "items", content.value.id));
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Item deleted",
    });
  } catch (err) {
    $q.notify({
      type: "negative",
      message: "An error occured when deleting item",
    });
  }
}

onBeforeMount(() => {
  getAllItems();
  geatAllUsers();
});
</script>
