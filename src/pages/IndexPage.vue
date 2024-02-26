<template>
  <q-page v-if="loading" class="flex flex-center">
    <q-spinner-bars size="100px" color="primary" />
  </q-page>

  <q-page v-if="itemsLength > 0" class="flex flex-center">
    <div v-for="item in items" :key="item.uid">
      <q-card class="my-card">
        <!-- :src="item.data.image" -->
        <img src="https://cdn.quasar.dev/img/mountains.jpg" />

        <q-card-section>
          <div class="text-h6">{{ item.data.name }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ item.data.description }}
        </q-card-section>

        <q-separator />
        <q-card-section style="display: flex; justify-content: space-between">
          <div class="text-subtitle2">In Stock: {{ item.data.quantity }}</div>
          <div class="text-subtitle2">Price: ${{ item.data.price }}</div>
        </q-card-section>
        <q-separator />
        <q-card-actions style="display: flex; justify-content: space-between">
          <!-- <q-input
            v-model.number="model"
            type="number"
            min="1"
            :max="item.data.quantity"
            filled
            style="line-height: 0.5em; font-size: 16px; max-width: 200px"
          /> -->

          <q-input
            dense
            v-model.number="cartAdd"
            type="number"
            :max="item.data.quantity"
            label="Quantity"
            input-class="text-right"
            style="max-width: 80px"
          />
          <!-- <q-input
            input-class="text-right"
            :max="item.data.quantity"
            type="number"
            v-model.number="cartAdd"
            label="Quantity"
            :dense="dense"
          /> -->

          <q-btn
            flat
            label="Add to Cart"
            color="primary"
            @click="addToCart(item)"
          />
        </q-card-actions>
      </q-card>
    </div>
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
let items = ref([]);
let loading = ref(true);
let cartAdd = ref(1);

async function getAllItems() {
  querySnapshot.value = await getDocs(collection(db, "items"));
  console.log(querySnapshot.value.size);
  itemsLength.value = querySnapshot.value.size;
  querySnapshot.value.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // doc.id is the uid of the document - doc.data() is the data (obj) of the document
    items.value.push({ uid: doc.id, data: doc.data() });
    console.log(doc.id, " => ", doc.data());
  });
  loading.value = false;
}

onBeforeMount(() => {
  console.log("ciao");
  getAllItems();
});
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
