<template>
  <div class="q-pa-md row items-start q-gutter-md fixed-bottom">
    <q-card class="my-card" style="width: 350px">
      <img src="https://cdn.quasar.dev/img/mountains.jpg" width="150px" />

      <q-card-section>
        <div class="text-h6 text-right bg-red-10 text-white q-pa-xl">Our Changing Planet</div>
        <div class="text-subtitle2 text-right bg-secondary">by John Doe</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ props.greeting }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
const props = defineProps({
  greeting: {
    type: String,
    default: 'Hello',
  },
});

onMounted(() => {
  //alert(props.greeting);
});
</script>
