<template>
  <div class="row">
    <div class="column items-center">
      <q-card flat bordered>
        <q-card-section> Create Item </q-card-section>
        <q-card-section>
          <q-input outlined dense v-model="item.name" label="Name" />
          <q-input
            outlined
            dense
            v-model="item.description"
            type="textarea"
            label="Description"
          />
          <q-input
            outlined
            dense
            type="number"
            v-model="item.quantity"
            label="Quantity"
          />
          <q-input
            outlined
            dense
            type="number"
            prefix="€"
            v-model="item.price"
            label="Price"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Create" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
let item = ref({
  description: undefined,
  img: undefined,
  name: undefined,
  price: undefined,
  quantity: undefined,
});
</script>
