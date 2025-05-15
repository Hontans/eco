<template>
  <q-page>
    <ToDayCardComponent></ToDayCardComponent>
    <input type="text" v-model="search"/>
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
import { ref, computed } from 'vue';
import ToDayCardComponent from 'components/ToDayCardComponent.vue';
import ProductCardComponent from 'components/ProductCardComponent.vue';
import productDb from '../js/products.json';
import type { Product } from '../js/types';


//#region  declarations
const search   = ref("")
const products = ref<Product[]>(productDb);

const results = computed(() => {
  return products.value.filter((product => product.name?.includes(search.value)));
});
//#endregion
</script>

<style lang="scss" scoped></style>
