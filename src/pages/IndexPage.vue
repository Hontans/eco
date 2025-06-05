<template>
  <!-- #region Page Layout -->
  <q-page>
    <!-- #region Sticky Tabs -->
    <div class="sticky-tabs">
      <q-tabs v-model="tab" dense class="text-white bg-gradient">
        <q-tab name="all" label="Tous les produits"/>
        <q-tab v-for="category in uniqueCategories" :key="category" :name="category" :label="category?.toUpperCase()"/>
      </q-tabs>
    </div>
    <!-- #endregion -->

    <!-- #region Product Grid -->
    <div class="row justify-center content-with-padding">
      <template v-for="product in results" :key="product.id">
        <ProductCardComponent :product="product"></ProductCardComponent>
      </template>
    </div>
    <!-- #endregion -->
  </q-page>
  <!-- #endregion -->
</template>

<script setup lang="ts">
// #region Imports
import { computed, ref, onMounted } from 'vue';
import ProductCardComponent from 'components/ProductCardComponent.vue';
import { dataStore } from '../stores/data-store'
import { useApi } from '../js/api'
import type { Product } from '../js/types'
// #endregion

// #region Variables
const tab = ref('all');
const store = dataStore();
const api = useApi()
const products = ref<Product[]>();
// #endregion

// #region Computed Properties
const uniqueCategories = computed(() =>
{
  if (!products.value || !Array.isArray(products.value)) {
    return ['all'];
  }

  const categories = new Set(
    products.value
      .map(product => product.category)
      .filter(Boolean)
      .map(category => String(category))
  );

  if (categories.size === 0) {
    return ['all'];
  }

  return Array.from(categories).sort();
});

const results = computed(() =>
{
  let filteredProducts = products.value;

  if (tab.value !== 'all') {
    filteredProducts = filteredProducts?.filter(product => product.category === tab.value);
  }

  if (store.data.searchTerm) {
    filteredProducts = filteredProducts?.filter(product =>
      product.name?.toLowerCase().includes(store.data.searchTerm.toLowerCase())
    );
  }

  return filteredProducts;
});
// #endregion

// #region Lifecycle
onMounted(async () =>
{
  products.value = await api.getProducts()
})
// #endregion
</script>

<style lang="scss" scoped>
/* #region Sticky Tabs */
.sticky-tabs {
  position: sticky;
  top: 86px;
  z-index: 1000;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}
/* #endregion */

/* #region Background Gradient */
.bg-gradient {
  margin-top: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 8px;
}
/* #endregion */
</style>
