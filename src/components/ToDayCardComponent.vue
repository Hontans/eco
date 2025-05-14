<template>
  <q-card class="my-card full-width no-border-radius">
    <img
      class="full-width"
      style="height: 200px; object-fit: cover"
      src="https://www.interprint-services.co.uk/wp-content/uploads/2019/04/placeholder-banner.png"
    />

    <q-card-section>
      <div class="row items-center">
        <div class="text-h6 q-mr-md">Nom du produi</div>
        <div class="text-subtitle2 q-mr-md">Prix du produi</div>
        <div class="text-body2">{{ lorem }}</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
</script>
