import Vue from 'vue'
import Router from 'vue-router'
// import DashboardLayout from '@/layout/DashboardLayout'
// import AuthLayout from '@/layout/AuthLayout'
import MuniAulaVirtual from '@/views/MuniAulaVirtual/MuniAulaVirtual'
import MuniAuth from '@/views/MuniAuth/MuniAuth'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'login',
      component: MuniAuth,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "login" */ './views/MuniAuth/Login.vue')
        },
        {
          path: '/registro',
          name: 'registro',
          component: () => import(/* webpackChunkName: "registro" */ './views/MuniAuth/Registro.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'home',
      component: MuniAulaVirtual,
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import(/* webpackChunkName: "dashboard" */ './views/MuniAulaVirtual/componentes/Home.vue')
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "profile" */ './views/UserProfile.vue')
        },
        {
          path: '/matricula',
          name: 'matricula',
          component: () => import(/* webpackChunkName: "matricula" */ './views/MuniAulaVirtual/componentes/Matricula.vue')
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import(/* webpackChunkName: "icons" */ './views/Icons.vue')
        },
        {
          path: '/tables',
          name: 'tables',
          component: () => import(/* webpackChunkName: "tables" */ './views/Tables.vue')
        }
      ]
    }
  ]
})
