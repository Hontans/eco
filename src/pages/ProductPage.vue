<template>
  <div class="row justify-center items-center" style="min-height: calc(100vh - 64px);">
    <div class="col-12 col-md-6">
      <q-card flat bordered-rounded class="q-pa-md">
        <div class="col-12">
          <q-carousel swipeable animated v-model="slide" thumbnails infinite height="400px" class="rounded-borders">
            <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
            <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
            <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
            <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
          </q-carousel>
        </div>
        <q-card-section>
          <div class="text-h5 q-mb-sm text-white">{{ product?.name || 'Chargement...' }}</div>
            <q-separator class="q-my-md" color="white" />
            <div class="text-subtitle1 text-white">Description</div>
            <p class="text-body2 q-mb-md text-white">{{ lorem }}</p>
            <q-separator class="q-my-md" color="white" />
          <div class="text-h6 q-mb-md text-white">
            Prix : {{ product?.price ? `${product.price} €` : 'Chargement...' }}
          </div>
          <q-btn color="primary" label="Ajouter au panier" class="full-width" @click="addToBasket" :disable="!product" />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import type { Product } from '../js/types';
import { useApi } from '../js/api'

const api = useApi()
const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const slide = ref(1);
const props = defineProps<{
  id: number;
}>();
const productId = ref(props.id);
const product = ref<Product>();

async function loadProduct() {
  if (productId.value) {
    product.value = await api.getProductById(productId.value);
  }
}

watch(
  () => props.id,
  (newId) => {
    productId.value = newId;
    loadProduct().catch((error) => {
      console.log(error)
    });
  },
  { immediate: true }
);

onMounted(() => {
  loadProduct().catch((error) => {
      console.log(error)
    });
});

const addToBasket = () => {
  if (product.value) {
    // Assuming api is imported or defined elsewhere
    api.addItemToBasket(product.value);
  }
};

</script>

<style lang="scss" scoped>
.q-carousel__thumbnail {
  cursor: pointer;
}

.q-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.q-card-section {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
