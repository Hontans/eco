import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path     : '',
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path     : 'auth',
        component: () => import('pages/AutentificationPage.vue')
      },
      {
        path     : 'forgot-password',
        component: () => import('pages/ForgotPassewordPage.vue')
      },
      {
        path     : 'register',
        component: () => import('pages/RegisterPage.vue')
      },
      {
        path: '/product/:id',
        component: () => import('pages/ProductPage.vue'),
        props: route => {
          return {
            id: parseInt(route.params.id as string, 10) // On passe l'id du produit comme prop au composant
          }
        } // Important pour passer les params de la route comme props au composant
      }
    ],
  },

  {
    path: '/checkout',
    component: () => import('pages/CheckoutPage.vue'),
    meta: { requiresAuth: true },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
