<template>
  <q-layout view="hHh lpR fFf">
    <!-- #region Header -->
    <q-header class="bg-gradient">
      <q-toolbar class="row items-center q-py-sm" style="min-height: 70px">
        <!-- #region Logo Section -->
        <div class="col-2 flex justify-center items-center">
          <q-avatar size="60px" @click="$router.push('/')" class="cursor-pointer logo-hover">
            <img src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png" alt="Logo" />
          </q-avatar>
        </div>
        <!-- #endregion Logo Section -->

        <!-- #region Search Bar -->
        <div class="col-8 flex justify-center items-center">
          <q-input class="search-bar" style="max-width: 500px; width: 100%" rounded outlined dense v-model="store.data.searchTerm" placeholder="Rechercher un produit..." bg-color="white" color="primary">
            <template v-slot:prepend>
              <q-icon name="search" color="grey-6" />
            </template>
            <template v-slot:append>
              <q-icon v-if="store.data.searchTerm" name="close" @click="store.data.searchTerm = ''" class="cursor-pointer hover-icon" color="grey-6" />
            </template>
          </q-input>
        </div>
        <!-- #endregion Search Bar -->

        <!-- #region User Actions -->
        <div class="col-2 flex justify-center items-center q-gutter-sm">
          <!-- #region User Menu (Logged In) -->
          <template v-if="store.isLoggedIn">
            <q-btn-dropdown flat rounded icon="person" color="white" :label="store.userName" class="user-btn" dropdown-icon="expand_more">
              <q-list class="user-menu">
                <q-item clickable v-close-popup to="/profile" class="menu-item">
                  <q-item-section avatar>
                    <q-icon name="account_circle" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Mon Profil</q-item-label>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup @click="logout" class="menu-item">
                  <q-item-section avatar>
                    <q-icon name="logout" color="negative" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Déconnexion</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </template>
          <!-- #endregion User Menu (Logged In) -->

          <!-- #region Login Button (Not Logged In) -->
          <template v-else>
            <q-btn flat rounded icon="person" to="/auth" color="white" class="auth-btn" label="Connexion" />
          </template>
          <!-- #endregion Login Button (Not Logged In) -->

          <!-- #region Cart Button -->
          <q-btn flat rounded icon="shopping_cart" @click="drawerRight = !drawerRight" color="white" class="cart-btn">
            <q-badge v-if="store.basketCount > 0" color="red" rounded floating class="cart-badge">
              {{ store.basketCount }}
            </q-badge>
          </q-btn>
          <!-- #endregion Cart Button -->
        </div>
        <!-- #endregion User Actions -->
      </q-toolbar>
    </q-header>
    <!-- #endregion Header -->

    <!-- #region Cart Drawer -->
    <q-drawer side="right" v-model="drawerRight" show-if-above bordered :width="300" :breakpoint="500" class="'bg-red-9'">
      <q-scroll-area class="fit">
        <!-- #region Cart Items -->
        <template v-for="product in store.data.basket" :key="product.id">
          <div class="q-ma-md">
            <q-card style="width: 100%; max-width: 175px" class="q-mx-xl">
              <q-card-section class="q-pt-none">
                <div class="text-h6">{{ product.name }}</div>
                <div class="text-subtitle2">{{ product.price }}€</div>
                <div class="row items-center">
                  <img style="max-width: 100px" src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg" alt="place_older" />
                  <q-btn class="q-ml-sm" @click="store.deleteProduct(product)" icon="cancel" flat round size="sm" />
                </div>
              </q-card-section>
            </q-card>
          </div>
        </template>
        <!-- #endregion Cart Items -->

        <!-- #region Cart Total and Checkout -->
        <div class="column items-center q-mt-md q-mb-xl">
          <div class="text-h6 q-mb-md">Total à payer : {{ store.basketPrice }}€</div>
          <q-btn color="secondary" label="Acheter" @click="router.push('/checkout')" size="lg" style="width: 200px" />
        </div>
        <!-- #endregion Cart Total and Checkout -->
      </q-scroll-area>
    </q-drawer>
    <!-- #endregion Cart Drawer -->

    <!-- #region Page Container -->
    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- #endregion Page Container -->
  </q-layout>
</template>

<script setup lang="ts">
// #region Imports
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { dataStore } from '../stores/data-store';
import { useApi } from '../js/api';
// #endregion Imports

// #region Variables and Stores
const store = dataStore();
const router = useRouter();
const $q = useQuasar();
const drawerRight = ref(false);
const api = useApi();
// #endregion Variables and Stores

// #region Methods
const logout = () =>
{
  const result = api.logout();
  console.log(result);
  $q.notify(
  {
    color: 'positive',
    message: 'Vous êtes déconnecté avec succès',
    icon: 'logout',
    position: 'top',
  });
};
// #endregion Methods
</script>

<style scoped>

/* #region Background and Layout Styles */
.bg-gradient
{
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
}
/* #endregion Background and Layout Styles */

/* #region Logo Styles */
.logo-hover
{
  transition: all 0.3s ease;
}

.logo-hover:hover
{
  transform: scale(1.1);
}
/* #endregion Logo Styles */

/* #region Search Bar Styles */
.search-bar
{
  transition: all 0.3s ease;
}

.search-bar:focus-within
{
  transform: scale(1.02);
}

.hover-icon
{
  transition: all 0.2s ease;
}

.hover-icon:hover
{
  transform: scale(1.2);
  color: #666 !important;
}
/* #endregion Search Bar Styles */

/* #region Button Styles */
.user-btn,
.auth-btn,
.cart-btn
{
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.user-btn:hover,
.auth-btn:hover,
.cart-btn:hover
{
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}
/* #endregion Button Styles */

/* #region User Menu Styles */
.user-menu
{
  min-width: 200px;
  border-radius: 12px;
}

.menu-item
{
  transition: all 0.2s ease;
  border-radius: 8px;
  margin: 4px 8px;
}

.menu-item:hover
{
  background-color: rgba(102, 126, 234, 0.1);
  transform: translateX(4px);
}
/* #endregion User Menu Styles */

/* #region Cart Badge and Animations */
.cart-badge
{
  animation: pulse 2s infinite;
}

@keyframes pulse
{
  0%
  {
    transform: scale(1);
  }
  50%
  {
    transform: scale(1.1);
  }
  100%
  {
    transform: scale(1);
  }
}
/* #endregion Cart Badge and Animations */
</style>
