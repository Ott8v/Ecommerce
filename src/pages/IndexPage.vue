<template>
  <q-page v-if="itemsLength > 0" class="flex flex-center">
    {{ itemsLength }}
  </q-page>
  <q-page v-else class="flex flex-center">
    <q-card dark bordered class="bg-primary my-card">
      <q-card-section>
        <div class="text-h6">Welcome to the Ecommerce App</div>
      </q-card-section>

      <q-separator dark inset />

      <q-card-section>
        <div class="text-subtitle1">There aren't items in the database</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { onBeforeMount } from "vue";

// TODO: find a way for see if the collection have data inside it

const db = getFirestore();
const querySnapshot = ref(null);
const itemsLength = ref(null);

async function getAllItems() {
  querySnapshot.value = await getDocs(collection(db, "items"));
  console.log(querySnapshot.value.size);
  itemsLength.value = querySnapshot.value.size;
  querySnapshot.value.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // doc.id is the uid of the document - doc.data() is the data (obj) of the document
    console.log(doc.id, " => ", doc.data());
  });
}

//
// const itemsRef = ref(null);
// const docsSnap
// const number = ref(null);

// async function test() {
//   try {
//     itemsRef.value = collection(db, "items");
//     docsSnap.value = await getDocs(itemsRef);
//     number.value = await getCountFromServer(itemsRef);

//     console.log('count: ', snapshot.data().count);
//     docsSnap.value.forEach((doc) => {
//       console.log(doc.id, " => ", doc.data());
//     });
//   } catch (error) {
//     console.log(error)
//   }
// }

onBeforeMount(() => {
  console.log("ciao");
  getAllItems();
});
</script>

<style lang="sass" scoped>
.my-card
  text-align: center
  width: 100%
  max-width: 20%
</style>
