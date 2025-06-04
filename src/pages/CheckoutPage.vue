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

                  <!-- #region Add Address Button -->
                  <div class="text-center">
                    <q-btn
                      label="Ajouter une adresse"
                      color="primary"
                      icon="add"
                      @click="showAddAddressFormAndValue"
                      class="q-px-xl q-py-sm"
                      unelevated
                      rounded
                    />
                  </div>
                  <!-- #endregion Add Address Button -->

                  <!-- #region Add Address Dialog -->
                  <q-dialog v-model="showAddAddressForm">
                    <q-card style="min-width: 400px" class="rounded-borders glass-card">
                      <q-card-section class="bg-primary text-white">
                        <div class="text-h6">
                          <q-icon name="add_location" class="q-mr-sm" />
                          Ajouter une adresse
                        </div>
                      </q-card-section>

                      <q-card-section class="q-pt-lg">
                        <div class="q-gutter-md">
                          <q-input
                            v-model="editAddressCountry"
                            label="Pays"
                            outlined
                            dense
                            prepend-icon="public"
                            class="input-white"
                            :rules="[(val) => !!val || 'Le pays est requis']"
                          />
                          <q-input
                            v-model="editAddressCity"
                            label="Ville"
                            outlined
                            dense
                            prepend-icon="location_city"
                            class="input-white"
                            :rules="[(val) => !!val || 'La ville est requise']"
                          />
                          <q-input
                            v-model="editAddressPostalCode"
                            label="Code postal"
                            outlined
                            dense
                            prepend-icon="markunread_mailbox"
                            class="input-white"
                            :rules="[(val) => !!val || 'Le code postal est requis']"
                          />
                        </div>
                      </q-card-section>

                      <q-card-actions align="right" class="q-pa-md">
                        <q-btn flat label="Annuler" color="grey-7" v-close-popup />
                        <q-btn label="Ajouter" color="primary" v-close-popup @click="addAddress" unelevated />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
                  <!-- #endregion Add Address Dialog -->
                </q-card-section>
              </q-card>
              <!-- #endregion Address Section -->
            </div>
            <!-- #endregion Delivery Step -->

            <!-- #region Payment Step -->
            <div v-if="step === 3">
              <h5 class="q-my-md text-white">Paiement</h5>

              <!-- #region Payment Method Section -->
              <q-card flat bordered class="glass-card q-mb-lg">
                <q-card-section>
                  <div class="text-h6 text-white q-mb-md">
                    <q-icon name="payment" class="q-mr-sm" />
                    Méthode de paiement
                  </div>

                  <!-- #region Existing Cards -->
                  <div v-if="userCards.length > 0" class="q-mb-md">
                    <div class="text-subtitle2 text-grey-3 q-mb-sm">Mes cartes enregistrées :</div>
                    <div class="row q-col-gutter-sm">
                      <div v-for="(card, index) in userCards" :key="index" class="col-12">
                        <q-card flat bordered clickable @click="selectedCard = card" :class="{ 'selected-card': selectedCard === card, 'card-option': true }">
                          <q-card-section class="q-pa-md">
                            <div class="row items-center">
                              <q-radio v-model="selectedCard" :val="card" color="primary" class="q-mr-md" />
                              <div class="col">
                                <div class="text-white text-weight-medium">
                                  <q-icon name="credit_card" class="q-mr-sm" />
                                  **** **** **** {{ card.cardNumber?.slice(-4) }}
                                </div>
                                <div class="text-grey-4 text-caption">
                                  <q-icon name="event" size="16px" class="q-mr-xs" />
                                  Expire le {{ card.expirationDate }}
                                </div>
                              </div>
                            </div>
                          </q-card-section>
                        </q-card>
                      </div>
                    </div>
                  </div>
                  <!-- #endregion Existing Cards -->

                  <!-- #region No Cards Message -->
                  <div v-else class="text-center q-py-lg">
                    <q-icon name="credit_card_off" size="3rem" color="grey-4" class="q-mb-md" />
                    <div class="text-h6 text-grey-4 q-mb-sm">Aucune carte enregistrée</div>
                    <div class="text-body2 text-grey-5">
                      Ajoutez votre première carte pour effectuer le paiement
                    </div>
                  </div>
                  <!-- #endregion No Cards Message -->

                  <!-- #region Add Card Button -->
                  <div class="text-center">
                    <q-btn
                      label="Ajouter une carte"
                      color="primary"
                      icon="add"
                      @click="showAddCardFormAndValue"
                      class="q-px-xl q-py-sm"
                      unelevated
                      rounded
                    />
                  </div>
                  <!-- #endregion Add Card Button -->

                  <!-- #region Add Card Dialog -->
                  <q-dialog v-model="showAddCardForm">
                    <q-card style="min-width: 450px" class="rounded-borders glass-card">
                      <q-card-section class="bg-primary text-white">
                        <div class="text-h6">
                          <q-icon name="add_card" class="q-mr-sm" />
                          Ajouter une carte
                        </div>
                      </q-card-section>

                      <q-card-section class="q-pt-lg">
                        <div class="q-gutter-md">
                          <q-input
                            v-model="editCardNumber"
                            label="Numéro de carte"
                            outlined
                            dense
                            prepend-icon="credit_card"
                            mask="#### #### #### ####"
                            placeholder="1234 5678 9012 3456"
                            class="input-white"
                            :rules="[(val) => !!val || 'Le numéro de carte est requis']"
                          />
                          <q-input
                            v-model="editExpirationDate"
                            label="Date d'expiration"
                            outlined
                            dense
                            prepend-icon="event"
                            mask="##/##"
                            placeholder="MM/AA"
                            class="input-white"
                            :rules="[(val) => !!val || 'La date d\'expiration est requise']"
                          />
                          <q-input
                            v-model="editCryptogram"
                            label="Code de sécurité (CVV)"
                            outlined
                            dense
                            prepend-icon="security"
                            mask="###"
                            placeholder="123"
                            type="password"
                            class="input-white"
                            :rules="[(val) => !!val || 'Le code de sécurité est requis']"
                          />
                        </div>
                      </q-card-section>

                      <q-card-actions align="right" class="q-pa-md">
                        <q-btn flat label="Annuler" color="grey-7" v-close-popup />
                        <q-btn label="Ajouter" color="primary" v-close-popup @click="addCard" unelevated />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>
                  <!-- #endregion Add Card Dialog -->
                </q-card-section>
              </q-card>
              <!-- #endregion Payment Method Section -->
            </div>
            <!-- #endregion Payment Step -->

            <!-- #region Summary Step -->
            <div v-if="step === 4">
              <h5 class="q-my-md text-white">Récapitulatif de la commande</h5>

              <!-- #region Order Summary -->
              <q-card flat bordered class="glass-card q-mb-lg">
                <q-card-section>
                  <div class="text-h6 text-white q-mb-md">
                    <q-icon name="receipt_long" class="q-mr-sm" />
                    Votre commande
                  </div>

                  <!-- #region Products List -->
                  <div class="q-mb-md">
                    <div class="text-subtitle2 text-grey-3 q-mb-sm">Articles commandés :</div>
                    <template v-for="product in store.data.basket" :key="product.id">
                      <div class="row items-center q-py-sm">
                        <div class="col">
                          <div class="text-white">{{ product.name }}</div>
                        </div>
                        <div class="col-auto text-white">{{ product.price }}€</div>
                      </div>
                      <q-separator color="rgba(255,255,255,0.1)" />
                    </template>
                  </div>
                  <!-- #endregion Products List -->

                  <!-- #region Delivery Address -->
                  <div class="q-mb-md" v-if="selectedAddress">
                    <div class="text-subtitle2 text-grey-3 q-mb-sm">Adresse de livraison :</div>
                    <div class="text-white">
                      {{ selectedAddress.city }}, {{ selectedAddress.country }} {{ selectedAddress.postalCode }}
                    </div>
                  </div>
                  <!-- #endregion Delivery Address -->

                  <!-- #region Payment Method -->
                  <div class="q-mb-md" v-if="selectedCard">
                    <div class="text-subtitle2 text-grey-3 q-mb-sm">Méthode de paiement :</div>
                    <div class="text-white">
                      <q-icon name="credit_card" class="q-mr-sm" />
                      **** **** **** {{ selectedCard.cardNumber?.slice(-4) }}
                    </div>
                  </div>
                  <!-- #endregion Payment Method -->

                  <!-- #region Total -->
                  <q-separator color="rgba(255,255,255,0.2)" class="q-my-md" />
                  <div class="row items-center">
                    <div class="col text-h6 text-white">Total :</div>
                    <div class="col-auto text-h5 text-white">{{ store.basketPrice }}€</div>
                  </div>
                  <!-- #endregion Total -->
                </q-card-section>
              </q-card>
              <!-- #endregion Order Summary -->
            </div>
            <!-- #endregion Summary Step -->
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
                <q-btn
                  :label="getButtonLabel()"
                  color="primary"
                  class="full-width q-py-sm text-subtitle1 btn-glass"
                  @click="handleMainAction"
                  size="lg"
                  :disabled="getButtonDisabled()"
                />
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
import type { Adress, BasketCard } from '../js/types';
import { useQuasar } from 'quasar';
// #endregion Imports

