<template>
    <div class="main-content bg-default">
        <!-- MuniAuth HEADER -->
        <div class="header bg-gradient-success py-7 py-lg-8">
            <div class="container">
                <div class="header-body text-center mb-7">
                    <div class="row justify-content-center">
                        <div class="col-lg-5 col-md-6">
                            <h1 class="text-white">Bienvenido a el Aula Virtual Municipal!</h1>
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
        <div class="container mt--9 pb-5">
            <div class="wrapper">
              <div class="row justify-content-center">
                <div class="card col-8 py-2 py-lg-3 pt-lg-4">
                    <div class="header-body text-center my-4 px-6">
                      <h1 class="text-primary">Ooops!</h1>
                      <p class="text-lead text-primary">Página no encontrada. Sin embargo, no se preocupe, tenemos muchas otras páginas para explorar</p>
                      <router-link to="/" class="font-weight-bold text- mt-5">Regresar</router-link>
                    </div>
                </div>
              </div>
            </div>
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
export default {
  name: 'not-found'
};
</script>
