import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import LogRegLayout from '@/layouts/LogRegLayout.vue'

// Segédfüggvény a cookie olvasásához
function getCookie(name: string){
  const cookies = document.cookie.split('; ');
  const userCookie = cookies.find(row => row.startsWith(name + '='));
  return userCookie ? userCookie.split('=')[1] : null;
}

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
          component: () => import('../views/ForgetPasswordView.vue')
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
          component: () => import('../views/Traningiew.vue'),
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
        }
      ]
    },
  ]
})

// **Navigációs őr hozzáadása**
router.beforeEach((to, from, next) => {
  const user = getCookie('user'); // Ellenőrizzük, hogy van-e 'user' cookie

  // Ha van 'user' cookie és a felhasználó a login vagy register oldalon van, akkor dobjuk át a home-ra
  if (user && (to.name === 'login' || to.name === 'register')) {
    next({ name: 'home' });
  } else {
    next(); // Engedélyezzük a navigációt
  }
});

export default router;
