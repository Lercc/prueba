<template>
    <base-nav class="navbar-top navbar-dark d-flex"
              id="navbar-main"
              :show-toggle-button="false"
              expand>
        <!-- <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
            <div class="form-group mb-0">
                <base-input placeholder="Search"
                            class="input-group-alternative"
                            alternative=""
                            addon-right-icon="fas fa-search">
                </base-input>
            </div>
        </form> -->
        <ul class="navbar-nav align-items-center d-flex d-md-flex">
            <li class="nav-item dropdown">
                <base-dropdown class="nav-link pr-0">
                    <div class="media align-items-center" slot="title">
                      <div class="media-body ml-2 d-none d-lg-block">
                        <span class="mb-0 text-sm  font-weight-bold">{{estudiante.estudiante.nombre}}</span>
                      </div>  
                      <span class="avatar avatar-sm rounded-circle">
                        <img alt="Image placeholder" src="img/theme/user.png">
                      </span>
                    </div>
                    <template>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>Mi Perfil</span>
                        </router-link>
                        <!-- <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-settings-gear-65"></i>
                            <span>Configuración</span>
                        </router-link> -->
                        <!-- <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-calendar-grid-58"></i>
                            <span>Actividad</span>
                        </router-link> -->
                        <router-link to="/recursos" class="dropdown-item">
                            <i class="ni ni-support-16"></i>
                            <span>Soporte</span>
                        </router-link>
                        <div class="dropdown-divider"></div>
                        <p class="dropdown-item cerrar-sesion" @click="cerrarSesion">
                            <i class="ni ni-user-run"></i>
                            <span>Salir</span>
                        </p>
                    </template>
                </base-dropdown>
            </li>
        </ul>
    </base-nav>
</template>
<script>
  import { mapMutations, mapState } from 'vuex'; 
  export default {
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchQuery: ''
      };
    },
    computed:{
      ...mapState(['estudiante'])
    },
    methods: {
      ...mapMutations("usuario",["userIsAdmin", "setUsuarioToken"]),
      ...mapMutations("estudiante",["guardarEstudiante"]),
      
      cerrarSesion() {
        this.userIsAdmin("")
        this.setUsuarioToken("")
        this.guardarEstudiante({})
        localStorage.removeItem("admin")
        localStorage.removeItem("userToken")
        localStorage.removeItem("id")
        localStorage.removeItem("estudiante")
        this.$router.push({ name: "MuniAuth" })
      },

      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      },
      toggleMenu() {
        this.showMenu = !this.showMenu;
      }
    },
    mounted(){
        if (localStorage.getItem("estudiante")) {
          this.estudiante.estudiante=JSON.parse(localStorage.getItem("estudiante"))
        }

    }
  };
</script>

<style  scoped>
.cerrar-sesion {
  cursor: pointer;
}
</style>