import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'rules',
    component: () => import('@/views/RulesView.vue'),
  },
  {
    path: '/play',
    name: 'play-classic',
    component: () => import('@/views/GameView.vue'),
    props: { mode: 'classic' },
  },
  {
    path: '/play-duet',
    name: 'play-duet',
    component: () => import('@/views/GameView.vue'),
    props: { mode: 'duet' },
  },
  {
    path: '/spy-master',
    name: 'spy-master',
    component: () => import('@/views/SpyMasterView.vue'),
  },
]

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})
