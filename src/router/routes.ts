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
        path     : 'checkout',
        component: () => import('pages/CheckoutPage.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: '/checkout',
    component: () => import('layouts/CheckoutLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        component: () => import('pages/CheckoutPage.vue')
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
