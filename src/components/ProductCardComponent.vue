<template>
  <!-- #region Card Container -->
  <q-card class="product-card q-ma-md" style="max-width: 280px">
    <!-- #endregion Card Container -->

    <!-- #region Product Image -->
    <q-img src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg">
      <!-- #region Image Overlay -->
      <div class="absolute-bottom product-overlay">
        <div class="text-h6 text-white product-name">{{ props.product.name }}</div>
        <div class="text-h5 text-white price">{{ props.product.price }}€</div>
      </div>
      <!-- #endregion Image Overlay -->
    </q-img>
    <!-- #endregion Product Image -->

    <!-- #region Card Actions -->
    <q-card-actions class="q-pa-md">
      <q-btn @click="addToBasket" color="primary" unelevated rounded icon="add_shopping_cart" label="Ajouter au panier" class="full-width q-mb-sm" />

      <q-btn @click="goToProductPage" flat color="primary" icon="visibility" label="Voir les détails" class="full-width" />
    </q-card-actions>
    <!-- #endregion Card Actions -->
  </q-card>
</template>

<script setup lang="ts">
// #region Imports
import type { Product } from '../js/types';
import { useApi } from '../js/api';
import { useRouter } from 'vue-router';
// #endregion

// #region Composables
const api = useApi();
const router = useRouter();
// #endregion

// #region Props
const props = defineProps<{
  product: Product;
}>();
// #endregion

// #region Functions
const goToProductPage = async () =>
{
  await router.push(`/product/${props.product.id}`);
};

const addToBasket = () =>
{
  api.addItemToBasket(props.product);
};
// #endregion
</script>

<style scoped>
/* #region Card Styles */
.product-card {
  transition: all 0.3s ease;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.product-card:hover {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.15);
}
/* #endregion */

/* #region Image Styles */
.product-image {
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}
/* #endregion */

/* #region Overlay Styles */
.product-overlay {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 16px;
}
/* #endregion */

/* #region Text Styles */
.product-name {
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 8px;
}

.price {
  font-weight: 700;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}
/* #endregion */
</style>
