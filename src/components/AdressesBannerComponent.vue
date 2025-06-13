<template>
    <!-- #region Header -->
    <div class="text-center q-mb-lg">
      <div class="text-h4 text-primary q-mb-sm">
        <q-icon name="location_on" size="md" class="q-mr-sm" />
        Mes Adresses
      </div>
      <div class="text-body2 text-grey-7">Gérez vos adresses de livraison</div>
    </div>
    <!-- #endregion -->

    <!-- #region Address List -->
    <div v-if="adresses.length > 0" class="q-mb-lg">
      <div v-for="(address, index) in adresses" :key="address.city ?? index" class="q-mb-md">
        <q-card flat bordered class="address-card address-card-hover">
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
                  <q-btn flat dense icon="edit" color="primary" class="q-mr-xs" @click="showEditAddressFormfAndValue(address)">
                    <q-tooltip-tooltip>Modifier</q-tooltip-tooltip>
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
    <!-- #endregion -->

    <!-- #region Empty State -->
    <div v-else class="text-center q-py-xl">
      <q-icon name="location_off" size="4rem" color="grey-4" class="q-mb-md" />
      <div class="text-h6 text-grey-6 q-mb-sm">Aucune adresse enregistrée</div>
      <div class="text-body2 text-grey-5">Ajoutez votre première adresse pour commencer</div>
    </div>
    <!-- #endregion -->

    <!-- #region Add Button -->
    <div class="text-center">
      <q-btn label="Ajouter une adresse" color="primary" icon="add" class="q-px-xl q-py-sm" unelevated rounded @click="showAddAddressFormAndValue" />
    </div>
    <!-- #endregion -->

    <!-- #region Edit Dialog -->
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
            <q-input v-model="editAddressCountry" label="Pays" outlined dense prepend-icon="public" :rules="[(val) => !!val || 'Le pays est requis']" />
            <q-input v-model="editAddressCity" label="Ville" outlined dense prepend-icon="location_city" :rules="[(val) => !!val || 'La ville est requise']" />
            <q-input v-model="editAddressPostalCode" label="Code postal" outlined dense prepend-icon="markunread_mailbox" :rules="[(val) => !!val || 'Le code postal est requis']" />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Annuler" class="btn-cancel" v-close-popup />
          <q-btn label="Enregistrer" color="primary" unelevated v-close-popup @click="updateAddress" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- #endregion -->

    <!-- #region Add Dialog -->
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
            <q-input v-model="editAddressCountry" label="Pays" outlined dense prepend-icon="public" :rules="[(val) => !!val || 'Le pays est requis']" />
            <q-input v-model="editAddressCity" label="Ville" outlined dense prepend-icon="location_city" :rules="[(val) => !!val || 'La ville est requise']" />
            <q-input v-model="editAddressPostalCode" label="Code postal" outlined dense prepend-icon="markunread_mailbox" :rules="[(val) => !!val || 'Le code postal est requis']" />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="q-pa-md">
          <q-btn flat label="Annuler" class="btn-cancel" v-close-popup />
          <q-btn label="Ajouter" color="primary" unelevated v-close-popup @click="addAddress" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- #endregion -->
</template>

<script setup lang="ts">
// #region Imports
import { ref, onMounted } from 'vue';
import type { Adress } from '../js/types';
import { useQuasar } from 'quasar';
import { useApi } from '../js/api';
// #endregion

// #region Variables
const api = useApi();
const $q = useQuasar();
const editAddressCountry = ref('');
const editAddressCity = ref('');
const editAddressPostalCode = ref('');
const showEditAddressForm = ref(false);
const showAddAddressForm = ref(false);
const adresses = ref<Adress[]>([]);
const editingAddress = ref<Adress | null>(null);
// #endregion

// #region Utility Functions
const notify = (message: string, color: string) => {
  $q.notify({ message, color, position: 'bottom' });
};
// #endregion

// #region Form Functions
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
// #endregion

// #region CRUD Functions
const updateAddress = () => {
  const index = adresses.value.findIndex((addr) => addr === editingAddress.value);

    // si index n'est pas vide
  if (index !== -1) {
    adresses.value[index] = {
      country: editAddressCountry.value,
      city: editAddressCity.value,
      postalCode: editAddressPostalCode.value,
    };

    const result = api.updateUserAddresses(adresses.value);
    if (result === true) {
      notify('Adresse modifiée avec succès', 'positive');
    } else {
      notify(typeof result === 'object' ? result.message : 'Erreur lors de la modification', 'negative');
    }
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

  const result = api.updateUserAddresses(adresses.value);
  if (result === true) {
    notify('Adresse ajoutée avec succès', 'positive');
    editAddressCountry.value = editAddressCity.value = editAddressPostalCode.value = '';
  } else {
    notify(typeof result === 'object' ? result.message : 'Erreur lors de l\'ajout', 'negative');
  }
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
    const result = api.updateUserAddresses(adresses.value);
    if (result === true) {
      notify('Adresse supprimée avec succès', 'positive');
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
    adresses.value = user.adresses || [];
  }
});
// #endregion
</script>

<style scoped>
/* #region Card Styles */
.address-card {
  border-radius: 16px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.01) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.address-card-hover:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.02) !important;
}

.q-card {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 16px;
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

/* #region Input Styles */
.q-input :deep(.q-field__control) {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
}

.q-input :deep(.q-field__native) {
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
}

.q-input :deep(.q-field__control):hover {
  background: rgba(255, 255, 255, 0.15);
}

.q-input :deep(.q-field__control):focus-within {
  background: rgba(255, 255, 255, 0.18);
}
/* #endregion */

/* #region Button Styles */
.btn-cancel {
  color: rgba(255, 255, 255, 0.8);
}
/* #endregion */

/* #region Text Styles */
.text-primary {
  color: white !important;
}
/* #endregion */
</style>
