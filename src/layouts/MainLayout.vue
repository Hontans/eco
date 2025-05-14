<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-avatar size="125px">
          <img
            src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
          />
        </q-avatar>

        <q-input class="search-bar" rounded standout v-model="text" label="rechercher un produit">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="text = ''" class="cursor-pointer" />
          </template>
        </q-input>
        <div class="q-gutter-sm">
          <q-avatar color="black" text-color="pink" icon="person" />
          <q-avatar color="black" text-color="pink" icon="shopping_cart" />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const text = ref('');
</script>

<style>
.search-bar {
  margin-left: auto;
  margin-right: auto;
}
</style>
