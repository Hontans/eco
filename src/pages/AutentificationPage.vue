<template>
  <!-- #region Main Page Container -->
  <q-page class="flex flex-center">
    <!-- #region Authentication Card -->
    <q-card class="auth-card q-pa-lg">
      <!-- #region Card Header -->
      <q-card-section class="text-center q-pt-none">
        <h4 class="q-my-md text-white">Connexion</h4>
      </q-card-section>
      <!-- #endregion -->

      <!-- #region Card Content -->
      <q-card-section>
        <!-- #region Authentication Form -->
        <q-form @submit="onSubmit" class="q-gutter-md">
          <!-- #region Email/Username Input -->
          <q-input outlined v-model="emailOrName" label="Email ou nom d'utilisateur" class="auth-input" lazy-rules :rules="[(val) => (val && val.length > 0) || 'Obligatoire']">
            <template v-slot:prepend>
              <q-icon name="person" color="white" />
            </template>
          </q-input>
          <!-- #endregion -->

          <!-- #region Password Input -->
          <q-input outlined :type="isPwd ? 'password' : 'text'" v-model="password" label="Mot de passe" class="auth-input" lazy-rules :rules="[(val) => (val !== null && val !== '') || 'Obligatoire']">
            <template v-slot:prepend>
              <q-icon name="lock" color="white" />
            </template>
            <template v-slot:append>
              <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" color="white" class="cursor-pointer" @click="isPwd = !isPwd" />
            </template>
          </q-input>
          <!-- #endregion -->

          <!-- #region Forgot Password Link -->
          <div class="row justify-end q-mt-sm">
            <q-btn flat dense color="primary" label="Mot de passe oublié?" size="sm" to="/forgot-password" />
          </div>
          <!-- #endregion -->

          <!-- #region Submit Button -->
          <div class="row justify-between q-mt-md">
            <q-btn :loading="loading" label="Connexion" type="submit" color="primary" class="full-width">
              <template v-slot:loading>
                <q-spinner-dots color="white" />
              </template>
            </q-btn>
          </div>
          <!-- #endregion -->

          <!-- #region Register Link -->
          <div class="text-center q-mt-md text-white">
            <p class="q-mb-xs">Pas encore de compte ?</p>
            <q-btn flat color="primary" label="S'inscrire" to="/register" />
          </div>
          <!-- #endregion -->
        </q-form>
        <!-- #endregion -->
      </q-card-section>
      <!-- #endregion -->
    </q-card>
    <!-- #endregion -->
  </q-page>
  <!-- #endregion -->
</template>

<script setup lang="ts">
// #region Imports
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { dataStore } from '../stores/data-store';
import { useApi } from '../js/api'
// #endregion

// #region Store and API
const store = dataStore();
const api = useApi()
const $q = useQuasar();
const router = useRouter();
// #endregion

// #region Reactive Variables
const emailOrName = ref('');
const password = ref('');
const isPwd = ref(true);
const loading = ref(false);
// #endregion

// #region Submit Handler
const onSubmit = async () =>
{
  loading.value = true;
  try
  {
    const user = await api.login(emailOrName.value, password.value);
    if (user)
    {
      $q.notify({
        color: 'positive', textColor: 'white', icon: 'check_circle',
        message: `Bienvenue ${'name' in user ? user.name : 'utilisateur'}!`, timeout: 2000, position: 'top'
      });

      if (store.data.authAccess)
      {
        await router.push(store.data.authAccess);
        store.data.authAccess = '';
      }
      else
      {
        await router.push('/');
      }
    }
    else
    {
      $q.notify({
        color: 'negative', textColor: 'white', icon: 'error',
        message: 'Identifiants incorrects', timeout: 2000, position: 'top'
      });
    }
  }
  catch
  {
    $q.notify({
      color: 'negative', textColor: 'white', icon: 'warning',
      message: 'Erreur de connexion. Veuillez réessayer.', timeout: 2000, position: 'top'
    });
  }
  finally
  {
    loading.value = false;
  }
};
// #endregion
</script>

<style lang="scss" scoped>
/* #region Auth Card Styles */
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
    border-color: rgba(255, 255, 255, 0.3);
  }
}
/* #endregion */

/* #region Input Styles */
.auth-input
{
  margin-bottom: 10px;
}
/* #endregion */

/* #region Button Styles */
.full-width
{
  width: 100%;
}
/* #endregion */
</style>
