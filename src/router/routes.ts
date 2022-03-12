import { authGuard } from '@auth0/auth0-vue';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }],
  },
  {
    path: '/profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ProfilePage.vue') }],
    beforeEnter: authGuard,
  },
  {
    path: '/checkout',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Checkout.vue') }],
    beforeEnter: authGuard,
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
