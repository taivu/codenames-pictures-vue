import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/rules',
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
    path: '/spy-master/:cardId?',
    name: 'spy-master',
    component: () => import('@/views/SpyMasterView.vue'),
    props: true,
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
  },
  {
    path: '/disclaimer',
    name: 'disclaimer',
    component: () => import('@/views/DisclaimerView.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})