// #region Variables and Stores
const store = dataStore();
const api = useApi();
const $q = useQuasar();
const stepperRef = ref<QStepper | null>(null);
const step = ref(1);

// Address variables
const userAddresses = ref<Adress[]>([]);
const selectedAddress = ref<Adress | null>(null);
const editAddressCountry = ref('');
const editAddressCity = ref('');
const editAddressPostalCode = ref('');
const showAddAddressForm = ref(false);
const adresses = ref<Adress[]>([]);

// Payment variables
const userCards = ref<BasketCard[]>([]);
const selectedCard = ref<BasketCard | null>(null);
const editCardNumber = ref('');
const editExpirationDate = ref('');
const editCryptogram = ref('');
const showAddCardForm = ref(false);
const cards = ref<BasketCard[]>([]);
// #endregion Variables and Stores

// #region Computed
const notify = (message: string, color: string) =>
  $q.notify({ message, color, position: 'bottom' });

const updateStore = () => {
  const user = api.getConectedUser();
  if (user) {
    user.adresses = adresses.value;
    user.basketCards = cards.value;
    dataStore().data.currentUser = user;
  }
};

const showAddAddressFormAndValue = () => {
  showAddAddressForm.value = true;
  editAddressCountry.value = editAddressCity.value = editAddressPostalCode.value = '';
};

