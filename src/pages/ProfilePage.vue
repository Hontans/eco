<template>
  <q-page class="flex">
    <div class="q-pa-md" style="max-width: 180px; width: 100%">
      <q-list bordered separator class="rounded-borders shadow-2">
        <q-item
          clickable
          v-ripple
          @click="activeSection = 'coordonnees'"
          :class="activeSection === 'coordonnees' ? 'bg-primary text-white' : 'bg-white'"
          class="transition-all"
        >
          <q-item-section class="text-center">
            <q-icon name="person" size="sm" class="q-mb-xs" />
            <q-item-label class="text-weight-medium">Coordonnées</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          @click="activeSection = 'adresses'"
          :class="activeSection === 'adresses' ? 'bg-primary text-white' : 'bg-white'"
          class="transition-all"
        >
          <q-item-section class="text-center">
            <q-icon name="location_on" size="sm" class="q-mb-xs" />
            <q-item-label class="text-weight-medium">Adresses</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          @click="activeSection = 'paiement'"
          :class="activeSection === 'paiement' ? 'bg-primary text-white' : 'bg-white'"
          class="transition-all"
        >
          <q-item-section class="text-center">
            <q-icon name="payment" size="sm" class="q-mb-xs" />
            <q-item-label class="text-weight-medium">Paiement</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
    <div
      class="q-pa-lg bg-white shadow-4 rounded-borders"
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
      <div v-if="activeSection === 'coordonnees'">
        <div class="text-h4 text-weight-bold text-primary text-center q-mb-xl">
          <q-icon name="person_outline" size="md" class="q-mr-sm" />
          Mes Coordonnées
        </div>

        <div class="q-mx-auto" style="max-width: 600px">
          <!-- Nom/Identifiant -->
          <q-card flat bordered class="q-mb-lg profile-card">
            <q-card-section class="q-pa-lg">
              <div class="text-subtitle1 text-weight-medium text-grey-8 q-mb-md">
                <q-icon name="badge" class="q-mr-sm" />
                Identifiant
              </div>
              <div class="row items-end q-col-gutter-md">
                <div class="col-12 col-md-8">
                  <q-input
                    v-model="userName"
                    outlined
                    class="full-width modern-input"
                    bg-color="grey-1"
                    dense
                    hide-bottom-space
                    placeholder="Votre identifiant"
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" color="primary" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-md-4">
                  <q-btn
                    label="Sauvegarder"
                    color="primary"
                    class="full-width"
                    icon="save"
                    @click="saveField('Identifiant')"
                    unelevated
                    rounded
                    size="md"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Email -->
          <q-card flat bordered class="q-mb-lg profile-card">
            <q-card-section class="q-pa-lg">
              <div class="text-subtitle1 text-weight-medium text-grey-8 q-mb-md">
                <q-icon name="alternate_email" class="q-mr-sm" />
                Adresse email
              </div>
              <div class="row items-end q-col-gutter-md">
                <div class="col-12 col-md-8">
                  <q-input
                    v-model="userEmail"
                    outlined
                    type="email"
                    class="full-width modern-input"
                    bg-color="grey-1"
                    dense
                    hide-bottom-space
                    placeholder="votre@email.com"
                  >
                    <template v-slot:prepend>
                      <q-icon name="email" color="primary" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-md-4">
                  <q-btn
                    label="Sauvegarder"
                    color="primary"
                    class="full-width"
                    icon="save"
                    @click="saveField('Email')"
                    unelevated
                    rounded
                    size="md"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>

          <!-- Mot de passe -->
          <q-card flat bordered class="profile-card">
            <q-card-section class="q-pa-lg">
              <div class="text-subtitle1 text-weight-medium text-grey-8 q-mb-md">
                <q-icon name="security" class="q-mr-sm" />
                Mot de passe
              </div>
              <div class="row items-end q-col-gutter-md">
                <div class="col-12 col-md-8">
                  <q-input
                    v-model="userPassword"
                    outlined
                    class="full-width modern-input"
                    bg-color="grey-1"
                    dense
                    hide-bottom-space
                    placeholder="Votre mot de passe"
                    :type="isPwd ? 'password' : 'text'"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" color="primary" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer text-grey-6"
                        @click="isPwd = !isPwd"
                        size="sm"
                      />
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-md-4">
                  <q-btn
                    label="Sauvegarder"
                    color="primary"
                    class="full-width"
                    icon="save"
                    @click="saveField('Mot de passe')"
                    unelevated
                    rounded
                    size="md"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
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
const isPwd = ref(true);

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
  } else {
    $q.notify({
      message: 'Aucun utilisateur connecté',
      color: 'negative',
      position: 'bottom',
    });
  }
});
</script>

<style scoped>
.profile-card {
  border-radius: 16px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.01) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.01);
  border: 1px solid rgba(255, 255, 255, 0.03) !important;
}

.profile-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.02) !important;
}

.modern-input :deep(.q-field__control) {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.modern-input :deep(.q-field__native) {
  font-weight: 500;
  color: rgba(0, 0, 0, 0.8);
}

.modern-input :deep(.q-field__control):hover {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.modern-input :deep(.q-field__control):focus-within {
  background: rgba(255, 255, 255, 0.18);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

/* Effet glassmorphisme pour la sidebar */
.q-list {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.q-item {
  background: rgba(255, 255, 255, 0.05) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  margin: 4px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.q-item:hover {
  background: rgba(255, 255, 255, 0.15) !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.q-item.bg-primary {
  background: rgba(25, 118, 210, 0.2) !important;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
}

/* Effet glassmorphisme pour le conteneur principal */
.q-page > div:nth-child(2) {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.1);
}

/* Effet glassmorphisme pour les boutons */
.q-btn {
  background: rgba(25, 118, 210, 0.15) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.q-btn:hover {
  background: rgba(25, 118, 210, 0.25) !important;
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(25, 118, 210, 0.2);
}

/* Style pour le titre principal - sans cadre */
.text-h4 {
  padding: 16px;
}

/* Titres des sections d'inputs en bleu */
.text-subtitle1 {
  color: #1976d2 !important;
}
</style>
