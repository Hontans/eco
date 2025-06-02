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
      class="q-pa-md q-ml-md bg-white shadow-2 rounded-borders"
      style="
        width: 80%;
        max-width: 600px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        border-radius: 12px;
      "
    >
      <div v-if="activeSection === 'coordonnees'">
        <div class="text-h5 text-weight-bold text-primary text-center q-mb-xl">Mes Coordonnées</div>
        <div class="q-mx-auto" style="max-width: 500px">
          <q-card flat bordered class="q-mb-md">
            <q-card-section>
              <div class="row items-center q-col-gutter-md">
                <div class="col-12 col-sm-8">
                  <q-input
                    v-model="userName"
                    label="Identifiant"
                    outlined
                    class="full-width"
                    bg-color="white"
                    dense
                    hide-bottom-space
                  >
                    <template v-slot:prepend>
                      <q-icon name="person" color="primary" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-sm-4">
                  <q-btn
                    label="Valider"
                    color="primary"
                    class="full-width"
                    icon="check"
                    @click="saveField('userName')"
                    unelevated
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>

          <q-card flat bordered class="q-mb-md">
            <q-card-section>
              <div class="row items-center q-col-gutter-md">
                <div class="col-12 col-sm-8">
                  <q-input
                    v-model="userEmail"
                    label="Email"
                    outlined
                    type="email"
                    class="full-width"
                    bg-color="white"
                    dense
                    hide-bottom-space
                  >
                    <template v-slot:prepend>
                      <q-icon name="email" color="primary" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-sm-4">
                  <q-btn
                    label="Valider"
                    color="primary"
                    class="full-width"
                    icon="check"
                    @click="saveField('userEmail')"
                    unelevated
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>

          <q-card flat bordered>
            <q-card-section>
              <div class="row items-center q-col-gutter-md">
                <div class="col-12 col-sm-8">
                  <q-input
                    v-model="userPassword"
                    label="Mot de passe"
                    outlined
                    class="full-width"
                    bg-color="white"
                    dense
                    hide-bottom-space
                    :type="isPwd ? 'password' : 'text'"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" color="primary" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-sm-4">
                  <q-btn
                    label="Valider"
                    color="primary"
                    class="full-width"
                    icon="check"
                    @click="saveField('userPassword')"
                    unelevated
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
