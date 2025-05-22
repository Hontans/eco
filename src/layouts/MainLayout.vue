<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar class="row">
        <div class="col-2 flex justify-end items-center">
          <q-avatar size="125px" @click="$router.push('/')" class="cursor-pointer">
            <img
              src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
            />
          </q-avatar>
        </div>

        <div class="col-8 flex justify-center items-center">
          <q-input class="col-grow" style="max-width: 500px" rounded standout v-model="store.data.searchTerm" label="Rechercher un produit">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
            <template v-slot:append>
              <q-icon name="close" @click="store.data.searchTerm = ''" class="cursor-pointer" />
            </template>
          </q-input>
        </div>
          <div class="col-2 flex justify-start items-center q-pl-xs">
            <template v-if="store.isLoggedIn">
              <q-btn-dropdown glossy icon="person" color="white" text-color="black" :label="`${store.userName}`" class="q-mr-md">
                <q-list>
                  <q-item clickable @click="logout">
                    <q-item-section>
                      <q-item-label>Déconnexion</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </template>
            <template v-else>
              <q-btn round color="white" text-color="black" icon="person" to="auth" class="q-mr-md" />
            </template>
            <q-btn
              round
              color="white"
              text-color="black"
              icon="shopping_cart"
              @click="drawerRight = !drawerRight"
            >
              <q-badge color="red" rounded floating>{{ store.basketCount }}</q-badge>
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
        <template v-for="product in store.data.basket" :key="product.id">
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
        <div class="column items-center q-mt-md q-mb-xl">
            <div class="text-h6 q-mb-md">Total à payer : {{ store.basketPrice }}€</div>
            <q-btn color="secondary" label="Acheter" @click="router.push('/checkout')" size="lg" style="width: 200px" />
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
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { dataStore } from '../stores/data-store';

const store = dataStore();
const router = useRouter();
const $q = useQuasar();
const drawerRight = ref(false);

const logout = async () => {
  store.logout();
  $q.notify({
    color: 'info',
    message: 'Vous êtes déconnecté',
    icon: 'logout'
  });
  await router.push('/');
};


</script>
