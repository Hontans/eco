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
              label="Valider email"
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
              label="Valider mot de passe"
              color="primary"
              size="sm"
              class="q-ml-md self-center"
              @click="saveField('userPassword')"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="activeSection === 'adresses'">
      <AdressesBannerComponent />
    </div>
    <div v-if="activeSection === 'paiement'">
      <PaymentBannerComponent />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useApi } from '../js/api';
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import AdressesBannerComponent from '../components/AdressesBannerComponent.vue';
import PaymentBannerComponent from '../components/PaymentBannerComponent.vue';

const $q = useQuasar();
const activeSection = ref('coordonnees');
const api = useApi();
const userName = ref('');
const userEmail = ref('');
const userPassword = ref('');
const basketCards = ref<BasketCard[]>([]);

const saveField = (fieldName: string) => {
  console.log(`Champ ${fieldName} sauvegardé`);
  $q.notify({
    message: `${fieldName} mis à jour avec succès`,
    color: 'positive',
    position: 'bottom',
  });
};

onMounted(() => {
  const conectedUser = api.getConectedUser();
  if (conectedUser) {
    console.log('Utilisateur connecté:', conectedUser);
    userName.value = conectedUser.name;
    userEmail.value = conectedUser.email;
    basketCards.value = conectedUser.basketCards || [
      {
        cardNumber: '',
        expirationDate: '',
        cryptogram: '',
      },
    ];
  } else {
    $q.notify({
      message: 'Aucun utilisateur connecté',
      color: 'negative',
      position: 'bottom',
    });
  }
});
</script>
