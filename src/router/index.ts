import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import LogRegLayout from '@/layouts/LogRegLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'logreg-layout',
      component: LogRegLayout,
      redirect: {name: "login"},
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('../views/LogView.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('../views/RegView.vue')
        },
        {
          path: '/forget-password',
          name: 'forget-password',
          component: () => import('../views/ForgetPasswordView.vue')
        }
      ]
    },
    {
      path: '/',
      name: 'default-layout',
      component: DefaultLayout,
      redirect: {name: "home"},
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('../views/AboutView.vue')
        },
      ]
    },
  ]
})

export default router
