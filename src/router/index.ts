import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import LogRegLayout from '../layouts/LogRegLayout.vue'
import axiosClient from '@/lib/axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'logreg-layout',
      component: LogRegLayout,
      redirect: { name: "login" },
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
          component: () => import('../views/ForgetPassword.vue')
        },
        {
          path: '/set-new-password',
          name: 'set-new-password',
          component: () => import('../views/SetNewPasswordView.vue')
        }
      ]
    },
    {
      path: '/',
      name: 'default-layout',
      component: DefaultLayout,
      redirect: { name: "home" },
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('../views/HomeView.vue'),
        },
        {
          path: '/training',
          name: 'training',
          component: () => import('../views/TraningView.vue'),
        },
        {
          path: '/learning',
          name: 'learning',
          component: () => import('../views/LearningView.vue'),
        },
        {
          path: '/exam',
          name: 'exam',
          component: () => import('../views/ExamView.vue'),
        },
        {
          path: '/exam-publish',
          name: 'exam-publish',
          component: () => import('../views/ExamPublishView.vue'),
        },
        {
          path: '/results',
          name: 'results',
          component: () => import('../views/ResultsView.vue'),
        }
      ]
    },
  ]
})

// **Navigációs őr hozzáadása**
const publicPages = ['login', 'register', 'forget-password', 'set-new-password'];

router.beforeEach(async (to, from, next) => {
  try {
    const res = await axiosClient.get('/check-cookie');

    if (!res.data.valid && !publicPages.includes(to.name as string)) {
      return next({ name: 'login' });
    }

    if (res.data.valid && publicPages.includes(to.name as string)) {
      return next({ name: 'home' });
    }

    next();
  } catch (err) {
    console.error("Hiba a cookie ellenőrzés során:", err);
    next();
  }
});

export default router;