const addAddress = () => {
  if (!editAddressCountry.value || !editAddressCity.value || !editAddressPostalCode.value) {
    notify('Veuillez remplir tous les champs', 'negative');
    return;
  }

  adresses.value.push({
    country: editAddressCountry.value,
    city: editAddressCity.value,
    postalCode: editAddressPostalCode.value,
  });

  userAddresses.value = adresses.value;
  updateStore();
  notify('Adresse ajoutée avec succès', 'positive');
  editAddressCountry.value = editAddressCity.value = editAddressPostalCode.value = '';
};

// Payment methods
const showAddCardFormAndValue = () => {
  showAddCardForm.value = true;
  editCardNumber.value = editExpirationDate.value = editCryptogram.value = '';
};

const addCard = () => {
  if (!editCardNumber.value || !editExpirationDate.value || !editCryptogram.value) {
    notify('Veuillez remplir tous les champs', 'negative');
    return;
  }

  cards.value.push({
    cardNumber: editCardNumber.value,
    expirationDate: editExpirationDate.value,
    cryptogram: editCryptogram.value,
  });

  userCards.value = cards.value;
  updateStore();
  notify('Carte ajoutée avec succès', 'positive');
  editCardNumber.value = editExpirationDate.value = editCryptogram.value = '';
};

const isAddressSelected = computed(() => {
  return selectedAddress.value !== null;
});

const isCardSelected = computed(() => {
  return selectedCard.value !== null;
});

const getButtonLabel = () => {
  switch (step.value) {
    case 1: return 'Passer à la livraison';
    case 2: return 'Continuer vers le paiement';
    case 3: return 'Voir le récapitulatif';
    case 4: return 'Confirmer la commande';
    default: return 'Continuer';
  }
};

const getButtonDisabled = () => {
  switch (step.value) {
    case 2: return !isAddressSelected.value;
    case 3: return !isCardSelected.value;
    default: return false;
  }
};
// #endregion Computed

// #region Methods
const handleMainAction = () => {
  if (step.value === 1) {
    step.value = 2;
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
    step.value = 3;
  } else if (step.value === 3) {
    if (!isCardSelected.value) {
      $q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'warning',
        message: 'Veuillez sélectionner une méthode de paiement',
        timeout: 2000,
        position: 'top'
      });
      return;
    }
    step.value = 4;
  } else if (step.value === 4) {
    // Finaliser la commande
    $q.notify({
      color: 'positive',
      textColor: 'white',
      icon: 'check_circle',
      message: 'Commande confirmée avec succès !',
      timeout: 3000,
      position: 'top'
    });
    // Rediriger vers la page d'accueil ou vider le panier
    store.data.basket = [];
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  }
};

const loadUserAddresses = () => {
  const user = api.getConectedUser();
  if (user && user.adresses) {
    userAddresses.value = user.adresses;
    adresses.value = user.adresses || [];
  }
};

const loadUserCards = () => {
  const user = api.getConectedUser();
  if (user && user.basketCards) {
    userCards.value = user.basketCards;
    cards.value = user.basketCards || [];
  }
};
// #endregion Methods

// #region Lifecycle
onMounted(() => {
  loadUserAddresses();
  loadUserCards();
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
/* #endregion Address Selection Styles */

/* #region Card Selection Styles */
.card-option
{
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.card-option:hover
{
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.selected-card
{
  background: rgba(25, 118, 210, 0.2) !important;
  border-color: #1976d2 !important;
}
/* #endregion Card Selection Styles */

/* #region Input Styles */
.input-white .q-field__control
{
  color: white;
}

.input-white .q-field__label
{
  color: rgba(255, 255, 255, 0.7);
}

.input-white .q-field__native
{
  color: white;
}
/* #endregion Input Styles */

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

/* #region Dialog Styles */
.rounded-borders
{
  border-radius: 12px;
}
/* #endregion Dialog Styles */
</style>
