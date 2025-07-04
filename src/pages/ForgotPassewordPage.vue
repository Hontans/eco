<template>
  <!-- #region Page Container -->
  <q-page class="flex flex-center">
    <!-- #region Auth Card -->
    <q-card class="auth-card q-pa-lg">
      <!-- #region Header Section -->
      <q-card-section class="text-center q-pt-none">
        <h4 class="q-my-md text-white">Mot de passe oublié</h4>
      </q-card-section>
      <!-- #endregion -->

      <!-- #region Form Section -->
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <!-- #region Email Input -->
          <q-input outlined v-model="email" label="Email" class="auth-input" lazy-rules :rules="[(val) => (val && val.length > 0) || 'Obligatoire']">
            <template v-slot:prepend>
              <q-icon name="email" color="white" />
            </template>
          </q-input>
          <!-- #endregion -->

          <!-- #region Submit Button -->
          <div class="row justify-between q-mt-md">
            <q-btn :loading="sending" label="Envoyer" type="submit" color="primary" class="full-width">
              <template v-slot:loading>
                <q-spinner-dots color="white" />
              </template>
            </q-btn>
          </div>
          <!-- #endregion -->

          <!-- #region Cancel Button -->
          <div class="text-center q-mt-md text-white">
            <q-btn flat color="primary" label="Annuler" to="/auth" />
          </div>
          <!-- #endregion -->
        </q-form>
      </q-card-section>
      <!-- #endregion -->
    </q-card>
    <!-- #endregion -->
  </q-page>
  <!-- #endregion -->
</template>

<script setup lang="ts">
// #region Imports
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useApi } from '../js/api'
// #endregion

// #region Composables
const $q = useQuasar()
const api = useApi()
const email = ref('')
const sending = ref(false)
// #endregion

// #region Form Submission
const onSubmit = async () => {
  if (!email.value) {
    $q.notify({
      color: 'negative',
      message: 'Veuillez saisir votre email',
      icon: 'warning'
    })
    return
  }

  sending.value = true

  const response = await api.forgotPassword(email.value)
  console.log('Forgot Password Response:', response)
  if (!response.error) {
    $q.notify({
      color: 'positive',
      message: 'Un email de réinitialisation a été envoyé',
      icon: 'check'
    })
    email.value = ''
  } else {
    $q.notify({
      color: 'negative',
      message: response.error,
      icon: 'error'
    })
  }

  sending.value = false
}
// #endregion
</script>

<style lang="scss" scoped>
// #region Auth Card Styles
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
// #endregion

// #region Input Styles
.auth-input
{
  margin-bottom: 10px;
}
// #endregion

// #region Utility Classes
.full-width
{
  width: 100%;
}
// #endregion
</style>
