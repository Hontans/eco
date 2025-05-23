<template>
  <div class="q-pa-md">
    <q-carousel
      swipeable
      animated
      v-model="slide"
      thumbnails
      infinite
    >
      <q-carousel-slide :name="1" img-src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg" />
      <q-carousel-slide :name="2" img-src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg" />
      <q-carousel-slide :name="3" img-src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg" />
      <q-carousel-slide :name="4" img-src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg" />
    </q-carousel>
  </div>
  <div>

  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { dataStore } from '../stores/data-store';

const lorem =
'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const slide = ref(1)
const store = dataStore();
const props = defineProps({
  id: Number,
});
const productId = ref(props.id);
const product = ref();

function loadProduct() {
  if (productId.value) {
    product.value = store.getProductById(productId.value);
  }
}

watch(
  () => props.id,
  (newId) => {
    productId.value = newId;
    loadProduct();
  },
);

onMounted(() => {
  loadProduct();
});
</script>

<style lang="scss" scoped>
.my-card{
  width: 100%;
  max-width: 250px;
}

.q-carousel__thumbnail  {
  cursor: pointer;
}
</style>
