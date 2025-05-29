<template>
  <div
    class="q-pa-md q-ml-md bg-white shadow-1"
    style="
      width: 80%;
      max-width: 600px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    "
  >
    <div class="text-h5 text-center q-mb-lg">Paiement</div>
    <div v-for="cart in basketCards" :key="cart.cardNumber ?? ''" class="q-pa-md q-gutter-sm">
      <q-banner inline-actions rounded class="bg-black text-white">
        **** **** **** {{ cart.cardNumber?.slice(-4) }} - {{ cart.expirationDate }}
        <template v-slot:action>
          <q-btn flat label="modifier" @click="showEditCartFormAndValue(cart)" />
          <q-btn flat label="supprimer" @click="deleteCart(cart)" />
        </template>
      </q-banner>
    </div>
    <div class="text-center">
      <q-btn
        label="Ajouter une carte"
        color="primary"
        icon="add"
        @click="showAddCartFormAndValue"
        class="q-mt-sm q-pa-md"
      />
    </div>

    <q-dialog v-model="showEditCartForm">
      <q-card>
        <q-card-section>
          <div class="text-h6">Modifier la carte</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row q-mb-md">
            <q-input v-model="editCardNumber" label="Numéro de carte :" outlined class="col" />
          </div>
          <div class="row q-mb-md">
            <q-input
              v-model="editExpirationDate"
              label="Date d'expiration :"
              outlined
              class="col"
            />
          </div>
          <div class="row q-mb-md">
            <q-input v-model="editCryptogram" label="Cryptogramme :" outlined class="col" />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" v-close-popup />
          <q-btn flat label="Enregistrer" color="primary" v-close-popup @click="updateCart" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showAddCartForm">
      <q-card>
        <q-card-section>
          <div class="text-h6">Ajouter une carte</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row q-mb-md">
            <q-input v-model="editCardNumber" label="Numéro de carte :" outlined class="col" />
          </div>
          <div class="row q-mb-md">
            <q-input
              v-model="editExpirationDate"
              label="Date d'expiration :"
              outlined
              class="col"
            />
          </div>
          <div class="row q-mb-md">
            <q-input v-model="editCryptogram" label="Cryptogramme :" outlined class="col" />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" v-close-popup />
          <q-btn flat label="Ajouter" color="primary" v-close-popup @click="addCart" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { dataStore } from '../stores/data-store';
import { ref, onMounted } from 'vue';
import type { BasketCard } from '../js/types';
import { useQuasar } from 'quasar';
import { useApi } from '../js/api';

const api = useApi();
const $q = useQuasar();
const editCardNumber = ref('');
const editExpirationDate = ref('');
const editCryptogram = ref('');
const showEditCartForm = ref(false);
const showAddCartForm = ref(false);
const basketCards = ref<BasketCard[]>([]);
const editingBasketCards = ref<BasketCard | null>(null);

const notify = (message: string, color: string) =>
  $q.notify({ message, color, position: 'bottom' });

const updateStore = () => {
  const user = api.getConectedUser();
  if (user) {
    user.basketCards = basketCards.value;
    dataStore().data.currentUser = user;
  }
};

const showEditCartFormAndValue = (cart: BasketCard) => {
  showEditCartForm.value = true;
  editingBasketCards.value = cart;
  editCardNumber.value = cart.cardNumber || '';
  editExpirationDate.value = cart.expirationDate || '';
  editCryptogram.value = cart.cryptogram || '';
};

const showAddCartFormAndValue = () => {
  showAddCartForm.value = true;
  editCardNumber.value = editExpirationDate.value = editCryptogram.value = '';
};

const updateCart = () => {
  const index = basketCards.value.findIndex((cart) => cart === editingBasketCards.value);
  if (index !== -1) {
    basketCards.value[index] = {
      cardNumber: editCardNumber.value,
      expirationDate: editExpirationDate.value,
      cryptogram: editCryptogram.value,
    };
    updateStore();
    notify('Carte modifiée avec succès', 'positive');
  } else {
    notify('Erreur lors de la modification', 'negative');
  }
};

const addCart = () => {
  if (!editCardNumber.value || !editExpirationDate.value || !editCryptogram.value) {
    notify('Veuillez remplir tous les champs', 'negative');
    return;
  }

  basketCards.value.push({
    cardNumber: editCardNumber.value,
    expirationDate: editExpirationDate.value,
    cryptogram: editCryptogram.value,
  });

  updateStore();
  notify('Carte ajoutée avec succès', 'positive');
  editCardNumber.value = editExpirationDate.value = editCryptogram.value = '';
};

const deleteCart = (cart: BasketCard) => {
  const index = basketCards.value.findIndex(
    (c) =>
      c.cardNumber === cart.cardNumber &&
      c.expirationDate === cart.expirationDate &&
      c.cryptogram === cart.cryptogram,
  );

  if (index !== -1) {
    basketCards.value.splice(index, 1);
    updateStore();
    notify('Carte supprimée avec succès', 'positive');
  } else {
    notify('Erreur lors de la suppression', 'negative');
  }
};

onMounted(() => {
  const user = api.getConectedUser();
  if (user) {
    basketCards.value = user.basketCards || [];
  }
});
</script>
