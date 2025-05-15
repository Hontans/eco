<template>
  <q-page>
    <ToDayCardComponent></ToDayCardComponent>
    <div class="row justify-center">
      <template v-for="product in products" :key="product.id">
        <ProductCardComponent
          :product="product"
        ></ProductCardComponent>
      </template>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ToDayCardComponent from 'components/ToDayCardComponent.vue';
import ProductCardComponent from 'components/ProductCardComponent.vue';
import productDb from '../js/products.json';
import type { Product } from '../js/types';
//#region  declarations
const products = ref<Product[]>(productDb);
//#endregion
</script>

<style lang="scss" scoped></style>
