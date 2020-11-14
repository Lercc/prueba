<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template slot="links">
        <sidebar-item :link="{name: 'Admin Icons', icon: 'ni ni-tv-2 text-primary', path: '/adminIcons'}"/>
        <sidebar-item :link="{name: 'Admin Perfil', icon: 'ni ni-single-02 text-yellow', path: '/adminProfile'}"/>
        <sidebar-item :link="{name: 'no admin Matricula', icon: 'ni ni-single-02 text-yellow', path: '/matricula'}"/>
      </template>
    </side-bar>

    <div class="main-content" :data="sidebarBackground">
      <!-- MuniAulaVirtual SIDEBAR -->
      <aula-navbar></aula-navbar>

      <!-- MuniAulaVirtual CONTENT MAIN -->
      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <router-view></router-view>
        </fade-transition>
        <!-- MuniAulaVirtual FOOTER -->
        <aula-footer v-if="!$route.meta.hideFooter"></aula-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import AulaNavbar from '@/layout/AulaNavbar.vue';
  import AulaFooter from '@/layout/AulaFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    name: 'muni-admin',
    components: {
      AulaNavbar,
      AulaFooter,
      FadeTransition
    },
    data() {
      return {
        sidebarBackground: 'vue' //vue|blue|orange|green|red|primary
      };
    },
    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style>
</style>
