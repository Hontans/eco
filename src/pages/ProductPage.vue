<template>
  <q-layout view="hHh lpR fFf">
    {{ props.id }}
    /
    {{ productId }}
    <q-btn>
      oui
    </q-btn>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps({
  id: String
})
const productId = ref(props.id);

watch(
  () => props.id,
  (value1, value2) => {
    console.log(value1, value2);
    productId.value = value1;
  }
)
</script>

<style></style>
