<template>
  <q-layout view="hHh lpR fFf">
    <q-card class="my-card">
      <img src="https://cdn.quasar.dev/img/mountains.jpg">

      <q-card-section>
        <div class="text-h6">{{ product?.name }}</div>
        <div class="text-subtitle2">{{ product?.price }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ lorem }}
      </q-card-section>
    </q-card>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { dataStore } from '../stores/data-store';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
const store = dataStore();
const props = defineProps({
  id: Number
})
const productId = ref(props.id);
const product = ref()

function loadProduct()
{
  if (productId.value) {
    product.value = store.getProductById((productId.value))
  }
}

watch(
  () => props.id,
  (newId) => {
    productId.value = newId;
    loadProduct()
  }
)

onMounted(()=> {
  loadProduct()
})

</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
