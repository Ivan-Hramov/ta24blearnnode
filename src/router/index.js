import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/cat-facts',
      name: 'cat-facts',
      component: () => import('../pages/CatFactsPage.vue'),
    },
    {
      path: '/buttons',
      name: 'buttons',
      component: () => import('../pages/ButtonsPage.vue'),
    },
  ],
})

export default router
