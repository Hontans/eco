<template>
  <q-page class="flex">
    <!-- #region Sidebar Navigation -->
    <div class="q-pa-md" style="max-width: 180px; width: 100%">
      <q-list separator>
        <q-item clickable v-ripple @click="activeSection = 'coordonnees'" :class="activeSection === 'coordonnees' ? 'bg-primary text-white' : 'text-primary'" class="glow transition-all">
          <q-item-section class="text-center">
            <q-icon name="person" size="sm" class="q-mb-xs" />
            <q-item-label class="text-weight-medium">Coordonnées</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="activeSection = 'adresses'" :class="activeSection === 'adresses' ? 'bg-primary text-white' : 'text-primary'" class="glow transition-all">
          <q-item-section class="text-center">
            <q-icon name="location_on" size="sm" class="q-mb-xs" />
            <q-item-label class="text-weight-medium">Adresses</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="activeSection = 'paiement'" :class="activeSection === 'paiement' ? 'bg-primary text-white' : 'text-primary'" class="glow transition-all">
          <q-item-section class="text-center">
            <q-icon name="payment" size="sm" class="q-mb-xs" />
            <q-item-label class="text-weight-medium">Paiement</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <!-- #endregion Sidebar Navigation -->

    <!-- #region Main Content -->
    <div class="q-pa-lg bg-white rounded-borders" style="width: 85%; max-width: 700px; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); border-radius: 16px;">
      <!-- #region Coordonnées Section -->
      <div v-if="activeSection === 'coordonnees'">
        <div class="text-h4 text-weight-bold text-white text-center q-mb-xl">
          <q-icon name="person_outline" size="md" class="q-mr-sm" />
          Mes Coordonnées
        </div>

        <div class="q-mx-auto" style="max-width: 600px">
          <!-- #region Identifiant -->
          <q-card flat bordered class="q-mb-lg profile-card">
        <q-card-section class="q-pa-lg">
          <div class="text-subtitle1 text-weight-medium text-white q-mb-md">
            <q-icon name="badge" class="q-mr-sm" />
            Identifiant
          </div>
          <div class="row items-end q-col-gutter-md">
            <div class="col-12 col-md-8">
          <q-input v-model="userName" outlined class="full-width modern-input" bg-color="grey-1" dense hide-bottom-space placeholder="Votre identifiant">
            <template v-slot:prepend>
              <q-icon name="person" color="primary" />
            </template>
          </q-input>
            </div>
            <div class="col-12 col-md-4">
          <q-btn label="Sauvegarder" color="primary" class="full-width" icon="save" @click="saveField('Identifiant')" unelevated rounded size="md" />
            </div>
          </div>
        </q-card-section>
          </q-card>
          <!-- #endregion Identifiant -->

          <!-- #region Email -->
          <q-card flat bordered class="q-mb-lg profile-card">
        <q-card-section class="q-pa-lg">
          <div class="text-subtitle1 text-weight-medium text-white q-mb-md">
            <q-icon name="alternate_email" class="q-mr-sm" />
            Adresse email
          </div>
          <div class="row items-end q-col-gutter-md">
            <div class="col-12 col-md-8">
          <q-input v-model="userEmail" outlined type="email" class="full-width modern-input" bg-color="grey-1" dense hide-bottom-space placeholder="votre@email.com">
            <template v-slot:prepend>
              <q-icon name="email" color="primary" />
            </template>
          </q-input>
            </div>
            <div class="col-12 col-md-4">
          <q-btn label="Sauvegarder" color="primary" class="full-width" icon="save" @click="saveField('Email')" unelevated rounded size="md" />
            </div>
          </div>
        </q-card-section>
          </q-card>
          <!-- #endregion Email -->

          <!-- #region Password -->
          <q-card flat bordered class="profile-card">
        <q-card-section class="q-pa-lg">
          <div class="text-subtitle1 text-weight-medium text-white q-mb-md">
            <q-icon name="security" class="q-mr-sm" />
            Mot de passe
          </div>
          <div class="row items-end q-col-gutter-md">
            <div class="col-12 col-md-8">
          <q-input v-model="userPassword" outlined class="full-width modern-input" bg-color="grey-1" dense hide-bottom-space placeholder="Votre mot de passe" :type="isPwd ? 'password' : 'text'">
            <template v-slot:prepend>
              <q-icon name="lock" color="primary" />
            </template>
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer text-grey-6" @click="isPwd = !isPwd" size="sm" />
            </template>
          </q-input>
            </div>
            <div class="col-12 col-md-4">
          <q-btn label="Sauvegarder" color="primary" class="full-width" icon="save" @click="saveField('Mot de passe')" unelevated rounded size="md" />
            </div>
          </div>
        </q-card-section>
          </q-card>
          <!-- #endregion Password -->
        </div>
      </div>
      <!-- #endregion Coordonnées Section -->

      <!-- #region Adresses Section -->
      <div v-if="activeSection === 'adresses'">
        <AdressesBannerComponent />
      </div>
      <!-- #endregion Adresses Section -->

      <!-- #region Paiement Section -->
      <div v-if="activeSection === 'paiement'">
        <PaymentBannerComponent />
      </div>
      <!-- #endregion Paiement Section -->
    </div>
    <!-- #endregion Main Content -->
  </q-page>
