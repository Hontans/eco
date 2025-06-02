<template>
  <q-card class="product-card q-ma-md" style="max-width: 280px">
    <q-img
      src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg"
    >
      <div class="absolute-bottom product-overlay">
        <div class="text-h6 text-white product-name">{{ props.product.name }}</div>
        <div class="text-h5 text-white price">{{ props.product.price }}€</div>
      </div>
    </q-img>

    <q-card-actions class="q-pa-md">
      <q-btn
        @click="addToBasket"
        color="primary"
        unelevated
        rounded
        icon="add_shopping_cart"
        label="Ajouter au panier"
        class="full-width q-mb-sm"
      />

      <q-btn
        @click="goToProductPage"
        flat
        color="primary"
        icon="visibility"
        label="Voir les détails"
        class="full-width"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import type { Product } from '../js/types';
import { useApi } from '../js/api';
import { useRouter } from 'vue-router';

const api = useApi();
const router = useRouter();

const props = defineProps<{
  product: Product;
}>();

const goToProductPage = async () => {
  await router.push(`/product/${props.product.id}`);
};

const addToBasket = () => {
  api.addItemToBasket(props.product);
};
</script>

<style scoped>
.product-card {
  transition: all 0.3s ease;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  background: rgba(255, 255, 255, 0.15);
}

.product-image {
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-overlay {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 16px;
}

.product-name {
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  margin-bottom: 8px;
}

.price {
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
</style>
