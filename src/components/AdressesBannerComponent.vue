<template>
  <div
    class="q-pa-lg bg-white shadow-2 rounded-borders"
    style="
      width: 85%;
      max-width: 700px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 16px;
    "
  >
    <!-- En-tête avec icône -->
    <div class="text-center q-mb-lg">
      <div class="text-h4 text-primary q-mb-sm">
        <q-icon name="location_on" size="md" class="q-mr-sm" />
        Mes Adresses
      </div>
      <div class="text-body2 text-grey-7">Gérez vos adresses de livraison</div>
    </div>

    <!-- Liste des adresses -->
    <div v-if="adresses.length > 0" class="q-mb-lg">
      <div v-for="(address, index) in adresses" :key="address.city ?? index" class="q-mb-md">
        <q-card flat bordered class="address-card" :class="{ 'address-card-hover': true }">
          <q-card-section class="q-pa-md">
            <div class="row items-center">
              <div class="col">
                <div class="text-h6 text-primary q-mb-xs">
                  <q-icon name="place" class="q-mr-sm" />
                  {{ address.city }}
                </div>
                <div class="text-body2 text-grey-7">
                  {{ address.country }} • {{ address.postalCode }}
                </div>
              </div>
              <div class="col-auto">
                <q-btn-group flat>
                  <q-btn
                    flat
                    dense
                    icon="edit"
                    color="primary"
                    @click="showEditAddressFormfAndValue(address)"
                    class="q-mr-xs"
                  >
                    <q-tooltip>Modifier</q-tooltip>
                  </q-btn>
                  <q-btn flat dense icon="delete" color="negative" @click="deleteAddress(address)">
                    <q-tooltip>Supprimer</q-tooltip>
                  </q-btn>
                </q-btn-group>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Message si aucune adresse -->
    <div v-else class="text-center q-py-xl">
      <q-icon name="location_off" size="4rem" color="grey-4" class="q-mb-md" />
      <div class="text-h6 text-grey-6 q-mb-sm">Aucune adresse enregistrée</div>
      <div class="text-body2 text-grey-5">Ajoutez votre première adresse pour commencer</div>
    </div>

    <!-- Bouton d'ajout -->
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

    <!-- Dialog de modification -->
    <q-dialog v-model="showEditAddressForm">
      <q-card style="min-width: 400px" class="rounded-borders">
        <q-card-section class="bg-primary text-white">
          <div class="text-h6">
            <q-icon name="edit_location" class="q-mr-sm" />
            Modifier l'adresse
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
              :rules="[(val) => !!val || 'Le pays est requis']"
            />
            <q-input
              v-model="editAddressCity"
              label="Ville"
              outlined
              dense
              prepend-icon="location_city"
              :rules="[(val) => !!val || 'La ville est requise']"
            />
            <q-input
              v-model="editAddressPostalCode"
              label="Code postal"
              outlined
              dense
              prepend-icon="markunread_mailbox"
              :rules="[(val) => !!val || 'Le code postal est requis']"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Annuler" color="grey-7" v-close-popup />
          <q-btn
            label="Enregistrer"
            color="primary"
            v-close-popup
            @click="updateAddress"
            unelevated
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Dialog d'ajout -->
    <q-dialog v-model="showAddAddressForm">
      <q-card style="min-width: 400px" class="rounded-borders">
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
              :rules="[(val) => !!val || 'Le pays est requis']"
            />
            <q-input
              v-model="editAddressCity"
              label="Ville"
              outlined
              dense
              prepend-icon="location_city"
              :rules="[(val) => !!val || 'La ville est requise']"
            />
            <q-input
              v-model="editAddressPostalCode"
              label="Code postal"
              outlined
              dense
              prepend-icon="markunread_mailbox"
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
  </div>
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

<style scoped>
.address-card {
  transition: all 0.3s ease;
  border-radius: 12px;
}

.address-card-hover:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.rounded-borders {
  border-radius: 12px;
}
</style>
