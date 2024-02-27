<template>
  <div class="items-center">
    <div
      class="q-pa-md"
      style="
        width: 300px;
        max-width: 400px;
        border-style: solid;
        border-radius: 10px;
        border-width: 1px;
        border-color: lightgrey;
      "
    >
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-sm">
        <q-input
          filled
          v-model="item.name"
          label="Item name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Name can\'t be empty.']"
        />

        <q-input
          filled
          v-model="item.img"
          label="Immage"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Immage can\'t be empty.',
          ]"
        />

        <q-input
          filled
          v-model="item.description"
          label="Item description"
          lazy-rules
          autogrow
          :rules="[
            (val) => (val && val.length > 0) || 'Description can\'t be empty.',
            (val) => (val && val.length <= 200) || 'Description too long.',
          ]"
        />

        <q-input
          filled
          type="number"
          v-model.number="item.quantity"
          label="Quantity"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Quantity can\'t be empty',
            (val) => val >= 0 || 'Quantity can\'t be negative or equal 0.',
          ]"
        />

        <q-input
          filled
          type="number"
          v-model.number="item.price"
          label="Price"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Price can\'t be empty',
            (val) => val >= 0 || 'Price can\'t be negative or equal 0.',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="euro" />
          </template>
        </q-input>

        <div>
          <q-btn
            label="Cancel"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
          <q-btn label="Create" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </div>
</template>
<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { collection, addDoc, getFirestore } from "firebase/firestore";
const db = getFirestore();
const $q = useQuasar();
let item = ref({
  description: undefined,
  img: undefined,
  name: undefined,
  price: null,
  quantity: null,
});

const onSubmit = async () => {
  try {
    await addDoc(collection(db, "items"), item.value);
    item.value.description = undefined;
    item.value.img = undefined;
    item.value.name = undefined;
    item.value.price = null;
    item.value.quantity = null;
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Item created",
    });
  } catch (err) {
    $q.notify({
      type: "negative",
      message: "An error occured when creating item",
    });
  }
};

const onReset = () => {
  item.value.description = undefined;
  item.value.img = undefined;
  item.value.name = undefined;
  item.value.price = null;
  item.value.quantity = null;
};
</script>
