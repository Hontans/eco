<template>
  <q-page>
      <q-card class="my-card full-width no-border-radius">
        <img
          class="full-width"
          style="height: 200px; object-fit: cover"
          src="https://www.interprint-services.co.uk/wp-content/uploads/2019/04/placeholder-banner.png"
          />

        <q-card-section>
          <div class="row justify-center items-center q-px-md q-gutter-x-md">
            <div class="text-h5">Nom du produit</div>
            <div class="text-subtitle1">Prix du produit</div>
            <div class="text-body2">{{ lorem }}</div>
          </div>
        </q-card-section>
      </q-card>
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
            :label="category.toUpperCase()"
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
import ProductCardComponent from 'components/ProductCardComponent.vue';
import productDb from '../js/products.json';
import { dataStore } from '../stores/data-store'

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const tab = ref('all');
const store = dataStore();


// a midifier
const uniqueCategories = computed(() => {
  if (!productDb || !Array.isArray(productDb)) {
    return [];
  }
  const categories = new Set(productDb.map(product => product.category).filter(Boolean)); // filter(Boolean) pour retirer les catégories undefined/null/vides
  return Array.from(categories).sort(); // Trie les catégories par ordre alphabétique
});
// a midifier


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
