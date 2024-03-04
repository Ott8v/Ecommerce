<template>
  <q-page v-if="loading" class="flex flex-center">
    <q-spinner-bars size="100px" color="primary" />
  </q-page>

  <q-page style="min-height: 900px !important; max-height: 900px !important;" padding v-if="numItems > 0 && !loading">

    <div class="row justify-center">
      <div class="q-px-md q-py-md" v-for="item in items" :key="item.uid">
        <!--
          TODO:
          Risultato voluto -> <img src='../assets/image.png' />
          Tabella dove mostra i prodotti aggiunti al carrello (immagine, nome, quantita e prezzo)
          dove sara possibile modificare la quantita e rimuovere il prodotto

          Sotto la tabella, mostrare una card dove mostrare totale complessivo (costo items + costo spedizione) e bottone per procedere al pagamento


          Da vedere se: Tenere prezzo per 1 item o complessivo (per singolo prodotto)
                        Scegliere modalita di pagamento (non cambia niente), e dati carta (nome,numero,scadenza,cvv)
        -->
        <q-card class="my-card">
          <!-- :src="item.data.image" -->
          <img src="https://cdn.quasar.dev/img/mountains.jpg" />

          <q-card-section>
            <div class="text-h6 name">
              {{ item.data.name }}
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none desc">
            {{ item.data.description }}
          </q-card-section>

          <q-separator />
          <q-card-section style="display: flex; justify-content: space-between">
            <q-input dense v-model.number="cartItems[item.uid]" type="number" :max="item.data.quantity" label="Quantity"
              input-class="text-right" min="1" style="min-width: 80px" />
            <!-- <div class="text-subtitle2">Quantity: {{ cartItems[item.uid] }}</div> -->
          </q-card-section>
          <q-separator />
          <q-card-actions style="display: flex; justify-content: space-between">



            <q-btn flat label="Add to Cart" color="primary" @click="addToCart(item)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
  <q-page v-else-if="numItems < 1 && !loading" class="flex flex-center">
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
import { ref, onBeforeMount } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { query, where, doc, getDoc, getDocs, getFirestore, collection, documentId } from "firebase/firestore";
import { userStore } from "stores/user.js";
import { useRouter } from "vue-router";

let loading = ref(true)
let cartItems = ref([])
const store = userStore();
const route = useRouter();
const db = getFirestore();
const itemkeys = ref([]);
const numItems = ref(0);
const querySnapshot = ref(null);
let items = ref([]);

onBeforeMount(() => {
  if (!store.isLogged) {
    route.push({ name: "home" });
  }

  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const uid = user.uid;
        const docRef = doc(db, "users", uid);
        const docSnap = ref(null);
        docSnap.value = await getDoc(docRef);


        //TODO: get cart items and do the cart
        docSnap.value.data().cart
        cartItems.value = docSnap.value.data().cart
        itemkeys.value = Object.keys(docSnap.value.data().cart)
        numItems.value = itemkeys.value.length
        const keys = JSON.parse(JSON.stringify(itemkeys.value))
        console.log(keys)

        const q = query(collection(db, "items"), where(documentId(), "in", [...keys]))
        console.log(q)
        querySnapshot.value = await getDocs(q)
        querySnapshot.value.forEach((doc) => {
          items.value.push({ uid: doc.id, data: doc.data() });
        })
        // query('items', where(db.firestore.FieldPath.documentId(), "in", itemkeys.value)).get().then((querySnapshot) => {
        //   querySnapshot.forEach((doc) => {
        //     console.log(doc.id, " => ", doc.data());
        //   });
        // });
        // db.collection('items').where(firebase.firestore.FieldPath.documentId(), "in", itemkeys.value).get().then((querySnapshot) => {
        //   querySnapshot.forEach((doc) => {
        //     console.log(doc.id, " => ", doc.data());
        //   });
        // });


        // itemkeys.value.forEach(async (item) => {
        //   querySnapshot.value = await getDoc(doc(db, "items", item))
        //   console.log(querySnapshot.value)
        // })
        // querySnapshot.value.forEach((doc) => {
        //   console.log(doc.data())
        // })
        // console.log(querySnapshot.value)

        loading.value = false
        console.log(items.value, numItems.value)
      } catch (error) {
        console.log(error)
      }
    }
  })
})
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
