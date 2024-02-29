<template>
  <div class="q-ma-md">
    <q-table
      style="height: 400px; min-width: 200px; max-width: 600px; width: 600px"
      flat
      bordered
      title="Items"
      :rows="rows"
      :columns="columns"
      virtual-scroll
      :rows-per-page-options="[0]"
    />
  </div>
</template>
<script setup>
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { ref, onBeforeMount } from "vue";
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
