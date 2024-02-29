<template>
  <div class="row">
    <div class="column q-px-lg">
      <h3>Hi {{ store.getInfo.nome }} {{ store.getInfo.cognome }},</h3>
      <p>
        Welcome to the admin page. Here you can create/delete and update items.
      </p>
    </div>
    <div class="column q-pt-xl q-px-md">
      <label>Create Item</label>
      <CreateDash />
    </div>
    <div class="column">
      <TableComponent :columns="columns" :rows="rows" />
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
const querySnapshot = ref(null);
let rows = ref([]);

async function getAllItems() {
  querySnapshot.value = await getDocs(collection(db, "items"));
  querySnapshot.value.forEach((doc) => {
    let obj = {
      id: doc.id,
      name: doc.data().name,
      quantity: doc.data().quantity,
      price: doc.data().price,
    };
    rows.value.push(obj);
  });
}
const columns = ref([
  {
    name: "id",
    label: "Id",
    field: "id",
  },
  {
    name: "name",
    label: "Name",
    field: "name",
  },
  {
    name: "quantity",
    label: "Quantity",
    field: "quantity",
  },
  {
    name: "price",
    label: "Price",
    field: "price",
  },
]);

onBeforeMount(() => {
  getAllItems();
});
</script>
