<template>
  <q-page>
    <ToDayCardComponent></ToDayCardComponent>
    <div class="row justify-center">
      <template v-for="product in results" :key="product.id">
        <ProductCardComponent
          :product="product"
        ></ProductCardComponent>
      </template>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ToDayCardComponent from 'components/ToDayCardComponent.vue';
import ProductCardComponent from 'components/ProductCardComponent.vue';
import productDb from '../js/products.json';
import { dataStore } from '../stores/data-store'


const store = dataStore();

const results = computed(() => {
  return productDb.filter((product => product.name?.includes(store.data.searchTerm)));
});

</script>

<style lang="scss" scoped></style>
