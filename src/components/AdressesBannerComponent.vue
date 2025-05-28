<template>
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
        <q-btn flat label="Enregistrer" color="primary" v-close-popup @click="updateAddress" />
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
        <q-btn flat label="Ajouter" color="primary" v-close-popup @click="addAddress" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { dataStore } from '../stores/data-store';
import { ref, onMounted } from 'vue';
import type { Adress } from '../js/types';
import { useQuasar } from 'quasar';
import { useApi } from '../js/api';

const api = useApi();
const $q = useQuasar();
const editAddressCountry = ref();
const showEditAddressForm = ref(false);
const showAddAddressForm = ref(false);
const editAddressCity = ref();
const editAddressPostalCode = ref();
const adresses = ref<Adress[]>([]);
const editingAddress = ref<Adress | null>(null);

const showEditAddressFormfAndValue = (addresse: Adress) => {
  showEditAddressForm.value = true;
  editingAddress.value = addresse; // Stocker l'adresse en cours de modification
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

const updateAddress = () => {
  const connectedUser = api.getConectedUser();
  if (connectedUser && editingAddress.value) {
    // Trouver l'index de l'adresse à modifier
    const index = adresses.value.findIndex((addr) => addr === editingAddress.value);

    if (index !== -1) {
      // Mettre à jour l'adresse avec les nouvelles valeurs
      adresses.value[index] = {
        country: editAddressCountry.value,
        city: editAddressCity.value,
        postalCode: editAddressPostalCode.value,
      };
      connectedUser.adresses = adresses.value;
      const store = dataStore();
      store.data.currentUser = connectedUser;
      $q.notify({
        message: 'Adresse modifiée avec succès',
        color: 'positive',
        position: 'bottom',
      });
    } else {
      $q.notify({
        message: 'Adresse non trouvée',
        color: 'negative',
        position: 'bottom',
      });
    }
  } else {
    $q.notify({
      message: 'Erreur lors de la modification',
      color: 'negative',
      position: 'bottom',
    });
  }
};

const addAddress = () => {
  // Vérifier que tous les champs sont remplis
  if (!editAddressCountry.value || !editAddressCity.value || !editAddressPostalCode.value) {
    $q.notify({
      message: 'Veuillez remplir tous les champs',
      color: 'negative',
      position: 'bottom',
    });
    return;
  }

  const connectedUser = api.getConectedUser();
  if (connectedUser) {
    // Créer la nouvelle adresse
    const newAddress: Adress = {
      country: editAddressCountry.value,
      city: editAddressCity.value,
      postalCode: editAddressPostalCode.value,
    };

    // Ajouter l'adresse au tableau local
    adresses.value.push(newAddress);

    // Mettre à jour l'utilisateur connecté dans le store
    connectedUser.adresses = adresses.value;
    const store = dataStore();
    store.data.currentUser = connectedUser;

    $q.notify({
      message: 'Adresse ajoutée avec succès',
      color: 'positive',
      position: 'bottom',
    });

    // Réinitialiser les champs
    editAddressCountry.value = '';
    editAddressCity.value = '';
    editAddressPostalCode.value = '';
  } else {
    $q.notify({
      message: "Erreur lors de l'ajout",
      color: 'negative',
      position: 'bottom',
    });
  }
};

const deleteAddress = (addresse: Adress) => {
  // Supprimer l'adresse du tableau local
  const index = adresses.value.findIndex(
    (addr) =>
      addr.country === addresse.country &&
      addr.city === addresse.city &&
      addr.postalCode === addresse.postalCode,
  );

  if (index !== -1) {
    adresses.value.splice(index, 1);
    const connectedUser = api.getConectedUser();
    if (connectedUser) {
      connectedUser.adresses = adresses.value;
      const store = dataStore();
      store.data.currentUser = connectedUser;
    }
    $q.notify({
      message: 'Adresse supprimée avec succès',
      color: 'positive',
      position: 'bottom',
    });
  } else {
    $q.notify({
      message: 'Erreur lors de la suppression',
      color: 'negative',
      position: 'bottom',
    });
  }
};

onMounted(() => {
  const conectedUser = api.getConectedUser();
  if (conectedUser) {
    adresses.value = conectedUser.adresses || [
      {
        country: '',
        city: '',
        postalCode: '',
      },
    ];
  }
});
</script>
