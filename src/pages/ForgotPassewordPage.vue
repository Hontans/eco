<template>
  <q-page class="flex flex-center">
    <q-card class="auth-card q-pa-lg">
      <q-card-section class="text-center q-pt-none">
        <h4 class="q-my-md text-white">Mot de passe oublié</h4>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            outlined
            v-model="email"
            label="Email"
            class="auth-input"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Obligatoire']"
          >
            <template v-slot:prepend>
              <q-icon name="person" color="white" />
            </template>
          </q-input>

          <div class="row justify-between q-mt-md">
            <q-btn
              :loading="sending"
              label="Envoyer"
              type="submit"
              color="primary"
              class="full-width"
            >
              <template v-slot:loading>
                <q-spinner-dots color="white" />
              </template>
            </q-btn>
          </div>

          <div class="text-center q-mt-md text-white">
            <q-btn flat color="primary" label="Annuler" to="/auth" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const email = ref('')
const sending = ref(false)

const onSubmit = () => {
  sending.value = true
  setTimeout(() => {
    sending.value = false
    $q.notify({
      message: 'Email envoyé avec succès',
      color: 'positive',
      position: 'top'
    })
  })
}
</script>

<style lang="scss" scoped>
.auth-card
{
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);

  :deep(.q-field__control) {
    color: white;
  }

  :deep(.q-field__label) {
    color: white;
  }

  :deep(.q-field__outline) {
    border-color: white;
  }
}

.auth-input
{
  margin-bottom: 10px;
}

.full-width
{
  width: 100%;
}
</style>
