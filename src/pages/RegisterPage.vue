<template>
  <q-page class="flex flex-center">
    <q-card class="auth-card q-pa-lg">
      <!-- #region Card Header -->
      <q-card-section class="text-center q-pt-none">
        <h4 class="q-my-md text-white">Inscription</h4>
      </q-card-section>
      <!-- #endregion -->

      <!-- #region Registration Form -->
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <!-- #region User Name Input -->
          <q-input outlined v-model="userName" label="Utilisateur" class="auth-input" lazy-rules :rules="[(val) => (val && val.length > 0) || 'Obligatoire']">
            <template v-slot:prepend><q-icon name="person" color="white" /></template>
          </q-input>
          <!-- #endregion -->

          <!-- #region Email Input -->
            <q-input outlined type="email" v-model="userEmail" label="Email" class="auth-input" lazy-rules :rules="[(val) => (val && val.length > 0) || 'Obligatoire']">
            <template v-slot:prepend><q-icon name="email" color="white" /></template>
            </q-input>
          <!-- #endregion -->

          <!-- #region Password Input -->
          <q-input outlined :type="isPwd ? 'password' : 'text'" v-model="password" label="Mot de passe" class="auth-input" lazy-rules :rules="[(val) => (val !== null && val !== '') || 'Obligatoire']">
            <template v-slot:prepend><q-icon name="lock" color="white" /></template>
            <template v-slot:append><q-icon :name="isPwd ? 'visibility_off' : 'visibility'" color="white" class="cursor-pointer" @click="isPwd = !isPwd" /></template>
          </q-input>
          <!-- #endregion -->

          <!-- #region Confirm Password Input -->
          <q-input outlined :type="isConfirmPwd ? 'password' : 'text'" v-model="confirmPassword" label="Confirmer le mot de passe" class="auth-input" lazy-rules :rules="[(val) => (val !== null && val !== '') || 'Obligatoire', (val) => val === password || 'Les mots de passe ne correspondent pas']">
            <template v-slot:prepend><q-icon name="lock" color="white" /></template>
            <template v-slot:append><q-icon :name="isConfirmPwd ? 'visibility_off' : 'visibility'" color="white" class="cursor-pointer" @click="isConfirmPwd = !isConfirmPwd" /></template>
          </q-input>
          <!-- #endregion -->

          <!-- #region Submit Button -->
          <div class="row justify-between q-mt-md">
            <q-btn :loading="loading" label="S'inscrire" type="submit" color="primary" class="full-width">
              <template v-slot:loading><q-spinner-dots color="white" /></template>
            </q-btn>
          </div>
          <!-- #endregion -->

          <!-- #region Login Link -->
          <div class="text-center q-mt-md text-white">
            <p class="q-mb-xs">Vous avez déjà un compte ?</p>
            <q-btn flat color="primary" label="Se connecter" to="/auth" />
          </div>
          <!-- #endregion -->
        </q-form>
      </q-card-section>
      <!-- #endregion -->
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
//#region Imports
import { useApi } from '../js/api';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
//#endregion

//#region Variables
const $q = useQuasar();
const router = useRouter();
const userName = ref('');
const userEmail = ref('');
const password = ref('');
const confirmPassword = ref('');
const isPwd = ref(true);
const isConfirmPwd = ref(true);
const loading = ref(false);
const api = useApi();
//#endregion

//#region Functions
const onSubmit = async () => {
  loading.value = true;

  const response = await api.register(userName.value, userEmail.value, password.value);
  console.log(response);
  loading.value = false;

  if (response.data) {
    console.log('Inscription réussie:', response.data);

    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'check',
      message: 'Inscription réussie ! Vous êtes maintenant connecté.'
    });

    // Redirect to home page after successful registration
    await router.push('/');
    return;
  }

  console.log('Inscription error:', response.error);
  $q.notify({
    color: 'red-5',
    textColor: 'white',
    icon: 'warning',
    message: response.error || 'Erreur lors de l\'inscription'
  });
};
//#endregion
</script>


<style lang="scss" scoped>
//#region Auth Card
.auth-card
{
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);

  :deep(.q-field__control)
  {
    color: white;
  }

  :deep(.q-field__label)
  {
    color: white;
  }

  :deep(.q-field__outline)
  {
    border-color: white;
  }
}
//#endregion

//#region Form Styling
.auth-input
{
  margin-bottom: 10px;
}

.full-width
{
  width: 100%;
}
//#endregion
</style>
