<template>
  <q-page v-if="loading" class="flex flex-center">
    <q-spinner-bars size="100px" color="primary" />
  </q-page>

  <q-page style="min-height: 900px !important; max-height: 900px !important;" padding v-if="numItems > 0 && !loading">

    <div class="row justify-center">
      <q-table :rows="items" :columns="columns" :row-key="row => row.uid" :rows-per-page-options="[5, 10, 15]"
        :pagination="true" class="my-table">
        <template v-slot:body-cell-image>
          <td class="text-center">
            <q-img src="https://cdn.quasar.dev/img/mountains.jpg" style="min-width: 150px; min-height: 150px;"
              fit="contain" />
          </td>
        </template>

        <template v-slot:body-cell-quantity="{ row }">

          <td class="text-center">
            <q-input dense v-model.number="cartItems[row.uid]" type="number" :max="row.data.quantity" label="Quantity"
              input-class="text-right" min="1" style="max-width: 80px;min-width: 80px;" />
          </td>
        </template>

        <template v-slot:body-cell-actions="{ row }">

          <td class="text-center">
            <q-btn @click="Remove(row)" flat label="Remove" color="red" />
          </td>
        </template>
      </q-table>
      <q-card class="row q-mt-sm" style="min-width:100% ">

        <q-card-section class="col">
          <div class="column">
            <div class="row">Select Payment Method:</div>
            <!-- <q-radio class="row q-pt-md" v-model="paymentMethod" val="creditCard"><i
                class="fa-brands fa-cc-mastercard fa-lg">
                Credit Card</i></q-radio>
            <q-radio class="row" v-model="paymentMethod" val="debitCard"><i class="fa-brands fa-cc-visa fa-lg">
                Debit Card</i></q-radio>
            <q-radio class="row" v-model="paymentMethod" val="paypal"><i class="fa-brands fa-cc-paypal fa-lg">
                PayPal</i></q-radio> -->
            <q-select class="q-pt-md" v-model="paymentMethod" :options="paymentOptions" label="Payment Method" />
          </div>
        </q-card-section>
        <q-card-section class="col">
          <div class="column">
            <q-input type="string" v-model="CardName" label="Name on card" />
          </div>
          <div class="column">
            <q-input type="number" v-model="CardNumber" label="Card number" />
          </div>
        </q-card-section>
        <q-card-section class="col">
          <div class="column">
            <q-input type="date" v-model="CardExp" label="Expiration" />
          </div>
          <div class="column">
            <q-input type="number" v-model="CardCVV" label="CVV" max="999" />
          </div>
        </q-card-section>
        <q-card-actions class="column flex justify-center">

          <q-btn class="flex items-center" label="Proceed to Payment" color="primary" @click="proceedToPayment" />
        </q-card-actions>
      </q-card>
      <!--
          TODO:
          Risultato voluto -> <img src='../assets/image.png' />
          Tabella dove mostra i prodotti aggiunti al carrello (immagine, nome, quantita e prezzo)
          dove sara possibile modificare la quantita e rimuovere il prodotto

          Sotto la tabella, mostrare una card dove mostrare totale complessivo (costo items + costo spedizione) e bottone per procedere al pagamento


          Da vedere se: Tenere prezzo per 1 item o complessivo (per singolo prodotto)
                        Scegliere modalita di pagamento (non cambia niente), e dati carta (nome,numero,scadenza,cvv)
        -->


      <!-- :src="item.data.image" -->
      <!-- <q-card class="my-card">
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
              input-class="text-right" min="1" style="max-width: 80px;min-width: 80px" /> -->
      <!-- <div class="text-subtitle2">Quantity: {{ cartItems[item.uid] }}</div> -->
      <!-- </q-card-section>
          <q-separator />
          <q-card-actions style="display: flex; justify-content: space-between">



            <q-btn flat label="Add to Cart" color="primary" @click="addToCart(item)" />
          </q-card-actions>
        </q-card> -->
    </div>
  </q-page>
  <q-page v-else-if="numItems < 1 && !loading" class="flex flex-center">
    <q-card dark bordered class="bg-primary my-card">
      <q-card-section>
        <div class="text-h6 text-center">Your cart is empty</div>
      </q-card-section>
      <q-card-section class="flex justify-center">
        <q-btn label="Go Shopping" text-color="black" color="white" @click="route.push({ name: 'home' })" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { query, where, doc, getDoc, getDocs, getFirestore, collection, documentId, updateDoc, deleteField } from "firebase/firestore";
import { userStore } from "stores/user.js";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";


let loading = ref(true)
let cartItems = ref([])
const store = userStore();
const route = useRouter();
const db = getFirestore();
const itemkeys = ref([]);
const numItems = ref(0);
const querySnapshot = ref(null);
let items = ref([]);
const columns = [
  { name: 'image', required: true, label: 'Image', align: 'center' },
  { name: 'name', required: true, label: 'Name', align: 'center', field: row => row.data.name, sortable: true },
  { name: 'quantity', required: true, label: 'Quantity', align: 'left', sortable: true },
  { name: 'price', required: true, label: 'Price', align: 'center', field: row => `€${row.data.price}`, sortable: true },
  // { name: 'total', required: true, label: 'Total', align: 'center', field: row => (row.data.price * cartItems.value[row.uid]).toFixed(2), sortable: true },
  { name: 'actions', required: true, label: 'Actions', align: 'center' }
]
const paymentOptions = [
  "Credit Card",
  "Debit Card",
  "PayPal"
]
const paymentMethod = ref(null)
let CardName = ref(null)
let CardNumber = ref(null)
let CardExp = ref(null)
let CardCVV = ref(null)
const $q = useQuasar();

function proceedToPayment() {
  if (paymentMethod.value === null || CardName.value === null || CardNumber.value === null || CardExp.value === null || CardCVV.value === null) {
    $q.notify({
      color: "negative",
      position: "top",
      message: "Please fill all the fields",
      icon: "report_problem"
    });
  } else {
    $q.dialog({
      dark: true,
      title: "Confirm Payment",
      message: "Are you sure you want to proceed with the payment?",
      cancel: true,
      persistent: true
    }).onOk(() => {
      $q.notify({
        color: "positive",
        position: "top",
        message: "Payment successful",
        icon: "check"
      });

      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        const uid = user.uid;
        const docRef = doc(db, "users", uid);
        await updateDoc(docRef, {
          cart: {}
        })

        items.value = []
      })

      route.push({ name: "home" });
    })


  }
}

function Remove(rowItem) {

  const auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    const uid = user.uid;
    const docRef = doc(db, "users", uid);
    await updateDoc(docRef, {
      [`cart.${rowItem.uid}`]: deleteField()
    })

    items.value.findIndex((item, index) => {
      if (item.uid === rowItem.uid) {
        items.value.splice(index, 1)
        numItems.value--
      }
    })
    // querySnapshot.value = await getDocs(q)
    // querySnapshot.value.forEach((doc) => {
    //   console.log(doc.data())
    // })
  })
}

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
        if (numItems.value === 0) {
          loading.value = false
          return
        }

        const q = query(collection(db, "items"), where(documentId(), "in", [...keys]))
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

.my-table
  /* Your custom table styles here */
  /* For example: */
  border: 1px solid #ccc
  border-collapse: collapse
  width: 100%

</style>
