<template>
    <div>
        <base-header class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
                     style="min-height: 350px; background-image: url(img/brand/logo-muni-white.png); background-size: cover; background-position: center top;">
            <!-- Mask -->
            <span class="mask bg-gradient-success opacity-8"></span>
            <!-- Header container -->
            <div class="container-fluid d-flex align-items-center">
                <div class="row">
                    <div class="col-lg-7 col-md-10">
                        <h1 class="display-2 text-white">Hola {{estudiante.nombre}}</h1>
                        <p class="text-white mt-0 mb-5">Esta es tu página de perfil donde podrás visualizar los datos referente a su cuenta.</p>
                        <!-- <a href="#!" class="btn btn-info">Editar Perfil</a> -->
                    </div>
                </div>
            </div>
        </base-header>

        <div class="container-fluid mt--7">
            <div class="row">
                <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">

                    <div class="card card-profile shadow">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                    <a href="#">
                                        <img src="img/theme/user.png" class="rounded-circle">
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                            <div class="d-flex justify-content-between">
                                <!-- <base-button size="sm" type="info" class="mr-4">Conectar</base-button>
                                <base-button size="sm" type="default" class="float-right">Mensajes</base-button> -->
                            </div>
                        </div>
                        <div class="card-body pt-0 pt-md-4">
                            <div class="row">
                                <div class="col">
                                    <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                                        <!-- <div>
                                            <span class="heading">22</span>
                                            <span class="description">Amigos</span>
                                        </div>
                                        <div>
                                            <span class="heading">10</span>
                                            <span class="description">Fotos</span>
                                        </div>
                                        <div>
                                            <span class="heading">89</span>
                                            <span class="description">Comentarios</span>
                                        </div> -->
                                    </div> 
                                </div>
                            </div>
                            <div class="text-center">
                                <h3>
                                    {{estudiante.nombre}}<span class="font-weight-light">, {{age}}</span>
                                </h3>
                                <div class="h5 font-weight-300">
                                    <i class="ni location_pin mr-2"></i>{{estudiante.provincia}} - {{estudiante.distrito}}
                                </div>
                                <div class="h5 font-weight-300">
                                    <i class="ni business_briefcase-24 mr-2"></i>{{estudiante.dni}}
                                </div>
                                <div class="h5 font-weight-300">
                                    <i class="ni education_hat mr-2"></i>{{estudiante.celular}}
                                </div>
                                <hr class="my-4" />
                                <!-- <a href="#">Mostrar más!</a> -->
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <div class="col-xl-8 order-xl-1">
                    <card shadow type="secondary">
                        <div slot="header" class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Mi Cuenta</h3>
                                </div>
                                <div class="col-4 text-right">
                                    <a href="#!" class="btn btn-sm btn-primary">Configuraciones</a>
                                </div>
                            </div>
                        </div>
                        <template>
                            <form @submit.prevent>
                                <h6 class="heading-small text-muted mb-4">Información</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Username"
                                                        placeholder="Username"
                                                        input-classes="form-control-alternative"
                                                        v-model="estudiante.username"
                                                        :disabled="false"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Email address"
                                                        placeholder="jesse@example.com"
                                                        input-classes="form-control-alternative"
                                                        v-model="estudiante.email"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="First name"
                                                        placeholder="First name"
                                                        input-classes="form-control-alternative"
                                                        v-model="estudiante.nombre"
                                            />
                                        </div>
                                        <div class="col-lg-6">
                                            <base-input alternative=""
                                                        label="Last name"
                                                        placeholder="Last name"
                                                        input-classes="form-control-alternative"
                                                        v-model="estudiante.apellidos"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <h6 class="heading-small text-muted mb-4">Información de Contacto</h6>
                                <div class="pl-lg-4">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <base-input alternative=""
                                                        label="Address"
                                                        placeholder="Home Address"
                                                        input-classes="form-control-alternative"
                                                        v-model="estudiante.distrito"
                                            />
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="City"
                                                        placeholder="City"
                                                        input-classes="form-control-alternative"
                                                        v-model="estudiante.provincia"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Country"
                                                        placeholder="Country"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.country"
                                            />
                                        </div>
                                        <div class="col-lg-4">
                                            <base-input alternative=""
                                                        label="Postal code"
                                                        placeholder="Postal code"
                                                        input-classes="form-control-alternative"
                                                        v-model="model.zipCode"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <hr class="my-4" />
                                <h6 class="heading-small text-muted mb-4">Acerca de mí</h6>
                                <div class="pl-lg-4">
                                    <div class="form-group">
                                        <base-input alternative=""
                                                    label="About Me">
                                            <textarea rows="4" class="form-control form-control-alternative" placeholder="A few words about you ...">Perfil en construcción...</textarea>
                                        </base-input>
                                    </div>
                                </div>
                            </form>
                        </template>
                    </card>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'user-profile',
    data() {
      return {
        model: {
            username: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            country: 'Perú',
            zipCode: '12000',
            about: '',
        },
        estudiante:[],
        age:0
      }
    },
   
    methods:{
        getAge(){
            const  fecha = new Date()
            const year = fecha.getFullYear()
            this.age = year - new Date(this.estudiante.fecha_nacimiento).getFullYear()
            
        },
        async getStudentData(){
            console.log("entrada?")
            if (localStorage.getItem("estudiante")) {
                console.log("entrado!")
                this.estudiante = await JSON.parse(localStorage.getItem("estudiante"))
                this.getAge()
            }
        }
    },
    mounted(){
        this.getStudentData();
        }
    };
</script>
<style></style>
