<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-avatar size="125px" @click="$router.push('/')" class="cursor-pointer">
          <img
            src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
          />
        </q-avatar>

        <q-input class="q-mx-auto" rounded standout v-model="text" label="rechercher un produit">
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="text = ''" class="cursor-pointer" />
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
          <q-badge color="red" rounded floating>4</q-badge>
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
        <q-btn color="secondary" label="Acheter" style="width: 150px" />
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const text = ref('');
const drawerRight = ref(false);
</script>
