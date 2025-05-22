<template>
  <q-page>
    <ToDayCardComponent></ToDayCardComponent>
    <div>
        <q-tabs
          v-model="tab"
          dense
          class="bg-orange text-white shadow-2"
        >
          <q-tab name="all" label="Tous les produits" />
          <q-tab
            v-for="category in uniqueCategories"
            :key="category"
            :name="category"
            :label="category.charAt(0).toUpperCase() + category.slice(1)"
          />
        </q-tabs>
    </div>
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
import { computed, ref } from 'vue';
import ToDayCardComponent from 'components/ToDayCardComponent.vue';
import ProductCardComponent from 'components/ProductCardComponent.vue';
import productDb from '../js/products.json';
import { dataStore } from '../stores/data-store'


const tab = ref('all');
const store = dataStore();

const uniqueCategories = computed(() => {
  if (!productDb || !Array.isArray(productDb)) {
    return [];
  }
  const categories = new Set(productDb.map(product => product.category).filter(Boolean)); // filter(Boolean) pour retirer les catégories undefined/null/vides
  return Array.from(categories).sort(); // Trie les catégories par ordre alphabétique
});

const results = computed(() => {
  let filteredProducts = productDb;

  // Filtrer par catégorie si une catégorie autre que 'all' est sélectionnée
  if (tab.value !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.category === tab.value);
  }

  // Filtrer par terme de recherche
  if (store.data.searchTerm) {
    filteredProducts = filteredProducts.filter(product =>
      product.name?.toLowerCase().includes(store.data.searchTerm.toLowerCase())
    );
  }

  return filteredProducts;
});

</script>

<style lang="scss" scoped></style>
