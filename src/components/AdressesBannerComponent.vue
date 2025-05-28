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
const editAddressCountry = ref('');
const editAddressCity = ref('');
const editAddressPostalCode = ref('');
const showEditAddressForm = ref(false);
const showAddAddressForm = ref(false);
const adresses = ref<Adress[]>([]);
const editingAddress = ref<Adress | null>(null);

const notify = (message: string, color: string) =>
  $q.notify({ message, color, position: 'bottom' });

const updateStore = () => {
  const user = api.getConectedUser();
  if (user) {
    user.adresses = adresses.value;
    dataStore().data.currentUser = user;
  }
};

const showEditAddressFormfAndValue = (address: Adress) => {
  showEditAddressForm.value = true;
  editingAddress.value = address;
  editAddressCountry.value = address.country || '';
  editAddressCity.value = address.city || '';
  editAddressPostalCode.value = address.postalCode || '';
};

const showAddAddressFormAndValue = () => {
  showAddAddressForm.value = true;
  editAddressCountry.value = editAddressCity.value = editAddressPostalCode.value = '';
};

const updateAddress = () => {
  const index = adresses.value.findIndex((addr) => addr === editingAddress.value);
  if (index !== -1) {
    adresses.value[index] = {
      country: editAddressCountry.value,
      city: editAddressCity.value,
      postalCode: editAddressPostalCode.value,
    };
    updateStore();
    notify('Adresse modifiée avec succès', 'positive');
  } else {
    notify('Erreur lors de la modification', 'negative');
  }
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

  updateStore();
  notify('Adresse ajoutée avec succès', 'positive');
  editAddressCountry.value = editAddressCity.value = editAddressPostalCode.value = '';
};

const deleteAddress = (address: Adress) => {
  const index = adresses.value.findIndex(
    (addr) =>
      addr.country === address.country &&
      addr.city === address.city &&
      addr.postalCode === address.postalCode,
  );

  if (index !== -1) {
    adresses.value.splice(index, 1);
    updateStore();
    notify('Adresse supprimée avec succès', 'positive');
  } else {
    notify('Erreur lors de la suppression', 'negative');
  }
};

onMounted(() => {
  const user = api.getConectedUser();
  if (user) {
    adresses.value = user.adresses || [];
  }
});
</script>
