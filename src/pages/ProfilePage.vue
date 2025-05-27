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
          <q-input v-model="userName" label="Identifiant :" outlined class="q-mb-md" />
          <q-input v-model="userEmail" label="Mail :" outlined type="email" class="q-mb-md" />
          <q-input
            v-model="userPassword"
            label="Mots de passe"
            outlined
            type="password"
            class="q-mb-md"
          />
          <div class="text-center q-mt-lg">
            <q-btn label="Valider" color="primary" @click="saveUserData" />
          </div>
        </div>
      </div>
      <div v-else-if="activeSection === 'adresses'">
        <div class="text-h5 text-center q-mb-lg">Adresses</div>
        <div class="q-mx-auto" style="max-width: 400px">
          <q-input v-model="userCountry" label="Pays :" outlined class="q-mb-md" />
          <q-input v-model="userCity" label="Ville :" outlined class="q-mb-md" />
          <q-input v-model="userPostalCode" label="Code postal :" outlined class="q-mb-md" />
          <div class="text-center q-mt-lg">
            <q-btn label="Valider" color="primary" @click="saveUserData" />
          </div>
        </div>
      </div>
      <div v-else-if="activeSection === 'paiement'">
        <div class="text-h5 text-center q-mb-lg">Paiement</div>
        <div class="q-mx-auto" style="max-width: 400px">
          <q-input v-model="userCardNumber" label="Numéro de carte :" outlined class="q-mb-md" />
          <q-input
            v-model="userExpirationDate"
            label="Date d'expiration :"
            outlined
            class="q-mb-md"
          />
          <q-input v-model="userCryptogram" label="Cryptogramme :" outlined class="q-mb-md" />
          <div class="text-center q-mt-lg">
            <q-btn label="Valider" color="primary" @click="saveUserData" />
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

const saveUserData = () => {
  console.log('Données sauvegardées:');
  $q.notify({
    message: 'Profil mis à jour avec succès',
    color: 'positive',
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
