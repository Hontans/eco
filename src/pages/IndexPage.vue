<template>
  <q-page>
      <!-- <q-card class="my-card full-width no-border-radius">
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
      </q-card> -->
    <div class="sticky-tabs">
        <q-tabs
          v-model="tab"
          dense
          class="text-white bg-gradient"
        >
          <q-tab name="all" label="Tous les produits" />
          <q-tab
            v-for="category in uniqueCategories"
            :key="category"
            :name="category"
            :label="category?.toUpperCase()"
          />
        </q-tabs>
    </div>
    <div class="row justify-center content-with-padding">
      <template v-for="product in results" :key="product.id">
        <ProductCardComponent
          :product="product"
        ></ProductCardComponent>
      </template>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import ProductCardComponent from 'components/ProductCardComponent.vue';
import { dataStore } from '../stores/data-store'
import { useApi } from '../js/api'
import type { Product } from '../js/types'

// const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const tab = ref('all');
const store = dataStore();
const api = useApi()
const products = ref<Product[]>();

// a midifier
const uniqueCategories = computed(() => {
  if (!products.value || !Array.isArray(products.value)) {
    return ['all'];
  }

  // Convert categories to strings and filter out any falsy values
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
// a midifier


const results = computed(() => {
  let filteredProducts = products.value;

  // Filtrer par catégorie si une catégorie autre que 'all' est sélectionnée
  if (tab.value !== 'all') {
    filteredProducts = filteredProducts?.filter(product => product.category === tab.value);
  }

  // Filtrer par terme de recherche
  if (store.data.searchTerm) {
    filteredProducts = filteredProducts?.filter(product =>
      product.name?.toLowerCase().includes(store.data.searchTerm.toLowerCase())
    );
  }

  return filteredProducts;
});

onMounted(async () =>
{
  products.value = await api.getProducts()
})
</script>

<style lang="scss" scoped>
.sticky-tabs {
  position: sticky;
  top: 86px;
  z-index: 1000;
  max-width: 1400px; // Limite la largeur de la barre d'onglets
  margin: 0 auto; // Centre la barre d'onglets
  padding: 0 20px; // Espacement latéral pour correspondre aux cartes
}

.bg-gradient {
  margin-top: 10px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 8px;
}
</style>