</template>

<script setup lang="ts">
// #region Imports
import { useApi } from '../js/api';
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import AdressesBannerComponent from '../components/AdressesBannerComponent.vue';
import PaymentBannerComponent from '../components/PaymentBannerComponent.vue';
// #endregion Imports

// #region Variables and Stores
const $q = useQuasar();
const activeSection = ref('coordonnees');
const api = useApi();
const userName = ref('');
const userEmail = ref('');
const userPassword = ref('');
const isPwd = ref(true);
// #endregion Variables and Stores

// #region Methods
const saveField = (fieldName: string) =>
{
  console.log(`Champ ${fieldName} sauvegardé`);
  $q.notify(
  {
    message: `${fieldName} mis à jour avec succès`,
    color: 'positive',
    position: 'bottom',
  });
};

onMounted(() =>
{
  const conectedUser = api.getConectedUser();
  if (conectedUser)
  {
    console.log('Utilisateur connecté:', conectedUser);
    userName.value = conectedUser.name;
    userEmail.value = conectedUser.email;
  }
  else
  {
    $q.notify(
    {
      message: 'Aucun utilisateur connecté',
      color: 'negative',
      position: 'bottom',
    });
  }
});
// #endregion Methods
</script>

<style scoped>
/* #region Profile Card Styles */
.profile-card
{
  border-radius: 16px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.01) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.01);
}

.profile-card:hover
{
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.02) !important;
}
/* #endregion Profile Card Styles */

/* #region Input Styles */
.modern-input :deep(.q-field__control)
{
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.modern-input :deep(.q-field__native)
{
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
}

.modern-input :deep(.q-field__control):hover
{
  background: rgba(255, 255, 255, 0.15);
}

.modern-input :deep(.q-field__control):focus-within
{
  background: rgba(255, 255, 255, 0.18);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}
/* #endregion Input Styles */

/* #region List Item Styles */
.q-item
{
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  margin: 4px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.q-item:hover
{
  background: rgba(255, 255, 255, 0.15) !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.q-item.bg-primary
{
  background: rgba(25, 118, 210, 0.2) !important;
}
/* #endregion List Item Styles */

/* #region Glassmorphisme Effects */
.q-page > div:nth-child(2)
{
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.1);
}
/* #endregion Glassmorphisme Effects */

/* #region Button Styles */
.q-btn
{
  background: rgba(25, 118, 210, 0.9) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  color: white !important;
}

.q-btn:hover
{
  background: rgba(25, 118, 210, 1) !important;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(25, 118, 210, 0.4);
}
/* #endregion Button Styles */

/* #region Typography Styles */
.text-h4
{
  padding: 16px;
}
/* #endregion Typography Styles */
</style>
