<template>
    <!-- #region Header -->
    <div class="text-center q-mb-lg">
      <div class="text-h4 text-primary q-mb-sm">
        <q-icon name="payment" size="md" class="q-mr-sm" />
        Mes Cartes de Paiement
      </div>
      <div class="text-body2 text-grey-7">Gérez vos moyens de paiement</div>
    </div>
    <!-- #endregion -->

    <!-- #region Cards List -->
    <div v-if="basketCards.length > 0" class="q-mb-lg">
      <div v-for="(cart, index) in basketCards" :key="cart.cardNumber ?? index" class="q-mb-md">
        <q-card flat bordered class="payment-card payment-card-hover">
          <q-card-section class="q-pa-md">
            <div class="row items-center">
              <div class="col">
                <div class="text-h6 text-primary q-mb-xs">
                  <q-icon name="credit_card" class="q-mr-sm" />
                  **** **** **** {{ cart.cardNumber?.slice(-4) }}
                </div>
                <div class="text-body2 text-grey-7">
                  <q-icon name="event" size="16px" class="q-mr-xs" />
                  Expire le {{ cart.expirationDate }}
                </div>
              </div>
              <div class="col-auto">
                <q-btn-group flat>
                  <q-btn flat dense icon="edit" color="primary" @click="showEditCartFormAndValue(cart)" class="q-mr-xs">
                    <q-tooltip>Modifier</q-tooltip>
                  </q-btn>
                  <q-btn flat dense icon="delete" color="negative" @click="deleteCart(cart)">
                    <q-tooltip>Supprimer</q-tooltip>
                  </q-btn>
                </q-btn-group>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Empty State -->
    <div v-else class="text-center q-py-xl">
      <q-icon name="credit_card_off" size="4rem" color="grey-4" class="q-mb-md" />
      <div class="text-h6 text-grey-6 q-mb-sm">Aucune carte enregistrée</div>
      <div class="text-body2 text-grey-5">
        Ajoutez votre première carte pour effectuer des paiements
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region Add Button -->
    <div class="text-center">
      <q-btn label="Ajouter une carte" color="primary" icon="add" @click="showAddCartFormAndValue" class="q-px-xl q-py-sm" unelevated rounded />
    </div>
    <!-- #endregion -->

    <!-- #region Edit Dialog -->
    <q-dialog v-model="showEditCartForm">
      <q-card style="min-width: 450px" class="rounded-borders">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">
            <q-icon name="edit" class="q-mr-sm" />
            Modifier la carte
          </div>
        </q-card-section>

        <q-card-section class="q-pt-lg">
          <div class="q-gutter-md">
            <q-input v-model="editCardNumber" label="Numéro de carte" outlined dense prepend-icon="credit_card" mask="#### #### #### ####" placeholder="1234 5678 9012 3456" :rules="[(val) => !!val || 'Le numéro de carte est requis']" />
            <q-input v-model="editExpirationDate" label="Date d'expiration" outlined dense prepend-icon="event" mask="##/##" placeholder="MM/AA" :rules="[(val) => !!val || 'La date d\'expiration est requise']" />
            <q-input v-model="editCryptogram" label="Code de sécurité (CVV)" outlined dense prepend-icon="security" mask="###" placeholder="123" type="password" :rules="[(val) => !!val || 'Le code de sécurité est requis']" />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Annuler" class="btn-cancel" v-close-popup />
          <q-btn label="Enregistrer" color="primary" v-close-popup @click="updateCart" unelevated />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- #endregion -->

    <!-- #region Add Dialog -->
    <q-dialog v-model="showAddCartForm">
      <q-card style="min-width: 450px" class="rounded-borders">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">
            <q-icon name="add_card" class="q-mr-sm" />
            Ajouter une carte
          </div>
        </q-card-section>

        <q-card-section class="q-pt-lg">
          <div class="q-gutter-md">
            <q-input v-model="editCardNumber" label="Numéro de carte" outlined dense prepend-icon="credit_card" mask="#### #### #### ####" placeholder="1234 5678 9012 3456" :rules="[(val) => !!val || 'Le numéro de carte est requis']" />
            <q-input v-model="editExpirationDate" label="Date d'expiration" outlined dense prepend-icon="event" mask="##/##" placeholder="MM/AA" :rules="[(val) => !!val || 'La date d\'expiration est requise']" />
            <q-input v-model="editCryptogram" label="Code de sécurité (CVV)" outlined dense prepend-icon="security" mask="###" placeholder="123" type="password" :rules="[(val) => !!val || 'Le code de sécurité est requis']" />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Annuler" class="btn-cancel" v-close-popup />
          <q-btn label="Ajouter" color="primary" v-close-popup @click="addCart" unelevated />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- #endregion -->
