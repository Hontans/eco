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
              <h5 class="q-my-md text-white">Livraison</h5>

              <!-- #region Address Section -->
              <q-card flat bordered class="glass-card q-mb-lg">
                <q-card-section>
                  <div class="text-h6 text-white q-mb-md">
                    <q-icon name="location_on" class="q-mr-sm" />
                    Adresse de livraison
                  </div>

                  <!-- #region Existing Addresses -->
                  <div v-if="userAddresses.length > 0" class="q-mb-md">
                    <div class="text-subtitle2 text-grey-3 q-mb-sm">Mes adresses enregistrées :</div>
                    <div class="row q-col-gutter-sm">
                      <div v-for="(address, index) in userAddresses" :key="index" class="col-12">
                        <q-card flat bordered clickable @click="selectedAddress = address" :class="{ 'selected-address': selectedAddress === address, 'address-option': true }">
                          <q-card-section class="q-pa-md">
                            <div class="row items-center">
                              <q-radio v-model="selectedAddress" :val="address" color="primary" class="q-mr-md" />
                              <div class="col">
                                <div class="text-white text-weight-medium">{{ address.city }}</div>
                                <div class="text-grey-4 text-caption">{{ address.country }} • {{ address.postalCode }}</div>
                              </div>
                            </div>
                          </q-card-section>
                        </q-card>
                      </div>
                    </div>
                  </div>
                  <!-- #endregion Existing Addresses -->

                  <!-- #region New Address Form -->

                  <!-- #endregion New Address Form -->
                </q-card-section>
              </q-card>
              <!-- #endregion Address Section -->
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
                <q-btn :label="step === 1 ? 'Passer à la livraison' : 'Continuer vers le paiement'" color="primary" class="full-width q-py-sm text-subtitle1 btn-glass" @click="handleMainAction" size="lg" :disabled="step === 2 && !isAddressSelected" />
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
import { ref, computed, onMounted } from 'vue';
import type { QStepper } from 'quasar';
import { useApi } from '../js/api';
import { dataStore } from '../stores/data-store';
import type { Adress } from '../js/types';
import { useQuasar } from 'quasar';
// #endregion Imports

// #region Variables and Stores
const store = dataStore();
const api = useApi();
const $q = useQuasar();
const stepperRef = ref<QStepper | null>(null);
const step = ref(1);
const userAddresses = ref<Adress[]>([]);
const selectedAddress = ref<Adress | null>(null);
// #endregion Variables and Stores

// #region Computed
const isAddressSelected = computed(() => {
  return selectedAddress.value !== null;
});
// #endregion Computed

// #region Methods
const handleMainAction = () => {
  if (step.value === 1) {
    stepperRef.value?.next();
  } else if (step.value === 2) {
    if (!isAddressSelected.value) {
      $q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'warning',
        message: 'Veuillez sélectionner une adresse de livraison',
        timeout: 2000,
        position: 'top'
      });
      return;
    }
  };
}
const loadUserAddresses = () => {
  const user = api.getConectedUser();
  if (user && user.adresses) {
    userAddresses.value = user.adresses;
  }
};
// #endregion Methods

// #region Lifecycle
onMounted(() => {
  loadUserAddresses();
});
// #endregion Lifecycle
</script>

<style scoped>

/* #region Header Styles */
.header-blur
{
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.q-stepper--horizontal .q-stepper__step-inner
{
  padding: none;
}
/* #endregion Header Styles */

/* #region Glass Card Styles */
.glass-card
{
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
}
/* #endregion Glass Card Styles */

/* #region Address Selection Styles */
.address-option
{
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.address-option:hover
{
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.selected-address
{
  background: rgba(25, 118, 210, 0.2) !important;
  border-color: #1976d2 !important;
}

.input-white .q-field__control
{
  color: white;
}

.input-white .q-field__label
{
  color: rgba(255, 255, 255, 0.7);
}
/* #endregion Address Selection Styles */

/* #region Button Styles */
.btn-glass
{
  background: rgba(255, 255, 255, 0.2);
}
/* #endregion Button Styles */

/* #region Sticky Card Styles */
.sticky-top-card
{
  position: -webkit-sticky;
  position: sticky;
  top: 20px;
  margin-left: auto;
  margin-right: 0;
}
/* #endregion Sticky Card Styles */

/* #region Text Styles */
.ellipsis-2-lines
{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
/* #endregion Text Styles */

</style>
