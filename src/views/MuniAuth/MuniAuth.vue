<template>
    <div class="main-content bg-default muniAuth">
        <!-- MuniAuth NAVBAR -->
        <auth-nav class="navbar-top navbar-horizontal navbar-dark"
                  containerClasses="px-4 container"
                  expand>
            <router-link slot="brand" class="navbar-brand" to="/">
                <img src="img/brand/logo-muni-white.png"/>
            </router-link>

            <template v-slot="{closeMenu}">
                <!-- Collapse header -->
                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <router-link to="/">
                                <img src="img/brand/logo-muni-black.png">
                            </router-link>
                        </div>
                        <div class="col-6 collapse-close">
                            <button type="button"
                                    @click="closeMenu"
                                    class="navbar-toggler"
                                    aria-label="Toggle sidenav">
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Navbar items -->
                <ul class="navbar-nav ml-auto">
                    <!-- <li class="nav-item">
                        <router-link class="nav-link nav-link-icon" to="/home">
                            <i class="ni ni-planet"></i>
                            <span class="nav-link-inner--text">Aula Virtual</span>
                        </router-link>
                    </li> -->
                    <li class="nav-item">
                        <router-link class="nav-link nav-link-icon" to="/registro">
                            <i class="ni ni-ruler-pencil"></i>
                            <span class="nav-link-inner--text">Registro</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link nav-link-icon" to="/login">
                            <i class="ni ni-circle-08"></i>
                            <span class="nav-link-inner--text">Login</span>
                        </router-link>
                    </li>
                    <!-- <li class="nav-item">
                        <router-link class="nav-link nav-link-icon" to="/adminProfile">
                            <i class="ni ni-single-02"></i>
                            <span class="nav-link-inner--text">Perfil</span>
                        </router-link>
                    </li> -->
                </ul>
            </template>
        </auth-nav>
        <!-- MuniAuth HEADER -->
        <div class="header bg-gradient-success py-7 py-lg-8 muni-header" >
            <div class="container">
                <div class="header-body text-center mb-7">
                    <div class="row justify-content-center">
                        <div class="col-lg-5 col-md-6">
                            <h1 class="text-white">Bienvenido a la Academia Municipal El Tambo</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div class="separator separator-bottom separator-skew zindex-100">
                <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
                     xmlns="http://www.w3.org/2000/svg">
                    <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
                </svg>
            </div>
        </div>
        <!-- MuniAut PAGE CONTENT -->
        <div class="container mt--9 pb-5 muniAuth-content">
            <slide-y-up-transition mode="out-in" origin="center top">
                <router-view></router-view>
            </slide-y-up-transition>
        </div>
        <!-- MuniAut FOOTER -->
        <footer class="py-5">
            <div class="container">
                <div class="row align-items-center justify-content-xl-between">
                    <div class="col-xl-6">
                        <div class="copyright text-center text-xl-left text-muted">
                            &copy; {{year}} <a href="https://www.creative-tim.com" class="font-weight-bold ml-1"
                                               target="_blank">Pixeland</a>
                        </div>
                    </div>
                    <div class="col-xl-6">
                        <ul class="nav nav-footer justify-content-center justify-content-xl-end">
                            <li class="nav-item">
                                <a href="https://www.teampixeland.com/" class="nav-link" target="_blank">TeamPixeland</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>
<script>
  import { SlideYUpTransition } from 'vue2-transitions'

  export default {
    name: 'muni-auth',
    components: {
      SlideYUpTransition
    },
    data() {
      return {
        year: new Date().getFullYear(),
        showMenu: false
      }
    }
  }
</script>
<style scoped>
.muniAuth-content {
    min-height: 60vh;
}
@media screen and (min-width: 1024px) {
    .muniAuth-content {
        min-height: 53vh;
    }
}
@media screen and (min-width: 1340px) {
    .muniAuth-content {
        min-height: 20vh;
    }
}
@media screen and (min-width: 1440px) {
    .muniAuth-content {
        min-height: 52.3vh;
    }
}
@media screen and (min-width: 1800px) {
    .muniAuth-content {
        min-height: 69vh;
    }
}
</style>