<template>
  <q-page class="flex flex-center">
    <q-card class="auth-card q-pa-lg">
      <q-card-section class="text-center q-pt-none">
        <h4 class="q-my-md">Inscription</h4>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            outlined
            v-model="emailOrName"
            label="Utilisateur"
            class="auth-input"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Obligatoire']"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
            outlined
            v-model="emailOrName"
            label="Email"
            class="auth-input"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Obligatoire']"
          >
            <template v-slot:prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input
            outlined
            :type="isPwd ? 'password' : 'text'"
            v-model="password"
            label="Mot de passe"
            class="auth-input"
            lazy-rules
            :rules="[(val) => (val !== null && val !== '') || 'Obligatoire']"
          >
            <template v-slot:prepend>
              <q-icon name="lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <div class="row justify-between q-mt-md">
            <q-btn
              :loading="loading"
              label="S'inscrire"
              type="submit"
              color="primary"
              class="full-width"
            >
              <template v-slot:loading>
                <q-spinner-dots color="white" />
              </template>
            </q-btn>
          </div>

          <div class="text-center q-mt-md text-grey-8">
            <p class="q-mb-xs">Vous avez déjà un compte ?</p>
            <q-btn flat color="primary" label="Se connecter" to="/auth" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApi } from '../js/api'

const api = useApi()
const $q = useQuasar();
const router = useRouter();

const emailOrName = ref('');
const password = ref('');
const isPwd = ref(true);
const loading = ref(false);

const onSubmit = async () => {
  loading.value = true;
  try {
    const user = await api.login(emailOrName.value, password.value);
    if (user) {
      $q.notify({
        color: 'positive',
        textColor: 'white',
        icon: 'check_circle',
        message: `Bienvenue ${user.name}!`,
        timeout: 2000,
        position: 'top'
      });

      await router.push('/');
    } else {
      $q.notify({
        color: 'negative',
        textColor: 'white',
        icon: 'error',
        message: 'Identifiants incorrects',
        timeout: 2000,
        position: 'top'
      });
    }
  } catch {
    $q.notify({
      color: 'negative',
      textColor: 'white',
      icon: 'warning',
      message: 'Erreur de connexion. Veuillez réessayer.',
      timeout: 2000,
      position: 'top'
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.auth-card {
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.auth-input {
  margin-bottom: 10px;
}

.full-width {
  width: 100%;
}
</style>
