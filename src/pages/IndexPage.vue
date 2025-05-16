<template>
  <q-page>
    <ToDayCardComponent></ToDayCardComponent>
    <div class="row justify-center">
      <template v-for="product in store.searchItems" :key="product.id">
        <ProductCardComponent
          :product="product"
        ></ProductCardComponent>
      </template>
    </div>
  </q-page>
</template>

<script setup lang="ts">
// import { ref, computed } from 'vue';
import ToDayCardComponent from 'components/ToDayCardComponent.vue';
import ProductCardComponent from 'components/ProductCardComponent.vue';
// import productDb from '../js/products.json';
import { cartStore } from '../stores/cart-store'


//#region  declarations
const store = cartStore();

// const results = computed(() => {
//   return productDb.filter((product => product.name?.includes(search.value)));
// });
//#endregion
</script>

<style lang="scss" scoped></style>
