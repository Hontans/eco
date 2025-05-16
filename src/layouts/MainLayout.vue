<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-avatar size="125px" @click="$router.push('/')" class="cursor-pointer">
          <img
            src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
          />
        </q-avatar>
        <q-input class="q-mx-auto" rounded standout v-model="store.searchTerm" label="rechercher un produit">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="store.searchTerm = ''" class="cursor-pointer" />
          </template>
        </q-input>

        <div class="q-gutter-sm">
          <q-btn round color="white" text-color="black" icon="person" to="auth" />
          <q-btn
            round
            color="white"
            text-color="black"
            icon="shopping_cart"
            @click="drawerRight = !drawerRight"
          >
          <q-badge color="red" rounded floating>{{ store.itemCount }}</q-badge>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      side="right"
      v-model="drawerRight"
      show-if-above
      bordered
      :width="300"
      :breakpoint="500"
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    >
      <q-scroll-area class="fit">
        <template v-for="product in store.items" :key="product.id">
          <div class="q-ma-md">
            <q-card style="width: 100%; max-width: 175px" class="q-mx-xl">
              <q-card-section class="q-pt-none">
                <div class="text-h6">{{ product.name }}</div>
                <div class="text-subtitle2">{{ product.price }}€</div>
                <div class="row items-center">
                  <img
                    style="max-width: 100px"
                    src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg"
                    alt="place_older"
                  >
                  <q-btn
                    class="q-ml-sm"
                    @click="store.deleteProduct(product)"
                    icon="cancel"
                    flat
                    round
                    size="sm"
                  />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </template>
        <div class="row justify-center q-mt-md">
            <div class="text-subtitle2 q-mr-md">Total : {{ store.totalPrice }}</div>
            <q-btn color="secondary" label="Acheter" style="width: 150px" />
        </div>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { cartStore } from '../stores/cart-store'

const store = cartStore();

const drawerRight = ref(false);
</script>
