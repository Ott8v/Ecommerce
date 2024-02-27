<template>
  <div class="column items-center">
    <div class="q-pa-md" style="max-width: 400px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="item.name"
          label="Your name *"
          hint="Name and surname"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          v-model="item.name"
          label="Item name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          type="number"
          v-model.number="item.quantity"
          label="Quantity"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type your age',
            (val) => (val > 0 && val < 100) || 'Please type a real age',
          ]"
        />

        <q-input
          filled
          type="number"
          v-model.number="item.quantity"
          label="Quantity"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type your age',
            (val) => (val > 0 && val < 100) || 'Please type a real age',
          ]"
        />

        <q-input
          filled
          type="number"
          v-model.number="item.quantity"
          label="Quantity"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type your age',
            (val) => (val > 0 && val < 100) || 'Please type a real age',
          ]"
        />

        <div>
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
          <q-btn label="Submit" type="submit" color="primary" />
        </div>
      </q-form>
    </div>
  </div>
</template>
<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
const $q = useQuasar();
let item = ref({
  description: null,
  img: null,
  name: null,
  price: null,
  quantity: null,
});

const onSubmit = () => {
  $q.notify({
    color: "green-4",
    textColor: "white",
    icon: "cloud_done",
    message: "Item created",
  });
};

const onReset = () => {
  item.value.description = null;
  item.value.img = null;
  item.value.name = null;
  item.value.price = null;
  item.value.quantity = null;
};
</script>
