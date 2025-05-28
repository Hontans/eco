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

      <!-- region ----------------adresse----------------- -->
      <div v-else-if="activeSection === 'adresses'">
        <div class="text-h5 text-center q-mb-lg">Adresses</div>
        <div v-for="address in adresses" :key="address.city ?? ''" class="q-pa-md q-gutter-sm">
          <q-banner inline-actions rounded class="bg-black text-white">
            {{ address.country }}, {{ address.city }}, {{ address.postalCode }}
            <template v-slot:action>
              <q-btn flat label="modifier" @click="showEditAddressFormfAndValue(address)" />
              <q-btn flat label="supprimer" @click="deleteAddress(address)" />
            </template>
          </q-banner>
        </div>
        <div class="text-center">
          <q-btn
            label="Ajouter une adresse"
            color="primary"
            icon="add"
            @click="showAddAddressFormAndValue"
            class="q-mt-sm q-pa-md"
          />
        </div>
      </div>

      <q-dialog v-model="showEditAddressForm">
        <q-card>
          <q-card-section>
            <div class="text-h6">Modifier l'adresse</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row q-mb-md">
              <q-input v-model="editAddressCountry" label="Pays :" outlined class="col" />
            </div>
            <div class="row q-mb-md">
              <q-input v-model="editAddressCity" label="Ville :" outlined class="col" />
            </div>
            <div class="row q-mb-md">
              <q-input v-model="editAddressPostalCode" label="Code postal :" outlined class="col" />
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Annuler" color="primary" v-close-popup />
            <q-btn flat label="Enregistrer" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="showAddAddressForm">
        <q-card>
          <q-card-section>
            <div class="text-h6">Ajouter une adresse</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="row q-mb-md">
              <q-input v-model="editAddressCountry" label="Pays :" outlined class="col" />
            </div>
            <div class="row q-mb-md">
              <q-input v-model="editAddressCity" label="Ville :" outlined class="col" />
            </div>
            <div class="row q-mb-md">
              <q-input v-model="editAddressPostalCode" label="Code postal :" outlined class="col" />
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Annuler" color="primary" v-close-popup />
            <q-btn flat label="Ajouter" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- region ----------------paiement----------------- -->
      <div v-if="activeSection === 'paiement'">
        <div class="text-h5 text-center q-mb-lg">Paiement</div>
        <div class="q-mx-auto" style="max-width: 400px">
          <div class="row q-mb-md">
            <q-btn
              label="Valider carte"
              color="primary"
              size="sm"
              class="q-ml-md self-center"
              @click="saveField('userCardNumber')"
            />
          </div>
          <div class="row q-mb-md">
            <q-btn
              label="Valider date"
              color="primary"
              size="sm"
              class="q-ml-md self-center"
              @click="saveField('userExpirationDate')"
            />
          </div>
          <div class="row q-mb-md">
            <q-btn
              label="Valider crypto"
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
import type { Adress, BasketCard } from '../js/types';

const $q = useQuasar();
const activeSection = ref('coordonnees');
const api = useApi();
const userName = ref('');
const userEmail = ref('');
const userPassword = ref('');

const basketCards = ref<BasketCard[]>([]);
const adresses = ref<Adress[]>([]);
const editAddressCountry = ref();
const showEditAddressForm = ref(false);

const showAddAddressForm = ref(false);
const editAddressCity = ref();
const editAddressPostalCode = ref();

const showEditAddressFormfAndValue = (addresse: Adress) => {
  showEditAddressForm.value = true;
  editAddressCountry.value = addresse.country;
  editAddressCity.value = addresse.city;
  editAddressPostalCode.value = addresse.postalCode;
};

const showAddAddressFormAndValue = () => {
  showAddAddressForm.value = true;
  editAddressCountry.value = '';
  editAddressCity.value = '';
  editAddressPostalCode.value = '';
};

const saveField = (fieldName: string) => {
  console.log(`Champ ${fieldName} sauvegardé`);
  $q.notify({
    message: `${fieldName} mis à jour avec succès`,
    color: 'positive',
    position: 'bottom',
  });
};

const deleteAddress = (addresse: Adress) => {
  $q.notify({
    message: 'Adresse supprimée',
    color: 'negative',
    position: 'bottom',
  });
  console.log(`Adresse supprimée: ${addresse.country}, ${addresse.city}, ${addresse.postalCode}`);
};

onMounted(() => {
  const conectedUser = api.getConectedUser();
  if (conectedUser) {
    console.log('Utilisateur connecté:', conectedUser);
    userName.value = conectedUser.name;
    userEmail.value = conectedUser.email;
    adresses.value = conectedUser.adresses || [
      {
        country: '',
        city: '',
        postalCode: '',
      },
    ];
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
