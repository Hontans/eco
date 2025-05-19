<template>
  <div class="q-pa-md" style="max-width: 400px">
    <h5 class="q-my-md text-center">Connexion</h5>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="emailOrName"
        label="Email ou nom d'utilisateur"
        hint="Entrez votre email ou nom d'utilisateur"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Obligatoire']"
      />

      <q-input
        filled
        type="password"
        v-model="password"
        label="Mot de passe"
        hint="Entrez votre mot de passe"
        lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Obligatoire']"
      />

      <q-toggle v-model="accept" label="Se souvenir de moi" />

      <div class="flex justify-center q-mt-md">
        <q-btn label="Connexion" type="submit" color="primary" />
        <q-btn label="Réinitialiser" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { dataStore } from '../stores/data-store';

const $q = useQuasar();
const router = useRouter();
const store = dataStore();

const emailOrName = ref('');
const password = ref('');
const accept = ref(false);

const onSubmit = async () => {
  const success = store.login(emailOrName.value, password.value);

  if (success) {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'check_circle',
      message: `Bienvenue ${store.userName}!`,
    });

    await router.push('/');
  } else {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'error',
      message: 'Identifiants incorrects',
    });
  }
};

const onReset = () => {
  emailOrName.value = '';
  password.value = '';
  accept.value = false;
};
</script>
