<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template slot="links">
        <sidebar-item :link="{name: 'Home', icon: 'ni ni-tv-2 text-primary', path: '/home'}"/>
        <sidebar-item :link="{name: 'Perfil', icon: 'ni ni-single-02 text-yellow', path: '/profile'}"/>
        <sidebar-item :link="{name: 'Matrícula', icon: 'ni ni-ruler-pencil text-green', path: '/matricula'}"/>
        <sidebar-item :link="{name: 'Icons', icon: 'ni ni-planet text-blue', path: '/icons'}"/>
        <sidebar-item :link="{name: 'Tables', icon: 'ni ni-bullet-list-67 text-red', path: '/tables'}"/>
        <sidebar-item :link="{name: 'Login', icon: 'ni ni-key-25 text-info', path: '/login'}"/>

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
<style lang="scss">
</style>
