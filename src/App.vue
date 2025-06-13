<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { dataStore } from './stores/data-store';
import { useRouter } from 'vue-router';

const store  = dataStore();
const router = useRouter();

router.beforeEach((to) => {
  if (to.meta.requiresAuth) {
    if (!store.data.currentUser) {
      // add last access to localstorage
      store.data.returnUrl = to.fullPath;
      console.log(to.fullPath);
      return '/auth';
    }
  }
});

function clearData() {
  if (!store.data.currentUser) {
    store.logout();
  }
}

onMounted(() => {
  window.removeEventListener('beforeunload', clearData);
  window.addEventListener('beforeunload', clearData);
})
</script>
