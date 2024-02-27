<template>
  <q-page class="flex flex-center">

  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { collection, doc, getDocs, getFirestore, getCountFromServer } from "firebase/firestore";
import { onBeforeMount } from 'vue';

// TODO: find a way for see if the collection have data inside it

// const db = getFirestore();
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

// onBeforeMount(() => {
//   test()
// })
</script>