</template>

<script setup lang="ts">
// #region Imports
import { ref, onMounted } from 'vue';
import type { BasketCard } from '../js/types';
import { useQuasar } from 'quasar';
import { useApi } from '../js/api';
// #endregion

// #region Variables
const api = useApi();
const $q = useQuasar();
const editCardNumber = ref('');
const editExpirationDate = ref('');
const editCryptogram = ref('');
const showEditCartForm = ref(false);
const showAddCartForm = ref(false);
const basketCards = ref<BasketCard[]>([]);
const editingBasketCards = ref<BasketCard | null>(null);
// #endregion

// #region Helper Functions
const notify = (message: string, color: string) => {
  $q.notify({ message, color, position: 'bottom' });
};
// #endregion

// #region Form Display Functions
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
// #endregion

// #region Card Management Functions
const updateCart = () => {
  const index = basketCards.value.findIndex((cart) => cart === editingBasketCards.value);

  if (index !== -1) {
    basketCards.value[index] = {
      cardNumber: editCardNumber.value,
      expirationDate: editExpirationDate.value,
      cryptogram: editCryptogram.value,
    };

    const result = api.updateUserPaymentCards(basketCards.value);
    if (result === true) {
      notify('Carte modifiée avec succès', 'positive');
    } else {
      notify(typeof result === 'object' ? result.message : 'Erreur lors de la modification', 'negative');
    }
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

  const result = api.updateUserPaymentCards(basketCards.value);
  if (result === true) {
    notify('Carte ajoutée avec succès', 'positive');
    editCardNumber.value = editExpirationDate.value = editCryptogram.value = '';
  } else {
    notify(typeof result === 'object' ? result.message : 'Erreur lors de l\'ajout', 'negative');
  }
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

    const result = api.updateUserPaymentCards(basketCards.value);
    if (result === true) {
      notify('Carte supprimée avec succès', 'positive');
    } else {
      notify(typeof result === 'object' ? result.message : 'Erreur lors de la suppression', 'negative');
    }
  } else {
    notify('Erreur lors de la suppression', 'negative');
  }
};
// #endregion

// #region Lifecycle
onMounted(() => {
  const user = api.getConectedUser();
  if (user) {
    basketCards.value = user.basketCards || [];
  }
});
// #endregion
</script>

<style scoped>
/* #region Payment Card Styles */
.payment-card {
  border-radius: 16px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.01) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.payment-card-hover:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.02) !important;
}
/* #endregion */

/* #region Dialog Styles */
.rounded-borders {
  border-radius: 12px;
}

.q-dialog .q-card {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
}
/* #endregion */

/* #region Button Styles */
.btn-cancel {
  color: rgba(255, 255, 255, 0.8);
}
/* #endregion */

/* #region Input Styles */
.q-input :deep(.q-field__control) {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
}

.q-input :deep(.q-field__control):hover {
  background: rgba(255, 255, 255, 0.15);
}

.q-input :deep(.q-field__control):focus-within {
  background: rgba(255, 255, 255, 0.18);
}
/* #endregion */

/* #region Card Styles */
.q-card {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 16px;
}
/* #endregion */

/* #region Text Styles */
.text-primary {
  color: white !important;
}
/* #endregion */
</style>

