<template>
  <q-page class="flex">
    <div class="q-pa-md" style="max-width: 180px; width: 100%">
      <q-list bordered separator class="rounded-borders">
        <q-item
          clickable
          v-ripple
          @click="activeSection = 'coordonnees'"
          :class="activeSection === 'coordonnees' ? 'bg-grey-2' : ''"
        >
          <q-item-section class="text-center">
            <q-item-label>Coordonnées</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          @click="activeSection = 'adresses'"
          :class="activeSection === 'adresses' ? 'bg-grey-2' : ''"
        >
          <q-item-section class="text-center">
            <q-item-label>Adresses</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          @click="activeSection = 'paiement'"
          :class="activeSection === 'paiement' ? 'bg-grey-2' : ''"
        >
          <q-item-section class="text-center">
            <q-item-label>Paiement</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
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
      <div v-if="activeSection === 'coordonnees'">
        <div class="text-h5 text-center q-mb-lg">Coordonnées</div>
        <div class="q-mx-auto" style="max-width: 400px">
          <div class="row q-mb-md">
            <q-input v-model="userName" label="Identifiant :" outlined class="col" />
            <q-btn
              label="Valider"
              color="primary"
              size="sm"
              class="q-ml-md self-center"
              @click="saveField('userName')"
            />
          </div>
          <div class="row q-mb-md">
            <q-input v-model="userEmail" label="Mail :" outlined type="email" class="col" />
            <q-btn
              label="Valider"
              color="primary"
              size="sm"
              class="q-ml-md self-center"
              @click="saveField('userEmail')"
            />
          </div>
          <div class="row q-mb-md">
            <q-input
              v-model="userPassword"
              label="Mots de passe"
              outlined
              type="password"
              class="col"
            />
            <q-btn
              label="Valider"
              color="primary"
              size="sm"
              class="q-ml-md self-center"
              @click="saveField('userPassword')"
            />
          </div>
        </div>
      </div>
      <div v-else-if="activeSection === 'adresses'">
        <div class="text-h5 text-center q-mb-lg">Adresses</div>
        <div class="q-pa-md q-gutter-sm">
          <q-banner inline-actions rounded class="bg-black text-white">
            {{ userCountry }}, {{ userCity }}, {{ userPostalCode }}
            <template v-slot:action>
              <q-btn flat :label="showAddressForm ? 'fermer' : 'modifier'" @click="editAddress" />
              <q-btn flat label="supprimer" @click="deleteAddress" />
            </template>
          </q-banner>
          <q-btn
            label="Ajouter une adresse"
            color="primary"
            icon="add"
            @click="editAddress"
            class="q-mt-sm"
          />
        </div>
        <div v-if="showAddressForm" class="q-mx-auto" style="max-width: 400px">
          <div class="row q-mb-md">
            <q-input v-model="userCountry" label="Pays :" outlined class="col" />
            <q-btn
              label="Valider"
              color="primary"
              size="sm"
              class="q-ml-md self-center"
              @click="saveField('userCountry')"
            />
          </div>
          <div class="row q-mb-md">
            <q-input v-model="userCity" label="Ville :" outlined class="col" />
            <q-btn
              label="Valider"
              color="primary"
              size="sm"
              class="q-ml-md self-center"
              @click="saveField('userCity')"
            />
          </div>
          <div class="row q-mb-md">
            <q-input v-model="userPostalCode" label="Code postal :" outlined class="col" />
            <q-btn
              label="Valider"
              color="primary"
              size="sm"
              class="q-ml-md self-center"
              @click="saveField('userPostalCode')"
            />
          </div>
        </div>
      </div>
      <div v-else-if="activeSection === 'paiement'">
        <div class="text-h5 text-center q-mb-lg">Paiement</div>
        <div class="q-mx-auto" style="max-width: 400px">
          <div class="row q-mb-md">
            <q-input v-model="userCardNumber" label="Numéro de carte :" outlined class="col" />
            <q-btn
              label="Valider"
              color="primary"
              size="sm"
              class="q-ml-md self-center"
              @click="saveField('userCardNumber')"
            />
          </div>
          <div class="row q-mb-md">
            <q-input
              v-model="userExpirationDate"
              label="Date d'expiration :"
              outlined
              class="col"
            />
            <q-btn
              label="Valider"
              color="primary"
              size="sm"
              class="q-ml-md self-center"
              @click="saveField('userExpirationDate')"
            />
          </div>
          <div class="row q-mb-md">
            <q-input v-model="userCryptogram" label="Cryptogramme :" outlined class="col" />
            <q-btn
              label="Valider"
              color="primary"
              size="sm"
              class="q-ml-md self-center"
              @click="saveField('userCryptogram')"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useApi } from '../js/api';
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const activeSection = ref('coordonnees');
const api = useApi();
const userName = ref('');
const userEmail = ref('');
const userPassword = ref('');
const userCountry = ref('');
const userCity = ref('');
const userPostalCode = ref('');
const userCardNumber = ref('');
const userExpirationDate = ref('');
const userCryptogram = ref('');
const showAddressForm = ref(false);

const saveField = (fieldName: string) => {
  console.log(`Champ ${fieldName} sauvegardé`);
  $q.notify({
    message: `${fieldName} mis à jour avec succès`,
    color: 'positive',
    position: 'bottom',
  });
};

const editAddress = () => {
  showAddressForm.value = !showAddressForm.value;
};

// Fonction pour supprimer l'adresse
const deleteAddress = () => {
  // Logique de suppression à implémenter
  $q.notify({
    message: 'Adresse supprimée',
    color: 'negative',
    position: 'bottom',
  });
};

onMounted(() => {
  const conectedUser = api.getConectedUser();
  if (conectedUser) {
    userName.value = conectedUser.name;
    userEmail.value = conectedUser.email;
    userCountry.value = conectedUser.country || '';
    userCity.value = conectedUser.city || '';
    userPostalCode.value = conectedUser.postalCode || '';
    userCardNumber.value = conectedUser.cardNumber || '';
    userExpirationDate.value = conectedUser.expirationDate || '';
    userCryptogram.value = conectedUser.cryptogram || '';
  } else {
    $q.notify({
      message: 'Aucun utilisateur connecté',
      color: 'negative',
      position: 'bottom',
    });
  }
});
</script>
