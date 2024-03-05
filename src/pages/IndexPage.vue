<template>
  <q-page v-if="loading" class="flex flex-center">
    <q-spinner-bars size="100px" color="primary" />
  </q-page>

  <q-page style="min-height: 900px !important; max-height: 900px !important;" padding
    v-if="itemsLength > 0 && !loading">
    <q-infinite-scroll @load="onLoad" :offset="250">
      <div class="row justify-center">
        <div class="q-px-md q-py-md" v-for="item in items2" :key="item.uid">
          <q-card class="my-card">
            <!-- :src="item.data.image" -->
            <img src="https://cdn.quasar.dev/img/mountains.jpg" />

            <q-card-section>
              <div class="text-h6 name">
                {{ item.data.name }}</div>
            </q-card-section>

            <q-card-section class="q-pt-none desc">
              {{ item.data.description }}
            </q-card-section>

            <q-separator />
            <q-card-section style="display: flex; justify-content: space-between">
              <div class="text-subtitle2">In Stock: {{ item.data.quantity }}</div>
              <div class="text-subtitle2">Price: ${{ item.data.price }}</div>
            </q-card-section>
            <q-separator />
            <q-card-actions v-if="!admin" style="display: flex; justify-content: space-between">

              <q-input dense v-model.number="cartAdd[items2.indexOf(item)]" type="number" :max="item.data.quantity"
                label="Quantity" input-class="text-right" min="1" style="max-width: 80px;min-width: 80px" />

              <q-btn flat label="Add to Cart" color="primary" @click="addToCart(item)" />
            </q-card-actions>
            <q-card-actions v-else style="display: flex; justify-content: space-between">
              <q-btn flat label="Edit" color="primary" />
              <q-btn @click="Delete(item)" flat label="Delete" color="negative" />
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </q-infinite-scroll>
  </q-page>
  <q-page v-else-if="itemsLength < 1 && !loading" class="flex flex-center">
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
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, collection, deleteDoc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";
import { onBeforeMount } from "vue";
import { userStore } from "stores/user.js";
import { useQuasar } from "quasar";

const store = userStore();
const db = getFirestore();
const querySnapshot = ref(null);
const itemsLength = ref(0);
let items = ref([]);
let loading = ref(true);
let cartAdd = ref([]);
let items2 = ref([]);
let loadlength = 20;
let admin = ref(false)
const $q = useQuasar();

async function getAllItems() {
  querySnapshot.value = await getDocs(collection(db, "items"));
  itemsLength.value = querySnapshot.value.size;
  cartAdd.value = new Array(itemsLength.value);
  querySnapshot.value.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // doc.id is the uid of the document - doc.data() is the data (obj) of the document
    items.value.push({ uid: doc.id, data: doc.data() });
  });

  items2.value = items.value.slice(0, loadlength);

  loading.value = false;
}

function onLoad(index, done) {
  loadlength += 10;
  items2.value = items.value.slice(0, loadlength);
  if (loadlength >= itemsLength.value) {
    done(true);
  }
  done(false);
}

function Delete(item) {

  $q.dialog({
    dark: true,
    title: 'Confirm',
    message: 'Are you sure you want to delete this item? This action cannot be undone.',
    cancel: true,
    persistent: true
  }).onOk(async () => {

    const tempItem = JSON.parse(JSON.stringify(item))
    const tempItem2 = JSON.parse(JSON.stringify(items.value))

    let index = tempItem2.findIndex(o => o.uid === tempItem.uid);
    items2.value.splice(index, 1);

    await deleteDoc(doc(db, "items", item.uid));
  })

}

function addToCart(item) {
  const tempItem = JSON.parse(JSON.stringify(item))
  const tempItem2 = JSON.parse(JSON.stringify(items.value))

  let index = tempItem2.findIndex(o => o.uid === tempItem.uid);

  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      try {


        if (cartAdd.value[index] > 0) {
          const docRef = doc(db, "users", uid);
          const docSnap = await getDoc(docRef);
          await setDoc(docRef, {
            cart: { [tempItem.uid]: cartAdd.value[index] },
          }, { merge: true })
          $q.notify({
            message: "Item added to the cart.",
            color: "green",
            timeout: 2000,
            position: "top",
          });
        } else {
          $q.notify({
            message: "You need to add at least one item to the cart.",
            color: "red",
            timeout: 2000,
            position: "top",
          });
        }
      } catch (error) {

      }
    } else {
      $q.notify({
        message: "You need to be logged in to add items to the cart.",
        color: "red",
        timeout: 2000,
        position: "top",
      });
      return;
    }
  });



}

onBeforeMount(() => {
  if (store.userRole === 'admin') {
    admin.value = true;
  }
  getAllItems();
});
</script>

<style lang="sass" scoped>
.desc
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis

.desc:hover
  cursor: pointer
  overflow: visible
  white-space: normal

.name
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis

.name:hover
  cursor: pointer
  overflow: visible
  white-space: normal

.my-card
  width: 100%
  max-width: 250px

</style>
