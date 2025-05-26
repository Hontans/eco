<template>
  <q-page class="flex">
    <!-- Menu latéral -->
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

    <!-- Contenu du profil -->
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
      <!-- Section Coordonnées -->
      <div v-if="activeSection === 'coordonnees'">
        <div class="text-h5 text-center q-mb-lg">Coordonnées</div>

        <div class="q-mx-auto" style="max-width: 400px">
          <q-input v-model="userData.name" label="Identifiant :" outlined class="q-mb-md" />

          <q-input v-model="userData.email" label="Mail :" outlined type="email" class="q-mb-md" />

          <q-input
            v-model="userData.password"
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

      <!-- Section Adresses -->
      <div v-else-if="activeSection === 'adresses'">
        <div class="text-h5 text-center q-mb-lg">Adresses</div>

        <div class="q-mx-auto" style="max-width: 400px">
          <q-input v-model="userData.Pays" label="Pays :" outlined class="q-mb-md" />

          <q-input v-model="userData.ville" label="Ville :" outlined class="q-mb-md" />

          <q-input
            v-model="userData['code postal']"
            label="Code postal :"
            outlined
            class="q-mb-md"
          />

          <div class="text-center q-mt-lg">
            <q-btn label="Valider" color="primary" @click="saveUserData" />
          </div>
        </div>
      </div>

      <!-- Section Paiement -->
      <div v-else-if="activeSection === 'paiement'">
        <div class="text-h5 text-center q-mb-lg">Paiement</div>

        <div class="q-mx-auto" style="max-width: 400px">
          <q-input
            v-model="userData['numero de la carte']"
            label="Numéro de carte :"
            outlined
            class="q-mb-md"
          />

          <q-input
            v-model="userData['date d\'expiration']"
            label="Date d'expiration :"
            outlined
            class="q-mb-md"
          />

          <q-input
            v-model="userData.cryptogramme"
            label="Cryptogramme :"
            outlined
            class="q-mb-md"
          />

          <div class="text-center q-mt-lg">
            <q-btn label="Valider" color="primary" @click="saveUserData" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useQuasar } from 'quasar';

const userData = ref({
  name: '',
  email: '',
  password: '',
  'numero de la carte': '',
  "date d'expiration": '',
  cryptogramme: '',
  Pays: '',
  ville: '',
  'code postal': '',
});

const activeSection = ref('coordonnees');
const $q = useQuasar();

onMounted(async () => {
  try {
    const response = await fetch('/users.json');
    if (!response.ok) {
      throw new Error('Erreur lors du chargement des données utilisateurs');
    }
    const data = await response.json();
    // On utilise le premier utilisateur pour l'exemple
    if (data && data.length > 0) {
      userData.value = { ...data[0] };
    }
  } catch (error) {
    console.error('Erreur:', error);
  }
});

const saveUserData = () => {
  console.log('Données sauvegardées:', userData.value);
  $q.notify({
    message: 'Modifications enregistrées !',
    color: 'positive',
    position: 'top',
  });
};
</script>
