<template>
  <q-page v-if="loading" class="flex flex-center">
    <q-spinner-bars size="100px" color="primary" />
  </q-page>
  <q-page v-else>

  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { userStore } from "stores/user.js";
import { useRouter } from "vue-router";

let loading = ref(true)
let cartItems = ref([])
const store = userStore();
const route = useRouter();
const db = getFirestore();

onBeforeMount(() => {
  if (!store.isLogged) {
    route.push({ name: "home" });
  }

  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      //TODO: get cart items and do the cart
      docSnap.data().cart.forEach((item) => {
        cartItems.value.push(item)
      })
      console.log(cartItems.value)
      loading.value = false
    }
  })
})
</script>
