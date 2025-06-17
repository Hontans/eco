<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { dataStore } from './stores/data-store';
import { localStore } from './stores/local-store';
import { useRouter } from 'vue-router';
import { useApi } from './js/api';

const store  = dataStore();
const local = localStore();
const router = useRouter();
const api   = useApi();

router.beforeEach((to) => {
  console.log(to);
  if (to.meta.requiresAuth) {
    const currentUser = api.getConectedUser();
    if (!currentUser) {
      store.data.returnUrl = to.fullPath;
      console.log(to.fullPath);
      return '/auth';
    }
  }
});

function clearData() {
  if (!local.data.currentUser) {
    local.logout();
  }
}

onMounted(() => {
  window.removeEventListener('beforeunload', clearData);
  window.addEventListener('beforeunload', clearData);
})
</script>
