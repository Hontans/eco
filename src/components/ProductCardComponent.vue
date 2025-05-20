<template>
  <q-card class="q-ma-md" style="max-width: 250px">
    <q-img
      src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg">
      <div class="absolute-bottom">
        <div class="text-h6">{{ props.product.name }}</div>
        <div class="text-subtitle2">{{ props.product.price }}€</div>
      </div>
    </q-img>

    <q-card-actions>
      <div class="q-mx-auto">
        <q-btn flat class="q-mr-lg" @click="addToBasket">+ Panier</q-btn>
        <q-btn flat class="q-ml-lg">Acheter</q-btn>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import type { Product } from '../js/types';
import { useApi } from '../js/api'

const api = useApi()

const props = defineProps<{
  product: Product;
}>();

const addToBasket = () => {
  api.addItemToBasket(props.product)
};
</script>
