<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template slot="links">
        <!-- <sidebar-item :link="{name: 'Inicio', icon: 'ni ni-tv-2 text-primary', path: '/home'}"/> -->
        <sidebar-item :link="{name: 'Perfil', icon: 'ni ni-single-02 text-green', path: '/profile'}"/>
        <sidebar-item :link="{name: 'Mis Matrículas', icon: 'ni ni-box-2 text-green', path: '/misMatriculas'}"/>
        <sidebar-item :link="{name: 'Nueva Matrícula', icon: 'ni ni-ruler-pencil text-green', path: '/matricula'}"/>
        <sidebar-item :link="{name: 'Recursos', icon: 'ni ni-planet text-green', path: '/recursos'}"/>
        <!-- <sidebar-item :link="{name: 'Login', icon: 'ni ni-key-25 text-info', path: '/login'}"/> -->
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
  import { getAllCiclos, getAllAreas, getAllCarreras} from '@/api/generalData'
  import { mapMutations } from 'vuex'

  export default {
    name: 'muni-aula-virtual',
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
    created() {
        getAllCiclos()
          .then( res => {
            // console.log("ciclos",res)
            this.setCiclos(res.data.data)
            return getAllAreas()
          })
          .then( res => {
            // console.log("areas",res)
            this.setAreas(res.data.data)
            return getAllCarreras()
          })
          .then( res => {
            // console.log("carreras",res)
            this.setCarreras(res.data.data)
          })
          .catch( err => {
            console.error(err);
          })
    },
    methods: {
      ...mapMutations('ciclos',["setCiclos"]),
      ...mapMutations('areas',["setAreas"]),
      ...mapMutations('carreras',["setCarreras"]),
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
