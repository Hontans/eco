<template>
  <q-layout view="hHh lpR fFf">
    <!-- #region Header -->
    <q-header class="header-blur text-white q-pa-sm row items-center">
      <!-- #region Logo Section -->
      <div class="col-auto">
        <q-avatar size="100px" @click="$router.push('/')" class="cursor-pointer q-mr-md">
          <img src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png" alt="Logo" />
        </q-avatar>
      </div>
      <!-- #endregion Logo Section -->

      <!-- #region Stepper Section -->
      <div class="col flex justify-center">
        <q-stepper v-model="step" ref="stepperRef" color="primary" animated flat header-nav class="stepper-glass text-white" style="max-width: 600px;">
          <q-step :name="1" title="Panier" icon="shopping_basket" :done="step > 1" class="text-white step-item" />
          <q-step :name="2" title="Livraison" icon="local_shipping" :done="step > 2" class="text-white step-item" />
          <q-step :name="3" title="Paiement" icon="payment" :done="step > 3" class="text-white step-item" />
          <q-step :name="4" title="Récapitulatif" icon="receipt_long" :done="step > 4" class="text-white step-item" />
        </q-stepper>
      </div>
      <!-- #endregion Stepper Section -->
    </q-header>
    <!-- #endregion Header -->

    <!-- #region Page Container -->
    <q-page-container>
      <q-page padding class="page-content">
        <div class="row q-col-gutter-x-lg">
          <!-- #region Main Content -->
          <div class="col-12 col-md-8">
            <!-- #region Cart Step -->
            <div v-if="step === 1">
              <h5 class="q-my-md text-white">Votre Panier</h5>
              <template v-for="product in store.data.basket" :key="product.id">
                <q-card flat class="glass-card q-mb-md">
                  <q-card-section horizontal>
                    <q-img class="col-auto" src="https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Begrippenlijst.svg" style="width: 120px; height: 120px; object-fit: cover" />
                    <q-card-section class="col q-py-sm q-px-md">
                      <div class="text-white">
                        <b>{{ product.name }}</b>
                      </div>
                      <div class="text-grey-4 q-pt-xs text-caption ellipsis-2-lines">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </div>
                    </q-card-section>
                    <q-card-section class="column items-end justify-between q-py-sm q-px-md" style="min-width: 80px">
                      <div class="text-subtitle1 q-mb-xs text-white">{{ product.price }}€</div>
                      <q-btn class="q-ml-sm" @click="api.deleteProduct(product)" icon="cancel" flat round size="sm" color="red" />
                    </q-card-section>
                  </q-card-section>
                </q-card>
              </template>
            </div>
            <!-- #endregion Cart Step -->

            <!-- #region Delivery Step -->
            <div v-if="step === 2">
              <h5 class="q-my-md text-white">Livraison et Paiement</h5>
              <q-card flat bordered class="glass-card">
                <q-card-section>
                  <p class="text-white">Formulaire de livraison et de paiement à implémenter ici.</p>
                  <q-input v-model="address" outlined label="Adresse" class="q-mb-md input-white" dense dark />
                  <q-input v-model="paymentInfo" outlined label="Informations de paiement" class="input-white" dense dark />
                </q-card-section>
              </q-card>
            </div>
            <!-- #endregion Delivery Step -->
          </div>
          <!-- #endregion Main Content -->

          <!-- #region Summary Card -->
          <div class="col-12 col-md-4 self-center">
            <q-card flat bordered class="glass-card q-mt-md q-md-mt-none sticky-top-card" style="top: 20px">
              <q-card-section>
                <div class="text-h6 text-white">Total des prix :</div>
                <div class="text-h5 q-py-sm text-white">{{ store.basketPrice }}€</div>
              </q-card-section>
              <q-separator color="white" />
              <q-card-actions vertical align="center" class="q-pa-md">
                <q-btn :label="step === 1 ? 'Passer à la livraison' : 'Acheter'" color="primary" class="full-width q-py-sm text-subtitle1 btn-glass" @click="handleMainAction" size="lg" />
              </q-card-actions>
            </q-card>
          </div>
          <!-- #endregion Summary Card -->
        </div>
      </q-page>
    </q-page-container>
    <!-- #endregion Page Container -->
  </q-layout>
</template>

<script setup lang="ts">
// #region Imports
import { ref } from 'vue';
import type { QStepper } from 'quasar';
import { useApi } from '../js/api';
import { dataStore } from '../stores/data-store';
// #endregion Imports

// #region Variables and Stores
const store = dataStore();
const api = useApi();
const stepperRef = ref<QStepper | null>(null);
const step = ref(1);
const address = ref('');
const paymentInfo = ref('');
// #endregion Variables and Stores

// #region Methods
const handleMainAction = () =>
{
  if (step.value === 1)
  {
    stepperRef.value?.next();
  }
  else if (step.value === 2)
  {
    console.log("Procédure d'achat lancée");
    console.log('Adresse:', address.value);
    console.log('Informations de paiement:', paymentInfo.value);
  }
};
// #endregion Methods
</script>

<style scoped>
.header-blur {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.q-stepper--horizontal .q-stepper__step-inner {
  padding: none;
}

/* #region Glass Card */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
}
/* #endregion Glass Card */

/* #region Button Glass */
.btn-glass {
  background: rgba(255, 255, 255, 0.2);
}
/* #endregion Button Glass */

/* #region Sticky Card Styles */
.sticky-top-card {
  position: -webkit-sticky;
  position: sticky;
  top: 20px;
  margin-left: auto;
  margin-right: 0;
}
/* #endregion Sticky Card Styles */

/* #region Text Styles */
.ellipsis-2-lines {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* #endregion Text Styles */
</style>
