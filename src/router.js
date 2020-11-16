import Vue from 'vue'
import Router from 'vue-router'
// import DashboardLayout from '@/layout/DashboardLayout'
// import AuthLayout from '@/layout/AuthLayout'
import MuniAulaVirtual from '@/views/MuniAulaVirtual/MuniAulaVirtual'
import MuniAuth from '@/views/MuniAuth/MuniAuth'
import MuniAdmin from '@/views/MuniAdmin/MuniAdmin'
import NotFound from '@/views/NotFound/NotFoundPage.vue';

import store from '@/store'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'MuniAuth',
      redirect: 'login',
      component: MuniAuth,
      beforeEnter(to, from, next) {
        let token = store.state.usuario.token 
        let isAdmin = store.state.usuario.admin 
        if(!token == 0 && !isAdmin)  {
          next({ name: 'MuniAulaVirtual' })

        } else if(!token == 0 && isAdmin){
          next({ name: 'MuniAdmin' })
        } 
        else {
          next()
        }
      },
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import(/* webpackChunkName: "login" */ './views/MuniAuth/Login.vue')
        },
        {
          path: 'registro',
          name: 'registro',
          component: () => import(/* webpackChunkName: "registro" */ './views/MuniAuth/Registro.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'home',
      name: 'MuniAulaVirtual',
      component: MuniAulaVirtual,
      beforeEnter(to, from, next) {
        let token = store.state.usuario.token
        let isAdmin = store.state.usuario.admin
        if(!token == 0 && !isAdmin)  {
          next()
        } else if(!token == 0 && isAdmin){
          next({ name: 'MuniAdmin' })
        } 
        else {
          next({ name: 'MuniAuth' })
        }
      },
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
          path: '/misMatriculas',
          name: 'misMatriculas',
          component: () => import(/* webpackChunkName: "matricula" */ './views/MuniAulaVirtual/componentes/MisMatriculas.vue')
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
        }
      ]
    },
    {
      path: '/',
      redirect: 'adminIcons',
      name: 'MuniAdmin',
      component: MuniAdmin,
      beforeEnter(to, from, next) {
        let token = store.state.usuario.token 
        let isAdmin = store.state.usuario.admin 
        if(!token == 0 && isAdmin)  {
          next()
        } else if(!token == 0 && !isAdmin){
          next({ name: 'MuniAulaVirtual' })
        } 
        else {
          next({ name: 'MuniAuth' })
        }
      },
      children: [
        {
          path: '/adminIcons',
          name: 'adminIcons',
          component: () => import(/* webpackChunkName: "dashboard" */ './views/MuniAdmin/componentes/Icons.vue')
        },
        // {
        //   path: '/mostrarMatriculas',
        //   name: 'mostrarMatriculas',
        //   component: () => import(/* webpackChunkName: "dashboard" */ './views/MuniAdmin/componentes/MostrarMatriculas.vue')
        // },
        {
          path: '/adminProfile',
          name: 'adminProfile',
          component: () => import(/* webpackChunkName: "profile" */ './views/MuniAdmin/componentes/UserProfile.vue')
        }
      ]
    },
    { path: '*', component: NotFound }
  ]
})
