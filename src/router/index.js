import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/HomeView.vue'
import Invitacion from '../views/Invitacion.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/:slug',
    name: 'Invitacion',
    component: Invitacion
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true }
  }
]


const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard global para proteger rutas que requieren autenticación


router.beforeEach((to, from, next) => {
  const auth = getAuth()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (!requiresAuth) {
    return next()
  }
  // Esperar a que Firebase determine el estado de autenticación
  const unsubscribe = auth.onAuthStateChanged(user => {
    unsubscribe()
    if (user) {
      next()
    } else {
      next({ name: 'Login' })
    }
  })
})

export default router