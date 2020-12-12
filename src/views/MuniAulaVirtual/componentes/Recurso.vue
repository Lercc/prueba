<template>
    <div>
        <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8">
            <!-- Card stats -->
            <div class="row">
                <div class="col-xl-4 col-lg-6 pt-2">
                    <a href="https://aula-virtual.academia-el-tambo.teampixeland.com/login/index.php" target="_blank">
                        <card :hover="true">
                        <stats-card title="Aula Virtual"
                                    type="gradient-blue"
                                    sub-title="Cursos"
                                    icon="ni ni-laptop"
                                    class="mb-4 mb-xl-0"
                        >
                            <template slot="footer">
                                <span class="text-success mr-2"><i class="ni ni-badge"></i> Dale click para ingresar! </span>
                            </template>
                        </stats-card>
                        </card>
                    </a>
                </div>
                <div class="col-xl-4 col-lg-6 pt-2">
                    <a href="https://academia-el-tambo.teampixeland.com/" target="_blank">
                        <card :hover="true">
                        <stats-card title="Página web"
                                    type="gradient-blue"
                                    sub-title="Novedades"
                                    icon="ni ni-single-copy-04"
                                    class="mb-4 mb-xl-0"
                        >
                            <template slot="footer">
                                <span class="text-success mr-2"><i class="ni ni-atom"></i> Dale click para acceder a la web! </span>
                            </template>
                        </stats-card>
                        </card>
                    </a>
                </div>
                <div class="col-xl-4 col-lg-6 pt-2">
                    <a href="https://academia-el-tambo.teampixeland.com/" target="_blank">
                        <card :hover="true">
                        <stats-card title="Blog de la academia"
                                    type="gradient-blue"
                                    sub-title="Infórmate"
                                    icon="ni ni-book-bookmark"
                                    class="mb-4 mb-xl-0"
                        >
                            <template slot="footer">
                                <span class="text-success mr-2"><i class="ni ni-atom"></i> Dale click para acceder al blog </span>
                            </template>
                        </stats-card>
                        </card>
                    </a>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col">
                    <div class="card shadow">
                        <div class="card-header bg-transparent">
                            <h3 class="mb-0">Medios de contácto</h3>
                        </div>
                        <div class="card-body">
                            <div class="row icon-examples">
                                <div class="col-lg-4 col-md-6"
                                     v-for="(icon, index) in redes" :key="icon.name + index">
                                     <a :href="icon.link" target="_blank">
                                    <button type="button"
                                            v-b-tooltip.hover.top
                                            :title="icon.name"
                                            v-clipboard:copy="icon.name"
                                            v-clipboard:success="onCopy"
                                            class="btn-icon-clipboard" data-clipboard-text="air-baloon">
                                        <div>
                                            <i :class="icon.icon"></i>
                                            <span>{{icon.name}}</span>
                                        </div>
                                    </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
  import Vue from 'vue'
  import VueClipboard from 'vue-clipboard2'
  import BTooltipDirective from 'bootstrap-vue/esm/directives/tooltip'
  Vue.use(VueClipboard)
  export default {
    directives: {
      'b-tooltip': BTooltipDirective
    },
    data() {
      return {
        redes: [
            { icon: "fab fa-facebook-square" ,name: "Facebook", link:"https://www.facebook.com/AcademiaMuniElTambo" },
            { icon: "fab fa-whatsapp-square" ,name: "Whatshap", link:"https://api.whatsapp.com/send?phone=51996040169&text=Hola!%20Deseo%20informaci%C3%B3n."},
            { icon: "fas fa-phone-square" ,name: "Celular 1" ,link:"https://api.whatsapp.com/send?phone=51999505349&text=Hola!%20Deseo%20informaci%C3%B3n."},
            { icon: "fas fa-phone-square" ,name: "Celular 2" ,link:"https://api.whatsapp.com/send?phone=51942072834&text=Hola!%20Deseo%20informaci%C3%B3n."},
            { icon: "fab fa-google-play" ,name: "App Android" ,link:"https://play.google.com/store/apps/details?id=com.moodle.moodlemobile"},
            { icon: "fab fa-app-store-ios" ,name: "App Iphone" ,link:"https://apps.apple.com/app/moodle-mobile/id633359593"},
        ]
      }
    },
    methods: {
      onCopy() {
        this.$notify({
          type: 'success',
          title: 'Dato copiado'
        })
      }
    }
  };
</script>