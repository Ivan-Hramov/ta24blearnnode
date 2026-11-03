import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/rick-and-morty',
      alias: '/',
      name: 'rick-and-morty',
      component: () => import('../pages/RickAndMortyPage.vue'),
    },
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
