<template>
  <div class="row">
    <div class="column items-center">
      <q-card flat bordered>
        <q-card-section> Create Item </q-card-section>
        <q-card-section>
          <label>Name:</label>
          <q-input outlined dense v-model="item.name" />
        </q-card-section>

        <q-card-section>
          <label>Description:</label>
          <q-input outlined dense v-model="item.description" type="textarea" />
        </q-card-section>
        <q-card-section>
          <label>Quantity:</label>
          <q-input
            outlined
            dense
            type="number"
            v-model.number="item.quantity"
          />
        </q-card-section>
        <q-card-section>
          <label>Price:</label>
          <q-input
            outlined
            dense
            type="number"
            prefix="€"
            v-model.number="item.price"
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
